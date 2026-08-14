export interface CurriculumSubtopic {
  id: string;
  title: string;
  slug: string;
  description?: string;
  codeSnippet?: string;
}

export interface CurriculumTopic {
  id: string;
  title: string;
  slug: string;
  level?: 'STARTER' | 'LEARNER' | 'PRO';
  description?: string;
  subtopics?: CurriculumSubtopic[];
}

export interface CurriculumCategory {
  id: string;
  title: string;
  topics: CurriculumTopic[];
}

export const PYTHON_CURRICULUM: CurriculumCategory[] = [
  {
    id: 'basics',
    title: 'PYTHON BASICS',
    topics: [
      {
        id: 'py-home',
        title: 'Python Home',
        slug: 'python-home',
        level: 'STARTER',
        description: 'Overview of the Python course curriculum.'
      },
      {
        id: 'py-intro',
        title: '1. Python Introduction',
        slug: 'python-intro',
        level: 'STARTER',
        description: 'What is Python and why learn it?',
        subtopics: [
          { id: 'py-intro-what', title: 'What is Python?', slug: 'what-is-python' },
          { id: 'py-intro-can-do', title: 'What Can Python Do?', slug: 'what-can-python-do' },
          { id: 'py-intro-why', title: 'Why Python?', slug: 'why-python' },
          { id: 'py-intro-execution', title: 'How Python Executes Code', slug: 'how-python-executes-code' },
          { id: 'py-intro-first-program', title: 'Your First Python Program', slug: 'your-first-python-program' }
        ]
      },
      {
        id: 'py-getting-started',
        title: '2. Python Getting Started',
        slug: 'python-getting-started',
        level: 'STARTER',
        description: 'Setup and running Python.',
        subtopics: [
          { id: 'py-gs-install', title: 'Python Installation', slug: 'python-installation' },
          { id: 'py-gs-interpreter', title: 'Python Interpreter', slug: 'python-interpreter' },
          { id: 'py-gs-ides', title: 'IDEs and Code Editors', slug: 'ides-and-code-editors' },
          { id: 'py-gs-running-file', title: 'Running a Python File', slug: 'running-a-python-file' }
        ]
      },
      {
        id: 'py-syntax',
        title: '3. Python Syntax',
        slug: 'python-syntax',
        level: 'STARTER',
        description: 'Understanding Python code structure.',
        subtopics: [
          { id: 'py-syn-statements', title: 'Python Statements', slug: 'python-statements' },
          { id: 'py-syn-order', title: 'Execution Order', slug: 'execution-order' },
          { id: 'py-syn-indentation', title: 'Python Indentation', slug: 'indentation' },
          { id: 'py-syn-blocks', title: 'Code Blocks', slug: 'code-blocks' },
          { id: 'py-syn-case', title: 'Case Sensitivity', slug: 'case-sensitivity' }
        ]
      },
      {
        id: 'py-output',
        title: '4. Python Output',
        slug: 'python-output',
        level: 'STARTER',
        description: 'Displaying text and values.',
        subtopics: [
          { id: 'py-out-print', title: 'print()', slug: 'print-function' },
          { id: 'py-out-text', title: 'Printing Text', slug: 'printing-text' },
          { id: 'py-out-multiple', title: 'Printing Multiple Values', slug: 'printing-multiple-values' },
          { id: 'py-out-formatting', title: 'Output Formatting', slug: 'output-formatting' },
          { id: 'py-out-fstrings', title: 'f-Strings', slug: 'f-strings-intro' }
        ]
      },
      {
        id: 'py-comments',
        title: '5. Python Comments',
        slug: 'python-comments',
        level: 'STARTER',
        description: 'Documenting your code.',
        subtopics: [
          { id: 'py-com-single', title: 'Single-Line Comments', slug: 'single-line-comments' },
          { id: 'py-com-useful', title: 'Writing Useful Comments', slug: 'writing-useful-comments' }
        ]
      }
    ]
  },
  {
    id: 'data-memory',
    title: 'DATA & MEMORY',
    topics: [
      {
        id: 'py-variables',
        title: '6. Python Variables',
        slug: 'python-variables',
        level: 'STARTER',
        description: 'Storing data in digital boxes.',
        subtopics: [
          { id: 'py-var-create', title: 'Creating Variables', slug: 'creating-variables' },
          { id: 'py-var-names', title: 'Variable Names', slug: 'variable-names' },
          { id: 'py-var-assign', title: 'Assigning Values', slug: 'assigning-values' },
          { id: 'py-var-reassign', title: 'Reassignment', slug: 'reassignment' },
          { id: 'py-var-multiple', title: 'Multiple Assignment', slug: 'multiple-assignment' },
          { id: 'py-var-unpack', title: 'Unpacking Values', slug: 'unpacking-values' },
          { id: 'py-var-constants', title: 'Constants Convention', slug: 'constants-convention' }
        ]
      },
      {
        id: 'py-data-types',
        title: '7. Python Data Types',
        slug: 'python-data-types',
        level: 'STARTER',
        description: 'Understanding values and categories.',
        subtopics: [
          { id: 'py-dt-values', title: 'Understanding Values and Types', slug: 'understanding-values-and-types' },
          { id: 'py-dt-builtin', title: 'Built-in Data Types', slug: 'builtin-data-types' },
          { id: 'py-dt-type', title: 'type()', slug: 'type-function' },
          { id: 'py-dt-numeric', title: 'Numeric Types', slug: 'numeric-types' },
          { id: 'py-dt-text', title: 'Text Type', slug: 'text-type' },
          { id: 'py-dt-boolean', title: 'Boolean Type', slug: 'boolean-type' },
          { id: 'py-dt-none', title: 'None', slug: 'none-type' }
        ]
      },
      {
        id: 'py-numbers',
        title: '8. Python Numbers',
        slug: 'python-numbers',
        level: 'STARTER',
        description: 'Working with integers and floats.',
        subtopics: [
          { id: 'py-num-int', title: 'Integers', slug: 'integers' },
          { id: 'py-num-float', title: 'Floating-Point Numbers', slug: 'floating-point-numbers' },
          { id: 'py-num-neg', title: 'Negative Numbers', slug: 'negative-numbers' },
          { id: 'py-num-conv', title: 'Numeric Conversion', slug: 'numeric-conversion' }
        ]
      },
      {
        id: 'py-casting',
        title: '9. Python Casting',
        slug: 'python-casting',
        level: 'STARTER',
        description: 'Converting between types.',
        subtopics: [
          { id: 'py-cast-int', title: 'int()', slug: 'int-casting' },
          { id: 'py-cast-float', title: 'float()', slug: 'float-casting' },
          { id: 'py-cast-str', title: 'str()', slug: 'str-casting' },
          { id: 'py-cast-bool', title: 'bool()', slug: 'bool-casting' },
          { id: 'py-cast-errors', title: 'Conversion Errors', slug: 'conversion-errors' }
        ]
      },
      {
        id: 'py-user-input',
        title: '10. Python User Input',
        slug: 'python-user-input',
        level: 'STARTER',
        description: 'Receiving interactive input.',
        subtopics: [
          { id: 'py-inp-func', title: 'input()', slug: 'input-function' },
          { id: 'py-inp-store', title: 'Storing User Input', slug: 'storing-user-input' },
          { id: 'py-inp-convert', title: 'Converting Input', slug: 'converting-input' },
          { id: 'py-inp-flow', title: 'Input → Processing → Output', slug: 'input-processing-output' }
        ]
      }
    ]
  },
  {
    id: 'operators',
    title: 'OPERATORS & EXPRESSIONS',
    topics: [
      {
        id: 'py-arithmetic-operators',
        title: '11. Python Arithmetic Operators',
        slug: 'python-arithmetic-operators',
        level: 'STARTER',
        description: 'Math operations in Python.',
        subtopics: [
          { id: 'py-op-add', title: 'Addition', slug: 'addition' },
          { id: 'py-op-sub', title: 'Subtraction', slug: 'subtraction' },
          { id: 'py-op-mul', title: 'Multiplication', slug: 'multiplication' },
          { id: 'py-op-div', title: 'Division', slug: 'division' },
          { id: 'py-op-floordiv', title: 'Floor Division', slug: 'floor-division' },
          { id: 'py-op-mod', title: 'Modulus', slug: 'modulus' },
          { id: 'py-op-exp', title: 'Exponentiation', slug: 'exponentiation' }
        ]
      },
      {
        id: 'py-assignment-operators',
        title: '12. Python Assignment Operators',
        slug: 'python-assignment-operators',
        level: 'STARTER',
        description: 'Shortcut math assignment.',
        subtopics: [
          { id: 'py-as-plus', title: '+=', slug: 'plus-equal' },
          { id: 'py-as-minus', title: '-=', slug: 'minus-equal' },
          { id: 'py-as-mul', title: '*=', slug: 'mul-equal' },
          { id: 'py-as-div', title: '/=', slug: 'div-equal' }
        ]
      },
      {
        id: 'py-comparison-operators',
        title: '13. Python Comparison Operators',
        slug: 'python-comparison-operators',
        level: 'STARTER',
        description: 'Comparing values.',
        subtopics: [
          { id: 'py-cmp-eq', title: '==', slug: 'equal' },
          { id: 'py-cmp-neq', title: '!=', slug: 'not-equal' },
          { id: 'py-cmp-gt', title: '>', slug: 'greater-than' },
          { id: 'py-cmp-lt', title: '<', slug: 'less-than' },
          { id: 'py-cmp-gte', title: '>=', slug: 'greater-than-equal' },
          { id: 'py-cmp-lte', title: '<=', slug: 'less-than-equal' }
        ]
      },
      {
        id: 'py-logical-operators',
        title: '14. Python Logical Operators',
        slug: 'python-logical-operators',
        level: 'STARTER',
        description: 'Combining boolean logic.',
        subtopics: [
          { id: 'py-log-and', title: 'and', slug: 'logical-and' },
          { id: 'py-log-or', title: 'or', slug: 'logical-or' },
          { id: 'py-log-not', title: 'not', slug: 'logical-not' }
        ]
      },
      {
        id: 'py-membership-operators',
        title: '15. Python Membership Operators',
        slug: 'python-membership-operators',
        level: 'STARTER',
        description: 'Checking existence in collections.',
        subtopics: [
          { id: 'py-mem-in', title: 'in', slug: 'membership-in' },
          { id: 'py-mem-notin', title: 'not in', slug: 'membership-not-in' }
        ]
      },
      {
        id: 'py-identity-operators',
        title: '16. Python Identity Operators',
        slug: 'python-identity-operators',
        level: 'LEARNER',
        description: 'Comparing memory identities.',
        subtopics: [
          { id: 'py-id-is', title: 'is', slug: 'identity-is' },
          { id: 'py-id-isnot', title: 'is not', slug: 'identity-is-not' },
          { id: 'py-id-vs-eq', title: 'Identity vs Equality', slug: 'identity-vs-equality' }
        ]
      },
      {
        id: 'py-operator-precedence',
        title: '17. Python Operator Precedence',
        slug: 'python-operator-precedence',
        level: 'LEARNER',
        description: 'Order of operator evaluation.',
        subtopics: [
          { id: 'py-prec-order', title: 'Evaluation Order', slug: 'evaluation-order' },
          { id: 'py-prec-parens', title: 'Parentheses', slug: 'parentheses-precedence' },
          { id: 'py-prec-combined', title: 'Combined Expressions', slug: 'combined-expressions' }
        ]
      },
      {
        id: 'py-boolean-expressions',
        title: '18. Python Boolean Expressions',
        slug: 'python-boolean-expressions',
        level: 'STARTER',
        description: 'Evaluating conditions to True or False.',
        subtopics: [
          { id: 'py-bool-results', title: 'True and False Results', slug: 'true-and-false-results' },
          { id: 'py-bool-combine', title: 'Combining Comparisons', slug: 'combining-comparisons' },
          { id: 'py-bool-truthiness', title: 'Truthiness', slug: 'truthiness' }
        ]
      }
    ]
  },
  {
    id: 'decision-making',
    title: 'DECISION MAKING',
    topics: [
      {
        id: 'py-if',
        title: '19. Python if',
        slug: 'python-if',
        level: 'STARTER',
        description: 'Conditional execution.',
        subtopics: [
          { id: 'py-if-cond', title: 'Conditions', slug: 'if-conditions' },
          { id: 'py-if-exec', title: 'Executing a Block', slug: 'executing-a-block' }
        ]
      },
      {
        id: 'py-if-else',
        title: '20. Python if-else',
        slug: 'python-if-else',
        level: 'STARTER',
        description: 'Two-way decision paths.',
        subtopics: [
          { id: 'py-ifelse-true', title: 'True Path', slug: 'true-path' },
          { id: 'py-ifelse-false', title: 'False Path', slug: 'false-path' }
        ]
      },
      {
        id: 'py-if-elif-else',
        title: '21. Python if-elif-else',
        slug: 'python-if-elif-else',
        level: 'STARTER',
        description: 'Multi-branch conditionals.',
        subtopics: [
          { id: 'py-elif-multi', title: 'Multiple Conditions', slug: 'multiple-conditions' },
          { id: 'py-elif-first', title: 'First Matching Branch', slug: 'first-matching-branch' }
        ]
      },
      {
        id: 'py-nested-conditions',
        title: '22. Python Nested Conditions',
        slug: 'python-nested-conditions',
        level: 'LEARNER',
        description: 'Conditionals inside conditionals.',
        subtopics: [
          { id: 'py-nest-inside', title: 'if Inside if', slug: 'if-inside-if' },
          { id: 'py-nest-levels', title: 'Multiple Decision Levels', slug: 'multiple-decision-levels' }
        ]
      },
      {
        id: 'py-match-case',
        title: '23. Python match-case',
        slug: 'python-match-case',
        level: 'LEARNER',
        description: 'Pattern matching statements.',
        subtopics: [
          { id: 'py-mc-match', title: 'match', slug: 'match-statement' },
          { id: 'py-mc-case', title: 'case', slug: 'case-statement' },
          { id: 'py-mc-default', title: 'Default Case', slug: 'default-case' }
        ]
      }
    ]
  },
  {
    id: 'loops',
    title: 'LOOPS',
    topics: [
      {
        id: 'py-while-loops',
        title: '24. Python while Loops',
        slug: 'python-while-loops',
        level: 'STARTER',
        description: 'Repeating code while a condition is true.',
        subtopics: [
          { id: 'py-wh-keyword', title: 'while', slug: 'while-keyword' },
          { id: 'py-wh-condition', title: 'Loop Condition', slug: 'loop-condition' },
          { id: 'py-wh-update', title: 'Updating Loop Variables', slug: 'updating-loop-variables' }
        ]
      },
      {
        id: 'py-infinite-loops',
        title: '25. Infinite Loops & Termination',
        slug: 'infinite-loops-termination',
        level: 'LEARNER',
        description: 'Avoiding non-terminating loops.',
        subtopics: [
          { id: 'py-inf-term', title: 'Termination Conditions', slug: 'termination-conditions' },
          { id: 'py-inf-mistakes', title: 'Common Infinite Loop Mistakes', slug: 'common-infinite-loop-mistakes' }
        ]
      },
      {
        id: 'py-for-loops',
        title: '26. Python for Loops',
        slug: 'python-for-loops',
        level: 'STARTER',
        description: 'Iterating over sequences.',
        subtopics: [
          { id: 'py-for-iter', title: 'Iterating Through Values', slug: 'iterating-through-values' },
          { id: 'py-for-vars', title: 'Loop Variables', slug: 'loop-variables' }
        ]
      },
      {
        id: 'py-range',
        title: '27. Python range()',
        slug: 'python-range',
        level: 'STARTER',
        description: 'Generating sequences of numbers.',
        subtopics: [
          { id: 'py-rng-start', title: 'Start', slug: 'range-start' },
          { id: 'py-rng-stop', title: 'Stop', slug: 'range-stop' },
          { id: 'py-rng-step', title: 'Step', slug: 'range-step' }
        ]
      },
      {
        id: 'py-break',
        title: '28. Python break',
        slug: 'python-break',
        level: 'STARTER',
        description: 'Exiting loops early.',
        subtopics: [
          { id: 'py-brk-early', title: 'Leaving a Loop Early', slug: 'leaving-a-loop-early' }
        ]
      },
      {
        id: 'py-continue',
        title: '29. Python continue',
        slug: 'python-continue',
        level: 'STARTER',
        description: 'Skipping loop iterations.',
        subtopics: [
          { id: 'py-cnt-skip', title: 'Skipping an Iteration', slug: 'skipping-an-iteration' }
        ]
      },
      {
        id: 'py-pass',
        title: '30. Python pass',
        slug: 'python-pass',
        level: 'STARTER',
        description: 'Placeholder statements.',
        subtopics: [
          { id: 'py-pass-empty', title: 'Empty Blocks', slug: 'empty-blocks' },
          { id: 'py-pass-place', title: 'Placeholder Statements', slug: 'placeholder-statements' }
        ]
      },
      {
        id: 'py-loop-else',
        title: '31. Python Loop else',
        slug: 'python-loop-else',
        level: 'LEARNER',
        description: 'Using else clauses with loops.',
        subtopics: [
          { id: 'py-le-for', title: 'else with for', slug: 'else-with-for' },
          { id: 'py-le-while', title: 'else with while', slug: 'else-with-while' }
        ]
      },
      {
        id: 'py-nested-loops',
        title: '32. Python Nested Loops',
        slug: 'python-nested-loops',
        level: 'LEARNER',
        description: 'Loops inside loops.',
        subtopics: [
          { id: 'py-nl-inside', title: 'Loop Inside a Loop', slug: 'loop-inside-a-loop' },
          { id: 'py-nl-order', title: 'Execution Order', slug: 'nested-execution-order' }
        ]
      }
    ]
  },
  {
    id: 'strings',
    title: 'STRINGS',
    topics: [
      {
        id: 'py-strings',
        title: '33. Python Strings',
        slug: 'python-strings',
        level: 'STARTER',
        description: 'Working with text data.',
        subtopics: [
          { id: 'py-str-create', title: 'Creating Strings', slug: 'creating-strings' },
          { id: 'py-str-quotes', title: 'Quotes', slug: 'quotes' },
          { id: 'py-str-multi', title: 'Multiline Strings', slug: 'multiline-strings' }
        ]
      },
      {
        id: 'py-string-indexing',
        title: '34. String Indexing',
        slug: 'string-indexing',
        level: 'STARTER',
        description: 'Accessing specific characters.',
        subtopics: [
          { id: 'py-idx-pos', title: 'Positive Indexing', slug: 'positive-indexing' },
          { id: 'py-idx-neg', title: 'Negative Indexing', slug: 'negative-indexing' }
        ]
      },
      {
        id: 'py-string-slicing',
        title: '35. String Slicing',
        slug: 'string-slicing',
        level: 'STARTER',
        description: 'Extracting substrings.',
        subtopics: [
          { id: 'py-slc-range', title: 'Start and Stop', slug: 'start-and-stop' },
          { id: 'py-slc-step', title: 'Step', slug: 'slice-step' },
          { id: 'py-slc-neg', title: 'Negative Slicing', slug: 'negative-slicing' }
        ]
      },
      {
        id: 'py-string-methods',
        title: '36. String Methods',
        slug: 'string-methods',
        level: 'STARTER',
        description: 'Built-in string functions.',
        subtopics: [
          { id: 'py-sm-upper', title: 'upper()', slug: 'upper-method' },
          { id: 'py-sm-lower', title: 'lower()', slug: 'lower-method' },
          { id: 'py-sm-strip', title: 'strip()', slug: 'strip-method' },
          { id: 'py-sm-replace', title: 'replace()', slug: 'replace-method' },
          { id: 'py-sm-split', title: 'split()', slug: 'split-method' },
          { id: 'py-sm-find', title: 'find()', slug: 'find-method' }
        ]
      },
      {
        id: 'py-string-formatting',
        title: '37. String Formatting',
        slug: 'string-formatting',
        level: 'STARTER',
        description: 'Embedding variables into strings.',
        subtopics: [
          { id: 'py-sf-fstr', title: 'f-Strings', slug: 'f-strings' },
          { id: 'py-sf-fmt', title: 'Formatting Values', slug: 'formatting-values' }
        ]
      },
      {
        id: 'py-string-immutability',
        title: '38. String Immutability',
        slug: 'string-immutability',
        level: 'LEARNER',
        description: 'Why strings cannot be mutated in place.',
        subtopics: [
          { id: 'py-si-meaning', title: 'What Immutable Means', slug: 'what-immutable-means' },
          { id: 'py-si-reason', title: 'Why Strings Cannot Be Changed In Place', slug: 'why-strings-cannot-be-changed-in-place' }
        ]
      }
    ]
  },
  {
    id: 'collections',
    title: 'COLLECTIONS',
    topics: [
      {
        id: 'py-lists',
        title: '39. Python Lists',
        slug: 'python-lists',
        level: 'STARTER',
        description: 'Ordered, mutable collections.',
        subtopics: [
          { id: 'py-lst-create', title: 'Creating Lists', slug: 'creating-lists' },
          { id: 'py-lst-len', title: 'List Length', slug: 'list-length' },
          { id: 'py-lst-dup', title: 'Duplicate Values', slug: 'duplicate-values' }
        ]
      },
      {
        id: 'py-access-list-items',
        title: '40. Access List Items',
        slug: 'access-list-items',
        level: 'STARTER',
        description: 'Indexing and slicing lists.',
        subtopics: [
          { id: 'py-ali-idx', title: 'Indexing', slug: 'list-indexing' },
          { id: 'py-ali-negidx', title: 'Negative Indexing', slug: 'list-negative-indexing' },
          { id: 'py-ali-slc', title: 'Slicing', slug: 'list-slicing' }
        ]
      },
      {
        id: 'py-change-list-items',
        title: '41. Change List Items',
        slug: 'change-list-items',
        level: 'STARTER',
        description: 'Updating list contents.',
        subtopics: [
          { id: 'py-cli-replace', title: 'Replace Values', slug: 'replace-values' },
          { id: 'py-cli-ranges', title: 'Change Ranges', slug: 'change-ranges' }
        ]
      },
      {
        id: 'py-add-list-items',
        title: '42. Add List Items',
        slug: 'add-list-items',
        level: 'STARTER',
        description: 'Inserting items into lists.',
        subtopics: [
          { id: 'py-ali-append', title: 'append()', slug: 'append-method' },
          { id: 'py-ali-insert', title: 'insert()', slug: 'insert-method' },
          { id: 'py-ali-extend', title: 'extend()', slug: 'extend-method' }
        ]
      },
      {
        id: 'py-remove-list-items',
        title: '43. Remove List Items',
        slug: 'remove-list-items',
        level: 'STARTER',
        description: 'Deleting list elements.',
        subtopics: [
          { id: 'py-rli-remove', title: 'remove()', slug: 'remove-method' },
          { id: 'py-rli-pop', title: 'pop()', slug: 'pop-method' },
          { id: 'py-rli-del', title: 'del', slug: 'del-keyword' },
          { id: 'py-rli-clear', title: 'clear()', slug: 'clear-method' }
        ]
      },
      {
        id: 'py-loop-lists',
        title: '44. Loop Lists',
        slug: 'loop-lists',
        level: 'STARTER',
        description: 'Iterating through list elements.',
        subtopics: [
          { id: 'py-ll-for', title: 'for', slug: 'loop-lists-for' },
          { id: 'py-ll-while', title: 'while', slug: 'loop-lists-while' }
        ]
      },
      {
        id: 'py-list-methods',
        title: '45. List Methods',
        slug: 'list-methods',
        level: 'STARTER',
        description: 'Utility list functions.',
        subtopics: [
          { id: 'py-lm-sort', title: 'sort()', slug: 'sort-method' },
          { id: 'py-lm-copy', title: 'copy()', slug: 'copy-method' },
          { id: 'py-lm-count', title: 'count()', slug: 'count-method' },
          { id: 'py-lm-index', title: 'index()', slug: 'index-method' }
        ]
      },
      {
        id: 'py-list-comprehensions',
        title: '46. List Comprehensions',
        slug: 'list-comprehensions',
        level: 'LEARNER',
        description: 'Concise list creation syntax.',
        subtopics: [
          { id: 'py-lc-basic', title: 'Basic Comprehension', slug: 'basic-comprehension' },
          { id: 'py-lc-cond', title: 'Conditions in Comprehensions', slug: 'conditions-in-comprehensions' }
        ]
      },
      {
        id: 'py-tuples',
        title: '47. Python Tuples',
        slug: 'python-tuples',
        level: 'STARTER',
        description: 'Ordered, immutable sequences.',
        subtopics: [
          { id: 'py-tup-create', title: 'Creating Tuples', slug: 'creating-tuples' },
          { id: 'py-tup-access', title: 'Accessing Tuples', slug: 'accessing-tuples' },
          { id: 'py-tup-immut', title: 'Tuple Immutability', slug: 'tuple-immutability' },
          { id: 'py-tup-unpack', title: 'Tuple Unpacking', slug: 'tuple-unpacking' },
          { id: 'py-tup-loop', title: 'Looping Tuples', slug: 'looping-tuples' },
          { id: 'py-tup-methods', title: 'Tuple Methods', slug: 'tuple-methods' }
        ]
      },
      {
        id: 'py-sets',
        title: '48. Python Sets',
        slug: 'python-sets',
        level: 'LEARNER',
        description: 'Unordered collections of unique elements.',
        subtopics: [
          { id: 'py-set-create', title: 'Creating Sets', slug: 'creating-sets' },
          { id: 'py-set-unique', title: 'Unique Values', slug: 'unique-values' },
          { id: 'py-set-add', title: 'Adding Items', slug: 'adding-set-items' },
          { id: 'py-set-remove', title: 'Removing Items', slug: 'removing-set-items' },
          { id: 'py-set-loop', title: 'Looping Sets', slug: 'looping-sets' },
          { id: 'py-set-ops', title: 'Set Operations', slug: 'set-operations' },
          { id: 'py-set-methods', title: 'Set Methods', slug: 'set-methods' }
        ]
      },
      {
        id: 'py-dictionaries',
        title: '49. Python Dictionaries',
        slug: 'python-dictionaries',
        level: 'STARTER',
        description: 'Key-value mapping data structures.',
        subtopics: [
          { id: 'py-dict-kv', title: 'Key-Value Pairs', slug: 'key-value-pairs' },
          { id: 'py-dict-access', title: 'Access Items', slug: 'access-dict-items' },
          { id: 'py-dict-change', title: 'Change Items', slug: 'change-dict-items' },
          { id: 'py-dict-add', title: 'Add Items', slug: 'add-dict-items' },
          { id: 'py-dict-remove', title: 'Remove Items', slug: 'remove-dict-items' },
          { id: 'py-dict-loop', title: 'Loop Dictionaries', slug: 'loop-dictionaries' },
          { id: 'py-dict-methods', title: 'Dictionary Methods', slug: 'dictionary-methods' }
        ]
      },
      {
        id: 'py-mutability',
        title: '50. Mutability',
        slug: 'mutability',
        level: 'LEARNER',
        description: 'Mutable vs Immutable data objects.',
        subtopics: [
          { id: 'py-mut-vs', title: 'Mutable vs Immutable', slug: 'mutable-vs-immutable' },
          { id: 'py-mut-compare', title: 'Lists vs Strings/Tuples', slug: 'lists-vs-strings-tuples' },
          { id: 'py-mut-understand', title: 'Understanding Changes to Data', slug: 'understanding-changes-to-data' }
        ]
      }
    ]
  },
  {
    id: 'functions',
    title: 'FUNCTIONS',
    topics: [
      {
        id: 'py-functions',
        title: '51. Python Functions',
        slug: 'python-functions',
        level: 'STARTER',
        description: 'Reusable blocks of code.',
        subtopics: [
          { id: 'py-fn-why', title: 'Why Functions?', slug: 'why-functions' },
          { id: 'py-fn-create', title: 'Creating Functions', slug: 'creating-functions' },
          { id: 'py-fn-call', title: 'Calling Functions', slug: 'calling-functions' },
          { id: 'py-fn-dry', title: 'DRY Principle', slug: 'dry-principle' }
        ]
      },
      {
        id: 'py-parameters-arguments',
        title: '52. Parameters & Arguments',
        slug: 'parameters-arguments',
        level: 'STARTER',
        description: 'Passing information into functions.',
        subtopics: [
          { id: 'py-pa-params', title: 'Parameters', slug: 'parameters' },
          { id: 'py-pa-args', title: 'Arguments', slug: 'arguments' },
          { id: 'py-pa-map', title: 'Parameter → Argument Mapping', slug: 'parameter-argument-mapping' }
        ]
      },
      {
        id: 'py-positional-keyword-args',
        title: '53. Positional & Keyword Arguments',
        slug: 'positional-keyword-arguments',
        level: 'STARTER',
        description: 'Matching inputs by order or name.',
        subtopics: [
          { id: 'py-pka-pos', title: 'Positional Arguments', slug: 'positional-arguments' },
          { id: 'py-pka-kw', title: 'Keyword Arguments', slug: 'keyword-arguments' }
        ]
      },
      {
        id: 'py-default-parameters',
        title: '54. Default Parameters',
        slug: 'default-parameters',
        level: 'STARTER',
        description: 'Setting fallback parameter values.',
        subtopics: [
          { id: 'py-dp-vals', title: 'Default Values', slug: 'default-values' },
          { id: 'py-dp-override', title: 'Overriding Defaults', slug: 'overriding-defaults' }
        ]
      },
      {
        id: 'py-args-kwargs',
        title: '55. *args and **kwargs',
        slug: 'args-kwargs',
        level: 'LEARNER',
        description: 'Handling arbitrary numbers of arguments.',
        subtopics: [
          { id: 'py-ak-args', title: 'Variable Number of Arguments (*args)', slug: 'variable-number-of-arguments' },
          { id: 'py-ak-kwargs', title: 'Variable Number of Keyword Arguments (**kwargs)', slug: 'variable-number-of-keyword-arguments' }
        ]
      },
      {
        id: 'py-return-values',
        title: '56. Return Values',
        slug: 'return-values',
        level: 'STARTER',
        description: 'Sending results back from functions.',
        subtopics: [
          { id: 'py-rv-keyword', title: 'return', slug: 'return-keyword' },
          { id: 'py-rv-calc', title: 'Returning Calculations', slug: 'returning-calculations' },
          { id: 'py-rv-use', title: 'Using Returned Values', slug: 'using-returned-values' }
        ]
      },
      {
        id: 'py-scope',
        title: '57. Python Scope',
        slug: 'python-scope',
        level: 'LEARNER',
        description: 'Variable visibility and lifetimes.',
        subtopics: [
          { id: 'py-scp-local', title: 'Local Scope', slug: 'local-scope' },
          { id: 'py-scp-global', title: 'Global Scope', slug: 'global-scope' },
          { id: 'py-scp-lifetime', title: 'Variable Lifetime', slug: 'variable-lifetime' }
        ]
      },
      {
        id: 'py-lambda-functions',
        title: '58. Lambda Functions',
        slug: 'lambda-functions',
        level: 'LEARNER',
        description: 'Small anonymous functions.',
        subtopics: [
          { id: 'py-lmb-anon', title: 'Anonymous Functions', slug: 'anonymous-functions' },
          { id: 'py-lmb-expr', title: 'Simple Lambda Expressions', slug: 'simple-lambda-expressions' }
        ]
      },
      {
        id: 'py-recursion',
        title: '59. Python Recursion',
        slug: 'python-recursion',
        level: 'LEARNER',
        description: 'Functions calling themselves.',
        subtopics: [
          { id: 'py-rec-itself', title: 'Function Calling Itself', slug: 'function-calling-itself' },
          { id: 'py-rec-base', title: 'Base Case', slug: 'base-case' },
          { id: 'py-rec-case', title: 'Recursive Case', slug: 'recursive-case' },
          { id: 'py-rec-stack', title: 'Call Stack Introduction', slug: 'call-stack-introduction' }
        ]
      }
    ]
  },
  {
    id: 'errors-debugging',
    title: 'ERRORS & DEBUGGING',
    topics: [
      {
        id: 'py-errors',
        title: '60. Python Errors',
        slug: 'python-errors',
        level: 'STARTER',
        description: 'Understanding types of programming errors.',
        subtopics: [
          { id: 'py-err-syntax', title: 'Syntax Errors', slug: 'syntax-errors' },
          { id: 'py-err-runtime', title: 'Runtime Errors', slug: 'runtime-errors' },
          { id: 'py-err-logic', title: 'Logical Errors', slug: 'logical-errors' }
        ]
      },
      {
        id: 'py-debugging',
        title: '61. Python Debugging',
        slug: 'python-debugging',
        level: 'LEARNER',
        description: 'Finding and fixing bugs.',
        subtopics: [
          { id: 'py-dbg-msg', title: 'Reading Error Messages', slug: 'reading-error-messages' },
          { id: 'py-dbg-line', title: 'Finding the Problematic Line', slug: 'finding-the-problematic-line' },
          { id: 'py-dbg-vars', title: 'Tracing Variable Values', slug: 'tracing-variable-values' },
          { id: 'py-dbg-logic', title: 'Debugging Logic', slug: 'debugging-logic' }
        ]
      },
      {
        id: 'py-exception-handling',
        title: '62. Python Exception Handling',
        slug: 'python-exception-handling',
        level: 'LEARNER',
        description: 'Gracefully managing runtime exceptions.',
        subtopics: [
          { id: 'py-eh-try', title: 'try', slug: 'try-block' },
          { id: 'py-eh-except', title: 'except', slug: 'except-block' },
          { id: 'py-eh-else', title: 'else', slug: 'exception-else' },
          { id: 'py-eh-finally', title: 'finally', slug: 'finally-block' },
          { id: 'py-eh-raise', title: 'raise', slug: 'raise-statement' }
        ]
      }
    ]
  }
];

export interface NavItem {
  id: string;
  topicId: string;
  subtopicId?: string;
  title: string;
  categoryTitle: string;
  parentTitle?: string;
  slug: string;
}

export const getFlattenedNavItems = (): NavItem[] => {
  const items: NavItem[] = [];
  PYTHON_CURRICULUM.forEach(category => {
    category.topics.forEach(topic => {
      // Main topic item
      items.push({
        id: topic.id,
        topicId: topic.id,
        title: topic.title,
        categoryTitle: category.title,
        slug: topic.slug
      });
      // Subtopic items
      if (topic.subtopics) {
        topic.subtopics.forEach(sub => {
          items.push({
            id: `${topic.id}/${sub.id}`,
            topicId: topic.id,
            subtopicId: sub.id,
            title: sub.title,
            categoryTitle: category.title,
            parentTitle: topic.title,
            slug: `${topic.slug}/${sub.slug}`
          });
        });
      }
    });
  });
  return items;
};
