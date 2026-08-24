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

export function enrichStepClientSide(steps: ExecutionStep[]): ExecutionStep[] {
  return steps.map((step, idx) => {
    // If backend already provided rich fields, use them
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
          whatHappened: 'Program execution started.',
          whyItHappened: 'Setting up execution environment and initial memory state.',
          whatChangedText: 'Initial state ready.',
          valuesInvolved: step.variables || {}
        },
        whyDetails: step.whyDetails || 'The interpreter begins execution from line 1, initializing global variables and imports.'
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
        changeDetails.push({
          varName: k,
          type: 'created',
          newValue: currV,
          description: `New variable created: ${k} = ${formatVal(currV)}`
        });
        changeSummaries.push(`New variable created\n\n${k}\n${formatVal(currV)}`);
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
              changeSummaries.push(`Array element added\n\n${k}[${addedIdx}]\n+ ${formatVal(addedVal)}`);
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
                  changeSummaries.push(`Array element updated\n\n${k}[${i}]\n\n${formatVal(prevV[i])} → ${formatVal(currV[i])}`);
                }
              }
            } else {
              changeDetails.push({
                varName: k,
                type: 'element_removed',
                description: `${k}: element removed`
              });
              changeSummaries.push(`Array element removed\n\n${k}`);
            }
          } else {
            changeDetails.push({
              varName: k,
              type: 'updated',
              prevValue: prevV,
              newValue: currV,
              description: `${k}: ${formatVal(prevV)} → ${formatVal(currV)}`
            });

            if (['i', 'j', 'k', 'idx', 'index', 'count'].includes(k)) {
              changeSummaries.push(`Loop variable updated\n\n${k}\n${formatVal(prevV)} → ${formatVal(currV)}`);
            } else {
              changeSummaries.push(`Variable updated\n\n${k}\n${formatVal(prevV)} → ${formatVal(currV)}`);
            }
          }
        }
      }
    }

    // Detect relationships e.g. count = len(arr)
    if (codeTrim.includes('len(')) {
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

    // Determine operation type
    let opType = step.operationType || 'EXECUTION';
    if (!step.operationType) {
      if (codeTrim.includes('.append(') || codeTrim.includes('.push(') || codeTrim.includes('.add(') || codeTrim.includes('.enqueue(')) {
        opType = 'ARRAY INSERTION';
      } else if (/\w+\[.*\]\s*=/.test(codeTrim)) {
        opType = 'ARRAY UPDATE';
      } else if (codeTrim.startsWith('for ') || codeTrim.startsWith('while ')) {
        opType = 'LOOP';
      } else if (codeTrim.startsWith('if ') || codeTrim.startsWith('elif ') || codeTrim.startsWith('else')) {
        opType = 'CONDITION';
      } else if (codeTrim.includes('print(') || codeTrim.includes('System.out')) {
        opType = 'OUTPUT';
      } else if (codeTrim.includes('len(')) {
        opType = 'CALCULATION / ASSIGNMENT';
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
      ? changeSummaries.join('\n\n')
      : 'No state changes in this step.';

    let whatHappened = `Executing: ${codeTrim}`;
    let whyItHappened = 'Python executed this line to update program state in memory.';
    let whyDetails = `Line ${step.line}: '${codeTrim}' was evaluated by the runtime interpreter.`;

    if (opType === 'ARRAY INSERTION') {
      whatHappened = 'Appended new element to array.';
      whyItHappened = 'The .append() function appends an item to the end of the list, incrementing its length.';
      whyDetails = 'Python lists store elements sequentially in dynamic contiguous memory buffers. append() inserts at index len(arr) - 1.';
    } else if (opType === 'ARRAY UPDATE') {
      whatHappened = 'Updated element at specified index.';
      whyItHappened = 'Positional indexing overwrites the existing value at that memory position.';
      whyDetails = 'Python lists use zero-based indexing:\n• Index 0 → 1st item\n• Index 1 → 2nd item\n• Index 2 → 3rd item\n\nAssigning to arr[i] replaces the value at index i.';
    } else if (opType === 'CALCULATION / ASSIGNMENT') {
      whatHappened = 'Calculated length or expression value.';
      whyItHappened = 'Evaluates right-hand side calculation and binds the numeric result to target variable.';
      whyDetails = 'len(arr) inspects the internal item counter of the object and evaluates to the total number of items.';
    } else if (opType === 'VARIABLE CREATION') {
      whatHappened = 'Created new variable.';
      whyItHappened = 'Initializes symbol reference in variable lookup table bound to evaluated value.';
      whyDetails = 'Variables are created on first assignment. Python manages memory automatically.';
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
