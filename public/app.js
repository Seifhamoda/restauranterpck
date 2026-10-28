// ============================================================
// GLOBAL FETCH INTERCEPTOR (SECURITY & AUTHENTICATION)
// ============================================================
const originalFetch = window.fetch;
window.fetch = async function(url, options = {}) {
  options.credentials = options.credentials || 'same-origin';
  options.headers = {
    ...(options.headers || {}),
    /* Session-based auth: X-Requested-With removed */
  };
  const response = await originalFetch(url, options);
  if (response.status === 401 && typeof url === 'string' && url.includes('/api/') && !url.includes('/api/auth/')) {
    if (typeof showLoginModal === 'function') {
      showLoginModal('Session expired or authentication required');
    }
  }
  return response;
};


    (function () {
      try {
        const theme = localStorage.getItem('theme') || 'dark';
        localStorage.setItem('theme', 'dark');
        localStorage.setItem('erp_theme', 'dark');
        if (true) {
          document.documentElement.classList.add('dark');
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.removeAttribute('data-theme');
        }
      } catch (e) { }
    })();
  

// ── SCRIPT SEGMENT BREAK ──


      /* ============================================================
         GLOBAL APPLICATION STATE
      ============================================================ */
            const S = {
        centerStock: {},
        centerStockLog: [],
        lang: 'en',
        sbCol: false,
        curPage: 'dashboard',
        curRecipe: 'prod-classic-burger-kit',
        POs: [],
        branches: [
          'Downtown Central Kitchen',
          'Westside Hub',
          'Eastside Flagship',
          'North Coast Express'
        ],
        /* ── Central Kitchen Manufactured Products (Demo Catalog) ── */
        products: [
          {
            id: 'prod-classic-burger-kit',
            code: 'CK-PRD-001',
            item_no: 'CK-PRD-001',
            ar: 'Classic Gourmet Burger Kit',
            en: 'Classic Gourmet Burger Kit',
            unit: 'Portion',
            cat: 'beef',
            cost: 62.50,
            color: '#eab308',
            stock: 150.0
          },
          {
            id: 'prod-crispy-chicken-fillet',
            code: 'CK-PRD-002',
            item_no: 'CK-PRD-002',
            ar: 'Marinated Crispy Chicken Fillet',
            en: 'Marinated Crispy Chicken Fillet',
            unit: 'Portion',
            cat: 'chicken',
            cost: 46.00,
            color: '#10b981',
            stock: 120.0
          },
          {
            id: 'prod-signature-house-sauce',
            code: 'CK-PRD-003',
            item_no: 'CK-PRD-003',
            ar: 'Signature Central House Sauce',
            en: 'Signature Central House Sauce',
            unit: 'kg',
            cat: 'sauce',
            cost: 54.00,
            color: '#ef4444',
            stock: 80.0
          },
          {
            id: 'prod-gourmet-loaded-fries',
            code: 'CK-PRD-004',
            item_no: 'CK-PRD-004',
            ar: 'Gourmet Seasoned Cheddar Fries',
            en: 'Gourmet Seasoned Cheddar Fries',
            unit: 'Portion',
            cat: 'sides',
            cost: 32.00,
            color: '#8b5cf6',
            stock: 200.0
          },
          {
            id: 'prod-smoky-bbq-burger-kit',
            code: 'CK-PRD-005',
            item_no: 'CK-PRD-005',
            ar: 'Smoky BBQ Bacon Burger Kit',
            en: 'Smoky BBQ Bacon Burger Kit',
            unit: 'Portion',
            cat: 'beef',
            cost: 74.00,
            color: '#06b6d4',
            stock: 90.0
          }
        ],
        /* ── Raw Ingredients & Semi-Finished Items (Demo Inventory) ── */
        ings: {
          'raw-beef-patty': {
            code: 'RAW-001',
            ar: 'Premium Ground Beef Patty Mix (80/20)',
            en: 'Premium Ground Beef Patty Mix (80/20)',
            uom: 'kg',
            cat: 'Meat & Poultry',
            price: 320.00,
            stock: 35.0,
            safety: 80.0,
            sup: 'National Quality Meats'
          },
          'raw-chicken-breast': {
            code: 'RAW-002',
            ar: 'Fresh Boneless Chicken Breasts',
            en: 'Fresh Boneless Chicken Breasts',
            uom: 'kg',
            cat: 'Meat & Poultry',
            price: 165.00,
            stock: 140.0,
            safety: 60.0,
            sup: 'Prime Poultry Farms'
          },
          'raw-cheddar-cheese': {
            code: 'RAW-003',
            ar: 'Aged Red Cheddar Cheese Blocks',
            en: 'Aged Red Cheddar Cheese Blocks',
            uom: 'kg',
            cat: 'Dairy & Cheese',
            price: 280.00,
            stock: 18.0,
            safety: 35.0,
            sup: 'Artisan Dairy Suppliers'
          },
          'raw-brioche-buns': {
            code: 'RAW-004',
            ar: 'Artisan Brioche Burger Buns',
            en: 'Artisan Brioche Burger Buns',
            uom: 'pcs',
            cat: 'Bakery',
            price: 8.50,
            stock: 950.0,
            safety: 400.0,
            sup: 'Smart Central Bakery'
          },
          'raw-mayo-base': {
            code: 'RAW-005',
            ar: 'Heavy Gourmet Mayonnaise Base',
            en: 'Heavy Gourmet Mayonnaise Base',
            uom: 'kg',
            cat: 'Dry Goods & Oils',
            price: 75.00,
            stock: 15.0,
            safety: 30.0,
            sup: 'Specialty Sauce & Oils Co.'
          },
          'raw-dill-pickles': {
            code: 'RAW-006',
            ar: 'Crispy Sliced Dill Pickles',
            en: 'Crispy Sliced Dill Pickles',
            uom: 'kg',
            cat: 'Produce & Canned',
            price: 45.00,
            stock: 85.0,
            safety: 40.0,
            sup: 'Valley Pickling Co.'
          },
          'raw-potatoes': {
            code: 'RAW-007',
            ar: 'Grade-A Frozen French Fries Cut',
            en: 'Grade-A Frozen French Fries Cut',
            uom: 'kg',
            cat: 'Frozen & Produce',
            price: 32.00,
            stock: 420.0,
            safety: 150.0,
            sup: 'Cold Harvest Logistics'
          },
          'raw-secret-spices': {
            code: 'RAW-008',
            ar: 'Signature Master Seasoning Blend',
            en: 'Signature Master Seasoning Blend',
            uom: 'kg',
            cat: 'Spices & Seasoning',
            price: 210.00,
            stock: 6.5,
            safety: 20.0,
            sup: 'Global Spice Mills'
          },
          'semi-caramelized-onions': {
            code: 'RAW-009',
            ar: 'Prepared Caramelized Sweet Onions',
            en: 'Prepared Caramelized Sweet Onions',
            uom: 'kg',
            cat: 'Prepared Prep',
            price: 65.00,
            stock: 75.0,
            safety: 30.0,
            sup: 'Prep Kitchen Unit A'
          },
          'semi-smoky-bbq': {
            code: 'RAW-010',
            ar: 'Smoky Glaze BBQ Base Sauce',
            en: 'Smoky Glaze BBQ Base Sauce',
            uom: 'kg',
            cat: 'Prepared Prep',
            price: 95.00,
            stock: 12.0,
            safety: 25.0,
            sup: 'Sauce Emulsion Unit B'
          }
        },
        /* ── Central Kitchen BOM (Demo Recipes) ── */
        recipes: {
          'prod-classic-burger-kit': {
            ings: [
              { id: 'raw-beef-patty', qty: 0.15, waste: 0.02 },
              { id: 'raw-brioche-buns', qty: 1.0, waste: 0.0 },
              { id: 'raw-cheddar-cheese', qty: 0.03, waste: 0.01 },
              { id: 'raw-dill-pickles', qty: 0.02, waste: 0.01 }
            ]
          },
          'prod-crispy-chicken-fillet': {
            ings: [
              { id: 'raw-chicken-breast', qty: 0.18, waste: 0.03 },
              { id: 'raw-secret-spices', qty: 0.015, waste: 0.005 }
            ]
          },
          'prod-signature-house-sauce': {
            ings: [
              { id: 'raw-mayo-base', qty: 0.65, waste: 0.02 },
              { id: 'semi-smoky-bbq', qty: 0.25, waste: 0.01 },
              { id: 'raw-secret-spices', qty: 0.08, waste: 0.01 },
              { id: 'raw-dill-pickles', qty: 0.05, waste: 0.01 }
            ]
          },
          'prod-gourmet-loaded-fries': {
            ings: [
              { id: 'raw-potatoes', qty: 0.25, waste: 0.03 },
              { id: 'raw-cheddar-cheese', qty: 0.04, waste: 0.01 },
              { id: 'semi-caramelized-onions', qty: 0.03, waste: 0.01 }
            ]
          },
          'prod-smoky-bbq-burger-kit': {
            ings: [
              { id: 'raw-beef-patty', qty: 0.18, waste: 0.02 },
              { id: 'raw-brioche-buns', qty: 1.0, waste: 0.0 },
              { id: 'semi-caramelized-onions', qty: 0.04, waste: 0.01 },
              { id: 'semi-smoky-bbq', qty: 0.03, waste: 0.01 }
            ]
          }
        },
        orders: []
      };

      /* Helper functions */
      function normalizeDateIso(val) {
        if (!val) return todayStr();
        if (typeof val === 'number') {
          const d = new Date(Math.round((val - 25569) * 86400 * 1000));
          if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
        }
        const s = String(val).trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
        const mdy = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
        if (mdy) {
          const m = mdy[1].padStart(2, '0');
          const d = mdy[2].padStart(2, '0');
          const y = mdy[3];
          return `${y}-${m}-${d}`;
        }
        const parsed = new Date(s);
        if (!isNaN(parsed.getTime())) {
          return parsed.toISOString().slice(0, 10);
        }
        return todayStr();
      }

      function todayStr() {
        return new Date().toISOString().split('T')[0];
      }
      function fmt(v, maxDec = 1) {
        return (+v || 0).toLocaleString('en-US', { maximumFractionDigits: maxDec });
      }
      function f2(v) {
        return (+v || 0).toFixed(2);
      }

      /* ============================================================
         LOCAL STORAGE & SQLITE API SYNC (WHITE-LABEL V5)
      ============================================================ */
      const LS_KEY = 'ck-erp-v5-whitelabel';
      // Self-healing: purge all legacy cache keys that contained stale or proprietary data
      try {
        ['ck-erp-v1', 'ck-erp-v2', 'ck-erp-v3', 'ck-erp-v4', 'erp_state', 'ck_erp_orders'].forEach(k => {
          localStorage.removeItem(k);
        });
      } catch (e) { }

      // Toggleable SQL Sync Flag (Allows pausing SQL completely for safe local testing)
      let SQL_SYNC_ENABLED = localStorage.getItem('ck_sql_sync_enabled') !== 'false';

      function updateSqlSyncBadge() {
        const badge = document.getElementById('sql-sync-badge');
        if (!badge) return;
        if (!SQL_SYNC_ENABLED) {
          badge.className = 'badge badge-amber cursor-pointer';
          badge.style.background = 'rgba(245,158,11,0.18)';
          badge.style.borderColor = 'rgba(245,158,11,0.4)';
          badge.style.color = '#fbbf24';
          badge.style.cursor = 'pointer';
          badge.title = 'Click to resume live SQL sync';
          badge.innerHTML = '🧪 <span>' + 'Sandbox (SQL Paused)' + '</span>';
        } else {
          badge.className = 'badge badge-green cursor-pointer';
          badge.style.background = 'rgba(34,197,94,0.15)';
          badge.style.borderColor = 'rgba(34,197,94,0.35)';
          badge.style.color = '#4ade80';
          badge.style.cursor = 'pointer';
          badge.title = 'Database Connected & Synced';
          badge.innerHTML = '<span style="width:6px;height:6px;border-radius:50%;background:#4ade80;display:inline-block"></span> ⚡ <span>' + 'SQL DB Connected' + '</span>';
        }
      }

      function toggleSqlSync() {
        SQL_SYNC_ENABLED = !SQL_SYNC_ENABLED;
        localStorage.setItem('ck_sql_sync_enabled', SQL_SYNC_ENABLED ? 'true' : 'false');
        updateSqlSyncBadge();
        if (SQL_SYNC_ENABLED) {
          toast('Live SQL Sync RESUMED!', 'success');
          syncFromSQL().then(() => {
            renderDash();
            renderOrders();
            renderInv();
            renderRecipes();
            if (typeof updateStockHealthDial === 'function') updateStockHealthDial();
            if (typeof renderProd === 'function') renderProd();
          });
        } else {
          toast('SQL PAUSED: Sandbox mode active (zero DB writes)', 'warning');
        }
      }

      async function syncFromSQL() {
        updateSqlSyncBadge();
        if (!SQL_SYNC_ENABLED) {
          console.log('🧪 SQL Sync is currently paused. Running in local sandbox mode.');
          return false;
        }
        try {
          const res = await fetch('/api/state');
          if (res.ok) {
            const data = await res.json();
            if (data.success) {
              if (Array.isArray(data.branches) && data.branches.length) {
                S.branches = data.branches;
              }
              if (Array.isArray(data.products) && data.products.length) {
                S.products = data.products;
              }
              if (data.ings && typeof data.ings === 'object' && Object.keys(data.ings).length) {
                S.ings = data.ings;
              }
              if (data.recipes && typeof data.recipes === 'object' && Object.keys(data.recipes).length) {
                S.recipes = data.recipes;
              }
              if (Array.isArray(data.orders)) {
                S.orders = data.orders;
              }
              if (Array.isArray(data.taztikiRecords)) {
                S.taztikiRecords = data.taztikiRecords;
              }
              if (Array.isArray(data.POs)) {
                S.POs = data.POs;
              }
              if (Array.isArray(data.invoices)) {
                S.invoices = data.invoices;
              }
              saveState();
              updateSqlSyncBadge();
              return true;
            }
          }
        } catch (err) {
          console.warn('Sync from /api/state fallback:', err);
        }
        return false;
      }

      async function apiSaveOrders(ordersList, replaceDates = []) {
        if (!SQL_SYNC_ENABLED) return;
        try {
          await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orders: ordersList, replaceDates })
          });
        } catch (e) { console.warn('apiSaveOrders error:', e); }
      }

      async function apiDeleteOrder(orderId) {
        if (!SQL_SYNC_ENABLED) return;
        try {
          await fetch('/api/orders/' + encodeURIComponent(orderId), { method: 'DELETE' });
        } catch (e) { console.warn('apiDeleteOrder error:', e); }
      }

      async function apiDeleteOrdersForDate(dateStr) {
        if (!SQL_SYNC_ENABLED) return;
        try {
          await fetch('/api/orders/date/' + encodeURIComponent(dateStr), { method: 'DELETE' });
        } catch (e) { console.warn('apiDeleteOrdersForDate error:', e); }
      }

      async function apiClearAllOrders() {
        if (!SQL_SYNC_ENABLED) return;
        try {
          await fetch('/api/orders', { method: 'DELETE' });
        } catch (e) { console.warn('apiClearAllOrders error:', e); }
      }

      async function apiBatchDeduct(productId, batchQty, deductions) {
        if (!SQL_SYNC_ENABLED) return;
        try {
          await fetch('/api/batch-deduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, batchQty, deductions })
          });
        } catch (e) { console.warn('apiBatchDeduct error:', e); }
      }

      async function apiUpdateRawStock(id, stock, safety, price) {
        if (!SQL_SYNC_ENABLED) return;
        try {
          await fetch('/api/raw-materials/' + encodeURIComponent(id), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stock, safety, price })
          });
        } catch (e) { console.warn('apiUpdateRawStock error:', e); }
      }

      async function apiAddRawMaterial(rawObj) {
        try {
          await fetch('/api/raw-materials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rawObj)
          });
        } catch (e) { console.warn('apiAddRawMaterial error:', e); }
      }

            function saveState() {
        try {
          const data = {
            orders: S.orders,
            POs: S.POs,
            invoices: S.invoices || [],
            wastes: S.wastes || [],
            ings: S.ings,
            products: S.products,
            recipes: S.recipes,
            taztikiRecords: S.taztikiRecords || [],
            centerStock: S.centerStock || {},
            centerStockLog: S.centerStockLog || []
          };
          localStorage.setItem(LS_KEY, JSON.stringify(data));
        } catch (e) { console.warn('saveState failed:', e); }
      }

      function loadState() {
        try {
          const raw = localStorage.getItem(LS_KEY);
          if (!raw) return false;
          const data = JSON.parse(raw);
          if (data.orders !== undefined && Array.isArray(data.orders)) S.orders = data.orders;
          if (data.POs !== undefined && Array.isArray(data.POs)) S.POs = data.POs;
          if (data.invoices !== undefined && Array.isArray(data.invoices)) S.invoices = data.invoices;
          if (data.wastes !== undefined && Array.isArray(data.wastes)) S.wastes = data.wastes;
          if (data.centerStock && typeof data.centerStock === 'object') {
            S.centerStock = data.centerStock;
          }
          if (data.centerStockLog && Array.isArray(data.centerStockLog)) {
            S.centerStockLog = data.centerStockLog;
          }
          if (data.taztikiRecords !== undefined && Array.isArray(data.taztikiRecords)) S.taztikiRecords = data.taztikiRecords;

          // Smart merge for raw ingredients: adopt custom stock/price ONLY for official catalog items
          if (data.ings && typeof data.ings === 'object') {
            Object.entries(data.ings).forEach(([iid, idata]) => {
              if (S.ings[iid]) {
                if (idata.stock !== undefined) S.ings[iid].stock = idata.stock;
                if (idata.price !== undefined) S.ings[iid].price = idata.price;
              }
              // CRITICAL: NEVER resurrect old/deleted items into S.ings!
            });
          }

          // Smart merge for recipes: keep all 74 master recipes
          if (data.recipes && typeof data.recipes === 'object') {
            Object.entries(data.recipes).forEach(([pid, rdata]) => {
              if (!S.recipes[pid] || (rdata.ings && rdata.ings.length)) {
                S.recipes[pid] = rdata;
              }
            });
          }

          // Preserve product custom costs
          if (data.products !== undefined && Array.isArray(data.products)) {
            const costMap = {};
            data.products.forEach(p => { if (p && p.id) costMap[p.id] = p.cost; });
            S.products.forEach(p => {
              if (costMap[p.id] !== undefined) p.cost = costMap[p.id];
            });
          }
          return true;
        } catch (e) { console.warn('loadState failed:', e); return false; }
      }

      function clearAllData() {
        if (!confirm('Are you sure you want to clear all saved data? This cannot be undone!')) return;
        localStorage.removeItem(LS_KEY);
        location.reload();
      }
      function isAr() {
        return false;
      }
      function T(a, e) {
        return (e !== undefined) ? e : a;
      }
      function pname(p) {
        if (!p) return '';
        if (typeof p === 'string') return p;
        return p.en || p.ar || '';
      }
      function iname(id) {
        const d = S.ings[id];
        return d ? (d.en || d.ar || id) : id;
      }
      function cur() {
        return '$';
      }

      /* ============================================================
         LANGUAGE SWITCHING
      ============================================================ */
      function toWesternDigits(str) {
        if (str === null || str === undefined) return '';
        return String(str)
          .replace(/[\u0660-\u0669]/g, d => String.fromCharCode(d.charCodeAt(0) - 0x0660 + 48))
          .replace(/[\u06F0-\u06F9]/g, d => String.fromCharCode(d.charCodeAt(0) - 0x06F0 + 48));
      }

      function applyLang() {
        const root = document.getElementById('html-root');
        root.setAttribute('lang', 'en');
        root.setAttribute('dir', 'ltr');

        // 1. Text translations on all [data-ar] elements
        document.querySelectorAll('[data-ar]').forEach(el => {
          el.textContent = isAr() ? el.getAttribute('data-ar') : el.getAttribute('data-en');
        });

        // 2. Placeholder translations
        document.querySelectorAll('[data-ar-ph]').forEach(el => {
          el.setAttribute('placeholder', isAr() ? el.getAttribute('data-ar-ph') : el.getAttribute('data-en-ph'));
        });

        // 3. Topbar Search Input placeholder
        const searchPlaceholder = document.querySelector('.search-placeholder');
        if (searchPlaceholder) {
          searchPlaceholder.textContent = 'Search 88 products, 200 raw items, purchase orders...';
        }

        // 4. Header and Hero date
        const hdrDate = document.getElementById('hdr-date');
        if (hdrDate) {
          hdrDate.textContent = toWesternDigits(new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }));
        }
        const heroDateText = document.getElementById('hero-date-text');
        if (heroDateText) {
          heroDateText.textContent = toWesternDigits(new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
        }

        // 5. Dock tooltips translation
        const DOCK_TITLES = {
          welcome: { ar: '', en: '0. Welcome Hub' },
          dashboard: { ar: '', en: '1. Executive Dashboard' },
          orders: { ar: '', en: '2. Branch Orders' },
          production: { ar: '', en: '3. Production & BOM Plan' },
          centerstock: { ar: '', en: '4. Finished Center Stock' },
          inventory: { ar: '', en: '5. Raw Inventory (200 Items)' },
          purchase: { ar: '', en: '6. Purchase Orders' },
          recipes: { ar: '', en: '7. 74 BOM Recipes Catalog' },
          waste: { ar: '', en: '8. Waste & Loss Ledger' },
          reports: { ar: '', en: '9. Analytics & Matrix Reports' }
        };
        document.querySelectorAll('.sidebar .nav-item[data-page], .curved-dock .nav-item[data-page]').forEach(el => {
          const p = el.getAttribute('data-page');
          if (DOCK_TITLES[p]) {
            el.setAttribute('title', isAr() ? DOCK_TITLES[p].ar : DOCK_TITLES[p].en);
          }
        });

        // 6. Topbar segmented tabs text sync
        const tabWelc = document.querySelector('#tab-welc span:last-child');
        if (tabWelc) tabWelc.textContent = 'Welcome Hub';
        const tabDash = document.querySelector('#tab-dash span:last-child');
        if (tabDash) tabDash.textContent = 'Dashboard';
        const tabWork = document.querySelector('#tab-work span:last-child');
        if (tabWork) tabWork.textContent = 'Workflows';
        const tabInteg = document.querySelector('#tab-integ span:last-child');
        if (tabInteg) tabInteg.textContent = 'Integrations';

        // 7. Language toggle button label
        const sideLangLbl = document.getElementById('sidebar-lang-lbl');
        if (sideLangLbl) sideLangLbl.textContent = 'Language: English';
        const topLangText = document.getElementById('topbar-lang-text');
        if (topLangText) topLangText.textContent = 'English';

        // 8. Notifications dropdown translations
        const notifCountBadge = document.getElementById('notif-count-badge');
        if (notifCountBadge) notifCountBadge.textContent = '4 Alerts';
        const notifClearBtn = document.querySelector('.notif-clear-btn');
        if (notifClearBtn) notifClearBtn.textContent = '✓ Mark all as read';
        const notifViewAllBtn = document.querySelector('.notif-view-all-btn');
        if (notifViewAllBtn) notifViewAllBtn.textContent = 'Reports Log →';

        // 9. Sync section title & icon in Topbar
        if (typeof updateActiveSectionUI === 'function' && S.curPage) {
          updateActiveSectionUI(S.curPage);
        }

        // 10. Re-render active page to translate all dynamically rendered content
        if (typeof renderPage === 'function' && S.curPage) {
          renderPage(S.curPage);
        }
      }

      function toggleLang() {
        S.lang = 'ar';
        applyLang();
        renderPage(S.curPage);
      }

      /* ============================================================
         SIDEBAR & NAVIGATION
      ============================================================ */
      function toggleSidebar() {
        S.sbCol = !S.sbCol;
        document.getElementById('sidebar').classList.toggle('collapsed', S.sbCol);
      }
      function openMob() {
        document.getElementById('sidebar').classList.add('mob-open');
        document.getElementById('mob-overlay').classList.add('open');
      }
      function closeMob() {
        document.getElementById('sidebar').classList.remove('mob-open');
        document.getElementById('mob-overlay').classList.remove('open');
      }

      function nav(page) {
        // Sync Mobile Bottom Navigation buttons
        try {
          document.querySelectorAll('.mob-nav-btn[data-page]').forEach(function (b) {
            if (b.getAttribute('data-page') === page) {
              b.classList.add('active');
            } else {
              b.classList.remove('active');
            }
          });
        } catch (e) { }

        S.curPage = page;
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const targetPage = document.getElementById('page-' + page);
        if (targetPage) targetPage.classList.add('active');

        document.querySelectorAll('.nav-item[data-page]').forEach(n => n.classList.remove('active'));
        const ni = document.querySelector('.nav-item[data-page="' + page + '"]');
        if (ni) {
          ni.classList.add('active');
          document.getElementById('page-title').textContent = ni.querySelector('.nav-label')?.textContent || '';
        }
        closeMob();
        const cnt = document.querySelector('.content');
        if (cnt) cnt.scrollTop = 0;
        renderPage(page);
      }

      function renderWelcome() {
        // Clean Welcome Card view - obsolete video polling removed
      }

      function renderPage(p) {
        if (p === 'welcome') renderWelcome();
        if (p === 'dashboard') renderDash();
        else if (p === 'orders') renderOrders();
        else if (p === 'recipes') renderRecipes();
        else if (p === 'production') renderProd();
        else if (p === 'inventory') renderInv();
        else if (p === 'purchase') renderPOs();
        else if (p === 'invoices') renderInvoices();
        else if (p === 'waste') renderWaste();
        else if (p === 'shipments') renderShipments();
        else if (p === 'centerstock') renderCenterStock();
        else if (p === 'reports') renderReports();
      }

      /* ============================================================
         TOAST NOTIFICATION
      ============================================================ */
      let _tt;
      function toast(msg, type = 'success') {
        const ic = {
          success: '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
          error: '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
          info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'
        };
        const cl = { success: '#4ade80', error: '#f87171', info: '#60a5fa' };
        const el = document.getElementById('toast');
        const icon = document.getElementById('t-icon');
        icon.innerHTML = ic[type] || ic.success;
        icon.setAttribute('stroke', cl[type] || cl.success);
        document.getElementById('t-msg').textContent = msg;
        el.classList.add('show');
        clearTimeout(_tt);
        _tt = setTimeout(() => el.classList.remove('show'), 3500);
      }

      /* ============================================================
         MODALS
      ============================================================ */
      function openModal(id) {
        document.getElementById(id).classList.add('open');
      }
      function closeModal(id) {
        document.getElementById(id).classList.remove('open');
      }

      /* ============================================================
         CALCULATION ENGINE (COMPUTE)
      ============================================================ */
      function recipeCost(r) {
        if (!r || !r.ings) return 0;
        return r.ings.reduce((sum, item) => {
          const d = S.ings[item.id];
          if (!d) return sum;
          return sum + (item.qty * (1 + item.waste / 100) * d.price);
        }, 0);
      }

      function computePlan() {
        const tot = {};
        S.products.forEach(p => tot[p.id] = 0);
        S.orders.forEach(o => {
          Object.entries(o.items).forEach(([pid, q]) => {
            if (tot[pid] !== undefined) tot[pid] += q;
          });
        });

        let totalCost = 0;
        let totalWaste = 0;

        const plan = S.products.map(p => {
          const ordered = tot[p.id] || 0;
          const buf = Math.ceil(ordered * 0.05);
          const ttp = ordered + buf;
          const r = S.recipes[p.id];
          const uc = r ? recipeCost(r) : p.cost;
          const tc = ttp * uc;
          const wc = r ? r.ings.reduce((s, i) => {
            const d = S.ings[i.id];
            if (!d) return s;
            return s + (i.qty * (i.waste / 100) * d.price * ttp);
          }, 0) : 0;

          totalCost += tc;
          totalWaste += wc;
          p.cost = uc;
          return { p, ordered, buf, ttp, uc, tc, wc };
        });

        return { plan, totalCost, totalWaste };
      }

      function computeRM() {
        const { plan } = computePlan();
        const mats = {};

        plan.forEach(({ p, ttp }) => {
          const r = S.recipes[p.id];
          if (!r) return;
          r.ings.forEach(ing => {
            const d = S.ings[ing.id];
            if (!d) return;
            const base = ing.qty * ttp;
            const wq = base * (ing.waste / 100);
            if (!mats[ing.id]) {
              mats[ing.id] = { id: ing.id, base: 0, waste: 0, total: 0 };
            }
            mats[ing.id].base += base;
            mats[ing.id].waste += wq;
            mats[ing.id].total += base + wq;
          });
        });

        return Object.values(mats).sort((a, b) => b.total - a.total);
      }

      function getShortages() {
        return computeRM()
          .filter(m => {
            const iv = S.ings[m.id];
            return iv && iv.stock < m.total;
          })
          .map(m => {
            const iv = S.ings[m.id];
            return { ...m, shortage: m.total - iv.stock, unit: iv.uom };
          });
      }

      /* ============================================================
         DASHBOARD
      ============================================================ */
      let chVelocity = null;
      let chSupplyBars = null;
      // activeFGCat reused

      function filterFG(query, cat, btnEl) {
        if (cat !== undefined && cat !== null) activeFGCat = cat;
        if (btnEl) {
          document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
          btnEl.classList.add('active');
        }
        const q = (query || document.getElementById('fg-search-input')?.value || '').toLowerCase().trim();
        document.querySelectorAll('#fg-table-body tr').forEach(tr => {
          if (tr.classList.contains('empty-state-row')) {
            tr.style.display = '';
            return;
          }
          const text = tr.innerText.toLowerCase();
          const rowCat = tr.getAttribute('data-cat') || '';
          tr.style.display = ((!q || text.includes(q)) && (!activeFGCat || activeFGCat === 'all' || rowCat === activeFGCat)) ? '' : 'none';
        });

        document.querySelectorAll('#fg-mobile-cards .mob-item-card').forEach(card => {
          const text = card.innerText.toLowerCase();
          const rowCat = card.getAttribute('data-cat') || '';
          card.style.display = ((!q || text.includes(q)) && (!activeFGCat || activeFGCat === 'all' || rowCat === activeFGCat)) ? '' : 'none';
        });
      }

      function initBomSimSelect() {
        const sel = document.getElementById('bom-sim-select');
        if (!sel || sel.options.length > 1) return;
        (S.products || []).forEach(p => {
          const opt = document.createElement('option');
          opt.value = p.id;
          opt.textContent = (p.id ? '[' + p.id + '] ' : '') + pname(p) + ' (' + (p.unit || 'Kg') + ')';
          sel.appendChild(opt);
        });
      }

      function updateBomSimPreview() {
        const sel = document.getElementById('bom-sim-select');
        const qtyInp = document.getElementById('bom-sim-qty');
        const container = document.getElementById('bom-sim-ings-list');
        if (!sel || !container) return;

        const pid = sel.value;
        const qty = Math.max(1, parseFloat(qtyInp?.value || 10));

        if (!pid) {
          container.innerHTML = '<div style="text-align:center;padding:25px 10px;color:#64748B;font-size:12px;">👈 Select an item from the list above to view recipe ingredients & stock availability</div>';
          return;
        }

        const rec = S.recipes && S.recipes[pid];
        if (!rec || !rec.ings || !rec.ings.length) {
          container.innerHTML = '<div style="text-align:center;padding:20px;color:#F87171;font-size:12px;">⚠️ No recipe formula (BOM) recorded for this item yet</div>';
          return;
        }

        const yieldKg = Number(rec.yield || 1) || 1;
        const mult = qty / yieldKg;

        container.innerHTML = rec.ings.map(ing => {
          const ingData = S.ings && S.ings[ing.id];
          const reqQty = Number(ing.qty || 0) * mult;
          const currentStock = Number(ingData?.stock || 0);
          const hasEnough = currentStock >= reqQty;
          const name = isAr() ? (ingData?.ar || ing.id) : (ingData?.en || ing.id);

          return '<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid rgba(30,35,64,0.6);">' +
            '<span style="color:#C4CDD8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:180px;" title="' + name + '">' + name + '</span>' +
            '<span style="color:#06B6D4;font-weight:700;">' + reqQty.toFixed(2) + ' ' + (ingData?.uom || 'Kg') + ' ' +
            '<span style="color:' + (hasEnough ? '#10B981' : '#F87171') + ';font-size:10px;">[' + currentStock.toFixed(1) + ' ' + (hasEnough ? '✓' : '⚠️ Shortage') + ']</span>' +
            '</span>' +
            '</div>';
        }).join('');
      }

      function executeSelectedBatch() {
        const __isSim = true;
        const sel = document.getElementById('bom-sim-select');
        const qtyInp = document.getElementById('bom-sim-qty');
        const pid = sel?.value;
        const qty = Math.max(1, parseFloat(qtyInp?.value || 10));

        if (!pid) {
          toast('Please select an item to produce!', 'error');
          return;
        }

        const rec = S.recipes && S.recipes[pid];
        if (!rec || !rec.ings || !rec.ings.length) {
          toast('No recipe registered for this item!', 'error');
          return;
        }

        const yieldKg = Number(rec.yield || 1) || 1;
        const mult = qty / yieldKg;

        // Deduct ingredients
        rec.ings.forEach(ing => {
          if (S.ings && S.ings[ing.id]) {
            const reqQty = Number(ing.qty || 0) * mult;
            S.ings[ing.id].stock = Math.max(0, Number(S.ings[ing.id].stock || 0) - reqQty);
          }
        });

        // Add to centerStock
        S.centerStock = S.centerStock || {};
        S.centerStock[pid] = Number(S.centerStock[pid] || 0) + qty;

        // Log batch
        S.centerStockLog = S.centerStockLog || [];
        S.centerStockLog.unshift({
          id: 'B-' + Date.now(),
          date: todayStr(),
          time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
          pid: pid,
          qty: qty,
          notes: 'Executed via Dashboard Batch Simulator'
        });

        saveState();
        renderDash();
        updateBomSimPreview();
        if (typeof renderInv === 'function') renderInv();
        if (typeof renderCenterStock === 'function') renderCenterStock();

        toast('⚡ Batch of ' + qty + ' executed successfully & stock deducted automatically!', 'success');
      }

      function executeBatchSimulation() { return executeSelectedBatch(); }

      // ════════════════════════════════════════════════════════════
      // ── DYNAMIC STOCK HEALTH DIAL & REORDER LEVEL COMPLIANCE ──
      // ════════════════════════════════════════════════════════════
      function updateStockHealthDial() {
        try {
          const circle = document.getElementById('stockHealthCircle');
          const percentEl = document.getElementById('stockSafePercent');
          const descEl = document.getElementById('stockAlertDesc');
          const badge = document.getElementById('stockHealthBadge');

          const items = Object.values(S.ings || {});
          if (!items.length) {
            if (percentEl) percentEl.textContent = '100%';
            if (descEl) descEl.textContent = 'No items';
            return;
          }

          let safeCount = 0;
          let alertCount = 0;

          items.forEach(ing => {
            const stock = Number(ing.stock) || 0;
            const safety = Number(ing.safety) || 0;
            if (stock > safety) {
              safeCount++;
            } else {
              alertCount++;
            }
          });

          const total = safeCount + alertCount;
          const safePercent = total > 0 ? Math.round((safeCount / total) * 100) : 100;

          if (percentEl) percentEl.textContent = `${safePercent}%`;
          if (descEl) {
            descEl.textContent = (typeof isAr === 'function' && isAr())
              ? `${safeCount} Safe Items / ${alertCount} Low Stock`
              : `${safeCount} safe / ${alertCount} below safety`;
          }

          const circumference = 414.69;
          const offset = circumference * (1 - (safePercent / 100));

          if (circle) {
            circle.style.strokeDasharray = `${circumference}`;
            circle.style.strokeDashoffset = `${offset}`;
            if (safePercent >= 75) {
              circle.style.stroke = '#10B981';
              if (badge) {
                badge.textContent = '● Optimal';
                badge.style.color = '#10B981';
              }
            } else if (safePercent >= 40) {
              circle.style.stroke = '#EAB308';
              if (badge) {
                badge.textContent = '● Warning';
                badge.style.color = '#EAB308';
              }
            } else {
              circle.style.stroke = '#EF4444';
              if (badge) {
                badge.textContent = '● Critical';
                badge.style.color = '#EF4444';
              }
            }
          }

          // Real-time synchronization of low-stock alert counters across the application
          const kpiShortAlert = document.getElementById('kpi-shortages-alert');
          if (kpiShortAlert) {
            if (alertCount > 0) {
              kpiShortAlert.style.color = '#EF4444';
              kpiShortAlert.textContent = `${alertCount} ${'Shortages ⚠️'}`;
            } else {
              kpiShortAlert.style.color = '#10B981';
              kpiShortAlert.textContent = '0 Shortages ✓';
            }
          }

          const kpiStock = document.getElementById('kpi-raw-stock');
          if (kpiStock) {
            kpiStock.innerHTML = `<span style="color:${safeCount > 0 ? '#10B981' : '#EF4444'}">${safeCount}</span> / ${total}`;
          }
        } catch (e) {
          console.warn('updateStockHealthDial error:', e);
        }
      }
      window.updateStockHealthDial = updateStockHealthDial;

      // ════════════════════════════════════════════════════════════
      // ── BRANCH ORDER DISPATCH & REACTIVE SYNCHRONIZATION ──
      // ════════════════════════════════════════════════════════════
      async function dispatchOrder(orderId) {
        const o = S.orders.find(x => String(x.id) === String(orderId));
        if (!o) return;

        if (o.status === 'Delivered') {
          if (typeof toast === 'function') toast('Order already delivered', 'info');
          return;
        }

        // Deduct products stock
        let totalDeductedUnits = 0;
        if (o.items && typeof o.items === 'object') {
          Object.entries(o.items).forEach(([pid, qty]) => {
            const q = Number(qty) || 0;
            if (q > 0) {
              const p = S.products.find(x => x.id === pid);
              if (p) {
                p.stock = Math.max(0, Math.round(((Number(p.stock) || 0) - q) * 100) / 100);
              }
              if (S.centerStock && S.centerStock[pid]) {
                S.centerStock[pid].qty = Math.max(0, Math.round(((Number(S.centerStock[pid].qty) || 0) - q) * 100) / 100);
                S.centerStock[pid].updatedAt = new Date().toISOString();
              }
              totalDeductedUnits += q;
            }
          });
        }

        o.status = 'Delivered';
        saveState();

        try {
          await fetch(`/api/orders/${orderId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'Delivered', deductStock: true })
          });
        } catch (err) {
          console.warn('Could not sync dispatch to server:', err);
        }

        // Real-time synchronization of all views
        if (typeof renderOrders === 'function') renderOrders();
        if (typeof renderDash === 'function') renderDash();
        if (typeof updateStockHealthDial === 'function') updateStockHealthDial();
        if (typeof renderInv === 'function') renderInv();
        if (typeof renderCenterStock === 'function') renderCenterStock();
        if (typeof renderProd === 'function') renderProd();

        if (typeof toast === 'function') {
          toast((typeof isAr === 'function' && isAr())
            ? `🚚 Shipped order for ${o.branch} successfully & deducted ${totalDeductedUnits} units from stock!`
            : `🚚 Order #${orderId} dispatched & stock deducted!`, 'success');
        }
      }
      window.dispatchOrder = dispatchOrder;

      async function updateOrderStatus(orderId, newStatus) {
        const o = S.orders.find(x => String(x.id) === String(orderId));
        if (!o) return;

        if (newStatus === 'Delivered') {
          return dispatchOrder(orderId);
        }

        o.status = newStatus;
        saveState();

        try {
          await fetch(`/api/orders/${orderId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus, deductStock: false })
          });
        } catch (err) {
          console.warn('Could not sync status to server:', err);
        }

        if (typeof renderOrders === 'function') renderOrders();
        if (typeof renderDash === 'function') renderDash();
        if (typeof updateStockHealthDial === 'function') updateStockHealthDial();
        if (typeof renderInv === 'function') renderInv();
        if (typeof renderProd === 'function') renderProd();

        if (typeof toast === 'function') {
          toast((typeof isAr === 'function' && isAr())
            ? `⚡ Order status for ${o.branch} updated to (${newStatus})`
            : `Order #${orderId} updated to ${newStatus}`, 'info');
        }
      }
      window.updateOrderStatus = updateOrderStatus;

      function toggleTaskCheck(el) {
        if (!el) return;
        const isDone = el.classList.contains('is-done');
        const check = el.querySelector('.dark-check-box');
        if (isDone) {
          el.classList.remove('is-done');
          if (check) { check.textContent = ''; check.classList.remove('checked'); }
        } else {
          el.classList.add('is-done');
          el.classList.remove('in-progress');
          if (check) { check.textContent = '✓'; check.classList.add('checked'); }
        }
      }

      function exportProdExecutiveMatrix() {
        if (typeof exportExecutiveProductionExcel === 'function') {
          exportExecutiveProductionExcel();
        } else if (typeof exportCenterStockLog === 'function') {
          exportCenterStockLog();
        }
      }

      function renderDash() {
        try {
          initBomSimSelect();

          // 1. Total demand & active branch count from real S.orders
          const totalUnits = (S.orders || []).reduce((s, o) => s + Object.values(o.items || {}).reduce((a, b) => a + Number(b || 0), 0), 0);
          const uniqueBranches = new Set((S.orders || []).filter(o => o.branch && Object.keys(o.items || {}).length > 0).map(o => o.branch));

          const kpiDemand = document.getElementById('kpi-total-demand');
          if (kpiDemand) {
            kpiDemand.textContent = totalUnits > 0 ? (fmt(totalUnits) + ' Kg') : '0.00 Kg';
          }
          const kpiBrSub = document.getElementById('kpi-branches-sub');
          if (kpiBrSub) {
            kpiBrSub.textContent = uniqueBranches.size > 0 ? (uniqueBranches.size + (' active branches today')) : ('0 branches ordered today');
          }

          // 2. Active Batches from centerStockLog or today's runs
          const activeBatchesCount = (S.centerStockLog || []).filter(l => l.date === todayStr()).length;
          const kpiBatches = document.getElementById('kpi-active-batches');
          if (kpiBatches) {
            kpiBatches.textContent = activeBatchesCount > 0 ? (activeBatchesCount + (' Batches')) : ('0 Batches');
          }
          const kpiBatchSub = document.getElementById('kpi-batches-sub');
          if (kpiBatchSub) {
            kpiBatchSub.textContent = activeBatchesCount > 0 ? ('Recorded batches today') : ('No active batches today');
          }

          // 3. Raw Materials in Stock
          const ingsList = Object.values(S.ings || {});
          const totalIngs = ingsList.length || 200;
          const inStockCount = ingsList.filter(i => Number(i.stock || 0) > 0).length;
          const kpiStock = document.getElementById('kpi-raw-stock');
          if (kpiStock) {
            kpiStock.innerHTML = '<span style="color:' + (inStockCount > 0 ? '#10B981' : '#64748B') + ';">' + inStockCount + '</span> / ' + totalIngs;
          }
          const kpiStockSub = document.getElementById('kpi-stock-sub');
          if (kpiStockSub) {
            kpiStockSub.textContent = inStockCount > 0 ? (isAr() ? inStockCount + ' items in stock' : inStockCount + ' items in stock') : ('Awaiting stock arrivals');
          }

          // 4. Shortages & Alerts
          const shorts = (typeof getShortages === 'function') ? getShortages() : [];
          const kpiShort = document.getElementById('kpi-shortages-alert');
          if (kpiShort) {
            if (shorts && shorts.length > 0) {
              kpiShort.style.color = '#F87171';
              kpiShort.textContent = shorts.length + (' Items Short ⚠️');
            } else {
              kpiShort.style.color = '#10B981';
              kpiShort.textContent = '0 Shortages ✓';
            }
          }
          const kpiShortSub = document.getElementById('kpi-shortages-sub');
          if (kpiShortSub) {
            kpiShortSub.textContent = (shorts && shorts.length > 0) ? ('Requires draft POs') : ('No shortages pending');
          }

          // 5. Update Finished Goods table dynamically

          // Update Operational Workflow Pipeline Counters
          try {
            const activeOrders = (S.orders || []).filter(o => o && o.status !== 'cancelled');
            const p1 = document.getElementById('pipe-step1-count');
            if (p1) p1.textContent = activeOrders.length + ' ' + ('Active Orders');

            const poCount = (S.purchaseOrders || S.pos || []).length;
            const p4 = document.getElementById('pipe-step4-count');
            if (p4) p4.textContent = poCount + ' ' + ('POs');
          } catch (e) { }

          renderFGTableDynamic();
          if (typeof updateStockHealthDial === 'function') updateStockHealthDial();

        } catch (e) { console.warn('renderDash error:', e); }

        setTimeout(() => {
          renderDemandVelocityChart();
          renderSupplyBarsChart();
        }, 60);
      }

      function renderFGTableDynamic() {
        const tbody = document.getElementById('fg-table-body');
        const mobContainer = document.getElementById('fg-mobile-cards');
        if (!tbody && !mobContainer) return;

        const prods = (S.products && S.products.length) ? S.products : [];
        if (!prods.length) return;

        // Calculate total demand per product from active branch orders
        const demandMap = {};
        (S.orders || []).forEach(o => {
          if (o && o.status !== 'cancelled' && o.items) {
            Object.entries(o.items).forEach(([pid, qty]) => {
              demandMap[pid] = (demandMap[pid] || 0) + Number(qty || 0);
            });
          }
        });

        // Filter: ONLY include products that have active demand from branch orders!
        const demandedProds = prods.filter(p => {
          const demand = Number(demandMap[p.id] || 0);
          return demand > 0;
        });

        // Update badge count in header
        const badgeEl = document.getElementById('fg-table-count-badge');
        if (badgeEl) {
          if (demandedProds.length > 0) {
            badgeEl.textContent = demandedProds.length + ' ' + ('Demanded');
            badgeEl.className = 'badge badge-purple';
            badgeEl.style.background = 'rgba(124,58,237,0.2)';
            badgeEl.style.color = '#A78BFA';
            badgeEl.style.borderColor = 'rgba(124,58,237,0.4)';
          } else {
            badgeEl.textContent = '0 Demanded';
            badgeEl.className = 'badge badge-slate';
            badgeEl.style.background = 'rgba(30,35,64,0.8)';
            badgeEl.style.color = '#64748B';
            badgeEl.style.borderColor = '#1E2340';
          }
        }

        // Update Pipeline Step 2 counter
        const p2 = document.getElementById('pipe-step2-count');
        if (p2) p2.textContent = demandedProds.length + ' ' + ('Demanded');

        // If no products have demand, display clean informative empty state
        if (!demandedProds.length) {
          if (tbody) {
            tbody.innerHTML = '<tr class="empty-state-row">' +
              '<td colspan="7" style="text-align:center;padding:40px 20px;color:#94a3b8;">' +
              '<div style="width:48px;height:48px;margin:0 auto 12px;border-radius:14px;background:rgba(124,58,237,0.12);border:1px solid rgba(124,58,237,0.25);display:flex;align-items:center;justify-content:center;color:#A78BFA;font-size:1.5rem">📋</div>' +
              '<div style="font-weight:700;color:#f1f5f9;font-size:14px;margin-bottom:6px;">' + ('No Production Demand Required Currently') + '</div>' +
              '<div style="font-size:12px;color:#64748b;max-width:420px;margin:0 auto;line-height:1.5;">' + ('Products will appear here automatically when requested by branches') + '</div>' +
              '</td>' +
              '</tr>';
          }
          if (mobContainer) {
            mobContainer.innerHTML = '<div class="mob-item-card" style="text-align:center;padding:32px 16px;">' +
              '<div style="width:44px;height:44px;margin:0 auto 10px;border-radius:12px;background:rgba(124,58,237,0.12);display:flex;align-items:center;justify-content:center;color:#A78BFA;font-size:1.4rem">📋</div>' +
              '<div style="font-weight:800;color:#f1f5f9;font-size:13.5px;margin-bottom:4px;">' + ('No Production Demand Required') + '</div>' +
              '<div style="font-size:11.5px;color:#64748b;">' + ('Products appear automatically when ordered by branches') + '</div>' +
              '</div>';
          }
          return;
        }

        // Sort: items with shortage first (highest deficit at the top)
        demandedProds.sort((a, b) => {
          const csA = S.centerStock && S.centerStock[a.id];
          const readyA = typeof csA === 'object' && csA !== null ? Number(csA.qty || 0) : Number(csA || 0);
          const demandA = Number(demandMap[a.id] || 0);
          const diffA = readyA - demandA;

          const csB = S.centerStock && S.centerStock[b.id];
          const readyB = typeof csB === 'object' && csB !== null ? Number(csB.qty || 0) : Number(csB || 0);
          const demandB = Number(demandMap[b.id] || 0);
          const diffB = readyB - demandB;

          return diffA - diffB;
        });

        // Render Desktop Rows
        if (tbody) {
          tbody.innerHTML = demandedProds.map(p => {
            const csVal = S.centerStock && S.centerStock[p.id];
            const ready = typeof csVal === 'object' && csVal !== null ? Number(csVal.qty || 0) : Number(csVal || 0);
            const demand = Number(demandMap[p.id] || 0);
            const diff = ready - demand;
            const uom = p.unit || 'Kg';

            let badge = '';
            if (diff >= 0) {
              badge = '<span class="badge badge-green">' + ('Fully Covered ✓') + '</span>';
            } else {
              badge = '<span class="badge badge-red">Short: ' + Math.abs(diff).toFixed(1) + ' ' + uom + ' ⚠️</span>';
            }

            const catBadgeClass = (p.cat === 'Sauces' || p.cat === 'sauces') ? 'badge-orange' : ((p.cat === 'Cheese' || p.cat === 'cheese') ? 'badge-blue' : 'badge-slate');

            return '<tr data-cat="' + (p.cat || 'other') + '">' +
              '<td style="color:#8B5CF6;font-weight:700;font-family:monospace;font-size:12px;">' + (p.id || '—') + '</td>' +
              '<td style="font-weight:700;color:#fff;font-size:13px;">' + (pname(p) || p.id) + '</td>' +
              '<td><span class="badge ' + catBadgeClass + '">' + (p.cat || '—') + '</span></td>' +
              '<td style="font-weight:700;color:#fff;">' + (ready % 1 === 0 ? ready : ready.toFixed(2)) + ' ' + uom + '</td>' +
              '<td style="font-weight:800;color:#06B6D4;">' + (demand % 1 === 0 ? demand : demand.toFixed(2)) + ' ' + uom + '</td>' +
              '<td>' + badge + '</td>' +
              '<td style="text-align:center;"><button class="btn btn-sm btn-primary" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);border:none;box-shadow:0 0 10px rgba(124,58,237,0.3);padding:4px 12px;" onclick="nav(\'production\')">⚡ <span>' + ('Cook') + '</span></button></td>' +
              '</tr>';
          }).join('');
        }

        // Render Mobile Touch Cards
        if (mobContainer) {
          mobContainer.innerHTML = demandedProds.map(p => {
            const csVal = S.centerStock && S.centerStock[p.id];
            const ready = typeof csVal === 'object' && csVal !== null ? Number(csVal.qty || 0) : Number(csVal || 0);
            const demand = Number(demandMap[p.id] || 0);
            const diff = ready - demand;
            const uom = p.unit || 'Kg';

            let badgeHtml = '';
            if (diff >= 0) {
              badgeHtml = '<span class="badge badge-green">' + ('Covered ✓') + '</span>';
            } else {
              badgeHtml = '<span class="badge badge-red">Short: ' + Math.abs(diff).toFixed(1) + ' ⚠️</span>';
            }

            const catBadgeClass = (p.cat === 'Sauces' || p.cat === 'sauces') ? 'badge-orange' : ((p.cat === 'Cheese' || p.cat === 'cheese') ? 'badge-blue' : 'badge-slate');

            return '<div class="mob-item-card" data-cat="' + (p.cat || 'other') + '">' +
              '<div class="mob-card-header">' +
              '<div>' +
              '<div class="mob-card-title">' + (pname(p) || p.id) + '</div>' +
              '<div class="mob-card-code">' + (p.id || '—') + '</div>' +
              '</div>' +
              '<span class="badge ' + catBadgeClass + '">' + (p.cat || '—') + '</span>' +
              '</div>' +
              '<div class="mob-card-metrics">' +
              '<div class="mob-metric-box">' +
              '<span class="mob-metric-lbl">' + ('Ready Stock') + '</span>' +
              '<span class="mob-metric-val">' + (ready % 1 === 0 ? ready : ready.toFixed(1)) + ' ' + uom + '</span>' +
              '</div>' +
              '<div class="mob-metric-box">' +
              '<span class="mob-metric-lbl">' + ('Demand') + '</span>' +
              '<span class="mob-metric-val" style="color:#06B6D4;">' + (demand % 1 === 0 ? demand : demand.toFixed(1)) + ' ' + uom + '</span>' +
              '</div>' +
              '<div class="mob-metric-box">' +
              '<span class="mob-metric-lbl">' + ('Status') + '</span>' +
              '<span>' + badgeHtml + '</span>' +
              '</div>' +
              '</div>' +
              '<button class="btn btn-primary mob-card-btn" onclick="nav(\'production\')">' +
              '⚡ <span>' + ('Cook Batch ➔') + '</span>' +
              '</button>' +
              '</div>';
          }).join('');
        }
      }

      function renderDemandVelocityChart() {
        const ctx = document.getElementById('ch-demand-velocity');
        if (!ctx) return;
        if (chVelocity) { chVelocity.destroy(); chVelocity = null; }

        const c2d = ctx.getContext('2d');
        let gradCyan = null, gradViolet = null;
        try {
          gradCyan = c2d.createLinearGradient(0, 0, 0, 200);
          gradCyan.addColorStop(0, 'rgba(6,182,212,0.3)');
          gradCyan.addColorStop(1, 'rgba(6,182,212,0)');
          gradViolet = c2d.createLinearGradient(0, 0, 0, 200);
          gradViolet.addColorStop(0, 'rgba(139,92,246,0.2)');
          gradViolet.addColorStop(1, 'rgba(139,92,246,0)');
        } catch (e) { }

        const hasOrders = (S.orders || []).length > 0;
        const hours = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'];
        const demandData = hasOrders ? [12, 35, 60, 95, 80, 50, 65, 85, 40, 20] : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const outputData = hasOrders ? [10, 30, 55, 90, 75, 45, 60, 80, 35, 15] : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        chVelocity = new Chart(ctx, {
          type: 'line',
          data: {
            labels: hours,
            datasets: [
              {
                label: 'Branch Demand (Kg)',
                data: demandData,
                borderColor: '#3B82F6',
                borderWidth: 2.5,
                backgroundColor: gradCyan || 'rgba(59,130,246,0.12)',
                fill: true,
                tension: 0.35,
                pointBackgroundColor: '#111827',
                pointBorderColor: '#3B82F6',
                pointBorderWidth: 2,
                pointRadius: hasOrders ? 4 : 0
              },
              {
                label: 'Production Output (Kg)',
                data: outputData,
                borderColor: '#10B981',
                borderWidth: 2,
                backgroundColor: gradViolet || 'rgba(16,185,129,0.08)',
                fill: true,
                tension: 0.35,
                pointBackgroundColor: '#111827',
                pointBorderColor: '#10B981',
                pointBorderWidth: 2,
                pointRadius: hasOrders ? 3 : 0,
                borderDash: [4, 4]
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: '#94A3B8',
                  font: { size: 11, family: 'Inter, system-ui, sans-serif' },
                  boxWidth: 12, boxHeight: 2
                }
              },
              tooltip: {
                backgroundColor: '#1E293B',
                titleColor: '#F8FAFC',
                bodyColor: '#38BDF8',
                borderColor: '#334155',
                borderWidth: 1,
                padding: 10
              }
            },
            scales: {
              x: {
                grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
                ticks: { color: '#64748B', font: { size: 10.5, family: 'Inter, system-ui, sans-serif' } }
              },
              y: {
                grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
                ticks: { color: '#64748B', font: { size: 10.5, family: 'Inter, system-ui, sans-serif' } },
                beginAtZero: true,
                suggestedMax: hasOrders ? undefined : 100
              }
            }
          }
        });
      }

      function renderSupplyBarsChart() {
        const ctx = document.getElementById('ch-supply-bars');
        if (!ctx) return;
        const chartWrap = ctx.parentElement;
        const hasOrders = (S.orders || []).some(o => o && o.status !== 'cancelled' && o.items && Object.keys(o.items).length > 0);

        if (!hasOrders) {
          if (chSupplyBars) { chSupplyBars.destroy(); chSupplyBars = null; }
          if (chartWrap) chartWrap.style.display = 'none';
          return;
        }

        if (chartWrap) chartWrap.style.display = 'block';
        if (chSupplyBars) { chSupplyBars.destroy(); chSupplyBars = null; }

        const labels = Array.from({ length: 40 }, (_, i) => '');
        const data1 = Array.from({ length: 40 }, () => (Math.random() * 0.008 + 0.003));
        const data2 = Array.from({ length: 40 }, () => (Math.random() * 0.006 + 0.002));

        chSupplyBars = new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Fulfillment Rate',
                data: data1,
                backgroundColor: (ctx) => {
                  const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 80);
                  g.addColorStop(0, '#3B82F6');
                  g.addColorStop(1, 'rgba(59,130,246,0.1)');
                  return g;
                },
                borderRadius: 3, borderSkipped: false, barPercentage: 0.45, categoryPercentage: 0.75
              },
              {
                label: 'Replenishment Rate',
                data: data2,
                backgroundColor: (ctx) => {
                  const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 80);
                  g.addColorStop(0, '#10B981');
                  g.addColorStop(1, 'rgba(16,185,129,0.1)');
                  return g;
                },
                borderRadius: 3, borderSkipped: false, barPercentage: 0.45, categoryPercentage: 0.75
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: {
              x: { display: false },
              y: {
                display: true,
                grid: { color: 'rgba(30,35,64,0.4)', drawBorder: false },
                ticks: { color: '#64748B', font: { size: 9 }, maxTicksLimit: 4 }
              }
            }
          }
        });
      }



      /* ============================================================
         CENTER STOCK & FINISHED GOODS WORKBENCH ENGINE
         ============================================================ */
      let S_inspectedProdId = null;

      function getCsStatus(qty) {
        if (!qty || qty <= 0) return { label: 'Depleted', badge: 'badge-red', key: 'empty' };
        if (qty < 5) return { label: 'Low Stock', badge: 'badge-amber', key: 'low' };
        return { label: 'Sufficient', badge: 'badge-green', key: 'ok' };
      }

      function populateCsProductSelects() {
        const selects = ['cs-prod-select', 'cs-adj-prod'];
        selects.forEach(sid => {
          const sel = document.getElementById(sid);
          if (!sel) return;
          const cur = sel.value;
          sel.innerHTML = '<option value="">— ' + ('Select Product') + ' —</option>';
          if (Array.isArray(S.products)) {
            S.products.forEach(p => {
              const opt = document.createElement('option');
              opt.value = p.id;
              const cs = S.centerStock && S.centerStock[p.id];
              const stockQty = cs ? (cs.qty || 0) : 0;
              const uom = cs ? cs.uom : (p.unit || 'Kg');
              opt.textContent = pname(p) + ' (' + (stockQty % 1 === 0 ? stockQty : stockQty.toFixed(2)) + ' ' + uom + ')';
              sel.appendChild(opt);
            });
          }
          if (cur) sel.value = cur;
        });
      }

      window.switchCsTab = function (tab) {
        ['prod', 'adj', 'log'].forEach(t => {
          const b = document.getElementById('cs-tab-btn-' + t);
          const p = document.getElementById('cs-pane-' + t);
          if (b) {
            if (t === tab) b.classList.add('active');
            else b.classList.remove('active');
          }
          if (p) p.style.display = (t === tab ? 'block' : 'none');
        });
      };

      function selectCenterStockItem(prodId) {
        S_inspectedProdId = prodId;
        const prod = S.products.find(p => p.id === prodId);
        if (!prod) return;

        const cs = S.centerStock && S.centerStock[prodId];
        const qty = cs ? (cs.qty || 0) : 0;
        const uom = cs ? cs.uom : (prod.unit || 'Kg');
        const r = S.recipes && S.recipes[prodId];
        const cost = r ? (typeof recipeCost === 'function' ? recipeCost(r) : 0) : (prod.cost || 0);
        const status = getCsStatus(qty);

        // Update Hero Card
        const heroTitle = document.getElementById('cs-hero-title');
        const heroCat = document.getElementById('cs-hero-cat');
        const heroStatus = document.getElementById('cs-hero-status');
        const heroStock = document.getElementById('cs-hero-stock');
        const heroCost = document.getElementById('cs-hero-cost');

        if (heroTitle) heroTitle.textContent = pname(prod);
        if (heroCat) heroCat.textContent = (prod.cat || 'CK PREP').toUpperCase();
        if (heroStatus) {
          heroStatus.textContent = status.label.toUpperCase();
          heroStatus.className = 'badge ' + status.badge;
        }
        if (heroStock) {
          heroStock.innerHTML = (qty % 1 === 0 ? qty : qty.toFixed(2)) + ' <span style="font-size:12px;color:#94a3b8">' + uom + '</span>';
        }
        if (heroCost) {
          heroCost.textContent = (typeof f2 === 'function' ? f2(cost) : cost.toFixed(2)) + ' ' + (typeof cur === 'function' ? cur() : $);
        }

        // Preselect in batch simulator
        const sel = document.getElementById('cs-prod-select');
        if (sel) {
          sel.value = prodId;
          onCsProdChange();
        }
        const adjSel = document.getElementById('cs-adj-prod');
        if (adjSel) adjSel.value = prodId;

        // Update active card highlight
        document.querySelectorAll('#cs-grid .card').forEach(c => {
          c.classList.remove('selected-stream-card');
        });
        const targetCard = document.querySelector('#cs-grid .card[data-id="' + prodId + '"]');
        if (targetCard) targetCard.classList.add('selected-stream-card');
      }

      function stepCsQty(delta) {
        const inp = document.getElementById('cs-prod-qty');
        if (!inp) return;
        const cur = Number(inp.value) || 0;
        inp.value = (cur + delta).toFixed(delta % 1 === 0 ? 0 : 2);
        onCsProdChange();
      }

      function onCsProdChange() {
        const pid = document.getElementById('cs-prod-select')?.value;
        const previewDiv = document.getElementById('cs-raw-preview');
        const listDiv = document.getElementById('cs-raw-list');
        if (!pid) {
          if (previewDiv) previewDiv.style.display = 'none';
          return;
        }
        const prod = S.products.find(p => p.id === pid);
        if (prod) {
          const uomBadge = document.getElementById('cs-prod-uom');
          if (uomBadge) uomBadge.textContent = prod.unit || 'Kg';
        }

        // Preview raw materials required
        const recipe = S.recipes && S.recipes[pid];
        if (recipe && recipe.ings && recipe.ings.length > 0) {
          const rawQtyInput = document.getElementById('cs-prod-qty')?.value;
          const enteredQty = parseFloat(rawQtyInput);
          const qty = (!isNaN(enteredQty) && enteredQty > 0) ? enteredQty : 1;

          const batchBadge = document.getElementById('cs-raw-batch-badge');
          if (batchBadge) {
            batchBadge.textContent = (!isNaN(enteredQty) && enteredQty > 0)
              ? ('Batch: ' + qty + ' ' + (prod ? prod.unit : 'unit'))
              : ('Calculated per 1 ' + (prod ? prod.unit : 'unit'));
          }

          let html = '';
          recipe.ings.forEach(ing => {
            const raw = S.ings && S.ings[ing.id];
            if (!raw) return;
            const wasteFactor = 1 + (Number(ing.waste) || 0) / 100;
            const needed = (Number(ing.qty) || 0) * wasteFactor * qty;
            const curStock = Number(raw.stock) || 0;
            const isEnough = curStock >= needed;
            const color = isEnough ? '#4ade80' : '#f87171';
            const ingName = isAr() ? (raw.ar || raw.en) : (raw.en || raw.ar);
            const uomText = raw.uom || '';

            html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;background:rgba(255,255,255,0.03);border:1px solid ' + (isEnough ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.3)') + ';border-radius:8px;">' +
              '<div style="text-align:right">' +
              '<div style="font-weight:700;font-size:12px;color:#f1f5f9">' + ingName + '</div>' +
              '<div style="font-size:10px;color:#94a3b8">' + ('In stock: ') + '<strong style="color:' + (isEnough ? '#cbd5e1' : '#f87171') + '">' + (curStock % 1 === 0 ? curStock : curStock.toFixed(2)) + ' ' + uomText + '</strong></div>' +
              '</div>' +
              '<div style="text-align:left;direction:ltr">' +
              '<div style="color:' + color + ';font-weight:800;font-size:13px">' + needed.toFixed(2) + ' <span style="font-size:10px;color:#94a3b8">' + uomText + '</span></div>' +
              '<div style="color:' + color + ';font-size:10px;font-weight:700;direction:rtl">' + (isEnough ? ('Available') : ('Shortage: ' + (needed - curStock).toFixed(2))) + '</div>' +
              '</div>' +
              '</div>';
          });

          if (listDiv) listDiv.innerHTML = html;
          if (previewDiv) previewDiv.style.display = 'block';
        } else {
          if (previewDiv) previewDiv.style.display = 'none';
        }
      }

      function logProductionBatch() {
        const pid = document.getElementById('cs-prod-select')?.value;
        const qtyRaw = document.getElementById('cs-prod-qty')?.value;
        const qty = parseFloat(qtyRaw);
        if (!pid) { toast('Please select a product first', 'error'); return; }
        if (!qty || qty <= 0) { toast('Enter a valid positive quantity', 'error'); return; }

        const prod = S.products.find(p => p.id === pid);
        const uom = prod ? (prod.unit || 'Kg') : 'Kg';
        const notes = document.getElementById('cs-prod-notes')?.value || '';

        // 1. Deduct raw materials from S.ings
        const recipe = S.recipes && S.recipes[pid];
        if (recipe && recipe.ings && recipe.ings.length > 0) {
          recipe.ings.forEach(ing => {
            if (S.ings && S.ings[ing.id]) {
              const wasteFactor = 1 + (Number(ing.waste) || 0) / 100;
              const deductAmount = (Number(ing.qty) || 0) * wasteFactor * qty;
              S.ings[ing.id].stock = Math.max(0, (S.ings[ing.id].stock || 0) - deductAmount);
              S.ings[ing.id].stock = Math.round(S.ings[ing.id].stock * 1000) / 1000;
            }
          });
        }

        // 2. Add to Center Stock
        S.centerStock = S.centerStock || {};
        if (!S.centerStock[pid]) S.centerStock[pid] = { qty: 0, uom: uom, updatedAt: new Date().toISOString() };
        S.centerStock[pid].qty = Math.round(((S.centerStock[pid].qty || 0) + qty) * 1000) / 1000;
        S.centerStock[pid].uom = uom;
        S.centerStock[pid].updatedAt = new Date().toISOString();

        // 3. Log movement
        S.centerStockLog = S.centerStockLog || [];
        S.centerStockLog.unshift({
          productId: pid,
          qtyChange: qty,
          action: 'production',
          branch: null,
          refOrderId: null,
          notes: notes,
          createdAt: new Date().toISOString()
        });

        saveState();
        document.getElementById('cs-prod-qty').value = '';
        document.getElementById('cs-prod-notes').value = '';
        if (document.getElementById('cs-raw-preview')) document.getElementById('cs-raw-preview').style.display = 'none';

        toast('⚡ Production logged: ' + qty + ' ' + uom + ' of ' + pname(prod), 'success');
        renderCenterStock();
        if (typeof renderInv === 'function') renderInv();
      }

      function adjustCenterStock() {
        const pid = document.getElementById('cs-adj-prod')?.value;
        const type = document.getElementById('cs-adj-type')?.value;
        const qty = parseFloat(document.getElementById('cs-adj-qty')?.value);
        if (!pid) { toast('Select a product first', 'error'); return; }
        if (isNaN(qty) || qty < 0) { toast('Enter valid quantity', 'error'); return; }

        S.centerStock = S.centerStock || {};
        if (!S.centerStock[pid]) {
          const prod = S.products.find(p => p.id === pid);
          S.centerStock[pid] = { qty: 0, uom: prod ? (prod.unit || 'Kg') : 'Kg', updatedAt: new Date().toISOString() };
        }
        const before = S.centerStock[pid].qty || 0;
        let after;
        if (type === 'add') after = before + qty;
        else if (type === 'sub') after = Math.max(0, before - qty);
        else after = qty;

        const change = Math.round((after - before) * 1000) / 1000;
        S.centerStock[pid].qty = Math.round(after * 1000) / 1000;
        S.centerStock[pid].updatedAt = new Date().toISOString();

        S.centerStockLog = S.centerStockLog || [];
        S.centerStockLog.unshift({
          productId: pid,
          qtyChange: change,
          action: 'adjustment',
          branch: null,
          refOrderId: null,
          notes: 'Manual Adjustment: ' + (type === 'set' ? 'Exact Count' : (type === 'add' ? 'Addition' : 'Deduction')),
          createdAt: new Date().toISOString()
        });

        saveState();
        document.getElementById('cs-adj-qty').value = '';
        toast('✏️ Stock adjusted for ' + pname(S.products.find(p => p.id === pid)) + ' to ' + after + ' successfully', 'success');
        renderCenterStock();
      }

      function exportCenterStockLog() {
        if (!S.centerStockLog || !S.centerStockLog.length) {
          toast('No movements to export', 'info');
          return;
        }
        let csv = 'Date,Product,Change,Action,Branch,Notes\n';
        S.centerStockLog.forEach(l => {
          const prod = S.products.find(p => p.id === l.productId);
          csv += [(l.createdAt || ''), (prod ? (prod.en || prod.ar) : l.productId), l.qtyChange, l.action, (l.branch || ''), (l.notes || '')].map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',') + '\n';
        });
        const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'center_stock_log_' + new Date().toISOString().slice(0, 10) + '.csv';
        a.click();
        URL.revokeObjectURL(url);
      }

      function renderCenterStock() {
        S.centerStock = S.centerStock || {};
        S.centerStockLog = S.centerStockLog || [];

        populateCsProductSelects();

        const search = (document.getElementById('cs-search')?.value || '').trim().toLowerCase();
        const catF = document.getElementById('cs-cat-filter')?.value || '';
        const statusF = document.getElementById('cs-status-filter')?.value || '';

        // Compute KPIs
        let totalItems = S.products ? S.products.length : 0;
        let okCount = 0;
        let lowCount = 0;
        let emptyCount = 0;

        if (Array.isArray(S.products)) {
          S.products.forEach(p => {
            const cs = S.centerStock[p.id];
            const qty = cs ? (cs.qty || 0) : 0;
            const status = getCsStatus(qty);
            if (status.key === 'ok') okCount++;
            else if (status.key === 'low') lowCount++;
            else emptyCount++;
          });
        }

        // Render KPIs
        const statsEl = document.getElementById('cs-stats');
        if (statsEl) {
          statsEl.innerHTML = `
          <div class="kpi-card" style="padding:14px 16px;">
            <div class="kpi-label">${'Total Manufactured'}</div>
            <div class="kpi-value" style="color:#f1f5f9;font-size:1.6rem;">${totalItems}</div>
            <div class="text-muted text-xs" style="margin-top:2px;">${'Master catalog items'}</div>
          </div>
          <div class="kpi-card" style="padding:14px 16px;">
            <div class="kpi-label">${'Sufficient Stock'}</div>
            <div class="kpi-value" style="color:#4ade80;font-size:1.6rem;">${okCount}</div>
            <div class="text-muted text-xs" style="margin-top:2px;">${'Ready for distribution'}</div>
          </div>
          <div class="kpi-card" style="padding:14px 16px;">
            <div class="kpi-label">${'Low Stock'}</div>
            <div class="kpi-value" style="color:#fbbf24;font-size:1.6rem;">${lowCount}</div>
            <div class="text-muted text-xs" style="margin-top:2px;">${'Near depletion'}</div>
          </div>
          <div class="kpi-card" style="padding:14px 16px;">
            <div class="kpi-label">${'Depleted / Pending'}</div>
            <div class="kpi-value" style="color:#f87171;font-size:1.6rem;">${emptyCount}</div>
            <div class="text-muted text-xs" style="margin-top:2px;">${'Needs production batch'}</div>
          </div>
        `;
        }

        // Filter products
        let prods = S.products || [];
        if (catF) prods = prods.filter(p => p.cat === catF);
        if (search) prods = prods.filter(p => (p.ar || '').toLowerCase().includes(search) || (p.en || '').toLowerCase().includes(search) || (p.id || '').toLowerCase().includes(search));

        // Build product cards grid
        const gridEl = document.getElementById('cs-grid');
        if (gridEl) {
          let html = '';
          prods.forEach(p => {
            const cs = S.centerStock[p.id];
            const qty = cs ? (cs.qty || 0) : 0;
            const uom = cs ? cs.uom : (p.unit || 'Kg');
            const status = getCsStatus(qty);
            if (statusF && status.key !== statusF) return;

            const isSelected = S_inspectedProdId === p.id;
            const deptCls = p.cat === 'beef' ? 'card-dept-meat' : (p.cat === 'sauces' ? 'card-dept-recipes' : 'card-dept-stock');
            const targetStock = 10;
            const suffRatio = Math.min(100, Math.round((qty / targetStock) * 100));
            const suffColor = qty >= 5 ? '#10b981' : (qty > 0 ? '#fbbf24' : '#f43f5e');

            html += '<div class="card ' + deptCls + ' ' + (isSelected ? 'selected-stream-card' : '') + '" data-id="' + p.id + '" onclick="selectCenterStockItem(\'' + p.id + '\')" style="padding:15px 16px;cursor:pointer;border-radius:14px;transition:all 0.2s ease;">' +
              '<div class="flex items-center justify-between mb-2">' +
              '<span class="badge ' + status.badge + '" style="font-size:10px;font-weight:800;border-radius:6px;">' + status.label + '</span>' +
              '<span style="font-size:10.5px;color:#8B5CF6;font-weight:700;">' + (p.cat || 'CK') + '</span>' +
              '</div>' +
              '<div style="font-size:13.5px;font-weight:700;color:#f1f5f9;margin-bottom:6px;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="' + pname(p) + '">' + pname(p) + '</div>' +
              '<div class="kpi-number" style="font-size:1.7rem;color:' + (qty > 0 ? '#A78BFA' : '#64748b') + ';text-shadow:' + (qty > 0 ? '0 0 12px rgba(124,58,237,0.35)' : 'none') + '\">' + (qty % 1 === 0 ? qty : qty.toFixed(2)) + ' <span style="font-size:11.5px;color:#94a3b8;font-weight:600">' + uom + '</span></div>' +
              '<div class="stock-sufficiency-bar" title="Stock Coverage: ' + suffRatio + '%\">' +
              '<div class="stock-sufficiency-fill" style="width:' + suffRatio + '%;background:' + suffColor + ';"></div>' +
              '</div>' +
              (cs ? '<div style="font-size:10px;color:#64748b;margin-top:6px;display:flex;justify-content:space-between"><span>' + ('Updated:') + '</span><span>' + (cs.updatedAt || '').split('T')[0] + '</span></div>' : '<div style="font-size:10px;color:#64748b;margin-top:6px">' + ('No batches logged') + '</div>') +
              '</div>';
          });

          gridEl.innerHTML = html || ('<div class="text-muted text-center" style="grid-column:1/-1;padding:40px;border-radius:14px;background:rgba(255,255,255,0.02)">' + ('No matching products') + '</div>');
        }

        // Render Movement Log Table
        const logEl = document.getElementById('cs-log-table');
        if (logEl) {
          const log = (S.centerStockLog || []).slice(0, 50);
          if (!log.length) {
            logEl.innerHTML = '<div class="text-muted text-sm text-center" style="padding:24px">' + ('No movements logged yet') + '</div>';
          } else {
            logEl.innerHTML = '<table class="data-table"><thead><tr>' +
              '<th>' + ('Date') + '</th>' +
              '<th>' + ('Product') + '</th>' +
              '<th>' + ('Change') + '</th>' +
              '<th>' + ('Action') + '</th>' +
              '<th>' + ('Notes') + '</th>' +
              '</tr></thead><tbody>' + log.map(l => {
                const prod = S.products.find(p => p.id === l.productId);
                const actionMap = {
                  production: '<span class="badge badge-green" style="font-size:10px;font-weight:700">🏭 ' + ('Production') + '</span>',
                  branch_pull: '<span class="badge badge-amber" style="font-size:10px;font-weight:700">🚚 ' + ('Branch Pull') + '</span>',
                  adjustment: '<span class="badge" style="font-size:10px;font-weight:700;background:rgba(6,182,212,0.2);color:#06b6d4">✏️ ' + ('Adjustment') + '</span>'
                };
                const changeColor = l.qtyChange >= 0 ? '#4ade80' : '#f87171';
                return '<tr>' +
                  '<td style="font-size:11px;color:#94a3b8">' + (l.createdAt ? l.createdAt.replace('T', ', ').slice(0, 16) : '') + '</td>' +
                  '<td style="font-weight:700">' + (prod ? pname(prod) : l.productId) + '</td>' +
                  '<td style="color:' + changeColor + ';font-weight:800;direction:ltr;text-align:center">' + (l.qtyChange >= 0 ? '+' : '') + l.qtyChange + '</td>' +
                  '<td>' + (actionMap[l.action] || l.action) + '</td>' +
                  '<td style="color:#94a3b8;font-size:11px">' + (l.branch || l.notes || '-') + '</td>' +
                  '</tr>';
              }).join('') + '</tbody></table>';
          }
        }

        // Auto inspect first product if none inspected
        if (!S_inspectedProdId && S.products && S.products.length > 0) {
          selectCenterStockItem(S.products[0].id);
        }
      }


      function renderAlerts(shorts) {
        const el = document.getElementById('dash-alerts');
        if (!shorts.length) {
          el.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;padding:16px;border-radius:12px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.18)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <span style="color:#4ade80;font-size:13.5px;font-weight:600">${'All stock levels are completely adequate for today!'}</span>
      </div>
    `;
          return;
        }

        el.innerHTML = shorts.map(s => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-radius:12px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.18);margin-bottom:10px;flex-wrap:wrap;gap:10px">
      <div style="display:flex;align-items:center;gap:12px">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg>
        <span style="color:#ffffff;font-size:14px;font-weight:700">${iname(s.id)}</span>
        <span class="text-muted text-sm">${'Shortage to Order:'} <span style="color:#f87171;font-weight:700">${f2(s.shortage)} ${s.unit}</span></span>
      </div>
      <button class="btn btn-danger btn-sm" onclick="nav('purchase')">${'Order Now'}</button>
    </div>
  `).join('');
      }

      function renderChartIng() {
        const ctx = document.getElementById('ch-ing');
        if (!ctx) return;
        if (chIng) {
          chIng.destroy();
          chIng = null;
        }
        const rm = computeRM();
        const labs = rm.slice(0, 7).map(m => iname(m.id));
        const data = rm.slice(0, 7).map(m => +m.total.toFixed(2));
        const colors = ['#f97316', '#8b5cf6', '#22c55e', '#3b82f6', '#eab308', '#ec4899', '#06b6d4'];

        chIng = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labs,
            datasets: [{
              data: data,
              backgroundColor: colors.map(c => c + 'cc'),
              borderColor: colors,
              borderWidth: 2,
              borderRadius: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: {
                ticks: { color: '#94a3b8', font: { size: 11, family: 'Inter, sans-serif' } },
                grid: { color: 'rgba(255, 255, 255, 0.04)' }
              },
              y: {
                ticks: { color: '#94a3b8', font: { size: 11 } },
                grid: { color: 'rgba(255, 255, 255, 0.04)' }
              }
            }
          }
        });
      }

      function renderChartBr() {
        const ctx = document.getElementById('ch-br');
        if (!ctx) return;
        if (chBr) {
          chBr.destroy();
          chBr = null;
        }
        const bmap = {};
        S.orders.forEach(o => {
          if (!bmap[o.branch]) bmap[o.branch] = 0;
          Object.values(o.items).forEach(v => bmap[o.branch] += v);
        });
        const labs = Object.keys(bmap);
        const data = Object.values(bmap);
        const colors = ['#f97316', '#8b5cf6', '#22c55e', '#3b82f6'];

        chBr = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: labs,
            datasets: [{
              data: data,
              backgroundColor: colors.map(c => c + 'cc'),
              borderColor: colors,
              borderWidth: 2,
              hoverOffset: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { color: '#94a3b8', padding: 14, font: { size: 11.5, family: 'Inter, sans-serif' } }
              }
            }
          }
        });
      }

      /* ============================================================
         BRANCH ORDERS — DYNAMIC PICKER & INDIVIDUAL LOG OVERHAUL
      ============================================================ */
      let _manualOrderItems = {};
      let _ordersLogCollapsed = false;

      function syncBranchDropdowns() {
        const allBranches = (S.branches && S.branches.length) ? S.branches : [
          'Downtown Central Kitchen',
          'Westside Hub',
          'Eastside Flagship',
          'North Coast Express'
        ];
        S.branches = allBranches;

        const oBranch = document.getElementById('o-branch');
        if (oBranch && oBranch.options.length <= 1) {
          const curVal = oBranch.value;
          oBranch.innerHTML = `<option value="">${'-- Select Branch --'}</option>` +
            allBranches.map(b => `<option value="${b}">${b}</option>`).join('');
          if (curVal) oBranch.value = curVal;
        }

        const fBranch = document.getElementById('f-branch');
        if (fBranch && fBranch.options.length <= 1) {
          const curFVal = fBranch.value;
          fBranch.innerHTML = `<option value="">${'🏢 All Branches'}</option>` +
            allBranches.map(b => `<option value="${b}">${b}</option>`).join('');
          if (curFVal) fBranch.value = curFVal;
        }
      }

      function initManualItemPicker() {
        const select = document.getElementById('o-item-select');
        if (!select || select.options.length > 1) return;

        const cats = {
          sauces: { label: '🥣 Sauces', items: [] },
          beef: { label: '🥩 Beef & Burgers', items: [] },
          chicken: { label: '🍗 Chicken', items: [] },
          bakery: { label: '🥐 Bakery', items: [] },
          cheese: { label: '🧀 Cheeses', items: [] },
          veggies: { label: '🥗 Veggies', items: [] },
          drinks: { label: '🍹 Drinks', items: [] },
          prep: { label: '📦 General Prep', items: [] }
        };

        S.products.forEach(p => {
          const c = cats[p.cat] || cats.prep;
          c.items.push(p);
        });

        let html = `<option value="">${'-- Select Product (171 items) --'}</option>`;
        Object.values(cats).forEach(grp => {
          if (grp.items.length) {
            html += `<optgroup label="${grp.label}">`;
            grp.items.forEach(p => {
              html += `<option value="${p.id}">${pname(p)} (${p.unit}) — ${f2(p.cost)} ${cur()}</option>`;
            });
            html += `</optgroup>`;
          }
        });
        select.innerHTML = html;
      }

      function addManualOrderItem() {
        const select = document.getElementById('o-item-select');
        const qtyInput = document.getElementById('o-item-qty');
        const pid = select.value;
        const qty = parseFloat(qtyInput.value) || 0;

        if (!pid) {
          toast('Please select a product', 'warning');
          return;
        }
        if (qty <= 0) {
          toast('Enter quantity > 0', 'warning');
          return;
        }

        _manualOrderItems[pid] = (_manualOrderItems[pid] || 0) + qty;
        renderManualSelectedTable();
        qtyInput.value = '1';
        select.value = '';
        select.focus();
      }

      function updateManualItemQty(pid, newQty) {
        const q = parseFloat(newQty) || 0;
        if (q <= 0) {
          delete _manualOrderItems[pid];
        } else {
          _manualOrderItems[pid] = q;
        }
        renderManualSelectedTable();
      }

      function removeManualOrderItem(pid) {
        delete _manualOrderItems[pid];
        renderManualSelectedTable();
      }

      function clearManualOrderItems() {
        _manualOrderItems = {};
        renderManualSelectedTable();
      }

      function renderManualSelectedTable() {
        const wrap = document.getElementById('o-selected-wrap');
        const tbody = document.getElementById('o-selected-tbody');
        const totalEl = document.getElementById('o-manual-total-cost');
        const entries = Object.entries(_manualOrderItems);

        if (!entries.length) {
          if (wrap) wrap.style.display = 'none';
          return;
        }
        if (wrap) wrap.style.display = 'block';

        let grandTotal = 0;
        tbody.innerHTML = entries.map(([pid, qty]) => {
          const p = S.products.find(x => x.id === pid);
          const name = p ? pname(p) : pid;
          const unit = p ? p.unit : 'kg';
          const cost = p ? p.cost : 0;
          const lineTotal = qty * cost;
          grandTotal += lineTotal;

          return `
          <tr>
            <td style="color:#fff;font-weight:700">${name}</td>
            <td style="text-align:center">
              <input type="number" step="any" min="0.01" value="${qty}" class="input" style="width:70px;padding:3px 6px;text-align:center;font-size:11.5px;font-weight:700" onchange="updateManualItemQty('${pid}', this.value)" />
            </td>
            <td style="text-align:center;color:#94a3b8">${unit}</td>
            <td style="text-align:center;color:#4ade80;font-weight:700">${fmt(Math.round(lineTotal))}</td>
            <td style="text-align:center">
              <button type="button" onclick="removeManualOrderItem('${pid}')" style="background:none;border:none;color:#f87171;cursor:pointer;font-weight:700;font-size:13px" title="Delete item">✕</button>
            </td>
          </tr>
        `;
        }).join('');

        if (totalEl) totalEl.textContent = `${fmt(Math.round(grandTotal))} ${cur()}`;
      }

      function toggleOrdersListCollapse() {
        _ordersLogCollapsed = !_ordersLogCollapsed;
        const container = document.getElementById('orders-log-container');
        const textEl = document.getElementById('toggle-orders-log-text');
        if (container) {
          container.style.display = _ordersLogCollapsed ? 'none' : 'block';
        }
        if (textEl) {
          textEl.textContent = _ordersLogCollapsed ? '👁️ Show Individual Log' : '👁️ Hide Individual Log';
        }
      }

      function toggleOrderDetailRow(orderId) {
        const row = document.getElementById('order-detail-row-' + orderId);
        if (row) {
          row.style.display = (row.style.display === 'none' || !row.style.display) ? 'table-row' : 'none';
        }
      }


      function switchOrdersTab(tabId) {
        document.querySelectorAll('.orders-tab-pane').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.orders-tab-btn').forEach(el => el.classList.remove('active'));

        const targetPane = document.getElementById('orders-pane-' + tabId);
        const targetBtn = document.getElementById('orders-tab-' + tabId);
        if (targetPane) targetPane.style.display = 'block';
        if (targetBtn) targetBtn.classList.add('active');

        if (tabId === 'manual') {
          initManualItemPicker();
          syncBranchDropdowns();
          const oDateEl = document.getElementById('o-date');
          if (oDateEl && !oDateEl.value) oDateEl.value = todayStr();
        }
      }

      function renderOrders() {
        syncBranchDropdowns();
        initManualItemPicker();

        const oDateEl = document.getElementById('o-date');
        if (oDateEl && !oDateEl.value) oDateEl.value = todayStr();

        const fb = (document.getElementById('f-branch')?.value || '').trim();
        const fd = (document.getElementById('f-date')?.value || '').trim();

        const btnClearDate = document.getElementById('btn-clear-date');
        if (btnClearDate) {
          btnClearDate.style.display = fd ? 'inline-flex' : 'none';
          if (fd) btnClearDate.innerHTML = `🗑️ <span>${'Delete orders for ' + fd}</span>`;
        }

        const filtered = S.orders.filter(o => {
          const orderDate = normalizeDateIso(o.date);
          if (fb && o.branch !== fb && !o.branch.includes(fb) && !fb.includes(o.branch)) return false;
          if (fd && orderDate !== fd) return false;
          return true;
        });

        // Update Executive KPI Summary
        const kpiTotalOrders = filtered.length;
        const kpiActiveBranches = new Set(filtered.map(o => o.branch)).size;
        let kpiTotalUnits = 0;
        let kpiTotalValue = 0;
        filtered.forEach(o => {
          Object.entries(o.items || {}).forEach(([pid, q]) => {
            kpiTotalUnits += q;
            const p = S.products.find(x => x.id === pid);
            if (p) kpiTotalValue += q * (p.cost || 0);
          });
        });

        const elTotal = document.getElementById('orders-kpi-total');
        if (elTotal) elTotal.textContent = kpiTotalOrders;
        const elBranches = document.getElementById('orders-kpi-branches');
        if (elBranches) elBranches.textContent = kpiActiveBranches;
        const elUnits = document.getElementById('orders-kpi-units');
        if (elUnits) elUnits.textContent = fmt(kpiTotalUnits);
        const elVal = document.getElementById('orders-kpi-val');
        if (elVal) elVal.textContent = fmt(Math.round(kpiTotalValue)) + ' ' + cur();

        // ── Aggregated Table ──
        const agg = {};
        S.products.forEach(p => agg[p.id] = { p, tot: 0, brs: new Set() });
        filtered.forEach(o => {
          Object.entries(o.items || {}).forEach(([pid, q]) => {
            if (agg[pid]) {
              agg[pid].tot += q;
              agg[pid].brs.add(o.branch);
            }
          });
        });

        const filterDesc = (fd ? ` (${fd})` : '') + (fb ? ` (${fb})` : '');
        document.getElementById('orders-count-badge').textContent = filtered.length + ' ' + T('Orders' + filterDesc, 'Orders' + filterDesc);

        const aggHtml = Object.values(agg).filter(a => a.tot > 0).map(a => `
        <tr>
          <td>
            <div style="display:flex;align-items:center;gap:9px">
              <span style="width:9px;height:9px;border-radius:50%;background:${a.p.color};display:inline-block"></span>
              <span style="font-weight:700;color:#fff">${pname(a.p)}</span>
            </div>
          </td>
          <td><span style="font-weight:800;color:#fff">${fmt(a.tot)} ${a.p.unit}</span></td>
          <td><span class="badge badge-slate">${a.brs.size} ${'branches'}</span></td>
          <td style="color:#fbbf24">${f2(a.p.cost)} ${cur()}</td>
          <td><span class="text-gradient font-bold">${fmt(Math.round(a.tot * a.p.cost))} ${cur()}</span></td>
        </tr>
      `).join('');

        document.getElementById('agg-body').innerHTML = aggHtml || `<tr><td colspan="5" class="text-muted" style="text-align:center;padding:24px">${'No orders matching current filter'}</td></tr>`;

        // ── Sleek Individual Orders Log Table ──
        const indivTbody = document.getElementById('orders-tbl-body');
        const indivEmpty = document.getElementById('orders-list-empty');
        const countBadge = document.getElementById('indiv-orders-count-badge');
        if (countBadge) countBadge.textContent = `${filtered.length} ${'orders'}`;

        if (!filtered.length) {
          if (indivTbody) indivTbody.innerHTML = '';
          if (indivEmpty) indivEmpty.style.display = 'block';
          return;
        }
        if (indivEmpty) indivEmpty.style.display = 'none';

        if (indivTbody) {
          indivTbody.innerHTML = filtered.map((o, idx) => {
            const oDateNorm = normalizeDateIso(o.date);
            const totalVal = Object.entries(o.items || {}).reduce((s, [pid, q]) => {
              const p = S.products.find(x => x.id === pid);
              return s + (p ? q * p.cost : 0);
            }, 0);

            const entries = Object.entries(o.items || {}).filter(([, v]) => v > 0);
            const distinctCount = entries.length;
            const totalUnits = entries.reduce((s, [, q]) => s + q, 0);

            // Dynamic Order Status & Dispatch Pill
            const statusVal = o.status || 'Pending';
            let statusBadge = '';
            if (statusVal === 'Delivered') {
              statusBadge = `<span class="badge" style="background:rgba(16,185,129,0.12);color:#059669;font-weight:800;border:1px solid rgba(16,185,129,0.25);padding:4px 10px;border-radius:6px">✅ Delivered</span>`;
            } else if (statusVal === 'Processing') {
              statusBadge = `<button type="button" class="btn btn-sm btn-solid-amber" style="font-size:11px;padding:3px 10px;border-radius:6px;font-weight:700;cursor:pointer" onclick="dispatchOrder('${o.id}')" title="Ship, deliver and deduct stock">⚡ Processing (Dispatch ➔)</button>`;
            } else {
              statusBadge = `<button type="button" class="btn btn-sm btn-secondary" style="font-size:11px;padding:3px 10px;border-radius:6px;font-weight:700;cursor:pointer" onclick="updateOrderStatus('${o.id}', 'Processing')" title="Start order preparation">⏳ Pending Prep</button>`;
            }

            // Generate nested sub-table breakdown
            const subRows = entries.map(([pid, q]) => {
              const p = S.products.find(x => x.id === pid);
              const pTitle = p ? pname(p) : pid;
              const pUnit = p ? p.unit : 'kg';
              const pCost = p ? p.cost : 0;
              return `
              <tr style="background:rgba(15,23,42,0.6);border-bottom:1px solid rgba(255,255,255,0.04)">
                <td style="padding:6px 12px;color:#e2e8f0">${pTitle}</td>
                <td style="padding:6px 12px;text-align:center;font-weight:700;color:#38bdf8">${fmt(q)}</td>
                <td style="padding:6px 12px;text-align:center;color:#94a3b8;font-size:11px">${pUnit}</td>
                <td style="padding:6px 12px;text-align:center;color:#fbbf24">${f2(pCost)}</td>
                <td style="padding:6px 12px;text-align:center;color:#4ade80;font-weight:700">${fmt(Math.round(q * pCost))} ${cur()}</td>
              </tr>
            `;
            }).join('');

            return `
            <tr style="border-bottom:1px solid rgba(255,255,255,0.06)">
              <td style="text-align:center;color:#64748b;font-size:11.5px">${idx + 1}</td>
              <td>
                <div style="font-weight:800;color:#18181B;font-size:13.5px">${o.branch}</div>
                ${o.notes ? `<div style="font-size:11px;color:#78716C;margin-top:2px">📝 ${o.notes}</div>` : ''}
              </td>
              <td style="text-align:center">
                <span class="chip" style="background:rgba(234,179,8,0.12);color:#b45309;font-family:monospace;font-size:11px">${oDateNorm}</span>
              </td>
              <td style="text-align:center">${statusBadge}</td>
              <td style="text-align:center">
                <span class="badge badge-green" style="font-weight:700">${distinctCount} ${'items'} (${fmt(totalUnits)} ${'units'})</span>
              </td>
              <td style="text-align:center;font-weight:800;color:#059669;font-size:13px">${fmt(Math.round(totalVal))} ${cur()}</td>
              <td style="text-align:center">
                <div class="flex gap-1.5 justify-center">
                  <button class="btn btn-secondary btn-sm" style="font-size:11px;padding:3px 7px;border-radius:9999px" onclick="toggleOrderDetailRow('${o.id}')" title="View item details">
                    📋 ${'Items'}
                  </button>
                  ${statusVal !== 'Delivered' ? `<button class="btn btn-solid-amber btn-sm" style="font-size:11px;padding:3px 8px;border-radius:9999px;font-weight:700" onclick="dispatchOrder('${o.id}')" title="Ship, deliver and deduct stock">🚚 Dispatch</button>` : ''}
                  <button class="btn btn-sm" style="font-size:11px;padding:3px 7px;border-radius:9999px;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.3);color:#dc2626" onclick="delOrder('${o.id}')" title="Delete Order">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
            <tr id="order-detail-row-${o.id}" style="display:none;background:rgba(0,0,0,0.25)">
              <td colspan="7" style="padding:10px 14px">
                <div style="background:rgba(15,23,42,0.85);border:1px solid rgba(56,189,248,0.2);border-radius:10px;padding:12px">
                  <div class="flex justify-between items-center mb-2">
                    <span style="font-size:12px;font-weight:700;color:#38bdf8">📦 Order Items Breakdown for ${o.branch} (${oDateNorm})</span>
                    <span class="text-muted" style="font-size:11.5px">Total: <b style="color:#4ade80">${fmt(Math.round(totalVal))} ${cur()}</b></span>
                  </div>
                  <div class="tbl-wrap" style="max-height:180px">
                    <table class="tbl" style="font-size:11.5px">
                      <thead>
                        <tr>
                          <th>${'Product'}</th>
                          <th style="width:75px;text-align:center">${'Qty'}</th>
                          <th style="width:60px;text-align:center">${'Unit'}</th>
                          <th style="width:75px;text-align:center">${'Price'}</th>
                          <th style="width:90px;text-align:center">${'Total'}</th>
                        </tr>
                      </thead>
                      <tbody>${subRows}</tbody>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
          `;
          }).join('');
        }
      }

      function submitOrder() {
        const branch = document.getElementById('o-branch').value;
        const date = normalizeDateIso(document.getElementById('o-date').value);
        if (!branch) {
          toast('Please select a branch', 'error');
          return;
        }
        if (!Object.keys(_manualOrderItems).length) {
          toast('Please add at least one product using (+) button', 'error');
          return;
        }

        const newOrder = {
          id: Date.now(),
          branch: branch,
          date: date,
          items: { ..._manualOrderItems },
          notes: document.getElementById('o-notes').value || 'Manual entry'
        };

        S.orders.unshift(newOrder);
        apiSaveOrders([newOrder]);

        // ⚡ Auto-deduct stock for manual order
        const manualDeductRes = deductStockForOrders([newOrder]);

        _manualOrderItems = {};
        renderManualSelectedTable();
        document.getElementById('o-notes').value = '';

        saveState();
        if (manualDeductRes.deductedRawCount > 0) {
          toast(`✅ Order saved & auto-deducted stock!`);
        } else {
          toast('✅ Order recorded and synced to cloud!');
        }
        renderOrders();
        if (typeof renderInv === 'function') renderInv();
        if (typeof renderProd === 'function') renderProd();
      }

      function delOrder(id) {
        if (!confirm('Are you sure you want to delete this order?')) return;
        S.orders = S.orders.filter(o => o.id !== id);
        apiDeleteOrder(id);
        saveState();
        renderOrders();
        if (typeof renderProd === 'function') renderProd();
        toast('Order removed', 'info');
      }

      function clearOrdersForDate() {
        const fd = (document.getElementById('f-date')?.value || '').trim();
        if (!fd) {
          toast('Select a date from filter first', 'warning');
          return;
        }
        if (!confirm(`Delete all orders for date (${fd})?`)) return;
        const countBefore = S.orders.length;
        S.orders = S.orders.filter(o => normalizeDateIso(o.date) !== fd);
        const deletedCount = countBefore - S.orders.length;
        if (S.taztikiRecords) {
          S.taztikiRecords = S.taztikiRecords.filter(r => normalizeDateIso(r.date) !== fd);
        }
        apiDeleteOrdersForDate(fd);
        saveState();
        renderOrders();
        if (typeof renderProd === 'function') renderProd();
        toast(`🗑️ Deleted ${deletedCount} orders for ${fd}!`);
      }

      function clearAllOrders() {
        if (!S.orders || !S.orders.length) {
          toast('No orders to delete', 'info');
          return;
        }
        if (!confirm(`⚠️ Are you sure you want to delete all ${S.orders.length} orders?`)) return;
        S.orders = [];
        S.taztikiRecords = [];
        apiClearAllOrders();
        saveState();
        renderOrders();
        if (typeof renderProd === 'function') renderProd();
        toast('All orders cleared!');
      }

      function clearFilters() {
        document.getElementById('f-branch').value = '';
        document.getElementById('f-date').value = '';
        renderOrders();
      }

      /* ============================================================
         RECIPES (BOM)
      ============================================================ */
      function renderRecipes() {
        if (!S.curRecipe && S.products.length) {
          S.curRecipe = S.products[0].id;
        }
        const chv = '<polyline points="9 18 15 12 9 6"/>';

        document.getElementById('recipe-list').innerHTML = S.products.map(p => {
          const r = S.recipes[p.id];
          const cost = r ? recipeCost(r) : 0;
          return `
      <div class="nav-item ${S.curRecipe === p.id ? 'active' : ''}" onclick="selRecipe('${p.id}')">
        <span style="width:10px;height:10px;border-radius:50%;background:${p.color};flex-shrink:0;display:inline-block"></span>
        <div style="flex:1;min-width:0">
          <div style="font-size:13.5px;font-weight:700;display:flex;align-items:center;gap:6px">
            <span class="badge" style="background:rgba(249,115,22,0.15);border:1px solid rgba(249,115,22,0.3);color:#fb923c;font-size:10.5px;font-family:monospace;padding:1px 5px">#${p.code || p.item_no || ''}</span>
            <span>${pname(p)}</span>
          </div>
          <div style="font-size:11.5px;color:#94a3b8">${f2(cost)} ${cur()} / ${'unit'}</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${chv}</svg>
      </div>
    `;
        }).join('');

        renderBOM(S.curRecipe);
      }

      function filterRecipesList() {
        const q = (document.getElementById('recipe-search-input')?.value || '').trim().toLowerCase();
        const listEl = document.getElementById('recipe-list');
        if (!listEl) return;

        const prodsWithRecs = S.products.filter(p => S.recipes[p.id] && S.recipes[p.id].ings && S.recipes[p.id].ings.length > 0)
          .sort((a, b) => pname(a).localeCompare(pname(b), 'en', { sensitivity: 'base' }));

        const filtered = q
          ? prodsWithRecs.filter(p => (p.ar && p.ar.toLowerCase().includes(q)) || (p.en && p.en.toLowerCase().includes(q)) || p.id.toLowerCase().includes(q) || (p.code && p.code.toLowerCase().includes(q)) || (p.item_no && p.item_no.toLowerCase().includes(q)))
          : prodsWithRecs;

        const chv = '<polyline points="9 18 15 12 9 6"/>';
        const badge = document.getElementById('recipes-count-badge');
        if (badge) badge.textContent = `${filtered.length} Recipes`;

        if (!filtered.length) {
          listEl.innerHTML = `<div class="text-muted text-sm text-center" style="padding:20px">${'No matching recipes'}</div>`;
          return;
        }

        listEl.innerHTML = filtered.map(p => {
          const r = S.recipes[p.id];
          const cost = r ? recipeCost(r) : p.cost;
          const ingsCount = r && r.ings ? r.ings.length : 0;
          return `
          <div class="nav-item ${S.curRecipe === p.id ? 'active' : ''}" onclick="selRecipe('${p.id}')" style="padding:10px 12px;margin-bottom:6px;border-radius:10px;transition:all 0.2s">
            <span style="width:9px;height:9px;border-radius:50%;background:${p.color};flex-shrink:0;display:inline-block"></span>
            <div style="flex:1;min-width:0">
              <div style="font-size:13px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${pname(p)}</div>
              <div style="font-size:11px;color:#94a3b8;display:flex;gap:8px;align-items:center;margin-top:2px">
                <span style="color:#fbbf24">${f2(cost)} ${cur()} / ${p.unit}</span>
                <span class="badge badge-slate" style="font-size:10px;padding:1px 5px">${ingsCount} Ingredients</span>
              </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${chv}</svg>
          </div>
        `;
        }).join('');
      }

      function selRecipe(id) {
        S.curRecipe = id;
        renderRecipes();
      }

      /* ============================================================
     CENTRAL KITCHEN MANUFACTURING BOM & LIVE DEMAND AGGREGATION
  ============================================================ */
      let _activeRecipeTab = 'base';

      function switchRecipeTab(tabName) {
        _activeRecipeTab = tabName;
        const tabBase = document.getElementById('recipe-tab-base');
        const tabBatch = document.getElementById('recipe-tab-batch');
        const btnBase = document.getElementById('tab-btn-base-bom');
        const btnBatch = document.getElementById('tab-btn-batch-bom');

        if (tabName === 'batch') {
          if (tabBase) tabBase.style.display = 'none';
          if (tabBatch) tabBatch.style.display = 'block';
          if (btnBase) { btnBase.className = 'btn btn-sm btn-secondary'; }
          if (btnBatch) { btnBatch.className = 'btn btn-sm btn-primary'; }
          calcBatchDeduction();
        } else {
          if (tabBase) tabBase.style.display = 'block';
          if (tabBatch) tabBatch.style.display = 'none';
          if (btnBase) { btnBase.className = 'btn btn-sm btn-primary'; }
          if (btnBatch) { btnBatch.className = 'btn btn-sm btn-secondary'; }
        }
      }

      function applyBranchDemandToBatch() {
        const pid = S.curRecipe;
        if (!pid) return;
        let totalDemand = 0;
        S.orders.forEach(o => {
          if (o.items && o.items[pid]) totalDemand += o.items[pid];
        });

        if (totalDemand <= 0) {
          toast('No branch demand registered for this product', 'warning');
          return;
        }

        const input = document.getElementById('batch-prod-qty');
        if (input) input.value = totalDemand.toFixed(2);
        switchRecipeTab('batch');
        calcBatchDeduction();
        toast(`Applied ${totalDemand.toFixed(2)} to batch calculator!`);
      }

      function renderBOM(pid) {
        const p = S.products.find(x => x.id === pid);
        if (!p) {
          document.getElementById('recipe-title').textContent = '—';
          return;
        }
        if (!S.recipes[pid]) S.recipes[pid] = { ings: [] };
        const rec = S.recipes[pid];

        document.getElementById('recipe-title').textContent = pname(p);
        const cost = recipeCost(rec);
        document.getElementById('recipe-total-cost').textContent = f2(cost);
        p.cost = cost;

        const costLbl = document.getElementById('recipe-cost-label');
        if (costLbl) costLbl.textContent = `${cur()} / ${p.unit} produced`;

        const catBadge = document.getElementById('recipe-cat-badge');
        if (catBadge) {
          catBadge.textContent = p.cat ? (p.cat === 'sauces' ? '🥣 Sauces & Seasonings' : (p.cat === 'bakery' ? '🥐 Bakery' : (p.cat === 'beef' ? '🥩 Beef & Patties' : (p.cat === 'chicken' ? '🍗 Poultry' : '🥫 Kitchen Prep')))) : 'CK Product';
        }

        // Calculate Live Branch Demand for this Product
        let totalDemand = 0;
        const demandingBranches = [];
        S.orders.forEach(o => {
          if (o.items && o.items[pid] && o.items[pid] > 0) {
            const qty = o.items[pid];
            totalDemand += qty;
            demandingBranches.push({
              branch: o.branch,
              qty: qty,
              date: o.date
            });
          }
        });

        const demandBadge = document.getElementById('recipe-demand-total-badge');
        if (demandBadge) demandBadge.textContent = `${totalDemand.toFixed(2)} ${p.unit}`;

        const countBadge = document.getElementById('recipe-demand-branches-count');
        if (countBadge) countBadge.textContent = `${demandingBranches.length} branches`;

        const demandTags = document.getElementById('recipe-demand-branches-tags');
        if (demandTags) {
          if (demandingBranches.length > 0) {
            demandTags.innerHTML = demandingBranches.map(b => `
            <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:5px 10px;border-radius:8px;font-size:12px;box-shadow:0 2px 6px rgba(0,0,0,0.15)">
              <span style="color:#cbd5e1;font-weight:600">🏢 ${b.branch}</span>
              <span style="color:#38bdf8;font-weight:900;background:rgba(56,189,248,0.15);border:1px solid rgba(56,189,248,0.25);padding:1px 7px;border-radius:6px">${fmt(b.qty)} ${p.unit}</span>
            </div>
          `).join('');
          } else {
            demandTags.innerHTML = `<span class="text-muted text-xs" style="padding:2px 0">${'No active branch orders'}</span>`;
          }
        }

        const batchUom = document.getElementById('batch-prod-uom');
        if (batchUom) batchUom.textContent = p.unit;

        const batchQtyInput = document.getElementById('batch-prod-qty');
        if (batchQtyInput && (!batchQtyInput.value || batchQtyInput.value === '20')) {
          batchQtyInput.value = totalDemand > 0 ? totalDemand.toFixed(2) : '20';
        }

        // Render Base Recipe Table
        document.getElementById('recipe-tbl').innerHTML = rec.ings.map((ing, i) => {
          const d = S.ings[ing.id];
          if (!d) return '';
          const eff = ing.qty * (1 + ing.waste / 100);
          const lc = eff * d.price;
          return `
          <tr>
            <td>
              <select class="select" style="padding:6px 10px;font-size:13px" onchange="updIng('${pid}', ${i}, 'id', this.value)">
                ${Object.entries(S.ings).map(([k, v]) => `<option value="${k}" ${k === ing.id ? 'selected' : ''}>${isAr() ? v.ar : v.en}</option>`).join('')}
              </select>
            </td>
            <td>
              <input type="number" step="any" min="0" value="${ing.qty}" class="input" style="width:85px;padding:6px 10px;font-size:13px" onchange="updIng('${pid}', ${i}, 'qty', +this.value)"/>
            </td>
            <td class="text-muted" style="font-size:13px">${d.uom}</td>
            <td class="text-muted" style="font-size:13px">${d.price} ${cur()}</td>
            <td>
              <div style="display:flex;align-items:center;gap:4px">
                <input type="number" step="1" min="0" max="100" value="${ing.waste}" class="input" style="width:65px;padding:6px 10px;font-size:13px" onchange="updIng('${pid}', ${i}, 'waste', +this.value)"/>
                <span style="color:#94a3b8">%</span>
              </div>
            </td>
            <td style="font-weight:700;color:#fbbf24;font-size:14px">${f2(lc)} ${cur()}</td>
            <td>
              <button class="btn btn-danger btn-icon btn-sm" onclick="remIng('${pid}', ${i})">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
              </button>
            </td>
          </tr>
        `;
        }).join('') || `<tr><td colspan="7" class="text-muted" style="text-align:center;padding:24px">${'No ingredients yet'}</td></tr>`;

        calcBatchDeduction();
      }

      function calcBatchDeduction() {
        const pid = S.curRecipe;
        const tbody = document.getElementById('batch-deduction-tbody');
        if (!tbody || !pid) return;

        const rec = S.recipes[pid];
        if (!rec || !rec.ings || !rec.ings.length) {
          tbody.innerHTML = `<tr><td colspan="6" class="text-muted" style="text-align:center;padding:20px">${'No ingredients found'}</td></tr>`;
          return;
        }

        const batchQty = parseFloat(document.getElementById('batch-prod-qty')?.value || 0);

        tbody.innerHTML = rec.ings.map(ing => {
          const d = S.ings[ing.id];
          if (!d) return '';
          const effRatio = ing.qty * (1 + (ing.waste || 0) / 100);
          const totalNeeded = batchQty * effRatio;
          const curStock = d.stock || 0;
          const remStock = Math.max(0, curStock - totalNeeded);
          const isShort = curStock < totalNeeded;
          const diffShort = isShort ? (totalNeeded - curStock) : 0;

          const statusBadge = isShort
            ? `<span class="badge badge-red" style="font-weight:800">⚠️ Deficit: ${fmt(diffShort)} ${d.uom}</span>`
            : `<span class="badge badge-green" style="font-weight:700">✅ In Stock</span>`;

          return `
          <tr>
            <td style="font-weight:700;color:#fff">${isAr() ? d.ar : d.en}</td>
            <td style="text-align:center;font-size:12px;color:#94a3b8">${ing.qty} ${d.uom} (+${ing.waste || 0}%)</td>
            <td style="text-align:center;font-weight:900;color:#38bdf8;font-size:14px">${fmt(totalNeeded)} ${d.uom}</td>
            <td style="text-align:center;font-weight:700">${fmt(curStock)} ${d.uom}</td>
            <td style="text-align:center;font-weight:800;color:${isShort ? '#f87171' : '#4ade80'}">${fmt(remStock)} ${d.uom}</td>
            <td style="text-align:center">${statusBadge}</td>
          </tr>
        `;
        }).join('');
      }

      async function executeBatchDeduction() {
        const pid = S.curRecipe;
        const p = S.products.find(x => x.id === pid);
        const batchQty = parseFloat(document.getElementById('batch-prod-qty')?.value || 0);
        if (!p || !pid || batchQty <= 0) {
          toast('Enter valid quantity', 'error');
          return;
        }
        const rec = S.recipes[pid];
        if (!rec || !rec.ings || !rec.ings.length) {
          toast('No ingredients in recipe', 'error');
          return;
        }

        const pTitle = pname(p);
        if (!confirm(`Confirm batch production of ${batchQty} ${p.unit} of ${pTitle}?`)) return;

        let deductedItemsCount = 0;
        const deductionsList = [];
        rec.ings.forEach(ing => {
          const d = S.ings[ing.id];
          if (d) {
            const effRatio = ing.qty * (1 + (ing.waste || 0) / 100);
            const totalNeeded = batchQty * effRatio;
            d.stock = Math.max(0, parseFloat((d.stock - totalNeeded).toFixed(4)));
            deductionsList.push({ id: ing.id, qty: totalNeeded });
            deductedItemsCount++;
          }
        });

        // ⚡ Increment finished product stock
        p.stock = Math.round(((Number(p.stock) || 0) + batchQty) * 100) / 100;

        // Also track in S.centerStock
        S.centerStock = S.centerStock || {};
        if (!S.centerStock[pid]) {
          S.centerStock[pid] = { qty: 0, uom: p.unit || 'Kg', updatedAt: new Date().toISOString() };
        }
        S.centerStock[pid].qty = Math.round(((S.centerStock[pid].qty || 0) + batchQty) * 100) / 100;
        S.centerStock[pid].updatedAt = new Date().toISOString();

        // Log transaction in central stock log
        S.centerStockLog = S.centerStockLog || [];
        S.centerStockLog.unshift({
          productId: pid,
          qtyChange: batchQty,
          action: 'production',
          branch: null,
          refOrderId: null,
          notes: `BOM Batch Execution: +${batchQty} ${p.unit}`,
          createdAt: new Date().toISOString()
        });

        // Sync deduction & production increment with SQL database
        apiBatchDeduct(pid, batchQty, deductionsList);
        saveState();

        // ⚡ Dynamic Reactive Inter-Module Synchronization
        renderInv();
        renderBOM(pid);
        if (typeof renderDash === 'function') renderDash();
        if (typeof updateStockHealthDial === 'function') updateStockHealthDial();
        if (typeof renderCenterStock === 'function') renderCenterStock();
        if (typeof renderProd === 'function') renderProd();
        if (typeof renderOrders === 'function') renderOrders();
        updateLiveTicker();

        toast(`✅ Batch production recorded and inventory updated!`);
      }

      function updIng(pid, i, f, v) {
        S.recipes[pid].ings[i][f] = (f === 'id') ? v : +v;
        saveState();
        renderBOM(pid);
        renderRecipes();
      }
      function remIng(pid, i) {
        S.recipes[pid].ings.splice(i, 1);
        saveState();
        renderBOM(pid);
        renderRecipes();
      }
      function addIngRow() {
        if (!S.curRecipe) {
          toast('Select product', 'error');
          return;
        }
        const k = Object.keys(S.ings)[0];
        S.recipes[S.curRecipe].ings.push({ id: k, qty: 0.1, waste: 5 });
        saveState();
        renderBOM(S.curRecipe);
      }

      function saveProduct() {
        const a = document.getElementById('prod-ar').value.trim();
        const e = document.getElementById('prod-en').value.trim();
        if (!a || !e) {
          toast('Enter both names', 'error');
          return;
        }
        const id = 'prod_' + Date.now();
        const color = document.getElementById('prod-color').value;
        const unit = document.getElementById('prod-unit') ? document.getElementById('prod-unit').value : 'pcs';
        S.products.push({ id, ar: a, en: e, unit, cost: 0, color });
        S.recipes[id] = { ings: [] };
        closeModal('modal-prod');
        document.getElementById('prod-ar').value = '';
        document.getElementById('prod-en').value = '';
        S.curRecipe = id;
        saveState();
        renderRecipes();
        toast('✅ CK Product created!');
      }

      /* ============================================================
         PRODUCTION ENGINE & EXECUTIVE DAILY DISPATCH MATRIX
      ============================================================ */

      /**
       * Get matrix data for selected month and day range
       */
      function getProdExecutiveMatrix() {
        const monthInput = document.getElementById('prod-matrix-month');
        const now = new Date();
        const curMonthStr = now.toISOString().slice(0, 7); // YYYY-MM
        if (!monthInput.value) monthInput.value = curMonthStr;
        const monthStr = monthInput.value;

        const fromDay = Math.max(1, parseInt(document.getElementById('prod-day-from')?.value || 1, 10));
        const toDay = Math.min(31, parseInt(document.getElementById('prod-day-to')?.value || 31, 10));

        // Determine total days in this month
        const [y, m] = monthStr.split('-').map(Number);
        const daysInMonth = new Date(y, m, 0).getDate();
        const validToDay = Math.min(toDay, daysInMonth);

        // Generate array of day numbers: e.g. [1, 2, 3, ... 31]
        const days = [];
        for (let d = fromDay; d <= validToDay; d++) days.push(d);

        // Filter products by category (excluding taztiki from main rows since it has separate sheet/panel)
        const cat = document.getElementById('prod-cat-filter')?.value || '';
        const search = (document.getElementById('prod-search-input')?.value || '').trim().toLowerCase();

        let prods = S.products.filter(p => p.id !== 'burger-sauce');
        if (cat) prods = prods.filter(p => p.cat === cat);
        if (search) prods = prods.filter(p => (p.ar && p.ar.toLowerCase().includes(search)) || (p.en && p.en.toLowerCase().includes(search)));

        // Matrix: matrix[prodId][dayNumber] = total quantity
        const matrix = {};
        prods.forEach(p => {
          matrix[p.id] = {};
          days.forEach(d => { matrix[p.id][d] = 0; });
        });

        // Pull orders matching monthStr with normalized ISO date
        const monthOrders = S.orders.filter(o => {
          const norm = normalizeDateIso(o.date);
          return norm && norm.startsWith(monthStr);
        });
        monthOrders.forEach(o => {
          const norm = normalizeDateIso(o.date);
          const dayNum = parseInt(norm.split('-')[2], 10);
          if (dayNum >= fromDay && dayNum <= validToDay) {
            Object.entries(o.items || {}).forEach(([pid, qty]) => {
              if (matrix[pid] && matrix[pid][dayNum] !== undefined) {
                matrix[pid][dayNum] += qty;
              }
            });
          }
        });

        return { monthStr, fromDay, toDay: validToDay, days, prods, matrix, monthOrders };
      }


      function switchProdTab(tabId) {
        document.querySelectorAll('.prod-tab-pane').forEach(el => el.style.display = 'none');
        document.querySelectorAll('#page-production .orders-tab-btn').forEach(el => el.classList.remove('active'));

        const targetPane = document.getElementById('prod-pane-' + tabId);
        const targetBtn = document.getElementById('prod-tab-' + tabId);
        if (targetPane) targetPane.style.display = 'block';
        if (targetBtn) targetBtn.classList.add('active');
      }

      function renderProd() {
        const monthInput = document.getElementById('prod-matrix-month');
        if (!monthInput.value) monthInput.value = new Date().toISOString().slice(0, 7);

        const { monthStr, days, prods, matrix, monthOrders } = getProdExecutiveMatrix();

        // Compute Grand Totals
        const totalUnits = prods.reduce((sum, p) => sum + Object.values(matrix[p.id] || {}).reduce((a, b) => a + b, 0), 0);
        const totalValue = prods.reduce((sum, p) => {
          const pUnits = Object.values(matrix[p.id] || {}).reduce((a, b) => a + b, 0);
          return sum + (pUnits * (p.cost || 30));
        }, 0);

        const tazTotal = (S.taztikiRecords || [])
          .filter(r => {
            const norm = normalizeDateIso(r.date);
            return norm && norm.startsWith(monthStr);
          })
          .reduce((s, r) => s + parseFloat(r.qty || 0), 0);

        // Render Top KPI Cards
        const kpis = [
          { v: fmt(totalUnits), l: `Total Monthly Units (${monthStr})`, c: 'kpi-cyan', sub: `${prods.length} ${'active items'}` },
          { v: fmt(Math.round(totalValue)) + ' ' + cur(), l: 'Est. Production Value', c: 'kpi-amber', sub: 'Based on item cost' },
          { v: days.length + ' ' + 'Days', l: 'Active Days Scope', c: 'kpi-green', sub: `Day ${days[0]} to ${days[days.length - 1]}` },
          { v: fmt(tazTotal, 1) + ' L', l: 'Taztiki Sauce Shipped', c: 'kpi-purple', sub: 'Separate dedicated sheet' }
        ];

        document.getElementById('prod-stats').innerHTML = kpis.map(k => `
    <div class="stat-card">
      <div class="kpi-number ${k.c}" style="margin-bottom:4px">${k.v}</div>
      <div class="text-muted text-sm font-semibold mb-1">${k.l}</div>
      <div style="font-size:11.5px;color:#94a3b8">${k.sub}</div>
    </div>
  `).join('');

        renderProdMatrixTable();
        renderProdTaztikiTable();
        renderProdRMTable();
      }

      function renderProdMatrixTable() {
        const { fromDay, toDay, days, prods, matrix } = getProdExecutiveMatrix();

        document.getElementById('prod-items-count-badge').textContent = `${prods.length} ${'Items'}`;
        document.getElementById('prod-days-count-badge').textContent = `${days.length} ${'Days'}`;

        const thead =
          document.getElementById('prod-matrix-thead') ||
          document.getElementById('prod-matrix-head');

        const tbody =
          document.getElementById('prod-matrix-tbody') ||
          document.getElementById('prod-matrix-body');

        // Build Thead: [ # | Item Name | Unit | Day 1..n | Total | Daily Avg | Total Cost ]
        thead.innerHTML = `
    <tr>
      <th style="width:40px;text-align:center">#</th>
      <th style="min-width:170px">${'Item / Product'}</th>
      <th style="width:70px;text-align:center">${'UOM'}</th>
      ${days.map(d => `<th style="min-width:48px;text-align:center;padding:7px 4px;font-size:11.5px">${d}</th>`).join('')}
      <th style="min-width:90px;text-align:center;color:#38bdf8;font-weight:800">${'Total'}</th>
      <th style="min-width:75px;text-align:center;color:#fbbf24">${'Avg/Day'}</th>
      <th style="min-width:90px;text-align:center;color:#4ade80">${'Total Value ($)'}</th>
    </tr>
  `;

        if (!prods.length) {
          tbody.innerHTML = `<tr><td colspan="${days.length + 6}" class="text-center text-muted" style="padding:30px">${'No products found'}</td></tr>`;
          return;
        }

        // High-performance chunked row rendering
        tbody.innerHTML = '';
        window._prodMatrixToken = (window._prodMatrixToken || 0) + 1;
        const curToken = window._prodMatrixToken;
        const CHUNK_SIZE = 25;
        let curIdx = 0;

        const scheduleNext = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : (fn => setTimeout(fn, 0));

        function renderBatch() {
          if (window._prodMatrixToken !== curToken) return;

          const end = Math.min(curIdx + CHUNK_SIZE, prods.length);
          let batchHtml = '';

          for (let idx = curIdx; idx < end; idx++) {
            const p = prods[idx];
            const dm = matrix[p.id] || {};
            const rowTotal = days.reduce((s, d) => s + (dm[d] || 0), 0);
            const avgDaily = days.length ? (rowTotal / days.length).toFixed(1) : 0;
            const rowValue = rowTotal * (p.cost || 30);

            const cells = days.map(d => {
              const v = dm[d] || 0;
              const isHigh = v > 50;
              const hasVal = v > 0;
              return `<td style="text-align:center;padding:6px 4px;font-size:12px;${hasVal ? (isHigh ? 'color:#4ade80;font-weight:700;background:rgba(74,222,128,0.06)' : 'color:#f1f5f9;font-weight:600') : 'color:#475569'}">
        ${hasVal ? fmt(v, v % 1 === 0 ? 0 : 2) : '—'}
      </td>`;
            }).join('');

            batchHtml += `
      <tr>
        <td style="text-align:center;color:#64748b;font-size:11px">${idx + 1}</td>
        <td>
          <div style="display:flex;align-items:center;gap:7px">
            <span style="width:8px;height:8px;border-radius:50%;background:${p.color || '#f97316'};flex-shrink:0"></span>
            <span style="font-weight:700;color:#fff">${pname(p)}</span>
          </div>
        </td>
        <td style="text-align:center"><span class="badge badge-gray" style="font-size:11px">${p.unit}</span></td>
        ${cells}
        <td style="text-align:center;font-weight:800;color:#38bdf8;background:rgba(56,189,248,0.05)">${rowTotal > 0 ? fmt(rowTotal, rowTotal % 1 === 0 ? 0 : 2) : '—'}</td>
        <td style="text-align:center;font-weight:600;color:#fbbf24">${avgDaily > 0 ? avgDaily : '—'}</td>
        <td style="text-align:center;font-weight:700;color:#4ade80">${rowValue > 0 ? fmt(Math.round(rowValue)) : '—'}</td>
      </tr>
    `;
          }

          if (typeof tbody.insertAdjacentHTML === 'function') { tbody.insertAdjacentHTML('beforeend', batchHtml); } else { tbody.innerHTML += batchHtml; }
          curIdx = end;

          if (curIdx < prods.length) {
            scheduleNext(renderBatch);
          } else {
            // Append Grand Totals Summary Row
            const grandDayTotals = days.map(d => prods.reduce((s, p) => s + ((matrix[p.id] && matrix[p.id][d]) || 0), 0));
            const grandTotalUnits = grandDayTotals.reduce((a, b) => a + b, 0);
            const grandTotalValue = prods.reduce((sum, p) => {
              const rTot = days.reduce((s, d) => s + ((matrix[p.id] && matrix[p.id][d]) || 0), 0);
              return sum + (rTot * (p.cost || 30));
            }, 0);

            const grandRowHtml = `
    <tr style="background:rgba(249,115,22,0.08);border-top:2px solid rgba(249,115,22,0.3);font-weight:800">
      <td colspan="3" style="text-align:start;color:#fb923c;padding:10px 14px">
        ⚡ ${'Daily Total All Products'}
      </td>
      ${grandDayTotals.map(t => `<td style="text-align:center;color:#fb923c;font-size:12px">${t > 0 ? fmt(Math.round(t)) : '—'}</td>`).join('')}
      <td style="text-align:center;color:#38bdf8;font-size:14px">${fmt(Math.round(grandTotalUnits))}</td>
      <td style="text-align:center;color:#fbbf24">${days.length ? (grandTotalUnits / days.length).toFixed(0) : 0}</td>
      <td style="text-align:center;color:#4ade80;font-size:13px">${fmt(Math.round(grandTotalValue))}</td>
    </tr>
  `;
            if (typeof tbody.insertAdjacentHTML === 'function') {
              tbody.insertAdjacentHTML('beforeend', grandRowHtml);
            } else {
              tbody.innerHTML += grandRowHtml;
            }
          }
        }

        renderBatch();
      }

      function renderProdTaztikiTable() {
        const monthInput = document.getElementById('prod-matrix-month');
        const monthStr = monthInput ? monthInput.value : '';
        const records = (S.taztikiRecords || []).filter(r => {
          const norm = normalizeDateIso(r.date);
          return !monthStr || norm.startsWith(monthStr);
        });
        const tbody = document.getElementById('prod-taztiki-tbody');
        const empty = document.getElementById('prod-taztiki-empty');

        if (!records.length) {
          if (tbody) tbody.innerHTML = '';
          if (empty) empty.style.display = 'block';
          return;
        }
        if (empty) empty.style.display = 'none';

        if (tbody) {
          tbody.innerHTML = records.slice().sort((a, b) => a.date.localeCompare(b.date)).map((r, i) => `
      <tr>
        <td style="font-weight:700;color:#fff">${r.date}</td>
        <td style="color:#c084fc;font-weight:800;font-size:14px">${fmt(r.qty, 2)} L</td>
        <td style="color:#e2e8f0">${r.branches || 'All Branches'}</td>
        <td class="text-muted text-sm">${r.notes || '—'}</td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="deleteTaztikiRow(${i})" style="padding:3px 8px;color:#f87171" title="Delete">✕</button>
        </td>
      </tr>
    `).join('');
        }
      }

      function renderProdRMTable() {
        const rm = computeRM();
        const tbody = document.getElementById('prod-rm-tbl');
        if (!tbody) return;

        tbody.innerHTML = rm.map(m => {
          const d = S.ings[m.id];
          if (!d) return '';
          const cost = m.total * d.price;
          const iv = S.ings[m.id];
          const short = iv && iv.stock < m.total;
          return `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:8px">
            ${short ? `<span class="badge badge-red" style="padding:1px 6px;font-size:10px">!</span>` : ''}
            <span style="font-weight:700;color:#fff">${isAr() ? d.ar : d.en}</span>
          </div>
        </td>
        <td class="text-muted">${f2(m.base)} ${d.uom}</td>
        <td style="color:#fbbf24">+${f2(m.waste)}</td>
        <td style="font-weight:800;color:#fff">${f2(m.total)} ${d.uom}</td>
        <td class="text-muted">${d.price} ${cur()}</td>
        <td style="${short ? 'color:#f87171' : 'color:#4ade80'};font-weight:700">${f2(cost)} ${cur()}</td>
        <td>${iv ? `<span style="font-weight:700;color:${short ? '#f87171' : '#4ade80'}">${iv.stock} ${d.uom}</span>` : '—'}</td>
        <td>
          ${short
              ? `<span class="badge badge-red badge-pulse">${'Shortage'}</span>`
              : `<span class="badge badge-green">${'Adequate'}</span>`}
        </td>
      </tr>
    `;
        }).join('');
      }

      /* ============================================================
         EXECUTIVE MANAGEMENT EXCEL EXPORT (MULTI-SHEET WITH TAZTIKI)
      ============================================================ */
      function exportExecutiveProductionExcel() {
        if (typeof XLSX === 'undefined') {
          alert('Please wait, loading XLSX library...');
          return;
        }

        const { monthStr, fromDay, toDay, days, prods, matrix } = getProdExecutiveMatrix();
        const wb = XLSX.utils.book_new();

        // ════════════════════════════════════════════════════════════
        // SHEET 1: Daily Production & Branch Dispatch
        // ════════════════════════════════════════════════════════════
        const s1Rows = [
          ['Smart Kitchen ERP — Central Kitchen Operations'],
          ['Daily Production & Branch Supply Report'],
          [`Period: Month of ${monthStr} (Days ${fromDay} to ${toDay})`, '', '', `Export Date: ${new Date().toLocaleDateString('en-GB')}`],
          [], // Blank separator row
          ['#', 'Item Code', 'Item Name', 'Category', 'Unit', ...days.map(d => `Day ${d}`), 'Total Demand', 'Daily Avg', 'Total Cost ($)']
        ];

        prods.forEach((p, idx) => {
          const dm = matrix[p.id] || {};
          const rowTotal = days.reduce((s, d) => s + (dm[d] || 0), 0);
          const avgDaily = days.length ? (rowTotal / days.length).toFixed(2) : 0;
          const unitCost = p.cost || 30;
          const totalCost = rowTotal * unitCost;

          s1Rows.push([
            idx + 1,
            p.id,
            pname(p),
            p.cat || 'Prep',
            p.unit,
            ...days.map(d => dm[d] || 0),
            rowTotal,
            parseFloat(avgDaily),
            unitCost,
            Math.round(totalCost)
          ]);
        });

        // Totals Row
        const grandDayTotals = days.map(d => prods.reduce((s, p) => s + ((matrix[p.id] && matrix[p.id][d]) || 0), 0));
        const grandUnits = grandDayTotals.reduce((a, b) => a + b, 0);
        const grandValue = prods.reduce((sum, p) => {
          const rTot = days.reduce((s, d) => s + ((matrix[p.id] && matrix[p.id][d]) || 0), 0);
          return sum + (rTot * (p.cost || 30));
        }, 0);

        s1Rows.push([
          'Grand Total',
          '',
          'Daily total for all products',
          '',
          '',
          ...grandDayTotals,
          grandUnits,
          days.length ? (grandUnits / days.length).toFixed(2) : 0,
          '',
          Math.round(grandValue)
        ]);

        const ws1 = XLSX.utils.aoa_to_sheet(s1Rows);
        ws1['!cols'] = [
          { wch: 6 }, { wch: 16 }, { wch: 30 }, { wch: 14 }, { wch: 8 },
          ...days.map(() => ({ wch: 9 })),
          { wch: 14 }, { wch: 12 }, { wch: 14 }, { wch: 18 }
        ];
        XLSX.utils.book_append_sheet(wb, ws1, 'Daily_Production');

        // ════════════════════════════════════════════════════════════
        // SHEET 2: Burger Sauce (Dedicated Separate Sheet)
        // ════════════════════════════════════════════════════════════
        const taztikiInRange = (S.taztikiRecords || []).filter(r => !monthStr || (r.date && r.date.startsWith(monthStr))).sort((a, b) => a.date.localeCompare(b.date));
        const tazTotalLtr = taztikiInRange.reduce((s, r) => s + parseFloat(r.qty || 0), 0);

        const s2Rows = [
          ['Smart Kitchen ERP — Central Kitchen Operations'],
          ['Burger Sauce Shipments & Production Log'],
          [`Report Month: ${monthStr}`, '', `Total Volume: ${tazTotalLtr.toFixed(2)} L`],
          [],
          ['#', 'Date', 'Burger Sauce Qty (L)', 'Receiving Branches', 'Operations Notes']
        ];

        taztikiInRange.forEach((r, idx) => {
          s2Rows.push([
            idx + 1,
            r.date,
            parseFloat(r.qty || 0),
            r.branches || 'All Branches',
            r.notes || 'Regular Production'
          ]);
        });

        s2Rows.push(['Total', '', tazTotalLtr, '', '']);

        const ws2 = XLSX.utils.aoa_to_sheet(s2Rows);
        ws2['!cols'] = [{ wch: 6 }, { wch: 14 }, { wch: 22 }, { wch: 30 }, { wch: 30 }];
        XLSX.utils.book_append_sheet(wb, ws2, 'Burger_Sauce');

        // ════════════════════════════════════════════════════════════
        // SHEET 3: Executive Summary
        // ════════════════════════════════════════════════════════════
        const s3Rows = [
          ['Smart Kitchen ERP — Executive Operations & Management'],
          ['Executive Monthly Production & Supply Summary'],
          [],
          ['Operational KPI', 'Achieved Value', 'Unit'],
          ['Total Items Produced & Dispatched', grandUnits, 'Units / kg / L'],
          ['Total Estimated Production Value', Math.round(grandValue), 'USD ($)'],
          ['Total Burger Sauce Volume', tazTotalLtr, 'Liters'],
          ['Active Operating Days Range', days.length, 'Days'],
          ['Average Daily Demand & Output', (grandUnits / (days.length || 1)).toFixed(1), 'Units / Day'],
          [],
          ['Central Kitchen Manager Sign-off:', '', 'Operations Director Sign-off:', '', 'Finance Dept Sign-off:'],
          ['________________________', '', '________________________', '', '________________________']
        ];

        const ws3 = XLSX.utils.aoa_to_sheet(s3Rows);
        ws3['!cols'] = [{ wch: 36 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }];
        XLSX.utils.book_append_sheet(wb, ws3, 'Executive_Summary');

        const fileName = `Daily_Production_Report_${monthStr}.xlsx`;
        XLSX.writeFile(wb, fileName);
      }

      /* ============================================================
     INVENTORY (139 RAW MATERIALS MASTER)
  ============================================================ */
      let _selectedInvCategory = 'all';

      function setInvCategory(cat, btn) {
        _selectedInvCategory = cat;
        document.querySelectorAll('.inv-cat-btn').forEach(b => {
          b.className = 'btn btn-sm inv-cat-btn btn-secondary';
        });
        if (btn) {
          btn.className = 'btn btn-sm inv-cat-btn btn-primary';
        }
        renderInv();
      }


      /* ── Smart Unit of Measure (UOM) Intelligence ── */
      function parseUOM(uom) {
        const u = (uom || '').trim();
        const lower = u.toLowerCase();

        // 1. Bulk weight (Kilogram)
        if (lower === 'kilogram' || lower === 'kg') {
          return {
            type: 'weight',
            isCountable: false,
            tagAr: 'kg',
            tagEn: 'Kg',
            unitTypeAr: 'Weight (kg)',
            unitTypeEn: 'Weight in Kg',
            step: 0.1,
            raw: u
          };
        }

        // 2. Bulk volume (Liter)
        if (lower === 'liter' || lower === 'ltr' || lower === 'l') {
          return {
            type: 'volume',
            isCountable: false,
            tagAr: 'L',
            tagEn: 'L',
            unitTypeAr: 'Volume (Liters)',
            unitTypeEn: 'Volume in Liters',
            step: 0.1,
            raw: u
          };
        }

        // 3. Sacks & Bags (Corn Starch 25kg, Flour 50kg, Sugar 50kg, Salt Chinese 25kg, etc.)
        // MEASURED BY WEIGHT (Kg) because bags get opened, used partially, and weighed!
        if (lower.startsWith('bag')) {
          const size = u.replace(/^bag\s*/i, '').trim();
          return {
            type: 'sack_weight',
            isCountable: false,
            tagAr: 'kg',
            tagEn: 'Kg',
            unitTypeAr: size ? ('Bulk Bag (' + size + ')') : 'Bulk Bag',
            unitTypeEn: size ? ('Weight in Kg (Bag ' + size + ')') : 'Weight in Kg (Bag)',
            step: 0.1,
            raw: u
          };
        }

        // 4. Jars -> COUNTABLE (Jar)
        if (lower.startsWith('jar')) {
          const size = u.replace(/^jar\s*/i, '').trim();
          return {
            type: 'jar',
            isCountable: true,
            tagAr: 'Jar',
            tagEn: 'Jar',
            unitTypeAr: size ? ('Jar (' + size + ')') : 'Jar',
            unitTypeEn: size ? ('Countable Jars (' + size + ')') : 'Countable Jars',
            step: 1,
            raw: u
          };
        }

        // 5. Bottles -> COUNTABLE (Bottle)
        if (lower.startsWith('btl')) {
          const size = u.replace(/^btl\s*/i, '').trim();
          return {
            type: 'bottle',
            isCountable: true,
            tagAr: 'Bottle',
            tagEn: 'Btl',
            unitTypeAr: size ? ('Bottle (' + size + ')') : 'Bottle',
            unitTypeEn: size ? ('Countable Bottles (' + size + ')') : 'Countable Bottles',
            step: 1,
            raw: u
          };
        }

        // 6. Gallons -> COUNTABLE (Gallon)
        if (lower.startsWith('gal')) {
          const size = u.replace(/^gal\s*/i, '').trim();
          return {
            type: 'gallon',
            isCountable: true,
            tagAr: 'Gallon',
            tagEn: 'Gal',
            unitTypeAr: size ? ('Gallon (' + size + ')') : 'Gallon',
            unitTypeEn: size ? ('Countable Gallons (' + size + ')') : 'Countable Gallons',
            step: 1,
            raw: u
          };
        }

        // 7. Boxes -> COUNTABLE (Box)
        if (lower.startsWith('box')) {
          const size = u.replace(/^box\s*/i, '').trim();
          return {
            type: 'box',
            isCountable: true,
            tagAr: 'Box',
            tagEn: 'Box',
            unitTypeAr: size ? ('Box (' + size + ')') : 'Box',
            unitTypeEn: size ? ('Countable Boxes (' + size + ')') : 'Countable Boxes',
            step: 1,
            raw: u
          };
        }

        // 8. Plates -> COUNTABLE (Tray)
        if (lower.startsWith('plate')) {
          return {
            type: 'plate',
            isCountable: true,
            tagAr: 'Tray',
            tagEn: 'Plate',
            unitTypeAr: 'Tray (30 eggs)',
            unitTypeEn: 'Countable Plates (30 Pcs)',
            step: 1,
            raw: u
          };
        }

        // 9. Packets -> COUNTABLE (Packet)
        if (lower.startsWith('pkt')) {
          const size = u.replace(/^pkt\s*/i, '').trim();
          return {
            type: 'packet',
            isCountable: true,
            tagAr: 'Pkt',
            tagEn: 'Pkt',
            unitTypeAr: size ? ('Packet (' + size + ')') : 'Packet',
            unitTypeEn: size ? ('Countable Packets (' + size + ')') : 'Countable Packets',
            step: 1,
            raw: u
          };
        }

        // 10. Each / Pcs -> COUNTABLE (Piece)
        return {
          type: 'piece',
          isCountable: true,
          tagAr: 'Pcs',
          tagEn: 'Pcs',
          unitTypeAr: 'Unit (Piece)',
          unitTypeEn: 'Per Piece',
          step: 1,
          raw: u
        };
      }

      function formatSmartStock(qty, uom, arabic = false) {
        const info = parseUOM(uom);
        const n = Number(qty) || 0;
        const numStr = info.isCountable
          ? (n % 1 === 0 ? String(n) : n.toFixed(1))
          : (n % 1 === 0 ? String(n) : n.toFixed(2));
        const tag = arabic ? info.tagAr : info.tagEn;
        const unitType = arabic ? info.unitTypeAr : info.unitTypeEn;
        return { num: numStr, tag, unitType, info };
      }

      function renderInv() {
        const rm = computeRM();
        const rmap = {};
        rm.forEach(m => rmap[m.id] = m.total);

        const searchInput = document.getElementById('inv-search-input');
        const query = (searchInput?.value || '').trim().toLowerCase();

        let entries = Object.entries(S.ings);

        // Filter by category
        if (_selectedInvCategory && _selectedInvCategory !== 'all') {
          entries = entries.filter(([id, iv]) => (iv.cat || iv.category) === _selectedInvCategory);
        }

        // Filter by search query (Code, Arabic Name, English Name, Supplier, Category)
        if (query) {
          entries = entries.filter(([id, iv]) => {
            const ar = (iv.ar || '').toLowerCase();
            const en = (iv.en || '').toLowerCase();
            const code = (iv.code || '').toLowerCase();
            const cat = (iv.cat || iv.category || '').toLowerCase();
            const sup = (iv.sup || '').toLowerCase();
            return ar.includes(query) || en.includes(query) || code.includes(query) || id.toLowerCase().includes(query) || cat.includes(query) || sup.includes(query);
          });
        }

        // Sort alphabetically A-Z
        entries.sort((a, b) => {
          const nameA = isAr() ? (a[1].ar || a[1].en) : (a[1].en || a[1].ar);
          const nameB = isAr() ? (b[1].ar || b[1].en) : (b[1].en || b[1].ar);
          return nameA.localeCompare(nameB, 'en', { sensitivity: 'base' });
        });

        const rows = entries.map(([id, iv]) => {
          const req = rmap[id] || 0;
          const gap = req - iv.stock;
          const isShort = gap > 0;
          const isLow = iv.stock <= iv.safety && !isShort;
          const pct = req > 0 ? Math.min(100, (iv.stock / req) * 100) : 100;
          return {
            id, iv, req, gap, isShort, isLow, pct,
            bc: isShort ? '#ef4444' : isLow ? '#eab308' : '#22c55e'
          };
        });

        const allEntries = Object.values(S.ings);
        const totalShort = allEntries.filter(iv => {
          const req = rmap[iv.id] || 0;
          return (req - iv.stock) > 0;
        }).length;
        const totalLow = allEntries.filter(iv => iv.stock <= iv.safety).length;

        const statsEl = document.getElementById('inv-stats');
        if (statsEl) {
          statsEl.innerHTML = [
            { v: allEntries.length, l: 'Total Raw Materials', c: '#ffffff' },
            { v: totalShort, l: 'Material Shortages', c: '#f87171' },
            { v: totalLow, l: 'Low Safety Stock', c: '#fbbf24' },
            { v: allEntries.length - totalShort, l: 'Adequate Stock', c: '#4ade80' }
          ].map(s => `
          <div class="stat-card" style="text-align:center">
            <div style="font-size:26px;font-weight:800;color:${s.c}">${s.v}</div>
            <div class="text-muted text-sm mt-2">${s.l}</div>
          </div>
        `).join('');
        }

        const tbl = document.getElementById('inv-tbl');
        if (!tbl) return;
        if (!rows.length) {
          tbl.innerHTML = `<tr><td colspan="10" class="text-center text-muted" style="padding:32px">${'No materials matching search/filter'}</td></tr>`;
          return;
        }

        tbl.innerHTML = rows.map(r => {
          const d = S.ings[r.id];
          if (!d) return '';
          const nameTitle = d.en || d.ar;
          const itemCode = d.code || r.id.replace('raw-', '');
          const catBadge = d.cat || d.category || 'Grocery';

          // Smart UOM calculation: Countable vs Bulk Weight
          const curStock = formatSmartStock(r.iv.stock, r.iv.uom, isAr());
          const safStock = formatSmartStock(r.iv.safety, r.iv.uom, isAr());
          const reqStock = formatSmartStock(r.req, r.iv.uom, isAr());

          const stockColor = r.isShort ? '#f87171' : r.isLow ? '#fbbf24' : '#4ade80';

          return `
          <tr>
            <!-- 1. Item Code -->
            <td>
              <span class="badge" style="background:rgba(168,85,247,0.15);border:1px solid rgba(168,85,247,0.35);color:#c084fc;font-family:monospace;font-weight:700;font-size:12px;letter-spacing:0.5px">
                #${itemCode}
              </span>
            </td>

            <!-- 2. Material Name & UOM -->
            <td>
              <div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap">
                <span style="font-weight:700;color:#fff;font-size:14px">${nameTitle}</span>
                <span class="badge" style="background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.35);color:#38bdf8;font-size:11px;font-weight:700;padding:2px 7px;border-radius:6px;font-family:inherit" title="Standard Sheet Unit">${d.uom}</span>
              </div>
              <div style="font-size:11px;color:#94a3b8;margin-top:3px">${curStock.unitType}</div>
            </td>

            <!-- 3. Category -->
            <td>
              <span class="badge badge-indigo" style="font-size:11px;white-space:nowrap;padding:4px 8px">${catBadge}</span>
            </td>

            <!-- 4. Current Stock (Pcs / Kg) -->
            <td>
              <div style="font-weight:800;font-size:14.5px;color:${stockColor}">
                ${curStock.num} <span style="font-size:12px;font-weight:600">${curStock.tag}</span>
              </div>
            </td>

            <!-- 5. Safety Stock -->
            <td>
              <div style="font-weight:600;font-size:13px;color:#cbd5e1">
                ${safStock.num} <span style="font-size:11.5px;color:#94a3b8">${safStock.tag}</span>
              </div>
            </td>

            <!-- 6. Required for Production -->
            <td>
              <div style="font-weight:700;font-size:13px;color:#60a5fa">
                ${reqStock.num} <span style="font-size:11.5px;color:#93c5fd">${reqStock.tag}</span>
              </div>
            </td>

            <!-- 7. Stock Status -->
            <td>
              ${r.isShort
              ? `<span class="badge badge-red badge-pulse">${'Shortage'}</span>`
              : r.isLow
                ? `<span class="badge badge-amber">${'Low'}</span>`
                : `<span class="badge badge-green">✓ ${'Adequate'}</span>`}
            </td>

            <!-- 8. Coverage Indicator -->
            <td style="min-width:100px">
              <div class="progress" style="height:6px"><div class="progress-bar" style="width:${f2(r.pct)}%;background:${r.bc}"></div></div>
              <div style="font-size:11px;color:#94a3b8;margin-top:3px">${Math.round(r.pct)}%</div>
            </td>

            <!-- 9. Adjust Stock -->
            <td style="text-align:center">
              <button class="btn btn-secondary btn-icon btn-sm" onclick="openEditStock('${r.id}')" title="Adjust Stock">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
            </td>
          </tr>
        `;
        }).join('');
      }

      function openEditStock(id) {
        const iv = S.ings[id];
        const uInfo = parseUOM(iv.uom);
        document.getElementById('stock-ing-id').value = id;
        document.getElementById('stock-cur').value = iv.stock;
        document.getElementById('stock-safety').value = iv.safety;

        // Smart unit indication in edit modal
        const titleEl = document.getElementById('stock-modal-title');
        if (titleEl) {
          titleEl.innerHTML = `<span style="color:#fff">${iv.en || iv.ar}</span> <span class="badge" style="background:rgba(56,189,248,0.15);border:1px solid rgba(56,189,248,0.35);color:#38bdf8;font-size:11.5px;margin-inline-start:6px">${iv.uom}</span>`;
        }
        const curLbl = document.getElementById('stock-cur-lbl');
        const safLbl = document.getElementById('stock-safety-lbl');
        if (curLbl) {
          curLbl.textContent = isAr()
            ? ('Current Actual Stock (' + uInfo.unitTypeAr + ')')
            : ('Actual Stock Level (' + uInfo.unitTypeEn + ')');
        }
        if (safLbl) {
          safLbl.textContent = isAr()
            ? ('Safety Reorder Level (' + uInfo.unitTypeAr + ')')
            : ('Safety Level (' + uInfo.unitTypeEn + ')');
        }
        const curInput = document.getElementById('stock-cur');
        const safInput = document.getElementById('stock-safety');
        if (curInput) curInput.step = uInfo.step;
        if (safInput) safInput.step = uInfo.step;

        openModal('modal-stock');
      }

      function saveStock() {
        const id = document.getElementById('stock-ing-id').value;
        const newStock = +document.getElementById('stock-cur').value || 0;
        const newSafety = +document.getElementById('stock-safety').value || 0;
        S.ings[id].stock = newStock;
        S.ings[id].safety = newSafety;
        apiUpdateRawStock(id, newStock, newSafety, S.ings[id].price || 45);
        closeModal('modal-stock');
        saveState();
        renderInv();
        toast('✅ Stock updated in SQL!');
      }

      function saveIngredient() {
        const a = document.getElementById('ing-ar').value.trim();
        const e = document.getElementById('ing-en').value.trim();
        if (!a || !e) {
          toast('Enter both names', 'error');
          return;
        }
        const id = 'ing_' + Date.now();
        S.ings[id] = {
          ar: a,
          en: e,
          uom: document.getElementById('ing-uom').value,
          price: +document.getElementById('ing-price').value || 0,
          stock: +document.getElementById('ing-stock').value || 0,
          safety: +document.getElementById('ing-safety').value || 0,
          sup: document.getElementById('ing-sup').value.trim() || 'Default Vendor'
        };
        closeModal('modal-ing');
        ['ing-ar', 'ing-en', 'ing-sup', 'ing-price', 'ing-stock', 'ing-safety'].forEach(i => document.getElementById(i).value = '');
        saveState();
        renderInv();
        toast('✅ Ingredient added!');
      }

      /* ============================================================
         PURCHASE ORDERS
      ============================================================ */
      function genPOs() {
        const rm = computeRM();
        const rmap = {};
        rm.forEach(m => rmap[m.id] = m.total);

        S.POs = [];
        let pn = 1001;

        Object.entries(S.ings).forEach(([id, iv]) => {
          const d = S.ings[id];
          if (!d) return;
          const req = rmap[id] || 0;
          const gap = req - iv.stock;
          const isLow = iv.stock <= iv.safety;

          if (gap > 0 || isLow) {
            const qty = gap > 0 ? gap + iv.safety : (iv.safety * 2) - iv.stock;
            const qn = Math.max(0.1, qty);
            S.POs.push({
              id: 'PO-' + pn++,
              ingId: id,
              qty: f2(qn),
              unit: iv.uom,
              cost: f2(qn * d.price),
              sup: d.sup || 'General Vendor',
              priority: gap > 0 ? 'high' : 'medium',
              status: 'draft'
            });
          }
        });

        nav('purchase');
        saveState();
        toast(`✅ Generated ${S.POs.length} POs!`);
      }

      function renderPOs() {
        const dr = S.POs.filter(p => p.status === 'draft').length;
        const sn = S.POs.filter(p => p.status === 'sent').length;
        const rc = S.POs.filter(p => p.status === 'received').length;

        document.getElementById('po-stats').innerHTML = [
          { v: dr, l: 'Draft Orders', c: '#94a3b8' },
          { v: sn, l: 'Sent to Suppliers', c: '#fbbf24' },
          { v: rc, l: 'Received into Stock', c: '#4ade80' }
        ].map(s => `
    <div class="stat-card" style="text-align:center">
      <div style="font-size:26px;font-weight:800;color:${s.c}">${s.v}</div>
      <div class="text-muted text-sm mt-2">${s.l}</div>
    </div>
  `).join('');

        const em = document.getElementById('po-empty');
        const tbl = document.getElementById('po-tbl');

        if (!S.POs.length) {
          tbl.innerHTML = '';
          em.style.display = 'block';
          return;
        }
        em.style.display = 'none';

        const opts = [
          { v: 'draft', ar: '', en: 'Draft' },
          { v: 'sent', ar: '', en: 'Sent' },
          { v: 'received', ar: '', en: 'Received' }
        ];

        tbl.innerHTML = S.POs.map((po, i) => {
          const d = S.ings[po.ingId];
          const nm = d ? (isAr() ? d.ar : d.en) : po.ingId;
          return `
      <tr>
        <td class="td-mono font-bold">${po.id}</td>
        <td style="font-weight:700;color:#fff">${nm}</td>
        <td style="font-weight:800;color:#60a5fa">${po.qty}</td>
        <td class="text-muted">${po.unit}</td>
        <td><span class="text-gradient font-bold">${(+po.cost).toLocaleString('en-US')} ${cur()}</span></td>
        <td class="text-muted" style="font-size:12.5px">${po.sup}</td>
        <td>
          ${po.priority === 'high'
              ? `<span class="badge badge-red">${'Urgent'}</span>`
              : `<span class="badge badge-amber">${'Medium'}</span>`}
        </td>
        <td>
          <select class="select" style="padding:5px 10px;font-size:12.5px;width:auto;color:${po.status === 'received' ? '#4ade80' : po.status === 'sent' ? '#facc15' : '#94a3b8'}" onchange="updPO(${i}, this.value)">
            ${opts.map(o => `<option value="${o.v}" ${o.v === po.status ? 'selected' : ''}>${isAr() ? o.ar : o.en}</option>`).join('')}
          </select>
        </td>
        <td>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn-secondary btn-sm" onclick="printPO(${i})" title="${'Print Official PO Voucher'}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              ${'Print'}
            </button>
            ${po.status === 'draft'
              ? `<button class="btn btn-primary btn-sm" onclick="sendPO(${i})"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>${'Send'}</button>`
              : ''}
            ${po.status === 'sent'
              ? `<button class="btn btn-secondary btn-sm" style="color:#4ade80;border-color:rgba(74,222,128,0.3)" onclick="receivePO(${i})"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>${'Receive'}</button>`
              : ''}
          </div>
        </td>
      </tr>
    `;
        }).join('');
      }

      function updPO(i, v) {
        if (v === 'received' && S.POs[i].status !== 'received') {
          openReceiveModal(i);
        } else {
          S.POs[i].status = v;
          renderPOs();
        }
      }

      function sendPO(i) {
        S.POs[i].status = 'sent';
        renderPOs();
        toast('📤 Sent to supplier!');
      }

      function openReceiveModal(i) {
        const po = S.POs[i];
        const d = S.ings[po.ingId];
        const nm = d ? (isAr() ? d.ar : d.en) : po.ingId;
        document.getElementById('receive-po-idx').value = i;
        document.getElementById('invoice-number').value = '';
        document.getElementById('invoice-value').value = po.cost;
        document.getElementById('invoice-payment').value = 'unpaid';
        document.getElementById('invoice-notes').value = '';
        document.getElementById('receive-po-details').innerHTML =
          `<span style="color:#fb923c">${po.id}</span> &nbsp;|&nbsp; ${nm} &nbsp;|&nbsp; <span style="color:#60a5fa">${po.qty} ${po.unit}</span> &nbsp;|&nbsp; <span style="color:#fbbf24">${(+po.cost).toLocaleString('en-US')} ${cur()}</span><br/><span style="font-size:12px;color:#94a3b8;font-weight:400">${'Supplier: '}${po.sup}</span>`;
        openModal('modal-receive');
      }

      function confirmReceivePO() {
        const i = +document.getElementById('receive-po-idx').value;
        const invNum = document.getElementById('invoice-number').value.trim();
        if (!invNum) {
          toast('Please enter invoice number', 'error');
          return;
        }
        const po = S.POs[i];
        const d = S.ings[po.ingId];
        // Update stock
        if (d) d.stock += +po.qty;
        po.status = 'received';
        // Save invoice record
        const invValue = +document.getElementById('invoice-value').value || +po.cost;
        S.invoices.push({
          id: invNum,
          poId: po.id,
          ingId: po.ingId,
          qty: po.qty,
          unit: po.unit,
          value: f2(invValue),
          sup: po.sup,
          payment: document.getElementById('invoice-payment').value,
          notes: document.getElementById('invoice-notes').value.trim(),
          date: todayStr()
        });
        closeModal('modal-receive');
        renderPOs();
        renderInv();
        toast(`🧾 Received & Invoice ${invNum} saved!`);
      }

      function receivePO(i) {
        openReceiveModal(i);
      }

      /* ============================================================
         INVOICES
      ============================================================ */
      function renderInvoices() {
        const supFilter = document.getElementById('inv-bill-sup').value;
        const monthFilter = document.getElementById('inv-bill-month').value;

        // Populate supplier dropdown
        const supSel = document.getElementById('inv-bill-sup');
        const prevSup = supSel.value;
        const sups = [...new Set(S.invoices.map(v => v.sup))].sort();
        supSel.innerHTML = `<option value="" ${''} data-en="All Suppliers">${'All Suppliers'}</option>`
          + sups.map(s => `<option value="${s}" ${s === prevSup ? 'selected' : ''}>${s}</option>`).join('');

        const filtered = S.invoices.filter(v => {
          if (supFilter && v.sup !== supFilter) return false;
          if (monthFilter && !v.date.startsWith(monthFilter)) return false;
          return true;
        });

        const totalVal = filtered.reduce((s, v) => s + +v.value, 0);
        const unpaid = filtered.filter(v => v.payment === 'unpaid').length;
        const paid = filtered.filter(v => v.payment === 'paid').length;

        document.getElementById('inv-bill-stats').innerHTML = [
          { v: filtered.length, l: 'Total Invoices', c: '#fff' },
          { v: fmt(Math.round(totalVal)) + ' ' + cur(), l: 'Total Value', c: '#fb923c' },
          { v: unpaid, l: 'Unpaid Invoices', c: '#f87171' }
        ].map(s => `
    <div class="stat-card" style="text-align:center">
      <div style="font-size:24px;font-weight:800;color:${s.c}">${s.v}</div>
      <div class="text-muted text-sm mt-2">${s.l}</div>
    </div>
  `).join('');

        const em = document.getElementById('invoices-empty');
        const tbl = document.getElementById('invoices-tbl');
        if (!filtered.length) {
          tbl.innerHTML = '';
          em.style.display = 'block';
          return;
        }
        em.style.display = 'none';

        const payColors = { unpaid: '#f87171', paid: '#4ade80', partial: '#fbbf24' };
        const payLabels = {
          unpaid: 'Unpaid',
          paid: 'Paid',
          partial: 'Partial'
        };
        const payBadges = { unpaid: 'badge-red', paid: 'badge-green', partial: 'badge-amber' };

        tbl.innerHTML = [...filtered].reverse().map((v, idx) => {
          const d = S.ings[v.ingId];
          const nm = d ? (isAr() ? d.ar : d.en) : v.ingId;
          const globalIdx = S.invoices.findIndex(x => x.id === v.id && x.date === v.date && x.poId === v.poId);
          return `
      <tr>
        <td><span style="font-family:monospace;font-weight:700;color:#fb923c;font-size:13px">${v.id}</span></td>
        <td class="td-mono">${v.poId}</td>
        <td style="font-weight:700;color:#fff">${nm}</td>
        <td style="color:#60a5fa;font-weight:700">${v.qty}</td>
        <td class="text-muted">${v.unit}</td>
        <td><span class="text-gradient font-bold">${(+v.value).toLocaleString('en-US')} ${cur()}</span></td>
        <td class="text-muted" style="font-size:12.5px">${v.sup}</td>
        <td class="td-mono">${v.date}</td>
        <td>
          <select class="select" style="padding:4px 8px;font-size:12px;width:auto;color:${payColors[v.payment] || '#94a3b8'}" onchange="updInvPayment(${globalIdx}, this.value)">
            ${['unpaid', 'paid', 'partial'].map(p => `<option value="${p}" ${p === v.payment ? 'selected' : ''}>${payLabels[p]}</option>`).join('')}
          </select>
        </td>
      </tr>
      ${v.notes ? `<tr><td colspan="9" style="padding:4px 16px 10px;color:#64748b;font-size:12px;font-style:italic">📝 ${v.notes}</td></tr>` : ''}
    `;
        }).join('');
      }

      function updInvPayment(idx, val) {
        if (S.invoices[idx]) {
          S.invoices[idx].payment = val;
          saveState();
          renderInvoices();
          toast('✅ Payment status updated', 'info');
        }
      }

      function sendAllDraft() {
        const ds = S.POs.filter(p => p.status === 'draft');
        if (!ds.length) {
          toast('No drafts to send', 'info');
          return;
        }
        ds.forEach(p => p.status = 'sent');
        saveState();
        renderPOs();
        toast(`📤 Sent ${ds.length} POs!`);
      }

      /* ============================================================
         WASTE & SPOILAGE MANAGEMENT
      ============================================================ */
      function updWasteUnitLabel() {
        const ingId = document.getElementById('w-ing').value;
        const iv = S.ings[ingId];
        if (iv) {
          const lbl =
            document.getElementById('w-uom') ||
            document.getElementById('w-unit-lbl');
          if (lbl) lbl.textContent = iv.uom;
        }
      }

      function logWaste() {
        const ingId = document.getElementById('w-ing').value;
        const qty = parseFloat(document.getElementById('w-qty').value) || 0;
        const date = document.getElementById('w-date').value || todayStr();
        const reason = document.getElementById('w-reason').value;
        const notes = document.getElementById('w-notes').value.trim();

        if (!ingId || !S.ings[ingId]) {
          toast('Please select an ingredient', 'error');
          return;
        }
        if (qty <= 0) {
          toast('Quantity must be greater than 0', 'error');
          return;
        }

        const iv = S.ings[ingId];
        const unitPrice = iv.price || 0;
        const totalCost = qty * unitPrice;

        // Deduct from stock
        iv.stock = Math.max(0, iv.stock - qty);

        // Add entry to wastes array
        const wasteEntry = {
          id: Date.now(),
          ingId,
          qty: f2(qty),
          unit: iv.uom,
          unitPrice: f2(unitPrice),
          totalCost: f2(totalCost),
          reason,
          notes,
          date
        };

        S.wastes.unshift(wasteEntry);

        saveState();
        renderWaste();
        renderInv();

        document.getElementById('w-qty').value = '';
        document.getElementById('w-notes').value = '';

        const ingName = isAr() ? iv.ar : iv.en;
        toast(`🗑️ Logged waste of ${qty} ${iv.uom} (${ingName}) and deducted stock!`);
      }

      function delWaste(id) {
        const item = S.wastes.find(w => w.id === id);
        if (!item) return;
        if (!confirm('Delete this waste entry and restore stock?')) return;

        // Restore stock
        if (S.ings[item.ingId]) {
          S.ings[item.ingId].stock += parseFloat(item.qty);
        }

        S.wastes = S.wastes.filter(w => w.id !== id);
        saveState();
        renderWaste();
        renderInv();
        toast('Waste entry deleted & stock restored', 'info');
      }

      function renderWaste() {
        document.getElementById('w-date').value = todayStr();

        // Populate ingredient select
        const ingSel = document.getElementById('w-ing');
        const curIng = ingSel.value;
        ingSel.innerHTML = Object.entries(S.ings).map(([id, iv]) => `
    <option value="${id}" ${id === curIng ? 'selected' : ''}>${isAr() ? iv.ar : iv.en} (${iv.stock} ${iv.uom})</option>
  `).join('');
        updWasteUnitLabel();

        // Filters
        const reasonFilter = document.getElementById('w-filter-reason').value;
        const monthFilter = document.getElementById('w-filter-month').value;

        const filtered = S.wastes.filter(w => {
          if (reasonFilter && w.reason !== reasonFilter) return false;
          if (monthFilter && !w.date.startsWith(monthFilter)) return false;
          return true;
        });

        // Calculate statistics
        const totalCost = filtered.reduce((s, w) => s + parseFloat(w.totalCost), 0);
        // Top wasted item
        const ingLossMap = {};
        filtered.forEach(w => {
          ingLossMap[w.ingId] = (ingLossMap[w.ingId] || 0) + parseFloat(w.totalCost);
        });
        let topIngId = '';
        let topIngLoss = 0;
        Object.entries(ingLossMap).forEach(([id, loss]) => {
          if (loss > topIngLoss) { topIngLoss = loss; topIngId = id; }
        });
        const topIngObj = S.ings[topIngId];
        const topIngName = topIngObj ? (isAr() ? topIngObj.ar : topIngObj.en) : 'None';

        document.getElementById('waste-stats').innerHTML = [
          { v: filtered.length, l: 'Total Waste Entries', c: '#fff' },
          { v: fmt(Math.round(totalCost)) + ' ' + cur(), l: 'Total Monetary Loss', c: '#f87171' },
          { v: topIngName, l: 'Top Wasted Ingredient', c: '#fbbf24' }
        ].map(s => `
    <div class="stat-card" style="text-align:center">
      <div style="font-size:24px;font-weight:800;color:${s.c}">${s.v}</div>
      <div class="text-muted text-sm mt-2">${s.l}</div>
    </div>
  `).join('');

        const reasonLabels = {
          expired: '⏳ Expired',
          cooking: '🍳 Cooking',
          storage: '📦 Storage',
          trimming: '🔪 Trimming',
          other: '⚠️ Other'
        };
        const reasonBadges = {
          expired: 'badge-red',
          cooking: 'badge-amber',
          storage: 'badge-red',
          trimming: 'badge-orange',
          other: 'badge-amber'
        };

        const em = document.getElementById('waste-empty');
        const tbl = document.getElementById('waste-tbl');

        if (!filtered.length) {
          tbl.innerHTML = '';
          em.style.display = 'block';
          return;
        }
        em.style.display = 'none';

        tbl.innerHTML = filtered.map(w => {
          const d = S.ings[w.ingId];
          const name = d ? (isAr() ? d.ar : d.en) : w.ingId;
          return `
      <tr>
        <td class="td-mono">${w.date}</td>
        <td style="font-weight:700;color:#fff">${name}</td>
        <td style="color:#f87171;font-weight:700">${w.qty}</td>
        <td class="text-muted">${w.unit}</td>
        <td class="text-muted">${w.unitPrice} ${cur()}</td>
        <td><span style="color:#f87171;font-weight:800">${(+w.totalCost).toLocaleString('en-US')} ${cur()}</span></td>
        <td><span class="badge ${reasonBadges[w.reason] || 'badge-amber'}">${reasonLabels[w.reason] || w.reason}</span></td>
        <td>
          <button class="btn btn-danger btn-icon btn-sm" onclick="delWaste(${w.id})" title="Delete">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
          </button>
        </td>
      </tr>
      ${w.notes ? `<tr><td colspan="8" style="padding:4px 16px 10px;color:#64748b;font-size:12px;font-style:italic">📝 ${w.notes}</td></tr>` : ''}
    `;
        }).join('');
      }

      /* ============================================================
         BRANCH SHIPMENTS LOG — Finished Goods Dispatch
      ============================================================ */

      /**
       * Build a matrix: rows = products (except Taztiki), cols = dates in range
       * Returns { dates, products, matrix }
       */
      function buildShipmentsMatrix(fromDate, toDate) {
        // Filter orders by date range
        const orders = S.orders.filter(o => {
          if (fromDate && o.date < fromDate) return false;
          if (toDate && o.date > toDate) return false;
          return true;
        });

        // Collect all unique dates in range, sorted
        const datesSet = new Set(orders.map(o => o.date));
        const dates = Array.from(datesSet).sort();

        // All products except taztiki-sauce (handled separately)
        const prods = S.products.filter(p => p.id !== 'burger-sauce');

        // Build matrix: matrix[prodId][date] = total qty
        const matrix = {};
        prods.forEach(p => { matrix[p.id] = {}; dates.forEach(d => { matrix[p.id][d] = 0; }); });

        orders.forEach(o => {
          const d = o.date;
          Object.entries(o.items || {}).forEach(([pid, qty]) => {
            if (pid === 'burger-sauce') return;
            if (!matrix[pid]) matrix[pid] = {};
            matrix[pid][d] = (matrix[pid][d] || 0) + qty;
          });
        });

        return { dates, prods, matrix };
      }

      function renderShipments() {
        // Default date range: current month start → today
        const today = new Date().toISOString().slice(0, 10);
        const monthStart = today.slice(0, 7) + '-01';
        const fromEl = document.getElementById('ship-from');
        const toEl = document.getElementById('ship-to');
        if (!fromEl.value) fromEl.value = monthStart;
        if (!toEl.value) toEl.value = today;

        const fromDate = fromEl.value;
        const toDate = toEl.value;

        const { dates, prods, matrix } = buildShipmentsMatrix(fromDate, toDate);

        // ── KPI Stats ──
        const totalOrders = S.orders.filter(o => o.date >= fromDate && o.date <= toDate).length;
        const allQty = Object.values(matrix).reduce((s, dm) => s + Object.values(dm).reduce((a, b) => a + b, 0), 0);
        const activeDays = dates.length;
        const totalTaz = (S.taztikiRecords || []).filter(r => r.date >= fromDate && r.date <= toDate)
          .reduce((s, r) => s + parseFloat(r.qty || 0), 0);

        const kpiDefs = [
          { val: totalOrders, lbl: 'Branch Orders in Range', color: '#38bdf8', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2', kpi: 'kpi-cyan' },
          { val: fmt(allQty), lbl: 'Total Units Shipped', color: '#4ade80', icon: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z', kpi: 'kpi-green' },
          { val: activeDays, lbl: 'Active Production Days', color: '#fbbf24', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', kpi: 'kpi-amber' },
          { val: fmt(totalTaz, 1) + ' L', lbl: 'Taztiki Sauce Shipped', color: '#c084fc', icon: 'M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3', kpi: 'kpi-purple' }
        ];
        document.getElementById('ship-stats').innerHTML = kpiDefs.map(k => `
    <div class="stat-card">
      <div class="flex items-center justify-between mb-3">
        <div style="width:40px;height:40px;border-radius:11px;background:${k.color}22;border:1px solid ${k.color}33;display:flex;align-items:center;justify-content:center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${k.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${k.icon}"/></svg>
        </div>
      </div>
      <div class="kpi-number ${k.kpi}" style="margin-bottom:4px">${k.val}</div>
      <div class="text-muted text-sm">${k.lbl}</div>
    </div>
  `).join('');

        // ── Main Matrix Table ──
        const thead = document.getElementById('ship-thead');
        const tbody = document.getElementById('ship-tbody');

        if (dates.length === 0) {
          thead.innerHTML = '';
          tbody.innerHTML = `<tr><td colspan="3" class="text-center text-muted" style="padding:30px">
      ${'No orders in this date range'}
    </td></tr>`;
          return;
        }

        // Header: Product | day1 | day2 | ... | Total
        thead.innerHTML = `<tr>
    <th style="min-width:150px">${'Product'}</th>
    ${dates.map(d => `<th style="min-width:70px;text-align:center">${d.slice(5)}</th>`).join('')}
    <th style="min-width:80px;text-align:center;color:#4ade80">${'Total'}</th>
  </tr>`;

        // Rows
        tbody.innerHTML = prods.map(p => {
          const dm = matrix[p.id] || {};
          const rowTotal = Object.values(dm).reduce((a, b) => a + b, 0);
          const cells = dates.map(d => {
            const v = dm[d] || 0;
            return `<td style="text-align:center;color:${v > 0 ? '#e2e8f0' : '#475569'}">${v > 0 ? fmt(v, 2) : '—'}</td>`;
          }).join('');
          return `<tr>
      <td>
        <div class="flex items-center gap-2">
          <div style="width:8px;height:8px;border-radius:50%;background:${p.color};flex-shrink:0"></div>
          <span style="font-weight:600;color:#f1f5f9">${pname(p)}</span>
          <span class="text-muted" style="font-size:11px">(${p.unit})</span>
        </div>
      </td>
      ${cells}
      <td style="text-align:center;font-weight:700;color:#4ade80">${rowTotal > 0 ? fmt(rowTotal, 2) : '—'}</td>
    </tr>`;
        }).join('');

        // ── Taztiki Table ──
        renderTaztikiTable();
      }

      function renderTaztikiTable() {
        const records = S.taztikiRecords || [];
        const tbody = document.getElementById('taztiki-tbody');
        const empty = document.getElementById('taztiki-empty');
        if (!records.length) {
          tbody.innerHTML = '';
          if (empty) empty.style.display = 'flex';
          return;
        }
        if (empty) empty.style.display = 'none';
        tbody.innerHTML = records.slice().sort((a, b) => a.date.localeCompare(b.date)).map((r, i) => `
    <tr>
      <td style="font-weight:600;color:#e2e8f0">${r.date}</td>
      <td style="color:#c084fc;font-weight:700">${fmt(r.qty, 2)} L</td>
      <td class="text-muted">${r.branches || '—'}</td>
      <td class="text-muted">${r.notes || '—'}</td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="deleteTaztikiRow(${i})" style="padding:4px 8px;color:#f87171">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
        </button>
      </td>
    </tr>
  `).join('');
      }

      function addTaztikiRow() {
        if (!S.taztikiRecords) S.taztikiRecords = [];
        const today = new Date().toISOString().slice(0, 10);
        const date = prompt('Enter date (YYYY-MM-DD):', today);
        if (!date) return;
        const qty = parseFloat(prompt('Enter Taztiki Sauce quantity (liters):', '0') || 0);
        if (!qty || qty <= 0) { alert('Invalid quantity'); return; }
        const branches = prompt('Receiving branches (optional):', '') || '';
        const notes = prompt('Notes (optional):', '') || '';
        S.taztikiRecords.push({ date, qty, branches, notes });
        saveState();
        renderTaztikiTable();
        renderShipments();
      }

      function deleteTaztikiRow(idx) {
        if (!confirm('Delete this record?')) return;
        (S.taztikiRecords || []).splice(idx, 1);
        saveState();
        renderTaztikiTable();
        renderShipments();
      }

      function resetShipDateRange() {
        const today = new Date().toISOString().slice(0, 10);
        const monthStart = today.slice(0, 7) + '-01';
        document.getElementById('ship-from').value = monthStart;
        document.getElementById('ship-to').value = today;
        renderShipments();
      }

      /* ── Excel Export: 2 sheets ── */
      function exportShipmentsExcel() {
        if (typeof XLSX === 'undefined') {
          alert('XLSX library not ready, try again in a moment');
          return;
        }
        const fromEl = document.getElementById('ship-from');
        const toEl = document.getElementById('ship-to');
        const fromDate = fromEl.value || '';
        const toDate = toEl.value || '';

        const { dates, prods, matrix } = buildShipmentsMatrix(fromDate, toDate);

        const wb = XLSX.utils.book_new();

        // ══ Sheet 1: Main Products (excluding Taztiki) ══
        const s1Header = ['Product', 'Unit', ...dates, 'Total'];
        const s1Rows = prods.map(p => {
          const dm = matrix[p.id] || {};
          const rowTotal = Object.values(dm).reduce((a, b) => a + b, 0);
          return [pname(p), p.unit, ...dates.map(d => dm[d] || 0), rowTotal];
        });

        // Add totals row
        const totalsRow = ['Daily Total', '', ...dates.map(d =>
          prods.reduce((s, p) => s + (matrix[p.id]?.[d] || 0), 0)
        ), prods.reduce((s, p) => s + Object.values(matrix[p.id] || {}).reduce((a, b) => a + b, 0), 0)];
        s1Rows.push(totalsRow);

        const ws1 = XLSX.utils.aoa_to_sheet([s1Header, ...s1Rows]);
        // Style header row width
        ws1['!cols'] = [{ wch: 28 }, { wch: 10 }, ...dates.map(() => ({ wch: 10 })), { wch: 12 }];
        XLSX.utils.book_append_sheet(wb, ws1, 'Products Shipments');

        // ══ Sheet 2: Taztiki Sauce ══
        const taztikiInRange = (S.taztikiRecords || []).filter(r => {
          if (fromDate && r.date < fromDate) return false;
          if (toDate && r.date > toDate) return false;
          return true;
        }).sort((a, b) => a.date.localeCompare(b.date));

        const s2Header = ['Date', 'Quantity (L)', 'Receiving Branches', 'Notes'];
        const s2Rows = taztikiInRange.map(r => [r.date, r.qty, r.branches || '', r.notes || '']);
        const tazTotal = taztikiInRange.reduce((s, r) => s + parseFloat(r.qty || 0), 0);
        s2Rows.push(['Total', tazTotal, '', '']);

        const ws2 = XLSX.utils.aoa_to_sheet([s2Header, ...s2Rows]);
        ws2['!cols'] = [{ wch: 14 }, { wch: 14 }, { wch: 30 }, { wch: 30 }];
        XLSX.utils.book_append_sheet(wb, ws2, 'Taztiki Sauce');

        // ══ Sheet 3: Summary ══
        const totalMain = prods.reduce((s, p) => s + Object.values(matrix[p.id] || {}).reduce((a, b) => a + b, 0), 0);
        const ws3 = XLSX.utils.aoa_to_sheet([
          ['Branch Shipments Report — Smart Kitchen ERP'],
          ['Period:', `${fromDate} → ${toDate}`],
          ['Printed Date:', new Date().toLocaleDateString('en-GB')],
          [],
          ['Total Product Units Dispatched:', totalMain],
          ['Total Burger Sauce (L):', tazTotal],
          ['Active Days Count:', dates.length],
        ]);
        ws3['!cols'] = [{ wch: 35 }, { wch: 20 }];
        XLSX.utils.book_append_sheet(wb, ws3, 'Summary');

        const fileName = `Branch_Shipments_${fromDate}_${toDate}.xlsx`;
        XLSX.writeFile(wb, fileName);
      }

      /* ============================================================
         REPORTS & COMPARISON ANALYTICS
      ============================================================ */
      let chRepBranch = null;
      let chRepWaste = null;
      let chRepProds = null;
      let chRepCost = null;

      function renderReports() {
        const now = new Date();
        const curMonthStr = now.toISOString().slice(0, 7); // YYYY-MM
        const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const prevMonthStr = prevDate.toISOString().slice(0, 7);

        const m1Input = document.getElementById('rep-m1');
        const m2Input = document.getElementById('rep-m2');
        if (!m1Input.value) m1Input.value = prevMonthStr;
        if (!m2Input.value) m2Input.value = curMonthStr;

        const m1 = m1Input.value;
        const m2 = m2Input.value;
        const brFilter = document.getElementById('rep-branch').value;

        document.getElementById('rep-th-m1').textContent = `${'Month'} (${m1})`;
        document.getElementById('rep-th-m2').textContent = `${'Month'} (${m2})`;

        // Filter orders by month & branch
        const ordersM1 = S.orders.filter(o => o.date.startsWith(m1) && (!brFilter || o.branch === brFilter));
        const ordersM2 = S.orders.filter(o => o.date.startsWith(m2) && (!brFilter || o.branch === brFilter));

        const totalUnitsM1 = ordersM1.reduce((s, o) => s + Object.values(o.items).reduce((a, b) => a + b, 0), 0);
        const totalUnitsM2 = ordersM2.reduce((s, o) => s + Object.values(o.items).reduce((a, b) => a + b, 0), 0);

        // Waste filtering
        const wastesM1 = S.wastes.filter(w => w.date.startsWith(m1));
        const wastesM2 = S.wastes.filter(w => w.date.startsWith(m2));
        const wasteLossM1 = wastesM1.reduce((s, w) => s + parseFloat(w.totalCost), 0);
        const wasteLossM2 = wastesM2.reduce((s, w) => s + parseFloat(w.totalCost), 0);

        // Invoices / Purchase cost filtering
        const invM1 = S.invoices.filter(v => v.date.startsWith(m1));
        const invM2 = S.invoices.filter(v => v.date.startsWith(m2));
        const invCostM1 = invM1.reduce((s, v) => s + parseFloat(v.value), 0);
        const invCostM2 = invM2.reduce((s, v) => s + parseFloat(v.value), 0);

        // Percentage calculations
        const orderDiff = totalUnitsM2 - totalUnitsM1;
        const orderPct = totalUnitsM1 > 0 ? ((orderDiff / totalUnitsM1) * 100).toFixed(1) : (totalUnitsM2 > 0 ? '+100' : '0');

        const wasteDiff = wasteLossM2 - wasteLossM1;
        const wastePct = wasteLossM1 > 0 ? ((wasteDiff / wasteLossM1) * 100).toFixed(1) : (wasteLossM2 > 0 ? '+100' : '0');

        // Populate KPI cards
        document.getElementById('rep-kpi-stats').innerHTML = [
          { v: fmt(totalUnitsM2), l: `Orders in (${m2})`, diff: `${orderDiff >= 0 ? '▲ +' : '▼ '}${orderDiff} (${orderPct}%)`, c: orderDiff >= 0 ? '#4ade80' : '#f87171', kpi: 'kpi-cyan', bg: orderDiff >= 0 ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)' },
          { v: fmt(Math.round(wasteLossM2)) + ' ' + cur(), l: `Waste Loss (${m2})`, diff: `${wasteDiff <= 0 ? '▼ ' : '▲ +'}${Math.round(wasteDiff)} ${cur()} (${wastePct}%)`, c: wasteDiff <= 0 ? '#4ade80' : '#f87171', kpi: 'kpi-red', bg: wasteDiff <= 0 ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)' },
          { v: fmt(Math.round(invCostM2)) + ' ' + cur(), l: `Invoices Cost (${m2})`, diff: `${invCostM2 - invCostM1 >= 0 ? '▲ +' : '▼ '}${Math.round(invCostM2 - invCostM1)} ${cur()}`, c: '#a78bfa', kpi: 'kpi-purple', bg: 'rgba(168,85,247,0.12)' },
          { v: ordersM2.length, l: `Shipments Count (${m2})`, diff: `${ordersM2.length - ordersM1.length >= 0 ? '▲ +' : '▼ '}${ordersM2.length - ordersM1.length}`, c: '#fbbf24', kpi: 'kpi-amber', bg: 'rgba(251,191,36,0.12)' }
        ].map(s => `
    <div class="stat-card">
      <div class="kpi-number ${s.kpi}" style="margin-bottom:6px">${s.v}</div>
      <div class="text-muted text-sm font-semibold mb-3">${s.l}</div>
      <div style="display:inline-flex;align-items:center;padding:4px 10px;border-radius:20px;background:${s.bg};font-size:12px;font-weight:700;color:${s.c};border:1px solid ${s.c}33">
        ${s.diff}
      </div>
    </div>
  `).join('');

        // Populate Matrix Table
        const branches = (S.branches && S.branches.length) ? S.branches.map(b => b.name) : ['Downtown Central Kitchen', 'Westside Hub', 'Eastside Flagship', 'North Coast Express'];
        const matrixRows = branches.map(br => {
          const u1 = ordersM1.filter(o => o.branch === br).reduce((s, o) => s + Object.values(o.items).reduce((a, b) => a + b, 0), 0);
          const u2 = ordersM2.filter(o => o.branch === br).reduce((s, o) => s + Object.values(o.items).reduce((a, b) => a + b, 0), 0);
          const diff = u2 - u1;
          const pct = u1 > 0 ? ((diff / u1) * 100).toFixed(1) : (u2 > 0 ? '100' : '0');
          const isUp = diff >= 0;
          return `
      <tr>
        <td style="font-weight:700;color:#fff">${br}</td>
        <td style="color:#60a5fa;font-weight:700">${fmt(u1)}</td>
        <td style="color:#4ade80;font-weight:700">${fmt(u2)}</td>
        <td style="font-weight:700;color:${isUp ? '#4ade80' : '#f87171'}">${isUp ? '+' : ''}${fmt(diff)}</td>
        <td><span class="badge ${isUp ? 'badge-green' : 'badge-red'}">${isUp ? '▲ +' : '▼ '}${pct}%</span></td>
        <td style="font-size:12.5px" class="text-muted">${isUp ? 'Increased Demand' : 'Reduced Demand'}</td>
      </tr>
    `;
        });

        // Add Row for Waste Loss
        matrixRows.push(`
    <tr style="background:rgba(248,113,113,0.04)">
      <td style="font-weight:800;color:#f87171">🗑️ ${'Total Waste Loss'}</td>
      <td style="color:#fbbf24;font-weight:700">${fmt(Math.round(wasteLossM1))} ${cur()}</td>
      <td style="color:#f87171;font-weight:700">${fmt(Math.round(wasteLossM2))} ${cur()}</td>
      <td style="font-weight:700;color:${wasteDiff <= 0 ? '#4ade80' : '#f87171'}">${wasteDiff >= 0 ? '+' : ''}${fmt(Math.round(wasteDiff))} ${cur()}</td>
      <td><span class="badge ${wasteDiff <= 0 ? 'badge-green' : 'badge-red'}">${wasteDiff >= 0 ? '▲ +' : '▼ '}${wastePct}%</span></td>
      <td style="font-size:12.5px;color:${wasteDiff <= 0 ? '#4ade80' : '#f87171'}">${wasteDiff <= 0 ? 'Waste Decreased' : 'Waste Increased'}</td>
    </tr>
  `);

        document.getElementById('rep-matrix-tbl').innerHTML = matrixRows.join('');

        // Delay chart render slightly for DOM ready
        setTimeout(() => {
          renderChartRepBranch(m1, m2, ordersM1, ordersM2, branches);
          renderChartRepWaste(m1, m2, wastesM1, wastesM2);
          renderChartRepProds(m1, m2, ordersM1, ordersM2);
          renderChartRepCost(m1, m2, wasteLossM2, invCostM2);
        }, 60);
      }

      function renderChartRepBranch(m1, m2, ordersM1, ordersM2, branches) {
        const ctx = document.getElementById('ch-rep-branch');
        if (!ctx) return;
        if (chRepBranch) { chRepBranch.destroy(); chRepBranch = null; }

        const dataM1 = branches.map(br => ordersM1.filter(o => o.branch === br).reduce((s, o) => s + Object.values(o.items).reduce((a, b) => a + b, 0), 0));
        const dataM2 = branches.map(br => ordersM2.filter(o => o.branch === br).reduce((s, o) => s + Object.values(o.items).reduce((a, b) => a + b, 0), 0));

        chRepBranch = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: branches,
            datasets: [
              { label: m1, data: dataM1, backgroundColor: '#3b82f6cc', borderColor: '#3b82f6', borderWidth: 1.5 },
              { label: m2, data: dataM2, backgroundColor: '#f97316cc', borderColor: '#f97316', borderWidth: 1.5 }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'top', labels: { color: '#94a3b8', font: { family: 'Inter, sans-serif' } } }
            },
            scales: {
              x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
              y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
          }
        });
      }

      function renderChartRepWaste(m1, m2, wastesM1, wastesM2) {
        const ctx = document.getElementById('ch-rep-waste');
        if (!ctx) return;
        if (chRepWaste) { chRepWaste.destroy(); chRepWaste = null; }

        const reasons = ['expired', 'cooking', 'storage', 'trimming', 'other'];
        const reasonLabels = ['Expired', 'Cooking', 'Storage', 'Trimming', 'Other'];

        const dataM1 = reasons.map(r => wastesM1.filter(w => w.reason === r).reduce((s, w) => s + parseFloat(w.totalCost), 0));
        const dataM2 = reasons.map(r => wastesM2.filter(w => w.reason === r).reduce((s, w) => s + parseFloat(w.totalCost), 0));

        chRepWaste = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: reasonLabels,
            datasets: [
              { label: `${'Waste'} (${m1})`, data: dataM1, backgroundColor: '#fbbf24cc', borderColor: '#fbbf24', borderWidth: 1.5 },
              { label: `${'Waste'} (${m2})`, data: dataM2, backgroundColor: '#f87171cc', borderColor: '#f87171', borderWidth: 1.5 }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'top', labels: { color: '#94a3b8', font: { family: 'Inter, sans-serif' } } }
            },
            scales: {
              x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
              y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
          }
        });
      }

      function renderChartRepProds(m1, m2, ordersM1, ordersM2) {
        const ctx = document.getElementById('ch-rep-prods');
        if (!ctx) return;
        if (chRepProds) { chRepProds.destroy(); chRepProds = null; }

        const labs = S.products.map(p => pname(p));
        const dataM1 = S.products.map(p => ordersM1.reduce((s, o) => s + (o.items[p.id] || 0), 0));
        const dataM2 = S.products.map(p => ordersM2.reduce((s, o) => s + (o.items[p.id] || 0), 0));

        chRepProds = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labs,
            datasets: [
              { label: m1, data: dataM1, borderColor: '#8b5cf6', backgroundColor: '#8b5cf622', fill: true, tension: 0.3 },
              { label: m2, data: dataM2, borderColor: '#22c55e', backgroundColor: '#22c55e22', fill: true, tension: 0.3 }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'top', labels: { color: '#94a3b8', font: { family: 'Inter, sans-serif' } } }
            },
            scales: {
              x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
              y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
          }
        });
      }

      function renderChartRepCost(m1, m2, wasteLossM2, invCostM2) {
        const ctx = document.getElementById('ch-rep-cost');
        if (!ctx) return;
        if (chRepCost) { chRepCost.destroy(); chRepCost = null; }

        const { totalCost } = computePlan();
        const prodCost = Math.round(totalCost);
        const wasteCost = Math.round(wasteLossM2);
        const purCost = Math.round(invCostM2);

        chRepCost = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Prod Cost', 'Waste Loss', 'Purchases'],
            datasets: [{
              data: [prodCost || 100, wasteCost || 10, purCost || 50],
              backgroundColor: ['#fb923ccc', '#f87171cc', '#3b82f6cc'],
              borderColor: ['#fb923c', '#f87171', '#3b82f6'],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom', labels: { color: '#94a3b8', font: { family: 'Inter, sans-serif' } } }
            }
          }
        });
      }

      /* ============================================================
         EXCEL IMPORT
      ============================================================ */
      let _excelPendingOrders = null;

      function handleExcelDrop(e) {
        e.preventDefault();
        document.getElementById('excel-drop-zone').style.borderColor = 'rgba(74,222,128,0.3)';
        const file = e.dataTransfer && e.dataTransfer.files ? e.dataTransfer.files[0] : null;
        if (file) handleExcelFile(file);
      }

      /* ── Burger Sauce Quantity Extractor ── */
      function extractBurgerSauceQty(infoText) {
        if (!infoText || typeof infoText !== 'string') return 0;
        const t = infoText.trim().toLowerCase();
        if (!t.includes('burger') && !t.includes('gourmet') && !t.includes('برجر') && !t.includes('sauce') && !t.includes('صوص')) return 0;

        // Grams match: e.g. .500 جرام or 500 جرام or 500g
        const gramMatch = t.match(/([0-9]*\.?[0-9]+)\s*(?:جرام|جم|gram|g)/i);
        if (gramMatch) {
          const val = parseFloat(gramMatch[1]);
          return val > 10 ? val / 1000 : val;
        }

        // Kg / K match: e.g. 8 ك, 1kg, 3.5k, 1.250, 1.500Kg, 0.120 KG
        const kgMatch = t.match(/([0-9]+\.?[0-9]*|\.[0-9]+)\s*(?:k|kg|ك|كيلو|كجم)/i);
        if (kgMatch) return parseFloat(kgMatch[1]);

        const kMatch2 = t.match(/([0-9]+\.?[0-9]*|\.[0-9]+)\s*k/i);
        if (kMatch2) return parseFloat(kMatch2[1]);

        const numMatch = t.match(/([0-9]+\.?[0-9]*|\.[0-9]+)/);
        if (numMatch) return parseFloat(numMatch[1]);

        return 0;
      }

      /* ── Comprehensive Branch & Cost Center Normalizer ── */
      function normalizeBranchCostCenter(ccName, sheetName, reqId) {
        let rawCc = (ccName || '').trim();
        if ((!rawCc || rawCc === ':') && reqId) {
          const m = String(reqId).match(/\((.*?)\)/);
          if (m) rawCc = m[1].trim();
        }

        const full = `${rawCc} ${sheetName || ''} ${reqId || ''}`.toLowerCase();

        if (full.includes('downtown') || full.includes('central') || full.includes('main')) {
          return 'Downtown Central Kitchen';
        }
        if (full.includes('west') || full.includes('zayed') || full.includes('hub')) {
          return 'Westside Hub';
        }
        if (full.includes('east') || full.includes('tagamoa') || full.includes('flagship')) {
          return 'Eastside Flagship';
        }
        if (full.includes('north') || full.includes('express') || full.includes('coast')) {
          return 'North Coast Express';
        }

        if (Array.isArray(S.branches) && S.branches.length) {
          const matched = S.branches.find(b => full.includes(b.toLowerCase()));
          if (matched) return matched;
          return S.branches[0];
        }

        return 'Downtown Central Kitchen';
      }

      /* ── Match or Register Product ── */
      function matchOrRegisterProduct(rawName, rawUnit, rawPrice) {
        if (!rawName) return null;
        const clean = String(rawName).trim();
        if (!clean || clean === 'Total:' || clean === 'Total:') return null;

        // 1. Direct or partial match with existing S.products
        const cleanLow = clean.toLowerCase();
        let p = S.products.find(x =>
          (x.ar && x.ar.toLowerCase() === cleanLow) ||
          (x.en && x.en.toLowerCase() === cleanLow) ||
          (x.ar && (cleanLow.includes(x.ar.toLowerCase()) || x.ar.toLowerCase().includes(cleanLow))) ||
          (x.en && (cleanLow.includes(x.en.toLowerCase()) || x.en.toLowerCase().includes(cleanLow)))
        );

        if (p) return p.id;

        // 2. Auto-register new product dynamically
        const newId = 'prod-' + clean.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        const existing = S.products.find(x => x.id === newId);
        if (existing) return existing.id;

        let u = 'kg';
        const uLow = (rawUnit || '').toLowerCase();
        if (uLow.includes('each') || uLow.includes('pcs') || uLow.includes('order') || uLow.includes('plate') || uLow.includes('pkt')) u = 'pcs';
        else if (uLow.includes('ltr')) u = 'ltr';
        else if (uLow.includes('portion')) u = 'portion';

        let cat = 'prep';
        if (cleanLow.includes('sauce') || cleanLow.includes('dressing') || cleanLow.includes('vinaigrette') || cleanLow.includes('mayo') || cleanLow.includes('curd') || cleanLow.includes('puree') || cleanLow.includes('syrup')) cat = 'sauces';
        else if (cleanLow.includes('croissant') || cleanLow.includes('bread') || cleanLow.includes('baghette') || cleanLow.includes('dough') || cleanLow.includes('toast') || cleanLow.includes('danash') || cleanLow.includes('pancake') || cleanLow.includes('brownie') || cleanLow.includes('cookies')) cat = 'bakery';
        else if (cleanLow.includes('beef') || cleanLow.includes('rib') || cleanLow.includes('turkey') || cleanLow.includes('chicken') || cleanLow.includes('tuna') || cleanLow.includes('bresaola')) cat = (cleanLow.includes('beef') || cleanLow.includes('rib') || cleanLow.includes('bresaola')) ? 'beef' : 'chicken';
        else if (cleanLow.includes('cheese') || cleanLow.includes('mozzarella') || cleanLow.includes('provolone') || cleanLow.includes('parmesan') || cleanLow.includes('burrata') || cleanLow.includes('yogurt') || cleanLow.includes('yougurt') || cleanLow.includes('kiri') || cleanLow.includes('sour cream') || cleanLow.includes('egg')) cat = 'cheese';
        else if (cleanLow.includes('lettuce') || cleanLow.includes('mushroom') || cleanLow.includes('basil') || cleanLow.includes('onion') || cleanLow.includes('potato') || cleanLow.includes('spanish') || cleanLow.includes('chives') || cleanLow.includes('oakleaf') || cleanLow.includes('pickle') || cleanLow.includes('olive') || cleanLow.includes('berry') || cleanLow.includes('raspberry') || cleanLow.includes('strawberry') || cleanLow.includes('watermelon')) cat = 'veggies';
        else if (cleanLow.includes('juice') || cleanLow.includes('matcha') || cleanLow.includes('karkade') || cleanLow.includes('ice cream') || cleanLow.includes('chocolate')) cat = 'drinks';

        const newProd = {
          id: newId,
          ar: clean,
          en: clean,
          unit: u,
          cat: cat,
          cost: parseFloat(rawPrice) || 30,
          color: cat === 'sauces' ? '#f97316' : (cat === 'beef' ? '#8b5cf6' : (cat === 'chicken' ? '#22c55e' : (cat === 'bakery' ? '#f59e0b' : '#06b6d4')))
        };
        S.products.push(newProd);
        return newProd.id;
      }

      /* ── Main Multi-Sheet / Multi-Template Excel Engine ── */
      function parseWorkbookData(wb, fileName) {
        if (!wb || !wb.SheetNames || !wb.SheetNames.length) {
          toast('File is invalid or has no sheets', 'error');
          return;
        }

        const branchMap = {};
        let totalTemplatesCount = 0;
        let totalItemsParsed = 0;
        let totalSauceParsed = 0;

        // Iterate through all sheets in the workbook
        wb.SheetNames.forEach(sheetName => {
          const ws = wb.Sheets[sheetName];
          if (!ws || !ws['!ref']) return;

          const matrix = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
          if (!matrix || !matrix.length) return;

          let currentReq = null;
          let inItemsTable = false;
          let headerRowIndexes = { item: -1, qty: -1, unit: -1, price: -1, itemNo: -1 };

          matrix.forEach(row => {
            if (!Array.isArray(row)) return;

            const r0 = String(row[0] || '').trim();
            const r1 = String(row[1] || '').trim();
            const r3 = String(row[3] || '').trim();
            const r5 = String(row[5] || '').trim();

            // Check if a new Issue Request template begins
            if (r0.includes('Issue Request') || r1.includes('Issue Request') || r0.includes('طلب تحويل') || r1.includes('طلب تحويل')) {
              if (currentReq && (currentReq.costCenter || Object.keys(currentReq.items).length)) {
                saveRequestToMap(currentReq);
              }
              currentReq = {
                sheet: sheetName,
                reqId: r5 || String(row[4] || '') || String(row[3] || ''),
                date: todayStr(),
                costCenter: '',
                info: '',
                burgerSauce: 0,
                items: {}
              };
              inItemsTable = false;
              headerRowIndexes = { item: -1, qty: -1, unit: -1, price: -1, itemNo: -1 };
              totalTemplatesCount++;
              return;
            }

            if (currentReq) {
              // Read Issue Request Metadata
              if (r1 === 'Date' || r1 === 'التاريخ' || r0 === 'Date') {
                currentReq.date = normalizeDateIso(r5 || String(row[4] || '') || todayStr());
              } else if (r1.includes('To Cost Center') || r0.includes('To Cost Center') || r1.includes('إلى مركز التكلفة')) {
                let toCcVal = '';
                for (let ci = 2; ci < row.length; ci++) {
                  const cellVal = String(row[ci] || '').trim();
                  if (cellVal && cellVal !== ':') {
                    toCcVal = cellVal;
                    break;
                  }
                }
                currentReq.costCenter = toCcVal || r5 || String(row[6] || '');
              } else if (r1 === 'Info' || r1 === 'الملاحظات' || r0 === 'Info') {
                let infoVal = '';
                for (let ci = 2; ci < row.length; ci++) {
                  const cellVal = String(row[ci] || '').trim();
                  if (cellVal && cellVal !== ':') {
                    infoVal = cellVal;
                    break;
                  }
                }
                currentReq.info = infoVal || r5 || String(row[6] || '');
                const sQty = extractBurgerSauceQty(currentReq.info);
                if (sQty > 0) currentReq.burgerSauce = sQty;
              }

              // Detect Items Table Headers (Item No, Item, Unit, Qty / Column K)
              const rowStr = row.map(c => String(c || '').trim().toLowerCase());
              if (rowStr.some(c => c === 'item no.' || c === 'item' || c === 'qty' || c === 'الكمية' || c === 'الصنف')) {
                inItemsTable = true;
                headerRowIndexes.itemNo = rowStr.findIndex(c => c === 'item no.' || c === 'رقم الصنف');
                headerRowIndexes.item = rowStr.findIndex(c => c === 'item' || c === 'اسم الصنف' || c === 'المنتج');
                headerRowIndexes.unit = rowStr.findIndex(c => c === 'unit' || c === 'الوحدة');
                headerRowIndexes.qty = rowStr.findIndex(c => c === 'qty' || c === 'الكمية' || c === 'quantity');
                headerRowIndexes.price = rowStr.findIndex(c => c === 'price' || c === 'السعر');
                if (headerRowIndexes.qty === -1) headerRowIndexes.qty = 10;
                if (headerRowIndexes.item === -1) headerRowIndexes.item = 3;
                return;
              }

              // Parse Items Rows
              if (inItemsTable) {
                const rawItemName = String(row[headerRowIndexes.item !== -1 ? headerRowIndexes.item : 3] || '').trim();
                const rawQtyVal = row[headerRowIndexes.qty !== -1 ? headerRowIndexes.qty : 10];
                const rawUnit = String(row[headerRowIndexes.unit !== -1 ? headerRowIndexes.unit : 6] || '').trim();
                const rawPrice = row[headerRowIndexes.price !== -1 ? headerRowIndexes.price : 11] || 0;

                if (rawItemName && rawItemName !== 'Total:' && rawItemName !== 'Total' && rawQtyVal !== undefined && rawQtyVal !== '') {
                  const qtyNum = parseFloat(rawQtyVal);
                  if (qtyNum > 0) {
                    const pid = matchOrRegisterProduct(rawItemName, rawUnit, rawPrice);
                    if (pid) {
                      currentReq.items[pid] = (currentReq.items[pid] || 0) + qtyNum;
                      totalItemsParsed += qtyNum;
                    }
                  }
                }
              }
            }
          });

          if (currentReq && (currentReq.costCenter || Object.keys(currentReq.items).length)) {
            saveRequestToMap(currentReq);
          }
        });

        function saveRequestToMap(req) {
          const unifiedBranch = normalizeBranchCostCenter(req.costCenter, req.sheet, req.reqId);
          if (!branchMap[unifiedBranch]) {
            branchMap[unifiedBranch] = {
              branch: unifiedBranch,
              date: req.date || todayStr(),
              costCenters: new Set(),
              items: {},
              burgerSauce: 0,
              templatesCount: 0
            };
          }
          branchMap[unifiedBranch].templatesCount++;
          if (req.costCenter) branchMap[unifiedBranch].costCenters.add(req.costCenter);
          if (req.burgerSauce > 0) {
            branchMap[unifiedBranch].burgerSauce += req.burgerSauce;
            totalSauceParsed += req.burgerSauce;
          }
          Object.entries(req.items).forEach(([pid, qty]) => {
            branchMap[unifiedBranch].items[pid] = (branchMap[unifiedBranch].items[pid] || 0) + qty;
          });
        }

        const pendingList = Object.values(branchMap).map(b => {
          if (b.burgerSauce > 0) {
            b.items['burger-sauce'] = (b.items['burger-sauce'] || 0) + b.burgerSauce;
          }
          return {
            branch: b.branch,
            date: b.date,
            costCentersList: Array.from(b.costCenters).join(' + '),
            burgerSauce: b.burgerSauce,
            templatesCount: b.templatesCount,
            items: b.items
          };
        });

        if (!pendingList.length) {
          toast('No valid orders found in workbook', 'error');
          return;
        }

        _excelPendingOrders = pendingList;

        // Render Preview Modal
        const preview = document.getElementById('excel-preview');
        const ptbl = document.getElementById('excel-preview-table');
        if (document.getElementById('excel-preview-title')) {
          document.getElementById('excel-preview-title').innerHTML =
            `🎉 <b>Successfully parsed & aggregated (${fileName || 'branches.xlsx'}):</b><br/>` +
            `<span style="color:#4ade80;font-size:12px">✨ Merged <b>${totalTemplatesCount || pendingList.length} templates/cost-centers</b> into <b>${pendingList.length} branches</b> | Detected Burger Sauce: <b>${totalSauceParsed.toFixed(2)} L</b></span>`;
        }

        if (ptbl) {
          const thead = ptbl.querySelector('thead');
          if (thead) {
            thead.innerHTML = `
            <tr>
              <th>${'Unified Branch'}</th>
              <th>${'Merged Cost Centers'}</th>
              <th>${'Burger Sauce'}</th>
              <th>${'Total Items'}</th>
            </tr>
          `;
          }

          const tbody = ptbl.querySelector('tbody');
          if (tbody) {
            tbody.innerHTML = pendingList.map(o => {
              const sauceBadge = o.burgerSauce > 0
                ? `<span class="badge" style="background:rgba(192,132,252,0.18);color:#c084fc;font-weight:700">🍔 ${o.burgerSauce} ${'KG'}</span>`
                : `<span class="text-muted" style="font-size:11px">—</span>`;
              const itemsCount = Object.keys(o.items).length;
              const totalItemsQty = Object.values(o.items).reduce((a, b) => a + b, 0);

              return `
              <tr>
                <td style="color:#fff;font-weight:800;font-size:13.5px">${o.branch}</td>
                <td class="text-muted" style="font-size:11px;max-width:240px">${o.costCentersList || '—'}</td>
                <td>${sauceBadge}</td>
                <td style="font-weight:700;color:#22c55e">${itemsCount} ${'items'} (${totalItemsQty.toFixed(1)} ${'units'})</td>
              </tr>
            `;
            }).join('');
          }
        }

        if (preview) preview.style.display = 'block';
        toast(`✨ Aggregated ${pendingList.length} branches from Excel!`);
      }

      /* ── Load File via Input or Drop ── */
      function handleExcelFile(file) {
        if (!file) return;
        if (!window.XLSX) {
          toast('SheetJS not loaded. Check internet connection.', 'error');
          return;
        }
        const reader = new FileReader();
        reader.onload = function (evt) {
          try {
            const rawData = evt.target.result;
            let wb;
            try {
              const data = new Uint8Array(rawData);
              wb = XLSX.read(data, { type: 'array' });
            } catch (e1) {
              wb = XLSX.read(rawData, { type: 'binary' });
            }
            parseWorkbookData(wb, file.name);
          } catch (err) {
            console.error('Excel parse error:', err);
            toast('File reading error: ' + err.message, 'error');
          }
        };
        reader.readAsArrayBuffer(file);
      }

      /* ── ⚡ Auto Load Attached Local File (branches_data.xlsx) ── */
      async function loadDefaultBranchesFile() {
        if (!window.XLSX) {
          toast('SheetJS not loaded', 'error');
          return;
        }
        try {
          toast('⏳ Loading local branches file...');
          const res = await fetch('branches.xlsx');
          if (!res.ok) {
            throw new Error('File not found on server');
          }
          const arrayBuf = await res.arrayBuffer();
          const data = new Uint8Array(arrayBuf);
          const wb = XLSX.read(data, { type: 'array' });
          parseWorkbookData(wb, 'branches.xlsx');
        } catch (e) {
          console.warn('Auto-load fetch error:', e);
          document.getElementById('excel-file-input').click();
        }
      }

      function cancelExcelImport() {
        _excelPendingOrders = null;
        document.getElementById('excel-preview').style.display = 'none';
        const finput = document.getElementById('excel-file-input');
        if (finput) finput.value = '';
      }


      /* ── ⚡ Automated Inventory Deduction Engine ── */
      function deductStockForOrders(ordersList) {
        if (!ordersList || !ordersList.length) return { deductedRawCount: 0, summary: {} };

        const deductedSummary = {};
        let totalDeductionsCount = 0;

        ordersList.forEach(ord => {
          if (!ord.items) return;
          Object.entries(ord.items).forEach(([pid, orderedQty]) => {
            const numQty = Number(orderedQty) || 0;
            if (numQty <= 0) return;

            // 1. Resolve product recipe
            let recipe = S.recipes[pid];
            if (!recipe) {
              const prod = S.products.find(p => p.id === pid || p.code === pid || String(p.item_no) === String(pid));
              if (prod && S.recipes[prod.id]) {
                recipe = S.recipes[prod.id];
              }
            }

            // 2. If recipe exists, deduct all raw materials in BOM
            if (recipe && recipe.ings && Array.isArray(recipe.ings) && recipe.ings.length > 0) {
              recipe.ings.forEach(ing => {
                if (S.ings[ing.id]) {
                  const wasteFactor = 1 + (Number(ing.waste) || 0) / 100;
                  const deductAmount = (Number(ing.qty) || 0) * wasteFactor * numQty;
                  if (deductAmount > 0) {
                    const curStock = S.ings[ing.id].stock || 0;
                    S.ings[ing.id].stock = Math.max(0, curStock - deductAmount);
                    S.ings[ing.id].stock = Math.round(S.ings[ing.id].stock * 1000) / 1000;
                    deductedSummary[ing.id] = (deductedSummary[ing.id] || 0) + deductAmount;
                    totalDeductionsCount++;
                  }
                }
              });
            } else if (S.ings[pid]) {
              // 3. Direct raw material order
              const curStock = S.ings[pid].stock || 0;
              S.ings[pid].stock = Math.max(0, curStock - numQty);
              S.ings[pid].stock = Math.round(S.ings[pid].stock * 1000) / 1000;
              deductedSummary[pid] = (deductedSummary[pid] || 0) + numQty;
              totalDeductionsCount++;
            }
          });
        });

        // 4. Sync affected raw materials to database
        const uniqueIngs = Object.keys(deductedSummary);
        if (uniqueIngs.length > 0) {
          uniqueIngs.forEach(ingId => {
            const iv = S.ings[ingId];
            if (iv && typeof apiUpdateRawStock === 'function') {
              apiUpdateRawStock(ingId, iv.stock, iv.safety, iv.price || 0);
            }
          });
          console.log(`⚡ [Auto-Deduct] Successfully deducted ${uniqueIngs.length} raw materials for ${ordersList.length} orders!`);
        }

        return {
          deductedRawCount: uniqueIngs.length,
          summary: deductedSummary
        };
      }

      function confirmExcelImport() {
        if (!_excelPendingOrders || !_excelPendingOrders.length) return;
        const isReplaceMode = document.getElementById('excel-replace-mode')?.checked ?? true;
        const nextId = Date.now();
        let importedCount = 0;

        // Collect all dates in this imported batch
        const importedDates = new Set(_excelPendingOrders.map(o => normalizeDateIso(o.date)));

        // If replace mode is ON, clear previous orders for the matching dates to avoid duplicates
        if (isReplaceMode && importedDates.size > 0) {
          S.orders = S.orders.filter(o => !importedDates.has(normalizeDateIso(o.date)));
          if (S.taztikiRecords) {
            S.taztikiRecords = S.taztikiRecords.filter(r => !importedDates.has(normalizeDateIso(r.date)));
          }
        }

        const newlyImportedOrders = [];
        _excelPendingOrders.forEach((o, i) => {
          if (!o.items || !Object.keys(o.items).length) return;
          const normalizedOrderDate = normalizeDateIso(o.date);
          const ord = {
            id: nextId + i,
            branch: o.branch,
            date: normalizedOrderDate,
            items: o.items,
            notes: `📥 Merged import from branches sheet`
          };
          S.orders.unshift(ord);
          newlyImportedOrders.push(ord);
          importedCount++;

          // Add to Taztiki Records if Burger Sauce is requested
          if (o.burgerSauce > 0) {
            if (!S.taztikiRecords) S.taztikiRecords = [];
            S.taztikiRecords.unshift({
              id: 'tzt-' + (nextId + i),
              date: normalizedOrderDate,
              branch: o.branch,
              qty: o.burgerSauce,
              type: 'out',
              notes: 'Auto-imported from branch Excel request'
            });
          }
        });

        // Sync directly to backend database so all devices (Mobile, PC, etc.) see it instantly!
        if (newlyImportedOrders.length) {
          apiSaveOrders(newlyImportedOrders, isReplaceMode ? Array.from(importedDates) : []);
        }

        // ⚡ AUTO-DEDUCT: Deduct raw materials from inventory based on BOM recipes
        const deductRes = deductStockForOrders(newlyImportedOrders);

        // Also set the filter date to the imported date automatically so the user sees it immediately
        const firstDate = Array.from(importedDates)[0];
        if (firstDate) {
          const fDateInput = document.getElementById('f-date');
          if (fDateInput) fDateInput.value = firstDate;
        }

        saveState();
        cancelExcelImport();
        renderOrders();
        if (typeof renderInv === 'function') renderInv();
        if (typeof renderProd === 'function') renderProd();
        if (typeof renderProduction === 'function') renderProduction();

        if (deductRes.deductedRawCount > 0) {
          toast(`📥 Saved ${importedCount} orders & auto-deducted ${deductRes.deductedRawCount} raw materials from inventory!`);
        } else {
          toast(`📥 Successfully saved & synced ${importedCount} orders to cloud!`);
        }
        _excelPendingOrders = null;
      }

      /* ============================================================
         Smart Kitchen ERP: OFFICIAL PRINT VOUCHER & PRINT PO
      ============================================================ */
      function printPO(i) {
        const po = S.POs[i];
        if (!po) return;
        const d = S.ings[po.ingId];
        const nm = d ? (isAr() ? d.ar : d.en) : po.ingId;
        const price = d ? d.price : 0;

        document.getElementById('pr-po-number').textContent = po.id;
        document.getElementById('pr-po-date').textContent = ('Date: ') + new Date().toISOString().slice(0, 10);
        document.getElementById('pr-po-status').textContent = po.status === 'received' ? ('Received') : (po.status === 'sent' ? ('Sent to Supplier') : ('Approved Draft'));
        document.getElementById('pr-po-sup').textContent = po.sup || 'General Vendor';
        document.getElementById('pr-po-priority').textContent = po.priority === 'high' ? ('Urgent Priority') : ('Normal Priority');

        document.getElementById('pr-po-items').innerHTML = `
    <tr style="border-bottom:1px solid #e2e8f0">
      <td style="padding:10px">1</td>
      <td style="padding:10px;font-weight:700;color:#0f172a">${nm}</td>
      <td style="padding:10px;font-weight:800;color:#2563eb">${po.qty}</td>
      <td style="padding:10px">${po.unit}</td>
      <td style="padding:10px">${price} ${cur()}</td>
      <td style="padding:10px;font-weight:700">${(+po.cost).toLocaleString('en-US')} ${cur()}</td>
    </tr>
    <tr style="background:#f8fafc;font-weight:800">
      <td colspan="5" style="padding:12px;text-align:end">${'Total PO Value:'}</td>
      <td style="padding:12px;color:#ea580c;font-size:15px">${(+po.cost).toLocaleString('en-US')} ${cur()}</td>
    </tr>
  `;

        openModal('modal-print-po');
      }

      /* ============================================================
         LIVE KITCHEN PULSE TICKER
      ============================================================ */
      function updateLiveTicker() {
        const ticker = document.getElementById('live-ticker-text');
        if (!ticker) return;
        const shorts = getShortages();
        const totalOrders = S.orders.length;

        if (shorts.length > 0) {
          ticker.textContent = isAr()
            ? `Central Kitchen: LIVE | ⚠️ ${shorts.length} Shortage(s) detected` : `Central Kitchen: LIVE | ⚠️ ${shorts.length} Shortage(s) detected`;
          ticker.parentElement.style.borderColor = 'rgba(239, 68, 68, 0.35)';
          ticker.parentElement.style.color = '#f87171';
        } else {
          ticker.textContent = isAr()
            ? `Central Kitchen: LIVE | 100% Demand Met | ${totalOrders} Branch Orders` : `Central Kitchen: LIVE | 100% Demand Met | ${totalOrders} Branch Orders`;
          ticker.parentElement.style.borderColor = 'rgba(34, 197, 94, 0.25)';
          ticker.parentElement.style.color = '#4ade80';
        }
      }

      /* ============================================================
         COMMAND PALETTE SEARCH (Ctrl + K)
      ============================================================ */
      function openCmdBar() {
        const m = document.getElementById('modal-cmd');
        if (!m) return;
        m.classList.add('open');
        const inp = document.getElementById('cmd-search-input');
        inp.value = '';
        inp.focus();
        handleCmdSearch('');
      }

      function closeCmdBar() {
        const m = document.getElementById('modal-cmd');
        if (m) m.classList.remove('open');
      }

      function handleCmdSearch(q) {
        const res = document.getElementById('cmd-results');
        if (!res) return;
        const query = (q || '').trim().toLowerCase();

        const items = [];

        // Navigation pages
        const pages = [
          { name: 'Dashboard', page: 'dashboard', icon: '📊', sub: 'General metrics & shortages' },
          { name: 'Reports & Analytics', page: 'reports', icon: '📈', sub: 'Month-over-month comparisons' },
          { name: 'Branch Orders', page: 'orders', icon: '📥', sub: 'Excel import & branch orders' },
          { name: 'Recipes (BOM)', page: 'recipes', icon: '🧪', sub: 'Sub-assemblies & BOM' },
          { name: 'Production Engine', page: 'production', icon: '⚙️', sub: 'Raw material calculation + 5% buffer' },
          { name: 'Inventory Stock', page: 'inventory', icon: '📦', sub: 'Stock levels & safety thresholds' },
          { name: 'Purchase Orders', page: 'purchase', icon: '🛒', sub: 'Generate & print purchase orders' },
          { name: 'Invoices Ledger', page: 'invoices', icon: '🧾', sub: 'Supplier bills & payments' },
          { name: 'Waste & Spoilage', page: 'waste', icon: '🗑️', sub: 'Log spoilage & financial loss' }
        ];

        pages.forEach(p => {
          if (!query || p.name.toLowerCase().includes(query) || p.page.toLowerCase().includes(query)) {
            items.push({
              title: p.name,
              sub: p.sub,
              icon: p.icon,
              action: () => { nav(p.page); closeCmdBar(); }
            });
          }
        });

        // Raw Materials
        Object.entries(S.ings).forEach(([id, iv]) => {
          const nmAr = iv.ar || '';
          const nmEn = iv.en || '';
          if (query && (nmAr.toLowerCase().includes(query) || nmEn.toLowerCase().includes(query) || id.toLowerCase().includes(query))) {
            items.push({
              title: `${isAr() ? iv.ar : iv.en} (${iv.stock} ${iv.uom})`,
              sub: `${'Raw Material | Price:'} ${iv.price} ${cur()} | ${iv.sup || 'General Vendor'}`,
              icon: '📦',
              action: () => { nav('inventory'); closeCmdBar(); }
            });
          }
        });

        // Products
        S.products.forEach(p => {
          const nmAr = p.ar || '';
          const nmEn = p.en || '';
          if (query && (nmAr.toLowerCase().includes(query) || nmEn.toLowerCase().includes(query) || p.id.toLowerCase().includes(query))) {
            items.push({
              title: `${pname(p)}`,
              sub: `${'Central Kitchen Item | Unit:'} ${p.unit}`,
              icon: '🥫',
              action: () => { nav('recipes'); S.curRecipe = p.id; renderRecipes(); closeCmdBar(); }
            });
          }
        });

        if (!items.length) {
          res.innerHTML = `<div style="text-align:center;padding:24px;color:#94a3b8;font-size:13px">${'No matching results found'}</div>`;
          return;
        }

        res.innerHTML = items.slice(0, 10).map((it, idx) => `
    <div class="cmd-item" onclick="window._cmdActions[${idx}]()">
      <div class="cmd-item-left">
        <div class="cmd-item-icon">${it.icon}</div>
        <div>
          <div class="cmd-item-title">${it.title}</div>
          <div class="cmd-item-sub">${it.sub}</div>
        </div>
      </div>
      <span style="font-size:11px;color:#94a3b8">↵</span>
    </div>
  `).join('');

        window._cmdActions = items.map(it => it.action);
      }

      // Global Ctrl + K listener
      window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          openCmdBar();
        }
        if (e.key === 'Escape') {
          closeCmdBar();
        }
      });

      /* ============================================================
         INITIALIZATION
      ============================================================ */
      // Add invoices & wastes array to state
      S.invoices = [];
      S.wastes = [];
      S.currentUser = null;

      /* ============================================================
         AUTHENTICATION & SESSION MANAGEMENT
      ============================================================ */
      function showLoginModal(errorMsg) {
        const modal = document.getElementById('modal-login');
        if (modal) {
          modal.classList.add('open');
          const errBox = document.getElementById('login-error-msg');
          if (errBox) {
            if (errorMsg) {
              errBox.textContent = errorMsg;
              errBox.style.display = 'block';
            } else {
              errBox.style.display = 'none';
            }
          }
          const pwd = document.getElementById('login-password');
          if (pwd) pwd.value = '';
        }
      }
      window.showLoginModal = showLoginModal;

      function hideLoginModal() {
        const modal = document.getElementById('modal-login');
        if (modal) modal.classList.remove('open');
      }
      window.hideLoginModal = hideLoginModal;

      async function checkAuth() {
        try {
          const res = await fetch('/api/auth/me');
          if (res.ok) {
            const data = await res.json();
            if (data.authenticated && data.user) {
              S.currentUser = data.user;
              updateUserUI(data.user);
              hideLoginModal();
              return true;
            }
          }
        } catch (e) {
          console.warn('Auth check error:', e);
        }
        showLoginModal();
        return false;
      }
      window.checkAuth = checkAuth;

      async function handleLoginSubmit(e) {
        if (e && e.preventDefault) e.preventDefault();
        const username = document.getElementById('login-username')?.value?.trim();
        const password = document.getElementById('login-password')?.value;
        const btn = document.getElementById('btn-login-submit');
        const errBox = document.getElementById('login-error-msg');
        const spinner = document.getElementById('login-btn-spinner');

        if (!username || !password) {
          if (errBox) {
            errBox.textContent = 'Please enter username and password';
            errBox.style.display = 'block';
          }
          return;
        }

        if (btn) btn.disabled = true;
        if (spinner) spinner.style.display = 'inline-block';
        if (errBox) errBox.style.display = 'none';

        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          });
          const data = await res.json();

          if (res.ok && data.success) {
            S.currentUser = data.user;
            updateUserUI(data.user);
            hideLoginModal();
            if (typeof toast === 'function') {
              toast((typeof isAr === 'function' && isAr()) ? `Welcome back, ${data.user.username}!` : `Welcome back, ${data.user.username}!`, 'success');
            }
            if (typeof syncFromSQL === 'function') {
              syncFromSQL().then(() => {
                if (typeof renderDash === 'function') renderDash();
                if (typeof renderOrders === 'function') renderOrders();
                if (typeof renderInv === 'function') renderInv();
                if (typeof updateLiveTicker === 'function') updateLiveTicker();
              });
            }
          } else {
            if (errBox) {
              errBox.textContent = data.error || ('Invalid credentials');
              errBox.style.display = 'block';
            }
          }
        } catch (err) {
          if (errBox) {
            errBox.textContent = 'Server connection error';
            errBox.style.display = 'block';
          }
        } finally {
          if (btn) btn.disabled = false;
          if (spinner) spinner.style.display = 'none';
        }
      }
      window.handleLoginSubmit = handleLoginSubmit;

      async function handleLogout() {
        try {
          await fetch('/api/auth/logout', { method: 'POST' });
        } catch (e) { }
        S.currentUser = null;
        updateUserUI(null);
        showLoginModal('Logged out successfully');
        if (typeof toast === 'function') {
          toast('Logged out successfully', 'info');
        }
      }
      window.handleLogout = handleLogout;

      function updateUserUI(user) {
        const nameEl = document.getElementById('header-user-name');
        const infoEl = document.getElementById('user-dropdown-info');
        if (user) {
          if (nameEl) nameEl.textContent = user.username;
          if (infoEl) infoEl.textContent = `${user.username} (${user.role || 'Admin'})`;
        } else {
          if (nameEl) nameEl.textContent = '';
          if (infoEl) infoEl.textContent = '';
        }
      }
      window.updateUserUI = updateUserUI;

      function toggleUserDropdown(e) {
        if (e && e.stopPropagation) e.stopPropagation();
        const menu = document.getElementById('user-dropdown-menu');
        if (menu) menu.classList.toggle('js-hidden');
      }
      window.toggleUserDropdown = toggleUserDropdown;

      window.addEventListener('click', () => {
        const menu = document.getElementById('user-dropdown-menu');
        if (menu && !menu.classList.contains('js-hidden')) {
          menu.classList.add('js-hidden');
        }
      });


      document.addEventListener('DOMContentLoaded', () => {
        const mobBtn = document.getElementById('mob-btn');
        if (mobBtn) {
          mobBtn.style.display = (window.innerWidth <= 768) ? 'flex' : 'none';
        }
        window.addEventListener('resize', () => {
          const mob = document.getElementById('mob-btn');
          if (mob) mob.style.display = (window.innerWidth <= 768) ? 'flex' : 'none';
        });

        // 💾 1. Fast initial render from state/localStorage
        loadState();
        applyLang();
        renderDash();
        updateLiveTicker();

        // 🔒 2. Session verification & live sync
        checkAuth().then(isAuthed => {
          if (isAuthed && typeof syncFromSQL === 'function') {
            syncFromSQL().then(synced => {
          if (synced) {
            renderDash();
            renderOrders();
            renderInv();
            renderRecipes();
            if (typeof updateStockHealthDial === 'function') updateStockHealthDial();
            if (typeof renderProd === 'function') renderProd();
            if (typeof renderProduction === 'function') renderProduction();
            updateLiveTicker();
          }
            }).catch(err => console.warn('Init sync failed:', err));
          }
        });
      });
    

