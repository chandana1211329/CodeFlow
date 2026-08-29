import { ExecutionStep, ExecutionDiff, ChangeDetail, StepExplanation, RelationshipLink } from '../types';

export function formatVal(v: any): string {
  if (v === null || v === undefined) return 'null';
  if (typeof v === 'string') return `"${v}"`;
  if (Array.isArray(v)) return `[${v.map(formatVal).join(', ')}]`;
  if (typeof v === 'object') {
    if (v._type) return `<${v._type}>`;
    return JSON.stringify(v);
  }
  return String(v);
}

export function enrichStepClientSide(steps: ExecutionStep[], language?: string): ExecutionStep[] {
  const lang = (language || 'python').toLowerCase();
  const runtimeName = lang === 'java' ? 'JVM' : lang === 'c' ? 'C Runtime' : lang === 'javascript' ? 'V8 Engine' : 'Python Interpreter';
  const langName = lang === 'java' ? 'Java' : lang === 'c' ? 'C' : lang === 'javascript' ? 'JavaScript' : 'Python';

  return steps.map((step, idx) => {
    if (step.diff && step.operationType && step.explanation && step.whyDetails) {
      return step;
    }

    const codeTrim = step.code ? step.code.trim() : '';

    if (idx === 0) {
      return {
        ...step,
        operationType: step.operationType || 'INITIALIZATION',
        diff: step.diff || {
          changedVars: [],
          changes: [],
          summary: 'Program initialized'
        },
        explanation: step.explanation || {
          whatHappened: `Program execution started in ${langName}.`,
          whyItHappened: `Setting up execution environment and global state in ${runtimeName}.`,
          whatChangedText: 'Initial state ready.',
          valuesInvolved: step.variables || {}
        },
        whyDetails: step.whyDetails || `The ${runtimeName} begins execution from line 1, preparing variable tables and imports.`
      };
    }

    const prevStep = steps[idx - 1];
    const prevVars = prevStep.variables || {};
    const currVars = step.variables || {};

    const changedVars: string[] = [];
    const changeDetails: ChangeDetail[] = [];
    const changeSummaries: string[] = [];
    const relLinks: RelationshipLink[] = [];

    for (const [k, currV] of Object.entries(currVars)) {
      const prevV = prevVars[k];
      if (prevV === undefined) {
        changedVars.push(k);
        const desc = lang === 'java'
          ? `Variable '${k}' declared and initialized to ${formatVal(currV)}`
          : `New variable created: ${k} = ${formatVal(currV)}`;
        changeDetails.push({
          varName: k,
          type: 'created',
          newValue: currV,
          description: desc
        });
        changeSummaries.push(`Variable created: ${k} = ${formatVal(currV)}`);
      } else {
        const currJSON = JSON.stringify(currV);
        const prevJSON = JSON.stringify(prevV);
        if (currJSON !== prevJSON) {
          changedVars.push(k);
          if (Array.isArray(currV) && Array.isArray(prevV)) {
            if (currV.length > prevV.length) {
              const addedIdx = currV.length - 1;
              const addedVal = currV[addedIdx];
              changeDetails.push({
                varName: k,
                type: 'element_added',
                targetKey: addedIdx,
                newValue: addedVal,
                description: `${k}: + ${formatVal(addedVal)} (index ${addedIdx})`
              });
              changeSummaries.push(`Array element added: ${k}[${addedIdx}] = ${formatVal(addedVal)}`);
            } else if (currV.length === prevV.length) {
              for (let i = 0; i < currV.length; i++) {
                if (JSON.stringify(currV[i]) !== JSON.stringify(prevV[i])) {
                  changeDetails.push({
                    varName: k,
                    type: 'element_updated',
                    targetKey: i,
                    prevValue: prevV[i],
                    newValue: currV[i],
                    description: `${k}[${i}]: ${formatVal(prevV[i])} → ${formatVal(currV[i])}`
                  });
                  changeSummaries.push(`Array element updated: ${k}[${i}] = ${formatVal(prevV[i])} → ${formatVal(currV[i])}`);
                }
              }
            } else {
              changeDetails.push({
                varName: k,
                type: 'element_removed',
                description: `${k}: element removed`
              });
              changeSummaries.push(`Array element removed: ${k}`);
            }
          } else {
            changeDetails.push({
              varName: k,
              type: 'updated',
              prevValue: prevV,
              newValue: currV,
              description: `${k}: ${formatVal(prevV)} → ${formatVal(currV)}`
            });
            changeSummaries.push(`Variable updated: ${k} = ${formatVal(prevV)} → ${formatVal(currV)}`);
          }
        }
      }
    }

    if (lang === 'java' && codeTrim.includes('.length')) {
      const match = codeTrim.match(/(\w+)\s*=\s*(\w+)\.length/);
      if (match) {
        const [, target, src] = match;
        const val = currVars[target];
        relLinks.push({
          from: src,
          label: `${src}.length = ${val}`,
          to: target
        });
      }
    } else if (codeTrim.includes('len(')) {
      const match = codeTrim.match(/(\w+)\s*=\s*len\(\s*(\w+)\s*\)/);
      if (match) {
        const [, target, src] = match;
        const val = currVars[target];
        relLinks.push({
          from: src,
          label: `len(${src}) = ${val}`,
          to: target
        });
      }
    } else if (codeTrim.includes('=')) {
      const [lhs, rhs] = codeTrim.split('=').map(s => s.trim());
      for (const k of Object.keys(currVars)) {
        if (rhs && rhs.includes(k) && k !== lhs) {
          relLinks.push({
            from: k,
            label: `used in ${lhs}`,
            to: lhs
          });
        }
      }
    }

    let opType = step.operationType || 'EXECUTION';
    if (!step.operationType) {
      if (codeTrim.includes('.append(') || codeTrim.includes('.push(') || codeTrim.includes('.add(')) {
        opType = 'ARRAY INSERTION';
      } else if (/\w+\[.*\]\s*=/.test(codeTrim)) {
        opType = 'ARRAY UPDATE';
      } else if (codeTrim.startsWith('for ') || codeTrim.startsWith('while ') || codeTrim.includes('for(')) {
        opType = 'LOOP';
      } else if (codeTrim.startsWith('if ') || codeTrim.startsWith('elif ') || codeTrim.startsWith('else')) {
        opType = 'CONDITION';
      } else if (codeTrim.includes('print') || codeTrim.includes('System.out')) {
        opType = 'OUTPUT';
      } else if (changedVars.length > 0) {
        const firstVar = changedVars[0];
        if (prevVars[firstVar] === undefined) {
          opType = 'VARIABLE CREATION';
        } else {
          opType = 'ASSIGNMENT';
        }
      }
    }

    const whatChangedText = changeSummaries.length > 0
      ? changeSummaries.join('\n')
      : 'No state changes in this step.';

    let whatHappened = `Executed statement: ${codeTrim}`;
    let whyItHappened = `The ${runtimeName} evaluated this line according to ${langName} language semantics.`;
    let whyDetails = `Line ${step.line}: '${codeTrim}' was evaluated in ${langName}.`;

    if (opType === 'ARRAY INSERTION') {
      whatHappened = 'Added element to array/collection.';
      whyItHappened = 'Inserts new item at the end of sequence, expanding its element count.';
      whyDetails = `In ${langName}, collection insertion methods append elements to dynamic storage.`;
    } else if (opType === 'ARRAY UPDATE') {
      whatHappened = 'Updated element at target index.';
      whyItHappened = 'Positional indexing overwrites the value stored at specified array offset.';
      whyDetails = `In ${langName}, arrays use zero-based indexing for positional element modification.`;
    } else if (opType === 'VARIABLE CREATION') {
      whatHappened = 'Created new variable in active scope.';
      whyItHappened = 'Binds variable identifier to evaluated expression value.';
      whyDetails = lang === 'java'
        ? 'In Java, variable declaration allocates stack storage and binds initial value.'
        : 'In Python, assignments evaluate right-hand expressions and bind symbol references in active scope.';
    }

    const diff: ExecutionDiff = step.diff || {
      changedVars,
      changes: changeDetails,
      summary: whatChangedText
    };

    const explanation: StepExplanation = step.explanation || {
      whatHappened,
      whyItHappened,
      whatChangedText,
      valuesInvolved: currVars
    };

    return {
      ...step,
      operationType: opType,
      diff,
      explanation,
      whyDetails: step.whyDetails || whyDetails,
      relationshipFlow: step.relationshipFlow || relLinks
    };
  });
}
