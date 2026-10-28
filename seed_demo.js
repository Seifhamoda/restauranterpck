const fs = require('fs');
const path = require('path');
const db = require('./db.js');

console.log('🔄 Re-creating fresh schema and seeding demo data...');

// Drop ERP transactional & master tables to guarantee clean schema
// Note: 'users' and 'sessions' tables are preserved to retain admin credentials
db.exec(`
  DROP TABLE IF EXISTS order_items;
  DROP TABLE IF EXISTS orders;
  DROP TABLE IF EXISTS recipe_items;
  DROP TABLE IF EXISTS recipes;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS raw_materials;
  DROP TABLE IF EXISTS branches;
  DROP TABLE IF EXISTS stock_movements;
  DROP TABLE IF EXISTS purchase_orders;
  DROP TABLE IF EXISTS invoices;
  DROP TABLE IF EXISTS taztiki_records;

  CREATE TABLE branches (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE products (
    id TEXT PRIMARY KEY,
    ar TEXT NOT NULL,
    en TEXT NOT NULL,
    unit TEXT NOT NULL,
    cat TEXT NOT NULL,
    cost REAL NOT NULL,
    color TEXT,
    stock REAL NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE raw_materials (
    id TEXT PRIMARY KEY,
    ar TEXT NOT NULL,
    en TEXT NOT NULL,
    uom TEXT NOT NULL,
    price REAL NOT NULL,
    stock REAL NOT NULL DEFAULT 0,
    safety REAL NOT NULL DEFAULT 10,
    sup TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE recipes (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL UNIQUE,
    title TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE recipe_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL,
    raw_id TEXT NOT NULL,
    qty REAL NOT NULL,
    waste REAL NOT NULL DEFAULT 0
  );

  CREATE TABLE orders (
    id TEXT PRIMARY KEY,
    branch TEXT NOT NULL,
    order_date TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    qty REAL NOT NULL
  );

  CREATE TABLE taztiki_records (
    id TEXT PRIMARY KEY,
    order_date TEXT NOT NULL,
    branch TEXT NOT NULL,
    qty REAL NOT NULL,
    type TEXT DEFAULT 'out',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE purchase_orders (
    id TEXT PRIMARY KEY,
    ing_id TEXT NOT NULL,
    qty REAL NOT NULL,
    unit TEXT,
    cost REAL NOT NULL,
    sup TEXT,
    priority TEXT DEFAULT 'medium',
    status TEXT DEFAULT 'draft',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE invoices (
    id TEXT PRIMARY KEY,
    po_id TEXT,
    ing_id TEXT NOT NULL,
    qty REAL NOT NULL,
    unit TEXT,
    value REAL NOT NULL,
    sup TEXT,
    payment TEXT DEFAULT 'unpaid',
    notes TEXT,
    inv_date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE stock_movements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ing_id TEXT NOT NULL,
    change_qty REAL NOT NULL,
    reason TEXT,
    ref_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// 1. 4 Demo Branches
const branches = [
  { id: 'br-downtown', name: 'Downtown Central Kitchen' },
  { id: 'br-westside', name: 'Westside Hub' },
  { id: 'br-eastside', name: 'Eastside Flagship' },
  { id: 'br-north', name: 'North Coast Express' }
];

const insertBranch = db.prepare('INSERT INTO branches (id, name) VALUES (?, ?)');
branches.forEach(b => insertBranch.run(b.id, b.name));
console.log(`✅ Seeded ${branches.length} Generic Branches`);

// 2. 10 Raw Materials & Semi-Finished Items (5 low stock alert, 5 safe healthy stock)
const rawMaterials = [
  {
    id: 'raw-beef-patty',
    ar: 'Premium Ground Beef Patty Mix (80/20)',
    en: 'Premium Ground Beef Patty Mix (80/20)',
    uom: 'kg',
    price: 320.00,
    stock: 35.0,    // Below safety (80.0) -> ALERT ⚠️
    safety: 80.0,
    sup: 'National Quality Meats'
  },
  {
    id: 'raw-chicken-breast',
    ar: 'Fresh Boneless Chicken Breasts',
    en: 'Fresh Boneless Chicken Breasts',
    uom: 'kg',
    price: 165.00,
    stock: 140.0,   // Above safety (60.0) -> SAFE ✅
    safety: 60.0,
    sup: 'Prime Poultry Farms'
  },
  {
    id: 'raw-cheddar-cheese',
    ar: 'Aged Red Cheddar Cheese Blocks',
    en: 'Aged Red Cheddar Cheese Blocks',
    uom: 'kg',
    price: 280.00,
    stock: 18.0,    // Below safety (35.0) -> ALERT ⚠️
    safety: 35.0,
    sup: 'Artisan Dairy Suppliers'
  },
  {
    id: 'raw-brioche-buns',
    ar: 'Artisan Brioche Burger Buns',
    en: 'Artisan Brioche Burger Buns',
    uom: 'pcs',
    price: 8.50,
    stock: 950.0,   // Above safety (400.0) -> SAFE ✅
    safety: 400.0,
    sup: 'Smart Central Bakery'
  },
  {
    id: 'raw-mayo-base',
    ar: 'Heavy Gourmet Mayonnaise Base',
    en: 'Heavy Gourmet Mayonnaise Base',
    uom: 'kg',
    price: 75.00,
    stock: 15.0,    // Below safety (30.0) -> ALERT ⚠️
    safety: 30.0,
    sup: 'Specialty Sauce & Oils Co.'
  },
  {
    id: 'raw-dill-pickles',
    ar: 'Crispy Sliced Dill Pickles',
    en: 'Crispy Sliced Dill Pickles',
    uom: 'kg',
    price: 45.00,
    stock: 85.0,    // Above safety (40.0) -> SAFE ✅
    safety: 40.0,
    sup: 'Valley Pickling Co.'
  },
  {
    id: 'raw-potatoes',
    ar: 'Grade-A Frozen French Fries Cut',
    en: 'Grade-A Frozen French Fries Cut',
    uom: 'kg',
    price: 32.00,
    stock: 420.0,   // Above safety (150.0) -> SAFE ✅
    safety: 150.0,
    sup: 'Cold Harvest Logistics'
  },
  {
    id: 'raw-secret-spices',
    ar: 'Signature Master Seasoning Blend',
    en: 'Signature Master Seasoning Blend',
    uom: 'kg',
    price: 210.00,
    stock: 6.5,     // Below safety (20.0) -> ALERT ⚠️
    safety: 20.0,
    sup: 'Global Spice Mills'
  },
  {
    id: 'semi-caramelized-onions',
    ar: 'Prepared Caramelized Sweet Onions',
    en: 'Prepared Caramelized Sweet Onions',
    uom: 'kg',
    price: 65.00,
    stock: 75.0,    // Above safety (30.0) -> SAFE ✅
    safety: 30.0,
    sup: 'Prep Kitchen Unit A'
  },
  {
    id: 'semi-smoky-bbq',
    ar: 'Smoky Glaze BBQ Base Sauce',
    en: 'Smoky Glaze BBQ Base Sauce',
    uom: 'kg',
    price: 95.00,
    stock: 12.0,    // Below safety (25.0) -> ALERT ⚠️
    safety: 25.0,
    sup: 'Sauce Emulsion Unit B'
  }
];

const insertRaw = db.prepare(`
  INSERT INTO raw_materials (id, ar, en, uom, price, stock, safety, sup)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);
