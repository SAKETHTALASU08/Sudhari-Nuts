const express = require('express');
const ExcelJS = require('exceljs');
const { getDb } = require('../database');
const authMiddleware = require('../middleware/auth');
const { generateForecast } = require('../utils/forecasting');

const router = express.Router();

// All sales routes require authentication
router.use(authMiddleware);

/**
 * GET /api/sales/summary
 * Returns aggregate metrics: totalRevenue, totalCost, totalProfit, profitMargin, orderCount, avgOrderValue
 */
router.get('/summary', (req, res) => {
  try {
    const db = getDb();

    const summary = db.prepare(`
      SELECT
        ROUND(SUM(revenue), 2)  AS totalRevenue,
        ROUND(SUM(cost), 2)     AS totalCost,
        ROUND(SUM(profit), 2)   AS totalProfit,
        COUNT(*)                 AS orderCount,
        ROUND(AVG(revenue), 2)  AS avgOrderValue
      FROM sales
    `).get();

    summary.profitMargin = summary.totalRevenue > 0
      ? Math.round((summary.totalProfit / summary.totalRevenue) * 10000) / 100
      : 0;

    res.json({
      success: true,
      summary
    });
  } catch (err) {
    console.error('Sales summary error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sales summary.'
    });
  }
});

/**
 * GET /api/sales/monthly
 * Returns monthly breakdown: [{ month, revenue, cost, profit, quantity }]
 */
router.get('/monthly', (req, res) => {
  try {
    const db = getDb();

    // We need proper month ordering, so we use sale_date to extract month number
    const monthlyData = db.prepare(`
      SELECT
        month,
        ROUND(SUM(revenue), 2)      AS revenue,
        ROUND(SUM(cost), 2)         AS cost,
        ROUND(SUM(profit), 2)       AS profit,
        ROUND(SUM(quantity_kg), 2)  AS quantity
      FROM sales
      GROUP BY month
      ORDER BY MIN(sale_date)
    `).all();

    res.json({
      success: true,
      data: monthlyData
    });
  } catch (err) {
    console.error('Monthly sales error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch monthly sales data.'
    });
  }
});

/**
 * GET /api/sales/by-product
 * Returns per-product sales breakdown
 */
router.get('/by-product', (req, res) => {
  try {
    const db = getDb();

    const productSales = db.prepare(`
      SELECT
        p.id,
        p.name,
        p.category,
        p.grade,
        ROUND(SUM(s.revenue), 2)      AS totalRevenue,
        ROUND(SUM(s.profit), 2)       AS totalProfit,
        ROUND(SUM(s.quantity_kg), 2)  AS totalQuantity,
        COUNT(s.id)                    AS saleCount
      FROM sales s
      JOIN products p ON s.product_id = p.id
      GROUP BY p.id
      ORDER BY totalRevenue DESC
    `).all();

    res.json({
      success: true,
      data: productSales
    });
  } catch (err) {
    console.error('Product sales error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product sales data.'
    });
  }
});

/**
 * GET /api/sales/forecast
 * Returns 3-month revenue forecast using linear regression + SMA blend
 */
router.get('/forecast', (req, res) => {
  try {
    const db = getDb();

    const monthlyData = db.prepare(`
      SELECT
        month,
        ROUND(SUM(revenue), 2) AS revenue
      FROM sales
      GROUP BY month
      ORDER BY MIN(sale_date)
    `).all();

    const forecast = generateForecast(monthlyData);

    res.json({
      success: true,
      historical: monthlyData,
      forecast
    });
  } catch (err) {
    console.error('Forecast error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to generate forecast.'
    });
  }
});

/**
 * GET /api/sales/export?format=xlsx|csv
 * Download sales report as Excel or CSV file
 */
router.get('/export', async (req, res) => {
  try {
    const db = getDb();
    const format = (req.query.format || 'xlsx').toLowerCase();

    if (!['xlsx', 'csv'].includes(format)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid format. Use xlsx or csv.'
      });
    }

    // Fetch detailed sales data with product names
    const salesData = db.prepare(`
      SELECT
        s.id,
        p.name        AS product_name,
        p.grade,
        p.category,
        s.quantity_kg,
        s.revenue,
        s.cost,
        s.profit,
        s.sale_date,
        s.month
      FROM sales s
      JOIN products p ON s.product_id = p.id
      ORDER BY s.sale_date DESC
    `).all();

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Sudhari Nuts Platform';
    workbook.created = new Date();

    // ── Sheet 1: Detailed Sales ──────────────────────────────────────
    const detailSheet = workbook.addWorksheet('Sales Detail');
    detailSheet.columns = [
      { header: 'ID',         key: 'id',           width: 8  },
      { header: 'Product',    key: 'product_name', width: 20 },
      { header: 'Grade',      key: 'grade',        width: 12 },
      { header: 'Category',   key: 'category',     width: 12 },
      { header: 'Qty (kg)',   key: 'quantity_kg',   width: 12 },
      { header: 'Revenue (₹)', key: 'revenue',     width: 15 },
      { header: 'Cost (₹)',   key: 'cost',         width: 15 },
      { header: 'Profit (₹)', key: 'profit',       width: 15 },
      { header: 'Sale Date',  key: 'sale_date',    width: 14 },
      { header: 'Month',      key: 'month',        width: 10 }
    ];

    // Style header row
    detailSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    detailSheet.getRow(1).fill = {
      type: 'pattern', pattern: 'solid',
      fgColor: { argb: 'FF2E7D32' }
    };

    salesData.forEach((row) => detailSheet.addRow(row));

    // ── Sheet 2: Monthly Summary ─────────────────────────────────────
    const monthlyData = db.prepare(`
      SELECT
        month,
        ROUND(SUM(revenue), 2)      AS revenue,
        ROUND(SUM(cost), 2)         AS cost,
        ROUND(SUM(profit), 2)       AS profit,
        ROUND(SUM(quantity_kg), 2)  AS quantity
      FROM sales
      GROUP BY month
      ORDER BY MIN(sale_date)
    `).all();

    const summarySheet = workbook.addWorksheet('Monthly Summary');
    summarySheet.columns = [
      { header: 'Month',       key: 'month',    width: 12 },
      { header: 'Revenue (₹)', key: 'revenue',  width: 15 },
      { header: 'Cost (₹)',    key: 'cost',     width: 15 },
      { header: 'Profit (₹)',  key: 'profit',   width: 15 },
      { header: 'Qty (kg)',    key: 'quantity',  width: 12 }
    ];

    summarySheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    summarySheet.getRow(1).fill = {
      type: 'pattern', pattern: 'solid',
      fgColor: { argb: 'FF1565C0' }
    };

    monthlyData.forEach((row) => summarySheet.addRow(row));

    // ── Send response ────────────────────────────────────────────────
    if (format === 'xlsx') {
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=sudhari_sales_report.xlsx');
      await workbook.xlsx.write(res);
    } else {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=sudhari_sales_report.csv');
      await workbook.csv.write(res);
    }

    res.end();
  } catch (err) {
    console.error('Export error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to export sales data.'
    });
  }
});

module.exports = router;
