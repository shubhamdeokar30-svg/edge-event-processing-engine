# 🚀 Edge Event Processing Engine

A high-performance, real-time monitoring system designed to ingest sensor data from edge devices, evaluate it against business rules, and trigger instant alerts for critical conditions (e.g., high temperature).


## 📐 Architecture Overview

The system follows a **layered, event-driven architecture** to ensure scalability, reliability, and real-time responsiveness.

### 🔄 Data Flow

1. Edge devices (Angular Simulator) send sensor data via HTTP
2. Backend API ingests and processes events
3. Rule Engine evaluates conditions
4. Alerts or logs are generated
5. Dashboard reflects updates in near real-time

📎 **Architecture Diagram:**
https://docs.google.com/document/d/1evbT8a8POojIVpt68FNnDMUYdUR2TO-3RqOSBZypMlE/edit?usp=sharing

---

## 🏗️ Tech Stack

### Frontend

* Angular 18 (Standalone Components)
* TypeScript
* RxJS

### Backend

* Node.js
* Express.js

### Future Enhancements

* Redis (Caching / Fast access)
* PostgreSQL / MongoDB (Persistence)
* WebSockets / MQTT (Real-time streaming)

---

## 🛠️ Key Design Decisions & Trade-offs

### 1. ⚡ Angular Standalone Components

**Decision:** Used standalone components instead of NgModules
**Why:**

* Less boilerplate
* Faster development
* Improved readability

**Trade-off:**

* Slight learning curve for developers familiar with older Angular versions

---

### 2. 🧠 In-Memory State Management

**Decision:** Store alerts and logs in server memory

**Why:**

* Zero setup required
* Plug-and-play for reviewers

**Trade-off:**

* Data loss on server restart

**Production Alternative:**

* Redis → Fast access
* PostgreSQL → Durable storage

---

### 3. 🌐 REST-based Event Ingestion

**Decision:** Use HTTP POST for incoming events

**Why:**

* Simple and universally supported
* Easy to test using Postman

**Trade-off:**

* Not optimal for ultra-high throughput systems

**Production Alternative:**

* MQTT → Lightweight for IoT
* Kafka → High-scale streaming
* WebSockets → Real-time pipelines

---

### 4. 🔄 Reactive UI Updates (Polling)

**Decision:** Angular polling using intervals

**Why:**

* Simple to implement
* Works reliably in demo environments

**Trade-off:**

* Not truly real-time
* Slight delay in updates

**Production Alternative:**

* WebSockets for instant updates

---

## 🚀 Getting Started

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd edge-event-processing-engine
```

### 2️⃣ Start Backend

```bash
cd backend
npm install
npm start
```

### 3️⃣ Start Frontend

```bash
cd frontend
npm install
ng serve
```
# 📊 Features

* ✅ Real-time event ingestion
* ✅ Rule-based processing engine
* ✅ Alert generation system
* ✅ Event logging
* ✅ Live dashboard monitoring
* ✅ Plug-and-play setup

---
