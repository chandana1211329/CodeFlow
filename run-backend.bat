@echo off
set PATH=C:\Program Files\Go\bin;%PATH%
cd backend
go mod tidy
set DB_HOST=localhost
set DB_PORT=5432
set DB_USER=user
set DB_PASSWORD=password
set DB_NAME=codeflow
set JWT_SECRET=your_super_secret_key_123
go run .
