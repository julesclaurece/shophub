const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { auth, adminOnly } = require('../middleware/auth');

router.post('/checkout', auth, async (req, res) => {
  const { items } = req.body;

  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: { name: item.name, images: item.image_url ? [item.image_url] : [] },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
    metadata: { user_id: req.user.id.toString() },
  });

  res.json({ url: session.url, session_id: session.id });
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return res.status(400).send('Webhook error');
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const userId = session.metadata.user_id;

    const order = await pool.query(
      'INSERT INTO orders (user_id, stripe_session_id, status, total) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, session.id, 'paid', session.amount_total / 100]
    );

    for (const item of lineItems.data) {
      await pool.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [order.rows[0].id, null, item.quantity, item.amount_total / 100]
      );
    }
  }

  res.json({ received: true });
});

router.get('/my', auth, async (req, res) => {
  const result = await pool.query(
    `SELECT o.*, json_agg(oi.*) as items FROM orders o
     LEFT JOIN order_items oi ON oi.order_id = o.id
     WHERE o.user_id = $1 GROUP BY o.id ORDER BY o.created_at DESC`,
    [req.user.id]
  );
  res.json(result.rows);
});

router.get('/all', auth, adminOnly, async (req, res) => {
  const result = await pool.query(
    `SELECT o.*, u.name as customer_name, u.email as customer_email,
     json_agg(oi.*) as items
     FROM orders o
     LEFT JOIN users u ON u.id = o.user_id
     LEFT JOIN order_items oi ON oi.order_id = o.id
     GROUP BY o.id, u.name, u.email ORDER BY o.created_at DESC`
  );
  res.json(result.rows);
});

router.patch('/:id/status', auth, adminOnly, async (req, res) => {
  const result = await pool.query(
    'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
    [req.body.status, req.params.id]
  );
  res.json(result.rows[0]);
});

module.exports = router;
