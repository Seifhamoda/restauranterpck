const fs = require('node:fs');
const path = require('node:path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://ihminamcbstcexsdacys.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlobWluYW1jYnN0Y2V4c2RhY3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5Mjg5MDksImV4cCI6MjEwMzUwNDkwOX0.4i4zO2ygSHdkQULp2Chqz3mxiUYevOjbX537w7uWRrE';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function seedSupabase() {
  console.log('🚀 Connecting to Supabase and uploading ERP dataset...');

  // 1. Upload Branches (26 branches)
  const branches = [
    'فرع واتر واي (Water Way)', 'فرع أب تاون (Uptown)', 'فرع O1 (O1)', 'فرع المعادي (The Field)',
    'فرع ميفيدا (Mivida)', 'فرع سوديك (Sodic)', 'فرع نيو جيزة (New Giza)', 'فرع نادي نيو جيزة (New Giza Club)',
    'فرع بارك ستريت (Park St)', 'فرع مول العرب (Mall of Arabia)', 'فرع بالم هيلز (Palm Hills)', 'فرع كود (Kode)',
    'فرع دهشور (Dahshour)', 'فرع مدينتي (Madinty)', 'فرع ديستريكت 5 (District 5)', 'فرع إل بوسكو (IL Bosco)',
    'فرع D2 (Drive 02)', 'فرع قطامية (Katameya)', 'فرع الجولف (NGG Golf)', 'فرع Core WOC', 'فرع Core PH',
    'فرع اسبليت واتر واي (Split Water Way)', 'فرع اسبليت O1 (Split O1)', 'فرع اسبليت نيو جيزة (Split New Giza)',
    'فرع CAC (CAC)', 'فرع أورانج (Orange)'
  ];

  const branchRows = branches.map((b, idx) => ({ id: `br-${idx + 1}`, name: b }));
  const { error: bErr } = await supabase.from('branches').upsert(branchRows);
  if (bErr) console.warn('Branches upload error:', bErr.message);
  else console.log(`✅ Uploaded ${branches.length} Branches to Supabase!`);

  // 2. Upload Manufactured Products (171 items)
  if (fs.existsSync(path.join(__dirname, 'manufactured_products.json'))) {
    const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'manufactured_products.json'), 'utf8'));
    const prodRows = products.map(p => ({
      id: p.id,
      ar: p.ar || p.en,
      en: p.en || p.ar,
      unit: p.unit || 'kg',
      cat: p.cat || 'prep',
      cost: p.cost || 30,
      color: p.color || '#f97316'
    }));
    const { error: pErr } = await supabase.from('products').upsert(prodRows);
    if (pErr) console.warn('Products upload error:', pErr.message);
    else console.log(`✅ Uploaded ${products.length} Products to Supabase!`);
  }

  // 3. Upload Raw Materials & Recipes (139 raw materials + 74 recipes)
  if (fs.existsSync(path.join(__dirname, 'compiled_bom.json'))) {
    const compiled = JSON.parse(fs.readFileSync(path.join(__dirname, 'compiled_bom.json'), 'utf8'));
    const rawIngs = compiled.raw_ings || {};
    const bom = compiled.bom || {};

    const rawRows = Object.entries(rawIngs).map(([id, r]) => ({
      id,
      ar: r.ar || id,
      en: r.en || id,
      uom: r.uom || 'kg',
      price: r.price || 45.0,
      stock: r.stock || 100,
      safety: r.safety || 10,
      sup: r.sup || 'المورد المعتمد'
    }));

    const { error: rErr } = await supabase.from('raw_materials').upsert(rawRows);
    if (rErr) console.warn('Raw materials upload error:', rErr.message);
    else console.log(`✅ Uploaded ${rawRows.length} Raw Materials to Supabase!`);

    const recipeRows = Object.entries(bom).map(([pid]) => ({
      id: `rec-${pid}`,
      product_id: pid,
      title: pid
    }));
    await supabase.from('recipes').upsert(recipeRows);

    const recipeItems = [];
    Object.entries(bom).forEach(([pid, r]) => {
      if (r.ings && Array.isArray(r.ings)) {
        r.ings.forEach(ing => {
          recipeItems.push({
            product_id: pid,
            raw_id: ing.id,
            qty: ing.qty,
            waste: ing.waste || 0
          });
        });
      }
    });

    await supabase.from('recipe_items').delete().neq('id', 0);
    const { error: riErr } = await supabase.from('recipe_items').insert(recipeItems);
    if (riErr) console.warn('Recipe items upload error:', riErr.message);
    else console.log(`✅ Uploaded ${Object.keys(bom).length} Recipes (${recipeItems.length} recipe items) to Supabase!`);
  }

  console.log('🎉 Supabase Dataset Upload Completed Successfully!');
}

seedSupabase();
