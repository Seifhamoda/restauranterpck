const fs = require('node:fs');
const path = require('node:path');
const db = require('./db.js');

console.log('🚀 Starting Database Migration & Seed...');

// 1. Migrate Branches (24 official branches)
const branches = [
  'فرع واتر واي (Water Way)', 'فرع أب تاون (Uptown)', 'فرع O1 (O1)', 'فرع المعادي (The Field)',
  'فرع ميفيدا (Mivida)', 'فرع سوديك (Sodic)', 'فرع نيو جيزة (New Giza)', 'فرع نادي نيو جيزة (New Giza Club)',
  'فرع بارك ستريت (Park St)', 'فرع مول العرب (Mall of Arabia)', 'فرع بالم هيلز (Palm Hills)', 'فرع كود (Kode)',
  'فرع دهشور (Dahshour)', 'فرع مدينتي (Madinty)', 'فرع ديستريكت 5 (District 5)', 'فرع إل بوسكو (IL Bosco)',
  'فرع D2 (Drive 02)', 'فرع قطامية (Katameya)', 'فرع الجولف (NGG Golf)', 'فرع Core WOC', 'فرع Core PH',
  'فرع اسبليت واتر واي (Split Water Way)', 'فرع اسبليت O1 (Split O1)', 'فرع اسبليت نيو جيزة (Split New Giza)'
];

const insertBranch = db.prepare('INSERT OR IGNORE INTO branches (id, name) VALUES (?, ?)');
branches.forEach((b, idx) => {
  insertBranch.run(`br-${idx + 1}`, b);
});
console.log(`✅ Migrated ${branches.length} Branches.`);

// 2. Migrate Products (171 manufactured products)
if (fs.existsSync(path.join(__dirname, 'manufactured_products.json'))) {
  const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'manufactured_products.json'), 'utf8'));
  const insertProduct = db.prepare('INSERT OR REPLACE INTO products (id, ar, en, unit, cat, cost, color) VALUES (?, ?, ?, ?, ?, ?, ?)');
  
  products.forEach(p => {
    insertProduct.run(p.id, p.ar || p.en, p.en || p.ar, p.unit || 'kg', p.cat || 'prep', p.cost || 30, p.color || '#f97316');
  });
  console.log(`✅ Migrated ${products.length} Manufactured Products.`);
}

// 3. Migrate Raw Materials & Recipes (139 raw materials + 74 recipes)
if (fs.existsSync(path.join(__dirname, 'compiled_bom.json'))) {
  const compiled = JSON.parse(fs.readFileSync(path.join(__dirname, 'compiled_bom.json'), 'utf8'));
  const rawIngs = compiled.raw_ings || {};
  const bom = compiled.bom || {};

  const insertRaw = db.prepare('INSERT OR REPLACE INTO raw_materials (id, ar, en, uom, price, stock, safety, sup) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  Object.entries(rawIngs).forEach(([id, r]) => {
    insertRaw.run(id, r.ar || id, r.en || id, r.uom || 'kg', r.price || 45.0, r.stock || 100, r.safety || 10, r.sup || 'المورد المعتمد');
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
