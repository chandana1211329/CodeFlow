import { Zap, Database, Code2, LayoutDashboard, Brain, BookOpen, Layers } from 'lucide-react';
import React from 'react';

export type Level = 'STARTER' | 'LEARNER' | 'PRO';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface TopicContent {
  text: string;
  explanation: string;
  syntax?: string;
  code: string;
  task: string;
  quiz?: QuizQuestion;
  quizzes?: QuizQuestion[];
}

export interface Topic {
  id: string;
  title: string;
  level: Level;
  description: string;
  content: TopicContent[];
}

export interface Course {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  topics: Topic[];
  progress: number;
}

export const COURSES: Course[] = [
  {
    id: 'python',
    name: 'Python Mastery',
    icon: <Zap className="text-yellow-400" />,
    description: 'Learn Python from scratch with visual execution.',
    topics: [
      {
        id: 'py-intro',
        title: 'Introduction to Python',
        level: 'STARTER',
        description: 'Your zero-prerequisite entry point into programming.',
        content: [
          // SLIDE 1: SECTION 1 & SECTION 2
          {
            text: `# SECTION 1 — WHAT IS PYTHON?

Python is a popular, general-purpose programming language.

In simple terms: a **programming language** is a structured way for humans to give instructions to a computer.

> **Key History & Context:**
> - Python was created by **Guido van Rossum**.
> - It was first released in **1991**.
> - Modern Python development primarily uses **Python 3**.
> - CodeFlow's Python course uses **Python 3**.

---

# SECTION 2 — WHAT IS PYTHON USED FOR?

Python is used across many different areas of modern computing. Below are beginner-friendly examples of what developers build with Python:

1. **Web Development**
   Python can run on a server and handle application logic, data, and user requests (the backend of websites).
2. **Automation and Scripting**
   Python programs can automate repetitive tasks, such as renaming hundreds of files or downloading data automatically.
3. **Software Development**
   Building desktop utilities, software tools, and backend system services.
4. **Data Analysis**
   Analyzing and processing large amounts of information to find useful patterns.
5. **Data Science**
   Extracting mathematical insights, statistics, and trends from complex datasets.
6. **Artificial Intelligence and Machine Learning**
   Python has a rich ecosystem of tools used to build, train, and experiment with machine-learning systems.
7. **Mathematics and Scientific Computing**
   Performing complex numerical calculations and simulations.
8. **Working with Databases**
   Storing, querying, and modifying structured records in database systems.
9. **Reading and Modifying Files**
   Opening, processing, creating, and updating files like text documents or spreadsheets.
10. **Testing and Development Tools**
    Building automated test suits and developer utilities that make software more reliable.`,
            explanation: "Welcome to CodeFlow! Python is famous for being clean, readable, and widely used across tech industries. In this first slide, you've learned what Python is and where it is applied.",
            syntax: "# Python 3 Example\nprint(\"Welcome to Python!\")",
            code: "print(\"Welcome to Python!\")",
            task: "Click Run to execute this simple statement and see Python display the welcome message!"
          },

          // SLIDE 2: SECTION 3 & SECTION 4
          {
            text: `# SECTION 3 — WHY LEARN PYTHON?

Python is one of the most commonly recommended first programming languages for beginners. Here is why:

- **Simple & Readable Syntax:** Python code is clean and uncluttered.
- **Resembles English:** Instructions often read like plain English sentences.
- **Write Less, Do More:** Beginners can create useful programs without writing large amounts of code.
- **Large & Welcoming Community:** Millions of developers share help, guides, and open-source packages.
- **Massive Ecosystem:** Thousands of pre-built tools (libraries & frameworks) are ready to use.
- **Cross-Platform:** Works seamlessly on Windows, macOS, and Linux.
- **For Beginners & Pros Alike:** Used by first-time coders as well as software engineers at leading companies.
- **Versatile:** Useful across web dev, AI, finance, science, design, and automation.
- **Rapid Experimentation:** Allows you to test ideas quickly without complex setup.

> *Note:* Different programming languages excel at different tasks, but Python's combination of clarity and power makes it an ideal starting point.

---

# SECTION 4 — HOW PYTHON RUNS CODE

At a fundamental level, running Python code follows three simple steps:

1. **You write Python code** (instructions).
2. **Python executes the instructions** line-by-line using a tool called an *interpreter*.
3. **You see the result** on your screen.

As a beginner, you don't need to worry about interpreter internals right now.

> 🧠 **CodeFlow Mental Model: CODE FLOW & STRUCTURE**
>
> Core Question to ask yourself: **"What is Python doing next?"**
>
> Throughout CodeFlow, you won't just look at the final output. You will be able to see how Python steps through your code instruction by instruction!`,
            explanation: "Understanding 'Code Flow' is your superpower in programming. Python executes instructions sequentially, and CodeFlow will highlight every step along the way.",
            syntax: "# Python executes line by line\nprint(\"Step 1\")\nprint(\"Step 2\")",
            code: "print(\"Step 1\")\nprint(\"Step 2\")",
            task: "Run the code to see Python execute Step 1 followed by Step 2 in order."
          },

          // SLIDE 3: SECTION 5, SECTION 6 & SECTION 7
          {
            text: `# SECTION 5 — YOUR FIRST PYTHON CODE

Let's examine the classic first program in programming:

\`\`\`python
print("Hello, World!")
\`\`\`

**Expected Output:**
\`\`\`text
Hello, World!
\`\`\`

### Anatomy of this line:
- \`print\` tells Python that we want to display something on the screen.
- \`(\` and \`)\` (parentheses) hold the information being given to \`print\`.
- \`"Hello, World!"\` is the text we want to print.
- The **quotation marks** tell Python that this content should be treated as text (literal characters), not as Python command keywords.

> *Note:* \`print()\` is something Python provides out-of-the-box for displaying information. We will explore functions formally in later lessons!

---

# SECTION 6 — CODEFLOW VISUALIZATION

Here is your first look at how CodeFlow visualizes code execution:

\`\`\`text
SOURCE CODE
     ↓
Python reaches line 1
     ↓
Current line becomes HIGHLIGHTED
     ↓
Python executes print("Hello, World!")
     ↓
"Hello, World!" appears in OUTPUT
     ↓
Program finishes
\`\`\`

Notice how simple this is! The goal of visualization is to establish a strong intuition: **"Python executes my instructions."**

---

# SECTION 7 — PYTHON SYNTAX PREVIEW

Here is a small preview of what readable Python code looks like when handling decisions:

\`\`\`python
name = "Alex"

if name == "Alex":
    print("Hello Alex")
\`\`\`

Even without having learned variables or conditions yet, you can likely already guess what this program is trying to do! Upcoming lessons will explain every single piece in detail.`,
            explanation: "Quotation marks define text, parentheses enclose what we pass to print(), and CodeFlow highlights each line as Python runs it.",
            syntax: "print(\"Hello, World!\")",
            code: "print(\"Hello, World!\")",
            task: "Run the classic 'Hello, World!' program and watch the execution visualizer highlight line 1."
          },

          // SLIDE 4: SECTION 8, SECTION 9, SECTION 10 & SECTION 11
          {
            text: `# SECTION 8 — PYTHON AND OTHER PROGRAMMING LANGUAGES

Different programming languages express similar ideas using different syntax (rules and punctuation).

Here are key characteristics you will encounter in Python:
- **New Lines:** Python commonly uses a new line to separate statements (rather than semicolons).
- **Indentation:** Python uses whitespace/indentation to group blocks of code together.
- **Readable Focus:** Syntax is deliberately designed to look clean and uncluttered.
- **Minimal Punctuation:** Requires less decorative punctuation (braces, semicolons) than languages like C++ or Java.

---

# SECTION 9 — PYTHON PROGRAMMING STYLES

Python supports multiple programming paradigms (styles of structuring code), including:
- **Procedural Programming** (step-by-step procedures)
- **Object-Oriented Programming** (organizing code around objects)
- **Functional Programming** (using pure functions)

> *Don't worry:* You do **NOT** need to memorize or understand these terms yet! CodeFlow will introduce them naturally when you are ready.

---

# SECTION 10 — WHERE CAN PYTHON CODE BE WRITTEN?

Python programs can be written using:
- **Simple Text / Code Editors** (e.g., Notepad, TextEdit)
- **IDEs (Integrated Development Environments)** — specialized applications that combine text editing, file management, and execution tools (e.g., **IDLE**, **VS Code**, **PyCharm**, **Thonny**).
- **Online Learning Environments** — like **CodeFlow**!

CodeFlow provides an integrated editor and visual execution environment so you can learn without installing anything locally.

---

# SECTION 11 — GOOD TO KNOW

Keep these helpful pointers in mind as you begin your journey:

1. **Python 3:** CodeFlow teaches modern Python 3.
2. **Case Sensitivity:** Python cares about capital vs. lowercase letters (\`Print\` is NOT the same as \`print\`).
3. **File Extension:** Python code files typically end with \`.py\` (e.g., \`main.py\`).
4. **Mistakes Are Normal:** Every programmer makes typos and runs into errors.
5. **Error Messages Are Helpful Clues:** Errors tell you where Python got confused so you can fix it.
6. **Experimentation:** The best way to learn is by editing code examples and seeing what happens!`,
            explanation: "Python uses clean syntax, whitespace formatting, and case-sensitive commands. CodeFlow handles the environment so you can focus purely on learning.",
            syntax: "# Case sensitivity example\nprint(\"This works!\")",
            code: "print(\"Python is case-sensitive!\")",
            task: "Run this code, then try changing 'print' to 'Print' to see how Python treats capital letters differently!"
          },

          // SLIDE 5: SECTION 12, SECTION 13, SECTION 14 & SECTION 15
          {
            text: `# SECTION 12 — TRY IT YOURSELF

Now it's your turn to write and customize Python code!

Below is the editable code:
\`\`\`python
print("Hello, World!")
\`\`\`

**Your Challenge:**
Change the message inside the quotes so Python prints your own custom greeting, such as:
\`\`\`python
print("Hello, CodeFlow!")
\`\`\`

---

# SECTION 13 — PREDICT BEFORE RUNNING

Consider these two lines of code:

\`\`\`python
print("Python")
print("CodeFlow")
\`\`\`

❓ **Question:** *What do you think Python will display when you run this?*

Make a prediction in your head before hitting **Run**. 

When executed, Python displays:
\`\`\`text
Python
CodeFlow
\`\`\`

Watch the CodeFlow visualizer below: line 1 runs first to display \`Python\`, then Python moves to line 2 to display \`CodeFlow\`. This reinforces our **Code Flow** mental model!

---

# SECTION 14 — COMMON BEGINNER MISTAKE

Look at this intentionally incorrect code:

\`\`\`python
print("Hello, World!"
\`\`\`

Can you spot what is missing? 

The opening parenthesis \`(\` has no matching closing parenthesis \`)\`.

**Corrected Version:**
\`\`\`python
print("Hello, World!")
\`\`\`

Every opening parenthesis or quotation mark in Python must be paired with its corresponding closing mark.

---

# SECTION 15 — QUICK PRACTICE

Try these three quick practice activities in the editor below!

- **Exercise 1:** Write a program that displays \`I am learning Python!\`.
- **Exercise 2:** Write two separate \`print()\` statements that display two different messages on two lines.
- **Exercise 3:** Predict the output order for three statements: \`print("First")\`, \`print("Second")\`, \`print("Third")\`.`,
            explanation: "Practice makes perfect! Experiment by editing the code in the editor, making predictions, and watching how Python steps through each print statement.",
            syntax: "print(\"Python\")\nprint(\"CodeFlow\")",
            code: "print(\"Python\")\nprint(\"CodeFlow\")",
            task: "Edit the code to print your own message, or test two print statements to observe line-by-line execution."
          },

          // SLIDE 6: SECTION 16, SECTION 17 & SECTION 18
          {
            text: `# SECTION 16 — KNOWLEDGE CHECK

Let's test your understanding with a short knowledge check quiz! Select your answer for each question below.

---

# SECTION 17 — LESSON SUMMARY

Congratulations on completing your very first Python lesson! Here is a summary of what you now know:

- **What Python Is:** A popular, general-purpose programming language designed for readability.
- **Applications:** Used in web development, AI, data science, automation, files, databases, and more.
- **Readable Syntax:** Python code resembles understandable English and requires less decorative punctuation.
- **Version:** CodeFlow uses modern **Python 3**.
- **Displaying Output:** The \`print()\` command displays text on the screen.
- **Sequential Execution:** Python executes code top-to-bottom, line-by-line.
- **Visualization:** CodeFlow visualizes every step so you can see your code in motion.

---

# SECTION 18 — NEXT STEP

You've executed your very first Python instruction!

In the next lesson, we will explore **Python Code Structure & Indentation** — learning how Python organizes blocks of code, how statements end, and how to write clean, error-free programs.`,
            explanation: "Test your knowledge with the interactive quiz questions below, then click Next Lesson when you are ready to move forward!",
            syntax: "# Summary of print()\nprint(\"I know Python basics!\")",
            code: "print(\"I am ready for the next lesson!\")",
            task: "Complete the quiz below and run the summary code!",
            quizzes: [
              {
                question: "1. What is Python?",
                options: [
                  "A popular programming language used to give instructions to a computer",
                  "A physical chip inside computer monitors",
                  "A database management software tool",
                  "A web browser extension for downloading files"
                ],
                correctAnswer: 0,
                explanation: "Python is a high-level programming language that allows humans to write instructions for computers."
              },
              {
                question: "2. Which of the following is an area where Python is commonly used?",
                options: [
                  "Only creating desktop wallpaper images",
                  "Web development, data science, automation, and AI",
                  "Only formatting word processor documents",
                  "Manufacturing computer keyboards"
                ],
                correctAnswer: 1,
                explanation: "Python is extremely versatile and widely used across web backend, data analysis, machine learning, and automation."
              },
              {
                question: "3. What does this code do: print(\"Hello\")?",
                options: [
                  "Deletes the word Hello from memory",
                  "Displays the text Hello on the screen",
                  "Creates a variable named Hello",
                  "Installs Python on your machine"
                ],
                correctAnswer: 1,
                explanation: "print() tells Python to output the specified text inside quotes to the screen."
              },
              {
                question: "4. If line 1 is print(\"A\") and line 2 is print(\"B\"), which line executes first?",
                options: [
                  "line 2 executes first",
                  "line 1 executes first because Python runs line-by-line from top to bottom",
                  "Both lines execute at the exact same millisecond",
                  "Neither line executes"
                ],
                correctAnswer: 1,
                explanation: "Python executes statements sequentially from top to bottom."
              },
              {
                question: "5. Why do we put quotation marks around \"Hello\" in print(\"Hello\")?",
                options: [
                  "To inform Python that the content inside should be treated as literal text",
                  "Because Python requires quotation marks around all numbers",
                  "To hide the output from the screen",
                  "To lock the file so it cannot be edited"
                ],
                correctAnswer: 0,
                explanation: "Quotation marks designate text literals in Python."
              },
              {
                question: "6. Which major version of Python is taught in CodeFlow?",
                options: [
                  "Python 1",
                  "Python 2",
                  "Python 3",
                  "Python 4"
                ],
                correctAnswer: 2,
                explanation: "CodeFlow uses modern Python 3."
              }
            ]
          }
        ]
      },
      {
        id: 'py-vars',
        title: 'Variables',
        level: 'STARTER',
        description: 'Storing data in digital boxes.',
        content: [{
          text: "Variables are containers for storing data values.",
          explanation: "Think of a variable as a labeled box where you can store information and retrieve it later using its name.",
          syntax: "variable_name = value",
          code: "age = 25\nname = 'Alice'\nheight = 1.75\nprint(name, 'is', age, 'years old')",
          task: "Change the age and see how the output updates."
        }]
      },
      {
        id: 'py-recursion',
        title: 'Recursion Basics',
        level: 'LEARNER',
        description: 'Functions that call themselves.',
        content: [{
          text: "Recursion is a method of solving problems where the solution depends on solutions to smaller instances of the same problem.",
          explanation: "A recursive function always has a base case (to stop) and a recursive case (to continue).",
          syntax: "def function():\n    if base_case:\n        return\n    function()",
          code: "def factorial(n):\n    if n == 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))",
          task: "Watch the stack frames build up as the function calls itself."
        }]
      },
      {
        id: 'py-decorators',
        title: 'Decorators',
        level: 'PRO',
        description: 'Master advanced Python meta-programming.',
        content: [{
          text: "Decorators allow you to modify the behavior of a function or class.",
          explanation: "They are a powerful tool for wrapping code around other code without modifying the original source.",
          syntax: "@decorator\ndef function():\n    pass",
          code: "def my_decorator(func):\n    def wrapper():\n        print('Something before')\n        func()\n        print('Something after')\n    return wrapper\n\n@my_decorator\ndef say_hello():\n    print('Hello!')\n\nsay_hello()",
          task: "Visualize how the wrapper function executes around the core logic."
        }]
      }
    ],
    progress: 0
  },
  {
    id: 'ds',
    name: 'Data Structures',
    icon: <Brain className="text-purple-400" />,
    description: 'Organize data like a pro.',
    topics: [
      {
        id: 'ds-intro',
        title: 'Introduction to DS',
        level: 'STARTER',
        description: 'How we store information efficiently.',
        content: [{
          text: "A data structure is a specialized format for organizing, processing, retrieving and storing data.",
          explanation: "Choosing the right data structure can make your program much faster and more efficient.",
          code: "# Array example\nscores = [85, 92, 78, 90, 88]\nprint(scores[0]) # Accessing first element",
          task: "Visualize how an array stores multiple values in a row."
        }]
      },
      {
        id: 'ds-linkedlist',
        title: 'Linked Lists',
        level: 'LEARNER',
        description: 'Dynamic data organization.',
        content: [{
          text: "A linked list is a linear data structure, in which the elements are not stored at contiguous memory locations.",
          explanation: "Each element in a linked list is an object called a node, which contains data and a reference to the next node.",
          code: "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nhead = Node(1)\nhead.next = Node(2)",
          task: "Visualize the nodes and the pointers connecting them."
        }]
      }
    ],
    progress: 0
  },

];