rawMaterials.forEach(r => {
  insertRaw.run(r.id, r.ar, r.en, r.uom, r.price, r.stock, r.safety, r.sup);
});
console.log(`✅ Seeded ${rawMaterials.length} Raw Materials & Semi-Finished Items (5 low stock, 5 safe)`);

// 3. 5 Finished Manufactured Products
const products = [
  {
    id: 'prod-classic-burger-kit',
    ar: 'Classic Gourmet Burger Kit',
    en: 'Classic Gourmet Burger Kit (PA)',
    unit: 'Portion',
    cat: 'beef',
    cost: 62.50,
    color: '#eab308',
    stock: 150.0
  },
  {
    id: 'prod-crispy-chicken-fillet',
    ar: 'Marinated Crispy Chicken Fillet',
    en: 'Marinated Crispy Chicken Fillet (PA)',
    unit: 'Portion',
    cat: 'chicken',
    cost: 46.00,
    color: '#10b981',
    stock: 120.0
  },
  {
    id: 'prod-signature-house-sauce',
    ar: 'Signature Central House Sauce',
    en: 'Signature Central House Sauce (PA)',
    unit: 'kg',
    cat: 'sauce',
    cost: 54.00,
    color: '#ef4444',
    stock: 80.0
  },
  {
    id: 'prod-gourmet-loaded-fries',
    ar: 'Gourmet Seasoned Cheddar Fries',
    en: 'Gourmet Seasoned Cheddar Fries (PA)',
    unit: 'Portion',
    cat: 'sides',
    cost: 32.00,
    color: '#8b5cf6',
    stock: 200.0
  },
  {
    id: 'prod-smoky-bbq-burger-kit',
    ar: 'Smoky BBQ Bacon Burger Kit',
    en: 'Smoky BBQ Bacon Burger Kit (PA)',
    unit: 'Portion',
    cat: 'beef',
    cost: 74.00,
    color: '#06b6d4',
    stock: 90.0
  }
];

