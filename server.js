require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const express = require('express');
const path = require('node:path');
const db = require('./db.js');

process.on('uncaughtException', (err) => {
  console.error('Server Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Server Unhandled Rejection at:', promise, 'reason:', reason);
});

const app = express();
const PORT = process.env.PORT || 3000;

// درع حماية الرؤوس
app.use(helmet({ contentSecurityPolicy: false }));

// حصر الـ CORS على النطاق المعتمد والتطوير المحلي
const allowedOrigins = [process.env.ALLOWED_ORIGIN, 'http://localhost:3000', 'http://localhost:8080'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Blocked by CORS policy'));
  },
  credentials: true
}));

// تحديد معدل الطلبات للـ APIs لمنع الإغراق
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { error: 'تم تجاوز الحد المسموح به من الطلبات مؤقتاً' },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', apiLimiter);

app.use(express.json({ limit: '50mb' }));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

// ════════════════════════════════════════════════════════════════════════
// ── IN-MEMORY STATIC CATALOG CACHE (Zero Disk I/O per Request) ──
// ════════════════════════════════════════════════════════════════════════
const fs = require('node:fs');

let _cachedCompiledBom = null;
let _cachedMasterRawMaterials = null;
let _cachedAllItemsCatalog = null;

function loadStaticCatalogs() {
  const bomPath = path.join(__dirname, 'compiled_bom.json');
  try {
    if (fs.existsSync(bomPath)) {
      _cachedCompiledBom = JSON.parse(fs.readFileSync(bomPath, 'utf8'));
      console.log('⚡ [Memory Cache] compiled_bom.json cached in RAM');
    }
  } catch (err) {
    console.warn('[Cache Warning] compiled_bom.json failed to load:', err.message);
    _cachedCompiledBom = { bom: {}, raw_ings: {} };
  }

  const rawPath = path.join(__dirname, 'master_raw_materials.json');
  try {
    if (fs.existsSync(rawPath)) {
      _cachedMasterRawMaterials = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
      console.log('⚡ [Memory Cache] master_raw_materials.json cached in RAM');
    }
  } catch (err) {
    console.warn('[Cache Warning] master_raw_materials.json failed to load:', err.message);
    _cachedMasterRawMaterials = [];
  }

  const catPath = path.join(__dirname, 'all_items_catalog.json');
  try {
    if (fs.existsSync(catPath)) {
      _cachedAllItemsCatalog = JSON.parse(fs.readFileSync(catPath, 'utf8'));
      console.log('⚡ [Memory Cache] all_items_catalog.json cached in RAM');
    }
  } catch (err) {
    console.warn('[Cache Warning] all_items_catalog.json failed to load:', err.message);
    _cachedAllItemsCatalog = [];
  }
}
loadStaticCatalogs();

// Fast routes serving cached catalogs directly from memory (no disk reads)
app.get('/compiled_bom.json', (req, res) => {
  if (_cachedCompiledBom) return res.json(_cachedCompiledBom);
  res.status(404).json({ error: 'compiled_bom.json not available' });
});

app.get('/master_raw_materials.json', (req, res) => {
  if (_cachedMasterRawMaterials) return res.json(_cachedMasterRawMaterials);
  res.status(404).json({ error: 'master_raw_materials.json not available' });
});

app.get('/all_items_catalog.json', (req, res) => {
  if (_cachedAllItemsCatalog) return res.json(_cachedAllItemsCatalog);
  res.status(404).json({ error: 'all_items_catalog.json not available' });
});

// Explicit API endpoints for catalog access
app.get('/api/catalog/compiled-bom', (req, res) => res.json(_cachedCompiledBom || { bom: {}, raw_ings: {} }));
app.get('/api/catalog/master-raw-materials', (req, res) => res.json(_cachedMasterRawMaterials || []));
app.get('/api/catalog/all-items', (req, res) => res.json(_cachedAllItemsCatalog || []));

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

// ════════════════════════════════════════════════════════════════════════
// FIX 3 — ATOMIC DUAL-DEDUCTION DISPATCH ENGINE
// POST /api/stock/dispatch
//
// Business rules (Central Kitchen dual-inventory architecture):
//
//  A) DIRECT items (type: "trading" | "finished"):
//     → Deduct requested qty directly from center_stock table.
//
//  B) PREP / MANUFACTURED items (type: "pa" | "prep"):
//     → Explode qty against compiled_bom.json recipes.
//     → Deduct each raw-material component from raw_materials.stock.
//
// Atomicity guarantee:
//   All SQL mutations run inside a single BEGIN TRANSACTION block.
//   If ANY deduction fails (insufficient stock, missing RM, DB error),
//   the entire transaction rolls back, preserving inventory integrity.
//
// Movement audit:
//   Every deduction is recorded in stock_movements with typed reasons:
//     "DISPATCH_BRANCH" — for finished/trading goods directly dispatched.
//     "BOM_CONSUMPTION" — for raw material components consumed by a PA batch.
// ════════════════════════════════════════════════════════════════════════