// ── SCRIPT SEGMENT BREAK ──


      (function () {
        const el = document.getElementById('hero-date-text');
        if (el) {
          const d = new Date();
          const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          el.textContent = (typeof toWesternDigits === 'function' ? toWesternDigits(d.toLocaleDateString('ar-EG-u-nu-latn', opts)) : d.toLocaleDateString('en-GB', opts));
        }
      })();

      // ── Helper functions for Reference Topbar & Glass Navigation ──
      function scrollToWorkflow() {
        const el = document.querySelector('.workflow-pipeline-card');
        if (el) {
          if (S.curPage !== 'dashboard') nav('dashboard');
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
        }
      }

      function exportDataTrigger() {
        if (typeof showToast === 'function') {
          showToast('📥 Exporting data report...');
        }
        setTimeout(() => {
          if (typeof exportReportCSV === 'function') {
            exportReportCSV();
          } else {
            alert('Data report export generated successfully.');
          }
        }, 400);
      }

      function toggleThemeMock() {
        const l = document.getElementById('th-light');
        const d = document.getElementById('th-dark');
        if (l && d) {
          l.classList.toggle('active');
          d.classList.toggle('active');
          if (typeof showToast === 'function') {
            showToast('🌙 Dark Mode Active');
          }
        }
      }


      // ── REAL DARK / LIGHT MODE THEME ENGINE ──
      // Enforced Dark Enterprise Mode
      function toggleTheme() {
        setTheme('dark');
      }

      function setTheme(theme) {
        document.documentElement.classList.add('dark');
        if (document.body) document.body.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        try {
          localStorage.setItem('theme', 'dark');
          localStorage.setItem('erp_theme', 'dark');
          localStorage.setItem('sk_theme', 'dark');
        } catch (e) { }
      }

      // Auto-load enforced dark theme on startup
      try {
        setTheme('dark');
      } catch (e) { }

      // ── LIVE NOTIFICATIONS & ALERTS SYSTEM ──
      function renderNotificationsList() {
        const container = document.getElementById('notif-items-list');
        const countBadge = document.getElementById('notif-count-badge');
        if (!container) return;

        const notifs = [];

        // 1. Check for shortages or low stock from real ERP state
        try {
          let shortageCount = 0;
          if (typeof S !== 'undefined' && S.inventory) {
            Object.keys(S.inventory).forEach(k => {
              const item = S.inventory[k];
              if (item && Number(item.current || 0) <= Number(item.minStock || 5)) shortageCount++;
            });
          }
          if (shortageCount > 0) {
            notifs.push({
              type: 'alert',
              icon: '⚠️',
              title: 'Raw Material Shortage Alert',
              desc: shortageCount + ' items reached safety threshold or below in stock',
              time: 'Just now',
              actionText: 'Inspect Stock',
              actionFn: "nav('inventory')"
            });
          } else {
            notifs.push({
              type: 'success',
              icon: '✓',
              title: 'Inventory Balanced & Healthy',
              desc: 'All core materials exceed safety stock thresholds without bottlenecks',
              time: 'Today',
              actionText: 'View Inventory',
              actionFn: "nav('inventory')"
            });
          }
        } catch (e) { }

        // 2. Check for branch orders
        try {
          let orderCount = 0;
          if (typeof S !== 'undefined' && S.orders) {
            orderCount = Array.isArray(S.orders) ? S.orders.length : Object.keys(S.orders).length;
          }
          if (orderCount > 0) {
            notifs.push({
              type: 'info',
              icon: '📋',
              title: 'Inbound Branch Orders',
              desc: 'There are ' + orderCount + ' branch orders queued in current cycle',
              time: 'Today',
              actionText: 'Review Orders',
              actionFn: "nav('orders')"
            });
          } else {
            notifs.push({
              type: 'info',
              icon: '📝',
              title: 'Ready for Orders',
              desc: 'Central Kitchen is operational and ready to receive branch demands',
              time: 'Today',
              actionText: 'Create Order',
              actionFn: "nav('orders')"
            });
          }
        } catch (e) { }

        // 3. Batches / Cook Plan
        notifs.push({
          type: 'prod',
          icon: '🍳',
          title: 'Kitchen BOM Execution Engine',
          desc: 'Automated recipe explosion and ingredient deduction engine active',
          time: 'Active',
          actionText: 'Production Plan',
          actionFn: "nav('production')"
        });

        // 4. Cloud Database Sync
        notifs.push({
          type: 'sys',
          icon: '⚡',
          title: 'System Services Online',
          desc: 'Local database and core backend services connected and running',
          time: 'Live',
          actionText: 'System Status',
          actionFn: "toggleSqlSync()"
        });

        if (countBadge) countBadge.textContent = notifs.length + ' Notifications';

        container.innerHTML = notifs.map(n => `
      <div class="notif-card" onclick="${n.actionFn}; closeNotificationsDropdown();">
        <div class="notif-icon-box notif-${n.type}">
          ${n.icon}
        </div>
        <div class="notif-content">
          <div class="notif-title">${n.title}</div>
          <div class="notif-desc">${n.desc}</div>
          <div class="notif-footer">
            <span class="notif-time">${n.time}</span>
            <span class="notif-action-btn">${n.actionText} ←</span>
          </div>
        </div>
      </div>
    `).join('');
      }

      function toggleNotificationsDropdown(e) {
        if (e) e.stopPropagation();
        const dd = document.getElementById('notifications-dropdown');
        if (!dd) return;
        const isOpen = dd.classList.contains('open');
        if (isOpen) {
          dd.classList.remove('open');
        } else {
          renderNotificationsList();
          dd.classList.add('open');
        }
      }

      function closeNotificationsDropdown() {
        const dd = document.getElementById('notifications-dropdown');
        if (dd) dd.classList.remove('open');
      }

      function markAllNotificationsRead(e) {
        if (e) e.stopPropagation();
        const dot = document.querySelector('.unread-dot');
        if (dot) dot.style.display = 'none';
        closeNotificationsDropdown();
        if (typeof showToast === 'function') {
          showToast('✓ All notifications marked as read');
        }
      }

      // Global click outside to close dropdown
      document.addEventListener('click', function (e) {
        const dd = document.getElementById('notifications-dropdown');
        const btn = document.getElementById('notif-bell-btn');
        if (dd && dd.classList.contains('open')) {
          if (!dd.contains(e.target) && (!btn || !btn.contains(e.target))) {
            dd.classList.remove('open');
          }
        }
      });


      // ── Dynamic Active Section Syncer (Changes icon & title as user navigates) ──
      const ERP_PAGES_META = {
        welcome: { title: 'Welcome Hub', en: 'Welcome Hub', icon: '✨' },
        dashboard: { title: 'Dashboard', en: 'Dashboard', icon: '🎛️' },
        orders: { title: 'Branch Orders', en: 'Branch Orders', icon: '📋' },
        production: { title: 'Production Plan', en: 'Production Plan', icon: '🍳' },
        centerstock: { title: 'Center Stock', en: 'Center Stock', icon: '📦' },
        inventory: { title: 'Raw Inventory', en: 'Raw Inventory', icon: '🥫' },
        purchase: { title: 'Purchase Orders', en: 'Purchase Orders', icon: '🛒' },
        recipes: { title: 'Recipes & BOM', en: 'Recipes & BOM', icon: '📖' },
        waste: { title: 'Waste Ledger', en: 'Waste Ledger', icon: '🗑️' },
        reports: { title: 'Reports & Matrix', en: 'Reports & Matrix', icon: '📈' },
        shipments: { title: 'Branches', en: 'Branches', icon: '🚚' }
      };

      function updateActiveSectionUI(page) {
        const meta = ERP_PAGES_META[page] || { title: page, en: page, icon: '⚡' };
        const iconEl = document.getElementById('topbar-active-icon');
        const titleEl = document.getElementById('topbar-active-title');
        if (iconEl) iconEl.textContent = meta.icon;
        if (titleEl) {
          const activeText = (typeof isAr === 'function' && isAr()) ? meta.title : meta.en;
          titleEl.textContent = activeText;
          titleEl.setAttribute('data-ar', meta.title);
          titleEl.setAttribute('data-en', meta.en);
        }

        // Highlight matching dock item
        document.querySelectorAll('.sidebar .nav-item[data-page], .curved-dock .nav-item[data-page], .nav-item[data-page]').forEach(el => {
          if (el.getAttribute('data-page') === page) {
            el.classList.add('active');
          } else {
            el.classList.remove('active');
          }
        });
      }

      // Hook into nav() function seamlessly
      const _origNav = typeof nav === 'function' ? nav : null;
      if (_origNav) {
        window.nav = function (page) {
          _origNav(page);
          updateActiveSectionUI(page);
          const cnt = document.querySelector('.content');
          if (cnt) {
            cnt.scrollTo({ top: 0, behavior: 'smooth' });
          }
        };
      }

      // Ensure Video Autoplay works smoothly (Obsolete polling safely removed)
      function ensureHeroVideoPlays() {
        // Obsolete hero video polling removed safely for performance
      }

      // Native window & document scrolling enabled
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
          ensureHeroVideoPlays();
          nav('dashboard');
        });
      } else {
        ensureHeroVideoPlays();
        nav('dashboard');
      }

      // Mobile Off-canvas Drawer Event Listeners
      document.addEventListener('DOMContentLoaded', function () {
        const toggleBtn = document.getElementById('sidebar-toggle-btn');
        const closeBtn = document.getElementById('sidebar-close-btn');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mob-overlay');

        if (toggleBtn) {
          toggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (typeof openMob === 'function') openMob();
            else if (sidebar) sidebar.classList.add('active');
          });
        }
        if (closeBtn) {
          closeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (typeof closeMob === 'function') closeMob();
            else if (sidebar) sidebar.classList.remove('active');
          });
        }
        if (overlay) {
          overlay.addEventListener('click', function () {
            if (typeof closeMob === 'function') closeMob();
            else if (sidebar) sidebar.classList.remove('active');
          });
        }
      });

    