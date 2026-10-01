// Delete all old text-based (non-numeric) raw_materials from Supabase
// and also any records not in our official 198-item catalog

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = 'https://sxqkdlonlmneztpzxouo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4cWtkbG9ubG1uZXp0cHp4b3VvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzM0ODg2MCwiZXhwIjoyMDY4OTI0ODYwfQ.mrJ12e4mcT3LaObGv4p9W5q0F5mvH4UeVGfSbZkF9v8';

const client = createClient(SUPABASE_URL, SUPABASE_KEY);

// Load our official 198-item catalog
const raws = JSON.parse(fs.readFileSync('master_raw_materials.json', 'utf8'));
const officialIds = new Set(raws.map(r => r.id)); // e.g. "raw-105049"

console.log('Official catalog IDs count:', officialIds.size);

async function cleanSupabase() {
  // Get ALL records from Supabase
  const { data, error } = await client.from('raw_materials').select('id, ar, en');
  if (error) { console.error('Error fetching:', error); return; }
  
  console.log('Total records in Supabase raw_materials:', data.length);
  
  // Find old/unknown records
  const toDelete = data.filter(r => !officialIds.has(r.id));
  const toKeep = data.filter(r => officialIds.has(r.id));
  
  console.log('✅ Records matching official catalog:', toKeep.length);
  console.log('❌ Old/unknown records to DELETE:', toDelete.length);
  
  if (toDelete.length > 0) {
    console.log('\nRecords that will be DELETED:');
    toDelete.forEach(r => console.log('  -', r.id, '|', r.en || r.ar));
    
    // Delete them
    const idsToDelete = toDelete.map(r => r.id);
    const { error: delErr } = await client
      .from('raw_materials')
      .delete()
      .in('id', idsToDelete);
    
    if (delErr) {
      console.error('Delete error:', delErr);
    } else {
      console.log('\n✅ Deleted', idsToDelete.length, 'old records from Supabase!');
    }
  } else {
    console.log('\n✅ Supabase is already clean - no old records to delete!');
  }
  
  // Verify final count
  const { data: final } = await client.from('raw_materials').select('id', { count: 'exact' });
  console.log('\nFinal count in Supabase raw_materials:', final ? final.length : 'error');
}

cleanSupabase();
