const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');
const path = require('path');

const DB_PATH = path.join(__dirname, 'sudhari.db');

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
  }
  return db;
}

function initDatabase() {
  const db = getDb();

  // ── Create Tables ──────────────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      grade TEXT,
      price_per_kg REAL NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      has_flavors INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      quantity_kg REAL NOT NULL,
      revenue REAL NOT NULL,
      cost REAL NOT NULL,
      profit REAL NOT NULL,
      sale_date TEXT NOT NULL,
      month TEXT NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );

    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL UNIQUE,
      current_stock_kg REAL NOT NULL DEFAULT 0,
      sold_kg REAL NOT NULL DEFAULT 0,
      reorder_level_kg REAL NOT NULL DEFAULT 50,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);

  // ── Seed only if tables are empty ──────────────────────────────────────
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  if (userCount === 0) {
    seedUsers(db);
  }

  const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
  if (productCount === 0) {
    seedProducts(db);
    seedSales(db);
    seedInventory(db);
  }

  console.log('✅ Database initialized and seeded successfully');
  return db;
}

// ── Seed Admin User ──────────────────────────────────────────────────────
function seedUsers(db) {
  const passwordHash = bcrypt.hashSync('admin123', 10);
  db.prepare(`
    INSERT INTO users (email, password_hash, role)
    VALUES (?, ?, ?)
  `).run('admin@sudhari.com', passwordHash, 'admin');
  console.log('  → Admin user seeded');
}

// ── Seed Products ────────────────────────────────────────────────────────
function seedProducts(db) {
  const products = [
    {
      name: 'W180 Cashew',
      grade: 'W180',
      price_per_kg: 900,
      category: 'Premium',
      description: 'King-size whole cashews, the largest and most premium grade. Perfect for gifting and luxury snacking.',
      image_url: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=400&h=400&fit=crop',
      has_flavors: 0
    },
    {
      name: 'W220 Cashew',
      grade: 'W220',
      price_per_kg: 820,
      category: 'Premium',
      description: 'Large whole cashews with excellent shape and crunch. Ideal for premium retail.',
      image_url: 'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=400&h=400&fit=crop',
      has_flavors: 0
    },
    {
      name: 'W240 Cashew',
      grade: 'W240',
      price_per_kg: 790,
      category: 'Premium',
      description: 'Popular premium grade with great size and taste. Most sought-after retail variety.',
      image_url: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=400&fit=crop',
      has_flavors: 0
    },
    {
      name: 'W320 Cashew',
      grade: 'W320',
      price_per_kg: 760,
      category: 'Standard',
      description: 'The most widely consumed cashew grade worldwide. Excellent balance of quality and value.',
      image_url: 'https://images.unsplash.com/photo-1609534748043-2f7f4e460c78?w=400&h=400&fit=crop',
      has_flavors: 0
    },
    {
      name: 'W400 Cashew',
      grade: 'W400',
      price_per_kg: 720,
      category: 'Standard',
      description: 'Mid-sized whole cashews offering great value. Popular for cooking and everyday snacking.',
      image_url: 'https://images.unsplash.com/photo-1563292769-4e05b684851a?w=400&h=400&fit=crop',
      has_flavors: 0
    },
    {
      name: 'JH Cashew',
      grade: 'JH',
      price_per_kg: 760,
      category: 'Standard',
      description: 'Jumbo halves — large split cashews with robust flavor. Great for cooking and garnishing.',
      image_url: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=400&fit=crop',
      has_flavors: 0
    },
    {
      name: '5K Cashew',
      grade: '5K',
      price_per_kg: 660,
      category: 'Economy',
      description: 'Small whole pieces ideal for bakery use, sweets, and confectionery applications.',
      image_url: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&h=400&fit=crop',
      has_flavors: 0
    },
    {
      name: '8 Piece Cashew',
      grade: '8 Piece',
      price_per_kg: 620,
      category: 'Economy',
      description: 'Broken pieces in 8-split size. Most economical option for industrial and food-service use.',
      image_url: 'https://images.unsplash.com/photo-1598023696416-0193a0bcd302?w=400&h=400&fit=crop',
      has_flavors: 0
    },
    {
      name: 'Sortex Nuka',
      grade: 'Sortex',
      price_per_kg: 490,
      category: 'Economy',
      description: 'Machine-sorted small bits and powder. Widely used in sweets, halwa, and ice cream production.',
      image_url: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop',
      has_flavors: 0
    },
    {
      name: 'Masala Cashew',
      grade: 'Flavored',
      price_per_kg: 1000,
      category: 'Flavored',
      description: 'Roasted cashews tossed in a bold blend of Indian spices. Addictive savory snack with a kick.',
      image_url: 'https://images.unsplash.com/photo-1578864840553-f5b1a0f3b059?w=400&h=400&fit=crop',
      has_flavors: 1
    },
    {
      name: 'Pepper Cashew',
      grade: 'Flavored',
      price_per_kg: 1000,
      category: 'Flavored',
      description: 'Crunchy cashews coated in cracked black pepper and sea salt. A sophisticated, spicy treat.',
      image_url: 'https://images.unsplash.com/photo-1536816579748-4ecb3f03d72a?w=400&h=400&fit=crop',
      has_flavors: 1
    }
  ];

  const insert = db.prepare(`
    INSERT INTO products (name, grade, price_per_kg, category, description, image_url, has_flavors)
    VALUES (@name, @grade, @price_per_kg, @category, @description, @image_url, @has_flavors)
  `);

  const insertMany = db.transaction((items) => {
    for (const item of items) {
      insert.run(item);
    }
  });
  insertMany(products);
  console.log('  → 11 products seeded');
}

