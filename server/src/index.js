require('dotenv').config();
const express = require('express');
const cors = require('cors');
const initDB = require('./models/init');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || '*' }));

// Webhook must use raw body before express.json()
app.use('/api/orders/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

app.get('/health', (_, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;

initDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(console.error);
