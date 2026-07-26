import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, ChevronLeft, ChevronRight, Home, Play, Star, Zap, 
  CheckCircle2, Brain, Code2, LayoutDashboard, Database, 
  Lock, ArrowRight, Lightbulb, Info, HelpCircle, Menu, BookMarked
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { COURSES, Topic } from '../data/courses';
import { PythonSidebar } from '../components/PythonSidebar';
import { PYTHON_CURRICULUM, getFlattenedNavItems, NavItem } from '../data/pythonCurriculum';
import { PYTHON_LESSONS } from '../data/pythonLessons';
import { DsSidebar } from '../components/DsSidebar';
import { DsIntroWidget } from '../components/DsIntroWidget';
import { ComplexityAnalysisWidget } from '../components/ComplexityAnalysisWidget';
import { ArrayStudioWidget } from '../components/ArrayStudioWidget';
import { LinkedListStudioWidget } from '../components/LinkedListStudioWidget';
import { StackStudioWidget } from '../components/StackStudioWidget';
import { QueueStudioWidget } from '../components/QueueStudioWidget';
import { HashTableStudioWidget } from '../components/HashTableStudioWidget';
import { SearchStudioWidget } from '../components/SearchStudioWidget';
import { SortingStudioWidget } from '../components/SortingStudioWidget';
import { RecursionStudioWidget } from '../components/RecursionStudioWidget';
import { TreeStudioWidget } from '../components/TreeStudioWidget';
import { HeapStudioWidget } from '../components/HeapStudioWidget';
import { GraphStudioWidget } from '../components/GraphStudioWidget';
import { DATA_STRUCTURES_CURRICULUM, getDsFlattenedNavItems } from '../data/dsCurriculum';
import { DS_LESSONS } from '../data/dsLessons';
import { QuickCheckQuestionCard } from '../components/QuickCheckQuestionCard';

import Editor from '@monaco-editor/react';
import VisualizationPanel from '../components/VisualizationPanel';
import { executeCode } from '../api';
import { InputCollectionModal } from '../components/InputCollectionModal';
import { ComparisonExplorerWidget } from '../components/ComparisonExplorerWidget';
import { LogicExplorerWidget } from '../components/LogicExplorerWidget';
import { MembershipExplorerWidget } from '../components/MembershipExplorerWidget';
import { IdentityExplorerWidget } from '../components/IdentityExplorerWidget';
import { ExpressionFlowLabWidget } from '../components/ExpressionFlowLabWidget';
import { BooleanFlowLabWidget } from '../components/BooleanFlowLabWidget';
import { IfDecisionFlowWidget } from '../components/IfDecisionFlowWidget';
import { IfElseFlowWidget } from '../components/IfElseFlowWidget';
import { ElifBranchLabWidget } from '../components/ElifBranchLabWidget';
import { NestedDecisionLabWidget } from '../components/NestedDecisionLabWidget';
import { MatchRouterLabWidget } from '../components/MatchRouterLabWidget';
import { WhileExecutionLabWidget } from '../components/WhileExecutionLabWidget';
import { InfiniteLoopSafetyWidget } from '../components/InfiniteLoopSafetyWidget';
import { ForLoopFlowWidget } from '../components/ForLoopFlowWidget';
import { RangeExplorerWidget } from '../components/RangeExplorerWidget';
import { LoopControlLabWidget } from '../components/LoopControlLabWidget';
import { NestedLoopVisualizerWidget } from '../components/NestedLoopVisualizerWidget';
import { StringExplorerWidget } from '../components/StringExplorerWidget';
import { StringIndexingWidget } from '../components/StringIndexingWidget';
import { StringMethodsLabWidget } from '../components/StringMethodsLabWidget';
import { PythonListsVisualizerWidget } from '../components/PythonListsVisualizerWidget';
import { AccessListItemsWidget } from '../components/AccessListItemsWidget';
import { ChangeListItemsWidget } from '../components/ChangeListItemsWidget';
import { AddListItemsWidget } from '../components/AddListItemsWidget';
import { RemoveListItemsWidget } from '../components/RemoveListItemsWidget';
import { LoopListsWidget } from '../components/LoopListsWidget';
import { ListMethodsLabWidget } from '../components/ListMethodsLabWidget';
import { ListComprehensionsWidget } from '../components/ListComprehensionsWidget';
import { PythonTuplesWidget } from '../components/PythonTuplesWidget';
import { PythonSetsWidget } from '../components/PythonSetsWidget';
import { PythonDictionariesWidget } from '../components/PythonDictionariesWidget';
import { PythonMutabilityWidget } from '../components/PythonMutabilityWidget';
import { DefaultParamsWidget } from '../components/DefaultParamsWidget';
import { ArgsKwargsWidget } from '../components/ArgsKwargsWidget';
import { ReturnScopeWidget } from '../components/ReturnScopeWidget';
import { LambdaWidget } from '../components/LambdaWidget';
import { RecursionWidget } from '../components/RecursionWidget';
import { PythonErrorsWidget } from '../components/PythonErrorsWidget';
import { PythonDebuggingWidget } from '../components/PythonDebuggingWidget';
import { ExceptionHandlingWidget } from '../components/ExceptionHandlingWidget';








import { StringFormattingLabWidget } from '../components/StringFormattingLabWidget';
import { StringImmutabilityWidget } from '../components/StringImmutabilityWidget';

import { StringSlicingWidget } from '../components/StringSlicingWidget';





import { ExecutionStep } from '../types';

