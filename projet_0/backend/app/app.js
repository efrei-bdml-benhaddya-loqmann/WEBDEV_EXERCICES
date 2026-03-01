require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto'); // source https://dev.to/simplr_sh/ditch-the-import-why-cryptorandomuuid-is-your-new-best-friend-for-uuids-2lp3

const app = express();
const PORT = process.env.PORT || 3000;
const FLASK_API_URL = process.env.FLASK_API_URL || 'http://localhost:5000';

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(cors());
app.use(express.json());

// ---------------------------------------------------------------------------
// In-memory history storage
// ---------------------------------------------------------------------------
/** @type {Array<{id: string, text: string, sentiment: string, score: number, timestamp: number}>} */
const history = [];

// ---------------------------------------------------------------------------
// Helper – call the Flask Model API (POST /predict)
// Falls back to a simple mock when the Flask service is unreachable so that
// the Express layer can be developed & tested independently of the model.
// ---------------------------------------------------------------------------
async function predictSentiment(text) {
    try {
        const response = await fetch(`${FLASK_API_URL}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error(`Flask API responded with status ${response.status}`);
        }

        const data = await response.json();
        return { sentiment: data.sentiment, score: data.score };
    } catch (err) {
        // If the Flask service is not running, fall back to a naive mock.
        console.warn(
            `[warn] Flask API unreachable (${err.message}). Using mock prediction.`
        );
        // return mockPredict(text);
        return err.message;
    }
}

/**
 * Naive keyword-based mock so the Express backend can be tested without Flask.
 */
function mockPredict(text) {
    const lower = text.toLowerCase();

    const positiveWords = ['good', 'great', 'love', 'excellent', 'happy', 'wonderful', 'amazing', 'fantastic', 'awesome', 'best'];
    const negativeWords = ['bad', 'terrible', 'hate', 'awful', 'sad', 'horrible', 'worst', 'ugly', 'angry', 'disgusting'];

    let positiveCount = 0;
    let negativeCount = 0;

    for (const w of positiveWords) {
        if (lower.includes(w)) positiveCount++;
    }
    for (const w of negativeWords) {
        if (lower.includes(w)) negativeCount++;
    }

    const total = positiveCount + negativeCount;

    if (total === 0) {
        return { sentiment: 'neutral', score: 0.5 };
    }

    if (positiveCount > negativeCount) {
        return { sentiment: 'positive', score: +(positiveCount / total).toFixed(2) };
    }
    if (negativeCount > positiveCount) {
        return { sentiment: 'negative', score: +(negativeCount / total).toFixed(2) };
    }

    return { sentiment: 'neutral', score: 0.5 };
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// Health-check
app.get('/', (_req, res) => {
    res.json({ status: 'ok', message: 'Sentiment Analyzer API running' });
});

// POST /analyze – Analyse text, save result to history, return it.
// Ref: Requirements 2.1, 4.1 ; Design (Backend API)
app.post('/analyze', async (req, res) => {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({ error: 'Text is required and must be a non-empty string.' });
    }

    try {
        const { sentiment, score } = await predictSentiment(text.trim());

        const result = {
            id: crypto.randomUUID(),
            text: text.trim(),
            sentiment,
            score,
            timestamp: Date.now(),
        };

        // Prepend so newest entries are first
        history.unshift(result);

        // Log result
        // console.log('[info] Analysis result:', result);
        // console.log('[info] History:', history);

        return res.status(201).json(result);
    } catch (err) {
        console.error('[error] /analyze failed:', err);
        return res.status(502).json({ error: 'Analysis service unavailable. Please try again later.' });
    }
});

// GET /history – Return all stored results.
// Ref: Requirements 4.2 ; Design (Backend API)
app.get('/history', (_req, res) => {
    res.json(history);
});

// DELETE /history/:id – Remove a specific result.
// Ref: Requirements 6.1 ; Design (Backend API)
app.delete('/history/:id', (req, res) => {
    const { id } = req.params;
    const index = history.findIndex((entry) => entry.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'History entry not found.' });
    }

    history.splice(index, 1);
    return res.status(204).send();
});

// DELETE /history – Clear all results.
// Ref: Requirements 6.2 ; Design (Backend API)
app.delete('/history', (_req, res) => {
    history.length = 0;
    return res.status(204).send();
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Sentiment Analyzer API running on http://localhost:${PORT}`);
});
