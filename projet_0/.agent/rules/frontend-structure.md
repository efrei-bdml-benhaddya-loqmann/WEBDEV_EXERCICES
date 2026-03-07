---
description: Frontend Architecture and Feature-Driven Design (FDD) guidelines
---
# Frontend Structure and Rules

This project uses a **Feature-Driven Design (FDD)** architecture for the frontend to maintain a clean, scalable, and modular codebase. 

When working on the frontend (`/frontend/src/`), always adhere to the following directory structure and principles:

## Directory Structure

*   **`src/components/layout/`**: Contains structual layout components that orchestrate the page shell (e.g., `Sidebar.tsx`, `SidebarMenu.tsx`, `MainContent.tsx`).
*   **`src/components/ui/`**: Contains generic, reusable, atomic UI components (e.g., `Item.tsx`, `ThemeToggle.tsx`). **Do not put business logic here.**
*   **`src/features/`**: The core of the FDD structure. Domain-specific logic is encapsulated into separate feature folders (e.g., `analysis/`, `auth/`, `settings/`).
    *   Each feature should be self-contained and can have its own sub-folders:
        *   `components/`: UI components specific to this feature.
        *   `hooks/`: Custom React hooks for the feature's logic.
        *   `types/`: TypeScript definitions for the feature.
        *   `actions/` (optional): Action handlers or sub-components.
*   **`src/contexts/`**: Global React Context providers (e.g., `AuthContext.ts`, `AuthProvider.tsx`). Note: separate pure types/hooks from the provider component if necessary to satisfy React Fast Refresh.
*   **`src/services/`**: Integration with external services, API clients, and configurations (e.g., `api.ts`, `supabase.ts`).
*   **`src/assets/`**: Static files and global stylesheets (e.g., `index.css`).
*   **`src/types/`**: Shared, global TypeScript definitions that are used across multiple different features.

## Rules & Best Practices

1.  **Encapsulate by Feature**: If a component, hook, or type is only used by one specific domain (e.g., only in the settings panel), it belongs inside `src/features/settings/`, not in the global folders. 
2.  **Linting & Fast Refresh**: 
    *   The project uses strict ESLint rules. 
    *   React Fast Refresh requires that files exporting React components do not also export generic functions or constants. Separate logic into different files if needed.
3.  **UI SDK**: The project utilizes the OpenAI UI SDK `@openai/apps-sdk-ui`. Prefer using these built-in components (Buttons, Inputs, Icons) over building scratch ones or pulling in other libraries unless absolutely necessary.
4.  **Type Safety**: Avoid using `any`. Use `unknown` for caught errors in try/catch blocks and type-guard them (e.g., `err instanceof Error`).
5.  **State Management**: Use React hooks efficiently. Avoid accessing `ref.current` during the render phase (this violates strict React rules and fails linting). Use `useEffect` or event handlers for mutations and ref access.
