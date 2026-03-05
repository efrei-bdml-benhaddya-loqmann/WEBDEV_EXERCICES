import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv()

app = Flask(__name__)
CORS(app)

# ---------- HuggingFace Inference API Configuration ----------
HF_TOKEN = os.environ.get("HF_TOKEN")
MODEL = "tabularisai/multilingual-sentiment-analysis"

client = None


def get_client() -> InferenceClient:
    """Lazy-init the HuggingFace InferenceClient."""
    global client
    if client is None:
        if not HF_TOKEN:
            raise RuntimeError("HF_TOKEN is not set. Add it to your .env file.")
        client = InferenceClient(provider="hf-inference", api_key=HF_TOKEN)
    return client


# Label mapping: the model returns labels like "1 star" .. "5 stars"
# We map them to positive / negative / neutral
LABEL_MAP = {
    "1 star": "negative",
    "2 stars": "negative",
    "3 stars": "neutral",
    "4 stars": "positive",
    "5 stars": "positive",
    # Fallback for other possible label formats
    "POSITIVE": "positive",
    "NEGATIVE": "negative",
    "NEUTRAL": "neutral",
    "positive": "positive",
    "negative": "negative",
    "neutral": "neutral",
    "Very Positive": "positive",
    "Positive": "positive",
    "Neutral": "neutral",
    "Negative": "negative",
    "Very Negative": "negative"
}


def analyze_sentiment(text: str) -> dict:
    """Analyse the sentiment of *text* using the HuggingFace Inference API."""
    results = get_client().text_classification(text, model=MODEL)

    # results is a list of ClassificationOutput objects
    # Pick the top prediction (highest score)
    if isinstance(results, list) and len(results) > 0:
        top = max(results, key=lambda r: r.score)
        raw_label = top.label
        score = round(top.score, 4)
    else:
        return {"sentiment": "neutral", "score": 0.5}

    # Map the raw label to our API contract
    sentiment = LABEL_MAP.get(raw_label, "neutral")

    return {"sentiment": sentiment, "score": score}


# ---------- Routes ----------

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(silent=True)

    if not data or not data.get("text", "").strip():
        return jsonify({"error": "Le champ 'text' est requis et ne peut pas être vide."}), 400

    try:
        result = analyze_sentiment(data["text"])
        return jsonify(result)
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Erreur lors de l'appel à l'API HuggingFace : {e}"}), 502


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
