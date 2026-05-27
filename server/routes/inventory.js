const express = require('express');
const { getDb } = require('../database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All inventory routes require authentication
router.use(authMiddleware);

/**
 * GET /api/inventory
 * Returns inventory with stock status for each product
 * Status logic:
 *   - current_stock <= reorder_level * 0.3  → "Critical"
 *   - current_stock <= reorder_level         → "Low Stock"
 *   - current_stock > reorder_level          → "In Stock"
 */
router.get('/', (req, res) => {
  try {
    const db = getDb();

    const inventory = db.prepare(`
      SELECT
        i.id,
        p.id           AS product_id,
        p.name         AS product,
        p.grade,
        p.category,
        i.current_stock_kg  AS currentStock,
        i.sold_kg           AS sold,
        i.reorder_level_kg  AS reorderLevel
      FROM inventory i
      JOIN products p ON i.product_id = p.id
      ORDER BY i.current_stock_kg ASC
    `).all();

    const enriched = inventory.map((item) => {
      let status;
      if (item.currentStock <= item.reorderLevel * 0.3) {
        status = 'Critical';
      } else if (item.currentStock <= item.reorderLevel) {
        status = 'Low Stock';
      } else {
        status = 'In Stock';
      }

      return {
        ...item,
        status
      };
    });

    // Summary counts
    const statusCounts = {
      inStock: enriched.filter((i) => i.status === 'In Stock').length,
      lowStock: enriched.filter((i) => i.status === 'Low Stock').length,
      critical: enriched.filter((i) => i.status === 'Critical').length
    };

    res.json({
      success: true,
      count: enriched.length,
      statusCounts,
      inventory: enriched
    });
  } catch (err) {
    console.error('Inventory fetch error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inventory data.'
    });
  }
});

module.exports = router;
