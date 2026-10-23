const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const path = require('node:path');
const db = require('./db.js');

// Load environment variables if available
try {
  const fs = require('fs');
  if (fs.existsSync('.env')) {
    const envConfig = fs.readFileSync('.env', 'utf8');
    envConfig.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value.trim();
      }
    });
  }
} catch (e) {
  console.warn('Could not read .env file:', e.message);
}

process.on('uncaughtException', (err) => {
  console.error('Server Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Server Unhandled Rejection at:', promise, 'reason:', reason);
});

const app = express();
const PORT = process.env.PORT || 8080;
const API_SECRET_KEY = process.env.API_SECRET_KEY || 'ck_erp_secret_key_demo_2026';

// ── 1. HTTP HEADER SECURITY (HELMET) ──
app.use(helmet({ contentSecurityPolicy: false }));

// ── 2. RESTRICTED CORS ORIGIN CHECK ──
const rawOrigins = process.env.ALLOWED_ORIGINS || 'http://localhost:8080,http://127.0.0.1:8080,http://localhost:3000';
const allowedOrigins = rawOrigins.split(',').map(s => s.trim().toLowerCase());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile web views, same-origin browser fetches, curl, postman)
    if (!origin) return callback(null, true);
    const lowerOrigin = origin.toLowerCase();
    if (allowedOrigins.includes('*') || allowedOrigins.includes(lowerOrigin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked: Origin ${origin} not permitted`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'x-api-key']
}));

// ── 3. BODY PARSING & CACHE HEADERS ──
app.use(express.json({ limit: '50mb' }));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

// ── 4. API RATE LIMITING (300 requests per 15 minutes) ──
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP address. Rate limit is 300 requests per 15 minutes.'
  }
});
app.use('/api/', apiLimiter);

// ── 5. AUTHENTICATION & SECURITY MIDDLEWARE FOR STATE-CHANGING METHODS ──
const apiAuthMiddleware = (req, res, next) => {
  const method = req.method.toUpperCase();
  const stateChanging = ['POST', 'PUT', 'DELETE', 'PATCH'];

  if (stateChanging.includes(method)) {
    const clientHeader = req.headers['x-requested-with'];
    const apiKey = req.headers['x-api-key'];

    const isSameOriginUi = clientHeader === 'CK-ERP-Client';
    const isValidApiKey = apiKey && apiKey === API_SECRET_KEY;

    if (!isSameOriginUi && !isValidApiKey) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: State-changing operations require X-Requested-With: CK-ERP-Client or valid x-api-key'
      });
    }
  }
  next();
};
app.use('/api', apiAuthMiddleware);

// Static assets
app.use(express.static(path.join(__dirname), { etag: false, maxAge: 0 }));

// ── GET FULL STATE ──
app.get('/api/state', (req, res) => {
  try {
    const branches = db.prepare('SELECT name FROM branches ORDER BY id ASC').all().map(r => r.name);
    const products = db.prepare('SELECT * FROM products ORDER BY ar ASC').all();
    
    // Raw materials map: { [id]: { ar, en, uom, price, stock, safety, sup } }
    const rawList = db.prepare('SELECT * FROM raw_materials ORDER BY ar ASC').all();
    const ings = {};
    rawList.forEach(r => {
      ings[r.id] = {
        ar: r.ar,
        en: r.en,
        uom: r.uom,
        price: r.price,
        stock: r.stock,
        safety: r.safety,
        sup: r.sup
      };
    });

    // Recipes map: { [productId]: { ings: [ { id, qty, waste } ] } }
    const recipes = {};
    const recipeRows = db.prepare('SELECT product_id, raw_id, qty, waste FROM recipe_items').all();
    recipeRows.forEach(row => {
      if (!recipes[row.product_id]) recipes[row.product_id] = { ings: [] };
      recipes[row.product_id].ings.push({
        id: row.raw_id,
        qty: row.qty,
        waste: row.waste
      });
    });

    // Orders with items & status
    const orderRows = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    const itemRows = db.prepare('SELECT order_id, product_id, qty FROM order_items').all();
    const orderItemsMap = {};
    itemRows.forEach(it => {
      if (!orderItemsMap[it.order_id]) orderItemsMap[it.order_id] = {};
      orderItemsMap[it.order_id][it.product_id] = it.qty;
    });

    const orders = orderRows.map(o => ({
      id: isNaN(o.id) ? o.id : Number(o.id),
      branch: o.branch,
      date: o.order_date,
      status: o.status || 'Pending',
      notes: o.notes || '',
      items: orderItemsMap[o.id] || {}
    }));

    const taztikiRecords = db.prepare('SELECT * FROM taztiki_records ORDER BY created_at DESC').all().map(r => ({
      id: r.id,
      date: r.order_date,
      branch: r.branch,
      qty: r.qty,
      type: r.type,
      notes: r.notes
    }));

    const POs = db.prepare('SELECT * FROM purchase_orders ORDER BY created_at DESC').all().map(r => ({
      id: r.id,
      ingId: r.ing_id,
      qty: r.qty,
      unit: r.unit,
      cost: r.cost,
      sup: r.sup,
      priority: r.priority,
      status: r.status
    }));

    const invoices = db.prepare('SELECT * FROM invoices ORDER BY created_at DESC').all().map(r => ({
      id: r.id,
      poId: r.po_id,
      ingId: r.ing_id,
      qty: r.qty,
      unit: r.unit,
      value: r.value,
      sup: r.sup,
      payment: r.payment,
      notes: r.notes,
      date: r.inv_date
    }));

    res.json({
      success: true,
      branches,
      products,
      ings,
      recipes,
      orders,
      taztikiRecords,
      POs,
      invoices
    });
  } catch (err) {
    console.error('Error in /api/state:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── SAVE / BATCH ORDERS ──
app.post('/api/orders', (req, res) => {
  try {
    const { orders, replaceDates } = req.body;
    if (!Array.isArray(orders)) {
      return res.status(400).json({ success: false, error: 'orders must be an array' });
    }

    if (replaceDates && Array.isArray(replaceDates) && replaceDates.length > 0) {
      const deleteItemsStmt = db.prepare('DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE order_date = ?)');
      const deleteOrdersStmt = db.prepare('DELETE FROM orders WHERE order_date = ?');
      const deleteTazStmt = db.prepare('DELETE FROM taztiki_records WHERE order_date = ?');
      
      replaceDates.forEach(d => {
        deleteItemsStmt.run(d);
        deleteOrdersStmt.run(d);
        deleteTazStmt.run(d);
      });
    }

    const insertOrder = db.prepare('INSERT OR REPLACE INTO orders (id, branch, order_date, status, notes) VALUES (?, ?, ?, ?, ?)');
    const insertItem = db.prepare('INSERT INTO order_items (order_id, product_id, qty) VALUES (?, ?, ?)');
    const deleteOldItems = db.prepare('DELETE FROM order_items WHERE order_id = ?');

    orders.forEach(o => {
      const oid = String(o.id || Date.now());
      const status = o.status || 'Pending';
      insertOrder.run(oid, o.branch, o.date, status, o.notes || '');
      deleteOldItems.run(oid);
      if (o.items && typeof o.items === 'object') {
        Object.entries(o.items).forEach(([pid, qty]) => {
          if (qty > 0) insertItem.run(oid, pid, qty);
        });
      }
    });

    res.json({ success: true, count: orders.length });
  } catch (err) {
    console.error('Error saving orders:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── UPDATE ORDER STATUS & DISPATCH (WITH STOCK DEDUCTION) ──
app.put('/api/orders/:id/status', (req, res) => {
  try {
    const oid = String(req.params.id);
    const { status, deductStock } = req.body;
    db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, oid);

    if (deductStock) {
      const items = db.prepare('SELECT product_id, qty FROM order_items WHERE order_id = ?').all(oid);
      const updateProd = db.prepare('UPDATE products SET stock = MAX(0, stock - ?) WHERE id = ?');
      const logMovement = db.prepare('INSERT INTO stock_movements (ing_id, change_qty, reason, ref_id) VALUES (?, ?, ?, ?)');

      items.forEach(it => {
        updateProd.run(it.qty, it.product_id);
        logMovement.run(it.product_id, -it.qty, `Order Dispatch (${status}): Order #${oid}`, oid);
      });
    }

    res.json({ success: true, status, oid });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── DELETE SINGLE ORDER ──
