// READY FOR REVIEW - Stripe Checkout integration pending Julius approval
//
// Vercel Serverless Function: POST /api/create-checkout-session
// Creates a Stripe Checkout Session from cart items and redirects to Stripe-hosted checkout.
//
// Required Vercel environment variables:
//   STRIPE_SECRET_KEY  - Stripe live (or test) secret key
//
// Request body: { items: [{ name, slug, price, qty, pillar }] }
// Response:     { url: "https://checkout.stripe.com/..." }

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Map of allowed products with their canonical prices (cents) to prevent price tampering
const PRODUCT_CATALOG = {
  'bpc-157':     { name: 'BPC-157',      price: 8900,  size: '5mg',  pillar: 'Recovery' },
  'ipamorelin':  { name: 'Ipamorelin',   price: 11200, size: '2mg',  pillar: 'Performance' },
  'semax':       { name: 'Semax',         price: 9700,  size: '30mg', pillar: 'Cognitive' },
  'retatrutide': { name: 'Retatrutide',   price: 18900, size: '2mg',  pillar: 'Metabolic' },
  'ghk-cu':      { name: 'GHK-Cu',        price: 7600,  size: '50mg', pillar: 'Longevity' },
  // Extended catalog (suggestions)
  'tb-500':      { name: 'TB-500',        price: 13400, size: '5mg',  pillar: 'Recovery' },
  'cjc-1295':    { name: 'CJC-1295',      price: 10800, size: '2mg',  pillar: 'Performance' },
};

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

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    if (items.length > 20) {
      return res.status(400).json({ error: 'Too many items' });
    }

    // Build Stripe line_items from cart, using server-side canonical prices
    const line_items = [];
    for (const item of items) {
      const slug = (item.slug || '').toLowerCase().trim();
      const catalogEntry = PRODUCT_CATALOG[slug];

      if (!catalogEntry) {
        return res.status(400).json({ error: `Unknown product: ${slug}` });
      }

      const qty = Math.max(1, Math.min(10, parseInt(item.qty, 10) || 1));

      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: catalogEntry.name,
            description: `${catalogEntry.pillar} Pillar · ${catalogEntry.size} research compound`,
            metadata: {
              slug: slug,
              pillar: catalogEntry.pillar,
              size: catalogEntry.size,
            },
          },
          unit_amount: catalogEntry.price,
        },
        quantity: qty,
      });
    }

    const origin = req.headers.origin || 'https://engineeredadherence.com';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: line_items,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      metadata: {
        source: 'ea-website',
        slugs: items.map(i => i.slug).join(','),
      },
      success_url: `${origin}/us/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/us/shop.html?cancelled=true`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('[create-checkout-session]', err.message);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
};
