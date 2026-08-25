const { Redis } = require('@upstash/redis');

const redis = Redis.fromEnv();
const KEY = 'pasabuy-data';

module.exports = async (req, res) => {
  // Allow the app to be opened from any device without CORS headaches
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const value = await redis.get(KEY);
      return res.status(200).json({ value: value || null });
    }

    if (req.method === 'POST') {
      // Vercel parses JSON bodies automatically when Content-Type is application/json
      const body = req.body;
      if (!body) return res.status(400).json({ error: 'Missing body' });
      await redis.set(KEY, body);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
};
