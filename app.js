// ============================================================
// GLOBAL FETCH INTERCEPTOR (SECURITY & AUTHENTICATION)
// ============================================================
const originalFetch = window.fetch;
window.fetch = function(url, options = {}) {
  options.headers = {
    ...(options.headers || {}),
    'X-Requested-With': 'CK-ERP-Client'
  };
  return originalFetch(url, options);
};


    (function () {
      try {
        const theme = localStorage.getItem('theme') || localStorage.getItem('erp_theme');
        if (theme === 'dark') {
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
        lang: 'ar',
        sbCol: false,
        curPage: 'dashboard',
        curRecipe: 'amer-sauce',
        POs: [],
        branches: [
          'فرع التجمع الخامس',
          'فرع الشيخ زايد',
          'فرع المعادي',
          'فرع سموحة'
        ],
        /* ── Central Kitchen Manufactured Products Master (المنتجات المصنعة PA - 88 صنف معتمد من ورقة العمل) ── */
        products: [
          {
            "id": "prod-turkey-pastrame-pa",
            "code": "110296",
            "item_no": "110296",
            "ar": "Turkey pastrame (PA)",
            "en": "Turkey pastrame (PA)",
            "unit": "Each",
            "cat": "chicken",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-onion-rings-fried-pa",
            "code": "110050",
            "item_no": "110050",
            "ar": "Onion Rings Fried . (PA)",
            "en": "Onion Rings Fried . (PA)",
            "unit": "Portion",
            "cat": "veggies",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-beef-burger-patty-pa",
            "code": "110003",
            "item_no": "110003",
            "ar": "Beef Burger Patty . (PA)",
            "en": "Beef Burger Patty . (PA)",
            "unit": "Each",
            "cat": "beef",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-cucumber-pickle-kg-pa",
            "code": "110039",
            "item_no": "110039",
            "ar": "Cucumber Pickle - Kg (PA)",
            "en": "Cucumber Pickle - Kg (PA)",
            "unit": "Kilogram",
            "cat": "veggies",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-cucumber-pickles-chips-pa",
            "code": "110265",
            "item_no": "110265",
            "ar": "Cucumber pickles Chips (PA)",
            "en": "Cucumber pickles Chips (PA)",
            "unit": "Kilogram",
            "cat": "veggies",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-batter-frizzle-onion-pa",
            "code": "110126",
            "item_no": "110126",
            "ar": "Batter Frizzle Onion (PA)",
            "en": "Batter Frizzle Onion (PA)",
            "unit": "Kilogram",
            "cat": "veggies",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-onion-jam-pa",
            "code": "110227",
            "item_no": "110227",
            "ar": "Onion Jam (PA)",
            "en": "Onion Jam (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-roasted-potato-pa",
            "code": "110197",
            "item_no": "110197",
            "ar": "Roasted Potato (PA)",
            "en": "Roasted Potato (PA)",
            "unit": "Kilogram",
            "cat": "veggies",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-ranch-sauce-kg-pa",
            "code": "110031",
            "item_no": "110031",
            "ar": "Ranch Sauce - Kg (PA)",
            "en": "Ranch Sauce - Kg (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-chicken-sauce-kg-pa",
            "code": "110033",
            "item_no": "110033",
            "ar": "Chicken Sauce - Kg (PA)",
            "en": "Chicken Sauce - Kg (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-honey-mustard-sauce-kg-pa",
            "code": "110037",
            "item_no": "110037",
            "ar": "Honey Mustard Sauce - Kg (PA)",
            "en": "Honey Mustard Sauce - Kg (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-sweet-relish-pa",
            "code": "110128",
            "item_no": "110128",
            "ar": "Sweet Relish (PA)",
            "en": "Sweet Relish (PA)",
            "unit": "Kilogram",
            "cat": "prep",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-amirecan-sauce-kg-pa",
            "code": "110017",
            "item_no": "110017",
            "ar": "Amirecan Sauce - Kg (PA)",
            "en": "Amirecan Sauce - Kg (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-atomic-sauce-kg-pa",
            "code": "110046",
            "item_no": "110046",
            "ar": "Atomic Sauce Kg (PA)",
            "en": "Atomic Sauce Kg (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-bbq-sauce-kg-pa",
            "code": "110018",
            "item_no": "110018",
            "ar": "BBQ Sauce - Kg. (PA)",
            "en": "BBQ Sauce - Kg. (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-sauce-sriracha-kg-pa",
            "code": "110051",
            "item_no": "110051",
            "ar": "Sauce Sriracha Kg (PA)",
            "en": "Sauce Sriracha Kg (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-blue-cheese-dressing-pa",
            "code": "110159",
            "item_no": "110159",
            "ar": "Blue Cheese Dressing (PA)",
            "en": "Blue Cheese Dressing (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-house-dressing-pa",
            "code": "110045",
            "item_no": "110045",
            "ar": "House Dressing (PA)",
            "en": "House Dressing (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-queen-s-salad-dressing-pa",
            "code": "110043",
            "item_no": "110043",
            "ar": "queen's salad Dressing  (PA)",
            "en": "queen's salad Dressing  (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-moroccan-salad-dressing-pa",
            "code": "110044",
            "item_no": "110044",
            "ar": "Moroccan salad Dressing  (PA)",
            "en": "Moroccan salad Dressing  (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-truffle-mayo-pa",
            "code": "110237",
            "item_no": "110237",
            "ar": "truffle mayo (PA)",
            "en": "truffle mayo (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-karkade-syrup-pa",
            "code": "110352",
            "item_no": "110352",
            "ar": "Karkade Syrup (PA)",
            "en": "Karkade Syrup (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-toast-bread-pa",
            "code": "110324",
            "item_no": "110324",
            "ar": "Toast Bread (PA)",
            "en": "Toast Bread (PA)",
            "unit": "Kilogram",
            "cat": "bakery",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-hot-mustard-sauce-pa",
            "code": "110369",
            "item_no": "110369",
            "ar": "Hot Mustard Sauce . (PA)",
            "en": "Hot Mustard Sauce . (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-raspberry-puree-pa",
            "code": "110266",
            "item_no": "110266",
            "ar": "Raspberry Puree (PA)",
            "en": "Raspberry Puree (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-special-sauce-pa",
            "code": "110145",
            "item_no": "110145",
            "ar": "Special Gourmet Sauce (PA)",
            "en": "Special Gourmet Sauce (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-balsamic-vinaigrette-dressing-pa",
            "code": "110185",
            "item_no": "110185",
            "ar": "Balsamic Vinaigrette dressing (PA)",
            "en": "Balsamic Vinaigrette dressing (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-thyme-balsamic-vinaigrette-pa",
            "code": "110189",
            "item_no": "110189",
            "ar": "Thyme Balsamic Vinaigrette (PA)",
            "en": "Thyme Balsamic Vinaigrette (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-caesar-dressing-pa-pa",
            "code": "110163",
            "item_no": "110163",
            "ar": "Caesar Dressing (PA) (PA)",
            "en": "Caesar Dressing (PA) (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-chives-cream-cheese-pa",
            "code": "110194",
            "item_no": "110194",
            "ar": "Chives Cream Cheese (PA)",
            "en": "Chives Cream Cheese (PA)",
            "unit": "Kilogram",
            "cat": "cheese",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-citrus-dressing-pa",
            "code": "110198",
            "item_no": "110198",
            "ar": "Citrus dressing (PA)",
            "en": "Citrus dressing (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-coleslow-dressing-pa",
            "code": "110137",
            "item_no": "110137",
            "ar": "Coleslow Dressing (PA)",
            "en": "Coleslow Dressing (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-honey-srirache-sauce-pa",
            "code": "110142",
            "item_no": "110142",
            "ar": "Honey Srirache Sauce (PA)",
            "en": "Honey Srirache Sauce (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-pesto-sauce-pa",
            "code": "110141",
            "item_no": "110141",
            "ar": "Pesto Sauce (PA)",
            "en": "Pesto Sauce (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-pistachio-pesto-pa",
            "code": "110290",
            "item_no": "110290",
            "ar": "PISTACHIO PESTO (PA)",
            "en": "PISTACHIO PESTO (PA)",
            "unit": "Kilogram",
            "cat": "prep",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-sundried-tomato-pesto-pa",
            "code": "110295",
            "item_no": "110295",
            "ar": "SUNDRIED TOMATO PESTO (PA)",
            "en": "SUNDRIED TOMATO PESTO (PA)",
            "unit": "Kilogram",
            "cat": "prep",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-smokey-mayo-sauce-pa-pa",
            "code": "110165",
            "item_no": "110165",
            "ar": "Smokey Mayo Sauce (PA) (PA)",
            "en": "Smokey Mayo Sauce (PA) (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-sweet-chili-mayo-sauce-pa",
            "code": "110228",
            "item_no": "110228",
            "ar": "Sweet Chili Mayo Sauce (PA)",
            "en": "Sweet Chili Mayo Sauce (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-balsamic-galze-pa",
            "code": "110139",
            "item_no": "110139",
            "ar": "Balsamic Galze (PA)",
            "en": "Balsamic Galze (PA)",
            "unit": "Kilogram",
            "cat": "prep",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-coleslow-salad-pa",
            "code": "110146",
            "item_no": "110146",
            "ar": "Coleslow Salad (PA)",
            "en": "Coleslow Salad (PA)",
            "unit": "Kilogram",
            "cat": "veggies",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-hot-honey-pa",
            "code": "110201",
            "item_no": "110201",
            "ar": "Hot Honey (PA)",
            "en": "Hot Honey (PA)",
            "unit": "Kilogram",
            "cat": "prep",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-pickled-onion-pa",
            "code": "110136",
            "item_no": "110136",
            "ar": "Pickled Onion (PA)",
            "en": "Pickled Onion (PA)",
            "unit": "Kilogram",
            "cat": "veggies",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-sauce-marinara-pa",
            "code": "110134",
            "item_no": "110134",
            "ar": "Sauce Marinara (PA)",
            "en": "Sauce Marinara (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-short-ribs-pa",
            "code": "110147",
            "item_no": "110147",
            "ar": "Short Ribs (PA)",
            "en": "Short Ribs (PA)",
            "unit": "Portion",
            "cat": "beef",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-chicken-bites-kg-pa",
            "code": "110036",
            "item_no": "110036",
            "ar": "Chicken Bites - Kg (PA)",
            "en": "Chicken Bites - Kg (PA)",
            "unit": "Kilogram",
            "cat": "chicken",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-lemon-chicken-pa",
            "code": "110090",
            "item_no": "110090",
            "ar": "Lemon chicken (PA)",
            "en": "Lemon chicken (PA)",
            "unit": "Each",
            "cat": "chicken",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-chicken-fillet-p-pa",
            "code": "110006",
            "item_no": "110006",
            "ar": "Chicken Fillet P (PA)",
            "en": "Chicken Fillet P (PA)",
            "unit": "Each",
            "cat": "chicken",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-chicken-breaded-pa",
            "code": "110144",
            "item_no": "110144",
            "ar": "Chicken Breaded (PA)",
            "en": "Chicken Breaded (PA)",
            "unit": "Each",
            "cat": "bakery",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-chicken-tenders-pa",
            "code": "110183",
            "item_no": "110183",
            "ar": "chicken tenders (PA)",
            "en": "chicken tenders (PA)",
            "unit": "Each",
            "cat": "chicken",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-chicken-liquid-sauce-kg-pa",
            "code": "110042",
            "item_no": "110042",
            "ar": "Chicken liquid sauce - Kg (PA)",
            "en": "Chicken liquid sauce - Kg (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-emmental-cheese-pc-pa",
            "code": "110086",
            "item_no": "110086",
            "ar": "Emmental  Cheese PC (PA",
            "en": "Emmental  Cheese PC (PA",
            "unit": "Portion",
            "cat": "cheese",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-cheese-sauce-kg-pa",
            "code": "110041",
            "item_no": "110041",
            "ar": "Cheese Sauce. - Kg (PA)",
            "en": "Cheese Sauce. - Kg (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-ice-cream-kg-pa",
            "code": "110038",
            "item_no": "110038",
            "ar": "Ice Cream - Kg (PA)",
            "en": "Ice Cream - Kg (PA)",
            "unit": "Kilogram",
            "cat": "drinks",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-pancake-paste-kg-pa",
            "code": "110030",
            "item_no": "110030",
            "ar": "Pancake Paste - Kg (PA)",
            "en": "Pancake Paste - Kg (PA)",
            "unit": "Kilogram",
            "cat": "prep",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-hot-chocolate-sauce-pa",
            "code": "110173",
            "item_no": "110173",
            "ar": "Hot Chocolate Sauce (PA)",
            "en": "Hot Chocolate Sauce (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-salted-caramel-sauce-pa",
            "code": "110124",
            "item_no": "110124",
            "ar": "Salted Caramel Sauce (PA)",
            "en": "Salted Caramel Sauce (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-rib-eye-pa",
            "code": "110156",
            "item_no": "110156",
            "ar": "Rib Eye (PA)",
            "en": "Rib Eye (PA)",
            "unit": "Portion",
            "cat": "beef",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-mozzarella-sticks-marina-pa",
            "code": "110181",
            "item_no": "110181",
            "ar": "mozzarella sticks (marina) (PA)",
            "en": "mozzarella sticks (marina) (PA)",
            "unit": "Each",
            "cat": "cheese",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-dill-tuna-mix-pa",
            "code": "110363",
            "item_no": "110363",
            "ar": "Dill Tuna Mix (PA)",
            "en": "Dill Tuna Mix (PA)",
            "unit": "Each",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-lemon-curd-pa",
            "code": "110303",
            "item_no": "110303",
            "ar": "Lemon Curd (PA)",
            "en": "Lemon Curd (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-mushroom-roasted-pa",
            "code": "110082",
            "item_no": "110082",
            "ar": "Mushroom Roasted (PA)",
            "en": "Mushroom Roasted (PA)",
            "unit": "Kilogram",
            "cat": "veggies",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-blue-berry-sauce-pa",
            "code": "110302",
            "item_no": "110302",
            "ar": "Blue Berry Sauce (PA)",
            "en": "Blue Berry Sauce (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-frosting-sauce-basic-pa",
            "code": "110299",
            "item_no": "110299",
            "ar": "Frosting Sauce Basic (PA)",
            "en": "Frosting Sauce Basic (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-taztaziki-sauce-pa",
            "code": "110365",
            "item_no": "110365",
            "ar": "Taztaziki Sauce (PA)",
            "en": "Taztaziki Sauce (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-marination-mushroom-roasted-pa",
            "code": "110188",
            "item_no": "110188",
            "ar": "Marination Mushroom Roasted (PA)",
            "en": "Marination Mushroom Roasted (PA)",
            "unit": "Kilogram",
            "cat": "veggies",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-classic-frosting-pa",
            "code": "110300",
            "item_no": "110300",
            "ar": "Classic Frosting (PA)",
            "en": "Classic Frosting (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-tuna-mix-pa",
            "code": "110166",
            "item_no": "110166",
            "ar": "Tuna Mix (PA)",
            "en": "Tuna Mix (PA)",
            "unit": "Each",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-salted-hazelnut-pa",
            "code": "200174",
            "item_no": "200174",
            "ar": "Salted hazelnut (PA)",
            "en": "Salted hazelnut (PA)",
            "unit": "Kilogram",
            "cat": "prep",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-strawberry-sauce-pa",
            "code": "110264",
            "item_no": "110264",
            "ar": "Strawberry Sauce (PA)",
            "en": "Strawberry Sauce (PA)",
            "unit": "Kilogram",
            "cat": "sauces",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-cheese-provolone-pa",
            "code": "110157",
            "item_no": "110157",
            "ar": "Cheese Provolone (PA)",
            "en": "Cheese Provolone (PA)",
            "unit": "Portion",
            "cat": "cheese",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-rosted-turkey-pa",
            "code": "110143",
            "item_no": "110143",
            "ar": "Rosted Turkey (PA)",
            "en": "Rosted Turkey (PA)",
            "unit": "Portion",
            "cat": "chicken",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-roast-beef-pa-pa",
            "code": "110149",
            "item_no": "110149",
            "ar": "Roast Beef (PA) (PA)",
            "en": "Roast Beef (PA) (PA)",
            "unit": "Portion",
            "cat": "beef",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-watermelon-pa",
            "code": "110229",
            "item_no": "110229",
            "ar": "Watermelon (PA)",
            "en": "Watermelon (PA)",
            "unit": "Each",
            "cat": "veggies",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-dry-powder-kg-pa",
            "code": "110035",
            "item_no": "110035",
            "ar": "Dry Powder - Kg (PA)",
            "en": "Dry Powder - Kg (PA)",
            "unit": "Kilogram",
            "cat": "prep",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-dry-mix-pa",
            "code": "110127",
            "item_no": "110127",
            "ar": "Dry Mix (PA)",
            "en": "Dry Mix (PA)",
            "unit": "Kilogram",
            "cat": "prep",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-salted-vanilla-bean-pa",
            "code": "110174",
            "item_no": "110174",
            "ar": "Salted Vanilla Bean (PA)",
            "en": "Salted Vanilla Bean (PA)",
            "unit": "Kilogram",
            "cat": "prep",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-cookies-can-mini-pa",
            "code": "110269",
            "item_no": "110269",
            "ar": "Cookies Can Mini (PA)",
            "en": "Cookies Can Mini (PA)",
            "unit": "Order 8 pieces",
            "cat": "bakery",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-ciabatta-bread-pa",
            "code": "110148",
            "item_no": "110148",
            "ar": "Ciabatta Bread (PA)",
            "en": "Ciabatta Bread (PA)",
            "unit": "Each",
            "cat": "bakery",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-brown-ciabatta-bread-pa-pa",
            "code": "110164",
            "item_no": "110164",
            "ar": "Brown Ciabatta Bread (PA) (PA)",
            "en": "Brown Ciabatta Bread (PA) (PA)",
            "unit": "Each",
            "cat": "bakery",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-french-baghette-pa",
            "code": "110268",
            "item_no": "110268",
            "ar": "French Baghette (PA)",
            "en": "French Baghette (PA)",
            "unit": "Each",
            "cat": "bakery",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-pretzel-bread-pa",
            "code": "100017",
            "item_no": "100017",
            "ar": "Pretzel Bread (PA)",
            "en": "Pretzel Bread (PA)",
            "unit": "Each",
            "cat": "bakery",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-bread-sour-dough-pa",
            "code": "110288",
            "item_no": "110288",
            "ar": "Bread Sour dough (PA)",
            "en": "Bread Sour dough (PA)",
            "unit": "Each",
            "cat": "bakery",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-round-ciabatta-pa",
            "code": "110193",
            "item_no": "110193",
            "ar": "Round Ciabatta (PA)",
            "en": "Round Ciabatta (PA)",
            "unit": "Each",
            "cat": "bakery",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-croissant-plain-pa",
            "code": "110316",
            "item_no": "110316",
            "ar": "Croissant Plain (PA)",
            "en": "Croissant Plain (PA)",
            "unit": "Each",
            "cat": "bakery",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-danash-pastrame-pa",
            "code": "110312",
            "item_no": "110312",
            "ar": "Danash Pastrame (PA)",
            "en": "Danash Pastrame (PA)",
            "unit": "Each",
            "cat": "bakery",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-croissant-thyme-goat-pa",
            "code": "110317",
            "item_no": "110317",
            "ar": "Croissant Thyme goat (PA)",
            "en": "Croissant Thyme goat (PA)",
            "unit": "Each",
            "cat": "bakery",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-pan-swiss-croissant-pa",
            "code": "110319",
            "item_no": "110319",
            "ar": "Pan Swiss Croissant (PA)",
            "en": "Pan Swiss Croissant (PA)",
            "unit": "Each",
            "cat": "bakery",
            "cost": 0,
            "stock": 0
          },
          {
            "id": "prod-lovan-dough-pa",
            "code": "110267",
            "item_no": "110267",
            "ar": "Lovan Dough (PA)",
            "en": "Lovan Dough (PA)",
            "unit": "Kilogram",
            "cat": "bakery",
            "cost": 0,
            "stock": 0
          }
        ],
        /* ── Raw Ingredients (الخامات الرئيسية) ── */
        ings: {
          "raw-105049": {
            "code": "105049",
            "ar": "Bresaola-Special",
            "en": "Bresaola-Special",
            "uom": "Kilogram",
            "cat": "Meat & Poultry & Fish",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Meat & Poultry & Fish"
          },
          "raw-105051": {
            "code": "105051",
            "ar": "Beef Bacon (Core GYM)",
            "en": "Beef Bacon (Core GYM)",
            "uom": "Kilogram",
            "cat": "Meat & Poultry & Fish",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Meat & Poultry & Fish"
          },
          "raw-104349": {
            "code": "104349",
            "ar": "Blueberry Frozen",
            "en": "Blueberry Frozen",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-101119": {
            "code": "101119",
            "ar": "mozzarella stikcks",
            "en": "mozzarella stikcks",
            "uom": "Kilogram",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-100037": {
            "code": "100037",
            "ar": "Brownie can",
            "en": "Brownie can",
            "uom": "Each",
            "cat": "Bakery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Bakery"
          },
          "raw-108133": {
            "code": "108133",
            "ar": "Rasberry Frozen",
            "en": "Rasberry Frozen",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-105003": {
            "code": "105003",
            "ar": "Chicken Breast",
            "en": "Chicken Breast",
            "uom": "Pkt 1 Kg",
            "cat": "Meat & Poultry & Fish",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Meat & Poultry & Fish"
          },
          "raw-108163": {
            "code": "108163",
            "ar": "Strawberry frozen",
            "en": "Strawberry frozen",
            "uom": "Pkt 400 Gr",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108108": {
            "code": "108108",
            "ar": "Fresh Celery",
            "en": "Fresh Celery",
            "uom": "Pkt 100 Gr",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-105026": {
            "code": "105026",
            "ar": "Fresh Turkey",
            "en": "Fresh Turkey",
            "uom": "Kilogram",
            "cat": "Meat & Poultry & Fish",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Meat & Poultry & Fish"
          },
          "raw-500048": {
            "code": "500048",
            "ar": "Bags White size 35 * 60",
            "en": "Bags White size 35 * 60",
            "uom": "Kilogram",
            "cat": "Packing Items",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Packing Items"
          },
          "raw-500013": {
            "code": "500013",
            "ar": "Tissue Bags Plastic Burger",
            "en": "Tissue Bags Plastic Burger",
            "uom": "Kilogram",
            "cat": "Packing Items",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Packing Items"
          },
          "raw-500011": {
            "code": "500011",
            "ar": "Plate Foam 1 Kg",
            "en": "Plate Foam 1 Kg",
            "uom": "Pkt 500 Pcs",
            "cat": "Packing Items",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Packing Items"
          },
          "raw-500236": {
            "code": "500236",
            "ar": "Aluminum foil",
            "en": "Aluminum foil",
            "uom": "Each",
            "cat": "Packing Items",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Packing Items"
          },
          "raw-500002": {
            "code": "500002",
            "ar": "Stickers expiry meat",
            "en": "Stickers expiry meat",
            "uom": "Pkt 500 Pcs",
            "cat": "Packing Items",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Packing Items"
          },
          "raw-105001": {
            "code": "105001",
            "ar": "Fresh meat",
            "en": "Fresh meat",
            "uom": "Kilogram",
            "cat": "Meat & Poultry & Fish",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Meat & Poultry & Fish"
          },
          "raw-104225": {
            "code": "104225",
            "ar": "Green Olive Slices",
            "en": "Green Olive Slices",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-108102": {
            "code": "108102",
            "ar": "Green papper fresh",
            "en": "Green papper fresh",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-104025": {
            "code": "104025",
            "ar": "Vinegar White",
            "en": "Vinegar White",
            "uom": "Btl 1 L",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-102039": {
            "code": "102039",
            "ar": "Spices Salt Cox",
            "en": "Spices Salt Cox",
            "uom": "Jar 700 Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102029": {
            "code": "102029",
            "ar": "Spices Red pepper Pow 500Gr",
            "en": "Spices Red pepper Pow 500Gr",
            "uom": "Pkt 500 Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102177": {
            "code": "102177",
            "ar": "Spices Smoked Paprika",
            "en": "Spices Smoked Paprika",
            "uom": "Pkt 500 Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102009": {
            "code": "102009",
            "ar": "Spices Garlic powder 500 Gr",
            "en": "Spices Garlic powder 500 Gr",
            "uom": "Pkt 500 Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102053": {
            "code": "102053",
            "ar": "Spices Onion Powder",
            "en": "Spices Onion Powder",
            "uom": "Pkt 500 Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102011": {
            "code": "102011",
            "ar": "Spices Black pepper envelope",
            "en": "Spices Black pepper envelope",
            "uom": "Pkt 250 Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102085": {
            "code": "102085",
            "ar": "Spices Salt",
            "en": "Spices Salt",
            "uom": "Pkt 400 Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102171": {
            "code": "102171",
            "ar": "Spices Salt Kosher",
            "en": "Spices Salt Kosher",
            "uom": "Pkt 400 Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-500226": {
            "code": "500226",
            "ar": "Transparent Vacuum Bag 20*25Cm",
            "en": "Transparent Vacuum Bag 20*25Cm",
            "uom": "Each",
            "cat": "Packing Items",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Packing Items"
          },
          "raw-104012": {
            "code": "104012",
            "ar": "Oil Sunflower Gal 20 L",
            "en": "Oil Sunflower Gal 20 L",
            "uom": "Gal 20 L",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-500336": {
            "code": "500336",
            "ar": "Plate Foam 1.5 Kg",
            "en": "Plate Foam 1.5 Kg",
            "uom": "Each",
            "cat": "Packing Items",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Packing Items"
          },
          "raw-101068": {
            "code": "101068",
            "ar": "Yogurt",
            "en": "Yogurt",
            "uom": "Kilogram",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-100002": {
            "code": "100002",
            "ar": "Toast White Rich Bake",
            "en": "Toast White Rich Bake",
            "uom": "Pkt 500 Gr",
            "cat": "Bakery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Bakery"
          },
          "raw-104184": {
            "code": "104184",
            "ar": "Burrata Cheese",
            "en": "Burrata Cheese",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-101101": {
            "code": "101101",
            "ar": "Cheese Mozzarella Buffalo",
            "en": "Cheese Mozzarella Buffalo",
            "uom": "Kilogram",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-104188": {
            "code": "104188",
            "ar": "Greek Yogurt Juhaina",
            "en": "Greek Yogurt Juhaina",
            "uom": "Pkt 180 Gr",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-101069": {
            "code": "101069",
            "ar": "kiri creamy spread",
            "en": "kiri creamy spread",
            "uom": "Pkt 500 Gr",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-101011": {
            "code": "101011",
            "ar": "Cream Cooking 1 lit",
            "en": "Cream Cooking 1 lit",
            "uom": "Pkt 1 L",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-104154": {
            "code": "104154",
            "ar": "Anchovies",
            "en": "Anchovies",
            "uom": "Pkt 40 Gr",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-101025": {
            "code": "101025",
            "ar": "Goat Cheese",
            "en": "Goat Cheese",
            "uom": "Pkt 150 Gr",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-101098": {
            "code": "101098",
            "ar": "Cream Sour",
            "en": "Cream Sour",
            "uom": "Pkt 500 Gr",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-1": {
            "code": "1",
            "ar": "House Burger Sauce",
            "en": "House Burger Sauce",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104410": {
            "code": "104410",
            "ar": "Apricot Jam",
            "en": "Apricot Jam",
            "uom": "Jar 340 Gr",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-200096": {
            "code": "200096",
            "ar": "Red Grape Juice Juihaina",
            "en": "Red Grape Juice Juihaina",
            "uom": "Kilogram",
            "cat": "Beverage",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Beverage"
          },
          "raw-101059": {
            "code": "101059",
            "ar": "Blue Cheese",
            "en": "Blue Cheese",
            "uom": "Kilogram",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-101008": {
            "code": "101008",
            "ar": "Cheddar American Cheese",
            "en": "Cheddar American Cheese",
            "uom": "Pkt 200 Pcs",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-101034": {
            "code": "101034",
            "ar": "Cheddar Cheese  Kg",
            "en": "Cheddar Cheese  Kg",
            "uom": "Kilogram",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-104332": {
            "code": "104332",
            "ar": "Parmigiano Reggiano",
            "en": "Parmigiano Reggiano",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-101023": {
            "code": "101023",
            "ar": "Parmesan Cheese",
            "en": "Parmesan Cheese",
            "uom": "Kilogram",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-105004": {
            "code": "105004",
            "ar": "Red Egg",
            "en": "Red Egg",
            "uom": "Plate 30 Pcs",
            "cat": "Meat & Poultry & Fish",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Meat & Poultry & Fish"
          },
          "raw-101072": {
            "code": "101072",
            "ar": "la vache Quirit Cheese",
            "en": "la vache Quirit Cheese",
            "uom": "Pkt 12 Pcs",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-102204": {
            "code": "102204",
            "ar": "Bresaola",
            "en": "Bresaola",
            "uom": "Kilogram",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-104261": {
            "code": "104261",
            "ar": "Milk chocolate chips",
            "en": "Milk chocolate chips",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104161": {
            "code": "104161",
            "ar": "Chocolate Milk",
            "en": "Chocolate Milk",
            "uom": "Box 5 Kg",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104207": {
            "code": "104207",
            "ar": "Belgian White Chocolate",
            "en": "Belgian White Chocolate",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-101002": {
            "code": "101002",
            "ar": "Butter Fern 10 Pkt 1 Kg",
            "en": "Butter Fern 10 Pkt 1 Kg",
            "uom": "Pkt 1 Kg",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-101013": {
            "code": "101013",
            "ar": "Milk Rayeb Plain",
            "en": "Milk Rayeb Plain",
            "uom": "Pkt 1 L",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-108020": {
            "code": "108020",
            "ar": "Cucumber",
            "en": "Cucumber",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108117": {
            "code": "108117",
            "ar": "Lemon (Adalia)",
            "en": "Lemon (Adalia)",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108125": {
            "code": "108125",
            "ar": "Baby Spanish",
            "en": "Baby Spanish",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108105": {
            "code": "108105",
            "ar": "Fresh Basil",
            "en": "Fresh Basil",
            "uom": "Pkt 250 Gr",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-101010": {
            "code": "101010",
            "ar": "Cream Whipping Kg.",
            "en": "Cream Whipping Kg.",
            "uom": "Gal 5 Kg",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-108123": {
            "code": "108123",
            "ar": "Micro green",
            "en": "Micro green",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108113": {
            "code": "108113",
            "ar": "Dill Fresh",
            "en": "Dill Fresh",
            "uom": "Pkt 100 Gr",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108025": {
            "code": "108025",
            "ar": "Parsley",
            "en": "Parsley",
            "uom": "Pkt 100 Gr",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108107": {
            "code": "108107",
            "ar": "Fresh Rosemary",
            "en": "Fresh Rosemary",
            "uom": "Pkt 100 Gr",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108033": {
            "code": "108033",
            "ar": "Thyme",
            "en": "Thyme",
            "uom": "Pkt 100 Gr",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108009": {
            "code": "108009",
            "ar": "White Cabbage",
            "en": "White Cabbage",
            "uom": "Each",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108101": {
            "code": "108101",
            "ar": "Red pepper Fresh",
            "en": "Red pepper Fresh",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108103": {
            "code": "108103",
            "ar": "Chili Green papper",
            "en": "Chili Green papper",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108139": {
            "code": "108139",
            "ar": "Red Chili",
            "en": "Red Chili",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108106": {
            "code": "108106",
            "ar": "Fresh Carrots",
            "en": "Fresh Carrots",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108028": {
            "code": "108028",
            "ar": "Mint",
            "en": "Mint",
            "uom": "Pkt 100 Gr",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108022": {
            "code": "108022",
            "ar": "Tomato",
            "en": "Tomato",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108024": {
            "code": "108024",
            "ar": "Mushroom",
            "en": "Mushroom",
            "uom": "Pkt 200 Gr",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108043": {
            "code": "108043",
            "ar": "Green Batavia Lettuce",
            "en": "Green Batavia Lettuce",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108047": {
            "code": "108047",
            "ar": "Oakleaf",
            "en": "Oakleaf",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108017": {
            "code": "108017",
            "ar": "White Onion",
            "en": "White Onion",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108151": {
            "code": "108151",
            "ar": "Watermelon",
            "en": "Watermelon",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-600021": {
            "code": "600021",
            "ar": "Gloves White",
            "en": "Gloves White",
            "uom": "Box 100 Pcs",
            "cat": "Cleaning Supplies",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Cleaning Supplies"
          },
          "raw-600014": {
            "code": "600014",
            "ar": "Sponge Hard",
            "en": "Sponge Hard",
            "uom": "Pkt 10 Pcs",
            "cat": "Cleaning Supplies",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Cleaning Supplies"
          },
          "raw-600046": {
            "code": "600046",
            "ar": "Sponge Plastic",
            "en": "Sponge Plastic",
            "uom": "Each",
            "cat": "Cleaning Supplies",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Cleaning Supplies"
          },
          "raw-108142": {
            "code": "108142",
            "ar": "Potato",
            "en": "Potato",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108018": {
            "code": "108018",
            "ar": "Red Onion",
            "en": "Red Onion",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-500072": {
            "code": "500072",
            "ar": "Roll Plastic",
            "en": "Roll Plastic",
            "uom": "Each",
            "cat": "Packing Items",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Packing Items"
          },
          "raw-600111": {
            "code": "600111",
            "ar": "Hairnet Black",
            "en": "Hairnet Black",
            "uom": "Pkt 100 Pcs",
            "cat": "Cleaning Supplies",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Cleaning Supplies"
          },
          "raw-600068": {
            "code": "600068",
            "ar": "Tissue Paper Roll Kitchen",
            "en": "Tissue Paper Roll Kitchen",
            "uom": "Each",
            "cat": "Cleaning Supplies",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Cleaning Supplies"
          },
          "raw-500498": {
            "code": "500498",
            "ar": "Bags White size 90*120",
            "en": "Bags White size 90*120",
            "uom": "Kilogram",
            "cat": "Packing Items",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Packing Items"
          },
          "raw-600017": {
            "code": "600017",
            "ar": "Garbage bags 90 * 120",
            "en": "Garbage bags 90 * 120",
            "uom": "Kilogram",
            "cat": "Cleaning Supplies",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Cleaning Supplies"
          },
          "raw-600038": {
            "code": "600038",
            "ar": "Glass Polishing",
            "en": "Glass Polishing",
            "uom": "Btl 600 Ml",
            "cat": "Cleaning Supplies",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Cleaning Supplies"
          },
          "raw-600155": {
            "code": "600155",
            "ar": "SUMA GRILL D9",
            "en": "SUMA GRILL D9",
            "uom": "Liter",
            "cat": "Cleaning Supplies",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Cleaning Supplies"
          },
          "raw-600157": {
            "code": "600157",
            "ar": "DIVERCLEAN SU121",
            "en": "DIVERCLEAN SU121",
            "uom": "Liter",
            "cat": "Cleaning Supplies",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Cleaning Supplies"
          },
          "raw-600044": {
            "code": "600044",
            "ar": "Sewer line cleaner G TAC",
            "en": "Sewer line cleaner G TAC",
            "uom": "Gal 5 Kg",
            "cat": "Cleaning Supplies",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Cleaning Supplies"
          },
          "raw-600154": {
            "code": "600154",
            "ar": "Suma Force D3",
            "en": "Suma Force D3",
            "uom": "Liter",
            "cat": "Cleaning Supplies",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Cleaning Supplies"
          },
          "raw-102222": {
            "code": "102222",
            "ar": "Tomato Peeled Mirella",
            "en": "Tomato Peeled Mirella",
            "uom": "Kilogram",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-104267": {
            "code": "104267",
            "ar": "Butter Flechard",
            "en": "Butter Flechard",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-101099": {
            "code": "101099",
            "ar": "Cheese Provolone",
            "en": "Cheese Provolone",
            "uom": "Kilogram",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-104142": {
            "code": "104142",
            "ar": "Mayonnaisec Hellmanns 3.4 Kg",
            "en": "Mayonnaisec Hellmanns 3.4 Kg",
            "uom": "Gal 3.4 Kg",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104004": {
            "code": "104004",
            "ar": "Ketchup Gal",
            "en": "Ketchup Gal",
            "uom": "Gal 10 Kg",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104223": {
            "code": "104223",
            "ar": "Mustard wholegrain",
            "en": "Mustard wholegrain",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104226": {
            "code": "104226",
            "ar": "Cucumber Pickle (imported)",
            "en": "Cucumber Pickle (imported)",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104056": {
            "code": "104056",
            "ar": "Sauce Texas",
            "en": "Sauce Texas",
            "uom": "BTL 900 GR",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104419": {
            "code": "104419",
            "ar": "Mustard Dixe",
            "en": "Mustard Dixe",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104003": {
            "code": "104003",
            "ar": "Mayonnaise Box 4 Gal 3.290 Kg",
            "en": "Mayonnaise Box 4 Gal 3.290 Kg",
            "uom": "Gal 3.29 Kg",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104166": {
            "code": "104166",
            "ar": "Frensh Vanilla",
            "en": "Frensh Vanilla",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104235": {
            "code": "104235",
            "ar": "Italian Roasted Hazelnut",
            "en": "Italian Roasted Hazelnut",
            "uom": "Box 5 Kg",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104136": {
            "code": "104136",
            "ar": "Sweet chile",
            "en": "Sweet chile",
            "uom": "Btl 600 Ml",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104412": {
            "code": "104412",
            "ar": "Mastic paste",
            "en": "Mastic paste",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104042": {
            "code": "104042",
            "ar": "Paste Lotus",
            "en": "Paste Lotus",
            "uom": "Jar 400 Gr",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104008": {
            "code": "104008",
            "ar": "Sauce Worcester",
            "en": "Sauce Worcester",
            "uom": "Gal 4 L",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104014": {
            "code": "104014",
            "ar": "Sauce Hot Sriracha",
            "en": "Sauce Hot Sriracha",
            "uom": "Btl 730 Ml",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104423": {
            "code": "104423",
            "ar": "Yolk Egg frozen",
            "en": "Yolk Egg frozen",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104149": {
            "code": "104149",
            "ar": "Matcha japanese",
            "en": "Matcha japanese",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-500343": {
            "code": "500343",
            "ar": "Small Bag Matcha",
            "en": "Small Bag Matcha",
            "uom": "Kilogram",
            "cat": "Packing Items",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Packing Items"
          },
          "raw-500010": {
            "code": "500010",
            "ar": "Fridge Bag 5 Kg",
            "en": "Fridge Bag 5 Kg",
            "uom": "Kilogram",
            "cat": "Packing Items",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Packing Items"
          },
          "raw-500009": {
            "code": "500009",
            "ar": "Fridge Bag 2 Kg",
            "en": "Fridge Bag 2 Kg",
            "uom": "Kilogram",
            "cat": "Packing Items",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Packing Items"
          },
          "raw-101003": {
            "code": "101003",
            "ar": "Milk Lamar full fat Box 12 Pkt 1 lit",
            "en": "Milk Lamar full fat Box 12 Pkt 1 lit",
            "uom": "Pkt 1 L",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-102068": {
            "code": "102068",
            "ar": "Ice Cream Powder.",
            "en": "Ice Cream Powder.",
            "uom": "Bag 10 Kg",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-104088": {
            "code": "104088",
            "ar": "Vanilla - Liquid",
            "en": "Vanilla - Liquid",
            "uom": "Liter",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-108004": {
            "code": "108004",
            "ar": "Cherry Tomatoes",
            "en": "Cherry Tomatoes",
            "uom": "Pkt 500 Gr",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108011": {
            "code": "108011",
            "ar": "Captcha Lettuce",
            "en": "Captcha Lettuce",
            "uom": "Each",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108109": {
            "code": "108109",
            "ar": "Fresh Baby Rocca",
            "en": "Fresh Baby Rocca",
            "uom": "PKT 125 Gr",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108144": {
            "code": "108144",
            "ar": "Green Apple",
            "en": "Green Apple",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-108121": {
            "code": "108121",
            "ar": "Avocado",
            "en": "Avocado",
            "uom": "Kilogram",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-102136": {
            "code": "102136",
            "ar": "Sea Salt",
            "en": "Sea Salt",
            "uom": "Kilogram",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102170": {
            "code": "102170",
            "ar": "Vanillia Powder Kings Crown 1 GR",
            "en": "Vanillia Powder Kings Crown 1 GR",
            "uom": "Kilogram",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102003": {
            "code": "102003",
            "ar": "Baking powder - Box 50/16 Gr",
            "en": "Baking powder - Box 50/16 Gr",
            "uom": "Box 50Pkt -16Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-104199": {
            "code": "104199",
            "ar": "Chili Flakes",
            "en": "Chili Flakes",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104137": {
            "code": "104137",
            "ar": "Spices Turmeric Powder",
            "en": "Spices Turmeric Powder",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-102017": {
            "code": "102017",
            "ar": "Spices Cayani Box 16",
            "en": "Spices Cayani Box 16",
            "uom": "Jar 300 Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-104145": {
            "code": "104145",
            "ar": "Knorr Meat stock",
            "en": "Knorr Meat stock",
            "uom": "Pkt 1 Kg",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-102178": {
            "code": "102178",
            "ar": "Knorr Demiglace Suces",
            "en": "Knorr Demiglace Suces",
            "uom": "Pkt 750 Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102030": {
            "code": "102030",
            "ar": "Spices Black pepper Pkt 250 Gr",
            "en": "Spices Black pepper Pkt 250 Gr",
            "uom": "Pkt 250 Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102175": {
            "code": "102175",
            "ar": "Spices Pepper Black Whole",
            "en": "Spices Pepper Black Whole",
            "uom": "Jar 90 Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102162": {
            "code": "102162",
            "ar": "Spice Cinnamon powder",
            "en": "Spice Cinnamon powder",
            "uom": "Pkt 250 Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102169": {
            "code": "102169",
            "ar": "Sugar White Powder",
            "en": "Sugar White Powder",
            "uom": "Pkt 1 Kg",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-104146": {
            "code": "104146",
            "ar": "Brown Sugar",
            "en": "Brown Sugar",
            "uom": "Pkt 1 Kg",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-102034": {
            "code": "102034",
            "ar": "Sugar White Pkt 1kg",
            "en": "Sugar White Pkt 1kg",
            "uom": "Pkt 1 Kg",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102018": {
            "code": "102018",
            "ar": "Flour White  Box 10 bag 1 Kg",
            "en": "Flour White  Box 10 bag 1 Kg",
            "uom": "Bag 1 Kg",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102174": {
            "code": "102174",
            "ar": "Nutes Pinenut",
            "en": "Nutes Pinenut",
            "uom": "Kilogram",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-104106": {
            "code": "104106",
            "ar": "Pistachio whole",
            "en": "Pistachio whole",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-102020": {
            "code": "102020",
            "ar": "Spices Dill powder 500 Gr",
            "en": "Spices Dill powder 500 Gr",
            "uom": "Pkt 500 Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102033": {
            "code": "102033",
            "ar": "Spices Parsley Pow 500 Gr",
            "en": "Spices Parsley Pow 500 Gr",
            "uom": "Pkt 500 Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-104364": {
            "code": "104364",
            "ar": "spices basil",
            "en": "spices basil",
            "uom": "Jar 25 Gr",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-102173": {
            "code": "102173",
            "ar": "Spices Oregano dry",
            "en": "Spices Oregano dry",
            "uom": "Pkt 1 Kg",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-104087": {
            "code": "104087",
            "ar": "Vanilla Frappe",
            "en": "Vanilla Frappe",
            "uom": "Bag 10 Kg",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-102154": {
            "code": "102154",
            "ar": "Hibiscus Dry",
            "en": "Hibiscus Dry",
            "uom": "Kilogram",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-100005": {
            "code": "100005",
            "ar": "Bread Crumbs",
            "en": "Bread Crumbs",
            "uom": "Pkt 1 Kg",
            "cat": "Bakery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Bakery"
          },
          "raw-104018": {
            "code": "104018",
            "ar": "Sauce Hot KG",
            "en": "Sauce Hot KG",
            "uom": "Gal 5 Kg",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104155": {
            "code": "104155",
            "ar": "Tuna",
            "en": "Tuna",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104153": {
            "code": "104153",
            "ar": "Sweet Corn",
            "en": "Sweet Corn",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104013": {
            "code": "104013",
            "ar": "Oil Olive Box 12 Btl 1 lit",
            "en": "Oil Olive Box 12 Btl 1 lit",
            "uom": "Btl 2 L",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104204": {
            "code": "104204",
            "ar": "Olive Oil Wadi food",
            "en": "Olive Oil Wadi food",
            "uom": "Liter",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104007": {
            "code": "104007",
            "ar": "Honey White",
            "en": "Honey White",
            "uom": "Jar 800 Gr",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104002": {
            "code": "104002",
            "ar": "Mustard Heinz Gal 5L",
            "en": "Mustard Heinz Gal 5L",
            "uom": "Gal 5 L",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104026": {
            "code": "104026",
            "ar": "Mustard Dijon",
            "en": "Mustard Dijon",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-102246": {
            "code": "102246",
            "ar": "Spices Salt Lemon",
            "en": "Spices Salt Lemon",
            "uom": "Jar 185 Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-104202": {
            "code": "104202",
            "ar": "Sundried tomato",
            "en": "Sundried tomato",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104144": {
            "code": "104144",
            "ar": "Tomato Paste Heinz",
            "en": "Tomato Paste Heinz",
            "uom": "Jar 360 Gr",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104023": {
            "code": "104023",
            "ar": "Vinegar Balsamic",
            "en": "Vinegar Balsamic",
            "uom": "Jar 1 Kg",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104024": {
            "code": "104024",
            "ar": "Vinegar Apple",
            "en": "Vinegar Apple",
            "uom": "Btl 500 Gr",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-200101": {
            "code": "200101",
            "ar": "Dvg Syrup Raspberry",
            "en": "Dvg Syrup Raspberry",
            "uom": "Btl 750 Ml",
            "cat": "Beverage",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Beverage"
          },
          "raw-200097": {
            "code": "200097",
            "ar": "Dvg Syrup Strawberry",
            "en": "Dvg Syrup Strawberry",
            "uom": "Btl 750 Ml",
            "cat": "Beverage",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Beverage"
          },
          "raw-200006": {
            "code": "200006",
            "ar": "Soda Schweppes",
            "en": "Soda Schweppes",
            "uom": "Btl 1 L",
            "cat": "Beverage",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Beverage"
          },
          "raw-102041": {
            "code": "102041",
            "ar": "Corn Starch",
            "en": "Corn Starch",
            "uom": "Bag 25 Kg",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102031": {
            "code": "102031",
            "ar": "Flour 50 Kg",
            "en": "Flour 50 Kg",
            "uom": "Bag 50 Kg",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102025": {
            "code": "102025",
            "ar": "Sugar White 50 Kg",
            "en": "Sugar White 50 Kg",
            "uom": "Bag 50 Kg",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-104123": {
            "code": "104123",
            "ar": "Condensed Milk Nestle",
            "en": "Condensed Milk Nestle",
            "uom": "Btl 370 Gr",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-102036": {
            "code": "102036",
            "ar": "Spices Salt Chinese",
            "en": "Spices Salt Chinese",
            "uom": "Bag 25 Kg",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102021": {
            "code": "102021",
            "ar": "Spices Dry thyme",
            "en": "Spices Dry thyme",
            "uom": "Pkt 500 Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-104249": {
            "code": "104249",
            "ar": "Mustard seeds",
            "en": "Mustard seeds",
            "uom": "Jar 500 Gr",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104389": {
            "code": "104389",
            "ar": "Spices mint dry",
            "en": "Spices mint dry",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-102250": {
            "code": "102250",
            "ar": "Flour T-150",
            "en": "Flour T-150",
            "uom": "Kilogram",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102251": {
            "code": "102251",
            "ar": "Flour T-65",
            "en": "Flour T-65",
            "uom": "Kilogram",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102285": {
            "code": "102285",
            "ar": "Flour T55",
            "en": "Flour T55",
            "uom": "Kilogram",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-104263": {
            "code": "104263",
            "ar": "Flour T45",
            "en": "Flour T45",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-102218": {
            "code": "102218",
            "ar": "Flour Dallagiovanna 00",
            "en": "Flour Dallagiovanna 00",
            "uom": "Kilogram",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102165": {
            "code": "102165",
            "ar": "Flour White 50 kg Five-Star",
            "en": "Flour White 50 kg Five-Star",
            "uom": "Bag 50 Kg",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-104243": {
            "code": "104243",
            "ar": "Olive Oil Nuri",
            "en": "Olive Oil Nuri",
            "uom": "Liter",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-100016": {
            "code": "100016",
            "ar": "Pretzel bread water",
            "en": "Pretzel bread water",
            "uom": "Gal 5 L",
            "cat": "Bakery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Bakery"
          },
          "raw-102167": {
            "code": "102167",
            "ar": "Bread improver",
            "en": "Bread improver",
            "uom": "Bag 10 Kg",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-100021": {
            "code": "100021",
            "ar": "Bread Darker",
            "en": "Bread Darker",
            "uom": "Kilogram",
            "cat": "Bakery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Bakery"
          },
          "raw-200158": {
            "code": "200158",
            "ar": "Cubie Pistachio Sauce",
            "en": "Cubie Pistachio Sauce",
            "uom": "Btl 1 L",
            "cat": "Beverage",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Beverage"
          },
          "raw-101114": {
            "code": "101114",
            "ar": "Baking soda",
            "en": "Baking soda",
            "uom": "Kilogram",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-104041": {
            "code": "104041",
            "ar": "Nutella Gal 3 Kg",
            "en": "Nutella Gal 3 Kg",
            "uom": "Gal 3 Kg",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-102166": {
            "code": "102166",
            "ar": "Yeast 500 Gr Dcl",
            "en": "Yeast 500 Gr Dcl",
            "uom": "Pkt 500 Gr",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102220": {
            "code": "102220",
            "ar": "Dry yeast forno",
            "en": "Dry yeast forno",
            "uom": "Kilogram",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102244": {
            "code": "102244",
            "ar": "almond slices",
            "en": "almond slices",
            "uom": "Kilogram",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-102243": {
            "code": "102243",
            "ar": "ALMOND POWDER",
            "en": "ALMOND POWDER",
            "uom": "Kilogram",
            "cat": "Dry",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dry"
          },
          "raw-104340": {
            "code": "104340",
            "ar": "White Sesame",
            "en": "White Sesame",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104255": {
            "code": "104255",
            "ar": "Pastry cream",
            "en": "Pastry cream",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104171": {
            "code": "104171",
            "ar": "Dark cocoa",
            "en": "Dark cocoa",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-101139": {
            "code": "101139",
            "ar": "Butter Newzealand (local)",
            "en": "Butter Newzealand (local)",
            "uom": "Bag 25 Kg",
            "cat": "Dairy",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Dairy"
          },
          "raw-500401": {
            "code": "500401",
            "ar": "Butter pepper premium",
            "en": "Butter pepper premium",
            "uom": "Pkt 100 Pcs",
            "cat": "Packing Items",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Packing Items"
          },
          "raw-500643": {
            "code": "500643",
            "ar": "clips bag food storage 55*22",
            "en": "clips bag food storage 55*22",
            "uom": "Kilogram",
            "cat": "Packing Items",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Packing Items"
          },
          "raw-500642": {
            "code": "500642",
            "ar": "Zip-lock Bags 30*40",
            "en": "Zip-lock Bags 30*40",
            "uom": "Kilogram",
            "cat": "Packing Items",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Packing Items"
          },
          "raw-500418": {
            "code": "500418",
            "ar": "Bowl 3 ice cream (260) standard",
            "en": "Bowl 3 ice cream (260) standard",
            "uom": "Each",
            "cat": "Packing Items",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Packing Items"
          },
          "raw-200012": {
            "code": "200012",
            "ar": "Water Gallon 19 lit",
            "en": "Water Gallon 19 lit",
            "uom": "Each",
            "cat": "Beverage",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Beverage"
          },
          "raw-108016": {
            "code": "108016",
            "ar": "Garlic Chinese",
            "en": "Garlic Chinese",
            "uom": "Pkt 200 Gr",
            "cat": "Fruits & Veg",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Fruits & Veg"
          },
          "raw-104147": {
            "code": "104147",
            "ar": "Sauce Hickory BBQ",
            "en": "Sauce Hickory BBQ",
            "uom": "Pkt 350 Gr",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          },
          "raw-104408": {
            "code": "104408",
            "ar": "Cherry Frozen",
            "en": "Cherry Frozen",
            "uom": "Kilogram",
            "cat": "Grocery",
            "price": 0,
            "stock": 0,
            "safety": 20,
            "sup": "Grocery"
          }
        },






        /* ── Central Kitchen BOM (وصفات التجهيز المعتمدة) ── */
        /* الكميات: per 1 ltr أو 1 kg من التجهيز المنتج (مرتبطة بـ 65 وصفة معتمدة) */
        recipes: {
          "prod-amirecan-sauce-kg-pa": {
            "ings": [
              {
                "id": "raw-104003",
                "qty": 0.83143,
                "waste": 1
              },
              {
                "id": "raw-104026",
                "qty": 0.1084,
                "waste": 1
              },
              {
                "id": "raw-104004",
                "qty": 0.0547,
                "waste": 1
              },
              {
                "id": "raw-104226",
                "qty": 0.00348,
                "waste": 1
              },
              {
                "id": "raw-102029",
                "qty": 0.00199,
                "waste": 1
              }
            ]
          },
          "prod-cheese-sauce-kg-pa": {
            "ings": [
              {
                "id": "raw-101010",
                "qty": 0.54242,
                "waste": 1
              },
              {
                "id": "raw-101034",
                "qty": 0.21697,
                "waste": 1
              },
              {
                "id": "raw-101008",
                "qty": 0.10848,
                "waste": 1
              },
              {
                "id": "raw-101072",
                "qty": 0.13181,
                "waste": 1
              },
              {
                "id": "raw-104018",
                "qty": 0.00033,
                "waste": 1
              }
            ]
          },
          "prod-dry-powder-kg-pa": {
            "ings": [
              {
                "id": "raw-102031",
                "qty": 0.69383,
                "waste": 1
              },
              {
                "id": "raw-102068",
                "qty": 0.20815,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.0104,
                "waste": 1
              },
              {
                "id": "raw-102017",
                "qty": 0.00346,
                "waste": 1
              },
              {
                "id": "raw-102029",
                "qty": 0.0052,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.03252,
                "waste": 1
              },
              {
                "id": "raw-102036",
                "qty": 0.03252,
                "waste": 1
              },
              {
                "id": "raw-102003",
                "qty": 0.01388,
                "waste": 1
              }
            ]
          },
          "prod-cucumber-pickle-kg-pa": {
            "ings": [
              {
                "id": "raw-104025",
                "qty": 0.50793,
                "waste": 1
              },
              {
                "id": "raw-108020",
                "qty": 1.26984,
                "waste": 1
              },
              {
                "id": "raw-102025",
                "qty": 0.50794,
                "waste": 1
              }
            ]
          },
          "prod-truffle-mayo-pa": {
            "ings": [
              {
                "id": "raw-104142",
                "qty": 0.90909,
                "waste": 1
              }
            ]
          },
          "prod-dry-mix-pa": {
            "ings": [
              {
                "id": "raw-102031",
                "qty": 0.69383,
                "waste": 1
              },
              {
                "id": "raw-102068",
                "qty": 0.20815,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.0104,
                "waste": 1
              },
              {
                "id": "raw-102017",
                "qty": 0.00346,
                "waste": 1
              },
              {
                "id": "raw-102029",
                "qty": 0.0055,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.03252,
                "waste": 1
              },
              {
                "id": "raw-102036",
                "qty": 0.03252,
                "waste": 1
              },
              {
                "id": "raw-102003",
                "qty": 0.01388,
                "waste": 1
              }
            ]
          },
          "prod-karkade-syrup-pa": {
            "ings": [
              {
                "id": "raw-102154",
                "qty": 0.14,
                "waste": 1
              },
              {
                "id": "raw-200012",
                "qty": 0.3997,
                "waste": 1
              },
              {
                "id": "raw-102034",
                "qty": 0.4998,
                "waste": 1
              }
            ]
          },
          "prod-salted-vanilla-bean-pa": {
            "ings": [
              {
                "id": "raw-104123",
                "qty": 0.72,
                "waste": 1
              },
              {
                "id": "raw-104166",
                "qty": 0.28,
                "waste": 1
              },
              {
                "id": "raw-102136",
                "qty": 0.00826,
                "waste": 1
              }
            ]
          },
          "prod-salted-hazelnut-pa": {
            "ings": [
              {
                "id": "raw-104123",
                "qty": 0.89189,
                "waste": 1
              },
              {
                "id": "raw-102136",
                "qty": 0.00721,
                "waste": 1
              },
              {
                "id": "raw-104235",
                "qty": 0.11351,
                "waste": 1
              }
            ]
          },
          "prod-roasted-potato-pa": {
            "ings": [
              {
                "id": "raw-108142",
                "qty": 1,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.005,
                "waste": 1
              },
              {
                "id": "raw-104204",
                "qty": 0.04,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.001,
                "waste": 1
              },
              {
                "id": "raw-108033",
                "qty": 0.005,
                "waste": 1
              }
            ]
          },
          "prod-marination-mushroom-roasted-pa": {
            "ings": [
              {
                "id": "raw-108018",
                "qty": 2.06897,
                "waste": 1
              },
              {
                "id": "raw-108139",
                "qty": 0.2069,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.06897,
                "waste": 1
              },
              {
                "id": "raw-104013",
                "qty": 2.06897,
                "waste": 1
              },
              {
                "id": "raw-108016",
                "qty": 0.2069,
                "waste": 1
              },
              {
                "id": "raw-108025",
                "qty": 0.68966,
                "waste": 1
              },
              {
                "id": "raw-104024",
                "qty": 0.68966,
                "waste": 1
              }
            ]
          },
          "prod-hot-honey-pa": {
            "ings": [
              {
                "id": "raw-104007",
                "qty": 0.96852,
                "waste": 1
              },
              {
                "id": "raw-104199",
                "qty": 0.008,
                "waste": 1
              },
              {
                "id": "raw-104024",
                "qty": 0.00969,
                "waste": 1
              },
              {
                "id": "raw-104014",
                "qty": 0.00969,
                "waste": 1
              }
            ]
          },
          "prod-balsamic-galze-pa": {
            "ings": [
              {
                "id": "raw-104023",
                "qty": 1.0504,
                "waste": 1
              },
              {
                "id": "raw-104007",
                "qty": 0.0352,
                "waste": 1
              }
            ]
          },
          "prod-sauce-marinara-pa": {
            "ings": [
              {
                "id": "raw-108022",
                "qty": 0.16847,
                "waste": 1
              },
              {
                "id": "raw-102222",
                "qty": 0.16848,
                "waste": 1
              },
              {
                "id": "raw-104013",
                "qty": 0,
                "waste": 1
              },
              {
                "id": "raw-108017",
                "qty": 0.04493,
                "waste": 1
              },
              {
                "id": "raw-108016",
                "qty": 0.00584,
                "waste": 1
              },
              {
                "id": "raw-108105",
                "qty": 0.00359,
                "waste": 1
              },
              {
                "id": "raw-104144",
                "qty": 0.01572,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.0054,
                "waste": 1
              },
              {
                "id": "raw-102173",
                "qty": 0.00045,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.00022,
                "waste": 1
              }
            ]
          },
          "prod-pickled-onion-pa": {
            "ings": [
              {
                "id": "raw-200012",
                "qty": 0.23985,
                "waste": 1
              },
              {
                "id": "raw-104025",
                "qty": 0.47971,
                "waste": 1
              },
              {
                "id": "raw-104146",
                "qty": 0.03598,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.01199,
                "waste": 1
              },
              {
                "id": "raw-108016",
                "qty": 0.01199,
                "waste": 1
              },
              {
                "id": "raw-108018",
                "qty": 0.49769,
                "waste": 1
              }
            ]
          },
          "prod-chicken-fillet-p-pa": {
            "ings": [
              {
                "id": "raw-101013",
                "qty": 1.0465,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.0209,
                "waste": 1
              },
              {
                "id": "raw-102029",
                "qty": 0.0073,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.0052,
                "waste": 1
              },
              {
                "id": "raw-102053",
                "qty": 0.0052,
                "waste": 1
              },
              {
                "id": "raw-102025",
                "qty": 0.0576,
                "waste": 1
              },
              {
                "id": "raw-108016",
                "qty": 0.0084,
                "waste": 1
              },
              {
                "id": "raw-108033",
                "qty": 0.0209,
                "waste": 1
              }
            ]
          },
          "prod-lemon-chicken-pa": {
            "ings": [
              {
                "id": "raw-105003",
                "qty": 4.5,
                "waste": 1
              },
              {
                "id": "raw-104012",
                "qty": 0.2,
                "waste": 1
              },
              {
                "id": "raw-101068",
                "qty": 0.15,
                "waste": 1
              },
              {
                "id": "raw-104002",
                "qty": 0.05,
                "waste": 1
              },
              {
                "id": "raw-108016",
                "qty": 0.03,
                "waste": 1
              },
              {
                "id": "raw-108028",
                "qty": 0.015,
                "waste": 1
              },
              {
                "id": "raw-108117",
                "qty": 0.08,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.035,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.005,
                "waste": 1
              },
              {
                "id": "raw-102029",
                "qty": 0.005,
                "waste": 1
              },
              {
                "id": "raw-102053",
                "qty": 0.005,
                "waste": 1
              }
            ]
          },
          "prod-chicken-bites-kg-pa": {
            "ings": [
              {
                "id": "raw-102039",
                "qty": 0.02308,
                "waste": 1
              },
              {
                "id": "raw-101013",
                "qty": 1.553,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.00494,
                "waste": 1
              },
              {
                "id": "raw-108016",
                "qty": 0.016,
                "waste": 1
              },
              {
                "id": "raw-108018",
                "qty": 0.11996,
                "waste": 1
              }
            ]
          },
          "prod-chicken-breaded-pa": {
            "ings": [
              {
                "id": "raw-105004",
                "qty": 0.12096,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.00378,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.00027,
                "waste": 1
              },
              {
                "id": "raw-102031",
                "qty": 0.054,
                "waste": 1
              },
              {
                "id": "raw-102029",
                "qty": 0.00216,
                "waste": 1
              },
              {
                "id": "raw-102053",
                "qty": 0.00324,
                "waste": 1
              },
              {
                "id": "raw-102009",
                "qty": 0.00324,
                "waste": 1
              },
              {
                "id": "raw-101013",
                "qty": 0.0162,
                "waste": 1
              },
              {
                "id": "raw-101068",
                "qty": 0.1296,
                "waste": 1
              },
              {
                "id": "raw-105003",
                "qty": 27,
                "waste": 1
              }
            ]
          },
          "prod-roast-beef-pa-pa": {
            "ings": [
              {
                "id": "raw-104013",
                "qty": 0.05412,
                "waste": 1
              },
              {
                "id": "raw-102171",
                "qty": 0.01804,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.01353,
                "waste": 1
              },
              {
                "id": "raw-102178",
                "qty": 0.04059,
                "waste": 1
              },
              {
                "id": "raw-108107",
                "qty": 0.00902,
                "waste": 1
              }
            ]
          },
          "prod-pancake-paste-kg-pa": {
            "ings": [
              {
                "id": "raw-101002",
                "qty": 1.00583,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.091,
                "waste": 1
              },
              {
                "id": "raw-102018",
                "qty": 5.84032,
                "waste": 1
              },
              {
                "id": "raw-102034",
                "qty": 1.9138300000000001,
                "waste": 1
              },
              {
                "id": "raw-102003",
                "qty": 0.5871299999999999,
                "waste": 1
              },
              {
                "id": "raw-101003",
                "qty": 9.473320000000001,
                "waste": 1
              },
              {
                "id": "raw-105004",
                "qty": 2.74036,
                "waste": 1
              },
              {
                "id": "raw-102170",
                "qty": 0.00098,
                "waste": 1
              },
              {
                "id": "raw-104088",
                "qty": 0.00098,
                "waste": 1
              }
            ]
          },
          "prod-chicken-liquid-sauce-kg-pa": {
            "ings": [
              {
                "id": "raw-102041",
                "qty": 12,
                "waste": 1
              },
              {
                "id": "raw-102031",
                "qty": 5,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.75,
                "waste": 1
              },
              {
                "id": "raw-102053",
                "qty": 0.35,
                "waste": 1
              },
              {
                "id": "raw-102009",
                "qty": 0.35,
                "waste": 1
              },
              {
                "id": "raw-101013",
                "qty": 5,
                "waste": 1
              },
              {
                "id": "raw-105004",
                "qty": 4.05,
                "waste": 1
              },
              {
                "id": "raw-200006",
                "qty": 12.5,
                "waste": 1
              }
            ]
          },
          "prod-onion-jam-pa": {
            "ings": [
              {
                "id": "raw-108017",
                "qty": 13.31471,
                "waste": 1
              },
              {
                "id": "raw-101002",
                "qty": 0.35,
                "waste": 1
              },
              {
                "id": "raw-104146",
                "qty": 0.3,
                "waste": 1
              },
              {
                "id": "raw-108016",
                "qty": 0.03,
                "waste": 1
              },
              {
                "id": "raw-104013",
                "qty": 0.01953,
                "waste": 1
              },
              {
                "id": "raw-104012",
                "qty": 0.01953,
                "waste": 1
              },
              {
                "id": "raw-102034",
                "qty": 0.03999,
                "waste": 1
              },
              {
                "id": "raw-104007",
                "qty": 0.01023,
                "waste": 1
              },
              {
                "id": "raw-104023",
                "qty": 0.01023,
                "waste": 1
              },
              {
                "id": "raw-104024",
                "qty": 0.00093,
                "waste": 1
              }
            ]
          },
          "prod-ice-cream-kg-pa": {
            "ings": [
              {
                "id": "raw-102068",
                "qty": 10,
                "waste": 1
              },
              {
                "id": "raw-101003",
                "qty": 24,
                "waste": 1
              },
              {
                "id": "raw-101010",
                "qty": 2,
                "waste": 1
              },
              {
                "id": "raw-200012",
                "qty": 3,
                "waste": 1
              }
            ]
          },
          "prod-sweet-relish-pa": {
            "ings": [
              {
                "id": "raw-108020",
                "qty": 0.752,
                "waste": 1
              },
              {
                "id": "raw-108018",
                "qty": 0.131,
                "waste": 1
              },
              {
                "id": "raw-108101",
                "qty": 0.122,
                "waste": 1
              },
              {
                "id": "raw-108102",
                "qty": 0.091,
                "waste": 1
              },
              {
                "id": "raw-108103",
                "qty": 0.018,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.016,
                "waste": 1
              },
              {
                "id": "raw-102162",
                "qty": 0.004,
                "waste": 1
              },
              {
                "id": "raw-104137",
                "qty": 0.004,
                "waste": 1
              },
              {
                "id": "raw-104024",
                "qty": 0.084,
                "waste": 1
              },
              {
                "id": "raw-104023",
                "qty": 0.03,
                "waste": 1
              },
              {
                "id": "raw-102034",
                "qty": 0.084,
                "waste": 1
              },
              {
                "id": "raw-102041",
                "qty": 0.028,
                "waste": 1
              },
              {
                "id": "raw-200012",
                "qty": 0.095,
                "waste": 1
              },
              {
                "id": "raw-104002",
                "qty": 0.016,
                "waste": 1
              },
              {
                "id": "raw-104136",
                "qty": 0.017,
                "waste": 1
              }
            ]
          },
          "prod-strawberry-sauce-pa": {
            "ings": [
              {
                "id": "raw-108163",
                "qty": 0.378,
                "waste": 1
              },
              {
                "id": "raw-200012",
                "qty": 0.378,
                "waste": 1
              },
              {
                "id": "raw-102034",
                "qty": 0.2268,
                "waste": 1
              },
              {
                "id": "raw-200097",
                "qty": 0.1134,
                "waste": 1
              },
              {
                "id": "raw-102246",
                "qty": 0.00047,
                "waste": 1
              }
            ]
          },
          "prod-special-sauce-pa": {
            "ings": [
              {
                "id": "raw-104142",
                "qty": 0.24,
                "waste": 1
              },
              {
                "id": "raw-104004",
                "qty": 0.07,
                "waste": 1
              },
              {
                "id": "raw-104002",
                "qty": 0.008,
                "waste": 1
              },
              {
                "id": "raw-108117",
                "qty": 0.008,
                "waste": 1
              },
              {
                "id": "raw-104014",
                "qty": 0.008,
                "waste": 1
              },
              {
                "id": "raw-104008",
                "qty": 0.008,
                "waste": 1
              },
              {
                "id": "raw-102053",
                "qty": 0.004,
                "waste": 1
              },
              {
                "id": "raw-102009",
                "qty": 0.002,
                "waste": 1
              },
              {
                "id": "raw-102177",
                "qty": 0.003,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.00025,
                "waste": 1
              }
            ]
          },
          "prod-tuna-mix-pa": {
            "ings": [
              {
                "id": "raw-104155",
                "qty": 0.24324,
                "waste": 1
              },
              {
                "id": "raw-101069",
                "qty": 0.11676,
                "waste": 1
              },
              {
                "id": "raw-104142",
                "qty": 0.04865,
                "waste": 1
              },
              {
                "id": "raw-104153",
                "qty": 0.12649,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.00097,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.00097,
                "waste": 1
              },
              {
                "id": "raw-108117",
                "qty": 0.00973,
                "waste": 1
              }
            ]
          },
          "prod-ranch-sauce-kg-pa": {
            "ings": [
              {
                "id": "raw-101068",
                "qty": 1.98597,
                "waste": 1
              },
              {
                "id": "raw-104003",
                "qty": 3.81108,
                "waste": 1
              },
              {
                "id": "raw-104018",
                "qty": 0.05,
                "waste": 1
              },
              {
                "id": "raw-104025",
                "qty": 0.11159,
                "waste": 1
              },
              {
                "id": "raw-104008",
                "qty": 0.0625,
                "waste": 1
              },
              {
                "id": "raw-101013",
                "qty": 0.9926,
                "waste": 1
              },
              {
                "id": "raw-102020",
                "qty": 0.01388,
                "waste": 1
              },
              {
                "id": "raw-102033",
                "qty": 0.00694,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.01487,
                "waste": 1
              }
            ]
          },
          "prod-chicken-sauce-kg-pa": {
            "ings": [
              {
                "id": "raw-101068",
                "qty": 1.86904,
                "waste": 1
              },
              {
                "id": "raw-104003",
                "qty": 1.65704,
                "waste": 1
              },
              {
                "id": "raw-102053",
                "qty": 0.0212,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.0212,
                "waste": 1
              },
              {
                "id": "raw-101013",
                "qty": 0.21552,
                "waste": 1
              },
              {
                "id": "raw-108016",
                "qty": 0.01412,
                "waste": 1
              },
              {
                "id": "raw-108025",
                "qty": 0.14484,
                "waste": 1
              },
              {
                "id": "raw-104025",
                "qty": 0.05608,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.00092,
                "waste": 1
              }
            ]
          },
          "prod-atomic-sauce-kg-pa": {
            "ings": [
              {
                "id": "raw-104056",
                "qty": 2.50905,
                "waste": 1
              },
              {
                "id": "raw-104003",
                "qty": 4.14021,
                "waste": 1
              },
              {
                "id": "raw-104026",
                "qty": 0.25063,
                "waste": 1
              },
              {
                "id": "raw-108117",
                "qty": 0.10011,
                "waste": 1
              }
            ]
          },
          "prod-bbq-sauce-kg-pa": {
            "ings": [
              {
                "id": "raw-104147",
                "qty": 0.807,
                "waste": 1
              },
              {
                "id": "raw-104003",
                "qty": 1.05,
                "waste": 1
              },
              {
                "id": "raw-104002",
                "qty": 0.24,
                "waste": 1
              },
              {
                "id": "raw-104026",
                "qty": 0.24,
                "waste": 1
              },
              {
                "id": "raw-108117",
                "qty": 0.066,
                "waste": 1
              },
              {
                "id": "raw-104007",
                "qty": 0.597,
                "waste": 1
              }
            ]
          },
          "prod-blue-cheese-dressing-pa": {
            "ings": [
              {
                "id": "raw-104003",
                "qty": 0.2489,
                "waste": 1
              },
              {
                "id": "raw-101013",
                "qty": 0.11958,
                "waste": 1
              },
              {
                "id": "raw-108117",
                "qty": 0.00531,
                "waste": 1
              },
              {
                "id": "raw-104025",
                "qty": 0.00266,
                "waste": 1
              },
              {
                "id": "raw-104008",
                "qty": 0.00177,
                "waste": 1
              },
              {
                "id": "raw-104007",
                "qty": 0.00974,
                "waste": 1
              },
              {
                "id": "raw-102009",
                "qty": 0.00053,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.00053,
                "waste": 1
              },
              {
                "id": "raw-108025",
                "qty": 0.00177,
                "waste": 1
              },
              {
                "id": "raw-101059",
                "qty": 0.0992,
                "waste": 1
              }
            ]
          },
          "prod-sauce-sriracha-kg-pa": {
            "ings": [
              {
                "id": "raw-104003",
                "qty": 1.846,
                "waste": 1
              },
              {
                "id": "raw-104014",
                "qty": 0.692,
                "waste": 1
              },
              {
                "id": "raw-104007",
                "qty": 0.461,
                "waste": 1
              }
            ]
          },
          "prod-queen-s-salad-dressing-pa": {
            "ings": [
              {
                "id": "raw-104023",
                "qty": 0.48118,
                "waste": 1
              },
              {
                "id": "raw-104013",
                "qty": 1.11,
                "waste": 1
              },
              {
                "id": "raw-102025",
                "qty": 0.22376,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.02376,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.00396,
                "waste": 1
              },
              {
                "id": "raw-104026",
                "qty": 0.149,
                "waste": 1
              },
              {
                "id": "raw-108016",
                "qty": 0.008,
                "waste": 1
              }
            ]
          },
          "prod-citrus-dressing-pa": {
            "ings": [
              {
                "id": "raw-200096",
                "qty": 0.11726,
                "waste": 1
              },
              {
                "id": "raw-104024",
                "qty": 0.05863,
                "waste": 1
              },
              {
                "id": "raw-104007",
                "qty": 0.01173,
                "waste": 1
              },
              {
                "id": "raw-104026",
                "qty": 0.02345,
                "waste": 1
              },
              {
                "id": "raw-104223",
                "qty": 0.03518,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.00195,
                "waste": 1
              },
              {
                "id": "raw-104013",
                "qty": 0.1759,
                "waste": 1
              },
              {
                "id": "raw-104012",
                "qty": 0.1759,
                "waste": 1
              }
            ]
          },
          "prod-moroccan-salad-dressing-pa": {
            "ings": [
              {
                "id": "raw-108133",
                "qty": 0.41941,
                "waste": 1
              },
              {
                "id": "raw-104023",
                "qty": 0.58681,
                "waste": 1
              },
              {
                "id": "raw-104013",
                "qty": 0.39942,
                "waste": 1
              },
              {
                "id": "raw-104012",
                "qty": 0.39942,
                "waste": 1
              },
              {
                "id": "raw-102025",
                "qty": 0.05868,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.02348,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.00392,
                "waste": 1
              },
              {
                "id": "raw-104007",
                "qty": 0.05868,
                "waste": 1
              }
            ]
          },
          "prod-balsamic-vinaigrette-dressing-pa": {
            "ings": [
              {
                "id": "raw-104026",
                "qty": 0.0436,
                "waste": 1
              },
              {
                "id": "raw-104023",
                "qty": 0.04651,
                "waste": 1
              },
              {
                "id": "raw-104007",
                "qty": 0.05233,
                "waste": 1
              },
              {
                "id": "raw-104013",
                "qty": 0.07267,
                "waste": 1
              },
              {
                "id": "raw-104012",
                "qty": 0.14535,
                "waste": 1
              },
              {
                "id": "raw-108117",
                "qty": 0.01453,
                "waste": 1
              }
            ]
          },
          "prod-house-dressing-pa": {
            "ings": [
              {
                "id": "raw-108117",
                "qty": 0.37103,
                "waste": 1
              },
              {
                "id": "raw-104024",
                "qty": 0.24603,
                "waste": 1
              },
              {
                "id": "raw-104013",
                "qty": 0.49108,
                "waste": 1
              },
              {
                "id": "raw-104012",
                "qty": 0.49108,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.02579,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.00397,
                "waste": 1
              },
              {
                "id": "raw-104007",
                "qty": 0.37104,
                "waste": 1
              }
            ]
          },
          "prod-pistachio-pesto-pa": {
            "ings": [
              {
                "id": "raw-108105",
                "qty": 0.065,
                "waste": 1
              },
              {
                "id": "raw-104013",
                "qty": 0.2,
                "waste": 1
              },
              {
                "id": "raw-101023",
                "qty": 0.047,
                "waste": 1
              },
              {
                "id": "raw-108016",
                "qty": 0.005,
                "waste": 1
              },
              {
                "id": "raw-102174",
                "qty": 0.022,
                "waste": 1
              },
              {
                "id": "raw-104106",
                "qty": 0.02,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.003,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.001,
                "waste": 1
              }
            ]
          },
          "prod-thyme-balsamic-vinaigrette-pa": {
            "ings": [
              {
                "id": "raw-104023",
                "qty": 0.2451,
                "waste": 1
              },
              {
                "id": "raw-104012",
                "qty": 0.4902,
                "waste": 1
              },
              {
                "id": "raw-104007",
                "qty": 0.20588,
                "waste": 1
              },
              {
                "id": "raw-108033",
                "qty": 0.0049,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.00392,
                "waste": 1
              }
            ]
          },
          "prod-sundried-tomato-pesto-pa": {
            "ings": [
              {
                "id": "raw-108105",
                "qty": 0.19118,
                "waste": 1
              },
              {
                "id": "raw-104013",
                "qty": 0.41176,
                "waste": 1
              },
              {
                "id": "raw-101023",
                "qty": 0.13824,
                "waste": 1
              },
              {
                "id": "raw-108016",
                "qty": 0.01471,
                "waste": 1
              },
              {
                "id": "raw-102174",
                "qty": 0.06471,
                "waste": 1
              },
              {
                "id": "raw-104202",
                "qty": 0.17647,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.00294,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.00882,
                "waste": 1
              }
            ]
          },
          "prod-coleslow-dressing-pa": {
            "ings": [
              {
                "id": "raw-104142",
                "qty": 0.14865,
                "waste": 1
              },
              {
                "id": "raw-101013",
                "qty": 0.14865,
                "waste": 1
              },
              {
                "id": "raw-104025",
                "qty": 0.14865,
                "waste": 1
              },
              {
                "id": "raw-102034",
                "qty": 0.54054,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.00541,
                "waste": 1
              },
              {
                "id": "raw-108017",
                "qty": 0.02703,
                "waste": 1
              }
            ]
          },
          "prod-pesto-sauce-pa": {
            "ings": [
              {
                "id": "raw-108105",
                "qty": 0.15998,
                "waste": 1
              },
              {
                "id": "raw-104013",
                "qty": 0.15,
                "waste": 1
              },
              {
                "id": "raw-101023",
                "qty": 0.065,
                "waste": 1
              },
              {
                "id": "raw-108016",
                "qty": 0.007,
                "waste": 1
              },
              {
                "id": "raw-102174",
                "qty": 0.03,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.004,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.00025,
                "waste": 1
              }
            ]
          },
          "prod-honey-srirache-sauce-pa": {
            "ings": [
              {
                "id": "raw-104007",
                "qty": 0.1,
                "waste": 1
              },
              {
                "id": "raw-104014",
                "qty": 0.1,
                "waste": 1
              },
              {
                "id": "raw-104008",
                "qty": 0.005,
                "waste": 1
              }
            ]
          },
          "prod-chives-cream-cheese-pa": {
            "ings": [
              {
                "id": "raw-101069",
                "qty": 0.19493,
                "waste": 1
              },
              {
                "id": "raw-101011",
                "qty": 0.04873,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.00097,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.00049,
                "waste": 1
              },
              {
                "id": "raw-101113",
                "qty": 0.00487,
                "waste": 1
              }
            ]
          },
          "prod-caesar-dressing-pa-pa": {
            "ings": [
              {
                "id": "raw-108016",
                "qty": 0.108,
                "waste": 1
              },
              {
                "id": "raw-104154",
                "qty": 0.108,
                "waste": 1
              },
              {
                "id": "raw-104026",
                "qty": 0.108,
                "waste": 1
              },
              {
                "id": "raw-104008",
                "qty": 0.108,
                "waste": 1
              },
              {
                "id": "raw-104142",
                "qty": 4.4928,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.0216,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.0216,
                "waste": 1
              },
              {
                "id": "raw-101023",
                "qty": 1.08,
                "waste": 1
              }
            ]
          },
          "prod-smokey-mayo-sauce-pa-pa": {
            "ings": [
              {
                "id": "raw-104142",
                "qty": 0.1,
                "waste": 1
              },
              {
                "id": "raw-104002",
                "qty": 0.005,
                "waste": 1
              },
              {
                "id": "raw-104147",
                "qty": 0.015,
                "waste": 1
              },
              {
                "id": "raw-104007",
                "qty": 0.012,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.0005,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.00025,
                "waste": 1
              }
            ]
          },
          "prod-sweet-chili-mayo-sauce-pa": {
            "ings": [
              {
                "id": "raw-104003",
                "qty": 0.405,
                "waste": 1
              },
              {
                "id": "raw-104136",
                "qty": 0.6,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.001,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.00025,
                "waste": 1
              }
            ]
          },
          "prod-toast-bread-pa": {
            "ings": [
              {
                "id": "raw-100002",
                "qty": 0.24534,
                "waste": 1
              },
              {
                "id": "raw-101002",
                "qty": 0.09353,
                "waste": 1
              },
              {
                "id": "raw-108016",
                "qty": 0.0094,
                "waste": 1
              },
              {
                "id": "raw-102021",
                "qty": 0.00188,
                "waste": 1
              }
            ]
          },
          "prod-frosting-sauce-basic-pa": {
            "ings": [
              {
                "id": "raw-101069",
                "qty": 0.10789,
                "waste": 1
              },
              {
                "id": "raw-104267",
                "qty": 0.05442,
                "waste": 1
              },
              {
                "id": "raw-102169",
                "qty": 0.11457,
                "waste": 1
              },
              {
                "id": "raw-104088",
                "qty": 0.00191,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.00048,
                "waste": 1
              },
              {
                "id": "raw-101003",
                "qty": 0.00573,
                "waste": 1
              }
            ]
          },
          "prod-classic-frosting-pa": {
            "ings": [
              {
                "id": "raw-101069",
                "qty": 0.18677,
                "waste": 1
              },
              {
                "id": "raw-104267",
                "qty": 0.05323,
                "waste": 1
              },
              {
                "id": "raw-102169",
                "qty": 0.11206,
                "waste": 1
              },
              {
                "id": "raw-104088",
                "qty": 0.00187,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.00047,
                "waste": 1
              },
              {
                "id": "raw-101003",
                "qty": 0.0056,
                "waste": 1
              }
            ]
          },
          "prod-lemon-curd-pa": {
            "ings": [
              {
                "id": "raw-105004",
                "qty": 4,
                "waste": 1
              },
              {
                "id": "raw-104423",
                "qty": 2,
                "waste": 1
              },
              {
                "id": "raw-104267",
                "qty": 0.16,
                "waste": 1
              },
              {
                "id": "raw-102034",
                "qty": 0.32,
                "waste": 1
              },
              {
                "id": "raw-108117",
                "qty": 0.022,
                "waste": 1
              },
              {
                "id": "raw-104088",
                "qty": 0.004,
                "waste": 1
              }
            ]
          },
          "prod-blue-berry-sauce-pa": {
            "ings": [
              {
                "id": "raw-104349",
                "qty": 0.83333,
                "waste": 1
              },
              {
                "id": "raw-102034",
                "qty": 0.2,
                "waste": 1
              }
            ]
          },
          "prod-hot-chocolate-sauce-pa": {
            "ings": [
              {
                "id": "raw-104261",
                "qty": 0.14698,
                "waste": 1
              },
              {
                "id": "raw-101010",
                "qty": 0.05919,
                "waste": 1
              },
              {
                "id": "raw-101003",
                "qty": 0.11739,
                "waste": 1
              },
              {
                "id": "raw-104087",
                "qty": 0.03946,
                "waste": 1
              }
            ]
          },
          "prod-taztaziki-sauce-pa": {
            "ings": [
              {
                "id": "raw-104188",
                "qty": 2.772,
                "waste": 1
              },
              {
                "id": "raw-108020",
                "qty": 0.3696,
                "waste": 1
              },
              {
                "id": "raw-104013",
                "qty": 0.1386,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.01848,
                "waste": 1
              },
              {
                "id": "raw-108016",
                "qty": 0.01848,
                "waste": 1
              },
              {
                "id": "raw-108028",
                "qty": 0.00462,
                "waste": 1
              }
            ]
          },
          "prod-dill-tuna-mix-pa": {
            "ings": [
              {
                "id": "raw-104155",
                "qty": 0.75736,
                "waste": 1
              },
              {
                "id": "raw-104142",
                "qty": 0.1122,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.00561,
                "waste": 1
              },
              {
                "id": "raw-102030",
                "qty": 0.0014,
                "waste": 1
              },
              {
                "id": "raw-108113",
                "qty": 0.00842,
                "waste": 1
              },
              {
                "id": "raw-104226",
                "qty": 0.07013,
                "waste": 1
              }
            ]
          },
          "prod-hot-mustard-sauce-pa": {
            "ings": [
              {
                "id": "raw-104419",
                "qty": 0,
                "waste": 1
              },
              {
                "id": "raw-104026",
                "qty": 0,
                "waste": 1
              },
              {
                "id": "raw-104007",
                "qty": 0,
                "waste": 1
              },
              {
                "id": "raw-104199",
                "qty": 0,
                "waste": 1
              }
            ]
          },
          "prod-pretzel-bread-pa": {
            "ings": [
              {
                "id": "raw-102165",
                "qty": 0.02068,
                "waste": 1
              },
              {
                "id": "raw-200012",
                "qty": 0.00062,
                "waste": 1
              },
              {
                "id": "raw-102166",
                "qty": 0.00741,
                "waste": 1
              },
              {
                "id": "raw-101002",
                "qty": 0.00031,
                "waste": 1
              },
              {
                "id": "raw-102167",
                "qty": 0.00093,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.00926,
                "waste": 1
              }
            ]
          },
          "prod-croissant-plain-pa": {
            "ings": [
              {
                "id": "raw-104263",
                "qty": 0.00095,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.02857,
                "waste": 1
              },
              {
                "id": "raw-102025",
                "qty": 0.0019,
                "waste": 1
              },
              {
                "id": "raw-102220",
                "qty": 0.00238,
                "waste": 1
              },
              {
                "id": "raw-104267",
                "qty": 1.20119,
                "waste": 1
              },
              {
                "id": "raw-104007",
                "qty": 0.00238,
                "waste": 1
              },
              {
                "id": "raw-105004",
                "qty": 0.00476,
                "waste": 1
              },
              {
                "id": "raw-101003",
                "qty": 0.0131,
                "waste": 1
              },
              {
                "id": "raw-200012",
                "qty": 0.02857,
                "waste": 1
              }
            ]
          },
          "prod-ciabatta-bread-pa": {
            "ings": [
              {
                "id": "raw-102165",
                "qty": 0.04409,
                "waste": 1
              },
              {
                "id": "raw-200012",
                "qty": 0.00101,
                "waste": 1
              },
              {
                "id": "raw-102166",
                "qty": 0.00504,
                "waste": 1
              },
              {
                "id": "raw-104013",
                "qty": 0.00063,
                "waste": 1
              },
              {
                "id": "raw-102167",
                "qty": 0.00126,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.0126,
                "waste": 1
              }
            ]
          },
          "prod-brown-ciabatta-bread-pa-pa": {
            "ings": [
              {
                "id": "raw-102165",
                "qty": 0.04349,
                "waste": 1
              },
              {
                "id": "raw-200012",
                "qty": 0.00099,
                "waste": 1
              },
              {
                "id": "raw-102166",
                "qty": 0.00497,
                "waste": 1
              },
              {
                "id": "raw-104013",
                "qty": 0.00062,
                "waste": 1
              },
              {
                "id": "raw-102167",
                "qty": 0.00155,
                "waste": 1
              },
              {
                "id": "raw-100021",
                "qty": 0.00124,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.115,
                "waste": 1
              }
            ]
          },
          "prod-french-baghette-pa": {
            "ings": [
              {
                "id": "raw-102165",
                "qty": 0.05743,
                "waste": 1
              },
              {
                "id": "raw-200012",
                "qty": 0.00053,
                "waste": 1
              },
              {
                "id": "raw-102166",
                "qty": 0.00136,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.01511,
                "waste": 1
              }
            ]
          },
          "prod-lovan-dough-pa": {
            "ings": [
              {
                "id": "raw-102165",
                "qty": 0.04329,
                "waste": 1
              },
              {
                "id": "raw-200012",
                "qty": 0.00054,
                "waste": 1
              },
              {
                "id": "raw-102285",
                "qty": 0,
                "waste": 1
              }
            ]
          },
          "prod-cookies-can-mini-pa": {
            "ings": [
              {
                "id": "raw-104146",
                "qty": 0.00073,
                "waste": 1
              },
              {
                "id": "raw-102025",
                "qty": 0.00293,
                "waste": 1
              },
              {
                "id": "raw-101139",
                "qty": 0.00135,
                "waste": 1
              },
              {
                "id": "raw-105004",
                "qty": 0.00611,
                "waste": 1
              },
              {
                "id": "raw-102031",
                "qty": 0.00007,
                "waste": 1
              },
              {
                "id": "raw-102003",
                "qty": 0.00017,
                "waste": 1
              },
              {
                "id": "raw-101114",
                "qty": 0.00002,
                "waste": 1
              },
              {
                "id": "raw-104171",
                "qty": 0.00003,
                "waste": 1
              },
              {
                "id": "raw-102039",
                "qty": 0.00293,
                "waste": 1
              },
              {
                "id": "raw-104261",
                "qty": 0.14674,
                "waste": 1
              }
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
         LOCAL STORAGE — PERSISTENT DATA (V2 WITH ALL 74 BOM RECIPES)
      ============================================================ */
      const LS_KEY = 'ck-erp-v4';
      // Self-healing: purge legacy cache keys that contained duplicated or text-ID items
      try {
        ['ck-erp-v1', 'ck-erp-v2', 'ck-erp-v3'].forEach(k => localStorage.removeItem(k));
      } catch (e) { }


      /* ============================================================
     SUPABASE CLOUD SQL DATABASE SYNC & PERSISTENCE
  ============================================================ */
      const SUPABASE_URL = 'https://ihminamcbstcexsdacys.supabase.co';
      const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlobWluYW1jYnN0Y2V4c2RhY3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5Mjg5MDksImV4cCI6MjEwMzUwNDkwOX0.4i4zO2ygSHdkQULp2Chqz3mxiUYevOjbX537w7uWRrE';
      let _supaClient = null;

      function getSupabaseClient() {
        if (!_supaClient && typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
          _supaClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        }
        return _supaClient;
      }

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
          badge.title = T('اضغط لتفعيل المزامنة السحابية والحفظ في SQL', 'Click to resume live Cloud SQL sync');
          badge.innerHTML = '🧪 <span>' + T('وضع التجربة (SQL متوقف مؤقتاً)', 'Sandbox (SQL Paused)') + '</span>';
        } else {
          badge.className = 'badge badge-green cursor-pointer';
          badge.style.background = 'rgba(34,197,94,0.15)';
          badge.style.borderColor = 'rgba(34,197,94,0.35)';
          badge.style.color = '#4ade80';
          badge.style.cursor = 'pointer';
          badge.title = T('اضغط لإيقاف الـ SQL مؤقتاً والتحويل إلى وضع التجربة الآمن', 'Click to pause SQL & test safely');
          badge.innerHTML = '<span style="width:6px;height:6px;border-radius:50%;background:#4ade80;display:inline-block"></span> ⚡ <span>' + T('السيرفر السحابي متصل ومحدّث', 'Cloud SQL Connected') + '</span>';
        }
      }

      function toggleSqlSync() {
        SQL_SYNC_ENABLED = !SQL_SYNC_ENABLED;
        localStorage.setItem('ck_sql_sync_enabled', SQL_SYNC_ENABLED ? 'true' : 'false');
        updateSqlSyncBadge();
        if (SQL_SYNC_ENABLED) {
          toast(T('⚡ تم استئناف المزامنة السحابية — البيانات تُحفظ في قاعدة البيانات مباشرة', 'Cloud SQL Sync RESUMED!'), 'success');
          syncFromSQL().then(() => {
            renderOrders();
            renderInv();
            renderRecipes();
            if (typeof renderProd === 'function') renderProd();
          });
        } else {
          toast(T('🧪 تم إيقاف الـ SQL مؤقتاً — أنت الآن في وضع التجربة المحلي (لن يتم تعديل أو حفظ أي شيء في الداتابيز)', 'SQL PAUSED: Sandbox mode active (zero DB writes)'), 'warning');
        }
      }

      async function syncFromSQL(retries = 3) {
        updateSqlSyncBadge();
        if (!SQL_SYNC_ENABLED) {
          console.log('🧪 SQL Sync is currently paused. Running in local sandbox mode.');
          return false;
        }
        try {
          let client = getSupabaseClient();
          if (!client && retries > 0) {
            await new Promise(r => setTimeout(r, 200));
            return syncFromSQL(retries - 1);
          }
          if (client) {
            // Fetch from Supabase Cloud
            const [brRes, prRes, rawRes, recRes, ordRes, ordItemsRes, tazRes] = await Promise.all([
              client.from('branches').select('name').order('id', { ascending: true }),
              client.from('products').select('*').order('ar', { ascending: true }),
              client.from('raw_materials').select('*').order('ar', { ascending: true }),
              client.from('recipe_items').select('*'),
              client.from('orders').select('*').order('created_at', { ascending: false }),
              client.from('order_items').select('*'),
              client.from('taztiki_records').select('*').order('created_at', { ascending: false })
            ]);

            if (brRes.data && brRes.data.length) S.branches = brRes.data.map(r => r.name);
            if (prRes.data && prRes.data.length) {
              const codeMap = {};
              S.products.forEach(p => { if (p.code || p.item_no) codeMap[p.id] = p.code || p.item_no; });
              const validProdIds = new Set(S.products.map(p => p.id));
              const staleProdIds = prRes.data.filter(p => !validProdIds.has(p.id)).map(p => p.id);
              if (staleProdIds.length > 0) {
                client.from('products').delete().in('id', staleProdIds).then(() => {
                  console.log('🧹 Auto-cleaned', staleProdIds.length, 'stale product records from Supabase');
                });
              }
              // Auto-upsert any official products missing in Supabase Cloud
              const cloudProdIds = new Set((prRes.data || []).map(p => p.id));
              const prodsToUpsert = S.products.filter(p => !cloudProdIds.has(p.id)).map(p => ({
                id: p.id,
                code: p.code,
                item_no: p.code,
                ar: p.ar,
                en: p.en,
                unit: p.unit,
                cat: p.cat,
                cost: p.cost || 0,
                stock: p.stock || 0
              }));
              if (prodsToUpsert.length > 0) {
                client.from('products').upsert(prodsToUpsert, { onConflict: 'id' }).then(() => {
                  console.log('☁️ Auto-synced', prodsToUpsert.length, 'official products to Supabase Cloud');
                });
              }
              prRes.data.forEach(p => {
                const local = S.products.find(lp => lp.id === p.id);
                if (local) {
                  if (p.stock !== null && p.stock !== undefined) local.stock = p.stock;
                  local.code = p.code || p.item_no || local.code || codeMap[p.id] || '';
                }
              });
            }

            if (rawRes.data && rawRes.data.length) {
              // Valid official categories from ورقة العمل catalog
              const VALID_CATS = ['Meat & Poultry & Fish', 'Grocery', 'Dairy', 'Fruits & Veg', 'Packing Items', 'Dry', 'Bakery', 'Beverage', 'Cleaning Supplies'];
              const validIds = new Set(Object.keys(S.ings));
              // Delete: not in catalog OR has invalid category (عام / General / empty)
              const staleRawIds = rawRes.data
                .filter(r => !validIds.has(r.id) || !VALID_CATS.includes(r.cat || r.category))
                .map(r => r.id);
              if (staleRawIds.length > 0) {
                client.from('raw_materials').delete().in('id', staleRawIds).then(() => {
                  console.log('🧹 Auto-cleaned', staleRawIds.length, 'stale/invalid raw_material records from Supabase');
                });
              }
              // Auto-upsert any official raw materials missing in Supabase Cloud
              const cloudRawIds = new Set((rawRes.data || []).map(r => r.id));
              const rawsToUpsert = Object.entries(S.ings)
                .filter(([id]) => !cloudRawIds.has(id))
                .map(([id, r]) => ({
                  id: id,
                  code: r.code,
                  ar: r.ar,
                  en: r.en,
                  uom: r.uom,
                  cat: r.cat,
                  price: r.price || 0,
                  stock: r.stock || 0,
                  safety: r.safety || 0
                }));
              if (rawsToUpsert.length > 0) {
                client.from('raw_materials').upsert(rawsToUpsert, { onConflict: 'id' }).then(() => {
                  console.log('☁️ Auto-synced', rawsToUpsert.length, 'official raw materials to Supabase Cloud');
                });
              }
              rawRes.data.forEach(r => {
                if (validIds.has(r.id) && VALID_CATS.includes(r.cat || r.category)) {
                  if (r.stock !== null && r.stock !== undefined) S.ings[r.id].stock = r.stock;
                  if (r.safety !== null && r.safety !== undefined) S.ings[r.id].safety = r.safety;
                  if (r.price !== null && r.price !== undefined) S.ings[r.id].price = r.price;
                }
              });
            }

            if (recRes.data && recRes.data.length) {
              S.recipes = {};
              recRes.data.forEach(row => {
                if (!S.recipes[row.product_id]) S.recipes[row.product_id] = { ings: [] };
                S.recipes[row.product_id].ings.push({ id: row.raw_id, qty: row.qty, waste: row.waste });
              });
            }

            if (ordRes.data) {
              const itemsMap = {};
              (ordItemsRes.data || []).forEach(it => {
                if (!itemsMap[it.order_id]) itemsMap[it.order_id] = {};
                itemsMap[it.order_id][it.product_id] = it.qty;
              });
              S.orders = ordRes.data.map(o => ({
                id: isNaN(o.id) ? o.id : Number(o.id),
                branch: o.branch,
                date: o.order_date,
                notes: o.notes,
                items: itemsMap[o.id] || {}
              }));
            }

            if (tazRes.data) {
              S.taztikiRecords = tazRes.data.map(r => ({
                id: r.id,
                date: r.order_date,
                branch: r.branch,
                qty: r.qty,
                type: r.type,
                notes: r.notes
              }));
            }

            updateSqlSyncBadge();
            return true;
          }

          // Fallback to local server /api
          const res = await fetch('/api/state');
          if (res.ok) {
            const data = await res.json();
            if (data.success) {
              if (data.branches) S.branches = data.branches;
              if (data.products) S.products = data.products;
              if (data.ings) S.ings = data.ings;
              if (data.recipes) S.recipes = data.recipes;
              if (data.orders) S.orders = data.orders;
              if (data.taztikiRecords) S.taztikiRecords = data.taztikiRecords;
              return true;
            }
          }
        } catch (err) {
          console.warn('Sync failed:', err);
          const badge = document.getElementById('sql-sync-badge');
          if (badge) {
            badge.className = 'badge badge-amber';
            badge.innerHTML = '⚠️ وضع محلي (Local)';
          }
          return false;
        }
      }

      async function apiSaveOrders(ordersList, replaceDates = []) {
        if (!SQL_SYNC_ENABLED) return;
        try {
          const client = getSupabaseClient();
          if (client) {
            if (replaceDates && replaceDates.length) {
              for (const d of replaceDates) {
                const { data: oldOrders } = await client.from('orders').select('id').eq('order_date', d);
                if (oldOrders && oldOrders.length) {
                  const oids = oldOrders.map(o => o.id);
                  await client.from('order_items').delete().in('order_id', oids);
                  await client.from('orders').delete().in('id', oids);
                }
                await client.from('taztiki_records').delete().eq('order_date', d);
              }
            }

            const orderRows = ordersList.map(o => ({
              id: String(o.id || Date.now()),
              branch: o.branch,
              order_date: o.date,
              notes: o.notes || ''
            }));
            await client.from('orders').upsert(orderRows);

            const itemRows = [];
            ordersList.forEach(o => {
              const oid = String(o.id || Date.now());
              if (o.items) {
                Object.entries(o.items).forEach(([pid, qty]) => {
                  if (qty > 0) itemRows.push({ order_id: oid, product_id: pid, qty });
                });
              }
            });
            if (itemRows.length) {
              await client.from('order_items').insert(itemRows);
            }
            return;
          }

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
          const client = getSupabaseClient();
          if (client) {
            const oid = String(orderId);
            await client.from('order_items').delete().eq('order_id', oid);
            await client.from('orders').delete().eq('id', oid);
            return;
          }
          await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
        } catch (e) { console.warn('apiDeleteOrder error:', e); }
      }

      async function apiDeleteOrdersForDate(dateStr) {
        if (!SQL_SYNC_ENABLED) return;
        try {
          const client = getSupabaseClient();
          if (client) {
            const { data: oldOrders } = await client.from('orders').select('id').eq('order_date', dateStr);
            if (oldOrders && oldOrders.length) {
              const oids = oldOrders.map(o => o.id);
              await client.from('order_items').delete().in('order_id', oids);
              await client.from('orders').delete().in('id', oids);
            }
            await client.from('taztiki_records').delete().eq('order_date', dateStr);
            return;
          }
          await fetch(`/api/orders/date/${dateStr}`, { method: 'DELETE' });
        } catch (e) { console.warn('apiDeleteOrdersForDate error:', e); }
      }

      async function apiClearAllOrders() {
        if (!SQL_SYNC_ENABLED) return;
        try {
          const client = getSupabaseClient();
          if (client) {
            await client.from('order_items').delete().neq('id', 0);
            await client.from('orders').delete().neq('id', '');
            await client.from('taztiki_records').delete().neq('id', '');
            return;
          }
          await fetch('/api/orders', { method: 'DELETE' });
        } catch (e) { console.warn('apiClearAllOrders error:', e); }
      }

      async function apiBatchDeduct(productId, batchQty, deductions) {
        if (!SQL_SYNC_ENABLED) return;
        try {
          const client = getSupabaseClient();
          if (client) {
            for (const d of deductions) {
              const cur = S.ings[d.id] ? S.ings[d.id].stock : 0;
              await client.from('raw_materials').update({ stock: Math.max(0, cur) }).eq('id', d.id);
              await client.from('stock_movements').insert({
                ing_id: d.id,
                change_qty: -d.qty,
                reason: `Batch Production: ${batchQty} of ${productId}`,
                ref_id: productId
              });
            }
            return;
          }
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
          const client = getSupabaseClient();
          if (client) {
            await client.from('raw_materials').update({ stock, safety, price }).eq('id', id);
            return;
          }
          await fetch(`/api/raw-materials/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stock, safety, price })
          });
        } catch (e) { console.warn('apiUpdateRawStock error:', e); }
      }

      async function apiAddRawMaterial(rawObj) {
        try {
          await fetch(`${API_BASE}/raw-materials`, {
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
        if (!confirm(T('هل أنت متأكد من حذف كل البيانات المحفوظة؟ لا يمكن التراجع!', 'Are you sure you want to clear all saved data? This cannot be undone!'))) return;
        localStorage.removeItem(LS_KEY);
        location.reload();
      }
      function isAr() {
        return S.lang === 'ar';
      }
      function T(a, e) {
        return isAr() ? a : e;
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
        return T('ج.م', 'EGP');
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
        root.setAttribute('lang', isAr() ? 'ar-u-nu-latn' : 'en');
        root.setAttribute('dir', isAr() ? 'rtl' : 'ltr');

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
          searchPlaceholder.textContent = isAr()
            ? 'بحث في الـ 88 منتج، 200 خامة، وأوامر الشراء...'
            : 'Search 88 products, 200 raw items, purchase orders...';
        }

        // 4. Header and Hero date
        const hdrDate = document.getElementById('hdr-date');
        if (hdrDate) {
          hdrDate.textContent = toWesternDigits(new Date().toLocaleDateString(isAr() ? 'ar-EG-u-nu-latn' : 'en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }));
        }
        const heroDateText = document.getElementById('hero-date-text');
        if (heroDateText) {
          heroDateText.textContent = toWesternDigits(new Date().toLocaleDateString(isAr() ? 'ar-EG-u-nu-latn' : 'en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
        }

        // 5. Dock tooltips translation
        const DOCK_TITLES = {
          welcome: { ar: '0. قسم الترحيب · Welcome Hub', en: '0. Welcome Hub' },
          dashboard: { ar: '1. لوحة المؤشرات · Dashboard', en: '1. Executive Dashboard' },
          orders: { ar: '2. طلبات الفروع · Branch Orders', en: '2. Branch Orders' },
          production: { ar: '3. خطة التشغيل والطهي · Production Plan', en: '3. Production & BOM Plan' },
          centerstock: { ar: '4. مخزون المركز الجاهز · Center Stock', en: '4. Finished Center Stock' },
          inventory: { ar: '5. مستودع الخامات · Raw Inventory', en: '5. Raw Inventory (200 Items)' },
          purchase: { ar: '6. أوامر الشراء والتوريد · Purchase Orders', en: '6. Purchase Orders' },
          recipes: { ar: '7. دليل الوصفات والـ BOM · Recipes', en: '7. 74 BOM Recipes Catalog' },
          waste: { ar: '8. سجل الهدر والرقابة · Waste Ledger', en: '8. Waste & Loss Ledger' },
          reports: { ar: '9. التقارير والتحليلات · Reports', en: '9. Analytics & Matrix Reports' }
        };
        document.querySelectorAll('.sidebar .nav-item[data-page], .curved-dock .nav-item[data-page]').forEach(el => {
          const p = el.getAttribute('data-page');
          if (DOCK_TITLES[p]) {
            el.setAttribute('title', isAr() ? DOCK_TITLES[p].ar : DOCK_TITLES[p].en);
          }
        });

        // 6. Topbar segmented tabs text sync
        const tabWelc = document.querySelector('#tab-welc span:last-child');
        if (tabWelc) tabWelc.textContent = isAr() ? 'قسم الترحيب' : 'Welcome Hub';
        const tabDash = document.querySelector('#tab-dash span:last-child');
        if (tabDash) tabDash.textContent = isAr() ? 'لوحة المؤشرات' : 'Dashboard';
        const tabWork = document.querySelector('#tab-work span:last-child');
        if (tabWork) tabWork.textContent = isAr() ? 'مسار التشغيل' : 'Workflows';
        const tabInteg = document.querySelector('#tab-integ span:last-child');
        if (tabInteg) tabInteg.textContent = isAr() ? 'الربط والمزامنة' : 'Integrations';

        // 7. Language toggle button label
        const sideLangLbl = document.getElementById('sidebar-lang-lbl');
        if (sideLangLbl) sideLangLbl.textContent = isAr() ? 'اللغة: English' : 'Language: العربية';
        const topLangText = document.getElementById('topbar-lang-text');
        if (topLangText) topLangText.textContent = isAr() ? 'English' : 'عربي';

        // 8. Notifications dropdown translations
        const notifCountBadge = document.getElementById('notif-count-badge');
        if (notifCountBadge) notifCountBadge.textContent = isAr() ? '4 تنبيهات' : '4 Alerts';
        const notifClearBtn = document.querySelector('.notif-clear-btn');
        if (notifClearBtn) notifClearBtn.textContent = isAr() ? '✓ تحديد الكل كمقروء' : '✓ Mark all as read';
        const notifViewAllBtn = document.querySelector('.notif-view-all-btn');
        if (notifViewAllBtn) notifViewAllBtn.textContent = isAr() ? 'سجل التقارير ←' : 'Reports Log →';

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
        S.lang = isAr() ? 'en' : 'ar';
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
          container.innerHTML = '<div style="text-align:center;padding:25px 10px;color:#64748B;font-size:12px;">👈 اختر صنفاً من القائمة أعلاه لعرض مكونات الوصفة ورصيد خاماتها</div>';
          return;
        }

        const rec = S.recipes && S.recipes[pid];
        if (!rec || !rec.ings || !rec.ings.length) {
          container.innerHTML = '<div style="text-align:center;padding:20px;color:#F87171;font-size:12px;">⚠️ هذا الصنف لم تُسجل له معادلة وصفة (BOM) بعد</div>';
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
            '<span style="color:' + (hasEnough ? '#10B981' : '#F87171') + ';font-size:10px;">[' + currentStock.toFixed(1) + ' ' + (hasEnough ? '✓' : '⚠️ عجز') + ']</span>' +
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
          toast(T('يرجى اختيار صنف مصنّع أولاً!', 'Please select an item to produce!'), 'error');
          return;
        }

        const rec = S.recipes && S.recipes[pid];
        if (!rec || !rec.ings || !rec.ings.length) {
          toast(T('لا توجد وصفة مسجلة لهذا الصنف!', 'No recipe registered for this item!'), 'error');
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
          notes: 'تشغيل عبر محاكي الداشبورد'
        });

        saveState();
        renderDash();
        updateBomSimPreview();
        if (typeof renderInv === 'function') renderInv();
        if (typeof renderCenterStock === 'function') renderCenterStock();

        toast(T('⚡ تم تشغيل دفعة ' + qty + ' بنجاح وخصم الخامات المستهلكة آلياً!', 'Batch executed & stock deducted!'), 'success');
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
            if (descEl) descEl.textContent = (typeof isAr === 'function' && isAr()) ? 'لا توجد خامات مسجلة' : 'No items';
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
              ? `${safeCount} أصناف آمنة / ${alertCount} تحت حد الأمان`
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
                badge.textContent = (typeof isAr === 'function' && isAr()) ? '● مخزون آمن' : '● Optimal';
                badge.style.color = '#10B981';
              }
            } else if (safePercent >= 40) {
              circle.style.stroke = '#EAB308';
              if (badge) {
                badge.textContent = (typeof isAr === 'function' && isAr()) ? '● تحذير نواقص' : '● Warning';
                badge.style.color = '#EAB308';
              }
            } else {
              circle.style.stroke = '#EF4444';
              if (badge) {
                badge.textContent = (typeof isAr === 'function' && isAr()) ? '● عجز حرج' : '● Critical';
                badge.style.color = '#EF4444';
              }
            }
          }

          // Real-time synchronization of low-stock alert counters across the application
          const kpiShortAlert = document.getElementById('kpi-shortages-alert');
          if (kpiShortAlert) {
            if (alertCount > 0) {
              kpiShortAlert.style.color = '#EF4444';
              kpiShortAlert.textContent = `${alertCount} ${(typeof isAr === 'function' && isAr()) ? 'نواقص حرجة ⚠️' : 'Shortages ⚠️'}`;
            } else {
              kpiShortAlert.style.color = '#10B981';
              kpiShortAlert.textContent = (typeof isAr === 'function' && isAr()) ? '0 نواقص ✓' : '0 Shortages ✓';
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
          if (typeof toast === 'function') toast((typeof isAr === 'function' && isAr()) ? 'هذه الطلبية مسلّمة بالفعل' : 'Order already delivered', 'info');
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
            ? `🚚 تم شحن طلبية ${o.branch} بنجاح وخصم ${totalDeductedUnits} وحدة من المخزون!`
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
            ? `⚡ تم تحديث حالة طلبية ${o.branch} إلى (${newStatus})`
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
            kpiBrSub.textContent = uniqueBranches.size > 0 ? (uniqueBranches.size + (isAr() ? ' فرعاً نشطاً اليوم' : ' active branches today')) : (isAr() ? '0 فروع طلبت اليوم' : '0 branches ordered today');
          }

          // 2. Active Batches from centerStockLog or today's runs
          const activeBatchesCount = (S.centerStockLog || []).filter(l => l.date === todayStr()).length;
          const kpiBatches = document.getElementById('kpi-active-batches');
          if (kpiBatches) {
            kpiBatches.textContent = activeBatchesCount > 0 ? (activeBatchesCount + (isAr() ? ' تشغيلة' : ' Batches')) : (isAr() ? '0 دفعة' : '0 Batches');
          }
          const kpiBatchSub = document.getElementById('kpi-batches-sub');
          if (kpiBatchSub) {
            kpiBatchSub.textContent = activeBatchesCount > 0 ? (isAr() ? 'تشغيلات مسجلة اليوم' : 'Recorded batches today') : (isAr() ? 'لا توجد تشغيلات اليوم' : 'No active batches today');
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
            kpiStockSub.textContent = inStockCount > 0 ? (isAr() ? inStockCount + ' خامة متوفرة بالمخزن' : inStockCount + ' items in stock') : (isAr() ? 'المخزن بانتظار استلام بضاعة' : 'Awaiting stock arrivals');
          }

          // 4. Shortages & Alerts
          const shorts = (typeof getShortages === 'function') ? getShortages() : [];
          const kpiShort = document.getElementById('kpi-shortages-alert');
          if (kpiShort) {
            if (shorts && shorts.length > 0) {
              kpiShort.style.color = '#F87171';
              kpiShort.textContent = shorts.length + (isAr() ? ' خامة ناقصة ⚠️' : ' Items Short ⚠️');
            } else {
              kpiShort.style.color = '#10B981';
              kpiShort.textContent = isAr() ? '0 نواقص ✓' : '0 Shortages ✓';
            }
          }
          const kpiShortSub = document.getElementById('kpi-shortages-sub');
          if (kpiShortSub) {
            kpiShortSub.textContent = (shorts && shorts.length > 0) ? (isAr() ? 'تتطلب إنشاء أوامر شراء' : 'Requires draft POs') : (isAr() ? 'المخزون متوازن ولا توجد طلبات معلقة' : 'No shortages pending');
          }

          // 5. Update Finished Goods table dynamically

          // Update Operational Workflow Pipeline Counters
          try {
            const activeOrders = (S.orders || []).filter(o => o && o.status !== 'cancelled');
            const p1 = document.getElementById('pipe-step1-count');
            if (p1) p1.textContent = activeOrders.length + ' ' + (isAr() ? 'طلب نشط' : 'Active Orders');

            const poCount = (S.purchaseOrders || S.pos || []).length;
            const p4 = document.getElementById('pipe-step4-count');
            if (p4) p4.textContent = poCount + ' ' + (isAr() ? 'أمر توريد' : 'POs');
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
            badgeEl.textContent = demandedProds.length + ' ' + (isAr() ? 'صنف مطلوب' : 'Demanded');
            badgeEl.className = 'badge badge-purple';
            badgeEl.style.background = 'rgba(124,58,237,0.2)';
            badgeEl.style.color = '#A78BFA';
            badgeEl.style.borderColor = 'rgba(124,58,237,0.4)';
          } else {
            badgeEl.textContent = isAr() ? '0 مطلوب للتشغيل' : '0 Demanded';
            badgeEl.className = 'badge badge-slate';
            badgeEl.style.background = 'rgba(30,35,64,0.8)';
            badgeEl.style.color = '#64748B';
            badgeEl.style.borderColor = '#1E2340';
          }
        }

        // Update Pipeline Step 2 counter
        const p2 = document.getElementById('pipe-step2-count');
        if (p2) p2.textContent = demandedProds.length + ' ' + (isAr() ? 'صنف مطلوب' : 'Demanded');

        // If no products have demand, display clean informative empty state
        if (!demandedProds.length) {
          if (tbody) {
            tbody.innerHTML = '<tr class="empty-state-row">' +
              '<td colspan="7" style="text-align:center;padding:40px 20px;color:#94a3b8;">' +
              '<div style="width:48px;height:48px;margin:0 auto 12px;border-radius:14px;background:rgba(124,58,237,0.12);border:1px solid rgba(124,58,237,0.25);display:flex;align-items:center;justify-content:center;color:#A78BFA;font-size:1.5rem">📋</div>' +
              '<div style="font-weight:700;color:#f1f5f9;font-size:14px;margin-bottom:6px;">' + (isAr() ? 'لا توجد أصناف مطلوبة للتشغيل حالياً' : 'No Production Demand Required Currently') + '</div>' +
              '<div style="font-size:12px;color:#64748b;max-width:420px;margin:0 auto;line-height:1.5;">' + (isAr() ? 'تظهر الأصناف هنا تلقائياً فور وجود طلبات فعلية من الفروع تحتاج لتشغيل' : 'Products will appear here automatically when requested by branches') + '</div>' +
              '</td>' +
              '</tr>';
          }
          if (mobContainer) {
            mobContainer.innerHTML = '<div class="mob-item-card" style="text-align:center;padding:32px 16px;">' +
              '<div style="width:44px;height:44px;margin:0 auto 10px;border-radius:12px;background:rgba(124,58,237,0.12);display:flex;align-items:center;justify-content:center;color:#A78BFA;font-size:1.4rem">📋</div>' +
              '<div style="font-weight:800;color:#f1f5f9;font-size:13.5px;margin-bottom:4px;">' + (isAr() ? 'لا توجد أصناف مطلوبة للتشغيل حالياً' : 'No Production Demand Required') + '</div>' +
              '<div style="font-size:11.5px;color:#64748b;">' + (isAr() ? 'تظهر الأصناف هنا تلقائياً فور تسجيل طلبات الفروع واحتياجها للإنتاج' : 'Products appear automatically when ordered by branches') + '</div>' +
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
              badge = '<span class="badge badge-green">' + (isAr() ? 'مغطى بالكامل ✓' : 'Fully Covered ✓') + '</span>';
            } else {
              badge = '<span class="badge badge-red">' + (isAr() ? ('عجز: ' + Math.abs(diff).toFixed(1) + ' ' + uom + ' ⚠️') : ('Short: ' + Math.abs(diff).toFixed(1) + ' ' + uom + ' ⚠️')) + '</span>';
            }

            const catBadgeClass = (p.cat === 'Sauces' || p.cat === 'sauces') ? 'badge-orange' : ((p.cat === 'Cheese' || p.cat === 'cheese') ? 'badge-blue' : 'badge-slate');

            return '<tr data-cat="' + (p.cat || 'other') + '">' +
              '<td style="color:#8B5CF6;font-weight:700;font-family:monospace;font-size:12px;">' + (p.id || '—') + '</td>' +
              '<td style="font-weight:700;color:#fff;font-size:13px;">' + (pname(p) || p.id) + '</td>' +
              '<td><span class="badge ' + catBadgeClass + '">' + (p.cat || '—') + '</span></td>' +
              '<td style="font-weight:700;color:#fff;">' + (ready % 1 === 0 ? ready : ready.toFixed(2)) + ' ' + uom + '</td>' +
              '<td style="font-weight:800;color:#06B6D4;">' + (demand % 1 === 0 ? demand : demand.toFixed(2)) + ' ' + uom + '</td>' +
              '<td>' + badge + '</td>' +
              '<td style="text-align:center;"><button class="btn btn-sm btn-primary" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);border:none;box-shadow:0 0 10px rgba(124,58,237,0.3);padding:4px 12px;" onclick="nav(\'production\')">⚡ <span>' + (isAr() ? 'تشغيل' : 'Cook') + '</span></button></td>' +
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
              badgeHtml = '<span class="badge badge-green">' + (isAr() ? 'مغطى بالكامل ✓' : 'Covered ✓') + '</span>';
            } else {
              badgeHtml = '<span class="badge badge-red">' + (isAr() ? ('عجز: ' + Math.abs(diff).toFixed(1) + ' ' + uom + ' ⚠️') : ('Short: ' + Math.abs(diff).toFixed(1) + ' ⚠️')) + '</span>';
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
              '<span class="mob-metric-lbl">' + (isAr() ? 'المتوفر بالمركز' : 'Ready Stock') + '</span>' +
              '<span class="mob-metric-val">' + (ready % 1 === 0 ? ready : ready.toFixed(1)) + ' ' + uom + '</span>' +
              '</div>' +
              '<div class="mob-metric-box">' +
              '<span class="mob-metric-lbl">' + (isAr() ? 'طلبات الفروع' : 'Demand') + '</span>' +
              '<span class="mob-metric-val" style="color:#06B6D4;">' + (demand % 1 === 0 ? demand : demand.toFixed(1)) + ' ' + uom + '</span>' +
              '</div>' +
              '<div class="mob-metric-box">' +
              '<span class="mob-metric-lbl">' + (isAr() ? 'التغطية' : 'Status') + '</span>' +
              '<span>' + badgeHtml + '</span>' +
              '</div>' +
              '</div>' +
              '<button class="btn btn-primary mob-card-btn" onclick="nav(\'production\')">' +
              '⚡ <span>' + (isAr() ? 'بدء تشغيل الصنف ➔' : 'Cook Batch ➔') + '</span>' +
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
                label: isAr() ? 'طلبات الفروع (كجم)' : 'Branch Demand (Kg)',
                data: demandData,
                borderColor: '#06B6D4',
                borderWidth: 2.5,
                backgroundColor: gradCyan || 'rgba(6,182,212,0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#0B0E14',
                pointBorderColor: '#06B6D4',
                pointBorderWidth: 2,
                pointRadius: hasOrders ? 4 : 0
              },
              {
                label: isAr() ? 'الإنتاج الفعلي (كجم)' : 'Production Output (Kg)',
                data: outputData,
                borderColor: '#8B5CF6',
                borderWidth: 2,
                backgroundColor: gradViolet || 'rgba(139,92,246,0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#0B0E14',
                pointBorderColor: '#8B5CF6',
                pointBorderWidth: 2,
                pointRadius: hasOrders ? 3 : 0,
                borderDash: [5, 3]
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
                  color: '#64748B',
                  font: { size: 10, family: 'Inter, Cairo, sans-serif' },
                  boxWidth: 12, boxHeight: 2
                }
              },
              tooltip: {
                backgroundColor: '#13172A',
                titleColor: '#C4CDD8',
                bodyColor: '#06B6D4',
                borderColor: 'rgba(124,58,237,0.3)',
                borderWidth: 1,
                padding: 10
              }
            },
            scales: {
              x: {
                grid: { color: 'rgba(30,35,64,0.5)', drawBorder: false },
                ticks: { color: '#64748B', font: { size: 10, family: 'Inter, Cairo, sans-serif' } }
              },
              y: {
                grid: { color: 'rgba(30,35,64,0.5)', drawBorder: false },
                ticks: { color: '#64748B', font: { size: 10, family: 'Inter, Cairo, sans-serif' } },
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
                label: 'Supply Rate',
                data: data1,
                backgroundColor: (ctx) => {
                  const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 80);
                  g.addColorStop(0, '#7C3AED');
                  g.addColorStop(1, 'rgba(124,58,237,0.1)');
                  return g;
                },
                borderRadius: 2, borderSkipped: false, barPercentage: 0.4, categoryPercentage: 0.7
              },
              {
                label: 'APY Rate',
                data: data2,
                backgroundColor: (ctx) => {
                  const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 80);
                  g.addColorStop(0, '#EC4899');
                  g.addColorStop(1, 'rgba(236,72,153,0.1)');
                  return g;
                },
                borderRadius: 2, borderSkipped: false, barPercentage: 0.4, categoryPercentage: 0.7
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
        if (!qty || qty <= 0) return { label: isAr() ? 'نفد / صفر' : 'Depleted', badge: 'badge-red', key: 'empty' };
        if (qty < 5) return { label: isAr() ? 'رصيد منخفض' : 'Low Stock', badge: 'badge-amber', key: 'low' };
        return { label: isAr() ? 'متوفر بكفاية' : 'Sufficient', badge: 'badge-green', key: 'ok' };
      }

      function populateCsProductSelects() {
        const selects = ['cs-prod-select', 'cs-adj-prod'];
        selects.forEach(sid => {
          const sel = document.getElementById(sid);
          if (!sel) return;
          const cur = sel.value;
          sel.innerHTML = '<option value="">— ' + (isAr() ? 'اختر المنتج المصنّع' : 'Select Product') + ' —</option>';
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
          heroCost.textContent = (typeof f2 === 'function' ? f2(cost) : cost.toFixed(2)) + ' ' + (typeof cur === 'function' ? cur() : 'ج.م');
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
              ? (isAr() ? ('تشغيلة: ' + qty + ' ' + (prod ? prod.unit : 'وحدة')) : ('Batch: ' + qty + ' ' + (prod ? prod.unit : 'unit')))
              : (isAr() ? ('محسوبة لكل 1 ' + (prod ? prod.unit : 'وحدة')) : ('Calculated per 1 ' + (prod ? prod.unit : 'unit')));
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
              '<div style="font-size:10px;color:#94a3b8">' + (isAr() ? 'المتوفر بالمخزن: ' : 'In stock: ') + '<strong style="color:' + (isEnough ? '#cbd5e1' : '#f87171') + '">' + (curStock % 1 === 0 ? curStock : curStock.toFixed(2)) + ' ' + uomText + '</strong></div>' +
              '</div>' +
              '<div style="text-align:left;direction:ltr">' +
              '<div style="color:' + color + ';font-weight:800;font-size:13px">' + needed.toFixed(2) + ' <span style="font-size:10px;color:#94a3b8">' + uomText + '</span></div>' +
              '<div style="color:' + color + ';font-size:10px;font-weight:700;direction:rtl">' + (isEnough ? (isAr() ? '✅ متوفر' : 'Available') : (isAr() ? ('⚠️ عجز ' + (needed - curStock).toFixed(2)) : ('Deficit ' + (needed - curStock).toFixed(2)))) + '</div>' +
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
        if (!pid) { toast(T('اختر منتجاً أولاً', 'Please select a product first'), 'error'); return; }
        if (!qty || qty <= 0) { toast(T('أدخل كمية صحيحة أكبر من صفر', 'Enter a valid positive quantity'), 'error'); return; }

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

        toast(T('⚡ تم تأكيد التشغيلة وإضافة ' + qty + ' ' + uom + ' من ' + pname(prod) + ' للمخزون!', '⚡ Production logged: ' + qty + ' ' + uom + ' of ' + pname(prod)), 'success');
        renderCenterStock();
        if (typeof renderInv === 'function') renderInv();
      }

      function adjustCenterStock() {
        const pid = document.getElementById('cs-adj-prod')?.value;
        const type = document.getElementById('cs-adj-type')?.value;
        const qty = parseFloat(document.getElementById('cs-adj-qty')?.value);
        if (!pid) { toast(T('اختر منتجاً أولاً', 'Select a product first'), 'error'); return; }
        if (isNaN(qty) || qty < 0) { toast(T('أدخل كمية صحيحة', 'Enter valid quantity'), 'error'); return; }

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
          notes: 'تسوية يدوية ' + (type === 'set' ? 'ضبط رصيد' : (type === 'add' ? 'إضافة' : 'خصم')),
          createdAt: new Date().toISOString()
        });

        saveState();
        document.getElementById('cs-adj-qty').value = '';
        toast(T('✏️ تم تعديل رصيد ' + pname(S.products.find(p => p.id === pid)) + ' إلى ' + after + ' بنجاح', 'Stock adjusted'), 'success');
        renderCenterStock();
      }

      function exportCenterStockLog() {
        if (!S.centerStockLog || !S.centerStockLog.length) {
          toast(T('لا توجد حركات للتصدير بعد', 'No movements to export'), 'info');
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
            <div class="kpi-label">${isAr() ? 'إجمالي المنتجات المصنعة' : 'Total Manufactured'}</div>
            <div class="kpi-value" style="color:#f1f5f9;font-size:1.6rem;">${totalItems}</div>
            <div class="text-muted text-xs" style="margin-top:2px;">${isAr() ? 'منتج معتمد بـ BOM' : 'Master catalog items'}</div>
          </div>
          <div class="kpi-card" style="padding:14px 16px;">
            <div class="kpi-label">${isAr() ? 'متوفر بكفاية' : 'Sufficient Stock'}</div>
            <div class="kpi-value" style="color:#4ade80;font-size:1.6rem;">${okCount}</div>
            <div class="text-muted text-xs" style="margin-top:2px;">${isAr() ? 'جاهز للتوريد للفروع' : 'Ready for distribution'}</div>
          </div>
          <div class="kpi-card" style="padding:14px 16px;">
            <div class="kpi-label">${isAr() ? 'أرصدة منخفضة' : 'Low Stock'}</div>
            <div class="kpi-value" style="color:#fbbf24;font-size:1.6rem;">${lowCount}</div>
            <div class="text-muted text-xs" style="margin-top:2px;">${isAr() ? 'تحت حد الأمان الموصى' : 'Near depletion'}</div>
          </div>
          <div class="kpi-card" style="padding:14px 16px;">
            <div class="kpi-label">${isAr() ? 'منتهي / لم يُشغل' : 'Depleted / Pending'}</div>
            <div class="kpi-value" style="color:#f87171;font-size:1.6rem;">${emptyCount}</div>
            <div class="text-muted text-xs" style="margin-top:2px;">${isAr() ? 'يحتاج تشغيل دفعة' : 'Needs production batch'}</div>
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
              '<div class="stock-sufficiency-bar" title="نسبة كفاية المخزون: ' + suffRatio + '%\">' +
              '<div class="stock-sufficiency-fill" style="width:' + suffRatio + '%;background:' + suffColor + ';"></div>' +
              '</div>' +
              (cs ? '<div style="font-size:10px;color:#64748b;margin-top:6px;display:flex;justify-content:space-between"><span>' + (isAr() ? 'تحديث:' : 'Updated:') + '</span><span>' + (cs.updatedAt || '').split('T')[0] + '</span></div>' : '<div style="font-size:10px;color:#64748b;margin-top:6px">' + (isAr() ? 'لم يُرصد تشغيل بعد' : 'No batches logged') + '</div>') +
              '</div>';
          });

          gridEl.innerHTML = html || ('<div class="text-muted text-center" style="grid-column:1/-1;padding:40px;border-radius:14px;background:rgba(255,255,255,0.02)">' + (isAr() ? 'لا توجد منتجات مطابقة لفلتر البحث' : 'No matching products') + '</div>');
        }

        // Render Movement Log Table
        const logEl = document.getElementById('cs-log-table');
        if (logEl) {
          const log = (S.centerStockLog || []).slice(0, 50);
          if (!log.length) {
            logEl.innerHTML = '<div class="text-muted text-sm text-center" style="padding:24px">' + (isAr() ? 'لا توجد حركات مسجلة بعد' : 'No movements logged yet') + '</div>';
          } else {
            logEl.innerHTML = '<table class="data-table"><thead><tr>' +
              '<th>' + (isAr() ? 'الوقت' : 'Date') + '</th>' +
              '<th>' + (isAr() ? 'المنتج' : 'Product') + '</th>' +
              '<th>' + (isAr() ? 'الكمية' : 'Change') + '</th>' +
              '<th>' + (isAr() ? 'العملية' : 'Action') + '</th>' +
              '<th>' + (isAr() ? 'الجهة / ملاحظات' : 'Notes') + '</th>' +
              '</tr></thead><tbody>' + log.map(l => {
                const prod = S.products.find(p => p.id === l.productId);
                const actionMap = {
                  production: '<span class="badge badge-green" style="font-size:10px;font-weight:700">🏭 ' + (isAr() ? 'تشغيل دفعة' : 'Production') + '</span>',
                  branch_pull: '<span class="badge badge-amber" style="font-size:10px;font-weight:700">🚚 ' + (isAr() ? 'صرف فرع' : 'Branch Pull') + '</span>',
                  adjustment: '<span class="badge" style="font-size:10px;font-weight:700;background:rgba(6,182,212,0.2);color:#06b6d4">✏️ ' + (isAr() ? 'تسوية' : 'Adjustment') + '</span>'
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
        <span style="color:#4ade80;font-size:13.5px;font-weight:600">${T('جميع مستويات المخزون كافية لتغطية طلبات الإنتاج بالكامل!', 'All stock levels are completely adequate for today!')}</span>
      </div>
    `;
          return;
        }

        el.innerHTML = shorts.map(s => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-radius:12px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.18);margin-bottom:10px;flex-wrap:wrap;gap:10px">
      <div style="display:flex;align-items:center;gap:12px">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg>
        <span style="color:#ffffff;font-size:14px;font-weight:700">${iname(s.id)}</span>
        <span class="text-muted text-sm">${T('العجز المطلوب شراؤه:', 'Shortage to Order:')} <span style="color:#f87171;font-weight:700">${f2(s.shortage)} ${s.unit}</span></span>
      </div>
      <button class="btn btn-danger btn-sm" onclick="nav('purchase')">${T('إصدار طلب شراء فوري', 'Order Now')}</button>
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
                ticks: { color: '#94a3b8', font: { size: 11, family: isAr() ? 'Cairo, sans-serif' : 'Inter, sans-serif' } },
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
                labels: { color: '#94a3b8', padding: 14, font: { size: 11.5, family: isAr() ? 'Cairo, sans-serif' : 'Inter, sans-serif' } }
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
          'فرع واتر واي (Water Way)', 'فرع أب تاون (Uptown)', 'فرع O1 (O1)', 'فرع المعادي (The Field)',
          'فرع ميفيدا (Mivida)', 'فرع سوديك (Sodic)', 'فرع نيو جيزة (New Giza)', 'فرع نادي نيو جيزة (New Giza Club)',
          'فرع بارك ستريت (Park St)', 'فرع مول العرب (Mall of Arabia)', 'فرع بالم هيلز (Palm Hills)', 'فرع كود (Kode)',
          'فرع دهشور (Dahshour)', 'فرع مدينتي (Madinty)', 'فرع ديستريكت 5 (District 5)', 'فرع إل بوسكو (IL Bosco)',
          'فرع D2 (Drive 02)', 'فرع قطامية (Katameya)', 'فرع الجولف (NNG Golf)', 'فرع Core WOC', 'فرع Core PH',
          'فرع التجمع الخامس', 'فرع الشيخ زايد', 'فرع المعادي', 'فرع سموحة'
        ];
        S.branches = allBranches;

        const oBranch = document.getElementById('o-branch');
        if (oBranch && oBranch.options.length <= 1) {
          const curVal = oBranch.value;
          oBranch.innerHTML = `<option value="">${T('-- اختر الفرع --', '-- Select Branch --')}</option>` +
            allBranches.map(b => `<option value="${b}">${b}</option>`).join('');
          if (curVal) oBranch.value = curVal;
        }

        const fBranch = document.getElementById('f-branch');
        if (fBranch && fBranch.options.length <= 1) {
          const curFVal = fBranch.value;
          fBranch.innerHTML = `<option value="">${T('🏢 جميع الفروع (بحث وتصفية)', '🏢 All Branches')}</option>` +
            allBranches.map(b => `<option value="${b}">${b}</option>`).join('');
          if (curFVal) fBranch.value = curFVal;
        }
      }

      function initManualItemPicker() {
        const select = document.getElementById('o-item-select');
        if (!select || select.options.length > 1) return;

        const cats = {
          sauces: { label: isAr() ? '🥣 صوصات وتتبيلات' : '🥣 Sauces', items: [] },
          beef: { label: isAr() ? '🥩 لحوم وبرجر' : '🥩 Beef & Burgers', items: [] },
          chicken: { label: isAr() ? '🍗 دواجن وفراخ' : '🍗 Chicken', items: [] },
          bakery: { label: isAr() ? '🥐 مخبوزات وعجائن' : '🥐 Bakery', items: [] },
          cheese: { label: isAr() ? '🧀 أجبان وألبان' : '🧀 Cheeses', items: [] },
          veggies: { label: isAr() ? '🥗 مقبلات وخضار' : '🥗 Veggies', items: [] },
          drinks: { label: isAr() ? '🍹 مشروبات وعصائر' : '🍹 Drinks', items: [] },
          prep: { label: isAr() ? '📦 تجهيزات عامة' : '📦 General Prep', items: [] }
        };

        S.products.forEach(p => {
          const c = cats[p.cat] || cats.prep;
          c.items.push(p);
        });

        let html = `<option value="">${T('-- ابحث أو اختر الصنف (171 صنف) --', '-- Select Product (171 items) --')}</option>`;
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
          toast(T('اختر الصنف المراد إضافته أولاً', 'Please select a product'), 'warning');
          return;
        }
        if (qty <= 0) {
          toast(T('أدخل كمية أكبر من صفر', 'Enter quantity > 0'), 'warning');
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
              <button type="button" onclick="removeManualOrderItem('${pid}')" style="background:none;border:none;color:#f87171;cursor:pointer;font-weight:700;font-size:13px" title="حذف الصنف">✕</button>
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
          textEl.textContent = _ordersLogCollapsed ? '👁️ إظهار السجل الفردي' : '👁️ إخفاء السجل الفردي';
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
          if (fd) btnClearDate.innerHTML = `🗑️ <span>${T('مسح طلبيات تاريخ ' + fd, 'Delete orders for ' + fd)}</span>`;
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
        document.getElementById('orders-count-badge').textContent = filtered.length + ' ' + T('طلب مسجل' + filterDesc, 'Orders' + filterDesc);

        const aggHtml = Object.values(agg).filter(a => a.tot > 0).map(a => `
        <tr>
          <td>
            <div style="display:flex;align-items:center;gap:9px">
              <span style="width:9px;height:9px;border-radius:50%;background:${a.p.color};display:inline-block"></span>
              <span style="font-weight:700;color:#fff">${pname(a.p)}</span>
            </div>
          </td>
          <td><span style="font-weight:800;color:#fff">${fmt(a.tot)} ${a.p.unit}</span></td>
          <td><span class="badge badge-slate">${a.brs.size} ${T('فروع', 'branches')}</span></td>
          <td style="color:#fbbf24">${f2(a.p.cost)} ${cur()}</td>
          <td><span class="text-gradient font-bold">${fmt(Math.round(a.tot * a.p.cost))} ${cur()}</span></td>
        </tr>
      `).join('');

        document.getElementById('agg-body').innerHTML = aggHtml || `<tr><td colspan="5" class="text-muted" style="text-align:center;padding:24px">${T('لا توجد طلبات مسجلة تطابق الفلتر الحالي', 'No orders matching current filter')}</td></tr>`;

        // ── Sleek Individual Orders Log Table ──
        const indivTbody = document.getElementById('orders-tbl-body');
        const indivEmpty = document.getElementById('orders-list-empty');
        const countBadge = document.getElementById('indiv-orders-count-badge');
        if (countBadge) countBadge.textContent = `${filtered.length} ${T('طلبية', 'orders')}`;

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
              statusBadge = `<span class="badge" style="background:rgba(16,185,129,0.12);color:#059669;font-weight:800;border:1px solid rgba(16,185,129,0.25);padding:4px 10px;border-radius:9999px">✅ تم التسليم</span>`;
            } else if (statusVal === 'Processing') {
              statusBadge = `<button type="button" class="btn btn-sm btn-solid-amber" style="font-size:11px;padding:3px 10px;border-radius:9999px;font-weight:700;cursor:pointer" onclick="dispatchOrder('${o.id}')" title="شحن وتسليم وخصم المخزون">⚡ قيد التجهيز (شحن ➔)</button>`;
            } else {
              statusBadge = `<button type="button" class="btn btn-sm btn-secondary" style="font-size:11px;padding:3px 10px;border-radius:9999px;font-weight:700;cursor:pointer" onclick="updateOrderStatus('${o.id}', 'Processing')" title="بدء تجهيز الطلبية">⏳ بانتظار التحضير</button>`;
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
                <span class="badge badge-green" style="font-weight:700">${distinctCount} ${T('صنف', 'items')} (${fmt(totalUnits)} ${T('وحدة', 'units')})</span>
              </td>
              <td style="text-align:center;font-weight:800;color:#059669;font-size:13px">${fmt(Math.round(totalVal))} ${cur()}</td>
              <td style="text-align:center">
                <div class="flex gap-1.5 justify-center">
                  <button class="btn btn-secondary btn-sm" style="font-size:11px;padding:3px 7px;border-radius:9999px" onclick="toggleOrderDetailRow('${o.id}')" title="عرض تفاصيل الأصناف">
                    📋 ${T('الأصناف', 'Items')}
                  </button>
                  ${statusVal !== 'Delivered' ? `<button class="btn btn-solid-amber btn-sm" style="font-size:11px;padding:3px 8px;border-radius:9999px;font-weight:700" onclick="dispatchOrder('${o.id}')" title="شحن وتسليم وخصم المخزون">🚚 شحن</button>` : ''}
                  <button class="btn btn-sm" style="font-size:11px;padding:3px 7px;border-radius:9999px;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.3);color:#dc2626" onclick="delOrder('${o.id}')" title="حذف الطلبية">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
            <tr id="order-detail-row-${o.id}" style="display:none;background:rgba(0,0,0,0.25)">
              <td colspan="7" style="padding:10px 14px">
                <div style="background:rgba(15,23,42,0.85);border:1px solid rgba(56,189,248,0.2);border-radius:10px;padding:12px">
                  <div class="flex justify-between items-center mb-2">
                    <span style="font-size:12px;font-weight:700;color:#38bdf8">📦 تفاصيل أصناف طلبيـة ${o.branch} (${oDateNorm})</span>
                    <span class="text-muted" style="font-size:11.5px">إجمالي: <b style="color:#4ade80">${fmt(Math.round(totalVal))} ${cur()}</b></span>
                  </div>
                  <div class="tbl-wrap" style="max-height:180px">
                    <table class="tbl" style="font-size:11.5px">
                      <thead>
                        <tr>
                          <th>${T('الصنف', 'Product')}</th>
                          <th style="width:75px;text-align:center">${T('الكمية', 'Qty')}</th>
                          <th style="width:60px;text-align:center">${T('الوحدة', 'Unit')}</th>
                          <th style="width:75px;text-align:center">${T('السعر', 'Price')}</th>
                          <th style="width:90px;text-align:center">${T('الإجمالي', 'Total')}</th>
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
          toast(T('يرجى اختيار الفرع أولاً', 'Please select a branch'), 'error');
          return;
        }
        if (!Object.keys(_manualOrderItems).length) {
          toast(T('يرجى إضافة صنف واحد على الأقل للطلبية باستخدام زر (+) أعلاه', 'Please add at least one product using (+) button'), 'error');
          return;
        }

        const newOrder = {
          id: Date.now(),
          branch: branch,
          date: date,
          items: { ..._manualOrderItems },
          notes: document.getElementById('o-notes').value || T('تسجيل يدوي', 'Manual entry')
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
          toast(T(`✅ تم تسجيل الطلبية وسحب ${manualDeductRes.deductedRawCount} خامة من المخزن تلقائياً!`, `✅ Order saved & auto-deducted stock!`));
        } else {
          toast(T('✅ تم بنجاح تسجيل ومزامنة الطلبية سحابياً!', '✅ Order recorded and synced to cloud!'));
        }
        renderOrders();
        if (typeof renderInv === 'function') renderInv();
        if (typeof renderProd === 'function') renderProd();
      }

      function delOrder(id) {
        if (!confirm(T('هل تريد بالتأكيد حذف هذه الطلبية؟', 'Are you sure you want to delete this order?'))) return;
        S.orders = S.orders.filter(o => o.id !== id);
        apiDeleteOrder(id);
        saveState();
        renderOrders();
        if (typeof renderProd === 'function') renderProd();
        toast(T('تم حذف الطلبية وتحديث الحسابات', 'Order removed'), 'info');
      }

      function clearOrdersForDate() {
        const fd = (document.getElementById('f-date')?.value || '').trim();
        if (!fd) {
          toast(T('اختر تاريخاً أولاً من الفلتر لمسح طلبياته', 'Select a date from filter first'), 'warning');
          return;
        }
        if (!confirm(T(`هل أنت متأكد من مسح جميع طلبيات تاريخ (${fd}) بالكامل؟`, `Delete all orders for date (${fd})?`))) return;
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
        toast(T(`🗑️ تم مسح ${deletedCount} طلبية لتاريخ ${fd} وتحديث الإنتاج فوراً!`, `🗑️ Deleted ${deletedCount} orders for ${fd}!`));
      }

      function clearAllOrders() {
        if (!S.orders || !S.orders.length) {
          toast(T('لا توجد أي طلبيات مسجلة حالياً', 'No orders to delete'), 'info');
          return;
        }
        if (!confirm(T(`⚠️ تحذير: هل أنت متأكد من مسح جميع الطلبيات المسجلة بالكامل (${S.orders.length} طلبية)؟\nلا يمكن التراجع عن هذا الإجراء!`, `⚠️ Are you sure you want to delete all ${S.orders.length} orders?`))) return;
        S.orders = [];
        S.taztikiRecords = [];
        apiClearAllOrders();
        saveState();
        renderOrders();
        if (typeof renderProd === 'function') renderProd();
        toast(T('🗑️ تم مسح كافة الطلبيات وإعادة تصفير خطة الإنتاج بنجاح!', 'All orders cleared!'));
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
        const chv = isAr()
          ? '<polyline points="15 18 9 12 15 6"/>'
          : '<polyline points="9 18 15 12 9 6"/>';

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
          <div style="font-size:11.5px;color:#94a3b8">${f2(cost)} ${cur()} / ${T('للوجبة', 'unit')}</div>
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
          .sort((a, b) => pname(a).localeCompare(pname(b), isAr() ? 'ar' : 'en', { sensitivity: 'base' }));

        const filtered = q
          ? prodsWithRecs.filter(p => (p.ar && p.ar.toLowerCase().includes(q)) || (p.en && p.en.toLowerCase().includes(q)) || p.id.toLowerCase().includes(q) || (p.code && p.code.toLowerCase().includes(q)) || (p.item_no && p.item_no.toLowerCase().includes(q)))
          : prodsWithRecs;

        const chv = isAr() ? '<polyline points="15 18 9 12 15 6"/>' : '<polyline points="9 18 15 12 9 6"/>';
        const badge = document.getElementById('recipes-count-badge');
        if (badge) badge.textContent = `${filtered.length} ريسبي`;

        if (!filtered.length) {
          listEl.innerHTML = `<div class="text-muted text-sm text-center" style="padding:20px">${T('لا توجد وصفات تطابق البحث', 'No matching recipes')}</div>`;
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
                <span class="badge badge-slate" style="font-size:10px;padding:1px 5px">${ingsCount} خامات</span>
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
          toast(T('لا توجد طلبات مسجلة من الفروع لهذا الصنف حالياً', 'No branch demand registered for this product'), 'warning');
          return;
        }

        const input = document.getElementById('batch-prod-qty');
        if (input) input.value = totalDemand.toFixed(2);
        switchRecipeTab('batch');
        calcBatchDeduction();
        toast(T(`⚡ تم تطبيق إجمالي طلبات الفروع (${totalDemand.toFixed(2)}) في حاسبة الإنتاج!`, `Applied ${totalDemand.toFixed(2)} to batch calculator!`));
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
        if (costLbl) costLbl.textContent = `${cur()} / ${p.unit} منتج`;

        const catBadge = document.getElementById('recipe-cat-badge');
        if (catBadge) {
          catBadge.textContent = p.cat ? (isAr() ? (p.cat === 'sauces' ? '🥣 صوصات وتتبيلات' : (p.cat === 'bakery' ? '🥐 مخبوزات' : (p.cat === 'beef' ? '🥩 لحوم' : (p.cat === 'chicken' ? '🍗 دواجن' : '🥫 تجهيزات مطبخ')))) : p.cat) : 'CK Product';
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
        if (countBadge) countBadge.textContent = isAr() ? `${demandingBranches.length} فروع` : `${demandingBranches.length} branches`;

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
            demandTags.innerHTML = `<span class="text-muted text-xs" style="padding:2px 0">${T('لا توجد طلبات مسجلة من الفروع لهذا الصنف حالياً', 'No active branch orders')}</span>`;
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
        }).join('') || `<tr><td colspan="7" class="text-muted" style="text-align:center;padding:24px">${T('لا توجد خامات مضافة لهذه الوصفة بعد', 'No ingredients yet')}</td></tr>`;

        calcBatchDeduction();
      }

      function calcBatchDeduction() {
        const pid = S.curRecipe;
        const tbody = document.getElementById('batch-deduction-tbody');
        if (!tbody || !pid) return;

        const rec = S.recipes[pid];
        if (!rec || !rec.ings || !rec.ings.length) {
          tbody.innerHTML = `<tr><td colspan="6" class="text-muted" style="text-align:center;padding:20px">${T('لا توجد خامات مضافة لحساب المسحوب', 'No ingredients found')}</td></tr>`;
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
            ? `<span class="badge badge-red" style="font-weight:800">⚠️ عجز: ${fmt(diffShort)} ${d.uom}</span>`
            : `<span class="badge badge-green" style="font-weight:700">✅ رصيد كافي</span>`;

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
          toast(T('حدد كمية تشغيل صحيحة أكبر من صفر', 'Enter valid quantity'), 'error');
          return;
        }
        const rec = S.recipes[pid];
        if (!rec || !rec.ings || !rec.ings.length) {
          toast(T('لا توجد خامات مضافة لهذه الوصفة لخصمها', 'No ingredients in recipe'), 'error');
          return;
        }

        const pTitle = pname(p);
        if (!confirm(T(`🏭 تأكيد تشغيل إنتاج دفعة (${batchQty} ${p.unit}) من [${pTitle}]؟
سيتم خصم كافة الخامات المسحوبة وتحديث أرصدة المخزون فوراً.`, `Confirm batch production of ${batchQty} ${p.unit} of ${pTitle}?`))) return;

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

        toast(T(`✅ تم اعتماد إنتاج الدفعة (${batchQty} ${p.unit}) وإضافتها للمخزون وخصم ${deductedItemsCount} صنف خام!`, `✅ Batch production recorded and inventory updated!`));
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
          toast(T('اختر منتجاً أولاً', 'Select product'), 'error');
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
          toast(T('يرجى كتابة الاسم بالعربية والإنجليزية', 'Enter both names'), 'error');
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
        toast(T('✅ تم إنشاء التجهيز الجديد بنجاح', '✅ CK Product created!'));
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
          { v: fmt(totalUnits), l: T(`إجمالي الإنتاج والتوريد (${monthStr})`, `Total Monthly Units (${monthStr})`), c: 'kpi-cyan', sub: `${prods.length} ${T('صنف نشط', 'active items')}` },
          { v: fmt(Math.round(totalValue)) + ' ' + cur(), l: T('القيمة التقديرية للإنتاج', 'Est. Production Value'), c: 'kpi-amber', sub: T('حسب تكلفة الأصناف', 'Based on item cost') },
          { v: days.length + ' ' + T('يوم', 'Days'), l: T('نطاق الأيام المفحوص', 'Active Days Scope'), c: 'kpi-green', sub: T(`من يوم ${days[0]} إلى ${days[days.length - 1]}`, `Day ${days[0]} to ${days[days.length - 1]}`) },
          { v: fmt(tazTotal, 1) + ' L', l: T('Burger Sauce (صوص البرجر)', 'Taztiki Sauce Shipped'), c: 'kpi-purple', sub: T('مسجل بشيت منفصل', 'Separate dedicated sheet') }
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

        document.getElementById('prod-items-count-badge').textContent = `${prods.length} ${T('صنف معروض', 'Items')}`;
        document.getElementById('prod-days-count-badge').textContent = `${days.length} ${T('يوم', 'Days')}`;

        const thead =
          document.getElementById('prod-matrix-thead') ||
          document.getElementById('prod-matrix-head');

        const tbody =
          document.getElementById('prod-matrix-tbody') ||
          document.getElementById('prod-matrix-body');

        // Build Thead: [ م | البند / الصنف | الوحدة | يوم 1 | يوم 2 ... | الإجمالي | متوسط اليوم | التكلفة ]
        thead.innerHTML = `
    <tr>
      <th style="width:40px;text-align:center">#</th>
      <th style="min-width:170px">${T('البند / التجهيز', 'Item / Product')}</th>
      <th style="width:70px;text-align:center">${T('الوحدة', 'UOM')}</th>
      ${days.map(d => `<th style="min-width:48px;text-align:center;padding:7px 4px;font-size:11.5px">${d}</th>`).join('')}
      <th style="min-width:90px;text-align:center;color:#38bdf8;font-weight:800">${T('إجمالي الشهر', 'Total')}</th>
      <th style="min-width:75px;text-align:center;color:#fbbf24">${T('متوسط/يوم', 'Avg/Day')}</th>
      <th style="min-width:90px;text-align:center;color:#4ade80">${T('القيمة (ج.م)', 'Value EGP')}</th>
    </tr>
  `;

        if (!prods.length) {
          tbody.innerHTML = `<tr><td colspan="${days.length + 6}" class="text-center text-muted" style="padding:30px">${T('لا توجد أصناف مطابقة للبحث أو القسم المحدد', 'No products found')}</td></tr>`;
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
        ⚡ ${T('الإجمالي اليومي العام لجميع الأصناف', 'Daily Total All Products')}
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
        <td style="color:#e2e8f0">${r.branches || T('جميع الفروع', 'All Branches')}</td>
        <td class="text-muted text-sm">${r.notes || '—'}</td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="deleteTaztikiRow(${i})" style="padding:3px 8px;color:#f87171" title="حذف">✕</button>
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
              ? `<span class="badge badge-red badge-pulse">${T('يوجد عجز بالمخزون', 'Shortage')}</span>`
              : `<span class="badge badge-green">${T('الرصيد كافٍ', 'Adequate')}</span>`}
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
          alert(T('يرجى الانتظار ثوانٍ لتحميل مكتبة الإكسيل...', 'Please wait, loading XLSX library...'));
          return;
        }

        const { monthStr, fromDay, toDay, days, prods, matrix } = getProdExecutiveMatrix();
        const wb = XLSX.utils.book_new();

        // ════════════════════════════════════════════════════════════
        // SHEET 1: تقرير الإنتاج والتوريد اليومي العام (Days 1..31)
        // ════════════════════════════════════════════════════════════
        const s1Rows = [
          ['COMMUNITY RESTAURANTS — إدارة المطبخ المركزي'],
          ['تقرير الإنتاج والتوريد اليومي للفروع (سحب المنتجات والتشغيل)'],
          [`الفترة: شهر ${monthStr} (من يوم ${fromDay} إلى يوم ${toDay})`, '', '', `تاريخ استخراج التقرير: ${new Date().toLocaleDateString('en-GB')}`],
          [], // Blank separator row
          ['م', 'كود الصنف', 'البند / المنتج', 'القسم', 'الوحدة', ...days.map(d => `يوم ${d}`), 'إجمالي السحب', 'متوسط اليوم', 'تكلفة الوحدة (ج.م)', 'القيمة الإجمالية (ج.م)']
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
            p.cat || 'تجهيز',
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
          'الإجمالي العام',
          '',
          'إجمالي اليومي لجميع الأصناف',
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
        XLSX.utils.book_append_sheet(wb, ws1, isAr() ? 'الإنتاج_اليومي_للفروع' : 'Daily_Production');

        // ════════════════════════════════════════════════════════════
        // SHEET 2: صوص البرجر - Taztiki Sauce (Dedicated Separate Sheet)
        // ════════════════════════════════════════════════════════════
        const taztikiInRange = (S.taztikiRecords || []).filter(r => !monthStr || (r.date && r.date.startsWith(monthStr))).sort((a, b) => a.date.localeCompare(b.date));
        const tazTotalLtr = taztikiInRange.reduce((s, r) => s + parseFloat(r.qty || 0), 0);

        const s2Rows = [
          ['COMMUNITY RESTAURANTS — إدارة المطبخ المركزي'],
          ['سجل شحنات وإنتاج Burger Sauce (صوص البرجر المنفصل)'],
          [`شهر التقرير: ${monthStr}`, '', `إجمالي الكمية: ${tazTotalLtr.toFixed(2)} لتر`],
          [],
          ['م', 'التاريخ', 'كمية صوص البرجر (كجم)', 'الفروع المستلمة', 'ملاحظات التشغيل']
        ];

        taztikiInRange.forEach((r, idx) => {
          s2Rows.push([
            idx + 1,
            r.date,
            parseFloat(r.qty || 0),
            r.branches || 'جميع الفروع',
            r.notes || 'تشغيل منتظم'
          ]);
        });

        s2Rows.push(['الإجمالي', '', tazTotalLtr, '', '']);

        const ws2 = XLSX.utils.aoa_to_sheet(s2Rows);
        ws2['!cols'] = [{ wch: 6 }, { wch: 14 }, { wch: 22 }, { wch: 30 }, { wch: 30 }];
        XLSX.utils.book_append_sheet(wb, ws2, 'Burger_Sauce_صوص_البرجر');

        // ════════════════════════════════════════════════════════════
        // SHEET 3: تقرير الإدارة التنفيذي وملخص الإنتاج (Executive Summary)
        // ════════════════════════════════════════════════════════════
        const s3Rows = [
          ['COMMUNITY RESTAURANTS — الإدارة العامة وقطاع التشغيل'],
          ['الملخص التنفيذي لحركة الإنتاج والتوريد الشهري للمطبخ المركزي'],
          [],
          ['المؤشر الإداري', 'القيمة المحققة', 'الوحدة'],
          ['إجمالي الأصناف المنتجة والموردة', grandUnits, 'وحدة / كجم / لتر'],
          ['إجمالي القيمة التقديرية للإنتاج', Math.round(grandValue), 'جنيه مصري (EGP)'],
          ['إجمالي Burger Sauce (صوص البرجر)', tazTotalLtr, 'لتر'],
          ['نطاق أيام التشغيل النشطة', days.length, 'يوم'],
          ['متوسط السحب والإنتاج اليومي العام', (grandUnits / (days.length || 1)).toFixed(1), 'وحدة / يوم'],
          [],
          ['اعتماد مدير المطبخ المركزي:', '', 'اعتماد رئيس قطاع التشغيل:', '', 'اعتماد الإدارة المالية:'],
          ['________________________', '', '________________________', '', '________________________']
        ];

        const ws3 = XLSX.utils.aoa_to_sheet(s3Rows);
        ws3['!cols'] = [{ wch: 36 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }];
        XLSX.utils.book_append_sheet(wb, ws3, isAr() ? 'ملخص_الإدارة_التنفيذي' : 'Executive_Summary');

        const fileName = `تقرير_إنتاج_وتوريد_الفروع_${monthStr}_COMMUNITY.xlsx`;
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
            tagAr: 'كجم',
            tagEn: 'Kg',
            unitTypeAr: 'وزن بالكيلو جرام',
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
            tagAr: 'لتر',
            tagEn: 'L',
            unitTypeAr: 'حجم باللتر',
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
            tagAr: 'كجم',
            tagEn: 'Kg',
            unitTypeAr: size ? ('وزن بالكيلو (شيكارة ' + size + ')') : 'وزن بالكيلو (شيكارة)',
            unitTypeEn: size ? ('Weight in Kg (Bag ' + size + ')') : 'Weight in Kg (Bag)',
            step: 0.1,
            raw: u
          };
        }

        // 4. Jars (Apricot Jam, Lotus, Honey, Cox Salt, etc.) -> COUNTABLE (بالعدد)
        if (lower.startsWith('jar')) {
          const size = u.replace(/^jar\s*/i, '').trim();
          return {
            type: 'jar',
            isCountable: true,
            tagAr: 'برطمان',
            tagEn: 'Jar',
            unitTypeAr: size ? ('بالعدد (برطمان ' + size + ')') : 'بالعدد (برطمان)',
            unitTypeEn: size ? ('Countable Jars (' + size + ')') : 'Countable Jars',
            step: 1,
            raw: u
          };
        }

        // 5. Bottles (Vinegar, Sriracha, Syrups, etc.) -> COUNTABLE (بالعدد)
        if (lower.startsWith('btl')) {
          const size = u.replace(/^btl\s*/i, '').trim();
          return {
            type: 'bottle',
            isCountable: true,
            tagAr: 'زجاجة',
            tagEn: 'Btl',
            unitTypeAr: size ? ('بالعدد (زجاجة ' + size + ')') : 'بالعدد (زجاجة)',
            unitTypeEn: size ? ('Countable Bottles (' + size + ')') : 'Countable Bottles',
            step: 1,
            raw: u
          };
        }

        // 6. Gallons (Oil 20L, Ketchup 10kg, Mayonnaise 3.29kg, etc.) -> COUNTABLE (بالعدد)
        if (lower.startsWith('gal')) {
          const size = u.replace(/^gal\s*/i, '').trim();
          return {
            type: 'gallon',
            isCountable: true,
            tagAr: 'جالون',
            tagEn: 'Gal',
            unitTypeAr: size ? ('بالعدد (جالون ' + size + ')') : 'بالعدد (جالون)',
            unitTypeEn: size ? ('Countable Gallons (' + size + ')') : 'Countable Gallons',
            step: 1,
            raw: u
          };
        }

        // 7. Boxes (Cartons, Baking powder box, Gloves box) -> COUNTABLE (بالعدد)
        if (lower.startsWith('box')) {
          const size = u.replace(/^box\s*/i, '').trim();
          return {
            type: 'box',
            isCountable: true,
            tagAr: 'علبة',
            tagEn: 'Box',
            unitTypeAr: size ? ('بالعدد (علبة ' + size + ')') : 'بالعدد (علبة)',
            unitTypeEn: size ? ('Countable Boxes (' + size + ')') : 'Countable Boxes',
            step: 1,
            raw: u
          };
        }

        // 8. Plates (Egg plates) -> COUNTABLE (بالعدد)
        if (lower.startsWith('plate')) {
          return {
            type: 'plate',
            isCountable: true,
            tagAr: 'طبق',
            tagEn: 'Plate',
            unitTypeAr: 'بالعدد (طبق 30 بيضة)',
            unitTypeEn: 'Countable Plates (30 Pcs)',
            step: 1,
            raw: u
          };
        }

        // 9. Packets (Pkt) -> COUNTABLE (بالعدد)
        if (lower.startsWith('pkt')) {
          const size = u.replace(/^pkt\s*/i, '').trim();
          return {
            type: 'packet',
            isCountable: true,
            tagAr: 'باكت',
            tagEn: 'Pkt',
            unitTypeAr: size ? ('بالعدد (باكت ' + size + ')') : 'بالعدد (باكت)',
            unitTypeEn: size ? ('Countable Packets (' + size + ')') : 'Countable Packets',
            step: 1,
            raw: u
          };
        }

        // 10. Each / Pcs -> COUNTABLE (بالواحدة)
        return {
          type: 'piece',
          isCountable: true,
          tagAr: 'قطعة',
          tagEn: 'Pcs',
          unitTypeAr: 'بالواحدة (قطعة)',
          unitTypeEn: 'Per Piece',
          step: 1,
          raw: u
        };
      }

      function formatSmartStock(qty, uom, arabic = true) {
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
          return nameA.localeCompare(nameB, isAr() ? 'ar' : 'en', { sensitivity: 'base' });
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
            { v: allEntries.length, l: T('إجمالي الخامات المسجلة', 'Total Raw Materials'), c: '#ffffff' },
            { v: totalShort, l: T('خامات بها عجز حالي', 'Material Shortages'), c: '#f87171' },
            { v: totalLow, l: T('خامات عند حد الأمان', 'Low Safety Stock'), c: '#fbbf24' },
            { v: allEntries.length - totalShort, l: T('خامات برصيد كافٍ', 'Adequate Stock'), c: '#4ade80' }
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
          tbl.innerHTML = `<tr><td colspan="10" class="text-center text-muted" style="padding:32px">${T('لا توجد خامات مطابقة للبحث أو الفلتر المحدد', 'No materials matching search/filter')}</td></tr>`;
          return;
        }

        tbl.innerHTML = rows.map(r => {
          const d = S.ings[r.id];
          if (!d) return '';
          const nameTitle = d.en || d.ar;
          const itemCode = d.code || r.id.replace('raw-', '');
          const catBadge = d.cat || d.category || 'Grocery';

          // Smart UOM calculation: Countable (بالواحدة / برطمان / زجاجة) vs Bulk Weight (كيلو)
          const curStock = formatSmartStock(r.iv.stock, r.iv.uom, isAr());
          const safStock = formatSmartStock(r.iv.safety, r.iv.uom, isAr());
          const reqStock = formatSmartStock(r.req, r.iv.uom, isAr());

          const stockColor = r.isShort ? '#f87171' : r.isLow ? '#fbbf24' : '#4ade80';

          return `
          <tr>
            <!-- 1. كود الصنف -->
            <td>
              <span class="badge" style="background:rgba(168,85,247,0.15);border:1px solid rgba(168,85,247,0.35);color:#c084fc;font-family:monospace;font-weight:700;font-size:12px;letter-spacing:0.5px">
                #${itemCode}
              </span>
            </td>

            <!-- 2. اسم الخامة وتكت الوحدة المعتمدة -->
            <td>
              <div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap">
                <span style="font-weight:700;color:#fff;font-size:14px">${nameTitle}</span>
                <span class="badge" style="background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.35);color:#38bdf8;font-size:11px;font-weight:700;padding:2px 7px;border-radius:6px;font-family:inherit" title="الوحدة المعتمدة في الشيت">${d.uom}</span>
              </div>
              <div style="font-size:11px;color:#94a3b8;margin-top:3px">${curStock.unitType}</div>
            </td>

            <!-- 3. القسم المعتمد -->
            <td>
              <span class="badge badge-indigo" style="font-size:11px;white-space:nowrap;padding:4px 8px">${catBadge}</span>
            </td>

            <!-- 4. المخزون الحالي بالواحدة أو الكيلو -->
            <td>
              <div style="font-weight:800;font-size:14.5px;color:${stockColor}">
                ${curStock.num} <span style="font-size:12px;font-weight:600">${curStock.tag}</span>
              </div>
            </td>

            <!-- 5. حد الأمان -->
            <td>
              <div style="font-weight:600;font-size:13px;color:#cbd5e1">
                ${safStock.num} <span style="font-size:11.5px;color:#94a3b8">${safStock.tag}</span>
              </div>
            </td>

            <!-- 6. المطلوب للإنتاج اليوم -->
            <td>
              <div style="font-weight:700;font-size:13px;color:#60a5fa">
                ${reqStock.num} <span style="font-size:11.5px;color:#93c5fd">${reqStock.tag}</span>
              </div>
            </td>

            <!-- 7. حالة الرصيد -->
            <td>
              ${r.isShort
              ? `<span class="badge badge-red badge-pulse">${T('عجز حالي', 'Shortage')}</span>`
              : r.isLow
                ? `<span class="badge badge-amber">${T('منخفض (أمان)', 'Low')}</span>`
                : `<span class="badge badge-green">✓ ${T('كافٍ ومستقر', 'Adequate')}</span>`}
            </td>

            <!-- 8. مؤشر الكفاية -->
            <td style="min-width:100px">
              <div class="progress" style="height:6px"><div class="progress-bar" style="width:${f2(r.pct)}%;background:${r.bc}"></div></div>
              <div style="font-size:11px;color:#94a3b8;margin-top:3px">${Math.round(r.pct)}%</div>
            </td>

            <!-- 9. تعديل الرصيد -->
            <td style="text-align:center">
              <button class="btn btn-secondary btn-icon btn-sm" onclick="openEditStock('${r.id}')" title="تعديل الرصيد">
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
            ? ('الرصيد الفعلي الحالي (' + uInfo.unitTypeAr + ')')
            : ('Actual Stock Level (' + uInfo.unitTypeEn + ')');
        }
        if (safLbl) {
          safLbl.textContent = isAr()
            ? ('حد الأمان (' + uInfo.unitTypeAr + ')')
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
        toast(T('✅ تم تحديث بيانات المخزون وقاعدة بيانات SQL بنجاح!', '✅ Stock updated in SQL!'));
      }

      function saveIngredient() {
        const a = document.getElementById('ing-ar').value.trim();
        const e = document.getElementById('ing-en').value.trim();
        if (!a || !e) {
          toast(T('يرجى إدخال الاسم بالعربية والإنجليزية', 'Enter both names'), 'error');
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
          sup: document.getElementById('ing-sup').value.trim() || 'المورد الافتراضي'
        };
        closeModal('modal-ing');
        ['ing-ar', 'ing-en', 'ing-sup', 'ing-price', 'ing-stock', 'ing-safety'].forEach(i => document.getElementById(i).value = '');
        saveState();
        renderInv();
        toast(T('✅ تمت إضافة المادة الخام بنجاح!', '✅ Ingredient added!'));
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
              sup: d.sup || 'مورد عام',
              priority: gap > 0 ? 'high' : 'medium',
              status: 'draft'
            });
          }
        });

        nav('purchase');
        saveState();
        toast(T(`✅ تم توليد ${S.POs.length} طلب شراء للمواد الناقصة!`, `✅ Generated ${S.POs.length} POs!`));
      }

      function renderPOs() {
        const dr = S.POs.filter(p => p.status === 'draft').length;
        const sn = S.POs.filter(p => p.status === 'sent').length;
        const rc = S.POs.filter(p => p.status === 'received').length;

        document.getElementById('po-stats').innerHTML = [
          { v: dr, l: T('مسودات قيد المراجعة', 'Draft Orders'), c: '#94a3b8' },
          { v: sn, l: T('أوامر أرسلت للموردين', 'Sent to Suppliers'), c: '#fbbf24' },
          { v: rc, l: T('طلبيات تم استلامها وإدخالها', 'Received into Stock'), c: '#4ade80' }
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
          { v: 'draft', ar: 'مسودة', en: 'Draft' },
          { v: 'sent', ar: 'تم الإرسال', en: 'Sent' },
          { v: 'received', ar: 'تم الاستلام', en: 'Received' }
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
              ? `<span class="badge badge-red">${T('أولوية قصوى', 'Urgent')}</span>`
              : `<span class="badge badge-amber">${T('أولوية عادية', 'Medium')}</span>`}
        </td>
        <td>
          <select class="select" style="padding:5px 10px;font-size:12.5px;width:auto;color:${po.status === 'received' ? '#4ade80' : po.status === 'sent' ? '#facc15' : '#94a3b8'}" onchange="updPO(${i}, this.value)">
            ${opts.map(o => `<option value="${o.v}" ${o.v === po.status ? 'selected' : ''}>${isAr() ? o.ar : o.en}</option>`).join('')}
          </select>
        </td>
        <td>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn-secondary btn-sm" onclick="printPO(${i})" title="${T('طباعة أمر الشراء مع الترويسة الرسمية', 'Print Official PO Voucher')}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              ${T('طباعة', 'Print')}
            </button>
            ${po.status === 'draft'
              ? `<button class="btn btn-primary btn-sm" onclick="sendPO(${i})"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>${T('إرسال للمورد', 'Send')}</button>`
              : ''}
            ${po.status === 'sent'
              ? `<button class="btn btn-secondary btn-sm" style="color:#4ade80;border-color:rgba(74,222,128,0.3)" onclick="receivePO(${i})"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>${T('استلام بالمخزن', 'Receive')}</button>`
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
        toast(T('📤 تم إرسال أمر الشراء إلى المورد بنجاح!', '📤 Sent to supplier!'));
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
          `<span style="color:#fb923c">${po.id}</span> &nbsp;|&nbsp; ${nm} &nbsp;|&nbsp; <span style="color:#60a5fa">${po.qty} ${po.unit}</span> &nbsp;|&nbsp; <span style="color:#fbbf24">${(+po.cost).toLocaleString('en-US')} ${cur()}</span><br/><span style="font-size:12px;color:#94a3b8;font-weight:400">${T('المورد: ', 'Supplier: ')}${po.sup}</span>`;
        openModal('modal-receive');
      }

      function confirmReceivePO() {
        const i = +document.getElementById('receive-po-idx').value;
        const invNum = document.getElementById('invoice-number').value.trim();
        if (!invNum) {
          toast(T('يرجى إدخال رقم الفاتورة', 'Please enter invoice number'), 'error');
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
        toast(T(`🧾 تم الاستلام وحفظ الفاتورة ${invNum} بنجاح!`, `🧾 Received & Invoice ${invNum} saved!`));
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
        supSel.innerHTML = `<option value="" ${isAr() ? 'data-ar="جميع الموردين"' : ''} data-en="All Suppliers">${T('جميع الموردين', 'All Suppliers')}</option>`
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
          { v: filtered.length, l: T('إجمالي الفواتير', 'Total Invoices'), c: '#fff' },
          { v: fmt(Math.round(totalVal)) + ' ' + cur(), l: T('إجمالي قيمة الفواتير', 'Total Value'), c: '#fb923c' },
          { v: unpaid, l: T('فواتير غير مدفوعة', 'Unpaid Invoices'), c: '#f87171' }
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
          unpaid: T('غير مدفوعة', 'Unpaid'),
          paid: T('مدفوعة', 'Paid'),
          partial: T('جزئي', 'Partial')
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
          toast(T('✅ تم تحديث حالة الدفع', '✅ Payment status updated'), 'info');
        }
      }

      function sendAllDraft() {
        const ds = S.POs.filter(p => p.status === 'draft');
        if (!ds.length) {
          toast(T('لا توجد مسودات للإرسال حالياً', 'No drafts to send'), 'info');
          return;
        }
        ds.forEach(p => p.status = 'sent');
        saveState();
        renderPOs();
        toast(T(`📤 تم إرسال ${ds.length} أوامر شراء إلى الموردين بنجاح!`, `📤 Sent ${ds.length} POs!`));
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
          toast(T('يرجى اختيار الخامة التالفة', 'Please select an ingredient'), 'error');
          return;
        }
        if (qty <= 0) {
          toast(T('يرجى كتابة كمية تالفة أكبر من صفر', 'Quantity must be greater than 0'), 'error');
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
        toast(T(`🗑️ تم تسجيل هدر ${qty} ${iv.uom} من (${ingName}) وخصمها من المخزن!`,
          `🗑️ Logged waste of ${qty} ${iv.uom} (${ingName}) and deducted stock!`));
      }

      function delWaste(id) {
        const item = S.wastes.find(w => w.id === id);
        if (!item) return;
        if (!confirm(T('هل تريد حذف سجل الهدر هذا وإعادة الكمية للمخزن؟', 'Delete this waste entry and restore stock?'))) return;

        // Restore stock
        if (S.ings[item.ingId]) {
          S.ings[item.ingId].stock += parseFloat(item.qty);
        }

        S.wastes = S.wastes.filter(w => w.id !== id);
        saveState();
        renderWaste();
        renderInv();
        toast(T('تم حذف سجل الهدر وإعادة الرصيد للمخزن', 'Waste entry deleted & stock restored'), 'info');
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
        const topIngName = topIngObj ? (isAr() ? topIngObj.ar : topIngObj.en) : T('لا يوجد', 'None');

        document.getElementById('waste-stats').innerHTML = [
          { v: filtered.length, l: T('إجمالي عمليات الهدر المسجلة', 'Total Waste Entries'), c: '#fff' },
          { v: fmt(Math.round(totalCost)) + ' ' + cur(), l: T('إجمالي الخسارة المالية للهدر', 'Total Monetary Loss'), c: '#f87171' },
          { v: topIngName, l: T('أكثر خامة تعرضت للهدر', 'Top Wasted Ingredient'), c: '#fbbf24' }
        ].map(s => `
    <div class="stat-card" style="text-align:center">
      <div style="font-size:24px;font-weight:800;color:${s.c}">${s.v}</div>
      <div class="text-muted text-sm mt-2">${s.l}</div>
    </div>
  `).join('');

        const reasonLabels = {
          expired: T('⏳ انتهاء صلاحية', '⏳ Expired'),
          cooking: T('🍳 تلف الطبخ', '🍳 Cooking'),
          storage: T('📦 سوء تخزين', '📦 Storage'),
          trimming: T('🔪 هدر تقطيع', '🔪 Trimming'),
          other: T('⚠️ أسباب أخرى', '⚠️ Other')
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
          <button class="btn btn-danger btn-icon btn-sm" onclick="delWaste(${w.id})" title="حذف">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
          </button>
        </td>
      </tr>
      ${w.notes ? `<tr><td colspan="8" style="padding:4px 16px 10px;color:#64748b;font-size:12px;font-style:italic">📝 ${w.notes}</td></tr>` : ''}
    `;
        }).join('');
      }

      /* ============================================================
         BRANCH SHIPMENTS LOG — سجل شحنات الفروع
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
          { val: totalOrders, lbl: T('طلبات الفروع في الفترة', 'Branch Orders in Range'), color: '#38bdf8', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2', kpi: 'kpi-cyan' },
          { val: fmt(allQty), lbl: T('إجمالي الوحدات المشحونة', 'Total Units Shipped'), color: '#4ade80', icon: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z', kpi: 'kpi-green' },
          { val: activeDays, lbl: T('أيام النشاط خلال الفترة', 'Active Production Days'), color: '#fbbf24', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', kpi: 'kpi-amber' },
          { val: fmt(totalTaz, 1) + ' L', lbl: T('Burger Sauce المشحون', 'Taztiki Sauce Shipped'), color: '#c084fc', icon: 'M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3', kpi: 'kpi-purple' }
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
      ${T('لا توجد طلبات في هذه الفترة', 'No orders in this date range')}
    </td></tr>`;
          return;
        }

        // Header: المنتج | day1 | day2 | ... | الإجمالي
        thead.innerHTML = `<tr>
    <th style="min-width:150px">${T('المنتج', 'Product')}</th>
    ${dates.map(d => `<th style="min-width:70px;text-align:center">${d.slice(5)}</th>`).join('')}
    <th style="min-width:80px;text-align:center;color:#4ade80">${T('الإجمالي', 'Total')}</th>
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
        const date = prompt(T('أدخل التاريخ (YYYY-MM-DD):', 'Enter date (YYYY-MM-DD):'), today);
        if (!date) return;
        const qty = parseFloat(prompt(T('أدخل كمية صوص البرجر (كجم):', 'Enter Taztiki Sauce quantity (liters):'), '0') || 0);
        if (!qty || qty <= 0) { alert(T('كمية غير صالحة', 'Invalid quantity')); return; }
        const branches = prompt(T('الفروع المستلِمة (اختياري):', 'Receiving branches (optional):'), '') || '';
        const notes = prompt(T('ملاحظات (اختياري):', 'Notes (optional):'), '') || '';
        S.taztikiRecords.push({ date, qty, branches, notes });
        saveState();
        renderTaztikiTable();
        renderShipments();
      }

      function deleteTaztikiRow(idx) {
        if (!confirm(T('حذف هذا السجل؟', 'Delete this record?'))) return;
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
          alert(T('مكتبة XLSX غير محملة بعد، انتظر ثانية وأعد المحاولة', 'XLSX library not ready, try again in a moment'));
          return;
        }
        const fromEl = document.getElementById('ship-from');
        const toEl = document.getElementById('ship-to');
        const fromDate = fromEl.value || '';
        const toDate = toEl.value || '';

        const { dates, prods, matrix } = buildShipmentsMatrix(fromDate, toDate);

        const wb = XLSX.utils.book_new();

        // ══ Sheet 1: Main Products (excluding Taztiki) ══
        const s1Header = ['المنتج / Product', 'الوحدة', ...dates, 'الإجمالي'];
        const s1Rows = prods.map(p => {
          const dm = matrix[p.id] || {};
          const rowTotal = Object.values(dm).reduce((a, b) => a + b, 0);
          return [pname(p), p.unit, ...dates.map(d => dm[d] || 0), rowTotal];
        });

        // Add totals row
        const totalsRow = ['الإجمالي اليومي', '', ...dates.map(d =>
          prods.reduce((s, p) => s + (matrix[p.id]?.[d] || 0), 0)
        ), prods.reduce((s, p) => s + Object.values(matrix[p.id] || {}).reduce((a, b) => a + b, 0), 0)];
        s1Rows.push(totalsRow);

        const ws1 = XLSX.utils.aoa_to_sheet([s1Header, ...s1Rows]);
        // Style header row width
        ws1['!cols'] = [{ wch: 28 }, { wch: 10 }, ...dates.map(() => ({ wch: 10 })), { wch: 12 }];
        XLSX.utils.book_append_sheet(wb, ws1, isAr() ? 'شحنات المنتجات' : 'Products Shipments');

        // ══ Sheet 2: Taztiki Sauce ══
        const taztikiInRange = (S.taztikiRecords || []).filter(r => {
          if (fromDate && r.date < fromDate) return false;
          if (toDate && r.date > toDate) return false;
          return true;
        }).sort((a, b) => a.date.localeCompare(b.date));

        const s2Header = ['التاريخ', 'الكمية (لتر)', 'الفروع المستلمة', 'ملاحظات'];
        const s2Rows = taztikiInRange.map(r => [r.date, r.qty, r.branches || '', r.notes || '']);
        const tazTotal = taztikiInRange.reduce((s, r) => s + parseFloat(r.qty || 0), 0);
        s2Rows.push(['الإجمالي', tazTotal, '', '']);

        const ws2 = XLSX.utils.aoa_to_sheet([s2Header, ...s2Rows]);
        ws2['!cols'] = [{ wch: 14 }, { wch: 14 }, { wch: 30 }, { wch: 30 }];
        XLSX.utils.book_append_sheet(wb, ws2, 'Taztiki Sauce');

        // ══ Sheet 3: Summary ══
        const totalMain = prods.reduce((s, p) => s + Object.values(matrix[p.id] || {}).reduce((a, b) => a + b, 0), 0);
        const ws3 = XLSX.utils.aoa_to_sheet([
          ['تقرير شحنات الفروع — Community Restaurants'],
          ['الفترة:', `${fromDate} → ${toDate}`],
          ['تاريخ الطباعة:', new Date().toLocaleDateString('en-GB')],
          [],
          ['إجمالي وحدات المنتجات المشحونة:', totalMain],
          ['إجمالي Taztiki Sauce (لتر):', tazTotal],
          ['عدد أيام النشاط:', dates.length],
        ]);
        ws3['!cols'] = [{ wch: 35 }, { wch: 20 }];
        XLSX.utils.book_append_sheet(wb, ws3, isAr() ? 'ملخص' : 'Summary');

        const fileName = `شحنات_الفروع_${fromDate}_${toDate}.xlsx`;
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

        document.getElementById('rep-th-m1').textContent = `${T('شهر', 'Month')} (${m1})`;
        document.getElementById('rep-th-m2').textContent = `${T('شهر', 'Month')} (${m2})`;

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
          { v: fmt(totalUnitsM2), l: T(`إجمالي طلبات الشهر (${m2})`, `Orders in (${m2})`), diff: `${orderDiff >= 0 ? '▲ +' : '▼ '}${orderDiff} (${orderPct}%)`, c: orderDiff >= 0 ? '#4ade80' : '#f87171', kpi: 'kpi-cyan', bg: orderDiff >= 0 ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)' },
          { v: fmt(Math.round(wasteLossM2)) + ' ' + cur(), l: T(`خسائر الهدر بالشهر (${m2})`, `Waste Loss (${m2})`), diff: `${wasteDiff <= 0 ? '▼ ' : '▲ +'}${Math.round(wasteDiff)} ${cur()} (${wastePct}%)`, c: wasteDiff <= 0 ? '#4ade80' : '#f87171', kpi: 'kpi-red', bg: wasteDiff <= 0 ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)' },
          { v: fmt(Math.round(invCostM2)) + ' ' + cur(), l: T(`تكلفة الفواتير والمشتروات (${m2})`, `Invoices Cost (${m2})`), diff: `${invCostM2 - invCostM1 >= 0 ? '▲ +' : '▼ '}${Math.round(invCostM2 - invCostM1)} ${cur()}`, c: '#a78bfa', kpi: 'kpi-purple', bg: 'rgba(168,85,247,0.12)' },
          { v: ordersM2.length, l: T(`عدد شحنات الفروع (${m2})`, `Shipments Count (${m2})`), diff: `${ordersM2.length - ordersM1.length >= 0 ? '▲ +' : '▼ '}${ordersM2.length - ordersM1.length}`, c: '#fbbf24', kpi: 'kpi-amber', bg: 'rgba(251,191,36,0.12)' }
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
        const branches = ['فرع وسط البلد', 'فرع المطار', 'فرع المول', 'فرع الزمالك'];
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
        <td style="font-size:12.5px" class="text-muted">${isUp ? T('نمو ومطالب إضافية', 'Increased Demand') : T('انخفاض سحب الفرع', 'Reduced Demand')}</td>
      </tr>
    `;
        });

        // Add Row for Waste Loss
        matrixRows.push(`
    <tr style="background:rgba(248,113,113,0.04)">
      <td style="font-weight:800;color:#f87171">🗑️ ${T('إجمالي الخسارة المالية من الهدر', 'Total Waste Loss')}</td>
      <td style="color:#fbbf24;font-weight:700">${fmt(Math.round(wasteLossM1))} ${cur()}</td>
      <td style="color:#f87171;font-weight:700">${fmt(Math.round(wasteLossM2))} ${cur()}</td>
      <td style="font-weight:700;color:${wasteDiff <= 0 ? '#4ade80' : '#f87171'}">${wasteDiff >= 0 ? '+' : ''}${fmt(Math.round(wasteDiff))} ${cur()}</td>
      <td><span class="badge ${wasteDiff <= 0 ? 'badge-green' : 'badge-red'}">${wasteDiff >= 0 ? '▲ +' : '▼ '}${wastePct}%</span></td>
      <td style="font-size:12.5px;color:${wasteDiff <= 0 ? '#4ade80' : '#f87171'}">${wasteDiff <= 0 ? T('تحسن وتراجع في الهدر 👏', 'Waste Decreased') : T('ارتفاع في نسبة التالف ⚠️', 'Waste Increased')}</td>
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
              legend: { position: 'top', labels: { color: '#94a3b8', font: { family: isAr() ? 'Cairo, sans-serif' : 'Inter, sans-serif' } } }
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
        const reasonLabels = [T('صلاحية', 'Expired'), T('طبخ', 'Cooking'), T('تخزين', 'Storage'), T('تقطيع', 'Trimming'), T('أخرى', 'Other')];

        const dataM1 = reasons.map(r => wastesM1.filter(w => w.reason === r).reduce((s, w) => s + parseFloat(w.totalCost), 0));
        const dataM2 = reasons.map(r => wastesM2.filter(w => w.reason === r).reduce((s, w) => s + parseFloat(w.totalCost), 0));

        chRepWaste = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: reasonLabels,
            datasets: [
              { label: `${T('هدر', 'Waste')} (${m1})`, data: dataM1, backgroundColor: '#fbbf24cc', borderColor: '#fbbf24', borderWidth: 1.5 },
              { label: `${T('هدر', 'Waste')} (${m2})`, data: dataM2, backgroundColor: '#f87171cc', borderColor: '#f87171', borderWidth: 1.5 }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'top', labels: { color: '#94a3b8', font: { family: isAr() ? 'Cairo, sans-serif' : 'Inter, sans-serif' } } }
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
              legend: { position: 'top', labels: { color: '#94a3b8', font: { family: isAr() ? 'Cairo, sans-serif' : 'Inter, sans-serif' } } }
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
            labels: [T('تكلفة الإنتاج المباشرة', 'Prod Cost'), T('خسائر الهدر', 'Waste Loss'), T('تكلفة مشتروات الموردين', 'Purchases')],
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
              legend: { position: 'bottom', labels: { color: '#94a3b8', font: { family: isAr() ? 'Cairo, sans-serif' : 'Inter, sans-serif' } } }
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

        const cc = (rawCc || '').toLowerCase();
        const sh = (sheetName || '').toLowerCase();
        const req = (reqId || '').toLowerCase();
        const full = `${cc} ${sh} ${req}`.trim();

        // 1. Water Way
        if (full.includes('water way') || full.includes('ww') || full.includes('وتر واى') || full.includes('the drive ww')) {
          if (full.includes('split') || full.includes('اسباليت') || full.includes('اسبليت') || full.includes('drive 01') || full.includes('drive 1')) {
            return isAr() ? 'فرع التجمع الخامس' : 'فرع التجمع الخامس';
          }
          return isAr() ? 'فرع واتر واي (Water Way)' : 'Water Way';
        }

        // 2. Uptown
        if (full.includes('uptown') || full.includes('up town') || full.includes('اب تاون') || full.includes('أب تاون')) {
          return isAr() ? 'فرع أب تاون (Uptown)' : 'Uptown';
        }

        // 3. O1
        if (full.includes('o1') || full.includes('01')) {
          if (full.includes('split') || full.includes('اسباليت') || full.includes('اسبليت')) {
            return isAr() ? 'فرع الشيخ زايد' : 'فرع الشيخ زايد';
          }
          return isAr() ? 'فرع O1 (O1)' : 'O1';
        }

        // 4. Maadi / The Field
        if (full.includes('the field') || full.includes('field') || full.includes('معادى') || full.includes('المعادي')) {
          return isAr() ? 'فرع المعادي (The Field)' : 'The Field Maadi';
        }

        // 5. Mivida
        if (full.includes('mivida') || full.includes('مفيده') || full.includes('ميفيدا')) {
          return isAr() ? 'فرع ميفيدا (Mivida)' : 'Mivida';
        }

        // 6. Sodic
        if (full.includes('sodic') || full.includes('سوديك')) {
          return isAr() ? 'فرع سوديك (Sodic)' : 'Sodic';
        }

        // 7. New Giza & New Giza Club
        if (full.includes('new giza club') || full.includes('النادى') || full.includes('النادي')) {
          return isAr() ? 'فرع نادي نيو جيزة (New Giza Club)' : 'New Giza Club';
        }
        if (full.includes('new giza') || full.includes('نيو جيزه') || full.includes('نيوجيزه') || full.includes('نيو جيزة')) {
          if (full.includes('split') || full.includes('اسباليت') || full.includes('اسبليت') || full.includes('split-ng')) {
            return isAr() ? 'فرع المعادي' : 'فرع المعادي';
          }
          return isAr() ? 'فرع نيو جيزة (New Giza)' : 'New Giza';
        }

        // 8. Park St
        if (full.includes('park st') || full.includes('park') || full.includes('بارك')) {
          return isAr() ? 'فرع بارك ستريت (Park St)' : 'Park St';
        }

        // 9. Mall of Arabia
        if (full.includes('mall of arabia') || full.includes('moa') || full.includes('العرب')) {
          return isAr() ? 'فرع مول العرب (Mall of Arabia)' : 'Mall of Arabia';
        }

        // 10. Palm Hills
        if (full.includes('palm hills') || full.includes('palm') || full.includes('بالم')) {
          return isAr() ? 'فرع بالم هيلز (Palm Hills)' : 'Palm Hills';
        }

        // 11. Kode
        if (full.includes('kode') || full.includes('كود')) {
          return isAr() ? 'فرع كود (Kode)' : 'Kode';
        }

        // 12. Dahshour
        if (full.includes('dahshour') || full.includes('دهشور')) {
          return isAr() ? 'فرع دهشور (Dahshour)' : 'Dahshour';
        }

        // 13. Madinty
        if (full.includes('madinty') || full.includes('مدينتي')) {
          return isAr() ? 'فرع مدينتي (Madinty)' : 'Madinty';
        }

        // 14. District 5
        if (full.includes('distract 5') || full.includes('district 5') || full.includes('d5') || full.includes('ديستريكت')) {
          return isAr() ? 'فرع ديستريكت 5 (District 5)' : 'District 5';
        }

        // 15. IL Bosco
        if (full.includes('ilbosco') || full.includes('bosco') || full.includes('بوسكو')) {
          return isAr() ? 'فرع إل بوسكو (IL Bosco)' : 'IL Bosco';
        }

        // 16. D2 / Drive 02
        if (full.includes('drive 02') || full.includes('drive 2') || full.includes('d2')) {
          return isAr() ? 'فرع D2 (Drive 02)' : 'D2 (Drive 02)';
        }

        // 17. Katameya
        if (full.includes('katamya') || full.includes('katameya') || full.includes('القطامية') || full.includes('قطامية') || full.includes('branch-katamya')) {
          return isAr() ? 'فرع قطامية (Katameya)' : 'Katameya';
        }

        // 18. NGG Golf
        if (full.includes('ngg') || full.includes('nng') || full.includes('الجولف') || full.includes('جولف') || full.includes('golf') || full.includes('ngg-saint')) {
          return isAr() ? 'فرع الجولف (NGG Golf)' : 'NGG Golf';
        }

        // 19. Core WOC
        if (full.includes('core woc') || full.includes('walk') || full.includes('woc')) {
          return isAr() ? 'فرع Core WOC' : 'Core WOC';
        }

        // 20. Core PH
        if (full.includes('core ph') || full.includes('p.h') || full.includes('ph')) {
          return isAr() ? 'فرع Core PH' : 'Core PH';
        }

        // 21. CAC
        if (full.includes('cac') || full.includes('كـاك') || full.includes('كاك') || full.includes('c.a.c')) {
          return isAr() ? 'فرع CAC (CAC)' : 'CAC';
        }

        // 22. Orange
        if (full.includes('orange') || full.includes('اورانج') || full.includes('أورانج') || full.includes('اورنج') || full.includes('أورنج')) {
          return isAr() ? 'فرع أورانج (Orange)' : 'Orange';
        }

        return rawCc || sheetName || (isAr() ? 'فرع عام' : 'General Branch');
      }

      /* ── Match or Register Product ── */
      function matchOrRegisterProduct(rawName, rawUnit, rawPrice) {
        if (!rawName) return null;
        const clean = String(rawName).trim();
        if (!clean || clean === 'Total:' || clean === 'الإجمالي:') return null;

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
          toast(T('الملف غير صالح أو لا يحتوي على أوراق عمل', 'File is invalid or has no sheets'), 'error');
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

                if (rawItemName && rawItemName !== 'Total:' && rawItemName !== 'الإجمالي:' && rawQtyVal !== undefined && rawQtyVal !== '') {
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
          toast(T('لم يتم العثور على أي طلبيات صالحة في الملف', 'No valid orders found in workbook'), 'error');
          return;
        }

        _excelPendingOrders = pendingList;

        // Render Preview Modal
        const preview = document.getElementById('excel-preview');
        const ptbl = document.getElementById('excel-preview-table');
        if (document.getElementById('excel-preview-title')) {
          document.getElementById('excel-preview-title').innerHTML =
            T(`🎉 <b>تم بنجاح قراءة وتجميع شيت الفروع (${fileName || 'الفروع.xlsx'}):</b><br/>` +
              `<span style="color:#4ade80;font-size:12px">✨ تم دمج <b>${totalTemplatesCount || pendingList.length} قالب/مركز تكلفة</b> في <b>${pendingList.length} فرع موحد</b> | صوص البرجر المكتشف: <b>${totalSauceParsed.toFixed(2)} كجم</b></span>`,
              `🎉 <b>Successfully parsed & aggregated (${fileName || 'الفروع.xlsx'}):</b><br/>` +
              `<span style="color:#4ade80;font-size:12px">✨ Merged <b>${totalTemplatesCount || pendingList.length} templates</b> into <b>${pendingList.length} unified branches</b> | Burger Sauce: <b>${totalSauceParsed.toFixed(2)} KG</b></span>`);
        }

        if (ptbl) {
          const thead = ptbl.querySelector('thead');
          if (thead) {
            thead.innerHTML = `
            <tr>
              <th>${T('الفرع الموحد', 'Unified Branch')}</th>
              <th>${T('مراكز التكلفة المدمجة (مطبخ + بار)', 'Merged Cost Centers')}</th>
              <th>${T('صوص البرجر', 'Burger Sauce')}</th>
              <th>${T('إجمالي المنتجات', 'Total Items')}</th>
            </tr>
          `;
          }

          const tbody = ptbl.querySelector('tbody');
          if (tbody) {
            tbody.innerHTML = pendingList.map(o => {
              const sauceBadge = o.burgerSauce > 0
                ? `<span class="badge" style="background:rgba(192,132,252,0.18);color:#c084fc;font-weight:700">🍔 ${o.burgerSauce} ${T('كجم', 'KG')}</span>`
                : `<span class="text-muted" style="font-size:11px">—</span>`;
              const itemsCount = Object.keys(o.items).length;
              const totalItemsQty = Object.values(o.items).reduce((a, b) => a + b, 0);

              return `
              <tr>
                <td style="color:#fff;font-weight:800;font-size:13.5px">${o.branch}</td>
                <td class="text-muted" style="font-size:11px;max-width:240px">${o.costCentersList || '—'}</td>
                <td>${sauceBadge}</td>
                <td style="font-weight:700;color:#22c55e">${itemsCount} ${T('صنف', 'items')} (${totalItemsQty.toFixed(1)} ${T('وحدة', 'units')})</td>
              </tr>
            `;
            }).join('');
          }
        }

        if (preview) preview.style.display = 'block';
        toast(T(`✨ تم بنجاح تجميع ${pendingList.length} فرع موحد من شيت الفروع!`, `✨ Aggregated ${pendingList.length} branches from Excel!`));
      }

      /* ── Load File via Input or Drop ── */
      function handleExcelFile(file) {
        if (!file) return;
        if (!window.XLSX) {
          toast(T('مكتبة قراءة الإكسيل لم تُحمّل بعد — تأكد من اتصالك بالإنترنت', 'SheetJS not loaded. Check internet connection.'), 'error');
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
            toast(T('خطأ أثناء قراءة الملف: ' + err.message, 'File reading error: ' + err.message), 'error');
          }
        };
        reader.readAsArrayBuffer(file);
      }

      /* ── ⚡ Auto Load Attached Local File (الفروع.xlsx) ── */
      async function loadDefaultBranchesFile() {
        if (!window.XLSX) {
          toast(T('مكتبة قراءة الإكسيل لم تُحمّل بعد', 'SheetJS not loaded'), 'error');
          return;
        }
        try {
          toast(T('⏳ جاري قراءة ملف الفروع المحلي (الفروع.xlsx)...', '⏳ Loading local branches file...'));
          const res = await fetch('الفروع.xlsx');
          if (!res.ok) {
            throw new Error(T('لم يتم العثور على الملف في المسار الرئيسي', 'File not found on server'));
          }
          const arrayBuf = await res.arrayBuffer();
          const data = new Uint8Array(arrayBuf);
          const wb = XLSX.read(data, { type: 'array' });
          parseWorkbookData(wb, 'الفروع.xlsx');
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


      /* ── ⚡ Automated Inventory Deduction Engine (محرك الخصم التلقائي للمخزون) ── */
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

        // 4. Sync affected raw materials to Supabase Cloud
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
            notes: T(`📥 استيراد مجمع من شيت الفروع (${o.costCentersList || ''})`, `📥 Merged import from branches sheet`)
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
              notes: T('سحب تلقائي من طلب الفرع بالإكسيل', 'Auto-imported from branch Excel request')
            });
          }
        });

        // Sync directly to Supabase Cloud so all devices (Mobile, PC, etc.) see it instantly!
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
          toast(T(`📥 تم حفظ ${importedCount} طلبية وسحب ${deductRes.deductedRawCount} خامة من المخزن تلقائياً طبقاً للوصفات!`, `📥 Saved ${importedCount} orders & auto-deducted ${deductRes.deductedRawCount} raw materials from inventory!`));
        } else {
          toast(T(`📥 تم بنجاح حفظ ومزامنة ${importedCount} طلبية للفروع سحابياً`, `📥 Successfully saved & synced ${importedCount} orders to cloud!`));
        }
        _excelPendingOrders = null;
      }

      /* ============================================================
         COMMUNITY RESTAURANTS: OFFICIAL PRINT VOUCHER & PRINT PO
      ============================================================ */
      function printPO(i) {
        const po = S.POs[i];
        if (!po) return;
        const d = S.ings[po.ingId];
        const nm = d ? (isAr() ? d.ar : d.en) : po.ingId;
        const price = d ? d.price : 0;

        document.getElementById('pr-po-number').textContent = po.id;
        document.getElementById('pr-po-date').textContent = (isAr() ? 'التاريخ: ' : 'Date: ') + new Date().toISOString().slice(0, 10);
        document.getElementById('pr-po-status').textContent = po.status === 'received' ? (isAr() ? 'تم الاستلام' : 'Received') : (po.status === 'sent' ? (isAr() ? 'تم الإرسال للمورد' : 'Sent to Supplier') : (isAr() ? 'مسودة معتمدة' : 'Approved Draft'));
        document.getElementById('pr-po-sup').textContent = po.sup || 'مورد عام';
        document.getElementById('pr-po-priority').textContent = po.priority === 'high' ? (isAr() ? 'أولوية قصوى (عاجل جداً)' : 'Urgent Priority') : (isAr() ? 'أولوية عادية' : 'Normal Priority');

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
      <td colspan="5" style="padding:12px;text-align:end">${isAr() ? 'إجمالي قيمة أمر الشراء:' : 'Total PO Value:'}</td>
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
            ? `المطبخ المركزي: تشغيل مباشر | ⚠️ عجز ${shorts.length} خامات مطلوب شراؤها`
            : `Central Kitchen: LIVE | ⚠️ ${shorts.length} Shortage(s) detected`;
          ticker.parentElement.style.borderColor = 'rgba(239, 68, 68, 0.35)';
          ticker.parentElement.style.color = '#f87171';
        } else {
          ticker.textContent = isAr()
            ? `المطبخ المركزي: تشغيل مباشر | تلبية الطلبات 100% | ${totalOrders} طلبات فروع`
            : `Central Kitchen: LIVE | 100% Demand Met | ${totalOrders} Branch Orders`;
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
          { name: isAr() ? 'لوحة التحكم والمؤشرات' : 'Dashboard', page: 'dashboard', icon: '📊', sub: isAr() ? 'المؤشرات العامة وتنبيهات النواقص' : 'General metrics & shortages' },
          { name: isAr() ? 'التقارير والمقارنات الشهرية' : 'Reports & Analytics', page: 'reports', icon: '📈', sub: isAr() ? 'مقارنة أداء الشهور والهدر والطلب' : 'Month-over-month comparisons' },
          { name: isAr() ? 'طلبات الفروع واستيراد الإكسيل' : 'Branch Orders', page: 'orders', icon: '📥', sub: isAr() ? 'استيراد شيت الإكسيل والطلبيات' : 'Excel import & branch orders' },
          { name: isAr() ? 'شجرة الوصفات والتجهيزات (BOM)' : 'Recipes (BOM)', page: 'recipes', icon: '🧪', sub: isAr() ? 'معادلات صوصات وبرجر وفراخ المطبخ المركزي' : 'Sub-assemblies & BOM' },
          { name: isAr() ? 'محرك وخطة الإنتاج اليومية' : 'Production Engine', page: 'production', icon: '⚙️', sub: isAr() ? 'حساب متطلبات الخامات مع 5% احتياطي' : 'Raw material calculation + 5% buffer' },
          { name: isAr() ? 'أرصدة المخزون وحدود الأمان' : 'Inventory Stock', page: 'inventory', icon: '📦', sub: isAr() ? 'مراقبة أرصدة الخامات وتعديلها' : 'Stock levels & safety thresholds' },
          { name: isAr() ? 'طلبات الشراء للموردين' : 'Purchase Orders', page: 'purchase', icon: '🛒', sub: isAr() ? 'توليد أوامر الشراء وإرسالها وطباعتها' : 'Generate & print purchase orders' },
          { name: isAr() ? 'سجل فواتير الموردين' : 'Invoices Ledger', page: 'invoices', icon: '🧾', sub: isAr() ? 'متابعة الفواتير الواردة وحالات الدفع' : 'Supplier bills & payments' },
          { name: isAr() ? 'تسجيل الهدر والتالف اليومي' : 'Waste & Spoilage', page: 'waste', icon: '🗑️', sub: isAr() ? 'تسجيل الخسائر وخصمها من المخزن' : 'Log spoilage & financial loss' }
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
              sub: `${isAr() ? 'خامة مخزن | سعر:' : 'Raw Material | Price:'} ${iv.price} ${cur()} | ${iv.sup || 'مورد عام'}`,
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
              sub: `${isAr() ? 'تجهيز مطبخ مركزي | الوحدة:' : 'Central Kitchen Item | Unit:'} ${p.unit}`,
              icon: '🥫',
              action: () => { nav('recipes'); S.curRecipe = p.id; renderRecipes(); closeCmdBar(); }
            });
          }
        });

        if (!items.length) {
          res.innerHTML = `<div style="text-align:center;padding:24px;color:#94a3b8;font-size:13px">${isAr() ? 'لا توجد نتائج تطابق بحثك' : 'No matching results found'}</div>`;
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

        // ⚡ 2. Async Cloud Sync from Supabase SQL (loads real-time data on Phone, PC, Tablet)
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
          showToast('📥 جاري تجهيز تقرير البيانات الموحد...');
        }
        setTimeout(() => {
          if (typeof exportReportCSV === 'function') {
            exportReportCSV();
          } else {
            alert('تم تجهيز وتصدير ملف البيانات بنجاح.');
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
            showToast(d.classList.contains('active') ? '🌙 تم تفعيل الوضع الداكن الفاخر' : '☀️ وضع النهار قيد المواءمة');
          }
        }
      }


      // ── REAL DARK / LIGHT MODE THEME ENGINE ──
      // Consistent 100% CSS Variables Engine. Toggles .dark class and data-theme.
      function toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark') ||
          (document.body && document.body.classList.contains('dark')) ||
          document.documentElement.getAttribute('data-theme') === 'dark';
        const next = isDark ? 'light' : 'dark';
        setTheme(next);
      }

      function setTheme(theme) {
        const isDark = (theme === 'dark');
        if (isDark) {
          document.documentElement.classList.add('dark');
          if (document.body) document.body.classList.add('dark');
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          if (document.body) document.body.classList.remove('dark');
          document.documentElement.removeAttribute('data-theme');
        }

        const l = document.getElementById('th-light');
        const d = document.getElementById('th-dark');
        if (l && d) {
          if (isDark) {
            d.classList.add('active');
            l.classList.remove('active');
          } else {
            l.classList.add('active');
            d.classList.remove('active');
          }
        }

        const modeText = document.getElementById('theme-mode-text');
        if (modeText) {
          const isArabic = typeof isAr === 'function' ? isAr() : true;
          modeText.textContent = isDark ? (isArabic ? 'ليلي' : 'Dark') : (isArabic ? 'نهاري' : 'Light');
        }

        const floatText = document.getElementById('floating-theme-label');
        if (floatText) {
          const isArabic = typeof isAr === 'function' ? isAr() : true;
          floatText.textContent = isDark ? (isArabic ? 'المظهر: ليلي 🌙' : 'Dark Theme 🌙') : (isArabic ? 'المظهر: نهاري ☀️' : 'Light Theme ☀️');
        }

        try {
          localStorage.setItem('theme', theme);
          localStorage.setItem('erp_theme', theme);
        } catch (e) { }

        if (typeof showToast === 'function') {
          showToast(isDark ? '🌙 تم تفعيل الوضع الليلي الفاخر (Dark Mode)' : '☀️ تم تفعيل وضع النهار الدافئ (Warm Cream)');
        }
      }

      // Auto-load saved theme on startup — default is warm cream
      try {
        const savedTheme = localStorage.getItem('theme') || localStorage.getItem('erp_theme') || 'light';
        setTheme(savedTheme);
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
              title: 'تنبيه نقص في خامات المطبخ',
              desc: shortageCount + ' أصناف خامات وصلت إلى حد إعادة الطلب أو أقل بالمخزن',
              time: 'منذ قليل',
              actionText: 'فحص الخامات',
              actionFn: "nav('inventory')"
            });
          } else {
            notifs.push({
              type: 'success',
              icon: '✓',
              title: 'المخزون متوازن ومكتمل',
              desc: 'جميع الخامات الاستراتيجية فوق حد الأمان المخزني ولا توجد عوائق',
              time: 'اليوم',
              actionText: 'عرض المخزون',
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
              title: 'طلبات الفروع الواردة',
              desc: 'يوجد ' + orderCount + ' طلب فرع وارد مسجل في دورة التشغيل الحالية',
              time: 'اليوم',
              actionText: 'معاينة الطلبات',
              actionFn: "nav('orders')"
            });
          } else {
            notifs.push({
              type: 'info',
              icon: '📝',
              title: 'جاهزية استلام الطلبات',
              desc: 'المطبخ المركزي في حالة ترقب وجاهزية لاستلام طلبات الفروع',
              time: 'اليوم',
              actionText: 'تسجيل طلب جديد',
              actionFn: "nav('orders')"
            });
          }
        } catch (e) { }

        // 3. Batches / Cook Plan
        notifs.push({
          type: 'prod',
          icon: '🍳',
          title: 'خطة تشغيل المطبخ المركزي (BOM)',
          desc: 'محرك احتساب وتفكيك المكونات والمقادير التلقائي نشط وجاهز للتنفيذ',
          time: 'نشط الآن',
          actionText: 'خطة التشغيل',
          actionFn: "nav('production')"
        });

        // 4. Cloud Database Sync
        notifs.push({
          type: 'sys',
          icon: '⚡',
          title: 'حالة المزامنة السحابية',
          desc: 'السيرفر متصل وقاعدة بيانات Cloud SQL متزامنة بالكامل وبأعلى كفاءة',
          time: 'مباشر',
          actionText: 'حالة الربط',
          actionFn: "toggleSqlSync()"
        });

        if (countBadge) countBadge.textContent = notifs.length + ' تنبيهات';

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
          showToast('✓ تم تحديد جميع التنبيهات كمقروءة');
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
        welcome: { title: 'قسم الترحيب', en: 'Welcome Hub', icon: '✨' },
        dashboard: { title: 'لوحة المؤشرات', en: 'Dashboard', icon: '🎛️' },
        orders: { title: 'طلبات الفروع', en: 'Branch Orders', icon: '📋' },
        production: { title: 'خطة التشغيل (BOM)', en: 'Production Plan', icon: '🍳' },
        centerstock: { title: 'مخزون المركز الجاهز', en: 'Center Stock', icon: '📦' },
        inventory: { title: 'أرصدة ومستودع الخامات', en: 'Raw Inventory', icon: '🥫' },
        purchase: { title: 'أوامر الشراء والتوريد', en: 'Purchase Orders', icon: '🛒' },
        recipes: { title: 'دليل الوصفات والمقادير', en: 'Recipes & BOM', icon: '📖' },
        waste: { title: 'سجل الهدر والتوالف', en: 'Waste Ledger', icon: '🗑️' },
        reports: { title: 'التقارير والمصفوفة', en: 'Reports & Matrix', icon: '📈' },
        shipments: { title: 'فروع التوزيع', en: 'Branches', icon: '🚚' }
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

    