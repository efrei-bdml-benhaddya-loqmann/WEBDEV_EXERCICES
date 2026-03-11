# Requirements: Sentiment Analyzer

The Sentiment Analyzer is a web application that allows users to input text and receive an automated sentiment analysis (positive, negative, or neutral). The application communicates with an external service to predict the sentiment and displays the result with a confidence score. It maintains a persistent history of previous analyses using Supabase and provides real-time status monitoring of all services.

## User Stories & Acceptance Criteria

### 1. Authentication & Security
**As a user, I want to securely log in to the application, so that my personal analysis history is protected and isolated.**
1. **WHEN** the user visits the app, **THEN** the system SHALL provide an authentication interface (Login/Sign-up).
2. **WHEN** the user is authenticated, **THEN** the system SHALL allow access to the analyzer and history.
3. **WHEN** the user performs an analysis, **THEN** the system SHALL associate the result with their unique user ID using Supabase RLS.

### 2. Text Input & Analysis
**As a user, I want to enter text and trigger an analysis, so that I can see the predicted sentiment.**
1. **WHEN** the user types in the input area, **THEN** the system SHALL allow free editing of the text.
2. **WHEN** the user clicks the "Analyze" button, **THEN** the system SHALL send the text to the backend.
3. **WHILE** the analysis is in progress, **THEN** the system SHALL display a visual loading indicator for at least a minimum duration to ensure smooth transitions.

### 3. Result Display & Actions
**As a user, I want to see the result clearly and interact with it.**
1. **WHEN** the analysis is complete, **THEN** the system SHALL display the detected sentiment, confidence score, and a color-coded badge.
2. **WHEN** a result is displayed, **THEN** the system SHALL provide actions to:
   - **Copy**: Copy the text to the clipboard.
   - **Edit**: Re-populate the input area with the text.
   - **Feedback**: Rate the analysis with a Thumbs Up/Down (persisted to Supabase).
   - **Delete**: Remove the specific entry from history.

### 4. Persistent Analysis History
**As a user, I want my analyses to be saved permanently, so that I can access them across sessions.**
1. **WHEN** an analysis is completed, **THEN** the system SHALL save it to the Supabase database.
2. **WHEN** the user opens the history sidebar, **THEN** the system SHALL fetch and display their personalized history sorted by timestamp.
3. **WHEN** the user selects an entry from history, **THEN** the system SHALL load that specific result into the main view.

### 5. Service Status Monitoring
**As a user, I want to know the health of the system components, so that I can understand if some features are unavailable.**
1. **WHEN** the app is running, **THEN** the system SHALL periodically check the status of the Express API, Flask Model API (via the Express proxy), and Supabase.
2. **WHEN** checking status, **THEN** the system SHALL display real-time indicators (Online/Offline) in the UI.

### 6. Settings & Memory
**As a user, I want to configure the app, manage my data, and access Developer APIs.**
1. **WHEN** the user opens the settings modal, **THEN** they SHALL be able to toggle themes (Dark/Light).
2. **WHEN** requested, **THEN** the system SHALL provide an option to clear the entire history for the current user.
3. **WHEN** opening the Integrations tab, **THEN** the system SHALL provide API documentation and REST API usage examples.
4. **WHEN** the user needs API access, **THEN** the system SHALL allow generation, masking, and copying of session tokens.
5. **WHEN** configuring the analyzer, **THEN** the user or system SHALL be able to select between local inference and HuggingFace API inference modes.

## Technical Requirements (FDD & State)
- **Architecture**: MUST follow Feature-Driven Development (FDD) structure for the frontend.
- **State Management**: MUST use Zustand for global application state and theme management.
- **Persistence**: MUST use Supabase for authentication and database storage.
- **UI Framework**: MUST use `@openai/apps-sdk-ui` for a premium, OpenAI-native look and feel.

## Success Criteria
- Secure authentication and per-user data isolation via Supabase.
- Seamless state transitions and real-time history updates via Zustand.
- Accurate sentiment analysis with persistent user feedback loop.
- Responsive design with a functional history sidebar and settings portal.

