const express = require('express');
const cors = require('cors');
const path = require('node:path');
const db = require('./db.js');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname)));

// ── GET FULL STATE ──
app.get('/api/state', (req, res) => {
  try {
    const branches = db.prepare('SELECT name FROM branches ORDER BY id ASC').all().map(r => r.name);
    const products = db.prepare('SELECT * FROM products ORDER BY ar ASC').all();
    
    // Raw materials map: { [id]: { ar, en, uom, price, stock, safety, sup } }
    const rawList = db.prepare('SELECT * FROM raw_materials ORDER BY ar ASC').all();
    const ings = {};
    rawList.forEach(r => {
      ings[r.id] = { ar: r.ar, en: r.en, uom: r.uom, price: r.price, stock: r.stock, safety: r.safety, sup: r.sup };
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

    // Orders with items
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
      notes: o.notes,
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

    const insertOrder = db.prepare('INSERT OR REPLACE INTO orders (id, branch, order_date, notes) VALUES (?, ?, ?, ?)');
    const insertItem = db.prepare('INSERT INTO order_items (order_id, product_id, qty) VALUES (?, ?, ?)');
    const deleteOldItems = db.prepare('DELETE FROM order_items WHERE order_id = ?');

    orders.forEach(o => {
      const oid = String(o.id || Date.now());
      insertOrder.run(oid, o.branch, o.date, o.notes || '');
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

// ── LIVE BATCH STOCK DEDUCTION ──
app.post('/api/batch-deduct', (req, res) => {
  try {
    const { productId, batchQty, deductions } = req.body;
    if (!Array.isArray(deductions) || deductions.length === 0) {
      return res.status(400).json({ success: false, error: 'No deductions provided' });
    }

    const updateStock = db.prepare('UPDATE raw_materials SET stock = MAX(0, stock - ?) WHERE id = ?');
    const logMovement = db.prepare('INSERT INTO stock_movements (ing_id, change_qty, reason, ref_id) VALUES (?, ?, ?, ?)');

    deductions.forEach(d => {
      updateStock.run(d.qty, d.id);
      logMovement.run(d.id, -d.qty, `Batch Production: ${batchQty} of ${productId}`, productId);
    });

    res.json({ success: true, count: deductions.length });
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

// ── TAZTIKI / BURGER SAUCE BATCHES ──
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

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Central Kitchen ERP Server + SQL Database Running!`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🗄️ SQL DB: ${path.join(__dirname, 'database.db')}`);
  console.log(`======================================================\n`);
});