const detectInputsInCode = (codeText: string, lang: string): string[] => {
  const prompts: string[] = [];
  if (lang === 'python') {
    const regex = /(?:input|raw_input)\s*\(\s*(?:['"](.*?)['"])?\s*\)/g;
    let match;
    while ((match = regex.exec(codeText)) !== null) {
      prompts.push(match[1] || 'Enter Python input:');
    }
  } else if (lang === 'java') {
    const scannerRegex = /\.(next|nextLine|nextInt|nextDouble|nextFloat|nextLong|nextShort|nextBoolean|read|readLine)\s*\(/g;
    const consoleRegex = /System\.console\(\)\.read/g;
    let match;
    let count = 0;
    while ((match = scannerRegex.exec(codeText)) !== null) {
      count++;
    }
    while ((match = consoleRegex.exec(codeText)) !== null) {
      count++;
    }

    const printRegex = /System\.out\.print(?:ln)?\s*\(\s*["'](.*?)["']\s*\)/g;
    const printMatches: string[] = [];
    while ((match = printRegex.exec(codeText)) !== null) {
      printMatches.push(match[1]);
    }

    for (let i = 0; i < count; i++) {
      prompts.push(printMatches[i] || `Enter Java input #${i + 1}:`);
    }
  }
  return prompts;
};

const parseInlineStyles = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="text-blue-400 font-bold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="bg-blue-950/80 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/20 font-mono text-xs mx-0.5">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
};

const renderTableCellContent = (cell: string) => {
  const parts = cell.split(/\\n|\n/);
  if (parts.length > 1) {
    return (
      <div className="space-y-1">
        {parts.map((p, idx) => (
          <div key={idx} className="leading-tight">{parseInlineStyles(p.trim())}</div>
        ))}
      </div>
    );
  }
  return parseInlineStyles(cell.trim());
};

const renderMarkdown = (text: string) => {
  if (!text) return null;
  const lines = text.split('\n');
  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockContent: string[] = [];

  let currentTableRows: string[][] = [];
  let inTableBlock = false;

  const elements: React.ReactNode[] = [];

  const flushTable = (tableKey: string) => {
    if (currentTableRows.length > 0) {
      const headers = currentTableRows[0];
      const dataRows = currentTableRows.slice(1);
      
      elements.push(
        <div key={tableKey} className="my-6 overflow-x-auto rounded-2xl border border-blue-500/20 bg-slate-950/90 backdrop-blur-md shadow-xl shadow-blue-500/5">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-blue-500/20 bg-blue-950/60 text-blue-300 uppercase font-bold text-[11px] tracking-wider">
                {headers.map((h, hIdx) => (
                  <th key={hIdx} className="px-4 py-3.5 whitespace-nowrap border-r border-blue-500/10 last:border-r-0">
                    {parseInlineStyles(h.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-blue-500/10 transition-colors odd:bg-transparent even:bg-white/[0.02]">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3.5 text-gray-300 align-middle border-r border-white/5 last:border-r-0">
                      {renderTableCellContent(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTableRows = [];
      inTableBlock = false;
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      if (inTableBlock) flushTable(`table-${idx}`);
      if (inCodeBlock) {
        const fullContent = codeBlockContent.join('\n');
        if (codeBlockLang === 'comparison-explorer') {
          elements.push(<ComparisonExplorerWidget key={`explorer-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'logic-explorer') {
          elements.push(<LogicExplorerWidget key={`logic-explorer-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'membership-explorer') {
          elements.push(<MembershipExplorerWidget key={`membership-explorer-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'identity-explorer') {
          elements.push(<IdentityExplorerWidget key={`identity-explorer-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'expression-flow-lab') {
          elements.push(<ExpressionFlowLabWidget key={`expression-flow-lab-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'boolean-flow-lab') {
          elements.push(<BooleanFlowLabWidget key={`boolean-flow-lab-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'if-decision-flow') {
          elements.push(<IfDecisionFlowWidget key={`if-decision-flow-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'if-else-flow') {
          elements.push(<IfElseFlowWidget key={`if-else-flow-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'elif-branch-lab') {
          elements.push(<ElifBranchLabWidget key={`elif-branch-lab-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'nested-decision-lab') {
          elements.push(<NestedDecisionLabWidget key={`nested-decision-lab-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
                                        if (codeBlockLang === 'nested-loop-visualizer' || codeBlockLang === 'nested-loop-lab') {
          elements.push(<NestedLoopVisualizerWidget key={`nested-loop-visualizer-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
                                                                                                                                                                                                if (codeBlockLang === 'graph-studio-widget' || codeBlockLang === 'introduction-to-graphs-lab' || codeBlockLang === 'graph-terminology-lab' || codeBlockLang === 'types-of-graphs-lab' || codeBlockLang === 'graph-representation-lab' || codeBlockLang === 'adjacency-matrix-lab' || codeBlockLang === 'adjacency-list-lab' || codeBlockLang === 'breadth-first-search-lab' || codeBlockLang === 'depth-first-search-lab' || codeBlockLang === 'bfs-vs-dfs-lab' || codeBlockLang === 'connected-components-lab' || codeBlockLang === 'cycle-detection-lab' || codeBlockLang === 'graph-applications-lab' || codeBlockLang === 'graph-complexity-lab') {
          elements.push(<GraphStudioWidget key={`graph-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'heap-studio-widget' || codeBlockLang === 'introduction-to-heaps-lab' || codeBlockLang === 'heap-properties-lab' || codeBlockLang === 'min-heap-lab' || codeBlockLang === 'max-heap-lab' || codeBlockLang === 'array-representation-of-heap-lab' || codeBlockLang === 'heap-insertion-lab' || codeBlockLang === 'heap-deletion-lab' || codeBlockLang === 'heapify-lab' || codeBlockLang === 'building-a-heap-lab' || codeBlockLang === 'heap-sort-lab' || codeBlockLang === 'heap-complexity-lab') {
          elements.push(<HeapStudioWidget key={`heap-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'tree-studio-widget' || codeBlockLang === 'introduction-to-trees-lab' || codeBlockLang === 'tree-terminology-lab' || codeBlockLang === 'types-of-trees-lab' || codeBlockLang === 'binary-trees-lab' || codeBlockLang === 'binary-search-trees-lab' || codeBlockLang === 'bst-insertion-lab' || codeBlockLang === 'bst-searching-lab' || codeBlockLang === 'bst-deletion-lab' || codeBlockLang === 'tree-traversals-lab' || codeBlockLang === 'preorder-traversal-lab' || codeBlockLang === 'inorder-traversal-lab' || codeBlockLang === 'postorder-traversal-lab' || codeBlockLang === 'level-order-traversal-lab' || codeBlockLang === 'tree-complexity-lab') {
          elements.push(<TreeStudioWidget key={`tree-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'recursion-studio-widget' || codeBlockLang === 'introduction-to-recursion-lab' || codeBlockLang === 'base-case-and-recursive-case-lab' || codeBlockLang === 'how-recursion-works-lab' || codeBlockLang === 'call-stack-in-recursion-lab' || codeBlockLang === 'recursive-array-traversal-lab' || codeBlockLang === 'recursive-searching-lab' || codeBlockLang === 'recursion-with-linked-lists-lab' || codeBlockLang === 'recursion-with-trees-lab' || codeBlockLang === 'recursion-vs-iteration-lab' || codeBlockLang === 'recursion-complexity-lab') {
          elements.push(<RecursionStudioWidget key={`recursion-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'sorting-studio-widget' || codeBlockLang === 'introduction-to-sorting-lab' || codeBlockLang === 'bubble-sort-lab' || codeBlockLang === 'bubble-sort-implementation-lab' || codeBlockLang === 'selection-sort-lab' || codeBlockLang === 'selection-sort-implementation-lab' || codeBlockLang === 'insertion-sort-lab' || codeBlockLang === 'insertion-sort-implementation-lab' || codeBlockLang === 'merge-sort-lab' || codeBlockLang === 'merge-sort-implementation-lab' || codeBlockLang === 'quick-sort-lab' || codeBlockLang === 'quick-sort-implementation-lab' || codeBlockLang === 'comparison-of-sorting-algorithms-lab' || codeBlockLang === 'sorting-algorithms-complexity-lab') {
          elements.push(<SortingStudioWidget key={`sorting-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'search-studio-widget' || codeBlockLang === 'introduction-to-searching-lab' || codeBlockLang === 'linear-search-lab' || codeBlockLang === 'linear-search-implementation-lab' || codeBlockLang === 'binary-search-lab' || codeBlockLang === 'binary-search-implementation-lab' || codeBlockLang === 'iterative-vs-recursive-binary-search-lab' || codeBlockLang === 'linear-search-vs-binary-search-lab' || codeBlockLang === 'searching-algorithms-complexity-lab') {
          elements.push(<SearchStudioWidget key={`search-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'hash-table-studio-widget' || codeBlockLang === 'what-is-a-hash-table-lab' || codeBlockLang === 'hashing-concept-lab' || codeBlockLang === 'hash-functions-lab' || codeBlockLang === 'hash-table-representation-lab' || codeBlockLang === 'hash-insert-operation-lab' || codeBlockLang === 'hash-search-operation-lab' || codeBlockLang === 'hash-delete-operation-lab' || codeBlockLang === 'hash-collisions-lab' || codeBlockLang === 'collision-handling-lab' || codeBlockLang === 'hash-table-complexity-lab') {
          elements.push(<HashTableStudioWidget key={`hash-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'queue-studio-widget' || codeBlockLang === 'what-is-a-queue-lab' || codeBlockLang === 'fifo-principle-lab' || codeBlockLang === 'queue-representation-lab' || codeBlockLang === 'queue-enqueue-lab' || codeBlockLang === 'queue-dequeue-lab' || codeBlockLang === 'front-and-rear-lab' || codeBlockLang === 'queue-implementation-using-array-lab' || codeBlockLang === 'queue-implementation-using-linked-list-lab' || codeBlockLang === 'queue-applications-lab' || codeBlockLang === 'queue-complexity-lab') {
          elements.push(<QueueStudioWidget key={`queue-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'stack-studio-widget' || codeBlockLang === 'what-is-a-stack-lab' || codeBlockLang === 'lifo-principle-lab' || codeBlockLang === 'stack-representation-lab' || codeBlockLang === 'stack-push-lab' || codeBlockLang === 'stack-pop-lab' || codeBlockLang === 'stack-peek-top-lab' || codeBlockLang === 'stack-implementation-using-array-lab' || codeBlockLang === 'stack-implementation-using-linked-list-lab' || codeBlockLang === 'stack-applications-lab' || codeBlockLang === 'stack-complexity-lab') {
          elements.push(<StackStudioWidget key={`stack-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'linked-list-studio-widget' || codeBlockLang === 'what-is-a-linked-list-lab' || codeBlockLang === 'nodes-lab' || codeBlockLang === 'head-and-tail-lab' || codeBlockLang === 'singly-linked-list-lab' || codeBlockLang === 'linked-list-traversal-lab' || codeBlockLang === 'linked-list-insertion-lab' || codeBlockLang === 'linked-list-deletion-lab' || codeBlockLang === 'linked-list-searching-lab' || codeBlockLang === 'doubly-linked-list-lab' || codeBlockLang === 'circular-linked-list-lab' || codeBlockLang === 'array-vs-linked-list-lab' || codeBlockLang === 'linked-list-complexity-lab') {
          elements.push(<LinkedListStudioWidget key={`linkedlist-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'array-studio-widget' || codeBlockLang === 'what-is-an-array-lab' || codeBlockLang === 'array-representation-lab' || codeBlockLang === 'indexing-lab' || codeBlockLang === 'traversal-lab' || codeBlockLang === 'insertion-lab' || codeBlockLang === 'deletion-lab' || codeBlockLang === 'searching-lab' || codeBlockLang === 'updating-elements-lab' || codeBlockLang === 'array-complexity-lab' || codeBlockLang === 'common-array-problems-lab') {
          elements.push(<ArrayStudioWidget key={`array-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'complexity-analysis-widget' || codeBlockLang === 'time-complexity-lab' || codeBlockLang === 'space-complexity-lab' || codeBlockLang === 'big-o-notation-lab' || codeBlockLang === 'constant-time-o1-lab' || codeBlockLang === 'linear-time-on-lab' || codeBlockLang === 'logarithmic-time-ologn-lab' || codeBlockLang === 'quadratic-time-on2-lab' || codeBlockLang === 'best-average-worst-case-lab') {
          elements.push(<ComplexityAnalysisWidget key={`complexity-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'ds-intro-widget' || codeBlockLang === 'what-is-a-data-structure-lab' || codeBlockLang === 'why-data-structures-lab' || codeBlockLang === 'types-of-data-structures-lab' || codeBlockLang === 'linear-vs-non-linear-lab' || codeBlockLang === 'static-vs-dynamic-lab' || codeBlockLang === 'choosing-the-right-data-structure-lab') {
          elements.push(<DsIntroWidget key={`ds-intro-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'python-debugging-widget' || codeBlockLang === 'reading-error-messages-lab' || codeBlockLang === 'finding-the-problematic-line-lab' || codeBlockLang === 'tracing-variable-values-lab' || codeBlockLang === 'debugging-logic-lab') {
          elements.push(<PythonDebuggingWidget key={`python-debugging-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'exception-handling-widget' || codeBlockLang === 'try-block-lab' || codeBlockLang === 'except-block-lab' || codeBlockLang === 'exception-else-lab' || codeBlockLang === 'finally-block-lab' || codeBlockLang === 'raise-statement-lab') {
          elements.push(<ExceptionHandlingWidget key={`exception-handling-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'lambda-widget' || codeBlockLang === 'anonymous-functions-lab' || codeBlockLang === 'simple-lambda-expressions-lab') {
          elements.push(<LambdaWidget key={`lambda-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'recursion-widget' || codeBlockLang === 'function-calling-itself-lab' || codeBlockLang === 'base-case-lab' || codeBlockLang === 'recursive-case-lab' || codeBlockLang === 'call-stack-introduction-lab') {
          elements.push(<RecursionWidget key={`recursion-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'python-errors-widget' || codeBlockLang === 'syntax-errors-lab' || codeBlockLang === 'runtime-errors-lab' || codeBlockLang === 'logical-errors-lab') {
          elements.push(<PythonErrorsWidget key={`python-errors-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'default-params-widget' || codeBlockLang === 'default-values-lab' || codeBlockLang === 'overriding-defaults-lab') {
          elements.push(<DefaultParamsWidget key={`default-params-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'args-kwargs-widget' || codeBlockLang === 'variable-number-of-arguments-lab' || codeBlockLang === 'variable-number-of-keyword-arguments-lab') {
          elements.push(<ArgsKwargsWidget key={`args-kwargs-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'return-scope-widget' || codeBlockLang === 'return-keyword-lab' || codeBlockLang === 'returning-calculations-lab' || codeBlockLang === 'using-returned-values-lab' || codeBlockLang === 'local-scope-lab' || codeBlockLang === 'global-scope-lab' || codeBlockLang === 'variable-lifetime-lab') {
          elements.push(<ReturnScopeWidget key={`return-scope-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'python-dictionaries-widget' || codeBlockLang === 'key-value-pairs-lab' || codeBlockLang === 'access-dict-items-lab' || codeBlockLang === 'change-dict-items-lab' || codeBlockLang === 'add-dict-items-lab' || codeBlockLang === 'remove-dict-items-lab' || codeBlockLang === 'loop-dictionaries-lab' || codeBlockLang === 'dictionary-methods-lab') {
          elements.push(<PythonDictionariesWidget key={`python-dictionaries-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'python-mutability-widget' || codeBlockLang === 'mutable-vs-immutable-lab' || codeBlockLang === 'lists-vs-strings-tuples-lab' || codeBlockLang === 'understanding-changes-to-data-lab') {
          elements.push(<PythonMutabilityWidget key={`python-mutability-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'python-tuples-widget' || codeBlockLang === 'creating-tuples-lab' || codeBlockLang === 'accessing-tuples-lab' || codeBlockLang === 'tuple-immutability-lab' || codeBlockLang === 'tuple-unpacking-lab' || codeBlockLang === 'looping-tuples-lab' || codeBlockLang === 'tuple-methods-lab') {
          elements.push(<PythonTuplesWidget key={`python-tuples-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'python-sets-widget' || codeBlockLang === 'creating-sets-lab' || codeBlockLang === 'unique-values-lab' || codeBlockLang === 'adding-set-items-lab' || codeBlockLang === 'removing-set-items-lab' || codeBlockLang === 'looping-sets-lab' || codeBlockLang === 'set-operations-lab' || codeBlockLang === 'set-methods-lab') {
          elements.push(<PythonSetsWidget key={`python-sets-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'list-methods-lab-widget' || codeBlockLang === 'sort-method-lab' || codeBlockLang === 'copy-method-lab' || codeBlockLang === 'count-method-lab' || codeBlockLang === 'index-method-lab') {
          elements.push(<ListMethodsLabWidget key={`list-methods-lab-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'list-comprehensions-widget' || codeBlockLang === 'basic-comprehension-lab' || codeBlockLang === 'conditions-in-comprehensions-lab') {
          elements.push(<ListComprehensionsWidget key={`list-comprehensions-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'add-list-items-widget' || codeBlockLang === 'append-method-lab' || codeBlockLang === 'insert-method-lab' || codeBlockLang === 'extend-method-lab') {
          elements.push(<AddListItemsWidget key={`add-list-items-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'remove-list-items-widget' || codeBlockLang === 'remove-method-lab' || codeBlockLang === 'pop-method-lab' || codeBlockLang === 'del-keyword-lab' || codeBlockLang === 'clear-method-lab') {
          elements.push(<RemoveListItemsWidget key={`remove-list-items-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'loop-lists-widget' || codeBlockLang === 'loop-lists-for-lab' || codeBlockLang === 'loop-lists-while-lab') {
          elements.push(<LoopListsWidget key={`loop-lists-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'python-lists-visualizer' || codeBlockLang === 'creating-lists-lab' || codeBlockLang === 'list-length-lab' || codeBlockLang === 'duplicate-values-lab') {
          elements.push(<PythonListsVisualizerWidget key={`python-lists-visualizer-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'access-list-items-widget' || codeBlockLang === 'list-indexing-lab' || codeBlockLang === 'list-negative-indexing-lab' || codeBlockLang === 'list-slicing-lab') {
          elements.push(<AccessListItemsWidget key={`access-list-items-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'change-list-items-widget' || codeBlockLang === 'replace-values-lab' || codeBlockLang === 'change-ranges-lab') {
          elements.push(<ChangeListItemsWidget key={`change-list-items-widget-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'string-methods-lab' || codeBlockLang === 'upper-lab' || codeBlockLang === 'lower-lab' || codeBlockLang === 'strip-lab' || codeBlockLang === 'replace-lab' || codeBlockLang === 'split-lab' || codeBlockLang === 'find-lab') {
          elements.push(<StringMethodsLabWidget key={`string-methods-lab-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'string-formatting-lab' || codeBlockLang === 'f-strings-lab' || codeBlockLang === 'formatting-values-lab') {
          elements.push(<StringFormattingLabWidget key={`string-formatting-lab-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'string-immutability-lab' || codeBlockLang === 'immutability-meaning-lab' || codeBlockLang === 'immutability-reason-lab') {
          elements.push(<StringImmutabilityWidget key={`string-immutability-lab-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'string-indexing-visualizer' || codeBlockLang === 'positive-indexing-lab' || codeBlockLang === 'negative-indexing-lab') {
          elements.push(<StringIndexingWidget key={`string-indexing-visualizer-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'string-slicing-visualizer' || codeBlockLang === 'slicing-lab' || codeBlockLang === 'slice-step-lab' || codeBlockLang === 'negative-slicing-lab') {
          elements.push(<StringSlicingWidget key={`string-slicing-visualizer-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'string-explorer' || codeBlockLang === 'quotes-lab' || codeBlockLang === 'multiline-lab') {
          elements.push(<StringExplorerWidget key={`string-explorer-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'loop-control-lab' || codeBlockLang === 'break-lab' || codeBlockLang === 'continue-lab' || codeBlockLang === 'pass-lab' || codeBlockLang === 'loop-else-lab') {
          elements.push(<LoopControlLabWidget key={`loop-control-lab-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'infinite-loop-safety') {
          elements.push(<InfiniteLoopSafetyWidget key={`infinite-loop-safety-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'for-loop-flow') {
          elements.push(<ForLoopFlowWidget key={`for-loop-flow-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'range-explorer') {
          elements.push(<RangeExplorerWidget key={`range-explorer-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'while-execution-lab' || codeBlockLang === 'while-flow-lab' || codeBlockLang === 'loop-condition-lab' || codeBlockLang === 'loop-update-lab') {
          elements.push(<WhileExecutionLabWidget key={`while-execution-lab-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        if (codeBlockLang === 'match-router-lab') {
          elements.push(<MatchRouterLabWidget key={`match-router-lab-${idx}`} />);
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLang = '';
          return;
        }
        const isDiagram = codeBlockLang === 'diagram' || fullContent.includes('LEVEL') || fullContent.includes('│') || fullContent.includes('┌') || fullContent.includes('····');
        const isError = fullContent.includes('IndentationError') || fullContent.includes('TabError');
        
        elements.push(
          <div 
            key={`code-${idx}`} 
            className={`rounded-2xl p-4 font-mono text-xs my-4 border overflow-x-auto shadow-lg transition-all ${
              isError 
                ? 'bg-red-950/40 border-red-500/30 text-red-300' 
                : isDiagram 
                  ? 'bg-slate-950/90 border-blue-500/30 text-blue-200' 
                  : 'bg-black/60 border-white/10 text-emerald-400'
            }`}
          >
            <pre className="whitespace-pre">
              {fullContent.split('\n').map((cl, clIdx) => {
                // Highlight visible dots (····)
                if (cl.includes('····')) {
                  const parts = cl.split('····');
                  return (
                    <div key={clIdx} className="leading-relaxed">
                      {parts.map((p, pIdx) => (
                        <React.Fragment key={pIdx}>
                          {pIdx > 0 && (
                            <span className="text-cyan-400 font-bold bg-cyan-950/80 px-1 py-0.5 rounded border border-cyan-500/30 select-none">
                              ····
                            </span>
                          )}
                          <span>{p}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  );
                }
                // Highlight Level markers
                if (cl.includes('LEVEL 0') || cl.includes('LEVEL 1') || cl.includes('LEVEL 2')) {
                  return (
                    <div key={clIdx} className="text-yellow-400 font-bold tracking-wider my-0.5">
                      {cl}
                    </div>
                  );
                }
                // Highlight Block status markers
                if (
                  cl.includes('ENTER BLOCK') || cl.includes('EXIT BLOCK') || cl.includes('SKIP BLOCK') || 
                  cl.includes('LEAVE BLOCK') || cl.includes('REPEAT BLOCK') || cl.includes('BLOCK START') || 
                  cl.includes('BLOCK END') || cl.includes('DEDENT')
                ) {
                  return (
                    <div key={clIdx} className="text-purple-400 font-bold tracking-wide my-0.5">
                      {cl}
                    </div>
                  );
                }
                // Highlight Structure headers
                if (cl.includes('HEADER') || cl.includes('BLOCK BODY') || cl.includes('OUTER BLOCK') || cl.includes('INNER BLOCK') || cl.includes('IF BLOCK')) {
                  return (
                    <div key={clIdx} className="text-cyan-400 font-bold tracking-wide my-0.5">
                      {cl}
                    </div>
                  );
                }
                return <div key={clIdx} className="leading-relaxed">{cl}</div>;
              })}
            </pre>
          </div>
        );
        codeBlockContent = [];
        inCodeBlock = false;
        codeBlockLang = '';
      } else {
        inCodeBlock = true;
        codeBlockLang = trimmed.replace('```', '').trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    // Markdown Table Detection
    if (trimmed.startsWith('|')) {
      const isDelimiter = /^\|[\s\-:|]+\|?$/.test(trimmed);
      if (!isDelimiter) {
        const rawCells = trimmed.split('|');
        const cells = rawCells
          .slice(1, trimmed.endsWith('|') ? -1 : undefined)
          .map(c => c.trim());
        currentTableRows.push(cells);
      }
      inTableBlock = true;
      return;
    } else if (inTableBlock) {
      flushTable(`table-${idx}`);
    }

    if (!trimmed) {
      elements.push(<div key={idx} className="h-2" />);
      return;
    }

    // Horizontal Rule / ---
    if (trimmed === '---') {
      elements.push(<hr key={idx} className="border-white/10 my-6" />);
      return;
    }

    // H1 / #
    if (trimmed.startsWith('# ')) {
      elements.push(
        <h3 key={idx} className="text-xl md:text-2xl font-bold text-white mt-8 mb-3 border-b border-white/10 pb-2 flex items-center gap-2">
          <span className="w-2 h-5 bg-blue-500 rounded-full inline-block" />
          {trimmed.replace('# ', '')}
        </h3>
      );
      return;
    }

    // H2 / ##
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h4 key={idx} className="text-lg font-semibold text-blue-400 mt-6 mb-2">
          {trimmed.replace('## ', '')}
        </h4>
      );
      return;
    }

    // H3 / ###
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h5 key={idx} className="text-base font-medium text-gray-200 mt-4 mb-1">
          {trimmed.replace('### ', '')}
        </h5>
      );
      return;
    }

    // Blockquote / >
    if (trimmed.startsWith('> ')) {
      const quoteContent = trimmed.replace(/^>\s*/, '');
      const isWarning = quoteContent.includes('❌') || quoteContent.includes('Mistake') || quoteContent.includes('MISUNDERSTANDING');
      const isSuccess = quoteContent.includes('✓') || quoteContent.includes('Correct');
      
      elements.push(
        <div key={idx} className={`p-4 rounded-2xl border-l-4 text-sm my-3 flex items-start gap-3 shadow-md ${
          isWarning 
            ? 'bg-red-500/10 border-red-500 text-red-200' 
            : isSuccess 
              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-200' 
              : 'bg-blue-500/10 border-blue-500 text-blue-200'
        }`}>
          <Lightbulb size={18} className={`shrink-0 mt-0.5 ${isWarning ? 'text-red-400' : isSuccess ? 'text-emerald-400' : 'text-blue-400'}`} />
          <div className="flex-1">{parseInlineStyles(quoteContent)}</div>
        </div>
      );
      return;
    }

    // Bullet point
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const content = trimmed.replace(/^[-*]\s*/, '');
      elements.push(
        <div key={idx} className="flex items-start gap-2 ml-4 text-sm text-gray-300 my-1">
          <span className="text-blue-500 mt-1.5 select-none font-bold text-xs">•</span>
          <span className="flex-1">{parseInlineStyles(content)}</span>
        </div>
      );
      return;
    }

    // Numbered list
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numberedMatch) {
      elements.push(
        <div key={idx} className="flex items-start gap-2.5 ml-4 text-sm text-gray-300 my-1.5">
          <span className="px-1.5 py-0.5 bg-blue-600/20 text-blue-400 rounded text-xs font-bold font-mono">
            {numberedMatch[1]}
          </span>
          <span className="flex-1">{parseInlineStyles(numberedMatch[2])}</span>
        </div>
      );
      return;
    }

    // Standard Paragraph
    elements.push(
      <p key={idx} className="text-sm text-gray-300 leading-relaxed">
        {parseInlineStyles(trimmed)}
      </p>
    );
  });

  if (inTableBlock) {
    flushTable('table-end');
  }

  return <div className="space-y-3">{elements}</div>;
};

const getSampleCodeForTopic = (topicId: string, subtopicId?: string): string => {
  if (topicId === 'py-match-case' && (subtopicId === 'match-statement' || subtopicId === 'py-mc-match' || subtopicId === 'match' || (!subtopicId && topicId === 'py-match-case'))) {
    return `day = 2\n\nmatch day:\n    case 1:\n        print("Monday")\n    case 2:\n        print("Tuesday")`;
  }
  if (topicId === 'py-match-case' && (subtopicId === 'case-statement' || subtopicId === 'py-mc-case' || subtopicId === 'case')) {
    return `day = "Saturday"\n\nmatch day:\n    case "Saturday" | "Sunday":\n        print("Weekend")\n    case "Monday":\n        print("Weekday")`;
  }
  if (topicId === 'py-match-case' && (subtopicId === 'default-case' || subtopicId === 'py-mc-default' || subtopicId === 'Default Case')) {
    return `command = "pause"\n\nprint("Command received:", command)\n\nmatch command:\n    case "start":\n        action = "Starting system"\n    case "pause":\n        action = "Pausing system"\n    case "stop":\n        action = "Stopping system"\n    case "status" | "info":\n        action = "Showing system status"\n    case _:\n        action = "Unknown command"\n\nprint(action)\nprint("Command complete")`;
  }
  if (topicId === 'py-nested-conditions' && (subtopicId === 'if-inside-if' || subtopicId === 'py-nest-inside' || subtopicId === 'if Inside if' || (!subtopicId && topicId === 'py-nested-conditions'))) {
    return `age = 20\nhas_ticket = True\n\nif age >= 18:\n    print("Age requirement passed")\n    if has_ticket:\n        print("Entry allowed")`;
  }
  if (topicId === 'py-nested-conditions' && (subtopicId === 'multiple-decision-levels' || subtopicId === 'py-nest-levels' || subtopicId === 'Multiple Decision Levels')) {
    return `age = 20\nhas_ticket = True\nseat_available = True\n\nprint("Checking entry...")\n\nif age >= 18:\n    print("Age verified")\n    if has_ticket:\n        print("Ticket verified")\n        if seat_available:\n            status = "Entry confirmed"\n            print(status)\n\nprint("Check complete")`;
  }
  if (topicId === 'py-if-elif-else' && (subtopicId === 'multiple-conditions' || subtopicId === 'py-elif-multi' || subtopicId === 'Multiple Conditions' || (!subtopicId && topicId === 'py-if-elif-else'))) {
    return `score = 75\n\nif score >= 90:\n    print("Excellent")\nelif score >= 50:\n    print("Passed")\nelse:\n    print("Failed")`;
  }
  if (topicId === 'py-if-elif-else' && (subtopicId === 'first-matching-branch' || subtopicId === 'py-elif-first' || subtopicId === 'First Matching Branch')) {
    return `score = 85\n\nprint("Checking score...")\n\nif score >= 90:\n    grade = "A"\n    print("Excellent")\nelif score >= 80:\n    grade = "B"\n    print("Great")\nelif score >= 70:\n    grade = "C"\n    print("Good")\nelif score >= 50:\n    grade = "Pass"\n    print("Passed")\nelse:\n    grade = "F"\n    print("Failed")\n\nprint("Grade:", grade)\nprint("Finished")`;
  }
  if (topicId === 'py-if-else' && (subtopicId === 'true-path' || subtopicId === 'py-ifelse-true' || subtopicId === 'True Path' || (!subtopicId && topicId === 'py-if-else'))) {
    return `score = 80\n\nif score >= 50:\n    print("Passed")\n    print("Congratulations")\nelse:\n    print("Failed")`;
  }
  if (topicId === 'py-if-else' && (subtopicId === 'false-path' || subtopicId === 'py-ifelse-false' || subtopicId === 'False Path')) {
    return `score = 40\n\nif score >= 50:\n    print("Passed")\nelse:\n    print("Failed")\n    print("Try again")`;
  }
  if (topicId === 'py-if' && (subtopicId === 'if-conditions' || subtopicId === 'py-if-cond' || subtopicId === 'Conditions' || (!subtopicId && topicId === 'py-if'))) {
    return `age = 20\n\nif age >= 18:\n    print("You are an adult.")\n    print("Welcome to CodeFlow!")`;
  }
  if (topicId === 'py-if' && (subtopicId === 'executing-a-block' || subtopicId === 'py-if-exec' || subtopicId === 'Executing a Block')) {
    return `age = 20\nhas_name = True\n\nprint("Program started")\n\nif age >= 18 and has_name:\n    print("Requirements met")\n    print("Access granted")\n\nprint("Program finished")`;
  }
  if (topicId === 'py-boolean-expressions' && (subtopicId === 'true-and-false-results' || subtopicId === 'py-bool-results' || subtopicId === 'True and False Results' || (!subtopicId && topicId === 'py-boolean-expressions'))) {
    return `age = 20\nadult = age >= 18\nprint("Age:", age)\nprint("Is adult?", adult)\nprint("Type of adult:", type(adult))`;
  }
  if (topicId === 'py-boolean-expressions' && (subtopicId === 'combining-comparisons' || subtopicId === 'py-bool-combine' || subtopicId === 'Combining Comparisons')) {
    return `age = 25\nscore = 75\nvalid = 18 <= age <= 60 and score >= 50\nprint("Age in 18-60 range & score >= 50?", valid)`;
  }
  if (topicId === 'py-boolean-expressions' && (subtopicId === 'truthiness' || subtopicId === 'py-bool-truthiness' || subtopicId === 'Truthiness')) {
    return `print("bool(0):", bool(0))\nprint("bool(10):", bool(10))\nprint("bool(''):", bool(""))\nprint("bool('Python'):", bool("Python"))\nprint("bool('False'):", bool("False"))\nprint("bool(None):", bool(None))`;
  }
  if (topicId === 'py-operator-precedence' && (subtopicId === 'evaluation-order' || subtopicId === 'py-prec-order' || subtopicId === 'Evaluation Order' || (!subtopicId && topicId === 'py-operator-precedence'))) {
    return `print("2 + 3 * 4 =", 2 + 3 * 4)\nprint("20 - 8 / 2 =", 20 - 8 / 2)\nprint("2 * 3 ** 2 =", 2 * 3 ** 2)\nprint("20 / 5 * 2 =", 20 / 5 * 2)`;
  }
  if (topicId === 'py-operator-precedence' && (subtopicId === 'parentheses-precedence' || subtopicId === 'py-prec-parens' || subtopicId === 'Parentheses')) {
    return `print("Without parens: 2 + 3 * 4 =", 2 + 3 * 4)\nprint("With parens:    (2 + 3) * 4 =", (2 + 3) * 4)\nprint("Nested parens:  (10 + (2 * 3)) / 4 =", (10 + (2 * 3)) / 4)`;
  }
  if (topicId === 'py-operator-precedence' && (subtopicId === 'combined-expressions' || subtopicId === 'py-prec-combined' || subtopicId === 'Combined Expressions')) {
    return `a = 5\nb = 3\ntext = "Python"\n\nresult = a + b * 2 >= 10 and "Py" in text\nprint("a + b * 2 >= 10 and 'Py' in text ->", result)`;
  }
  if (topicId === 'py-identity-operators' && (subtopicId === 'identity-is' || subtopicId === 'py-id-is' || subtopicId === 'is' || (!subtopicId && topicId === 'py-identity-operators'))) {
    return `a = [1, 2]\nb = a\nc = [1, 2]\n\nprint("a is b:", a is b)\nprint("a is c:", a is c)\nprint("a == c:", a == c)\n\nval = None\nprint("val is None:", val is None)`;
  }
  if (topicId === 'py-identity-operators' && (subtopicId === 'identity-is-not' || subtopicId === 'py-id-isnot' || subtopicId === 'is not')) {
    return `a = [1, 2]\nb = a\nc = [1, 2]\n\nprint("a is not c:", a is not c)\nprint("a is not b:", a is not b)\nprint("a != c:", a != c)\n\nname = "Alex"\nprint("name is not None:", name is not None)`;
  }
  if (topicId === 'py-identity-operators' && (subtopicId === 'identity-vs-equality' || subtopicId === 'py-id-vs-eq' || subtopicId === 'Identity vs Equality')) {
    return `a = [1, 2]\nb = a\nc = [1, 2]\n\nprint("VALUE EQUALITY (==):  a == c ->", a == c)\nprint("OBJECT IDENTITY (is): a is c ->", a is c)\nprint("SHARED REFERENCE (is): a is b ->", a is b)`;
  }
  if (topicId === 'py-membership-operators' && (subtopicId === 'membership-in' || subtopicId === 'py-mem-in' || subtopicId === 'in' || (!subtopicId && topicId === 'py-membership-operators'))) {
    return `word = "Python"\nprint("'y' in 'Python':", "y" in word)\nprint("'Py' in 'Python':", "Py" in word)\nprint("'p' in 'Python':", "p" in word)\nprint("'Java' in 'Python':", "Java" in word)`;
  }
  if (topicId === 'py-membership-operators' && (subtopicId === 'membership-not-in' || subtopicId === 'py-mem-notin' || subtopicId === 'not in')) {
    return `word = "Python"\nprint("'z' not in 'Python':", "z" not in word)\nprint("'Java' not in 'Python':", "Java" not in word)\nprint("'y' not in 'Python':", "y" not in word)\nprint("'python' not in 'Python':", "python" not in word)`;
  }
  if (topicId === 'py-logical-operators' && (subtopicId === 'logical-and' || subtopicId === 'py-log-and' || subtopicId === 'and' || (!subtopicId && topicId === 'py-logical-operators'))) {
    return `age = 20\nscore = 75\neligible = age >= 18 and score >= 50\n\nprint("Age:", age, "Score:", score)\nprint("Eligible?", eligible)\nprint("True and True:", True and True)\nprint("True and False:", True and False)`;
  }
  if (topicId === 'py-logical-operators' && (subtopicId === 'logical-or' || subtopicId === 'py-log-or' || subtopicId === 'or')) {
    return `score = 95\nis_special = score < 50 or score > 90\n\nprint("Score:", score)\nprint("Special score?", is_special)\nprint("False or True:", False or True)\nprint("False or False:", False or False)`;
  }
  if (topicId === 'py-logical-operators' && (subtopicId === 'logical-not' || subtopicId === 'py-log-not' || subtopicId === 'not')) {
    return `logged_in = False\nlogged_out = not logged_in\n\nprint("Logged in?", logged_in)\nprint("Logged out?", logged_out)\nprint("not (10 > 5):", not (10 > 5))\nprint("not False:", not False)`;
  }
  if (topicId === 'py-comparison-operators' && (subtopicId === 'equal' || subtopicId === 'py-cmp-eq' || (!subtopicId && topicId === 'py-comparison-operators'))) {
    return `score = 100\nsame = score == 100\nprint("Is score 100?", same)\nprint("5 == 5.0:", 5 == 5.0)\nprint("5 == '5':", 5 == "5")\nprint("'Python' == 'python':", "Python" == "python")`;
  }
  if (topicId === 'py-comparison-operators' && (subtopicId === 'not-equal' || subtopicId === 'py-cmp-neq')) {
    return `a = 10\nb = 20\ndifferent = a != b\nprint("Are 10 and 20 different?", different)\nprint("5 != 5:", 5 != 5)\nprint("5 != '5':", 5 != "5")`;
  }
  if (topicId === 'py-comparison-operators' && (subtopicId === 'greater-than' || subtopicId === 'py-cmp-gt')) {
    return `score = 80\nis_passing = score > 50\nprint("80 > 50:", is_passing)\nprint("5 > 5:", 5 > 5)\nprint("-5 > -10:", -5 > -10)`;
  }
  if (topicId === 'py-comparison-operators' && (subtopicId === 'less-than' || subtopicId === 'py-cmp-lt')) {
    return `temp = 15\nis_cold = temp < 20\nprint("15 < 20:", is_cold)\nprint("5 < 5:", 5 < 5)\nprint("-10 < -5:", -10 < -5)`;
  }
  if (topicId === 'py-comparison-operators' && (subtopicId === 'greater-than-equal' || subtopicId === 'py-cmp-gte')) {
    return `age = 18\nis_adult = age >= 18\nprint("18 >= 18:", is_adult)\nprint("10 > 10:", 10 > 10)\nprint("10 >= 10:", 10 >= 10)`;
  }
  if (topicId === 'py-comparison-operators' && (subtopicId === 'less-than-equal' || subtopicId === 'py-cmp-lte')) {
    return `items = 10\nis_valid = items <= 10\nprint("10 <= 10:", is_valid)\nprint("10 < 10:", 10 < 10)\nprint("15 <= 10:", 15 <= 10)`;
  }
  if (topicId === 'py-assignment-operators' && (subtopicId === 'plus-equal' || subtopicId === 'py-as-plus' || (!subtopicId && topicId === 'py-assignment-operators'))) {
    return `score = 10\nscore += 5\n\npoints = 20\nbonus = 10\npoints += bonus\n\nprint("score:", score)\nprint("points:", points)`;
  }
  if (topicId === 'py-assignment-operators' && (subtopicId === 'minus-equal' || subtopicId === 'py-as-minus')) {
    return `health = 100\ndamage = 25\nhealth -= damage\n\nbalance = 200\nbalance -= 50\n\nprint("health:", health)\nprint("balance:", balance)`;
  }
  if (topicId === 'py-assignment-operators' && (subtopicId === 'mul-equal' || subtopicId === 'py-as-mul')) {
    return `points = 10\npoints *= 3\n\nprice = 10\nquantity = 2\nprice *= quantity\n\nprint("points:", points)\nprint("price:", price)`;
  }
  if (topicId === 'py-assignment-operators' && (subtopicId === 'div-equal' || subtopicId === 'py-as-div')) {
    return `total = 20\ntotal /= 4\n\nx = 10\nx /= 2\n\nprint("total:", total, type(total))\nprint("x:", x, type(x))`;
  }
  if (topicId === 'py-arithmetic-operators' && (subtopicId === 'addition' || subtopicId === 'py-op-add' || (!subtopicId && topicId === 'py-arithmetic-operators'))) {
    return `a = 10\nb = 5\nresult = a + b\n\nprint("10 + 5 =", result, type(result))\nprint("10 + 2.5 =", 10 + 2.5, type(10 + 2.5))`;
  }
  if (topicId === 'py-arithmetic-operators' && (subtopicId === 'subtraction' || subtopicId === 'py-op-sub')) {
    return `balance = 100\nspent = 35\nremaining = balance - spent\n\nprint("100 - 35 =", remaining, type(remaining))\nprint("5 - 10 =", 5 - 10)`;
  }
  if (topicId === 'py-arithmetic-operators' && (subtopicId === 'multiplication' || subtopicId === 'py-op-mul')) {
    return `price = 12.50\nquantity = 3\ntotal = price * quantity\n\nprint("12.50 * 3 =", total, type(total))\nprint("5 * -2 =", 5 * -2)`;
  }
  if (topicId === 'py-arithmetic-operators' && (subtopicId === 'division' || subtopicId === 'py-op-div')) {
    return `total = 20\npeople = 4\nshare = total / people\n\nprint("20 / 4 =", share, type(share))\nprint("7 / 2 =", 7 / 2)`;
  }
  if (topicId === 'py-arithmetic-operators' && (subtopicId === 'floor-division' || subtopicId === 'py-op-floordiv')) {
    return `print("7 // 2 =", 7 // 2, type(7 // 2))\nprint("7.0 // 2 =", 7.0 // 2, type(7.0 // 2))\nprint("-7 // 2 =", -7 // 2)`;
  }
  if (topicId === 'py-arithmetic-operators' && (subtopicId === 'modulus' || subtopicId === 'py-op-mod')) {
    return `items = 17\nbox_size = 5\n\nfull_boxes = items // box_size\nleftover = items % box_size\n\nprint("Full boxes:", full_boxes)\nprint("Leftover items:", leftover)`;
  }
  if (topicId === 'py-arithmetic-operators' && (subtopicId === 'exponentiation' || subtopicId === 'py-op-exp')) {
    return `square = 5 ** 2\ncube = 2 ** 3\nneg_exp = 2 ** -1\n\nprint("5 ** 2 =", square)\nprint("2 ** 3 =", cube)\nprint("2 ** -1 =", neg_exp)`;
  }
  if (topicId === 'py-user-input' && (subtopicId === 'input-function' || subtopicId === 'py-inp-func' || (!subtopicId && topicId === 'py-user-input'))) {
    return `name = input("Enter your name: ")\nprint("Received name:", name)\nprint("Type of input:", type(name))`;
  }
  if (topicId === 'py-user-input' && (subtopicId === 'storing-user-input' || subtopicId === 'py-inp-store')) {
    return `user_name = input("Enter name: ")\nuser_city = input("Enter city: ")\n\nprint("Hello", user_name, "from", user_city)\nprint("Stored types:", type(user_name), type(user_city))`;
  }
  if (topicId === 'py-user-input' && (subtopicId === 'converting-input' || subtopicId === 'py-inp-convert')) {
    return `age_str = input("Enter age: ")\nage = int(age_str)\n\nprice = float(input("Enter item price: "))\n\nprint("Next year age:", age + 1)\nprint("Price with tax:", price + 1.5)`;
  }
  if (topicId === 'py-user-input' && (subtopicId === 'input-processing-output' || subtopicId === 'py-inp-flow')) {
    return `name = input("Enter your name: ")\nage = int(input("Enter your age: "))\n\nnext_age = age + 1\n\nprint("Hello", name)\nprint("Next year you will be", next_age)`;
  }
  if (topicId === 'py-casting' && (subtopicId === 'int-casting' || subtopicId === 'py-cast-int' || (!subtopicId && topicId === 'py-casting'))) {
    return `s = "25"\nx = int(s)\n\nf = 3.9\ny = int(f)\n\nneg_f = -3.9\nz = int(neg_f)\n\nprint("int('25'):", x, type(x))\nprint("int(3.9):", y)\nprint("int(-3.9):", z)`;
  }
  if (topicId === 'py-casting' && (subtopicId === 'float-casting' || subtopicId === 'py-cast-float')) {
    return `num = 10\nflt1 = float(num)\n\ns = "19.99"\nflt2 = float(s)\n\nsci = float("1e3")\n\nprint("float(10):", flt1, type(flt1))\nprint("float('19.99'):", flt2)\nprint("float('1e3'):", sci)`;
  }
  if (topicId === 'py-casting' && (subtopicId === 'str-casting' || subtopicId === 'py-cast-str')) {
    return `num = 100\ns1 = str(num)\n\nflt = 3.14\ns2 = str(flt)\n\nb = True\ns3 = str(b)\n\nprint(s1, type(s1))\nprint(s2, type(s2))\nprint(s3, type(s3))`;
  }
  if (topicId === 'py-casting' && (subtopicId === 'bool-casting' || subtopicId === 'py-cast-bool')) {
    return `print("bool(0):", bool(0))\nprint("bool(1):", bool(1))\nprint("bool(-5):", bool(-5))\nprint("bool(''):", bool(""))\nprint("bool('False'):", bool("False"))\nprint("bool('0'):", bool("0"))\nprint("bool(None):", bool(None))`;
  }
  if (topicId === 'py-casting' && (subtopicId === 'conversion-errors' || subtopicId === 'py-cast-errors')) {
    return `try:\n    # int('hello') raises ValueError\n    x = int("hello")\nexcept ValueError as e:\n    print("ValueError caught:", e)\n\ntry:\n    # int('3.14') raises ValueError directly\n    y = int("3.14")\nexcept ValueError as e:\n    print("ValueError caught:", e)\n\ntry:\n    # int(None) raises TypeError\n    z = int(None)\nexcept TypeError as e:\n    print("TypeError caught:", e)`;
  }
  if (topicId === 'py-numbers' && (subtopicId === 'integers' || subtopicId === 'py-num-int' || (!subtopicId && topicId === 'py-numbers'))) {
    return `score = 100\npopulation = 1_000_000\n\nprint("Score:", score, type(score))\nprint("Population:", population)`;
  }
  if (topicId === 'py-numbers' && (subtopicId === 'floating-point-numbers' || subtopicId === 'py-num-float')) {
    return `price = 19.99\nscientific = 1e3\n\nprint("Price:", price, type(price))\nprint("1e3 evaluates to:", scientific)\nprint("0.1 + 0.2 =", 0.1 + 0.2)`;
  }
  if (topicId === 'py-numbers' && (subtopicId === 'negative-numbers' || subtopicId === 'py-num-neg')) {
    return `temp = -5\nbalance = -50.25\n\nx = 10\nneg_x = -x\nneg_again = -neg_x\n\nprint("temp:", temp, "balance:", balance)\nprint("x:", x, "neg_x:", neg_x, "neg_again:", neg_again)`;
  }
  if (topicId === 'py-numbers' && (subtopicId === 'numeric-conversion' || subtopicId === 'py-num-conv')) {
    return `age_str = "18"\nage_num = int(age_str)\n\nval_float = 3.9\nval_int = int(val_float)\n\nneg_float = -3.9\nneg_int = int(neg_float)\n\nprint("age_num:", age_num, type(age_num))\nprint("int(3.9):", val_int, "int(-3.9):", neg_int)`;
  }
  if (topicId === 'py-data-types' && (subtopicId === 'understanding-values-and-types' || subtopicId === 'py-dt-values' || (!subtopicId && topicId === 'py-data-types'))) {
    return `age = 18          # int\nname = "Alex"      # str\nis_student = True  # bool\n\nprint(age, type(age))\nprint(name, type(name))`;
  }
  if (topicId === 'py-data-types' && (subtopicId === 'builtin-data-types' || subtopicId === 'builtin-data-types' || subtopicId === 'py-dt-builtin')) {
    return `text = "Python"             # str\nnumber = 42                # int\ndecimal = 3.14             # float\nis_active = True           # bool\nitems = ["apple", "banana"]# list\nempty_val = None           # NoneType\n\nprint(type(text), type(number), type(empty_val))`;
  }
  if (topicId === 'py-data-types' && (subtopicId === 'type-function' || subtopicId === 'py-dt-type')) {
    return `print(type(10))        # <class 'int'>\nprint(type(3.14))      # <class 'float'>\nprint(type("Hello"))   # <class 'str'>\nprint(type(True))      # <class 'bool'>\nprint(type(None))      # <class 'NoneType'>`;
  }
  if (topicId === 'py-data-types' && (subtopicId === 'numeric-types' || subtopicId === 'py-dt-numeric')) {
    return `x = 10         # int\ny = 10.5       # float\nz = 2 + 3j     # complex\n\nprint("x:", type(x))\nprint("y:", type(y))\nprint("z:", type(z))`;
  }
  if (topicId === 'py-data-types' && (subtopicId === 'text-type' || subtopicId === 'py-dt-text')) {
    return `s1 = "Hello Python"\ns2 = "123"\ns3 = ""\n\nprint(s1, type(s1))\nprint(s2, type(s2))\nprint("Is empty str None?", s3 == None)`;
  }
  if (topicId === 'py-data-types' && (subtopicId === 'boolean-type' || subtopicId === 'py-dt-boolean')) {
    return `is_online = True\nhas_error = False\n\nprint("Online:", is_online, type(is_online))\nprint("Comparison 5 > 3:", 5 > 3)`;
  }
  if (topicId === 'py-data-types' && (subtopicId === 'none-type' || subtopicId === 'py-dt-none')) {
    return `result = None\nprint("Value:", result)\nprint("Type:", type(result))\nprint("Is None string 'None'?", result == "None")`;
  }
  if (topicId === 'py-variables' && (subtopicId === 'creating-variables' || subtopicId === 'py-var-create' || (!subtopicId && topicId === 'py-variables'))) {
    return `name = "Alex"\nage = 18\nscore = 100\n\nprint(name)\nprint(age)\nprint(score)`;
  }
  if (topicId === 'py-variables' && (subtopicId === 'variable-names' || subtopicId === 'py-var-names')) {
    return `student_name = "Alex"\nstudent_age = 18\ntotal_score = 95\n\nprint(student_name, "is", student_age)`;
  }
  if (topicId === 'py-variables' && (subtopicId === 'assigning-values' || subtopicId === 'py-var-assign')) {
    return `price = 10\ntax = 2\ntotal = price + tax\n\nprint("Total:", total)`;
  }
  if (topicId === 'py-variables' && (subtopicId === 'reassignment' || subtopicId === 'py-var-reassign')) {
    return `score = 10\nprint("Initial:", score)\n\nscore = score + 5\nprint("Updated:", score)`;
  }
  if (topicId === 'py-variables' && (subtopicId === 'multiple-assignment' || subtopicId === 'py-var-multiple')) {
    return `x, y = 10, 20\nprint("x:", x, "y:", y)\n\na, b = 1, 2\na, b = b, a\nprint("Swapped a:", a, "b:", b)`;
  }
  if (topicId === 'py-variables' && (subtopicId === 'unpacking-values' || subtopicId === 'py-var-unpack' || subtopicId === 'py-var-unpacking')) {
    return `coordinates = (10, 20)\nx, y = coordinates\nprint("x:", x, "y:", y)\n\nfirst, *rest = [100, 200, 300, 400]\nprint("First:", first, "Rest:", rest)`;
  }
  if (topicId === 'py-variables' && (subtopicId === 'constants-convention' || subtopicId === 'py-var-constants')) {
    return `PI = 3.14159\nMAX_ATTEMPTS = 3\nTAX_RATE = 0.18\n\nprint("Max Attempts:", MAX_ATTEMPTS)`;
  }
  if (topicId === 'py-comments' && (subtopicId === 'single-line-comments' || subtopicId === 'py-com-single' || (!subtopicId && topicId === 'py-comments'))) {
    return `# Display a welcome greeting\nprint("Welcome to CodeFlow!")  # Inline comment\n\n# print("This code is commented out")\nprint("Program finished")`;
  }
  if (topicId === 'py-comments' && (subtopicId === 'writing-useful-comments' || subtopicId === 'py-com-useful')) {
    return `# Apply 10% member discount\nprice = 100 * 0.90\n\n# User must be at least 18 years old\nminimum_age = 18\n\nprint("Final Price:", price)`;
  }
  if (topicId === 'py-output' && (subtopicId === 'print-function' || subtopicId === 'py-out-print')) {
    return `print("Hello, CodeFlow!")\nprint(100)\nprint(2 + 3)`;
  }
  if (topicId === 'py-output' && (subtopicId === 'printing-text' || subtopicId === 'py-out-text')) {
    return `print("Hello Python")\nprint('Single quotes work too')\nprint("I'm learning Python")\nprint('She said "Hello"')`;
  }
  if (topicId === 'py-output' && (subtopicId === 'printing-multiple-values' || subtopicId === 'py-out-multiple')) {
    return `name = "Alex"\nage = 18\n\nprint("Name:", name, "Age:", age)\nprint("Score:", 90 + 5)`;
  }
  if (topicId === 'py-output' && (subtopicId === 'output-formatting' || subtopicId === 'py-out-formatting')) {
    return `print("2026", "07", "25", sep="-")\nprint("Python", "Java", "C++", sep=" | ")\nprint("Loading", end="...")\nprint("Done!")`;
  }
  if (topicId === 'py-output' && (subtopicId === 'f-strings-intro' || subtopicId === 'py-out-fstrings')) {
    return `name = "Alex"\nscore = 95\nprice = 19.5\n\nprint(f"{name} scored {score} points.")\nprint(f"Price: \${price:.2f}")`;
  }
  if (topicId === 'py-syntax' && (subtopicId === 'case-sensitivity' || subtopicId === 'py-syn-case' || subtopicId === 'python-case-sensitivity')) {
    return `score = 10\nScore = 20\nSCORE = 30\n\nprint("score:", score)\nprint("Score:", Score)\nprint("SCORE:", SCORE)`;
  }
  if (topicId === 'py-syntax' && (subtopicId === 'code-blocks' || subtopicId === 'py-syn-blocks' || subtopicId === 'python-code-blocks')) {
    return `outer_active = True\ninner_active = True\n\nif outer_active:\n    print("Outer block start")\n    if inner_active:\n        print("Nested inner block")\n    print("Outer block end")\n\nprint("Program finished")`;
  }
  if (topicId === 'py-syntax' && (subtopicId === 'indentation' || subtopicId === 'py-syn-indentation' || subtopicId === 'python-indentation')) {
    return `logged_in = False\n\nif logged_in:\n    print("Welcome")\n\nprint("Program finished")`;
  }
  if (topicId === 'py-variables') return `# Python Variables Example\nname = "Alice"\nage = 25\nprint(name, "is", age, "years old")`;
  if (topicId === 'py-data-types') return `# Python Data Types Example\nx = 10          # Integer\ny = 3.14        # Float\nz = "CodeFlow"   # String\nprint(type(x), type(y), type(z))`;
  if (topicId === 'py-numbers') return `# Python Numbers Example\na = 15\nb = 4\nprint("Addition:", a + b)\nprint("Division:", a / b)\nprint("Floor Division:", a // b)`;
  if (topicId === 'py-if' || topicId === 'py-if-else') return `# Decision Making Example\nscore = 85\nif score >= 80:\n    print("Grade: A")\nelse:\n    print("Keep practicing!")`;
          if (topicId === 'py-nested-loops' && (subtopicId === 'loop-inside-a-loop' || subtopicId === 'py-nl-inside' || (!subtopicId && topicId === 'py-nested-loops'))) {
    return `colors = ["Red", "Blue"]\nsizes = ["S", "M"]\n\nfor color in colors:\n    for size in sizes:\n        print(color, size)`;
  }
  if (topicId === 'py-nested-loops' && (subtopicId === 'nested-execution-order' || subtopicId === 'py-nl-order')) {
    return `for i in [1, 2]:\n    print("Outer:", i)\n    for j in ["A", "B"]:\n        print("  Inner:", j)`;
  }
                      if (topicId === 'py-debugging' && (subtopicId === 'reading-error-messages' || subtopicId === 'py-dbg-msg' || (!subtopicId && topicId === 'py-debugging'))) {
    return `try:\n    number = int("hello")\nexcept ValueError as error:\n    print("Error Type:", type(error).__name__)\n    print("Message:", error)`;
  }
  if (topicId === 'py-debugging' && (subtopicId === 'finding-the-problematic-line' || subtopicId === 'py-dbg-line')) {
    return `index = 5\nnums = [10, 20]\n# Failing line uses index=5, but root cause was line 1!\n# print(nums[index])`;
  }
  if (topicId === 'py-debugging' && (subtopicId === 'tracing-variable-values' || subtopicId === 'py-dbg-vars')) {
    return `total = 0\nfor num in [10, 20]:\n    total += num\n    print("DEBUG iteration total:", total)`;
  }
  if (topicId === 'py-debugging' && (subtopicId === 'debugging-logic' || subtopicId === 'py-dbg-logic')) {
    return `# Intended 1 to 5 inclusive:\nfor i in range(1, 6):  # Fixed stop boundary!\n    print(i, end=" ")`;
  }
  if (topicId === 'py-exception-handling' && (subtopicId === 'try-block' || subtopicId === 'py-eh-try' || (!subtopicId && topicId === 'py-exception-handling'))) {
    return `try:\n    num = int("25")\n    print("Parsed number:", num)\nexcept ValueError:\n    print("Error")`;
  }
  if (topicId === 'py-exception-handling' && (subtopicId === 'except-block' || subtopicId === 'py-eh-except')) {
    return `try:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print("Safely handled division by zero!")`;
  }
  if (topicId === 'py-exception-handling' && (subtopicId === 'exception-else' || subtopicId === 'py-eh-else')) {
    return `try:\n    num = int("25")\nexcept ValueError:\n    print("Error")\nelse:\n    print("Else executed! Number:", num)`;
  }
  if (topicId === 'py-exception-handling' && (subtopicId === 'finally-block' || subtopicId === 'py-eh-finally')) {
    return `try:\n    num = int("10")\nexcept ValueError:\n    print("Error")\nelse:\n    print("Success:", num)\nfinally:\n    print("Finally block ALWAYS runs!")`;
  }
  if (topicId === 'py-exception-handling' && (subtopicId === 'raise-statement' || subtopicId === 'py-eh-raise')) {
    return `try:\n    age = -10\n    if age < 0:\n        raise ValueError("Age cannot be negative!")\nexcept ValueError as err:\n    print("Handled raise:", err)`;
  }
  if (topicId === 'py-lambda-functions' && (subtopicId === 'anonymous-functions' || subtopicId === 'py-lmb-anon' || (!subtopicId && topicId === 'py-lambda-functions'))) {
    return `double = lambda x: x * 2\nprint("Double 5:", double(5))`;
  }
  if (topicId === 'py-lambda-functions' && (subtopicId === 'simple-lambda-expressions' || subtopicId === 'py-lmb-expr')) {
    return `add = lambda a, b: a + b\ncheck = lambda x: "Even" if x % 2 == 0 else "Odd"\nprint(add(10, 20))\nprint(check(7))`;
  }
  if (topicId === 'py-recursion' && (subtopicId === 'function-calling-itself' || subtopicId === 'py-rec-itself' || (!subtopicId && topicId === 'py-recursion'))) {
    return `def countdown(n):\n    print(n)\n    if n > 1:\n        countdown(n - 1)\n\ncountdown(3)`;
  }
  if (topicId === 'py-recursion' && (subtopicId === 'base-case' || subtopicId === 'py-rec-base')) {
    return `def countdown(n):\n    if n <= 0:  # Base Case\n        print("Blastoff!")\n        return\n    print(n)\n    countdown(n - 1)\n\ncountdown(2)`;
  }
  if (topicId === 'py-recursion' && (subtopicId === 'recursive-case' || subtopicId === 'py-rec-case')) {
    return `def factorial(n):\n    if n <= 1: return 1\n    return n * factorial(n - 1)\n\nprint("4! =", factorial(4))`;
  }
  if (topicId === 'py-recursion' && (subtopicId === 'call-stack-introduction' || subtopicId === 'py-rec-stack')) {
    return `def fact(n):\n    if n <= 1: return 1\n    return n * fact(n - 1)\n\nprint(fact(3))`;
  }
  if (topicId === 'py-errors' && (subtopicId === 'syntax-errors' || subtopicId === 'py-err-syntax' || (!subtopicId && topicId === 'py-errors'))) {
    return `# SyntaxError Example:\n# if age >= 18\n#     print("Adult")\nprint("Valid syntax compiles cleanly!")`;
  }
  if (topicId === 'py-errors' && (subtopicId === 'runtime-errors' || subtopicId === 'py-err-runtime')) {
    return `try:\n    print(10 / 0)\nexcept ZeroDivisionError as e:\n    print("Caught Runtime Error:", type(e).__name__)`;
  }
  if (topicId === 'py-errors' && (subtopicId === 'logical-errors' || subtopicId === 'py-err-logic')) {
    return `price = 10\nqty = 5\n# Intended multiplication:\ntotal = price * qty\nprint("Correct Total:", total)`;
  }
  if (topicId === 'py-default-parameters' && (subtopicId === 'default-values' || subtopicId === 'py-dp-vals' || (!subtopicId && topicId === 'py-default-parameters'))) {
    return `def greet(name="Guest", msg="Hello"):\n    print(msg, name)\n\ngreet()\ngreet("Maya")`;
  }
  if (topicId === 'py-default-parameters' && (subtopicId === 'overriding-defaults' || subtopicId === 'py-dp-override')) {
    return `def profile(name="Guest", city="Unknown"):\n    print(name, "from", city)\n\nprofile(city="Hyderabad")`;
  }
  if (topicId === 'py-args-kwargs' && (subtopicId === 'variable-number-of-arguments' || subtopicId === 'py-ak-args' || (!subtopicId && topicId === 'py-args-kwargs'))) {
    return `def show_names(*args):\n    for name in args:\n        print("Name:", name)\n\nshow_names("Alex", "Maya", "Sam")`;
  }
  if (topicId === 'py-args-kwargs' && (subtopicId === 'variable-number-of-keyword-arguments' || subtopicId === 'py-ak-kwargs')) {
    return `def profile(**kwargs):\n    for k, v in kwargs.items():\n        print(k, ":", v)\n\nprofile(name="Maya", age=22)`;
  }
  if (topicId === 'py-return-values' && (subtopicId === 'return-keyword' || subtopicId === 'py-rv-keyword' || (!subtopicId && topicId === 'py-return-values'))) {
    return `def add(a, b):\n    return a + b\n\nval = add(10, 20)\nprint("Result:", val)`;
  }
  if (topicId === 'py-return-values' && (subtopicId === 'returning-calculations' || subtopicId === 'py-rv-calc')) {
    return `def area(w, h):\n    return w * h\n\nprint("Area:", area(5, 4))`;
  }
  if (topicId === 'py-return-values' && (subtopicId === 'using-returned-values' || subtopicId === 'py-rv-use')) {
    return `def add(a, b): return a + b\ndef double(n): return n * 2\n\nval = double(add(5, 5))\nprint("Chained result:", val)`;
  }
  if (topicId === 'py-scope' && (subtopicId === 'local-scope' || subtopicId === 'py-scp-local' || (!subtopicId && topicId === 'py-scope'))) {
    return `def greet():\n    msg = "Local"\n    print(msg)\n\ngreet()`;
  }
  if (topicId === 'py-scope' && (subtopicId === 'global-scope' || subtopicId === 'py-scp-global')) {
    return `count = 0\ndef inc():\n    global count\n    count += 1\n\ninc()\nprint("Global count:", count)`;
  }
  if (topicId === 'py-scope' && (subtopicId === 'variable-lifetime' || subtopicId === 'py-scp-lifetime')) {
    return `def build():\n    data = [10, 20]\n    return data\n\nsaved_data = build()\nprint("Surviving data:", saved_data)`;
  }
  if (topicId === 'py-dictionaries' && (subtopicId === 'key-value-pairs' || subtopicId === 'py-dict-kv' || (!subtopicId && topicId === 'py-dictionaries'))) {
    return `student = {\n    "name": "Alex",\n    "age": 21,\n    "course": "Python"\n}\nprint(student)\nprint(type(student))`;
  }
  if (topicId === 'py-dictionaries' && (subtopicId === 'access-dict-items' || subtopicId === 'py-dict-access')) {
    return `student = {"name": "Alex", "age": 21}\nprint(student["name"])\nprint(student.get("city", "Unknown"))`;
  }
  if (topicId === 'py-dictionaries' && (subtopicId === 'change-dict-items' || subtopicId === 'py-dict-change')) {
    return `student = {"name": "Alex", "age": 21}\nstudent["age"] = 22\nprint(student)`;
  }
  if (topicId === 'py-dictionaries' && (subtopicId === 'add-dict-items' || subtopicId === 'py-dict-add')) {
    return `student = {"name": "Alex"}\nstudent["age"] = 21\nprint(student)`;
  }
  if (topicId === 'py-dictionaries' && (subtopicId === 'remove-dict-items' || subtopicId === 'py-dict-remove')) {
    return `student = {"name": "Alex", "age": 21}\nval = student.pop("age")\nprint("Popped value:", val)\nprint("Remaining:", student)`;
  }
  if (topicId === 'py-dictionaries' && (subtopicId === 'loop-dictionaries' || subtopicId === 'py-dict-loop')) {
    return `student = {"name": "Alex", "age": 21}\nfor k, v in student.items():\n    print(k, ":", v)`;
  }
  if (topicId === 'py-dictionaries' && (subtopicId === 'dictionary-methods' || subtopicId === 'py-dict-methods')) {
    return `student = {"name": "Alex"}\nage = student.setdefault("age", 21)\nprint("Age:", age)\nprint("Student:", student)`;
  }
  if (topicId === 'py-mutability' && (subtopicId === 'mutable-vs-immutable' || subtopicId === 'py-mut-vs' || (!subtopicId && topicId === 'py-mutability'))) {
    return `nums = [1, 2]\nnums[0] = 99\nprint("Mutable list:", nums)`;
  }
  if (topicId === 'py-mutability' && (subtopicId === 'lists-vs-strings-tuples' || subtopicId === 'py-mut-compare')) {
    return `text = "python"\nnew_text = text.upper()\nprint("Original:", text)\nprint("New:", new_text)`;
  }
  if (topicId === 'py-mutability' && (subtopicId === 'understanding-changes-to-data' || subtopicId === 'py-mut-understand')) {
    return `a = [1, 2]\nb = a\nb.append(3)\nprint("a:", a)\nprint("a is b:", a is b)`;
  }
  if (topicId === 'py-tuples' && (subtopicId === 'creating-tuples' || subtopicId === 'py-tup-create' || (!subtopicId && topicId === 'py-tuples'))) {
    return `fruits = ("apple", "banana", "mango")\nsingle = ("Python",)\nprint(fruits)\nprint(type(single))`;
  }
  if (topicId === 'py-tuples' && (subtopicId === 'accessing-tuples' || subtopicId === 'py-tup-access')) {
    return `nums = (10, 20, 30, 40)\nprint("First:", nums[0])\nprint("Slice:", nums[1:3])`;
  }
  if (topicId === 'py-tuples' && (subtopicId === 'tuple-immutability' || subtopicId === 'py-tup-immut')) {
    return `tup = (1, 2)\ntry:\n    tup[0] = 99\nexcept TypeError as e:\n    print("Caught:", type(e).__name__)`;
  }
  if (topicId === 'py-tuples' && (subtopicId === 'tuple-unpacking' || subtopicId === 'py-tup-unpack')) {
    return `person = ("Alex", 25)\nname, age = person\nprint(name, "is", age)`;
  }
  if (topicId === 'py-tuples' && (subtopicId === 'looping-tuples' || subtopicId === 'py-tup-loop')) {
    return `colors = ("red", "green", "blue")\nfor color in colors:\n    print("Color:", color)`;
  }
  if (topicId === 'py-tuples' && (subtopicId === 'tuple-methods' || subtopicId === 'py-tup-methods')) {
    return `tup = (10, 20, 10)\nprint("Count 10:", tup.count(10))\nprint("Index 20:", tup.index(20))`;
  }
  if (topicId === 'py-sets' && (subtopicId === 'creating-sets' || subtopicId === 'py-set-create' || (!subtopicId && topicId === 'py-sets'))) {
    return `fruits = {"apple", "banana", "mango"}\nempty_set = set()\nprint(type(fruits))\nprint(type(empty_set))`;
  }
  if (topicId === 'py-sets' && (subtopicId === 'unique-values' || subtopicId === 'py-set-unique')) {
    return `nums = [10, 20, 10, 30, 20]\nunique_nums = set(nums)\nprint(unique_nums)`;
  }
  if (topicId === 'py-sets' && (subtopicId === 'adding-set-items' || subtopicId === 'py-set-add')) {
    return `s = {1, 2}\ns.add(3)\ns.update([4, 5])\nprint(s)`;
  }
  if (topicId === 'py-sets' && (subtopicId === 'removing-set-items' || subtopicId === 'py-set-remove')) {
    return `s = {"apple", "banana"}\ns.discard("mango")  # Safe\nval = s.pop()       # Arbitrary item\nprint("Popped:", val)`;
  }
  if (topicId === 'py-sets' && (subtopicId === 'looping-sets' || subtopicId === 'py-set-loop')) {
    return `s = {"apple", "banana", "mango"}\nfor x in s:\n    print("Item:", x)`;
  }
  if (topicId === 'py-sets' && (subtopicId === 'set-operations' || subtopicId === 'py-set-ops')) {
    return `a = {1, 2, 3}\nb = {3, 4, 5}\nprint("Union:", a | b)\nprint("Intersection:", a & b)`;
  }
  if (topicId === 'py-sets' && (subtopicId === 'set-methods' || subtopicId === 'py-set-methods')) {
    return `a = {1, 2}\nb = {1, 2, 3}\nprint("Is subset:", a.issubset(b))\nprint("Is disjoint:", a.isdisjoint({4, 5}))`;
  }
  if (topicId === 'py-list-methods' && (subtopicId === 'sort-method' || subtopicId === 'py-lm-sort' || (!subtopicId && topicId === 'py-list-methods'))) {
    return `nums = [40, 10, 30, 20]\nnums.sort()\nprint("Ascending:", nums)\nnums.sort(reverse=True)\nprint("Descending:", nums)`;
  }
  if (topicId === 'py-list-methods' && (subtopicId === 'copy-method' || subtopicId === 'py-lm-copy')) {
    return `a = [1, 2, 3]\nb = a.copy()\nb[0] = 99\nprint("a:", a)\nprint("b:", b)`;
  }
  if (topicId === 'py-list-methods' && (subtopicId === 'count-method' || subtopicId === 'py-lm-count')) {
    return `votes = ["Yes", "No", "Yes", "Yes"]\nprint("Yes votes:", votes.count("Yes"))\nprint("No votes:", votes.count("No"))`;
  }
  if (topicId === 'py-list-methods' && (subtopicId === 'index-method' || subtopicId === 'py-lm-index')) {
    return `colors = ["red", "green", "blue", "green"]\nprint("First green at:", colors.index("green"))`;
  }
  if (topicId === 'py-list-comprehensions' && (subtopicId === 'basic-comprehension' || subtopicId === 'py-lc-basic' || (!subtopicId && topicId === 'py-list-comprehensions'))) {
    return `nums = [1, 2, 3, 4]\nsquares = [x ** 2 for x in nums]\nprint(squares)`;
  }
  if (topicId === 'py-list-comprehensions' && (subtopicId === 'conditions-in-comprehensions' || subtopicId === 'py-lc-cond')) {
    return `nums = [1, 2, 3, 4, 5, 6]\nevens = [x for x in nums if x % 2 == 0]\nprint("Evens:", evens)`;
  }
  if (topicId === 'py-add-list-items' && (subtopicId === 'append-method' || subtopicId === 'py-ali-append' || (!subtopicId && topicId === 'py-add-list-items'))) {
    return `fruits = ["apple", "banana"]\nfruits.append("mango")\nprint(fruits)`;
  }
  if (topicId === 'py-add-list-items' && (subtopicId === 'insert-method' || subtopicId === 'py-ali-insert')) {
    return `nums = [10, 30]\nnums.insert(1, 20)\nprint(nums)`;
  }
  if (topicId === 'py-add-list-items' && (subtopicId === 'extend-method' || subtopicId === 'py-ali-extend')) {
    return `nums = [1, 2]\nnums.extend([3, 4, 5])\nprint(nums)`;
  }
  if (topicId === 'py-remove-list-items' && (subtopicId === 'remove-method' || subtopicId === 'py-rli-remove' || (!subtopicId && topicId === 'py-remove-list-items'))) {
    return `nums = [10, 20, 10]\nnums.remove(10)\nprint(nums)`;
  }
  if (topicId === 'py-remove-list-items' && (subtopicId === 'pop-method' || subtopicId === 'py-rli-pop')) {
    return `colors = ["red", "green", "blue"]\nitem = colors.pop(1)\nprint("Remaining:", colors)\nprint("Popped:", item)`;
  }
  if (topicId === 'py-remove-list-items' && (subtopicId === 'del-keyword' || subtopicId === 'py-rli-del')) {
    return `nums = [10, 20, 30, 40]\ndel nums[1:3]\nprint(nums)`;
  }
  if (topicId === 'py-remove-list-items' && (subtopicId === 'clear-method' || subtopicId === 'py-rli-clear')) {
    return `items = ["A", "B", "C"]\nitems.clear()\nprint("List:", items)\nprint("Length:", len(items))`;
  }
  if (topicId === 'py-loop-lists' && (subtopicId === 'loop-lists-for' || subtopicId === 'py-ll-for' || (!subtopicId && topicId === 'py-loop-lists'))) {
    return `fruits = ["apple", "banana", "mango"]\nfor fruit in fruits:\n    print("Fruit:", fruit)`;
  }
  if (topicId === 'py-loop-lists' && (subtopicId === 'loop-lists-while' || subtopicId === 'py-ll-while')) {
    return `nums = [10, 20, 30]\ni = 0\nwhile i < len(nums):\n    print("Index", i, ":", nums[i])\n    i += 1`;
  }
  if (topicId === 'py-lists' && (subtopicId === 'creating-lists' || subtopicId === 'py-lst-create' || (!subtopicId && topicId === 'py-lists'))) {
    return `fruits = ["apple", "banana", "mango"]\ndata = ["Alex", 21, True]\n\nprint(fruits)\nprint(type(data))`;
  }
  if (topicId === 'py-lists' && (subtopicId === 'list-length' || subtopicId === 'py-lst-len')) {
    return `fruits = ["apple", "banana", "mango"]\nprint("Length:", len(fruits))`;
  }
  if (topicId === 'py-lists' && (subtopicId === 'duplicate-values' || subtopicId === 'py-lst-dup')) {
    return `votes = ["Yes", "No", "Yes", "Yes"]\nprint("Total votes:", len(votes))\nprint("Votes:", votes)`;
  }
  if (topicId === 'py-access-list-items' && (subtopicId === 'list-indexing' || subtopicId === 'py-ali-idx' || (!subtopicId && topicId === 'py-access-list-items'))) {
    return `fruits = ["apple", "banana", "mango"]\nprint("First item:", fruits[0])\nprint("Second item:", fruits[1])`;
  }
  if (topicId === 'py-access-list-items' && (subtopicId === 'list-negative-indexing' || subtopicId === 'py-ali-negidx')) {
    return `colors = ["red", "green", "blue"]\nprint("Last color:", colors[-1])\nprint("Second last:", colors[-2])`;
  }
  if (topicId === 'py-access-list-items' && (subtopicId === 'list-slicing' || subtopicId === 'py-ali-slc')) {
    return `nums = [10, 20, 30, 40]\nprint(nums[1:3])  # [20, 30]\nprint(nums[:2])   # [10, 20]`;
  }
  if (topicId === 'py-change-list-items' && (subtopicId === 'replace-values' || subtopicId === 'py-cli-replace' || (!subtopicId && topicId === 'py-change-list-items'))) {
    return `fruits = ["apple", "banana", "mango"]\nfruits[1] = "orange"\nprint(fruits)`;
  }
  if (topicId === 'py-change-list-items' && (subtopicId === 'change-ranges' || subtopicId === 'py-cli-ranges')) {
    return `nums = [10, 20, 30, 40]\nnums[1:3] = [100, 200, 300]\nprint(nums)`;
  }
  if (topicId === 'py-string-methods' && (subtopicId === 'upper-method' || subtopicId === 'py-sm-upper' || (!subtopicId && topicId === 'py-string-methods'))) {
    return `text = "python 3.14!"\nresult = text.upper()\n\nprint("Original:", text)\nprint("Uppercase:", result)`;
  }
  if (topicId === 'py-string-methods' && (subtopicId === 'lower-method' || subtopicId === 'py-sm-lower')) {
    return `msg = "HELLO WORLD 2026!"\nprint(msg.lower())`;
  }
  if (topicId === 'py-string-methods' && (subtopicId === 'strip-method' || subtopicId === 'py-sm-strip')) {
    return `raw_user = "   Alex Smith   "\nclean_user = raw_user.strip()\n\nprint("Raw:", f"'{raw_user}'")\nprint("Clean:", f"'{clean_user}'")`;
  }
  if (topicId === 'py-string-methods' && (subtopicId === 'replace-method' || subtopicId === 'py-sm-replace')) {
    return `text = "I like Java. Java is cool."\nclean = text.replace("Java", "Python")\nprint(clean)`;
  }
  if (topicId === 'py-string-methods' && (subtopicId === 'split-method' || subtopicId === 'py-sm-split')) {
    return `text = "Python,JavaScript,C++"\nlang_list = text.split(",")\n\nprint(lang_list)\nprint(type(lang_list))`;
  }
  if (topicId === 'py-string-methods' && (subtopicId === 'find-method' || subtopicId === 'py-sm-find')) {
    return `text = "Hello Python"\nprint(text.find("Python")) # 6\nprint(text.find("Java"))   # -1`;
  }
  if (topicId === 'py-string-formatting' && (subtopicId === 'f-strings' || subtopicId === 'py-sf-fstr' || (!subtopicId && topicId === 'py-string-formatting'))) {
    return `name = "Alex"\nscore = 95\n\nprint(f"Player {name} scored {score} points!")`;
  }
  if (topicId === 'py-string-formatting' && (subtopicId === 'formatting-values' || subtopicId === 'py-sf-fmt')) {
    return 'price = 1234.567\nratio = 0.85\n\nprint(f"Price: ${price:,.2f}")\nprint(f"Rate: {ratio:.0%}")';
  }
  if (topicId === 'py-string-immutability' && (subtopicId === 'what-immutable-means' || subtopicId === 'py-si-meaning' || (!subtopicId && topicId === 'py-string-immutability'))) {
    return `word = "cat"\n# word[0] = "b" -> TypeError!\nword = "dog" # Reassignment allowed\nprint(word)`;
  }
  if (topicId === 'py-string-immutability' && (subtopicId === 'why-strings-cannot-be-changed-in-place' || subtopicId === 'py-si-reason')) {
    return `word = "cat"\n# Construct new string using slicing + concatenation:\nword = "b" + word[1:]\nprint(word)`;
  }
  if (topicId === 'py-string-indexing' && (subtopicId === 'positive-indexing' || subtopicId === 'py-idx-pos' || (!subtopicId && topicId === 'py-string-indexing'))) {
    return `word = "PYTHON"\n\nprint("First letter:", word[0])\nprint("Third letter:", word[2])`;
  }
  if (topicId === 'py-string-indexing' && (subtopicId === 'negative-indexing' || subtopicId === 'py-idx-neg')) {
    return `word = "PYTHON"\n\nprint("Last letter:", word[-1])\nprint("Second last:", word[-2])`;
  }
  if (topicId === 'py-string-slicing' && (subtopicId === 'start-and-stop' || subtopicId === 'py-slc-range' || (!subtopicId && topicId === 'py-string-slicing'))) {
    return `word = "PYTHON"\n\nprint(word[1:4])  # YTH\nprint(word[:3])   # PYT\nprint(word[2:])   # THON`;
  }
  if (topicId === 'py-string-slicing' && (subtopicId === 'slice-step' || subtopicId === 'py-slc-step')) {
    return `text = "ABCDEFG"\n\nprint(text[::2])  # ACEG\nprint(text[1:6:2]) # BDF`;
  }
  if (topicId === 'py-string-slicing' && (subtopicId === 'negative-slicing' || subtopicId === 'py-slc-neg')) {
    return `word = "PYTHON"\n\nprint(word[-4:-1]) # THO\nprint(word[::-1])   # NOHTYP`;
  }
  if (topicId === 'py-strings' && (subtopicId === 'creating-strings' || subtopicId === 'py-str-create' || (!subtopicId && topicId === 'py-strings'))) {
    return `greeting = "Hello, Python!"\nage_text = "25"\n\nprint(greeting)\nprint(type(age_text))`;
  }
  if (topicId === 'py-strings' && (subtopicId === 'quotes' || subtopicId === 'py-str-quotes')) {
    return `msg1 = "I'm learning Python"\nmsg2 = 'She said "Hello"'\n\nprint(msg1)\nprint(msg2)`;
  }
  if (topicId === 'py-strings' && (subtopicId === 'multiline-strings' || subtopicId === 'py-str-multi')) {
    return 'message = """Line 1\nLine 2\nLine 3"""\n\nprint(message)';
  }
  if (topicId === 'py-break' && (subtopicId === 'leaving-a-loop-early' || subtopicId === 'py-brk-early' || (!subtopicId && topicId === 'py-break'))) {
    return `for number in range(1, 6):\n    if number == 3:\n        break\n    print(number)\nprint("Loop finished")`;
  }
  if (topicId === 'py-continue' && (subtopicId === 'skipping-an-iteration' || subtopicId === 'py-cnt-skip' || (!subtopicId && topicId === 'py-continue'))) {
    return `for number in range(1, 6):\n    if number % 2 == 0:\n        continue\n    print(number)`;
  }
  if (topicId === 'py-pass' && (subtopicId === 'empty-blocks' || subtopicId === 'py-pass-empty' || (!subtopicId && topicId === 'py-pass'))) {
    return `age = 20\nif age >= 18:\n    pass\nprint("Done")`;
  }
  if (topicId === 'py-pass' && (subtopicId === 'placeholder-statements' || subtopicId === 'py-pass-place')) {
    return `def process_data():\n    # TODO: Implement data processing\n    pass\nprocess_data()\nprint("Function defined successfully")`;
  }
  if (topicId === 'py-loop-else' && (subtopicId === 'else-with-for' || subtopicId === 'py-le-for' || (!subtopicId && topicId === 'py-loop-else'))) {
    return `numbers = [2, 4, 6]\ntarget = 5\nfor n in numbers:\n    if n == target:\n        print("Found")\n        break\nelse:\n    print("Not found")`;
  }
  if (topicId === 'py-loop-else' && (subtopicId === 'else-with-while' || subtopicId === 'py-le-while')) {
    return `count = 1\nwhile count <= 3:\n    print(count)\n    count += 1\nelse:\n    print("Completed while without break")`;
  }
  if (topicId === 'py-infinite-loops' && (subtopicId === 'termination-conditions' || subtopicId === 'py-inf-term' || (!subtopicId && topicId === 'py-infinite-loops'))) {
    return `count = 1\nwhile count <= 3:\n    print(count)\n    count += 1\nprint("Loop terminated cleanly")`;
  }
  if (topicId === 'py-infinite-loops' && (subtopicId === 'common-infinite-loop-mistakes' || subtopicId === 'py-inf-mistakes')) {
    return `x = 1\n# Corrected terminating loop:\nwhile x <= 3:\n    print(x)\n    x += 1  # State progress`;
  }
  if (topicId === 'py-for-loops' && (subtopicId === 'iterating-through-values' || subtopicId === 'py-for-iter' || (!subtopicId && topicId === 'py-for-loops'))) {
    return `colors = ["red", "blue", "green"]\nfor color in colors:\n    print(color)`;
  }
  if (topicId === 'py-for-loops' && (subtopicId === 'loop-variables' || subtopicId === 'py-for-vars')) {
    return `numbers = [1, 2, 3]\nfor number in numbers:\n    print(number * 2)`;
  }
  if (topicId === 'py-range' && (subtopicId === 'range-start' || subtopicId === 'py-rng-start' || (!subtopicId && topicId === 'py-range'))) {
    return `for i in range(2, 6):\n    print(i)`;
  }
  if (topicId === 'py-range' && (subtopicId === 'range-stop' || subtopicId === 'py-rng-stop')) {
    return `for i in range(1, 5):\n    print(i)`;
  }
  if (topicId === 'py-range' && (subtopicId === 'range-step' || subtopicId === 'py-rng-step')) {
    return `for i in range(5, 0, -1):\n    print(i)\nprint("Blastoff!")`;
  }
  if (topicId === 'py-while-loops' && (subtopicId === 'while-keyword' || subtopicId === 'py-wh-keyword' || (!subtopicId && topicId === 'py-while-loops'))) {
    return `count = 1\nwhile count <= 3:\n    print(count)\n    count += 1\nprint("Finished")`;
  }
  if (topicId === 'py-while-loops' && (subtopicId === 'loop-condition' || subtopicId === 'py-wh-condition')) {
    return `count = 1\nwhile count < 4:\n    print("Condition check:", count, "< 4")\n    count += 1\nprint("Loop finished because count reached:", count)`;
  }
  if (topicId === 'py-while-loops' && (subtopicId === 'updating-loop-variables' || subtopicId === 'py-wh-update')) {
    return `count = 1\nprint("Starting loop")\nwhile count <= 4:\n    print("Count:", count)\n    count += 1\nprint("Final count:", count)\nprint("Loop finished")`;
  }
  if (topicId === 'py-while-loops') return `# While Loop Example\ncount = 1\nwhile count <= 5:\n    print("Count is:", count)\n    count += 1`;
  if (topicId === 'py-for-loops') return `# For Loop Example\nfor i in range(1, 6):\n    print("Iteration:", i)`;
  if (topicId === 'py-strings' || topicId === 'py-string-methods') return `# String Operations Example\ntext = "  hello codeflow  "\nclean_text = text.strip().upper()\nprint(clean_text)`;
  if (topicId === 'py-lists') return `# Python List Example\nfruits = ["apple", "banana", "cherry"]\nfruits.append("orange")\nfor fruit in fruits:\n    print(fruit)`;
  if (topicId === 'py-functions') return `# Python Functions Example\ndef greet(name):\n    return "Hello " + name + "!"\n\nmessage = greet("CodeFlow Learner")\nprint(message)`;
  
  return `print("Hello, World!")`;
};

const Learn: React.FC = () => {
  const { courseId, topicId, subtopicId } = useParams<{ courseId: string; topicId?: string; subtopicId?: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const isPythonCourse = courseId === 'python' || courseId === 'python-mastery';
  const isDataStructuresCourse = courseId === 'ds' || courseId === 'data-structures';

  // Data Structures completion state
  const [completedDsLessons, setCompletedDsLessons] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('completed_ds_lessons');
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const dsFlattenedNavItems = getDsFlattenedNavItems();
  const activeDsTopicId = topicId || (isDataStructuresCourse ? 'ds-intro' : '');
  const activeDsSubtopicId = subtopicId || (isDataStructuresCourse ? 'what-is-a-data-structure' : '');

  const activeDsLesson = isDataStructuresCourse 
    ? (DS_LESSONS[`${activeDsTopicId}/${activeDsSubtopicId}`] || DS_LESSONS[activeDsSubtopicId] || DS_LESSONS['ds-intro/what-is-a-data-structure'])
    : undefined;

  const currentDsNavIndex = isDataStructuresCourse
    ? dsFlattenedNavItems.findIndex(item => item.topicId === activeDsTopicId && item.subtopicId === activeDsSubtopicId)
    : -1;

  const previousDsNavItem = currentDsNavIndex > 0 ? dsFlattenedNavItems[currentDsNavIndex - 1] : null;
  const nextDsNavItem = (currentDsNavIndex >= 0 && currentDsNavIndex < dsFlattenedNavItems.length - 1) ? dsFlattenedNavItems[currentDsNavIndex + 1] : null;

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Python Curriculum Navigation State
  const activeTopicId = topicId || (isPythonCourse ? 'py-intro' : '');
  const activeSubtopicId = subtopicId;

  // Find course data for non-python or custom slide matching
  const course = COURSES.find(c => c.id === courseId) || COURSES[0];
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const [code, setCode] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  // Input Collection States
  const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);
  const [inputPrompts, setInputPrompts] = useState<string[]>([]);

  // Calculate Python Navigation items
  const flattenedNavItems = getFlattenedNavItems();
  const currentNavIndex = isPythonCourse 
    ? flattenedNavItems.findIndex(item => item.topicId === activeTopicId && (item.subtopicId === activeSubtopicId || item.slug.endsWith(activeSubtopicId || '') || (!item.subtopicId && !activeSubtopicId)))
    : -1;

  const previousNavItem: NavItem | null = currentNavIndex > 0 ? flattenedNavItems[currentNavIndex - 1] : null;
  const nextNavItem: NavItem | null = (currentNavIndex >= 0 && currentNavIndex < flattenedNavItems.length - 1) ? flattenedNavItems[currentNavIndex + 1] : null;

  // Lookup dedicated lesson data from pythonLessons
  const lessonKey = activeSubtopicId 
    ? `${activeTopicId}/${activeSubtopicId}` 
    : activeTopicId;

  const activeLesson = isPythonCourse ? (
    PYTHON_LESSONS[lessonKey] || 
                    (activeSubtopicId === 'loop-inside-a-loop' || activeSubtopicId === 'py-nl-inside' || activeSubtopicId === 'Loop Inside a Loop' || (!activeSubtopicId && activeTopicId === 'py-nested-loops') ? PYTHON_LESSONS['py-nested-loops/loop-inside-a-loop'] : undefined) ||
    (activeSubtopicId === 'nested-execution-order' || activeSubtopicId === 'py-nl-order' || activeSubtopicId === 'Execution Order' ? PYTHON_LESSONS['py-nested-loops/nested-execution-order'] : undefined) ||
                                            (activeSubtopicId === 'reading-error-messages' || activeSubtopicId === 'py-dbg-msg' || activeSubtopicId === 'Reading Error Messages' || (!activeSubtopicId && activeTopicId === 'py-debugging') ? PYTHON_LESSONS['py-debugging/reading-error-messages'] : undefined) ||
    (activeSubtopicId === 'finding-the-problematic-line' || activeSubtopicId === 'py-dbg-line' || activeSubtopicId === 'Finding the Problematic Line' ? PYTHON_LESSONS['py-debugging/finding-the-problematic-line'] : undefined) ||
    (activeSubtopicId === 'tracing-variable-values' || activeSubtopicId === 'py-dbg-vars' || activeSubtopicId === 'Tracing Variable Values' ? PYTHON_LESSONS['py-debugging/tracing-variable-values'] : undefined) ||
    (activeSubtopicId === 'debugging-logic' || activeSubtopicId === 'py-dbg-logic' || activeSubtopicId === 'Debugging Logic' ? PYTHON_LESSONS['py-debugging/debugging-logic'] : undefined) ||
    (activeSubtopicId === 'try-block' || activeSubtopicId === 'py-eh-try' || activeSubtopicId === 'try' || (!activeSubtopicId && activeTopicId === 'py-exception-handling') ? PYTHON_LESSONS['py-exception-handling/try-block'] : undefined) ||
    (activeSubtopicId === 'except-block' || activeSubtopicId === 'py-eh-except' || activeSubtopicId === 'except' ? PYTHON_LESSONS['py-exception-handling/except-block'] : undefined) ||
    (activeSubtopicId === 'exception-else' || activeSubtopicId === 'py-eh-else' || activeSubtopicId === 'else' ? PYTHON_LESSONS['py-exception-handling/exception-else'] : undefined) ||
    (activeSubtopicId === 'finally-block' || activeSubtopicId === 'py-eh-finally' || activeSubtopicId === 'finally' ? PYTHON_LESSONS['py-exception-handling/finally-block'] : undefined) ||
    (activeSubtopicId === 'raise-statement' || activeSubtopicId === 'py-eh-raise' || activeSubtopicId === 'raise' ? PYTHON_LESSONS['py-exception-handling/raise-statement'] : undefined) ||
    (activeSubtopicId === 'anonymous-functions' || activeSubtopicId === 'py-lmb-anon' || activeSubtopicId === 'Anonymous Functions' || (!activeSubtopicId && activeTopicId === 'py-lambda-functions') ? PYTHON_LESSONS['py-lambda-functions/anonymous-functions'] : undefined) ||
    (activeSubtopicId === 'simple-lambda-expressions' || activeSubtopicId === 'py-lmb-expr' || activeSubtopicId === 'Simple Lambda Expressions' ? PYTHON_LESSONS['py-lambda-functions/simple-lambda-expressions'] : undefined) ||
    (activeSubtopicId === 'function-calling-itself' || activeSubtopicId === 'py-rec-itself' || activeSubtopicId === 'Function Calling Itself' || (!activeSubtopicId && activeTopicId === 'py-recursion') ? PYTHON_LESSONS['py-recursion/function-calling-itself'] : undefined) ||
    (activeSubtopicId === 'base-case' || activeSubtopicId === 'py-rec-base' || activeSubtopicId === 'Base Case' ? PYTHON_LESSONS['py-recursion/base-case'] : undefined) ||
    (activeSubtopicId === 'recursive-case' || activeSubtopicId === 'py-rec-case' || activeSubtopicId === 'Recursive Case' ? PYTHON_LESSONS['py-recursion/recursive-case'] : undefined) ||
    (activeSubtopicId === 'call-stack-introduction' || activeSubtopicId === 'py-rec-stack' || activeSubtopicId === 'Call Stack Introduction' ? PYTHON_LESSONS['py-recursion/call-stack-introduction'] : undefined) ||
    (activeSubtopicId === 'syntax-errors' || activeSubtopicId === 'py-err-syntax' || activeSubtopicId === 'Syntax Errors' || (!activeSubtopicId && activeTopicId === 'py-errors') ? PYTHON_LESSONS['py-errors/syntax-errors'] : undefined) ||
    (activeSubtopicId === 'runtime-errors' || activeSubtopicId === 'py-err-runtime' || activeSubtopicId === 'Runtime Errors' ? PYTHON_LESSONS['py-errors/runtime-errors'] : undefined) ||
    (activeSubtopicId === 'logical-errors' || activeSubtopicId === 'py-err-logic' || activeSubtopicId === 'Logical Errors' ? PYTHON_LESSONS['py-errors/logical-errors'] : undefined) ||
    (activeSubtopicId === 'default-values' || activeSubtopicId === 'py-dp-vals' || activeSubtopicId === 'Default Values' || (!activeSubtopicId && activeTopicId === 'py-default-parameters') ? PYTHON_LESSONS['py-default-parameters/default-values'] : undefined) ||
    (activeSubtopicId === 'overriding-defaults' || activeSubtopicId === 'py-dp-override' || activeSubtopicId === 'Overriding Defaults' ? PYTHON_LESSONS['py-default-parameters/overriding-defaults'] : undefined) ||
    (activeSubtopicId === 'variable-number-of-arguments' || activeSubtopicId === 'py-ak-args' || activeSubtopicId === 'Variable Number of Arguments (*args)' || (!activeSubtopicId && activeTopicId === 'py-args-kwargs') ? PYTHON_LESSONS['py-args-kwargs/variable-number-of-arguments'] : undefined) ||
    (activeSubtopicId === 'variable-number-of-keyword-arguments' || activeSubtopicId === 'py-ak-kwargs' || activeSubtopicId === 'Variable Number of Keyword Arguments (**kwargs)' ? PYTHON_LESSONS['py-args-kwargs/variable-number-of-keyword-arguments'] : undefined) ||
    (activeSubtopicId === 'return-keyword' || activeSubtopicId === 'py-rv-keyword' || activeSubtopicId === 'return' || (!activeSubtopicId && activeTopicId === 'py-return-values') ? PYTHON_LESSONS['py-return-values/return-keyword'] : undefined) ||
    (activeSubtopicId === 'returning-calculations' || activeSubtopicId === 'py-rv-calc' || activeSubtopicId === 'Returning Calculations' ? PYTHON_LESSONS['py-return-values/returning-calculations'] : undefined) ||
    (activeSubtopicId === 'using-returned-values' || activeSubtopicId === 'py-rv-use' || activeSubtopicId === 'Using Returned Values' ? PYTHON_LESSONS['py-return-values/using-returned-values'] : undefined) ||
    (activeSubtopicId === 'local-scope' || activeSubtopicId === 'py-scp-local' || activeSubtopicId === 'Local Scope' || (!activeSubtopicId && activeTopicId === 'py-scope') ? PYTHON_LESSONS['py-scope/local-scope'] : undefined) ||
    (activeSubtopicId === 'global-scope' || activeSubtopicId === 'py-scp-global' || activeSubtopicId === 'Global Scope' ? PYTHON_LESSONS['py-scope/global-scope'] : undefined) ||
    (activeSubtopicId === 'variable-lifetime' || activeSubtopicId === 'py-scp-lifetime' || activeSubtopicId === 'Variable Lifetime' ? PYTHON_LESSONS['py-scope/variable-lifetime'] : undefined) ||
    (activeSubtopicId === 'key-value-pairs' || activeSubtopicId === 'py-dict-kv' || activeSubtopicId === 'Key-Value Pairs' || (!activeSubtopicId && activeTopicId === 'py-dictionaries') ? PYTHON_LESSONS['py-dictionaries/key-value-pairs'] : undefined) ||
    (activeSubtopicId === 'access-dict-items' || activeSubtopicId === 'py-dict-access' || activeSubtopicId === 'Access Items' ? PYTHON_LESSONS['py-dictionaries/access-dict-items'] : undefined) ||
    (activeSubtopicId === 'change-dict-items' || activeSubtopicId === 'py-dict-change' || activeSubtopicId === 'Change Items' ? PYTHON_LESSONS['py-dictionaries/change-dict-items'] : undefined) ||
    (activeSubtopicId === 'add-dict-items' || activeSubtopicId === 'py-dict-add' || activeSubtopicId === 'Add Items' ? PYTHON_LESSONS['py-dictionaries/add-dict-items'] : undefined) ||
    (activeSubtopicId === 'remove-dict-items' || activeSubtopicId === 'py-dict-remove' || activeSubtopicId === 'Remove Items' ? PYTHON_LESSONS['py-dictionaries/remove-dict-items'] : undefined) ||
    (activeSubtopicId === 'loop-dictionaries' || activeSubtopicId === 'py-dict-loop' || activeSubtopicId === 'Loop Dictionaries' ? PYTHON_LESSONS['py-dictionaries/loop-dictionaries'] : undefined) ||
    (activeSubtopicId === 'dictionary-methods' || activeSubtopicId === 'py-dict-methods' || activeSubtopicId === 'Dictionary Methods' ? PYTHON_LESSONS['py-dictionaries/dictionary-methods'] : undefined) ||
    (activeSubtopicId === 'mutable-vs-immutable' || activeSubtopicId === 'py-mut-vs' || activeSubtopicId === 'Mutable vs Immutable' || (!activeSubtopicId && activeTopicId === 'py-mutability') ? PYTHON_LESSONS['py-mutability/mutable-vs-immutable'] : undefined) ||
    (activeSubtopicId === 'lists-vs-strings-tuples' || activeSubtopicId === 'py-mut-compare' || activeSubtopicId === 'Lists vs Strings/Tuples' ? PYTHON_LESSONS['py-mutability/lists-vs-strings-tuples'] : undefined) ||
    (activeSubtopicId === 'understanding-changes-to-data' || activeSubtopicId === 'py-mut-understand' || activeSubtopicId === 'Understanding Changes to Data' ? PYTHON_LESSONS['py-mutability/understanding-changes-to-data'] : undefined) ||
    (activeSubtopicId === 'creating-tuples' || activeSubtopicId === 'py-tup-create' || activeSubtopicId === 'Creating Tuples' || (!activeSubtopicId && activeTopicId === 'py-tuples') ? PYTHON_LESSONS['py-tuples/creating-tuples'] : undefined) ||
    (activeSubtopicId === 'accessing-tuples' || activeSubtopicId === 'py-tup-access' || activeSubtopicId === 'Accessing Tuples' ? PYTHON_LESSONS['py-tuples/accessing-tuples'] : undefined) ||
    (activeSubtopicId === 'tuple-immutability' || activeSubtopicId === 'py-tup-immut' || activeSubtopicId === 'Tuple Immutability' ? PYTHON_LESSONS['py-tuples/tuple-immutability'] : undefined) ||
    (activeSubtopicId === 'tuple-unpacking' || activeSubtopicId === 'py-tup-unpack' || activeSubtopicId === 'Tuple Unpacking' ? PYTHON_LESSONS['py-tuples/tuple-unpacking'] : undefined) ||
    (activeSubtopicId === 'looping-tuples' || activeSubtopicId === 'py-tup-loop' || activeSubtopicId === 'Looping Tuples' ? PYTHON_LESSONS['py-tuples/looping-tuples'] : undefined) ||
    (activeSubtopicId === 'tuple-methods' || activeSubtopicId === 'py-tup-methods' || activeSubtopicId === 'Tuple Methods' ? PYTHON_LESSONS['py-tuples/tuple-methods'] : undefined) ||
    (activeSubtopicId === 'creating-sets' || activeSubtopicId === 'py-set-create' || activeSubtopicId === 'Creating Sets' || (!activeSubtopicId && activeTopicId === 'py-sets') ? PYTHON_LESSONS['py-sets/creating-sets'] : undefined) ||
    (activeSubtopicId === 'unique-values' || activeSubtopicId === 'py-set-unique' || activeSubtopicId === 'Unique Values' ? PYTHON_LESSONS['py-sets/unique-values'] : undefined) ||
    (activeSubtopicId === 'adding-set-items' || activeSubtopicId === 'py-set-add' || activeSubtopicId === 'Adding Items' ? PYTHON_LESSONS['py-sets/adding-set-items'] : undefined) ||
    (activeSubtopicId === 'removing-set-items' || activeSubtopicId === 'py-set-remove' || activeSubtopicId === 'Removing Items' ? PYTHON_LESSONS['py-sets/removing-set-items'] : undefined) ||
    (activeSubtopicId === 'looping-sets' || activeSubtopicId === 'py-set-loop' || activeSubtopicId === 'Looping Sets' ? PYTHON_LESSONS['py-sets/looping-sets'] : undefined) ||
    (activeSubtopicId === 'set-operations' || activeSubtopicId === 'py-set-ops' || activeSubtopicId === 'Set Operations' ? PYTHON_LESSONS['py-sets/set-operations'] : undefined) ||
    (activeSubtopicId === 'set-methods' || activeSubtopicId === 'py-set-methods' || activeSubtopicId === 'Set Methods' ? PYTHON_LESSONS['py-sets/set-methods'] : undefined) ||
    (activeSubtopicId === 'sort-method' || activeSubtopicId === 'py-lm-sort' || activeSubtopicId === 'sort()' || (!activeSubtopicId && activeTopicId === 'py-list-methods') ? PYTHON_LESSONS['py-list-methods/sort-method'] : undefined) ||
    (activeSubtopicId === 'copy-method' || activeSubtopicId === 'py-lm-copy' || activeSubtopicId === 'copy()' ? PYTHON_LESSONS['py-list-methods/copy-method'] : undefined) ||
    (activeSubtopicId === 'count-method' || activeSubtopicId === 'py-lm-count' || activeSubtopicId === 'count()' ? PYTHON_LESSONS['py-list-methods/count-method'] : undefined) ||
    (activeSubtopicId === 'index-method' || activeSubtopicId === 'py-lm-index' || activeSubtopicId === 'index()' ? PYTHON_LESSONS['py-list-methods/index-method'] : undefined) ||
    (activeSubtopicId === 'basic-comprehension' || activeSubtopicId === 'py-lc-basic' || activeSubtopicId === 'Basic Comprehension' || (!activeSubtopicId && activeTopicId === 'py-list-comprehensions') ? PYTHON_LESSONS['py-list-comprehensions/basic-comprehension'] : undefined) ||
    (activeSubtopicId === 'conditions-in-comprehensions' || activeSubtopicId === 'py-lc-cond' || activeSubtopicId === 'Conditions in Comprehensions' ? PYTHON_LESSONS['py-list-comprehensions/conditions-in-comprehensions'] : undefined) ||
    (activeSubtopicId === 'append-method' || activeSubtopicId === 'py-ali-append' || activeSubtopicId === 'append()' || (!activeSubtopicId && activeTopicId === 'py-add-list-items') ? PYTHON_LESSONS['py-add-list-items/append-method'] : undefined) ||
    (activeSubtopicId === 'insert-method' || activeSubtopicId === 'py-ali-insert' || activeSubtopicId === 'insert()' ? PYTHON_LESSONS['py-add-list-items/insert-method'] : undefined) ||
    (activeSubtopicId === 'extend-method' || activeSubtopicId === 'py-ali-extend' || activeSubtopicId === 'extend()' ? PYTHON_LESSONS['py-add-list-items/extend-method'] : undefined) ||
    (activeSubtopicId === 'remove-method' || activeSubtopicId === 'py-rli-remove' || activeSubtopicId === 'remove()' || (!activeSubtopicId && activeTopicId === 'py-remove-list-items') ? PYTHON_LESSONS['py-remove-list-items/remove-method'] : undefined) ||
    (activeSubtopicId === 'pop-method' || activeSubtopicId === 'py-rli-pop' || activeSubtopicId === 'pop()' ? PYTHON_LESSONS['py-remove-list-items/pop-method'] : undefined) ||
    (activeSubtopicId === 'del-keyword' || activeSubtopicId === 'py-rli-del' || activeSubtopicId === 'del' ? PYTHON_LESSONS['py-remove-list-items/del-keyword'] : undefined) ||
    (activeSubtopicId === 'clear-method' || activeSubtopicId === 'py-rli-clear' || activeSubtopicId === 'clear()' ? PYTHON_LESSONS['py-remove-list-items/clear-method'] : undefined) ||
    (activeSubtopicId === 'loop-lists-for' || activeSubtopicId === 'py-ll-for' || activeSubtopicId === 'for' || (!activeSubtopicId && activeTopicId === 'py-loop-lists') ? PYTHON_LESSONS['py-loop-lists/loop-lists-for'] : undefined) ||
    (activeSubtopicId === 'loop-lists-while' || activeSubtopicId === 'py-ll-while' || activeSubtopicId === 'while' ? PYTHON_LESSONS['py-loop-lists/loop-lists-while'] : undefined) ||
    (activeSubtopicId === 'creating-lists' || activeSubtopicId === 'py-lst-create' || activeSubtopicId === 'Creating Lists' || (!activeSubtopicId && activeTopicId === 'py-lists') ? PYTHON_LESSONS['py-lists/creating-lists'] : undefined) ||
    (activeSubtopicId === 'list-length' || activeSubtopicId === 'py-lst-len' || activeSubtopicId === 'List Length' ? PYTHON_LESSONS['py-lists/list-length'] : undefined) ||
    (activeSubtopicId === 'duplicate-values' || activeSubtopicId === 'py-lst-dup' || activeSubtopicId === 'Duplicate Values' ? PYTHON_LESSONS['py-lists/duplicate-values'] : undefined) ||
    (activeSubtopicId === 'list-indexing' || activeSubtopicId === 'py-ali-idx' || activeSubtopicId === 'Indexing' || (!activeSubtopicId && activeTopicId === 'py-access-list-items') ? PYTHON_LESSONS['py-access-list-items/list-indexing'] : undefined) ||
    (activeSubtopicId === 'list-negative-indexing' || activeSubtopicId === 'py-ali-negidx' || activeSubtopicId === 'Negative Indexing' ? PYTHON_LESSONS['py-access-list-items/list-negative-indexing'] : undefined) ||
    (activeSubtopicId === 'list-slicing' || activeSubtopicId === 'py-ali-slc' || activeSubtopicId === 'Slicing' ? PYTHON_LESSONS['py-access-list-items/list-slicing'] : undefined) ||
    (activeSubtopicId === 'replace-values' || activeSubtopicId === 'py-cli-replace' || activeSubtopicId === 'Replace Values' || (!activeSubtopicId && activeTopicId === 'py-change-list-items') ? PYTHON_LESSONS['py-change-list-items/replace-values'] : undefined) ||
    (activeSubtopicId === 'change-ranges' || activeSubtopicId === 'py-cli-ranges' || activeSubtopicId === 'Change Ranges' ? PYTHON_LESSONS['py-change-list-items/change-ranges'] : undefined) ||
    (activeSubtopicId === 'upper-method' || activeSubtopicId === 'py-sm-upper' || activeSubtopicId === 'upper()' || (!activeSubtopicId && activeTopicId === 'py-string-methods') ? PYTHON_LESSONS['py-string-methods/upper-method'] : undefined) ||
    (activeSubtopicId === 'lower-method' || activeSubtopicId === 'py-sm-lower' || activeSubtopicId === 'lower()' ? PYTHON_LESSONS['py-string-methods/lower-method'] : undefined) ||
    (activeSubtopicId === 'strip-method' || activeSubtopicId === 'py-sm-strip' || activeSubtopicId === 'strip()' ? PYTHON_LESSONS['py-string-methods/strip-method'] : undefined) ||
    (activeSubtopicId === 'replace-method' || activeSubtopicId === 'py-sm-replace' || activeSubtopicId === 'replace()' ? PYTHON_LESSONS['py-string-methods/replace-method'] : undefined) ||
    (activeSubtopicId === 'split-method' || activeSubtopicId === 'py-sm-split' || activeSubtopicId === 'split()' ? PYTHON_LESSONS['py-string-methods/split-method'] : undefined) ||
    (activeSubtopicId === 'find-method' || activeSubtopicId === 'py-sm-find' || activeSubtopicId === 'find()' ? PYTHON_LESSONS['py-string-methods/find-method'] : undefined) ||
    (activeSubtopicId === 'f-strings' || activeSubtopicId === 'py-sf-fstr' || activeSubtopicId === 'f-Strings' || (!activeSubtopicId && activeTopicId === 'py-string-formatting') ? PYTHON_LESSONS['py-string-formatting/f-strings'] : undefined) ||
    (activeSubtopicId === 'formatting-values' || activeSubtopicId === 'py-sf-fmt' || activeSubtopicId === 'Formatting Values' ? PYTHON_LESSONS['py-string-formatting/formatting-values'] : undefined) ||
    (activeSubtopicId === 'what-immutable-means' || activeSubtopicId === 'py-si-meaning' || activeSubtopicId === 'What Immutable Means' || (!activeSubtopicId && activeTopicId === 'py-string-immutability') ? PYTHON_LESSONS['py-string-immutability/what-immutable-means'] : undefined) ||
    (activeSubtopicId === 'why-strings-cannot-be-changed-in-place' || activeSubtopicId === 'py-si-reason' || activeSubtopicId === 'Why Strings Cannot Be Changed in Place' || activeSubtopicId === 'Why Strings Cannot Be Changed In Place' ? PYTHON_LESSONS['py-string-immutability/why-strings-cannot-be-changed-in-place'] : undefined) ||
    (activeSubtopicId === 'positive-indexing' || activeSubtopicId === 'py-idx-pos' || activeSubtopicId === 'Positive Indexing' || (!activeSubtopicId && activeTopicId === 'py-string-indexing') ? PYTHON_LESSONS['py-string-indexing/positive-indexing'] : undefined) ||
    (activeSubtopicId === 'negative-indexing' || activeSubtopicId === 'py-idx-neg' || activeSubtopicId === 'Negative Indexing' ? PYTHON_LESSONS['py-string-indexing/negative-indexing'] : undefined) ||
    (activeSubtopicId === 'start-and-stop' || activeSubtopicId === 'py-slc-range' || activeSubtopicId === 'Start and Stop' || (!activeSubtopicId && activeTopicId === 'py-string-slicing') ? PYTHON_LESSONS['py-string-slicing/start-and-stop'] : undefined) ||
    (activeSubtopicId === 'slice-step' || activeSubtopicId === 'py-slc-step' || activeSubtopicId === 'Step' ? PYTHON_LESSONS['py-string-slicing/slice-step'] : undefined) ||
    (activeSubtopicId === 'negative-slicing' || activeSubtopicId === 'py-slc-neg' || activeSubtopicId === 'Negative Slicing' ? PYTHON_LESSONS['py-string-slicing/negative-slicing'] : undefined) ||
    (activeSubtopicId === 'creating-strings' || activeSubtopicId === 'py-str-create' || activeSubtopicId === 'Creating Strings' || (!activeSubtopicId && activeTopicId === 'py-strings') ? PYTHON_LESSONS['py-strings/creating-strings'] : undefined) ||
    (activeSubtopicId === 'quotes' || activeSubtopicId === 'py-str-quotes' || activeSubtopicId === 'Quotes' ? PYTHON_LESSONS['py-strings/quotes'] : undefined) ||
    (activeSubtopicId === 'multiline-strings' || activeSubtopicId === 'py-str-multi' || activeSubtopicId === 'Multiline Strings' ? PYTHON_LESSONS['py-strings/multiline-strings'] : undefined) ||
    (activeSubtopicId === 'leaving-a-loop-early' || activeSubtopicId === 'py-brk-early' || activeSubtopicId === 'Leaving a Loop Early' || (!activeSubtopicId && activeTopicId === 'py-break') ? PYTHON_LESSONS['py-break/leaving-a-loop-early'] : undefined) ||
    (activeSubtopicId === 'skipping-an-iteration' || activeSubtopicId === 'py-cnt-skip' || activeSubtopicId === 'Skipping an Iteration' || (!activeSubtopicId && activeTopicId === 'py-continue') ? PYTHON_LESSONS['py-continue/skipping-an-iteration'] : undefined) ||
    (activeSubtopicId === 'empty-blocks' || activeSubtopicId === 'py-pass-empty' || activeSubtopicId === 'Empty Blocks' || (!activeSubtopicId && activeTopicId === 'py-pass') ? PYTHON_LESSONS['py-pass/empty-blocks'] : undefined) ||
    (activeSubtopicId === 'placeholder-statements' || activeSubtopicId === 'py-pass-place' || activeSubtopicId === 'Placeholder Statements' ? PYTHON_LESSONS['py-pass/placeholder-statements'] : undefined) ||
    (activeSubtopicId === 'else-with-for' || activeSubtopicId === 'py-le-for' || activeSubtopicId === 'else with for' || (!activeSubtopicId && activeTopicId === 'py-loop-else') ? PYTHON_LESSONS['py-loop-else/else-with-for'] : undefined) ||
    (activeSubtopicId === 'else-with-while' || activeSubtopicId === 'py-le-while' || activeSubtopicId === 'else with while' ? PYTHON_LESSONS['py-loop-else/else-with-while'] : undefined) ||
    (activeSubtopicId === 'termination-conditions' || activeSubtopicId === 'py-inf-term' || activeSubtopicId === 'Termination Conditions' || (!activeSubtopicId && activeTopicId === 'py-infinite-loops') ? PYTHON_LESSONS['py-infinite-loops/termination-conditions'] : undefined) ||
    (activeSubtopicId === 'common-infinite-loop-mistakes' || activeSubtopicId === 'py-inf-mistakes' || activeSubtopicId === 'Common Infinite Loop Mistakes' ? PYTHON_LESSONS['py-infinite-loops/common-infinite-loop-mistakes'] : undefined) ||
    (activeSubtopicId === 'iterating-through-values' || activeSubtopicId === 'py-for-iter' || activeSubtopicId === 'Iterating Through Values' || (!activeSubtopicId && activeTopicId === 'py-for-loops') ? PYTHON_LESSONS['py-for-loops/iterating-through-values'] : undefined) ||
    (activeSubtopicId === 'loop-variables' || activeSubtopicId === 'py-for-vars' || activeSubtopicId === 'Loop Variables' ? PYTHON_LESSONS['py-for-loops/loop-variables'] : undefined) ||
    (activeSubtopicId === 'range-start' || activeSubtopicId === 'py-rng-start' || activeSubtopicId === 'Start' || (!activeSubtopicId && activeTopicId === 'py-range') ? PYTHON_LESSONS['py-range/range-start'] : undefined) ||
    (activeSubtopicId === 'range-stop' || activeSubtopicId === 'py-rng-stop' || activeSubtopicId === 'Stop' ? PYTHON_LESSONS['py-range/range-stop'] : undefined) ||
    (activeSubtopicId === 'range-step' || activeSubtopicId === 'py-rng-step' || activeSubtopicId === 'Step' ? PYTHON_LESSONS['py-range/range-step'] : undefined) ||
    (activeSubtopicId === 'while-keyword' || activeSubtopicId === 'py-wh-keyword' || activeSubtopicId === 'while' || (!activeSubtopicId && activeTopicId === 'py-while-loops') ? PYTHON_LESSONS['py-while-loops/while-keyword'] : undefined) ||
    (activeSubtopicId === 'loop-condition' || activeSubtopicId === 'py-wh-condition' || activeSubtopicId === 'Loop Condition' ? PYTHON_LESSONS['py-while-loops/loop-condition'] : undefined) ||
    (activeSubtopicId === 'updating-loop-variables' || activeSubtopicId === 'py-wh-update' || activeSubtopicId === 'Updating Loop Variables' ? PYTHON_LESSONS['py-while-loops/updating-loop-variables'] : undefined) ||
    (activeSubtopicId === 'match-statement' || activeSubtopicId === 'py-mc-match' || activeSubtopicId === 'match' || (!activeSubtopicId && activeTopicId === 'py-match-case') ? PYTHON_LESSONS['py-match-case/match-statement'] : undefined) ||
    (activeSubtopicId === 'case-statement' || activeSubtopicId === 'py-mc-case' || activeSubtopicId === 'case' ? PYTHON_LESSONS['py-match-case/case-statement'] : undefined) ||
    (activeSubtopicId === 'default-case' || activeSubtopicId === 'py-mc-default' || activeSubtopicId === 'Default Case' ? PYTHON_LESSONS['py-match-case/default-case'] : undefined) ||
    (activeSubtopicId === 'if-inside-if' || activeSubtopicId === 'py-nest-inside' || activeSubtopicId === 'if Inside if' || (!activeSubtopicId && activeTopicId === 'py-nested-conditions') ? PYTHON_LESSONS['py-nested-conditions/if-inside-if'] : undefined) ||
    (activeSubtopicId === 'multiple-decision-levels' || activeSubtopicId === 'py-nest-levels' || activeSubtopicId === 'Multiple Decision Levels' ? PYTHON_LESSONS['py-nested-conditions/multiple-decision-levels'] : undefined) ||
    (activeSubtopicId === 'multiple-conditions' || activeSubtopicId === 'py-elif-multi' || activeSubtopicId === 'Multiple Conditions' || (!activeSubtopicId && activeTopicId === 'py-if-elif-else') ? PYTHON_LESSONS['py-if-elif-else/multiple-conditions'] : undefined) ||
    (activeSubtopicId === 'first-matching-branch' || activeSubtopicId === 'py-elif-first' || activeSubtopicId === 'First Matching Branch' ? PYTHON_LESSONS['py-if-elif-else/first-matching-branch'] : undefined) ||
    (activeSubtopicId === 'true-path' || activeSubtopicId === 'py-ifelse-true' || activeSubtopicId === 'True Path' || (!activeSubtopicId && activeTopicId === 'py-if-else') ? PYTHON_LESSONS['py-if-else/true-path'] : undefined) ||
    (activeSubtopicId === 'false-path' || activeSubtopicId === 'py-ifelse-false' || activeSubtopicId === 'False Path' ? PYTHON_LESSONS['py-if-else/false-path'] : undefined) ||
    (activeSubtopicId === 'if-conditions' || activeSubtopicId === 'py-if-cond' || activeSubtopicId === 'Conditions' || (!activeSubtopicId && activeTopicId === 'py-if') ? PYTHON_LESSONS['py-if/if-conditions'] : undefined) ||
    (activeSubtopicId === 'executing-a-block' || activeSubtopicId === 'py-if-exec' || activeSubtopicId === 'Executing a Block' ? PYTHON_LESSONS['py-if/executing-a-block'] : undefined) ||
    (activeSubtopicId === 'true-and-false-results' || activeSubtopicId === 'py-bool-results' || activeSubtopicId === 'True and False Results' || (!activeSubtopicId && activeTopicId === 'py-boolean-expressions') ? PYTHON_LESSONS['py-boolean-expressions/true-and-false-results'] : undefined) ||
    (activeSubtopicId === 'combining-comparisons' || activeSubtopicId === 'py-bool-combine' || activeSubtopicId === 'Combining Comparisons' ? PYTHON_LESSONS['py-boolean-expressions/combining-comparisons'] : undefined) ||
    (activeSubtopicId === 'truthiness' || activeSubtopicId === 'py-bool-truthiness' || activeSubtopicId === 'Truthiness' ? PYTHON_LESSONS['py-boolean-expressions/truthiness'] : undefined) ||
    (activeSubtopicId === 'evaluation-order' || activeSubtopicId === 'py-prec-order' || activeSubtopicId === 'Evaluation Order' || (!activeSubtopicId && activeTopicId === 'py-operator-precedence') ? PYTHON_LESSONS['py-operator-precedence/evaluation-order'] : undefined) ||
    (activeSubtopicId === 'parentheses-precedence' || activeSubtopicId === 'py-prec-parens' || activeSubtopicId === 'Parentheses' ? PYTHON_LESSONS['py-operator-precedence/parentheses-precedence'] : undefined) ||
    (activeSubtopicId === 'combined-expressions' || activeSubtopicId === 'py-prec-combined' || activeSubtopicId === 'Combined Expressions' ? PYTHON_LESSONS['py-operator-precedence/combined-expressions'] : undefined) ||
    (activeSubtopicId === 'identity-is' || activeSubtopicId === 'py-id-is' || activeSubtopicId === 'is' || (!activeSubtopicId && activeTopicId === 'py-identity-operators') ? PYTHON_LESSONS['py-identity-operators/identity-is'] : undefined) ||
    (activeSubtopicId === 'identity-is-not' || activeSubtopicId === 'py-id-isnot' || activeSubtopicId === 'is not' ? PYTHON_LESSONS['py-identity-operators/identity-is-not'] : undefined) ||
    (activeSubtopicId === 'identity-vs-equality' || activeSubtopicId === 'py-id-vs-eq' || activeSubtopicId === 'Identity vs Equality' || activeSubtopicId === 'identity-vs-equality' ? PYTHON_LESSONS['py-identity-operators/identity-vs-equality'] : undefined) ||
    (activeSubtopicId === 'membership-in' || activeSubtopicId === 'py-mem-in' || activeSubtopicId === 'in' || (!activeSubtopicId && activeTopicId === 'py-membership-operators') ? PYTHON_LESSONS['py-membership-operators/membership-in'] : undefined) ||
    (activeSubtopicId === 'membership-not-in' || activeSubtopicId === 'py-mem-notin' || activeSubtopicId === 'not in' ? PYTHON_LESSONS['py-membership-operators/membership-not-in'] : undefined) ||
    (activeSubtopicId === 'logical-and' || activeSubtopicId === 'py-log-and' || activeSubtopicId === 'and' || (!activeSubtopicId && activeTopicId === 'py-logical-operators') ? PYTHON_LESSONS['py-logical-operators/logical-and'] : undefined) ||
    (activeSubtopicId === 'logical-or' || activeSubtopicId === 'py-log-or' || activeSubtopicId === 'or' ? PYTHON_LESSONS['py-logical-operators/logical-or'] : undefined) ||
    (activeSubtopicId === 'logical-not' || activeSubtopicId === 'py-log-not' || activeSubtopicId === 'not' ? PYTHON_LESSONS['py-logical-operators/logical-not'] : undefined) ||
    (activeSubtopicId === 'equal' || activeSubtopicId === 'py-cmp-eq' || (!activeSubtopicId && activeTopicId === 'py-comparison-operators') ? PYTHON_LESSONS['py-comparison-operators/equal'] : undefined) ||
    (activeSubtopicId === 'not-equal' || activeSubtopicId === 'py-cmp-neq' ? PYTHON_LESSONS['py-comparison-operators/not-equal'] : undefined) ||
    (activeSubtopicId === 'greater-than' || activeSubtopicId === 'py-cmp-gt' ? PYTHON_LESSONS['py-comparison-operators/greater-than'] : undefined) ||
    (activeSubtopicId === 'less-than' || activeSubtopicId === 'py-cmp-lt' ? PYTHON_LESSONS['py-comparison-operators/less-than'] : undefined) ||
    (activeSubtopicId === 'greater-than-equal' || activeSubtopicId === 'py-cmp-gte' ? PYTHON_LESSONS['py-comparison-operators/greater-than-equal'] : undefined) ||
    (activeSubtopicId === 'less-than-equal' || activeSubtopicId === 'py-cmp-lte' ? PYTHON_LESSONS['py-comparison-operators/less-than-equal'] : undefined) ||
    (activeSubtopicId === 'plus-equal' || activeSubtopicId === 'py-as-plus' || (!activeSubtopicId && activeTopicId === 'py-assignment-operators') ? PYTHON_LESSONS['py-assignment-operators/plus-equal'] : undefined) ||
    (activeSubtopicId === 'minus-equal' || activeSubtopicId === 'py-as-minus' ? PYTHON_LESSONS['py-assignment-operators/minus-equal'] : undefined) ||
    (activeSubtopicId === 'mul-equal' || activeSubtopicId === 'py-as-mul' ? PYTHON_LESSONS['py-assignment-operators/mul-equal'] : undefined) ||
    (activeSubtopicId === 'div-equal' || activeSubtopicId === 'py-as-div' ? PYTHON_LESSONS['py-assignment-operators/div-equal'] : undefined) ||
    (activeSubtopicId === 'addition' || activeSubtopicId === 'py-op-add' || (!activeSubtopicId && activeTopicId === 'py-arithmetic-operators') ? PYTHON_LESSONS['py-arithmetic-operators/addition'] : undefined) ||
    (activeSubtopicId === 'subtraction' || activeSubtopicId === 'py-op-sub' ? PYTHON_LESSONS['py-arithmetic-operators/subtraction'] : undefined) ||
    (activeSubtopicId === 'multiplication' || activeSubtopicId === 'py-op-mul' ? PYTHON_LESSONS['py-arithmetic-operators/multiplication'] : undefined) ||
    (activeSubtopicId === 'division' || activeSubtopicId === 'py-op-div' ? PYTHON_LESSONS['py-arithmetic-operators/division'] : undefined) ||
    (activeSubtopicId === 'floor-division' || activeSubtopicId === 'py-op-floordiv' ? PYTHON_LESSONS['py-arithmetic-operators/floor-division'] : undefined) ||
    (activeSubtopicId === 'modulus' || activeSubtopicId === 'py-op-mod' ? PYTHON_LESSONS['py-arithmetic-operators/modulus'] : undefined) ||
    (activeSubtopicId === 'exponentiation' || activeSubtopicId === 'py-op-exp' ? PYTHON_LESSONS['py-arithmetic-operators/exponentiation'] : undefined) ||
    (activeSubtopicId === 'input-function' || activeSubtopicId === 'py-inp-func' || (!activeSubtopicId && activeTopicId === 'py-user-input') ? PYTHON_LESSONS['py-user-input/input-function'] : undefined) ||
    (activeSubtopicId === 'storing-user-input' || activeSubtopicId === 'py-inp-store' ? PYTHON_LESSONS['py-user-input/storing-user-input'] : undefined) ||
    (activeSubtopicId === 'converting-input' || activeSubtopicId === 'py-inp-convert' ? PYTHON_LESSONS['py-user-input/converting-input'] : undefined) ||
    (activeSubtopicId === 'input-processing-output' || activeSubtopicId === 'py-inp-flow' ? PYTHON_LESSONS['py-user-input/input-processing-output'] : undefined) ||
    (activeSubtopicId === 'int-casting' || activeSubtopicId === 'py-cast-int' || (!activeSubtopicId && activeTopicId === 'py-casting') ? PYTHON_LESSONS['py-casting/int-casting'] : undefined) ||
    (activeSubtopicId === 'float-casting' || activeSubtopicId === 'py-cast-float' ? PYTHON_LESSONS['py-casting/float-casting'] : undefined) ||
    (activeSubtopicId === 'str-casting' || activeSubtopicId === 'py-cast-str' ? PYTHON_LESSONS['py-casting/str-casting'] : undefined) ||
    (activeSubtopicId === 'bool-casting' || activeSubtopicId === 'py-cast-bool' ? PYTHON_LESSONS['py-casting/bool-casting'] : undefined) ||
    (activeSubtopicId === 'conversion-errors' || activeSubtopicId === 'py-cast-errors' ? PYTHON_LESSONS['py-casting/conversion-errors'] : undefined) ||
    (activeSubtopicId === 'integers' || activeSubtopicId === 'py-num-int' || (!activeSubtopicId && activeTopicId === 'py-numbers') ? PYTHON_LESSONS['py-numbers/integers'] : undefined) ||
    (activeSubtopicId === 'floating-point-numbers' || activeSubtopicId === 'py-num-float' ? PYTHON_LESSONS['py-numbers/floating-point-numbers'] : undefined) ||
    (activeSubtopicId === 'negative-numbers' || activeSubtopicId === 'py-num-neg' ? PYTHON_LESSONS['py-numbers/negative-numbers'] : undefined) ||
    (activeSubtopicId === 'numeric-conversion' || activeSubtopicId === 'py-num-conv' ? PYTHON_LESSONS['py-numbers/numeric-conversion'] : undefined) ||
    (activeSubtopicId === 'understanding-values-and-types' || activeSubtopicId === 'py-dt-values' || (!activeSubtopicId && activeTopicId === 'py-data-types') ? PYTHON_LESSONS['py-data-types/understanding-values-and-types'] : undefined) ||
    (activeSubtopicId === 'builtin-data-types' || activeSubtopicId === 'py-dt-builtin' ? PYTHON_LESSONS['py-data-types/builtin-data-types'] : undefined) ||
    (activeSubtopicId === 'type-function' || activeSubtopicId === 'py-dt-type' ? PYTHON_LESSONS['py-data-types/type-function'] : undefined) ||
    (activeSubtopicId === 'numeric-types' || activeSubtopicId === 'py-dt-numeric' ? PYTHON_LESSONS['py-data-types/numeric-types'] : undefined) ||
    (activeSubtopicId === 'text-type' || activeSubtopicId === 'py-dt-text' ? PYTHON_LESSONS['py-data-types/text-type'] : undefined) ||
    (activeSubtopicId === 'boolean-type' || activeSubtopicId === 'py-dt-boolean' ? PYTHON_LESSONS['py-data-types/boolean-type'] : undefined) ||
    (activeSubtopicId === 'none-type' || activeSubtopicId === 'py-dt-none' ? PYTHON_LESSONS['py-data-types/none-type'] : undefined) ||
    (activeSubtopicId === 'creating-variables' || activeSubtopicId === 'py-var-create' || (!activeSubtopicId && activeTopicId === 'py-variables') ? PYTHON_LESSONS['py-variables/creating-variables'] : undefined) ||
    (activeSubtopicId === 'variable-names' || activeSubtopicId === 'py-var-names' ? PYTHON_LESSONS['py-variables/variable-names'] : undefined) ||
    (activeSubtopicId === 'assigning-values' || activeSubtopicId === 'py-var-assign' ? PYTHON_LESSONS['py-variables/assigning-values'] : undefined) ||
    (activeSubtopicId === 'reassignment' || activeSubtopicId === 'py-var-reassign' ? PYTHON_LESSONS['py-variables/reassignment'] : undefined) ||
    (activeSubtopicId === 'multiple-assignment' || activeSubtopicId === 'py-var-multiple' ? PYTHON_LESSONS['py-variables/multiple-assignment'] : undefined) ||
    (activeSubtopicId === 'unpacking-values' || activeSubtopicId === 'py-var-unpack' || activeSubtopicId === 'py-var-unpacking' ? PYTHON_LESSONS['py-variables/unpacking-values'] : undefined) ||
    (activeSubtopicId === 'constants-convention' || activeSubtopicId === 'py-var-constants' ? PYTHON_LESSONS['py-variables/constants-convention'] : undefined) ||
    (activeSubtopicId === 'single-line-comments' || activeSubtopicId === 'py-com-single' || (!activeSubtopicId && activeTopicId === 'py-comments') ? PYTHON_LESSONS['py-comments/single-line-comments'] : undefined) ||
    (activeSubtopicId === 'writing-useful-comments' || activeSubtopicId === 'py-com-useful' ? PYTHON_LESSONS['py-comments/writing-useful-comments'] : undefined) ||
    (activeSubtopicId === 'print-function' || activeSubtopicId === 'py-out-print' || (!activeSubtopicId && activeTopicId === 'py-output') ? PYTHON_LESSONS['py-output/print-function'] : undefined) ||
    (activeSubtopicId === 'printing-text' || activeSubtopicId === 'py-out-text' ? PYTHON_LESSONS['py-output/printing-text'] : undefined) ||
    (activeSubtopicId === 'printing-multiple-values' || activeSubtopicId === 'py-out-multiple' ? PYTHON_LESSONS['py-output/printing-multiple-values'] : undefined) ||
    (activeSubtopicId === 'output-formatting' || activeSubtopicId === 'py-out-formatting' ? PYTHON_LESSONS['py-output/output-formatting'] : undefined) ||
    (activeSubtopicId === 'f-strings-intro' || activeSubtopicId === 'py-out-fstrings' ? PYTHON_LESSONS['py-output/f-strings-intro'] : undefined) ||
    (activeSubtopicId === 'case-sensitivity' || activeSubtopicId === 'py-syn-case' || activeSubtopicId === 'python-case-sensitivity' ? PYTHON_LESSONS['py-syntax/case-sensitivity'] : undefined) ||
    (activeSubtopicId === 'code-blocks' || activeSubtopicId === 'python-code-blocks' || activeSubtopicId === 'py-syn-blocks' ? PYTHON_LESSONS['py-syntax/code-blocks'] : undefined) ||
    (activeSubtopicId === 'indentation' || activeSubtopicId === 'python-indentation' || activeSubtopicId === 'py-syn-indentation' ? PYTHON_LESSONS['py-syntax/indentation'] : undefined) ||
    (activeSubtopicId === 'execution-order' || activeSubtopicId === 'py-syn-order' ? PYTHON_LESSONS['py-syntax/execution-order'] : undefined) ||
    (activeSubtopicId === 'python-statements' || activeSubtopicId === 'py-syn-statements' || (!activeSubtopicId && activeTopicId === 'py-syntax') ? PYTHON_LESSONS['py-syntax/python-statements'] : undefined) ||
    (activeSubtopicId === 'running-a-python-file' || activeSubtopicId === 'py-gs-running-file' ? PYTHON_LESSONS['py-getting-started/running-a-python-file'] : undefined) ||
    (activeSubtopicId === 'ides-and-code-editors' || activeSubtopicId === 'py-gs-ides' ? PYTHON_LESSONS['py-getting-started/ides-and-code-editors'] : undefined) ||
    (activeSubtopicId === 'python-interpreter' || activeSubtopicId === 'py-gs-interpreter' ? PYTHON_LESSONS['py-getting-started/python-interpreter'] : undefined) ||
    (activeSubtopicId === 'python-installation' || activeSubtopicId === 'py-gs-install' || (!activeSubtopicId && activeTopicId === 'py-getting-started') ? PYTHON_LESSONS['py-getting-started/python-installation'] : undefined) ||
    (activeSubtopicId === 'your-first-python-program' || activeSubtopicId === 'py-intro-first-program' ? PYTHON_LESSONS['py-intro/your-first-python-program'] : undefined) ||
    (activeSubtopicId === 'how-python-executes-code' || activeSubtopicId === 'py-intro-execution' ? PYTHON_LESSONS['py-intro/how-python-executes-code'] : undefined) ||
    (activeSubtopicId === 'why-python' || activeSubtopicId === 'py-intro-why' ? PYTHON_LESSONS['py-intro/why-python'] : undefined) ||
    (activeSubtopicId === 'what-can-python-do' || activeSubtopicId === 'py-intro-can-do' ? PYTHON_LESSONS['py-intro/what-can-python-do'] : undefined) ||
    (activeSubtopicId === 'what-is-python' || activeSubtopicId === 'py-intro-what' || (!activeSubtopicId && activeTopicId === 'py-intro') ? PYTHON_LESSONS['py-intro/what-is-python'] : undefined)
  ) : undefined;

  // Active topic object for legacy slide rendering
  const legacyTopic = course.topics.find(t => t.id === activeTopicId) || course.topics[activeTopicIndex] || course.topics[0];
  const legacySlide = legacyTopic.content[Math.min(activeSlideIndex, legacyTopic.content.length - 1)];

  const mainContentRef = useRef<HTMLElement>(null);
  const currentLesson = isDataStructuresCourse ? activeDsLesson : activeLesson;


  // Update initial code when active topic changes
  useEffect(() => {
    if (currentLesson?.codePreview) {
      setCode(currentLesson.codePreview.code);
    } else if (isPythonCourse) {
      setCode(getSampleCodeForTopic(activeTopicId, activeSubtopicId));
    } else {
      setCode(legacySlide.code);
    }
    setSteps([]);
    setCurrentStepIndex(0);
    setError(null);
    setQuizAnswer(null);
    setShowQuizResult(false);
    setQuizAnswers({});

    // Reset scroll position to top whenever selected topic/subtopic changes
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [activeTopicId, activeSubtopicId, activeTopicIndex, activeSlideIndex, isPythonCourse]);

    const handleDsSelectTopic = (targetTopicId: string, targetSubtopicId?: string) => {
    setIsMobileSidebarOpen(false);
    setActiveSlideIndex(0);
    const finalTopicId = targetTopicId || 'ds-intro';
    const finalSubtopicId = targetSubtopicId || 'what-is-a-data-structure';

    const lessonKey = `${finalTopicId}/${finalSubtopicId}`;
    setCompletedDsLessons(prev => {
      const nextSet = new Set(prev);
      nextSet.add(lessonKey);
      nextSet.add(finalSubtopicId);
      try {
        localStorage.setItem('completed_ds_lessons', JSON.stringify(Array.from(nextSet)));
      } catch (err) {}
      return nextSet;
    });

    navigate(`/learn/ds/${finalTopicId}/${finalSubtopicId}`);

    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, left: 0 });
  };

  const handlePythonSelectTopic = (newTopicId: string, newSubtopicId?: string) => {
    setIsMobileSidebarOpen(false);
    setActiveSlideIndex(0);
    if (newSubtopicId) {
      navigate(`/learn/python/${newTopicId}/${newSubtopicId}`);
    } else {
      navigate(`/learn/python/${newTopicId}`);
    }
  };

  const runExecutionCode = async (collectedInputs: string[] = []) => {
    setIsExecuting(true);
    setError(null);
    try {
      const data = await executeCode(
        code,
        courseId === 'java' ? 'java' : 'python',
        collectedInputs
      );
      if (data.error) {
        setError(data.error);
      } else {
        setSteps(data.steps || []);
        setCurrentStepIndex(0);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to execute code');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleRunCode = () => {
    const lang = courseId === 'java' ? 'java' : 'python';
    const prompts = detectInputsInCode(code, lang);
    if (prompts.length > 0) {
      setInputPrompts(prompts);
      setIsInputModalOpen(true);
    } else {
      runExecutionCode([]);
    }
  };

  // Find active metadata from python curriculum
  let currentCategoryTitle = '';
  let currentTopicTitle = '';
  let currentSubtopicTitle = '';
  let currentDescription = '';

  if (isPythonCourse) {
    for (const cat of PYTHON_CURRICULUM) {
      for (const top of cat.topics) {
        if (top.id === activeTopicId) {
          currentCategoryTitle = cat.title;
          currentTopicTitle = top.title;
          currentDescription = top.description || '';
          if (activeSubtopicId && top.subtopics) {
            const sub = top.subtopics.find(s => s.id === activeSubtopicId || s.slug === activeSubtopicId);
            if (sub) {
              currentSubtopicTitle = sub.title;
            }
          }
          break;
        }
      }
    }
  }

  return (
    <div className="h-screen bg-[#020617] text-white flex flex-col overflow-hidden">
      {/* Header Bar */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#020617] z-20">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white">
            <ChevronLeft size={20} />
          </Link>
          
          {/* Mobile menu trigger for Python */}
          {isPythonCourse && (
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white"
            >
              <Menu size={20} />
            </button>
          )}

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              <BookOpen size={10} /> {isPythonCourse ? 'Python Mastery' : (isDataStructuresCourse ? 'Data Structures' : course.name)}
            </div>
            <h1 className="text-sm font-bold truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {isPythonCourse 
                ? (currentSubtopicTitle ? `${currentTopicTitle} — ${currentSubtopicTitle}` : currentTopicTitle || 'Python Tutorial') 
                : (isDataStructuresCourse ? (activeDsLesson?.title ? `${activeDsLesson.categoryTitle} — ${activeDsLesson.title}` : 'Data Structures Course') : legacyTopic.title)}
            </h1>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        {isPythonCourse ? (
          <PythonSidebar
            activeTopicId={activeTopicId}
            activeSubtopicId={activeSubtopicId}
            onSelectTopic={handlePythonSelectTopic}
            isOpenMobile={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />
        ) : isDataStructuresCourse ? (
          <DsSidebar
            activeTopicId={topicId || 'ds-intro'}
            activeSubtopicId={subtopicId || 'what-is-a-data-structure'}
            onSelectTopic={handleDsSelectTopic}
            isOpenMobile={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
            completedLessons={completedDsLessons}
          />
        ) : (
          <aside className="w-72 border-r border-white/5 bg-[#020617] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Course Syllabus</h3>
              <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
                {course.topics.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTopicIndex(idx);
                      setActiveSlideIndex(0);
                    }}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left group ${
                      activeTopicIndex === idx ? 'bg-blue-600 shadow-lg shadow-blue-600/20' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className={`mt-0.5 p-1.5 rounded-lg ${
                      activeTopicIndex === idx ? 'bg-white/20' : 'bg-white/5 text-gray-500 group-hover:text-blue-400'
                    }`}>
                      {idx < activeTopicIndex ? <CheckCircle2 size={14} /> : <Zap size={14} />}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className={`text-xs font-bold truncate ${activeTopicIndex === idx ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                        {t.title}
                      </span>
                      <span className={`text-[10px] uppercase tracking-wider font-medium ${activeTopicIndex === idx ? 'text-blue-100' : 'text-gray-600'}`}>
                        {t.level}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-auto p-6 bg-blue-600/5 border-t border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Brain size={16} />
                </div>
                <span className="text-xs font-bold">AI Learning Coach</span>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed italic">
                "You're doing great! Take your time to visualize the execution of every statement."
              </p>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <main ref={mainContentRef} className="flex-1 overflow-y-auto bg-[#020617] flex flex-col p-6 md:p-8 space-y-10 custom-scrollbar">
          <div className="max-w-4xl mx-auto w-full space-y-10 pb-20">
            {/* Header / Category Badge */}
            <section className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                <Lightbulb size={12} /> {isPythonCourse ? (activeLesson?.categoryTitle || currentCategoryTitle || 'PYTHON TUTORIAL') : (isDataStructuresCourse ? (activeDsLesson?.categoryTitle || '1. INTRODUCTION TO DATA STRUCTURES') : 'KEY CONCEPT')}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                {currentLesson ? currentLesson.title : (currentSubtopicTitle || currentTopicTitle || 'Python Lesson')}
              </h2>

              {isPythonCourse && (currentSubtopicTitle || activeLesson?.subtitle) && (
                <p className="text-xs text-gray-400 font-medium">
                  {activeLesson?.subtitle ? activeLesson.subtitle : `Part of topic: ${currentTopicTitle}`}
                </p>
              )}
            </section>

            {/* Content Body */}
            { currentLesson ? (
              <section className="space-y-8">
                <motion.div
                  key={currentLesson?.id || 'ds-lesson'}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                    {renderMarkdown(currentLesson?.contentMarkdown || '')}
                  </div>

                  {/* Section 10: Glossary Cards */}
                  {currentLesson?.glossary && currentLesson?.glossary.length > 0 && (
                    <div className="pt-6 space-y-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                        <BookMarked className="text-blue-400 w-5 h-5" />
                        SECTION 10 — IMPORTANT WORDS
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentLesson?.glossary.map((item, gIdx) => (
                          <div key={gIdx} className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{item.term}</span>
                            <p className="text-xs text-gray-300 leading-relaxed">{item.definition}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Section 11: Quick Check Quiz */}
                  {currentLesson?.quizzes && currentLesson?.quizzes.length > 0 && (
                    <div className="pt-6 space-y-6">
                      <div className="glass rounded-3xl p-8 border-blue-500/10 space-y-8">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-600/10 rounded-xl flex items-center justify-center">
                            <HelpCircle className="text-purple-400 w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">SECTION 11 — QUICK CHECK</h3>
                            <p className="text-xs text-gray-400">Test your understanding of {currentLesson?.title || 'this lesson'}.</p>
                          </div>
                        </div>

                        <div className="space-y-8">
                          {currentLesson?.quizzes.map((q, qIdx) => (
                            <QuickCheckQuestionCard
                              key={qIdx}
                              questionData={q}
                              questionIndex={qIdx}
                              lessonId={currentLesson?.id || 'lesson'}
                              selectedOptionIndex={quizAnswers[qIdx]}
                              onSelectOption={(origIdx) => setQuizAnswers(prev => ({ ...prev, [qIdx]: origIdx }))}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Section 12: Lesson Summary */}
                  {currentLesson?.summaryPoints && currentLesson?.summaryPoints.length > 0 && (
                    <div className="pt-6">
                      <div className="p-6 glass rounded-3xl border-l-4 border-green-500 space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <CheckCircle2 className="text-green-400 w-5 h-5" />
                          SECTION 12 — LESSON SUMMARY (You Now Know)
                        </h3>
                        <div className="space-y-2">
                          {currentLesson?.summaryPoints.map((pt, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-2 text-sm text-gray-200">
                              <span className="text-green-400 font-bold">✓</span>
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </section>
            ) : (
              // Standard Concept Lesson Template
              <section className="space-y-6">
                <div className="p-6 glass rounded-2xl border-l-4 border-blue-500 space-y-3">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                    <Info size={14} /> Guided Explanation
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {currentDescription || `Learn and experiment with ${currentSubtopicTitle || currentTopicTitle} in Python.`}
                  </p>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Code2 size={16} className="text-blue-400" />
                    Interactive Learning & Code Execution
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Below is the interactive editor for <strong>{currentSubtopicTitle || currentTopicTitle}</strong>. 
                    Modify the code and click <strong>Run</strong> to watch CodeFlow step through execution line by line!
                  </p>
                </div>
              </section>
            )}

            {/* Interactive Editor & Visualizer Panel */}
            <section className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Zap size={14} /> Interactive Visualizer
                </h3>
                <span className="text-[10px] font-bold text-gray-500 italic">Modify code below and click Run</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[480px]">
                {/* Editor Side */}
                <div className="glass rounded-3xl overflow-hidden flex flex-col border-white/5">
                  <div className="h-10 bg-gray-900 flex items-center px-4 justify-between border-b border-white/5">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Editor</span>
                    <button 
                      onClick={handleRunCode}
                      disabled={isExecuting}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-600 rounded-lg text-[10px] font-bold text-white hover:bg-blue-700 transition-all disabled:opacity-50 shadow-md shadow-blue-600/20"
                    >
                      {isExecuting ? '...' : <><Play size={10} fill="white" /> Run</>}
                    </button>
                  </div>
                  <div className="flex-1 bg-[#020617]">
                    <Editor
                      height="100%"
                      defaultLanguage="python"
                      theme="vs-dark"
                      value={code}
                      onChange={(v) => setCode(v || '')}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        padding: { top: 20 },
                        backgroundColor: '#020617'
                      }}
                    />
                  </div>
                </div>

                {/* Visualizer Side */}
                <div className="glass rounded-3xl overflow-hidden border-white/5 relative">
                  <VisualizationPanel 
                    currentStep={steps[currentStepIndex] || null} 
                    steps={steps} 
                    currentStepIndex={currentStepIndex}
                    error={error}
                    courseId={courseId || ''}
                    code={code}
                  />
                  {steps.length > 0 && !error && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 glass rounded-2xl shadow-2xl z-10">
                      <button 
                        onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
                        className="p-2 hover:bg-white/10 rounded-xl transition-all text-gray-300 hover:text-white"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <span className="text-xs font-bold px-2">{currentStepIndex + 1} / {steps.length}</span>
                      <button 
                        onClick={() => setCurrentStepIndex(Math.min(steps.length - 1, currentStepIndex + 1))}
                        className="p-2 hover:bg-white/10 rounded-xl transition-all text-gray-300 hover:text-white"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Sequential Previous / Next Footer Navigation */}
            <footer className="pt-10 flex items-center justify-between border-t border-white/5">
              {isPythonCourse ? (
                <>
                  <button 
                    onClick={() => {
                      if (activeLesson?.previousLesson) {
                        handlePythonSelectTopic(activeLesson.previousLesson.topicId, activeLesson.previousLesson.subtopicId);
                      } else if (previousNavItem) {
                        handlePythonSelectTopic(previousNavItem.topicId, previousNavItem.subtopicId);
                      }
                    }}
                    disabled={!activeLesson?.previousLesson && !previousNavItem}
                    className="px-5 py-3 glass rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 hover:bg-white/5 transition-all disabled:opacity-30 max-w-[220px] truncate"
                  >
                    <ChevronLeft size={18} className="shrink-0" /> 
                    <span className="truncate">
                      {activeLesson?.previousLesson 
                        ? `← ${activeLesson.previousLesson.title}`
                        : (previousNavItem ? `← ${previousNavItem.title}` : 'Previous')}
                    </span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (activeLesson?.nextLesson) {
                        handlePythonSelectTopic(activeLesson.nextLesson.topicId, activeLesson.nextLesson.subtopicId);
                      } else if (nextNavItem) {
                        handlePythonSelectTopic(nextNavItem.topicId, nextNavItem.subtopicId);
                      }
                    }}
                    disabled={!activeLesson?.nextLesson && !nextNavItem}
                    className="px-6 py-3 bg-blue-600 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-30 max-w-[240px] truncate"
                  >
                    <span className="truncate">
                      {activeLesson?.nextLesson 
                        ? `Next: ${activeLesson.nextLesson.title} →` 
                        : (nextNavItem ? `${nextNavItem.title} →` : 'Next')}
                    </span>
                    <ArrowRight size={18} className="shrink-0" />
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                       if (activeSlideIndex > 0) setActiveSlideIndex(activeSlideIndex - 1);
                       else if (activeTopicIndex > 0) {
                         setActiveTopicIndex(activeTopicIndex - 1);
                         setActiveSlideIndex(course.topics[activeTopicIndex - 1].content.length - 1);
                       }
                    }}
                    disabled={activeTopicIndex === 0 && activeSlideIndex === 0}
                    className="px-6 py-3 glass rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-white/5 transition-all disabled:opacity-30"
                  >
                    <ChevronLeft size={18} /> Previous Lesson
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (activeSlideIndex < legacyTopic.content.length - 1) {
                        setActiveSlideIndex(activeSlideIndex + 1);
                      } else if (activeTopicIndex < course.topics.length - 1) {
                        setActiveTopicIndex(activeTopicIndex + 1);
                        setActiveSlideIndex(0);
                      } else {
                        navigate('/dashboard');
                      }
                    }}
                    className="px-8 py-3 bg-blue-600 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                  >
                    {activeTopicIndex === course.topics.length - 1 && activeSlideIndex === legacyTopic.content.length - 1 ? 'Complete Course' : 'Next Lesson'}
                    <ArrowRight size={18} />
                  </button>
                </>
              )}
            </footer>
          </div>
        </main>
      </div>
      
      <InputCollectionModal
        isOpen={isInputModalOpen}
        prompts={inputPrompts}
        onClose={() => setIsInputModalOpen(false)}
        onConfirm={(inputs) => {
          setIsInputModalOpen(false);
          runExecutionCode(inputs);
        }}
      />
    </div>
  );
};

export default Learn;
