# Requirements: Sentiment Analyzer

The Sentiment Analyzer is a web application that allows users to input text and receive an automated sentiment analysis (positive, negative, or neutral). The application communicates with an external service to predict the sentiment and displays the result with a confidence score. It also maintains a history of previous analyses.

## User Stories & Acceptance Criteria

### 1. Text Input
**As a user, I want to enter and edit text in a dedicated input area, so that I can submit it for sentiment analysis.**
1. **WHEN** the user is on the main page, **THEN** the system SHALL provide a clear text input area (e.g., a textarea).
2. **WHEN** the user types in the input area, **THEN** the system SHALL allow free editing of the text.
3. **WHEN** the input area is empty and the user attempts to submit, **THEN** the system SHALL prevent submission and display a clear error message.

### 2. Analysis Submission
**As a user, I want to trigger the analysis of my text, so that I can see the predicted sentiment.**
1. **WHEN** the user clicks the "Analyze" button, **THEN** the system SHALL send the text to the backend/external service.
2. **WHILE** the analysis is in progress, **THEN** the system SHALL display a visual loading indicator.

### 3. Result Display
**As a user, I want to see the result of the analysis clearly, so that I can understand the detected sentiment and the system's confidence.**
1. **WHEN** the analysis is complete, **THEN** the system SHALL display the detected sentiment (positive, negative, or neutral).
2. **WHEN** the analysis is complete, **THEN** the system SHALL display a numerical confidence score.
3. **WHEN** the analysis is complete, **THEN** the system SHALL provide a clear visual indication of the result (e.g., color-coding: green for positive, red for negative, grey for neutral).

### 4. Analysis History
**As a user, I want to see a list of my previous analyses, so that I can review past results without re-submitting the same text.**
1. **WHEN** an analysis is completed, **THEN** the system SHALL add the text and its result to a history list.
2. **WHEN** the user views the history, **THEN** the system SHALL display the text and its associated sentiment for each entry.
3. **WHEN** the user selects an entry from the history, **THEN** the system SHALL display the full details of that specific analysis.

### 5. Error Handling
**As a user, I want to be informed of any issues during the analysis process, so that I understand why a result was not obtained.**
1. **IF** the external service is unreachable or returns an error, **THEN** the system SHALL display a clear error message to the user.
2. **IF** the service returns no response or an invalid response, **THEN** the system SHALL handle the case gracefully and inform the user.

### 6. History Management (Optional/Bonus)
**As a user, I want to manage my analysis history, so that I can keep it organized or clear it entirely.**
1. **WHEN** the user views the history, **THEN** the system SHOULD provide an option to delete individual entries.
2. **WHEN** the user views the history, **THEN** the system SHOULD provide an option to clear the entire history.
3. **WHEN** the history grows, **THEN** the system SHOULD allow limiting the number of displayed items.

## Success Criteria
- Users can successfully submit text and receive a sentiment prediction.
- The UI provides clear feedback during loading and error states.
- Previous analyses are correctly stored and retrievable during the session.
- The interface is responsive and follows basic accessibility standards.
