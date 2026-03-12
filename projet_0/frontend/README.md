# Sentiment Analyzer - Frontend

Welcome to the frontend of the **Sentiment Analyzer**, a modern, responsive web application designed to analyze the emotional tone of your text with a sleek, chat-like interface.

Built with **React**, **TypeScript**, and **Tailwind CSS 4**, this interface follows OpenAI's design principles to provide a premium user experience.

---

## Features

- **Real-time Analysis**: Submit text and receive instant sentiment feedback (Positive, Negative, or Neutral).
- **Spotless Interface**: A clean, breathing design that focuses on content and clarity.
- **Analysis History**: A responsive sidebar to keep track of your past analyses and revisit them instantly.
- **Visual Feedback**: Color-coded badges and confidence scores for quick interpretation.
- **Smart Loading States**: Smooth transitions and indicators while processing results.
- **Developer Integrations**: Embedded API documentation and access token generation within the Settings portal.
- **Mobile First**: Fully responsive design that works beautifully on all devices.

---

## Tech Stack

<div align="left">

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-FFFFFF?style=for-the-badge&logo=vite&logoColor=8f40ff)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-121212?style=for-the-badge&logo=supabase&logoColor=3ECF82)
![OpenAI](https://img.shields.io/badge/OpenAI_SDK-FFFFFF?style=for-the-badge&logo=openai&logoColor=1D1D1D)

</div>

- **State Management**: [Zustand](https://zustand.docs.pmnd.rs/reference/apis/create) (Global State) + React Hooks
- **Architecture**: [Feature-Driven Architecture](https://dev.to/rufatalv/feature-driven-architecture-with-nextjs-a-better-way-to-structure-your-application-1lph)
- **UI Integration**: Radix UI Primitives, Tailwind Merge, Class-Variance-Authority, Lucide-React
- **Database/Baas**: [Supabase](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=express&queryGroups=environment&environment=server-client) Client

---

## Getting Started

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

### Environment

Create or copy the `.env.local.example` file to a `.env.local` file in the root of the frontend directory and add the following variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_EXPRESS_API_URL=your_express_api_url
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

## Project Structure

```text
frontend/src/
├── 📁 assets/                 # Global styles, SVGs, and images
├── 📁 components/             # Reusable UI primitives and shared layout
│   ├── 📁 layout/             # Application shell components
│   │   ├── Sidebar.tsx
│   │   ├── MainContent.tsx
│   │   └── Navbar.tsx (if any)
│   └── 📁 ui/                 # Atomic, headless components (shadcn style)
│       ├── Button.tsx
│       ├── Dialog.tsx
│       └── Badge.tsx
│
├── 📁 features/               # Feature-Driven Design (FDD)
│   ├── 📁 analysis/           # Everything related to analysis feature
│   │   ├── 📁 components/     # Analysis-specific components
│   │   │   ├── AnalysisArea.tsx
│   │   │   ├── InputArea.tsx
│   │   │   ├── ResultState.tsx
│   │   │   ├── SentimentBadge.tsx
│   │   │   └── 📁 actions/    # Action-specific components
│   │   ├── 📁 hooks/          # Feature-specific hooks
│   │   └── 📁 types/          # Feature-specific logic & types
│   │
│   ├── 📁 auth/               # Login, Signup, Auth logic
│   │   ├── 📁 components/     # Login.tsx, AuthForm.tsx
│   │   └── 📁 hooks/          # useAuth.ts
│   │
│   └── 📁 settings/           # All settings panels
|       ├── 📁 services/       # Settings services (exportHistory <- can eventually move to global services)
│       ├── 📁 components/     # SettingsDialog.tsx, ProfileSettings.tsx, etc.
│       └── 📁 types/          # settings.types.ts
│
├── 📁 store/                  # Global Zustand stores 
│   └── useThemeStore.ts       # Central theme state
│
├── 📁 hooks/                  # Global reusable hooks
├── 📁 services/               # API clients and Supabase connection
├── 📁 types/                  # Global TypeScript definitions
├── 📁 utils/                  # Pure utility functions (formatting, clsx)
├── App.tsx                    # Main entry point (Routing, Providers)
└── main.tsx                   # DOM attachment
```

This project strictly utilizes a **Feature-Driven Architecture** (as described [here](https://dev.to/rufatalv/feature-driven-architecture-with-nextjs-a-better-way-to-structure-your-application-1lph)), placing components, hooks, utilities, and types related to specific domains closely together to maximize modularity and maintainability.

---

## Design & UI

The application strictly follows the **OpenAI Design System**:
- **Typography**: Uses clean, modern sans-serif fonts.
- **Colors**: Leverages the `@openai/apps-sdk-ui` palette with dynamic badges with the `soft` variant:
  - **Light theme**
    - <kbd style="background-color: #DAF5E4; color: #079457;">success</kbd> for **Positive**
    - <kbd style="background-color: #FEE1E0; color: #BA2623;">danger</kbd> for **Negative**
    - <kbd style="background-color: #ECECEC; color: #0D0D0D;">secondary</kbd> for **Neutral**
  - **Dark theme**
    - <kbd style="background-color: #011C0B; color: #04B84C;">success</kbd> for **Positive**
    - <kbd style="background-color: #280B0A; color: #FA413E;">danger</kbd> for **Negative**
    - <kbd style="background-color: #1F1F1F; color: #FFFFFF;">secondary</kbd> for **Neutral**
- **Layout**: A persistent, collapsible sidebar for history and a centered chat area for analysis.

---

## Backend Integration

This frontend communicates with an Express.js backend via the following endpoints:
- `POST /analyze`: Submit text for analysis.
- `GET /history`: Fetch previous analyses.
- `PATCH /history/:id`: Update feedback for a specific history item.
- `DELETE /history/:id`: Remove a specific entry.
- `DELETE /history`: Clear all history.
- `GET /health`: Get the health of the Express backend.
- `GET /health/analyzer`: Proxy endpoint getting the health of the Flask Model API.

> Note: Access to most of these endpoints requires a **Bearer token**, which can be easily generated directly within the **Integrations & APIs** tab in the application's Settings dialogue.

---

*Part of the Efrei WebDev Project*