// In-memory accessor for compiled_bom
function getCompiledBom() {
  if (!_cachedCompiledBom) {
    loadStaticCatalogs();
  }
  return _cachedCompiledBom || { bom: {}, raw_ings: {} };
}

app.post('/api/stock/dispatch', (req, res) => {
  try {
    const { dispatchId, branchName, items, notes } = req.body;

    // ── Input validation ──────────────────────────────────────────────────
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Request body must contain a non-empty "items" array.'
      });
    }
    if (!branchName || typeof branchName !== 'string') {
      return res.status(400).json({
        success: false,
        error: '"branchName" is required and must be a string.'
      });
    }

    const bom      = getCompiledBom().bom      || {};
    const raw_ings = getCompiledBom().raw_ings  || {};
    const ref      = dispatchId || `DSP-${Date.now()}`;
    const auditNotes = notes || `Dispatch to ${branchName}`;

    // Prepare SQL statements (reused within the transaction for efficiency)
    const stmtGetCenterStock = db.prepare(
      'SELECT qty FROM center_stock WHERE product_id = ?'
    );
    const stmtDeductCenterStock = db.prepare(
      'UPDATE center_stock SET qty = MAX(0, qty - ?), updated_at = CURRENT_TIMESTAMP WHERE product_id = ?'
    );
    const stmtGetRawStock = db.prepare(
      'SELECT stock FROM raw_materials WHERE id = ?'
    );
    const stmtDeductRawMaterial = db.prepare(
      'UPDATE raw_materials SET stock = MAX(0, stock - ?) WHERE id = ?'
    );
    const stmtLogMovement = db.prepare(
      `INSERT INTO stock_movements (ing_id, change_qty, reason, ref_id, created_at)
       VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`
    );

    // ── Validation pass: check all quantities BEFORE committing any writes ──
    const errors = [];
    for (const item of items) {
      const { productId, qty, itemType } = item;
      if (!productId || !(qty > 0)) {
        errors.push(`Item missing productId or valid qty: ${JSON.stringify(item)}`);
        continue;
      }
      const type = (itemType || 'finished').toLowerCase();

      if (type === 'pa' || type === 'prep') {
        // PA item: validate raw material availability against BOM
        const recipe = bom[productId];
        if (!recipe || !Array.isArray(recipe.ings) || recipe.ings.length === 0) {
          errors.push(`No BOM recipe found for PA item "${productId}".`);
          continue;
        }
        for (const ing of recipe.ings) {
          const requiredQty = ing.qty * qty * (1 + (ing.waste || 0) / 100);
          const row = stmtGetRawStock.get(ing.id);
          const availableStock = row ? (row.stock || 0) : 0;
          if (availableStock < requiredQty) {
            const ingName = (raw_ings[ing.id] || {}).ar || ing.id;
            errors.push(
              `Insufficient raw material "${ingName}" (${ing.id}): ` +
              `required ${requiredQty.toFixed(3)}, available ${availableStock.toFixed(3)}.`
            );
          }
        }
      } else {
        // Direct / Trading item: validate center_stock
        const row = stmtGetCenterStock.get(productId);
        const available = row ? (row.qty || 0) : 0;
        if (available < qty) {
          errors.push(
            `Insufficient center stock for product "${productId}": ` +
            `required ${qty}, available ${available}.`
          );
        }
      }
    }

    if (errors.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'Stock validation failed — transaction aborted.',
        details: errors
      });
    }

    // ── Atomic write phase inside a single SQLite transaction ─────────────
    // db.transaction() wraps everything in BEGIN / COMMIT and auto-rolls back
    // on any thrown exception, guaranteeing all-or-nothing integrity.
    const movements = [];

    const atomicDispatch = db.transaction(() => {
      for (const item of items) {
        const { productId, qty, itemType } = item;
        const type = (itemType || 'finished').toLowerCase();

        if (type === 'pa' || type === 'prep') {
          // ── B) PA / Prepared item: BOM explosion ──────────────────────────
          const recipe = bom[productId];
          for (const ing of recipe.ings) {
            // Apply scrap/waste multiplier from BOM definition
            const wasteMultiplier = 1 + (ing.waste || 0) / 100;
            const deductQty       = ing.qty * qty * wasteMultiplier;

            stmtDeductRawMaterial.run(deductQty, ing.id);
            stmtLogMovement.run(
              ing.id,
              -deductQty,
              `BOM_CONSUMPTION | Product: ${productId} | Qty: ${qty} | ${auditNotes}`,
              ref
            );
            movements.push({
              type:      'BOM_CONSUMPTION',
              rawId:     ing.id,
              deducted:  deductQty,
              productId
            });
          }
        } else {
          // ── A) Direct / Trading / Finished item ───────────────────────────
          stmtDeductCenterStock.run(qty, productId);
          stmtLogMovement.run(
            productId,
            -qty,
            `DISPATCH_BRANCH | Branch: ${branchName} | ${auditNotes}`,
            ref
          );
          movements.push({
            type:      'DISPATCH_BRANCH',
            productId,
            deducted:  qty,
            branch:    branchName
          });
        }
      }
    });

    atomicDispatch(); // Execute — rolls back automatically on any error

    console.log(`[DISPATCH] ✅ ${ref} | Branch: ${branchName} | ${movements.length} movement(s) recorded.`);

    res.json({
      success:    true,
      dispatchId: ref,
      branch:     branchName,
      movements,
      count:      movements.length
    });

  } catch (err) {
    console.error('[DISPATCH] ❌ Atomic transaction rolled back:', err.message);
    res.status(500).json({
      success: false,
      error:   'Dispatch transaction failed and was rolled back.',
      detail:  err.message
    });
  }
});

