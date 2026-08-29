# CODEFLOW: ARCHITECTURAL & TECHNICAL INTERVIEW MASTERY GUIDE

---

## PHASE 1 — COMPLETE PROJECT MAP

### 1. Complete Project Architecture
CodeFlow is a full-stack, real-time code execution and visualizer application built to teach programming concepts and Data Structures & Algorithms (DSA) through step-by-step interactive 3D/2D animation and structured visual labs.

```
+---------------------------------------------------------------------------------------------------+
|                                            USER                                                   |
+---------------------------------------------------------------------------------------------------+
                                               |
                                               v
+---------------------------------------------------------------------------------------------------+
|                                  FRONTEND (Vite + React + TS)                                     |
|  - Monaco Code Editor                                                                            |
|  - Control Bar (Run, Step Next/Prev, Auto-play)                                                   |
|  - Visualization Panel (React Three Fiber 3D Canvas, Data Stack/Heap View, AI Guide, Console)    |
|  - Router & Pages (Playground, Dashboard, Learn, Onboarding, Career Roadmap)                      |
|  - Auth Context (Guest state / JWT token state)                                                   |
+---------------------------------------------------------------------------------------------------+
                                               |
                                     HTTP POST | /execute, /login, /register, /me
                                               v
+---------------------------------------------------------------------------------------------------+
|                                     BACKEND (Go + Gin Engine)                                     |
|  - CORS & Middleware Engine                                                                       |
|  - Auth Controller (JWT signing, bcrypt password hash)                                            |
|  - Multi-language Execution Engine (Python, Java, C)                                              |
|  - Step Enricher & Explanation Generator (Metadata classification for loops, conditionals, ops)   |
|  - Storage Engine (GORM with MySQL driver + SQLite fallback)                                      |
+---------------------------------------------------------------------------------------------------+
                       |                                                   |
                       v                                                   v
+---------------------------------------------+   +-------------------------------------------------+
|       SUBPROCESS EXECUTION ENGINE           |   |                DATABASE ENGINE                  |
|  - Python: sys.settrace tracing script      |   |  - Primary: MySQL (Production / Docker)         |
|  - Java: javac compiler + JDB / AST fallback|   |  - Fallback: Local SQLite (`codeflow.db`)         |
|  - C: MinGW gcc compiler                    |   +-------------------------------------------------+
+---------------------------------------------+
```

---

### 2. Frontend Architecture
* **Framework & Build System:** React 18 with TypeScript, bundled using Vite 5.
* **State Management:** Local Component State (`useState`, `useRef`) for step iteration, execution state, and editor state; React Context (`AuthContext`) for user session state.
* **Code Editor:** `@monaco-editor/react` (Monaco Editor engine) providing syntax highlighting, line decorations, and real-time code editing.
* **3D Visualization Engine:** Three.js wrapped in `@react-three/fiber` (R3F) and `@react-three/drei` for rendering 3D stacks, queues, 3D memory nodes, pointers, grid floors, and camera controls.
* **UI & Animation System:** Tailwind CSS for styling paired with `framer-motion` for fluid tab switching, modal displays, and floating AI guide cards.
* **Routing:** `react-router-dom` v7 using `HashRouter` for routing across landing pages, dashboards, interactive learning paths, career roadmaps, and the core visualization playground.

---

### 3. Backend Architecture
* **Language & Web Framework:** Go (1.20+) with the Gin Web Framework (`github.com/gin-gonic/gin`).
* **Execution Orchestration:** Subprocess spawning using Go's `os/exec` package.
* **Instrumentation & Tracing:**
  * **Python:** Injects a dynamic tracer script using `sys.settrace` to record variables, call stacks, stdout, and execution lines per step.
  * **Java:** Injects input redirection, compiles with `javac -g`, and uses fallback line-by-line AST state emulation.
  * **C:** Compiles via `gcc -o` and executes binary under strict `context.WithTimeout`.
* **Metadata & Step Enrichment:** A Go processing pipe (`enrichSteps`) that analyzes raw execution frames and annotates them with structural metadata: `loop` (iteration count, boundary condition), `conditional` (if/elif/else branch states, boolean evaluation), `operator` (operands, substituted expression, resulting target variable), or default `memory`.

---

### 4. Database Architecture
* **ORM Layer:** GORM (`gorm.io/gorm`).
* **Database Driver Strategy:** Dual-driver fallback strategy.
  * Attempt 1: MySQL via `gorm.io/driver/mysql` using connection string `DB_USER:DB_PASSWORD@tcp(DB_HOST:DB_PORT)/DB_NAME`.
  * Attempt 2 (Fallback): SQLite via `github.com/glebarez/sqlite` targeting local embedded file `codeflow.db`.
* **Schema:** `users` table holding user ID, email, hashed password, current user level, XP, streak count, coding hours, and timestamp audit fields.

---

### 5. External Services & APIs
* **Render Cloud Platform:** Hosted backend deployment target (`https://codeflow-192p.onrender.com`).
* **Google Fonts CDN:** Inter & JetBrains Mono typography imports.

---

### 6. Authentication Flow
```
User (Login/Register Form)
  │
  ├─► POST /register ──► [Go Gin] ──► Check user email ──► bcrypt.GenerateFromPassword ──► Save User to DB ──► JWT Signed (24h exp) ──► Return Token + User
  │
  └─► POST /login ─────► [Go Gin] ──► Query User by Email ──► bcrypt.CompareHashAndPassword ──► JWT Signed (24h exp) ──► Return Token + User
```
* Frontend stores JWT in `localStorage` key `'codeflow_token'`.
* Frontend `AuthContext.tsx` sends header `Authorization: Bearer <token>` on HTTP calls.
* **Current Vulnerability in Codebase:** Frontend `App.tsx` has a bypass implementation for `PrivateRoute` that renders all routes regardless of token presence, falling back to `defaultGuestUser`.

---

