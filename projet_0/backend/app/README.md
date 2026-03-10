# Sentiment Analyzer - Gateway API

Welcome to the **Express Gateway API**. This service acts as the orchestrator of the **Sentiment Analyzer** ecosystem, connecting the frontend to the ML service and managing data persistence.

Built with **Node.js** and **Express**, this API ensures secure, reliable, and high-performance communication across all layers.

---

## ✨ Features

- **Supabase Integration**: Direct communication with Supabase for user authentication (JWT) and persistent history storage.
- **ML Proxy**: Facilitates and manages requests to the Flask-based ML service.
- **Smart Fallback**: If the ML service is unreachable, a keyword-based `mockPredict` system is automatically triggered to ensure no downtime.
- **Health Proxy**: Provides a unified health monitoring system that checks both the Express gateway and the ML analyzer.
- **Auto-History**: Each successful analysis is automatically saved to the user's history with secure Row Level Security (RLS) enforcement.

---

## 🛠️ Tech Stack

<div align="left">

![Node.js](https://img.shields.io/badge/Node.js_18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-121212?style=for-the-badge&logo=supabase&logoColor=3ECF82)
![V8](https://img.shields.io/badge/V8_Engine-4A4A4A?style=for-the-badge&logo=v8&logoColor=4B8BBE)

</div>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js (v18+)** installed.
- A **Supabase Project** (Database + Auth).
- The **ML Service** should be running (usually on port 5000).

### Installation

1. Navigate to the app directory:
   ```bash
   cd backend/app
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

### Configuration

Create a `.env` file in the `backend/app` directory:
```env
PORT=3000
FLASK_API_URL=http://localhost:5000
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### Running the Gateway

Start the development server:
```bash
npm start
# or
node app.js
```
The gateway will be available at `http://localhost:3000`.

---

## 📂 API Endpoints

### Authenticated Routes (Requires Bearer Token)
- `POST /analyze` : Submits text for analysis, saves to history, and returns the result.
- `GET /history` : Retrieves the user's full analysis history.
- `PATCH /history/:id` : Updates user feedback (like/dislike) for a specific history item.
- `DELETE /history/:id` : Removes a specific analysis from the history.
- `DELETE /history` : Clears the user's entire history.

### Public Routes
- `GET /health` : Returns the status of the Express gateway.
- `GET /health/analyzer` : Unified proxy endpoint that returns the status of the Flask ML API.

---

## 🔒 Security Best Practices

- **RLS Enforced**: History is secured via Supabase Row Level Security.
- **JWT Authentication**: All sensitive endpoints require a valid Supabase JWT.
- **Modern UUIDs**: Uses native Node `crypto.randomUUID()` for robust identifier generation.

---

*Part of the Efrei WebDev Project*