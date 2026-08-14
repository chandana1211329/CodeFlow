export interface DsSubtopic {
  id: string;
  title: string;
  slug: string;
}

export interface DsTopic {
  id: string;
  title: string;
  slug: string;
  description?: string;
  subtopics: DsSubtopic[];
}

export interface DsNavItem {
  topicId: string;
  subtopicId: string;
  topicTitle: string;
  subtopicTitle: string;
  sectionNumber: number;
}

export const DATA_STRUCTURES_CURRICULUM: DsTopic[] = [
  {
    id: 'ds-intro',
    title: '1. Introduction to Data Structures',
    slug: 'introduction-to-data-structures',
    description: 'Fundamental concepts, classification, and selection of data structures.',
    subtopics: [
      { id: 'what-is-a-data-structure', title: 'What is a Data Structure?', slug: 'what-is-a-data-structure' },
      { id: 'why-data-structures', title: 'Why Data Structures?', slug: 'why-data-structures' },
      { id: 'types-of-data-structures', title: 'Types of Data Structures', slug: 'types-of-data-structures' },
      { id: 'linear-vs-non-linear', title: 'Linear vs Non-Linear', slug: 'linear-vs-non-linear' },
      { id: 'static-vs-dynamic', title: 'Static vs Dynamic', slug: 'static-vs-dynamic' },
      { id: 'choosing-the-right-data-structure', title: 'Choosing the Right Data Structure', slug: 'choosing-the-right-data-structure' }
    ]
  },
  {
    id: 'ds-complexity',
    title: '2. Complexity Analysis',
    slug: 'complexity-analysis',
    description: 'Algorithm efficiency, time and space complexity, and Big O notation.',
    subtopics: [
      { id: 'what-is-an-algorithm', title: 'What is an Algorithm?', slug: 'what-is-an-algorithm' },
      { id: 'time-complexity', title: 'Time Complexity', slug: 'time-complexity' },
      { id: 'space-complexity', title: 'Space Complexity', slug: 'space-complexity' },
      { id: 'big-o-notation', title: 'Big O Notation', slug: 'big-o-notation' },
      { id: 'constant-time-o1', title: 'O(1) — Constant Time', slug: 'constant-time-o1' },
      { id: 'linear-time-on', title: 'O(n) — Linear Time', slug: 'linear-time-on' },
      { id: 'logarithmic-time-ologn', title: 'O(log n) — Logarithmic Time', slug: 'logarithmic-time-ologn' },
      { id: 'quadratic-time-on2', title: 'O(n²) — Quadratic Time', slug: 'quadratic-time-on2' },
      { id: 'best-average-worst-case', title: 'Best, Average & Worst Case', slug: 'best-average-worst-case' }
    ]
  },
  {
    id: 'ds-arrays',
    title: '3. Arrays',
    slug: 'arrays',
    description: 'Sequential memory storage, operations, indexing, and complexity.',
    subtopics: [
      { id: 'what-is-an-array', title: 'What is an Array?', slug: 'what-is-an-array' },
      { id: 'array-representation', title: 'Array Representation', slug: 'array-representation' },
      { id: 'indexing', title: 'Indexing', slug: 'indexing' },
      { id: 'traversal', title: 'Traversal', slug: 'traversal' },
      { id: 'insertion', title: 'Insertion', slug: 'insertion' },
      { id: 'deletion', title: 'Deletion', slug: 'deletion' },
      { id: 'searching', title: 'Searching', slug: 'searching' },
      { id: 'updating-elements', title: 'Updating Elements', slug: 'updating-elements' },
      { id: 'array-complexity', title: 'Array Complexity', slug: 'array-complexity' },
      { id: 'common-array-problems', title: 'Common Array Problems', slug: 'common-array-problems' }
    ]
  },
  {
    id: 'ds-linked-lists',
    title: '4. Linked Lists',
    slug: 'linked-lists',
    description: 'Node-based dynamic data structures, pointers, and variants.',
    subtopics: [
      { id: 'what-is-a-linked-list', title: 'What is a Linked List?', slug: 'what-is-a-linked-list' },
      { id: 'nodes', title: 'Nodes', slug: 'nodes' },
      { id: 'head-and-tail', title: 'Head and Tail', slug: 'head-and-tail' },
      { id: 'singly-linked-list', title: 'Singly Linked List', slug: 'singly-linked-list' },
      { id: 'linked-list-traversal', title: 'Traversal', slug: 'linked-list-traversal' },
      { id: 'linked-list-insertion', title: 'Insertion', slug: 'linked-list-insertion' },
      { id: 'linked-list-deletion', title: 'Deletion', slug: 'linked-list-deletion' },
      { id: 'linked-list-searching', title: 'Searching', slug: 'linked-list-searching' },
      { id: 'doubly-linked-list', title: 'Doubly Linked List', slug: 'doubly-linked-list' },
      { id: 'circular-linked-list', title: 'Circular Linked List', slug: 'circular-linked-list' },
      { id: 'array-vs-linked-list', title: 'Array vs Linked List', slug: 'array-vs-linked-list' },
      { id: 'linked-list-complexity', title: 'Linked List Complexity', slug: 'linked-list-complexity' }
    ]
  },
  {
    id: 'ds-stacks',
    title: '5. Stacks',
    slug: 'stacks',
    description: 'LIFO data structure, core push/pop operations, array vs linked implementations, and applications.',
    subtopics: [
      { id: 'what-is-a-stack', title: 'What is a Stack?', slug: 'what-is-a-stack' },
      { id: 'lifo-principle', title: 'LIFO Principle', slug: 'lifo-principle' },
      { id: 'stack-representation', title: 'Stack Representation', slug: 'stack-representation' },
      { id: 'stack-push', title: 'Push Operation', slug: 'stack-push' },
      { id: 'stack-pop', title: 'Pop Operation', slug: 'stack-pop' },
      { id: 'stack-peek-top', title: 'Peek / Top Operation', slug: 'stack-peek-top' },
      { id: 'stack-implementation-using-array', title: 'Stack Implementation Using Array', slug: 'stack-implementation-using-array' },
      { id: 'stack-implementation-using-linked-list', title: 'Stack Implementation Using Linked List', slug: 'stack-implementation-using-linked-list' },
      { id: 'stack-applications', title: 'Stack Applications', slug: 'stack-applications' },
      { id: 'stack-complexity', title: 'Stack Complexity', slug: 'stack-complexity' }
    ]
  },
  {
    id: 'ds-queues',
    title: '6. Queues',
    slug: 'queues',
    description: 'FIFO data structure, enqueue/dequeue operations, front/rear pointers, array/linked list implementations, applications, and complexity.',
    subtopics: [
      { id: 'what-is-a-queue', title: 'What is a Queue?', slug: 'what-is-a-queue' },
      { id: 'fifo-principle', title: 'FIFO Principle', slug: 'fifo-principle' },
      { id: 'queue-representation', title: 'Queue Representation', slug: 'queue-representation' },
      { id: 'queue-enqueue', title: 'Enqueue Operation', slug: 'queue-enqueue' },
      { id: 'queue-dequeue', title: 'Dequeue Operation', slug: 'queue-dequeue' },
      { id: 'front-and-rear', title: 'Front and Rear', slug: 'front-and-rear' },
      { id: 'queue-implementation-using-array', title: 'Queue Implementation Using Array', slug: 'queue-implementation-using-array' },
      { id: 'queue-implementation-using-linked-list', title: 'Queue Implementation Using Linked List', slug: 'queue-implementation-using-linked-list' },
      { id: 'queue-applications', title: 'Queue Applications', slug: 'queue-applications' },
      { id: 'queue-complexity', title: 'Queue Complexity', slug: 'queue-complexity' }
    ]
  },
  {
    id: 'ds-hash-tables',
    title: '7. Hash Tables',
    slug: 'hash-tables',
    description: 'Hashing concept, key-value mappings, hash functions, insert/search/delete, collision handling, and complexity.',
    subtopics: [
      { id: 'what-is-a-hash-table', title: 'What is a Hash Table?', slug: 'what-is-a-hash-table' },
      { id: 'hashing-concept', title: 'Hashing Concept', slug: 'hashing-concept' },
      { id: 'hash-functions', title: 'Hash Functions', slug: 'hash-functions' },
      { id: 'hash-table-representation', title: 'Hash Table Representation', slug: 'hash-table-representation' },
      { id: 'hash-insert-operation', title: 'Insert Operation', slug: 'hash-insert-operation' },
      { id: 'hash-search-operation', title: 'Search Operation', slug: 'hash-search-operation' },
      { id: 'hash-delete-operation', title: 'Delete Operation', slug: 'hash-delete-operation' },
      { id: 'hash-collisions', title: 'Hash Collisions', slug: 'hash-collisions' },
      { id: 'collision-handling', title: 'Collision Handling', slug: 'collision-handling' },
      { id: 'hash-table-complexity', title: 'Hash Table Complexity', slug: 'hash-table-complexity' }
    ]
  },
  {
    id: 'ds-searching',
    title: '8. Searching Algorithms',
    slug: 'searching-algorithms',
    description: 'Linear Search, Binary Search, iterative vs recursive implementations, comparison, and complexity.',
    subtopics: [
      { id: 'introduction-to-searching', title: 'Introduction to Searching', slug: 'introduction-to-searching' },
      { id: 'linear-search', title: 'Linear Search', slug: 'linear-search' },
      { id: 'linear-search-implementation', title: 'Linear Search Implementation', slug: 'linear-search-implementation' },
      { id: 'binary-search', title: 'Binary Search', slug: 'binary-search' },
      { id: 'binary-search-implementation', title: 'Binary Search Implementation', slug: 'binary-search-implementation' },
      { id: 'iterative-vs-recursive-binary-search', title: 'Iterative vs Recursive Binary Search', slug: 'iterative-vs-recursive-binary-search' },
      { id: 'linear-search-vs-binary-search', title: 'Linear Search vs Binary Search', slug: 'linear-search-vs-binary-search' },
      { id: 'searching-algorithms-complexity', title: 'Searching Algorithms Complexity', slug: 'searching-algorithms-complexity' }
    ]
  },
  {
    id: 'ds-sorting',
    title: '9. Sorting Algorithms',
    slug: 'sorting-algorithms',
    description: 'Bubble, Selection, Insertion, Merge, Quick Sort algorithms, implementations, comparison, and complexity.',
    subtopics: [
      { id: 'introduction-to-sorting', title: 'Introduction to Sorting', slug: 'introduction-to-sorting' },
      { id: 'bubble-sort', title: 'Bubble Sort', slug: 'bubble-sort' },
      { id: 'bubble-sort-implementation', title: 'Bubble Sort Implementation', slug: 'bubble-sort-implementation' },
      { id: 'selection-sort', title: 'Selection Sort', slug: 'selection-sort' },
      { id: 'selection-sort-implementation', title: 'Selection Sort Implementation', slug: 'selection-sort-implementation' },
      { id: 'insertion-sort', title: 'Insertion Sort', slug: 'insertion-sort' },
      { id: 'insertion-sort-implementation', title: 'Insertion Sort Implementation', slug: 'insertion-sort-implementation' },
      { id: 'merge-sort', title: 'Merge Sort', slug: 'merge-sort' },
      { id: 'merge-sort-implementation', title: 'Merge Sort Implementation', slug: 'merge-sort-implementation' },
      { id: 'quick-sort', title: 'Quick Sort', slug: 'quick-sort' },
      { id: 'quick-sort-implementation', title: 'Quick Sort Implementation', slug: 'quick-sort-implementation' },
      { id: 'comparison-of-sorting-algorithms', title: 'Comparison of Sorting Algorithms', slug: 'comparison-of-sorting-algorithms' },
      { id: 'sorting-algorithms-complexity', title: 'Sorting Algorithms Complexity', slug: 'sorting-algorithms-complexity' }
    ]
  },
  {
    id: 'ds-recursion',
    title: '10. Recursion in Data Structures',
    slug: 'recursion-in-data-structures',
    description: 'Base cases, recursive calls, call stack tracking, array/linked list/tree recursion, and complexity.',
    subtopics: [
      { id: 'introduction-to-recursion', title: 'Introduction to Recursion', slug: 'introduction-to-recursion' },
      { id: 'base-case-and-recursive-case', title: 'Base Case and Recursive Case', slug: 'base-case-and-recursive-case' },
      { id: 'how-recursion-works', title: 'How Recursion Works', slug: 'how-recursion-works' },
      { id: 'call-stack-in-recursion', title: 'Call Stack in Recursion', slug: 'call-stack-in-recursion' },
      { id: 'recursive-array-traversal', title: 'Recursive Array Traversal', slug: 'recursive-array-traversal' },
      { id: 'recursive-searching', title: 'Recursive Searching', slug: 'recursive-searching' },
      { id: 'recursion-with-linked-lists', title: 'Recursion with Linked Lists', slug: 'recursion-with-linked-lists' },
      { id: 'recursion-with-trees', title: 'Recursion with Trees', slug: 'recursion-with-trees' },
      { id: 'recursion-vs-iteration', title: 'Recursion vs Iteration', slug: 'recursion-vs-iteration' },
      { id: 'recursion-complexity', title: 'Recursion Complexity', slug: 'recursion-complexity' }
    ]
  },
  {
    id: 'ds-trees',
    title: '11. Trees',
    slug: 'trees',
    description: 'Tree terminology, Binary Trees, BST operations, traversals (Pre/In/Post/Level), and complexity.',
    subtopics: [
      { id: 'introduction-to-trees', title: 'Introduction to Trees', slug: 'introduction-to-trees' },
      { id: 'tree-terminology', title: 'Tree Terminology', slug: 'tree-terminology' },
      { id: 'types-of-trees', title: 'Types of Trees', slug: 'types-of-trees' },
      { id: 'binary-trees', title: 'Binary Trees', slug: 'binary-trees' },
      { id: 'binary-search-trees', title: 'Binary Search Trees', slug: 'binary-search-trees' },
      { id: 'bst-insertion', title: 'BST Insertion', slug: 'bst-insertion' },
      { id: 'bst-searching', title: 'BST Searching', slug: 'bst-searching' },
      { id: 'bst-deletion', title: 'BST Deletion', slug: 'bst-deletion' },
      { id: 'tree-traversals', title: 'Tree Traversals', slug: 'tree-traversals' },
      { id: 'preorder-traversal', title: 'Preorder Traversal', slug: 'preorder-traversal' },
      { id: 'inorder-traversal', title: 'Inorder Traversal', slug: 'inorder-traversal' },
      { id: 'postorder-traversal', title: 'Postorder Traversal', slug: 'postorder-traversal' },
      { id: 'level-order-traversal', title: 'Level Order Traversal', slug: 'level-order-traversal' },
      { id: 'tree-complexity', title: 'Tree Complexity', slug: 'tree-complexity' }
    ]
  },
  {
    id: 'ds-heaps',
    title: '12. Heaps',
    slug: 'heaps',
    description: 'Min Heap, Max Heap, Array Representation, Heapify, Build Heap O(n), Heap Sort, and Complexity.',
    subtopics: [
      { id: 'introduction-to-heaps', title: 'Introduction to Heaps', slug: 'introduction-to-heaps' },
      { id: 'heap-properties', title: 'Heap Properties', slug: 'heap-properties' },
      { id: 'min-heap', title: 'Min Heap', slug: 'min-heap' },
      { id: 'max-heap', title: 'Max Heap', slug: 'max-heap' },
      { id: 'array-representation-of-heap', title: 'Array Representation of Heap', slug: 'array-representation-of-heap' },
      { id: 'heap-insertion', title: 'Heap Insertion', slug: 'heap-insertion' },
      { id: 'heap-deletion', title: 'Heap Deletion', slug: 'heap-deletion' },
      { id: 'heapify', title: 'Heapify', slug: 'heapify' },
      { id: 'building-a-heap', title: 'Building a Heap', slug: 'building-a-heap' },
      { id: 'heap-sort', title: 'Heap Sort', slug: 'heap-sort' },
      { id: 'heap-complexity', title: 'Heap Complexity', slug: 'heap-complexity' }
    ]
  },
  {
    id: 'ds-graphs',
    title: '13. Graphs',
    slug: 'graphs',
    description: 'Vertices, Edges, Adjacency List & Matrix, BFS, DFS, Connected Components, Cycle Detection, and Complexity.',
    subtopics: [
      { id: 'introduction-to-graphs', title: 'Introduction to Graphs', slug: 'introduction-to-graphs' },
      { id: 'graph-terminology', title: 'Graph Terminology', slug: 'graph-terminology' },
      { id: 'types-of-graphs', title: 'Types of Graphs', slug: 'types-of-graphs' },
      { id: 'graph-representation', title: 'Graph Representation', slug: 'graph-representation' },
      { id: 'adjacency-matrix', title: 'Adjacency Matrix', slug: 'adjacency-matrix' },
      { id: 'adjacency-list', title: 'Adjacency List', slug: 'adjacency-list' },
      { id: 'breadth-first-search', title: 'Breadth-First Search (BFS)', slug: 'breadth-first-search' },
      { id: 'depth-first-search', title: 'Depth-First Search (DFS)', slug: 'depth-first-search' },
      { id: 'bfs-vs-dfs', title: 'BFS vs DFS', slug: 'bfs-vs-dfs' },
      { id: 'connected-components', title: 'Connected Components', slug: 'connected-components' },
      { id: 'cycle-detection', title: 'Cycle Detection', slug: 'cycle-detection' },
      { id: 'graph-applications', title: 'Graph Applications', slug: 'graph-applications' },
      { id: 'graph-complexity', title: 'Graph Complexity', slug: 'graph-complexity' }
    ]
  }
];

export function getDsFlattenedNavItems(): DsNavItem[] {
  const items: DsNavItem[] = [];
  DATA_STRUCTURES_CURRICULUM.forEach((sec, sIdx) => {
    sec.subtopics.forEach((sub) => {
      items.push({
        topicId: sec.id,
        subtopicId: sub.id,
        topicTitle: sec.title,
        subtopicTitle: sub.title,
        sectionNumber: sIdx + 1
      });
    });
  });
  return items;
}
