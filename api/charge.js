// Vercel serverless function — completes a Yoco card charge.
// Required env var on Vercel: YOCO_SECRET_KEY=sk_live_xxx (or sk_test_xxx)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, amountInCents } = req.body || {};
  if (!token || !amountInCents) {
    return res.status(400).json({ error: 'Missing token or amount' });
  }

  const secret = process.env.YOCO_SECRET_KEY;
  if (!secret) {
    return res
      .status(500)
      .json({ error: 'Server is missing YOCO_SECRET_KEY env var' });
  }

  try {
    const yocoRes = await fetch('https://online.yoco.com/v1/charges/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Secret-Key': secret,
      },
      body: JSON.stringify({ token, amountInCents, currency: 'ZAR' }),
    });
    const data = await yocoRes.json();
    if (!yocoRes.ok) {
      return res.status(yocoRes.status).json({ error: data });
    }
    return res.status(200).json({ success: true, charge: data });
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Network error' });
  }
}