### 7. Code Execution Flow
```
1. User clicks "Run" in Playground.tsx
   │
2. detectInputsInCode() scans editor text for input prompts (input(), Scanner.next(), etc.)
   ├─► If inputs needed: opens InputCollectionModal.tsx -> User inputs values
   └─► If no inputs needed: proceeds directly
   │
3. API Call: executeCode(code, language, inputs) in frontend/src/api.ts
   │
4. HTTP POST /execute ──► backend/main.go: executeCode()
   │
5. Language Switcher (case "python", "java", "c")
   ├── Python: executePythonWithTracing()
   │     ├─► Encodes user code to Base64
   │     ├─► Generates python tracer script embedding sys.settrace
   │     ├─► Executes python tracer process with 3s timeout
   │     └─► Reads EXECUTION_STEPS JSON output stream
   │
   ├── Java: executeJava()
   │     ├─► Auto-injects helper Stack/Queue classes if missing
   │     ├─► Base64 encodes inputs & injects System.setIn()
   │     ├─► Compiles Java file via `javac -g`
   │     └─► Executes Java process & parses execution frames
   │
   └── C: executeC()
         ├─► Writes main.c to temporary directory
         ├─► Compiles via `gcc -o main main.c`
         └─► Executes binary with 3s timeout
   │
6. Step Enrichment: generateDescriptions() & enrichSteps() attach step metadata (loop, conditional, operator)
   │
7. HTTP 200 JSON Response: { steps: [ { line, code, variables, description, output, metadata }, ... ] }
```

---

### 8. Visualization Flow
```
1. Execution steps stored in Playground.tsx state (`steps`)
   │
2. currentStepIndex set to 0 (First execution frame)
   │
3. VisualizationPanel.tsx receives `currentStep = steps[currentStepIndex]`
   │
4. Selected View Tab:
   ├─► '3d': ExecutionScene.tsx renders Canvas
   │      ├─► Memory variable parser identifies Lists, Arrays, Stacks, Queues, Nodes
   │      ├─► RENDER: ThreeDArray.tsx, ThreeDStack.tsx, ThreeDQueue.tsx, ThreeDNodeStructure.tsx
   │      └─► Floating Framer Motion Card displays AI Explanation text
   ├─► 'data': Displays active stack/heap memory key-value inspector & operation breakdown
   ├─► 'output': Displays terminal emulator output stream (`currentStep.output`)
   └─► 'explanation': Renders step-by-step breakdown & logic guide
```

---

### 9. State-Management Flow
* **Root Auth State (`AuthContext.tsx`):**
  * `user`: Current active user profile object.
  * `token`: Active JWT string or `'guest_token'`.
* **Playground Page State (`Playground.tsx`):**
  * `code`: String of active Monaco Editor contents.
  * `language`: Selected runtime language (`'python'`, `'java'`, `'c'`).
  * `steps`: Array of `ExecutionStep` objects returned from API.
  * `currentStepIndex`: Number tracking active execution step.
  * `isLoading`: Boolean state during API dispatch.
  * `error`: String containing compilation/runtime error messages.
* **Visualization Panel State (`VisualizationPanel.tsx`):**
  * `viewMode`: Selected tab (`'3d'`, `'data'`, `'explanation'`, `'preview'`, `'table'`, `'output'`).
  * `isMinimized`: Collapse/expand state for the floating explanation card.

---

### 10. API Communication Flow
* Implemented in [`frontend/src/api.ts`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/frontend/src/api.ts).
* Dynamic base URL resolution via `getApiBaseUrl()`:
  1. Checks `import.meta.env.VITE_API_URL`.
  2. If on `localhost`, defaults to `http://localhost:8080`.
  3. If deployed on web (non-localhost), targets Render cloud backend (`https://codeflow-192p.onrender.com`).
* Failover & Cold-Start Mechanism:
  * Includes automatic fallback logic attempting primary URL, followed by Render backup URL, with retry loops and delay buffers handling Render free-tier cold starts (15-30s wake-up time).

---

### 11. Deployment Architecture
* **Frontend:** Hosted on static Web Hosts (Render/Vercel/Netlify/Nginx Docker container). Builds to static `/dist` bundle via Vite.
* **Backend:** Go binary executed on Render Linux Web Service using Docker container (`backend/Dockerfile`).
* **Environment Variables:** `JWT_SECRET`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PORT`.

---

### 12. Complete Data Flow: User Click to 3D Canvas
```
[User clicks "Run"]
       │
[Playground.tsx: handleRun()] ──► detectInputsInCode() ──► [api.ts: executeCode()]
                                                                  │
                                                      HTTP POST /execute
                                                                  │
                                                        [backend/main.go]
                                                         executeCode()
                                                                  │
                                                    executePythonWithTracing()
                                                                  │
                                                    Subprocess: `python tracer.py`
                                                                  │
                                                        enrichSteps()
                                                                  │
                                                   JSON Response to Frontend
                                                                  │
                                                Playground.tsx: setSteps(data.steps)
                                                setCurrentStepIndex(0)
                                                                  │
                                                VisualizationPanel.tsx
                                                                  │
                                                ExecutionScene.tsx (3D Canvas)
                                                                  │
                                    ThreeDArray.tsx (3D Boxes with line animations)
