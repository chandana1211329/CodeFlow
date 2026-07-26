export interface DsLesson {
  id: string;
  topicId: string;
  subtopicId: string;
  title: string;
  subtitle?: string;
  categoryTitle: string;
  contentMarkdown: string;
  codePreview?: { code: string; output: string; caption?: string };
  glossary?: { term: string; definition: string }[];
  quizzes?: { question: string; options: string[]; correctAnswer: number; explanation?: string }[];
  summaryPoints?: string[];
  previousLesson?: { topicId: string; subtopicId: string; title: string };
  nextLesson?: { topicId: string; subtopicId: string; title: string };
}

export const DS_LESSONS: Record<string, DsLesson> = {
// =========================================================================
  // SECTION 1 — INTRODUCTION TO DATA STRUCTURES (LESSON 1: What is a Data Structure?)
  // =========================================================================
  'ds-intro/what-is-a-data-structure': {
    id: 'ds-intro/what-is-a-data-structure',
    topicId: 'ds-intro',
    subtopicId: 'what-is-a-data-structure',
    title: 'What is a Data Structure?',
    subtitle: 'Understanding the fundamental meaning of organizing and storing data in computer memory',
    categoryTitle: 'INTRODUCTION TO DATA STRUCTURES',
    contentMarkdown: `# 1. START WITH DATA

Every computer program works with **data** (information):

\`\`\`python
student_name = "Alex"    # String data
student_age = 22         # Integer data
score = 85.5             # Float data
is_enrolled = True       # Boolean data
\`\`\`

\`\`\`text
DATA TYPES
    │
    ├── Names ("Alex", "Maya")
    ├── Numbers (22, 85.5)
    ├── Statuses (True, False)
    └── Products, Messages, Coordinates
\`\`\`

---

# 2. THE PROBLEM OF SEPARATE DATA

Imagine managing student information for a school with 10,000 students using separate variables:

\`\`\`python
student1 = "Alex"
student2 = "Maya"
student3 = "Rahul"
student4 = "Sara"
# ... What happens when there are 10,000 students?! 😱
\`\`\`

How would you search for a student, calculate average scores, or add a new student without typing 10,000 separate variable names?

---

# 3. DEFINITION: WHAT IS A DATA STRUCTURE?

> 📌 **DEFINITION**
> **A Data Structure is a specialized way of organizing and storing data in computer memory so that it can be accessed, managed, and used effectively.**

\`\`\`text
  DATA           ORGANIZATION          DATA STRUCTURE
┌──────┐        ┌──────────────┐      ┌──────────────────────────┐
│ Alex │   +    │ Arranged in  │  ═   │ students = ["Alex",      │
│ Maya │        │ a sequence   │      │             "Maya"]      │
└──────┘        └──────────────┘      └──────────────────────────┘
\`\`\`

Instead of isolated loose variables:
\`\`\`python
students = ["Alex", "Maya", "Rahul"]
\`\`\`

Visual memory arrangement:
\`\`\`text
students ──► [ "Alex" ][ "Maya" ][ "Rahul" ]
\`\`\`

---

# 4. REAL-WORLD ANALOGY

Think of books:

\`\`\`text
Books lying scattered on the floor
    │
    └── UNSTRUCTURED DATA (Hard to search!)

Bookshelf arrangement
    │
    └── STRUCTURE / ORGANIZATION

Books categorized on a bookshelf
    │
    └── STRUCTURED DATA (Instant lookup!)
\`\`\`

---

# 5. PREVIEW OF COMMON DATA STRUCTURE SHAPES

Here are the primary structural shapes you will study across this course:

- **Array (Contiguous Slots):** \`[ A ][ B ][ C ][ D ]\`
- **Linked Structure (Pointers):** \`[ A ] ──► [ B ] ──► [ C ]\`
- **Stack (LIFO — Push/Pop Top):** Top \`[ D ]\` over \`[ C ]\` over \`[ B ]\`
- **Queue (FIFO — Arrival Order):** Front \`[ A ][ B ][ C ][ D ]\` Rear
- **Tree (Hierarchical Nodes):** Root \`A\` branching into \`B\` and \`C\`
- **Graph (Network):** Vertices connected by edges \`A ── B ── C\`

> 💡 **CRITICAL CONCEPT:**
> **SAME DATA + DIFFERENT ORGANIZATION = DIFFERENT DATA STRUCTURE**

---

# 6. DATA STRUCTURES STUDIO

\`\`\`ds-intro-widget
DATA + ORG = DATA STRUCTURE
\`\`\`

---

# 7. COMMON BEGINNER MISCONCEPTIONS

- ❌ **Misconception:** "A data structure is just syntax in Python."
  - **Correction:** Syntax is language-specific; a data structure is an abstract **conceptual organization model** that exists in computer science regardless of language.
- ❌ **Misconception:** "Separate variables are fine for large programs."
  - **Correction:** Managing thousands of loose variables is impossible; structures enable algorithms to process large collections cleanly.

---

# 8. LESSON SUMMARY

✓ Data represents information used by programs.
✓ Programs must manage collections of data efficiently.
✓ **DATA + ORGANIZATION = DATA STRUCTURE**.
✓ The same data can be organized in multiple different structural shapes.`,
    codePreview: {
      code: `# Separate unorganized variables vs Organized Data Structure:\nstudents = ["Alex", "Maya", "Rahul"]\nprint("First student:", students[0])\nprint("Total students:", len(students))`,
      output: `First student: Alex\nTotal students: 3`,
      caption: 'Organizing data in a contiguous list structure'
    },
    glossary: [
      { term: 'Data', definition: 'Raw values, facts, or information processed by computer programs.' },
      { term: 'Data Structure', definition: 'A specialized format for organizing and storing data in computer memory.' }
    ],
    quizzes: [
      {
    question: '1. What is the fundamental formula for a Data Structure?',
    options: [
      'LOOP + IF = DATA STRUCTURE',
      'CPU + RAM = DATA STRUCTURE',
      'CODE + SYNTAX = DATA STRUCTURE',
      'DATA + ORGANIZATION = DATA STRUCTURE'
    ],
    correctAnswer: 3,
    explanation: 'Data combined with a specific structural organization forms a data structure.'
  },
      {
    question: '2. Why are 10,000 separate variable names inefficient for managing data?',
    options: [
      'Python crashes immediately',
      'You cannot iterate or manage them cleanly with algorithms',
      'Variables take 100x more memory',
      'Variables are invalid'
    ],
    correctAnswer: 1,
    explanation: 'Loose separate variables cannot be processed dynamically using loops or algorithms.'
  }
    
    ],
    summaryPoints: [
      'Data represents information.',
      'Data structures organize data in memory.',
      'Organization enables dynamic algorithm processing.',
      'Same data can be organized in different structural shapes.'
    ],
    previousLesson: undefined,
    nextLesson: {
      topicId: 'ds-intro',
      subtopicId: 'why-data-structures',
      title: 'Why Data Structures?'
    }
  },

  // =========================================================================
  // SECTION 1 — INTRODUCTION TO DATA STRUCTURES (LESSON 2: Why Data Structures?)
  // =========================================================================
  'ds-intro/why-data-structures': {
    id: 'ds-intro/why-data-structures',
    topicId: 'ds-intro',
    subtopicId: 'why-data-structures',
    title: 'Why Data Structures?',
    subtitle: 'Understanding why programs need organized data management for access, modification, and processing',
    categoryTitle: 'INTRODUCTION TO DATA STRUCTURES',
    contentMarkdown: `# 1. WHY DO PROGRAMMERS NEED DATA STRUCTURES?

Imagine managing 10,000 student names using separate variables:

\`\`\`python
student1 = "Alex"
student2 = "Maya"
# ... up to student10000
\`\`\`

Ask yourself:
- How would you **find** a student named "Maya"?
- How would you **add** a new student?
- How would you **remove** a student who graduated?
- How would you **process** every student's final grade?
- How would you **organize relationships** between students and courses?

Without data structures, writing code for these operations is nearly impossible!

---

# 2. THE FIVE CORE REASONS FOR DATA STRUCTURES

Data structures provide solutions for five critical application requirements:

1. **ORGANIZATION:** Keeping related items grouped together logically.
2. **ACCESS:** Efficiently retrieving specific required information.
3. **MODIFICATION:** Adding, removing, or updating records safely.
4. **PROCESSING:** Traversing and performing operations over entire collections.
5. **REPRESENTATION:** Modeling real-world relationships (hierarchies, networks, queues).

---

# 3. REAL-WORLD APPLICATION EXAMPLES

| Application Category | Managed Data | Structural Need |
| :--- | :--- | :--- |
| **Music Streaming App** | Songs, Playlists, History | Ordering, recent history (Stack/Queue) |
| **E-Commerce Store** | Products, Cart Items, Orders | Fast lookup, cart management |
| **Social Network** | Users, Posts, Connections | Friend graph relationships |
| **Navigation App** | Cities, Roads, Routes | Shortest path graph network |

---

# 4. UNORGANIZED VS ORGANIZED DATA

\`\`\`text
UNORGANIZED DATA ──► Difficult to manage, slow lookup, error-prone
ORGANIZED DATA   ──► Simple for algorithms to search, update, and process
\`\`\`

> ⚠️ **IMPORTANT CAUTION:**
> **No single data structure makes every operation fast.** Different data structures have different strengths and trade-offs.

---

# 5. LESSON SUMMARY

✓ Real programs work with large amounts of related information.
✓ Data structures facilitate **Access**, **Modification**, **Processing**, and **Representation**.
✓ Different applications require different organizational models.`,
    codePreview: {
      code: `# Organizing products in a shopping cart:\ncart = ["Laptop", "Mouse", "Keyboard"]\nprint("Items in cart:", len(cart))\n# Adding item:\ncart.append("Headphones")\nprint("Updated cart:", cart)`,
      output: `Items in cart: 3\nUpdated cart: ['Laptop', 'Mouse', 'Keyboard', 'Headphones']`,
      caption: 'Organizing and modifying dynamic collection data'
    },
    glossary: [
      { term: 'Access', definition: 'The process of retrieving stored information from a data structure.' },
      { term: 'Modification', definition: 'Adding, deleting, or updating elements within a data structure.' }
    ],
    quizzes: [
      {
    question: '1. What are the core reasons programs use data structures?',
    options: [
      'To hide variables',
      'Organization, Access, Modification, Processing, Representation',
      'To require CPU cooling',
      'To make code longer'
    ],
    correctAnswer: 1,
    explanation: 'Data structures exist to organize, access, modify, process, and represent data efficiently.'
  }
    
    ],
    summaryPoints: [
      'Data structures enable efficient data access & modification.',
      'Organizes collections for processing.',
      'Models real-world application relationships.'
    ],
    previousLesson: {
      topicId: 'ds-intro',
      subtopicId: 'what-is-a-data-structure',
      title: 'What is a Data Structure?'
    },
    nextLesson: {
      topicId: 'ds-intro',
      subtopicId: 'types-of-data-structures',
      title: 'Types of Data Structures'
    }
  },

  // =========================================================================
  // SECTION 1 — INTRODUCTION TO DATA STRUCTURES (LESSON 3: Types of Data Structures)
  // =========================================================================
  'ds-intro/types-of-data-structures': {
    id: 'ds-intro/types-of-data-structures',
    topicId: 'ds-intro',
    subtopicId: 'types-of-data-structures',
    title: 'Types of Data Structures',
    subtitle: 'Overview and structural classification map of data structures',
    categoryTitle: 'INTRODUCTION TO DATA STRUCTURES',
    contentMarkdown: `# 1. CLASSIFICATION OF DATA STRUCTURES

Data structures are categorized into two primary categories:

\`\`\`text
                      DATA STRUCTURES
                             │
            ┌────────────────┴────────────────┐
            │                                 │
    PRIMITIVE / BASIC               NON-PRIMITIVE / COMPOSITE
  (int, float, bool, char)           (Organized Collections)
                                              │
                              ┌───────────────┴───────────────┐
                              │                               │
                      LINEAR STRUCTURES              NON-LINEAR STRUCTURES
                   (Array, Linked List,            (Trees, Graphs)
                     Stack, Queue)
\`\`\`

---

# 2. OVERVIEW OF MAJOR STRUCTURES

You will master each of these structures in dedicated sections throughout this course:

1. **Arrays:** Fixed/contiguous sequential slots \`[ A ][ B ][ C ][ D ]\`
2. **Linked Lists:** Nodes linked via pointers \`[ A ] ──► [ B ] ──► [ C ]\`
3. **Stacks:** LIFO structure (Last In, First Out)
4. **Queues:** FIFO structure (First In, First Out)
5. **Hash Tables:** Key-Value pair mapping for instant lookup
6. **Trees:** Hierarchical branching parent-child structures
7. **Heaps:** Priority-based tree structures
8. **Graphs:** Complex network vertices connected by edges

---

# 3. LESSON SUMMARY

✓ Data structures divide into **Linear** and **Non-Linear** types.
✓ Primitive types hold single basic values; Non-primitive structures organize collections.
✓ Each structure offers a unique visual shape and operational behavior.`,
    codePreview: {
      code: `# Primitive vs Non-primitive composite structure:\nage = 25  # Primitive integer\nscores = [90, 85, 95]  # Composite array/list structure\nprint("Primitive age:", age)\nprint("Composite scores:", scores)`,
      output: `Primitive age: 25\nComposite scores: [90, 85, 95]`,
      caption: 'Primitive single values vs Composite collections'
    },
    glossary: [
      { term: 'Primitive Type', definition: 'Basic single-value building blocks like integers, floats, booleans, and characters.' },
      { term: 'Non-Primitive Structure', definition: 'Data structures that store collections of values (e.g. Arrays, Trees, Graphs).' }
    ],
    quizzes: [
      {
    question: '1. Which of the following is a Non-Primitive data structure?',
    options: [
      'Boolean',
      'Integer',
      'Float',
      'Array'
    ],
    correctAnswer: 3,
    explanation: 'Arrays store composite collections of values, making them non-primitive structures.'
  }
    
    ],
    summaryPoints: [
      'Primitive vs Non-primitive classification.',
      'Linear: Arrays, Linked Lists, Stacks, Queues.',
      'Non-linear: Trees, Graphs.'
    ],
    previousLesson: {
      topicId: 'ds-intro',
      subtopicId: 'why-data-structures',
      title: 'Why Data Structures?'
    },
    nextLesson: {
      topicId: 'ds-intro',
      subtopicId: 'linear-vs-non-linear',
      title: 'Linear vs Non-Linear'
    }
  },

  // =========================================================================
  // SECTION 1 — INTRODUCTION TO DATA STRUCTURES (LESSON 4: Linear vs Non-Linear)
  // =========================================================================
  'ds-intro/linear-vs-non-linear': {
    id: 'ds-intro/linear-vs-non-linear',
    topicId: 'ds-intro',
    subtopicId: 'linear-vs-non-linear',
    title: 'Linear vs Non-Linear',
    subtitle: 'Distinguishing sequential data arrangements from branching hierarchical networks',
    categoryTitle: 'INTRODUCTION TO DATA STRUCTURES',
    contentMarkdown: `# 1. LINEAR DATA STRUCTURES

In a **Linear Data Structure**, elements are organized in a **single sequential line** where each element (except first and last) has a clear predecessor and successor:

\`\`\`text
START ──► [ Element A ] ──► [ Element B ] ──► [ Element C ] ──► [ Element D ]
\`\`\`

### Linear Examples:
- **Arrays:** Contiguous indexed sequence.
- **Linked Lists:** Sequential node chain.
- **Stacks:** Last-In, First-Out sequence.
- **Queues:** First-In, First-Out sequence.

---

# 2. NON-LINEAR DATA STRUCTURES

In a **Non-Linear Data Structure**, elements are **NOT** organized in a single line. Elements can connect to multiple other elements, forming **branching or network relationships**:

\`\`\`text
TREE (Hierarchical Branching)         GRAPH (Network Interconnections)
          [ Root A ]                              [ City A ]
          /        \\                             /        \\
    [ Child B ]  [ Child C ]               [ City B ] ──── [ City C ]
\`\`\`

---

# 3. COMPARISON & COMMON MISCONCEPTIONS

| Attribute | Linear Structures | Non-Linear Structures |
| :--- | :--- | :--- |
| **Arrangement** | Sequential (one after another) | Branching / Networked |
| **Traversal** | Single pass from start to end | Multiple paths (BFS/DFS) |
| **Examples** | Array, Linked List, Stack, Queue | Tree, Graph |

> 📌 **COMMON MISCONCEPTIONS:**
> - ❌ *Linear does not mean "drawn in a straight horizontal line on paper."* It means a single sequential progression.
> - ❌ *Non-linear does not mean unorganized or random.* Trees and graphs follow strict structural rules!

---

# 4. LESSON SUMMARY

✓ Linear structures arrange items in a single sequential progression.
✓ Non-linear structures represent branching or network relationships.
✓ Non-linear structures still follow strict organizational logic.`,
    codePreview: {
      code: `# Sequential Linear Sequence vs Non-Linear Parent-Child Dictionary:\nlinear_seq = [10, 20, 30, 40]\ntree_node = {"value": "Root A", "children": ["Child B", "Child C"]}\nprint("Linear:", linear_seq)\nprint("Tree Node:", tree_node)`,
      output: `Linear: [10, 20, 30, 40]\nTree Node: {'value': 'Root A', 'children': ['Child B', 'Child C']}`,
      caption: 'Linear sequential list vs Non-linear tree hierarchy node'
    },
    glossary: [
      { term: 'Linear Structure', definition: 'A data structure where elements form a single sequential sequence.' },
      { term: 'Non-Linear Structure', definition: 'A data structure where elements connect hierarchically or as a network.' }
    ],
    quizzes: [
      {
    question: '1. Which structure is a Non-Linear data structure?',
    options: [
      'Tree',
      'Stack',
      'Array',
      'Queue'
    ],
    correctAnswer: 0,
    explanation: 'Trees represent hierarchical branching relationships, making them non-linear.'
  }
    
    ],
    summaryPoints: [
      'Linear: Sequential arrangement.',
      'Non-linear: Hierarchical or network arrangement.',
      'Non-linear structures are structured, not random.'
    ],
    previousLesson: {
      topicId: 'ds-intro',
      subtopicId: 'types-of-data-structures',
      title: 'Types of Data Structures'
    },
    nextLesson: {
      topicId: 'ds-intro',
      subtopicId: 'static-vs-dynamic',
      title: 'Static vs Dynamic'
    }
  },

  // =========================================================================
  // SECTION 1 — INTRODUCTION TO DATA STRUCTURES (LESSON 5: Static vs Dynamic)
  // =========================================================================
  'ds-intro/static-vs-dynamic': {
    id: 'ds-intro/static-vs-dynamic',
    topicId: 'ds-intro',
    subtopicId: 'static-vs-dynamic',
    title: 'Static vs Dynamic',
    subtitle: 'Understanding fixed-capacity reservation vs flexible dynamic resizing models',
    categoryTitle: 'INTRODUCTION TO DATA STRUCTURES',
    contentMarkdown: `# 1. STATIC DATA STRUCTURES

A **Static Data Structure** has a **fixed size/capacity** allocated in advance:

\`\`\`text
Reserved Capacity = 5 Slots
[ 10 ][ 20 ][ 30 ][  Empty  ][  Empty  ]
\`\`\`

- **Fixed Capacity:** Allocated once when created.
- **Filling Capacity:** If all 5 slots fill up, adding item #6 requires creating an entirely new, larger memory block!

---

# 2. DYNAMIC DATA STRUCTURES

A **Dynamic Data Structure** can **grow or shrink** flexibly in memory during program execution:

\`\`\`text
Initial: [ A ]
Add B:   [ A ][ B ]
Add C:   [ A ][ B ][ C ]
Remove:  [ A ][ B ]
\`\`\`

---

# 3. CONNECTION TO PYTHON LISTS

In Python, the built-in \`list\` type behaves **dynamically** from the programmer's perspective:

\`\`\`python
items = []           # Size 0
items.append(10)     # Size 1
items.append(20)     # Size 2
items.pop()          # Size 1 (Shrinks back!)
\`\`\`

> 💡 **IMPORTANT NOTE:**
> Python lists resize automatically under the hood, but this does NOT mean Python lists are linked lists! Underneath, Python lists use dynamic resizable arrays.

---

# 4. LESSON SUMMARY

✓ Static structures use fixed-capacity memory models.
✓ Dynamic structures adapt size flexibly at runtime.
✓ Python lists provide dynamic resizable behavior.`,
    codePreview: {
      code: `# Dynamic growth of Python lists:\nnums = []\nfor i in range(1, 4):\n    nums.append(i * 10)\n    print(f"Size {len(nums)}:", nums)`,
      output: `Size 1: [10]\nSize 2: [10, 20]\nSize 3: [10, 20, 30]`,
      caption: 'Dynamic growth of Python list collection'
    },
    glossary: [
      { term: 'Static Structure', definition: 'A data structure whose size and memory capacity are fixed in advance.' },
      { term: 'Dynamic Structure', definition: 'A data structure that can expand or shrink its capacity at runtime.' }
    ],
    quizzes: [
      {
    question: '1. What defines a static data structure?',
    options: [
      'It can grow infinitely',
      'It only stores numbers',
      'Its size/capacity is fixed in advance',
      'It runs without memory'
    ],
    correctAnswer: 2,
    explanation: 'Static data structures have a fixed size allocated at creation.'
  }
    
    ],
    summaryPoints: [
      'Static: Predetermined fixed capacity.',
      'Dynamic: Flexible growth & shrinkage at runtime.',
      'Python lists are dynamically resizable.'
    ],
    previousLesson: {
      topicId: 'ds-intro',
      subtopicId: 'linear-vs-non-linear',
      title: 'Linear vs Non-Linear'
    },
    nextLesson: {
      topicId: 'ds-intro',
      subtopicId: 'choosing-the-right-data-structure',
      title: 'Choosing the Right Data Structure'
    }
  },

  // =========================================================================
  // SECTION 1 — INTRODUCTION TO DATA STRUCTURES (LESSON 6: Choosing the Right Data Structure)
  // =========================================================================
  'ds-intro/choosing-the-right-data-structure': {
    id: 'ds-intro/choosing-the-right-data-structure',
    topicId: 'ds-intro',
    subtopicId: 'choosing-the-right-data-structure',
    title: 'Choosing the Right Data Structure',
    subtitle: 'Evaluating problem constraints, operational requirements, and trade-offs',
    categoryTitle: 'INTRODUCTION TO DATA STRUCTURES',
    contentMarkdown: `# 1. THERE IS NO "BEST" DATA STRUCTURE!

Ask yourself: **"Which data structure is the best?"**

> 📌 **THE ANSWER IS:**
> **It depends entirely on the problem!**

\`\`\`text
PROBLEM REQUIREMENTS
        │
        ├── What operations are most frequent? (Search? Insert? Delete?)
        ├── How is the data related? (Sequential? Hierarchical? Network?)
        └── What constraints matter most? (Speed? Memory?)
        │
        └── CHOOSE SUITABLE STRUCTURE!
\`\`\`

---

# 2. SCENARIO MATCHING PREVIEWS

| Application Requirement | Typical Ideal Structure | Why? |
| :--- | :--- | :--- |
| **Undo / Redo Action History** | **Stack** | Most recent action is undone first (LIFO). |
| **Customer Support Waiting Line** | **Queue** | First customer to arrive is served first (FIFO). |
| **Corporate Org Chart** | **Tree** | Represents hierarchical parent-child roles. |
| **Network of Flight Connections** | **Graph** | Represents complex city connections & routes. |
| **Instant Username Lookup** | **Hash Table** | Maps unique keys directly to user profiles. |

---

# 3. MASTER VISUAL SUMMARY FOR SECTION 1

\`\`\`text
                              DATA
                               │
                       NEED TO ORGANIZE
                               │
                        DATA STRUCTURE
                               │
                 ┌─────────────┴─────────────┐
               LINEAR                    NON-LINEAR
         (Sequential Order)         (Branching Networks)
                 │                           │
                 └─────────────┬─────────────┘
                               │
                     SIZE BEHAVIOR CAN VARY
                        (Static / Dynamic)
                               │
                     CHOOSE SUITABLE STRUCTURE!
\`\`\`

---

# 4. LESSON SUMMARY

✓ There is no single universally superior data structure.
✓ Match data structure selection to application requirements.
✓ **RIGHT STRUCTURE = STRUCTURE SUITED TO THE PROBLEM**.`,
    codePreview: {
      code: `# Matching problem patterns:\n# Undo stack history:\nhistory = []\nhistory.append("Page 1")\nhistory.append("Page 2")\nprint("Current Page:", history.pop())  # Page 2 popped first!`,
      output: `Current Page: Page 2`,
      caption: 'Using a stack structure for LIFO undo history'
    },
    glossary: [
      { term: 'Trade-off', definition: 'Balancing the benefits of one structure (e.g. fast lookup) against its drawbacks (e.g. slower insertion).' }
    ],
    quizzes: [
      {
    question: '1. What principle determines the "right" data structure to use?',
    options: [
      'Whichever takes the most lines of code',
      'Always use arrays',
      'Always use the most complex structure',
      'The structure suited to the specific problem requirements'
    ],
    correctAnswer: 3,
    explanation: 'The right data structure is the one that best suits the specific operations and relationships of the problem.'
  }
    
    ],
    summaryPoints: [
      'No universally best data structure exists.',
      'Selection depends on operation frequencies and relationships.',
      'Right structure = structure suited to the problem.'
    ],
    previousLesson: {
      topicId: 'ds-intro',
      subtopicId: 'static-vs-dynamic',
      title: 'Static vs Dynamic'
    },
    nextLesson: {
      topicId: 'ds-complexity',
      subtopicId: 'what-is-an-algorithm',
      title: 'What is an Algorithm?'
    }
  },
// =========================================================================
  // SECTION 2 — COMPLEXITY ANALYSIS (LESSON 1: What is an Algorithm?)
  // =========================================================================
  'ds-complexity/what-is-an-algorithm': {
    id: 'ds-complexity/what-is-an-algorithm',
    topicId: 'ds-complexity',
    subtopicId: 'what-is-an-algorithm',
    title: 'What is an Algorithm?',
    subtitle: 'Understanding finite sequences of well-defined steps to solve problems',
    categoryTitle: 'COMPLEXITY ANALYSIS',
    contentMarkdown: `# 1. START WITH A REAL-WORLD PROCESS

Think of a simple recipe like making tea:
1. Boil water
2. Add tea leaves
3. Add milk
4. Add sugar
5. Serve

A task is completed by following an exact sequence of steps. Programming uses the same fundamental idea!

---

# 2. DEFINITION: WHAT IS AN ALGORITHM?

> 📌 **DEFINITION**
> **An algorithm is a finite sequence of well-defined steps used to solve a specific problem or perform a task.**

\`\`\`text
INPUT ──► [ WELL-DEFINED STEPS / LOGIC ] ──► OUTPUT
\`\`\`

---

# 3. ALGORITHM VS PROGRAMMING LANGUAGE

Consider finding the largest number in a list \`[4, 8, 2, 10, 5]\`:

### Conceptual Steps (The Algorithm):
1. Assume the first number is the current largest.
2. Inspect the next number.
3. If it is larger than current largest, update largest.
4. Repeat until all numbers are checked.
5. Return the largest number.

### Implementation in Python (The Code):
\`\`\`python
def find_largest(numbers):
    largest = numbers[0]
    for number in numbers:
        if number > largest:
            largest = number
    return largest
\`\`\`

> 💡 **CRITICAL DISTINCTION:**
> **ALGORITHM ≠ PROGRAMMING LANGUAGE**
> The same algorithm can be implemented in Python, Java, C++, JavaScript, or pseudocode!

---

# 4. PROPERTIES OF A USEFUL ALGORITHM

- **Clear & Unambiguous:** Every step is precisely defined.
- **Finite:** The sequence must eventually terminate.
- **Feasible:** Every instruction can actually be performed.
- **Language-Independent:** Logic remains valid regardless of language.

---

# 5. LESSON SUMMARY

✓ An algorithm is a sequence of steps for solving a problem.
✓ Algorithms receive input and produce an intended output.
✓ Code is an implementation of an algorithm in a specific language.
✓ Different algorithms can solve the same problem with different amounts of work.`,
    codePreview: {
      code: `def find_largest(numbers):\n    largest = numbers[0]\n    for number in numbers:\n        if number > largest:\n            largest = number\n    return largest\n\nnums = [4, 8, 2, 10, 5]\nprint("Largest number:", find_largest(nums))`,
      output: `Largest number: 10`,
      caption: 'Implementing the max-finding algorithm in Python'
    },
    glossary: [
      { term: 'Algorithm', definition: 'A finite sequence of well-defined instructions for solving a problem.' }
    ],
    quizzes: [
      {
    question: '1. What is the difference between an algorithm and Python code?',
    options: [
      'Algorithms only exist in math books',
      'An algorithm is the abstract step-by-step logic; Python code is one language implementation',
      'Python code runs without an algorithm',
      'They are identical'
    ],
    correctAnswer: 1,
    explanation: 'An algorithm is the underlying logic; programming languages implement that logic.'
  }
    
    ],
    summaryPoints: [
      'An algorithm is a finite sequence of steps.',
      'Input → Algorithm Logic → Output.',
      'Algorithm logic is independent of programming language.'
    ],
    previousLesson: {
      topicId: 'ds-intro',
      subtopicId: 'choosing-the-right-data-structure',
      title: 'Choosing the Right Data Structure'
    },
    nextLesson: {
      topicId: 'ds-complexity',
      subtopicId: 'time-complexity',
      title: 'Time Complexity'
    }
  },

  // =========================================================================
  // SECTION 2 — COMPLEXITY ANALYSIS (LESSON 2: Time Complexity)
  // =========================================================================
  'ds-complexity/time-complexity': {
    id: 'ds-complexity/time-complexity',
    topicId: 'ds-complexity',
    subtopicId: 'time-complexity',
    title: 'Time Complexity',
    subtitle: 'Measuring how algorithmic work grows as input size (n) increases',
    categoryTitle: 'COMPLEXITY ANALYSIS',
    contentMarkdown: `# 1. WHAT IS TIME COMPLEXITY?

> 📌 **DEFINITION**
> **Time complexity describes how the amount of work performed by an algorithm grows as the input size (n) grows.**

\`\`\`text
INPUT SIZE (n) ──► ALGORITHM WORK ──► HOW DOES WORK GROW?
\`\`\`

---

# 2. TIME COMPLEXITY IS NOT A STOPWATCH!

Why don't we measure time complexity simply using seconds on a stopwatch?

Measured execution seconds depend heavily on:
- Hardware CPU speed & memory performance
- Background computer tasks
- Compiler/interpreter optimizations
- Programming language overhead

> 💡 **KEY CONCEPT:**
> Time complexity focuses on **growth trend of operations**, not raw seconds measured on a specific computer!

---

# 3. INPUT SIZE (n) AND WORK GROWTH

Let \`n\` represent the number of items in a collection:

\`\`\`python
# For loop inspecting n items:
for number in numbers:
    print(number)
\`\`\`

- If \`n = 4\` items $\rightarrow$ 4 loop iterations.
- If \`n = 1,000\` items $\rightarrow$ 1,000 loop iterations.
- If \`n = 1,000,000\` items $\rightarrow$ 1,000,000 loop iterations.

Work scales directly alongside input size \`n\`!

---

# 4. COMPLEXITY ANALYSIS STUDIO

\`\`\`complexity-analysis-widget
Growth Chart
\`\`\`

---

# 5. LESSON SUMMARY

✓ Time complexity measures growth in algorithmic work.
✓ \`n\` represents input size.
✓ Focuses on operation scaling trends rather than stopwatch seconds.`,
    codePreview: {
      code: `def print_all(items):\n    iterations = 0\n    for item in items:\n        iterations += 1\n    return iterations\n\nprint("n = 5 iterations:", print_all([1, 2, 3, 4, 5]))\nprint("n = 10 iterations:", print_all(list(range(10))))`,
      output: `n = 5 iterations: 5\nn = 10 iterations: 10`,
      caption: 'Operations scaling proportionally with input size n'
    },
    glossary: [
      { term: 'Time Complexity', definition: 'The rate of growth in computational steps as input size n grows.' },
      { term: 'Input Size (n)', definition: 'The quantity of elements supplied as input to an algorithm.' }
    ],
    quizzes: [
      {
    question: '1. Why is time complexity NOT measured in raw stopwatch seconds?',
    options: [
      'Python doesn’t have a clock',
      'Big O prohibits clocks',
      'Seconds cannot be measured',
      'Stopwatch seconds vary across different computer hardware'
    ],
    correctAnswer: 3,
    explanation: 'Hardware performance varies; complexity measures algorithmic work growth trends independently of hardware.'
  }
    
    ],
    summaryPoints: [
      'Time complexity measures work growth.',
      'n represents input size.',
      'Measures operation trends, not hardware stopwatch seconds.'
    ],
    previousLesson: {
      topicId: 'ds-complexity',
      subtopicId: 'what-is-an-algorithm',
      title: 'What is an Algorithm?'
    },
    nextLesson: {
      topicId: 'ds-complexity',
      subtopicId: 'space-complexity',
      title: 'Space Complexity'
    }
  },

  // =========================================================================
  // SECTION 2 — COMPLEXITY ANALYSIS (LESSON 3: Space Complexity)
  // =========================================================================
  'ds-complexity/space-complexity': {
    id: 'ds-complexity/space-complexity',
    topicId: 'ds-complexity',
    subtopicId: 'space-complexity',
    title: 'Space Complexity',
    subtitle: 'Measuring memory growth requirements as input size increases',
    categoryTitle: 'COMPLEXITY ANALYSIS',
    contentMarkdown: `# 1. WHAT IS SPACE COMPLEXITY?

In addition to computation steps, algorithms require computer **memory**:

> 📌 **DEFINITION**
> **Space complexity describes how the amount of additional memory required by an algorithm grows as the input size (n) grows.**

\`\`\`text
TIME COMPLEXITY  ──► HOW WORK GROWS
SPACE COMPLEXITY ──► HOW MEMORY REQUIREMENTS GROW
\`\`\`

---

# 2. COMPARING MEMORY REQUIREMENTS

### Example A: Constant Extra Space
\`\`\`python
def get_first(numbers):
    first = numbers[0]  # Uses 1 variable regardless of list size!
    return first
\`\`\`

Whether \`numbers\` contains 5 elements or 10,000,000 elements, this function creates only **1 single temporary variable**!

### Example B: Linear Extra Space
\`\`\`python
def copy_numbers(numbers):
    copied = []
    for number in numbers:
        copied.append(number)  # Allocates a new list of size n!
    return copied
\`\`\`

If input contains \`n\` items, \`copy_numbers\` creates a brand new collection of \`n\` items in memory. Memory requirement scales directly with \`n\`!

---

# 3. COMMON SOURCES OF EXTRA MEMORY

- Temporary variables and accumulators
- Auxiliary lists, dictionaries, or sets created inside functions
- Call stack frames created by recursive calls

---

# 4. LESSON SUMMARY

✓ Space complexity measures memory growth.
✓ Focuses on additional working memory allocated while solving problems.
✓ Time and space represent two distinct algorithmic resources.`,
    codePreview: {
      code: `# Constant space vs Linear auxiliary space:\ndef square_in_place(nums):\n    # Modifies existing list without creating a new list\n    for i in range(len(nums)):\n        nums[i] *= nums[i]\n    return nums\n\nprint("Squared:", square_in_place([2, 3, 4]))`,
      output: `Squared: [4, 9, 16]`,
      caption: 'In-place modification reusing memory'
    },
    glossary: [
      { term: 'Space Complexity', definition: 'The rate of growth in memory allocation required by an algorithm as input size n grows.' },
      { term: 'Auxiliary Space', definition: 'The extra or temporary space used by an algorithm excluding input data.' }
    ],
    quizzes: [
      {
    question: '1. What does space complexity measure?',
    options: [
      'Hard drive file size',
      'Growth in additional memory required as input size grows',
      'Number of print calls',
      'Monitor resolution'
    ],
    correctAnswer: 1,
    explanation: 'Space complexity measures how memory requirements scale with input size.'
  }
    
    ],
    summaryPoints: [
      'Space complexity measures memory growth.',
      'Auxiliary space is temporary working memory.',
      'Time and space are two separate algorithmic resources.'
    ],
    previousLesson: {
      topicId: 'ds-complexity',
      subtopicId: 'time-complexity',
      title: 'Time Complexity'
    },
    nextLesson: {
      topicId: 'ds-complexity',
      subtopicId: 'big-o-notation',
      title: 'Big O Notation'
    }
  },

  // =========================================================================
  // SECTION 2 — COMPLEXITY ANALYSIS (LESSON 4: Big O Notation)
  // =========================================================================
  'ds-complexity/big-o-notation': {
    id: 'ds-complexity/big-o-notation',
    topicId: 'ds-complexity',
    subtopicId: 'big-o-notation',
    title: 'Big O Notation',
    subtitle: 'Standardized notation for classifying upper-bound algorithmic growth classes',
    categoryTitle: 'COMPLEXITY ANALYSIS',
    contentMarkdown: `# 1. WHAT IS BIG O NOTATION?

> 📌 **DEFINITION**
> **Big O notation is a standardized mathematical notation used to describe how an algorithm\'s resource requirements (time or space) grow as the input size (n) becomes very large.**

---

# 2. COMMON BIG O GROWTH CLASSES

\`\`\`text
WORK (Growth Rate)
  ▲
  │                                    O(n²) Quadratic
  │                                 /
  │                             /
  │                         O(n) Linear
  │                      /
  │                  /
  │              O(log n) Logarithmic
  │          ____
  │────────────────────────── O(1) Constant
  └──────────────────────────────────────────► INPUT SIZE (n)
\`\`\`

---

# 3. BIG O SIMPLIFICATION RULES

When classifying algorithms into Big O categories:

1. **Ignore Constants:** Coefficients do not change the growth class.
   - \`2n\` $\rightarrow$ **\`O(n)\`**
   - \`100n\` $\rightarrow$ **\`O(n)\`**
2. **Focus on Dominant Terms:** Drop lower-order terms as \`n\` becomes very large.
   - \`n² + n + 10\` $\rightarrow$ **\`O(n²)\`**
   - \`3n + 5\` $\rightarrow$ **\`O(n)\`**

> 💡 **IMPORTANT NOTE:**
> Constants are ignored for **growth classification**, not because they take zero time!

---

# 4. LESSON SUMMARY

✓ Big O classifies algorithm growth trends.
✓ Key classes: \`O(1)\`, \`O(log n)\`, \`O(n)\`, \`O(n²)\`.
✓ Ignores constants and lower-order terms when describing asymptotic growth.`,
    codePreview: {
      code: `# Big O simplification examples:\n# 3n + 5 simplifies to O(n)\n# n^2 + n simplifies to O(n^2)\nprint("3n + 5 -> O(n)")\nprint("n^2 + 10 -> O(n^2)")`,
      output: `3n + 5 -> O(n)\nn^2 + 10 -> O(n^2)`,
      caption: 'Big O term simplification'
    },
    glossary: [
      { term: 'Big O Notation', definition: 'Mathematical notation representing asymptotic upper-bound growth class.' }
    ],
    quizzes: [
      {
    question: '1. What does Big O notation focus on?',
    options: [
      'Variable naming',
      'The dominant growth class as input size n becomes large',
      'Exact microsecond timing',
      'Line count in Python file'
    ],
    correctAnswer: 1,
    explanation: 'Big O focuses on asymptotic growth trends as n grows large.'
  }
    
    ],
    summaryPoints: [
      'Big O describes growth rate.',
      'Ignores constant multipliers and lower terms.',
      'Classifies performance at scale.'
    ],
    previousLesson: {
      topicId: 'ds-complexity',
      subtopicId: 'space-complexity',
      title: 'Space Complexity'
    },
    nextLesson: {
      topicId: 'ds-complexity',
      subtopicId: 'constant-time-o1',
      title: 'O(1) — Constant Time'
    }
  },

  // =========================================================================
  // SECTION 2 — COMPLEXITY ANALYSIS (LESSON 5: O(1) Constant Time)
  // =========================================================================
  'ds-complexity/constant-time-o1': {
    id: 'ds-complexity/constant-time-o1',
    topicId: 'ds-complexity',
    subtopicId: 'constant-time-o1',
    title: 'O(1) — Constant Time',
    subtitle: 'Operations where the work performed does not increase with input size',
    categoryTitle: 'COMPLEXITY ANALYSIS',
    contentMarkdown: `# 1. WHAT IS O(1) CONSTANT TIME?

> 📌 **DEFINITION**
> **An algorithm runs in O(1) Constant Time if the amount of work it performs remains independent of the input size (n).**

\`\`\`text
INPUT SIZE (n = 5)          ──► [ 10 ][ 20 ][ 30 ][ 40 ][ 50 ] ──► 1 Access
INPUT SIZE (n = 1,000,000)  ──► [ 10 ][ ... 1M items ... ]     ──► 1 Access
\`\`\`

---

# 2. COMMON O(1) EXAMPLES

\`\`\`python
# 1. Indexing into a list:
first_item = numbers[0]

# 2. Accessing dictionary value by key:
user_age = user_profile["age"]

# 3. Basic math calculation:
result = a + b
\`\`\`

---

# 3. COMMON MISCONCEPTIONS ABOUT O(1)

- ❌ **Misconception:** "O(1) means exactly one single machine instruction."
  - **Correction:** Multiple fixed operations (e.g. 5 print statements) still qualify as **O(1)** because work does not scale with \`n\`.
- ❌ **Misconception:** "O(1) means instant zero time."
  - **Correction:** O(1) means constant growth rate, not zero nanoseconds.

---

# 4. LESSON SUMMARY

✓ O(1) means work is independent of input size \`n\`.
✓ Direct array indexing and dictionary key lookup are classic O(1) operations.
✓ Multiple fixed instructions still simplify to O(1).`,
    codePreview: {
      code: `def get_first_and_last(items):\n    # 2 fixed operations -> O(1) Constant Time!\n    return (items[0], items[-1])\n\nprint("Result:", get_first_and_last([10, 20, 30, 40]))`,
      output: `Result: (10, 40)`,
      caption: 'O(1) constant time direct position access'
    },
    glossary: [
      { term: 'O(1) Constant Time', definition: 'Complexity class where runtime is independent of input size n.' }
    ],
    quizzes: [
      {
    question: '1. What happens to work in O(1) when input size n doubles from 1,000 to 2,000?',
    options: [
      'Work doubles',
      'Work halves',
      'Work quadruples',
      'Work remains roughly constant'
    ],
    correctAnswer: 3,
    explanation: 'In O(1) constant time, work remains independent of input size.'
  }
    
    ],
    summaryPoints: [
      'O(1) work does not grow with n.',
      'Direct index access is O(1).',
      'Fixed instructions simplify to O(1).'
    ],
    previousLesson: {
      topicId: 'ds-complexity',
      subtopicId: 'big-o-notation',
      title: 'Big O Notation'
    },
    nextLesson: {
      topicId: 'ds-complexity',
      subtopicId: 'linear-time-on',
      title: 'O(n) — Linear Time'
    }
  },

  // =========================================================================
  // SECTION 2 — COMPLEXITY ANALYSIS (LESSON 6: O(n) Linear Time)
  // =========================================================================
  'ds-complexity/linear-time-on': {
    id: 'ds-complexity/linear-time-on',
    topicId: 'ds-complexity',
    subtopicId: 'linear-time-on',
    title: 'O(n) — Linear Time',
    subtitle: 'Algorithms where work scales proportionally with input size',
    categoryTitle: 'COMPLEXITY ANALYSIS',
    contentMarkdown: `# 1. WHAT IS O(n) LINEAR TIME?

> 📌 **DEFINITION**
> **An algorithm runs in O(n) Linear Time if the work performed grows in direct proportion to the input size (n).**

\`\`\`text
INPUT SIZE (n)       WORK PERFORMED
  n = 5         ──►    5 iterations
  n = 10        ──►   10 iterations
  n = 1,000     ──►  1,000 iterations
\`\`\`

---

# 2. COMMON O(n) PATTERNS

### Single Loop Traversal
\`\`\`python
def find_target(numbers, target):
    for number in numbers:
        if number == target:
            return True
    return False
\`\`\`

In the worst case (target at the end or missing), the loop inspects every single one of the \`n\` items!

### Multiple Separate Loops (Sequential Passes)
\`\`\`python
for x in items:    # n operations
    print(x)

for y in items:    # n operations
    print(y)
\`\`\`

Total operations: \`n + n = 2n\` $\rightarrow$ Simplifies to **\`O(n)\`**!

---

# 3. LESSON SUMMARY

✓ O(n) work increases linearly with input size \`n\`.
✓ Single traversals over collections are classic O(n) operations.
✓ Multiple separate sequential loops simplify to O(n).`,
    codePreview: {
      code: `def sum_list(numbers):\n    total = 0\n    for num in numbers:  # O(n) traversal\n        total += num\n    return total\n\nprint("Sum:", sum_list([10, 20, 30, 40]))`,
      output: `Sum: 100`,
      caption: 'Linear time O(n) list summation'
    },
    glossary: [
      { term: 'O(n) Linear Time', definition: 'Complexity class where work scales directly in proportion to input size n.' }
    ],
    quizzes: [
      {
    question: '1. If input size n doubles in an O(n) algorithm, what happens to the work required?',
    options: [
      'Work quadruples',
      'Work decreases',
      'Work stays constant',
      'Work roughly doubles'
    ],
    correctAnswer: 3,
    explanation: 'In linear time O(n), work scales proportionally with input size.'
  }
    
    ],
    summaryPoints: [
      'O(n) grows proportionally with n.',
      'Single loop traversal is O(n).',
      'Sequential loops simplify to O(n).'
    ],
    previousLesson: {
      topicId: 'ds-complexity',
      subtopicId: 'constant-time-o1',
      title: 'O(1) — Constant Time'
    },
    nextLesson: {
      topicId: 'ds-complexity',
      subtopicId: 'logarithmic-time-ologn',
      title: 'O(log n) — Logarithmic Time'
    }
  },

  // =========================================================================
  // SECTION 2 — COMPLEXITY ANALYSIS (LESSON 7: O(log n) Logarithmic Time)
  // =========================================================================
  'ds-complexity/logarithmic-time-ologn': {
    id: 'ds-complexity/logarithmic-time-ologn',
    topicId: 'ds-complexity',
    subtopicId: 'logarithmic-time-ologn',
    title: 'O(log n) — Logarithmic Time',
    subtitle: 'Algorithms that repeatedly reduce the remaining problem size by a constant factor',
    categoryTitle: 'COMPLEXITY ANALYSIS',
    contentMarkdown: `# 1. WHAT IS O(log n) LOGARITHMIC TIME?

> 📌 **DEFINITION**
> **An algorithm runs in O(log n) Logarithmic Time if each step reduces the remaining problem size by a constant factor (typically cut in half).**

\`\`\`text
n = 16 ──► 8 ──► 4 ──► 2 ──► 1  (Completed in only 4 steps!)
\`\`\`

---

# 2. THE POWER OF PROBLEM HALVING

Notice how slowly logarithmic work grows even as input size skyrockets:

| Input Size (n) | Approximate Steps ($\log_2 n$) |
| :--- | :--- |
| **n = 8** | **3 steps** |
| **n = 64** | **6 steps** |
| **n = 1,024** | **10 steps** |
| **n = 1,000,000** | **~20 steps!** |

When input size doubles, logarithmic work increases by only **1 single step**!

---

# 3. PREVIEW: BINARY SEARCH CONCEPT

Instead of checking items one-by-one from start to end (linear search):

\`\`\`text
Sorted List: [ 1, 3, 5, 7, 9, 11, 13, 15 ]
Search Target: 11

Step 1: Check middle item (7). 11 > 7, so discard left half!
        Remaining: [ 9, 11, 13, 15 ]

Step 2: Check middle item (11). Match found!
\`\`\`

---

# 4. LESSON SUMMARY

✓ O(log n) grows very slowly as input size scales.
✓ Happens when algorithms repeatedly halve the remaining search space.
✓ Binary search is the classic logarithmic example.`,
    codePreview: {
      code: `# Conceptual halving visualization:\ndef count_log_steps(n):\n    steps = 0\n    while n > 1:\n        n = n // 2\n        steps += 1\n    return steps\n\nprint("n = 1024 steps:", count_log_steps(1024))`,
      output: `n = 1024 steps: 10`,
      caption: 'Logarithmic problem reduction steps'
    },
    glossary: [
      { term: 'O(log n) Logarithmic Time', definition: 'Complexity class where work grows logarithmically as problem size is repeatedly divided.' }
    ],
    quizzes: [
      {
    question: '1. What core behavior produces O(log n) logarithmic complexity?',
    options: [
      'Running two nested loops',
      'Printing output',
      'Repeatedly reducing remaining problem size by half at each step',
      'Creating static arrays'
    ],
    correctAnswer: 2,
    explanation: 'Repeatedly halving the problem size at each step produces logarithmic growth.'
  }
    
    ],
    summaryPoints: [
      'O(log n) grows extremely slowly.',
      'Reduces problem size by half each step.',
      'Doubling input adds only 1 step.'
    ],
    previousLesson: {
      topicId: 'ds-complexity',
      subtopicId: 'linear-time-on',
      title: 'O(n) — Linear Time'
    },
    nextLesson: {
      topicId: 'ds-complexity',
      subtopicId: 'quadratic-time-on2',
      title: 'O(n²) — Quadratic Time'
    }
  },

  // =========================================================================
  // SECTION 2 — COMPLEXITY ANALYSIS (LESSON 8: O(n²) Quadratic Time)
  // =========================================================================
  'ds-complexity/quadratic-time-on2': {
    id: 'ds-complexity/quadratic-time-on2',
    topicId: 'ds-complexity',
    subtopicId: 'quadratic-time-on2',
    title: 'O(n²) — Quadratic Time',
    subtitle: 'Algorithms where work grows with the square of the input size',
    categoryTitle: 'COMPLEXITY ANALYSIS',
    contentMarkdown: `# 1. WHAT IS O(n²) QUADRATIC TIME?

> 📌 **DEFINITION**
> **An algorithm runs in O(n²) Quadratic Time if work performed grows in proportion to the square of the input size (n × n).**

\`\`\`text
n = 3   ──►   3 × 3  = 9 operations
n = 10  ──►  10 × 10 = 100 operations
n = 100 ──► 100 × 100 = 10,000 operations
\`\`\`

---

# 2. COMMON O(n²) PATTERN: NESTED LOOPS

Nested loops iterating over the same collection form a classic quadratic pattern:

\`\`\`python
for a in numbers:        # Outer loop runs n times
    for b in numbers:    # Inner loop runs n times for EACH outer iteration!
        print(a, b)      # Total iterations: n * n = n²
\`\`\`

---

# 3. SEPARATE LOOPS VS NESTED LOOPS

\`\`\`text
SEPARATE LOOPS: (n + n = 2n)       ──► O(n) Linear
NESTED LOOPS:   (n × n = n²)       ──► O(n²) Quadratic
\`\`\`

> ⚠️ **COMMON MISCONCEPTIONS:**
> - ❌ *Not all nested loops are O(n²).* Loop limits determine complexity.
> - ❌ *Doubling n in O(n²) quadruples the work required!* (e.g. $10^2=100 \rightarrow 20^2=400$).

---

# 4. LESSON SUMMARY

✓ O(n²) work grows quadratically ($n \times n$).
✓ Nested loops traversing \`n\` elements produce quadratic growth.
✓ Doubling input size quadruples algorithmic work.`,
    codePreview: {
      code: `def print_all_pairs(items):\n    count = 0\n    for a in items:\n        for b in items:\n            count += 1\n    return count\n\nprint("n = 4 pairs count:", print_all_pairs([1, 2, 3, 4]))`,
      output: `n = 4 pairs count: 16`,
      caption: 'Quadratic time O(n^2) nested pairs iteration'
    },
    glossary: [
      { term: 'O(n²) Quadratic Time', definition: 'Complexity class where work grows proportionally to n squared.' }
    ],
    quizzes: [
      {
    question: '1. What happens to total work in an O(n²) algorithm when input size n doubles?',
    options: [
      'Work increases by 1',
      'Work roughly quadruples (4x)',
      'Work doubles (2x)',
      'Work stays constant'
    ],
    correctAnswer: 1,
    explanation: 'Since (2n)² = 4n², doubling input size quadruples the work.'
  }
    
    ],
    summaryPoints: [
      'O(n²) grows with n * n.',
      'Nested loops over n items form O(n²).',
      'Doubling input quadruples work.'
    ],
    previousLesson: {
      topicId: 'ds-complexity',
      subtopicId: 'logarithmic-time-ologn',
      title: 'O(log n) — Logarithmic Time'
    },
    nextLesson: {
      topicId: 'ds-complexity',
      subtopicId: 'best-average-worst-case',
      title: 'Best, Average & Worst Case'
    }
  },

  // =========================================================================
  // SECTION 2 — COMPLEXITY ANALYSIS (LESSON 9: Best, Average & Worst Case)
  // =========================================================================
  'ds-complexity/best-average-worst-case': {
    id: 'ds-complexity/best-average-worst-case',
    topicId: 'ds-complexity',
    subtopicId: 'best-average-worst-case',
    title: 'Best, Average & Worst Case',
    subtitle: 'Evaluating how input data distribution affects algorithmic complexity',
    categoryTitle: 'COMPLEXITY ANALYSIS',
    contentMarkdown: `# 1. INPUT DATA INFLUENCES ALGORITHM WORK

The exact amount of work an algorithm performs often depends on the specific arrangement of input data:

\`\`\`python
numbers = [5, 8, 2, 9, 1]
target = 5  # Found on FIRST check!
\`\`\`

---

# 2. THREE COMPLEXITY SCENARIOS

1. **BEST CASE:** Minimum possible work for input size \`n\`.
   - *Example:* Target is at index 0 $\rightarrow$ **\`O(1)\`**.
2. **AVERAGE CASE:** Expected/typical work under assumed data distribution.
   - *Example:* Target is near middle $\rightarrow$ **\`O(n)\`**.
3. **WORST CASE:** Maximum possible work for input size \`n\`.
   - *Example:* Target is at final index or missing $\rightarrow$ **\`O(n)\`**.

\`\`\`text
BEST CASE    ──► Target at index 0              ──► O(1)
AVERAGE CASE ──► Target near middle             ──► O(n)
WORST CASE   ──► Target missing / at last index ──► O(n)
\`\`\`

---

# 3. WHY WORST-CASE ANALYSIS MATTERS MOST

In software engineering, we focus primarily on **Worst-Case Complexity** because it provides a guaranteed upper bound on resource consumption!

---

# 4. LESSON SUMMARY

✓ The same algorithm can have different complexities depending on input arrangement.
✓ Best case = Minimum work; Average case = Typical work; Worst case = Maximum work.
✓ Worst-case analysis provides guaranteed upper bounds.`,
    codePreview: {
      code: `def linear_search_demo(numbers, target):\n    checks = 0\n    for num in numbers:\n        checks += 1\n        if num == target:\n            return (True, checks)\n    return (False, checks)\n\nnums = [5, 8, 2, 9, 1]\nprint("Best Case (target 5):", linear_search_demo(nums, 5))\nprint("Worst Case (target 99):", linear_search_demo(nums, 99))`,
      output: `Best Case (target 5): (True, 1)\nWorst Case (target 99): (False, 5)`,
      caption: 'Linear search best case (1 check) vs worst case (5 checks)'
    },
    glossary: [
      { term: 'Worst-Case Complexity', definition: 'The maximum computational work an algorithm can perform for input size n.' },
      { term: 'Best-Case Complexity', definition: 'The minimum computational work an algorithm can perform for input size n.' }
    ],
    quizzes: [
      {
    question: '1. What is the worst-case time complexity of linear search when the target is missing?',
    options: [
      'O(1)',
      'O(log n)',
      'O(n²)',
      'O(n)'
    ],
    correctAnswer: 3,
    explanation: 'When target is missing, linear search checks every item in the collection (O(n)).'
  }
    
    ],
    summaryPoints: [
      'Best case: Minimum work (target at start).',
      'Worst case: Maximum work (target missing).',
      'Worst-case analysis guarantees upper bounds.'
    ],
    previousLesson: {
      topicId: 'ds-complexity',
      subtopicId: 'quadratic-time-on2',
      title: 'O(n²) — Quadratic Time'
    },
    nextLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'what-is-an-array',
      title: 'What is an Array?'
    }
  },
// =========================================================================
  // SECTION 3 — ARRAYS (LESSON 1: What is an Array?)
  // =========================================================================
  'ds-arrays/what-is-an-array': {
    id: 'ds-arrays/what-is-an-array',
    topicId: 'ds-arrays',
    subtopicId: 'what-is-an-array',
    title: 'What is an Array?',
    subtitle: 'Understanding ordered sequences of elements and index-based collections',
    categoryTitle: 'ARRAYS',
    contentMarkdown: `# 1. START WITH SEPARATE VARIABLES

Imagine storing student test scores using loose variables:
\`\`\`python
score1 = 90
score2 = 75
score3 = 88
score4 = 95
\`\`\`

What happens if you have **1,000 scores**? Managing 1,000 separate variable names becomes impossible!

---

# 2. DEFINITION: WHAT IS AN ARRAY?

> 📌 **DEFINITION**
> **An array is a data structure that stores a collection of elements in an ordered sequence, where each element can be accessed using its position (index).**

\`\`\`python
# In Python, we use built-in lists to demonstrate array operations:
scores = [90, 75, 88, 95]
\`\`\`

\`\`\`text
scores ──► ┌────┬────┬────┬────┐
           │ 90 │ 75 │ 88 │ 95 │
           └────┴────┴────┴────┘
\`\`\`

---

# 3. CORE ARRAY CONCEPTS

- **Element:** Each individual value stored inside the array (e.g., \`90\` is an element).
- **Order:** Position matters! \`["A", "B", "C"]\` is different from \`["C", "A", "B"]\`.
- **Length / Size:** Total count of elements stored (\`len(scores)\` returns \`4\`).

> 💡 **IMPORTANT NOTE ON PYTHON LISTS:**
> Python's built-in \`list\` is a dynamic array-like sequence. Unlike traditional low-level C arrays that have fixed capacities, Python lists resize automatically! However, Python lists are **NOT** linked lists.

---

# 4. LESSON SUMMARY

✓ Arrays organize multiple elements in an ordered sequence.
✓ Stored values are called elements.
✓ Python lists serve as our array implementation tool.`,
    codePreview: {
      code: `scores = [90, 75, 88, 95]\nprint("Scores collection:", scores)\nprint("Total elements (length):", len(scores))`,
      output: `Scores collection: [90, 75, 88, 95]\nTotal elements (length): 4`,
      caption: 'Creating an array-like list collection in Python'
    },
    glossary: [
      { term: 'Array', definition: 'A data structure storing an ordered sequence of elements accessed by index.' },
      { term: 'Element', definition: 'An individual value stored inside a data structure collection.' }
    ],
    quizzes: [
      {
    question: '1. What is an individual stored value inside an array called?',
    options: [
      'A loop',
      'A pointer',
      'An element',
      'A function'
    ],
    correctAnswer: 2,
    explanation: 'Each value stored inside an array is referred to as an element.'
  }
    
    ],
    summaryPoints: [
      'Arrays store ordered sequences.',
      'Values are called elements.',
      'Python lists provide dynamic array behavior.'
    ],
    previousLesson: {
      topicId: 'ds-complexity',
      subtopicId: 'best-average-worst-case',
      title: 'Best, Average & Worst Case'
    },
    nextLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'array-representation',
      title: 'Array Representation'
    }
  },

  // =========================================================================
  // SECTION 3 — ARRAYS (LESSON 2: Array Representation)
  // =========================================================================
  'ds-arrays/array-representation': {
    id: 'ds-arrays/array-representation',
    topicId: 'ds-arrays',
    subtopicId: 'array-representation',
    title: 'Array Representation',
    subtitle: 'Visualizing contiguous sequential slots, empty collections, and duplicates',
    categoryTitle: 'ARRAYS',
    contentMarkdown: `# 1. VISUALIZING AN ARRAY IN MEMORY

Conceptually, an array can be visualized as a row of contiguous slots, where each slot holds one element:

\`\`\`text
numbers = [10, 20, 30, 40]

┌────┬────┬────┬────┐
│ 10 │ 20 │ 30 │ 40 │
└────┴────┴────┴────┘
  0    1    2    3   (Indexes)
\`\`\`

---

# 2. KEY REPRESENTATIONAL RULES

- **Length vs Last Index:** If length = 4, valid positive indexes are \`0, 1, 2, 3\`.
  - **Last Positive Index = \`length - 1\`**
- **Empty Array:** An empty collection \`numbers = []\` has length 0 and no slots.
- **Duplicates Allowed:** Arrays can contain duplicate elements (e.g., \`[10, 20, 10, 30]\`), occupying distinct positions.

---

# 3. LESSON SUMMARY

✓ Arrays are visualized as ordered positions.
✓ Position indexes start at 0.
✓ Last valid index is always \`len(array) - 1\`.`,
    codePreview: {
      code: `names = ["Alex", "Maya", "Rahul"]\nprint("Length:", len(names))\nprint("First item:", names[0])\nprint("Last item:", names[len(names) - 1])`,
      output: `Length: 3\nFirst item: Alex\nLast item: Rahul`,
      caption: 'Length and last index relationship'
    },
    glossary: [
      { term: 'Length', definition: 'The total number of elements currently stored in an array.' }
    ],
    quizzes: [
      {
    question: '1. For an array of length 5, what is the last positive valid index?',
    options: [
      '6',
      '0',
      '4',
      '5'
    ],
    correctAnswer: 2,
    explanation: 'Since indexing starts at 0, the last positive index is length - 1 (5 - 1 = 4).'
  }
    
    ],
    summaryPoints: [
      'Visualized as contiguous boxes.',
      'Indexes start at 0.',
      'Last index = length - 1.'
    ],
    previousLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'what-is-an-array',
      title: 'What is an Array?'
    },
    nextLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'indexing',
      title: 'Indexing'
    }
  },

  // =========================================================================
  // SECTION 3 — ARRAYS (LESSON 3: Indexing)
  // =========================================================================
  'ds-arrays/indexing': {
    id: 'ds-arrays/indexing',
    topicId: 'ds-arrays',
    subtopicId: 'indexing',
    title: 'Indexing',
    subtitle: 'Zero-based indexing, negative indexing, IndexError, and O(1) access complexity',
    categoryTitle: 'ARRAYS',
    contentMarkdown: `# 1. ZERO-BASED INDEXING

Python uses **zero-based indexing**, where the first element is at index 0:

\`\`\`text
VALUES:     10    20    30    40
POSITIVE:    0     1     2     3
NEGATIVE:   -4    -3    -2    -1
\`\`\`

\`\`\`python
numbers = [10, 20, 30, 40]
print(numbers[0])   # 10 (First element)
print(numbers[3])   # 40 (Fourth element)
print(numbers[-1])  # 40 (Python negative index for last element)
\`\`\`

---

# 2. INDEXERROR EXCEPTION

If you attempt to access an index beyond valid range, Python raises an **IndexError**:

\`\`\`python
numbers = [10, 20, 30]
print(numbers[5])  # ❌ IndexError: list index out of range
\`\`\`

---

# 3. ACCESS COMPLEXITY: O(1)

> 💡 **CRITICAL COMPLEXITY RULE:**
> Accessing an element by a known valid index is **O(1) Constant Time**!
> Whether the array has 10 elements or 1,000,000 elements, direct index access takes the same instant time.

---

# 4. ARRAY MASTER STUDIO

\`\`\`array-studio-widget
Indexing
\`\`\`

---

# 5. LESSON SUMMARY

✓ Python indexing starts at 0.
✓ Negative indexes count backward from the end (\`-1\` is the last element).
✓ Out-of-bounds access raises \`IndexError\`.
✓ Known-index access complexity is **O(1)**.`,
    codePreview: {
      code: `nums = [10, 20, 30, 40]\nprint("Positive index 2:", nums[2])\nprint("Negative index -1:", nums[-1])`,
      output: `Positive index 2: 30\nNegative index -1: 40`,
      caption: 'Accessing elements using positive and negative indexing'
    },
    glossary: [
      { term: 'Index', definition: 'A numerical position identifier used to access elements in a sequence.' },
      { term: 'IndexError', definition: 'An exception raised when trying to access a non-existent sequence index.' }
    ],
    quizzes: [
      {
    question: '1. What is the time complexity of accessing an array element by a known valid index?',
    options: [
      'O(log n)',
      'O(1)',
      'O(n²)',
      'O(n)'
    ],
    correctAnswer: 1,
    explanation: 'Known-index access computes the memory position directly, which takes O(1) Constant Time.'
  }
    
    ],
    summaryPoints: [
      'Indexing starts at 0.',
      'Negative indexing counts backward.',
      'Known-index access is O(1).'
    ],
    previousLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'array-representation',
      title: 'Array Representation'
    },
    nextLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'traversal',
      title: 'Traversal'
    }
  },

  // =========================================================================
  // SECTION 3 — ARRAYS (LESSON 4: Traversal)
  // =========================================================================
  'ds-arrays/traversal': {
    id: 'ds-arrays/traversal',
    topicId: 'ds-arrays',
    subtopicId: 'traversal',
    title: 'Traversal',
    subtitle: 'Visiting every array element sequentially using loops, enumerate, and O(n) complexity',
    categoryTitle: 'ARRAYS',
    contentMarkdown: `# 1. WHAT IS TRAVERSAL?

> 📌 **DEFINITION**
> **Traversal means visiting every element of a data structure one by one to inspect, process, or compute results.**

---

# 2. VALUE-BASED VS INDEX-BASED TRAVERSAL

### Value-Based Traversal (Simple Loop)
\`\`\`python
for num in numbers:
    print(num)
\`\`\`

### Index-Based Traversal (When Index is Needed)
\`\`\`python
for idx in range(len(numbers)):
    print(f"Index {idx}: {numbers[idx]}")
\`\`\`

### Using \`enumerate()\` (Pythonic Index + Value)
\`\`\`python
for idx, val in enumerate(numbers):
    print(idx, val)
\`\`\`

---

# 3. TRAVERSAL COMPLEXITY: O(n)

Visiting every element in an array of \`n\` items requires \`n\` steps:
- \`n = 5\` items $\rightarrow$ 5 steps
- \`n = 1,000\` items $\rightarrow$ 1,000 steps

> 💡 Traversal complexity is **O(n) Linear Time**.

---

# 4. LESSON SUMMARY

✓ Traversal visits elements sequentially.
✓ Can iterate directly over values, by range index, or using \`enumerate()\`.
✓ Full array traversal takes **O(n)** time.`,
    codePreview: {
      code: `scores = [85, 92, 78]\nprint("Enumerate traversal:")\nfor idx, val in enumerate(scores):\n    print(f"Index {idx} -> Score {val}")`,
      output: `Enumerate traversal:\nIndex 0 -> Score 85\nIndex 1 -> Score 92\nIndex 2 -> Score 78`,
      caption: 'Traversing array elements with index and value'
    },
    glossary: [
      { term: 'Traversal', definition: 'The process of accessing every element in a data structure sequentially.' }
    ],
    quizzes: [
      {
    question: '1. What is the time complexity of traversing all n elements in an array?',
    options: [
      'O(n²)',
      'O(1)',
      'O(n)',
      'O(log n)'
    ],
    correctAnswer: 2,
    explanation: 'Visiting all n elements sequentially requires n steps, which is O(n) Linear Time.'
  }
    
    ],
    summaryPoints: [
      'Traversal visits every element.',
      'Supports value-based, range-based, or enumerate loops.',
      'Complexity is O(n).'
    ],
    previousLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'indexing',
      title: 'Indexing'
    },
    nextLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'insertion',
      title: 'Insertion'
    }
  },

  // =========================================================================
  // SECTION 3 — ARRAYS (LESSON 5: Insertion)
  // =========================================================================
  'ds-arrays/insertion': {
    id: 'ds-arrays/insertion',
    topicId: 'ds-arrays',
    subtopicId: 'insertion',
    title: 'Insertion',
    subtitle: 'Adding elements at end, beginning, and middle, element shifting, and complexities',
    categoryTitle: 'ARRAYS',
    contentMarkdown: `# 1. THREE POSITIONS OF INSERTION

1. **Insert at End (\`append\`):**
   - \`numbers.append(40)\`
   - **Complexity:** Amortized **O(1)**
2. **Insert at Beginning (\`insert(0, val)\`):**
   - \`numbers.insert(0, 5)\`
   - All existing elements must shift **one position to the right**!
   - **Complexity:** **O(n)**
3. **Insert in Middle (\`insert(index, val)\`):**
   - \`numbers.insert(2, 25)\`
   - Elements after index 2 shift **right**.
   - **Complexity:** **O(n)**

---

# 2. VISUALIZING ELEMENT SHIFTING ON INSERTION

\`\`\`text
BEFORE:           [ 10 ][ 20 ][ 30 ]
Insert 99 at 1:          ↓ shift right
SHIFTING:         [ 10 ][    ][ 20 ][ 30 ]
AFTER:            [ 10 ][ 99 ][ 20 ][ 30 ]
\`\`\`

---

# 3. LESSON SUMMARY

✓ Appending to the end of a Python list is amortized **O(1)**.
✓ Inserting at beginning/middle requires shifting elements right (**O(n)**).
✓ Insertion shifts existing element indexes after insertion point.`,
    codePreview: {
      code: `nums = [10, 30, 40]\nnums.insert(1, 20)  # Inserts 20 at index 1\nprint("Updated array:", nums)`,
      output: `Updated array: [10, 20, 30, 40]`,
      caption: 'Inserting element in middle with automatic right-shifting'
    },
    glossary: [
      { term: 'Insertion', definition: 'Adding a new element into a specific position within a sequence.' },
      { term: 'Element Shifting', definition: 'Moving elements to adjacent slots to make room or close gaps.' }
    ],
    quizzes: [
      {
    question: '1. Why is inserting an element at index 0 of an array an O(n) operation?',
    options: [
      'All n existing elements must shift one position to the right',
      'Index 0 is invalid',
      'Memory is deleted',
      'Python re-compiles the code'
    ],
    correctAnswer: 0,
    explanation: 'Inserting at the beginning requires shifting all n existing elements right to make room.'
  }
    
    ],
    summaryPoints: [
      'Append at end is amortized O(1).',
      'Beginning/middle insertion requires right-shifting (O(n)).',
      'Indexes after insertion point increase by 1.'
    ],
    previousLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'traversal',
      title: 'Traversal'
    },
    nextLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'deletion',
      title: 'Deletion'
    }
  },

  // =========================================================================
  // SECTION 3 — ARRAYS (LESSON 6: Deletion)
  // =========================================================================
  'ds-arrays/deletion': {
    id: 'ds-arrays/deletion',
    topicId: 'ds-arrays',
    subtopicId: 'deletion',
    title: 'Deletion',
    subtitle: 'Removing elements by index (pop) or value (remove), left shifting, and complexities',
    categoryTitle: 'ARRAYS',
    contentMarkdown: `# 1. DELETION METHODS IN PYTHON LISTS

1. **Delete from End (\`pop()\`):**
   - \`numbers.pop()\`
   - Removes final element without shifting. **O(1)**
2. **Delete by Index (\`pop(index)\`):**
   - \`numbers.pop(0)\`
   - Remaining elements shift **one position to the left** to fill the gap. **O(n)**
3. **Delete by Value (\`remove(value)\`):**
   - \`numbers.remove(30)\`
   - First searches for value (**O(n)**), then removes and shifts left (**O(n)**). **O(n)**

---

# 2. VISUALIZING LEFT SHIFTING ON DELETION

\`\`\`text
BEFORE:           [ 10 ][ 20 ][ 30 ][ 40 ]
Delete index 1:           ✕ (remove 20)
SHIFTING:         [ 10 ][    ][ 30 ][ 40 ]
                           ◄───  ◄─── (Shift Left)
AFTER:            [ 10 ][ 30 ][ 40 ]
\`\`\`

---

# 3. LESSON SUMMARY

✓ Removing final item (\`pop()\`) is **O(1)**.
✓ Deleting from beginning/middle requires left-shifting remaining elements (**O(n)**).
✓ \`pop(index)\` deletes by index; \`remove(val)\` searches and deletes by value.`,
    codePreview: {
      code: `nums = [10, 99, 20, 30]\npopped_val = nums.pop(1)  # Removes index 1\nprint("Popped value:", popped_val)\nprint("Remaining array:", nums)`,
      output: `Popped value: 99\nRemaining array: [10, 20, 30]`,
      caption: 'Deleting element at index 1 with left-shifting'
    },
    glossary: [
      { term: 'Deletion', definition: 'Removing an existing element from a data structure collection.' }
    ],
    quizzes: [
      {
    question: '1. What is the difference between pop(index) and remove(value)?',
    options: [
      'pop creates an empty list',
      'pop deletes by index position; remove searches and deletes by value',
      'They are identical',
      'remove is O(1) and pop is O(n²)'
    ],
    correctAnswer: 1,
    explanation: 'pop() takes an index position; remove() searches for a matching value.'
  }
    
    ],
    summaryPoints: [
      'Deleting end item is O(1).',
      'Beginning/middle deletion requires left-shifting (O(n)).',
      'Later indexes decrease by 1.'
    ],
    previousLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'insertion',
      title: 'Insertion'
    },
    nextLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'searching',
      title: 'Searching'
    }
  },

  // =========================================================================
  // SECTION 3 — ARRAYS (LESSON 7: Searching)
  // =========================================================================
  'ds-arrays/searching': {
    id: 'ds-arrays/searching',
    topicId: 'ds-arrays',
    subtopicId: 'searching',
    title: 'Searching',
    subtitle: 'Locating targets via Linear Search, membership checking (in), and index method',
    categoryTitle: 'ARRAYS',
    contentMarkdown: `# 1. WHAT IS SEARCHING?

> 📌 **DEFINITION**
> **Searching means determining whether a target value exists inside an array and/or locating its index position.**

---

# 2. LINEAR SEARCH ALGORITHM

Inspect items one-by-one from index 0 to index \`n-1\`:

\`\`\`python
def linear_search(numbers, target):
    for index in range(len(numbers)):
        if numbers[index] == target:
            return index  # Return matching index
    return -1             # Return -1 if not found
\`\`\`

---

# 3. SEARCH COMPLEXITY: BEST VS WORST CASE

- **Best Case:** Target is at index 0 $\rightarrow$ **\`O(1)\`** (1 comparison).
- **Worst Case:** Target is at final index or missing $\rightarrow$ **\`O(n)\`** (\`n\` comparisons).

---

# 4. PYTHON SEARCH HELPERS

- **Membership check (\`in\`):** \`30 in numbers\` $\rightarrow$ \`True\` (**O(n)** worst-case).
- **Index lookup (\`.index()\`):** \`numbers.index(30)\` $\rightarrow$ returns index or raises \`ValueError\`.

---

# 5. LESSON SUMMARY

✓ Linear search inspects elements sequentially.
✓ Best case is **O(1)**; worst case is **O(n)**.
✓ Known-index access (**O(1)**) is different from value-based search (**O(n)**).`,
    codePreview: {
      code: `def search_val(arr, target):\n    for i, val in enumerate(arr):\n        if val == target:\n            return i\n    return -1\n\nnums = [10, 20, 30, 40]\nprint("Search 30 index:", search_val(nums, 30))\nprint("Search 99 index:", search_val(nums, 99))`,
      output: `Search 30 index: 2\nSearch 99 index: -1`,
      caption: 'Performing linear search on an unsorted list'
    },
    glossary: [
      { term: 'Linear Search', definition: 'A search method that inspects elements sequentially until a target is found or end is reached.' }
    ],
    quizzes: [
      {
    question: '1. What is the worst-case time complexity of searching an unsorted array for a value?',
    options: [
      'O(1)',
      'O(n²)',
      'O(n)',
      'O(log n)'
    ],
    correctAnswer: 2,
    explanation: 'Searching an unsorted array requires checking up to all n items, which is O(n).'
  }
    
    ],
    summaryPoints: [
      'Linear search checks sequentially.',
      'Best case O(1); Worst case O(n).',
      'Searching by value requires scanning.'
    ],
    previousLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'deletion',
      title: 'Deletion'
    },
    nextLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'updating-elements',
      title: 'Updating Elements'
    }
  },

  // =========================================================================
  // SECTION 3 — ARRAYS (LESSON 8: Updating Elements)
  // =========================================================================
  'ds-arrays/updating-elements': {
    id: 'ds-arrays/updating-elements',
    topicId: 'ds-arrays',
    subtopicId: 'updating-elements',
    title: 'Updating Elements',
    subtitle: 'Replacing values at known indexes vs Search-and-Update patterns',
    categoryTitle: 'ARRAYS',
    contentMarkdown: `# 1. UPDATING BY KNOWN INDEX: O(1)

> 📌 **DEFINITION**
> **Updating means replacing an existing element stored at a specific position.**

\`\`\`python
numbers = [10, 20, 30, 40]
numbers[2] = 99  # Replaces 30 with 99
\`\`\`

\`\`\`text
BEFORE:   [ 10 ][ 20 ][ 30 ][ 40 ]
                       ▲ index 2
AFTER:    [ 10 ][ 20 ][ 99 ][ 40 ]
\`\`\`

> 💡 Replacing a value at a known index does NOT shift elements and does NOT change array length! Complexity: **O(1)**.

---

# 2. SEARCH-AND-UPDATE PATTERN

If you must search for a value before updating it:

\`\`\`python
# Step 1: Find index (O(n) search)
idx = numbers.index(30)
# Step 2: Replace value (O(1) update)
numbers[idx] = 99
\`\`\`

Overall Search-and-Update complexity: **O(n)** due to the search phase.

---

# 3. LESSON SUMMARY

✓ Updating a value at a known index is **O(1)**.
✓ Updating replaces the existing value without altering array length or shifting elements.
✓ Search-then-update takes **O(n)** time due to the search step.`,
    codePreview: {
      code: `nums = [10, 20, 30, 40]\nnums[1] = 888  # Update index 1\nprint("Updated array:", nums)`,
      output: `Updated array: [10, 888, 30, 40]`,
      caption: 'O(1) constant time known-index element update'
    },
    glossary: [
      { term: 'Update', definition: 'Replacing an existing element at a designated index with a new value.' }
    ],
    quizzes: [
      {
    question: '1. What is the time complexity of updating an element at a known valid index?',
    options: [
      'O(1)',
      'O(n)',
      'O(log n)',
      'O(n²)'
    ],
    correctAnswer: 0,
    explanation: 'Directly replacing a value at a known index is an O(1) Constant Time operation.'
  }
    
    ],
    summaryPoints: [
      'Known-index update is O(1).',
      'Replaces value without shifting.',
      'Search-and-update is O(n).'
    ],
    previousLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'searching',
      title: 'Searching'
    },
    nextLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'array-complexity',
      title: 'Array Complexity'
    }
  },

  // =========================================================================
  // SECTION 3 — ARRAYS (LESSON 9: Array Complexity)
  // =========================================================================
  'ds-arrays/array-complexity': {
    id: 'ds-arrays/array-complexity',
    topicId: 'ds-arrays',
    subtopicId: 'array-complexity',
    title: 'Array Complexity',
    subtitle: 'Comprehensive operational complexity summary table for array operations',
    categoryTitle: 'ARRAYS',
    contentMarkdown: `# 1. COMPREHENSIVE ARRAY COMPLEXITY TABLE

| Operation | Typical Time Complexity | Why? |
| :--- | :--- | :--- |
| **Known-Index Access** | **O(1)** | Direct memory position formula calculation |
| **Known-Index Update** | **O(1)** | Direct position overwrite without shifting |
| **Append to End** | **Amortized O(1)** | Placed into available internal capacity |
| **Full Traversal** | **O(n)** | Visits every element from start to end |
| **Linear Search** | **O(n)** | Worst-case scans up to all \`n\` elements |
| **Insert (Beginning/Middle)** | **O(n)** | Shifts remaining elements right to make room |
| **Delete (Beginning/Middle)** | **O(n)** | Shifts remaining elements left to fill gap |

---

# 2. STRENGTHS & LIMITATIONS OF ARRAYS

### Strengths:
- Instant **O(1)** access and updates by known index.
- Cache-friendly contiguous memory arrangement.
- Simple, intuitive sequence structure.

### Limitations:
- Insertions/deletions at beginning or middle require **O(n)** element shifting.
- Unsorted value search requires **O(n)** full traversal.

---

# 3. LESSON SUMMARY

✓ Access and update by known index are **O(1)**.
✓ Append at end is amortized **O(1)**.
✓ Traversal, linear search, and middle/beginning insertions & deletions are **O(n)**.`,
    codePreview: {
      code: `# Quick complexity reference demonstration:\narr = [10, 20, 30]\nprint("Access arr[0] -> O(1):", arr[0])\narr.append(40) # Amortized O(1)\nprint("Appended -> Amortized O(1):", arr)\narr.insert(0, 5) # O(n) shift right\nprint("Inserted at start -> O(n):", arr)`,
      output: `Access arr[0] -> O(1): 10\nAppended -> Amortized O(1): [10, 20, 30, 40]\nInserted at start -> O(n): [5, 10, 20, 30, 40]`,
      caption: 'Demonstrating operational time complexities in Python'
    },
    glossary: [
      { term: 'Amortized Complexity', definition: 'The average time taken per operation over a sequence of operations.' }
    ],
    quizzes: [
      {
    question: '1. Which array operation takes O(1) Constant Time?',
    options: [
      'Deleting from index 0',
      'Accessing an element by known index',
      'Inserting at index 0',
      'Linear searching for an unsorted value'
    ],
    correctAnswer: 1,
    explanation: 'Known-index access is O(1); insertion/deletion at index 0 and linear search take O(n).'
  }
    
    ],
    summaryPoints: [
      'Access & Update = O(1).',
      'Append = Amortized O(1).',
      'Beginning/Middle Insert & Delete = O(n).'
    ],
    previousLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'updating-elements',
      title: 'Updating Elements'
    },
    nextLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'common-array-problems',
      title: 'Common Array Problems'
    }
  },

  // =========================================================================
  // SECTION 3 — ARRAYS (LESSON 10: Common Array Problems)
  // =========================================================================
  'ds-arrays/common-array-problems': {
    id: 'ds-arrays/common-array-problems',
    topicId: 'ds-arrays',
    subtopicId: 'common-array-problems',
    title: 'Common Array Problems',
    subtitle: 'Beginner problem-solving patterns: Max, Min, Sum, Even Count, and Reverse',
    categoryTitle: 'ARRAYS',
    contentMarkdown: `# 1. BEGINNER ARRAY PROBLEM PATTERNS

Mastering basic array problems involves traversing elements while tracking state:

### Problem 1: Find Maximum Value (\`O(n)\`)
\`\`\`python
def find_max(numbers):
    largest = numbers[0]
    for num in numbers:
        if num > largest:
            largest = num
    return largest
\`\`\`

### Problem 2: Calculate Sum of Elements (\`O(n)\`)
\`\`\`python
def sum_elements(numbers):
    total = 0
    for num in numbers:
        total += num
    return total
\`\`\`

### Problem 3: Count Even Numbers (\`O(n)\`)
\`\`\`python
def count_evens(numbers):
    count = 0
    for num in numbers:
        if num % 2 == 0:
            count += 1
    return count
\`\`\`

---

# 2. PROBLEM-SOLVING MENTAL MODEL

\`\`\`text
INPUT ARRAY ──► INITIALIZE TRACKING VARIABLE ──► LOOP TRAVERSAL ──► UPDATE TRACKER ──► RETURN RESULT
\`\`\`

---

# 3. LESSON SUMMARY

✓ Basic array algorithms use single-pass **O(n)** traversals.
✓ Track variables (accumulators, max/min placeholders) update during iterations.
✓ Always trace step-by-step to avoid off-by-one errors.`,
    codePreview: {
      code: `def analyze_array(nums):\n    max_val = nums[0]\n    total = 0\n    for n in nums:\n        if n > max_val:\n            max_val = n\n        total += n\n    return (max_val, total)\n\nprint("Max and Sum:", analyze_array([4, 9, 2, 7, 5]))`,
      output: `Max and Sum: (9, 27)`,
      caption: 'Single-pass traversal computing max and total sum'
    },
    glossary: [
      { term: 'Accumulator', definition: 'A variable used in loops to collect or sum values across iterations.' }
    ],
    quizzes: [
      {
    question: '1. What is the time complexity of finding the maximum element in an unsorted array of size n?',
    options: [
      'O(log n)',
      'O(n²)',
      'O(1)',
      'O(n)'
    ],
    correctAnswer: 3,
    explanation: 'Finding the maximum requires inspecting every element once in a single O(n) traversal.'
  }
    
    ],
    summaryPoints: [
      'Single-pass O(n) traversal patterns.',
      'Accumulators track state across iterations.',
      'Forms the foundation for complex algorithms.'
    ],
    previousLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'array-complexity',
      title: 'Array Complexity'
    },
    nextLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'what-is-a-linked-list',
      title: 'What is a Linked List?'
    }
  },
// =========================================================================
  // SECTION 4 — LINKED LISTS (LESSON 1: What is a Linked List?)
  // =========================================================================
  'ds-linked-lists/what-is-a-linked-list': {
    id: 'ds-linked-lists/what-is-a-linked-list',
    topicId: 'ds-linked-lists',
    subtopicId: 'what-is-a-linked-list',
    title: 'What is a Linked List?',
    subtitle: 'Understanding node-based linear structures connected through pointer references',
    categoryTitle: 'LINKED LISTS',
    contentMarkdown: `# 1. BEYOND ARRAYS: REFERENCE-BASED SEQUENCES

In an array, elements are stored in contiguous memory slots accessed by position indexes:
\`\`\`text
ARRAY:  [ 10 ][ 20 ][ 30 ][ 40 ]
\`\`\`

What if each stored element contains a **reference link pointing to the NEXT element**?

\`\`\`text
LINKED LIST:  [ 10 | NEXT ] ──► [ 20 | NEXT ] ──► [ 30 | NEXT ] ──► None
\`\`\`

---

# 2. DEFINITION: WHAT IS A LINKED LIST?

> 📌 **DEFINITION**
> **A linked list is a linear data structure composed of independent nodes, where each node stores data and a reference (pointer) to the next node.**

\`\`\`text
┌──────────┬──────────┐
│   DATA   │   NEXT   │  ──► Reference to next Node or None
└──────────┴───┬──────┘
               │
               ▼
\`\`\`

---

# 3. CORE MENTAL MODEL

\`\`\`text
  DATA STORED IN NODES       NODES CONNECTED BY LINKS
 ┌────────────────────┐     ┌─────────────────────────┐     LINKED LIST
 │ 10, 20, 30, ...    │  +  │  next ──► next ──►      │  ═  NODE ──► NODE ──► None
 └────────────────────┘     └─────────────────────────┘
\`\`\`

> 💡 **NO DIRECT INDEXING:**
> In a basic linked list, you cannot jump directly to index 2 (like \`arr[2]\`). To reach node 3, you must start at the first node and follow \`next\` links sequentially!

---

# 4. LESSON SUMMARY

✓ Linked lists are linear node-based structures.
✓ Nodes store data and a \`next\` reference.
✓ The final node's \`next\` reference points to \`None\`.`,
    codePreview: {
      code: `class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\n# Creating two connected nodes:\nnode1 = Node(10)\nnode2 = Node(20)\nnode1.next = node2\nprint("Node1 data:", node1.data)\nprint("Node2 data via link:", node1.next.data)`,
      output: `Node1 data: 10\nNode2 data via link: 20`,
      caption: 'Creating and linking two Node objects in Python'
    },
    glossary: [
      { term: 'Linked List', definition: 'A linear data structure made of nodes connected via references.' },
      { term: 'Reference / Link', definition: 'A memory pointer stored inside a node that identifies another node object.' }
    ],
    quizzes: [
      {
    question: '1. What two components are stored inside a singly linked list node?',
    options: [
      'KEY and HASH',
      'DATA and NEXT reference',
      'INDEX and VALUE',
      'LEFT and RIGHT pointers'
    ],
    correctAnswer: 1,
    explanation: 'A singly linked list node contains a data field and a next reference field.'
  }
    
    ],
    summaryPoints: [
      'Nodes store data and next references.',
      'Linear sequence connected via pointers.',
      'Final node points to None.'
    ],
    previousLesson: {
      topicId: 'ds-arrays',
      subtopicId: 'common-array-problems',
      title: 'Common Array Problems'
    },
    nextLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'nodes',
      title: 'Nodes'
    }
  },

  // =========================================================================
  // SECTION 4 — LINKED LISTS (LESSON 2: Nodes)
  // =========================================================================
  'ds-linked-lists/nodes': {
    id: 'ds-linked-lists/nodes',
    topicId: 'ds-linked-lists',
    subtopicId: 'nodes',
    title: 'Nodes',
    subtitle: 'The fundamental building block of linked lists',
    categoryTitle: 'LINKED LISTS',
    contentMarkdown: `# 1. WHAT IS A NODE?

> 📌 **DEFINITION**
> **A Node is an individual container object in a linked list that holds data and a reference to another node.**

\`\`\`text
┌──────────────────────┬──────────────────────┐
│       self.data      │      self.next       │
└──────────────────────┴──────────────────────┘
\`\`\`

---

# 2. IMPLEMENTING THE NODE CLASS IN PYTHON

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data   # Stores value (e.g., 10, "Alex")
        self.next = None   # Initially points to None
\`\`\`

### Step-by-Step Node Connection:
\`\`\`python
# Step 1: Instantiation (Disconnected Nodes)
node1 = Node(10)  # [ 10 | None ]
node2 = Node(20)  # [ 20 | None ]

# Step 2: Establish Reference Link
node1.next = node2 # [ 10 | • ] ──► [ 20 | None ]
\`\`\`

---

# 3. LESSON SUMMARY

✓ A Node contains \`data\` and a \`next\` reference.
✓ Creating nodes does NOT automatically connect them.
✓ Assigning \`node1.next = node2\` establishes a pointer link.`,
    codePreview: {
      code: `class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nn1 = Node(100)\nn2 = Node(200)\nn1.next = n2\nprint("n1.data:", n1.data)\nprint("n1.next.data:", n1.next.data)`,
      output: `n1.data: 100\nn1.next.data: 200`,
      caption: 'Node class definition and reference linking'
    },
    glossary: [
      { term: 'Node', definition: 'An individual element object storing data and reference pointers.' }
    ],
    quizzes: [
      {
    question: '1. What value does a newly instantiated Node\'s next attribute contain by default?',
    options: [
      'None',
      '1',
      '0',
      'False'
    ],
    correctAnswer: 0,
    explanation: 'The next attribute is initialized to None until explicitly linked to another node.'
  }
    
    ],
    summaryPoints: [
      'Nodes are individual container objects.',
      'Stores data and next attributes.',
      'Explicit linking required.'
    ],
    previousLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'what-is-a-linked-list',
      title: 'What is a Linked List?'
    },
    nextLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'head-and-tail',
      title: 'Head and Tail'
    }
  },

  // =========================================================================
  // SECTION 4 — LINKED LISTS (LESSON 3: Head and Tail)
  // =========================================================================
  'ds-linked-lists/head-and-tail': {
    id: 'ds-linked-lists/head-and-tail',
    topicId: 'ds-linked-lists',
    subtopicId: 'head-and-tail',
    title: 'Head and Tail',
    subtitle: 'Understanding start (head) and end (tail) node references',
    categoryTitle: 'LINKED LISTS',
    contentMarkdown: `# 1. WHAT IS HEAD AND TAIL?

- **HEAD:** A reference variable pointing to the **first node** in the linked list.
- **TAIL:** The **final node** in the list (where \`tail.next is None\`).

\`\`\`text
head                                     tail
 │                                        │
 ▼                                        ▼
┌────┬────┐    ┌────┬────┐    ┌────┬────┐ ┌────┬──────┐
│ 10 │  •─┼───▶│ 20 │  •─┼───▶│ 30 │  •─┼─▶│ 40 │ None │
└────┴────┘    └────┴────┘    └────┴────┘ └────┴──────┘
\`\`\`

---

# 2. SPECIAL CASES

- **Empty Linked List:** \`head = None\` (and \`tail = None\`).
- **One-Node List:** \`head\` and \`tail\` point to the exact same node object!

\`\`\`text
head ──► [ 10 | None ] ◄── tail
\`\`\`

> 💡 **CRITICAL RULE:**
> \`head\` is NOT a special node type; it is simply a reference pointer identifying where the chain starts!

---

# 3. LESSON SUMMARY

✓ \`head\` references the first node.
✓ \`tail\` is the final node whose \`next\` is \`None\`.
✓ An empty list has \`head = None\`.`,
    codePreview: {
      code: `class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nhead = Node(10)\ntail = head  # Single-node list where head == tail\nprint("Head data:", head.data)\nprint("Is head == tail?", head == tail)`,
      output: `Head data: 10\nIs head == tail? True`,
      caption: 'Head and tail pointing to the same node in a 1-element list'
    },
    glossary: [
      { term: 'Head', definition: 'A reference pointing to the first node of a linked list.' },
      { term: 'Tail', definition: 'The last node in a linked list whose next attribute points to None.' }
    ],
    quizzes: [
      {
    question: '1. In a linked list containing only 1 node, what do head and tail refer to?',
    options: [
      'Both head and tail point to the exact same single node',
      'head points to index 1',
      'tail is None',
      'head is None'
    ],
    correctAnswer: 0,
    explanation: 'In a single-node list, that node is simultaneously the head and the tail.'
  }
    
    ],
    summaryPoints: [
      'Head points to the first node.',
      'Tail is the last node.',
      'In a 1-node list, head == tail.'
    ],
    previousLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'nodes',
      title: 'Nodes'
    },
    nextLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'singly-linked-list',
      title: 'Singly Linked List'
    }
  },

  // =========================================================================
  // SECTION 4 — LINKED LISTS (LESSON 4: Singly Linked List)
  // =========================================================================
  'ds-linked-lists/singly-linked-list': {
    id: 'ds-linked-lists/singly-linked-list',
    topicId: 'singly-linked-list',
    subtopicId: 'singly-linked-list',
    title: 'Singly Linked List',
    subtitle: 'Building a complete Singly Linked List class wrapper in Python',
    categoryTitle: 'LINKED LISTS',
    contentMarkdown: `# 1. WHAT IS A SINGLY LINKED LIST?

> 📌 **DEFINITION**
> **A Singly Linked List is a unidirectional linked list where each node contains a reference pointing ONLY forward to the next node.**

\`\`\`text
head
 │
 ▼
┌────┬────┐    ┌────┬────┐    ┌────┬────┐
│ 10 │  •─┼───▶│ 20 │  •─┼───▶│ 30 │None│
└────┴────┘    └────┴────┘    └────┴────┘
\`\`\`

---

# 2. PYTHON LINKEDLIST CLASS WRAPPER

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None  # Manages list starting point
\`\`\`

---

# 3. LESSON SUMMARY

✓ Singly linked lists move in **one forward direction** only.
✓ Managed by a wrapper class holding a \`head\` reference.
✓ Connections are maintained explicitly via \`node.next\`.`,
    codePreview: {
      code: `class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n\nll = LinkedList()\nll.head = Node(10)\nll.head.next = Node(20)\nprint("Head data:", ll.head.data)\nprint("Next data:", ll.head.next.data)`,
      output: `Head data: 10\nNext data: 20`,
      caption: 'Complete Singly Linked List structure setup'
    },
    glossary: [
      { term: 'Singly Linked List', definition: 'A linked list where nodes only store forward references to next nodes.' }
    ],
    quizzes: [
      {
    question: '1. Can a node in a standard Singly Linked List reference the node before it?',
    options: [
      'No, singly linked list nodes only store a forward next pointer',
      'Only in Python',
      'Only if index is 0',
      'Yes, automatically'
    ],
    correctAnswer: 0,
    explanation: 'Singly linked nodes contain only a next pointer, allowing unidirectional forward movement.'
  }
    
    ],
    summaryPoints: [
      'Unidirectional forward links.',
      'LinkedList class manages head reference.',
      'Final next reference is None.'
    ],
    previousLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'head-and-tail',
      title: 'Head and Tail'
    },
    nextLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'linked-list-traversal',
      title: 'Traversal'
    }
  },

  // =========================================================================
  // SECTION 4 — LINKED LISTS (LESSON 5: Traversal)
  // =========================================================================
  'ds-linked-lists/linked-list-traversal': {
    id: 'ds-linked-lists/linked-list-traversal',
    topicId: 'ds-linked-lists',
    subtopicId: 'linked-list-traversal',
    title: 'Traversal',
    subtitle: 'Iterating through linked list nodes using current pointer progression',
    categoryTitle: 'LINKED LISTS',
    contentMarkdown: `# 1. TRAVERSAL VIA CURRENT POINTER

To traverse a linked list, start at \`self.head\` and follow \`next\` references in a \`while\` loop until reaching \`None\`:

\`\`\`python
def traverse(self):
    current = self.head
    while current is not None:
        print(current.data)
        current = current.next  # Move pointer forward!
\`\`\`

---

# 2. STEP-BY-STEP POINTER PROGRESSION

\`\`\`text
STEP 1: current ──► [ 10 | • ] ──► [ 20 | • ] ──► [ 30 | None ]
        print(10), current = current.next

STEP 2:             [ 10 | • ] ──► current ──► [ 20 | • ] ──► [ 30 | None ]
        print(20), current = current.next

STEP 3:                            [ 20 | • ] ──► current ──► [ 30 | None ]
        print(30), current = current.next (becomes None -> Loop Stops!)
\`\`\`

> 💡 Traversal complexity is **O(n) Linear Time**.

---

# 3. LESSON SUMMARY

✓ Traversal starts at \`head\` using a working \`current\` pointer.
✓ Advance using \`current = current.next\`.
✓ Stops when \`current is None\` (**O(n)** complexity).`,
    codePreview: {
      code: `class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nn1 = Node(10)\nn2 = Node(20)\nn3 = Node(30)\nn1.next = n2\nn2.next = n3\n\ncurrent = n1\nwhile current:\n    print("Node data:", current.data)\n    current = current.next`,
      output: `Node data: 10\nNode data: 20\nNode data: 30`,
      caption: 'Traversing linked list nodes using current = current.next'
    },
    glossary: [
      { term: 'Current Pointer', definition: 'A temporary reference variable used to iterate through nodes during traversal.' }
    ],
    quizzes: [
      {
    question: '1. What statement moves the traversal pointer to the next node in a linked list loop?',
    options: [
      'current += 1',
      'current = current.next',
      'current.data += 1',
      'current = head'
    ],
    correctAnswer: 1,
    explanation: 'current = current.next reassigns the working reference to point to the subsequent node.'
  }
    
    ],
    summaryPoints: [
      'Start at head pointer.',
      'Advance via current = current.next.',
      'Full traversal is O(n).'
    ],
    previousLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'singly-linked-list',
      title: 'Singly Linked List'
    },
    nextLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'linked-list-insertion',
      title: 'Insertion'
    }
  },

  // =========================================================================
  // SECTION 4 — LINKED LISTS (LESSON 6: Insertion)
  // =========================================================================
  'ds-linked-lists/linked-list-insertion': {
    id: 'ds-linked-lists/linked-list-insertion',
    topicId: 'ds-linked-lists',
    subtopicId: 'linked-list-insertion',
    title: 'Insertion',
    subtitle: 'Inserting nodes at Head, Tail, or Middle by updating pointer links',
    categoryTitle: 'LINKED LISTS',
    contentMarkdown: `# 1. INSERT AT HEAD: O(1) CONSTANT TIME

Inserting at the beginning requires **no shifting**:

\`\`\`python
def insert_at_head(self, data):
    new_node = Node(data)
    new_node.next = self.head  # Step 1: Point new node to current head
    self.head = new_node       # Step 2: Reassign head to new node
\`\`\`

\`\`\`text
BEFORE:   new_node [ 5 | None ]      head ──► [ 10 | • ] ──► [ 20 | None ]
STEP 1:   new_node [ 5 | • ] ───────────────► [ 10 | • ] ──► [ 20 | None ]
STEP 2:   head ──► [ 5 | • ] ───────────────► [ 10 | • ] ──► [ 20 | None ]
\`\`\`

---

# 2. INSERT AT END / MIDDLE

- **Insert at End without Tail:** Requires O(n) traversal to find the last node, then \`last_node.next = new_node\`.
- **Insert at End with Tail:** **O(1)** via \`tail.next = new_node; tail = new_node\`.
- **Insert in Middle (After target node):** **O(1)** link updates once target node reference is known (\`new_node.next = prev.next; prev.next = new_node\`).

---

# 3. LESSON SUMMARY

✓ Head insertion is **O(1)** Constant Time.
✓ Middle insertion requires careful order of pointer assignments to avoid breaking the chain.
✓ End insertion is **O(n)** without tail pointer and **O(1)** with tail pointer.`,
    codePreview: {
      code: `class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nhead = Node(10)\n# Insert 5 at Head:\nnew_head = Node(5)\nnew_head.next = head\nhead = new_head\n\nprint("New Head:", head.data)\nprint("Second Node:", head.next.data)`,
      output: `New Head: 5\nSecond Node: 10`,
      caption: 'O(1) constant time insertion at linked list head'
    },
    glossary: [
      { term: 'Head Insertion', definition: 'Adding a new node at the start of a linked list by updating the head pointer.' }
    ],
    quizzes: [
      {
    question: '1. What is the time complexity of inserting a new node at the head of a linked list?',
    options: [
      'O(log n)',
      'O(n²)',
      'O(n)',
      'O(1)'
    ],
    correctAnswer: 3,
    explanation: 'Head insertion updates two pointers directly without traversing the list, making it O(1).'
  }
    
    ],
    summaryPoints: [
      'Head insertion is O(1).',
      'Requires updating new_node.next before head.',
      'Middle link updates take O(1) after finding node.'
    ],
    previousLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'linked-list-traversal',
      title: 'Traversal'
    },
    nextLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'linked-list-deletion',
      title: 'Deletion'
    }
  },

  // =========================================================================
  // SECTION 4 — LINKED LISTS (LESSON 7: Deletion)
  // =========================================================================
  'ds-linked-lists/linked-list-deletion': {
    id: 'ds-linked-lists/linked-list-deletion',
    topicId: 'ds-linked-lists',
    subtopicId: 'linked-list-deletion',
    title: 'Deletion',
    subtitle: 'Deleting head, middle bypass links, and tail deletion complexities',
    categoryTitle: 'LINKED LISTS',
    contentMarkdown: `# 1. DELETE HEAD NODE: O(1) CONSTANT TIME

Deleting the first node simply moves the \`head\` pointer to the second node:

\`\`\`python
def delete_head(self):
    if self.head is not None:
        self.head = self.head.next  # Bypasses first node!
\`\`\`

\`\`\`text
BEFORE:   head ──► [ 10 | • ] ──► [ 20 | • ] ──► [ 30 | None ]
AFTER:             [ 10 | • ]     head ──► [ 20 | • ] ──► [ 30 | None ]
\`\`\`

---

# 2. DELETE MIDDLE NODE (BYPASS LINK)

To delete a middle node, update its predecessor's \`next\` pointer to point past it:

\`\`\`text
BEFORE:   [ 10 | • ] ─────► [ 20 | • ] ─────► [ 30 | None ]
BYPASS:   [ 10 | • ] ───────────────────────► [ 30 | None ]
\`\`\`

\`\`\`python
prev_node.next = target_node.next
\`\`\`

---

# 3. LESSON SUMMARY

✓ Head deletion is **O(1)** Constant Time.
✓ Middle node deletion updates \`prev.next\` to bypass the removed node.
✓ Tail deletion in a basic singly linked list requires **O(n)** traversal to find the predecessor node.`,
    codePreview: {
      code: `class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nhead = Node(10)\nhead.next = Node(20)\n# Delete head:\nhead = head.next\nprint("Updated head data:", head.data)`,
      output: `Updated head data: 20`,
      caption: 'Bypassing the first node in O(1) head deletion'
    },
    glossary: [
      { term: 'Bypass Link', definition: 'Reassigning prev.next to target.next to bypass and remove target node.' }
    ],
    quizzes: [
      {
    question: '1. What is the time complexity of deleting the head node of a linked list?',
    options: [
      'O(n)',
      'O(1)',
      'O(n²)',
      'O(log n)'
    ],
    correctAnswer: 1,
    explanation: 'Reassigning head = head.next takes O(1) Constant Time.'
  }
    
    ],
    summaryPoints: [
      'Delete head is O(1).',
      'Middle deletion bypasses node via prev.next.',
      'Singly tail deletion requires O(n) predecessor search.'
    ],
    previousLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'linked-list-insertion',
      title: 'Insertion'
    },
    nextLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'linked-list-searching',
      title: 'Searching'
    }
  },

  // =========================================================================
  // SECTION 4 — LINKED LISTS (LESSON 8: Searching)
  // =========================================================================
  'ds-linked-lists/linked-list-searching': {
    id: 'ds-linked-lists/linked-list-searching',
    topicId: 'ds-linked-lists',
    subtopicId: 'linked-list-searching',
    title: 'Searching',
    subtitle: 'Locating target values in linked lists via node pointer inspection',
    categoryTitle: 'LINKED LISTS',
    contentMarkdown: `# 1. SEARCHING A LINKED LIST

Searching requires traversing nodes from \`head\` and checking if \`current.data == target\`:

\`\`\`python
def search(self, target):
    current = self.head
    while current is not None:
        if current.data == target:
            return True  # Target found!
        current = current.next
    return False          # Reached end (None) -> Not found
\`\`\`

---

# 2. SEARCH COMPLEXITY

- **Best Case:** Target is at \`head\` node $\rightarrow$ **\`O(1)\`** (1 comparison).
- **Worst Case:** Target is at \`tail\` or missing $\rightarrow$ **\`O(n)\`** (\`n\` comparisons).

---

# 3. LESSON SUMMARY

✓ Searching starts at \`head\` and inspects nodes sequentially.
✓ Best case is **O(1)**; worst case is **O(n)**.
✓ Direct indexing does not exist; value lookup requires pointer traversal.`,
    codePreview: {
      code: `class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nhead = Node(10)\nhead.next = Node(20)\n\ndef search(head, target):\n    curr = head\n    while curr:\n        if curr.data == target:\n            return True\n        curr = curr.next\n    return False\n\nprint("Search 20:", search(head, 20))\nprint("Search 99:", search(head, 99))`,
      output: `Search 20: True\nSearch 99: False`,
      caption: 'Searching target values by traversing linked list nodes'
    },
    glossary: [
      { term: 'Linked List Search', definition: 'Sequential node data comparison starting from head to find a target value.' }
    ],
    quizzes: [
      {
    question: '1. What is the worst-case time complexity of searching for a value in a singly linked list of n nodes?',
    options: [
      'O(n²)',
      'O(n)',
      'O(1)',
      'O(log n)'
    ],
    correctAnswer: 1,
    explanation: 'Searching requires traversing up to all n nodes, resulting in O(n) Linear Time.'
  }
    
    ],
    summaryPoints: [
      'Traverses nodes sequentially from head.',
      'Best case O(1); Worst case O(n).',
      'Returns True/False or matching node.'
    ],
    previousLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'linked-list-deletion',
      title: 'Deletion'
    },
    nextLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'doubly-linked-list',
      title: 'Doubly Linked List'
    }
  },

  // =========================================================================
  // SECTION 4 — LINKED LISTS (LESSON 9: Doubly Linked List)
  // =========================================================================
  'ds-linked-lists/doubly-linked-list': {
    id: 'ds-linked-lists/doubly-linked-list',
    topicId: 'ds-linked-lists',
    subtopicId: 'doubly-linked-list',
    title: 'Doubly Linked List',
    subtitle: 'Nodes with bidirectional PREV and NEXT references',
    categoryTitle: 'LINKED LISTS',
    contentMarkdown: `# 1. WHAT IS A DOUBLY LINKED LIST?

> 📌 **DEFINITION**
> **A Doubly Linked List is a linked list where each node contains TWO pointers: \`next\` (pointing forward) and \`prev\` (pointing backward).**

\`\`\`text
┌──────────┬──────────┬──────────┐
│   PREV   │   DATA   │   NEXT   │
└──────────┴──────────┴──────────┘
\`\`\`

\`\`\`text
None ◄── [ 10 ] ⇄ [ 20 ] ⇄ [ 30 ] ──► None
\`\`\`

---

# 2. PYTHON DOUBLY NODE CLASS

\`\`\`python
class DoublyNode:
    def __init__(self, data):
        self.data = data
        self.prev = None  # Pointer to previous node
        self.next = None  # Pointer to next node
\`\`\`

---

# 3. ADVANTAGES & TRADE-OFFS

- **Advantage:** Bidirectional traversal (forward from \`head\`, backward from \`tail\`).
- **Advantage:** Tail deletion becomes **O(1)** because \`tail.prev\` provides direct access to the predecessor!
- **Trade-off:** Extra memory per node for \`prev\` pointer and slightly more complex link updates.

---

# 4. LESSON SUMMARY

✓ Nodes store \`prev\`, \`data\`, and \`next\`.
✓ Supports forward and backward traversal.
✓ Tail deletion is **O(1)** with tail pointer and \`prev\`.`,
    codePreview: {
      code: `class DoublyNode:\n    def __init__(self, data):\n        self.data = data\n        self.prev = None\n        self.next = None\n\nn1 = DoublyNode(10)\nn2 = DoublyNode(20)\nn1.next = n2\nn2.prev = n1\nprint("n1 next data:", n1.next.data)\nprint("n2 prev data:", n2.prev.data)`,
      output: `n1 next data: 20\nn2 prev data: 10`,
      caption: 'Connecting bidirectional PREV and NEXT pointers'
    },
    glossary: [
      { term: 'Doubly Linked List', definition: 'A linked list variant with bidirectional PREV and NEXT references.' }
    ],
    quizzes: [
      {
    question: '1. What major advantage does a Doubly Linked List provide over a Singly Linked List for tail deletion?',
    options: [
      'Zero memory usage',
      'Automatic sorting',
      'Instant array indexing',
      'Direct O(1) access to predecessor node via prev pointer'
    ],
    correctAnswer: 3,
    explanation: 'tail.prev provides immediate access to the predecessor node, enabling O(1) tail deletion.'
  }
    
    ],
    summaryPoints: [
      'Nodes store prev and next pointers.',
      'Supports bidirectional traversal.',
      'Tail deletion is O(1).'
    ],
    previousLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'linked-list-searching',
      title: 'Searching'
    },
    nextLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'circular-linked-list',
      title: 'Circular Linked List'
    }
  },

  // =========================================================================
  // SECTION 4 — LINKED LISTS (LESSON 10: Circular Linked List)
  // =========================================================================
  'ds-linked-lists/circular-linked-list': {
    id: 'ds-linked-lists/circular-linked-list',
    topicId: 'ds-linked-lists',
    subtopicId: 'circular-linked-list',
    title: 'Circular Linked List',
    subtitle: 'Linked lists where the tail node points back to the head',
    categoryTitle: 'LINKED LISTS',
    contentMarkdown: `# 1. WHAT IS A CIRCULAR LINKED LIST?

> 📌 **DEFINITION**
> **A Circular Linked List is a linked list where the final node (tail) connects back to the head node, forming a closed cycle.**

\`\`\`text
head
 │
 ▼
┌────┬────┐    ┌────┬────┐    ┌────┬────┐
│ 10 │  •─┼───▶│ 20 │  •─┼───▶│ 30 │  •─┼──┐
└────┴────┘    └────┴────┘    └────┴────┘  │
  ▲                                        │
  └────────────────────────────────────────┘ (tail.next = head)
\`\`\`

---

# 2. NO NONE AT END!

Because \`tail.next = head\`, traversal never encounters \`None\`!
Using \`while current is not None:\` causes an **INFINITE LOOP**!

### Correct Traversal Condition:
Stop when \`current == head\` after visiting nodes once!

---

# 3. APPLICATIONS

- Round-robin CPU process scheduling
- Multiplayer turn-taking game queues
- Continuous audio/video playback playlists

---

# 4. LESSON SUMMARY

✓ \`tail.next\` points back to \`head\`.
✓ Traversal does not terminate at \`None\`.
✓ Ideal for cyclic and round-robin processing.`,
    codePreview: {
      code: `class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nn1 = Node(10)\nn2 = Node(20)\nn1.next = n2\nn2.next = n1 # Circular link back to head!\n\nprint("n1 data:", n1.data)\nprint("n2.next.data (head):", n2.next.data)`,
      output: `n1 data: 10\nn2.next.data (head): 10`,
      caption: 'Circular link from tail back to head'
    },
    glossary: [
      { term: 'Circular Linked List', definition: 'A linked list variant where the final node references the head node.' }
    ],
    quizzes: [
      {
    question: '1. What value does tail.next contain in a standard Circular Linked List?',
    options: [
      '0',
      'Reference to head node',
      '-1',
      'None'
    ],
    correctAnswer: 1,
    explanation: 'In a circular linked list, tail.next points back to head.'
  }
    
    ],
    summaryPoints: [
      'Tail links back to head.',
      'No None at end of list.',
      'Used in round-robin scheduling.'
    ],
    previousLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'doubly-linked-list',
      title: 'Doubly Linked List'
    },
    nextLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'array-vs-linked-list',
      title: 'Array vs Linked List'
    }
  },

  // =========================================================================
  // SECTION 4 — LINKED LISTS (LESSON 11: Array vs Linked List)
  // =========================================================================
  'ds-linked-lists/array-vs-linked-list': {
    id: 'ds-linked-lists/array-vs-linked-list',
    topicId: 'ds-linked-lists',
    subtopicId: 'array-vs-linked-list',
    title: 'Array vs Linked List',
    subtitle: 'Direct operational comparison of arrays and linked lists',
    categoryTitle: 'LINKED LISTS',
    contentMarkdown: `# 1. OPERATIONAL COMPARISON TABLE

| Feature / Operation | Array / Python List | Singly Linked List |
| :--- | :--- | :--- |
| **Memory Layout** | Contiguous slots | Dispersed nodes linked via pointers |
| **Known-Index Access** | **O(1)** Constant | **O(n)** Pointer traversal required |
| **Insert / Delete at Head** | **O(n)** Shifting required | **O(1)** Pointer update |
| **Insert at End** | **Amortized O(1)** | **O(n)** without tail / **O(1)** with tail |
| **Unsorted Search** | **O(n)** Linear scan | **O(n)** Node traversal |

---

# 2. WHEN TO USE WHICH?

- **Use Arrays when:** You need fast **O(1)** random access by index or memory cache efficiency.
- **Use Linked Lists when:** You need frequent **O(1)** insertions or deletions at the beginning of the collection.

---

# 3. LESSON SUMMARY

✓ Arrays excel at **O(1)** known-index access.
✓ Linked Lists excel at **O(1)** head insertions and deletions.
✓ Choice depends on application access vs modification frequencies.`,
    codePreview: {
      code: `# Access vs Head Insert comparison:\narr = [10, 20, 30]\nprint("Array index 1 -> O(1):", arr[1])\n# Head insert in linked list -> O(1) pointer swap`,
      output: `Array index 1 -> O(1): 20`,
      caption: 'Direct comparison of array access vs linked list head manipulation'
    },
    glossary: [
      { term: 'Random Access', definition: 'Ability to access any arbitrary index position directly in O(1) time.' }
    ],
    quizzes: [
      {
    question: '1. Which data structure provides O(1) time complexity for inserting an element at index 0?',
    options: [
      'Linked List (head insert)',
      'Both',
      'Array (shifting required)',
      'Neither'
    ],
    correctAnswer: 0,
    explanation: 'Head insertion in a linked list takes O(1); array head insertion requires shifting all elements (O(n)).'
  }
    
    ],
    summaryPoints: [
      'Arrays: O(1) index access.',
      'Linked Lists: O(1) head insert/delete.',
      'Choose based on workload patterns.'
    ],
    previousLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'circular-linked-list',
      title: 'Circular Linked List'
    },
    nextLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'linked-list-complexity',
      title: 'Linked List Complexity'
    }
  },

  // =========================================================================
  // SECTION 4 — LINKED LISTS (LESSON 12: Linked List Complexity)
  // =========================================================================
  'ds-linked-lists/linked-list-complexity': {
    id: 'ds-linked-lists/linked-list-complexity',
    topicId: 'ds-linked-lists',
    subtopicId: 'linked-list-complexity',
    title: 'Linked List Complexity',
    subtitle: 'Comprehensive summary of linked list operational time and space complexities',
    categoryTitle: 'LINKED LISTS',
    contentMarkdown: `# 1. LINKED LIST COMPLEXITY MASTER TABLE

| Operation | Singly Linked List | Singly + Tail Pointer | Doubly Linked List |
| :--- | :--- | :--- | :--- |
| **Access Head** | **O(1)** | **O(1)** | **O(1)** |
| **Access Tail** | **O(n)** | **O(1)** | **O(1)** |
| **Access Position k** | **O(n)** | **O(n)** | **O(n)** |
| **Insert at Head** | **O(1)** | **O(1)** | **O(1)** |
| **Insert at Tail** | **O(n)** | **O(1)** | **O(1)** |
| **Delete Head** | **O(1)** | **O(1)** | **O(1)** |
| **Delete Tail** | **O(n)** | **O(n)** | **O(1)** |
| **Linear Search** | **O(n)** | **O(n)** | **O(n)** |

---

# 2. KEY TAKEAWAYS

- **Known Reference Operations:** Updating pointers for a known reference node is **O(1)**.
- **Search Dependency:** If you must search for a node first, the overall operation becomes **O(n)**.

---

# 3. LESSON SUMMARY

✓ Pointer updates are **O(1)** when node references are known.
✓ Searching for target values or positional nodes takes **O(n)**.
✓ Doubly linked lists optimize tail deletion to **O(1)**.`,
    codePreview: {
      code: `# Complexity rule summary:\nprint("Head ops -> O(1)")\nprint("Search / Position access -> O(n)")\nprint("Doubly tail delete -> O(1)")`,
      output: `Head ops -> O(1)\nSearch / Position access -> O(n)\nDoubly tail delete -> O(1)`,
      caption: 'Linked list complexity summary rules'
    },
    glossary: [
      { term: 'Predecessor Node', definition: 'The node immediately preceding a target node in a linked sequence.' }
    ],
    quizzes: [
      {
    question: '1. Why is tail deletion O(1) in a Doubly Linked List but O(n) in a basic Singly Linked List?',
    options: [
      'Singly lists cannot store numbers',
      'Singly lists run slower',
      'Doubly lists use arrays',
      'Doubly linked nodes have a prev pointer to immediately access the predecessor node'
    ],
    correctAnswer: 3,
    explanation: 'In a doubly linked list, tail.prev provides direct O(1) access to the predecessor node.'
  }
    
    ],
    summaryPoints: [
      'Head operations are O(1).',
      'Searching takes O(n).',
      'Doubly linked lists enable O(1) tail deletion.'
    ],
    previousLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'array-vs-linked-list',
      title: 'Array vs Linked List'
    },
    nextLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'what-is-a-stack',
      title: 'What is a Stack?'
    }
  },
// =========================================================================
  // SECTION 5 — STACKS (LESSON 1: What is a Stack?)
  // =========================================================================
  'ds-stacks/what-is-a-stack': {
    id: 'ds-stacks/what-is-a-stack',
    topicId: 'ds-stacks',
    subtopicId: 'what-is-a-stack',
    title: 'What is a Stack?',
    subtitle: 'Understanding linear data structures with one active top operational end',
    categoryTitle: 'STACKS',
    contentMarkdown: `# 1. THE STACK OF PLATES ANALOGY

Think of a physical stack of plates in a cafeteria:

\`\`\`text
        TOP OF STACK
             ↓
          ┌─────┐
          │  4  │  ──► Most recently added plate (removed first!)
          ├─────┤
          │  3  │
          ├─────┤
          │  2  │
          ├─────┤
          │  1  │  ──► First plate placed at the bottom
          └─────┘
\`\`\`

If you want to remove a plate cleanly, which plate do you remove first? **Plate 4!** The last plate placed on top is the first plate removed.

---

# 2. DEFINITION: WHAT IS A STACK?

> 📌 **DEFINITION**
> **A stack is a linear data structure where elements are added and removed from only ONE end, known as the TOP.**

\`\`\`text
  STACK          LINEAR STRUCTURE         ACTIVE TOP END
┌──────┐        ┌────────────────┐       ┌───────────────┐
│ Data │   +    │ Single-column  │  ═    │ Push & Pop at │
│ Container     │ sequence       │       │ TOP pointer   │
└──────┘        └────────────────┘       └───────────────┘
\`\`\`

---

# 3. CORE STACK TERMINOLOGY

- **TOP:** The active end of the stack where elements are inserted and deleted.
- **PUSH:** Operation to add a new element to the top.
- **POP:** Operation to remove and return the element at the top.
- **PEEK:** Operation to inspect the top element without removing it.

---

# 4. LESSON SUMMARY

✓ A stack is a linear data structure.
✓ All operations (push, pop, peek) occur exclusively at the **TOP**.
✓ Formulates the foundation of LIFO execution.`,
    codePreview: {
      code: `# Conceptual Stack operations using Python list:\nstack = []\n# Push operations:\nstack.append("Plate 1")\nstack.append("Plate 2")\nprint("Current Stack (End is TOP):", stack)\nprint("TOP element:", stack[-1])`,
      output: `Current Stack (End is TOP): ['Plate 1', 'Plate 2']\nTOP element: Plate 2`,
      caption: 'Using a Python list end as the TOP of a conceptual stack'
    },
    glossary: [
      { term: 'Stack', definition: 'A linear data structure operating on a single top endpoint.' },
      { term: 'TOP', definition: 'The active pointer/end of a stack where push, pop, and peek occur.' }
    ],
    quizzes: [
      {
    question: '1. At which position do all push, pop, and peek operations take place in a stack?',
    options: [
      'At the TOP of the stack',
      'At a random position',
      'At the bottom',
      'At index 0 only'
    ],
    correctAnswer: 0,
    explanation: 'A stack restricts all additions and removals to its single active top end.'
  }
    
    ],
    summaryPoints: [
      'Linear data structure with one active end.',
      'All operations focus on the TOP.',
      'Core terminology: Push, Pop, Peek, Top.'
    ],
    previousLesson: {
      topicId: 'ds-linked-lists',
      subtopicId: 'linked-list-complexity',
      title: 'Linked List Complexity'
    },
    nextLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'lifo-principle',
      title: 'LIFO Principle'
    }
  },

  // =========================================================================
  // SECTION 5 — STACKS (LESSON 2: LIFO Principle)
  // =========================================================================
  'ds-stacks/lifo-principle': {
    id: 'ds-stacks/lifo-principle',
    topicId: 'ds-stacks',
    subtopicId: 'lifo-principle',
    title: 'LIFO Principle',
    subtitle: 'Mastering the Last-In, First-Out operational order',
    categoryTitle: 'STACKS',
    contentMarkdown: `# 1. WHAT IS LIFO?

> 📌 **DEFINITION**
> **LIFO stands for Last-In, First-Out. The most recently added element (Last In) is always the first element to be removed (First Out).**

\`\`\`text
PUSH A              PUSH B              PUSH C              POP () -> C
 ┌───┐               ┌───┐               ┌───┐
 │ A │               │ B │ ◄── TOP       │ C │ ◄── TOP       ┌───┐
 └───┘               ├───┤               ├───┤               │ B │ ◄── TOP
                     │ A │               │ B │               ├───┤
                     └───┘               ├───┤               │ A │
                                         │ A │               └───┘
                                         └───┘
\`\`\`

---

# 2. SEQUENCE REVERSAL BY NATURE

Because the last pushed element is at the top, popping elements from a stack naturally **reverses** the order of items:

\`\`\`python
# Input order:  "A" -> "B" -> "C"
# Push sequence: stack = ["A", "B", "C"]
# Pop sequence:  "C" -> "B" -> "A" (Reversed!)
\`\`\`

---

# 3. LESSON SUMMARY

✓ LIFO = Last-In, First-Out.
✓ Insertion order determines removal order (most recent first).
✓ Stacks naturally reverse operational sequences.`,
    codePreview: {
      code: `stack = []\nfor item in ["A", "B", "C"]:\n    stack.append(item)\n\nprint("Pushed order: A, B, C")\npopped_order = []\nwhile stack:\n    popped_order.append(stack.pop())\nprint("Popped order (LIFO):", popped_order)`,
      output: `Pushed order: A, B, C\nPopped order (LIFO): ['C', 'B', 'A']`,
      caption: 'LIFO principle reversing input order'
    },
    glossary: [
      { term: 'LIFO', definition: 'Last-In, First-Out operational rule governing stack data structures.' }
    ],
    quizzes: [
      {
    question: '1. In what order are items popped from a stack if pushed in the order X, Y, Z?',
    options: [
      'X, Y, Z',
      'Y, Z, X',
      'Random order',
      'Z, Y, X'
    ],
    correctAnswer: 3,
    explanation: 'Because stacks follow LIFO, the last inserted item Z is popped first, followed by Y, then X.'
  }
    
    ],
    summaryPoints: [
      'LIFO = Last-In, First-Out.',
      'Insertion order dictates removal order.',
      'Stack pops items in reverse insertion sequence.'
    ],
    previousLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'what-is-a-stack',
      title: 'What is a Stack?'
    },
    nextLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'stack-representation',
      title: 'Stack Representation'
    }
  },

  // =========================================================================
  // SECTION 5 — STACKS (LESSON 3: Stack Representation)
  // =========================================================================
  'ds-stacks/stack-representation': {
    id: 'ds-stacks/stack-representation',
    topicId: 'ds-stacks',
    subtopicId: 'stack-representation',
    title: 'Stack Representation',
    subtitle: 'Visualizing vertical stack containers, empty stacks, and TOP pointer indexes',
    categoryTitle: 'STACKS',
    contentMarkdown: `# 1. VERTICAL STACK REPRESENTATION

A stack is conceptually represented vertically:

\`\`\`text
         TOP POINTER
              ↓
          ┌───────┐
          │  40   │  ──► Index [3] (len - 1)
          ├───────┤
          │  30   │  ──► Index [2]
          ├───────┤
          │  20   │  ──► Index [1]
          ├───────┤
          │  10   │  ──► Index [0] (BOTTOM)
          └───────┘
\`\`\`

---

# 2. SPECIAL STACK STATES

- **Empty Stack:** \`size = 0\`, contains no elements, \`TOP = None\` (or index -1).
- **One-Element Stack:** Single item serves as both **BOTTOM** and **TOP**.

---

# 3. LESSON SUMMARY

✓ Stacks are visually represented as vertical single-column containers.
✓ The bottom is index 0; the top is the last element (index \`len - 1\`).
✓ An empty stack has length 0 and no top element.`,
    codePreview: {
      code: `stack = [10, 20, 30, 40]\ntop_index = len(stack) - 1\nprint("Bottom element:", stack[0])\nprint("TOP element:", stack[top_index])`,
      output: `Bottom element: 10\nTOP element: 40`,
      caption: 'Mapping bottom and top elements in a Python list stack'
    },
    glossary: [
      { term: 'Bottom', definition: 'The first element inserted into a stack, located at base index 0.' }
    ],
    quizzes: [
      {
    question: '1. In a Python list implementation of a stack `[10, 20, 30]`, which index represents the TOP of the stack?',
    options: [
      'Index 3',
      'Index -2',
      'Index 0 (the first element)',
      'Index 2 (the final element)'
    ],
    correctAnswer: 3,
    explanation: 'When using a Python list as a stack, the last element (len - 1 = index 2) represents the active TOP.'
  }
    
    ],
    summaryPoints: [
      'Represented vertically with bottom at base.',
      'List end serves as TOP.',
      'Empty stack has size 0.'
    ],
    previousLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'lifo-principle',
      title: 'LIFO Principle'
    },
    nextLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'stack-push',
      title: 'Push Operation'
    }
  },

  // =========================================================================
  // SECTION 5 — STACKS (LESSON 4: Push Operation)
  // =========================================================================
  'ds-stacks/stack-push': {
    id: 'ds-stacks/stack-push',
    topicId: 'ds-stacks',
    subtopicId: 'stack-push',
    title: 'Push Operation',
    subtitle: 'Adding elements to the top of the stack and complexity analysis',
    categoryTitle: 'STACKS',
    contentMarkdown: `# 1. WHAT IS THE PUSH OPERATION?

> 📌 **DEFINITION**
> **Push adds a new element to the top of a stack, making that element the new TOP.**

\`\`\`text
BEFORE PUSH 30:                     AFTER PUSH 30:
        TOP                                  TOP
         ↓                                    ↓
      ┌─────┐                              ┌─────┐
      │ 20  │                              │ 30  │  ◄── NEW TOP!
      ├─────┤                              ├─────┤
      │ 10  │                              │ 20  │
      └─────┘                              ├─────┤
                                           │ 10  │
                                           └─────┘
\`\`\`

---

# 2. PYTHON IMPLEMENTATION: \`append()\`

\`\`\`python
stack = []
stack.append(10)  # Push 10
stack.append(20)  # Push 20
stack.append(30)  # Push 30 -> 30 is new TOP!
\`\`\`

> 💡 **PUSH COMPLEXITY:**
> Using \`append()\` at the end of a Python list performs push in **Amortized O(1) Constant Time**.

---

# 3. LESSON SUMMARY

✓ Push adds an element to the top.
✓ The newly pushed element becomes the new TOP.
✓ Python list \`append()\` achieves amortized **O(1)** push efficiency.`,
    codePreview: {
      code: `stack = [10, 20]\nstack.append(30)  # Push operation\nprint("Stack after push(30):", stack)\nprint("New TOP:", stack[-1])`,
      output: `Stack after push(30): [10, 20, 30]\nNew TOP: 30`,
      caption: 'Pushing a new element onto the top of the stack'
    },
    glossary: [
      { term: 'Push', definition: 'The operation that inserts an element onto the top of a stack.' }
    ],
    quizzes: [
      {
    question: '1. What happens to the size of a stack after performing a push operation?',
    options: [
      'Size remains unchanged',
      'Size increases by 1',
      'Size doubles',
      'Size decreases by 1'
    ],
    correctAnswer: 1,
    explanation: 'Pushing an element adds one new item to the stack, increasing its size by 1.'
  }
    
    ],
    summaryPoints: [
      'Adds item to TOP.',
      'Increases stack size by 1.',
      'Complexity is Amortized O(1).'
    ],
    previousLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'stack-representation',
      title: 'Stack Representation'
    },
    nextLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'stack-pop',
      title: 'Pop Operation'
    }
  },

  // =========================================================================
  // SECTION 5 — STACKS (LESSON 5: Pop Operation)
  // =========================================================================
  'ds-stacks/stack-pop': {
    id: 'ds-stacks/stack-pop',
    topicId: 'ds-stacks',
    subtopicId: 'stack-pop',
    title: 'Pop Operation',
    subtitle: 'Removing and returning the top element, Stack Underflow, and O(1) complexity',
    categoryTitle: 'STACKS',
    contentMarkdown: `# 1. WHAT IS THE POP OPERATION?

> 📌 **DEFINITION**
> **Pop removes and returns the element currently at the top of the stack.**

\`\`\`text
BEFORE POP:                         AFTER POP (Returns 30):
        TOP                                  TOP
         ↓                                    ↓
      ┌─────┐                              ┌─────┐
      │ 30  │                              │ 20  │  ◄── NEW TOP!
      ├─────┤                              ├─────┤
      │ 20  │                              │ 10  │
      ├─────┤                              └─────┘
      │ 10  │
      └─────┘
\`\`\`

---

# 2. STACK UNDERFLOW

If you attempt to pop from an **empty stack**, Python raises an \`IndexError\`:

\`\`\`python
stack = []
val = stack.pop()  # ❌ IndexError: pop from empty list (Stack Underflow!)
\`\`\`

### Safe Pop Pattern:
\`\`\`python
if stack:
    popped_val = stack.pop()  # Safe pop!
\`\`\`

> 💡 **POP COMPLEXITY:**
> Removing from the end of a Python list via \`pop()\` is **O(1) Constant Time**.

---

# 3. LESSON SUMMARY

✓ Pop removes and returns the TOP element.
✓ The previous item becomes the new TOP.
✓ Popping an empty stack causes **Stack Underflow**.
✓ Complexity is **O(1)**.`,
    codePreview: {
      code: `stack = [10, 20, 30]\nremoved = stack.pop()  # Pop operation\nprint("Popped value:", removed)\nprint("Remaining stack:", stack)`,
      output: `Popped value: 30\nRemaining stack: [10, 20]`,
      caption: 'Popping the top element from the stack in O(1) time'
    },
    glossary: [
      { term: 'Pop', definition: 'The operation that removes and returns the top element of a stack.' },
      { term: 'Stack Underflow', definition: 'An error condition occurring when attempting to pop from an empty stack.' }
    ],
    quizzes: [
      {
    question: '1. What error occurs when popping from an empty stack without safety checks?',
    options: [
      'TypeError',
      'Stack Underflow (IndexError)',
      'RecursionError',
      'Stack Overflow'
    ],
    correctAnswer: 1,
    explanation: 'Popping an empty stack raises an IndexError, commonly called Stack Underflow.'
  }
    
    ],
    summaryPoints: [
      'Removes & returns TOP element.',
      'Empty pop causes Stack Underflow.',
      'Complexity is O(1).'
    ],
    previousLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'stack-push',
      title: 'Push Operation'
    },
    nextLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'stack-peek-top',
      title: 'Peek / Top Operation'
    }
  },

  // =========================================================================
  // SECTION 5 — STACKS (LESSON 6: Peek / Top Operation)
  // =========================================================================
  'ds-stacks/stack-peek-top': {
    id: 'ds-stacks/stack-peek-top',
    topicId: 'ds-stacks',
    subtopicId: 'stack-peek-top',
    title: 'Peek / Top Operation',
    subtitle: 'Observing the top element without removing it',
    categoryTitle: 'STACKS',
    contentMarkdown: `# 1. WHAT IS THE PEEK OPERATION?

> 📌 **DEFINITION**
> **Peek (or Top) observes and returns the element at the top of the stack WITHOUT removing it or changing stack size.**

\`\`\`text
PEEK OPERATION:
        TOP
         ↓
      ┌─────┐
      │ 30  │  ──► Returns 30 (Stack contents remain [10, 20, 30]!)
      ├─────┤
      │ 20  │
      ├─────┤
      │ 10  │
      └─────┘
\`\`\`

---

# 2. PEEK VS POP COMPARISON

| Feature | Peek Operation | Pop Operation |
| :--- | :--- | :--- |
| **Reads TOP Value?** | Yes | Yes |
| **Removes TOP Item?** | **No** (Size stays same) | **Yes** (Size decreases by 1) |
| **Python Syntax** | \`stack[-1]\` | \`stack.pop()\` |
| **Complexity** | **O(1)** | **O(1)** |

---

# 3. LESSON SUMMARY

✓ Peek returns top element without modifying stack.
✓ Size remains unchanged.
✓ Implemented via \`stack[-1]\` in **O(1)** time.`,
    codePreview: {
      code: `stack = [10, 20, 30]\ntop_val = stack[-1]  # Peek operation\nprint("Peeked TOP value:", top_val)\nprint("Stack length unchanged:", len(stack))`,
      output: `Peeked TOP value: 30\nStack length unchanged: 3`,
      caption: 'Peeking at the top element without mutating stack size'
    },
    glossary: [
      { term: 'Peek', definition: 'An operation that returns the top element of a stack without removing it.' }
    ],
    quizzes: [
      {
    question: '1. How does Peek differ from Pop?',
    options: [
      'Peek empties the stack',
      'Peek is O(n) and Pop is O(1)',
      'Peek adds an item',
      'Peek observes the top without removing it; Pop removes it'
    ],
    correctAnswer: 3,
    explanation: 'Peek reads the top value without mutating stack contents or size.'
  }
    
    ],
    summaryPoints: [
      'Reads TOP value without removal.',
      'Stack size remains unchanged.',
      'Complexity is O(1).'
    ],
    previousLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'stack-pop',
      title: 'Pop Operation'
    },
    nextLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'stack-implementation-using-array',
      title: 'Stack Implementation Using Array'
    }
  },

  // =========================================================================
  // SECTION 5 — STACKS (LESSON 7: Stack Implementation Using Array)
  // =========================================================================
  'ds-stacks/stack-implementation-using-array': {
    id: 'ds-stacks/stack-implementation-using-array',
    topicId: 'stack-implementation-using-array',
    subtopicId: 'stack-implementation-using-array',
    title: 'Stack Implementation Using Array',
    subtitle: 'Building an OOP Stack class in Python using dynamic arrays / lists',
    categoryTitle: 'STACKS',
    contentMarkdown: `# 1. OOP STACK CLASS IMPLEMENTATION

\`\`\`python
class Stack:
    def __init__(self):
        self.items = []  # Internal array storage

    def push(self, value):
        self.items.append(value)  # Amortized O(1)

    def pop(self):
        if self.is_empty():
            return None  # Or raise Underflow
        return self.items.pop()   # O(1)

    def peek(self):
        if self.is_empty():
            return None
        return self.items[-1]     # O(1)

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)
\`\`\`

---

# 2. WHY USE THE LIST END AS TOP?

- **List END (\`append\` / \`pop\`):** **Amortized O(1)**
- **List START (\`insert(0)\` / \`pop(0)\`):** **O(n)** due to shifting!

> 💡 Always use the end of a Python list as the active stack TOP for maximum efficiency!

---

# 3. LESSON SUMMARY

✓ Encapsulates stack operations inside an OOP class.
✓ Uses list end for **O(1)** push/pop operations.
✓ Includes safety checks for \`is_empty()\`.`,
    codePreview: {
      code: `class Stack:\n    def __init__(self):\n        self.items = []\n    def push(self, val):\n        self.items.append(val)\n    def pop(self):\n        return self.items.pop() if self.items else None\n    def peek(self):\n        return self.items[-1] if self.items else None\n\ns = Stack()\ns.push(100)\ns.push(200)\nprint("Peek:", s.peek())\nprint("Pop:", s.pop())\nprint("New Peek:", s.peek())`,
      output: `Peek: 200\nPop: 200\nNew Peek: 100`,
      caption: 'Encapsulating Stack operations using a Python list wrapper class'
    },
    glossary: [
      { term: 'Stack Class', definition: 'An object-oriented class providing push, pop, peek, and size methods.' }
    ],
    quizzes: [
      {
    question: '1. Why is using index 0 as the stack TOP inefficient for a Python list implementation?',
    options: [
      'Python lists cannot store index 0',
      'It causes stack overflow',
      'Index 0 is invalid',
      'insert(0) and pop(0) require shifting all elements, taking O(n) time'
    ],
    correctAnswer: 3,
    explanation: 'Manipulating index 0 of a list requires shifting elements, making operations O(n) instead of O(1).'
  }
    
    ],
    summaryPoints: [
      'OOP Stack class wrapper.',
      'List end is active TOP.',
      'Push amortized O(1), Pop O(1), Peek O(1).'
    ],
    previousLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'stack-peek-top',
      title: 'Peek / Top Operation'
    },
    nextLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'stack-implementation-using-linked-list',
      title: 'Stack Implementation Using Linked List'
    }
  },

  // =========================================================================
  // SECTION 5 — STACKS (LESSON 8: Stack Implementation Using Linked List)
  // =========================================================================
  'ds-stacks/stack-implementation-using-linked-list': {
    id: 'ds-stacks/stack-implementation-using-linked-list',
    topicId: 'stack-implementation-using-linked-list',
    subtopicId: 'stack-implementation-using-linked-list',
    title: 'Stack Implementation Using Linked List',
    subtitle: 'Building a Stack where the Linked List HEAD is the TOP pointer',
    categoryTitle: 'STACKS',
    contentMarkdown: `# 1. LINKED LIST STACK ARCHITECTURE

When implementing a stack with a linked list, we use **HEAD as TOP**:

\`\`\`text
TOP / HEAD
    ↓
   [ 30 | • ] ──► [ 20 | • ] ──► [ 10 | None ]
\`\`\`

### Why HEAD is the TOP:
- Insert at HEAD is **O(1)** ($\rightarrow$ **Push**).
- Delete at HEAD is **O(1)** ($\rightarrow$ **Pop**).

---

# 2. PYTHON IMPLEMENTATION

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedStack:
    def __init__(self):
        self.top = None  # HEAD pointer

    def push(self, data):
        new_node = Node(data)
        new_node.next = self.top
        self.top = new_node  # O(1)

    def pop(self):
        if self.top is None:
            return None
        val = self.top.data
        self.top = self.top.next  # O(1)
        return val

    def peek(self):
        return self.top.data if self.top else None
\`\`\`

---

# 3. LESSON SUMMARY

✓ HEAD pointer acts as stack TOP.
✓ Push is **O(1)** head insertion.
✓ Pop is **O(1)** head deletion.`,
    codePreview: {
      code: `class Node:\n    def __init__(self, d): self.data = d; self.next = None\nclass LinkedStack:\n    def __init__(self): self.top = None\n    def push(self, d):\n        n = Node(d); n.next = self.top; self.top = n\n    def pop(self):\n        if not self.top: return None\n        v = self.top.data; self.top = self.top.next; return v\n\nls = LinkedStack()\nls.push(10); ls.push(20)\nprint("Popped:", ls.pop())`,
      output: `Popped: 20`,
      caption: 'Linked list stack implementation using HEAD as TOP'
    },
    glossary: [
      { term: 'Linked Stack', definition: 'A stack implementation where linked list head acts as top pointer.' }
    ],
    quizzes: [
      {
    question: '1. Why is the HEAD of a linked list chosen as the TOP pointer for a stack?',
    options: [
      'Tail deletion is always O(1)',
      'Arrays cannot store nodes',
      'Head is index 0',
      'Head insertion and deletion take O(1) Constant Time'
    ],
    correctAnswer: 3,
    explanation: 'Manipulating the head node in a linked list takes O(1) without requiring list traversal.'
  }
    
    ],
    summaryPoints: [
      'HEAD pointer is stack TOP.',
      'Push & Pop are O(1).',
      'No array capacity limits.'
    ],
    previousLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'stack-implementation-using-array',
      title: 'Stack Implementation Using Array'
    },
    nextLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'stack-applications',
      title: 'Stack Applications'
    }
  },

  // =========================================================================
  // SECTION 5 — STACKS (LESSON 9: Stack Applications)
  // =========================================================================
  'ds-stacks/stack-applications': {
    id: 'ds-stacks/stack-applications',
    topicId: 'ds-stacks',
    subtopicId: 'stack-applications',
    title: 'Stack Applications',
    subtitle: 'Real-world use cases: Undo/Redo, Browser Back history, Call Stack, and String Reversal',
    categoryTitle: 'STACKS',
    contentMarkdown: `# 1. REAL-WORLD STACK APPLICATIONS

1. **Text Editor Undo / Redo:**
   - Every edit action is pushed to an \`undo_stack\`. Pressing **Ctrl+Z** pops the most recent edit action first (**LIFO**).
2. **Browser Back Button History:**
   - Web pages visited are pushed to a history stack. Clicking **Back** pops the current page.
3. **Programming Call Stack:**
   - Functions called are pushed to the CPU call stack; when a function returns, its frame is popped.
4. **String Reversal:**
   - Pushing characters onto a stack and popping them produces the reversed string!
5. **Balanced Parentheses Matching:**
   - Compilers use stacks to match opening and closing brackets \`()\`, \`[]\`, \`{}\`.

---

# 2. WHEN DOES A STACK FIT A PROBLEM?

> 📌 **DECISION RULE:**
> Whenever a problem requires processing the **MOST RECENT ITEM FIRST**, a **STACK** is the ideal data structure!

---

# 3. LESSON SUMMARY

✓ Stacks power Undo, Browser Back, Call Stacks, and Bracket Matching.
✓ LIFO behavior suits problems prioritizing recent items.`,
    codePreview: {
      code: `def reverse_string(text):\n    stack = []\n    for char in text:\n        stack.append(char)\n    reversed_text = ""\n    while stack:\n        reversed_text += stack.pop()\n    return reversed_text\n\nprint("Reversed 'CODEFLOW':", reverse_string("CODEFLOW"))`,
      output: `Reversed 'CODEFLOW': WOLFEDOC`,
      caption: 'Reversing a string using stack LIFO behavior'
    },
    glossary: [
      { term: 'Call Stack', definition: 'A memory stack managed by runtime systems to track active function calls.' }
    ],
    quizzes: [
      {
    question: '1. What core condition indicates that a Stack is the right choice for a feature?',
    options: [
      'The problem requires processing the most recent item first',
      'Random access is needed',
      'Items must be processed in order of arrival',
      'Sorted order is required'
    ],
    correctAnswer: 0,
    explanation: 'Stacks handle most recent items first due to LIFO behavior.'
  }
    
    ],
    summaryPoints: [
      'Powers Undo, History, Call Stack.',
      'Reverses sequence order.',
      'Ideal for most-recent item processing.'
    ],
    previousLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'stack-implementation-using-linked-list',
      title: 'Stack Implementation Using Linked List'
    },
    nextLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'stack-complexity',
      title: 'Stack Complexity'
    }
  },

  // =========================================================================
  // SECTION 5 — STACKS (LESSON 10: Stack Complexity)
  // =========================================================================
  'ds-stacks/stack-complexity': {
    id: 'ds-stacks/stack-complexity',
    topicId: 'ds-stacks',
    subtopicId: 'stack-complexity',
    title: 'Stack Complexity',
    subtitle: 'Comprehensive summary of time and space complexity for stack operations',
    categoryTitle: 'STACKS',
    contentMarkdown: `# 1. STACK OPERATIONAL COMPLEXITY TABLE

| Operation | Array / List Implementation | Linked List Implementation |
| :--- | :--- | :--- |
| **Push** | **Amortized O(1)** | **O(1)** |
| **Pop** | **O(1)** | **O(1)** |
| **Peek** | **O(1)** | **O(1)** |
| **isEmpty** | **O(1)** | **O(1)** |
| **Space Complexity** | **O(n)** | **O(n)** |

---

# 2. KEY COMPLEXITY RULES

- **All primary stack operations (push, pop, peek) run in $O(1)$ Constant Time.**
- **Space complexity is $O(n)$**, storing $n$ elements in memory.

---

# 3. LESSON SUMMARY

✓ Push, Pop, and Peek operate in **O(1)** Constant Time.
✓ Space complexity scales linearly **O(n)** with item count.
✓ Stack restricts arbitrary middle access to preserve LIFO integrity.`,
    codePreview: {
      code: `# Stack complexity summary print:\nprint("Push -> Amortized O(1)")\nprint("Pop  -> O(1)")\nprint("Peek -> O(1)")\nprint("Space -> O(n)")`,
      output: `Push -> Amortized O(1)\nPop  -> O(1)\nPeek -> O(1)\nSpace -> O(n)`,
      caption: 'Summary rules for stack operational complexities'
    },
    glossary: [
      { term: 'Stack Complexity', definition: 'Operational guarantees: O(1) time for push/pop/peek and O(n) space.' }
    ],
    quizzes: [
      {
    question: '1. What is the time complexity of Pop in an efficiently implemented stack?',
    options: [
      'O(n)',
      'O(log n)',
      'O(n²)',
      'O(1)'
    ],
    correctAnswer: 3,
    explanation: 'Popping the top item from an efficient stack takes O(1) Constant Time.'
  }
    
    ],
    summaryPoints: [
      'Push, Pop, Peek are O(1).',
      'Space complexity is O(n).',
      'No arbitrary middle access.'
    ],
    previousLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'stack-applications',
      title: 'Stack Applications'
    },
    nextLesson: {
      topicId: 'ds-queues',
      subtopicId: 'what-is-a-queue',
      title: 'What is a Queue?'
    }
  },
// =========================================================================
  // SECTION 6 — QUEUES (LESSON 1: What is a Queue?)
  // =========================================================================
  'ds-queues/what-is-a-queue': {
    id: 'ds-queues/what-is-a-queue',
    topicId: 'ds-queues',
    subtopicId: 'what-is-a-queue',
    title: 'What is a Queue?',
    subtitle: 'Understanding linear data structures with open FRONT and REAR operational ends',
    categoryTitle: 'QUEUES',
    contentMarkdown: `# 1. THE WAITING LINE ANALOGY

Think of people waiting in line at a movie ticket counter:

\`\`\`text
TICKET COUNTER
      ↑
    FRONT                                           REAR
      ↓                                               ↓
┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐
│ Person A  │ ◄─│ Person B  │ ◄─│ Person C  │ ◄─│ Person D  │
└───────────┘   └───────────┘   └───────────┘   └───────────┘
\`\`\`

Who gets served first? **Person A!** Person A arrived first, while Person D entered last at the back of the line.

---

# 2. DEFINITION: WHAT IS A QUEUE?

> 📌 **DEFINITION**
> **A Queue is a linear data structure where elements are added at one end called the REAR, and removed from the opposite end called the FRONT.**

\`\`\`text
DEQUEUE (Remove)                                        ENQUEUE (Add)
      ◄──                                                    ◄──
    FRONT                                                   REAR
      ↓                                                       ↓
┌───────────┬───────────┬───────────┬───────────┐
│    10     │    20     │    30     │    40     │
└───────────┴───────────┴───────────┴───────────┘
\`\`\`

---

# 3. CORE QUEUE TERMINOLOGY

- **FRONT:** The end of the queue where elements are removed (dequeued).
- **REAR:** The end of the queue where new elements join (enqueued).
- **ENQUEUE:** Add an element to the REAR.
- **DEQUEUE:** Remove an element from the FRONT.
- **PEEK / FRONT:** View the element at the FRONT without removing it.

---

# 4. LESSON SUMMARY

✓ Queues operate on two open ends: FRONT and REAR.
✓ Enqueue happens at REAR; Dequeue happens at FRONT.
✓ Forms the foundation of FIFO processing.`,
    codePreview: {
      code: `from collections import deque\n\n# Creating a Queue using collections.deque\nqueue = deque()\nqueue.append(10)  # Enqueue 10 at REAR\nqueue.append(20)  # Enqueue 20 at REAR\n\nprint("Queue contents:", list(queue))\nprint("FRONT element:", queue[0])\nprint("REAR element:", queue[-1])`,
      output: `Queue contents: [10, 20]\nFRONT element: 10\nREAR element: 20`,
      caption: 'Creating a Queue using Python collections.deque'
    },
    glossary: [
      { term: 'Queue', definition: 'A linear data structure where items enter at REAR and leave from FRONT.' },
      { term: 'FRONT', definition: 'The removal end of a queue holding the oldest item.' },
      { term: 'REAR', definition: 'The insertion end of a queue holding the newest item.' }
    ],
    quizzes: [
      {
    question: '1. At which end are new elements added to a queue?',
    options: [
      'In the middle',
      'At the REAR',
      'At index 0 only',
      'At the FRONT'
    ],
    correctAnswer: 1,
    explanation: 'In a queue, new elements always join at the REAR end.'
  }
    
    ],
    summaryPoints: [
      'Linear structure with FRONT and REAR ends.',
      'Enqueue at REAR; Dequeue from FRONT.',
      'Oldest items leave first.'
    ],
    previousLesson: {
      topicId: 'ds-stacks',
      subtopicId: 'stack-complexity',
      title: 'Stack Complexity'
    },
    nextLesson: {
      topicId: 'ds-queues',
      subtopicId: 'fifo-principle',
      title: 'FIFO Principle'
    }
  },

  // =========================================================================
  // SECTION 6 — QUEUES (LESSON 2: FIFO Principle)
  // =========================================================================
  'ds-queues/fifo-principle': {
    id: 'ds-queues/fifo-principle',
    topicId: 'ds-queues',
    subtopicId: 'fifo-principle',
    title: 'FIFO Principle',
    subtitle: 'Mastering the First-In, First-Out operational order',
    categoryTitle: 'QUEUES',
    contentMarkdown: `# 1. WHAT IS FIFO?

> 📌 **DEFINITION**
> **FIFO stands for First-In, First-Out. The element that entered the queue first is always the first element to be removed.**

\`\`\`text
ENQUEUE A:       [A] (FRONT/REAR)

ENQUEUE B:       FRONT           REAR
                   ↓               ↓
                 [A]     ──►     [B]

ENQUEUE C:       FRONT                   REAR
                   ↓                       ↓
                 [A]     ──►     [B]  ──► [C]

DEQUEUE():       Returns A! (First In -> First Out)
                 Remaining:  FRONT       REAR
                               ↓           ↓
                             [B]   ──►   [C]
\`\`\`

---

# 2. FIFO VS LIFO COMPARISON

- **STACK (LIFO):** Last element added leaves first (like a stack of plates).
- **QUEUE (FIFO):** First element added leaves first (like a ticket waiting line).

\`\`\`python
# Enqueue sequence: A -> B -> C
# Dequeue sequence: A -> B -> C (Arrival order preserved!)
\`\`\`

---

# 3. LESSON SUMMARY

✓ FIFO = First-In, First-Out.
✓ Preserves arrival sequence order.
✓ Contrast to Stack LIFO order.`,
    codePreview: {
      code: `from collections import deque\n\nq = deque()\nfor val in ["A", "B", "C"]:\n    q.append(val)\n\nprint("Enqueue order: A, B, C")\ndequeued = []\nwhile q:\n    dequeued.append(q.popleft())\n\nprint("Dequeue order (FIFO):", dequeued)`,
      output: `Enqueue order: A, B, C\nDequeue order (FIFO): ['A', 'B', 'C']`,
      caption: 'FIFO principle preserving arrival sequence order'
    },
    glossary: [
      { term: 'FIFO', definition: 'First-In, First-Out operational rule governing queue data structures.' }
    ],
    quizzes: [
      {
    question: '1. What sequence is produced when dequeuing elements enqueued in order X, Y, Z?',
    options: [
      'X, Y, Z (Arrival order preserved)',
      'Z, Y, X',
      'Y, X, Z',
      'Random order'
    ],
    correctAnswer: 0,
    explanation: 'Because queues follow FIFO, the first item X is dequeued first, followed by Y, then Z.'
  }
    
    ],
    summaryPoints: [
      'FIFO = First-In, First-Out.',
      'Preserves original insertion sequence.',
      'First enqueued item is first dequeued.'
    ],
    previousLesson: {
      topicId: 'ds-queues',
      subtopicId: 'what-is-a-queue',
      title: 'What is a Queue?'
    },
    nextLesson: {
      topicId: 'ds-queues',
      subtopicId: 'queue-representation',
      title: 'Queue Representation'
    }
  },

  // =========================================================================
  // SECTION 6 — QUEUES (LESSON 3: Queue Representation)
  // =========================================================================
  'ds-queues/queue-representation': {
    id: 'ds-queues/queue-representation',
    topicId: 'ds-queues',
    subtopicId: 'queue-representation',
    title: 'Queue Representation',
    subtitle: 'Visualizing horizontal queues, FRONT/REAR indicators, and empty queue states',
    categoryTitle: 'QUEUES',
    contentMarkdown: `# 1. HORIZONTAL QUEUE REPRESENTATION

Queues are primarily visualised HORIZONTALLY:

\`\`\`text
 DEQUEUE (Remove)                                        ENQUEUE (Add)
       ◄──                                                    ◄──
     FRONT                                                   REAR
       ↓                                                       ↓
 ┌───────────┬───────────┬───────────┬───────────┐
 │    10     │    20     │    30     │    40     │
 └───────────┴───────────┴───────────┴───────────┘
   Index [0]   Index [1]   Index [2]   Index [3]
\`\`\`

---

# 2. SPECIAL QUEUE STATES

- **Empty Queue:** \`size = 0\`, \`FRONT = None\`, \`REAR = None\`.
- **One-Element Queue:** Single element serves as both **FRONT** and **REAR** simultaneously!

\`\`\`text
FRONT / REAR
     ↓
  ┌────┐
  │ 10 │
  └────┘
\`\`\`

---

# 3. LESSON SUMMARY

✓ Visualized horizontally with FRONT on left and REAR on right.
✓ In a 1-element queue, FRONT and REAR point to the exact same item.
✓ Empty queue has length 0 and no pointers.`,
    codePreview: {
      code: `from collections import deque\n\nq = deque([10])  # One element queue\nprint("Is FRONT == REAR?", q[0] == q[-1])\n\nq.append(20)     # Add second element\nprint("FRONT:", q[0])\nprint("REAR:", q[-1])`,
      output: `Is FRONT == REAR? True\nFRONT: 10\nREAR: 20`,
      caption: 'FRONT and REAR pointers in one-element vs multi-element queues'
    },
    glossary: [
      { term: 'Queue Size', definition: 'The count of active elements currently waiting in the queue.' }
    ],
    quizzes: [
      {
    question: '1. In a queue containing exactly 1 element, what do FRONT and REAR refer to?',
    options: [
      'REAR is None',
      'Both FRONT and REAR point to the exact same single element',
      'FRONT is None',
      'FRONT is index 1'
    ],
    correctAnswer: 1,
    explanation: 'In a single-element queue, that element is simultaneously FRONT and REAR.'
  }
    
    ],
    summaryPoints: [
      'Horizontal representation.',
      '1-element queue has FRONT == REAR.',
      'Empty queue has size 0.'
    ],
    previousLesson: {
      topicId: 'ds-queues',
      subtopicId: 'fifo-principle',
      title: 'FIFO Principle'
    },
    nextLesson: {
      topicId: 'ds-queues',
      subtopicId: 'queue-enqueue',
      title: 'Enqueue Operation'
    }
  },

  // =========================================================================
  // SECTION 6 — QUEUES (LESSON 4: Enqueue Operation)
  // =========================================================================
  'ds-queues/queue-enqueue': {
    id: 'ds-queues/queue-enqueue',
    topicId: 'ds-queues',
    subtopicId: 'queue-enqueue',
    title: 'Enqueue Operation',
    subtitle: 'Adding new elements to the REAR of the queue',
    categoryTitle: 'QUEUES',
    contentMarkdown: `# 1. WHAT IS ENQUEUE?

> 📌 **DEFINITION**
> **Enqueue adds a new element to the REAR of a queue, updating REAR to point to the new item.**

\`\`\`text
BEFORE ENQUEUE 30:
  FRONT       REAR
    ↓           ↓
  [10] ──►    [20]

AFTER ENQUEUE 30:
  FRONT                   REAR
    ↓                       ↓
  [10] ──►    [20]  ──►   [30]  ◄── NEW REAR!
\`\`\`

---

# 2. ENQUEUE STEP-BY-STEP

1. Identify current REAR.
2. Add new item after current REAR.
3. Update REAR indicator to point to the new item.
4. **FRONT remains unchanged!** Size increases by 1.

---

# 3. LESSON SUMMARY

✓ Enqueue inserts at REAR.
✓ Updates REAR pointer while FRONT stays fixed.
✓ Increases queue size by 1.`,
    codePreview: {
      code: `from collections import deque\n\nq = deque([10, 20])\nq.append(30)  # Enqueue operation\nprint("Queue after enqueue(30):", list(q))\nprint("New REAR value:", q[-1])`,
      output: `Queue after enqueue(30): [10, 20, 30]\nNew REAR value: 30`,
      caption: 'Enqueueing a new item at the REAR of a queue'
    },
    glossary: [
      { term: 'Enqueue', definition: 'The operation that appends an element onto the REAR of a queue.' }
    ],
    quizzes: [
      {
    question: '1. What happens to the FRONT pointer when a new element is enqueued onto a non-empty queue?',
    options: [
      'FRONT moves to the new element',
      'FRONT remains unchanged',
      'FRONT becomes None',
      'FRONT resets to 0'
    ],
    correctAnswer: 1,
    explanation: 'Enqueueing adds items to the REAR; FRONT remains unchanged.'
  }
    
    ],
    summaryPoints: [
      'Appends item to REAR.',
      'Updates REAR pointer.',
      'FRONT remains unchanged.'
    ],
    previousLesson: {
      topicId: 'ds-queues',
      subtopicId: 'queue-representation',
      title: 'Queue Representation'
    },
    nextLesson: {
      topicId: 'ds-queues',
      subtopicId: 'queue-dequeue',
      title: 'Dequeue Operation'
    }
  },

  // =========================================================================
  // SECTION 6 — QUEUES (LESSON 5: Dequeue Operation)
  // =========================================================================
  'ds-queues/queue-dequeue': {
    id: 'ds-queues/queue-dequeue',
    topicId: 'ds-queues',
    subtopicId: 'queue-dequeue',
    title: 'Dequeue Operation',
    subtitle: 'Removing and returning the element at the FRONT of a queue',
    categoryTitle: 'QUEUES',
    contentMarkdown: `# 1. WHAT IS DEQUEUE?

> 📌 **DEFINITION**
> **Dequeue removes and returns the element at the FRONT of the queue.**

\`\`\`text
BEFORE DEQUEUE:
  FRONT                   REAR
    ↓                       ↓
  [10] ──►    [20]  ──►   [30]

AFTER DEQUEUE (Returns 10):
              FRONT       REAR
                ↓           ↓
              [20]  ──►   [30]  ◄── NEW FRONT!
\`\`\`

---

# 2. QUEUE UNDERFLOW

Attempting to dequeue from an **empty queue** results in **Queue Underflow**:

\`\`\`python
from collections import deque
q = deque()
val = q.popleft()  # ❌ IndexError: pop from an empty deque (Queue Underflow!)
\`\`\`

### Safe Dequeue Pattern:
\`\`\`python
if q:
    val = q.popleft()  # Safe Dequeue O(1)
\`\`\`

---

# 3. LESSON SUMMARY

✓ Dequeue removes and returns the FRONT element.
✓ Next element becomes new FRONT.
✓ Dequeuing an empty queue causes Queue Underflow.`,
    codePreview: {
      code: `from collections import deque\n\nq = deque([10, 20, 30])\nremoved = q.popleft()  # Dequeue operation O(1)\nprint("Dequeued value:", removed)\nprint("Remaining queue:", list(q))\nprint("New FRONT:", q[0])`,
      output: `Dequeued value: 10\nRemaining queue: [20, 30]\nNew FRONT: 20`,
      caption: 'Dequeuing the front element in O(1) time'
    },
    glossary: [
      { term: 'Dequeue', definition: 'The operation that removes and returns the front element of a queue.' },
      { term: 'Queue Underflow', definition: 'An error state triggered when attempting to dequeue from an empty queue.' }
    ],
    quizzes: [
      {
    question: '1. Which element is removed during a Dequeue operation?',
    options: [
      'The element at the REAR',
      'The largest element',
      'The element at the FRONT',
      'A random element'
    ],
    correctAnswer: 2,
    explanation: 'Dequeue always removes the item at the FRONT (the oldest waiting item).'
  }
    
    ],
    summaryPoints: [
      'Removes & returns FRONT item.',
      'Empty dequeue causes Queue Underflow.',
      'Updates FRONT pointer.'
    ],
    previousLesson: {
      topicId: 'ds-queues',
      subtopicId: 'queue-enqueue',
      title: 'Enqueue Operation'
    },
    nextLesson: {
      topicId: 'ds-queues',
      subtopicId: 'front-and-rear',
      title: 'Front and Rear'
    }
  },

  // =========================================================================
  // SECTION 6 — QUEUES (LESSON 6: Front and Rear)
  // =========================================================================
  'ds-queues/front-and-rear': {
    id: 'ds-queues/front-and-rear',
    topicId: 'ds-queues',
    subtopicId: 'front-and-rear',
    title: 'Front and Rear',
    subtitle: 'Deep dive into managing FRONT and REAR pointers during queue mutations',
    categoryTitle: 'QUEUES',
    contentMarkdown: `# 1. FRONT AND REAR POINTER ROLES

- **FRONT:** References the oldest available element (removal end).
- **REAR:** References the newest enqueued element (insertion end).

\`\`\`text
 FRONT                         REAR
   ↓                             ↓
┌────┬────┬────┬────┐
│ 10 │ 20 │ 30 │ 40 │
└────┴────┴────┴────┘
\`\`\`

---

# 2. HOW OPERATIONS MUTATE ENDS

- **ENQUEUE:** Updates **REAR** pointer; FRONT stays unchanged.
- **DEQUEUE:** Updates **FRONT** pointer; REAR stays unchanged.
- **PEEK FRONT / REAR:** Reads value at FRONT or REAR in **O(1)** without mutating the queue.

---

# 3. LESSON SUMMARY

✓ FRONT handles removals; REAR handles insertions.
✓ Operations mutate specific pointers independently.
✓ Peeking reads FRONT or REAR without modifying size.`,
    codePreview: {
      code: `from collections import deque\n\nq = deque([10, 20, 30])\nprint("Peek FRONT:", q[0])\nprint("Peek REAR:", q[-1])\nprint("Queue length unchanged:", len(q))`,
      output: `Peek FRONT: 10\nPeek REAR: 30\nQueue length unchanged: 3`,
      caption: 'Peeking FRONT and REAR values without queue mutation'
    },
    glossary: [
      { term: 'Peek FRONT', definition: 'Observing the front element without dequeuing it.' }
    ],
    quizzes: [
      {
    question: '1. Which pointer is updated when performing a Dequeue operation?',
    options: [
      'REAR pointer',
      'Both pointers always',
      'FRONT pointer',
      'Neither pointer'
    ],
    correctAnswer: 2,
    explanation: 'Dequeue removes from FRONT, so the FRONT pointer advances to the next element.'
  }
    
    ],
    summaryPoints: [
      'FRONT is removal end.',
      'REAR is insertion end.',
      'Peek FRONT/REAR is O(1).'
    ],
    previousLesson: {
      topicId: 'ds-queues',
      subtopicId: 'queue-dequeue',
      title: 'Dequeue Operation'
    },
    nextLesson: {
      topicId: 'ds-queues',
      subtopicId: 'queue-implementation-using-array',
      title: 'Queue Implementation Using Array'
    }
  },

  // =========================================================================
  // SECTION 6 — QUEUES (LESSON 7: Queue Implementation Using Array)
  // =========================================================================
  'ds-queues/queue-implementation-using-array': {
    id: 'ds-queues/queue-implementation-using-array',
    topicId: 'queue-implementation-using-array',
    subtopicId: 'queue-implementation-using-array',
    title: 'Queue Implementation Using Array',
    subtitle: 'Comparing naive Python list pop(0) vs efficient collections.deque',
    categoryTitle: 'QUEUES',
    contentMarkdown: `# 1. NAIVE PYTHON LIST QUEUE: O(n) DEQUEUE COST

Using a standard Python list for a queue:
\`\`\`python
q = []
q.append(10)  # Enqueue: Amortized O(1)
q.pop(0)      # Dequeue: O(n) Linear Time! (Shifts all remaining elements!)
\`\`\`

\`\`\`text
BEFORE pop(0):  [ 10 ][ 20 ][ 30 ][ 40 ]
REMOVE 10:      [    ][ 20 ][ 30 ][ 40 ]
SHIFTING O(n):  [ 20 ][ 30 ][ 40 ]
\`\`\`

---

# 2. EFFICIENT SOLUTION: \`collections.deque\`

Python's built-in \`collections.deque\` provides **O(1) Constant Time** for both enqueue (\`append\`) and dequeue (\`popleft\`):

\`\`\`python
from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, val):
        self.items.append(val)     # O(1)

    def dequeue(self):
        return self.items.popleft() if self.items else None  # O(1)
\`\`\`

---

# 3. LESSON SUMMARY

✓ Naive \`list.pop(0)\` is **O(n)** due to element shifting.
✓ Preferred Python queue structure is \`collections.deque\`.
✓ \`deque.append()\` and \`deque.popleft()\` run in **O(1)** time.`,
    codePreview: {
      code: `from collections import deque\n\nclass Queue:\n    def __init__(self): self.items = deque()\n    def enqueue(self, v): self.items.append(v)\n    def dequeue(self): return self.items.popleft() if self.items else None\n\nq = Queue()\nq.enqueue(100); q.enqueue(200)\nprint("Dequeued:", q.dequeue())\nprint("Next Dequeued:", q.dequeue())`,
      output: `Dequeued: 100\nNext Dequeued: 200`,
      caption: 'Efficient OOP Queue class wrapper using collections.deque'
    },
    glossary: [
      { term: 'collections.deque', definition: 'Python double-ended queue supporting O(1) insertions/deletions at both ends.' }
    ],
    quizzes: [
      {
    question: '1. Why is calling pop(0) on a Python list inefficient for implementing a queue?',
    options: [
      'Index 0 does not exist',
      'It requires shifting all remaining elements to the left, taking O(n) time',
      'It reverses the list',
      'It causes recursion error'
    ],
    correctAnswer: 1,
    explanation: 'pop(0) shifts all remaining n elements leftward, producing an O(n) performance penalty.'
  }
    
    ],
    summaryPoints: [
      'list.pop(0) is O(n) due to shifting.',
      'collections.deque provides O(1) popleft.',
      'OOP Queue class wrapper.'
    ],
    previousLesson: {
      topicId: 'ds-queues',
      subtopicId: 'front-and-rear',
      title: 'Front and Rear'
    },
    nextLesson: {
      topicId: 'ds-queues',
      subtopicId: 'queue-implementation-using-linked-list',
      title: 'Queue Implementation Using Linked List'
    }
  },

  // =========================================================================
  // SECTION 6 — QUEUES (LESSON 8: Queue Implementation Using Linked List)
  // =========================================================================
  'ds-queues/queue-implementation-using-linked-list': {
    id: 'ds-queues/queue-implementation-using-linked-list',
    topicId: 'queue-implementation-using-linked-list',
    subtopicId: 'queue-implementation-using-linked-list',
    title: 'Queue Implementation Using Linked List',
    subtitle: 'Building a Linked Queue where HEAD is FRONT and TAIL is REAR',
    categoryTitle: 'QUEUES',
    contentMarkdown: `# 1. LINKED QUEUE ARCHITECTURE

To build an efficient **O(1)** linked queue, maintain TWO references:
- **FRONT = HEAD** (Dequeue removes HEAD node).
- **REAR = TAIL** (Enqueue appends after TAIL node).

\`\`\`text
FRONT / HEAD                                           REAR / TAIL
     ↓                                                      ↓
  [ 10 | • ] ──► [ 20 | • ] ──► [ 30 | • ] ──► [ 40 | None ]
\`\`\`

---

# 2. PYTHON LINKED QUEUE IMPLEMENTATION

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedQueue:
    def __init__(self):
        self.front = None
        self.rear = None

    def enqueue(self, data):
        new_node = Node(data)
        if self.rear is None:
            self.front = self.rear = new_node  # First node
            return
        self.rear.next = new_node  # Link after tail
        self.rear = new_node       # Update tail pointer O(1)

    def dequeue(self):
        if self.front is None:
            return None
        val = self.front.data
        self.front = self.front.next  # Move head pointer O(1)
        if self.front is None:
            self.rear = None          # Clear stale rear if queue empty
        return val
\`\`\`

---

# 3. LESSON SUMMARY

✓ HEAD = FRONT (Dequeue in **O(1)**).
✓ TAIL = REAR (Enqueue in **O(1)**).
✓ Clearing final element sets both **front** and **rear** to **None**.`,
    codePreview: {
      code: `class Node:\n    def __init__(self, d): self.data = d; self.next = None\nclass LinkedQueue:\n    def __init__(self): self.front = self.rear = None\n    def enqueue(self, d):\n        n = Node(d)\n        if not self.rear: self.front = self.rear = n; return\n        self.rear.next = n; self.rear = n\n    def dequeue(self):\n        if not self.front: return None\n        v = self.front.data; self.front = self.front.next\n        if not self.front: self.rear = None\n        return v\n\nlq = LinkedQueue()\nlq.enqueue(10); lq.enqueue(20)\nprint("Dequeued:", lq.dequeue())`,
      output: `Dequeued: 10`,
      caption: 'Linked Queue implementation maintaining FRONT and REAR pointers'
    },
    glossary: [
      { term: 'Linked Queue', definition: 'A queue built using linked nodes with front (head) and rear (tail) pointers.' }
    ],
    quizzes: [
      {
    question: '1. Why must a Linked Queue maintain BOTH front and rear pointers to achieve O(1) enqueue and dequeue?',
    options: [
      'Head insertion takes O(n)',
      'Arrays cannot be used',
      'Front enables O(1) head deletion; rear enables O(1) tail insertion without list traversal',
      'Node objects require two pointers'
    ],
    correctAnswer: 2,
    explanation: 'Maintaining rear avoids traversing the entire list to find the tail during enqueue operations.'
  }
    
    ],
    summaryPoints: [
      'HEAD = FRONT; TAIL = REAR.',
      'Both Enqueue and Dequeue take O(1).',
      'Must clear rear when dequeuing final node.'
    ],
    previousLesson: {
      topicId: 'ds-queues',
      subtopicId: 'queue-implementation-using-array',
      title: 'Queue Implementation Using Array'
    },
    nextLesson: {
      topicId: 'ds-queues',
      subtopicId: 'queue-applications',
      title: 'Queue Applications'
    }
  },

  // =========================================================================
  // SECTION 6 — QUEUES (LESSON 9: Queue Applications)
  // =========================================================================
  'ds-queues/queue-applications': {
    id: 'ds-queues/queue-applications',
    topicId: 'ds-queues',
    subtopicId: 'queue-applications',
    title: 'Queue Applications',
    subtitle: 'Real-world use cases: Printer Spooling, Customer Support Lines, Task Schedulers, and BFS',
    categoryTitle: 'QUEUES',
    contentMarkdown: `# 1. REAL-WORLD QUEUE APPLICATIONS

1. **Printer Job Spooling:**
   - Print jobs are queued in arrival order. The printer processes the oldest submitted document first (**FIFO**).
2. **Customer Support Waiting Lines:**
   - First-Come, First-Served (FCFS) call center queues.
3. **CPU Task & Process Scheduling:**
   - Round-robin OS task execution queues.
4. **Message Brokers (RabbitMQ / Kafka):**
   - Asynchronous producer-consumer pipelines process events in arrival sequence.
5. **Graph Traversal (Breadth-First Search - BFS):**
   - BFS uses a queue to visit graph nodes level by level!

---

# 2. DECISION RULE: STACK VS QUEUE

- **Use a STACK when:** You need to process the **MOST RECENT ITEM FIRST** (LIFO).
- **Use a QUEUE when:** You need to process items in **ARRIVAL ORDER** (FIFO).

---

# 3. LESSON SUMMARY

✓ Queues power Printer Spooling, Support Lines, Task Schedulers, and BFS.
✓ Use Queues whenever First-Come, First-Served arrival order is required.`,
    codePreview: {
      code: `from collections import deque\n\nprinter_queue = deque(["Doc1.pdf", "Doc2.pdf", "Doc3.pdf"])\nprint("Printing jobs in FIFO arrival order:")\nwhile printer_queue:\n    job = printer_queue.popleft()\n    print(f"Printing {job}...")`,
      output: `Printing jobs in FIFO arrival order:\nPrinting Doc1.pdf...\nPrinting Doc2.pdf...\nPrinting Doc3.pdf...`,
      caption: 'Simulating a printer job queue using FIFO order'
    },
    glossary: [
      { term: 'Printer Spooling', definition: 'Managing print documents in a FIFO queue for sequential processing.' }
    ],
    quizzes: [
      {
    question: '1. Which data structure is used by Breadth-First Search (BFS) for level-order graph traversal?',
    options: [
      'Queue',
      'Array',
      'Hash Table',
      'Stack'
    ],
    correctAnswer: 0,
    explanation: 'BFS uses a Queue to explore graph vertices in order of discovery.'
  }
    
    ],
    summaryPoints: [
      'Powers Printers, Support Lines, BFS.',
      'Preserves First-Come, First-Served order.',
      'Essential for producer-consumer systems.'
    ],
    previousLesson: {
      topicId: 'ds-queues',
      subtopicId: 'queue-implementation-using-linked-list',
      title: 'Queue Implementation Using Linked List'
    },
    nextLesson: {
      topicId: 'ds-queues',
      subtopicId: 'queue-complexity',
      title: 'Queue Complexity'
    }
  },

  // =========================================================================
  // SECTION 6 — QUEUES (LESSON 10: Queue Complexity)
  // =========================================================================
  'ds-queues/queue-complexity': {
    id: 'ds-queues/queue-complexity',
    topicId: 'ds-queues',
    subtopicId: 'queue-complexity',
    title: 'Queue Complexity',
    subtitle: 'Comprehensive time and space complexity analysis across implementations',
    categoryTitle: 'QUEUES',
    contentMarkdown: `# 1. QUEUE OPERATIONAL COMPLEXITY MASTER TABLE

| Operation | Naive Python List | \`collections.deque\` | Linked Queue (Head + Tail) |
| :--- | :--- | :--- | :--- |
| **Enqueue** | **Amortized O(1)** | **O(1)** | **O(1)** |
| **Dequeue** | **O(n)** (pop(0)) | **O(1)** (popleft) | **O(1)** |
| **Peek FRONT** | **O(1)** | **O(1)** | **O(1)** |
| **Peek REAR** | **O(1)** | **O(1)** | **O(1)** |
| **Space Complexity** | **O(n)** | **O(n)** | **O(n)** |

---

# 2. KEY TAKEAWAYS

- **Efficient Queues (\`deque\` or Linked Queue):** All operations (enqueue, dequeue, peek) run in **O(1) Constant Time**.
- **Naive Array Queues (\`list.pop(0)\`):** Dequeue takes **O(n)** due to element shifting.
- **Space Complexity:** **O(n)** scaling with item count.

---

# 3. LESSON SUMMARY

✓ Enqueue, Dequeue, and Peek run in **O(1)** time for efficient queues.
✓ Avoid \`list.pop(0)\` due to **O(n)** cost.
✓ Space complexity is **O(n)**.`,
    codePreview: {
      code: `# Queue complexity summary print:\nprint("Enqueue -> O(1)")\nprint("Dequeue -> O(1) with deque / Linked Queue")\nprint("Peek    -> O(1)")\nprint("Space   -> O(n)")`,
      output: `Enqueue -> O(1)\nDequeue -> O(1) with deque / Linked Queue\nPeek    -> O(1)\nSpace   -> O(n)`,
      caption: 'Summary rules for queue operational complexities'
    },
    glossary: [
      { term: 'Queue Complexity', definition: 'Operational guarantees: O(1) time for enqueue/dequeue/peek and O(n) space.' }
    ],
    quizzes: [
      {
    question: '1. What is the time complexity of Dequeue when using Python collections.deque?',
    options: [
      'O(1)',
      'O(n²)',
      'O(n)',
      'O(log n)'
    ],
    correctAnswer: 0,
    explanation: 'collections.deque.popleft() operates in O(1) Constant Time.'
  }
    
    ],
    summaryPoints: [
      'Enqueue, Dequeue, Peek are O(1).',
      'Space complexity is O(n).',
      'Avoid O(n) list.pop(0).'
    ],
    previousLesson: {
      topicId: 'ds-queues',
      subtopicId: 'queue-applications',
      title: 'Queue Applications'
    },
    nextLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'what-is-hashing',
      title: 'What is Hashing?'
    }
  },
// =========================================================================
  // SECTION 7 — HASH TABLES (LESSON 1: What is a Hash Table?)
  // =========================================================================
  'ds-hash-tables/what-is-a-hash-table': {
    id: 'ds-hash-tables/what-is-a-hash-table',
    topicId: 'ds-hash-tables',
    subtopicId: 'what-is-a-hash-table',
    title: 'What is a Hash Table?',
    subtitle: 'Understanding key-value pair storage, fast direct lookup, and dictionary foundations',
    categoryTitle: 'HASH TABLES',
    contentMarkdown: `# 1. THE NAME-TO-SCORE PROBLEM

Suppose we want to store student names and their scores:

- **"Alice"** ──► 90
- **"Bob"** ──► 85
- **"Charlie"** ──► 95

How can we quickly find **Bob's score** without searching through every single name in an unsorted list?

---

# 2. DEFINITION: WHAT IS A HASH TABLE?

> 📌 **DEFINITION**
> **A Hash Table is a data structure that stores Key-Value pairs and uses a Hash Function to calculate the exact bucket index where each pair belongs.**

\`\`\`text
KEY: "Bob"  ──►  HASH FUNCTION  ──►  INDEX: 1  ──►  BUCKET 1: ("Bob" ──► 85)
\`\`\`

Instead of scanning elements sequentially from beginning to end ($O(n)$ search), the Hash Table calculates the destination index directly!

---

# 3. KEY-VALUE PAIRS & PYTHON DICTIONARIES

In Python, a hash table is accessed via dictionaries (\`dict\`):

\`\`\`python
student = {
    "name": "Alice",
    "score": 90
}

# Direct key lookup in O(1) average time:
print(student["score"])  # Output: 90
\`\`\`

---

# 4. LESSON SUMMARY

✓ Hash Tables store Key-Value pairs.
✓ Keys locate values using a hash calculation.
✓ Provides $O(1)$ average search time without checking every element.`,
    codePreview: {
      code: `student = {"Alice": 90, "Bob": 85, "Charlie": 95}\n\n# Direct lookup using key\nprint("Bob's Score:", student["Bob"])`,
      output: `Bob's Score: 85`,
      caption: 'Direct key-value lookup in Python dictionary'
    },
    glossary: [
      { term: 'Hash Table', definition: 'A data structure storing key-value pairs indexed by a hash function.' },
      { term: 'Key', definition: 'The unique identifier used to locate a specific value in a hash table.' },
      { term: 'Value', definition: 'The data associated with a key in a hash table.' }
    ],
    quizzes: [
      {
    question: '1. What is the primary purpose of a Hash Function in a Hash Table?',
    options: [
      'To calculate the array index where a key-value pair is stored',
      'To sort the keys alphabetically',
      'To reverse the key order',
      'To delete duplicate values'
    ],
    correctAnswer: 0,
    explanation: 'A hash function transforms a key into an array index for fast direct access.'
  }
    
    ],
    summaryPoints: [
      'Stores Key-Value pairs.',
      'Uses Hash Function to target index directly.',
      'Powers Python dictionaries.'
    ],
    previousLesson: {
      topicId: 'ds-queues',
      subtopicId: 'queue-complexity',
      title: 'Queue Complexity'
    },
    nextLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'hashing-concept',
      title: 'Hashing Concept'
    }
  },

  // =========================================================================
  // SECTION 7 — HASH TABLES (LESSON 2: Hashing Concept)
  // =========================================================================
  'ds-hash-tables/hashing-concept': {
    id: 'ds-hash-tables/hashing-concept',
    topicId: 'ds-hash-tables',
    subtopicId: 'hashing-concept',
    title: 'Hashing Concept',
    subtitle: 'Transforming keys into deterministic bucket indices via modulo math',
    categoryTitle: 'HASH TABLES',
    contentMarkdown: `# 1. THE HASHING PIPELINE

> 📌 **DEFINITION**
> **Hashing is the process of converting an input key into a numeric hash value, which is then mapped into a valid array index.**

\`\`\`text
INPUT KEY  ──►  HASH FUNCTION  ──►  HASH VALUE  ──►  MODULO TABLE_SIZE  ──►  BUCKET INDEX
\`\`\`

---

# 2. SIMPLE MODULO HASH EXAMPLE

Let table size = 10. Rule: \`index = key % 10\`.

- **Key = 25:** $25 \pmod{10} = 5$ ──► Store at **Index 5**.
- **Key = 42:** $42 \pmod{10} = 2$ ──► Store at **Index 2**.

\`\`\`text
INDEX   0    1     2     3    4     5     6    7    8    9
TABLE [   ][   ][ 42 ][   ][   ][ 25 ][   ][   ][   ][   ]
\`\`\`

---

# 3. DETERMINISTIC BEHAVIOR

The same key MUST always hash to the exact same index every time! Otherwise, searching for a previously saved key would fail.

---

# 4. LESSON SUMMARY

✓ Hashing maps keys to integer hash values.
✓ Modulo (\`key % table_size\`) keeps indices within table bounds.
✓ Hashing must be deterministic (same key ──► same index).`,
    codePreview: {
      code: `def simple_hash(key, table_size=10):\n    return key % table_size\n\nprint("Hash of 25:", simple_hash(25))\nprint("Hash of 42:", simple_hash(42))`,
      output: `Hash of 25: 5\nHash of 42: 2`,
      caption: 'Modulo hashing function computing bucket indices'
    },
    glossary: [
      { term: 'Hashing', definition: 'Converting data/keys into numeric hash values.' },
      { term: 'Deterministic', definition: 'Consistently producing the identical output for a given input.' }
    ],
    quizzes: [
      {
    question: '1. Given table size = 7 and key = 16, what index is produced using index = key % 7?',
    options: [
      'Index 16',
      'Index 7',
      'Index 2',
      'Index 0'
    ],
    correctAnswer: 2,
    explanation: '16 % 7 = 2 (remainder is 2).'
  }
    
    ],
    summaryPoints: [
      'Key ──► Hash ──► Index.',
      'Modulo fits indices into table bounds.',
      'Deterministic output required.'
    ],
    previousLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'what-is-a-hash-table',
      title: 'What is a Hash Table?'
    },
    nextLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'hash-functions',
      title: 'Hash Functions'
    }
  },

  // =========================================================================
  // SECTION 7 — HASH TABLES (LESSON 3: Hash Functions)
  // =========================================================================
  'ds-hash-tables/hash-functions': {
    id: 'ds-hash-tables/hash-functions',
    topicId: 'ds-hash-tables',
    subtopicId: 'hash-functions',
    title: 'Hash Functions',
    subtitle: 'Characteristics of good hash functions, Python hash(), and hashable keys',
    categoryTitle: 'HASH TABLES',
    contentMarkdown: `# 1. CHARACTERISTICS OF A GOOD HASH FUNCTION

A good hash function should:
1. **Be Fast:** Compute indices in $O(1)$ time.
2. **Uniform Distribution:** Spread keys evenly across all buckets to minimize collisions.
3. **Deterministic:** Always return the same hash for the same key.

---

# 2. PYTHON hash() & HASHABLE KEYS

Python provides the built-in \`hash()\` function for hashable objects:

\`\`\`python
print(hash("apple"))  # Returns integer hash code
print(hash(100))      # Returns 100
\`\`\`

### Hashable vs Unhashable Types:
- **HASHABLE (Immutable):** \`int\`, \`str\`, \`float\`, \`tuple\`.
- **UNHASHABLE (Mutable):** \`list\`, \`dict\`, \`set\`.

Attempting to use a mutable list as a dictionary key raises a **TypeError**:
\`\`\`python
d = {}
d[[1, 2]] = "value"  # ❌ TypeError: unhashable type: 'list'
\`\`\`

---

# 3. LESSON SUMMARY

✓ Good hash functions distribute keys evenly to prevent clustering.
✓ Python \`hash()\` requires immutable (hashable) keys.
✓ Mutable lists cannot be dictionary keys.`,
    codePreview: {
      code: `# Valid immutable hashable tuple key\nd = {}\ntup_key = (1, 2)\nd[tup_key] = "Valid Tuple Key"\nprint("Lookup:", d[tup_key])`,
      output: `Lookup: Valid Tuple Key`,
      caption: 'Using immutable tuples as valid hashable dictionary keys'
    },
    glossary: [
      { term: 'Hashable', definition: 'An object with an unchanging hash value during its lifetime (immutable).' }
    ],
    quizzes: [
      {
    question: '1. Which Python data structure CANNOT be used as a dictionary key?',
    options: [
      'str',
      'int',
      'tuple',
      'list (mutable)'
    ],
    correctAnswer: 3,
    explanation: 'Lists are mutable and unhashable, raising a TypeError if used as dictionary keys.'
  }
    
    ],
    summaryPoints: [
      'Uniform distribution reduces collisions.',
      'Immutable types are hashable.',
      'Lists raise TypeError as dict keys.'
    ],
    previousLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'hashing-concept',
      title: 'Hashing Concept'
    },
    nextLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'hash-table-representation',
      title: 'Hash Table Representation'
    }
  },

  // =========================================================================
  // SECTION 7 — HASH TABLES (LESSON 4: Hash Table Representation)
  // =========================================================================
  'ds-hash-tables/hash-table-representation': {
    id: 'ds-hash-tables/hash-table-representation',
    topicId: 'ds-hash-tables',
    subtopicId: 'hash-table-representation',
    title: 'Hash Table Representation',
    subtitle: 'Buckets, key-value entries, and load factor fundamentals',
    categoryTitle: 'HASH TABLES',
    contentMarkdown: `# 1. BUCKET ARRAY REPRESENTATION

A Hash Table is internally represented as an array of **Buckets**:

\`\`\`text
INDEX      CONTENT (Key ──► Value)
  0        EMPTY
  1        EMPTY
  2        16 ──► "Bob"
  3        10 ──► "Alice"
  4        EMPTY
  5        EMPTY
  6        20 ──► "Charlie"
\`\`\`

Each bucket slot can store an entry containing BOTH the **Key** and the **Value**.

---

# 2. WHAT IS LOAD FACTOR?

> 📌 **DEFINITION**
> **Load Factor ($\lambda$) measures how full the hash table is:**

$$\\text{Load Factor } (\\lambda) = \\frac{\\text{Number of Stored Entries}}{\\text{Total Number of Buckets}}$$

Example: 3 entries stored in 7 buckets ──► Load Factor = $3 / 7 \\approx 0.43$.

As load factor increases (table becomes crowded), the probability of collisions increases!

---

# 3. LESSON SUMMARY

✓ Hash Tables consist of indexed buckets.
✓ Buckets store Key-Value entry pairs.
✓ Load Factor = Entries / Buckets.`,
    codePreview: {
      code: `table_size = 7\nentries = 3\nload_factor = entries / table_size\nprint(f"Load Factor: {load_factor:.2f}")`,
      output: `Load Factor: 0.43`,
      caption: 'Calculating Hash Table Load Factor'
    },
    glossary: [
      { term: 'Bucket', definition: 'A slot in a hash table array holding stored key-value entries.' },
      { term: 'Load Factor', definition: 'The ratio of stored entries to total table capacity.' }
    ],
    quizzes: [
      {
    question: '1. How is the Load Factor of a Hash Table calculated?',
    options: [
      'Hash % Index',
      'Total Buckets / Number of Entries',
      'Key * Value',
      'Number of Stored Entries / Total Number of Buckets'
    ],
    correctAnswer: 3,
    explanation: 'Load Factor = Total Entries divided by Total Capacity (Buckets).'
  }
    
    ],
    summaryPoints: [
      'Array of Buckets.',
      'Stores Key-Value entry pairs.',
      'Load Factor = Entries / Buckets.'
    ],
    previousLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'hash-functions',
      title: 'Hash Functions'
    },
    nextLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'hash-insert-operation',
      title: 'Insert Operation'
    }
  },

  // =========================================================================
  // SECTION 7 — HASH TABLES (LESSON 5: Insert Operation)
  // =========================================================================
  'ds-hash-tables/hash-insert-operation': {
    id: 'ds-hash-tables/hash-insert-operation',
    topicId: 'ds-hash-tables',
    subtopicId: 'hash-insert-operation',
    title: 'Insert Operation',
    subtitle: 'Storing key-value pairs and updating existing keys in O(1) average time',
    categoryTitle: 'HASH TABLES',
    contentMarkdown: `# 1. INSERTION STEP-BY-STEP

To insert Key-Value pair \`(10, "Alice")\` into a table of size 7:

1. Calculate index: $10 \\pmod 7 = 3$.
2. Inspect Bucket 3.
3. If bucket is empty, store \`(10 ──► "Alice")\`.
4. Increment entry size count.

\`\`\`text
INSERT (10 ──► "Alice"):  Hash(10) % 7 = 3  ──►  Bucket 3: [10: "Alice"]
INSERT (16 ──► "Bob"):    Hash(16) % 7 = 2  ──►  Bucket 2: [16: "Bob"]
\`\`\`

---

# 2. UPDATING EXISTING KEYS

If an inserted key already exists in the table, **update its value** rather than adding a duplicate key entry:

\`\`\`text
INSERT (10 ──► "Updated Alice"): Existing Key 10 found at Bucket 3 ──► Update Value!
\`\`\`

---

# 3. LESSON SUMMARY

✓ Insert hashes the key to find the target bucket.
✓ Existing keys update their associated value in place.
✓ Runs in $O(1)$ average time.`,
    codePreview: {
      code: `table = [None] * 7\nkey, val = 10, "Alice"\nidx = key % 7\ntable[idx] = (key, val)\nprint(f"Bucket {idx}:", table[idx])`,
      output: `Bucket 3: (10, 'Alice')`,
      caption: 'Basic hash table insertion step'
    },
    glossary: [
      { term: 'Insert', definition: 'The operation of placing or updating a key-value pair in a hash table.' }
    ],
    quizzes: [
      {
    question: '1. What should happen when inserting a key that already exists in a Hash Table?',
    options: [
      'The existing value is updated with the new value',
      'An error is raised',
      'The table is cleared',
      'A duplicate key is created'
    ],
    correctAnswer: 0,
    explanation: 'Hash tables update the existing key with the new value to preserve key uniqueness.'
  }
    
    ],
    summaryPoints: [
      'Hashes key to locate target bucket.',
      'Updates existing keys in place.',
      'Runs in O(1) average time.'
    ],
    previousLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'hash-table-representation',
      title: 'Hash Table Representation'
    },
    nextLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'hash-search-operation',
      title: 'Search Operation'
    }
  },

  // =========================================================================
  // SECTION 7 — HASH TABLES (LESSON 6: Search Operation)
  // =========================================================================
  'ds-hash-tables/hash-search-operation': {
    id: 'ds-hash-tables/hash-search-operation',
    topicId: 'ds-hash-tables',
    subtopicId: 'hash-search-operation',
    title: 'Search Operation',
    subtitle: 'Direct targeted bucket search vs linear array scans',
    categoryTitle: 'HASH TABLES',
    contentMarkdown: `# 1. HOW HASH SEARCH WORKS

To search for Key \`10\` in a table of size 7:

\`\`\`text
SEARCH KEY (10)  ──►  Hash(10) % 7  ──►  TARGET BUCKET 3  ──►  Compare Key 10  ──►  RETURN "Alice"
\`\`\`

Notice: The search algorithm does **NOT** check Buckets 0, 1, or 2! It jumps directly to Bucket 3 in **$O(1)$ average time**.

---

# 2. KEY NOT FOUND

If Bucket 4 is inspected for Key \`25\` ($25 \\pmod 7 = 4$) and Bucket 4 is empty:
- Return **Not Found / None**.

---

# 3. LESSON SUMMARY

✓ Search hashes the key to locate the target bucket directly.
✓ Bypasses scanning unrelated buckets.
✓ Runs in $O(1)$ average time.`,
    codePreview: {
      code: `table = {10: "Alice", 16: "Bob"}\nsearch_key = 10\nprint("Result:", table.get(search_key, "Not Found"))`,
      output: `Result: Alice`,
      caption: 'Searching key in O(1) average time'
    },
    glossary: [
      { term: 'Direct Access', definition: 'Reaching a specific memory slot via index calculation without linear scanning.' }
    ],
    quizzes: [
      {
    question: '1. Does a Hash Table search scan elements sequentially from index 0?',
    options: [
      'No, it computes the target bucket index directly via hash function',
      'Yes, in reverse order',
      'Randomly',
      'Yes, always from index 0'
    ],
    correctAnswer: 0,
    explanation: 'Hash search hashes the key to jump directly to the target bucket index.'
  }
    
    ],
    summaryPoints: [
      'Jumps directly to target bucket.',
      'No linear scan required.',
      'O(1) average search.'
    ],
    previousLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'hash-insert-operation',
      title: 'Insert Operation'
    },
    nextLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'hash-delete-operation',
      title: 'Delete Operation'
    }
  },

  // =========================================================================
  // SECTION 7 — HASH TABLES (LESSON 7: Delete Operation)
  // =========================================================================
  'ds-hash-tables/hash-delete-operation': {
    id: 'ds-hash-tables/hash-delete-operation',
    topicId: 'ds-hash-tables',
    subtopicId: 'hash-delete-operation',
    title: 'Delete Operation',
    subtitle: 'Removing key-value entries safely without corrupting collision chains',
    categoryTitle: 'HASH TABLES',
    contentMarkdown: `# 1. DELETION STEP-BY-STEP

To delete Key \`10\` from a Hash Table:

1. Compute target index: $10 \\pmod 7 = 3$.
2. Go to Bucket 3.
3. Locate entry with matching key \`10\`.
4. Remove the entry and decrement size count.

\`\`\`text
BEFORE DELETE:  Bucket 3: [10: "Alice"]
DELETE (10):    Remove entry from Bucket 3
AFTER DELETE:   Bucket 3: [ EMPTY ]
\`\`\`

---

# 2. SAFE DELETION IN CHAINS

If Bucket 3 contains multiple chained entries \`[10: "Alice"] ──► [17: "Bob"]\`:
- Deleting Key \`10\` removes ONLY \`10: "Alice"\`.
- Key \`17: "Bob"\` remains intact in Bucket 3!

---

# 3. LESSON SUMMARY

✓ Delete hashes the key to locate the entry.
✓ Removes only the specific target key.
✓ Runs in $O(1)$ average time.`,
    codePreview: {
      code: `table = {10: "Alice", 16: "Bob"}\ndel table[10]  # Delete operation\nprint("Table after delete:", table)`,
      output: `Table after delete: {16: 'Bob'}`,
      caption: 'Deleting key-value pair from dictionary'
    },
    glossary: [
      { term: 'Delete', definition: 'Removing a specific key-value pair from a hash table.' }
    ],
    quizzes: [
      {
    question: '1. What happens if you attempt to delete a key that does not exist in a Python dictionary using del?',
    options: [
      'Clears the dictionary',
      'Raises a KeyError',
      'Does nothing',
      'Returns 0'
    ],
    correctAnswer: 1,
    explanation: 'Attempting to delete a missing key using del d[key] raises a KeyError.'
  }
    
    ],
    summaryPoints: [
      'Hashes key to locate bucket.',
      'Removes target entry safely.',
      'Decrements size count.'
    ],
    previousLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'hash-search-operation',
      title: 'Search Operation'
    },
    nextLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'hash-collisions',
      title: 'Hash Collisions'
    }
  },

  // =========================================================================
  // SECTION 7 — HASH TABLES (LESSON 8: Hash Collisions)
  // =========================================================================
  'ds-hash-tables/hash-collisions': {
    id: 'ds-hash-tables/hash-collisions',
    topicId: 'ds-hash-tables',
    subtopicId: 'hash-collisions',
    title: 'Hash Collisions',
    subtitle: 'Understanding why different keys map to identical bucket indices',
    categoryTitle: 'HASH TABLES',
    contentMarkdown: `# 1. WHAT IS A HASH COLLISION?

> 📌 **DEFINITION**
> **A Hash Collision occurs when two different keys produce the exact same bucket index.**

Let table size = 7:
- **Key = 10:** $10 \\pmod 7 = 3$.
- **Key = 17:** $17 \\pmod 7 = 3$.

\`\`\`text
Key 10  ──►  Hash % 7 = 3  ──┐
                             ├──►  BUCKET 3 (COLLISION!)
Key 17  ──►  Hash % 7 = 3  ──┘
\`\`\`

---

# 2. WHY COLLISIONS ARE NORMAL & EXPECTED

Because the universe of possible keys is infinitely larger than a fixed array size (e.g. 7 buckets), collisions are mathematically inevitable (Pigeonhole Principle).

Collisions are **NOT bugs**—a well-designed Hash Table expects collisions and uses a resolution strategy to handle them!

---

# 3. LESSON SUMMARY

✓ Collisions occur when distinct keys produce identical hash indices.
✓ Inevitable due to fixed table capacity.
✓ Must be handled gracefully by resolution strategies.`,
    codePreview: {
      code: `k1, k2 = 10, 17\nsize = 7\nprint(f"k1 index: {k1 % size}")\nprint(f"k2 index: {k2 % size}")\nprint("Collision?", (k1 % size) == (k2 % size))`,
      output: `k1 index: 3\nk2 index: 3\nCollision? True`,
      caption: 'Detecting hash collision for keys 10 and 17'
    },
    glossary: [
      { term: 'Hash Collision', definition: 'An event where two distinct keys evaluate to the identical bucket index.' }
    ],
    quizzes: [
      {
    question: '1. Is a Hash Collision considered a program bug?',
    options: [
      'Only in Python',
      'Yes, collisions crash the computer',
      'No, collisions are expected events that hash tables resolve via strategies',
      'Yes, keys must be deleted'
    ],
    correctAnswer: 2,
    explanation: 'Collisions are normal occurrences resolved using strategies like Separate Chaining or Open Addressing.'
  }
    
    ],
    summaryPoints: [
      'Different keys ──► same index.',
      'Inevitable due to finite table size.',
      'Resolved using handling strategies.'
    ],
    previousLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'hash-delete-operation',
      title: 'Delete Operation'
    },
    nextLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'collision-handling',
      title: 'Collision Handling'
    }
  },

  // =========================================================================
  // SECTION 7 — HASH TABLES (LESSON 9: Collision Handling)
  // =========================================================================
  'ds-hash-tables/collision-handling': {
    id: 'ds-hash-tables/collision-handling',
    topicId: 'ds-hash-tables',
    subtopicId: 'collision-handling',
    title: 'Collision Handling',
    subtitle: 'Separate Chaining vs Open Addressing (Linear Probing)',
    categoryTitle: 'HASH TABLES',
    contentMarkdown: `# 1. METHOD 1: SEPARATE CHAINING

Each bucket holds a linked list / dynamic array of key-value pairs:

\`\`\`text
BUCKET 3: [10: "Alice"] ──► [17: "Bob"] ──► [24: "Charlie"]
\`\`\`

- **Insert:** Append colliding entry to the bucket list in $O(1)$.
- **Search:** Hash to Bucket 3, then traverse chain comparing keys.

---

# 2. METHOD 2: OPEN ADDRESSING (LINEAR PROBING)

If target bucket is occupied, search sequentially for the **next available empty slot**:

$$\\text{next\_index} = (\\text{original\_index} + 1) \\pmod{\\text{table\_size}}$$

\`\`\`text
INSERT 10 (index 3):  Store at Bucket 3.
INSERT 17 (index 3):  Bucket 3 occupied! Probe 4 ──► Store at Bucket 4.
\`\`\`

---

# 3. PYTHON SEPARATE CHAINING CLASS

\`\`\`python
class HashTable:
    def __init__(self, size=7):
        self.size = size
        self.table = [[] for _ in range(size)]

    def _hash(self, key):
        return key % self.size

    def insert(self, key, val):
        idx = self._hash(key)
        for pair in self.table[idx]:
            if pair[0] == key:
                pair[1] = val
                return
        self.table[idx].append([key, val])
\`\`\`

---

# 4. LESSON SUMMARY

✓ **Separate Chaining:** Buckets store lists of colliding entries.
✓ **Open Addressing:** Probes nearby open slots in the main array.
✓ Both preserve key-value accuracy during collisions.`,
    codePreview: {
      code: `table = [[] for _ in range(7)]\nfor k, v in [(10, "Alice"), (17, "Bob")]:\n    table[k % 7].append((k, v))\nprint("Bucket 3 Chain:", table[3])`,
      output: `Bucket 3 Chain: [(10, 'Alice'), (17, 'Bob')]`,
      caption: 'Separate chaining storing multiple colliding entries in Bucket 3'
    },
    glossary: [
      { term: 'Separate Chaining', definition: 'Collision handling technique where buckets store chains/lists of entries.' },
      { term: 'Linear Probing', definition: 'Open addressing strategy checking index + 1 for an empty slot.' }
    ],
    quizzes: [
      {
    question: '1. In Separate Chaining, what data structure does each bucket hold?',
    options: [
      'A single integer',
      'A stack top pointer',
      'A list or chain of entries',
      'An empty float'
    ],
    correctAnswer: 2,
    explanation: 'Each bucket contains a chain (list or linked list) of key-value pairs.'
  }
    
    ],
    summaryPoints: [
      'Separate Chaining uses linked lists per bucket.',
      'Open Addressing probes next open slots.',
      'Preserves fast access.'
    ],
    previousLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'hash-collisions',
      title: 'Hash Collisions'
    },
    nextLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'hash-table-complexity',
      title: 'Hash Table Complexity'
    }
  },

  // =========================================================================
  // SECTION 7 — HASH TABLES (LESSON 10: Hash Table Complexity)
  // =========================================================================
  'ds-hash-tables/hash-table-complexity': {
    id: 'ds-hash-tables/hash-table-complexity',
    topicId: 'ds-hash-tables',
    subtopicId: 'hash-table-complexity',
    title: 'Hash Table Complexity',
    subtitle: 'Analyzing average case O(1) vs worst case O(n) performance and space complexity',
    categoryTitle: 'HASH TABLES',
    contentMarkdown: `# 1. OPERATIONAL COMPLEXITY MASTER TABLE

| Operation | Average Case | Worst Case (Severe Clustering) |
| :--- | :--- | :--- |
| **Insert** | **O(1)** | **O(n)** |
| **Search** | **O(1)** | **O(n)** |
| **Delete** | **O(1)** | **O(n)** |
| **Space Complexity** | **O(n)** | **O(n)** |

---

# 2. WHY AVERAGE CASE IS O(1)

When the hash function distributes keys evenly and Load Factor $\\lambda < 0.7$, each bucket chain has an average length of 1 or 2 entries. Finding a key takes **$O(1)$ Constant Time**.

---

# 3. WHY WORST CASE CAN BE O(n)

If a bad hash function maps **ALL $n$ keys into the exact same bucket** (Extreme Clustering), the table degrades into a single linked list of length $n$, requiring **$O(n)$ Linear Time** to search!

\`\`\`text
BAD HASH (All map to Bucket 0):  Bucket 0: [K1] ──► [K2] ──► [K3] ──► ... ──► [Kn] (O(n) search!)
\`\`\`

---

# 4. LESSON SUMMARY

✓ Hash Tables provide **$O(1)$ average time** for Insert, Search, and Delete.
✓ Worst-case performance is **$O(n)$** if all keys collide into one bucket.
✓ Space complexity is **$O(n)$**.`,
    codePreview: {
      code: `# Complexity Summary:\nprint("Average Search: O(1)")\nprint("Worst Search:   O(n)")\nprint("Space:          O(n)")`,
      output: `Average Search: O(1)\nWorst Search:   O(n)\nSpace:          O(n)`,
      caption: 'Hash table performance summary'
    },
    glossary: [
      { term: 'Clustering', definition: 'The phenomenon where many keys collide into identical or nearby buckets.' }
    ],
    quizzes: [
      {
    question: '1. What is the AVERAGE time complexity of searching a key in a well-distributed Hash Table?',
    options: [
      'O(1)',
      'O(n)',
      'O(log n)',
      'O(n²)'
    ],
    correctAnswer: 0,
    explanation: 'Hash table search runs in O(1) Constant Time on average.'
  }
    
    ],
    summaryPoints: [
      'Insert/Search/Delete average O(1).',
      'Worst case degrades to O(n).',
      'Space complexity is O(n).'
    ],
    previousLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'collision-handling',
      title: 'Collision Handling'
    },
    nextLesson: {
      topicId: 'ds-searching',
      subtopicId: 'linear-search',
      title: 'Linear Search'
    }
  },
// =========================================================================
  // SECTION 8 — SEARCHING ALGORITHMS (LESSON 1: Introduction to Searching)
  // =========================================================================
  'ds-searching/introduction-to-searching': {
    id: 'ds-searching/introduction-to-searching',
    topicId: 'ds-searching',
    subtopicId: 'introduction-to-searching',
    title: 'Introduction to Searching',
    subtitle: 'Understanding collections, target values, and search result conventions',
    categoryTitle: 'SEARCHING ALGORITHMS',
    contentMarkdown: `# 1. WHAT IS SEARCHING?

Given an array of numbers:
\`\`\`python
numbers = [12, 7, 25, 18, 30]
\`\`\`

If we ask:
- **"Is 18 present?"** ──► **YES!**
- **"At which index is 18?"** ──► **Index 3!**

> 📌 **DEFINITION**
> **A Searching Algorithm is a step-by-step method used to locate a specific target value within a collection of data, returning its position or index.**

---

# 2. CORE TERMINOLOGY

- **COLLECTION:** The dataset or list being searched.
- **TARGET:** The target value we are looking for.
- **INDEX:** The numerical position of the element.
- **FOUND:** Target exists; algorithm returns its index (e.g. \`3\`).
- **NOT FOUND:** Target is absent; standard convention returns \`-1\`.

---

# 3. LESSON SUMMARY

✓ Searching locates target values in data collections.
✓ Found returns the element's index; Not Found returns -1.
✓ Unsorted data uses Linear Search; Sorted data allows Binary Search.`,
    codePreview: {
      code: `numbers = [12, 7, 25, 18, 30]\ntarget = 18\nif target in numbers:\n    print(f"Target {target} found at index:", numbers.index(target))\nelse:\n    print("Target not found (-1)")`,
      output: `Target 18 found at index: 3`,
      caption: 'Finding target index in Python list'
    },
    glossary: [
      { term: 'Searching Algorithm', definition: 'An algorithm that checks a collection for a target value and returns its position.' },
      { term: 'Target', definition: 'The specific value being searched for.' }
    ],
    quizzes: [
      {
    question: '1. What value is conventionally returned when a target is not found in an array?',
    options: [
      'Infinity',
      '0',
      '-1',
      'None only'
    ],
    correctAnswer: 2,
    explanation: 'Standard search function implementations return -1 to signal a missing target.'
  }
    
    ],
    summaryPoints: [
      'Locates target values in arrays.',
      'Returns matching index or -1.',
      'Strategy depends on data sorting.'
    ],
    previousLesson: {
      topicId: 'ds-hash-tables',
      subtopicId: 'hash-table-complexity',
      title: 'Hash Table Complexity'
    },
    nextLesson: {
      topicId: 'ds-searching',
      subtopicId: 'linear-search',
      title: 'Linear Search'
    }
  },

  // =========================================================================
  // SECTION 8 — SEARCHING ALGORITHMS (LESSON 2: Linear Search)
  // =========================================================================
  'ds-searching/linear-search': {
    id: 'ds-searching/linear-search',
    topicId: 'ds-searching',
    subtopicId: 'linear-search',
    title: 'Linear Search',
    subtitle: 'Checking elements sequentially one by one from start to finish',
    categoryTitle: 'SEARCHING ALGORITHMS',
    contentMarkdown: `# 1. HOW LINEAR SEARCH WORKS

> 📌 **DEFINITION**
> **Linear Search checks elements sequentially one by one from left to right until the target is found or the end of the array is reached.**

\`\`\`text
ARRAY: [12] ──► [7] ──► [25] ──► [18] ──► [30]
TARGET: 18

Step 1: Check Index 0 (12 == 18?)  ──► NO
Step 2: Check Index 1 (7 == 18?)   ──► NO
Step 3: Check Index 2 (25 == 18?)  ──► NO
Step 4: Check Index 3 (18 == 18?)  ──► MATCH! Return Index 3.
\`\`\`

---

# 2. WORKS ON UNSORTED DATA

Unlike Binary Search, **Linear Search does NOT require sorted data!**

\`\`\`python
# Unsorted array - Linear Search works perfectly:
unsorted_data = [40, 5, 90, 2, 17]
\`\`\`

- **Early Match:** Target at index 0 (1 comparison).
- **Late Match / Absent:** Target at end or missing ($n$ comparisons).

---

# 3. LESSON SUMMARY

✓ Linear Search checks elements sequentially one by one.
✓ Works on both unsorted and sorted arrays.
✓ Stops immediately upon finding the target.`,
    codePreview: {
      code: `data = [40, 5, 90, 2, 17]\ntarget = 90\nprint("Target 90 found via Linear Search!")`,
      output: `Target 90 found via Linear Search!`,
      caption: 'Sequential comparison in unsorted array'
    },
    glossary: [
      { term: 'Linear Search', definition: 'Sequential search checking elements one by one from start to finish.' }
    ],
    quizzes: [
      {
    question: '1. Does Linear Search require the input array to be sorted?',
    options: [
      'No, Linear Search works on unsorted data',
      'Yes, array must be sorted in descending order',
      'Yes, array must be sorted in ascending order',
      'Only for string arrays'
    ],
    correctAnswer: 0,
    explanation: 'Linear Search checks elements sequentially one by one, requiring no sorting.'
  }
    
    ],
    summaryPoints: [
      'Checks elements one by one.',
      'Works on unsorted data.',
      'Stops immediately when matched.'
    ],
    previousLesson: {
      topicId: 'ds-searching',
      subtopicId: 'introduction-to-searching',
      title: 'Introduction to Searching'
    },
    nextLesson: {
      topicId: 'ds-searching',
      subtopicId: 'linear-search-implementation',
      title: 'Linear Search Implementation'
    }
  },

  // =========================================================================
  // SECTION 8 — SEARCHING ALGORITHMS (LESSON 3: Linear Search Implementation)
  // =========================================================================
  'ds-searching/linear-search-implementation': {
    id: 'ds-searching/linear-search-implementation',
    topicId: 'ds-searching',
    subtopicId: 'linear-search-implementation',
    title: 'Linear Search Implementation',
    subtitle: 'Python implementation, early return bug prevention, and complexity',
    categoryTitle: 'SEARCHING ALGORITHMS',
    contentMarkdown: `# 1. PYTHON LINEAR SEARCH CODE

\`\`\`python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Return index immediately on match!

    return -1  # Return -1 only after checking ALL elements
\`\`\`

---

# 2. COMMON BEGINNER BUG: EARLY RETURN INSIDE LOOP

A common mistake is placing \`return -1\` inside the \`else\` block inside the loop:

\`\`\`python
# ❌ INCORRECT BUGGY CODE:
def linear_search_buggy(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
        else:
            return -1  # ❌ ERROR! Exits immediately after index 0 fails!
\`\`\`

---

# 3. COMPLEXITY ANALYSIS

- **Best Case:** $O(1)$ (Target is first element \`arr[0]\`).
- **Worst Case:** $O(n)$ (Target is last element or missing).
- **Space Complexity:** $O(1)$ auxiliary space.

---

# 4. LESSON SUMMARY

✓ Iterate index \`i\` from \`0\` to \`len(arr)-1\`.
✓ Return \`i\` on match; return \`-1\` outside the loop.
✓ Best case $O(1)$; Worst case $O(n)$.`,
    codePreview: {
      code: `def linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target: return i\n    return -1\n\nnumbers = [12, 7, 25, 18, 30]\nprint("Search 18:", linear_search(numbers, 18))\nprint("Search 99:", linear_search(numbers, 99))`,
      output: `Search 18: 3\nSearch 99: -1`,
      caption: 'Python linear search returning index or -1'
    },
    glossary: [
      { term: 'Early Return', definition: 'Returning a value from a function before completing necessary loop iterations.' }
    ],
    quizzes: [
      {
    question: '1. What happens if return -1 is placed inside an else block inside the for loop of Linear Search?',
    options: [
      'It returns -1 immediately after index 0 fails to match, missing remaining items',
      'It causes an infinite loop',
      'It runs correctly',
      'It sorts the list'
    ],
    correctAnswer: 0,
    explanation: 'Placing return -1 in else terminates the function on the very first mismatch.'
  }
    
    ],
    summaryPoints: [
      'Loop over indices 0 to len-1.',
      'Return -1 outside loop.',
      'Best O(1), Worst O(n).'
    ],
    previousLesson: {
      topicId: 'ds-searching',
      subtopicId: 'linear-search',
      title: 'Linear Search'
    },
    nextLesson: {
      topicId: 'ds-searching',
      subtopicId: 'binary-search',
      title: 'Binary Search'
    }
  },

  // =========================================================================
  // SECTION 8 — SEARCHING ALGORITHMS (LESSON 4: Binary Search)
  // =========================================================================
  'ds-searching/binary-search': {
    id: 'ds-searching/binary-search',
    topicId: 'ds-searching',
    subtopicId: 'binary-search',
    title: 'Binary Search',
    subtitle: 'Halving search space on sorted data in O(log n) time',
    categoryTitle: 'SEARCHING ALGORITHMS',
    contentMarkdown: `# 1. CRITICAL RULE: SORTED DATA REQUIRED!

> ⚠️ **CRITICAL RULE**
> **Binary Search REQUIRES the input array to be SORTED. Standard Binary Search cannot operate safely on unsorted data.**

---

# 2. THE THREE POINTERS: LEFT, RIGHT, MID

\`\`\`text
SORTED ARRAY: [10, 20, 30, 40, 50, 60, 70]   TARGET: 60
               ↑              ↑              ↑
             LEFT            MID           RIGHT
            Index 0        Index 3        Index 6
\`\`\`

1. Calculate \`mid = (left + right) // 2\` ──► \`mid = 3\` (\`arr[3] = 40\`).
2. Compare: \`40 < 60\` (Target is larger!).
3. Eliminate entire left half (indices 0..3)!
4. Update \`left = mid + 1\` ──► \`left = 4\`.
5. New \`mid = (4 + 6) // 2 = 5\` (\`arr[5] = 60\`) ──► **MATCH FOUND at Index 5!**

---

# 3. WHY BINARY SEARCH IS O(log n)

Each comparison halves the remaining search space: $1024 \\to 512 \\to 256 \\to 128 \\to 64 \\to 32 \\to 16 \\to 8 \\to 4 \\to 2 \\to 1$ (Only 10 steps for 1,024 elements!).

---

# 4. LESSON SUMMARY

✓ Requires SORTED data.
✓ Uses \`left\`, \`right\`, and \`mid\` pointers.
✓ Eliminates half of the search space at each step.`,
    codePreview: {
      code: `sorted_nums = [10, 20, 30, 40, 50, 60, 70]\n# Mid calculation: (0 + 6) // 2 = 3 (val: 40)\nprint("Middle value:", sorted_nums[3])`,
      output: `Middle value: 40`,
      caption: 'Binary Search checking middle element'
    },
    glossary: [
      { term: 'Binary Search', definition: 'Divide-and-conquer search on sorted data eliminating half the elements each step.' },
      { term: 'Search Space', definition: 'The range of indices [left..right] currently being considered for a match.' }
    ],
    quizzes: [
      {
    question: '1. What is the fundamental requirement for applying Binary Search to an array?',
    options: [
      'The array size must be even',
      'The array must be sorted',
      'The array must be empty',
      'The array must contain only integers'
    ],
    correctAnswer: 1,
    explanation: 'Binary Search relies on sorted order to safely eliminate half the elements at each step.'
  }
    
    ],
    summaryPoints: [
      'Requires SORTED data.',
      'Three pointers: left, right, mid.',
      'Eliminates half search space each step.'
    ],
    previousLesson: {
      topicId: 'ds-searching',
      subtopicId: 'linear-search-implementation',
      title: 'Linear Search Implementation'
    },
    nextLesson: {
      topicId: 'ds-searching',
      subtopicId: 'binary-search-implementation',
      title: 'Binary Search Implementation'
    }
  },

  // =========================================================================
  // SECTION 8 — SEARCHING ALGORITHMS (LESSON 5: Binary Search Implementation)
  // =========================================================================
  'ds-searching/binary-search-implementation': {
    id: 'ds-searching/binary-search-implementation',
    topicId: 'ds-searching',
    subtopicId: 'binary-search-implementation',
    title: 'Binary Search Implementation',
    subtitle: 'Iterative Python loop, boundary pointer updates, and infinite loop traps',
    categoryTitle: 'SEARCHING ALGORITHMS',
    contentMarkdown: `# 1. PYTHON ITERATIVE BINARY SEARCH CODE

\`\`\`python
def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid  # Target Found!
        elif arr[mid] < target:
            left = mid + 1   # Target in right half
        else:
            right = mid - 1  # Target in left half

    return -1  # Target Not Found
\`\`\`

---

# 2. COMMON INFINITE LOOP BUGS

Using \`left = mid\` or \`right = mid\` without \`+ 1\` / \`- 1\` causes infinite loops!

\`\`\`python
# ❌ INFINITE LOOP TRAP:
left = mid  # ❌ If range is size 2, left never advances past mid!
# ✅ CORRECT:
left = mid + 1
right = mid - 1
\`\`\`

---

# 3. LESSON SUMMARY

✓ Loop while \`left <= right\`.
✓ Update \`left = mid + 1\` or \`right = mid - 1\`.
✓ Returns matching index or \`-1\`.`,
    codePreview: {
      code: `def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: left = mid + 1\n        else: right = mid - 1\n    return -1\n\nnums = [10, 20, 30, 40, 50, 60, 70]\nprint("Index of 60:", binary_search(nums, 60))`,
      output: `Index of 60: 5`,
      caption: 'Iterative Binary Search returning index 5'
    },
    glossary: [
      { term: 'mid = (left + right) // 2', definition: 'Formula for computing integer midpoint of current search bounds.' }
    ],
    quizzes: [
      {
    question: '1. Why must left be updated to mid + 1 instead of mid when target > arr[mid]?',
    options: [
      'To reset right to 0',
      'To decrease array size',
      'To sort the array',
      'To advance past the checked mid element and prevent infinite loops'
    ],
    correctAnswer: 3,
    explanation: 'mid has already been checked. Setting left = mid + 1 shrinks the search space and avoids infinite loops.'
  }
    
    ],
    summaryPoints: [
      'Loop while left <= right.',
      'mid = (left + right) // 2.',
      'Use mid + 1 and mid - 1.'
    ],
    previousLesson: {
      topicId: 'ds-searching',
      subtopicId: 'binary-search',
      title: 'Binary Search'
    },
    nextLesson: {
      topicId: 'ds-searching',
      subtopicId: 'iterative-vs-recursive-binary-search',
      title: 'Iterative vs Recursive Binary Search'
    }
  },

  // =========================================================================
  // SECTION 8 — SEARCHING ALGORITHMS (LESSON 6: Iterative vs Recursive Binary Search)
  // =========================================================================
  'ds-searching/iterative-vs-recursive-binary-search': {
    id: 'ds-searching/iterative-vs-recursive-binary-search',
    topicId: 'ds-searching',
    subtopicId: 'iterative-vs-recursive-binary-search',
    title: 'Iterative vs Recursive Binary Search',
    subtitle: 'Comparing while loops vs recursive call-stack execution',
    categoryTitle: 'SEARCHING ALGORITHMS',
    contentMarkdown: `# 1. RECURSIVE BINARY SEARCH CODE

\`\`\`python
def binary_search_recursive(arr, target, left, right):
    if left > right:
        return -1  # Base Case: Search space empty

    mid = (left + right) // 2

    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)
\`\`\`

---

# 2. COMPARISON TABLE

| Feature | Iterative Binary Search | Recursive Binary Search |
| :--- | :--- | :--- |
| **Control Mechanism** | \`while\` loop | Recursive function calls |
| **Time Complexity** | **O(log n)** | **O(log n)** |
| **Auxiliary Space** | **O(1)** (Constant space) | **O(log n)** (Call stack space) |

---

# 3. LESSON SUMMARY

✓ Iterative uses loops ($O(1)$ auxiliary space).
✓ Recursive uses function calls ($O(\log n)$ call stack space).
✓ Both take $O(\log n)$ time.`,
    codePreview: {
      code: `def bs_rec(arr, target, l, r):\n    if l > r: return -1\n    m = (l + r) // 2\n    if arr[m] == target: return m\n    return bs_rec(arr, target, m + 1, r) if arr[m] < target else bs_rec(arr, target, l, m - 1)\n\nnums = [10, 20, 30, 40, 50, 60, 70]\nprint("Recursive Result:", bs_rec(nums, 60, 0, len(nums)-1))`,
      output: `Recursive Result: 5`,
      caption: 'Recursive Binary Search call stack resolution'
    },
    glossary: [
      { term: 'Call Stack Space', definition: 'Memory used by function call frames in recursive implementations.' }
    ],
    quizzes: [
      {
    question: '1. What is the auxiliary space complexity of Iterative Binary Search vs Recursive Binary Search?',
    options: [
      'Both are O(n)',
      'Iterative is O(1); Recursive is O(log n)',
      'Iterative is O(n)',
      'Both are O(1)'
    ],
    correctAnswer: 1,
    explanation: 'Iterative uses O(1) constant auxiliary space, whereas Recursive uses O(log n) call stack space.'
  }
    
    ],
    summaryPoints: [
      'Iterative uses loops (O(1) space).',
      'Recursive uses call stack (O(log n) space).',
      'Both run in O(log n) time.'
    ],
    previousLesson: {
      topicId: 'ds-searching',
      subtopicId: 'binary-search-implementation',
      title: 'Binary Search Implementation'
    },
    nextLesson: {
      topicId: 'ds-searching',
      subtopicId: 'linear-search-vs-binary-search',
      title: 'Linear Search vs Binary Search'
    }
  },

  // =========================================================================
  // SECTION 8 — SEARCHING ALGORITHMS (LESSON 7: Linear Search vs Binary Search)
  // =========================================================================
  'ds-searching/linear-search-vs-binary-search': {
    id: 'ds-searching/linear-search-vs-binary-search',
    topicId: 'ds-searching',
    subtopicId: 'linear-search-vs-binary-search',
    title: 'Linear Search vs Binary Search',
    subtitle: 'Side-by-side comparison, sorting trade-offs, and scenario selection',
    categoryTitle: 'SEARCHING ALGORITHMS',
    contentMarkdown: `# 1. SIDE-BY-SIDE COMPARISON

| Property | Linear Search | Binary Search |
| :--- | :--- | :--- |
| **Data Sorting** | Unsorted or Sorted | **Must be SORTED** |
| **Strategy** | Check one by one | Check MID, eliminate half |
| **Worst-Case Time** | **O(n)** | **O(log n)** |
| **Best-Case Time** | **O(1)** | **O(1)** |
| **Implementation** | Very simple | Requires boundary pointers |

---

# 2. THE SORTING TRADE-OFF

Do **NOT** assume Binary Search is always better:
- If an array is **unsorted and searched only ONCE**, sorting it first takes $O(n \log n)$ time, which is slower than a simple $O(n)$ Linear Search!
- If an array is **already sorted** or searched **many times**, Binary Search is dramatically faster!

---

# 3. LESSON SUMMARY

✓ Linear Search: Unsorted data, simple, $O(n)$ time.
✓ Binary Search: Sorted data, fast halving, $O(\log n)$ time.`,
    codePreview: {
      code: `linear_comps = 6  # Searching 60 in [10..100]\nbinary_comps = 2  # Binary search takes 2 checks!\nprint(f"Linear: {linear_comps} checks | Binary: {binary_comps} checks")`,
      output: `Linear: 6 checks | Binary: 2 checks`,
      caption: 'Comparison count difference between Linear and Binary Search'
    },
    glossary: [
      { term: 'Search Strategy', definition: 'The rule set determining how an algorithm navigates a dataset to locate targets.' }
    ],
    quizzes: [
      {
    question: '1. When is Linear Search preferred over Binary Search?',
    options: [
      'When the dataset is small and unsorted',
      'When the dataset is sorted and huge',
      'Always',
      'Never'
    ],
    correctAnswer: 0,
    explanation: 'For small, unsorted datasets, Linear Search avoids the overhead of sorting the array.'
  }
    
    ],
    summaryPoints: [
      'Linear = Unsorted, O(n).',
      'Binary = Sorted, O(log n).',
      'Sorting trade-off matters.'
    ],
    previousLesson: {
      topicId: 'ds-searching',
      subtopicId: 'iterative-vs-recursive-binary-search',
      title: 'Iterative vs Recursive Binary Search'
    },
    nextLesson: {
      topicId: 'ds-searching',
      subtopicId: 'searching-algorithms-complexity',
      title: 'Searching Algorithms Complexity'
    }
  },

  // =========================================================================
  // SECTION 8 — SEARCHING ALGORITHMS (LESSON 8: Searching Algorithms Complexity)
  // =========================================================================
  'ds-searching/searching-algorithms-complexity': {
    id: 'ds-searching/searching-algorithms-complexity',
    topicId: 'ds-searching',
    subtopicId: 'searching-algorithms-complexity',
    title: 'Searching Algorithms Complexity',
    subtitle: 'Master operational complexity table, growth rates, and array access vs search',
    categoryTitle: 'SEARCHING ALGORITHMS',
    contentMarkdown: `# 1. SEARCHING ALGORITHMS COMPLEXITY MASTER TABLE

| Algorithm | Best Case | Average Case | Worst Case | Auxiliary Space |
| :--- | :--- | :--- | :--- | :--- |
| **Linear Search** | **O(1)** | **O(n)** | **O(n)** | **O(1)** |
| **Binary Search (Iterative)** | **O(1)** | **O(log n)** | **O(log n)** | **O(1)** |
| **Binary Search (Recursive)** | **O(1)** | **O(log n)** | **O(log n)** | **O(log n)** |

---

# 2. INDEX ACCESS VS SEARCHING

Do NOT confuse Array Index Access with Searching:
- **Array Index Access (\`arr[5]\`):** $O(1)$ Constant Time (Location is ALREADY KNOWN).
- **Searching Array ("Find 50"):** $O(n)$ Linear or $O(\log n)$ Binary (Location is UNKNOWN).

---

# 3. LESSON SUMMARY

✓ Linear Search is $O(n)$ average/worst case.
✓ Binary Search is $O(\log n)$ average/worst case.
✓ Index access is $O(1)$, searching is $O(n)$ or $O(\log n)$.`,
    codePreview: {
      code: `# Complexity Summary Print:\nprint("Linear Search: O(n)")\nprint("Binary Search: O(log n)")\nprint("Array Access:  O(1)")`,
      output: `Linear Search: O(n)\nBinary Search: O(log n)\nArray Access:  O(1)`,
      caption: 'Searching complexity master rules'
    },
    glossary: [
      { term: 'Searching Complexity', definition: 'Time and space complexity bounds governing search algorithms.' }
    ],
    quizzes: [
      {
    question: '1. What is the worst-case time complexity of Binary Search?',
    options: [
      'O(1)',
      'O(n²)',
      'O(log n)',
      'O(n)'
    ],
    correctAnswer: 2,
    explanation: 'Binary Search runs in O(log n) Logarithmic Time in the worst case.'
  }
    
    ],
    summaryPoints: [
      'Linear is O(n).',
      'Binary is O(log n).',
      'Index access O(1) vs Search O(log n)/O(n).'
    ],
    previousLesson: {
      topicId: 'ds-searching',
      subtopicId: 'linear-search-vs-binary-search',
      title: 'Linear Search vs Binary Search'
    },
    nextLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'what-is-sorting',
      title: 'What is Sorting?'
    }
  },
// =========================================================================
  // SECTION 9 — SORTING ALGORITHMS (LESSON 1: Introduction to Sorting)
  // =========================================================================
  'ds-sorting/introduction-to-sorting': {
    id: 'ds-sorting/introduction-to-sorting',
    topicId: 'ds-sorting',
    subtopicId: 'introduction-to-sorting',
    title: 'Introduction to Sorting',
    subtitle: 'Ascending vs Descending order, comparisons, swaps, and why sorting matters',
    categoryTitle: 'SORTING ALGORITHMS',
    contentMarkdown: `# 1. WHAT IS SORTING?

> 📌 **DEFINITION**
> **A Sorting Algorithm rearranges elements in a collection into a specific order (such as ascending or descending).**

\`\`\`text
UNSORTED:  [5, 2, 8, 1, 4]

ASCENDING:  [1, 2, 4, 5, 8]  (smallest ──► largest)
DESCENDING: [8, 5, 4, 2, 1]  (largest  ──► smallest)
\`\`\`

---

# 2. WHY SORTING MATTERS

- **Fast Searching:** Enables $O(\log n)$ Binary Search!
- **Data Display:** Leaderboards, e-commerce prices, names alphabetically.
- **Deduplication:** Makes finding adjacent duplicate items $O(n)$.

---

# 3. LESSON SUMMARY

✓ Sorting arranges data in ascending or descending order.
✓ Essential precondition for algorithms like Binary Search.
✓ Involves key operations: Comparisons, Swaps, Shifts, and Partitions.`,
    codePreview: {
      code: `numbers = [5, 2, 8, 1, 4]\nprint("Ascending:", sorted(numbers))\nprint("Descending:", sorted(numbers, reverse=True))`,
      output: `Ascending: [1, 2, 4, 5, 8]\nDescending: [8, 5, 4, 2, 1]`,
      caption: 'Ascending and descending sorting in Python'
    },
    glossary: [
      { term: 'Sorting Algorithm', definition: 'An algorithm that rearranges elements into a specific ordered sequence.' },
      { term: 'Ascending Order', definition: 'Arrangement from smallest value to largest value.' }
    ],
    quizzes: [
      {
    question: '1. What is the result of sorting [40, 10, 70, 20] in ascending order?',
    options: [
      '[70, 40, 20, 10]',
      '[10, 70, 20, 40]',
      '[10, 20, 40, 70]',
      '[40, 10, 70, 20]'
    ],
    correctAnswer: 2,
    explanation: 'Ascending order places elements from smallest (10) to largest (70).'
  }
    
    ],
    summaryPoints: [
      'Arranges data systematically.',
      'Ascending: small to large.',
      'Enables binary search.'
    ],
    previousLesson: {
      topicId: 'ds-searching',
      subtopicId: 'searching-algorithms-complexity',
      title: 'Searching Algorithms Complexity'
    },
    nextLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'bubble-sort',
      title: 'Bubble Sort'
    }
  },

  // =========================================================================
  // SECTION 9 — SORTING ALGORITHMS (LESSON 2: Bubble Sort)
  // =========================================================================
  'ds-sorting/bubble-sort': {
    id: 'ds-sorting/bubble-sort',
    topicId: 'ds-sorting',
    subtopicId: 'bubble-sort',
    title: 'Bubble Sort',
    subtitle: 'Comparing adjacent neighbors and bubbling large values to the end',
    categoryTitle: 'SORTING ALGORITHMS',
    contentMarkdown: `# 1. HOW BUBBLE SORT WORKS

> 📌 **DEFINITION**
> **Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order.**

\`\`\`text
ARRAY: [5, 3, 8, 2]

Step 1: Compare 5 and 3  ──► (5 > 3) ──► SWAP! ──► [3, 5, 8, 2]
Step 2: Compare 5 and 8  ──► (5 < 8) ──► Keep   ──► [3, 5, 8, 2]
Step 3: Compare 8 and 2  ──► (8 > 2) ──► SWAP! ──► [3, 5, 2, 8]
\`\`\`

At the end of Pass 1, **8 (the largest element) has bubbled to its final position!**

---

# 2. MULTIPLE PASSES & EARLY STOP

- **Pass 1:** Largest bubbles to index $n-1$.
- **Pass 2:** 2nd largest bubbles to index $n-2$.
- **Early Stop:** If an entire pass completes with **ZERO swaps**, the array is already sorted!

---

# 3. LESSON SUMMARY

✓ Compares adjacent neighbors \`arr[j]\` and \`arr[j+1]\`.
✓ Swaps neighbors if \`arr[j] > arr[j+1]\`.
✓ Largest remaining value bubbles to the end after each pass.`,
    codePreview: {
      code: `nums = [5, 3, 8, 2]\n# Pass 1 demo:\nif nums[0] > nums[1]: nums[0], nums[1] = nums[1], nums[0]\nprint("After 1st swap:", nums)`,
      output: `After 1st swap: [3, 5, 8, 2]`,
      caption: 'Neighbor comparison and swap'
    },
    glossary: [
      { term: 'Bubble Sort', definition: 'Sorting algorithm that repeatedly swaps out-of-order adjacent elements.' }
    ],
    quizzes: [
      {
    question: '1. What happens at the end of the first full pass of Bubble Sort on an unsorted array?',
    options: [
      'The smallest element reaches index 0',
      'The largest element reaches its correct final position at the end of the array',
      'The array is fully sorted',
      'No elements change position'
    ],
    correctAnswer: 1,
    explanation: 'Bubble Sort guarantees the largest remaining element bubbles up to the end after each pass.'
  }
    
    ],
    summaryPoints: [
      'Compares adjacent neighbors.',
      'Swaps out-of-order items.',
      'Largest bubbles to end each pass.'
    ],
    previousLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'introduction-to-sorting',
      title: 'Introduction to Sorting'
    },
    nextLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'bubble-sort-implementation',
      title: 'Bubble Sort Implementation'
    }
  },

  // =========================================================================
  // SECTION 9 — SORTING ALGORITHMS (LESSON 3: Bubble Sort Implementation)
  // =========================================================================
  'ds-sorting/bubble-sort-implementation': {
    id: 'ds-sorting/bubble-sort-implementation',
    topicId: 'ds-sorting',
    subtopicId: 'bubble-sort-implementation',
    title: 'Bubble Sort Implementation',
    subtitle: 'Python implementation, inner loop bounds (n - i - 1), and complexity',
    categoryTitle: 'SORTING ALGORITHMS',
    contentMarkdown: `# 1. PYTHON BUBBLE SORT CODE

\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        # Inner loop bounds: n - i - 1 (already sorted end items skipped!)
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        if not swapped:
            break  # Early termination optimization!
            
    return arr
\`\`\`

---

# 2. WHY \`n - i - 1\`?

After pass \`i\`, the last \`i\` elements are already in their final sorted positions, so we don't need to check them again!

---

# 3. COMPLEXITY ANALYSIS

- **Best Case:** $O(n)$ (Already sorted array with early stop).
- **Average & Worst Case:** $O(n^2)$ (Reversed array).
- **Auxiliary Space:** $O(1)$ constant space.

---

# 4. LESSON SUMMARY

✓ Outer loop \`i\` tracks passes; inner loop \`j\` compares neighbors.
✓ \`swapped\` flag enables $O(n)$ best-case early stopping.`,
    codePreview: {
      code: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        swapped = False\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swapped = True\n        if not swapped: break\n    return arr\n\nnumbers = [5, 3, 8, 2]\nprint("Sorted:", bubble_sort(numbers))`,
      output: `Sorted: [2, 3, 5, 8]`,
      caption: 'Optimized Python Bubble Sort'
    },
    glossary: [
      { term: 'swapped Flag', definition: 'A boolean variable tracking whether any swaps occurred in a pass.' }
    ],
    quizzes: [
      {
    question: '1. What is the worst-case time complexity of Bubble Sort?',
    options: [
      'O(1)',
      'O(n²)',
      'O(n log n)',
      'O(n)'
    ],
    correctAnswer: 1,
    explanation: 'In the worst case (reverse order), Bubble Sort performs O(n²) comparisons and swaps.'
  }
    
    ],
    summaryPoints: [
      'Inner bounds: n - i - 1.',
      'Early stop when swapped=False.',
      'Best O(n), Worst O(n²).'
    ],
    previousLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'bubble-sort',
      title: 'Bubble Sort'
    },
    nextLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'selection-sort',
      title: 'Selection Sort'
    }
  },

  // =========================================================================
  // SECTION 9 — SORTING ALGORITHMS (LESSON 4: Selection Sort)
  // =========================================================================
  'ds-sorting/selection-sort': {
    id: 'ds-sorting/selection-sort',
    topicId: 'ds-sorting',
    subtopicId: 'selection-sort',
    title: 'Selection Sort',
    subtitle: 'Scanning unsorted region to find minimum element and placing it',
    categoryTitle: 'SORTING ALGORITHMS',
    contentMarkdown: `# 1. HOW SELECTION SORT WORKS

> 📌 **DEFINITION**
> **Selection Sort repeatedly finds the smallest element in the unsorted region and swaps it into the beginning of that region.**

\`\`\`text
ARRAY: [64, 25, 12, 22, 11]

Pass 1: Unsorted [64, 25, 12, 22, 11] ──► Minimum is 11!
        Swap 64 ↔ 11 ──► Result: [11, 25, 12, 22, 64]
        (Sorted: [11] | Unsorted: [25, 12, 22, 64])

Pass 2: Unsorted [25, 12, 22, 64]     ──► Minimum is 12!
        Swap 25 ↔ 12 ──► Result: [11, 12, 25, 22, 64]
\`\`\`

---

# 2. CORE MENTAL MODEL

1. **Unsorted Region:** Scan all remaining unsorted elements.
2. **Find Minimum:** Track \`min_index\`.
3. **Single Swap:** Place minimum into its sorted spot.

---

# 3. LESSON SUMMARY

✓ Scans unsorted region to find minimum element.
✓ Performs exactly **1 swap per pass**.
✓ Sorted region grows from left to right.`,
    codePreview: {
      code: `arr = [64, 25, 12, 22, 11]\n# Pass 1 minimum is 11 (index 4)\narr[0], arr[4] = arr[4], arr[0]\nprint("After Pass 1:", arr)`,
      output: `After Pass 1: [11, 25, 12, 22, 64]`,
      caption: 'Selection Sort single placement swap'
    },
    glossary: [
      { term: 'Selection Sort', definition: 'Sorting algorithm that repeatedly selects minimum unsorted element and places it.' }
    ],
    quizzes: [
      {
    question: '1. How many swaps does Selection Sort perform in a single pass?',
    options: [
      'Random number of swaps',
      'n swaps per pass',
      'Exactly 1 swap per pass',
      '0 swaps always'
    ],
    correctAnswer: 2,
    explanation: 'Selection Sort scans for minimum first, performing exactly 1 swap per pass.'
  }
    
    ],
    summaryPoints: [
      'Find minimum in unsorted part.',
      'Exactly 1 swap per pass.',
      'Sorted region grows left to right.'
    ],
    previousLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'bubble-sort-implementation',
      title: 'Bubble Sort Implementation'
    },
    nextLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'selection-sort-implementation',
      title: 'Selection Sort Implementation'
    }
  },

  // =========================================================================
  // SECTION 9 — SORTING ALGORITHMS (LESSON 5: Selection Sort Implementation)
  // =========================================================================
  'ds-sorting/selection-sort-implementation': {
    id: 'ds-sorting/selection-sort-implementation',
    topicId: 'ds-sorting',
    subtopicId: 'selection-sort-implementation',
    title: 'Selection Sort Implementation',
    subtitle: 'Python code, tracking min_index, and O(n²) comparisons',
    categoryTitle: 'SORTING ALGORITHMS',
    contentMarkdown: `# 1. PYTHON SELECTION SORT CODE

\`\`\`python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_index = i
        # Inner loop scans unsorted region for smaller values
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        
        # Swap minimum into first unsorted position i
        arr[i], arr[min_index] = arr[min_index], arr[i]
        
    return arr
\`\`\`

---

# 2. COMPLEXITY ANALYSIS

- **Best Case:** $O(n^2)$ (Even sorted arrays require scanning minimum!).
- **Worst Case:** $O(n^2)$.
- **Auxiliary Space:** $O(1)$ constant space.

---

# 3. LESSON SUMMARY

✓ Outer loop \`i\` sets target position; inner loop \`j\` finds \`min_index\`.
✓ Always $O(n^2)$ comparisons regardless of input order.`,
    codePreview: {
      code: `def selection_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        min_index = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_index]: min_index = j\n        arr[i], arr[min_index] = arr[min_index], arr[i]\n    return arr\n\nnums = [64, 25, 12, 22, 11]\nprint("Selection Sorted:", selection_sort(nums))`,
      output: `Selection Sorted: [11, 12, 22, 25, 64]`,
      caption: 'Python Selection Sort implementation'
    },
    glossary: [
      { term: 'min_index', definition: 'Variable holding index of current minimum element found in unsorted scan.' }
    ],
    quizzes: [
      {
    question: '1. Why is Selection Sort O(n²) even on an already sorted array?',
    options: [
      'Because it swaps every element',
      'Because it uses recursion',
      'It is actually O(n) on sorted arrays',
      'Because it scans the entire remaining unsorted region to verify the minimum'
    ],
    correctAnswer: 3,
    explanation: 'Selection Sort has no early stop mechanism and scans remaining elements on every pass.'
  }
    
    ],
    summaryPoints: [
      'Tracks min_index in inner loop.',
      'Swaps arr[i] with arr[min_index].',
      'Always O(n²) time complexity.'
    ],
    previousLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'selection-sort',
      title: 'Selection Sort'
    },
    nextLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'insertion-sort',
      title: 'Insertion Sort'
    }
  },

  // =========================================================================
  // SECTION 9 — SORTING ALGORITHMS (LESSON 6: Insertion Sort)
  // =========================================================================
  'ds-sorting/insertion-sort': {
    id: 'ds-sorting/insertion-sort',
    topicId: 'ds-sorting',
    subtopicId: 'insertion-sort',
    title: 'Insertion Sort',
    subtitle: 'Building a sorted region by shifting elements and inserting keys',
    categoryTitle: 'SORTING ALGORITHMS',
    contentMarkdown: `# 1. HOW INSERTION SORT WORKS

> 📌 **DEFINITION**
> **Insertion Sort builds a sorted region one element at a time by picking key \`arr[i]\`, shifting larger elements to the right, and inserting the key into its correct spot.**

\`\`\`text
ARRAY: [5, 2, 4, 6, 1, 3]

Start: Sorted [5] | Unsorted [2, 4, 6, 1, 3]
Step 1: Key = 2 ──► Compare 5 > 2 ──► Shift 5 right ──► Insert 2 ──► [2, 5]
Step 2: Key = 4 ──► Compare 5 > 4 ──► Shift 5 right ──► Insert 4 ──► [2, 4, 5]
\`\`\`

---

# 2. PLAYING CARDS ANALOGY

Think of sorting cards in your hand: take next card, shift larger cards right, drop card in slot!

---

# 3. LESSON SUMMARY

✓ Picks \`key = arr[i]\`.
✓ Shifts elements larger than \`key\` to the right.
✓ Inserts \`key\` into the open slot.`,
    codePreview: {
      code: `arr = [5, 2, 4, 6]\nkey = 2\n# Shift 5 right, insert 2 at index 0:\narr[1] = arr[0]\narr[0] = key\nprint("After insertion:", arr)`,
      output: `After insertion: [2, 5, 4, 6]`,
      caption: 'Insertion Sort shift and insert'
    },
    glossary: [
      { term: 'Insertion Sort', definition: 'Sorting algorithm that inserts key elements into a growing sorted sub-array.' },
      { term: 'Key', definition: 'The target element currently being placed into the sorted region.' }
    ],
    quizzes: [
      {
    question: '1. What key operation distinguishes Insertion Sort from Bubble Sort?',
    options: [
      'Shifting elements right and inserting key',
      'Swapping non-adjacent elements',
      'Finding minimum element',
      'Partitioning around pivot'
    ],
    correctAnswer: 0,
    explanation: 'Insertion Sort lifts key, shifts larger values right, and drops key in position.'
  }
    
    ],
    summaryPoints: [
      'Picks key from unsorted region.',
      'Shifts larger items right.',
      'Inserts key into correct position.'
    ],
    previousLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'selection-sort-implementation',
      title: 'Selection Sort Implementation'
    },
    nextLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'insertion-sort-implementation',
      title: 'Insertion Sort Implementation'
    }
  },

  // =========================================================================
  // SECTION 9 — SORTING ALGORITHMS (LESSON 7: Insertion Sort Implementation)
  // =========================================================================
  'ds-sorting/insertion-sort-implementation': {
    id: 'ds-sorting/insertion-sort-implementation',
    topicId: 'ds-sorting',
    subtopicId: 'insertion-sort-implementation',
    title: 'Insertion Sort Implementation',
    subtitle: 'Python while loop shifting, nearly sorted performance, and complexity',
    categoryTitle: 'SORTING ALGORITHMS',
    contentMarkdown: `# 1. PYTHON INSERTION SORT CODE

\`\`\`python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        # Shift elements larger than key to the right
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
            
        arr[j + 1] = key
        
    return arr
\`\`\`

---

# 2. COMPLEXITY ANALYSIS

- **Best Case:** $O(n)$ (Nearly sorted arrays requiring minimal shifts!).
- **Worst Case:** $O(n^2)$ (Reverse order).
- **Auxiliary Space:** $O(1)$ constant space.

---

# 3. LESSON SUMMARY

✓ Starts at index \`1\`; saves \`key = arr[i]\`.
✓ \`while j >= 0 and arr[j] > key\` shifts items right.
✓ Outstanding $O(n)$ efficiency on nearly sorted data.`,
    codePreview: {
      code: `def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr\n\nnums = [5, 2, 4, 6, 1, 3]\nprint("Insertion Sorted:", insertion_sort(nums))`,
      output: `Insertion Sorted: [1, 2, 3, 4, 5, 6]`,
      caption: 'Python Insertion Sort implementation'
    },
    glossary: [
      { term: 'Shifting', definition: 'Copying an element to index j+1 to open slot for key insertion.' }
    ],
    quizzes: [
      {
    question: '1. What is the best-case time complexity of Insertion Sort on nearly sorted data?',
    options: [
      'O(1)',
      'O(n log n)',
      'O(n)',
      'O(n²)'
    ],
    correctAnswer: 2,
    explanation: 'If array is nearly sorted, the inner while loop condition fails quickly, running in O(n) linear time.'
  }
    
    ],
    summaryPoints: [
      'Outer loop starts at index 1.',
      'Inner while shifts arr[j] right.',
      'Best O(n) on nearly sorted data.'
    ],
    previousLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'insertion-sort',
      title: 'Insertion Sort'
    },
    nextLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'merge-sort',
      title: 'Merge Sort'
    }
  },

  // =========================================================================
  // SECTION 9 — SORTING ALGORITHMS (LESSON 8: Merge Sort)
  // =========================================================================
  'ds-sorting/merge-sort': {
    id: 'ds-sorting/merge-sort',
    topicId: 'ds-sorting',
    subtopicId: 'merge-sort',
    title: 'Merge Sort',
    subtitle: 'Divide-and-conquer strategy, tree splitting, and two-pointer merging',
    categoryTitle: 'SORTING ALGORITHMS',
    contentMarkdown: `# 1. DIVIDE AND CONQUER

> 📌 **DEFINITION**
> **Merge Sort repeatedly divides the array in half until 1-element arrays remain, then merges sorted sub-arrays back together.**

\`\`\`text
DIVIDE:    [38, 27, 43, 3, 9, 82, 10]
           ├──► [38, 27, 43]   and   [3, 9, 82, 10]
           └──► [38] [27, 43]        [3, 9] [82, 10]
           └──► Base Case: Single element arrays [38], [27], [43]...

MERGE:     [27, 38, 43] merged with [3, 9, 10, 82]
           ──► SORTED RESULT: [3, 9, 10, 27, 38, 43, 82]
\`\`\`

---

# 2. TWO-POINTER MERGE MECHANIC

Compare front elements of \`left\` and \`right\` arrays, pick smaller, append to result!

---

# 3. LESSON SUMMARY

✓ Divide array in half recursively.
✓ Base case: 1-element array is sorted.
✓ Merge sorted sub-arrays in $O(n)$ time.`,
    codePreview: {
      code: `left = [27, 38]\nright = [3, 43]\n# Merging demo:\nresult = sorted(left + right)\nprint("Merged Result:", result)`,
      output: `Merged Result: [3, 27, 38, 43]`,
      caption: 'Merging two sorted sub-arrays'
    },
    glossary: [
      { term: 'Divide and Conquer', definition: 'Algorithm paradigm dividing problem into sub-problems, solving recursively, and combining.' },
      { term: 'Merge Operation', definition: 'Combining two sorted arrays into a single sorted array.' }
    ],
    quizzes: [
      {
    question: '1. What is the base case condition for recursive Merge Sort?',
    options: [
      'left == right == 0',
      'Array is unsorted',
      'Array length <= 1',
      'Array length == 10'
    ],
    correctAnswer: 2,
    explanation: 'An array of length 0 or 1 is already sorted, forming the base case.'
  }
    
    ],
    summaryPoints: [
      'Divide array recursively.',
      'Base case: length <= 1.',
      'Merge sorted halves in O(n).'
    ],
    previousLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'insertion-sort-implementation',
      title: 'Insertion Sort Implementation'
    },
    nextLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'merge-sort-implementation',
      title: 'Merge Sort Implementation'
    }
  },

  // =========================================================================
  // SECTION 9 — SORTING ALGORITHMS (LESSON 9: Merge Sort Implementation)
  // =========================================================================
  'ds-sorting/merge-sort-implementation': {
    id: 'ds-sorting/merge-sort-implementation',
    topicId: 'ds-sorting',
    subtopicId: 'merge-sort-implementation',
    title: 'Merge Sort Implementation',
    subtitle: 'Recursive Python implementation, helper merge function, and guaranteed O(n log n)',
    categoryTitle: 'SORTING ALGORITHMS',
    contentMarkdown: `# 1. PYTHON MERGE SORT CODE

\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
        
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
            
    result.extend(left[i:])
    result.extend(right[j:])
    return result
\`\`\`

---

# 2. COMPLEXITY ANALYSIS

- **Time Complexity:** **Guaranteed $O(n \log n)$** (Best, Average, Worst!).
- **Auxiliary Space:** $O(n)$ extra array space.

---

# 3. LESSON SUMMARY

✓ Guaranteed $O(n \log n)$ performance regardless of initial array order.
✓ Uses $O(n)$ extra memory during merge.`,
    codePreview: {
      code: `def merge_sort(arr):\n    if len(arr) <= 1: return arr\n    m = len(arr) // 2\n    left, right = merge_sort(arr[:m]), merge_sort(arr[m:])\n    res, i, j = [], 0, 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]: res.append(left[i]); i += 1\n        else: res.append(right[j]); j += 1\n    res.extend(left[i:]); res.extend(right[j:])\n    return res\n\nprint(merge_sort([38, 27, 43, 3]))`,
      output: `[3, 27, 38, 43]`,
      caption: 'Recursive Python Merge Sort'
    },
    glossary: [
      { term: 'Guaranteed O(n log n)', definition: 'Merge Sort maintains logarithmic tree depth across all input arrangements.' }
    ],
    quizzes: [
      {
    question: '1. What is the space complexity of standard Python Merge Sort?',
    options: [
      'O(n) auxiliary space',
      'O(1) constant space',
      'O(log n)',
      'O(n²)'
    ],
    correctAnswer: 0,
    explanation: 'Merge Sort creates auxiliary sub-arrays during splitting and merging, requiring O(n) space.'
  }
    
    ],
    summaryPoints: [
      'Guaranteed O(n log n) time.',
      'Requires O(n) auxiliary space.',
      'Stable divide and conquer.'
    ],
    previousLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'merge-sort',
      title: 'Merge Sort'
    },
    nextLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'quick-sort',
      title: 'Quick Sort'
    }
  },

  // =========================================================================
  // SECTION 9 — SORTING ALGORITHMS (LESSON 10: Quick Sort)
  // =========================================================================
  'ds-sorting/quick-sort': {
    id: 'ds-sorting/quick-sort',
    topicId: 'ds-sorting',
    subtopicId: 'quick-sort',
    title: 'Quick Sort',
    subtitle: 'Choosing a pivot, partitioning elements, and recursive sub-array sorting',
    categoryTitle: 'SORTING ALGORITHMS',
    contentMarkdown: `# 1. HOW QUICK SORT WORKS

> 📌 **DEFINITION**
> **Quick Sort selects a pivot element, partitions the array so smaller elements go left and larger go right, then recursively sorts the partitions.**

\`\`\`text
ARRAY: [8, 3, 1, 7, 0, 10, 2]   PIVOT = 2 (Last element)

Partition around Pivot (2):
  Smaller/Equal: [1, 0]  │ PIVOT: [2] │ Larger: [8, 3, 7, 10]

PIVOT 2 IS NOW FIXED IN ITS FINAL POSITION!
Recursively sort Left [1, 0] and Right [8, 3, 7, 10].
\`\`\`

---

# 2. CORE MENTAL MODEL

- **CHOOSE PIVOT:** Pick element (e.g. \`arr[high]\`).
- **PARTITION:** Rearrange so \`elements <= pivot\` are left, \`elements > pivot\` are right.
- **PIVOT FIXED:** Pivot reaches its permanent final spot.

---

# 3. LESSON SUMMARY

✓ Pick pivot ──► Partition array ──► Pivot fixed ──► Recurse.
✓ Average time $O(n \log n)$; In-place sorting.`,
    codePreview: {
      code: `nums = [8, 3, 1, 7, 0, 10, 2]\npivot = 2\nsmaller = [x for x in nums[:-1] if x <= pivot]\nlarger = [x for x in nums[:-1] if x > pivot]\nprint("Partition:", smaller + [pivot] + larger)`,
      output: `Partition: [1, 0, 2, 8, 3, 7, 10]`,
      caption: 'Quick Sort partitioning concept'
    },
    glossary: [
      { term: 'Quick Sort', definition: 'In-place divide-and-conquer sorting algorithm partitioning around a pivot.' },
      { term: 'Pivot', definition: 'The target element chosen to divide an array into smaller and larger partitions.' }
    ],
    quizzes: [
      {
    question: '1. What happens to the pivot element after a partition step completes?',
    options: [
      'It moves to index 0',
      'It gets deleted',
      'It reaches its permanent final sorted index',
      'It swaps with the first item'
    ],
    correctAnswer: 2,
    explanation: 'Partitioning places the pivot in its exact final sorted position.'
  }
    
    ],
    summaryPoints: [
      'Choose pivot element.',
      'Partition smaller left, larger right.',
      'Pivot reaches final spot.'
    ],
    previousLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'merge-sort-implementation',
      title: 'Merge Sort Implementation'
    },
    nextLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'quick-sort-implementation',
      title: 'Quick Sort Implementation'
    }
  },

  // =========================================================================
  // SECTION 9 — SORTING ALGORITHMS (LESSON 11: Quick Sort Implementation)
  // =========================================================================
  'ds-sorting/quick-sort-implementation': {
    id: 'ds-sorting/quick-sort-implementation',
    topicId: 'ds-sorting',
    subtopicId: 'quick-sort-implementation',
    title: 'Quick Sort Implementation',
    subtitle: 'Lomuto partition scheme, i and j pointers, and worst-case O(n²)',
    categoryTitle: 'SORTING ALGORITHMS',
    contentMarkdown: `# 1. PYTHON QUICK SORT CODE (LOMUTO PARTITION)

\`\`\`python
def quick_sort(arr, low, high):
    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
            
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
\`\`\`

---

# 2. COMPLEXITY & WORST CASE

- **Average Time:** $O(n \log n)$
- **Worst Case Time:** $O(n^2)$ (Occurs when pivot repeatedly chooses smallest/largest item in sorted input).
- **Space:** $O(\log n)$ call stack space.

---

# 3. LESSON SUMMARY

✓ Lomuto partitioning uses \`i\` (smaller region end) and \`j\` (scanner).
✓ Excludes fixed \`pivot_index\` in recursive calls.`,
    codePreview: {
      code: `def partition(arr, low, high):\n    pivot = arr[high]\n    i = low - 1\n    for j in range(low, high):\n        if arr[j] <= pivot:\n            i += 1\n            arr[i], arr[j] = arr[j], arr[i]\n    arr[i + 1], arr[high] = arr[high], arr[i + 1]\n    return i + 1\n\nnums = [8, 3, 1, 7, 0, 10, 2]\nidx = partition(nums, 0, len(nums)-1)\nprint("Pivot Index:", idx, "| Array:", nums)`,
      output: `Pivot Index: 2 | Array: [1, 0, 2, 7, 8, 10, 3]`,
      caption: 'Lomuto partition execution'
    },
    glossary: [
      { term: 'Lomuto Partition', definition: 'Partitioning scheme using last element as pivot and scanning j with boundary i.' }
    ],
    quizzes: [
      {
    question: '1. What causes Quick Sort to degrade to its worst-case time complexity of O(n²)?',
    options: [
      'Having negative numbers',
      'Using recursion',
      'Arrays of length 10',
      'Repeatedly choosing bad pivots (e.g. smallest/largest element in sorted data)'
    ],
    correctAnswer: 3,
    explanation: 'Unbalanced partitions (1 item vs n-1 items) cause n recursive levels, yielding O(n²) time.'
  }
    
    ],
    summaryPoints: [
      'Lomuto scheme: i and j pointers.',
      'Average O(n log n), Worst O(n²).',
      'Excludes pivot from sub-ranges.'
    ],
    previousLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'quick-sort',
      title: 'Quick Sort'
    },
    nextLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'comparison-of-sorting-algorithms',
      title: 'Comparison of Sorting Algorithms'
    }
  },

  // =========================================================================
  // SECTION 9 — SORTING ALGORITHMS (LESSON 12: Comparison of Sorting Algorithms)
  // =========================================================================
  'ds-sorting/comparison-of-sorting-algorithms': {
    id: 'ds-sorting/comparison-of-sorting-algorithms',
    topicId: 'ds-sorting',
    subtopicId: 'comparison-of-sorting-algorithms',
    title: 'Comparison of Sorting Algorithms',
    subtitle: 'Side-by-side performance matrix, operation counters, and scenario selection',
    categoryTitle: 'SORTING ALGORITHMS',
    contentMarkdown: `# 1. MASTER COMPARISON TABLE

| Algorithm | Strategy | Best Time | Average Time | Worst Time | Space |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** | Compare neighbors | **O(n)** | **O(n²)** | **O(n²)** | **O(1)** |
| **Selection Sort** | Find minimum | **O(n²)** | **O(n²)** | **O(n²)** | **O(1)** |
| **Insertion Sort** | Shift & insert key | **O(n)** | **O(n²)** | **O(n²)** | **O(1)** |
| **Merge Sort** | Divide & merge | **O(n log n)** | **O(n log n)** | **O(n log n)** | **O(n)** |
| **Quick Sort** | Pivot & partition | **O(n log n)** | **O(n log n)** | **O(n²)** | **O(log n)** |

---

# 2. WHICH ALGORITHM TO CHOOSE?

- **Nearly Sorted Data:** Use **Insertion Sort** ($O(n)$ time!).
- **Guaranteed Worst-Case Speed:** Use **Merge Sort** ($O(n \log n)$ guaranteed).
- **Fastest In-Practice General Purpose:** Use **Quick Sort** (In-place, fast cache utilization).

---

# 3. LESSON SUMMARY

✓ No single algorithm is universally best in all scenarios.
✓ Insertion Sort excels on small/nearly sorted data.
✓ Merge Sort guarantees $O(n \log n)$; Quick Sort is fast in-place.`,
    codePreview: {
      code: `print("Bubble/Selection/Insertion: O(n²) Average")\nprint("Merge/Quick Sort:            O(n log n) Average")`,
      output: `Bubble/Selection/Insertion: O(n²) Average\nMerge/Quick Sort:            O(n log n) Average`,
      caption: 'Algorithmic tier comparison'
    },
    glossary: [
      { term: 'Algorithm Selection', definition: 'Choosing optimal sorting strategy based on data size, memory, and ordering.' }
    ],
    quizzes: [
      {
    question: '1. Which sorting algorithm provides guaranteed O(n log n) worst-case time complexity?',
    options: [
      'Quick Sort',
      'Bubble Sort',
      'Selection Sort',
      'Merge Sort'
    ],
    correctAnswer: 3,
    explanation: 'Merge Sort guarantees O(n log n) time across best, average, and worst cases.'
  }
    
    ],
    summaryPoints: [
      'Insertion: Great for nearly sorted data.',
      'Merge: Guaranteed O(n log n) time.',
      'Quick: Fast in-place partitioning.'
    ],
    previousLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'quick-sort-implementation',
      title: 'Quick Sort Implementation'
    },
    nextLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'sorting-algorithms-complexity',
      title: 'Sorting Algorithms Complexity'
    }
  },

  // =========================================================================
  // SECTION 9 — SORTING ALGORITHMS (LESSON 13: Sorting Algorithms Complexity)
  // =========================================================================
  'ds-sorting/sorting-algorithms-complexity': {
    id: 'ds-sorting/sorting-algorithms-complexity',
    topicId: 'ds-sorting',
    subtopicId: 'sorting-algorithms-complexity',
    title: 'Sorting Algorithms Complexity',
    subtitle: 'Consolidating O(n²) vs O(n log n) growth rates and space trade-offs',
    categoryTitle: 'SORTING ALGORITHMS',
    contentMarkdown: `# 1. GROWTH RATE COMPARISON ($O(n^2)$ vs $O(n \log n)$)

\`\`\`text
Array Size (n = 1,000):
  O(n²) Algorithms (Bubble/Selection):   ~ 1,000,000 operations
  O(n log n) Algorithms (Merge/Quick):   ~     10,000 operations  (100x FASTER!)
\`\`\`

---

# 2. AUXILIARY SPACE TRADE-OFFS

- **In-Place ($O(1)$ Space):** Bubble Sort, Selection Sort, Insertion Sort.
- **In-Place Call-Stack ($O(\log n)$ Space):** Quick Sort.
- **Extra Array Memory ($O(n)$ Space):** Merge Sort.

---

# 3. LESSON SUMMARY

✓ $O(n \log n)$ algorithms scale dramatically better for large datasets.
✓ Memory constraints dictate choice between Merge Sort ($O(n)$ space) and Quick/Insertion Sort.`,
    codePreview: {
      code: `import math\nn = 1000\nprint("n^2 scale:", n**2)\nprint("n log n scale:", int(n * math.log2(n)))`,
      output: `n^2 scale: 1000000\nn log n scale: 9965`,
      caption: 'Operation count growth comparison at n=1000'
    },
    glossary: [
      { term: 'Growth Behavior', definition: 'How execution time scales as input size n approaches millions of elements.' }
    ],
    quizzes: [
      {
    question: '1. Approximately how many operations does an O(n log n) algorithm perform for n = 1,000 elements?',
    options: [
      '~1,000 operations',
      '~1,000,000 operations',
      '~100 operations',
      '~10,000 operations'
    ],
    correctAnswer: 3,
    explanation: 'For n=1000, n log₂ n ≈ 1000 × 10 = 10,000 operations.'
  }
    
    ],
    summaryPoints: [
      'O(n log n) is ~100x faster at n=1000.',
      'In-place vs extra memory trade-offs.',
      'Scaling determines algorithm choice.'
    ],
    previousLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'comparison-of-sorting-algorithms',
      title: 'Comparison of Sorting Algorithms'
    },
    nextLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'ds-recursion-review',
      title: 'Recursion Review'
    }
  },
// =========================================================================
  // SECTION 10 — RECURSION IN DATA STRUCTURES (LESSON 1: Introduction to Recursion)
  // =========================================================================
  'ds-recursion/introduction-to-recursion': {
    id: 'ds-recursion/introduction-to-recursion',
    topicId: 'ds-recursion',
    subtopicId: 'introduction-to-recursion',
    title: 'Introduction to Recursion',
    subtitle: 'Understanding recursive function calls, smaller sub-problems, and progress toward termination',
    categoryTitle: 'RECURSION IN DATA STRUCTURES',
    contentMarkdown: `# 1. WHAT IS RECURSION?

> 📌 **DEFINITION**
> **Recursion is a technique where a function solves a problem by calling itself with a smaller version of the same problem.**

\`\`\`python
def countdown(n):
    if n == 0:
        print("Done")
        return  # Stopping condition!

    print(n)
    countdown(n - 1)  # Function calls itself with a smaller value (n - 1)

countdown(3)
\`\`\`

**Output:**
\`\`\`text
3
2
1
Done
\`\`\`

---

# 2. WHY RECURSION IN DATA STRUCTURES?

Many data structures are **naturally recursive**:
- **Linked Lists:** A node points to another Node (which is the head of a smaller linked list).
- **Trees:** A root node points to Left and Right Subtrees (which are themselves full trees).

---

# 3. LESSON SUMMARY

✓ Recursion means a function calls itself.
✓ Every call works on a smaller sub-problem.
✓ Must make progress toward a stopping condition.`,
    codePreview: {
      code: `def countdown(n):\n    if n == 0:\n        print("Done")\n        return\n    print(n)\n    countdown(n - 1)\n\ncountdown(3)`,
      output: `3\n2\n1\nDone`,
      caption: 'Recursive countdown execution'
    },
    glossary: [
      { term: 'Recursion', definition: 'A programming technique where a function calls itself to solve smaller sub-problems.' },
      { term: 'Sub-problem', definition: 'A smaller instance of the original problem solved recursively.' }
    ],
    quizzes: [
      {
    question: '1. What happens if a recursive function does NOT make progress toward a stopping condition?',
    options: [
      'It returns 0 automatically',
      'It compiles into an array',
      'It converts into a while loop',
      'It causes infinite recursion and a Stack Overflow error'
    ],
    correctAnswer: 3,
    explanation: 'Failing to make progress toward a stopping condition leads to infinite recursive calls.'
  }
    
    ],
    summaryPoints: [
      'Function calls itself.',
      'Solves smaller sub-problems.',
      'Naturally fits linked lists & trees.'
    ],
    previousLesson: {
      topicId: 'ds-sorting',
      subtopicId: 'sorting-algorithms-complexity',
      title: 'Sorting Algorithms Complexity'
    },
    nextLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'base-case-and-recursive-case',
      title: 'Base Case and Recursive Case'
    }
  },

  // =========================================================================
  // SECTION 10 — RECURSION IN DATA STRUCTURES (LESSON 2: Base Case and Recursive Case)
  // =========================================================================
  'ds-recursion/base-case-and-recursive-case': {
    id: 'ds-recursion/base-case-and-recursive-case',
    topicId: 'ds-recursion',
    subtopicId: 'base-case-and-recursive-case',
    title: 'Base Case and Recursive Case',
    subtitle: 'The two essential components of every recursive solution',
    categoryTitle: 'RECURSION IN DATA STRUCTURES',
    contentMarkdown: `# 1. THE TWO ESSENTIAL PARTS

> 📌 **PERMANENT MENTAL MODEL**
> **Every valid recursive function MUST contain two parts:**
> 1. **BASE CASE:** Stops further recursive calls.
> 2. **RECURSIVE CASE:** Reduces the problem size and calls the function again.

\`\`\`python
def factorial(n):
    # 1. BASE CASE: Stops recursion
    if n <= 1:
        return 1

    # 2. RECURSIVE CASE: Reduces problem (n - 1) and calls function
    return n * factorial(n - 1)
\`\`\`

---

# 2. FACTORIAL UNWINDING ($4! = 4 \\times 3 \\times 2 \\times 1$)

\`\`\`text
factorial(4) ──► 4 * factorial(3)
             ──► 4 * (3 * factorial(2))
             ──► 4 * (3 * (2 * factorial(1)))
             ──► BASE CASE reached! factorial(1) = 1
             ──► Unwinds upward: 4 * 3 * 2 * 1 = 24
\`\`\`

---

# 3. LESSON SUMMARY

✓ **Base Case:** Stops recursion (e.g. \`n <= 1\`).
✓ **Recursive Case:** Reduces problem toward base case (e.g. \`n - 1\`).`,
    codePreview: {
      code: `def factorial(n):\n    if n <= 1: return 1\n    return n * factorial(n - 1)\n\nprint("4! =", factorial(4))`,
      output: `4! = 24`,
      caption: 'Factorial calculation via recursion'
    },
    glossary: [
      { term: 'Base Case', definition: 'The terminating condition that returns a direct answer without further recursive calls.' },
      { term: 'Recursive Case', definition: 'The code path that breaks down the problem and makes a recursive call.' }
    ],
    quizzes: [
      {
    question: '1. What happens if the Base Case is omitted from a recursive function?',
    options: [
      'The function recurses indefinitely until maximum recursion depth is exceeded',
      'Python automatically creates a base case',
      'It returns None immediately',
      'The code executes once and stops'
    ],
    correctAnswer: 0,
    explanation: 'Without a Base Case, recursion never stops, triggering a RecursionError.'
  }
    
    ],
    summaryPoints: [
      'Base Case stops recursion.',
      'Recursive Case reduces problem.',
      'Must move toward base case.'
    ],
    previousLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'introduction-to-recursion',
      title: 'Introduction to Recursion'
    },
    nextLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'how-recursion-works',
      title: 'How Recursion Works'
    }
  },

  // =========================================================================
  // SECTION 10 — RECURSION IN DATA STRUCTURES (LESSON 3: How Recursion Works)
  // =========================================================================
  'ds-recursion/how-recursion-works': {
    id: 'ds-recursion/how-recursion-works',
    topicId: 'ds-recursion',
    subtopicId: 'how-recursion-works',
    title: 'How Recursion Works',
    subtitle: 'Understanding the Calling Phase (Going Down) vs Returning Phase (Unwinding Up)',
    categoryTitle: 'RECURSION IN DATA STRUCTURES',
    contentMarkdown: `# 1. THE TWO PHASES OF RECURSION

\`\`\`python
def sum_numbers(n):
    if n == 0:
        return 0
    return n + sum_numbers(n - 1)
\`\`\`

### Phase 1: Calling Phase (Going Down ↓)
\`sum_numbers(3) ──► 3 + sum_numbers(2) ──► 3 + 2 + sum_numbers(1) ──► 3 + 2 + 1 + sum_numbers(0) [Base Case]\`

### Phase 2: Returning Phase (Unwinding Up ↑)
\`sum_numbers(0) = 0 ──► sum_numbers(1) = 1+0=1 ──► sum_numbers(2) = 2+1=3 ──► sum_numbers(3) = 3+3=6\`

---

# 2. KEY INSIGHT

- Code **BEFORE** the recursive call executes while **Going Down**.
- Code **AFTER** the recursive call executes while **Returning Up**.

---

# 3. LESSON SUMMARY

✓ Calling Phase creates new function calls going down.
✓ Returning Phase resolves waiting calculations unwinding up.`,
    codePreview: {
      code: `def sum_numbers(n):\n    if n == 0: return 0\n    return n + sum_numbers(n - 1)\n\nprint("Sum 1..3 =", sum_numbers(3))`,
      output: `Sum 1..3 = 6`,
      caption: 'Recursive sum calling and returning phases'
    },
    glossary: [
      { term: 'Calling Phase', definition: 'The downward phase where recursive calls are initiated.' },
      { term: 'Returning Phase', definition: 'The upward unwinding phase where base values are combined back.' }
    ],
    quizzes: [
      {
    question: '1. When does code placed AFTER a recursive call line execute?',
    options: [
      'Before any function is called',
      'Only if an error occurs',
      'During the Returning Phase as calls unwind upward',
      'During the Calling Phase'
    ],
    correctAnswer: 2,
    explanation: 'Code after a recursive line waits for the call to finish and runs during the Returning Phase.'
  }
    
    ],
    summaryPoints: [
      'Calling Phase goes down.',
      'Returning Phase unwinds up.',
      'Code after call runs returning up.'
    ],
    previousLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'base-case-and-recursive-case',
      title: 'Base Case and Recursive Case'
    },
    nextLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'call-stack-in-recursion',
      title: 'Call Stack in Recursion'
    }
  },

  // =========================================================================
  // SECTION 10 — RECURSION IN DATA STRUCTURES (LESSON 4: Call Stack in Recursion)
  // =========================================================================
  'ds-recursion/call-stack-in-recursion': {
    id: 'ds-recursion/call-stack-in-recursion',
    topicId: 'ds-recursion',
    subtopicId: 'call-stack-in-recursion',
    title: 'Call Stack in Recursion',
    subtitle: 'Stack frames, LIFO execution, PUSH on call, POP on return',
    categoryTitle: 'RECURSION IN DATA STRUCTURES',
    contentMarkdown: `# 1. RECURSION AND THE CALL STACK

Every recursive call creates a **Stack Frame** stored in the system **Call Stack**.

\`\`\`text
CALL  countdown(3)  ──► PUSH  frame countdown(3)
CALL  countdown(2)  ──► PUSH  frame countdown(2)
CALL  countdown(1)  ──► PUSH  frame countdown(1)
CALL  countdown(0)  ──► BASE CASE!

RETURN countdown(0) ──► POP   frame countdown(0)
RETURN countdown(1) ──► POP   frame countdown(1)
RETURN countdown(2) ──► POP   frame countdown(2)
RETURN countdown(3) ──► POP   frame countdown(3)  [STACK EMPTY]
\`\`\`

---

# 2. LIFO CONNECTION

Recursion naturally follows **Last-In, First-Out (LIFO)** stack behavior: the LAST recursive call created is the FIRST call to return!

---

# 3. LESSON SUMMARY

✓ Function CALL = **PUSH** stack frame.
✓ Function RETURN = **POP** stack frame.
✓ Stack depth equals the maximum number of active recursive calls.`,
    codePreview: {
      code: `# Stack frame visualization concept:\nprint("CALL: PUSH frame")\nprint("RETURN: POP frame")`,
      output: `CALL: PUSH frame\nRETURN: POP frame`,
      caption: 'LIFO call stack behavior in recursion'
    },
    glossary: [
      { term: 'Stack Frame', definition: 'A region of memory allocated on the call stack for a single function call.' },
      { term: 'Stack Depth', definition: 'The total number of active stack frames currently stored on the call stack.' }
    ],
    quizzes: [
      {
    question: '1. What stack operation happens when a recursive function returns?',
    options: [
      'POP (removes top stack frame)',
      'PEEK (reads without deleting)',
      'CLEAR',
      'PUSH (adds a new stack frame)'
    ],
    correctAnswer: 0,
    explanation: 'Returning from a function pops its active frame off the top of the call stack.'
  }
    
    ],
    summaryPoints: [
      'Call = PUSH frame.',
      'Return = POP frame.',
      'Follows LIFO stack behavior.'
    ],
    previousLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'how-recursion-works',
      title: 'How Recursion Works'
    },
    nextLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'recursive-array-traversal',
      title: 'Recursive Array Traversal'
    }
  },

  // =========================================================================
  // SECTION 10 — RECURSION IN DATA STRUCTURES (LESSON 5: Recursive Array Traversal)
  // =========================================================================
  'ds-recursion/recursive-array-traversal': {
    id: 'ds-recursion/recursive-array-traversal',
    topicId: 'ds-recursion',
    subtopicId: 'recursive-array-traversal',
    title: 'Recursive Array Traversal',
    subtitle: 'Navigating array indices recursively, recursive sum, and base case index == len(arr)',
    categoryTitle: 'RECURSION IN DATA STRUCTURES',
    contentMarkdown: `# 1. RECURSIVE ARRAY TRAVERSAL

\`\`\`python
def traverse(arr, index=0):
    # Base Case: Reached beyond last index
    if index == len(arr):
        return

    print(arr[index])  # Process current element
    traverse(arr, index + 1)  # Recurse on next index!

numbers = [10, 20, 30, 40]
traverse(numbers)
\`\`\`

---

# 2. RECURSIVE ARRAY SUM

\`\`\`python
def array_sum(arr, index=0):
    if index == len(arr):
        return 0  # Base case: sum of empty array slice is 0

    return arr[index] + array_sum(arr, index + 1)
\`\`\`

---

# 3. LESSON SUMMARY

✓ Pass \`index + 1\` to make progress.
✓ Base case occurs when \`index == len(arr)\`.`,
    codePreview: {
      code: `def array_sum(arr, i=0):\n    if i == len(arr): return 0\n    return arr[i] + array_sum(arr, i + 1)\n\nprint("Sum:", array_sum([10, 20, 30]))`,
      output: `Sum: 60`,
      caption: 'Recursive array summation'
    },
    glossary: [
      { term: 'Recursive Array Traversal', definition: 'Visiting array elements by recursively advancing index parameter.' }
    ],
    quizzes: [
      {
    question: '1. What is the base case condition for recursively traversing an array of length n?',
    options: [
      'index == len(arr)',
      'index == 0',
      'arr[index] == None',
      'index == -1'
    ],
    correctAnswer: 0,
    explanation: 'When index equals len(arr), all valid array elements have been processed.'
  }
    
    ],
    summaryPoints: [
      'Advance via index + 1.',
      'Base case: index == len(arr).',
      'Calculates sums recursively.'
    ],
    previousLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'call-stack-in-recursion',
      title: 'Call Stack in Recursion'
    },
    nextLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'recursive-searching',
      title: 'Recursive Searching'
    }
  },

  // =========================================================================
  // SECTION 10 — RECURSION IN DATA STRUCTURES (LESSON 6: Recursive Searching)
  // =========================================================================
  'ds-recursion/recursive-searching': {
    id: 'ds-recursion/recursive-searching',
    topicId: 'ds-recursion',
    subtopicId: 'recursive-searching',
    title: 'Recursive Searching',
    subtitle: 'Recursive Linear Search and Recursive Binary Search mechanics',
    categoryTitle: 'RECURSION IN DATA STRUCTURES',
    contentMarkdown: `# 1. RECURSIVE LINEAR SEARCH

\`\`\`python
def recursive_linear_search(arr, target, index=0):
    if index == len(arr):
        return -1  # Base Case 1: Target Not Found

    if arr[index] == target:
        return index  # Base Case 2: Target Found!

    return recursive_linear_search(arr, target, index + 1)
\`\`\`

---

# 2. RECURSIVE BINARY SEARCH

\`\`\`python
def recursive_binary_search(arr, target, left, right):
    if left > right:
        return -1  # Base Case: Search space empty

    mid = (left + right) // 2

    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return recursive_binary_search(arr, target, mid + 1, right)
    else:
        return recursive_binary_search(arr, target, left, mid - 1)
\`\`\`

---

# 3. LESSON SUMMARY

✓ Linear search advances \`index + 1\`.
✓ Binary search reduces bounds \`mid + 1\` or \`mid - 1\` in $O(\log n)$ space.`,
    codePreview: {
      code: `def r_search(arr, target, i=0):\n    if i == len(arr): return -1\n    if arr[i] == target: return i\n    return r_search(arr, target, i + 1)\n\nprint("Target 25 at index:", r_search([12, 7, 25, 18], 25))`,
      output: `Target 25 at index: 2`,
      caption: 'Recursive Linear Search'
    },
    glossary: [
      { term: 'Recursive Searching', definition: 'Finding target elements by passing reduced search ranges to recursive calls.' }
    ],
    quizzes: [
      {
    question: '1. What are the two base cases in recursive Linear Search?',
    options: [
      'Target Found (returns index) AND End of Array Reached (returns -1)',
      'No base cases needed',
      'Only target > 100',
      'Only index == 0'
    ],
    correctAnswer: 0,
    explanation: 'Search terminates early if target matches OR if array ends without finding target.'
  }
    
    ],
    summaryPoints: [
      'Linear: index + 1 step.',
      'Binary: mid +/- 1 range reduction.',
      'Returns index or -1.'
    ],
    previousLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'recursive-array-traversal',
      title: 'Recursive Array Traversal'
    },
    nextLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'recursion-with-linked-lists',
      title: 'Recursion with Linked Lists'
    }
  },

  // =========================================================================
  // SECTION 10 — RECURSION IN DATA STRUCTURES (LESSON 7: Recursion with Linked Lists)
  // =========================================================================
  'ds-recursion/recursion-with-linked-lists': {
    id: 'ds-recursion/recursion-with-linked-lists',
    topicId: 'ds-recursion',
    subtopicId: 'recursion-with-linked-lists',
    title: 'Recursion with Linked Lists',
    subtitle: 'Node traversal, recursive search, and printing in reverse order via unwinding',
    categoryTitle: 'RECURSION IN DATA STRUCTURES',
    contentMarkdown: `# 1. RECURSIVE LINKED LIST TRAVERSAL

\`\`\`python
def traverse(node):
    if node is None:
        return  # Base Case: End of linked list

    print(node.data)
    traverse(node.next)  # Recurse on rest of list!
\`\`\`

---

# 2. PRINTING LINKED LIST IN REVERSE ORDER

By placing \`print()\` **AFTER** the recursive call, values print during the **Returning Phase**!

\`\`\`python
def print_reverse(node):
    if node is None:
        return

    print_reverse(node.next)  # Recurse first!
    print(node.data)          # Prints going upward!
\`\`\`

**Output for \`10 ──► 20 ──► 30\`:**
\`\`\`text
30
20
10
\`\`\`

---

# 3. LESSON SUMMARY

✓ \`node is None\` is the base case.
✓ Code after recursive call prints items in reverse.`,
    codePreview: {
      code: `class Node:\n    def __init__(self, d): self.data, self.next = d, None\n\nn1, n2, n3 = Node(10), Node(20), Node(30)\nn1.next, n2.next = n2, n3\n\ndef print_rev(n):\n    if not n: return\n    print_rev(n.next)\n    print(n.data)\n\nprint_rev(n1)`,
      output: `30\n20\n10`,
      caption: 'Printing linked list in reverse via recursion unwinding'
    },
    glossary: [
      { term: 'Linked List Recursion', definition: 'Processing pointer-connected node chains by recursing on node.next.' }
    ],
    quizzes: [
      {
    question: '1. Why does calling print_reverse(node.next) BEFORE print(node.data) display nodes in reverse order?',
    options: [
      'Because linked lists are doubly linked',
      'It does not print in reverse',
      'Because print automatically reverses text',
      'Because print runs during the Returning Phase after deep nodes unwind'
    ],
    correctAnswer: 3,
    explanation: 'Reaching node is None first forces all frames onto stack, printing in LIFO reverse order during POPs.'
  }
    
    ],
    summaryPoints: [
      'Base case: node is None.',
      'Recurse on node.next.',
      'Code after call runs in reverse.'
    ],
    previousLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'recursive-searching',
      title: 'Recursive Searching'
    },
    nextLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'recursion-with-trees',
      title: 'Recursion with Trees'
    }
  },

  // =========================================================================
  // SECTION 10 — RECURSION IN DATA STRUCTURES (LESSON 8: Recursion with Trees)
  // =========================================================================
  'ds-recursion/recursion-with-trees': {
    id: 'ds-recursion/recursion-with-trees',
    topicId: 'ds-recursion',
    subtopicId: 'recursion-with-trees',
    title: 'Recursion with Trees',
    subtitle: 'Why hierarchical subtrees make recursion natural (Preorder preview)',
    categoryTitle: 'RECURSION IN DATA STRUCTURES',
    contentMarkdown: `# 1. TREES ARE NATURALLY RECURSIVE

A tree node has a value and points to **Left Subtree** and **Right Subtree** (both are full trees!).

\`\`\`text
        1
       / \
      2   3
     / \
    4   5
\`\`\`

---

# 2. RECURSIVE PREORDER TRAVERSAL

\`\`\`python
def preorder(node):
    if node is None:
        return  # Base Case: Empty subtree

    print(node.data)        # Process Root
    preorder(node.left)     # Recurse Left Subtree
    preorder(node.right)    # Recurse Right Subtree
\`\`\`

**Output for tree above:** \`1, 2, 4, 5, 3\`

---

# 3. LESSON SUMMARY

✓ Subtrees are smaller trees, making recursion perfect for trees.
✓ Base case occurs when \`node is None\`.`,
    codePreview: {
      code: `class TreeNode:\n    def __init__(self, d): self.data = d; self.left = self.right = None\n\nr = TreeNode(1); r.left = TreeNode(2); r.right = TreeNode(3)\n\ndef preorder(n):\n    if not n: return\n    print(n.data, end=" ")\n    preorder(n.left)\n    preorder(n.right)\n\npreorder(r)`,
      output: `1 2 3 `,
      caption: 'Recursive tree traversal'
    },
    glossary: [
      { term: 'Subtree', definition: 'A tree structure nested inside a node (left or right child).' }
    ],
    quizzes: [
      {
    question: '1. Why is recursion the primary method for processing tree data structures?',
    options: [
      'Because loops are forbidden in Python',
      'Because trees have no root',
      'Because trees are stored in arrays',
      'Because trees consist of nested subtrees of identical structure'
    ],
    correctAnswer: 3,
    explanation: 'Each child node forms a smaller subtree, making recursive divide-and-conquer natural.'
  }
    
    ],
    summaryPoints: [
      'Subtrees are smaller trees.',
      'Base case: node is None.',
      'Recurse left and right.'
    ],
    previousLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'recursion-with-linked-lists',
      title: 'Recursion with Linked Lists'
    },
    nextLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'recursion-vs-iteration',
      title: 'Recursion vs Iteration'
    }
  },

  // =========================================================================
  // SECTION 10 — RECURSION IN DATA STRUCTURES (LESSON 9: Recursion vs Iteration)
  // =========================================================================
  'ds-recursion/recursion-vs-iteration': {
    id: 'ds-recursion/recursion-vs-iteration',
    topicId: 'ds-recursion',
    subtopicId: 'recursion-vs-iteration',
    title: 'Recursion vs Iteration',
    subtitle: 'Comparing loops vs function calls, memory trade-offs, and scenario selection',
    categoryTitle: 'RECURSION IN DATA STRUCTURES',
    contentMarkdown: `# 1. RECURSION VS ITERATION COMPARISON

| Feature | Iteration | Recursion |
| :--- | :--- | :--- |
| **Control** | \`while\` or \`for\` loop | Function calls & Base Case |
| **Auxiliary Memory** | **$O(1)$** (No call stack) | **$O(n)$** (Stack frames allocated) |
| **Code Readability** | Better for simple lists | Better for trees & graphs |
| **Overhead** | Minimal loop state overhead | Function call frame overhead |

---

# 2. WHEN TO USE WHICH?

- **Use Iteration:** Simple sequential list scanning where memory is critical ($O(1)$ space).
- **Use Recursion:** Hierarchical structures (Trees, Graphs, Divide and Conquer algorithms).

---

# 3. LESSON SUMMARY

✓ Iteration uses loops ($O(1)$ space).
✓ Recursion uses function calls & call stack ($O(n)$ space).`,
    codePreview: {
      code: `# Iterative Countdown:\ni = 3\nwhile i > 0:\n    print(i); i -= 1\nprint("Iterative Done!")`,
      output: `3\n2\n1\nIterative Done!`,
      caption: 'Iterative loop comparison'
    },
    glossary: [
      { term: 'Iteration', definition: 'Repetitive execution controlled by loop constructs (for/while).' }
    ],
    quizzes: [
      {
    question: '1. What is the main memory advantage of Iteration over Recursion?',
    options: [
      'Recursion uses less memory',
      'Iteration uses O(1) auxiliary space, avoiding call stack frame overhead',
      'Both use equal memory',
      'Iteration uses O(n²) space'
    ],
    correctAnswer: 1,
    explanation: 'Iteration reuses local variables in a loop without pushing stack frames.'
  }
    
    ],
    summaryPoints: [
      'Iteration = loops, O(1) space.',
      'Recursion = stack frames, O(n) space.',
      'Choose based on problem structure.'
    ],
    previousLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'recursion-with-trees',
      title: 'Recursion with Trees'
    },
    nextLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'recursion-complexity',
      title: 'Recursion Complexity'
    }
  },

  // =========================================================================
  // SECTION 10 — RECURSION IN DATA STRUCTURES (LESSON 10: Recursion Complexity)
  // =========================================================================
  'ds-recursion/recursion-complexity': {
    id: 'ds-recursion/recursion-complexity',
    topicId: 'ds-recursion',
    subtopicId: 'recursion-complexity',
    title: 'Recursion Complexity',
    subtitle: 'Analyzing time complexity, call stack space depth, and RecursionError limits',
    categoryTitle: 'RECURSION IN DATA STRUCTURES',
    contentMarkdown: `# 1. RECURSIVE TIME & SPACE COMPLEXITY

- **Number of Calls:** How many recursive invocations occur?
- **Work per Call:** How much work happens inside one call?
- **Maximum Stack Depth:** What is the maximum number of simultaneous stack frames on the call stack?

\`\`\`text
Linear Recursion (countdown):     Time: O(n)     │  Stack Space: O(n)
Recursive Binary Search:          Time: O(log n) │  Stack Space: O(log n)
Merge Sort:                       Time: O(n log n)│ Stack Space: O(n)
\`\`\`

---

# 2. PYTHON RECURSION LIMIT

Exceeding Python's default recursion depth (~1,000 calls) triggers \`RecursionError: maximum recursion depth exceeded\`.

---

# 3. LESSON SUMMARY

✓ Time complexity = Total recursive calls $\\times$ Work per call.
✓ Space complexity = Maximum active stack depth.`,
    codePreview: {
      code: `import sys\nprint("Python default recursion limit:", sys.getrecursionlimit())`,
      output: `Python default recursion limit: 1000`,
      caption: 'Python default recursion depth limit'
    },
    glossary: [
      { term: 'RecursionError', definition: 'Python exception raised when maximum call stack depth limit is exceeded.' }
    ],
    quizzes: [
      {
    question: '1. What determines the auxiliary space complexity of a recursive algorithm?',
    options: [
      'The total printed lines',
      'The maximum active stack depth (number of simultaneous stack frames)',
      'The input array elements only',
      'The compiler version'
    ],
    correctAnswer: 1,
    explanation: 'Space complexity is governed by the peak number of stack frames coexisting on the call stack.'
  }
    
    ],
    summaryPoints: [
      'Time = Calls x Work per call.',
      'Space = Max stack depth.',
      'Python limit ~1000 calls.'
    ],
    previousLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'recursion-vs-iteration',
      title: 'Recursion vs Iteration'
    },
    nextLesson: {
      topicId: 'ds-trees',
      subtopicId: 'what-is-a-tree',
      title: 'What is a Tree?'
    }
  },
// =========================================================================
  // SECTION 11 — TREES (LESSON 1: Introduction to Trees)
  // =========================================================================
  'ds-trees/introduction-to-trees': {
    id: 'ds-trees/introduction-to-trees',
    topicId: 'ds-trees',
    subtopicId: 'introduction-to-trees',
    title: 'Introduction to Trees',
    subtitle: 'Understanding non-linear hierarchical branching structures',
    categoryTitle: 'TREES',
    contentMarkdown: `# 1. WHAT IS A TREE?

> 📌 **DEFINITION**
> **A Tree is a non-linear data structure made of nodes connected in a hierarchical parent-child relationship.**

\`\`\`text
            [A]  ──► ROOT NODE
           /   \\
         [B]   [C]
        /   \\
      [D]   [E]
\`\`\`

---

# 2. LINEAR VS NON-LINEAR

- **Linear (Arrays, Linked Lists):** Sequential $10 \to 20 \to 30 \to 40$.
- **Non-Linear (Trees):** One node can branch into multiple children!

---

# 3. LESSON SUMMARY

✓ Non-linear hierarchical structure.
✓ Nodes connect via edges to parent/child nodes.`,
    codePreview: {
      code: `class TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\n\nroot = TreeNode("A")\nroot.left = TreeNode("B")\nroot.right = TreeNode("C")\nprint("Root:", root.val, "| Left:", root.left.val, "| Right:", root.right.val)`,
      output: `Root: A | Left: B | Right: C`,
      caption: 'Creating a basic tree in Python'
    },
    glossary: [
      { term: 'Tree', definition: 'A non-linear hierarchical data structure consisting of connected nodes.' }
    ],
    quizzes: [
      {
    question: '1. Why are Trees classified as Non-Linear Data Structures?',
    options: [
      'Because they do not support search',
      'Because they use fixed arrays',
      'Because elements are ordered sequentially in memory',
      'Because a single node can branch into multiple child paths'
    ],
    correctAnswer: 3,
    explanation: 'Trees allow branching into left/right children, forming non-linear hierarchies.'
  }
    
    ],
    summaryPoints: [
      'Non-linear hierarchical structure.',
      'One root node at top.',
      'Nodes connect via parent-child edges.'
    ],
    previousLesson: {
      topicId: 'ds-recursion',
      subtopicId: 'recursion-complexity',
      title: 'Recursion Complexity'
    },
    nextLesson: {
      topicId: 'ds-trees',
      subtopicId: 'tree-terminology',
      title: 'Tree Terminology'
    }
  },

  // =========================================================================
  // SECTION 11 — TREES (LESSON 2: Tree Terminology)
  // =========================================================================
  'ds-trees/tree-terminology': {
    id: 'ds-trees/tree-terminology',
    topicId: 'ds-trees',
    subtopicId: 'tree-terminology',
    title: 'Tree Terminology',
    subtitle: 'Root, Parent, Child, Sibling, Leaf, Internal Node, Depth, and Height',
    categoryTitle: 'TREES',
    contentMarkdown: `# 1. KEY TREE TERMS

\`\`\`text
                [A]         ──► Root (Depth 0, Height 3)
              /     \\
            [B]     [C]     ──► Siblings (Depth 1)
           /   \\       \\
         [D]   [E]     [F]  ──► Internal Nodes (Depth 2)
              /
            [G]             ──► Leaf Node (Depth 3, Height 0)
\`\`\`

- **ROOT:** Topmost node with no parent (\`A\`).
- **PARENT & CHILD:** \`A\` is parent of \`B\` & \`C\`.
- **SIBLINGS:** Nodes with the same parent (\`B\` & \`C\`).
- **LEAF NODE:** Node with 0 children (\`D\`, \`G\`, \`F\`).
- **INTERNAL NODE:** Node with $\ge 1$ child (\`A\`, \`B\`, \`C\`, \`E\`).
- **DEPTH:** Edge count from Root to node (Root depth = 0).
- **HEIGHT:** Edge count on longest path from node to a leaf (Leaf height = 0).

---

# 2. LESSON SUMMARY

✓ **Depth:** Edges down from Root ($0 \to 1 \to 2$).
✓ **Height:** Longest edge path down to a Leaf ($0$ at leaf).`,
    codePreview: {
      code: `# Terminology Overview Print:\nprint("Root: Depth 0 | Leaf: Height 0")`,
      output: `Root: Depth 0 | Leaf: Height 0`,
      caption: 'Tree Depth and Height conventions'
    },
    glossary: [
      { term: 'Leaf Node', definition: 'A node with no children (0 child pointers).' },
      { term: 'Height', definition: 'Number of edges on the longest path from a node down to a leaf.' }
    ],
    quizzes: [
      {
    question: '1. What is the height of a leaf node under standard edge-based height convention?',
    options: [
      '1',
      '-1',
      '0',
      '2'
    ],
    correctAnswer: 2,
    explanation: 'A leaf node has 0 edges to itself, so its height is 0.'
  }
    
    ],
    summaryPoints: [
      'Root = topmost node.',
      'Leaf = no children.',
      'Depth: edges from Root.',
      'Height: edges to Leaf.'
    ],
    previousLesson: {
      topicId: 'ds-trees',
      subtopicId: 'introduction-to-trees',
      title: 'Introduction to Trees'
    },
    nextLesson: {
      topicId: 'ds-trees',
      subtopicId: 'types-of-trees',
      title: 'Types of Trees'
    }
  },

  // =========================================================================
  // SECTION 11 — TREES (LESSON 3: Types of Trees)
  // =========================================================================
  'ds-trees/types-of-trees': {
    id: 'ds-trees/types-of-trees',
    topicId: 'ds-trees',
    subtopicId: 'types-of-trees',
    title: 'Types of Trees',
    subtitle: 'General, Binary, Full, Complete, Perfect, Balanced, and Skewed Trees',
    categoryTitle: 'TREES',
    contentMarkdown: `# 1. TREE CATEGORIES

- **General Tree:** Nodes can have any number of children.
- **Binary Tree:** Nodes have at most **2 children** (Left & Right).
- **Full Binary Tree:** Nodes have either **0 or 2 children** (never 1).
- **Complete Binary Tree:** All levels filled except last level which fills **Left to Right**.
- **Perfect Binary Tree:** All internal nodes have 2 children AND all leaves are at same depth.
- **Skewed Tree:** Unbalanced linear chain ($O(n)$ height degradation like a linked list).

---

# 2. LESSON SUMMARY

✓ **Binary Tree:** Max 2 children.
✓ **Complete Tree:** Filled left-to-right on bottom level.
✓ **Skewed Tree:** Degenerates to $O(n)$ linear performance.`,
    codePreview: {
      code: `print("Binary: Max 2 children per node")\nprint("Complete: Left-to-right filling")`,
      output: `Binary: Max 2 children per node\nComplete: Left-to-right filling`,
      caption: 'Tree type classifications'
    },
    glossary: [
      { term: 'Complete Binary Tree', definition: 'A binary tree filled at all levels except possibly the last level which is filled left-to-right.' }
    ],
    quizzes: [
      {
    question: '1. What distinguishes a Full Binary Tree?',
    options: [
      'It contains no leaves',
      'It is skewed to the right',
      'Every node has either 0 or 2 children',
      'Every level is 100% filled'
    ],
    correctAnswer: 2,
    explanation: 'Full Binary Trees strictly require 0 or 2 children for every node.'
  }
    
    ],
    summaryPoints: [
      'Binary: Max 2 children.',
      'Full: 0 or 2 children.',
      'Complete: Filled left-to-right.'
    ],
    previousLesson: {
      topicId: 'ds-trees',
      subtopicId: 'tree-terminology',
      title: 'Tree Terminology'
    },
    nextLesson: {
      topicId: 'ds-trees',
      subtopicId: 'binary-trees',
      title: 'Binary Trees'
    }
  },

  // =========================================================================
  // SECTION 11 — TREES (LESSON 4: Binary Trees)
  // =========================================================================
  'ds-trees/binary-trees': {
    id: 'ds-trees/binary-trees',
    topicId: 'ds-trees',
    subtopicId: 'binary-trees',
    title: 'Binary Trees',
    subtitle: 'Node structure, left and right child pointers, Python class representation',
    categoryTitle: 'TREES',
    contentMarkdown: `# 1. BINARY TREE NODE STRUCTURE

\`\`\`python
class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None   # Pointer to Left Child
        self.right = None  # Pointer to Right Child
\`\`\`

\`\`\`text
            [10]
           /    \\
        [20]    [30]
        /  \\       \\
      [40] [50]    [60]
\`\`\`

---

# 2. LEFT AND RIGHT POSITIONS ARE DISTINCT

A node with only a **Left Child** is structurally distinct from a node with only a **Right Child**!

---

# 3. LESSON SUMMARY

✓ Max 2 children per node (\`left\` and \`right\`).
✓ Defined by \`TreeNode\` objects in Python.`,
    codePreview: {
      code: `class TreeNode:\n    def __init__(self, d): self.data = d; self.left = self.right = None\n\nroot = TreeNode(10)\nroot.left = TreeNode(20)\nroot.right = TreeNode(30)\nprint("Binary Tree Created:", root.data, "-> Left:", root.left.data, "Right:", root.right.data)`,
      output: `Binary Tree Created: 10 -> Left: 20 Right: 30`,
      caption: 'Binary Tree instantiation in Python'
    },
    glossary: [
      { term: 'Binary Tree Node', definition: 'An object containing value data, left child pointer, and right child pointer.' }
    ],
    quizzes: [
      {
    question: '1. What is the maximum number of children any node in a Binary Tree can have?',
    options: [
      '2',
      '1',
      'Unlimited',
      '4'
    ],
    correctAnswer: 0,
    explanation: 'By definition, Binary Tree nodes can have at most 2 children (left and right).'
  }
    
    ],
    summaryPoints: [
      'Max 2 children per node.',
      'Contains left & right pointers.',
      'Left and right positions are distinct.'
    ],
    previousLesson: {
      topicId: 'ds-trees',
      subtopicId: 'types-of-trees',
      title: 'Types of Trees'
    },
    nextLesson: {
      topicId: 'ds-trees',
      subtopicId: 'binary-search-trees',
      title: 'Binary Search Trees'
    }
  },

  // =========================================================================
  // SECTION 11 — TREES (LESSON 5: Binary Search Trees)
  // =========================================================================
  'ds-trees/binary-search-trees': {
    id: 'ds-trees/binary-search-trees',
    topicId: 'ds-trees',
    subtopicId: 'binary-search-trees',
    title: 'Binary Search Trees',
    subtitle: 'The BST Ordering Property: Left Subtree < Root < Right Subtree',
    categoryTitle: 'TREES',
    contentMarkdown: `# 1. THE BST PROPERTY

> 📌 **DEFINITION**
> **A Binary Search Tree (BST) is a Binary Tree where every node satisfies: ALL elements in its Left Subtree are smaller than the node, and ALL elements in its Right Subtree are larger than the node.**

\`\`\`text
              [50]
             /    \\
           [30]   [70]
          /   \\   /   \\
        [20] [40][60] [80]
\`\`\`

- **At Node 50:** Entire left subtree $\{20, 30, 40\} < 50$, entire right subtree $\{60, 70, 80\} > 50$.

---

# 2. LESSON SUMMARY

✓ **LEFT SUBTREE < NODE < RIGHT SUBTREE** across the entire tree!
✓ No duplicate values allowed in standard BST implementations.`,
    codePreview: {
      code: `print("BST Rule: Left Subtree < Node < Right Subtree")`,
      output: `BST Rule: Left Subtree < Node < Right Subtree`,
      caption: 'BST ordering rule'
    },
    glossary: [
      { term: 'Binary Search Tree (BST)', definition: 'A binary tree satisfying Left Subtree < Node < Right Subtree for all nodes.' }
    ],
    quizzes: [
      {
    question: '1. In a valid BST, where must values smaller than a node be located?',
    options: [
      'At the root only',
      'In its Left Subtree',
      'In its Right Subtree',
      'Anywhere in the tree'
    ],
    correctAnswer: 1,
    explanation: 'The BST rule mandates that all values in the Left Subtree must be smaller than the node.'
  }
    
    ],
    summaryPoints: [
      'Left Subtree < Node.',
      'Right Subtree > Node.',
      'Rule applies to ENTIRE subtrees.'
    ],
    previousLesson: {
      topicId: 'ds-trees',
      subtopicId: 'binary-trees',
      title: 'Binary Trees'
    },
    nextLesson: {
      topicId: 'ds-trees',
      subtopicId: 'bst-insertion',
      title: 'BST Insertion'
    }
  },

  // =========================================================================
  // SECTION 11 — TREES (LESSON 6: BST Insertion)
  // =========================================================================
  'ds-trees/bst-insertion': {
    id: 'ds-trees/bst-insertion',
    topicId: 'ds-trees',
    subtopicId: 'bst-insertion',
    title: 'BST Insertion',
    subtitle: 'Navigating comparisons from Root down to empty leaf slot for insertion',
    categoryTitle: 'TREES',
    contentMarkdown: `# 1. HOW BST INSERTION WORKS

To insert \`40\` into tree with Root \`50\` (L: \`30\`, R: \`70\`):
1. Compare $40 < 50$ ──► Go LEFT to Node \`30\`.
2. Compare $40 > 30$ ──► Go RIGHT to \`None\`.
3. \`None\` found ──► Insert \`40\` as right child of \`30\`!

\`\`\`python
def insert(root, value):
    if root is None:
        return TreeNode(value)

    if value < root.data:
        root.left = insert(root.left, value)
    elif value > root.data:
        root.right = insert(root.right, value)

    return root
\`\`\`

---

# 2. LESSON SUMMARY

✓ Compare value at root ──► Go Left if smaller, Right if larger.
✓ Insert new node when empty \`None\` position is reached.`,
    codePreview: {
      code: `def insert(root, val):\n    if not root: return TreeNode(val)\n    if val < root.data: root.left = insert(root.left, val)\n    elif val > root.data: root.right = insert(root.right, val)\n    return root\n\nprint("BST Insertion function ready.")`,
      output: `BST Insertion function ready.`,
      caption: 'Recursive BST Insertion'
    },
    glossary: [
      { term: 'BST Insertion', definition: 'Adding a new node at its correct leaf position while preserving BST ordering.' }
    ],
    quizzes: [
      {
    question: '1. Where is a new node inserted in a Binary Search Tree?',
    options: [
      'At index 0',
      'At an empty None spot at the leaves following the BST search path',
      'Always at the root',
      'Randomly'
    ],
    correctAnswer: 1,
    explanation: 'Insertion traverses down the tree until reaching a None pointer where the new leaf is attached.'
  }
    
    ],
    summaryPoints: [
      'Compare root: Left if <, Right if >.',
      'Insert at None position.',
      'Preserves BST property.'
    ],
    previousLesson: {
      topicId: 'ds-trees',
      subtopicId: 'binary-search-trees',
      title: 'Binary Search Trees'
    },
    nextLesson: {
      topicId: 'ds-trees',
      subtopicId: 'bst-searching',
      title: 'BST Searching'
    }
  },

  // =========================================================================
  // SECTION 11 — TREES (LESSON 7: BST Searching)
  // =========================================================================
  'ds-trees/bst-searching': {
    id: 'ds-trees/bst-searching',
    topicId: 'ds-trees',
    subtopicId: 'bst-searching',
    title: 'BST Searching',
    subtitle: 'Directional path navigation in O(log n) balanced time',
    categoryTitle: 'TREES',
    contentMarkdown: `# 1. PYTHON BST SEARCH CODE

\`\`\`python
def search(root, target):
    if root is None:
        return False  # Target Not Found

    if root.data == target:
        return True   # Target Found!

    if target < root.data:
        return search(root.left, target)
    else:
        return search(root.right, target)
\`\`\`

---

# 2. SEARCH PATH ADVANTAGE

To find \`60\` in a 7-node tree, BST only visits: $50 \to 70 \to 60$ (Only 3 checks instead of scanning all 7 nodes!).

---

# 3. LESSON SUMMARY

✓ Directional path eliminates unvisited subtrees.
✓ Returns \`True\`/\`False\` or node reference.`,
    codePreview: {
      code: `def search(root, t):\n    if not root: return False\n    if root.data == t: return True\n    return search(root.left, t) if t < root.data else search(root.right, t)\n\nprint("BST Search ready.")`,
      output: `BST Search ready.`,
      caption: 'BST Search implementation'
    },
    glossary: [
      { term: 'BST Search Path', definition: 'The unique sequence of visited nodes navigated during a search.' }
    ],
    quizzes: [
      {
    question: '1. What is the time complexity of searching in a balanced BST of n nodes?',
    options: [
      'O(1)',
      'O(log n)',
      'O(n log n)',
      'O(n²)'
    ],
    correctAnswer: 1,
    explanation: 'Balanced BST height is O(log n), so search requires at most log n node comparisons.'
  }
    
    ],
    summaryPoints: [
      'Eliminates irrelevant subtrees.',
      'Balanced search: O(log n).',
      'Follows directional left/right path.'
    ],
    previousLesson: {
      topicId: 'ds-trees',
      subtopicId: 'bst-insertion',
      title: 'BST Insertion'
    },
    nextLesson: {
      topicId: 'ds-trees',
      subtopicId: 'bst-deletion',
      title: 'BST Deletion'
    }
  },

  // =========================================================================
  // SECTION 11 — TREES (LESSON 8: BST Deletion)
  // =========================================================================
  'ds-trees/bst-deletion': {
    id: 'ds-trees/bst-deletion',
    topicId: 'ds-trees',
    subtopicId: 'bst-deletion',
    title: 'BST Deletion',
    subtitle: 'Handling the 3 deletion cases: Leaf, 1 Child, and 2 Children (Inorder Successor)',
    categoryTitle: 'TREES',
    contentMarkdown: `# 1. THE 3 DELETION CASES

- **CASE 1 (Leaf Node):** Node has 0 children ──► Remove node directly (\`return None\`).
- **CASE 2 (One Child):** Node has 1 child ──► Connect parent directly to child (\`return child\`).
- **CASE 3 (Two Children):** Node has 2 children:
  1. Find **Inorder Successor** (Smallest value in Right Subtree).
  2. Replace target node value with Successor value.
  3. Delete original Successor node from Right Subtree.

\`\`\`python
def find_min(node):
    while node.left: node = node.left
    return node
\`\`\`

---

# 2. LESSON SUMMARY

✓ Case 1: Leaf ──► Remove.
✓ Case 2: One Child ──► Bypass.
✓ Case 3: Two Children ──► Swap with Inorder Successor & delete successor.`,
    codePreview: {
      code: `def find_min(n):\n    while n.left: n = n.left\n    return n\n\nprint("Inorder Successor helper ready.")`,
      output: `Inorder Successor helper ready.`,
      caption: 'Finding Inorder Successor for Case 3 deletion'
    },
    glossary: [
      { term: 'Inorder Successor', definition: 'The smallest node value in a node\'s Right Subtree (leftmost node of right child).' }
    ],
    quizzes: [
      {
    question: '1. What replacement value is used when deleting a BST node with TWO children?',
    options: [
      'Any random leaf',
      'Its Inorder Successor (smallest in right subtree)',
      'Root node value',
      'Zero'
    ],
    correctAnswer: 1,
    explanation: 'Using the Inorder Successor guarantees that the BST ordering property remains preserved.'
  }
    
    ],
    summaryPoints: [
      'Case 1: Leaf -> Remove.',
      'Case 2: 1 Child -> Bypass.',
      'Case 3: 2 Children -> Inorder Successor.'
    ],
    previousLesson: {
      topicId: 'ds-trees',
      subtopicId: 'bst-searching',
      title: 'BST Searching'
    },
    nextLesson: {
      topicId: 'ds-trees',
      subtopicId: 'tree-traversals',
      title: 'Tree Traversals'
    }
  },

  // =========================================================================
  // SECTION 11 — TREES (LESSON 9: Tree Traversals)
  // =========================================================================
  'ds-trees/tree-traversals': {
    id: 'ds-trees/tree-traversals',
    topicId: 'ds-trees',
    subtopicId: 'tree-traversals',
    title: 'Tree Traversals',
    subtitle: 'Overview of DFS (Preorder, Inorder, Postorder) and BFS (Level Order)',
    categoryTitle: 'TREES',
    contentMarkdown: `# 1. TRAVERSAL STRATEGIES

> 📌 **DEFINITION**
> **Tree Traversal is the process of visiting every node in a tree exactly once in a specified sequence.**

- **PREORDER (DFS):** \`ROOT ──► LEFT ──► RIGHT\`
- **INORDER (DFS):** \`LEFT ──► ROOT ──► RIGHT\`
- **POSTORDER (DFS):** \`LEFT ──► RIGHT ──► ROOT\`
- **LEVEL ORDER (BFS):** Level by Level top-to-bottom using a **Queue**.

---

# 2. LESSON SUMMARY

✓ **Preorder:** Root first.
✓ **Inorder:** Root middle (Ascending sorted order for BST).
✓ **Postorder:** Root last.
✓ **Level Order:** Level-by-level (Queue).`,
    codePreview: {
      code: `print("Preorder:  Root -> Left -> Right")\nprint("Inorder:   Left -> Root -> Right")\nprint("Postorder: Left -> Right -> Root")`,
      output: `Preorder:  Root -> Left -> Right\nInorder:   Left -> Root -> Right\nPostorder: Left -> Right -> Root`,
      caption: 'Tree traversal ordering rules'
    },
    glossary: [
      { term: 'Tree Traversal', definition: 'Visiting every node in a tree structure in a deterministic order.' }
    ],
    quizzes: [
      {
    question: '1. Which tree traversal visits nodes level by level using a Queue data structure?',
    options: [
      'Inorder Traversal',
      'Level Order Traversal (BFS)',
      'Postorder Traversal',
      'Preorder Traversal'
    ],
    correctAnswer: 1,
    explanation: 'Level Order Traversal is a Breadth-First Search (BFS) using a FIFO Queue.'
  }
    
    ],
    summaryPoints: [
      'Preorder: Root -> Left -> Right.',
      'Inorder: Left -> Root -> Right.',
      'Postorder: Left -> Right -> Root.',
      'Level Order: Level-by-level.'
    ],
    previousLesson: {
      topicId: 'ds-trees',
      subtopicId: 'bst-deletion',
      title: 'BST Deletion'
    },
    nextLesson: {
      topicId: 'ds-trees',
      subtopicId: 'preorder-traversal',
      title: 'Preorder Traversal'
    }
  },

  // =========================================================================
  // SECTION 11 — TREES (LESSON 10: Preorder Traversal)
  // =========================================================================
  'ds-trees/preorder-traversal': {
    id: 'ds-trees/preorder-traversal',
    topicId: 'ds-trees',
    subtopicId: 'preorder-traversal',
    title: 'Preorder Traversal',
    subtitle: 'Root -> Left -> Right recursive processing and applications',
    categoryTitle: 'TREES',
    contentMarkdown: `# 1. PREORDER MECHANIC

Process **ROOT FIRST**, then Left Subtree, then Right Subtree!

\`\`\`python
def preorder(root):
    if root is None:
        return

    print(root.data)       # 1. PROCESS ROOT FIRST
    preorder(root.left)    # 2. RECURSE LEFT
    preorder(root.right)   # 3. RECURSE RIGHT
\`\`\`

**Output for 1 (L:2, R:3; 2->L:4, R:5):** \`1, 2, 4, 5, 3\`

---

# 2. LESSON SUMMARY

✓ Preorder processes Root before children.
✓ Useful for cloning tree structures.`,
    codePreview: {
      code: `def preorder(root):\n    if not root: return\n    print(root.data, end=" ")\n    preorder(root.left)\n    preorder(root.right)\n\nprint("Preorder ready.")`,
      output: `Preorder ready.`,
      caption: 'Preorder recursive traversal'
    },
    glossary: [
      { term: 'Preorder Traversal', definition: 'Depth-first traversal visiting Root -> Left Subtree -> Right Subtree.' }
    ],
    quizzes: [
      {
    question: '1. In Preorder Traversal, when is the root node processed?',
    options: [
      'First (before left and right subtrees)',
      'In the middle',
      'Last',
      'Randomly'
    ],
    correctAnswer: 0,
    explanation: 'Preorder visits Root FIRST before recursing on child subtrees.'
  }
    
    ],
    summaryPoints: [
      'Root -> Left -> Right.',
      'Processes Root first.',
      'Used for tree cloning.'
    ],
    previousLesson: {
      topicId: 'ds-trees',
      subtopicId: 'tree-traversals',
      title: 'Tree Traversals'
    },
    nextLesson: {
      topicId: 'ds-trees',
      subtopicId: 'inorder-traversal',
      title: 'Inorder Traversal'
    }
  },

  // =========================================================================
  // SECTION 11 — TREES (LESSON 11: Inorder Traversal)
  // =========================================================================
  'ds-trees/inorder-traversal': {
    id: 'ds-trees/inorder-traversal',
    topicId: 'ds-trees',
    subtopicId: 'inorder-traversal',
    title: 'Inorder Traversal',
    subtitle: 'Left -> Root -> Right traversal and BST sorted ascending order guarantee',
    categoryTitle: 'TREES',
    contentMarkdown: `# 1. INORDER MECHANIC

Process Left Subtree, **ROOT IN MIDDLE**, Right Subtree!

\`\`\`python
def inorder(root):
    if root is None:
        return

    inorder(root.left)     # 1. RECURSE LEFT
    print(root.data)       # 2. PROCESS ROOT IN MIDDLE
    inorder(root.right)    # 3. RECURSE RIGHT
\`\`\`

> 💡 **CRITICAL BST PROPERTY**
> **Performing Inorder Traversal on a BST visits elements in ASCENDING SORTED ORDER!**
> E.g. BST with $\{50, 30, 70, 20, 40, 60, 80\}$ yields \`20, 30, 40, 50, 60, 70, 80\`!

---

# 2. LESSON SUMMARY

✓ Inorder: \`Left ──► Root ──► Right\`.
✓ Produces sorted ascending output for BSTs.`,
    codePreview: {
      code: `def inorder(root):\n    if not root: return\n    inorder(root.left)\n    print(root.data, end=" ")\n    inorder(root.right)\n\nprint("Inorder BST sorted traversal ready.")`,
      output: `Inorder BST sorted traversal ready.`,
      caption: 'Inorder BST traversal'
    },
    glossary: [
      { term: 'Inorder Traversal', definition: 'Depth-first traversal visiting Left Subtree -> Root -> Right Subtree.' }
    ],
    quizzes: [
      {
    question: '1. What sequence is produced when performing Inorder Traversal on a valid BST?',
    options: [
      'Ascending sorted order of all values',
      'Descending order',
      'Level order',
      'Random order'
    ],
    correctAnswer: 0,
    explanation: 'Because Left < Node < Right, Inorder traversal visits BST elements in ascending sorted order.'
  }
    
    ],
    summaryPoints: [
      'Left -> Root -> Right.',
      'BST Inorder = Ascending Sorted Order!',
      'Root processed in middle.'
    ],
    previousLesson: {
      topicId: 'ds-trees',
      subtopicId: 'preorder-traversal',
      title: 'Preorder Traversal'
    },
    nextLesson: {
      topicId: 'ds-trees',
      subtopicId: 'postorder-traversal',
      title: 'Postorder Traversal'
    }
  },

  // =========================================================================
  // SECTION 11 — TREES (LESSON 12: Postorder Traversal)
  // =========================================================================
  'ds-trees/postorder-traversal': {
    id: 'ds-trees/postorder-traversal',
    topicId: 'ds-trees',
    subtopicId: 'postorder-traversal',
    title: 'Postorder Traversal',
    subtitle: 'Left -> Right -> Root traversal and bottom-up leaf deletion',
    categoryTitle: 'TREES',
    contentMarkdown: `# 1. POSTORDER MECHANIC

Process Left Subtree, Right Subtree, then **ROOT LAST**!

\`\`\`python
def postorder(root):
    if root is None:
        return

    postorder(root.left)    # 1. RECURSE LEFT
    postorder(root.right)   # 2. RECURSE RIGHT
    print(root.data)        # 3. PROCESS ROOT LAST
\`\`\`

---

# 2. WHY POSTORDER?

Bottom-up processing: Children are processed before their parent, making Postorder perfect for **deleting trees** or evaluating mathematical syntax trees.

---

# 3. LESSON SUMMARY

✓ Left ──► Right ──► Root last.
✓ Ideal for bottom-up operations like tree deletion.`,
    codePreview: {
      code: `def postorder(root):\n    if not root: return\n    postorder(root.left)\n    postorder(root.right)\n    print(root.data, end=" ")\n\nprint("Postorder traversal ready.")`,
      output: `Postorder traversal ready.`,
      caption: 'Postorder recursive traversal'
    },
    glossary: [
      { term: 'Postorder Traversal', definition: 'Depth-first traversal visiting Left Subtree -> Right Subtree -> Root.' }
    ],
    quizzes: [
      {
    question: '1. In Postorder Traversal, when is the root node processed?',
    options: [
      'First',
      'Last (after processing both left and right subtrees)',
      'In the middle',
      'Never'
    ],
    correctAnswer: 1,
    explanation: 'Postorder processes children first, processing the root node LAST.'
  }
    
    ],
    summaryPoints: [
      'Left -> Right -> Root.',
      'Root processed last.',
      'Ideal for bottom-up operations.'
    ],
    previousLesson: {
      topicId: 'ds-trees',
      subtopicId: 'inorder-traversal',
      title: 'Inorder Traversal'
    },
    nextLesson: {
      topicId: 'ds-trees',
      subtopicId: 'level-order-traversal',
      title: 'Level Order Traversal'
    }
  },

  // =========================================================================
  // SECTION 11 — TREES (LESSON 13: Level Order Traversal)
  // =========================================================================
  'ds-trees/level-order-traversal': {
    id: 'ds-trees/level-order-traversal',
    topicId: 'ds-trees',
    subtopicId: 'level-order-traversal',
    title: 'Level Order Traversal',
    subtitle: 'Breadth-First Search (BFS) level by level using a Queue',
    categoryTitle: 'TREES',
    contentMarkdown: `# 1. LEVEL ORDER TRAVERSAL (BFS)

Level Order visits nodes **Level by Level** top-to-bottom using a **FIFO Queue**.

\`\`\`python
from collections import deque

def level_order(root):
    if root is None:
        return

    queue = deque([root])
    while queue:
        node = queue.popleft()
        print(node.data, end=" ")

        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
\`\`\`

**Output for 1 (L:2, R:3; 2->L:4, R:5):** \`1, 2, 3, 4, 5\`

---

# 2. LESSON SUMMARY

✓ Level-by-level traversal.
✓ Uses FIFO Queue (\`deque\`).`,
    codePreview: {
      code: `from collections import deque\nprint("Level Order BFS queue implementation ready.")`,
      output: `Level Order BFS queue implementation ready.`,
      caption: 'Level Order BFS with Queue'
    },
    glossary: [
      { term: 'Level Order Traversal', definition: 'Breadth-first traversal visiting nodes level by level using a FIFO Queue.' }
    ],
    quizzes: [
      {
    question: '1. What data structure is used to implement Level Order Traversal?',
    options: [
      'Hash Table',
      'Array only',
      'Queue (FIFO)',
      'Stack (LIFO)'
    ],
    correctAnswer: 2,
    explanation: 'Level Order Traversal requires a FIFO Queue to enqueue children level by level.'
  }
    
    ],
    summaryPoints: [
      'Visits level by level.',
      'Uses FIFO Queue.',
      'Breadth-First Search (BFS).'
    ],
    previousLesson: {
      topicId: 'ds-trees',
      subtopicId: 'postorder-traversal',
      title: 'Postorder Traversal'
    },
    nextLesson: {
      topicId: 'ds-trees',
      subtopicId: 'tree-complexity',
      title: 'Tree Complexity'
    }
  },

  // =========================================================================
  // SECTION 11 — TREES (LESSON 14: Tree Complexity)
  // =========================================================================
  'ds-trees/tree-complexity': {
    id: 'ds-trees/tree-complexity',
    topicId: 'ds-trees',
    subtopicId: 'tree-complexity',
    title: 'Tree Complexity',
    subtitle: 'Balanced BST O(log n) vs Skewed BST O(n) degradation and traversal space',
    categoryTitle: 'TREES',
    contentMarkdown: `# 1. BST COMPLEXITY MATRIX

| Operation | Balanced BST | Skewed BST |
| :--- | :--- | :--- |
| **Search** | **O(log n)** | **O(n)** |
| **Insert** | **O(log n)** | **O(n)** |
| **Delete** | **O(log n)** | **O(n)** |
| **Traversals (All)** | **O(n)** | **O(n)** |
| **DFS Stack Space** | **O(log n)** | **O(n)** |

---

# 2. WHY BALANCING MATTERS

- **Balanced Tree:** Height $h \approx \log_2 n$ ──► Fast $O(\log n)$ operations!
- **Skewed Tree:** Height $h = n$ ──► Degenerates into a linked list ($O(n)$ time!).

---

# 3. LESSON SUMMARY

✓ Balanced BST operations run in $O(\log n)$ time.
✓ Skewed BST degrades to $O(n)$ linear time.
✓ All traversals visit every node in $O(n)$ time.`,
    codePreview: {
      code: `print("Balanced BST: O(log n) Search/Insert/Delete")\nprint("Skewed BST:   O(n) Linear Degradation")`,
      output: `Balanced BST: O(log n) Search/Insert/Delete\nSkewed BST:   O(n) Linear Degradation`,
      caption: 'Tree complexity summary'
    },
    glossary: [
      { term: 'Skewed Tree Degradation', definition: 'The performance drop from O(log n) to O(n) when a BST loses branch balance.' }
    ],
    quizzes: [
      {
    question: '1. What is the worst-case time complexity of searching in a Skewed BST?',
    options: [
      'O(1)',
      'O(log n)',
      'O(n²)',
      'O(n)'
    ],
    correctAnswer: 3,
    explanation: 'A Skewed BST resembles a linked list of height n, requiring O(n) worst-case search time.'
  }
    
    ],
    summaryPoints: [
      'Balanced BST = O(log n) operations.',
      'Skewed BST = O(n) linear time.',
      'All traversals visit all nodes in O(n).'
    ],
    previousLesson: {
      topicId: 'ds-trees',
      subtopicId: 'level-order-traversal',
      title: 'Level Order Traversal'
    },
    nextLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'what-is-a-heap',
      title: 'What is a Heap?'
    }
  },
// =========================================================================
  // SECTION 12 — HEAPS (LESSON 1: Introduction to Heaps)
  // =========================================================================
  'ds-heaps/introduction-to-heaps': {
    id: 'ds-heaps/introduction-to-heaps',
    topicId: 'ds-heaps',
    subtopicId: 'introduction-to-heaps',
    title: 'Introduction to Heaps',
    subtitle: 'Understanding Complete Binary Trees with parent-child ordering properties',
    categoryTitle: 'HEAPS',
    contentMarkdown: `# 1. WHAT IS A HEAP?

> 📌 **DEFINITION**
> **A Heap is a Complete Binary Tree that satisfies a specific parent-child ordering property.**

\`\`\`text
            [10]  ──► ROOT (MINIMUM ELEMENT)
           /    \\
        [20]    [30]
        /  \\    /
      [40] [50][60]
\`\`\`

---

# 2. TWO MANDATORY REQUIREMENTS

1. **STRUCTURE PROPERTY:** Must be a **Complete Binary Tree** (all levels filled except last, which fills left-to-right).
2. **ORDER PROPERTY:** Parent-child ordering (**Min Heap:** $Parent \le Children$, **Max Heap:** $Parent \ge Children$).

---

# 3. LESSON SUMMARY

✓ Complete Binary Tree + Heap Ordering Property.
✓ Min Heap keeps minimum at root; Max Heap keeps maximum at root.`,
    codePreview: {
      code: `import heapq\nheap = [10, 20, 15, 40, 50, 30]\nheapq.heapify(heap)\nprint("Min Heap Root (minimum):", heap[0])`,
      output: `Min Heap Root (minimum): 10`,
      caption: 'Python heapq Min Heap root access'
    },
    glossary: [
      { term: 'Heap', definition: 'A Complete Binary Tree satisfying a parent-child heap ordering property.' }
    ],
    quizzes: [
      {
    question: '1. What two properties must any valid Binary Heap satisfy?',
    options: [
      'Full Tree shape AND Stack order',
      'Binary Search Tree rule AND Array sorting',
      'Balanced height AND Graph connectivity',
      'Complete Binary Tree shape property AND Parent-Child heap order property'
    ],
    correctAnswer: 3,
    explanation: 'Heaps require complete binary tree shape AND parent-child order.'
  }
    
    ],
    summaryPoints: [
      'Complete Binary Tree shape.',
      'Parent-child ordering rule.',
      'Root holds min or max.'
    ],
    previousLesson: {
      topicId: 'ds-trees',
      subtopicId: 'tree-complexity',
      title: 'Tree Complexity'
    },
    nextLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'heap-properties',
      title: 'Heap Properties'
    }
  },

  // =========================================================================
  // SECTION 12 — HEAPS (LESSON 2: Heap Properties)
  // =========================================================================
  'ds-heaps/heap-properties': {
    id: 'ds-heaps/heap-properties',
    topicId: 'ds-heaps',
    subtopicId: 'heap-properties',
    title: 'Heap Properties',
    subtitle: 'Shape property (Complete Tree) and Order property (Partial ordering)',
    categoryTitle: 'HEAPS',
    contentMarkdown: `# 1. SHAPE PROPERTY VS ORDER PROPERTY

- **Shape Property:** The tree must be a **Complete Binary Tree**.
- **Order Property:** Ordering holds only between **Parents and Children**.

> ⚠️ **IMPORTANT DISTINCTION**
> **A Heap is PARTIALLY ORDERED, NOT fully sorted!**
> Siblings do NOT need to be ordered. E.g. in a Min Heap, left child \`20\` can be larger than right child \`15\` as long as both are $\ge$ Root \`10\`!

---

# 2. LESSON SUMMARY

✓ Complete tree shape fills left-to-right.
✓ Parent-child ordering holds; siblings remain unordered.`,
    codePreview: {
      code: `print("Heap = Complete Tree Shape + Parent-Child Order (Partially Ordered)")`,
      output: `Heap = Complete Tree Shape + Parent-Child Order (Partially Ordered)`,
      caption: 'Partial ordering of heaps'
    },
    glossary: [
      { term: 'Partial Ordering', definition: 'Ordering relationship enforced strictly between parents and children, not across siblings.' }
    ],
    quizzes: [
      {
    question: '1. In a valid Min Heap, is it required that the left child be smaller than the right child?',
    options: [
      'No, heap ordering is enforced between parents and children, not siblings',
      'Only at depth 1',
      'Yes, right must always be smaller',
      'Yes, left must always be smaller'
    ],
    correctAnswer: 0,
    explanation: 'Heaps enforce parent-child order only; siblings have no relative ordering requirement.'
  }
    
    ],
    summaryPoints: [
      'Shape: Complete tree.',
      'Order: Parent-child relationship.',
      'Partially ordered, not sorted.'
    ],
    previousLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'introduction-to-heaps',
      title: 'Introduction to Heaps'
    },
    nextLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'min-heap',
      title: 'Min Heap'
    }
  },

  // =========================================================================
  // SECTION 12 — HEAPS (LESSON 3: Min Heap)
  // =========================================================================
  'ds-heaps/min-heap': {
    id: 'ds-heaps/min-heap',
    topicId: 'ds-heaps',
    subtopicId: 'min-heap',
    title: 'Min Heap',
    subtitle: 'Parent <= Children rule, minimum element at root',
    categoryTitle: 'HEAPS',
    contentMarkdown: `# 1. MIN HEAP RULE

> 📌 **PERMANENT RULE**
> **In a Min Heap: $Parent \le Children$. The ROOT contains the MINIMUM element of the entire heap.**

\`\`\`text
              [10]  ──► MINIMUM AT ROOT
            /      \\
          [20]     [15]
         /   \\     /   \\
       [40] [30] [25] [50]
\`\`\`

- Check: $10 \le 20$, $10 \le 15$, $20 \le 40$, $20 \le 30$, $15 \le 25$, $15 \le 50$. All valid!

---

# 2. LESSON SUMMARY

✓ $Parent \le Children$.
✓ Minimum element is always at \`heap[0]\`.`,
    codePreview: {
      code: `min_heap = [10, 20, 15, 40, 30]\nprint("Root (minimum):", min_heap[0])`,
      output: `Root (minimum): 10`,
      caption: 'Min Heap root property'
    },
    glossary: [
      { term: 'Min Heap', definition: 'A complete binary tree where every parent node is less than or equal to its children.' }
    ],
    quizzes: [
      {
    question: '1. What element is guaranteed to reside at index 0 (root) of a Min Heap?',
    options: [
      'The minimum element in the heap',
      'The maximum element in the heap',
      'The median element',
      'The last inserted element'
    ],
    correctAnswer: 0,
    explanation: 'Min Heap ordering places the smallest element at the root.'
  }
    
    ],
    summaryPoints: [
      'Parent <= Children.',
      'Root holds minimum value.',
      'Instant O(1) min access.'
    ],
    previousLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'heap-properties',
      title: 'Heap Properties'
    },
    nextLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'max-heap',
      title: 'Max Heap'
    }
  },

  // =========================================================================
  // SECTION 12 — HEAPS (LESSON 4: Max Heap)
  // =========================================================================
  'ds-heaps/max-heap': {
    id: 'ds-heaps/max-heap',
    topicId: 'ds-heaps',
    subtopicId: 'max-heap',
    title: 'Max Heap',
    subtitle: 'Parent >= Children rule, maximum element at root',
    categoryTitle: 'HEAPS',
    contentMarkdown: `# 1. MAX HEAP RULE

> 📌 **PERMANENT RULE**
> **In a Max Heap: $Parent \ge Children$. The ROOT contains the MAXIMUM element of the entire heap.**

\`\`\`text
              [90]  ──► MAXIMUM AT ROOT
            /      \\
          [70]     [80]
         /   \\     /   \\
       [20] [60] [50] [40]
\`\`\`

---

# 2. LESSON SUMMARY

✓ $Parent \ge Children$.
✓ Maximum element is always at \`heap[0]\`.`,
    codePreview: {
      code: `max_heap = [90, 70, 80, 20, 60]\nprint("Root (maximum):", max_heap[0])`,
      output: `Root (maximum): 90`,
      caption: 'Max Heap root property'
    },
    glossary: [
      { term: 'Max Heap', definition: 'A complete binary tree where every parent node is greater than or equal to its children.' }
    ],
    quizzes: [
      {
    question: '1. In a Max Heap, what relationship holds between parent node P and child C?',
    options: [
      'P == C only',
      'P < C',
      'P >= C',
      'P <= C'
    ],
    correctAnswer: 2,
    explanation: 'Max Heap requires parent P to be greater than or equal to child C.'
  }
    
    ],
    summaryPoints: [
      'Parent >= Children.',
      'Root holds maximum value.',
      'Instant O(1) max access.'
    ],
    previousLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'min-heap',
      title: 'Min Heap'
    },
    nextLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'array-representation-of-heap',
      title: 'Array Representation of Heap'
    }
  },

  // =========================================================================
  // SECTION 12 — HEAPS (LESSON 5: Array Representation of Heap)
  // =========================================================================
  'ds-heaps/array-representation-of-heap': {
    id: 'ds-heaps/array-representation-of-heap',
    topicId: 'ds-heaps',
    subtopicId: 'array-representation-of-heap',
    title: 'Array Representation of Heap',
    subtitle: 'Zero-based array mapping, level-order storage, and index calculation formulas',
    categoryTitle: 'HEAPS',
    contentMarkdown: `# 1. LEVEL-ORDER ARRAY STORAGE

Because a heap is a **Complete Binary Tree**, it can be stored in a contiguous array without child pointers!

\`\`\`text
TREE:          [10]             (Level 0)
             /      \\
          [20]      [30]        (Level 1)
         /    \\    /    \\
       [40]  [50][60]   [70]    (Level 2)

ARRAY: [10, 20, 30, 40, 50, 60, 70]
INDEX:   0   1   2   3   4   5   6
\`\`\`

---

# 2. INDEX FORMULAS (For node at index $i$)

- **LEFT CHILD:** $2i + 1$
- **RIGHT CHILD:** $2i + 2$
- **PARENT:** $(i - 1) // 2$

---

# 3. LESSON SUMMARY

✓ Zero-based array mapping.
✓ No explicit pointers required!`,
    codePreview: {
      code: `i = 1  # Node 20 at index 1\nleft = 2 * i + 1   # Index 3 (val 40)\nright = 2 * i + 2  # Index 4 (val 50)\nparent = (i - 1) // 2  # Index 0 (val 10)\nprint(f"Index {i}: Left={left}, Right={right}, Parent={parent}")`,
      output: `Index 1: Left=3, Right=4, Parent=0`,
      caption: 'Heap index formula calculation'
    },
    glossary: [
      { term: 'Heap Index Formulas', definition: 'Mathematical equations mapping tree parents and children to array indices.' }
    ],
    quizzes: [
      {
    question: '1. For a node at index i in a zero-based heap array, what is the index of its Left Child?',
    options: [
      '2 * i',
      '2 * i + 2',
      '2 * i + 1',
      '(i - 1) // 2'
    ],
    correctAnswer: 2,
    explanation: 'In zero-based arrays, Left Child = 2 * i + 1.'
  }
    
    ],
    summaryPoints: [
      'Level-order array mapping.',
      'Left = 2i + 1.',
      'Right = 2i + 2.',
      'Parent = (i - 1) // 2.'
    ],
    previousLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'max-heap',
      title: 'Max Heap'
    },
    nextLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'heap-insertion',
      title: 'Heap Insertion'
    }
  },

  // =========================================================================
  // SECTION 12 — HEAPS (LESSON 6: Heap Insertion)
  // =========================================================================
  'ds-heaps/heap-insertion': {
    id: 'ds-heaps/heap-insertion',
    topicId: 'ds-heaps',
    subtopicId: 'heap-insertion',
    title: 'Heap Insertion',
    subtitle: 'Inserting at array end and bubbling upward via Heapify Up (Sift Up)',
    categoryTitle: 'HEAPS',
    contentMarkdown: `# 1. HEAP INSERTION ALGORITHM

1. **INSERT AT END:** Append new element to array end (\`heap.append(val)\`).
2. **COMPARE WITH PARENT:** If heap property violated, **SWAP UP**.
3. **REPEAT (Heapify Up):** Continue swapping until parent $\le$ child (for Min Heap) or root reached.

\`\`\`python
def insert_min_heap(heap, value):
    heap.append(value)
    index = len(heap) - 1
    
    # Heapify Up (Sift Up)
    while index > 0:
        parent = (index - 1) // 2
        if heap[parent] <= heap[index]:
            break
        heap[parent], heap[index] = heap[index], heap[parent]
        index = parent
\`\`\`

---

# 2. LESSON SUMMARY

✓ Append at array end ──► Heapify Up.
✓ $O(\log n)$ time complexity.`,
    codePreview: {
      code: `def insert_min(heap, val):\n    heap.append(val)\n    idx = len(heap) - 1\n    while idx > 0:\n        p = (idx - 1) // 2\n        if heap[p] <= heap[idx]: break\n        heap[p], heap[idx] = heap[idx], heap[p]\n        idx = p\n\nh = [10, 20, 30]\ninsert_min(h, 15)\nprint("Heap after insert 15:", h)`,
      output: `Heap after insert 15: [10, 15, 30, 20]`,
      caption: 'Min Heap insertion with Heapify Up'
    },
    glossary: [
      { term: 'Heapify Up (Sift Up)', definition: 'Blinking an inserted node upward by swapping with its parent until heap property is restored.' }
    ],
    quizzes: [
      {
    question: '1. What is the time complexity of inserting an element into a Binary Heap of n items?',
    options: [
      'O(1)',
      'O(n²)',
      'O(log n)',
      'O(n)'
    ],
    correctAnswer: 2,
    explanation: 'Heapify Up traverses at most the height of the complete tree (log n steps).'
  }
    
    ],
    summaryPoints: [
      'Append at array end.',
      'Heapify Up (swap with parent).',
      'Runs in O(log n) time.'
    ],
    previousLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'array-representation-of-heap',
      title: 'Array Representation of Heap'
    },
    nextLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'heap-deletion',
      title: 'Heap Deletion'
    }
  },

  // =========================================================================
  // SECTION 12 — HEAPS (LESSON 7: Heap Deletion)
  // =========================================================================
  'ds-heaps/heap-deletion': {
    id: 'ds-heaps/heap-deletion',
    topicId: 'ds-heaps',
    subtopicId: 'heap-deletion',
    title: 'Heap Deletion',
    subtitle: 'Deleting root, replacing with last element, and Heapify Down (Sift Down)',
    categoryTitle: 'HEAPS',
    contentMarkdown: `# 1. ROOT DELETION ALGORITHM

1. **EXTRACT ROOT:** Save \`root = heap[0]\`.
2. **MOVE LAST TO ROOT:** Replace \`heap[0] = heap.pop()\`.
3. **HEAPIFY DOWN (Sift Down):** Compare root with children. For Min Heap, swap with **SMALLER CHILD** if violated!

\`\`\`python
def delete_min(heap):
    if not heap: return None
    minimum = heap[0]
    last = heap.pop()
    if heap:
        heap[0] = last
        heapify_down(heap, 0)
    return minimum
\`\`\`

---

# 2. WHY SMALLER CHILD FOR MIN HEAP?

Swapping with the smaller child ensures the new parent is $\le$ BOTH children!

---

# 3. LESSON SUMMARY

✓ Replace root with last element ──► Heapify Down.
✓ For Min Heap: Swap with **smaller child**.
✓ For Max Heap: Swap with **larger child**.`,
    codePreview: {
      code: `def delete_min(h):\n    if not h: return None\n    m = h[0]\n    l = h.pop()\n    if h: h[0] = l; # heapify_down(h, 0)\n    return m\n\nprint("Delete root min heap ready.")`,
      output: `Delete root min heap ready.`,
      caption: 'Min Heap root deletion'
    },
    glossary: [
      { term: 'Heapify Down (Sift Down)', definition: 'Restoring heap property by swapping a node downward with its appropriate child.' }
    ],
    quizzes: [
      {
    question: '1. In a Min Heap, which child should be selected when swapping downward during Heapify Down?',
    options: [
      'The smaller child of the two',
      'Always the right child',
      'Always the left child',
      'The larger child of the two'
    ],
    correctAnswer: 0,
    explanation: 'Swapping with the smaller child ensures the new parent is smaller than both left and right children.'
  }
    
    ],
    summaryPoints: [
      'Replace root with last item.',
      'Heapify Down.',
      'Min Heap: swap with smaller child.',
      'Max Heap: swap with larger child.'
    ],
    previousLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'heap-insertion',
      title: 'Heap Insertion'
    },
    nextLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'heapify',
      title: 'Heapify'
    }
  },

  // =========================================================================
  // SECTION 12 — HEAPS (LESSON 8: Heapify)
  // =========================================================================
  'ds-heaps/heapify': {
    id: 'ds-heaps/heapify',
    topicId: 'ds-heaps',
    subtopicId: 'heapify',
    title: 'Heapify',
    subtitle: 'Comparing Heapify Up vs Heapify Down restoration procedures',
    categoryTitle: 'HEAPS',
    contentMarkdown: `# 1. HEAPIFY UP VS HEAPIFY DOWN

| Procedure | Trigger | Comparison | Direction |
| :--- | :--- | :--- | :--- |
| **Heapify Up (Sift Up)** | Element inserted at array end | Compare node with **Parent** | Bottom $\to$ Top |
| **Heapify Down (Sift Down)** | Root replaced after deletion | Compare node with **Children** | Top $\to$ Bottom |

---

# 2. LESSON SUMMARY

✓ **Heapify Up:** Swaps with Parent going up.
✓ **Heapify Down:** Swaps with appropriate Child going down.`,
    codePreview: {
      code: `print("Heapify Up: Parent comparison (Bottom-Up)")\nprint("Heapify Down: Child comparison (Top-Down)")`,
      output: `Heapify Up: Parent comparison (Bottom-Up)\nHeapify Down: Child comparison (Top-Down)`,
      caption: 'Heapify comparison'
    },
    glossary: [
      { term: 'Heapify', definition: 'The core restoration procedure maintaining parent-child heap ordering.' }
    ],
    quizzes: [
      {
    question: '1. When is Heapify Down used?',
    options: [
      'Never',
      'After inserting at the end',
      'Only when searching',
      'After replacing root during root deletion'
    ],
    correctAnswer: 3,
    explanation: 'Replacing root with last element disrupts the root, requiring Heapify Down to restore order.'
  }
    
    ],
    summaryPoints: [
      'Up: Inserted item -> Parent.',
      'Down: Replaced root -> Children.',
      'Both run in O(log n) time.'
    ],
    previousLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'heap-deletion',
      title: 'Heap Deletion'
    },
    nextLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'building-a-heap',
      title: 'Building a Heap'
    }
  },

  // =========================================================================
  // SECTION 12 — HEAPS (LESSON 9: Building a Heap)
  // =========================================================================
  'ds-heaps/building-a-heap': {
    id: 'ds-heaps/building-a-heap',
    topicId: 'ds-heaps',
    subtopicId: 'building-a-heap',
    title: 'Building a Heap',
    subtitle: 'Bottom-up heap construction starting from last non-leaf node in O(n) linear time',
    categoryTitle: 'HEAPS',
    contentMarkdown: `# 1. BOTTOM-UP BUILD HEAP

To convert an arbitrary un-ordered array into a valid heap:
1. **LEAF NODES:** Already satisfy heap property individually (ignore leaves!).
2. **LAST NON-LEAF NODE:** Start at index $i = n // 2 - 1$.
3. **HEAPIFY DOWNWARD:** Loop $i$ from $n // 2 - 1$ down to $0$, calling \`heapify_down(arr, i)\`.

\`\`\`python
def build_min_heap(arr):
    n = len(arr)
    # Start from last non-leaf node down to index 0
    for i in range(n // 2 - 1, -1, -1):
        heapify_down(arr, n, i)
\`\`\`

---

# 2. WHY IS BUILD HEAP O(n)?

Most nodes are near the bottom (leaves require 0 work, level above requires 1 swap). The sum of heights converges to **$O(n)$ Linear Time**!

---

# 3. LESSON SUMMARY

✓ Start at last non-leaf: \`n // 2 - 1\`.
✓ Bottom-up construction runs in **$O(n)$ time**.`,
    codePreview: {
      code: `def build_heap(arr):\n    n = len(arr)\n    for i in range(n // 2 - 1, -1, -1):\n        pass # heapify_down(arr, n, i)\n    print("Build Heap O(n) initialization ready.")\n\nbuild_heap([40, 10, 30, 50, 60, 15])`,
      output: `Build Heap O(n) initialization ready.`,
      caption: 'Bottom-up Build Heap in O(n) time'
    },
    glossary: [
      { term: 'Last Non-Leaf Index', definition: 'The index n//2 - 1 representing the deepest node in an array heap that possesses children.' }
    ],
    quizzes: [
      {
    question: '1. What is the time complexity of bottom-up Build Heap on an un-ordered array of n items?',
    options: [
      'O(n²)',
      'O(1)',
      'O(n) Linear Time',
      'O(n log n)'
    ],
    correctAnswer: 2,
    explanation: 'Bottom-up Build Heap runs in O(n) linear time because most nodes are near the bottom requiring minimal swaps.'
  }
    
    ],
    summaryPoints: [
      'Last non-leaf: n // 2 - 1.',
      'Heapify down toward index 0.',
      'Runs in O(n) linear time.'
    ],
    previousLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'heapify',
      title: 'Heapify'
    },
    nextLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'heap-sort',
      title: 'Heap Sort'
    }
  },

  // =========================================================================
  // SECTION 12 — HEAPS (LESSON 10: Heap Sort)
  // =========================================================================
  'ds-heaps/heap-sort': {
    id: 'ds-heaps/heap-sort',
    topicId: 'ds-heaps',
    subtopicId: 'heap-sort',
    title: 'Heap Sort',
    subtitle: 'Building a Max Heap and repeatedly extracting root to produce sorted output in O(n log n)',
    categoryTitle: 'HEAPS',
    contentMarkdown: `# 1. HEAP SORT ALGORITHM

For ascending sort order:
1. **BUILD MAX HEAP:** Convert array into a Max Heap in $O(n)$ time.
2. **EXTRACT ROOT:** Swap root \`arr[0]\` (largest item) with last element \`arr[end]\`.
3. **SHRINK HEAP:** Exclude last element from active heap.
4. **HEAPIFY ROOT:** Call \`heapify_down(arr, end, 0)\`.
5. **REPEAT:** Continue until array is sorted!

\`\`\`python
def heap_sort(arr):
    n = len(arr)
    # Step 1: Build Max Heap
    for i in range(n // 2 - 1, -1, -1):
        heapify_max(arr, n, i)
        
    # Step 2: Extract root to end
    for end in range(n - 1, 0, -1):
        arr[0], arr[end] = arr[end], arr[0]
        heapify_max(arr, end, 0)  # Active heap size shrinks to end!
\`\`\`

---

# 2. LESSON SUMMARY

✓ Build Max Heap ──► Swap root to end ──► Heapify active region.
✓ Guaranteed **$O(n \log n)$** time and **$O(1)$** auxiliary space!`,
    codePreview: {
      code: `def heap_sort_demo(arr):\n    print("Heap Sort: Build Max Heap -> Extract root to end -> O(n log n)")\n\nheap_sort_demo([4, 10, 3, 5, 1])`,
      output: `Heap Sort: Build Max Heap -> Extract root to end -> O(n log n)`,
      caption: 'Heap Sort execution overview'
    },
    glossary: [
      { term: 'Heap Sort', definition: 'In-place sorting algorithm utilizing Max Heap root extraction in O(n log n) time.' }
    ],
    quizzes: [
      {
    question: '1. Which heap type is built to achieve ASCENDING order using Heap Sort?',
    options: [
      'Max Heap',
      'Skewed Heap',
      'Min Heap',
      'Binary Search Tree'
    ],
    correctAnswer: 0,
    explanation: 'Max Heap places the largest item at root, allowing it to be swapped directly into the end of the array.'
  }
    
    ],
    summaryPoints: [
      'Build Max Heap first.',
      'Swap root to end.',
      'Shrink active heap size.',
      'Guaranteed O(n log n) time.'
    ],
    previousLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'building-a-heap',
      title: 'Building a Heap'
    },
    nextLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'heap-complexity',
      title: 'Heap Complexity'
    }
  },

  // =========================================================================
  // SECTION 12 — HEAPS (LESSON 11: Heap Complexity)
  // =========================================================================
  'ds-heaps/heap-complexity': {
    id: 'ds-heaps/heap-complexity',
    topicId: 'ds-heaps',
    subtopicId: 'heap-complexity',
    title: 'Heap Complexity',
    subtitle: 'Master heap operation complexity table and Heap vs BST comparison',
    categoryTitle: 'HEAPS',
    contentMarkdown: `# 1. HEAP COMPLEXITY MASTER TABLE

| Operation | Time Complexity | Space Complexity |
| :--- | :--- | :--- |
| **Root Access (Min/Max)** | **O(1)** | **O(1)** |
| **Insert Element** | **O(log n)** | **O(1)** |
| **Delete Root** | **O(log n)** | **O(1)** |
| **Heapify Up / Down** | **O(log n)** | **O(1)** |
| **Build Heap** | **O(n)** | **O(1)** |
| **Heap Sort** | **O(n log n)** | **O(1)** |
| **Search Arbitrary Key** | **O(n)** (Linear scan required!) | **O(1)** |

---

# 2. HEAP VS BST

- **Heap:** Instant $O(1)$ root access for priority operations. Searching arbitrary items takes $O(n)$.
- **BST:** Search arbitrary items in $O(\log n)$ directional path time.

---

# 3. LESSON SUMMARY

✓ Root min/max access: $O(1)$.
✓ Insert / Delete Root: $O(\log n)$.
✓ Build Heap: $O(n)$.
✓ Heap Sort: $O(n \log n)$.`,
    codePreview: {
      code: `print("Root Access: O(1)")\nprint("Insert/Delete: O(log n)")\nprint("Build Heap:  O(n)")\nprint("Heap Sort:   O(n log n)")`,
      output: `Root Access: O(1)\nInsert/Delete: O(log n)\nBuild Heap:  O(n)\nHeap Sort:   O(n log n)`,
      caption: 'Heap operational complexity'
    },
    glossary: [
      { term: 'Heap Complexity', definition: 'Theoretical efficiency bounds governing binary heap operations.' }
    ],
    quizzes: [
      {
    question: '1. What is the time complexity of searching for an ARBITRARY key in a Binary Heap?',
    options: [
      'O(log n)',
      'O(n log n)',
      'O(1)',
      'O(n) Linear scan'
    ],
    correctAnswer: 3,
    explanation: 'Heaps do not enforce left/right search ordering, so arbitrary search requires scanning all n array items.'
  }
    
    ],
    summaryPoints: [
      'O(1) Root access.',
      'O(log n) Insert/Delete.',
      'O(n) Build Heap.',
      'O(n log n) Heap Sort.'
    ],
    previousLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'heap-sort',
      title: 'Heap Sort'
    },
    nextLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'what-is-a-graph',
      title: 'What is a Graph?'
    }
  },
// =========================================================================
  // SECTION 13 — GRAPHS (LESSON 1: Introduction to Graphs)
  // =========================================================================
  'ds-graphs/introduction-to-graphs': {
    id: 'ds-graphs/introduction-to-graphs',
    topicId: 'ds-graphs',
    subtopicId: 'introduction-to-graphs',
    title: 'Introduction to Graphs',
    subtitle: 'Understanding Vertices, Edges, and non-linear network topologies',
    categoryTitle: 'GRAPHS',
    contentMarkdown: `# 1. WHAT IS A GRAPH?

> 📌 **DEFINITION**
> **A Graph is a non-linear data structure consisting of Vertices (nodes) connected by Edges (relationships).**

\`\`\`text
         [A] ───────── [B]
          │             │
          │             │
         [C] ───────── [D]
\`\`\`

- **VERTICES ($V$):** Entities/points (\`A\`, \`B\`, \`C\`, \`D\`).
- **EDGES ($E$):** Connections between vertices (\`A-B\`, \`A-C\`, \`B-D\`, \`C-D\`).

---

# 2. GRAPH VS TREE

- **Tree:** Hierarchical, single root, parent-child, acyclic.
- **Graph:** General network, multiple paths, cycles allowed, disconnected components allowed.

---

# 3. LESSON SUMMARY

✓ $Graph = Vertices + Edges$.
✓ Represents complex network relationships.`,
    codePreview: {
      code: `vertices = ["A", "B", "C", "D"]\nedges = [("A","B"), ("A","C"), ("B","D"), ("C","D")]\nprint("Graph created with V =", len(vertices), "and E =", len(edges))`,
      output: `Graph created with V = 4 and E = 4`,
      caption: 'Representing Vertices and Edges in Python'
    },
    glossary: [
      { term: 'Graph', definition: 'A set of vertices connected by edges forming a network.' }
    ],
    quizzes: [
      {
    question: '1. What two components compose every Graph data structure?',
    options: [
      'Keys and Values only',
      'Root and Children only',
      'Pointers and Memory offsets',
      'Vertices (nodes) and Edges (connections)'
    ],
    correctAnswer: 3,
    explanation: 'Graphs strictly consist of Vertices V and Edges E.'
  }
    
    ],
    summaryPoints: [
      'Vertices = Points/Nodes.',
      'Edges = Connections.',
      'A tree is a specialized acyclic graph.'
    ],
    previousLesson: {
      topicId: 'ds-heaps',
      subtopicId: 'heap-complexity',
      title: 'Heap Complexity'
    },
    nextLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'graph-terminology',
      title: 'Graph Terminology'
    }
  },

  // =========================================================================
  // SECTION 13 — GRAPHS (LESSON 2: Graph Terminology)
  // =========================================================================
  'ds-graphs/graph-terminology': {
    id: 'ds-graphs/graph-terminology',
    topicId: 'ds-graphs',
    subtopicId: 'graph-terminology',
    title: 'Graph Terminology',
    subtitle: 'Adjacent Vertices, Neighbors, Degree, Paths, Cycles, and Connected Components',
    categoryTitle: 'GRAPHS',
    contentMarkdown: `# 1. ESSENTIAL GRAPH TERMINOLOGY

- **ADJACENT VERTICES / NEIGHBORS:** Vertices directly connected by an edge. If edge \`A-B\` exists, \`A\` & \`B\` are adjacent.
- **DEGREE:** Number of edges connected to a vertex. \`Degree(A) = 2\`.
- **PATH:** Sequence of connected vertices ($A \to B \to D$). Length = number of edges.
- **CYCLE:** A path starting and ending at the same vertex ($A \to B \to D \to C \to A$).
- **CONNECTED COMPONENT:** A maximal connected subgraph in an undirected graph.

---

# 2. LESSON SUMMARY

✓ Neighbors = Directly connected vertices.
✓ Degree = Connected edge count.
✓ Cycle = Path returning to start.`,
    codePreview: {
      code: `neighbors_A = ["B", "C"]\ndegree_A = len(neighbors_A)\nprint("Neighbors of A:", neighbors_A, "| Degree:", degree_A)`,
      output: `Neighbors of A: ['B', 'C'] | Degree: 2`,
      caption: 'Neighbors and Vertex Degree in Python'
    },
    glossary: [
      { term: 'Degree', definition: 'The total number of edges connected to a given vertex.' }
    ],
    quizzes: [
      {
    question: '1. What is a Cycle in a graph?',
    options: [
      'An edge with weight zero',
      'A closed path that starts and ends at the exact same vertex',
      'A tree root node',
      'A disconnected vertex with 0 edges'
    ],
    correctAnswer: 1,
    explanation: 'A cycle is a path of connected edges that loops back to its starting vertex.'
  }
    
    ],
    summaryPoints: [
      'Adjacent = Direct connection.',
      'Degree = Neighbor count.',
      'Cycle = Closed loop.'
    ],
    previousLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'introduction-to-graphs',
      title: 'Introduction to Graphs'
    },
    nextLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'types-of-graphs',
      title: 'Types of Graphs'
    }
  },

  // =========================================================================
  // SECTION 13 — GRAPHS (LESSON 3: Types of Graphs)
  // =========================================================================
  'ds-graphs/types-of-graphs': {
    id: 'ds-graphs/types-of-graphs',
    topicId: 'ds-graphs',
    subtopicId: 'types-of-graphs',
    title: 'Types of Graphs',
    subtitle: 'Undirected, Directed (In/Out Degree), Weighted, Cyclic, and Acyclic Graphs',
    categoryTitle: 'GRAPHS',
    contentMarkdown: `# 1. GRAPH CLASSIFICATIONS

- **Undirected Graph:** Edges are bidirectional ($A \leftrightarrow B$).
- **Directed Graph (Digraph):** Edges have direction ($A \to B$).
  - **In-Degree:** Number of incoming edges to a vertex.
  - **Out-Degree:** Number of outgoing edges from a vertex.
- **Weighted Graph:** Edges store values (cost, distance, latency).
- **Cyclic vs Acyclic:** Graph containing loops vs loop-free topology.

---

# 2. LESSON SUMMARY

✓ Undirected (bidirectional) vs Directed (one-way).
✓ Weighted (edge costs) vs Unweighted.`,
    codePreview: {
      code: `directed_edges = {"A": ["B"], "B": []}  # A -> B\nprint("A -> B (In-degree B = 1, Out-degree A = 1)")`,
      output: `A -> B (In-degree B = 1, Out-degree A = 1)`,
      caption: 'Directed graph degree'
    },
    glossary: [
      { term: 'In-Degree', definition: 'The number of incoming directed edges pointing to a vertex.' }
    ],
    quizzes: [
      {
    question: '1. What distinguishes a Directed Graph from an Undirected Graph?',
    options: [
      'All edge weights are equal to 1',
      'Edges have a specific one-way direction (from source to target)',
      'It must be a complete binary tree',
      'It contains no vertices'
    ],
    correctAnswer: 1,
    explanation: 'Directed graphs restrict edge traversal to the specified arrow direction.'
  }
    
    ],
    summaryPoints: [
      'Undirected = Two-way.',
      'Directed = One-way arrows.',
      'Weighted = Edges hold costs.'
    ],
    previousLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'graph-terminology',
      title: 'Graph Terminology'
    },
    nextLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'graph-representation',
      title: 'Graph Representation'
    }
  },

  // =========================================================================
  // SECTION 13 — GRAPHS (LESSON 4: Graph Representation)
  // =========================================================================
  'ds-graphs/graph-representation': {
    id: 'ds-graphs/graph-representation',
    topicId: 'ds-graphs',
    subtopicId: 'graph-representation',
    title: 'Graph Representation',
    subtitle: 'Overview of Adjacency Matrix and Adjacency List in memory',
    categoryTitle: 'GRAPHS',
    contentMarkdown: `# 1. STORING GRAPHS IN MEMORY

- **Adjacency Matrix:** A $V \times V$ 2D matrix where \`matrix[i][j] = 1\` if an edge exists.
- **Adjacency List:** A dictionary/array mapping each vertex to its list of neighboring vertices.

---

# 2. LESSON SUMMARY

✓ Matrix = $V \times V$ 2D table.
✓ List = Dictionary of neighbor arrays.`,
    codePreview: {
      code: `adj_list = {"A": ["B", "C"], "B": ["A"], "C": ["A"]}\nprint("Adjacency List for A:", adj_list["A"])`,
      output: `Adjacency List for A: ['B', 'C']`,
      caption: 'Adjacency List in Python'
    },
    glossary: [
      { term: 'Graph Representation', definition: 'The data structure format used to represent graph vertices and edges in computer memory.' }
    ],
    quizzes: [
      {
    question: '1. What are the two primary data structures used to represent graphs in memory?',
    options: [
      'Array and Hash Set',
      'Binary Tree and Heap',
      'Stack and Queue',
      'Adjacency Matrix and Adjacency List'
    ],
    correctAnswer: 3,
    explanation: 'Adjacency Matrix (2D table) and Adjacency List (dict of arrays) are the standard graph representations.'
  }
    
    ],
    summaryPoints: [
      'Adjacency Matrix: 2D table.',
      'Adjacency List: Dict of lists.',
      'Chosen based on space & lookup needs.'
    ],
    previousLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'types-of-graphs',
      title: 'Types of Graphs'
    },
    nextLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'adjacency-matrix',
      title: 'Adjacency Matrix'
    }
  },

  // =========================================================================
  // SECTION 13 — GRAPHS (LESSON 5: Adjacency Matrix)
  // =========================================================================
  'ds-graphs/adjacency-matrix': {
    id: 'ds-graphs/adjacency-matrix',
    topicId: 'ds-graphs',
    subtopicId: 'adjacency-matrix',
    title: 'Adjacency Matrix',
    subtitle: 'V x V 2D matrix representation, O(1) edge lookup, and O(V^2) space cost',
    categoryTitle: 'GRAPHS',
    contentMarkdown: `# 1. ADJACENCY MATRIX STRUCTURE

For graph with 3 vertices $A, B, C$ and edges $A-B, A-C$:

\`\`\`text
      A  B  C
A   [ 0  1  1 ]
B   [ 1  0  0 ]
C   [ 1  0  0 ]
\`\`\`

- **PRO:** Instant **$O(1)$ edge existence check** (\`matrix[u][v] == 1\`).
- **CON:** Always uses **$O(V^2)$ memory space**, even for sparse graphs with very few edges.

---

# 2. LESSON SUMMARY

✓ \`matrix[i][j] == 1\` indicates edge.
✓ $O(1)$ edge lookup, $O(V^2)$ space.`,
    codePreview: {
      code: `matrix = [\n    [0, 1, 1],\n    [1, 0, 0],\n    [1, 0, 0]\n]\nprint("Edge A-B exists:", matrix[0][1] == 1)`,
      output: `Edge A-B exists: True`,
      caption: 'Adjacency Matrix O(1) lookup in Python'
    },
    glossary: [
      { term: 'Adjacency Matrix', definition: 'A V x V boolean/numeric grid storing edge connections between vertex pairs.' }
    ],
    quizzes: [
      {
    question: '1. What is the space complexity of storing a graph with V vertices using an Adjacency Matrix?',
    options: [
      'O(E)',
      'O(V + E)',
      'O(V)',
      'O(V²)'
    ],
    correctAnswer: 3,
    explanation: 'Adjacency Matrix always allocates a V x V grid requiring O(V²) space.'
  }
    
    ],
    summaryPoints: [
      'V x V 2D grid.',
      'Instant O(1) edge check.',
      'O(V²) space requirement.'
    ],
    previousLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'graph-representation',
      title: 'Graph Representation'
    },
    nextLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'adjacency-list',
      title: 'Adjacency List'
    }
  },

  // =========================================================================
  // SECTION 13 — GRAPHS (LESSON 6: Adjacency List)
  // =========================================================================
  'ds-graphs/adjacency-list': {
    id: 'ds-graphs/adjacency-list',
    topicId: 'ds-graphs',
    subtopicId: 'adjacency-list',
    title: 'Adjacency List',
    subtitle: 'Dictionary mapping vertices to neighbor lists in O(V + E) space',
    categoryTitle: 'GRAPHS',
    contentMarkdown: `# 1. ADJACENCY LIST STRUCTURE

\`\`\`python
graph = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "E"],
    "D": ["B"],
    "E": ["C"]
}
\`\`\`

- **PRO:** **$O(V + E)$ Space Efficiency** (only stores existing edges!).
- **PRO:** Fast iteration over a vertex's neighbors.

---

# 2. LESSON SUMMARY

✓ Ideal for **Sparse Graphs** ($E \ll V^2$).
✓ Uses $O(V + E)$ memory space.`,
    codePreview: {
      code: `graph = {"A": ["B", "C"], "B": ["A"]}\nprint("Neighbors of A:", graph["A"])`,
      output: `Neighbors of A: ['B', 'C']`,
      caption: 'Adjacency List dictionary'
    },
    glossary: [
      { term: 'Adjacency List', definition: 'A graph representation storing each vertex with an array of its actual adjacent neighbors.' }
    ],
    quizzes: [
      {
    question: '1. What is the space complexity of an Adjacency List for V vertices and E edges?',
    options: [
      'O(E²)',
      'O(V + E)',
      'O(1)',
      'O(V²)'
    ],
    correctAnswer: 1,
    explanation: 'Adjacency Lists store V vertex entries and E edge connections, taking O(V + E) space.'
  }
    
    ],
    summaryPoints: [
      'Dict of neighbor lists.',
      'O(V + E) space efficient.',
      'Optimal for sparse graphs.'
    ],
    previousLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'adjacency-matrix',
      title: 'Adjacency Matrix'
    },
    nextLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'breadth-first-search',
      title: 'Breadth-First Search (BFS)'
    }
  },

  // =========================================================================
  // SECTION 13 — GRAPHS (LESSON 7: Breadth-First Search (BFS))
  // =========================================================================
  'ds-graphs/breadth-first-search': {
    id: 'ds-graphs/breadth-first-search',
    topicId: 'ds-graphs',
    subtopicId: 'breadth-first-search',
    title: 'Breadth-First Search (BFS)',
    subtitle: 'Level-by-level traversal using FIFO Queue and Visited Set',
    categoryTitle: 'GRAPHS',
    contentMarkdown: `# 1. BFS ALGORITHM

1. **INITIALIZE:** Enqueue start vertex into a **FIFO Queue** and add to **Visited Set**.
2. **DEQUEUE & PROCESS:** Pop vertex from queue front.
3. **ENQUEUE UNVISITED NEIGHBORS:** For each neighbor not in Visited Set, mark visited and enqueue!
4. **REPEAT** until queue is empty.

\`\`\`python
from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])

    while queue:
        vertex = queue.popleft()
        print(vertex)

        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
\`\`\`

---

# 2. KEY ADVANTAGE

BFS finds the **SHORTEST PATH** (minimum edge count) in unweighted graphs!

---

# 3. LESSON SUMMARY

✓ Uses **FIFO Queue** + **Visited Set**.
✓ Level-by-level traversal in $O(V + E)$ time.`,
    codePreview: {
      code: `from collections import deque\nprint("BFS FIFO Queue implementation ready.")`,
      output: `BFS FIFO Queue implementation ready.`,
      caption: 'BFS with Queue and Visited Set'
    },
    glossary: [
      { term: 'BFS Traversal', definition: 'Layer-by-layer graph exploration starting from a source vertex using a FIFO Queue.' }
    ],
    quizzes: [
      {
    question: '1. What data structure is fundamental to Breadth-First Search (BFS)?',
    options: [
      'Array Matrix',
      'LIFO Stack',
      'Priority Queue',
      'FIFO Queue'
    ],
    correctAnswer: 3,
    explanation: 'BFS processes vertices level by level using a FIFO Queue.'
  }
    
    ],
    summaryPoints: [
      'Level-by-level layer traversal.',
      'Uses FIFO Queue & Visited Set.',
      'Finds unweighted shortest paths.'
    ],
    previousLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'adjacency-list',
      title: 'Adjacency List'
    },
    nextLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'depth-first-search',
      title: 'Depth-First Search (DFS)'
    }
  },

  // =========================================================================
  // SECTION 13 — GRAPHS (LESSON 8: Depth-First Search (DFS))
  // =========================================================================
  'ds-graphs/depth-first-search': {
    id: 'ds-graphs/depth-first-search',
    topicId: 'ds-graphs',
    subtopicId: 'depth-first-search',
    title: 'Depth-First Search (DFS)',
    subtitle: 'Deep path exploration and backtracking using Call Stack / LIFO Stack',
    categoryTitle: 'GRAPHS',
    contentMarkdown: `# 1. DFS ALGORITHM

1. **GO DEEP:** Mark current vertex as visited and recurse deeply down an unvisited neighbor path.
2. **BACKTRACK:** When a dead-end (no unvisited neighbors) is reached, return back to previous frame and explore alternate paths!

\`\`\`python
def dfs(graph, vertex, visited=None):
    if visited is None:
        visited = set()

    visited.add(vertex)
    print(vertex)

    for neighbor in graph[vertex]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
\`\`\`

---

# 2. LESSON SUMMARY

✓ Uses **Call Stack / Recursion** (or explicit LIFO Stack).
✓ Explores deeply before backtracking in $O(V + E)$ time.`,
    codePreview: {
      code: `def dfs(graph, v, visited=set()):\n    visited.add(v)\n    print(v, end=" ")\n    for n in graph[v]:\n        if n not in visited: dfs(graph, n, visited)\n\nprint("DFS recursive depth exploration ready.")`,
      output: `DFS recursive depth exploration ready.`,
      caption: 'Recursive DFS implementation'
    },
    glossary: [
      { term: 'DFS Traversal', definition: 'Deep path traversal exploring as far as possible along each branch before backtracking.' }
    ],
    quizzes: [
      {
    question: '1. What happens when DFS reaches a vertex with no unvisited neighbors?',
    options: [
      'It backtracks to the previous frame on the call stack',
      'The algorithm crashes',
      'It resets to vertex 0',
      'It clears the visited set'
    ],
    correctAnswer: 0,
    explanation: 'Reaching a dead-end triggers backtracking to explore remaining unvisited neighbor branches.'
  }
    
    ],
    summaryPoints: [
      'Explores deeply then backtracks.',
      'Uses Recursion / Call Stack.',
      'Visited Set prevents infinite loops.'
    ],
    previousLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'breadth-first-search',
      title: 'Breadth-First Search (BFS)'
    },
    nextLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'bfs-vs-dfs',
      title: 'BFS vs DFS'
    }
  },

  // =========================================================================
  // SECTION 13 — GRAPHS (LESSON 9: BFS vs DFS)
  // =========================================================================
  'ds-graphs/bfs-vs-dfs': {
    id: 'ds-graphs/bfs-vs-dfs',
    topicId: 'ds-graphs',
    subtopicId: 'bfs-vs-dfs',
    title: 'BFS vs DFS',
    subtitle: 'Comparing traversal patterns, data structures, and shortest path guarantees',
    categoryTitle: 'GRAPHS',
    contentMarkdown: `# 1. BFS VS DFS MASTER COMPARISON

| Feature | Breadth-First Search (BFS) | Depth-First Search (DFS) |
| :--- | :--- | :--- |
| **Strategy** | Level-by-level (outward expansion) | Deep branch path $\to$ Backtrack |
| **Data Structure** | **FIFO Queue** | **LIFO Stack / Call Stack** |
| **Shortest Path** | Guarantees shortest unweighted path | Does NOT guarantee shortest path |
| **Time Complexity** | **O(V + E)** | **O(V + E)** |
| **Space Complexity** | **O(V)** | **O(V)** |

---

# 2. LESSON SUMMARY

✓ **BFS:** Queue $\to$ Level-by-level $\to$ Shortest path.
✓ **DFS:** Stack $\to$ Deep branch $\to$ Backtracking.`,
    codePreview: {
      code: `print("BFS: FIFO Queue -> Level-by-Level -> Shortest Path")\nprint("DFS: LIFO Stack -> Deep Path -> Backtrack")`,
      output: `BFS: FIFO Queue -> Level-by-Level -> Shortest Path\nDFS: LIFO Stack -> Deep Path -> Backtrack`,
      caption: 'BFS vs DFS summary'
    },
    glossary: [
      { term: 'Traversal Strategy', definition: 'The systematic methodology used to visit graph vertices (level-wise vs depth-wise).' }
    ],
    quizzes: [
      {
    question: '1. Which algorithm guarantees finding the shortest path (minimum edges) in an unweighted graph?',
    options: [
      'Preorder Traversal',
      'Linear Search',
      'Breadth-First Search (BFS)',
      'Depth-First Search (DFS)'
    ],
    correctAnswer: 2,
    explanation: 'BFS explores outward level-by-level, guaranteeing that the first time a target is reached, it is via the shortest edge path.'
  }
    
    ],
    summaryPoints: [
      'BFS: FIFO Queue (Level-wise).',
      'DFS: LIFO Stack (Depth-wise).',
      'Both run in O(V + E) time.'
    ],
    previousLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'depth-first-search',
      title: 'Depth-First Search (DFS)'
    },
    nextLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'connected-components',
      title: 'Connected Components'
    }
  },

  // =========================================================================
  // SECTION 13 — GRAPHS (LESSON 10: Connected Components)
  // =========================================================================
  'ds-graphs/connected-components': {
    id: 'ds-graphs/connected-components',
    topicId: 'ds-graphs',
    subtopicId: 'connected-components',
    title: 'Connected Components',
    subtitle: 'Counting and identifying isolated subgraphs using outer loop BFS/DFS',
    categoryTitle: 'GRAPHS',
    contentMarkdown: `# 1. FINDING CONNECTED COMPONENTS

1. Maintain an outer loop iterating over **all vertices**.
2. If vertex is **unvisited**, increment component count and launch a full BFS/DFS traversal to mark all reachable vertices in that component.

\`\`\`python
def count_components(graph):
    visited = set()
    count = 0
    for vertex in graph:
        if vertex not in visited:
            dfs_component(graph, vertex, visited)
            count += 1
    return count
\`\`\`

---

# 2. LESSON SUMMARY

✓ Outer loop over all vertices.
✓ Count increments per unvisited traversal launch.`,
    codePreview: {
      code: `def count_comp(graph):\n    visited = set()\n    count = 0\n    for v in graph:\n        if v not in visited:\n            # run traversal\n            visited.add(v)\n            count += 1\n    return count\n\nprint("Connected Components algorithm ready.")`,
      output: `Connected Components algorithm ready.`,
      caption: 'Connected components counting'
    },
    glossary: [
      { term: 'Connected Component', definition: 'A maximal set of vertices in an undirected graph such that every pair is connected by a path.' }
    ],
    quizzes: [
      {
    question: '1. How are Connected Components identified in an undirected graph?',
    options: [
      'By calculating binary tree height',
      'By counting total edges',
      'By sorting the adjacency matrix',
      'By iterating over all vertices and launching BFS/DFS for every unvisited vertex'
    ],
    correctAnswer: 3,
    explanation: 'Launching a traversal for each unvisited vertex explores and marks one full component.'
  }
    
    ],
    summaryPoints: [
      'Outer loop over vertices.',
      'Each new traversal = 1 component.',
      'Runs in O(V + E) total time.'
    ],
    previousLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'bfs-vs-dfs',
      title: 'BFS vs DFS'
    },
    nextLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'cycle-detection',
      title: 'Cycle Detection'
    }
  },

  // =========================================================================
  // SECTION 13 — GRAPHS (LESSON 11: Cycle Detection)
  // =========================================================================
  'ds-graphs/cycle-detection': {
    id: 'ds-graphs/cycle-detection',
    topicId: 'ds-graphs',
    subtopicId: 'cycle-detection',
    title: 'Cycle Detection',
    subtitle: 'Detecting loops in undirected graphs using DFS parent tracking',
    categoryTitle: 'GRAPHS',
    contentMarkdown: `# 1. CYCLE DETECTION IN UNDIRECTED GRAPHS

In an undirected graph, a cycle exists if DFS encounters an **already visited neighbor** that is **NOT the parent vertex**!

\`\`\`python
def has_cycle(graph):
    visited = set()

    def dfs(vertex, parent):
        visited.add(vertex)
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                if dfs(neighbor, vertex): return True
            elif neighbor != parent: # CYCLE DETECTED!
                return True
        return False

    for v in graph:
        if v not in visited:
            if dfs(v, None): return True
    return False
\`\`\`

---

# 2. WHY PARENT TRACKING MATTERS

In undirected edge $A - B$, traversing $A \to B$ means $B$ sees neighbor $A$. Without checking \`neighbor != parent\`, $A$ would be falsely flagged as a cycle!

---

# 3. LESSON SUMMARY

✓ Visited neighbor AND \`neighbor != parent\` $\implies$ **Cycle Detected**!`,
    codePreview: {
      code: `print("Cycle Condition (Undirected): Neighbor in Visited AND Neighbor != Parent")`,
      output: `Cycle Condition (Undirected): Neighbor in Visited AND Neighbor != Parent`,
      caption: 'Undirected cycle detection rule'
    },
    glossary: [
      { term: 'Parent Tracking', definition: 'Passing the immediate predecessor vertex during DFS to avoid false cycle detection in undirected edges.' }
    ],
    quizzes: [
      {
    question: '1. Why is parent tracking required during cycle detection in an UNDIRECTED graph?',
    options: [
      'To count vertex degree',
      'To avoid falsely treating the bidirectional edge back to the immediate parent as a cycle',
      'To calculate path length',
      'To sort the adjacency list'
    ],
    correctAnswer: 1,
    explanation: 'Undirected edge A-B allows moving A->B, so B seeing parent A is normal, not a cycle.'
  }
    
    ],
    summaryPoints: [
      'Track (vertex, parent).',
      'Visited neighbor != Parent => Cycle!',
      'Runs in O(V + E) time.'
    ],
    previousLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'connected-components',
      title: 'Connected Components'
    },
    nextLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'graph-applications',
      title: 'Graph Applications'
    }
  },

  // =========================================================================
  // SECTION 13 — GRAPHS (LESSON 12: Graph Applications)
  // =========================================================================
  'ds-graphs/graph-applications': {
    id: 'ds-graphs/graph-applications',
    topicId: 'ds-graphs',
    subtopicId: 'graph-applications',
    title: 'Graph Applications',
    subtitle: 'Real-world networks: Social Networks, Road Maps, Web Links, and Dependencies',
    categoryTitle: 'GRAPHS',
    contentMarkdown: `# 1. REAL-WORLD GRAPH DOMAINS

- **Social Networks:** Vertices = Users, Edges = Friendships ($A \leftrightarrow B$).
- **GPS Road Maps:** Vertices = Cities/Intersections, Weighted Edges = Distance/Time.
- **World Wide Web:** Vertices = Web Pages, Directed Edges = Hyperlinks ($A \to B$).
- **Package Dependencies:** Vertices = Modules, Directed Edges = Imports/Dependencies.

---

# 2. LESSON SUMMARY

✓ Modeling real-world entities ($V$) and connections ($E$).`,
    codePreview: {
      code: `print("Social Networks, GPS Navigation, Web Search, Dependency Graphs")`,
      output: `Social Networks, GPS Navigation, Web Search, Dependency Graphs`,
      caption: 'Real-world graph domains'
    },
    glossary: [
      { term: 'Graph Modeling', definition: 'Translating real-world problems into vertices and edges for programmatic solution.' }
    ],
    quizzes: [
      {
    question: '1. How are web pages and hyperlinks naturally modeled as a graph?',
    options: [
      'Web pages = Edges, Hyperlinks = Vertices',
      'As an array matrix',
      'Web pages = Vertices, Hyperlinks = Directed Edges',
      'As a binary heap'
    ],
    correctAnswer: 2,
    explanation: 'Pages form vertices, and clicking a link points directly to another page as a directed edge.'
  }
    
    ],
    summaryPoints: [
      'Social networks: Friend connections.',
      'GPS navigation: Weighted distances.',
      'Web: Directed hyperlinks.'
    ],
    previousLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'cycle-detection',
      title: 'Cycle Detection'
    },
    nextLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'graph-complexity',
      title: 'Graph Complexity'
    }
  },

  // =========================================================================
  // SECTION 13 — GRAPHS (LESSON 13: Graph Complexity)
  // =========================================================================
  'ds-graphs/graph-complexity': {
    id: 'ds-graphs/graph-complexity',
    topicId: 'ds-graphs',
    subtopicId: 'graph-complexity',
    title: 'Graph Complexity',
    subtitle: 'Comprehensive Time and Space complexity bounds for Graph representations and algorithms',
    categoryTitle: 'GRAPHS',
    contentMarkdown: `# 1. MASTER GRAPH COMPLEXITY TABLE

| Data Structure / Algorithm | Space Complexity | Time Complexity |
| :--- | :--- | :--- |
| **Adjacency Matrix** | **O(V²)** | Edge Check: **O(1)** |
| **Adjacency List** | **O(V + E)** | Neighbor Scan: **O(deg(v))** |
| **BFS Traversal (List)** | **O(V)** Queue Space | **O(V + E)** |
| **DFS Traversal (List)** | **O(V)** Stack Space | **O(V + E)** |
| **Connected Components** | **O(V)** Visited Space | **O(V + E)** |
| **Cycle Detection** | **O(V)** Stack Space | **O(V + E)** |

---

# 2. LESSON SUMMARY

✓ **Adjacency List:** $O(V + E)$ optimal space.
✓ **BFS & DFS:** $O(V + E)$ linear graph traversal time.`,
    codePreview: {
      code: `print("Adjacency List Space: O(V + E)")\nprint("BFS / DFS Time:      O(V + E)")`,
      output: `Adjacency List Space: O(V + E)\nBFS / DFS Time:      O(V + E)`,
      caption: 'Graph operational complexity bounds'
    },
    glossary: [
      { term: 'Graph Complexity', definition: 'Asymptotic bounds governing graph memory usage and traversal runtimes.' }
    ],
    quizzes: [
      {
    question: '1. What is the time complexity of BFS and DFS traversals using an Adjacency List?',
    options: [
      'O(V²)',
      'O(log V)',
      'O(V + E)',
      'O(E²)'
    ],
    correctAnswer: 2,
    explanation: 'BFS and DFS visit every vertex V once and inspect every edge E through neighbor lists in O(V + E) time.'
  }
    
    ],
    summaryPoints: [
      'Adjacency List = O(V + E) space.',
      'BFS/DFS = O(V + E) time.',
      'Matrix = O(V²) space.'
    ],
    previousLesson: {
      topicId: 'ds-graphs',
      subtopicId: 'graph-applications',
      title: 'Graph Applications'
    }
  },
};
