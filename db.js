const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');

const DB_PATH = path.join(__dirname, 'database.db');
const db = new DatabaseSync(DB_PATH);

// Enable WAL mode for high performance
db.exec(`PRAGMA journal_mode = WAL;`);

// Create all tables
db.exec(`
  CREATE TABLE IF NOT EXISTS branches (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    ar TEXT NOT NULL,
    en TEXT NOT NULL,
    unit TEXT NOT NULL,
    cat TEXT NOT NULL,
    cost REAL NOT NULL,
    color TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS raw_materials (
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

  CREATE TABLE IF NOT EXISTS recipes (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL UNIQUE,
    title TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS recipe_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL,
    raw_id TEXT NOT NULL,
    qty REAL NOT NULL,
    waste REAL NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    branch TEXT NOT NULL,
    order_date TEXT NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    qty REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS taztiki_records (
    id TEXT PRIMARY KEY,
    order_date TEXT NOT NULL,
    branch TEXT NOT NULL,
    qty REAL NOT NULL,
    type TEXT DEFAULT 'out',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS purchase_orders (
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

  CREATE TABLE IF NOT EXISTS invoices (
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

  CREATE TABLE IF NOT EXISTS stock_movements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ing_id TEXT NOT NULL,
    change_qty REAL NOT NULL,
    reason TEXT,
    ref_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = db;
