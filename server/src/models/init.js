const pool = require('../config/db');

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) DEFAULT 'customer',
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      description TEXT,
      price DECIMAL(10,2) NOT NULL,
      image_url VARCHAR(500),
      category VARCHAR(100),
      stock INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      stripe_session_id VARCHAR(300),
      status VARCHAR(50) DEFAULT 'pending',
      total DECIMAL(10,2) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
      product_id INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL,
      price DECIMAL(10,2) NOT NULL
    );
  `);
  console.log('Database initialized');
};

module.exports = initDB;
