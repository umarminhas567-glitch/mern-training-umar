const db = require('../db');

exports.getAllProducts = async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (products.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(products[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, category, in_stock } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO products (name, price, category, in_stock) VALUES (?, ?, ?, ?)',
      [name, price, category, in_stock ?? 1]
    );
    res.status(201).json({ id: result.insertId, message: 'Product created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, price, category, in_stock } = req.body;
  try {
    await db.query(
      'UPDATE products SET name = ?, price = ?, category = ?, in_stock = ? WHERE id = ?',
      [name, price, category, in_stock, req.params.id]
    );
    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};