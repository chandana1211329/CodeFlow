export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface QuizItem {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface PythonLessonData {
  id: string;
  topicId: string;
  subtopicId?: string;
  title: string;
  subtitle: string;
  categoryTitle: string;
  contentMarkdown: string;
  codePreview?: {
    code: string;
    output: string;
    caption: string;
  };
  glossary?: GlossaryItem[];
  quizzes?: QuizItem[];
  summaryPoints?: string[];
  previousLesson?: {
    topicId: string;
    subtopicId?: string;
    title: string;
  };
  nextLesson?: {
    topicId: string;
    subtopicId?: string;
    title: string;
  };
}

export const PYTHON_LESSONS: Record<string, PythonLessonData> = {
  // Lesson 1: What is Python?
  'py-intro/what-is-python': {
    id: 'py-intro/what-is-python',
    topicId: 'py-intro',
    subtopicId: 'py-intro-what',
    title: 'What is Python?',
    subtitle: 'Understanding the core definition and purpose of Python',
    categoryTitle: 'PYTHON BASICS',
    contentMarkdown: `# 1. START WITH A SIMPLE DEFINITION

Python is a **high-level, general-purpose programming language**.

If you are an absolute beginner, that sentence might feel full of new terms. Let's break down each concept step by step below.

---

# 2. WHAT IS A PROGRAMMING LANGUAGE?

Computers perform tasks by following instructions.

- **Programming** is the process of creating instructions that tell a computer what we want it to do.
- A **programming language** provides a structured way for humans to write those instructions.

Python is one such programming language.

> 🍞 **A Simple Analogy: Following a Recipe**
> 
> Think of a computer program like a simple recipe for making a sandwich:
> 1. Take two slices of bread.
> 2. Add the filling.
> 3. Put the slices together.
> 4. Serve.
> 
> A computer program also contains step-by-step instructions. The difference is that programming instructions are written using a programming language with specific rules.

Python is not the only programming language. Other examples include **Java**, **JavaScript**, **C**, and **C++**.

---

# 3. WHAT DOES "HIGH-LEVEL" MEAN?

Computers ultimately work with very low-level instructions. Writing those instructions directly would be difficult and inconvenient for most software development.

Python is called a **high-level language** because it provides more human-friendly ways to express programming instructions and hides many low-level computer details.

\`\`\`text
Human
  ↓
Readable Python Code
  ↓
Lower-level details handled by the Python / computer system
  ↓
Computer performs the task
\`\`\`

Python handles these complex underlying details automatically so you can focus on problem-solving.

---

# 4. WHAT DOES "GENERAL-PURPOSE" MEAN?

**General-purpose** means Python is not designed for only one specific kind of programming problem. It can be used to build many different kinds of programs.

Python can be used in areas like:
- Web development
- Automation
- Data analysis
- Artificial intelligence
- Software development

*(The very next lesson, **"What Can Python Do?"**, will explain Python's applications in detail.)*

---

# 5. WHO CREATED PYTHON?

Python was created by **Guido van Rossum**.

Development began around the late 1980s, and Python was first publicly released in **1991**.

Python has continued to evolve since then and is supported and developed by a large global community of programmers.

---

# 6. DID YOU KNOW?

> 💡 **Did You Know?**
> 
> The name "Python" was inspired by the British comedy troupe **Monty Python** (*Monty Python's Flying Circus*). It was not originally named after the snake!

---

# 7. PYTHON 3

Python has evolved through different major versions:
- **Python 2** is an older version that reached its end-of-life in 2020.
- **Python 3** is the modern major version used for current learning and software development.

CodeFlow teaches **Python 3**.

\`\`\`text
CodeFlow uses:
[ ✓ ] Python 3
\`\`\`

---

# 8. SHOW A TINY PYTHON CODE PREVIEW

Below is a small example of Python code:

\`\`\`python
print("Hello, World!")
\`\`\`

**Output:**
\`\`\`text
Hello, World!
\`\`\`

*This is a small example of Python code. It tells Python to display the text 'Hello, World!'.*

> 📌 *Don't worry about understanding every part of this code yet! You will learn it step by step in 'Your First Python Program'.*

---

# 9. PYTHON IN ONE SENTENCE

> 📌 **Python Summary Definition**
> 
> **Python is a high-level, general-purpose programming language that allows programmers to write instructions for computers using relatively readable syntax.**

### Definition Breakdown:

- **PROGRAMMING LANGUAGE**
  A structured way to write instructions for computers.

- **HIGH-LEVEL**
  Allows programmers to work with more human-friendly abstractions instead of dealing directly with many low-level computer details.

- **GENERAL-PURPOSE**
  Can be used for many different types of programming problems.`,

    codePreview: {
      code: `print("Hello, World!")`,
      output: `Hello, World!`,
      caption: `A tiny Python statement that displays text on the screen.`
    },

    glossary: [
      { term: 'Programming', definition: 'Creating instructions for a computer to perform tasks.' },
      { term: 'Program', definition: 'A set of instructions designed to perform a task.' },
      { term: 'Programming Language', definition: 'A structured language used to write computer programs.' },
      { term: 'Python', definition: 'A high-level, general-purpose programming language.' },
      { term: 'High-Level', definition: 'A language that provides programmers with more understandable abstractions and hides many low-level details.' },
      { term: 'General-Purpose', definition: 'A language that can be used for many different kinds of programming tasks.' }
    ],

    quizzes: [
      {
    question: '1. What is Python?',
    options: [
      'A programming language',
      'A web browser extension',
      'A computer processor chip',
      'A physical memory drive'
    ],
    correctAnswer: 0,
    explanation: 'Python is a high-level, general-purpose programming language used to write instructions for computers.'
  },
      {
    question: '2. What does "high-level" mean?',
    options: [
      'Python code can only be written by senior university professors',
      'Python can only run on high-performance supercomputers',
      'Python provides more human-friendly ways to write programs and hides many low-level details',
      'Python code requires writing binary 1s and 0s by hand'
    ],
    correctAnswer: 2,
    explanation: 'High-level means the language provides abstractions that make code easier for humans to read and write.'
  },
      {
    question: '3. What does "general-purpose" mean?',
    options: [
      'Python is designed for only one specific mobile phone model',
      'Python can be used for many different types of programming tasks',
      'Python can only be used for scientific calculators',
      'Python requires no instructions to execute'
    ],
    correctAnswer: 1,
    explanation: 'General-purpose means Python is versatile and applicable across web dev, automation, data analysis, AI, and software.'
  },
      {
    question: '4. Who created Python?',
    options: [
      'Guido van Rossum',
      'Dennis Ritchie',
      'James Gosling',
      'Bjarne Stroustrup'
    ],
    correctAnswer: 0,
    explanation: 'Guido van Rossum created Python in the late 1980s and released it publicly in 1991.'
  },
      {
    question: '5. When was Python first publicly released?',
    options: [
      '2000',
      '2010',
      '1991',
      '1980'
    ],
    correctAnswer: 2,
    explanation: 'Python was first publicly released in 1991.'
  },
      {
    question: '6. Which major version of Python does CodeFlow teach?',
    options: [
      'Python 2',
      'Python 3',
      'Python 1',
      'Python 4'
    ],
    correctAnswer: 1,
    explanation: 'CodeFlow teaches modern Python 3, which is the current industry standard.'
  }
    ],

    summaryPoints: [
      'Python is a programming language.',
      'Programming languages allow humans to write instructions for computers.',
      'Python is a high-level language.',
      'Python is a general-purpose language.',
      'Python was created by Guido van Rossum.',
      'Python was first publicly released in 1991.',
      'CodeFlow teaches Python 3.'
    ],

    nextLesson: {
      topicId: 'py-intro',
      subtopicId: 'what-can-python-do',
      title: 'What Can Python Do?'
    }
  },

  // Lesson 2: What Can Python Do?
  'py-intro/what-can-python-do': {
    id: 'py-intro/what-can-python-do',
    topicId: 'py-intro',
    subtopicId: 'py-intro-can-do',
    title: 'What Can Python Do?',
    subtitle: 'Real-world application areas and capabilities of Python programs',
    categoryTitle: 'PYTHON BASICS',
    contentMarkdown: `# 1. START WITH A SIMPLE EXPLANATION

Python can be used to build many different kinds of programs and automate many kinds of tasks.

It is actively used in areas such as:
- Web development
- Automation and scripting
- Data analysis
- Data science
- Artificial intelligence
- Machine learning
- Scientific and mathematical computing
- Working with files
- Working with databases
- Software development
- Testing software
- Networking and system tools

> *Important:* A programmer does not need to use Python in all of these areas. These examples simply demonstrate how broad Python's applications are across modern computing!

---

# 2. WEB DEVELOPMENT

Python is widely used for web development — specifically for code that runs on a server, known as the **backend**.

### What is Backend?
When someone uses a website or web application, much of the logic happens behind the scenes on a remote server. Python is used to write this server-side logic.

**Examples of what backend Python code does:**
- Processing a user login or signup request
- Retrieving product information from a database
- Saving user preferences and shopping cart items
- Processing an online payment order
- Sending structured data to a website or mobile app

> 🌐 **Web Frameworks:** Developers use popular Python web frameworks like **Django**, **Flask**, and **FastAPI** to build secure backends efficiently. *(Note: Python handles server logic; browser interfaces are typically rendered with HTML, CSS, and JavaScript.)*

---

# 3. AUTOMATION AND SCRIPTING

Python excels at automating repetitive, manual tasks.

**Automation** means creating a program that performs a task automatically, freeing humans from doing it repeatedly by hand.

**Examples of Python Automation:**
- Renaming hundreds of photo files automatically
- Organizing files into specific folders by date or category
- Processing spreadsheets and generating summary reports
- Sending routine email notifications
- Moving, copying, or cleaning up data files

> 📂 **Conceptual Example: Renaming 500 Files**
> 
> Imagine you have 500 photos named \`photo1.jpg\`, \`photo2.jpg\`, ... \`photo500.jpg\`. Doing this manually takes hours. A 5-line Python script can process and rename all 500 files in under a second! *(File handling code will be covered in later lessons.)*

---

# 4. DATA ANALYSIS

Python can be used to collect, clean, process, analyze, and visualize data.

> 📊 **Example: Student Exam Analysis**
> 
> Imagine a school has test marks for 1,000 students. Instead of calculating results by hand, a Python program can automatically:
> - Calculate average marks across classes
> - Instantly identify the highest and lowest scores
> - Group results by subject or grade
> - Generate visual charts and graphs
> - Spot performance trends over time

Popular Python libraries for data analysis include **pandas**, **NumPy**, and **Matplotlib**.

---

# 5. DATA SCIENCE

**Data science** involves analyzing complex datasets to discover useful patterns, hidden relationships, and strategic insights.

Python is a primary tool used by data scientists to:
- Analyze customer purchasing behavior
- Study financial market and sales trends
- Process large-scale scientific measurement datasets
- Build predictive data models

---

# 6. ARTIFICIAL INTELLIGENCE (AI)

Python is the leading language used to build and experiment with **Artificial Intelligence (AI)** systems.

### What is AI?
Artificial Intelligence involves creating computer systems that perform tasks normally requiring forms of human-like intelligence, such as recognizing patterns, understanding natural language, or making decisions.

**Real-world AI applications built with Python:**
- Intelligent conversational chatbots
- Facial and object image recognition
- Natural language translation
- Personalized recommendation systems (e.g., streaming platforms)

> *Note:* Python itself is not AI; Python is the programming language developers use to build AI software.

---

# 7. MACHINE LEARNING

**Machine learning** is a subfield of AI where computer systems learn patterns from past data to make predictions or decisions on new data.

> 🏡 **Simple Example: Estimating House Prices**
> 
> Suppose a system is given historical data on thousands of houses (square footage, location, number of rooms, and past sale prices).
> 
> A machine-learning model written in Python can learn the relationships between these features and estimate the price of a newly listed house!

Popular Python machine learning tools include **scikit-learn**, **PyTorch**, and **TensorFlow**.

---

# 8. MATHEMATICS AND SCIENTIFIC COMPUTING

Python performs mathematical calculations with high precision and is used extensively in scientific research and engineering.

**Applications:**
- Statistical computations and simulations
- Numerical matrix calculations
- Physics and chemistry experiments
- Engineering stress calculations

\`\`\`python
print(10 + 5)
\`\`\`

**Output:**
\`\`\`text
15
\`\`\`

*Python can perform complex mathematical operations as part of larger programs.*

---

# 9. WORKING WITH FILES

Python programs can interact directly with files stored on a computer or server.

Python can:
- Create new files automatically
- Read data from existing files
- Write or append new information to files
- Modify or search file contents
- Process text files, CSV spreadsheets, JSON data, and system logs

---

# 10. WORKING WITH DATABASES

A **database** is an organized digital system for securely storing and retrieving information.

> 🛒 **Example: Online Shopping Store**
> 
> An e-commerce backend relies on a database to store:
> - User profiles & passwords
> - Product inventory & prices
> - Order history & shipping status
> 
> Python backend code communicates with the database to **create**, **read**, **update**, and **delete** data records seamlessly.

---

# 11. SOFTWARE DEVELOPMENT

Python is used to construct software utilities and applications across various scales:
- Command-line tools (terminal programs)
- Desktop applications
- Internal company automation tools
- **Prototypes** (*an early working version of an idea used to test concepts quickly*)

---

# 12. TESTING SOFTWARE

Developers use Python to test software automatically.

Instead of manually clicking around a website to check if every feature works after every update, automated Python test scripts verify whether software behaves as expected.

\`\`\`text
Expected: 2 + 2 = 4
Test Result: Verified [ ✓ ]
\`\`\`

Automated testing saves hundreds of developer hours as applications grow in size.

---

# 13. NETWORKING AND SYSTEM TOOLS

Python is a favorite tool for system administrators and DevOps engineers to:
- Monitor server health and service availability
- Parse and filter system error logs
- Automate network configuration and administrative tasks
- Communicate with remote network APIs and services

---

# 14. CONNECTING DIFFERENT SYSTEMS

Python acts as the "glue" that connects separate software systems together using **APIs** (*Application Programming Interfaces* — standard protocols for systems to exchange data).

\`\`\`text
User App  →  Python Code  →  API  →  Payment Service
\`\`\`

---

# 15. A REAL-WORLD EXAMPLE: E-COMMERCE BACKEND

Imagine an online store when a customer places an order:

\`\`\`text
Customer
   ↓
Website Frontend
   ↓
Python Backend Service
   ↓
Database (Check inventory & save order)
   ↓
Payment Processing & Receipt Generation
   ↓
Order Confirmed Result
\`\`\`

Python handles the server logic connecting the database, payment API, and receipt generator together.

---

# 16. ANOTHER REAL-WORLD EXAMPLE: FILE AUTOMATION

Imagine a folder containing **500 monthly report files**:

\`\`\`text
MANUAL APPROACH:
Open file → Rename → Move file → Repeat 500 times (Hours of tedious effort)

AUTOMATED WITH PYTHON:
Python Script → Reads & processes all 500 files automatically in seconds!
\`\`\`

---

# 17. IMPORTANT CLARIFICATION

> ⚠️ **Python Can Do Many Things — But It Isn't Used for Everything!**
> 
> Python is versatile, but professional software systems often combine multiple technologies. For instance, a modern web application uses:
> - **HTML / CSS** (Page structure & styling)
> - **JavaScript** (Browser interactive UI)
> - **Python** (Server-side backend logic)
> - **Database** (Information storage)
> 
> Python doesn't replace every other language — it works alongside them!

---

# 18. WHAT YOU CAN EVENTUALLY BUILD

As you learn Python step by step in CodeFlow, you will progress toward building projects like:
1. Calculator & Converter programs
2. Interactive Quiz & Guessing Games
3. File Organizers & Automation Scripts
4. Data Analysis & Charting Utilities
5. API Integration & Web Backend Services

---

# 19. SMALL CODE PREVIEW

\`\`\`python
print("Python can automate tasks!")
\`\`\`

**Output:**
\`\`\`text
Python can automate tasks!
\`\`\`

*The syntax above is simple, but when combined with logic, Python statements can solve massive real-world problems.*

---

# 20. QUICK RECAP VISUAL

\`\`\`text
                             PYTHON
                                │
       ┌────────────────────────┼────────────────────────┐
       │                        │                        │
Web Development           Data Science & AI          Automation
(Backend & APIs)         (Analysis, ML, Math)      (Files & Scripts)
       │                        │                        │
   Databases                Simulations              System Tools
\`\`\``,

    codePreview: {
      code: `print("Python can automate tasks!")`,
      output: `Python can automate tasks!`,
      caption: `A statement demonstrating Python output capability.`
    },

    glossary: [
      { term: 'Automation', definition: 'Using software programs to perform repetitive tasks automatically.' },
      { term: 'Backend', definition: 'The server-side part of an application that handles logic, databases, and security.' },
      { term: 'Database', definition: 'An organized digital system for securely storing and retrieving data.' },
      { term: 'Data Analysis', definition: 'Examining, processing, and charting data to discover useful insights.' },
      { term: 'Artificial Intelligence', definition: 'Computer systems designed to perform tasks involving pattern recognition or reasoning.' },
      { term: 'Machine Learning', definition: 'A branch of AI where systems learn patterns from data to make predictions.' },
      { term: 'API', definition: 'A defined protocol for different software applications to communicate with each other.' },
      { term: 'Prototype', definition: 'An early working model built to test concepts before full production.' }
    ],

    quizzes: [
      {
    question: '1. Can Python only be used for one type of programming?',
    options: [
      'Yes, Python can only run on Linux servers',
      'No, Python is general-purpose and used across web, AI, data, and automation',
      'Yes, Python only works for editing text documents',
      'Yes, Python can only be used for making mobile calculators'
    ],
    correctAnswer: 1,
    explanation: 'Python is a general-purpose programming language applied across web backend, data science, AI, automation, and testing.'
  },
      {
    question: '2. Which of the following is a classic example of automation?',
    options: [
      'Turning off your monitor screen',
      'Writing a Python script to automatically rename and organize 500 files in seconds',
      'Drawing a picture on a piece of paper with a pencil',
      'Manually clicking and opening 500 files one by one by hand'
    ],
    correctAnswer: 1,
    explanation: 'Automation means replacing repetitive manual tasks with a computer script that runs automatically.'
  },
      {
    question: '3. Can Python programs interact with databases?',
    options: [
      'No, Python cannot connect to any database',
      'Yes, Python backend code can query, save, update, and delete database records',
      'No, databases can only be accessed through web browsers',
      'Only if the database has no security'
    ],
    correctAnswer: 1,
    explanation: 'Python backend code frequently communicates with databases to manage application data.'
  },
      {
    question: '4. Is Python itself an artificial intelligence system?',
    options: [
      'No, Python cannot be used for AI',
      'Yes, Python is a sentient robot',
      'Yes, Python is a machine learning algorithm',
      'No, Python is a programming language used by developers to build AI software'
    ],
    correctAnswer: 3,
    explanation: 'Python is a programming language; developers write Python code to create AI models and machine-learning software.'
  },
      {
    question: '5. Which of these is a realistic application of Python?',
    options: [
      'Data Analysis & Visualization',
      'All of the above',
      'Task Automation & Scripting',
      'Backend Web Development'
    ],
    correctAnswer: 1,
    explanation: 'Python is general-purpose and widely used for web backends, data analysis, automation, and more.'
  },
      {
    question: '6. Does every Python application require AI or machine learning?',
    options: [
      'No, many Python scripts simply automate file tasks, process web requests, or handle basic data',
      'Yes, all Python programs must use neural networks',
      'Yes, print() requires an AI model',
      'Yes, Python will not run without machine learning'
    ],
    correctAnswer: 0,
    explanation: 'Python is used for simple scripts, web backends, games, and basic math as well as complex AI.'
  }
    ],

    summaryPoints: [
      'Python can be used for many different kinds of programming.',
      'Python can be used for backend web development.',
      'Python can automate repetitive tasks.',
      'Python can process and analyze data.',
      'Python is widely used in AI and machine learning.',
      'Python can perform mathematical and scientific computing.',
      'Python programs can work with files and databases.',
      'Python can be used to build software and development tools.',
      'Python can be used for automated testing.',
      'Real software projects often combine Python with other technologies.'
    ],

    previousLesson: {
      topicId: 'py-intro',
      subtopicId: 'what-is-python',
      title: 'What is Python?'
    },

    nextLesson: {
      topicId: 'py-intro',
      subtopicId: 'why-python',
      title: 'Why Python?'
    }
  },

  // Lesson 3: Why Python?
  'py-intro/why-python': {
    id: 'py-intro/why-python',
    topicId: 'py-intro',
    subtopicId: 'py-intro-why',
    title: 'Why Python?',
    subtitle: 'Understanding why Python is popular, beginner-friendly, and widely used across tech industries',
    categoryTitle: 'PYTHON BASICS',
    contentMarkdown: `# 1. START WITH THE MAIN IDEA

Python is popular because it combines **relatively readable syntax** with a **large ecosystem** and the ability to solve many different kinds of programming problems.

It is actively used by:
- Beginners learning programming for the first time
- Students and researchers
- Data analysts & data scientists
- Software developers & backend engineers
- Automation & DevOps engineers
- AI & machine learning developers
- Companies and global development teams

> *Important:* There is no single "best" programming language. Different languages excel at different tasks. The goal of this lesson is to understand why Python is so frequently chosen by both beginners and professionals.

---

# 2. PYTHON IS RELATIVELY EASY TO READ

Python was deliberately designed with **code readability** as a primary goal. Its syntax often requires less punctuation and decorative setup code than some other programming languages.

Consider this small example:

\`\`\`python
age = 18

if age >= 18:
    print("Adult")
\`\`\`

*Even though you haven't learned conditions or variables yet, can you make a rough guess about what this code is checking?*

Words like \`age\` and \`Adult\` help communicate the program's intention clearly.

> ⚠️ **Important Clarification: Python is NOT English!**
> 
> Python is **not** plain English. Python is a formal programming language with strict syntax rules, indentation requirements, and exact keywords. But its syntax is designed to be uncluttered and human-readable.

---

# 3. PYTHON CAN BE BEGINNER-FRIENDLY

When starting out, a beginner must learn difficult new concepts such as:
- Variables & data storage
- Conditions & decision paths
- Loops & repetition
- Functions & reusability
- Data structures & algorithms
- Problem solving & debugging

Python's relatively concise syntax allows beginners to focus more attention on these **core programming concepts** rather than getting bogged down by decorative syntax rules.

For example, displaying a message in Python requires only:
\`\`\`python
print("Hello!")
\`\`\`

> *Note:* Being beginner-friendly does **not** mean programming itself is effortless. Beginners still need to learn logic, problem solving, and debugging!

---

# 4. LESS BOILERPLATE FOR MANY TASKS

### What is Boilerplate?
**Boilerplate** refers to setup code that must be written before you can execute the actual main logic of a program.

Python often allows small programs to be written with little setup code:
\`\`\`python
print("Hello, World!")
\`\`\`

A beginner can execute a meaningful instruction without first having to wrap it inside large class structures or main function declarations. Python emphasizes concise, direct expression.

---

# 5. PYTHON HELPS YOU FOCUS ON LOGIC

Understanding logic is far more important than merely memorizing syntax rules. 

Python's clean syntax makes it easier to focus on key questions:
- *What instruction executes first?*
- *What value does this variable hold?*
- *Is this condition true or false?*
- *How many times will this loop repeat?*
- *What result does this function return?*

> 🧠 **CODEFLOW PHILOSOPHY**
> 
> **Don't just write code. Understand and visualize the logic behind it.**
> 
> CodeFlow uses Python's clean syntax paired with visual step execution to help you build crystal-clear programming mental models!

---

# 6. PYTHON HAS A LARGE STANDARD LIBRARY

### What is a Library?
A **library** is a collection of reusable code that programmers can use so they don't have to write everything from scratch.

Python comes with a large **Standard Library** included out-of-the-box. It provides pre-built tools for:
- Mathematics & complex calculations
- Dates, time, and timestamps
- File handling and directory operations
- Text processing & regular expressions
- Data formats (JSON, CSV)
- Networking & operating system interactions

\`\`\`python
import math

print(math.sqrt(25))
\`\`\`

**Output:**
\`\`\`text
5.0
\`\`\`

*Python's \`math\` module provides built-in mathematical functions like square root (\`sqrt\`). Modules and libraries will be taught formally in later lessons!*

---

# 7. PYTHON HAS A LARGE ECOSYSTEM

Beyond the Standard Library, Python's capabilities can be expanded with thousands of third-party **packages** created by the global community.

### Standard Library vs. Third-Party Packages
- **Standard Library:** Built into Python automatically.
- **Third-Party Packages:** Downloaded & installed separately when needed for specific fields.

**Ecosystem Highlights:**
- **Web Development:** Django, Flask, FastAPI
- **Data Analysis & Science:** NumPy, pandas, Matplotlib
- **AI & Machine Learning:** scikit-learn, PyTorch, TensorFlow
- **Automated Testing:** pytest

---

# 8. PYTHON HAS A LARGE GLOBAL COMMUNITY

Python has been developed and refined for over three decades, building a massive international community of developers.

**What a large community means for learners:**
- Extensive official documentation and guides
- Thousands of beginner tutorials, video courses, and books
- Millions of answered questions on developer forums
- Rich open-source projects to learn from

> *Tip:* While online community answers are helpful, don't just copy-paste solutions! Focus on understanding how the code works.

---

# 9. PYTHON WORKS ON MAJOR OPERATING SYSTEMS

Python is **cross-platform** — meaning it is available and runs on all major operating systems:
- Windows
- macOS
- Linux

The Python language environment works across platforms, allowing you to learn and write Python regardless of which operating system you use.

---

# 10. PYTHON SUPPORTS RAPID PROTOTYPING

### What is a Prototype?
A **prototype** is an early working version of an idea built to test whether a concept works in practice.

Because Python requires less setup code, developers can quickly assemble a prototype to test an idea:
\`\`\`text
Idea → Quick Python Script → Test Results → Refine Concept
\`\`\`

---

# 11. PYTHON SCALES BEYOND BEGINNER PROJECTS

A common misconception is that Python is only a "learning language." In reality, the exact same language scales from initial learning to production systems:

\`\`\`text
Small Learning Programs
          ↓
Automation Scripts
          ↓
Data-Processing Pipelines
          ↓
Scalable Web Backend Systems
          ↓
Production AI & Machine-Learning Systems
\`\`\`

---

# 12. PYTHON KNOWLEDGE HELPS WITH PROGRAMMING FUNDAMENTALS

The core concepts you learn in Python transfer directly to other programming languages:
- Variables & Data Types
- Conditions & Decision Paths
- Loops & Iteration
- Functions & Reusability
- Data Structures & Collections
- Object-Oriented Principles
- Debugging & Problem Solving

\`\`\`text
Learn core concepts in Python
             ↓
Develop computational thinking
             ↓
Learning Java, C++, or JavaScript later becomes much easier!
\`\`\`

---

# 13. PYTHON IS INTERACTIVE & GREAT FOR EXPERIMENTATION

Python encourages an **edit → run → observe** cycle.

\`\`\`python
print(10 + 5)
\`\`\`
*Output:* \`15\`

You can instantly edit the line to:
\`\`\`python
print(20 + 5)
\`\`\`
*Output:* \`25\`

This immediate feedback loop makes experimenting with code engaging and informative while learning.

---

# 14. PYTHON IS OPEN SOURCE

Python is **open-source software**. Its source code is publicly available, free to use, and developed transparently by an international contributor community.

---

# 15. PYTHON HAS STRONG DOCUMENTATION

Python maintains thorough official documentation detailing the language specification, standard library modules, and official tutorials. As you grow beyond the basics, reading documentation will become a valuable skill.

---

# 16. READABILITY HELPS TEAMWORK

Programming is a team discipline. Developers spend more time **reading and maintaining** existing code than writing brand new code. Python's emphasis on clean syntax helps team members understand and review each other's work effectively.

---

# 17. PYTHON DOES NOT REMOVE THE NEED TO THINK

> ⚠️ **Crucial Note for Beginners in the AI Era**
> 
> Modern tools can help generate code snippets, but programmers still need to understand:
> - What problem is being solved?
> - What step-by-step logic is needed?
> - What data is being processed?
> - Why did an error occur?
> 
> **CodeFlow focuses on building your understanding of code logic, not just writing syntax.**

---

# 18. IS PYTHON ALWAYS THE BEST CHOICE?

> ⚖️ **Is Python Always the Best Language? No.**
> 
> Every programming language has distinct strengths and trade-offs:
> - Projects prioritizing extreme low-level execution speed might use **C++** or **Rust**.
> - In-browser client-side interactivity relies on **JavaScript**.
> - Native mobile apps often use **Swift** or **Kotlin**.
> 
> Professional developers choose the right tool based on project requirements. Python is powerful and flexible, but it works alongside other technologies!

---

# 19. BEGINNER LEARNING FLOW

\`\`\`text
Readable Syntax
       ↓
Less mental effort spent on syntax overhead
       ↓
More attention available for core programming logic
       ↓
Experiment & Observe
       ↓
Learn & Build Confidence!
\`\`\`

---

# 20. WHY PYTHON FOR CODEFLOW?

CodeFlow uses Python for its introductory programming track because Python lets you master essential concepts clearly:

\`\`\`text
- Code Flow  → What line executes next?
- Data       → What values exist in memory?
- Decisions  → Which path did the program take?
- Loops      → Why is code repeating?
- Functions  → How is logic reused?
- Debugging  → Why did an error happen?
\`\`\`

---

# 21. QUICK VISUAL SUMMARY

\`\`\`text
                             WHY PYTHON?
                                  │
         ┌────────────────────────┼────────────────────────┐
         │                        │                        │
     READABLE                 FLEXIBLE                 ECOSYSTEM
         │                        │                        │
   Clean Syntax              Web, AI, Data          Standard Library
   Human-Friendly            Automation               Community Packages
         │                        │                        │
Focus on Logic           Cross-Platform           Professional Scale
\`\`\``,

    codePreview: {
      code: `import math\n\nprint(math.sqrt(25))`,
      output: `5.0`,
      caption: `Demonstrating Python's built-in math module from the Standard Library.`
    },

    glossary: [
      { term: 'Readable', definition: 'Code structured so its intent and logic are relatively easy for humans to follow.' },
      { term: 'Library', definition: 'A collection of reusable pre-written code that provides useful functionality.' },
      { term: 'Standard Library', definition: 'The extensive collection of modules included automatically with Python.' },
      { term: 'Package', definition: 'Reusable software modules that can be installed to add extra features to Python.' },
      { term: 'Ecosystem', definition: 'The full collection of libraries, tools, frameworks, docs, and communities around a language.' },
      { term: 'Cross-platform', definition: 'Capable of running seamlessly across multiple operating systems like Windows, macOS, and Linux.' },
      { term: 'Prototype', definition: 'An early working model built to quickly test whether an idea works.' },
      { term: 'Boilerplate', definition: 'Repetitive setup code required before reaching the main program logic.' }
    ],

    quizzes: [
      {
    question: '1. Why is Python commonly recommended to beginners?',
    options: [
      'It only runs on expensive supercomputers',
      'It is the only programming language that exists',
      'It requires no logic or problem-solving skills',
      'Its relatively readable and concise syntax allows learners to focus on core programming concepts'
    ],
    correctAnswer: 3,
    explanation: 'Python clean syntax reduces syntax overhead so beginners can focus on learning programming logic.'
  },
      {
    question: '2. Does Python being beginner-friendly mean programming never gets challenging?',
    options: [
      'Yes, Python errors never happen',
      'No, beginners still need to learn logic, problem solving, debugging, and algorithms',
      'Yes, Python writes entire applications automatically without human thought',
      'Yes, programming in Python requires no practice'
    ],
    correctAnswer: 1,
    explanation: 'While Python syntax is readable, learning programming logic and problem solving still requires practice.'
  },
      {
    question: '3. What does "cross-platform" mean?',
    options: [
      'Python converts code into physical paper documents',
      'Python requires a satellite connection to run',
      'Python is available and runs across major operating systems like Windows, macOS, and Linux',
      'Python can only run on smart TVs'
    ],
    correctAnswer: 2,
    explanation: 'Cross-platform means the language environment is supported on multiple operating systems.'
  },
      {
    question: '4. What is a programming library?',
    options: [
      'A browser password manager',
      'A list of computer hardware parts',
      'A collection of reusable pre-written code that provides useful functionality',
      'A physical building where programming books are kept'
    ],
    correctAnswer: 2,
    explanation: 'Libraries contain pre-written functions and modules so developers do not have to rebuild common tools from scratch.'
  },
      {
    question: '5. Is Python only useful for small beginner learning projects?',
    options: [
      'Yes, professional companies never use Python',
      'Yes, Python is strictly a toy language',
      'No, Python scales from small learning scripts to massive professional web backends, data systems, and AI',
      'Yes, Python stops working once code exceeds 50 lines'
    ],
    correctAnswer: 2,
    explanation: 'Python is used by top tech companies, research institutions, and engineers worldwide for production systems.'
  },
      {
    question: '6. If you learn programming concepts in Python, will those concepts help if you learn another language later?',
    options: [
      'No, every programming language shares zero concepts',
      'No, learning Python makes it impossible to learn Java',
      'Yes, fundamental concepts like variables, conditions, loops, and functions transfer across languages',
      'Only if the other language is named Python as well'
    ],
    correctAnswer: 2,
    explanation: 'Core computational thinking and programming concepts learned in Python carry over when learning other languages.'
  },
      {
    question: '7. Is Python always the best language choice for every single project?',
    options: [
      'Yes, Python is the only language used in software engineering',
      'No, every language has strengths and trade-offs depending on project requirements',
      'Yes, web browsers run Python natively instead of JavaScript',
      'Yes, Python replaces every other programming language completely'
    ],
    correctAnswer: 1,
    explanation: 'Different projects prioritize different requirements (e.g., low-level memory control, browser UI), so developers choose the best tool for the job.'
  },
      {
    question: '8. Why does CodeFlow emphasize understanding logic over just writing syntax?',
    options: [
      'Because programmers need to understand how and why their code behaves as it does to solve real problems',
      'Because CodeFlow does not allow running code',
      'Because errors never occur when writing Python',
      'Because syntax does not matter at all in Python'
    ],
    correctAnswer: 0,
    explanation: 'Understanding programming logic is what allows coders to design algorithms, debug errors, and build reliable software.'
  }
    ],

    summaryPoints: [
      'Python has relatively readable syntax.',
      'Python can be beginner-friendly while also being used professionally.',
      'Python often allows programmers to express ideas with relatively concise code.',
      'Python has a large standard library.',
      'Python has a large ecosystem of third-party packages.',
      'Python has a large global community.',
      'Python is available on major operating systems.',
      'Python is useful for experimentation and rapid prototyping.',
      'Programming concepts learned with Python can help when learning other languages.',
      'Python is powerful, but it is not automatically the best choice for every problem.',
      'Understanding programming logic remains important even when tools or AI can help generate code.'
    ],

    previousLesson: {
      topicId: 'py-intro',
      subtopicId: 'what-can-python-do',
      title: 'What Can Python Do?'
    },

    nextLesson: {
      topicId: 'py-intro',
      subtopicId: 'how-python-executes-code',
      title: 'How Python Executes Code'
    }
  },

  // Lesson 4: How Python Executes Code
  'py-intro/how-python-executes-code': {
    id: 'py-intro/how-python-executes-code',
    topicId: 'py-intro',
    subtopicId: 'py-intro-execution',
    title: 'How Python Executes Code',
    subtitle: 'Understanding source code, execution order, expressions, statements, and output lifecycle',
    categoryTitle: 'PYTHON BASICS',
    contentMarkdown: `# 1. START WITH THE BIG PICTURE

When you write Python code, you are writing instructions for the computer.

When you run your program, Python processes those instructions step by step and performs the operations they describe.

\`\`\`text
YOU WRITE CODE
      ↓
PYTHON PROCESSES THE CODE
      ↓
INSTRUCTIONS EXECUTE
      ↓
YOU SEE THE RESULT
\`\`\`

> 💡 **Tiny Example:**
> \`\`\`python
> print("Hello")
> \`\`\`
> **Output:** \`Hello\`
> 
> The code is the instruction. Running the program causes Python to execute that instruction, and the output is the result produced on screen.

---

# 2. SOURCE CODE

**Source Code** is the human-readable program written by a programmer.

\`\`\`python
print("Hello")
print("Python")
\`\`\`

This text is Python source code. Python source code files use the **\` .py \`** file extension (e.g., \`hello.py\`). When you write code inside CodeFlow's editor, you are writing Python source code.

---

# 3. WHAT HAPPENS WHEN YOU PRESS RUN?

When you press the **Run** button in CodeFlow, the execution lifecycle begins:

\`\`\`text
Python Source Code
      ↓
Python Processes Program
      ↓
Instructions Execute Step-by-Step
      ↓
Output Produced
      ↓
Program Finishes
\`\`\`

CodeFlow's interactive visualizer steps through this process line by line so you can watch execution happen in real time.

---

# 4. WHAT IS THE PYTHON INTERPRETER?

The **Python Interpreter** (or runtime) is the software system responsible for processing and executing your Python code according to Python's formal language rules.

\`\`\`text
Python Code  →  Python Interpreter / Runtime  →  Execution  →  Result
\`\`\`

The interpreter handles low-level execution details automatically so you can focus on writing logical code.

---

# 5. EXECUTION ORDER: TOP TO BOTTOM

For simple, straight-line programs, Python executes instructions **from top to bottom** in sequential order.

\`\`\`python
print("First")
print("Second")
print("Third")
\`\`\`

**Output:**
\`\`\`text
First
Second
Third
\`\`\`

Python reaches \`print("First")\` on Line 1 before moving to \`print("Second")\` on Line 2, and finally \`print("Third")\` on Line 3.

---

# 6. CODEFLOW VISUALIZATION — TOP TO BOTTOM

\`\`\`text
PROGRAM STARTS
      ↓
[ Line 1 Highlighted ]  print("First")   →  Output: First
      ↓
[ Line 2 Highlighted ]  print("Second")  →  Output: First \n Second
      ↓
[ Line 3 Highlighted ]  print("Third")   →  Output: First \n Second \n Third
      ↓
PROGRAM FINISHES
\`\`\`

*CodeFlow highlights only one active execution line at a time so you can visually track Python moving through your program.*

---

# 7. TOP-TO-BOTTOM IS A STARTING RULE, NOT THE WHOLE STORY

While simple programs execute line by line from top to bottom, advanced programming structures will change execution flow later:
- **Conditions (\`if\`):** Can choose whether specific code blocks execute or get skipped.
- **Loops (\`for\` / \`while\`):** Can repeat code blocks multiple times.
- **Functions:** Can jump execution to reusable logic blocks and return.
- **Exceptions:** Can interrupt or redirect normal execution flow when an error occurs.

\`\`\`text
NORMAL SIMPLE FLOW:       ADVANCED FLOW:
  1 → 2 → 3 → 4           1 → Branch (if/else)
                          1 → Loop (repeat 2-3 times)
                          1 → Function Call → Return
\`\`\`

> 🧠 **This is why CodeFlow doesn't only teach code syntax. It teaches FLOW.**

---

# 8. STATEMENTS

A **statement** is a complete instruction in a Python program that performs an action.

Examples:
- \`print("Hello")\`  *(Displays text on screen)*
- \`x = 10\`            *(Stores value 10 into variable x)*

---

# 9. EXPRESSIONS

An **expression** is a piece of code that Python evaluates to produce a single value.

\`\`\`python
5 + 3
\`\`\`
Python evaluates the expression \`5 + 3\` and gets \`8\`.

When you write:
\`\`\`python
print(5 + 3)
\`\`\`

**Evaluation Flow:**
\`\`\`text
5 + 3  →  Evaluated to 8  →  Passed to print  →  Output: 8
\`\`\`

---

# 10. WORK WITHIN A SINGLE LINE

A single statement can involve multiple conceptual steps:

\`\`\`python
print(10 + 5)
\`\`\`

\`\`\`text
1. Python reaches the statement: print(10 + 5)
2. Python evaluates the expression inside: 10 + 5  →  15
3. The result (15) is passed to print()
4. Output: 15
\`\`\`

---

# 11. CODEFLOW VISUALIZATION — EXPRESSION EVALUATION

\`\`\`text
Current Statement: print(10 + 5)
        ↓
Evaluate: 10 + 5  →  15
        ↓
Display Output: 15
\`\`\`

CodeFlow visualizes evaluation steps inside statements so you see *why* a result appears.

---

# 12. PROGRAM LIFECYCLE

\`\`\`python
print("Start")
print("End")
\`\`\`

**Output:**
\`\`\`text
Start
End
\`\`\`

\`\`\`text
PROGRAM START  →  Line 1 Executed  →  Line 2 Executed  →  PROGRAM END
\`\`\`

Every program has a clear beginning, step-by-step execution phase, and completion point.

---

# 13. OUTPUT IS NOT THE SAME AS EXECUTION

> ⚠️ **Important Distinction: Execution ≠ Output**

Not every statement displays something on screen!

For instance:
\`\`\`python
x = 10
\`\`\`
This line executes internally (storing 10 in memory), but produces **no visible output**.

Only when you run:
\`\`\`python
print(x)
\`\`\`
does visible output (\`10\`) appear!

---

# 14. CODE ORDER CAN CHANGE THE RESULT

Instruction order directly determines execution order and final results.

**Program A:**
\`\`\`python
print("A")
print("B")
\`\`\`
*Output:* \`A \n B\`

**Program B:**
\`\`\`python
print("B")
print("A")
\`\`\`
*Output:* \`B \n A\`

Changing instruction order changed execution order, which changed the final output. **Code order matters!**

---

# 15. PREDICT THE FLOW

Before pressing Run on code below, ask yourself:
1. *Which instruction executes first?*
2. *What will the complete output be?*

\`\`\`python
print("Morning")
print("Afternoon")
print("Night")
\`\`\`

*Predicting flow before running code is the single best habit for mastering programming!*

---

# 16. WHAT HAPPENS WHEN PYTHON ENCOUNTERS A PROBLEM?

Python code must follow strict syntax rules. If an error occurs, normal execution stops.

Consider this invalid statement:
\`\`\`python
print("Hello"
\`\`\`

*Because the closing parenthesis is missing, Python cannot execute this instruction and stops with an error message.*

---

# 17. VISUALIZING EXECUTION STOPPING

\`\`\`text
PROGRAM START
      ↓
Valid Line Executed  [ ✓ ]
      ↓
Problem Encountered  [ ❌ ]
      ↓
Execution Stops  (Error info displayed)
\`\`\`

Error messages are helpful notifications explaining what stopped execution.

---

# 18. EXECUTION FLOW VS CODE LAYOUT

\`\`\`text
Source Code Layout:     Sequential Execution:
Line 1                  Line 1
Line 2                     ↓
Line 3                  Line 2
Line 4                     ↓
                        Line 3
                           ↓
                        Line 4
\`\`\`

In later lessons, loops and conditions will allow code to branch (\`1 → 2 → 4\`) or repeat (\`1 → 2 → 2 → 3\`).

---

# 19. WHY UNDERSTANDING EXECUTION MATTERS

Instead of asking only *"What code should I type?"*, programmers ask:

> **"What happens step by step when this code runs?"**

Understanding execution enables you to:
- Predict program output accurately
- Track variable changes in memory
- Understand branching conditions & loops
- Debug errors quickly when code doesn't behave as expected

---

# 20. CODEFLOW'S FIRST MENTAL MODEL

> 🧠 **THE CORE CODEFLOW QUESTION:**
> 
> ### **"What is Python doing next?"**

Whenever you look at code, ask:
1. *Where does execution start?*
2. *What is the current statement?*
3. *What expression is being evaluated?*
4. *What happens after this line finishes?*
5. *When does the program end?*

---

# 21. THREE VISUAL CARDS: CODE vs EXECUTION vs OUTPUT

\`\`\`text
┌─────────────────────────┐
│        1. CODE          │  What you wrote in the editor
└─────────────────────────┘
            ↓
┌─────────────────────────┐
│      2. EXECUTION       │  What Python does when running
└─────────────────────────┘
            ↓
┌─────────────────────────┐
│        3. OUTPUT        │  What appears on screen
└─────────────────────────┘
\`\`\`

---

# 22. SIMPLE EXECUTION EXAMPLE

\`\`\`python
print("Step 1")
print(2 + 3)
print("Step 3")
\`\`\`

**Step-by-Step Execution:**
1. Execute Line 1 → Output: \`Step 1\`
2. Evaluate expression \`2 + 3\` → \`5\` → Output: \`5\`
3. Execute Line 3 → Output: \`Step 3\`

**Final Output:**
\`\`\`text
Step 1
5
Step 3
\`\`\`

---

# 23. TRY IT YOURSELF

In the editor below:
1. Click **Run** and watch line-by-line execution.
2. Swap the order of statements.
3. Click **Run** again and observe how the output changes!

---

# 24. PREDICT BEFORE RUNNING

\`\`\`python
print("A")
print(4 + 2)
print("B")
\`\`\`

*Predict the output before running:*
- First line output: \`A\`
- Second line evaluation: \`4 + 2\` → \`6\`
- Third line output: \`B\`
- **Result:** \`A \n 6 \n B\`

---

# 25. FIND THE EXECUTION ORDER

For statements:
\`\`\`python
print("Red")
print("Green")
print("Blue")
\`\`\`

Execution order will display:
\`\`\`text
1. Red
2. Green
3. Blue
\`\`\`

---

# 26. IMPORTANT BEGINNER MISUNDERSTANDINGS

> ❌ **Misunderstanding 1:** *"Python executes every program top-to-bottom no matter what."*  
> ✔️ **Correction:** Top-to-bottom is the default, but conditions, loops, functions, and errors change flow.
> 
> ❌ **Misunderstanding 2:** *"Every line of code produces visible output."*  
> ✔️ **Correction:** Many statements (like storing variables) execute internally without producing output.
> 
> ❌ **Misunderstanding 3:** *"One line always means one single operation."*  
> ✔️ **Correction:** A single statement can evaluate complex expressions before completing.
> 
> ❌ **Misunderstanding 4:** *"Output and execution mean the same thing."*  
> ✔️ **Correction:** Execution is the process of running code; output is only visible text displayed.
> 
> ❌ **Misunderstanding 5:** *"CodeFlow shows physical CPU hardware."*  
> ✔️ **Correction:** CodeFlow provides an educational visualization of Python language-level execution.`,

    codePreview: {
      code: `print("Step 1")\nprint(2 + 3)\nprint("Step 3")`,
      output: `Step 1\n5\nStep 3`,
      caption: `Demonstrating sequential execution and expression evaluation.`
    },

    glossary: [
      { term: 'Source Code', definition: 'The human-readable programming instructions written by a programmer.' },
      { term: 'Execution', definition: 'The process of running a computer program step by step.' },
      { term: 'Statement', definition: 'A complete instruction in a Python program that performs an action.' },
      { term: 'Expression', definition: 'A piece of code that Python evaluates to produce a single value.' },
      { term: 'Interpreter', definition: 'The software environment that processes and executes Python code.' },
      { term: 'Output', definition: 'Visible information produced by a program on screen.' },
      { term: 'Execution Order', definition: 'The specific sequence in which program statements execute.' },
      { term: 'Control Flow', definition: 'The path execution takes through a program.' }
    ],

    quizzes: [
      {
    question: '1. What is source code?',
    options: [
      'The physical silicon chips inside a computer',
      'A web browser search history',
      'An encrypted password file',
      'The human-readable programming instructions written by a programmer'
    ],
    correctAnswer: 3,
    explanation: 'Source code refers to the human-readable text code written by programmers (e.g. hello.py).'
  },
      {
    question: '2. What happens when a Python program is run?',
    options: [
      'Nothing happens unless an AI is connected',
      'The Python interpreter processes and executes the program instructions step by step',
      'The code is deleted permanently',
      'The computer shuts down automatically'
    ],
    correctAnswer: 1,
    explanation: 'Running a program starts execution, where Python processes statements sequentially.'
  },
      {
    question: '3. For simple code with print("A") followed by print("B"), which statement executes first?',
    options: [
      'print("B") on Line 2 executes first',
      'Neither executes',
      'Both execute at the exact same millisecond',
      'print("A") on Line 1 executes first'
    ],
    correctAnswer: 3,
    explanation: 'In sequential code, Python starts at Line 1 and executes statements top-to-bottom.'
  },
      {
    question: '4. What is the output of print(2 + 3)?',
    options: [
      'Error',
      '5',
      '23',
      '2 + 3'
    ],
    correctAnswer: 1,
    explanation: 'Python evaluates the expression 2 + 3 to 5, then displays 5.'
  },
      {
    question: '5. Does every Python statement produce visible output on screen?',
    options: [
      'Yes, every line of code automatically prints text',
      'Yes, Python requires all lines to display text',
      'Only lines written in uppercase',
      'No, many statements (like storing variables or calculations) execute without displaying output'
    ],
    correctAnswer: 3,
    explanation: 'Execution and output are different. Storing data or internal calculations execute without printing unless print() is used.'
  },
      {
    question: '6. What is an expression in Python?',
    options: [
      'An error message window',
      'A type of physical keyboard button',
      'Code that Python evaluates to produce a value',
      'A comment describing code'
    ],
    correctAnswer: 2,
    explanation: 'An expression (like 5 + 3 or 10 * 2) is code evaluated by Python to produce a value.'
  },
      {
    question: '7. Does Python always execute every program top to bottom exactly once?',
    options: [
      'No, conditions (if), loops, functions, and errors can change control flow',
      'Yes, Python cannot skip or repeat lines',
      'Yes, Python ignores loops',
      'Yes, code layout and execution order are identical in all programs'
    ],
    correctAnswer: 0,
    explanation: 'While top-to-bottom is the default for simple scripts, control-flow structures (if, loops, functions) change execution paths.'
  },
      {
    question: '8. What core question should CodeFlow learners regularly ask when inspecting code?',
    options: [
      '"How fast can I type this code?"',
      '"How many lines can I delete?"',
      '"What color is the editor background?"',
      '"What is Python doing next?"'
    ],
    correctAnswer: 3,
    explanation: 'Asking "What is Python doing next?" builds strong mental models of control flow and step-by-step execution.'
  }
    ],

    summaryPoints: [
      'Python programs contain instructions.',
      'The code written by a programmer is called source code.',
      'Running a program causes Python to process and execute its instructions.',
      'Simple straight-line programs commonly execute one statement after another.',
      'Order matters.',
      'Expressions can be evaluated as part of executing a statement.',
      'Execution and output are different concepts.',
      'Not every statement produces visible output.',
      'Errors can interrupt normal execution.',
      'Conditions, loops, and functions will later change the execution flow.',
      'CodeFlow helps visualize what happens while code runs.'
    ],

    previousLesson: {
      topicId: 'py-intro',
      subtopicId: 'why-python',
      title: 'Why Python?'
    },

    nextLesson: {
      topicId: 'py-intro',
      subtopicId: 'your-first-python-program',
      title: 'Your First Python Program'
    }
  },

  // Lesson 5: Your First Python Program
  'py-intro/your-first-python-program': {
    id: 'py-intro/your-first-python-program',
    topicId: 'py-intro',
    subtopicId: 'py-intro-first-program',
    title: 'Your First Python Program',
    subtitle: 'Write, run, observe, modify, and debug your very first Python program in CodeFlow',
    categoryTitle: 'PYTHON BASICS',
    contentMarkdown: `# 1. YOUR FIRST PYTHON PROGRAM

Below is your very first Python program:

\`\`\`python
print("Hello, World!")
\`\`\`

**Output:**
\`\`\`text
Hello, World!
\`\`\`

When you click **Run**, you experience the core programming loop:

\`\`\`text
CODE  →  RUN  →  OUTPUT
\`\`\`

---

# 2. WHAT DOES THIS PROGRAM DO?

The program displays the message: **\`Hello, World!\`**

Let's break the single instruction down into three understandable parts:
- **\`print\`** → Python's built-in tool that displays information on screen.
- **\`( )\`** → Parentheses that contain what we are providing to \`print\`.
- **\`"Hello, World!"\`** → The literal text message we want to display.

---

# 3. UNDERSTANDING print()

\`print()\` is a built-in Python function used to display information as output.

> 💡 *Note:* You do not need to understand functions or advanced programming concepts yet! For now, think of \`print()\` as Python's built-in loudspeaker tool that shows information on screen.

\`\`\`python
print("Hello")
\`\`\`
**Output:** \`Hello\`

Whatever text we place inside \`print()\` will appear in the output window.

---

# 4. UNDERSTANDING THE TEXT

In \`print("Hello, World!")\`, the words inside the quotation marks are text.

Python uses quotation marks so it knows that \`Hello, World!\` should be treated as literal text.

\`\`\`text
print              → Display something
( )                → Holds the information given to print
"Hello, World!"    → The text message to display
\`\`\`

*(Python calls text enclosed in quotation marks a **string**. You will learn strings in detail later in the course!)*

---

# 5. WHY ARE QUOTATION MARKS IMPORTANT?

**Correct:**
\`\`\`python
print("Hello")
\`\`\`
*Output:* \`Hello\`

**Incorrect:**
\`\`\`python
print(Hello)
\`\`\`

Without quotation marks, Python does not treat \`Hello\` as literal text. Instead, Python looks for a programming component or variable named \`Hello\`, causing a missing name error!

> 📌 **Rule:** If you want Python to display literal text, always put that text inside quotation marks!

---

# 6. SINGLE AND DOUBLE QUOTES

Python allows text to be enclosed in either **double quotes** (\`"\`) or **single quotes** (\`'\`):

\`\`\`python
print("Hello")
print('Hello')
\`\`\`

**Both produce:**
\`\`\`text
Hello
\`\`\`

The opening and closing quotation marks must match!

---

# 7. UNDERSTANDING THE PARENTHESES

The parentheses belong to the \`print()\` call. The information to display is placed between them:

\`\`\`text
print  (  "CodeFlow"  )
  │    │       │       │
  │    │       │       └ Closing parenthesis
  │    │       └ Text to display
  │    └ Opening parenthesis
  └ Python print function
\`\`\`

---

# 8. YOUR FIRST EXECUTION LIFECYCLE

When you press **Run** on \`print("Hello, World!")\`:

\`\`\`text
PROGRAM START
      ↓
Current Statement: print("Hello, World!")
      ↓
Python Executes Statement
      ↓
OUTPUT GENERATED: Hello, World!
      ↓
PROGRAM END
\`\`\`

---

# 9. WRITE MORE THAN ONE INSTRUCTION

A program can contain multiple statements executed in order:

\`\`\`python
print("Hello, World!")
print("I am learning Python.")
print("This is my first program.")
\`\`\`

**Output:**
\`\`\`text
Hello, World!
I am learning Python.
This is my first program.
\`\`\`

Python executes these three \`print()\` instructions line by line from top to bottom.

---

# 10. CODEFLOW EXECUTION VISUALIZATION

\`\`\`text
PROGRAM START
      ↓
[ Line 1 Highlighted ]  print("Hello, World!")           →  Output: Hello, World!
      ↓
[ Line 2 Highlighted ]  print("I am learning Python.")   →  Output: Hello, World! \n I am learning Python.
      ↓
[ Line 3 Highlighted ]  print("This is my first program.")→  Output: Hello, World! \n I am learning Python. \n This is my first program.
      ↓
PROGRAM END
\`\`\`

\`\`\`text
CODE ORDER  →  EXECUTION ORDER  →  OUTPUT ORDER
\`\`\`

---

# 11. MODIFY YOUR PROGRAM

Try changing the message inside the quotes:

\`\`\`python
print("Hello, CodeFlow!")
\`\`\`

**Output:**
\`\`\`text
Hello, CodeFlow!
\`\`\`

Changing text inside quotation marks changes what the program displays on screen.

\`\`\`text
EDIT  →  RUN  →  OBSERVE
\`\`\`

---

# 12. PERSONALIZE THE PROGRAM

Try writing a program that introduces yourself:

\`\`\`python
print("Hello!")
print("My name is Alex.")
print("I am learning Python.")
\`\`\`

*Replace "Alex" with your own name in the editor to make it personal!*

---

# 13. PRINTING NUMBERS

\`print()\` can display numbers as well as text:

\`\`\`python
print(10)
\`\`\`
**Output:** \`10\`

Because \`10\` is a number, quotation marks are not required!

**Comparison:**
- \`print(10)\`   → Displays number 10
- \`print("10")\` → Displays text "10"

*(You will learn why this distinction matters in the Data Types module!)*

---

# 14. SIMPLE CALCULATION

\`\`\`python
print(5 + 3)
\`\`\`

**Output:**
\`\`\`text
8
\`\`\`

Python first evaluates the expression \`5 + 3\` to \`8\`, then \`print()\` displays \`8\`.

\`\`\`text
print(5 + 3)  →  Evaluates 5 + 3  →  8  →  print(8)  →  Output: 8
\`\`\`

---

# 15. TEXT VS CALCULATION

Compare these two instructions:

\`\`\`python
print(5 + 3)
print("5 + 3")
\`\`\`

**Output:**
\`\`\`text
8
5 + 3
\`\`\`

- Without quotes (\`5 + 3\`), Python calculates the mathematical result (\`8\`).
- Inside quotes (\`"5 + 3"\`), Python treats it as literal text (\`5 + 3\`).

---

# 16. OUTPUT IS NOT PART OF THE CODE

> ⚠️ **Important:** Code and Output are visually separate in CodeFlow.

You write:
\`\`\`python
print("Hello")
\`\`\`

You do **not** type \`Hello\` as another line of Python code just because it appears in the output panel!

---

# 17. COMMON MISTAKE 1 — MISSING QUOTE

\`\`\`python
print("Hello)
\`\`\`
❌ Missing closing quotation mark!

**Fix:**
\`\`\`python
print("Hello")
\`\`\`

---

# 18. COMMON MISTAKE 2 — MISSING PARENTHESIS

\`\`\`python
print("Hello"
\`\`\`
❌ Missing closing parenthesis!

**Fix:**
\`\`\`python
print("Hello")
\`\`\`

---

# 19. COMMON MISTAKE 3 — WRONG CAPITALIZATION

\`\`\`python
Print("Hello")
\`\`\`
❌ Capital \`P\` in \`Print\`!

Python is **case-sensitive**. \`print\` and \`Print\` are treated as different names.

**Fix:**
\`\`\`python
print("Hello")
\`\`\`

---

# 20. COMMON MISTAKE 4 — MISMATCHED QUOTES

\`\`\`python
print("Hello')
\`\`\`
❌ Opening with double quote \`"\` and closing with single quote \`'\`!

**Fix:**
\`\`\`python
print("Hello")   # or print('Hello')
\`\`\`

---

# 21. ERRORS ARE PART OF PROGRAMMING

When code has a mistake, Python displays an error message explaining what happened. Errors are not failures — they are helpful feedback!

\`\`\`text
READ ERROR  →  UNDERSTAND PROBLEM  →  FIX CODE  →  RUN AGAIN
\`\`\`

---

# 22. CODEFLOW DEBUGGING GUIDANCE

When an error occurs (such as \`print("Hello"\`), CodeFlow highlights the line and provides beginner guidance:

\`\`\`text
REAL PYTHON ERROR: SyntaxError: unexpected EOF while parsing
BEGINNER GUIDANCE: "Check for a missing closing parenthesis ')' at the end of line."
\`\`\`

---

# 23. PREDICT BEFORE RUNNING

\`\`\`python
print("Python")
print("is")
print("fun")
\`\`\`

*Predict the output before running:*
- Line 1 → \`Python\`
- Line 2 → \`is\`
- Line 3 → \`fun\`

---

# 24. PREDICT THE RESULT

\`\`\`python
print(2 + 3)
print("2 + 3")
\`\`\`

*Predict:*
Line 1 prints \`5\`. Line 2 prints \`2 + 3\`.

---

# 25. TRY IT YOURSELF — ACTIVITY 1

Change:
\`\`\`python
print("Hello, World!")
\`\`\`
to display:
\`\`\`python
print("Hello, CodeFlow!")
\`\`\`

---

# 26. TRY IT YOURSELF — ACTIVITY 2

Write 3 lines of code to display:
\`\`\`python
print("My first Python program")
print("I wrote this code")
print("It works!")
\`\`\`

---

# 27. TRY IT YOURSELF — ACTIVITY 3

Write a program to display the calculation result of 10 + 5:
\`\`\`python
print(10 + 5)
\`\`\`
*Output:* \`15\`

---

# 28. FIX THE PROGRAM (DEBUGGING CHALLENGE)

Fix all 3 lines:
\`\`\`python
Print("Hello")
print("Python'
print("CodeFlow"
\`\`\`

**Corrected:**
\`\`\`python
print("Hello")
print("Python")
print("CodeFlow")
\`\`\`

---

# 29. MINI CHALLENGE: INTRODUCE YOURSELF

Write a program with 4 lines displaying:
1. A greeting
2. Your name
3. Something you like
4. A message saying you are learning Python!

\`\`\`python
print("Hello!")
print("My name is Alex.")
print("I like coding.")
print("I am learning Python!")
\`\`\`

---

# 30. CODEFLOW RECURRING LEARNING LOOP

\`\`\`text
  WRITE      →  Create your code
    ↓
 PREDICT     →  Guess what will happen
    ↓
   RUN       →  Execute the program
    ↓
  WATCH      →  Observe step-by-step execution
    ↓
 COMPARE     →  Check actual output vs prediction
    ↓
  CHANGE     →  Modify code & fix errors
    ↓
 RUN AGAIN   →  Observe updated behavior!
\`\`\``,

    codePreview: {
      code: `print("Hello, World!")\nprint("Welcome to CodeFlow!")`,
      output: `Hello, World!\nWelcome to CodeFlow!`,
      caption: `Your very first multi-line Python program.`
    },

    glossary: [
      { term: 'Program', definition: 'A sequence of instructions designed to perform a task.' },
      { term: 'Source Code', definition: 'The human-readable code written by a programmer.' },
      { term: 'print()', definition: 'A built-in Python function used to display output on screen.' },
      { term: 'Text', definition: 'Characters such as words and sentences.' },
      { term: 'String', definition: "Python's data format for text enclosed in quotation marks." },
      { term: 'Output', definition: 'Information displayed or produced by a running program.' },
      { term: 'Run', definition: 'Executing a program so Python processes its instructions.' },
      { term: 'Error', definition: 'A message indicating that Python encountered a problem preventing execution.' },
      { term: 'Case-Sensitive', definition: 'Distinguishing uppercase and lowercase letters (e.g. print vs Print).' }
    ],

    quizzes: [
      {
    question: '1. What is the output of print("Hello")?',
    options: [
      'print("Hello")',
      'Hello',
      'Error',
      '"Hello"'
    ],
    correctAnswer: 1,
    explanation: 'print() displays the text inside the quotation marks without the quotes themselves.'
  },
      {
    question: '2. Which statement correctly displays the text Python on screen?',
    options: [
      'Print("Python")',
      'print "Python"',
      'print("Python")',
      'print(Python)'
    ],
    correctAnswer: 2,
    explanation: 'Literal text must be enclosed in quotation marks and use lowercase print().'
  },
      {
    question: '3. What is the output of print(4 + 2)?',
    options: [
      '6',
      '4 + 2',
      '42',
      '"4 + 2"'
    ],
    correctAnswer: 0,
    explanation: 'Without quotes, Python evaluates the expression 4 + 2 to 6 before printing.'
  },
      {
    question: '4. What is the output of print("4 + 2")?',
    options: [
      '4 + 2',
      '42',
      '6',
      'Error'
    ],
    correctAnswer: 0,
    explanation: 'Inside quotation marks, "4 + 2" is treated as literal text.'
  },
      {
    question: '5. What is wrong with print("Hello"?',
    options: [
      'The closing parenthesis ) is missing',
      'Nothing is wrong',
      'The word print is misspelled',
      'Double quotes are not allowed'
    ],
    correctAnswer: 0,
    explanation: 'Every opening parenthesis ( must have a matching closing parenthesis ).'
  },
      {
    question: '6. Are print and Print treated as the same function in Python?',
    options: [
      'Yes, both work identically',
      'Only on Windows',
      'Yes, capitalization does not matter in Python',
      'No, Python is case-sensitive, so Print will cause an error'
    ],
    correctAnswer: 3,
    explanation: 'Python is case-sensitive. Built-in print() must be written in lowercase.'
  },
      {
    question: '7. In print("A") followed by print("B"), which executes first?',
    options: [
      'print("A") on Line 1 executes first',
      'Neither executes',
      'print("B") on Line 2 executes first',
      'Both execute simultaneously'
    ],
    correctAnswer: 0,
    explanation: 'Python executes simple straight-line programs in sequential top-to-bottom order.'
  },
      {
    question: '8. What should you do before clicking Run in CodeFlow?',
    options: [
      'Predict what you think the output will be',
      'Close the browser',
      'Delete all code',
      'Turn off your screen'
    ],
    correctAnswer: 0,
    explanation: 'Predicting output before running code builds strong mental models and programming habits.'
  }
    ],

    summaryPoints: [
      'How to write a very small Python program.',
      'How to run Python code.',
      'How to display text using print().',
      'Text can be placed inside quotation marks.',
      'Python supports single and double quotes for simple strings.',
      'Numbers can be printed without quotation marks.',
      'Python can evaluate a simple calculation before displaying the result.',
      '"5 + 3" and 5 + 3 are not the same.',
      'Multiple statements can produce output in sequence.',
      'Python is case-sensitive.',
      'Small syntax mistakes can prevent code from running correctly.',
      'Errors can help you identify what needs to be fixed.',
      'You can modify code, run it again, and observe how the result changes.'
    ],

    previousLesson: {
      topicId: 'py-intro',
      subtopicId: 'why-python',
      title: 'Why Python?'
    },

    nextLesson: {
      topicId: 'py-getting-started',
      subtopicId: 'python-installation',
      title: 'Python Installation'
    }
  },

  // Lesson 6: Python Installation (Module 2: Python Getting Started)
  'py-getting-started/python-installation': {
    id: 'py-getting-started/python-installation',
    topicId: 'py-getting-started',
    subtopicId: 'py-gs-install',
    title: 'Python Installation',
    subtitle: 'Learn how to check, install, verify, and troubleshoot Python 3 on Windows, macOS, and Linux',
    categoryTitle: 'PYTHON GETTING STARTED',
    contentMarkdown: `# 1. DO I NEED TO INSTALL PYTHON?

Inside CodeFlow, you can write, run, and visualize Python programs using our built-in online learning environment without installing anything locally on your computer!

However, if you want to create and run Python programs directly on your own computer outside of CodeFlow, you will need a local Python installation.

\`\`\`text
LEARNING INSIDE CODEFLOW:
CodeFlow Editor  →  Run Python  →  See Output (No local install needed)

USING PYTHON ON YOUR COMPUTER:
Install Python  →  Write Python Code  →  Run in Terminal  →  See Output
\`\`\`

> 💡 *Note:* Installing Python locally and learning Python programming logic are related, but separate steps. You can continue learning inside CodeFlow even if you cannot install Python locally right now!

---

# 2. WHAT DOES "INSTALL PYTHON" MEAN?

Installing Python adds the software runtime needed for your computer to process and execute Python programs.

\`\`\`text
Python Source Code (.py)
         ↓
Python Installed on Computer (Runtime / Interpreter)
         ↓
Program Executes Successfully
\`\`\`

The installation provides the Python execution engine that understands Python syntax and executes your instructions.

---

# 3. CHECK WHETHER PYTHON IS ALREADY INSTALLED

Before downloading anything, check if Python is already available on your computer!

Open your terminal or command prompt and type:

\`\`\`bash
python --version
\`\`\`

or on some systems:

\`\`\`bash
python3 --version
\`\`\`

**Expected Output:**
\`\`\`text
Python 3.x.x
\`\`\`
*(For example, \`Python 3.11.4\` or \`Python 3.12.0\` indicates that a modern Python 3 release is installed and ready!)*

---

# 4. UNDERSTANDING python VS python3 VS py

Depending on your operating system and setup, the command used to launch Python 3 varies:

- **\`python\`** → Standard command on Windows and configured systems.
- **\`python3\`** → Standard command on macOS and Linux distributions.
- **\`py\`** → Windows Python launcher that automatically selects the latest installed Python 3.

All of these launch the Python environment. You should use whichever command points to your Python 3 installation!

---

# 5. WHERE SHOULD PYTHON COME FROM?

Always download Python from the official Python Software Foundation website:

> 🌐 **Official Source:** [python.org/downloads](https://www.python.org/downloads)

Never download Python installers from unverified third-party websites. Always select a **current supported Python 3 release**.

---

# 6. CHOOSE YOUR OPERATING SYSTEM

Below are step-by-step instructions for Windows, macOS, and Linux:

---

# 7. INSTALLING PYTHON ON WINDOWS

### Step 1: Download Official Installer
Visit [python.org/downloads](https://www.python.org/downloads) and click **Download Python 3.x**.

### Step 2: Run the Installer
Locate the downloaded \`.exe\` file and open it.

### Step 3: IMPORTANT — Add Python to PATH
Check the checkbox labeled **"Add python.exe to PATH"** at the bottom of the installer window!

> ⚠️ *Enabling PATH allows Command Prompt and PowerShell to find and run Python from any folder.*

### Step 4: Complete Installation
Click **Install Now**, wait for the setup to complete, then click **Close**.

### Step 5: Verify in a NEW Terminal
Close any existing terminal windows, open a **NEW** Command Prompt, and type:
\`\`\`bash
python --version
\`\`\`
or:
\`\`\`bash
py --version
\`\`\`

---

# 8. WHAT IS PATH?

**PATH** is a system environment setting that tells your terminal where to search for programs when you type a command.

\`\`\`text
You Type: python --version
      ↓
Terminal searches folders listed in PATH
      ↓
Python executable found in C:\\Python3xx\\
      ↓
Python displays version!
\`\`\`

---

# 9. WINDOWS TROUBLESHOOTING

If typing \`python\` displays *"command not found"* or opens the Microsoft Store:
1. Close all open Command Prompt / PowerShell windows and open a fresh terminal.
2. Try using the Windows launcher command: \`py --version\`
3. Rerun the downloaded Python installer, select **Modify/Repair**, and ensure **"Add Python to PATH"** is checked.

---

# 10. INSTALLING PYTHON ON macOS

### Step 1: Download macOS Installer
Visit [python.org/downloads](https://www.python.org/downloads) and download the **macOS 64-bit universal2 installer**.

### Step 2: Run the Package
Double-click the downloaded \`.pkg\` file and follow the standard installation wizard.

### Step 3: Verify in Terminal
Open **Terminal** (press \`Cmd + Space\`, type *Terminal*, press Enter) and run:
\`\`\`bash
python3 --version
\`\`\`

**Output:**
\`\`\`text
Python 3.x.x
\`\`\`

---

# 11. macOS: python VS python3

macOS uses **\`python3\`** as the terminal command for Python 3 installations. Whenever running commands or scripts on macOS, use \`python3\`.

---

# 12. INSTALLING PYTHON ON LINUX

Most Linux distributions come with Python 3 pre-installed. First check:

\`\`\`bash
python3 --version
\`\`\`

If Python 3 is not installed, install it using your distribution's official package manager:

- **Ubuntu / Debian:**
  \`\`\`bash
  sudo apt update && sudo apt install python3
  \`\`\`
- **Fedora / RHEL:**
  \`\`\`bash
  sudo dnf install python3
  \`\`\`
- **Arch Linux:**
  \`\`\`bash
  sudo pacman -S python
  \`\`\`

---

# 13. IMPORTANT LINUX WARNING

> ⚠️ **Good to Know:** Many core Linux system utilities depend on Python. **Never uninstall or delete the default system Python** on Linux! Always use your package manager to update or add Python 3 packages.

---

# 14. VERIFYING THE INSTALLATION

\`\`\`text
DOWNLOAD  →  INSTALL  →  OPEN NEW TERMINAL  →  RUN VERSION COMMAND  →  READY [ ✓ ]
\`\`\`

| Operating System | Verification Command | Expected Output |
| :--- | :--- | :--- |
| **Windows** | \`python --version\` or \`py --version\` | \`Python 3.x.x\` |
| **macOS** | \`python3 --version\` | \`Python 3.x.x\` |
| **Linux** | \`python3 --version\` | \`Python 3.x.x\` |

---

# 15. WHAT IS A TERMINAL?

A **terminal** is a text-based interface where you type commands for your operating system to execute.

- **Windows:** Command Prompt (\`cmd\`), PowerShell, or Windows Terminal
- **macOS:** Terminal application
- **Linux:** Terminal (bash / zsh)

> *Tip:* When you see a prompt symbol like \`>\` or \`$\`, type only the command itself (e.g. \`python3 --version\`), not the prompt symbol!

---

# 16. DO NOT TYPE TERMINAL COMMANDS AS PYTHON CODE

> ⚠️ **CRITICAL DISTINCTION FOR BEGINNERS**

\`\`\`text
TERMINAL COMMAND (Type in Command Prompt / Terminal app):
> python --version

PYTHON SOURCE CODE (Type inside .py file or CodeFlow Python editor):
print("Hello, World!")
\`\`\`

*Never type \`python --version\` inside a Python code file or CodeFlow editor — it is a system terminal command, not Python code!*

---

# 17. INSTALLATION CHECKLIST

- [ ] I know my operating system (Windows / macOS / Linux).
- [ ] I checked if Python 3 is already installed.
- [ ] I downloaded Python 3 from the official [python.org](https://www.python.org) site.
- [ ] I enabled *"Add Python to PATH"* (Windows users).
- [ ] I opened a **NEW** terminal window after installation.
- [ ] I ran the version command (\`python --version\` or \`python3 --version\`).
- [ ] I see \`Python 3.x.x\` displayed!

---

# 18. SHOULD I ALWAYS INSTALL THE NEWEST VERSION?

For learning, any current supported **Python 3** release (e.g. Python 3.10, 3.11, 3.12) is completely suitable. You do not need to upgrade your installation every time a minor patch is released.

---

# 19. INSTALLATION vs CODE EDITOR vs INTERPRETER

\`\`\`text
┌──────────────────────────────┐
│       1. PYTHON RUNTIME      │  Processes & executes Python code
└──────────────────────────────┘
               +
┌──────────────────────────────┐
│      2. CODE EDITOR (IDE)    │  Helps you write code (e.g. VS Code, PyCharm)
└──────────────────────────────┘
               +
┌──────────────────────────────┐
│     3. CODEFLOW PLATFORM     │  Online interactive visualizer & learning track
└──────────────────────────────┘
\`\`\`

---

# 20. TROUBLESHOOTING DECISION FLOW

\`\`\`text
Type: python --version  (or python3 --version)
          │
    Did you see Python 3.x.x?
    ├── YES  →  Python 3 is installed and ready! [ ✓ ]
    └── NO
          ├── Did you open a NEW terminal after installing?
          ├── On Windows, try: py --version
          └── On Windows, rerun installer & check "Add Python to PATH"
\`\`\``,

    codePreview: {
      code: `# Terminal Verification Example:\n# Type this command in your computer's Terminal (not in Python):\n# python3 --version`,
      output: `Python 3.12.0`,
      caption: `Verifying Python 3 availability via system terminal.`
    },

    glossary: [
      { term: 'Python Runtime', definition: 'The installed software engine required to process and run Python code on a computer.' },
      { term: 'Terminal', definition: 'A text-based command interface provided by operating systems (Command Prompt, PowerShell, Terminal).' },
      { term: 'PATH', definition: 'A system configuration setting that tells the terminal where to find executable software.' },
      { term: 'python3', definition: 'The standard terminal command used on macOS and Linux to launch Python 3.' },
      { term: 'py', definition: 'The official Windows Python launcher command.' },
      { term: 'Installer', definition: 'A setup package downloaded from python.org to install Python locally.' },
      { term: 'System Python', definition: 'The default Python installation used by Linux operating system utilities.' },
      { term: 'Verification', definition: 'Checking that Python is properly installed using a version command.' }
    ],

    quizzes: [
      {
    question: '1. Why would you install Python locally on your computer?',
    options: [
      'To clean dust out of computer hardware',
      'To provide the software environment needed to run Python programs locally',
      'To replace your operating system',
      'To speed up your internet Wi-Fi connection'
    ],
    correctAnswer: 1,
    explanation: 'Installing Python provides the local runtime/interpreter needed to execute Python code on your machine.'
  },
      {
    question: '2. Which command is commonly used to check Python version in a terminal?',
    options: [
      'python --version (or python3 --version)',
      'print(python)',
      'run python now',
      'check python version'
    ],
    correctAnswer: 0,
    explanation: 'python --version or python3 --version displays the installed Python release number in terminal.'
  },
      {
    question: '3. Where should the command python3 --version be entered?',
    options: [
      'In a web browser Google search bar',
      'Inside a Python source code file',
      'Inside a Microsoft Word document',
      'In a system terminal application (Command Prompt, PowerShell, or macOS Terminal)'
    ],
    correctAnswer: 3,
    explanation: 'python3 --version is a system terminal command, not Python source code.'
  },
      {
    question: '4. What does the output Python 3.11.4 indicate?',
    options: [
      'A modern Python 3 installation is available through that command',
      'You need to buy a new computer',
      'An error has occurred',
      'Python 3 was deleted'
    ],
    correctAnswer: 0,
    explanation: 'Seeing Python 3.x.x confirms that Python 3 is installed and accessible.'
  },
      {
    question: '5. Are Python and a code editor (like VS Code) the same thing?',
    options: [
      'Yes, they are identical programs',
      'Yes, VS Code is built into Python',
      'No, Python is the execution runtime; a code editor is a tool used to write and manage code text',
      'No, code editors cannot work with Python'
    ],
    correctAnswer: 2,
    explanation: 'Python executes code; code editors like VS Code or PyCharm help you edit and format code files.'
  },
      {
    question: '6. What important option should Windows users enable during Python installation?',
    options: [
      'Delete C: drive',
      'Uninstall Windows',
      'Add python.exe to PATH',
      'Disable Command Prompt'
    ],
    correctAnswer: 2,
    explanation: 'Adding Python to PATH allows Command Prompt and PowerShell to find the python command from any directory.'
  },
      {
    question: '7. What should Linux users avoid doing with system Python?',
    options: [
      'Running python3 --version',
      'Using the terminal',
      'Deleting or replacing default system Python',
      'Installing Python packages'
    ],
    correctAnswer: 2,
    explanation: 'Linux system tools rely on default Python; deleting system Python can break operating system components.'
  },
      {
    question: '8. If CodeFlow provides an online Python environment, is local installation mandatory before practicing in CodeFlow?',
    options: [
      'No, CodeFlow allows you to write, run, visualize, and practice Python directly in your browser',
      'Yes, browser learning requires a local server',
      'Yes, Python only works offline',
      'Yes, CodeFlow will not load without local Python'
    ],
    correctAnswer: 0,
    explanation: 'CodeFlow built-in environment lets you practice Python immediately without local setup.'
  }
    ],

    summaryPoints: [
      'What installing Python means.',
      'You may already have access to Python 3 on your system.',
      'How to check whether Python 3 is available using terminal commands.',
      'python, python3, or py may be used depending on your operating system.',
      'Python should always be downloaded from official source python.org.',
      'Installation options (such as PATH on Windows) make terminal access easier.',
      'Terminal commands are distinct from Python source code.',
      'Python runtime and code editors are separate tools.',
      'Seeing Python 3.x.x confirms Python 3 availability.',
      'CodeFlow allows you to practice Python in-browser without local installation.'
    ],

    previousLesson: {
      topicId: 'py-intro',
      subtopicId: 'your-first-python-program',
      title: 'Your First Python Program'
    },

    nextLesson: {
      topicId: 'py-getting-started',
      subtopicId: 'python-interpreter',
      title: 'Python Interpreter'
    }
  },

  // Lesson 7: Python Interpreter (Module 2: Python Getting Started)
  'py-getting-started/python-interpreter': {
    id: 'py-getting-started/python-interpreter',
    topicId: 'py-getting-started',
    subtopicId: 'py-gs-interpreter',
    title: 'Python Interpreter',
    subtitle: 'Understand Python runtime processing, interactive mode, the REPL cycle, and prompt environments',
    categoryTitle: 'PYTHON GETTING STARTED',
    contentMarkdown: `# 1. WHAT IS THE PYTHON INTERPRETER?

The **Python Interpreter** is the software engine that processes Python code and executes it according to Python's formal language rules.

\`\`\`text
Python Source Code  →  Python Interpreter  →  Code Executes  →  Result
\`\`\`

When you run Python programs, the interpreter handles the low-level processing automatically so you can focus on writing logic.

---

# 2. WHY DO WE NEED AN INTERPRETER?

Humans write readable Python code:
\`\`\`python
print("Hello")
\`\`\`

Computers do not treat text as natural human language. The Python interpreter reads your program, verifies its syntax, and performs the specified actions.

---

# 3. INTERPRETER DOES NOT MEAN "UNDERSTANDS ENGLISH"

> ⚠️ **Important:** Python is human-readable, but the interpreter follows strict syntax rules!

- **Valid Python:** \`print("Hello")\`
- **Invalid Python:** \`display hello on the screen\`

The interpreter expects instructions that strictly follow Python's language rules.

---

# 4. STARTING PYTHON INTERACTIVELY

After Python is installed, you can start an **Interactive Python Session** inside your terminal by typing:

\`\`\`bash
python
\`\`\`
or on macOS/Linux:
\`\`\`bash
python3
\`\`\`

**Terminal Output:**
\`\`\`text
Python 3.12.0 (main, Oct  2 2023, 12:00:00)
Type "help", "copyright", "credits" or "license" for more information.
>>>
\`\`\`

The **\`>>>\`** symbol is called the **primary prompt**. It means the Python interpreter is ready for your input!

---

# 5. WHAT IS INTERACTIVE MODE?

In **Interactive Mode**, you type Python code and receive results immediately:

\`\`\`text
Type Python Code  →  Press Enter  →  Python Evaluates It  →  See Result  →  Enter Next Line
\`\`\`

Interactive mode is ideal for:
- Testing small expressions & math
- Checking syntax rules
- Trying out builtin functions
- Learning & experimenting with new ideas

---

# 6. YOUR FIRST INTERACTIVE COMMAND

In your terminal:
\`\`\`text
>>> print("Hello")
Hello
\`\`\`

> 📌 **Important Distinction:**
> - **\`>>>\`** → Interpreter prompt symbol (Do NOT type this!).
> - **\`print("Hello")\`** → Code you type.
> - **\`Hello\`** → Result displayed by Python.

---

# 7. DO NOT COPY >>> INTO YOUR CODE FILES!

> ⚠️ **WARNING CARD FOR BEGINNERS**

\`\`\`text
INTERACTIVE INTERPRETER (In Terminal):
>>> print("Hello")

PYTHON SOURCE FILE (.py file / CodeFlow editor):
print("Hello")
\`\`\`

*Never copy the \`>>>\` prompt into a \`.py\` file or CodeFlow code editor — \`>>>\` is part of the interactive interface, not Python code!*

---

# 8. EVALUATING EXPRESSIONS IN INTERACTIVE MODE

In interactive mode, typing an expression displays its evaluated value automatically:

\`\`\`text
>>> 2 + 3
5
>>> 10 * 2
20
\`\`\`

\`\`\`text
INPUT: 2 + 3  →  EVALUATE: 2 + 3  →  RESULT: 5
\`\`\`

---

# 9. print() VS INTERACTIVE EXPRESSION RESULTS

- **Interactive REPL Mode:** Entering \`5 + 3\` auto-displays \`8\`.
- **Python Source File (.py):** Writing \`5 + 3\` evaluates internally, but requires **\`print(5 + 3)\`** to display \`8\` on screen!

---

# 10. WHAT IS A REPL?

Interactive environments are called a **REPL**:

- **R**ead → Python reads the instruction you typed.
- **E**valuate → Python processes/evaluates the code.
- **P**rint → Python displays the resulting value on screen.
- **L**oop → Python returns to \`>>>\` ready for your next input!

---

# 11. CODEFLOW REPL VISUALIZATION

\`\`\`text
>>> 5 + 3
      ↓
READ: 5 + 3
      ↓
EVALUATE: 5 + 3  →  8
      ↓
DISPLAY RESULT: 8
      ↓
READY AGAIN: >>>
\`\`\`

---

# 12. ENTERING MULTIPLE COMMANDS

\`\`\`text
>>> print("Hello")
Hello
>>> print("Python")
Python
>>> 10 + 5
15
>>>
\`\`\`

After each command finishes, the \`>>>\` prompt returns.

---

# 13. THE >>> PROMPT vs THE ... PROMPT

- **\`>>>\`** → Primary prompt (Python is ready for a new statement).
- **\`...\`** → Continuation prompt (Python is waiting for you to complete a multi-line statement).

---

# 14. WHY AM I STUCK AT ... ?

If you accidentally see \`...\`, Python is waiting for additional input (such as a missing closing bracket or unindented block). You can press \`Enter\` or \`Ctrl+C\` to cancel and return to \`>>>\`.

---

# 15. TRYING TEXT IN THE INTERPRETER

\`\`\`text
>>> "Hello"
'Hello'
>>> print("Hello")
Hello
\`\`\`

Entering \`"Hello"\` shows string representation (\`'Hello'\`), while \`print("Hello")\` outputs clean text.

---

# 16. USING THE INTERPRETER AS A CALCULATOR

\`\`\`text
>>> 10 + 20
30
>>> 50 - 10
40
>>> 6 * 5
30
\`\`\`

---

# 17. INTERACTIVE MODE VS PYTHON SOURCE FILE

| Feature | Interactive Mode (\`>>>\`) | Python Source File (\`.py\`) |
| :--- | :--- | :--- |
| **Execution** | Immediate line-by-line | Complete program file execution |
| **Persistence** | Disappears when closed | Saved permanently on disk |
| **Use Case** | Quick tests & calculations | Full programs & multi-line apps |
| **Prompt** | Displays \`>>>\` | No prompt symbols |

---

# 18. INTERPRETER VS TERMINAL

\`\`\`text
┌──────────────────────────────────────┐
│  1. SYSTEM TERMINAL (Prompt: > or $) │ Type: python3
└──────────────────┬───────────────────┘
                   ↓
┌──────────────────────────────────────┐
│  2. PYTHON INTERPRETER (Prompt: >>>) │ Type: print("Hello")
└──────────────────────────────────────┘
\`\`\`

- **Terminal Command:** \`python3 --version\` (Run in OS terminal).
- **Python Instruction:** \`print("Hello")\` (Run in Python REPL or \`.py\` file).

---

# 19. ENVIRONMENT CLASSIFICATION ACTIVITY

- \`python --version\` → **Terminal Command**
- \`print("Hello")\` → **Python Source Code**
- \`python3\` → **Terminal Command (Starts Python)**
- \`2 + 3\` → **Python Expression**
- \`>>>\` → **Python Interpreter Prompt**

---

# 20. EXITING THE PYTHON INTERPRETER

To exit interactive mode and return to your terminal prompt, type:
\`\`\`text
>>> exit()
\`\`\`
or press \`Ctrl + D\` (macOS/Linux) or \`Ctrl + Z\` then \`Enter\` (Windows).

\`\`\`text
>>> exit()  →  Python session ends  →  Returned to system terminal prompt ($ / >)
\`\`\`

---

# 21. WHAT HAPPENS TO CODE AFTER EXITING?

Interactive session commands are **temporary** and not automatically saved as a program. To build reusable programs, write code inside a \`.py\` source file!

---

# 22. COMMON BEGINNER MISTAKES

> ❌ **Mistake 1:** Typing \`>>>\` inside a \`.py\` file or CodeFlow editor.  
> ❌ **Mistake 2:** Typing \`python --version\` inside the \`>>>\` prompt.  
> ❌ **Mistake 3:** Assuming interactive commands automatically save to disk.  
> ❌ **Mistake 4:** Thinking \`...\` means Python froze (it's waiting for input completion).

---

# 23. CODEFLOW LEARNING LAYER

\`\`\`text
Traditional REPL:   Input  →  Result
CodeFlow Track:     Code   →  Predict  →  Run  →  Visualize Flow  →  Understand Logic!
\`\`\``,

    codePreview: {
      code: `# Interactive Interpreter Simulation:\n# >>> 5 + 3\n# 8\n# >>> print("CodeFlow Interpreter")`,
      output: `CodeFlow Interpreter`,
      caption: `Simulating interactive Python REPL evaluation.`
    },

    glossary: [
      { term: 'Interpreter', definition: 'The software engine that processes and executes Python code according to language rules.' },
      { term: 'Interactive Mode', definition: 'An interactive session where Python evaluates typed code line by line immediately.' },
      { term: 'REPL', definition: 'Read-Evaluate-Print-Loop — the core workflow of interactive programming environments.' },
      { term: 'Prompt (>>>)', definition: "Python's primary interactive prompt indicating readiness for a new statement." },
      { term: 'Continuation Prompt (...)', definition: "Python's secondary prompt indicating multi-line input is expected." },
      { term: 'Terminal', definition: 'The operating system command prompt interface used to launch Python or run system commands.' },
      { term: 'Expression', definition: 'Code evaluated by Python to produce a value.' },
      { term: 'Source File', definition: 'A saved program file containing Python code, typically ending in .py.' }
    ],

    quizzes: [
      {
    question: '1. What is the Python interpreter?',
    options: [
      'Software that processes and executes Python code according to language rules',
      'A monitor display setting',
      'A hardware keyboard component',
      'A web search engine'
    ],
    correctAnswer: 0,
    explanation: 'The interpreter is the engine responsible for parsing and executing Python code.'
  },
      {
    question: '2. What does the >>> prompt symbol indicate in a terminal?',
    options: [
      'You must enter a password',
      'Python interactive interpreter is ready for your input',
      'Your computer is downloading an update',
      'A fatal system crash occurred'
    ],
    correctAnswer: 1,
    explanation: '>>> is Python primary interactive prompt.'
  },
      {
    question: '3. Should you type the >>> prompt into a Python .py source file or CodeFlow editor?',
    options: [
      'Only on Windows',
      'Yes, >>> is required for print statements',
      'Yes, every line of Python code must start with >>>',
      'No, >>> is part of the interactive prompt interface, not Python code'
    ],
    correctAnswer: 3,
    explanation: '>>> belongs to interactive REPL mode; do not copy it into source code files.'
  },
      {
    question: '4. What is the result of entering 5 + 3 in interactive mode?',
    options: [
      'Error',
      'print(8)',
      '8',
      '5 + 3'
    ],
    correctAnswer: 2,
    explanation: 'Interactive REPL automatically evaluates and displays the result of expressions.'
  },
      {
    question: '5. What does REPL stand for?',
    options: [
      'Read-Evaluate-Print-Loop',
      'Run-Every-Python-Line',
      'Reset-Engine-Path-Link',
      'Real-time-Error-Processing-Log'
    ],
    correctAnswer: 0,
    explanation: 'REPL stands for Read, Evaluate, Print, Loop.'
  },
      {
    question: '6. Are the OS terminal prompt (>) and Python interactive prompt (>>>) the same thing?',
    options: [
      'Yes, they are identical',
      'Yes, both execute Python code only',
      'No, > is for system commands; >>> is inside the Python interpreter',
      'No, > is for Mac and >>> is for Windows'
    ],
    correctAnswer: 2,
    explanation: '> or $ is the system terminal prompt; >>> is inside the Python interactive environment.'
  },
      {
    question: '7. How do you exit the Python interactive interpreter and return to the terminal prompt?',
    options: [
      'Type close terminal',
      'Type exit() or press Ctrl+D',
      'Delete Python',
      'Press Spacebar 10 times'
    ],
    correctAnswer: 1,
    explanation: 'exit() or quit() cleanly exits the Python interactive session.'
  },
      {
    question: '8. Are commands typed during an interactive REPL session automatically saved as a .py file?',
    options: [
      'Yes, they are saved to your desktop automatically',
      'Yes, if you press Enter',
      'Yes, Python saves them as main.py',
      'No, interactive commands are temporary and disappear when the session ends'
    ],
    correctAnswer: 3,
    explanation: 'Interactive mode is temporary for quick tests; saved programs are written in .py files.'
  }
    ],

    summaryPoints: [
      'What the Python interpreter is.',
      'Why Python code must be processed by an execution runtime.',
      'How to start an interactive Python session (python or python3).',
      'What interactive mode is.',
      'What >>> prompt means.',
      'What ... continuation prompt indicates.',
      'What REPL (Read-Evaluate-Print-Loop) means.',
      'How to experiment with simple expressions in interactive mode.',
      'The difference between interactive expression output and explicit print().',
      'The critical difference between OS terminal prompt and Python interpreter prompt.',
      'Interactive commands are not automatically saved to source files.',
      'How to exit an interactive session using exit().',
      'Why interactive mode is great for fast experimentation.'
    ],

    previousLesson: {
      topicId: 'py-getting-started',
      subtopicId: 'python-installation',
      title: 'Python Installation'
    },

    nextLesson: {
      topicId: 'py-getting-started',
      subtopicId: 'ides-and-code-editors',
      title: 'IDEs and Code Editors'
    }
  },

  // Lesson 8: IDEs and Code Editors (Module 2: Python Getting Started)
  'py-getting-started/ides-and-code-editors': {
    id: 'py-getting-started/ides-and-code-editors',
    topicId: 'py-getting-started',
    subtopicId: 'py-gs-ides',
    title: 'IDEs and Code Editors',
    subtitle: 'Understand where programmers write Python code, the differences between code editors and IDEs, and modern editor features',
    categoryTitle: 'PYTHON GETTING STARTED',
    contentMarkdown: `# 1. WHERE DO WE WRITE PYTHON CODE?

Python code is plain text. Technically, you could write a Python program in a basic text editor.

However, software developers write code inside specialized software tools designed specifically for creating and managing programs.

\`\`\`text
WRITE CODE  →  Code Editor / IDE  →  Save as Python File (.py)  →  Run with Python
\`\`\`

The two main categories of coding software are **Code Editors** and **IDEs**.

---

# 2. WHAT IS A CODE EDITOR?

A **Code Editor** is a software program built to help developers write, edit, and navigate source code text efficiently.

### Key Code Editor Features:
- **Syntax Highlighting** (Coloring different code elements)
- **Line Numbers** (Easily locate lines and errors)
- **Indentation Assistance** (Automating code alignment)
- **Autocomplete** (Suggesting code keywords while typing)
- **File Management** (Exploring project directories)
- **Extensions / Plugins** (Adding extra language features)

\`\`\`text
BASIC TEXT EDITOR: Writes raw plain text
CODE EDITOR:       Writes code + visual structure + programming tools
\`\`\`

---

# 3. WHAT IS AN IDE?

**IDE** stands for **Integrated Development Environment**.

- **Integrated** → Combines multiple software development tools together into one unified application.
- **Development** → Built specifically for creating and testing software.
- **Environment** → A complete workspace for software projects.

An IDE usually provides a code editor plus out-of-the-box project management, debugging tools, test runners, and interpreter configuration.

\`\`\`text
IDE = Code Editor + Debugger + Project Tools + Run Tools + Code Intelligence
\`\`\`

---

# 4. CODE EDITOR VS IDE

| Feature | Code Editor | IDE (Integrated Development Environment) |
| :--- | :--- | :--- |
| **Primary Focus** | Fast, lightweight code editing | Full-featured software development |
| **Setup** | Flexible; features added via extensions | All-in-one suite out-of-the-box |
| **Speed & Weight** | Usually very fast and lightweight | Uses more system memory and storage |
| **Examples** | Visual Studio Code, Sublime Text | PyCharm, IDLE, Thonny |

> 💡 *Note:* The boundary between Code Editors and IDEs is not absolute! A modern code editor with extensions (like VS Code) can perform almost like a full IDE.

---

# 5. WHY NOT JUST USE A NORMAL TEXT EDITOR?

Plain text editors lack developer tools:

\`\`\`text
PLAIN TEXT EDITOR:
print("Hello")
print("Python")

CODE EDITOR:
1  print("Hello")      ← Line numbers & Syntax coloring
2  print("Python")     ← Error indicators & Autocomplete
\`\`\`

> 📌 **Rule:** Python doesn't require editor colors to run, but syntax highlighting and line numbers help human coders read and debug code much faster!

---

# 6. WHAT IS SYNTAX HIGHLIGHTING?

Syntax highlighting displays different parts of Python code in distinct colors:

\`\`\`python
print("Hello, World!")
\`\`\`

The editor colors keywords, functions, numbers, and strings differently.

\`\`\`text
SOURCE CODE: print("Hello")  →  Editor adds colors  →  Python executes raw text identically
\`\`\`

*Python itself ignores editor colors — syntax highlighting is strictly for human readability!*

---

# 7. LINE NUMBERS

Line numbers display alongside code:

\`\`\`text
1  print("Hello")
2  print("Python")
3  print("CodeFlow")
\`\`\`

Line numbers make it easy to find errors when Python reports: *"SyntaxError on line 2"*.

---

# 8. AUTOCOMPLETE & AI ASSISTANCE

As you type code:

\`\`\`text
You type: pri
Editor suggests: print() [Press Enter]
\`\`\`

Modern editors also offer AI code completion.

> ⚠️ **Important:** AI tools can help type code faster, but **you still need to understand what the code does!** CodeFlow focuses on building your understanding of code logic.

---

# 9. INTEGRATED TERMINAL

Many editors include a built-in terminal at the bottom of the window:

\`\`\`text
┌────────────────────────────────────────────┐
│ CODE EDITOR PANEL                          │
│ 1  print("Hello, World!")                  │
├────────────────────────────────────────────┤
│ INTEGRATED TERMINAL                        │
│ > python3 main.py                          │
│ Hello, World!                              │
└────────────────────────────────────────────┘
\`\`\`

*The integrated terminal lets you run Python commands without switching windows!*

---

# 10. COMMON CODE EDITORS & IDEs

- **Visual Studio Code (VS Code):** Extremely popular, lightweight, expandable via extensions.
- **PyCharm:** Professional IDE specifically designed for Python development.
- **IDLE:** Simple IDE included with standard Python downloads.
- **Thonny:** Educational IDE designed for beginner Python learners.

---

# 11. IMPORTANT DISTINCTIONS

> ⚠️ **CRITICAL MISCONCEPTIONS TO AVOID**
> 
> 1. **VS Code is NOT Python.** VS Code is an editor tool; Python is the programming language runtime.
> 2. **The "Run" Button is NOT Python.** Clicking Run simply instructs the editor to call your installed Python environment behind the scenes.
> 3. **Editor Extensions ≠ Python Packages.** Extensions modify editor UI features; Python packages provide code libraries for your programs.

---

# 12. THREE TOOL ENVIRONMENTS REVIEW

\`\`\`text
┌─────────────────────────────┐
│ 1. CODE EDITOR / IDE        │ Write & edit code files (VS Code / PyCharm)
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ 2. PYTHON INTERPRETER       │ Processes & executes Python instructions
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ 3. SYSTEM TERMINAL          │ Runs commands & launches scripts (> / $)
└─────────────────────────────┘
\`\`\`

---

# 13. GENERIC EDITOR LAYOUT

\`\`\`text
┌──────────────────┬─────────────────────────────────────────┐
│ FILE EXPLORER    │ CODE EDITOR PANEL                       │
│                  │                                         │
│ 📁 my_project    │ 1  print("Hello, CodeFlow!")           │
│   📄 main.py     │ 2  print("Learning Python!")            │
│                  │                                         │
├──────────────────┴─────────────────────────────────────────┤
│ TERMINAL / OUTPUT PANEL                                    │
│ > python3 main.py                                          │
│ Hello, CodeFlow!                                           │
└────────────────────────────────────────────────────────────┘
\`\`\`

---

# 14. CREATING A PYTHON SOURCE FILE

Python files end with the **\`.py\`** file extension:

\`\`\`text
Filename: hello.py
Contents: print("Hello, World!")
\`\`\`

- **Good Filenames:** \`hello.py\`, \`calculator.py\`, \`my_script.py\`
- **Avoid:** \`python.py\` (Can cause naming conflicts with Python's built-in modules!)

---

# 15. CHOOSE THE RIGHT TOOL ACTIVITY

- Want to type OS terminal commands? → **Terminal**
- Want to write & save a multi-line program? → **Code Editor / IDE**
- Want to test a 1-line math expression instantly? → **Interactive Python REPL**
- Want to visually understand how beginner Python code executes? → **CodeFlow**

---

# 16. IDENTIFY THE FEATURE

- Colors on keywords & strings → **Syntax Highlighting**
- Word suggestions while typing → **Autocomplete**
- Terminal panel inside editor window → **Integrated Terminal**
- Add-on editor features → **Extension / Plugin**`,

    codePreview: {
      code: `# Creating a Python Source File (hello.py)\nprint("Hello from VS Code!")\nprint("Python file execution example.")`,
      output: `Hello from VS Code!\nPython file execution example.`,
      caption: `Demonstrating a saved .py Python source file.`
    },

    glossary: [
      { term: 'Code Editor', definition: 'A software program designed for writing, editing, and managing source code text.' },
      { term: 'IDE', definition: 'Integrated Development Environment — software combining code editing with debugging and project management tools.' },
      { term: 'Syntax Highlighting', definition: 'Coloring different parts of code (keywords, strings, numbers) for human readability.' },
      { term: 'Autocomplete', definition: 'Automatic code suggestions provided by an editor while typing.' },
      { term: 'Integrated Terminal', definition: 'A terminal panel displayed inside a code editor window.' },
      { term: 'Extension', definition: 'A downloadable add-on that adds features to a code editor.' },
      { term: '.py File', definition: 'The standard file extension used for Python source code files.' },
      { term: 'Project Explorer', definition: 'A file tree panel in an editor displaying project files and folders.' }
    ],

    quizzes: [
      {
    question: '1. What is a code editor?',
    options: [
      'Software designed to help programmers write, edit, and format code text',
      'A web browser search tool',
      'A hardware chip inside a laptop',
      'An operating system update'
    ],
    correctAnswer: 0,
    explanation: 'A code editor is software tailored for writing and managing source code files.'
  },
      {
    question: '2. What does IDE stand for?',
    options: [
      'Internal Desktop Editor',
      'Interactive Data Engine',
      'Internet Device Extension',
      'Integrated Development Environment'
    ],
    correctAnswer: 3,
    explanation: 'IDE stands for Integrated Development Environment.'
  },
      {
    question: '3. Does syntax highlighting change how Python executes code?',
    options: [
      'Yes, red text executes faster than blue text',
      'No, syntax highlighting is strictly for human readability; Python ignores editor colors',
      'Yes, Python will not run without colors',
      'Yes, green text means the line is skipped'
    ],
    correctAnswer: 1,
    explanation: 'Syntax highlighting only styles code visually for humans; Python processes text identically.'
  },
      {
    question: '4. Is VS Code itself the Python programming language?',
    options: [
      'No, VS Code is a code editor tool; Python is the programming language runtime environment',
      'Yes, VS Code is Python 4',
      'Yes, installing VS Code installs Python automatically',
      'Yes, they are the same product'
    ],
    correctAnswer: 0,
    explanation: 'VS Code is an editor tool; Python runtime executes the code.'
  },
      {
    question: '5. What file extension is used for Python source files?',
    options: [
      '.py',
      '.docx',
      '.txt',
      '.html'
    ],
    correctAnswer: 0,
    explanation: 'Python source files use the .py file extension (e.g. main.py).'
  },
      {
    question: '6. What does an integrated terminal in a code editor allow you to do?',
    options: [
      'Browse social media',
      'Change monitor screen resolution',
      'Run terminal commands directly inside the editor window without switching applications',
      'Automatically write Python code for you'
    ],
    correctAnswer: 2,
    explanation: 'An integrated terminal lets you run system and Python commands within the editor UI.'
  },
      {
    question: '7. What happens when you click the "Run" button in a code editor?',
    options: [
      'The editor instructs a configured Python environment/interpreter to run your code file',
      'The editor compiles code into JavaScript',
      'The editor converts code into a physical paper printout',
      'Nothing happens unless an AI is online'
    ],
    correctAnswer: 0,
    explanation: 'The editor Run button calls your installed Python interpreter behind the scenes.'
  },
      {
    question: '8. Should a beginner spend days trying to find the single "perfect" editor before learning code?',
    options: [
      'Yes, all editors use different Python rules',
      'Yes, picking the wrong editor prevents learning',
      'Yes, you cannot learn Python without the most expensive editor',
      'No, understanding Python logic and writing code is what matters; editors are just tools'
    ],
    correctAnswer: 3,
    explanation: 'Editor choice is flexible; mastering core programming logic is what truly counts.'
  }
    ],

    summaryPoints: [
      'Where programmers write Python code.',
      'What a code editor is.',
      'What an IDE (Integrated Development Environment) is.',
      'Code editors are lightweight; IDEs provide all-in-one development suites out-of-the-box.',
      'Why programmers use code editors instead of plain text editors.',
      'What syntax highlighting does (visually styles code for humans).',
      'What line numbers and autocomplete do.',
      'What an integrated terminal is.',
      'Common Python tools (VS Code, PyCharm, IDLE, Thonny).',
      'VS Code is an editor, not Python itself.',
      'The "Run" button uses a configured Python interpreter behind the scenes.',
      'Python source files end with the .py extension.',
      'How to choose a suitable editor as a beginner.',
      'Code Editor vs Python Runtime vs System Terminal differences.',
      'CodeFlow visual execution layer complements traditional editors for learning.'
    ],

    previousLesson: {
      topicId: 'py-getting-started',
      subtopicId: 'python-interpreter',
      title: 'Python Interpreter'
    },

    nextLesson: {
      topicId: 'py-getting-started',
      subtopicId: 'running-a-python-file',
      title: 'Running a Python File'
    }
  },

  // Lesson 9: Running a Python File (Module 2: Python Getting Started)
  'py-getting-started/running-a-python-file': {
    id: 'py-getting-started/running-a-python-file',
    topicId: 'py-getting-started',
    subtopicId: 'py-gs-running-file',
    title: 'Running a Python File',
    subtitle: 'Master the workflow of writing, saving, running, and debugging Python files from terminals and editors',
    categoryTitle: 'PYTHON GETTING STARTED',
    contentMarkdown: `# 1. WHAT IS A PYTHON FILE?

A Python program can be created and saved in a text file ending with the **\`.py\`** extension.

\`\`\`text
Filename: hello.py
Code inside: print("Hello, World!")
\`\`\`

- **\`hello\`** → Filename chosen by the programmer
- **\`.py\`** → Extension indicating a Python source code file

---

# 2. WHY USE A PYTHON FILE?

Interactive REPL mode is great for quick tests, but commands disappear when closed.

Writing code in a **Python file** allows programs to be saved, edited, shared, and executed repeatedly!

\`\`\`text
INTERACTIVE REPL:  Type  →  Run immediately  →  Disappears when closed
PYTHON FILE:       Write →  Save  →  Run  →  Edit  →  Run Again!
\`\`\`

---

# 3. CREATE & SAVE YOUR FIRST PYTHON FILE

1. Open your code editor (e.g. VS Code, Thonny, or CodeFlow editor).
2. Create a new file.
3. Write:
   \`\`\`python
   print("Hello, World!")
   \`\`\`
4. Save the file as **\`hello.py\`**.

\`\`\`text
NEW FILE  →  WRITE CODE  →  SAVE AS hello.py  →  READY TO RUN
\`\`\`

---

# 4. FILENAME & EXTENSION RULES

- **Good Filenames:** \`hello.py\`, \`calculator.py\`, \`temperature_converter.py\`
- **Avoid:** \`python.py\` *(Can conflict with Python internal modules)*

---

# 5. CRITICAL HABIT: SAVE BEFORE RUNNING!

> ⚠️ **IMPORTANT HABIT FOR BEGINNERS**

If you edit code in your editor but forget to save, running the file will execute the **older saved version** on disk!

\`\`\`text
EDIT CODE  →  SAVE (Ctrl+S / Cmd+S)  →  RUN
\`\`\`

---

# 6. METHOD 1 — RUNNING FROM THE TERMINAL

Open your system terminal in the directory where \`hello.py\` is saved and type:

\`\`\`bash
python hello.py
\`\`\`
or on macOS/Linux:
\`\`\`bash
python3 hello.py
\`\`\`

**Output:**
\`\`\`text
Hello, World!
\`\`\`

### Breakdown of Command:
- **\`python3\`** → Instructs the Python 3 interpreter to launch.
- **\`hello.py\`** → Specifies the source file to process and execute.

---

# 7. WHAT IS A DIRECTORY & WORKING DIRECTORY?

A **directory** is a folder on your computer (e.g., \`Documents/PythonProjects/\`).

The **Current Working Directory** is the folder your terminal is currently looking inside.

\`\`\`text
Terminal Location: Documents/PythonProjects/
Folder Contents:   hello.py
Command:           python3 hello.py  [ Found & Executed ✓ ]
\`\`\`

If your terminal is in \`Documents/\` while \`hello.py\` is inside \`Documents/PythonProjects/\`, typing \`python3 hello.py\` will result in a **"File Not Found"** error!

---

# 8. MOVING TO THE FILE'S DIRECTORY (\`cd\`)

Use the **\`cd\`** (*change directory*) command to navigate into your project folder:

\`\`\`bash
cd PythonProjects
python3 hello.py
\`\`\`

> 💡 *Pro Tip:* Most modern code editors feature an **Integrated Terminal** or **"Open Terminal Here"** option that automatically opens the terminal in your project directory!

---

# 9. WHAT HAPPENS WHEN YOU RUN A FILE?

\`\`\`text
TERMINAL COMMAND: python3 hello.py
         ↓
PYTHON LOADS THE SOURCE FILE
         ↓
INSTRUCTIONS EXECUTE STEP-BY-STEP
         ↓
OUTPUT DISPLAYED: Hello, World!
         ↓
PROGRAM FINISHES (Terminal prompt returns)
\`\`\`

---

# 10. MULTI-STATEMENT EXECUTION FLOW

\`\`\`python
print("Program started")
print("Hello, Python!")
print("Program finished")
\`\`\`

**Output:**
\`\`\`text
Program started
Hello, Python!
Program finished
\`\`\`

Python processes and executes the file statements sequentially from top to bottom.

---

# 11. METHOD 2 — USING AN EDITOR "RUN" BUTTON

In editors like VS Code or PyCharm, clicking the **Run ▶** button instructs the editor to call your installed Python runtime in the integrated terminal automatically.

\`\`\`text
Click Run ▶  →  Editor executes: python3 hello.py  →  Output displayed!
\`\`\`

---

# 12. METHOD 3 — CODEFLOW VISUAL EXECUTION

Inside CodeFlow, you experience the complete learning loop:

\`\`\`text
WRITE CODE  →  PREDICT OUTPUT  →  SAVE  →  RUN  →  WATCH EXECUTION  →  COMPARE
\`\`\`

---

# 13. THREE VISUAL CARDS DISTINCTION

> ⚠️ **DO NOT PUT TERMINAL COMMANDS INSIDE YOUR PYTHON FILE!**

\`\`\`text
┌────────────────────────────────┐
│ 1. SOURCE CODE (hello.py file) │  print("Hello, World!")
└────────────────────────────────┘
               ↓
┌────────────────────────────────┐
│ 2. TERMINAL COMMAND (Terminal) │  python3 hello.py
└────────────────────────────────┘
               ↓
┌────────────────────────────────┐
│ 3. OUTPUT (Terminal Screen)    │  Hello, World!
└────────────────────────────────┘
\`\`\`

*Never write \`python3 hello.py\` inside your \`hello.py\` file — \`python3 hello.py\` is an OS terminal command!*

---

# 14. TROUBLESHOOTING DECISION FRAMEWORK

\`\`\`text
You ran: python3 hello.py
           │
     Did an error occur?
     ├── "command not found" → Check Python installation / use python or py
     ├── "No such file or directory" → Terminal in wrong folder or filename misspelled
     ├── "SyntaxError" → Code issue inside hello.py (Missing quote/bracket)
     └── Old output appears → File was not saved after editing!
\`\`\`

| Issue | Cause | Fix |
| :--- | :--- | :--- |
| **File Not Found** | Terminal in wrong directory | Use \`cd\` to navigate or open terminal in project folder |
| **\`hello.py.txt\`** | Windows hid file extension | Rename file properly to \`hello.py\` |
| **Old Output Appears** | File not saved before running | Press \`Ctrl+S\` / \`Cmd+S\` before clicking Run |
| **Wrong File Ran** | Running \`test.py\` instead of \`hello.py\` | Verify filename specified in command |

---

# 15. PROGRAMS WITHOUT VISIBLE OUTPUT

Running a file containing internal operations (like \`x = 10\`) completes successfully without printing text on screen. **No output does not mean the program failed!**

---

# 16. PUT THE STEPS IN ORDER (ACTIVITY)

1. Create a new file in your editor
2. Write Python source code (\`print("Hello")\`)
3. Save the file as \`hello.py\`
4. Run the file using \`python3 hello.py\` or Run button
5. Observe the output
6. Modify code, save, and run again!

---

# 17. RECURRING CODEFLOW LEARNING LOOP

\`\`\`text
  WRITE      →  Create your code
    ↓
 PREDICT     →  Guess expected output
    ↓
   SAVE      →  Store file on disk
    ↓
   RUN       →  Execute with Python
    ↓
  WATCH      →  Observe line execution
    ↓
 COMPARE     →  Check actual output vs prediction
    ↓
  MODIFY     →  Update code & save
    ↓
 RUN AGAIN   →  Observe changes!
\`\`\``,

    codePreview: {
      code: `# File: my_first_program.py\nprint("My first local Python program!")\nprint("Python is running this file.")\nprint(10 + 5)`,
      output: `My first local Python program!\nPython is running this file.\n15`,
      caption: `Demonstrating complete execution of a multi-statement Python file.`
    },

    glossary: [
      { term: 'Python File', definition: 'A text file containing Python source code, ending with the .py extension.' },
      { term: '.py Extension', definition: 'The standard file extension signifying a Python source code file.' },
      { term: 'Run', definition: 'Executing a program file using a Python interpreter.' },
      { term: 'Directory', definition: 'A folder on your computer filesystem containing files and subfolders.' },
      { term: 'Current Working Directory', definition: 'The folder location your terminal is currently operating inside.' },
      { term: 'File Path', definition: 'The filesystem address route pointing to a specific file.' },
      { term: 'Save', definition: 'Storing the current edits of a file onto disk memory.' },
      { term: 'Output', definition: 'Text or information displayed on screen by a running program.' },
      { term: 'Run Button', definition: 'An editor button that invokes a configured Python interpreter to run the active file.' }
    ],

    quizzes: [
      {
    question: '1. What file extension is standard for Python source code files?',
    options: [
      '.py',
      '.txt',
      '.code',
      '.python'
    ],
    correctAnswer: 0,
    explanation: 'Python source code files use the .py file extension (e.g. main.py).'
  },
      {
    question: '2. Where should the command python3 hello.py be entered?',
    options: [
      'In a web browser address bar',
      'In a system terminal application (Command Prompt, PowerShell, or macOS Terminal)',
      'Inside a Microsoft Word document',
      'Inside the hello.py code file itself'
    ],
    correctAnswer: 1,
    explanation: 'python3 hello.py is a terminal command, not Python code.'
  },
      {
    question: '3. Should you write python3 hello.py inside your hello.py source code file?',
    options: [
      'No, python3 hello.py is an OS terminal command, not Python source code',
      'Yes, required for print() to work',
      'Yes, every Python file must start with its own filename command',
      'Only on Windows'
    ],
    correctAnswer: 0,
    explanation: 'Never place terminal commands inside .py source code files.'
  },
      {
    question: '4. What does the command python3 hello.py tell the computer to do?',
    options: [
      'Open hello.py in Microsoft Word',
      'Rename the file',
      'Delete the hello.py file',
      'Launch the Python 3 interpreter and execute the instructions saved inside hello.py'
    ],
    correctAnswer: 3,
    explanation: 'The command tells Python 3 to load and run the code in hello.py.'
  },
      {
    question: '5. Why might running python3 hello.py display a "No such file or directory" error?',
    options: [
      'The terminal is currently in a different working directory than where hello.py is saved',
      'The monitor is turned off',
      'Python was deleted',
      'The file has too many print statements'
    ],
    correctAnswer: 0,
    explanation: 'If the terminal is not operating in the folder containing hello.py, it cannot find the file.'
  },
      {
    question: '6. If you edit code in an editor but forget to save before clicking Run, what happens?',
    options: [
      'The code deletes automatically',
      'Python throws a hardware error',
      'The program executes the older previously saved version of the file on disk',
      'The computer shuts down'
    ],
    correctAnswer: 2,
    explanation: 'Running a file executes what is saved on disk; always save edits before running.'
  },
      {
    question: '7. Does a Python program file always have to display visible text output to execute successfully?',
    options: [
      'Yes, every line of Python code must print text',
      'No, files containing internal statements (like storing variables) execute without printing output',
      'Yes, Python crashes if no text is printed',
      'Yes, print() is mandatory on every line'
    ],
    correctAnswer: 1,
    explanation: 'Internal operations run silently; no output does not mean the program failed.'
  },
      {
    question: '8. What is the core development loop for writing and testing Python files?',
    options: [
      'Run command → Delete file → Write',
      'Type code → Close computer → Restart',
      'Write → Save → Predict → Run → Observe → Modify → Run Again',
      'Download 10 editors → Delete Python → Run'
    ],
    correctAnswer: 2,
    explanation: 'Writing, saving, running, and observing changes is the fundamental coding loop.'
  }
    ],

    summaryPoints: [
      'Python source files use the .py file extension.',
      'How to create and save a Python file in an editor.',
      'Why saving before running is a critical developer habit.',
      'How to run a Python file from the terminal using python3 filename.py.',
      'What python3 hello.py conceptually means.',
      'What a directory and Current Working Directory mean.',
      'Using cd to navigate terminal directories to find your file.',
      'Using "Open Terminal Here" or integrated editor terminals.',
      'How IDE and Editor "Run" buttons work.',
      'Visual distinction between Source Code, Terminal Commands, and Output.',
      'Troubleshooting "File Not Found" vs "SyntaxError" vs unsaved code.',
      'Programs can execute successfully without producing visible output.',
      'How to edit, save, and re-run files repeatedly.',
      'Module 2 (Python Getting Started) is complete — ready for Python Syntax!'
    ],

    previousLesson: {
      topicId: 'py-getting-started',
      subtopicId: 'ides-and-code-editors',
      title: 'IDEs and Code Editors'
    },

    nextLesson: {
      topicId: 'py-syntax',
      subtopicId: 'python-statements',
      title: '3. Python Syntax'
    }
  },

  // Lesson 10: Python Statements (Module 3: Python Syntax)
  'py-syntax/python-statements': {
    id: 'py-syntax/python-statements',
    topicId: 'py-syntax',
    subtopicId: 'py-syn-statements',
    title: 'Python Statements',
    subtitle: 'Understand instructions, statement execution order, expression evaluation, and control flow foundations',
    categoryTitle: 'PYTHON SYNTAX',
    contentMarkdown: `# 1. WHAT IS A PYTHON STATEMENT?

A **statement** is an instruction that Python can execute.

\`\`\`python
print("Hello")
\`\`\`

This statement tells Python to perform an action: **display the text "Hello" on the screen**.

\`\`\`text
STATEMENT: print("Hello")  →  PYTHON EXECUTES IT  →  OUTPUT: Hello
\`\`\`

A Python program is built from instructions. We call these executable instructions **statements**.

---

# 2. THINK OF STATEMENTS AS INSTRUCTIONS

Think of a program like a simple step-by-step recipe:

\`\`\`text
RECIPE INSTRUCTIONS:
1. Boil water.
2. Add pasta.
3. Cook for 10 minutes.

PYTHON PROGRAM STATEMENTS:
1. print("Start")
2. print("Running")
3. print("Finished")
\`\`\`

In a simple straight-line program, Python executes these statements sequentially from top to bottom.

---

# 3. A PROGRAM CAN CONTAIN ONE STATEMENT

\`\`\`python
print("Hello")
\`\`\`

When executed:
\`\`\`text
PROGRAM START  →  Statement: print("Hello")  →  Output: Hello  →  PROGRAM END
\`\`\`

---

# 4. A PROGRAM CAN CONTAIN MULTIPLE STATEMENTS

\`\`\`python
print("First")
print("Second")
print("Third")
\`\`\`

Visually identify the statements:

\`\`\`text
STATEMENT 1: print("First")
STATEMENT 2: print("Second")
STATEMENT 3: print("Third")

OUTPUT:
First
Second
Third
\`\`\`

---

# 5. STATEMENT EXECUTION ORDER

For simple straight-line code:

\`\`\`text
STATEMENT 1: print("A")
     ↓
STATEMENT 2: print("B")
     ↓
STATEMENT 3: print("C")
\`\`\`

\`\`\`text
CODE ORDER  →  EXECUTION ORDER  →  RESULT
\`\`\`

> 💡 *Note:* In simple straight-line programs, Python proceeds from one statement to the next. Later structures (such as conditions, loops, functions, and exceptions) can change the execution flow!

---

# 6. CODEFLOW STATEMENT VISUALIZATION

In CodeFlow's visualizer:

\`\`\`text
PROGRAM START
      ↓
[ CURRENT STATEMENT: Line 1 ]  print("Start")    → Output: Start
      ↓
[ CURRENT STATEMENT: Line 2 ]  print("Running")  → Output: Start \n Running
      ↓
[ CURRENT STATEMENT: Line 3 ]  print("End")      → Output: Start \n Running \n End
      ↓
PROGRAM END
\`\`\`

*CodeFlow highlights the currently active statement so you can visually see: "Python is currently executing THIS statement."*

---

# 7. STATEMENTS USUALLY APPEAR ON SEPARATE LINES

In Python, we normally write each simple statement on its own line:

\`\`\`python
print("Hello")
print("Python")
print("CodeFlow")
\`\`\`

\`\`\`text
ONE SIMPLE STATEMENT  →  ONE LINE
\`\`\`

This convention makes programs clear to read, debug, and modify.

---

# 8. NEW LINE OF CODE

Python commonly uses a new line to separate simple statements:

\`\`\`text
Line 1: print("A")
Line 2: print("B")
\`\`\`

Python recognizes these as separate statements. Unlike some languages (like C++ or Java), Python does not require a semicolon at the end of each ordinary statement.

---

# 9. DO PYTHON STATEMENTS NEED SEMICOLONS?

Usually, **no**.

- **Standard Python:**
  \`\`\`python
  print("Hello")
  print("Python")
  \`\`\`

- **Semicolon Python (Supported, but discouraged):**
  \`\`\`python
  print("Hello"); print("Python")
  \`\`\`

While Python supports semicolons for combining simple statements on one line, beginners should prefer placing each statement on its own line for maximum readability.

---

# 10. WHY CODEFLOW PREFERS ONE STATEMENT PER LINE

Writing one statement per line makes visual step execution clear:

\`\`\`text
Statement 1  →  Statement 2  →  Statement 3
\`\`\`

It allows line highlighting, debugging, and prediction to work seamlessly.

---

# 11. DIFFERENT TYPES OF STATEMENTS EXIST

As you progress, you will encounter various kinds of Python statements:

- **Assignment Statement:** \`x = 10\` *(associates value 10 with variable x)*
- **Import Statement:** \`import math\` *(loads external modules)*
- **Return Statement:** \`return result\` *(exits a function with a value)*

> 📌 *Don't worry about memorizing these yet! The goal is simply to understand that Python has different statement forms.*

---

# 12. ASSIGNMENT AS A PREVIEW

\`\`\`python
x = 10
\`\`\`

This is an **assignment statement**. It associates the variable name \`x\` with the value \`10\`.

*(Variables have their own dedicated module — here we only introduce it to demonstrate that statements don't always produce output!)*

---

# 13. NOT EVERY STATEMENT PRODUCES VISIBLE OUTPUT

> ⚠️ **CRITICAL DISTINCTION: EXECUTION ≠ VISIBLE OUTPUT**

\`\`\`python
x = 10
\`\`\`
This line executes internally (updating program state), but displays **no text on screen**.

\`\`\`python
print(x)
\`\`\`
This line displays **\`10\`** on screen.

A statement can perform an internal action without producing visible output!

---

# 14. STATEMENT VS OUTPUT CARDS

\`\`\`text
┌──────────────────────────────┐
│ STATEMENT (Source Code)      │  print("Hello")
└──────────────────────────────┘
               ↓
┌──────────────────────────────┐
│ OUTPUT (Screen Result)       │  Hello
└──────────────────────────────┘
\`\`\`

Do not confuse **what Python executes** with **what the program displays**.

---

# 15. WHAT IS AN EXPRESSION?

An **expression** is code that Python evaluates to produce a value.

\`\`\`python
5 + 3
\`\`\`

Python evaluates the expression \`5 + 3\` to produce the value **\`8\`**.

\`\`\`text
EXPRESSION: 5 + 3  →  EVALUATES TO  →  VALUE: 8
\`\`\`

---

# 16. STATEMENT VS EXPRESSION

- **Expression:** Evaluates to produce a value (e.g. \`5 + 3\`).
- **Statement:** An instruction that performs an action or controls program behavior (e.g. \`print(5 + 3)\`).

An expression can be contained **inside** a statement:

\`\`\`python
print(5 + 3)
\`\`\`

\`\`\`text
1. Evaluate expression: 5 + 3  →  8
2. Execute statement: print(8)  →  Output: 8
\`\`\`

---

# 17. CODEFLOW: STATEMENT + EXPRESSION VISUALIZATION

\`\`\`text
CURRENT STATEMENT: print(4 + 3)
        ↓
EXPRESSION FOUND: 4 + 3  →  Evaluates to 7
        ↓
CONTINUE STATEMENT: print(7)
        ↓
OUTPUT GENERATED: 7
        ↓
STATEMENT COMPLETE
\`\`\`

---

# 18. SIMPLE VS COMPOUND STATEMENTS

- **Simple Statement:** Single-line instruction without an indented block (e.g. \`x = 10\`, \`print("Hello")\`).
- **Compound Statement:** Statement structure that introduces an indented block of statements (e.g. \`if\`, \`for\`, \`while\`, \`def\`).

\`\`\`python
# Compound Statement Preview:
if age >= 18:
    print("Adult")
\`\`\`

*(Conditions, loops, and functions will be covered in future modules!)*

---

# 19. STATEMENT BLOCKS & INDENTATION PREVIEW

> 🔮 **COMING SOON CARD**
> 
> Statement blocks and indentation become important when learning:
> - Conditions (\`if / else\`)
> - Loops (\`for / while\`)
> - Functions (\`def\`)

---

# 20. ONE PHYSICAL LINE VS ONE LOGICAL STATEMENT

A statement does not always have to fit on one physical line!

\`\`\`python
print(
    "Hello"
)
\`\`\`

Even though this spans 3 physical lines, Python treats it as **1 single logical statement**.

---

# 21. THREE FORMATTING EXAMPLES

\`\`\`text
1. Standard (1 line = 1 statement):
print("A")

2. Semicolon (1 line = 2 statements):
print("A"); print("B")

3. Multiline (3 lines = 1 statement):
print(
    "A"
)
\`\`\`

*For beginner code, prefer 1 simple statement per line!*

---

# 22. ORDER OF STATEMENTS MATTERS

Compare these two programs:

**Program A:**
\`\`\`python
print("Wake up")
print("Eat breakfast")
print("Go to class")
\`\`\`
*Output:* \`Wake up \n Eat breakfast \n Go to class\`

**Program B:**
\`\`\`python
print("Go to class")
print("Wake up")
print("Eat breakfast")
\`\`\`
*Output:* \`Go to class \n Wake up \n Eat breakfast\`

Changing statement order changes execution order and program behavior. **Order matters!**

---

# 23. STATEMENTS DEPENDING ON EARLIER STATEMENTS

\`\`\`python
x = 5
print(x)
\`\`\`

- **Statement 1:** Establishes \`x = 5\`.
- **Statement 2:** Uses \`x\` to print \`5\`.

If you swap the order:
\`\`\`python
print(x)
x = 5
\`\`\`
Python fails because Statement 1 tries to print \`x\` before \`x\` has been assigned!

---

# 24. NON-EXECUTABLE LINES: BLANK LINES & COMMENTS

Not every line in a source file is an executable statement:

\`\`\`python
1  # Start program        ← Comment (Human documentation)
2                         ← Blank line (Readability spacing)
3  print("Hello")        ← Executable Statement!
4                         ← Blank line
5  # End program          ← Comment
\`\`\`

Python ignores comments and blank lines during execution.

---

# 25. SYNTAX ERROR PREVENTING EXECUTION START

If a file has a syntax error (like \`print("Hello"\`), Python detects the syntax problem before starting normal step-by-step execution.

---

# 26. WHY STATEMENTS MATTER

Understanding statements helps you answer:
- *What instruction is Python executing right now?*
- *What action does this statement perform?*
- *Does it change program state or produce output?*
- *Which statement executes next?*

---

# 27. 🧠 CODEFLOW MENTAL MODEL (7 CORE QUESTIONS)

When inspecting any Python program, ask:

1. **What are the statements?**
2. **What is the current statement?**
3. **What does this statement need?**
4. **What does this statement do?**
5. **Does it change program state?**
6. **Does it produce output?**
7. **What happens next?**

\`\`\`text
PROGRAM  →  STATEMENT  →  ACTION / EFFECT  →  NEXT STATEMENT
\`\`\`

---

# 28. INTERACTIVE ACTIVITIES

### Count the Statements:
\`\`\`python
# Greeting
print("Hello")
print("World")
\`\`\`
*Answer:* **2 executable statements** (the comment is not an executable statement).

### Statement or Output?
- \`print("Hello")\` → **Statement**
- \`Hello\` → **Output**
- \`5 + 3\` → **Expression**
- \`# Hello\` → **Comment**

---

# 29. COMMON MISUNDERSTANDINGS

> ❌ **Mistake 1:** *"Every line is a statement."* (Comments and blank lines are not).  
> ❌ **Mistake 2:** *"Every statement produces output."* (Assignment and calculations run silently).  
> ❌ **Mistake 3:** *"Python requires semicolons."* (Newlines separate standard Python statements).  
> ❌ **Mistake 4:** *"Output is a Python statement."* (Output is the displayed result of execution).`,

    codePreview: {
      code: `x = 5\nprint(x + 10)\nprint("Finished")`,
      output: `15\nFinished`,
      caption: `Demonstrating statement execution order and expression evaluation.`
    },

    glossary: [
      { term: 'Statement', definition: 'An instruction or syntactic unit that Python can execute as part of a program.' },
      { term: 'Simple Statement', definition: 'A statement form that does not introduce an indented suite or block.' },
      { term: 'Compound Statement', definition: 'A statement structure (like if, for, def) that contains an indented block of statements.' },
      { term: 'Expression', definition: 'Code evaluated by Python to produce a single value.' },
      { term: 'Execution Order', definition: 'The specific sequence in which Python executes program statements.' },
      { term: 'Program State', definition: 'Information and variable values maintained in memory while a program runs.' },
      { term: 'Control Flow', definition: 'The path execution takes through a program.' },
      { term: 'Output', definition: 'Visible result displayed on screen by a running program.' }
    ],

    quizzes: [
      {
    question: '1. What is a Python statement?',
    options: [
      'An instruction that Python can execute as part of a program',
      'An operating system password',
      'A type of monitor screen resolution',
      'A hardware component inside a laptop'
    ],
    correctAnswer: 0,
    explanation: 'A statement is an executable instruction in Python (e.g. print("Hello")).'
  },
      {
    question: '2. How many executable statements are in this code?\n\n# Header\nprint("A")\n\nprint("B")',
    options: [
      '3',
      '4',
      '2',
      '1'
    ],
    correctAnswer: 2,
    explanation: 'There are 2 print statements; comments and blank lines are not executable statements.'
  },
      {
    question: '3. Does every Python statement produce visible text output on screen?',
    options: [
      'Only lines ending with a semicolon',
      'Yes, every line of Python code prints text',
      'No, many statements (like assigning variables or internal math) execute without displaying output',
      'Yes, Python requires all lines to output text'
    ],
    correctAnswer: 2,
    explanation: 'Execution and output are different. Storing values or internal operations run silently.'
  },
      {
    question: '4. In simple code with print("First") followed by print("Second"), which statement executes first?',
    options: [
      'Neither executes',
      'Both execute simultaneously',
      'print("First")',
      'print("Second")'
    ],
    correctAnswer: 2,
    explanation: 'Python executes simple straight-line programs sequentially from top to bottom.'
  },
      {
    question: '5. Does Python normally require semicolons at the end of ordinary statements?',
    options: [
      'Yes, semicolons are mandatory in Python 3',
      'Yes, every line must end with a semicolon',
      'Only on Windows',
      'No, newlines normally separate simple statements in Python'
    ],
    correctAnswer: 3,
    explanation: 'Python uses newlines to separate simple statements; semicolons are optional and rarely used.'
  },
      {
    question: '6. What is an expression in Python?',
    options: [
      'Code that Python evaluates to produce a value',
      'A text editor button',
      'An error message popup',
      'A comment describing code'
    ],
    correctAnswer: 0,
    explanation: 'An expression (such as 5 + 3) is code evaluated by Python to produce a value.'
  },
      {
    question: '7. In print(5 + 3), which part is the expression being evaluated?',
    options: [
      'print(5 + 3)',
      '8',
      '5 + 3',
      'print'
    ],
    correctAnswer: 2,
    explanation: '5 + 3 is the inner arithmetic expression evaluated to 8.'
  },
      {
    question: '8. Is a blank line considered an executable Python statement?',
    options: [
      'No, blank lines improve readability and are ignored by Python',
      'Yes, blank lines cause a syntax error',
      'Yes, blank lines pause execution for 5 seconds',
      'Yes, blank lines print a blank space on screen'
    ],
    correctAnswer: 0,
    explanation: 'Blank lines exist for human code formatting and readability.'
  }
    ],

    summaryPoints: [
      'Python programs are built from executable statements.',
      'A statement tells Python to perform or control an action.',
      'Programs can contain multiple statements.',
      'Simple straight-line code executes statements sequentially.',
      'Statement order directly affects program behavior.',
      'Not every statement produces visible output.',
      'Expressions produce values and can appear inside statements.',
      'Newlines normally separate simple statements in readable Python code.',
      'Python does not require semicolons after ordinary statements.',
      'One physical line does not always equal one logical statement.',
      'Blank lines and comments are not executable statements.',
      'CodeFlow 7 Core Questions help visualize statement execution flow.',
      'Mastering statements builds the foundation for learning conditions, loops, and functions!'
    ],

    previousLesson: {
      topicId: 'py-getting-started',
      subtopicId: 'running-a-python-file',
      title: 'Running a Python File'
    },

    nextLesson: {
      topicId: 'py-syntax',
      subtopicId: 'execution-order',
      title: 'Execution Order'
    }
  },

  // Lesson 11: Execution Order (Module 3: Python Syntax)
  'py-syntax/execution-order': {
    id: 'py-syntax/execution-order',
    topicId: 'py-syntax',
    subtopicId: 'py-syn-order',
    title: 'Execution Order',
    subtitle: 'Master tracing code line by line, program state timeline changes over time, and trace table analysis',
    categoryTitle: 'PYTHON SYNTAX',
    contentMarkdown: `# 1. WHAT IS EXECUTION ORDER?

**Execution order** is the sequence in which Python performs the operations in a program.

\`\`\`python
print("First")
print("Second")
print("Third")
\`\`\`

\`\`\`text
print("First")  →  print("Second")  →  print("Third")
\`\`\`

**Output:**
\`\`\`text
First
Second
Third
\`\`\`

The position of statements in the source code determines when they execute.

> 💡 *Important:* "Top to bottom" is the starting mental model for simple sequential code, but it is **not** a universal rule that every line always executes exactly once. Later, conditions, loops, functions, and errors change the path!

---

# 2. SEQUENTIAL EXECUTION

**Sequential execution** means statements execute one after another in sequence:

\`\`\`python
print("Wake up")
print("Eat breakfast")
print("Start coding")
\`\`\`

\`\`\`text
START  →  Statement 1 (Wake up)  →  Statement 2 (Eat breakfast)  →  Statement 3 (Start coding)  →  END
\`\`\`

**Output:**
\`\`\`text
Wake up
Eat breakfast
Start coding
\`\`\`

---

# 3. CODE ORDER VS EXECUTION ORDER

- **Code Order:** Where statements appear in the source code file.
- **Execution Order:** The order in which operations actually occur while the program runs.

In simple straight-line code, Code Order (\`1 → 2 → 3\`) and Execution Order (\`1 → 2 → 3\`) are identical. Later structures (conditions, loops, functions) will cause execution order to diverge from visual line order!

---

# 4. WHERE DOES EXECUTION START?

Normal execution begins at the **first executable statement** reached at the top level of the script:

\`\`\`text
PROGRAM START  →  Line 1: print("A")  →  Line 2: print("B")  →  Line 3: print("C")  →  PROGRAM END
\`\`\`

---

# 5. NOT EVERY PHYSICAL LINE EXECUTES

\`\`\`python
1  # My program            ← Ignored (Comment)
2  print("Hello")          ← Executed!
3                          ← Ignored (Blank line)
4  print("Python")         ← Executed!
\`\`\`

Execution order is about **executable program behavior**, not simply advancing through every physical line text line by line!

---

# 6. TRACING THE PROGRAM

**Tracing** means following a program step by step to track execution, state changes, and output.

\`\`\`python
print("Start")
print("Middle")
print("End")
\`\`\`

\`\`\`text
STEP 1: Execute print("Start")   → Output: Start
STEP 2: Execute print("Middle")  → Output: Start \n Middle
STEP 3: Execute print("End")     → Output: Start \n Middle \n End
\`\`\`

---

# 7. CODEFLOW EXECUTION POINTER

CodeFlow's visualizer uses an **Execution Pointer** to track state:

\`\`\`text
┌────────────────────────────────────────────────────────┐
│  COMPLETED: Line 1  [ print("Start") ]                │
│ → CURRENT:   Line 2  [ print("Middle") ]               │
│    NEXT:     Line 3  [ print("End") ]                  │
└────────────────────────────────────────────────────────┘
\`\`\`

---

# 8. OPERATIONS INSIDE A STATEMENT

Execution order also applies **within** a single statement:

\`\`\`python
print(2 + 3 * 4)
\`\`\`

\`\`\`text
1. Evaluate 3 * 4  →  12
2. Evaluate 2 + 12 →  14
3. Pass 14 to print()
4. Output: 14
\`\`\`

---

# 9. ORDER CHANGES RESULTS

Compare these two programs:

**Program A:**
\`\`\`python
print("A")
print("B")
\`\`\`
*Output:* \`A \n B\`

**Program B:**
\`\`\`python
print("B")
print("A")
\`\`\`
*Output:* \`B \n A\`

\`\`\`text
SAME STATEMENTS  +  DIFFERENT ORDER  =  DIFFERENT RESULT
\`\`\`

---

# 10. EARLIER STATEMENTS AFFECT LATER STATEMENTS

\`\`\`python
x = 10
print(x)
\`\`\`

- **Step 1:** \`x = 10\` (Program state updated: \`x → 10\`)
- **Step 2:** \`print(x)\` (Reads current value of \`x\` → \`10\`)

If you swap the order:
\`\`\`python
print(x)
x = 10
\`\`\`
Python fails because Line 1 attempts to read \`x\` before \`x = 10\` has executed!

---

# 11. CHANGING DATA OVER TIME (STATE TIMELINE)

\`\`\`python
x = 10
print(x)
x = 20
print(x)
\`\`\`

**State Timeline:**

\`\`\`text
START  →  x = 10 (x → 10)  →  print(x) [Out: 10]  →  x = 20 (x → 20)  →  print(x) [Out: 10 \n 20]
\`\`\`

**Output:**
\`\`\`text
10
20
\`\`\`

---

# 12. STATEMENT DEPENDENCIES

A later statement may **depend** on something created or changed by an earlier statement.

\`\`\`text
STATEMENT 1: x = 10  ──(creates x)──>  STATEMENT 2: print(x)
\`\`\`

When tracing code, always ask: *"Does this statement depend on something established earlier?"*

---

# 13. OUTPUT BUILDS OVER TIME

Output is not created all at once; it accumulates as execution progresses:

\`\`\`text
After Line 1:  A
After Line 2:  A \n B
After Line 3:  A \n B \n C
\`\`\`

---

# 14. NON-SEQUENTIAL EXECUTION PREVIEWS

- **Conditions (\`if\`):** Can skip statements (\`1 → 2 → 4\`).
- **Loops (\`for / while\`):** Can repeat statements (\`A → B → B → B → C\`).
- **Functions:** Can jump execution to reusable code and return.
- **Errors:** Can interrupt normal execution early.

---

# 15. SYNTAX ERRORS VS RUNTIME FAILURES

- **Syntax Error:** Prevents normal execution from starting because Python cannot parse the code structure.
- **Runtime Error:** Execution starts normally, but a problem occurs midway while running a statement.

---

# 16. THE TRACE TABLE

A **Trace Table** is an essential developer tool for recording step-by-step program execution:

\`\`\`python
x = 2
print(x)
x = 5
print(x)
\`\`\`

| Step | Statement | Program State (\`x\`) | Output |
| :--- | :--- | :--- | :--- |
| **Start** | — | \`unassigned\` | — |
| **1** | \`x = 2\` | \`2\` | — |
| **2** | \`print(x)\` | \`2\` | \`2\` |
| **3** | \`x = 5\` | \`5\` | \`2\` |
| **4** | \`print(x)\` | \`5\` | \`2 \n 5\` |

---

# 17. 🧠 THE CODEFLOW HABIT: "WHAT HAPPENS NEXT?"

Whenever you look at code, systematically ask:

1. **Where is execution now?**
2. **What operation is being performed?**
3. **What information does it use?**
4. **Does program state change?**
5. **Is output produced?**
6. **Where does execution go next?**

\`\`\`text
PREDICT  →  TRACE  →  RUN  →  COMPARE
\`\`\`

---

# 18. INTERACTIVE TRACING EXERCISES

### Exercise 1: What is the Output?
\`\`\`python
print("One")
print("Three")
print("Two")
\`\`\`
*Answer:*
\`\`\`text
One
Three
Two
\`\`\`

### Exercise 2: Trace the State Timeline
\`\`\`python
score = 5
print(score)
score = 10
print(score)
\`\`\`
*State Timeline:* \`score: 5\` → \`Output: 5\` → \`score: 10\` → \`Output: 5 \n 10\`

---

# 19. COMMON MISUNDERSTANDINGS

> ❌ **Mistake 1:** *"Changing a variable later changes what was printed earlier."* (Output already printed does not change!).  
> ❌ **Mistake 2:** *"Python reads code backward to find assignments."* (Execution moves forward in time).  
> ❌ **Mistake 3:** *"Every physical line is an execution step."* (Comments and blank lines are skipped).  
> ❌ **Mistake 4:** *"Syntax errors run half the file first."* (Syntax errors stop program execution before start).`,

    codePreview: {
      code: `score = 5\nprint(score)\nscore = 10\nprint(score)`,
      output: `5\n10`,
      caption: `Demonstrating state changes over time and trace table logic.`
    },

    glossary: [
      { term: 'Execution Order', definition: 'The sequence in which Python performs program operations.' },
      { term: 'Sequential Execution', definition: 'Execution where statements proceed one after another in sequence.' },
      { term: 'Trace', definition: 'Following program execution step by step.' },
      { term: 'Execution Step', definition: 'A conceptual stage used to understand what the program is currently doing.' },
      { term: 'Current Statement', definition: 'The statement currently being executed in the trace.' },
      { term: 'Program State', definition: 'Information and variable values maintained in memory while a program runs.' },
      { term: 'Dependency', definition: 'When one operation relies on something established or changed by an earlier operation.' },
      { term: 'Trace Table', definition: 'A table used to record program state and output step by step during execution.' },
      { term: 'Snapshot', definition: 'A view of program state at a specific moment in execution.' },
      { term: 'Control Flow', definition: 'The path execution takes through a program.' }
    ],

    quizzes: [
      {
    question: '1. What is execution order?',
    options: [
      'The sequence in which Python performs program operations',
      'The alphabetical list of variable names',
      'The speed of the CPU processor',
      'The order files are listed in a folder'
    ],
    correctAnswer: 0,
    explanation: 'Execution order describes the sequence in which Python executes statements.'
  },
      {
    question: '2. What is sequential execution?',
    options: [
      'All statements executing at the exact same millisecond',
      'Statements executing in random order',
      'Statements executing one after another in top-to-bottom sequence',
      'Skipping all code'
    ],
    correctAnswer: 2,
    explanation: 'Sequential execution means statements execute step-by-step in order.'
  },
      {
    question: '3. What is the output of this code?\n\nprint("A")\nprint("C")\nprint("B")',
    options: [
      'C\nB\nA',
      'A\nB\nC',
      'A\nC\nB',
      'Error'
    ],
    correctAnswer: 2,
    explanation: 'Python executes statements in actual code order, displaying A, C, B.'
  },
      {
    question: '4. What does tracing a program mean?',
    options: [
      'Deleting all comments',
      'Following program execution step by step to track state and output',
      'Copying code from a website',
      'Drawing pictures of code on paper'
    ],
    correctAnswer: 1,
    explanation: 'Tracing is step-by-step tracking of code execution and variable changes.'
  },
      {
    question: '5. What is score at the end of this program?\n\nscore = 5\nscore = 10\nscore = 20',
    options: [
      '20',
      '35',
      '10',
      '5'
    ],
    correctAnswer: 0,
    explanation: 'Each assignment updates score; the final state value is 20.'
  },
      {
    question: '6. What is the output of this program?\n\nx = 5\nprint(x)\nx = 10\nprint(x)',
    options: [
      '5\n5',
      '10\n10',
      '15',
      '5\n10'
    ],
    correctAnswer: 3,
    explanation: 'Line 2 prints current x (5); Line 4 prints updated x (10).'
  },
      {
    question: '7. Why does print(x) followed by x = 10 cause an error?',
    options: [
      'print(x) tries to read x before x = 10 has executed',
      'print() cannot display numbers',
      'x is a forbidden variable name',
      'Quotation marks are missing around x'
    ],
    correctAnswer: 0,
    explanation: 'Execution order matters; a statement cannot read x before assignment occurs.'
  },
      {
    question: '8. What central question should you ask at every step of tracing code?',
    options: [
      '"How fast can I type?"',
      '"What color is the background?"',
      '"Can I delete this line?"',
      '"What happens next?"'
    ],
    correctAnswer: 3,
    explanation: 'Asking "What happens next?" develops systematic code tracing skills.'
  }
    ],

    summaryPoints: [
      'What execution order means.',
      'What sequential execution means.',
      'Simple straight-line programs execute statements in sequence.',
      'Code order and execution order are related but not identical.',
      'Not every physical source-code line is an execution step.',
      'Statements can contain inner expressions that evaluate first.',
      'Statement order directly affects program behavior.',
      'Earlier statements affect later statements.',
      'Program state changes over time during execution.',
      'Output accumulates as statements execute.',
      'Trace tables record step-by-step program execution.',
      'Conditions, loops, and functions will later change control flow.',
      'Errors interrupt or prevent execution.',
      'Tracing is an essential programming and debugging skill!'
    ],

    previousLesson: {
      topicId: 'py-syntax',
      subtopicId: 'python-statements',
      title: 'Python Statements'
    },

    nextLesson: {
      topicId: 'py-syntax',
      subtopicId: 'indentation',
      title: 'Indentation'
    }
  }
};
