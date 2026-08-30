-- ═══════════════════════════════════════════════════════════════
-- COMMUNITY RESTAURANTS — CENTRAL KITCHEN ERP SUPABASE SCHEMA
-- ═══════════════════════════════════════════════════════════════

-- 1. Branches Table (الفروع ومراكز التكلفة)
CREATE TABLE IF NOT EXISTS branches (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Products Table (المنتجات المصنعة)
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  ar TEXT NOT NULL,
  en TEXT NOT NULL,
  unit TEXT NOT NULL,
  cat TEXT NOT NULL,
  cost NUMERIC NOT NULL,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Raw Materials Table (الخامات الرئيسية)
CREATE TABLE IF NOT EXISTS raw_materials (
  id TEXT PRIMARY KEY,
  ar TEXT NOT NULL,
  en TEXT NOT NULL,
  uom TEXT NOT NULL,
  price NUMERIC NOT NULL,
  stock NUMERIC NOT NULL DEFAULT 0,
  safety NUMERIC NOT NULL DEFAULT 10,
  sup TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Recipes Table (الوصفات)
CREATE TABLE IF NOT EXISTS recipes (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL UNIQUE,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Recipe Items Table (مكونات الوصفات ومعايير الأوزان)
CREATE TABLE IF NOT EXISTS recipe_items (
  id BIGSERIAL PRIMARY KEY,
  product_id TEXT NOT NULL,
  raw_id TEXT NOT NULL,
  qty NUMERIC NOT NULL,
  waste NUMERIC NOT NULL DEFAULT 0
);

-- 6. Orders Table (طلبيات الفروع)
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  branch TEXT NOT NULL,
  order_date TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. Order Items Table (بنود الطلبيات)
CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  qty NUMERIC NOT NULL
);

-- 8. Burger Sauce / Taztiki Records (سجل تشغيلات صوص البرجر)
CREATE TABLE IF NOT EXISTS taztiki_records (
  id TEXT PRIMARY KEY,
  order_date TEXT NOT NULL,
  branch TEXT NOT NULL,
  qty NUMERIC NOT NULL,
  type TEXT DEFAULT 'out',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 9. Purchase Orders (أوامر الشراء)
CREATE TABLE IF NOT EXISTS purchase_orders (
  id TEXT PRIMARY KEY,
  ing_id TEXT NOT NULL,
  qty NUMERIC NOT NULL,
  unit TEXT,
  cost NUMERIC NOT NULL,
  sup TEXT,
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 10. Invoices (فواتير الموردين)
CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY,
  po_id TEXT,
  ing_id TEXT NOT NULL,
  qty NUMERIC NOT NULL,
  unit TEXT,
  value NUMERIC NOT NULL,
  sup TEXT,
  payment TEXT DEFAULT 'unpaid',
  notes TEXT,
  inv_date TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 11. Stock Movements (سجل حركات سحب وإضافة المخزون)
CREATE TABLE IF NOT EXISTS stock_movements (
  id BIGSERIAL PRIMARY KEY,
  ing_id TEXT NOT NULL,
  change_qty NUMERIC NOT NULL,
  reason TEXT,
  ref_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Public Access for Anon Key
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE raw_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE taztiki_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public all access on branches" ON branches FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on raw_materials" ON raw_materials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on recipes" ON recipes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on recipe_items" ON recipe_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on order_items" ON order_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on taztiki_records" ON taztiki_records FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on purchase_orders" ON purchase_orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on invoices" ON invoices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on stock_movements" ON stock_movements FOR ALL USING (true) WITH CHECK (true);
