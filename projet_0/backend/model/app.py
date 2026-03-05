from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ---------- Sentiment analysis logic ----------

POSITIVE_WORDS = [
    "love", "great", "amazing", "wonderful", "fantastic", "excellent",
    "good", "happy", "joy", "beautiful", "awesome", "best", "brilliant",
    "enjoy", "nice", "perfect", "pleased", "superb", "terrific", "thanks",
    "thank", "liked", "like", "recommend", "impressive", "outstanding",
    "satisfied", "delight", "cheerful", "exciting", "adore", "magnificent",
    "incredible", "remarkable", "fabulous", "positive", "cool",
]

NEGATIVE_WORDS = [
    "hate", "terrible", "awful", "bad", "horrible", "worst", "poor",
    "ugly", "boring", "disappointing", "sad", "angry", "annoying",
    "dreadful", "disgusting", "miserable", "unpleasant", "wrong",
    "fail", "failure", "useless", "waste", "broken", "rubbish",
    "pathetic", "nasty", "painful", "frustrating", "mediocre",
    "inferior", "lousy", "negative", "dislike", "regret",
]


def analyze_sentiment(text: str) -> dict:
    """Rule-based sentiment analysis using keyword matching."""
    words = text.lower().split()

    pos_count = sum(1 for w in words if w.strip(".,!?;:'\"()") in POSITIVE_WORDS)
    neg_count = sum(1 for w in words if w.strip(".,!?;:'\"()") in NEGATIVE_WORDS)

    total = pos_count + neg_count

    if total == 0:
        return {"sentiment": "neutral", "score": 0.5}

    pos_ratio = pos_count / total

    if pos_ratio > 0.5:
        sentiment = "positive"
        score = round(0.5 + (pos_ratio - 0.5), 2)
    elif pos_ratio < 0.5:
        sentiment = "negative"
        score = round(0.5 + (0.5 - pos_ratio), 2)
    else:
        sentiment = "neutral"
        score = 0.5

    return {"sentiment": sentiment, "score": score}


# ---------- Routes ----------

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(silent=True)

    if not data or not data.get("text", "").strip():
        return jsonify({"error": "Le champ 'text' est requis et ne peut pas être vide."}), 400

    result = analyze_sentiment(data["text"])
    return jsonify(result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
