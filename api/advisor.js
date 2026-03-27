// READY FOR REVIEW - Stripe Checkout integration pending Julius approval
//
// Vercel Serverless Function: POST /api/advisor
// Proxies AI protocol advisor requests to Anthropic's Claude API.
// Keeps the API key server-side — never exposed to the browser.
//
// Required Vercel environment variables:
//   ANTHROPIC_API_KEY  - Anthropic API key for Claude
//
// Request body: { prompt: "..." }
// Response:     { text: "..." } or { error: "..." }

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://engineeredadherence.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('[advisor] ANTHROPIC_API_KEY not configured');
    return res.status(500).json({ error: 'Advisor service unavailable' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.length > 5000) {
      return res.status(400).json({ error: 'Invalid prompt' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[advisor] Anthropic API error:', response.status, errText);
      return res.status(502).json({ error: 'Advisor AI returned an error' });
    }

    const data = await response.json();
    const text = data.content && data.content[0] && data.content[0].text;

    if (!text) {
      return res.status(502).json({ error: 'Empty response from advisor AI' });
    }

    return res.status(200).json({ text: text });
  } catch (err) {
    console.error('[advisor] Error:', err.message);
    return res.status(500).json({ error: 'Advisor service error' });
  }
};
