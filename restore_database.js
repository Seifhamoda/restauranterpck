const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://ihminamcbstcexsdacys.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlobWluYW1jYnN0Y2V4c2RhY3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5Mjg5MDksImV4cCI6MjEwMzUwNDkwOX0.4i4zO2ygSHdkQULp2Chqz3mxiUYevOjbX537w7uWRrE';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function restoreBackup() {
  const backupFile = path.join(__dirname, 'database_backup.json');
  if (!fs.existsSync(backupFile)) {
    console.error('❌ Backup file database_backup.json not found!');
    return;
  }

  console.log('🔄 Restoring database from backup file...');
  const backup = JSON.parse(fs.readFileSync(backupFile, 'utf8'));

  // 1. Clear current orders & order items
  await supabase.from('order_items').delete().neq('id', 0);
  await supabase.from('orders').delete().neq('id', '');
  await supabase.from('taztiki_records').delete().neq('id', '');

  // 2. Restore Branches
  if (backup.branches && backup.branches.length) {
    await supabase.from('branches').upsert(backup.branches);
  }

  // 3. Restore Products
  if (backup.products && backup.products.length) {
    await supabase.from('products').upsert(backup.products);
  }

  // 4. Restore Raw Materials
  if (backup.raw_materials && backup.raw_materials.length) {
    await supabase.from('raw_materials').upsert(backup.raw_materials);
  }

  // 5. Restore Recipes
  if (backup.recipes && backup.recipes.length) {
    await supabase.from('recipes').upsert(backup.recipes);
  }
  if (backup.recipe_items && backup.recipe_items.length) {
    await supabase.from('recipe_items').delete().neq('id', 0);
    await supabase.from('recipe_items').insert(backup.recipe_items);
  }

  console.log('🎉 Database has been completely restored to the clean snapshot!');
}

restoreBackup();
