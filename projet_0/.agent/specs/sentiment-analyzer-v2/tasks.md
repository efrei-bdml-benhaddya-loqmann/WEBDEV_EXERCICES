# Tasks: Sentiment Analyzer

This document outlines the implementation plan for the Sentiment Analyzer application.

## Phase 1: Model API (Python/Flask)
Implement the core sentiment analysis service in `backend/model` using an **external AI API** (clé API existante).

- [x] 1.1 Set up Flask environment and basic API structure
  - Create `backend/model/requirements.txt` with `flask`, `flask-cors`, `requests`, `python-dotenv`.
  - Create `backend/model/app.py` with a basic `/predict` endpoint.
  - Reference: Design (Model API)
- [x] 1.2 Configure AI API key
  - Use a `.env` file to store the AI API key (e.g., `AI_API_KEY=sk-...`).
  - Load the key via `python-dotenv` in `app.py`.
  - **Important**: The API key is already existing and provided by the user; do NOT generate or create one.
- [x] 1.3 Implement sentiment analysis logic via external AI API
  - Call an external AI API (e.g., OpenAI, HuggingFace Inference API) using the configured API key to perform sentiment analysis.
  - Send the user's text to the AI API and parse the response.
  - Ensure the endpoint returns `{ "sentiment": ..., "score": ... }`.
  - Reference: Requirements 3.1, 3.2; Design (Model API)
- [x] 1.4 Verify Flask API with manual testing
  - Run the Flask server and test with `curl` or a similar tool.

## Phase 2: Main Backend (Node.js/Express)
Implement history management and orchestration in `backend/app`.

- [x] 2.1 Update Express server structure
  - Add middleware for CORS and JSON parsing if not already complete.
  - Implement in-memory storage for history.
  - Reference: Design (Architecture, History Management)
- [x] 2.2 Implement `/analyze` endpoint
  - This endpoint should call the Flask API (`POST /predict`).
  - Generate a unique ID and timestamp for each result.
  - Save result to history.
  - Reference: Requirements 2.1, 4.1; Design (Backend API)
- [x] 2.3 Implement history endpoints
  - `GET /history`: Return all stored results.
  - `DELETE /history/:id`: Remove specific result.
  - `DELETE /history`: Clear all results.
  - Reference: Requirements 4.2, 6.1, 6.2; Design (Backend API)

## Phase 3: Frontend Infrastructure & Styling
Prepare the React application with necessary libraries and global styles.

- [x] 3.1 Install and configure dependencies
  - Install `@openai/apps-sdk-ui` and `tailwindcss` (v4).
  - Configure `vite.config.ts` and Tailwind if necessary.
  - Import SDK styles in `index.css`.
  - Reference: Design (UI & Styling)
- [x] 3.2 Set up API communication layer
  - Create a utility/service to handle fetch calls to the Express backend.
  - Reference: Design (Architecture)

## Phase 4: Frontend Components & Integration
Build the UI using OpenAI SDK components and wire everything together.

- [x] 4.1 Implement Main Layout and `AnalysisForm`
  - Use SDK `Layout`, `TextArea`, and `Button`.
  - Handle form submission and "Analyze" button state.
  - Reference: Requirements 1.1, 1.2, 2.2; Design (Frontend Components)
- [x] 4.2 Implement `ResultDisplay` and `AnalysisHistory`
  - Use SDK `Badge` and typography components for results.
  - Implement the history list with selectable items and delete actions.
  - Reference: Requirements 3.1, 3.2, 3.3, 4.2, 4.3; Design (Frontend Components)
- [x] 4.3 Implement Error Handling and Loading States
  - Add visual feedback for pending requests and API errors.
  - Reference: Requirements 1.3, 2.2, 5.1, 5.2; Design (Error Handling)

## Phase 5: Verification & Cleanup
- [x] 5.1 Perform end-to-end testing
  - Verify the full flow: Input -> Analyze -> Display Result -> See in History.
- [ ] 5.2 Final code review and cleanup
  - Ensure consistent naming and adherence to project standards.

## Phese X: Additional features

- [x] X.1 Add dark mode support
  - Use Tailwind's dark mode utilities.
  - Reference: Design (UI & Styling)
- [x] X.2 Add responsive design
  - Ensure the layout works on all devices.
  - Reference: Design (UI & Styling)
- [x] X.3 Add accessibility features
  - Ensure the layout works on all devices.
  - Reference: Design (UI & Styling)
- [ ] X.4 Add multi account handling
- [x] X.5 Add item actions
  - Add an action row with copy and edit buttons under the result display with ghost variant (base built in ResultActions)
  - [x] X.5.1 Add item copy
  - [x] X.5.2 Add item edit
  - [x] X.5.3 Add item scoring (two buttons with thumbs up and thumbs down icons)
    - [x] Scoring must be persistent
  - [x] X.5.4 Add item regenerate
- [ ] X.6 Add Settings modal
  - Use Portals
  - Parametres generaux (theme, accent color etc...)
  - Memory (clear history)
  - Add Settings button to the 
- [ ] Add OPENAI SDK Transitions
  - View what you can add, such as the transition when the user text disapears and the result appears
