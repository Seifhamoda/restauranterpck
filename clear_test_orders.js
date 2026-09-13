const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://ihminamcbstcexsdacys.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlobWluYW1jYnN0Y2V4c2RhY3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5Mjg5MDksImV4cCI6MjEwMzUwNDkwOX0.4i4zO2ygSHdkQULp2Chqz3mxiUYevOjbX537w7uWRrE';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function clearTestOrders() {
  console.log('🧹 Clearing all test orders and branch movements...');
  await supabase.from('order_items').delete().neq('id', 0);
  await supabase.from('orders').delete().neq('id', '');
  await supabase.from('taztiki_records').delete().neq('id', '');
  await supabase.from('stock_movements').delete().neq('id', 0);
  console.log('✅ All test orders cleared! Database is clean.');
}

clearTestOrders();