// ── Seed Sales Data (Jan–Dec 2024) ───────────────────────────────────────
function seedSales(db) {
  const products = db.prepare('SELECT id, price_per_kg, category FROM products').all();

  // Seasonal multipliers: festive/winter months get spikes
  //                       Jan   Feb   Mar   Apr   May   Jun   Jul   Aug   Sep   Oct   Nov   Dec
  const seasonalMultiplier = [0.85, 0.80, 0.90, 0.95, 0.88, 0.78, 0.82, 0.92, 1.00, 1.15, 1.30, 1.25];
  // Growth trend: gradual increase throughout the year
  const growthTrend =       [0.90, 0.92, 0.94, 0.96, 0.98, 1.00, 1.02, 1.04, 1.06, 1.08, 1.10, 1.12];

  // Base monthly quantity ranges by category (kg)
  const baseQuantity = {
    'Premium':  { min: 30, max: 70 },
    'Standard': { min: 50, max: 120 },
    'Economy':  { min: 40, max: 90 },
    'Flavored': { min: 25, max: 60 }
  };

  // Cost ratio varies by category (cost as % of revenue)
  const costRatio = {
    'Premium':  0.62,
    'Standard': 0.65,
    'Economy':  0.68,
    'Flavored': 0.60
  };

  // Seeded random number generator for deterministic data
  function seededRandom(seed) {
    let s = seed;
    return function () {
      s = (s * 16807 + 0) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }
  const random = seededRandom(42);

  const insertSale = db.prepare(`
    INSERT INTO sales (product_id, quantity_kg, revenue, cost, profit, sale_date, month)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction(() => {
    for (let m = 0; m < 12; m++) {
      const monthStr = `2024-${String(m + 1).padStart(2, '0')}`;
      const monthLabel = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m];

      for (const product of products) {
        const base = baseQuantity[product.category];
        const range = base.max - base.min;

        // Calculate quantity with seasonal + growth modifiers + randomness
        const qty = Math.round(
          (base.min + random() * range) *
          seasonalMultiplier[m] *
          growthTrend[m]
        );

        const revenue = Math.round(qty * product.price_per_kg * 100) / 100;
        const cost = Math.round(revenue * costRatio[product.category] * 100) / 100;
        const profit = Math.round((revenue - cost) * 100) / 100;

        // Generate 3–6 individual sale entries per product per month for realism
        const numSales = 3 + Math.floor(random() * 4);
        const qtyPerSale = qty / numSales;

        for (let s = 0; s < numSales; s++) {
          const day = 1 + Math.floor(random() * 28);
          const saleDate = `${monthStr}-${String(day).padStart(2, '0')}`;
          const saleQty = Math.round(qtyPerSale * (0.7 + random() * 0.6) * 100) / 100;
          const saleRevenue = Math.round(saleQty * product.price_per_kg * 100) / 100;
          const saleCost = Math.round(saleRevenue * costRatio[product.category] * 100) / 100;
          const saleProfit = Math.round((saleRevenue - saleCost) * 100) / 100;

          insertSale.run(
            product.id,
            saleQty,
            saleRevenue,
            saleCost,
            saleProfit,
            saleDate,
            monthLabel
          );
        }
      }
    }
  });
  insertMany();
  console.log('  → 12 months of sales data seeded');
}

// ── Seed Inventory ───────────────────────────────────────────────────────
function seedInventory(db) {
  const products = db.prepare('SELECT id, category FROM products').all();

  // Calculate total sold per product from sales data
  const soldQuery = db.prepare('SELECT COALESCE(SUM(quantity_kg), 0) as total_sold FROM sales WHERE product_id = ?');

  const insertInventory = db.prepare(`
    INSERT INTO inventory (product_id, current_stock_kg, sold_kg, reorder_level_kg)
    VALUES (?, ?, ?, ?)
  `);

  // Deliberately make some items low stock for visual warnings
  const stockLevels = {
    1:  { stock: 120, reorder: 50 },   // W180 – healthy
    2:  { stock: 85,  reorder: 50 },   // W220 – healthy
    3:  { stock: 35,  reorder: 50 },   // W240 – LOW STOCK
    4:  { stock: 200, reorder: 80 },   // W320 – healthy (best seller)
    5:  { stock: 95,  reorder: 50 },   // W400 – healthy
    6:  { stock: 15,  reorder: 50 },   // JH – CRITICAL
    7:  { stock: 60,  reorder: 40 },   // 5K – healthy
    8:  { stock: 42,  reorder: 50 },   // 8 Piece – LOW STOCK
    9:  { stock: 150, reorder: 60 },   // Sortex Nuka – healthy
    10: { stock: 8,   reorder: 30 },   // Masala – CRITICAL
    11: { stock: 75,  reorder: 40 },   // Pepper – healthy
  };

  const insertMany = db.transaction(() => {
    for (const product of products) {
      const { total_sold } = soldQuery.get(product.id);
      const levels = stockLevels[product.id] || { stock: 100, reorder: 50 };
      insertInventory.run(
        product.id,
        levels.stock,
        Math.round(total_sold * 100) / 100,
        levels.reorder
      );
    }
  });
  insertMany();
  console.log('  → Inventory data seeded');
}

module.exports = { getDb, initDatabase };
