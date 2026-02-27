# Tasks: Sentiment Analyzer

This document outlines the implementation plan for the Sentiment Analyzer application.

## Phase 1: Model API (Python/Flask)
Implement the core sentiment analysis service in `backend/model`.

- [ ] 1.1 Set up Flask environment and basic API structure
  - Create `backend/model/requirements.txt` with `flask`, `flask-cors`.
  - Create `backend/model/app.py` with a basic `/predict` endpoint.
  - Reference: Design (Model API)
- [ ] 1.2 Implement sentiment analysis logic
  - Add a simple rule-based or probabilistic sentiment analysis function.
  - Ensure it returns `{ "sentiment": ..., "score": ... }`.
  - Reference: Requirements 3.1, 3.2; Design (Model API)
- [ ] 1.3 Verify Flask API with manual testing
  - Run the Flask server and test with `curl` or a similar tool.

## Phase 2: Main Backend (Node.js/Express)
Implement history management and orchestration in `backend/app`.

- [ ] 2.1 Update Express server structure
  - Add middleware for CORS and JSON parsing if not already complete.
  - Implement in-memory storage for history.
  - Reference: Design (Architecture, History Management)
- [ ] 2.2 Implement `/analyze` endpoint
  - This endpoint should call the Flask API (`POST /predict`).
  - Generate a unique ID and timestamp for each result.
  - Save result to history.
  - Reference: Requirements 2.1, 4.1; Design (Backend API)
- [ ] 2.3 Implement history endpoints
  - `GET /history`: Return all stored results.
  - `DELETE /history/:id`: Remove specific result.
  - `DELETE /history`: Clear all results.
  - Reference: Requirements 4.2, 6.1, 6.2; Design (Backend API)

## Phase 3: Frontend Infrastructure & Styling
Prepare the React application with necessary libraries and global styles.

- [ ] 3.1 Install and configure dependencies
  - Install `@openai/apps-sdk-ui` and `tailwindcss` (v4).
  - Configure `vite.config.ts` and Tailwind if necessary.
  - Import SDK styles in `index.css`.
  - Reference: Design (UI & Styling)
- [ ] 3.2 Set up API communication layer
  - Create a utility/service to handle fetch calls to the Express backend.
  - Reference: Design (Architecture)

## Phase 4: Frontend Components & Integration
Build the UI using OpenAI SDK components and wire everything together.

- [ ] 4.1 Implement Main Layout and `AnalysisForm`
  - Use SDK `Layout`, `TextArea`, and `Button`.
  - Handle form submission and "Analyze" button state.
  - Reference: Requirements 1.1, 1.2, 2.2; Design (Frontend Components)
- [ ] 4.2 Implement `ResultDisplay` and `AnalysisHistory`
  - Use SDK `Card` and typography components for results.
  - Implement the history list with selectable items and delete actions.
  - Reference: Requirements 3.1, 3.2, 3.3, 4.2, 4.3; Design (Frontend Components)
- [ ] 4.3 Implement Error Handling and Loading States
  - Add visual feedback for pending requests and API errors.
  - Reference: Requirements 1.3, 2.2, 5.1, 5.2; Design (Error Handling)

## Phase 5: Verification & Cleanup
- [ ] 5.1 Perform end-to-end testing
  - Verify the full flow: Input -> Analyze -> Display Result -> See in History.
- [ ] 5.2 Final code review and cleanup
  - Ensure consistent naming and adherence to project standards.
