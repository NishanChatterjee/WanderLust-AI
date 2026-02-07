# 🌍 WanderLust-AI: The Resilient Booking Orchestrator

A production-grade travel booking platform demonstrating advanced distributed systems patterns with AI-powered assistance.

## 🎯 Project Overview

WanderLust-AI is a **full-stack travel booking orchestrator** that showcases modern enterprise architecture patterns. It demonstrates how to build resilient, AI-powered microservices that can handle failures gracefully while providing an exceptional user experience.

### Why This Project Stands Out

| Challenge                           | Solution Implemented                                    |
| ----------------------------------- | ------------------------------------------------------- |
| Distributed Transaction Consistency | Saga Pattern with compensating transactions             |
| Service Failures & Latency          | Circuit Breaker (Resilience4j) with fallbacks           |
| Duplicate Request Handling          | Idempotency Keys for exactly-once processing            |
| AI Integration                      | Spring AI with Google Gemini for intelligent assistance |
| Real-time Updates                   | Event-driven architecture with Spring Modulith          |
| External API Integration            | Open-Meteo (weather) with resilient fallbacks           |

---

## ✨ Key Features

### 🤖 AI-Powered Travel Assistant

- Natural language trip planning using Spring AI + Google Gemini
- Intelligent destination recommendations
- Context-aware booking suggestions

### 🔄 Saga Pattern Implementation

```
┌─────────┐     ┌─────────┐     ┌─────────┐
│ Reserve │────▶│ Reserve │────▶│ Process │
│ Flight  │     │  Hotel  │     │ Payment │
└────┬────┘     └────┬────┘     └────┬────┘
     │               │               │
     ▼               ▼               ▼
┌─────────┐     ┌─────────┐     ┌─────────┐
│ Cancel  │◀────│ Cancel  │◀────│ Refund  │
│ Flight  │     │  Hotel  │     │ Payment │
└─────────┘     └─────────┘     └─────────┘
   (Compensating transactions on failure)
```

### ⚡ Resilience Patterns

| Pattern         | Implementation      | Purpose                   |
| --------------- | ------------------- | ------------------------- |
| Circuit Breaker | WeatherService      | Prevents cascade failures |
| Fallback        | Weather cached data | Graceful degradation      |
| Idempotency     | Order processing    | Exactly-once semantics    |
| Timeout         | All external calls  | Bounded latency           |

### 📡 Event-Driven Architecture

- Domain Events: `BookingConfirmedEvent`, `PaymentProcessedEvent`
- Spring Modulith: Module boundaries with event publishing
- Notification System: Real-time booking confirmations

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────────┐ │
│  │ SearchHero  │ │ BookingCard │ │WeatherWidget│ │ MyTripsPage│ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │ REST API
┌─────────────────────────────────────────────────────────────────┐
│                    SPRING BOOT BACKEND                           │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                     API LAYER                                │ │
│ │  AssistantController │ OrderController │ WeatherController   │ │
│ └─────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                   ORCHESTRATION LAYER                        │ │
│ │        ┌────────────────────────────────┐                   │ │
│ │        │         ORDER SAGA             │                   │ │
│ │        │  Flight → Hotel → Payment      │                   │ │
│ │        │  (with compensating actions)   │                   │ │
│ │        └────────────────────────────────┘                   │ │
│ └─────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                    MODULE LAYER                              │ │
│ │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────┐ │ │
│ │  │ Flight  │  │  Hotel  │  │ Payment │  │   Notification  │ │ │
│ │  │ Module  │  │ Module  │  │ Module  │  │     Module      │ │ │
│ │  └─────────┘  └─────────┘  └─────────┘  └─────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                  RESILIENCE LAYER                            │ │
│ │     Circuit Breaker │ Fallback │ Retry │ Idempotency        │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                       INFRASTRUCTURE                             │
│    PostgreSQL (pgvector)  │  Redis  │  Zipkin  │  Open-Meteo   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

### Backend

| Technology            | Purpose                              |
| --------------------- | ------------------------------------ |
| Spring Boot 3.4       | Application framework                |
| Spring AI             | AI/LLM integration (Google Gemini)   |
| Spring Modulith       | Modular monolith architecture        |
| Resilience4j          | Circuit breaker, retry, fallback     |
| Spring Data JPA       | Data persistence                     |
| PostgreSQL + pgvector | Database with vector support for RAG |
| Redis                 | Caching & session management         |
| Zipkin                | Distributed tracing                  |

### Frontend

| Technology    | Purpose      |
| ------------- | ------------ |
| React 18      | UI framework |
| TypeScript    | Type safety  |
| Framer Motion | Animations   |
| Lucide React  | Icons        |
| Vite          | Build tool   |

