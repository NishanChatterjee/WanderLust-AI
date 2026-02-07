# WanderLust AI - The Resilient Booking Orchestrator

This project implements a resilient travel booking system with an Agentic AI concierge.

## Architecture Highlights

- **Backend**: Spring Boot 3.4, Java 21
- **Orchestration**: Saga Pattern (Order -> Flight, Hotel, Payment)
- **AI**: Spring AI with RAG (PGVector) and OpenAI
- **Resilience**: Circuit Breaker (Resilience4j)
- **Idempotency**: Redis-backed key checks
- **Tracing**: Micrometer + Zipkin
- **Frontend**: React + TypeScript + Tailwind-like CSS with "Generative UI"

## Prerequisites

- Docker & Docker Compose
- Java 21
- Node.js 20+
- OpenAI API Key

## Setup & Run

### 1. Infrastructure

Start the required databases and tracing services:

```bash
docker-compose up -d
```

This starts:

- Postgres (Port 5432) - For Vector Store
- Redis (Port 6379) - For Idempotency
- Zipkin (Port 9411) - For Distributed Tracing

### 2. Backend

Configure your OpenAI Key in `src/main/resources/application.yml` or set env var `OPENAI_API_KEY`.
Then run the application:

```bash
./mvnw spring-boot:run
```

The backend runs on `http://localhost:8080`.

### 3. Frontend

Navigate to the frontend directory and start the dev server:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Features to Test

- **AI Chat**: Ask "Find me a hotel in Paris" (Mocked RAG flow).
- **Booking**: The AI will present a "Book This Trip" button. Click it to trigger the Saga.
- **Idempotency**: Click "Book" multiple times rapidly; duplicate requests are blocked.
- **Resilience**: The Weather Service has a fallback if the API is slow/down.
