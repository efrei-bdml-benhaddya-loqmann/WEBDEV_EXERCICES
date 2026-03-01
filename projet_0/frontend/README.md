# Sentiment Analyzer - Frontend ✨

Welcome to the frontend of the **Sentiment Analyzer**, a modern, responsive web application designed to analyze the emotional tone of your text with a sleek, chat-like interface.

Built with **React**, **TypeScript**, and **Tailwind CSS 4**, this interface follows OpenAI's design principles to provide a premium user experience.

---

## ✨ Features

- **Real-time Analysis**: Submit text and receive instant sentiment feedback (Positive, Negative, or Neutral).
- **Spotless Interface**: A clean, breathing design that focuses on content and clarity.
- **Analysis History**: A responsive sidebar to keep track of your past analyses and revisit them instantly.
- **Visual Feedback**: Color-coded badges and confidence scores for quick interpretation.
- **Smart Loading States**: Smooth transitions and indicators while processing results.
- **Mobile First**: Fully responsive design that works beautifully on all devices.

---

## 🛠️ Tech Stack

<div align="left">

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_SDK-412991?style=for-the-badge&logo=openai&logoColor=white)

</div>

- **State Management**: React Hooks (useState, useEffect, etc.)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18+) and a package manager (**npm**, **pnpm**, or **bun**) installed.

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   # or
   bun install
   ```

### Development

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

> Make sure the **Express Backend** is running (usually on port 3000) for the application to function correctly.

### Build

To create a production-ready bundle:
```bash
npm run build
```

---

## 📂 Project Structure

```text
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── services/        # API communication logic (Express integration)
│   ├── types/           # TypeScript interfaces and types
│   ├── App.tsx          # Main layout and state coordination
│   ├── index.css        # Global styles (Tailwind 4)
│   └── main.tsx         # React entry point
├── public/              # Static assets (favicons, etc.)
└── index.html           # HTML template
```

---

## 🎨 Design & UI

The application strictly follows the **OpenAI Design System**:
- **Typography**: Uses clean, modern sans-serif fonts.
- **Colors**: Leverages the `@openai/apps-sdk-ui` palette with dynamic badges with the `soft` variant:
  - <kbd>success</kbd> for **Positive**
  - <kbd>danger</kbd> for **Negative**
  - <kbd>secondary</kbd> for **Neutral**
- **Layout**: A persistent, collapsible sidebar for history and a centered chat area for analysis.

---

## 🤝 Backend Integration

This frontend communicates with an Express.js backend via the following endpoints:
- `POST /analyze`: Submit text for analysis.
- `GET /history`: Fetch previous analyses.
- `DELETE /history/:id`: Remove a specific entry.
- `DELETE /history`: Clear all history.

---

*Part of the Efrei WebDev Project Series.*