const insertProd = db.prepare(`
  INSERT INTO products (id, ar, en, unit, cat, cost, color, stock)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);
products.forEach(p => {
  insertProd.run(p.id, p.ar, p.en, p.unit, p.cat, p.cost, p.color, p.stock);
});
console.log(`✅ Seeded ${products.length} Finished Products`);

// 4. 5 Interconnected BOM Recipes
const recipes = [
  {
    productId: 'prod-classic-burger-kit',
    title: 'Classic Gourmet Burger Kit Recipe',
    items: [
      { rawId: 'raw-beef-patty', qty: 0.15, waste: 0.02 },
      { rawId: 'raw-brioche-buns', qty: 1.0, waste: 0.0 },
      { rawId: 'raw-cheddar-cheese', qty: 0.03, waste: 0.01 },
      { rawId: 'raw-dill-pickles', qty: 0.02, waste: 0.01 }
    ]
  },
  {
    productId: 'prod-crispy-chicken-fillet',
    title: 'Marinated Crispy Chicken Fillet Recipe',
    items: [
      { rawId: 'raw-chicken-breast', qty: 0.18, waste: 0.03 },
      { rawId: 'raw-secret-spices', qty: 0.015, waste: 0.005 }
    ]
  },
  {
    productId: 'prod-signature-house-sauce',
    title: 'Signature Central House Sauce Recipe',
    items: [
      { rawId: 'raw-mayo-base', qty: 0.65, waste: 0.02 },
      { rawId: 'semi-smoky-bbq', qty: 0.25, waste: 0.01 },
      { rawId: 'raw-secret-spices', qty: 0.08, waste: 0.01 },
      { rawId: 'raw-dill-pickles', qty: 0.05, waste: 0.01 }
    ]
  },
  {
    productId: 'prod-gourmet-loaded-fries',
    title: 'Gourmet Seasoned Cheddar Fries Recipe',
    items: [
      { rawId: 'raw-potatoes', qty: 0.25, waste: 0.03 },
      { rawId: 'raw-cheddar-cheese', qty: 0.04, waste: 0.01 },
      { rawId: 'semi-caramelized-onions', qty: 0.03, waste: 0.01 }
    ]
  },
  {
    productId: 'prod-smoky-bbq-burger-kit',
    title: 'Smoky BBQ Bacon Burger Kit Recipe',
    items: [
      { rawId: 'raw-beef-patty', qty: 0.18, waste: 0.02 },
      { rawId: 'raw-brioche-buns', qty: 1.0, waste: 0.0 },
      { rawId: 'semi-caramelized-onions', qty: 0.04, waste: 0.01 },
      { rawId: 'semi-smoky-bbq', qty: 0.03, waste: 0.01 }
    ]
  }
];

const insertRecipe = db.prepare('INSERT INTO recipes (id, product_id, title) VALUES (?, ?, ?)');
const insertRecipeItem = db.prepare('INSERT INTO recipe_items (product_id, raw_id, qty, waste) VALUES (?, ?, ?, ?)');

recipes.forEach(r => {
  insertRecipe.run(`rec-${r.productId}`, r.productId, r.title);
  r.items.forEach(it => {
    insertRecipeItem.run(r.productId, it.rawId, it.qty, it.waste);
  });
});
console.log(`✅ Seeded ${recipes.length} Interconnected BOM Recipes`);

// 5. 3 Sample Branch Orders (Delivered, Processing, Pending)
const todayStr = new Date().toISOString().split('T')[0];
const sampleOrders = [
  {
    id: 'ord-1001',
    branch: 'Downtown Central Kitchen',
    date: todayStr,
    status: 'Delivered',
    notes: 'Morning shift batch order — Delivered & Received',
    items: {
      'prod-classic-burger-kit': 45,
      'prod-signature-house-sauce': 12,
      'prod-gourmet-loaded-fries': 30
    }
  },
  {
    id: 'ord-1002',
    branch: 'Westside Hub',
    date: todayStr,
    status: 'Processing',
    notes: 'Kitchen prep in progress — Loaded into refrigerated fleet',
    items: {
      'prod-crispy-chicken-fillet': 50,
      'prod-gourmet-loaded-fries': 40
    }
  },
  {
    id: 'ord-1003',
    branch: 'Eastside Flagship',
    date: todayStr,
    status: 'Pending',
    notes: 'Pending operations manager approval & cook scheduling',
    items: {
      'prod-smoky-bbq-burger-kit': 35,
      'prod-classic-burger-kit': 25
    }
  }
];

const insertOrder = db.prepare('INSERT INTO orders (id, branch, order_date, status, notes) VALUES (?, ?, ?, ?, ?)');
const insertOrderItem = db.prepare('INSERT INTO order_items (order_id, product_id, qty) VALUES (?, ?, ?)');

sampleOrders.forEach(o => {
  insertOrder.run(o.id, o.branch, o.date, o.status, o.notes);
  Object.entries(o.items).forEach(([pid, qty]) => {
    insertOrderItem.run(o.id, pid, qty);
  });
});
console.log(`✅ Seeded ${sampleOrders.length} Sample Branch Orders (Delivered, Processing, Pending)`);

// 6. Log Initial Stock Movements
const insertLog = db.prepare('INSERT INTO stock_movements (ing_id, change_qty, reason, ref_id) VALUES (?, ?, ?, ?)');
rawMaterials.forEach(r => {
  insertLog.run(r.id, r.stock, 'Initial Inventory Stock Balance (Demo Seed)', 'INIT-SEED');
});

console.log('🎉 Demo Seeding Script Prepared Successfully with 100% Interconnected Generic Data!');
