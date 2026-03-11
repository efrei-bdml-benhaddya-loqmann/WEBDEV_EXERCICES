# Sentiment Analyzer - ML Service

Welcome to the **ML Service** of the Sentiment Analyzer. This is a lightweight **Flask** application that serves as a bridge to high-performance sentiment analysis models.

Powered by the **HuggingFace Inference API**, this service provides accurate, multilingual emotional tone detection for any given text.

---

## ✨ Features

- **Multilingual Support**: Leverages `tabularisai/multilingual-sentiment-analysis` to handle various languages.
- **High Performance**: Uses HuggingFace's Inference infrastructure for rapid processing.
- **Model Health Monitoring**: Includes a dedicated health check endpoint to verify API connectivity and model status.
- **Normalized Output**: Maps complex model labels (e.g., star ratings) to a clean `positive`, `negative`, or `neutral` contract.

---

## 🛠️ Tech Stack

<div align="left">

![Python](https://img.shields.io/badge/Python_3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)

</div>

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.9+** installed.
- A **HuggingFace API Token** (required for the Inference API).

### Installation

1. Navigate to the model directory:
   ```bash
   cd backend/model
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   # On Windows:
   .venv\Scripts\activate
   # On macOS/Linux:
   source .venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Configuration

Create a `.env` file in the `backend/model` directory:
```env
HF_TOKEN=hf_your_secret_token_here
```

### Running the Service

Start the Flask server:
```bash
python app.py
```
The service will be available at `http://localhost:5000`.

---

## 📂 API Endpoints

### `POST /predict`
Analyzes the sentiment of the provided text.

- **Request Body**:
  ```json
  {
    "text": "I absolutely love this new interface!"
  }
  ```
- **Response**:
  ```json
  {
    "sentiment": "positive",
    "score": 0.9982
  }
  ```

### `GET` & `POST /config/inference`
Configures the inference mode. Can be set to `local` (uses local transformers pipeline) or `huggingface` (uses Inference API).

- **POST Request Body**:
  ```json
  {
    "mode": "local"
  }
  ```

### `GET /health`
Returns the status of the service and the underlying model.

- **Response**:
  ```json
  {
    "status": "healthy",
    "version": "1.0.0"
  }
  ```

---

*Part of the Efrei WebDev Project*