const fs = require('node:fs');
const path = require('node:path');
const db = require('./db.js');

console.log('🚀 Starting Database Migration & Seed...');

// 1. Migrate Branches (Demo branches)
const branches = [
  'Downtown Central Kitchen',
  'Westside Hub',
  'Eastside Flagship',
  'North Coast Express'
];

const insertBranch = db.prepare('INSERT OR IGNORE INTO branches (id, name) VALUES (?, ?)');
branches.forEach((b, idx) => {
  insertBranch.run(`br-${idx + 1}`, b);
});
console.log(`✅ Migrated ${branches.length} Branches.`);

// 2. Migrate Products (if JSON provided)
if (fs.existsSync(path.join(__dirname, 'manufactured_products.json'))) {
  const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'manufactured_products.json'), 'utf8'));
  const insertProduct = db.prepare('INSERT OR REPLACE INTO products (id, ar, en, unit, cat, cost, color) VALUES (?, ?, ?, ?, ?, ?, ?)');
  
  products.forEach(p => {
    insertProduct.run(p.id, p.ar || p.en, p.en || p.ar, p.unit || 'kg', p.cat || 'prep', p.cost || 30, p.color || '#f97316');
  });
  console.log(`✅ Migrated ${products.length} Manufactured Products.`);
}

// 3. Migrate Raw Materials & Recipes (if JSON provided)
if (fs.existsSync(path.join(__dirname, 'compiled_bom.json'))) {
  const compiled = JSON.parse(fs.readFileSync(path.join(__dirname, 'compiled_bom.json'), 'utf8'));
  const rawIngs = compiled.raw_ings || {};
  const bom = compiled.bom || {};

  const insertRaw = db.prepare('INSERT OR REPLACE INTO raw_materials (id, ar, en, uom, price, stock, safety, sup) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  Object.entries(rawIngs).forEach(([id, r]) => {
    insertRaw.run(id, r.ar || id, r.en || id, r.uom || 'kg', r.price || 45.0, r.stock || 100, r.safety || 10, r.sup || 'Approved Supplier');
  });
  console.log(`✅ Migrated ${Object.keys(rawIngs).length} Raw Materials.`);

  const insertRecipe = db.prepare('INSERT OR REPLACE INTO recipes (id, product_id, title) VALUES (?, ?, ?)');
  const deleteRecipeItems = db.prepare('DELETE FROM recipe_items WHERE product_id = ?');
  const insertRecipeItem = db.prepare('INSERT INTO recipe_items (product_id, raw_id, qty, waste) VALUES (?, ?, ?, ?)');

  let totalRecipeItems = 0;
  Object.entries(bom).forEach(([pid, r]) => {
    insertRecipe.run(`rec-${pid}`, pid, pid);
    deleteRecipeItems.run(pid);
    if (r.ings && Array.isArray(r.ings)) {
      r.ings.forEach(ing => {
        insertRecipeItem.run(pid, ing.id, ing.qty, ing.waste || 0);
        totalRecipeItems++;
      });
    }
  });
  console.log(`✅ Migrated ${Object.keys(bom).length} Recipes (${totalRecipeItems} recipe ingredient items).`);
}

console.log('🎉 Database Migration Completed Successfully!');
