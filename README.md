# Product CRUD (Spring Boot + React)

A simple Product CRUD project using Spring Boot REST API and a React frontend.

## Features
- Create, read, update, delete products
- Search by name
- Show max price product

## Backend (Spring Boot)
- Base URL: `http://localhost:8080/api/products`
- Database: PostgreSQL (configured in `src/main/resources/application.properties`)

## Frontend (React)
- Location: `frontend/`
- Dev server: `http://localhost:5173`

## Quick start

### 1) Start PostgreSQL
Ensure the database is running and matches:
- DB: `demoDB`
- User: `postgres`
- Password: `admin`

### 2) Run backend
```bash
./mvnw spring-boot:run
```

### 3) Run frontend
```bash
cd frontend
npm install
npm run dev
```

## API examples
See `requests.http` for ready-to-run requests.
