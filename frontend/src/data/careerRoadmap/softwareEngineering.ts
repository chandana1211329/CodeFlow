import { CareerNode } from './types';

export const softwareEngineeringData: CareerNode = {
  id: 'software-engineering',
  title: 'Software Engineering',
  category: 'software-engineering',
  type: 'category',
  icon: 'Code',
  description: 'Design, development, testing, and maintenance of software applications, systems, and architectures.',
  overview: 'Software Engineering encompasses building scaleable desktop, web, mobile, game, systems, and enterprise software using modern languages and engineering principles.',
  skillsRequired: ['Problem Solving', 'Data Structures & Algorithms', 'System Design', 'Git / Version Control', 'OOP & Design Patterns', 'Clean Code Principles'],
  children: [
    {
      id: 'sde',
      title: 'Software Development Engineer (SDE)',
      type: 'role',
      icon: 'Terminal',
      description: 'Core engineering role focused on building end-to-end applications, core software features, and robust services.',
      overview: 'Software Development Engineers design, code, debug, and deliver feature-rich software modules across production tech stacks.',
      roleResponsibilities: [
        'Write clean, maintainable, and efficient code',
        'Participate in design reviews and unit testing',
        'Troubleshoot technical issues and performance bottlenecks',
        'Collaborate with cross-functional product teams'
      ],
      skillsRequired: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'API Design', 'SQL / NoSQL Databases'],
      tools: ['Git', 'VS Code', 'IntelliJ IDEA', 'Docker', 'CI/CD Pipelines'],
      projects: ['Personal Portfolio App', 'REST API microservice with Auth', 'Task Management System with Database'],
      interviewPrep: ['LeetCode Medium/Hard Problems', 'System Design Fundamentals', 'Object-Oriented Design Patterns'],
      children: [
        {
          id: 'application-developer',
          title: 'Application Developer',
          type: 'specialization',
          description: 'Focuses on creating software solutions tailored for business requirements and desktop/enterprise applications.',
          overview: 'Application Developers create applications across various operating systems and platforms based on business needs.',
          skillsRequired: ['Desktop & Web Frameworks', 'Database Management', 'User Interface Integration'],
          tools: ['Electron', 'Qt', '.NET Framework', 'JavaFX']
        },
        {
          id: 'product-engineer',
          title: 'Product Engineer',
          type: 'specialization',
          description: 'Combines full-stack engineering with product sense to quickly iterate on consumer features.',
          overview: 'Product Engineers work at the intersection of UX design, engineering execution, and metrics-driven iteration.',
          skillsRequired: ['Full-stack basics', 'A/B Testing', 'User Analytics', 'Rapid Prototyping']
        },
        {
          id: 'software-engineer',
          title: 'Software Engineer',
          type: 'specialization',
          description: 'Generalist engineer responsible for modular code, backend/frontend feature engineering, and reliability.',
          overview: 'Software Engineers solve algorithmic, architectural, and user-facing requirements across software platforms.'
        },
        {
          id: 'software-developer',
          title: 'Software Developer',
          type: 'specialization',
          description: 'Hands-on coding specialist focused on translating feature specifications into reliable software implementations.'
        }
      ]
    },
    {
      id: 'frontend-development',
      title: 'Frontend Development',
      type: 'role',
      icon: 'Layout',
      description: 'Building client-side user interfaces, modern interactive web pages, visual aesthetics, and performant web apps.',
      overview: 'Frontend Developers craft user experiences that run directly in web browsers using modern HTML, CSS, JavaScript, and frameworks.',
      roleResponsibilities: [
        'Build responsive, intuitive visual interfaces',
        'Optimize application loading performance and asset bundles',
        'Implement state management and real-time backend updates',
        'Ensure web accessibility (WCAG) across device viewports'
      ],
      skillsRequired: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React / Vue / Angular', 'CSS Layouts (Flexbox/Grid)', 'Web Performance'],
      tools: ['Vite', 'Webpack', 'Tailwind CSS', 'Monaco Editor', 'Chrome DevTools'],
      projects: ['Interactive Dashboard', '3D Visual Code Editor', 'E-commerce Shopping Platform'],
      interviewPrep: ['DOM Manipulation', 'Event Loop & Promises', 'CSS Box Model', 'React Component Lifecycle & Hooks'],
      children: [
        {
          id: 'web-frontend',
          title: 'Web Frontend',
          type: 'specialization',
          description: 'Core web browser application development with JavaScript and modern reactive frameworks.',
          children: [
            {
              id: 'javascript',
              title: 'JavaScript',
              type: 'stack',
              description: 'The foundation language of the web for client-side interactivity and dynamic execution.',
              overview: 'JavaScript powers dynamic logic, events, DOM updates, and asynchronous network operations on the web.',
              skillsRequired: ['Closures', 'Promises / Async-Await', 'Event Loop', 'Prototypes', 'ES Modules'],
              linkedCourseId: 'python', // Related to core programming logic
              children: [
                {
                  id: 'react',
                  title: 'React',
                  type: 'subject',
                  description: 'Component-based UI library built by Meta for crafting dynamic user interfaces.',
                  overview: 'React uses a Virtual DOM, functional components, and hooks to render fast, reactive web applications.',
                  skillsRequired: ['JSX', 'State & Props', 'React Hooks (useState, useEffect, useMemo)', 'Context API', 'Component Lifecycle'],
                  tools: ['React Router', 'Redux Toolkit', 'Zustand', 'React Query / TanStack Query'],
                  projects: ['CodeFlow Visualizer Interface', 'Real-time Chat App', 'Task Board'],
                  learningOrder: ['Component Architecture', 'Props & State Management', 'Hooks in Depth', 'Routing with React Router', 'Global State Management'],
                  interviewPrep: ['Virtual DOM Reconciliation', 'Custom Hooks Creation', 'Performance Optimization (useCallback, React.memo)', 'Controlled vs Uncontrolled Components']
                },
                {
                  id: 'angular',
                  title: 'Angular',
                  type: 'subject',
                  description: 'Comprehensive enterprise web application framework developed by Google.',
                  overview: 'Angular provides a complete ecosystem including Dependency Injection, RxJS, TypeScript, and routing out of the box.'
                },
                {
                  id: 'vue',
                  title: 'Vue',
                  type: 'subject',
                  description: 'Progressive, approachable framework for building interactive user interfaces.',
                  overview: 'Vue combines clean single-file components with reactive data binding and intuitive template syntax.'
                },
                {
                  id: 'svelte',
                  title: 'Svelte',
                  type: 'subject',
                  description: 'Cybernetically enhanced web apps compiled directly into vanilla JavaScript without a virtual DOM.'
                }
              ]
            },
            {
              id: 'typescript',
              title: 'TypeScript',
              type: 'stack',
              description: 'Strongly typed superset of JavaScript that compiles to plain JavaScript for enterprise scalability.',
              overview: 'TypeScript adds compile-time type safety, interfaces, generics, and autocompletion to JavaScript.'
            }
          ]
        },
        {
          id: 'ui-development',
          title: 'UI Development',
          type: 'specialization',
          description: 'Specialized focus on pixel-perfect micro-interactions, layout precision, design systems, and component libraries.'
        },
        {
          id: 'web-performance',
          title: 'Web Performance',
          type: 'specialization',
          description: 'Optimizing Core Web Vitals, critical rendering path, image compression, caching, and bundle size reduction.'
        },
        {
          id: 'accessibility',
          title: 'Accessibility (a11y)',
          type: 'specialization',
          description: 'Ensuring digital applications are accessible for users with disabilities following WCAG standards.'
        }
      ]
    },
    {
      id: 'backend-development',
      title: 'Backend Development',
      type: 'role',
      icon: 'Server',
      description: 'Building server-side logic, APIs, database architectures, authentication, and core application workflows.',
      overview: 'Backend Developers implement APIs, handle data persistence, write microservices, and ensure scalability, security, and low latency.',
      roleResponsibilities: [
        'Design and deploy RESTful and GraphQL APIs',
        'Model relational and NoSQL database schemas',
        'Implement authentication, authorization, and rate limiting',
        'Optimize server processing time and memory consumption'
      ],
      skillsRequired: ['Server Languages (Python, Java, Go, C#, Node.js)', 'Database Management (SQL/NoSQL)', 'API Protocols (REST/gRPC)', 'Caching (Redis)'],
      tools: ['Postman', 'Docker', 'PostgreSQL', 'Redis', 'Nginx'],
      projects: ['Distributed Code Executor Backend', 'E-commerce API Engine', 'Real-time WebSocket Server'],
      interviewPrep: ['Database Normalization & Indexing', 'Authentication Flow (JWT vs Session)', 'API Rate Limiting', 'Caching Strategies'],
      children: [
        {
          id: 'java-backend',
          title: 'Java',
          type: 'stack',
          description: 'Enterprise-grade object-oriented language for resilient, high-concurrency server applications.',
          children: [
            {
              id: 'spring-boot',
              title: 'Spring / Spring Boot',
              type: 'subject',
              description: 'Industry-standard Java framework for building cloud-native backend microservices.',
              overview: 'Spring Boot simplifies microservice development with auto-configuration, dependency injection, and Spring Data JPA.'
            }
          ]
        },
        {
          id: 'node-backend',
          title: 'JavaScript / TypeScript',
          type: 'stack',
          description: 'Non-blocking event-driven backend development powered by V8 engine runtime.',
          children: [
            {
              id: 'nodejs-express',
              title: 'Node.js / Express.js',
              type: 'subject',
              description: 'Lightweight web application framework for building fast REST APIs and web servers in JavaScript.',
              overview: 'Node.js enables single-threaded event loop concurrency for high throughput I/O bound workloads.'
            }
          ]
        },
        {
          id: 'python-backend',
          title: 'Python',
          type: 'stack',
          description: 'Expressive, rapid-development language for web backends, APIs, and data integrations.',
          linkedCourseId: 'python',
          linkedTopicId: 'py-intro',
          children: [
            {
              id: 'django',
              title: 'Django',
              type: 'subject',
              description: 'Batteries-included web framework for perfectionists with deadlines.',
              overview: 'Django provides built-in ORM, admin panel, auth, and security protections out of the box.'
            },
            {
              id: 'flask',
              title: 'Flask',
              type: 'subject',
              description: 'Micro web framework providing flexibility and lightweight modular server design.'
            },
            {
              id: 'fastapi',
              title: 'FastAPI',
              type: 'subject',
              description: 'Modern, fast (high-performance) Python web framework based on OpenAPI standards and async/await.'
            }
          ]
        },
        {
          id: 'csharp-backend',
          title: 'C#',
          type: 'stack',
          description: 'Modern object-oriented language developed by Microsoft for robust enterprise backend services.',
          children: [
            {
              id: 'aspnet-core',
              title: '.NET / ASP.NET Core',
              type: 'subject',
              description: 'Cross-platform, high-performance framework for building cloud-based server applications.'
            }
          ]
        },
        {
          id: 'go-backend',
          title: 'Go',
          type: 'stack',
          description: 'Statically typed language engineered by Google for concurrency, microservices, and speed.',
          overview: 'Go features goroutines, channel-based concurrency, fast compilation, and lightweight memory overhead.'
        },
        {
          id: 'cpp-backend',
          title: 'C++',
          type: 'stack',
          description: 'High-performance systems language for ultra-low latency backend systems and game servers.'
        },
        {
          id: 'php-backend',
          title: 'PHP',
          type: 'stack',
          description: 'Widely deployed web backend scripting language powering dynamic web portals.',
          children: [
            {
              id: 'laravel',
              title: 'Laravel',
              type: 'subject',
              description: 'Elegant web application framework featuring intuitive routing, ORM, and blade templating.'
            }
          ]
        },
        {
          id: 'ruby-backend',
          title: 'Ruby',
          type: 'stack',
          description: 'Dynamic programmer-centric language designed for developer happiness.',
          children: [
            {
              id: 'ruby-on-rails',
              title: 'Ruby on Rails',
              type: 'subject',
              description: 'Convention-over-configuration web framework for rapid full-stack and API development.'
            }
          ]
        }
      ]
    },
    {
      id: 'fullstack-development',
      title: 'Full Stack Development',
      type: 'role',
      icon: 'Layers',
      description: 'End-to-end expertise spanning user interfaces, client state, backend APIs, server logic, and database layer.',
      overview: 'Full Stack Developers build entire web applications from client interface through database storage and server deployment.',
      children: [
        {
          id: 'js-ts-fullstack',
          title: 'JavaScript / TypeScript Full Stack',
          type: 'specialization',
          description: 'Unified ecosystem using JavaScript or TypeScript for both frontend and backend development.',
          children: [
            {
              id: 'mern-stack',
              title: 'MERN',
              type: 'stack',
              description: 'MongoDB, Express.js, React, Node.js — The dominant JavaScript full-stack architecture.',
              overview: 'MERN offers a seamless JSON-based workflow from MongoDB documents to Express API endpoints to React components.',
              children: [
                { id: 'mern-mongodb', title: 'MongoDB', type: 'topic', description: 'NoSQL document database using JSON-like documents with flexible schemas.' },
                { id: 'mern-express', title: 'Express.js', type: 'topic', description: 'Fast, unopinionated, minimalist web framework for Node.js.' },
                { id: 'mern-react', title: 'React', type: 'topic', description: 'Frontend library for reactive UI component rendering.' },
                { id: 'mern-node', title: 'Node.js', type: 'topic', description: 'JavaScript runtime environment executing code outside the browser.' }
              ]
            },
            {
              id: 'mean-stack',
              title: 'MEAN',
              type: 'stack',
              description: 'MongoDB, Express.js, Angular, Node.js — Enterprise full-stack JavaScript application architecture.'
            },
            {
              id: 'mevn-stack',
              title: 'MEVN',
              type: 'stack',
              description: 'MongoDB, Express.js, Vue.js, Node.js — Lightweight and flexible JavaScript tech stack.'
            },
            {
              id: 'nextjs-fullstack',
              title: 'Next.js Full Stack',
              type: 'stack',
              description: 'React Framework featuring Server Components, Server Actions, API Routes, and SSR/SSG.'
            }
          ]
        },
        {
          id: 'java-fullstack',
          title: 'Java Full Stack',
          type: 'specialization',
          description: 'Enterprise full stack combining Spring Boot backend services with modern React or Angular frontends.',
          children: [
            { id: 'java-fs-java', title: 'Java', type: 'topic' },
            { id: 'java-fs-springboot', title: 'Spring Boot', type: 'topic' },
            { id: 'java-fs-frontend', title: 'React / Angular', type: 'topic' },
            { id: 'java-fs-db', title: 'MySQL / PostgreSQL', type: 'topic' }
          ]
        },
        {
          id: 'python-fullstack',
          title: 'Python Full Stack',
          type: 'specialization',
          description: 'Python server engines (Django/FastAPI) coupled with reactive web frontends and SQL databases.',
          linkedCourseId: 'python',
          children: [
            { id: 'py-fs-backend', title: 'Django / Flask / FastAPI', type: 'topic' },
            { id: 'py-fs-frontend', title: 'React', type: 'topic' },
            { id: 'py-fs-db', title: 'PostgreSQL', type: 'topic' }
          ]
        },
        {
          id: 'dotnet-fullstack',
          title: '.NET Full Stack',
          type: 'specialization',
          description: 'C# ASP.NET Core backend API coupled with React or Angular and SQL Server.',
          children: [
            { id: 'dotnet-fs-csharp', title: 'C#', type: 'topic' },
            { id: 'dotnet-fs-aspnet', title: 'ASP.NET Core', type: 'topic' },
            { id: 'dotnet-fs-frontend', title: 'React / Angular', type: 'topic' },
            { id: 'dotnet-fs-sql', title: 'SQL Server', type: 'topic' }
          ]
        },
        {
          id: 'php-fullstack',
          title: 'PHP Full Stack',
          type: 'specialization',
          description: 'Laravel backend applications integrated with Inertia.js, Vue, or React frontends.'
        }
      ]
    },
    {
      id: 'mobile-development',
      title: 'Mobile Development',
      type: 'role',
      icon: 'Smartphone',
      description: 'Crafting responsive native and cross-platform mobile applications for iOS and Android devices.',
      overview: 'Mobile Developers build apps tailored for touchscreens, mobile hardware APIs, cameras, offline storage, and push notifications.',
      children: [
        {
          id: 'android-dev',
          title: 'Android',
          type: 'specialization',
          description: 'Native Android application development using modern Kotlin and Jetpack Compose.',
          children: [
            { id: 'kotlin', title: 'Kotlin', type: 'stack', description: 'Modern concise statically typed language officially supported by Google for Android.' },
            { id: 'android-java', title: 'Java', type: 'stack', description: 'Traditional native language for legacy and core Android application engineering.' }
          ]
        },
        {
          id: 'ios-dev',
          title: 'iOS',
          type: 'specialization',
          description: 'Native Apple iOS app engineering targeting iPhone, iPad, Apple Watch, and Mac.',
          children: [
            { id: 'swift', title: 'Swift', type: 'stack', description: 'Powerful, safe native programming language built by Apple.' },
            { id: 'swiftui', title: 'SwiftUI', type: 'subject', description: 'Declarative UI framework for building interface code across Apple platforms.' }
          ]
        },
        {
          id: 'flutter-dev',
          title: 'Flutter',
          type: 'specialization',
          description: 'Google multi-platform UI toolkit compiling to native ARM code from a single Dart codebase.'
        },
        {
          id: 'react-native-dev',
          title: 'React Native',
          type: 'specialization',
          description: 'Meta framework for writing mobile apps using React and rendering native platform controls.'
        }
      ]
    },
    {
      id: 'game-development',
      title: 'Game Development',
      type: 'role',
      icon: 'Gamepad2',
      description: 'Engineering 2D, 3D, physics, gameplay logic, shaders, and real-time interactive game worlds.',
      overview: 'Game Developers combine mathematics, graphics rendering, collision physics, AI behavior, and game mechanics.',
      children: [
        {
          id: 'unity',
          title: 'Unity',
          type: 'specialization',
          description: 'Popular cross-platform game engine for 2D, 3D, mobile, and console game production.',
          children: [
            { id: 'unity-csharp', title: 'C#', type: 'stack', description: 'Scripting language for game logic and engine components in Unity.' }
          ]
        },
        {
          id: 'unreal-engine',
          title: 'Unreal Engine',
          type: 'specialization',
          description: 'High-end AAA real-time 3D graphics engine developed by Epic Games.',
          children: [
            { id: 'unreal-cpp', title: 'C++', type: 'stack', description: 'High performance native code language powering Unreal Engine core.' }
          ]
        },
        { id: 'godot', title: 'Godot', type: 'specialization', description: 'Free open-source 2D and 3D game engine using GDScript and C#.' },
        { id: 'gameplay-programming', title: 'Gameplay Programming', type: 'specialization', description: 'Designing player movement, character controls, combat, and mission logic.' },
        { id: 'game-physics', title: 'Game Physics', type: 'specialization', description: 'Rigid body dynamics, collision detection, cloth simulation, and kinematics.' },
        { id: 'graphics-programming', title: 'Graphics Programming', type: 'specialization', description: 'Real-time rendering pipelines, HLSL/GLSL shaders, ray tracing, and GPU code.' },
        { id: 'game-ai', title: 'Game AI', type: 'specialization', description: 'Pathfinding algorithms (A*), finite state machines, decision trees, and NPC behaviors.' }
      ]
    },
    {
      id: 'systems-software',
      title: 'Systems Software',
      type: 'role',
      icon: 'Cpu',
      description: 'Low-level computing infrastructure, kernel development, compilers, memory hardware, and operating systems.',
      overview: 'Systems Engineers write firmware, drivers, memory allocators, virtual machines, and high-concurrency kernels in C, C++, and Rust.',
      children: [
        { id: 'operating-systems', title: 'Operating Systems', type: 'specialization', description: 'Process management, scheduling, virtual memory paging, and file systems.' },
        { id: 'kernel-development', title: 'Kernel Development', type: 'specialization', description: 'Linux kernel modules, device drivers, low-level interrupt handlers, and hardware control.' },
        { id: 'compilers', title: 'Compilers', type: 'specialization', description: 'Lexical analysis, AST generation, LLVM intermediate representation, and machine code optimization.' },
        { id: 'distributed-systems', title: 'Distributed Systems', type: 'specialization', description: 'Consensus protocols (Raft, Paxos), fault tolerance, RPC, and distributed storage.' },
        { id: 'systems-programming', title: 'Systems Programming', type: 'specialization', description: 'Manual memory management, POSIX systems calls, and high-performance C/C++/Rust code.' }
      ]
    },
    {
      id: 'software-architecture',
      title: 'Software Architecture',
      type: 'role',
      icon: 'GitBranch',
      description: 'Designing high-level system blueprints, modular scalability patterns, microservices, and system resilience.',
      overview: 'Software Architects turn business requirements into reliable, scaleable, maintainable technical system structures.',
      children: [
        { id: 'software-architect', title: 'Software Architect', type: 'specialization', description: 'Defines overall technical vision, software boundaries, and technology stack choices.' },
        { id: 'solutions-architect', title: 'Solutions Architect', type: 'specialization', description: 'Translates enterprise business problems into comprehensive technical system designs.' },
        { id: 'application-architect', title: 'Application Architect', type: 'specialization', description: 'Focuses on application structural patterns, dependency management, and design patterns.' },
        { id: 'system-design', title: 'System Design', type: 'specialization', description: 'Designing load balancers, caching layers, message queues, databases, and microservices for scale.' },
        { id: 'distributed-systems-arch', title: 'Distributed Systems Architecture', type: 'specialization', description: 'Scalable data partitioning, event-driven architectures, and high-availability patterns.' }
      ]
    }
  ]
};
