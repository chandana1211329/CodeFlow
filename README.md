# Code Execution Visualizer

A full-stack web application that allows users to write Python code and visualize its execution step-by-step. Built with Go backend and React frontend.

## Features

- **Code Editor**: Monaco Editor with Python syntax highlighting
- **Step-by-Step Execution**: Visualize each line of code execution
- **Variable Tracking**: See variable values change in real-time
- **Error Handling**: Clear error messages for debugging
- **Infinite Loop Protection**: 3-second timeout on execution
- **Responsive UI**: Modern interface with Tailwind CSS

## Architecture

```
code-execution-visualizer/
├── backend/              # Go REST API
│   ├── main.go          # Server and execution logic
│   ├── go.mod           # Go dependencies
│   ├── Dockerfile       # Backend container image
│   └── .dockerignore    # Docker build exclusions
├── frontend/             # React application
│   ├── src/             # React components
│   ├── public/          # Static assets
│   ├── package.json     # Node dependencies
│   ├── Dockerfile       # Frontend container image
│   ├── nginx.conf       # Nginx proxy config
│   └── .dockerignore    # Docker build exclusions
├── docker-compose.yml   # Multi-container orchestration
└── README.md            # Documentation
```

## Prerequisites

- Go 1.21 or higher
- Node.js 18 or higher
- Python 3.x (for code execution)

## Docker Deployment

The application can be run entirely using Docker and Docker Compose.

### Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

### Quick Start with Docker

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

### Docker Services

| Service | Container Name | Port | Description |
|---------|---------------|------|-------------|
| Backend | code-execution-backend | 8080 | Go REST API with Python execution |
| Frontend | code-execution-frontend | 3000 | React app served via nginx |

### Rebuilding After Changes

```bash
# Rebuild and restart
docker-compose up -d --build

# Rebuild specific service
docker-compose up -d --build backend
```

### Docker Architecture

- **Backend**: Multi-stage Alpine-based image with Go binary and Python3
- **Frontend**: Multi-stage build with nginx serving production React build
- **Networking**: Docker bridge network for service communication
- **Proxy**: Nginx proxies `/api/*` requests to backend service

## Local Development (Without Docker)

### Prerequisites

- Go 1.21 or higher
- Node.js 18 or higher
- Python 3.x (for code execution)

### Backend Setup

```bash
cd backend
go mod tidy
go run main.go
```

The backend will start on http://localhost:8080

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will start on http://localhost:3000

## API Endpoints

### POST /execute
Execute Python code and return execution steps.

**Request:**
```json
{
  "code": "x = 5\ny = 10\nprint(x + y)"
}
```

**Response:**
```json
{
  "steps": [
    {
      "line": 1,
      "code": "x = 5",
      "variables": {"x": 5}
    },
    {
      "line": 2,
      "code": "y = 10",
      "variables": {"x": 5, "y": 10}
    }
  ]
}
```

## How It Works

1. **Code Submission**: User writes Python code in the Monaco Editor
2. **Execution**: Backend receives code and injects a tracing script
3. **Tracing**: Python's `sys.settrace` captures each line execution
4. **Visualization**: Frontend displays step-by-step execution with variable states

## Security

- Execution timeout (3 seconds)
- Process isolation via subprocess
- No network access during execution
- Temporary file cleanup

## Development

### Backend Development

```bash
cd backend
go run main.go
```

### Frontend Development

```bash
cd frontend
npm start
```

## Production Build

### Backend
```bash
cd backend
go build -o server main.go
./server
```

### Frontend
```bash
cd frontend
npm run build
```

## License

MIT License