### Infrastructure

| Technology     | Purpose                           |
| -------------- | --------------------------------- |
| Docker Compose | Container orchestration           |
| Open-Meteo API | Live weather data (free, no auth) |

---

## 🚀 Getting Started

### Prerequisites

- Java 21+
- Node.js 18+
- Docker & Docker Compose
- Google AI API Key (for Gemini)

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/NishanChatterjee/WanderLust-AI.git
cd WanderLust-AI

# 2. Set up environment
export GOOGLE_AI_API_KEY=your_api_key_here

# 3. Start infrastructure
docker compose up -d

# 4. Start frontend (in another terminal)
cd frontend
npm install
npm run dev

# 5. Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:8080
```

---

## 📡 API Reference

### AI Assistant

```http
POST /api/assistant/chat
Content-Type: text/plain

Find me the best trips to Bali for 2 travelers
```

### Weather (Live - Open-Meteo)

```http
GET /api/weather/{city}
```

Response:

```json
{
  "city": "Bali",
  "temperature": 28,
  "humidity": 75,
  "condition": "Partly Cloudy",
  "source": "Open-Meteo"
}
```

### Flights

```http
GET /api/flights/search?origin=DEL&destination=Bali&passengers=2
```

Response:

```json
[
  {
    "flightId": "uuid",
    "airline": { "name": "Emirates", "code": "EK" },
    "price": 850,
    "duration": "8h 30m"
  }
]
```

### Hotels

```http
GET /api/hotels/search?destination=Bali&rooms=1&guests=2
```

Response:

```json
[
  {
    "hotelId": "uuid",
    "name": "The Ritz-Carlton Bali",
    "stars": 5,
    "pricePerNight": 450,
    "image": "https://..."
  }
]
```

### Booking (with Saga)

```http
POST /api/order/book
Content-Type: application/json
Idempotency-Key: {unique-key}
```

Request body:

```json
{
  "flightId": "uuid",
  "hotelId": "uuid",
  "userId": "user-123",
  "amount": 2500
}
```

---

## 🧪 Testing Resilience

### Circuit Breaker Demo

```bash
# Trigger circuit breaker (weather service)
curl http://localhost:8080/api/weather/ErrorCity
```

Response shows fallback data:

```json
{
  "circuitBreakerActive": true,
  "source": "Fallback (Service Unavailable)"
}
```

### Saga Compensation Demo

The booking flow demonstrates automatic rollback:

1. ✅ Flight reserved
2. ✅ Hotel reserved
3. ❌ Payment fails
4. 🔄 Hotel reservation cancelled (compensation)
5. 🔄 Flight reservation cancelled (compensation)

---

## 📁 Project Structure

```
WanderLust-AI/
├── src/main/java/com/wanderlust/
│   ├── ai/                    # Spring AI integration
│   │   ├── AssistantController.java
│   │   └── RagDataLoader.java
│   ├── flight/                # Flight module
│   │   ├── FlightController.java
│   │   └── FlightGateway.java
│   ├── hotel/                 # Hotel module
│   │   ├── HotelController.java
│   │   └── HotelGateway.java
│   ├── order/                 # Order orchestration
│   │   ├── OrderController.java
│   │   ├── OrderSaga.java
│   │   └── BookingConfirmedEvent.java
│   ├── payment/               # Payment module
│   │   ├── PaymentGateway.java
│   │   └── PaymentGatewayImpl.java
│   ├── weather/               # Weather with Circuit Breaker
│   │   ├── WeatherController.java
│   │   └── WeatherService.java
│   └── notification/          # Event listeners
│       └── NotificationListener.java
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookingCard.tsx
│   │   │   ├── WeatherWidget.tsx
│   │   │   └── NotificationToast.tsx
│   │   └── pages/
│   │       └── MyTripsPage.tsx
│   └── package.json
├── docker-compose.yaml
└── pom.xml
```

---

## 🎓 Key Concepts Demonstrated

1. **Distributed Systems**
   - Saga pattern for distributed transactions
   - Event-driven architecture
   - Eventual consistency

2. **Resilience Engineering**
   - Circuit breaker pattern
   - Fallback strategies
   - Idempotency for exactly-once semantics

3. **Modern Java/Spring**
   - Spring Boot 3.4 features
   - Spring AI integration
   - Spring Modulith for modular monoliths

4. **Full-Stack Development**
   - React with TypeScript
   - Modern CSS with animations
   - API integration patterns

5. **DevOps**
   - Docker containerization
   - Multi-service orchestration
   - Distributed tracing with Zipkin

---

## 📄 License

MIT License - feel free to use this project for learning!

---

**Built with ❤️ using Spring AI + React**
