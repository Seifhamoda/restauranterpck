/**
 * upload_to_supabase.js
 * ──────────────────────────────────────────────────────────────────────────
 * Central Kitchen ERP — Supabase Cloud Seed Script
 *
 * FIX 2: Cloud Sync & Endpoint Sanitization
 * Root Cause: Table identifiers passed to Supabase REST were being double-
 * encoded (e.g., %22stock%22 instead of stock), producing 404/400 errors.
 *
 * Resolution:
 *  1. All .from('<tableName>') calls now use bare, un-quoted identifiers that
 *     match the lowercase snake_case names in supabase_schema.sql exactly.
 *  2. A sanitizeTableId() guard strips any stray quotes/whitespace before
 *     every REST call — acting as an Open-Closed safety net for future callers.
 *  3. Every async operation is individually awaited with structured error
 *     logging so a single table failure never silently aborts the whole run.
 * ──────────────────────────────────────────────────────────────────────────
 */

'use strict';

const fs   = require('node:fs');
const path = require('node:path');
const { createClient } = require('@supabase/supabase-js');

// ── Supabase Connection ──────────────────────────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL ||
  'https://ihminamcbstcexsdacys.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlobWluYW1jYnN0Y2V4c2RhY3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5Mjg5MDksImV4cCI6MjEwMzUwNDkwOX0.4i4zO2ygSHdkQULp2Chqz3mxiUYevOjbX537w7uWRrE';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── FIX 2: Table Identifier Sanitizer ───────────────────────────────────
/**
 * Strips escaped double-quotes, single-quotes, backticks, and leading/
 * trailing whitespace from a table name to prevent malformed REST URLs
 * like /rest/v1/%22stock%22 (HTTP 404) or /rest/v1/"stock" (HTTP 400).
 *
 * All table names must be lowercase snake_case per supabase_schema.sql.
 *
 * @param  {string} tableName - Raw table name (possibly from dynamic source)
 * @returns {string}          - Clean, safe identifier
 * @throws  {Error}           - If result is empty after sanitization
 */
