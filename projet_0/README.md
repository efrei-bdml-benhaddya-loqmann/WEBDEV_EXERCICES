# ✨ Sentiment Analyzer - Full Stack Project

Welcome to the **Sentiment Analyzer** project! This is a modern, high-performance web application designed to analyze the emotional tone of text. It demonstrates a complete full-stack architecture, featuring a real-time React interface, a secure Express gateway, and a specialized Flask ML service.

Designed for a premium, chat-like experience with absolute focus on performance and modularity.

---

## 🏗️ Architecture Overview

The project is structured into three main layers, ensuring a clear separation of concerns (SOC):

### [🎨 Frontend (React + TypeScript)](./frontend/README.md)
The face of the application. A responsive, user-centric interface built with **Vite**, **Tailwind CSS 4**, and **Zustand**. It follows **Feature-Driven Development (FDD)** patterns to keep the codebase maintainable and scalable.

### [🛣️ Backend Gateway (Express.js)](./backend/app/README.md)
The orchestration layer. Manages **Supabase Authentication**, handles project persistence (History), and acts as a secure reverse proxy for the ML service. It includes built-in fallbacks for service unavailability.

### [🧠 ML Service (Flask + Python)](./backend/model/README.md)
The intelligence layer. A dedicated Python service that integrates with the **HuggingFace Inference API** to perform high-precision sentiment analysis using state-of-the-art multilingual models.

---

## 🛠️ Unified Tech Stack

<div align="left">

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-FFFFFF?style=flat&logo=vite&logoColor=8f40ff) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat&logo=tailwind-css&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat&logo=react&logoColor=white) |
| **Gateway** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-121212?style=flat&logo=supabase&logoColor=3ECF82) |
| **Intelligence** | ![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white) ![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97-HF-FFD21E?style=flat) |

</div>

---

## 🚀 Speed Run Setup (Full Project)

To run the entire ecosystem locally, follow these steps in separate terminal instances:

### 1. Intelligence (ML Service)
```bash
cd backend/model
python -m venv .venv
source .venv/bin/activate  # Or .venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py
```

### 2. Orchestration (Gateway API)
```bash
cd backend/app
npm install
npm start
```

### 3. Interface (Frontend)
```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Project Organization

```text
projet_0/
├── 📁 frontend/       # UI (React 19, TypeScript, Tailwind 4)
├── 📁 backend/
│   ├── 📁 app/        # Express Gateway API (Auth, History, Proxy)
│   └── 📁 model/      # Flask ML Service (Inference Bridge)
├── 📁 vault/          # Project documentation and specifications
└── README.md          # Global documentation (you are here)
```

---

*Part of the Efrei WebDev Project*
Check the individual README files in each directory for deeper technical specifications.
