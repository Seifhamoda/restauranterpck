const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://ihminamcbstcexsdacys.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlobWluYW1jYnN0Y2V4c2RhY3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5Mjg5MDksImV4cCI6MjEwMzUwNDkwOX0.4i4zO2ygSHdkQULp2Chqz3mxiUYevOjbX537w7uWRrE';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function exportBackup() {
  console.log('💾 Creating full backup from Supabase Cloud...');
  const backup = {
    timestamp: new Date().toISOString(),
    branches: (await supabase.from('branches').select('*')).data || [],
    products: (await supabase.from('products').select('*')).data || [],
    raw_materials: (await supabase.from('raw_materials').select('*')).data || [],
    recipes: (await supabase.from('recipes').select('*')).data || [],
    recipe_items: (await supabase.from('recipe_items').select('*')).data || [],
    orders: (await supabase.from('orders').select('*')).data || [],
    order_items: (await supabase.from('order_items').select('*')).data || [],
    taztiki_records: (await supabase.from('taztiki_records').select('*')).data || []
  };

  const backupPath = path.join(__dirname, 'database_backup.json');
  fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2), 'utf8');
  console.log(`✅ Full backup saved successfully to database_backup.json!`);
  console.log(`📊 Summary: ${backup.branches.length} Branches, ${backup.products.length} Products, ${backup.raw_materials.length} Materials, ${backup.orders.length} Orders.`);
}

exportBackup();
