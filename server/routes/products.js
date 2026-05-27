const express = require('express');
const { getDb } = require('../database');

const router = express.Router();

/**
 * GET /api/products
 * Public route — returns all products
 * Query params:
 *   ?category=Premium|Standard|Economy|Flavored  (optional filter)
 */
router.get('/', (req, res) => {
  try {
    const db = getDb();
    const { category } = req.query;

    let query = 'SELECT * FROM products';
    const params = [];

    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }

    query += ' ORDER BY price_per_kg DESC';

    const products = db.prepare(query).all(...params);

    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (err) {
    console.error('Products fetch error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products.'
    });
  }
});

/**
 * GET /api/products/:id
 * Public route — returns a single product by ID
 */
router.get('/:id', (req, res) => {
  try {
    const db = getDb();
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (err) {
    console.error('Product fetch error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product.'
    });
  }
});

module.exports = router;
