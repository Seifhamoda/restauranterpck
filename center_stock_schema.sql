-- ================================================
-- CENTER KITCHEN STOCK — Supabase Schema Extension
-- Run this in your Supabase SQL Editor
-- ================================================

-- 1. Center Stock Table (current stock per product)
CREATE TABLE IF NOT EXISTS center_stock (
  product_id TEXT PRIMARY KEY,
  qty NUMERIC NOT NULL DEFAULT 0,
  uom TEXT NOT NULL DEFAULT 'Kg',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Center Stock Movement Log (full history)
CREATE TABLE IF NOT EXISTS center_stock_log (
  id BIGSERIAL PRIMARY KEY,
  product_id TEXT NOT NULL,
  qty_change NUMERIC NOT NULL,
  action TEXT NOT NULL,  -- 'production' | 'branch_pull' | 'adjustment'
  branch TEXT,
  ref_order_id TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security
ALTER TABLE center_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE center_stock_log ENABLE ROW LEVEL SECURITY;

-- Allow public access (same as other tables)
CREATE POLICY "Allow public all access on center_stock"
  ON center_stock FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public all access on center_stock_log"
  ON center_stock_log FOR ALL USING (true) WITH CHECK (true);

-- Index for faster log queries
CREATE INDEX IF NOT EXISTS idx_csl_product_id ON center_stock_log(product_id);
CREATE INDEX IF NOT EXISTS idx_csl_action ON center_stock_log(action);
CREATE INDEX IF NOT EXISTS idx_csl_created_at ON center_stock_log(created_at DESC);

SELECT 'Center Kitchen Stock tables created successfully!' AS status;