app.delete('/api/orders/:id', (req, res) => {
  try {
    const oid = String(req.params.id);
    db.prepare('DELETE FROM order_items WHERE order_id = ?').run(oid);
    db.prepare('DELETE FROM orders WHERE id = ?').run(oid);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── DELETE ORDERS FOR DATE ──
app.delete('/api/orders/date/:date', (req, res) => {
  try {
    const d = req.params.date;
    db.prepare('DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE order_date = ?)').run(d);
    db.prepare('DELETE FROM orders WHERE order_date = ?').run(d);
    db.prepare('DELETE FROM taztiki_records WHERE order_date = ?').run(d);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── CLEAR ALL ORDERS ──
app.delete('/api/orders', (req, res) => {
  try {
    db.prepare('DELETE FROM order_items').run();
    db.prepare('DELETE FROM orders').run();
    db.prepare('DELETE FROM taztiki_records').run();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── LIVE BATCH PRODUCTION & STOCK DEDUCTION ──
// Deducts raw materials, increments finished product stock, and logs stock movements
app.post('/api/batch-deduct', (req, res) => {
  try {
    const { productId, batchQty, deductions } = req.body;
    if (!Array.isArray(deductions) || deductions.length === 0) {
      return res.status(400).json({ success: false, error: 'No deductions provided' });
    }

    const qtyNumber = Number(batchQty) || 1;
    const updateStock = db.prepare('UPDATE raw_materials SET stock = MAX(0, stock - ?) WHERE id = ?');
    const updateProdStock = db.prepare('UPDATE products SET stock = stock + ? WHERE id = ?');
    const logMovement = db.prepare('INSERT INTO stock_movements (ing_id, change_qty, reason, ref_id) VALUES (?, ?, ?, ?)');

    // 1. Deduct raw materials
    deductions.forEach(d => {
      updateStock.run(d.qty, d.id);
      logMovement.run(d.id, -d.qty, `BOM Batch Deduction: ${qtyNumber} units of ${productId}`, productId);
    });

    // 2. Increment finished product stock
    if (productId) {
      updateProdStock.run(qtyNumber, productId);
      logMovement.run(productId, qtyNumber, `BOM Batch Output: Produced ${qtyNumber} units`, productId);
    }

    res.json({ success: true, count: deductions.length, producedQty: qtyNumber });
  } catch (err) {
    console.error('Error in batch-deduct:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── UPDATE RAW MATERIAL STOCK / SAFETY / PRICE ──
app.put('/api/raw-materials/:id', (req, res) => {
  try {
    const id = req.params.id;
    const { stock, safety, price } = req.body;
    db.prepare('UPDATE raw_materials SET stock = ?, safety = ?, price = ? WHERE id = ?').run(stock, safety, price, id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── ADD RAW MATERIAL ──
app.post('/api/raw-materials', (req, res) => {
  try {
    const { id, ar, en, uom, price, stock, safety, sup } = req.body;
    db.prepare('INSERT OR REPLACE INTO raw_materials (id, ar, en, uom, price, stock, safety, sup) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
      .run(id, ar, en, uom, price || 45, stock || 0, safety || 10, sup || 'المورد المعتمد');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── SAVE / UPDATE RECIPE ──
app.post('/api/recipes', (req, res) => {
  try {
    const { productId, ings } = req.body;
    db.prepare('INSERT OR REPLACE INTO recipes (id, product_id, title) VALUES (?, ?, ?)').run(`rec-${productId}`, productId, productId);
    db.prepare('DELETE FROM recipe_items WHERE product_id = ?').run(productId);
    
    const insertItem = db.prepare('INSERT INTO recipe_items (product_id, raw_id, qty, waste) VALUES (?, ?, ?, ?)');
    if (Array.isArray(ings)) {
      ings.forEach(ing => {
        insertItem.run(productId, ing.id, ing.qty, ing.waste || 0);
      });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── TAZTIKI / SPECIALTY BATCHES ──
app.post('/api/taztiki', (req, res) => {
  try {
    const { id, date, branch, qty, type, notes } = req.body;
    db.prepare('INSERT OR REPLACE INTO taztiki_records (id, order_date, branch, qty, type, notes) VALUES (?, ?, ?, ?, ?, ?)')
      .run(id, date, branch, qty, type || 'out', notes || '');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/taztiki/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM taztiki_records WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── PURCHASE ORDERS ──
app.post('/api/purchase-orders', (req, res) => {
  try {
    const { pos } = req.body;
    const insertPo = db.prepare('INSERT OR REPLACE INTO purchase_orders (id, ing_id, qty, unit, cost, sup, priority, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    if (Array.isArray(pos)) {
      pos.forEach(p => {
        insertPo.run(p.id, p.ingId, p.qty, p.unit, p.cost, p.sup, p.priority || 'medium', p.status || 'draft');
      });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/purchase-orders/:id', (req, res) => {
  try {
    const { status } = req.body;
    db.prepare('UPDATE purchase_orders SET status = ? WHERE id = ?').run(status, req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── INVOICES ──
app.post('/api/invoices', (req, res) => {
  try {
    const { id, poId, ingId, qty, unit, value, sup, payment, notes, date } = req.body;
    db.prepare('INSERT OR REPLACE INTO invoices (id, po_id, ing_id, qty, unit, value, sup, payment, notes, inv_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .run(id, poId, ingId, qty, unit, value, sup, payment || 'unpaid', notes || '', date);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── START SECURED SERVER ──
const server = app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🛡️ Smart Central Kitchen ERP Server (Hardened & Secured)`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🗄️ SQL DB: ${path.join(__dirname, 'database.db')}`);
  console.log(`🔒 Security: Helmet ON, RateLimit (300/15m) ON, Auth ON`);
  console.log(`======================================================\n`);
});

module.exports = { app, server };
