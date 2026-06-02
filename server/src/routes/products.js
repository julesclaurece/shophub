const router = require('express').Router();
const pool = require('../config/db');
const { auth, adminOnly } = require('../middleware/auth');

router.get('/', async (req, res) => {
  const { category, search, page = 1, limit = 12 } = req.query;
  const offset = (page - 1) * limit;
  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  if (category) {
    params.push(category);
    query += ` AND category = $${params.length}`;
  }
  if (search) {
    params.push(`%${search}%`);
    query += ` AND (name ILIKE $${params.length} OR description ILIKE $${params.length})`;
  }

  params.push(limit, offset);
  query += ` ORDER BY created_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`;

  const result = await pool.query(query, params);
  res.json(result.rows);
});

router.get('/:id', async (req, res) => {
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
  if (!result.rows[0]) return res.status(404).json({ error: 'Product not found' });
  res.json(result.rows[0]);
});

router.post('/', auth, adminOnly, async (req, res) => {
  const { name, description, price, image_url, category, stock } = req.body;
  const result = await pool.query(
    'INSERT INTO products (name, description, price, image_url, category, stock) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    [name, description, price, image_url, category, stock]
  );
  res.status(201).json(result.rows[0]);
});

router.put('/:id', auth, adminOnly, async (req, res) => {
  const { name, description, price, image_url, category, stock } = req.body;
  const result = await pool.query(
    'UPDATE products SET name=$1, description=$2, price=$3, image_url=$4, category=$5, stock=$6 WHERE id=$7 RETURNING *',
    [name, description, price, image_url, category, stock, req.params.id]
  );
  if (!result.rows[0]) return res.status(404).json({ error: 'Product not found' });
  res.json(result.rows[0]);
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  await pool.query('DELETE FROM products WHERE id = $1', [req.params.id]);
  res.json({ message: 'Deleted' });
});

module.exports = router;