```

---

### 13. Folder-by-Folder Explanation

```
CodeFlow/
├── backend/                  # Go Gin API Backend Server & Execution Engine
│   ├── auth.go               # User registration, login controllers & JWT middleware
│   ├── main.go               # Gin routing, multi-language execution tracers, step enrichment
│   ├── models.go             # Data structs for DB Models (User) & API Payloads
│   ├── exec_test.go          # Unit & integration tests for code execution engine
│   ├── Dockerfile            # Multi-stage Linux Docker build file for backend
│   └── codeflow.db           # SQLite fallback database file
│
├── frontend/                 # React + TypeScript + Vite Frontend Web App
│   ├── src/
│   │   ├── api.ts            # Centralized API fetcher with cold-start failover logic
│   │   ├── types.ts          # TypeScript interfaces for execution steps & step metadata
│   │   ├── App.tsx           # React Router client routes & Provider layout
│   │   ├── index.css         # Tailwind base directives & glassmorphism utilities
│   │   ├── components/       # Visualizer & UI Widgets
│   │   │   ├── MonacoEditor.tsx        # Monaco code editor wrapper with step line highlight
│   │   │   ├── VisualizationPanel.tsx  # Multi-tab view container (3D, Data, Console, AI)
│   │   │   ├── Controls.tsx            # Run, Next, Prev, Step Counter buttons
│   │   │   ├── InputCollectionModal.tsx# Modal for user runtime inputs
│   │   │   ├── ThreeD/                 # React Three Fiber 3D Graphics components
│   │   │   │   ├── ExecutionScene.tsx     # 3D Scene setup, lighting, camera controls
│   │   │   │   ├── ThreeDArray.tsx        # 3D animated array boxes
│   │   │   │   ├── ThreeDStack.tsx        # 3D vertical memory stack visualizer
│   │   │   │   ├── ThreeDQueue.tsx        # 3D horizontal queue visualizer
│   │   │   │   └── ThreeDNodeStructure.tsx# 3D Graph / Linked List / Tree visualizer
│   │   │   └── careerRoadmap/          # Career pathway components & interactive tree views
│   │   ├── pages/            # View pages (Playground, Learn, Dashboard, Login, etc.)
│   │   ├── context/          # React Contexts (AuthContext.tsx)
│   │   └── data/             # Static lesson contents & DSA curricula TS files
│   ├── package.json          # Frontend dependencies & Vite scripts
│   ├── vite.config.ts        # Vite configuration & server options
│   └── tailwind.config.js    # Tailwind layout theme setup
│
├── docker-compose.yml        # Orchestration setup for running frontend, backend & MySQL locally
├── run-backend.bat           # Windows helper batch script to launch Go backend server
├── run-frontend.bat          # Windows helper batch script to launch Vite dev server
└── README.md                 # Project Overview & setup documentation
```

---

### 14. Important Configuration Files
1. [`frontend/package.json`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/frontend/package.json): Defines frontend npm packages (`three`, `@react-three/fiber`, `@monaco-editor/react`, `framer-motion`, `axios`, `react-router-dom`) and build scripts (`npm run dev`, `npm run build`).
2. [`frontend/vite.config.ts`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/frontend/vite.config.ts): Configures React Vite plugin and server ports.
3. [`backend/go.mod`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/backend/go.mod): Go module declaration listing `gin-gonic/gin`, `gorm.io/gorm`, `golang-jwt/jwt/v5`, `bcrypt`, `sqlite`, and `mysql` drivers.
4. [`docker-compose.yml`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/docker-compose.yml): Multi-container configuration for MySQL database, Go Backend API server, and Nginx Frontend web server.

---

### 15. Entry Points of the Application
* **Backend Entry Point:** [`backend/main.go`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/backend/main.go) (`func main()`). Starts GORM connection, configures Gin routes, CORS middleware, and listens on port `:8080`.
* **Frontend Entry Point:** [`frontend/src/index.tsx`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/frontend/src/index.tsx). Mounts React DOM root targeting HTML `#root` element and loads `App.tsx`.
* **Main Router Component:** [`frontend/src/App.tsx`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/frontend/src/App.tsx). Registers routes for all view pages.

---

## PHASE 2 — TECHNOLOGY-BY-TECHNOLOGY

### 1. React (v18.2.0)
* **What it is:** A declarative JavaScript UI library for building interactive component-driven single-page applications.
* **Why used here:** Provides reactive state update loops. When `currentStepIndex` updates, React automatically re-renders Monaco line decorations, text descriptions, and 3D Canvas objects seamlessly.
* **Where used:** Entire `frontend/src/` folder (`App.tsx`, `Playground.tsx`, components, pages).
* **Problem solved:** Eliminates manual DOM manipulation.
* **If removed:** Would require writing hundreds of imperative vanilla DOM manipulations and WebGL rendering sync loops.
* **Alternatives:** Vue.js, Svelte, Angular.
* **Trade-offs:** React 18 component re-render overhead if state updates are not managed cleanly (e.g. 3D canvas re-renders).
* **Interview Question:** *How does React's Virtual DOM interact with Three.js WebGL canvas re-renders in your app?*
  * *Answer:* React Three Fiber creates a custom reconciler that bridges React component state props directly to Three.js scene graph objects without updating the traditional HTML Virtual DOM tree.

---