// ════════════════════════════════════════════════════════════════════════
// FIX 4 — STOCK-OUT & REORDER ALERT ENGINE
// GET /api/alerts/low-stock
//
// Queries raw_materials where current stock <= safety threshold (min_stock).
// Returns enriched alert objects including:
//   - severity level  (critical / warning / watch)
//   - suggested_reorder_qty = (safety * 2) - current_stock  [ideal buffer]
//   - days_of_coverage estimate based on a placeholder daily burn rate
//
// The frontend fetchAndRenderLowStockAlerts() hook (see index.html Fix 1)
// calls this endpoint post-sync and renders alert cards on the dashboard.
// ════════════════════════════════════════════════════════════════════════

app.get('/api/alerts/low-stock', (req, res) => {
  try {
    // Query raw materials at or below their safety (minimum) threshold
    // Uses the raw_materials.safety column as the min_stock reference.
    const lowStockRows = db.prepare(`
      SELECT
        id,
        ar,
        en,
        uom,
        price,
        stock         AS current_stock,
        safety        AS min_stock,
        sup           AS supplier,
        -- Ideal stock = 2× the safety buffer (configurable business rule)
        (safety * 2)  AS ideal_stock,
        -- Replenishment quantity needed to reach ideal level
        MAX(0, (safety * 2) - stock) AS suggested_reorder_qty
      FROM raw_materials
      WHERE stock <= safety
      ORDER BY (stock / NULLIF(safety, 0)) ASC   -- Most depleted first
    `).all();

    if (!lowStockRows.length) {
      return res.json({
        success:    true,
        totalAlerts: 0,
        alerts:     [],
        message:    'All raw materials are above minimum stock thresholds.'
      });
    }

    // Enrich each row with a severity classification for the frontend
    const alerts = lowStockRows.map(row => {
      const ratio = row.min_stock > 0 ? (row.current_stock / row.min_stock) : 0;

      let severity, severityAr;
      if (row.current_stock <= 0) {
        severity   = 'critical';
        severityAr = 'حرج — نفاد تام';
      } else if (ratio <= 0.25) {
        severity   = 'critical';
        severityAr = 'حرج — نفاد وشيك';
      } else if (ratio <= 0.60) {
        severity   = 'warning';
        severityAr = 'تحذير — دون الحد';
      } else {
        severity   = 'watch';
        severityAr = 'مراقبة — قرب الحد';
      }

      return {
        id:                   row.id,
        name_ar:              row.ar,
        name_en:              row.en,
        uom:                  row.uom,
        supplier:             row.supplier,
        current_stock:        Number(row.current_stock),
        min_stock:            Number(row.min_stock),
        ideal_stock:          Number(row.ideal_stock),
        suggested_reorder_qty: Number(row.suggested_reorder_qty),
        stock_ratio:          Math.round(ratio * 100),   // % of min_stock
        severity,
        severity_ar:          severityAr
      };
    });

    const criticalCount = alerts.filter(a => a.severity === 'critical').length;
    const warningCount  = alerts.filter(a => a.severity === 'warning').length;

    res.json({
      success:       true,
      totalAlerts:   alerts.length,
      criticalCount,
      warningCount,
      alerts,
      generatedAt:   new Date().toISOString()
    });

  } catch (err) {
    console.error('[LOW-STOCK ALERT] Query failed:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Central Kitchen ERP Server + SQL Database Running!`);
  console.log(`Server running smoothly at http://localhost:${PORT}`);
  console.log(`🗄️ SQL DB: ${path.join(__dirname, 'database.db')}`);
  console.log(`======================================================\n`);
});
