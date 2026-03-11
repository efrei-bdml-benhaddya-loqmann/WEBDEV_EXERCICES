require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;
const FLASK_API_URL = process.env.FLASK_API_URL || 'http://localhost:5000';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(cors());
app.use(express.json());

// Helper to get Supabase client with user token for RLS 'Row Level Security'
function getSupabase(token) {
    if (!token) return null;
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    });
}

// Middleware to extract and verify the token
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    const supabase = getSupabase(token);

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error || !user) {
            throw new Error(error?.message || 'Invalid token');
        }
        req.user = user;
        req.supabase = supabase;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized: ' + err.message });
    }
};

// ---------------------------------------------------------------------------
// Helper – call the Flask Model API (POST /predict)
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
        console.warn(`[warn] Flask API unreachable (${err.message}). Using mock prediction.`);
        return mockPredict(text);
    }
}

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
    if (total === 0) return { sentiment: 'neutral', score: 0.5 };
    if (positiveCount > negativeCount) return { sentiment: 'positive', score: +(positiveCount / total).toFixed(2) };
    if (negativeCount > positiveCount) return { sentiment: 'negative', score: +(negativeCount / total).toFixed(2) };
    return { sentiment: 'neutral', score: 0.5 };
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

app.get('/', (_req, res) => {
    res.json({ status: 'ok', message: 'Sentiment Analyzer API running' });
});
// /health endpoint redirects to /
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', message: 'Sentiment Analyzer API running' });
});

// Proxy health check for the ML Analyzer (Flask API)
app.get('/health/analyzer', async (req, res) => {
    try {
        const response = await fetch(`${FLASK_API_URL}/health`);
        if (response.ok) {
            const data = await response.json();
            return res.json(data);
        } else {
            return res.status(response.status).json({ status: 'error', message: `Flask API responded with status ${response.status}` });
        }
    } catch (err) {
        return res.status(502).json({ status: 'error', message: 'Flask API unreachable' });
    }
});

// Proxy for the inference mode config
app.get('/config/inference', async (req, res) => {
    try {
        const response = await fetch(`${FLASK_API_URL}/config/inference`);
        if (response.ok) {
            const data = await response.json();
            return res.json(data);
        } else {
            return res.status(response.status).json({ error: 'Failed to fetch config from Flask API' });
        }
    } catch (err) {
        return res.status(502).json({ error: 'Flask API unreachable' });
    }
});

app.post('/config/inference', async (req, res) => {
    const { mode } = req.body;
    if (!mode || !['local', 'huggingface'].includes(mode)) {
        return res.status(400).json({ error: 'Invalid mode' });
    }
    try {
        const response = await fetch(`${FLASK_API_URL}/config/inference`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mode })
        });
        if (response.ok) {
            const data = await response.json();
            return res.json(data);
        } else {
            return res.status(response.status).json({ error: 'Failed to update config on Flask API' });
        }
    } catch (err) {
        return res.status(502).json({ error: 'Flask API unreachable' });
    }
});

// All /history and /analyze routes require authentication
app.use(['/analyze', '/history'], authMiddleware);

app.post('/analyze', async (req, res) => {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({ error: 'Text is required and must be a non-empty string.' });
    }

    try {
        const { sentiment, score } = await predictSentiment(text.trim());

        // await new Promise(resolve => setTimeout(resolve, 3000)); // to test if the front handles long responses


        const { data, error } = await req.supabase
            .from('history')
            .insert({
                text: text.trim(),
                sentiment,
                score,
                user_id: req.user.id
            })
            .select()
            .single();

        if (error) throw error;

        return res.status(201).json(data);
    } catch (err) {
        console.error('[error] /analyze failed:', err);
        return res.status(502).json({ error: 'Failed to save analysis: ' + err.message });
    }
});

app.get('/history', async (req, res) => {
    try {
        const { data, error } = await req.supabase
            .from('history')
            .select('*')
            .order('timestamp', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.patch('/history/:id', async (req, res) => {
    const { id } = req.params;
    const { feedback } = req.body;

    try {
        const { data, error } = await req.supabase
            .from('history')
            .update({ feedback })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'History entry not found.' });

        return res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/history/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await req.supabase
            .from('history')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/history', async (req, res) => {
    try {
        const { error } = await req.supabase
            .from('history')
            .delete()
            .eq('user_id', req.user.id);

        if (error) throw error;
        return res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Sentiment Analyzer API running on http://localhost:${PORT}`);
});
