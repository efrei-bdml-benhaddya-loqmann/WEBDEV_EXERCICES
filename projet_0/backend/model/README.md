### Model API

This directory contains the Flask API for sentiment analysis, powered by the **HuggingFace Inference API**.

#### Setup

1. Copy `.env.example` to `.env` and add your HuggingFace API key:
   ```
   HF_API_KEY=hf_your_token_here
   ```
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Run the server:
   ```
   python app.py
   ```

#### Endpoints

- `POST /predict`: Receives text and returns sentiment and score.
  - **Request Body**: `{ "text": string }`
  - **Response**: `{ "sentiment": "positive" | "negative" | "neutral", "score": number }`