import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from huggingface_hub import InferenceClient
from transformers import pipeline

load_dotenv()

app = Flask(__name__)
CORS(app)

# ---------- HuggingFace Inference API Configuration ----------
HF_TOKEN = os.environ.get("HF_TOKEN")
MODEL = "tabularisai/multilingual-sentiment-analysis"

client = None
local_pipeline = None
inference_mode = "local" # 'local' or 'huggingface'


def get_client() -> InferenceClient:
    """Lazy-init the HuggingFace InferenceClient."""
    global client
    if client is None:
        if not HF_TOKEN:
            raise RuntimeError("HF_TOKEN is not set. Add it to your .env file.")
        client = InferenceClient(provider="hf-inference", api_key=HF_TOKEN)
    return client


def get_local_pipeline():
    """Lazy-init the local transformers pipeline."""
    global local_pipeline
    if local_pipeline is None:
        local_pipeline = pipeline("text-classification", model=MODEL, token=HF_TOKEN)
    return local_pipeline


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
    """Analyse the sentiment of *text* using either the local model or HuggingFace Inference API."""
    global inference_mode
    
    print(f"Running inference using: {inference_mode} mode")
    
    if inference_mode == "local":
        try:
            results = get_local_pipeline()(text)
            if isinstance(results, list) and len(results) > 0:
                top = results[0]
                raw_label = top.get('label', '')
                score = round(top.get('score', 0.5), 4)
            else:
                return {"sentiment": "neutral", "score": 0.5}
        except Exception as e:
            raise RuntimeError(f"Local inference failed: {e}")
    else:
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


@app.route('/health', methods=['GET'])
def health_check():
    hf_available = False
    try:
        c = get_client()
        if c is not None:
            # Make a lightweight call to verify the token is valid
            c.text_classification("test", model=MODEL)
            hf_available = True
    except Exception as e:
        print(f"HF check failed: {e}")
        hf_available = False

    local_available = False
    try:
        p = get_local_pipeline()
        if p is not None:
            local_available = True
    except Exception as e:
        print(f"Local check failed: {e}")
        local_available = False

    if hf_available and local_available:
        return jsonify({
            "status": "healthy",
            "version": "1.0.0",
            "message": "Both local and HuggingFace models are accessible."
        }), 200
    elif local_available and not hf_available:
        return jsonify({
            "status": "warning",
            "version": "1.0.0",
            "message": "Model not accessible via the HuggingFace endpoint, but local inference is available."
        }), 200
    elif hf_available and not local_available:
        return jsonify({
            "status": "warning",
            "version": "1.0.0",
            "message": "Local model not available, but HuggingFace inference is accessible."
        }), 200
    else:
        return jsonify({
            "status": "warning",
            "version": "1.0.0",
            "message": "No model is accessible (neither local nor HuggingFace). Maybe check your Huggingface Token."
        }), 200

@app.route("/config/inference", methods=["GET", "POST"])
def config_inference():
    global inference_mode
    if request.method == "POST":
        data = request.get_json(silent=True)
        mode = data.get("mode") if data else None
        if mode in ["local", "huggingface"]:
            inference_mode = mode
            return jsonify({"status": "success", "mode": inference_mode}), 200
        return jsonify({"error": "Invalid mode"}), 400
    return jsonify({"mode": inference_mode}), 200


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