### 2. TypeScript (v4.9.0)
* **What it is:** A strongly typed superset of JavaScript that compiles to plain JavaScript.
* **Why used here:** Prevents runtime shape errors when passing complex execution step payloads between API responses, component states, and 3D scene elements.
* **Where used:** All `.ts` and `.tsx` files in `frontend/src/`.
* **Problem solved:** Enforces exact structural interfaces (e.g. [`ExecutionStep`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/frontend/src/types.ts#L36-L43), [`StepMetadata`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/frontend/src/types.ts#L29-L34)).
* **If removed:** Highly prone to runtime `TypeError: Cannot read properties of undefined` when inspecting deeply nested step variables.
* **Alternatives:** Plain JavaScript with JSDoc typing.

---

### 3. Monaco Editor (`@monaco-editor/react` v4.6.0)
* **What it is:** The code editor component that powers Visual Studio Code.
* **Why used here:** Provides industry-standard code editing experience with auto-indentation, line numbers, syntax highlighting, and custom line highlighting decorations.
* **Where used:** [`frontend/src/components/MonacoEditor.tsx`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/frontend/src/components/MonacoEditor.tsx).
* **Problem solved:** Replaces simple `<textarea>` with a real IDE editing experience.
* **If removed:** Loss of code editor features and active step line highlighting.
* **Alternatives:** CodeMirror, Ace Editor.

---

### 4. React Three Fiber (`@react-three/fiber` v8.15) & React Drei (`@react-three/drei` v9.88)
* **What it is:** A React reconciler for Three.js (`@react-three/fiber`) accompanied by a collection of functional helpers (`@react-three/drei`).
* **Why used here:** Allows declaring 3D WebGL primitives (cubes, spheres, lights, cameras, text meshes) directly using React JSX component syntax.
* **Where used:** All files in [`frontend/src/components/ThreeD/`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/frontend/src/components/ThreeD).
* **Problem solved:** Eliminates complex imperative Three.js boilerplate (`scene.add()`, `requestAnimationFrame`, manual mesh disposal).
* **If removed:** 3D Memory canvas visualization would fail completely.
* **Alternatives:** Plain raw Three.js, Babylon.js, WebXR.

---

### 5. Framer Motion (v12.38.0)
* **What it is:** A production-ready animation library for React.
* **Why used here:** Provides smooth UI transitions, tab switching animations, modal entry overlays, and draggable AI guide windows (`drag` prop).
* **Where used:** `VisualizationPanel.tsx`, `Playground.tsx`, `LandingPage.tsx`, `Learn.tsx`.
* **Problem solved:** Avoids writing tedious CSS keyframe animations.

---

### 6. Go (Golang) & Gin Framework
* **What it is:** A statically typed, compiled programming language known for fast execution, concurrency, and low overhead, combined with Gin, a high-performance HTTP web framework.
* **Why used here:** Enables extremely fast HTTP API response times and lightweight subprocess orchestration for running user-submitted code snippets.
* **Where used:** Entire `backend/` folder (`main.go`, `auth.go`, `models.go`).
* **Problem solved:** Handles OS subprocess execution safely and quickly without heavy Node.js or Python backend overhead.
* **If removed:** The execution backend would need to be rewritten in Node.js (Express), Python (FastAPI/Flask), or Java (Spring Boot).
* **Interview Question:** *Why did you choose Go for the backend code execution engine instead of Node.js?*
  * *Answer:* Go compiles to a native binary, has zero startup cold-start overhead, provides low-level OS subprocess primitives (`os/exec`), and concurrency controls (`context.WithTimeout`), making it ideal for launching sub-processes safely.

---

### 7. GORM & Dual Database Drivers (MySQL / SQLite)
* **What it is:** An ORM library for Go.
* **Why used here:** Abstract SQL operations behind Go structs and provides auto-migration capabilities (`db.AutoMigrate(&User{})`).
* **Where used:** `backend/auth.go`, `backend/main.go`.
* **Problem solved:** Allows seamless switching between production MySQL database and embedded zero-config SQLite (`codeflow.db`) when running locally without active Docker containers.

---

## PHASE 3 — FILE-BY-FILE EXPLANATION

### 1. `backend/main.go`
* **PATH:** [`backend/main.go`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/backend/main.go)
* **PURPOSE:** Primary entry point for the backend server. Configures database connections, Gin HTTP routing, CORS headers, code execution subprocess handlers, and metadata enrichment logic.
* **IMPORTS:** `gin`, `gorm`, `mysql`, `sqlite`, `os/exec`, `encoding/base64`, `regexp`.
* **KEY FUNCTIONS:**
  * `main()`: Database fallback initialization, CORS setup, route registration, starts HTTP server on `:8080`.
  * `executeCode(c *gin.Context)`: Validates request payload, delegates execution to language handlers (`executePythonWithTracing`, `executeJava`, `executeC`), runs step enricher (`enrichSteps`), and responds with JSON.
  * `executePythonWithTracing(code, inputs)`: Base64 encodes python code, builds embedded `tracer.py` script featuring `sys.settrace`, executes python via subprocess with a 3-second timeout, and parses JSON output.
  * `executeJava(code, inputs)`: Injects stack/queue helpers, Base64 decodes inputs into `System.setIn`, compiles via `javac -g`, runs binary, and parses local variable trace.
  * `enrichSteps(steps, language)`: Analyzes code line patterns using regular expressions to inject step mode metadata (`loop`, `conditional`, `operator`, `memory`).
* **INPUT:** HTTP `POST /execute` JSON payload: `{ "code": "...", "language": "python", "inputs": [] }`.
* **OUTPUT:** JSON response: `{ "steps": [ { "line": 1, "code": "...", "variables": {...}, "metadata": {...} } ] }`.
* **INTERVIEW QUESTION:** *How does your Python execution engine capture variable values line-by-line?*
  * *Answer:* It embeds a Python tracer script using Python's built-in `sys.settrace()` framework. The trace function triggers on every `'line'` event, inspects `frame.f_locals`, serializes all non-internal variables to JSON, and records standard output before stepping to the next line.

---

### 2. `backend/auth.go`
* **PATH:** [`backend/auth.go`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/backend/auth.go)
* **PURPOSE:** User authentication controller containing register, login, JWT token generation, and auth verification middleware.
* **KEY FUNCTIONS:**
  * `register(c)`: Reads email/password, checks duplicate email in DB, hashes password using `bcrypt.GenerateFromPassword`, persists new `User`, returns signed JWT token.
  * `login(c)`: Validates email exists, verifies password hash using `bcrypt.CompareHashAndPassword`, issues JWT token.
  * `generateToken(user)`: Signs JWT claim with `user_id` and 24-hour expiration using HMAC SHA256 (`os.Getenv("JWT_SECRET")`).
  * `authMiddleware()`: Extracts `Authorization: Bearer <token>` header, parses and verifies token validity, injects `user_id` into Gin context (`c.Set("user_id", ...)`).
* **SECURITY FLIP/CONCERN:** Hardcoded secret fallback occurs if `os.Getenv("JWT_SECRET")` is empty, generating invalid claims if undefined across instances.

---

### 3. `frontend/src/api.ts`
* **PATH:** [`frontend/src/api.ts`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/frontend/src/api.ts)
* **PURPOSE:** Client-side network execution library. Encapsulates base URL determination, request authorization headers, and cold-start fallback mechanics.
* **KEY FUNCTIONS:**
  * `getApiBaseUrl()`: Evaluates hostname; returns `localhost:8080` for local dev or Render URL (`https://codeflow-192p.onrender.com`) for production.
  * `executeCode(code, language, inputs)`: Issues POST request to `/execute`. Features double-attempt loop with 2-second sleep delays to handle Render backend instance cold starts.

---

### 4. `frontend/src/pages/Playground.tsx`
* **PATH:** [`frontend/src/pages/Playground.tsx`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/frontend/src/pages/Playground.tsx)
* **PURPOSE:** Main IDE & Visualizer workspace page component. Integrates editor, controls, 3D visualization canvas, and input collection modal.
* **KEY FUNCTIONS:**
  * `detectInputsInCode(code, lang)`: Uses regex scanning for `input()` or `Scanner.next()` to prompt user before running code.
  * `handleRun()`: Dispatches input modal or triggers `runExecution()`.
  * `runExecution(collectedInputs)`: Invokes `executeCode()`, sets `steps` state, and initializes `currentStepIndex = 0`.
  * `handleNextStep() / handlePreviousStep()`: Increments/decrements step iteration index.

---

### 5. `frontend/src/components/VisualizationPanel.tsx`
* **PATH:** [`frontend/src/components/VisualizationPanel.tsx`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/frontend/src/components/VisualizationPanel.tsx)
* **PURPOSE:** Multi-view output container. Renders 3D Scene view, Raw Data stack view, Console Output tab, Live Preview (HTML/CSS), SQL Table View, and AI Explanation overlay.
* **INTERACTIVES:** Includes draggable, collapsible Framer Motion floating card (`dragConstraints`, `setCardPosition`) showing step descriptions over the 3D WebGL Canvas.

---

### 6. `frontend/src/components/ThreeD/ExecutionScene.tsx`
* **PATH:** [`frontend/src/components/ThreeD/ExecutionScene.tsx`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/frontend/src/components/ThreeD/ExecutionScene.tsx)
* **PURPOSE:** Primary WebGL 3D Canvas setup. Parses `currentStep.variables` to render appropriate 3D representations (Arrays, Stacks, Queues, Graphs, Linked Lists, Trees).
* **KEY COMPONENTS RENDERED:**
  * `<Canvas>`: R3F Canvas container with OrbitControls (`enableZoom`, `maxPolarAngle`).
  * `<ThreeDArray>`: Animated 3D boxes for active array variables.
  * `<ThreeDStack>`: Vertical box column representing active Stack data structures.
  * `<ThreeDQueue>`: Horizontal box line representing active Queue structures.
  * `<ThreeDNodeStructure>`: Interconnected 3D spheres representing Nodes/Pointers for Linked Lists, Trees, and Graphs.

---

## PHASE 4 — COMPLETE USER FLOW

### Step-by-Step Execution Journey: Array Appending in Python

```
[1. USER ACTION]
User opens Playground (/playground), types code:
   arr = [10, 20]
   arr.append(30)
User clicks "Run" button in Controls.tsx.

[2. FRONTEND EVENT HANDLER]
`Controls.tsx` triggers `onRun` prop ──► `Playground.tsx: handleRun()`.

[3. INPUT DETECTION & API DISPATCH]
`Playground.tsx` calls `detectInputsInCode()`. Returns 0 prompts.
`runExecution()` sets `isLoading = true`, calls `api.ts: executeCode(code, "python", [])`.

[4. HTTP NETWORK REQUEST]
`api.ts` sends POST HTTP request to `http://localhost:8080/execute` with JSON payload:
{ "code": "arr = [10, 20]\narr.append(30)", "language": "python", "inputs": [] }

[5. BACKEND ROUTER & HANDLER]
`backend/main.go` Gin router matches `POST /execute` ──► invokes `executeCode(c)`.

[6. SUBPROCESS TRACING EXECUTION]
`executeCode()` calls `executePythonWithTracing()`.
- Base64 encodes code string.
- Creates temporary directory and writes tracer script.
- Launches OS subprocess: `python tracer.py`.
- Tracer script executes `sys.settrace(trace_function)`.
- Step 1 line 1: `arr` becomes `[10, 20]`.
- Step 2 line 2: `arr` becomes `[10, 20, 30]`.
- Output JSON written to stdout: `EXECUTION_STEPS: [...]`.

[7. ENRICHMENT PIPELINE]
`executeCode()` passes steps to `generateDescriptions()` and `enrichSteps()`.
- Description generated: "Update: 'arr' is now [10, 20, 30]."
- Metadata tagged mode: "memory".

[8. FRONTEND STATE UPDATE]
`executeCode()` API promise resolves in `Playground.tsx`.
- `setSteps(data.steps)` stores step array.
- `setCurrentStepIndex(0)` selects first frame.
- `setIsLoading(false)` stops loader spinner.

[9. MONACO EDITOR & UI SYNC]
- `MonacoEditor.tsx` receives `currentLine = steps[0].line`, highlights line 1 with CSS class `.active-exec-line`.
- `VisualizationPanel.tsx` receives `currentStep = steps[0]`.

[10. 3D WEBGL GRAPHICS RENDER]
- `ExecutionScene.tsx` inspects `currentStep.variables`. Detects key `arr` holding list `[10, 20]`.
- Mounts `<ThreeDArray name="arr" data={[10, 20]} />`.
- Renders 3D meshes: Mesh boxes positioned horizontally at `x = index * 1.5`, with 3D Text labels above each element.
- When user clicks "Next Step", `currentStepIndex` updates to `1`.
- R3F smoothly animates third box mesh appearing for value `30` at `x = 3.0`.
```

---

## PHASE 5 — CODE EXECUTION SYSTEM

### 1. How Code is Submitted & Executed
Code submission is completely statless over REST POST requests to `/execute`.
The backend uses Go's `os/exec` package to spawn separate runtime subprocesses per request:

```go
// From backend/main.go executePythonWithTracing
cmd := exec.Command(getPythonCmd(), tracerPath)
```

---

### 2. How Variables & Data Structures are Tracked

#### Python Tracing Mechanics
Python uses Python's native frame evaluation hook `sys.settrace()`. A custom trace function captures variable snapshots on every `line` event:

```python
# Extract from dynamic tracer script in backend/main.go
def serialize_obj(obj, visited=None):
    if visited is None: visited = set()
    obj_id = id(obj)
    if obj_id in visited:
        return f"<CircularReference {type(obj).__name__}>"
    visited.add(obj_id)
    if isinstance(obj, (list, tuple)):
        return [serialize_obj(item, visited.copy()) for item in obj]
    if hasattr(obj, '__dict__'):
        d = {k: serialize_obj(v, visited.copy()) for k, v in obj.__dict__.items() if not k.startswith('__')}
        d['_type'] = type(obj).__name__
        d['_id'] = id(obj)
        return d
```

#### Object Reference & Circularity Protection
To prevent infinite recursion stack overflows when serializing recursive data structures (e.g. Doubly Linked Lists or Graphs where `node.next.prev == node`), the tracer keeps an object memory ID set (`visited`). If an ID is re-encountered, it inserts `<CircularReference ClassName>` instead of crashing.

---

### 3. Execution Security & Timeout Controls
Subprocesses are executed inside a Go `select` channel race pattern paired with hard timeouts:

```go
timeout := 3 * time.Second
select {
case steps := <-resultChan:
    return steps, nil
case err := <-errorChan:
    return nil, err
case <-time.After(timeout):
    if cmd.Process != nil {
        cmd.Process.Kill() // Kills runaway infinite loops
    }
    return nil, fmt.Errorf("execution timeout after %v", timeout)
}
```

---

## PHASE 6 — REACT DEEP DIVE

### Component Hierarchy Tree

```
App (Router, AuthProvider)
 │
 ├── IntroLandingPage / LandingPage / Dashboard / Learn / Register / Login
 │
 └── Playground
      │
      ├── Header (Navigation Links, Language Status Badge)
      │
      ├── Left Panel (Editor Container)
      │    ├── Language Selector (<select>)
      │    ├── Controls (Run, Prev, Next step buttons, Step Counter)
      │    └── MonacoEditor (Monaco instance wrapper, Line Decorations)
      │
      └── Right Panel (Visualizer Container)
           ├── VisualizationPanel (Tab navigation bar: 3D, Data, Console, AI)
           │    │
           │    ├── ExecutionScene (R3F Canvas, OrbitControls, Ambient/Directional Lights)
           │    │    ├── ThreeDArray (3D Box Meshes, Element values, Index text)
           │    │    ├── ThreeDStack (Vertical memory stack boxes)
           │    │    ├── ThreeDQueue (Horizontal queue boxes)
           │    │    └── ThreeDNodeStructure (3D Spheres for Graphs/Trees/Nodes)
           │    │
           │    └── Floating Framer Motion Card (Draggable AI Explanation container)
           │
           └── InputCollectionModal (Prompt input overlay)
```

---

### Key React State Flow Diagram
```
Playground.tsx: currentStepIndex State (e.g., 2)
   │
   ├─► MonacoEditor.tsx (Prop: currentLine) ──► Re-decorates editor line #3
   │
   └─► VisualizationPanel.tsx (Prop: currentStep = steps[2])
        │
        └─► ExecutionScene.tsx (Prop: currentStep)
             │
             └─► R3F Canvas Re-renders 3D elements matching variables state at Step #2
```

---

## PHASE 7 — BACKEND DEEP DIVE

### Complete Route Map & Middleware Trace

```
r := gin.Default()

1. Global CORS Middleware
   - Sets headers: Access-Control-Allow-Origin: *
   - Handles HTTP OPTIONS pre-flight checks with status 204.

2. Public Routes
   - POST /register ──► register() controller handler
   - POST /login    ──► login() controller handler
   - POST /execute  ──► executeCode() execution controller
   - GET  /health   ──► inline handler returning {"status": "ok"}

3. Protected Routes (Group "/")
   - Uses authMiddleware()
   - GET /me        ──► Fetches user profile using `user_id` stored in Gin context.
```

---

## PHASE 8 — DATABASE

### Entity Schema & GORM Model Mapping

#### Table: `users`
* `id` (`uint`, Primary Key, Auto-increment)
* `email` (`string`, Unique Index, Not Null)
* `password` (`string`, Hashed using bcrypt, Not Null, JSON excluded via `json:"-"`)
* `level` (`string`, Default `'STARTER'`)
* `xp` (`int`, Default `0`)
* `streak` (`int`, Default `0`)
* `coding_hours` (`float64`, Default `0.0`)
* `created_at` (`time.Time`)
* `updated_at` (`time.Time`)
* `deleted_at` (`gorm.DeletedAt`, Index for soft deletes)

---

## PHASE 9 — HARD PROBLEMS & ENGINEERING CHALLENGES

### Problem 1: Capturing Line-by-Line Execution State Across Dynamic Languages Without Modifying User Source Code

#### Challenge
Traditional visualizers force users to insert debug print statements manually or write custom instrumented AST transformations. CodeFlow required taking raw, unaltered Python/Java code, running it server-side, and capturing complete local variable snapshots per line.

#### Root Cause
Language runtimes do not expose state trace streams by default during normal process execution.

#### Implemented Solution
Built language-specific dynamic trace injectors in Go backend (`backend/main.go`):
* **Python:** Injects a custom `sys.settrace()` wrapper script dynamically at runtime. The trace function fires on `'line'` events, serializes `frame.f_locals` to JSON, and captures stdout buffers before returning control.
* **Java:** Injects stdin redirection hooks (`System.setIn`), compiles with debug symbols (`javac -g`), and fallback-simulates array/for loop execution frames.

---

### Problem 2: Circular Object References Crashing JSON Serialization

#### Challenge
Complex data structures like Doubly Linked Lists (`node.next.prev == node`) or cyclic graphs cause infinite recursion when serializing state to JSON, freezing the server or crashing Node/Python processes with stack overflow errors.

#### Solution
Implemented object identity tracking (`visited = set()`) inside the Python tracer's `serialize_obj()` function (lines 1105–1142 in `main.go`). Before serializing any object instance, it checks `id(obj)`. If the object memory address was previously processed in the current recursion stack, it returns a string marker `<CircularReference ClassName>` instead of recursing infinitely.

---

### Problem 3: Render Cloud Platform Free-Tier Cold-Start Delays

#### Challenge
When hosted on Render's free tier, backend instances spin down after inactivity. Initial execution requests timeout or fail with network fetch errors while the instance boots up (15–30s delay).

#### Solution
Implemented a resilience failover loop in [`frontend/src/api.ts`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/frontend/src/api.ts#L44-L88). The client makes two attempts per URL, injecting a 2-second async pause between retries upon encountering network errors, and displays a user-friendly cold-start explanation modal rather than a generic crash banner.

---

## PHASE 10 — ARCHITECTURAL TRADE-OFFS

| # | Technical Decision | Rationale / Why | Alternative Considered | Trade-off / Weakness | Interview Explanation Strategy |
|---|---|---|---|---|---|
| 1 | **Go for Backend Engine** | Fast binary startup, low memory footprint, native `os/exec` primitives. | Node.js / Express | Writing complex text manipulation routines in Go is more verbose than JS. | *Emphasize performance, concurrency safety, and low container resource usage.* |
| 2 | **Python `sys.settrace` Tracing** | Native runtime hook; zero modification to user's raw code. | AST code instrumentation (adding wrapper lines) | Slower execution compared to un-traced code; risk of runaway trace output. | *Highlight that it guarantees 100% transparent execution without altering line numbers.* |
| 3 | **React Three Fiber (R3F) for 3D Visuals** | Declarative WebGL component architecture; syncs directly with React state. | Raw imperative Three.js | Canvas re-renders can trigger high GPU usage if frame updates aren't throttled. | *Explain how declarative JSX maps directly to 3D scene graphs.* |
| 4 | **SQLite Dual-Database Fallback** | Allows local setup (`run-backend.bat`) without requiring local MySQL/Docker setup. | Pure PostgreSQL / MySQL | Schema sync differences between SQLite and MySQL under edge GORM operations. | *Frame it as developer ergonomics and rapid local development flexibility.* |
| 5 | **Monaco Editor Wrapper** | VS Code standard editing experience with native line decorations. | CodeMirror / Ace | Large JavaScript bundle footprint (~3MB monaco chunk). | *Justify by noting superior developer experience and exact VS Code feature parity.* |
| 6 | **Stateless HTTP REST API Execution** | Simplifies backend scaling; no persistent WebSocket connection state to manage. | WebSockets (WS/WSS) | Client must send full code payload on every "Run" request. | *Argue that code snippets are small (few KB) and REST eliminates server socket state memory leaks.* |
| 7 | **Regex-based Input Detector** | Pre-scans code for `input()` on frontend to open input modal before API execution. | Interactive stdin streaming via WebSocket | Regex scanning can miss edge-case input calls (e.g. indirect function calls). | *Acknowledge trade-off between complex streaming infrastructure vs simple prompt overlays.* |
| 8 | **Regex Step Enricher in Backend** | Enriches steps with loop/conditional metadata without needing full language parsers. | Full AST Parser (Tree-Sitter / Go AST) | Regex can miss complex nested ternary or multiline compound conditional expressions. | *Explain it as a lightweight performance trade-off for real-time visualization enrichment.* |
| 9 | **Framer Motion Draggable Cards** | Enables user to move AI explanation card over the 3D canvas freely. | Fixed sidebar layout | Can obscure WebGL canvas objects if moved to canvas center. | *Highlight user customization and spatial freedom in the visual workspace.* |
| 10 | **HashRouter Client Routing** | Eliminates server-side 404 rewrite rules when serving static frontend assets. | BrowserRouter (HTML5 History API) | Fragment URLs (`/#/playground`) look less modern than clean paths. | *Defend as zero-config deployment safety across static Web hosts.* |

---

## PHASE 11 — SECURITY AUDIT & VULNERABILITIES

> [!CAUTION]
> **CRITICAL SECURITY AUDIT FINDINGS (For Interview Defense)**
> If an interviewer asks "Is your code execution backend secure?", **DO NOT CLAIM IT IS SECURE**. Tell them honestly about the following vulnerabilities present in the existing code.

### 1. Remote Code Execution (RCE) Hazard
* **Vulnerability:** User code submitted to `/execute` is executed directly on the host machine OS via `exec.Command("python")` or `exec.Command("javac")` without container isolation (gVisor/nsjail/Docker container sandbox).
* **Impact:** A user can execute malicious Python system code:
  ```python
  import os
  os.system("rm -rf /") # Or reading server environment variables os.environ
  ```
* **Production Fix Required:** Wrap code execution inside ephemeral Docker containers or secure sandboxes (e.g., AWS Lambda, Firecracker microVMs, or `nsjail`).

### 2. Authentication Bypass in Frontend
* **Vulnerability:** In [`frontend/src/App.tsx`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/frontend/src/App.tsx#L15-L17), `PrivateRoute` is implemented as:
  ```tsx
  const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <>{children}</>;
  };
  ```
* **Impact:** Unauthenticated users can navigate directly to protected routes (`/dashboard`, `/career-roadmap`, `/learn`) without logging in, defaulting to `defaultGuestUser`.
* **Fix Required:** Update `PrivateRoute` to check `const { token } = useAuth()` and redirect to `/login` if token is absent.

### 3. Wildcard CORS Configuration
* **Vulnerability:** In [`backend/main.go`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/backend/main.go#L122), CORS header is set to `c.Header("Access-Control-Allow-Origin", "*")`.
* **Impact:** Allows any third-party domain to make cross-origin requests to the API backend.

---

## PHASE 12 — PERFORMANCE & SCALABILITY

### Scalability Bottleneck Analysis: What Breaks at 100,000 Users?

```
100,000 Active Users
       │
       v
HTTP POST /execute Requests
       │
       v
Go Backend Server ──► Spawns 100,000 OS Subprocesses (`python tracer.py` / `javac`)
       │
       v
[CRASH POINT 1]: OS Process Table Exhaustion & CPU Spikes (100% CPU, Server OOM)
[CRASH POINT 2]: SQLite File Lock Contention (`codeflow.db` locked)
```

### Redesign Blueprint for Scale
1. **Asynchronous Execution Queue:** Replace direct HTTP subprocess execution with a message queue (RabbitMQ / Redis PubSub).
2. **Worker Pool Container Isolation:** Distribute code execution tasks to stateless isolated worker instances (AWS Fargate / Kubernetes pods).
3. **Database Migration:** Replace SQLite fallback entirely with a clustered PostgreSQL or MySQL instance backed by Connection Pooling (PgBouncer).
4. **Caching Layer:** Cache identical code execution steps in Redis (key = `hash(code + language)`).

---

## PHASE 13 — DEPLOYMENT

### Complete Deployment Pipeline (Local to Production)

```
[Local Environment]
Developer edits code ──► Tests via run-backend.bat & run-frontend.bat
                               │
                        Git Push to GitHub
                               │
[Render Cloud Build Pipeline]
                               ├─► Frontend Service (Static Site):
                               │     - Runs `npm run build` (tsc && vite build)
                               │     - Output directory: `/dist`
                               │     - Served via CDN
                               │
                               └─► Backend Service (Docker Web Service):
                                     - Builds Linux image using backend/Dockerfile
                                     - Exposes port :8080
                                     - Starts binary `./server`
```

---

## PHASE 14 — INTERVIEW PREPARATION & QUESTIONS

### Category A: Architecture & System Design

#### Q1: "Walk me through the high-level architecture of CodeFlow."
* **Tested Skill:** System architecture overview & clarity.
* **Strong Answer:** *"CodeFlow is built as a decoupled single-page application using React, TypeScript, and Vite on the frontend, paired with a Go Gin REST API on the backend. The core feature is its real-time code execution engine. When a user runs code, the frontend POSTs the snippet to our Go server, which spawns an isolated subprocess using language-specific tracing hooks—like Python's `sys.settrace`—to record line-by-line variable state snapshots. This frame payload is enriched with structural metadata (loops, conditionals) and returned as JSON. React Three Fiber then renders these variables as interactive 3D WebGL data structures."*
* **What NOT to say:** *"It's just a basic React app connected to a database."*

#### Q2: "How does the frontend communicate with the backend during code execution?"
* **Tested Skill:** REST API communication, failover strategy, network handling.
* **Strong Answer:** *"Communication occurs over a stateless HTTP POST request to `/execute`. Our client network layer in `api.ts` features a cold-start resilience mechanism designed for cloud environments like Render. It attempts requests against a dynamic base URL with retry buffers to handle backend instance boot delays before updating component state."*

---

### Category B: Code Execution Engine

#### Q3: "How do you capture variable values line-by-line in Python without asking the user to write print statements?"
* **Tested Skill:** Deep language runtime knowledge & backend engineering.
* **Strong Answer:** *"We leverage Python's built-in `sys.settrace()` framework. When code is submitted, our Go backend dynamically wraps the user snippet in a tracer script. The trace function triggers on every line execution event, inspects the current execution frame's `f_locals`, recursively serializes variables to JSON while handling circular references, captures stdout, and writes structured step objects back to the stdout channel for Go to parse."*

---

### Category C: React & Frontend Performance

#### Q4: "How do you render 3D Data Structures in React without slowing down the UI?"
* **Tested Skill:** WebGL integration, React Three Fiber, component rendering optimization.
* **Strong Answer:** *"We use React Three Fiber (`@react-three/fiber`), which acts as a React reconciler targeting Three.js rather than the HTML Virtual DOM. 3D components like `<ThreeDArray>` receive execution step props and update 3D mesh transformations directly inside the WebGL canvas context without triggering layout recalculations in the standard HTML document."*

---

## PHASE 15 — RANDOM CODE DEFENSE SCENARIOS

### Scenario 1: Backend Tracer Script Builder
* **FILE:** [`backend/main.go`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/backend/main.go#L1105-L1142)
* **CODE SNIPPET:**
  ```python
  def serialize_obj(obj, visited=None):
      if visited is None: visited = set()
      obj_id = id(obj)
      if obj_id in visited:
          return f"<CircularReference {type(obj).__name__}>"
      visited.add(obj_id)
  ```
* **INTERVIEWER QUESTION:** *"What does this specific block of python code embedded in your Go file do?"*
* **STRONG EXPLANATION:** *"This is our circular reference guard in the Python step tracer. When users visualize complex data structures like Doubly Linked Lists or cyclic graphs, objects reference each other. Without this check, JSON serialization would enter infinite recursion and crash the server with a Stack Overflow. By tracking visited object memory IDs (`id(obj)`), we detect cycles and safely insert a readable text reference placeholder."*

---

### Scenario 2: Dynamic Input Prompt Detector
* **FILE:** [`frontend/src/pages/Playground.tsx`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/frontend/src/pages/Playground.tsx#L13-L44)
* **CODE SNIPPET:**
  ```typescript
  const detectInputsInCode = (codeText: string, lang: string): string[] => {
    if (lang === 'python') {
      const regex = /(?:input|raw_input)\s*\(\s*(?:['"](.*?)['"])?\s*\)/g;
      ...
  ```
* **INTERVIEWER QUESTION:** *"Why are you parsing code with regular expressions on the frontend before running it?"*
* **STRONG EXPLANATION:** *"Because standard HTTP REST requests are request-response driven and cannot pause mid-execution for user input. This function pre-scans the source code for input function calls like `input()` or `Scanner.next()`. If found, it opens our `<InputCollectionModal>` to collect user inputs upfront, passing them in the execution payload array so the backend can feed them directly into stdin."*

---

## PHASE 16 — LIVE CODING & MODIFICATION TASKS

### Task 1: Add Execution Speed / Auto-Play Control to Playground
* **Files to Modify:**
  1. [`frontend/src/components/Controls.tsx`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/frontend/src/components/Controls.tsx)
  2. [`frontend/src/pages/Playground.tsx`](file:///c:/Users/chandana/CascadeProjects/CodeFlow/frontend/src/pages/Playground.tsx)
* **Implementation Approach:**
  * In `Playground.tsx`, create state `isPlaying` (boolean) and `speed` (number, e.g., 1000ms).
  * Use a `useEffect` hook listening to `isPlaying` and `currentStepIndex`:
    ```typescript
    useEffect(() => {
      if (!isPlaying || currentStepIndex >= steps.length - 1) return;
      const timer = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }, [isPlaying, currentStepIndex, steps.length, speed]);
    ```
  * Add Play/Pause toggle button in `Controls.tsx`.

---

## FINAL CHEAT SHEET — CODEFLOW INTERVIEW ESSENTIALS

### 1. One-Minute Pitch
> *"CodeFlow is an interactive developer tool and learning platform that turns static code into live 3D step-by-step visualizations. Built with React, TypeScript, and React Three Fiber on the frontend, and Go on the backend, it captures line-by-line program execution state using runtime tracing tools like Python's `sys.settrace`. It converts raw variables into animated 3D stacks, queues, arrays, and linked structure graphs in real time, helping developers visualize DSA concepts effortlessly."*

---

### 2. Two-Minute Deep Dive
> *"What sets CodeFlow apart is how it transparently captures program state without requiring users to modify their code or insert debug statements. When a user runs a snippet in our Monaco editor, our Go backend executes the code inside a lightweight subprocess instrumented with custom tracing hooks. The tracer records variable mutations, call stack changes, stdout, and line indicators per execution step.*
>
> *Our Go server enriches this raw step stream with structural metadata—identifying loop boundaries, conditional branch evaluations, and operator assignments—and returns a structured JSON timeline. On the frontend, React Three Fiber renders these variables as 3D WebGL meshes inside a WebGL canvas, allowing learners to step forward and backward through their code's execution state visually while an AI guide card explains what is happening at each step."*

---

### 3. Top 5 Things You Must Know Cold
1. **Python Tracing:** `sys.settrace()` captures line events and inspects `frame.f_locals`.
2. **3D WebGL Rendering:** React Three Fiber (`@react-three/fiber`) reconciles React state changes directly into Three.js 3D scene objects.
3. **Go Subprocess Control:** `os/exec` executes compiler binaries (`javac`, `gcc`) and Python scripts with strict context timeouts (`context.WithTimeout`).
4. **Circular Reference Safeguard:** Object memory IDs (`id(obj)`) are tracked during JSON serialization to prevent infinite recursion on recursive data structures.
5. **Database Fallback:** Dual GORM configuration attempts MySQL connection first and gracefully falls back to embedded SQLite (`codeflow.db`).

---

### 4. Five Things NEVER to Claim in an Interview
1. ❌ **Do NOT claim code execution is completely sandboxed or secure.** (Acknowledge that production deployments should use Docker/gVisor microVM container isolation instead of raw OS subprocesses).
2. ❌ **Do NOT claim `PrivateRoute` securely locks down routes in the current frontend code.** (Point out that it currently bypasses token validation and needs a proper `useAuth()` check).
3. ❌ **Do NOT claim stdin is live-streamed during execution over WebSockets.** (Explain that inputs are pre-collected via frontend regex detection and sent upfront in the HTTP POST body).
4. ❌ **Do NOT claim the application uses complex global state managers like Redux or Zustand.** (Clarify that local component state and React Context manage data flow cleanly).
5. ❌ **Do NOT claim Java tracing uses full remote JDB debugging in production fallback mode.** (Explain that Java relies on AST line/variable state emulation fallback if JDB is unavailable).