function sanitizeTableId(tableName) {
  if (typeof tableName !== 'string') {
    throw new TypeError(`[sanitizeTableId] Expected string, got ${typeof tableName}`);
  }
  // Remove escaped quotes (\"), regular quotes ("), single-quotes ('), backticks (`), whitespace
  const clean = tableName
    .replace(/\\"/g, '')   // escaped double-quote
    .replace(/["`']/g, '') // literal quotes
    .trim()
    .toLowerCase();

  if (!clean) {
    throw new Error(`[sanitizeTableId] Table name resolved to empty string from input: "${tableName}"`);
  }
  // Validate: only allow lowercase letters, digits, underscores (PostgreSQL convention)
  if (!/^[a-z_][a-z0-9_]*$/.test(clean)) {
    throw new Error(`[sanitizeTableId] Invalid PostgreSQL identifier: "${clean}"`);
  }
  return clean;
}

/**
 * Safe Supabase upsert wrapper.
 * Sanitizes the table name before every call and provides structured logging.
 *
 * @param {string} rawTable  - Table name (sanitized internally)
 * @param {Array}  rows      - Array of row objects matching supabase_schema.sql
 * @param {string} [conflict='id'] - Column name for upsert conflict resolution
 */
async function safeUpsert(rawTable, rows, conflict = 'id') {
  const table = sanitizeTableId(rawTable);

  if (!Array.isArray(rows) || rows.length === 0) {
    console.log(`⏭️  Skipping ${table}: no rows to upsert.`);
    return;
  }

  const { error } = await supabase
    .from(table)
    .upsert(rows, { onConflict: conflict });

  if (error) {
    console.error(`❌ [${table}] Upsert failed (${error.code}): ${error.message}`);
    // Surface full details for debugging malformed identifiers
    if (error.details) console.error(`   Details: ${error.details}`);
  } else {
    console.log(`✅ [${table}] Upserted ${rows.length} row(s) successfully.`);
  }
}

// ── Main Seed Function ───────────────────────────────────────────────────
async function seedSupabase() {
  console.log('\n🚀 Connecting to Supabase and uploading ERP dataset...\n');

  // ── 1. Branches (26 branches) ──────────────────────────────────────────
  const branchNames = [
    'فرع واتر واي (Water Way)', 'فرع أب تاون (Uptown)', 'فرع O1 (O1)', 'فرع المعادي (The Field)',
    'فرع ميفيدا (Mivida)', 'فرع سوديك (Sodic)', 'فرع نيو جيزة (New Giza)', 'فرع نادي نيو جيزة (New Giza Club)',
    'فرع بارك ستريت (Park St)', 'فرع مول العرب (Mall of Arabia)', 'فرع بالم هيلز (Palm Hills)', 'فرع كود (Kode)',
    'فرع دهشور (Dahshour)', 'فرع مدينتي (Madinty)', 'فرع ديستريكت 5 (District 5)', 'فرع إل بوسكو (IL Bosco)',
    'فرع D2 (Drive 02)', 'فرع قطامية (Katameya)', 'فرع الجولف (NGG Golf)', 'فرع Core WOC', 'فرع Core PH',
    'فرع اسبليت واتر واي (Split Water Way)', 'فرع اسبليت O1 (Split O1)', 'فرع اسبليت نيو جيزة (Split New Giza)',
    'فرع CAC (CAC)', 'فرع أورانج (Orange)'
  ];
  const branchRows = branchNames.map((name, idx) => ({ id: `br-${idx + 1}`, name }));
  await safeUpsert('branches', branchRows);

  // ── 2. Manufactured Products ───────────────────────────────────────────
  const prodFile = path.join(__dirname, 'manufactured_products.json');
  if (fs.existsSync(prodFile)) {
    const products = JSON.parse(fs.readFileSync(prodFile, 'utf8'));
    const prodRows = products.map(p => ({
      id:    p.id,
      ar:    p.ar  || p.en  || '',
      en:    p.en  || p.ar  || '',
      unit:  p.unit  || 'kg',
      cat:   p.cat   || 'prep',
      cost:  p.cost  || 30,
      color: p.color || '#f97316'
    }));
    await safeUpsert('products', prodRows);
  } else {
    console.warn('⚠️  manufactured_products.json not found — skipping products upload.');
  }

  // ── 3. Raw Materials & BOM Recipes ────────────────────────────────────
  const bomFile = path.join(__dirname, 'compiled_bom.json');
  if (fs.existsSync(bomFile)) {
    const compiled  = JSON.parse(fs.readFileSync(bomFile, 'utf8'));
    const rawIngs   = compiled.raw_ings || {};
    const bom       = compiled.bom       || {};

    // 3a. Raw Materials — must match raw_materials table in supabase_schema.sql
    const rawRows = Object.entries(rawIngs).map(([id, r]) => ({
      id,
      ar:     r.ar     || id,
      en:     r.en     || id,
      uom:    r.uom    || 'kg',
      price:  r.price  || 45.0,
      stock:  r.stock  || 100,
      safety: r.safety || 10,
      sup:    r.sup    || 'المورد المعتمد'
    }));
    await safeUpsert('raw_materials', rawRows);

    // 3b. Recipe headers — must match recipes table
    const recipeHeaderRows = Object.entries(bom).map(([pid]) => ({
      id:         `rec-${pid}`,
      product_id: pid,
      title:      pid
    }));
    await safeUpsert('recipes', recipeHeaderRows);

    // 3c. Recipe items — must match recipe_items table (BIGSERIAL PK, no id in upsert)
    // Delete-then-insert to avoid stale BOM lines (recipe_items has no natural key)
    const recipeItems = [];
    Object.entries(bom).forEach(([pid, r]) => {
      if (r.ings && Array.isArray(r.ings)) {
        r.ings.forEach(ing => {
          recipeItems.push({
            product_id: pid,
            raw_id:     ing.id,
            qty:        ing.qty,
            waste:      ing.waste || 0
          });
        });
      }
    });

    if (recipeItems.length > 0) {
      // Truncate stale items first — table name is sanitized
      const cleanTable = sanitizeTableId('recipe_items');
      const { error: delErr } = await supabase
        .from(cleanTable)
        .delete()
        .gt('id', 0); // matches all rows (BIGSERIAL id is always > 0)

      if (delErr) {
        console.error(`❌ [recipe_items] Delete failed: ${delErr.message}`);
      } else {
        const { error: insErr } = await supabase
          .from(cleanTable)
          .insert(recipeItems);

        if (insErr) {
          console.error(`❌ [recipe_items] Insert failed (${insErr.code}): ${insErr.message}`);
        } else {
          console.log(`✅ [recipe_items] Inserted ${recipeItems.length} BOM lines for ${Object.keys(bom).length} recipes.`);
        }
      }
    }
  } else {
    console.warn('⚠️  compiled_bom.json not found — skipping raw materials & recipe upload.');
  }

  console.log('\n🎉 Supabase Dataset Upload Completed!\n');
}

// Run
seedSupabase().catch(err => {
  console.error('💥 Fatal error in seedSupabase():', err);
  process.exit(1);
});
