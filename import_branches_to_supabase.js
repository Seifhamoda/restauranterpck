const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://ihminamcbstcexsdacys.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlobWluYW1jYnN0Y2V4c2RhY3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5Mjg5MDksImV4cCI6MjEwMzUwNDkwOX0.4i4zO2ygSHdkQULp2Chqz3mxiUYevOjbX537w7uWRrE';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function isAr() { return true; }
function todayStr() { return '2026-08-28'; }
function normalizeDateIso(s) {
  if (!s) return todayStr();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const m = String(s).match(/(\d{4})[/-](\d{1,2})[/-](\d{1,2})/);
  if (m) return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`;
  return todayStr();
}

function extractBurgerSauceQty(infoText) {
  if (!infoText || typeof infoText !== 'string') return 0;
  const t = infoText.trim().toLowerCase();
  if (!t.includes('burger') && !t.includes('brgr') && !t.includes('برجر') && !t.includes('sauce') && !t.includes('صوص')) return 0;

  const gramMatch = t.match(/([0-9]*\.?[0-9]+)\s*(?:جرام|جم|gram|g )/i);
  if (gramMatch) {
    const val = parseFloat(gramMatch[1]);
    return val > 10 ? val / 1000 : val;
  }
  const kgMatch = t.match(/([0-9]+\.?[0-9]*|\.[0-9]+)\s*(?:k|kg|ك|كيلو|كجم)/i);
  if (kgMatch) return parseFloat(kgMatch[1]);
  const numMatch = t.match(/([0-9]+\.?[0-9]*|\.[0-9]+)/);
  if (numMatch) return parseFloat(numMatch[1]);
  return 0;
}

function normalizeBranchCostCenter(ccName, sheetName, reqId) {
  let rawCc = (ccName || '').trim();
  if ((!rawCc || rawCc === ':') && reqId) {
    const m = String(reqId).match(/\((.*?)\)/);
    if (m) rawCc = m[1].trim();
  }
  const cc = (rawCc || '').toLowerCase();
  const sh = (sheetName || '').toLowerCase();
  const req = (reqId || '').toLowerCase();
  const full = `${cc} ${sh} ${req}`.trim();

  if (full.includes('water way') || full.includes('ww') || full.includes('وتر واى') || full.includes('the drive ww')) {
    if (full.includes('split') || full.includes('drive 01') || full.includes('drive 1')) return 'فرع اسبليت واتر واي (Split Water Way)';
    return 'فرع واتر واي (Water Way)';
  }
  if (full.includes('uptown') || full.includes('up town') || full.includes('اب تاون') || full.includes('أب تاون')) return 'فرع أب تاون (Uptown)';
  if (full.includes('o1') || full.includes('01')) {
    if (full.includes('split')) return 'فرع اسبليت O1 (Split O1)';
    return 'فرع O1 (O1)';
  }
  if (full.includes('the field') || full.includes('field') || full.includes('معادى') || full.includes('المعادي')) return 'فرع المعادي (The Field)';
  if (full.includes('mivida') || full.includes('مفيده') || full.includes('ميفيدا')) return 'فرع ميفيدا (Mivida)';
  if (full.includes('sodic') || full.includes('سوديك')) return 'فرع سوديك (Sodic)';
  if (full.includes('new giza club') || full.includes('النادى') || full.includes('النادي')) return 'فرع نادي نيو جيزة (New Giza Club)';
  if (full.includes('new giza') || full.includes('نيو جيزه') || full.includes('نيو جيزة')) {
    if (full.includes('split')) return 'فرع اسبليت نيو جيزة (Split New Giza)';
    return 'فرع نيو جيزة (New Giza)';
  }
  if (full.includes('park st') || full.includes('park') || full.includes('بارك')) return 'فرع بارك ستريت (Park St)';
  if (full.includes('mall of arabia') || full.includes('moa') || full.includes('العرب')) return 'فرع مول العرب (Mall of Arabia)';
  if (full.includes('palm hills') || full.includes('بالم')) return 'فرع بالم هيلز (Palm Hills)';
  if (full.includes('kode') || full.includes('كود')) return 'فرع كود (Kode)';
  if (full.includes('dahshour') || full.includes('دهشور')) return 'فرع دهشور (Dahshour)';
  if (full.includes('madinty') || full.includes('مدينتي')) return 'فرع مدينتي (Madinty)';
  if (full.includes('district 5') || full.includes('d5') || full.includes('ديستريكت')) return 'فرع ديستريكت 5 (District 5)';
  if (full.includes('ilbosco') || full.includes('bosco') || full.includes('بوسكو')) return 'فرع إل بوسكو (IL Bosco)';
  if (full.includes('drive 02') || full.includes('drive 2') || full.includes('d2')) return 'فرع D2 (Drive 02)';
  if (full.includes('katamya') || full.includes('katameya') || full.includes('القطامية') || full.includes('قطامية') || full.includes('saints-katamya')) return 'فرع قطامية (Katameya)';
  if (full.includes('ngg') || full.includes('الجولف') || full.includes('golf') || full.includes('ngg-saint')) return 'فرع الجولف (NGG Golf)';
  if (full.includes('core woc') || full.includes('walk') || full.includes('woc')) return 'فرع Core WOC';
  if (full.includes('core ph') || full.includes('p.h') || full.includes('ph')) return 'فرع Core PH';
  if (full.includes('cac') || full.includes('كـاك') || full.includes('كاك')) return 'فرع CAC (CAC)';
  if (full.includes('orange') || full.includes('اورانج') || full.includes('أورانج')) return 'فرع أورانج (Orange)';

  return rawCc || sheetName || 'فرع عام';
}

const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'manufactured_products.json'), 'utf8'));

function matchOrRegisterProduct(rawName, rawUnit, rawPrice) {
  if (!rawName) return null;
  const clean = String(rawName).trim();
  if (!clean || clean === 'Total:' || clean === 'الإجمالي:') return null;
  const cleanLow = clean.toLowerCase();

  let p = products.find(x =>
    (x.ar && x.ar.toLowerCase() === cleanLow) ||
    (x.en && x.en.toLowerCase() === cleanLow) ||
    (x.ar && (cleanLow.includes(x.ar.toLowerCase()) || x.ar.toLowerCase().includes(cleanLow))) ||
    (x.en && (cleanLow.includes(x.en.toLowerCase()) || x.en.toLowerCase().includes(cleanLow)))
  );
  if (p) return p.id;
  return null;
}

async function runCompleteImport() {
  console.log('🚀 Running complete production parser on الفروع.xlsx...');
  const filePath = path.join(__dirname, 'الفروع.xlsx');
  const wb = XLSX.readFile(filePath);
  const branchMap = {};

  wb.SheetNames.forEach(sheetName => {
    const ws = wb.Sheets[sheetName];
    if (!ws || !ws['!ref']) return;
    const matrix = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
    let currentReq = null;
    let inItemsTable = false;
    let headerRowIndexes = { item: -1, qty: -1, unit: -1, price: -1, itemNo: -1 };

    matrix.forEach(row => {
      if (!Array.isArray(row)) return;
      const r0 = String(row[0] || '').trim();
      const r1 = String(row[1] || '').trim();
      const r5 = String(row[5] || '').trim();

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
        return;
      }

      if (currentReq) {
        if (r1 === 'Date' || r1 === 'التاريخ' || r0 === 'Date') {
          currentReq.date = normalizeDateIso(r5 || String(row[4] || '') || todayStr());
        } else if (r1.includes('To Cost Center') || r0.includes('To Cost Center') || r1.includes('إلى مركز التكلفة')) {
          let toCcVal = '';
          for (let ci = 2; ci < row.length; ci++) {
            const cellVal = String(row[ci] || '').trim();
            if (cellVal && cellVal !== ':') { toCcVal = cellVal; break; }
          }
          currentReq.costCenter = toCcVal || r5 || String(row[6] || '');
        } else if (r1 === 'Info' || r1 === 'الملاحظات' || r0 === 'Info') {
          let infoVal = '';
          for (let ci = 2; ci < row.length; ci++) {
            const cellVal = String(row[ci] || '').trim();
            if (cellVal && cellVal !== ':') { infoVal = cellVal; break; }
          }
          currentReq.info = infoVal || r5 || String(row[6] || '');
          const sQty = extractBurgerSauceQty(currentReq.info);
          if (sQty > 0) currentReq.burgerSauce = sQty;
        }

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

        if (inItemsTable) {
          const rawItemName = String(row[headerRowIndexes.item !== -1 ? headerRowIndexes.item : 3] || '').trim();
          const rawQtyVal = row[headerRowIndexes.qty !== -1 ? headerRowIndexes.qty : 10];
          const rawUnit = String(row[headerRowIndexes.unit !== -1 ? headerRowIndexes.unit : 6] || '').trim();
          const rawPrice = row[headerRowIndexes.price !== -1 ? headerRowIndexes.price : 11] || 0;

          if (rawItemName && rawItemName !== 'Total:' && rawItemName !== 'الإجمالي:' && rawQtyVal !== undefined && rawQtyVal !== '') {
            const qtyNum = parseFloat(rawQtyVal);
            if (qtyNum > 0) {
              const pid = matchOrRegisterProduct(rawItemName, rawUnit, rawPrice);
              if (pid) {
                currentReq.items[pid] = (currentReq.items[pid] || 0) + qtyNum;
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
        burgerSauce: 0
      };
    }
    if (req.costCenter) branchMap[unifiedBranch].costCenters.add(req.costCenter);
    if (req.burgerSauce > 0) branchMap[unifiedBranch].burgerSauce += req.burgerSauce;
    Object.entries(req.items).forEach(([pid, qty]) => {
      branchMap[unifiedBranch].items[pid] = (branchMap[unifiedBranch].items[pid] || 0) + qty;
    });
  }

  const branchList = Object.values(branchMap);
  branchList.forEach(b => {
    if (b.burgerSauce > 0) b.items['burger-sauce'] = (b.items['burger-sauce'] || 0) + b.burgerSauce;
  });

  console.log(`✅ Extracted ${branchList.length} Unified Branches with full product requests!`);

  // Upload to Supabase Cloud
  const orderRows = [];
  const itemRows = [];
  const tazRows = [];
  const now = Date.now();

  branchList.forEach((b, idx) => {
    const oid = `ord-${now}-${idx}`;
    orderRows.push({
      id: oid,
      branch: b.branch,
      order_date: b.date,
      notes: `استيراد مجمع من شيت الفروع (${Array.from(b.costCenters).join(' + ')})`
    });

    if (b.burgerSauce > 0) {
      tazRows.push({
        id: `tzt-${now}-${idx}`,
        order_date: b.date,
        branch: b.branch,
        qty: b.burgerSauce,
        type: 'out',
        notes: 'سحب تلقائي من طلب الفرع'
      });
    }

    Object.entries(b.items).forEach(([pid, q]) => {
      itemRows.push({
        order_id: oid,
        product_id: pid,
        qty: q
      });
    });
  });

  console.log(`📤 Uploading to Supabase Cloud: ${orderRows.length} Orders, ${itemRows.length} Order Items, ${tazRows.length} Taztiki records...`);

  await supabase.from('order_items').delete().neq('id', 0);
  await supabase.from('orders').delete().neq('id', '');
  await supabase.from('taztiki_records').delete().neq('id', '');

  await supabase.from('orders').insert(orderRows);
  await supabase.from('order_items').insert(itemRows);
  if (tazRows.length) await supabase.from('taztiki_records').insert(tazRows);

  console.log('🎉 SUPABASE CLOUD DATABASE FULLY POPULATED & LIVE!');
}

runCompleteImport();
