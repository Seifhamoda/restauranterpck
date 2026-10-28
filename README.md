# Smart Kitchen ERP — Commercial Edition

**Smart Kitchen ERP** is a high-performance Central Kitchen Management & Operations system designed for multi-branch food chains, commissary kitchens, and commercial food production facilities.

Built with a fast client-side dashboard and an embedded Node.js SQLite backend, the application runs 100% offline and on-premise with zero external cloud dependencies.

---

## 🚀 Key Features

- **Multi-Branch Order Scheduling:** Ingest, schedule, and dispatch batch orders across multiple distribution hubs.
- **Bill of Materials (BOM) Calculation Engine:** Automated recipe explosion, raw material calculation, precision unit waste factors, and live batch deductions.
- **Real-Time Inventory & Safety Thresholds:** Minimum safety stock alerts, consumption tracking, and audit movement logs.
- **Procurement & Purchase Orders:** Automated purchase order generation, supplier ledgers, and printable PDF/voucher sheets.
- **Executive Matrix & Production Reports:** Day-by-day production matrices, branch distribution logs, and Excel exports.
- **Enterprise Security:** Session-based authentication with `HttpOnly` cookies, rate limiting, Helmet HTTP hardening, and isolated public asset delivery.

---

## 📋 System Requirements

- **Operating System:** Windows 10/11, Windows Server (or macOS / Linux)
- **Node.js:** **v22.5.0 or newer** (Required for native `node:sqlite` database support)
- **NPM:** v10.0.0 or newer
- **Browser:** Google Chrome, Microsoft Edge, Firefox, or Safari (Modern Evergreen Browsers)

---

## 🛠️ Step-by-Step Setup Guide (Windows)

### 1. Open Terminal
Open **PowerShell** or **Command Prompt** and navigate to the project directory:
```powershell
cd C:\path\to\Smart-Kitchen-ERP-Release
```

### 2. Install Dependencies
Install the required production packages:
```powershell
npm install
```

### 3. Configure Environment Variables
Copy the template configuration file to create your local `.env`:
```powershell
# PowerShell:
Copy-Item .env.example .env

# Command Prompt (cmd):
copy .env.example .env
```

Open `.env` in any text editor and configure your administrative credentials:
```env
# Server port (default: 8080)
PORT=8080

# Administrator account credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=SetYourStrongPasswordHere2026!

# Machine-to-Machine B2B API Key (Optional — leave blank if not used)
API_SECRET_KEY=

# Allowed CORS origins
ALLOWED_ORIGINS=http://localhost:8080,http://127.0.0.1:8080,http://localhost:3000
```
> [!NOTE]
> If `ADMIN_PASSWORD` is left blank, the server will generate a secure one-time temporary password upon first boot and print it directly to the console terminal.

### 4. (Optional) Seed Initial Demo Dataset
To populate the database with a clean, fully interconnected demo dataset (4 distribution branches, 10 raw materials, 5 manufactured products, 5 BOM recipes, and sample orders):
```powershell
npm run seed
```
> [!WARNING]
> **Data Overwrite Warning:** Running `npm run seed` will drop existing operational tables and reinitialize them with demo data. **Never run this command on an active production database.**

### 5. Launch the Server
Start the production ERP server:
```powershell
npm start
```

For development mode:
```powershell
npm run dev
```

### 6. Access the Application
Open your web browser and navigate to:
```
http://localhost:8080
```
Log in using the administrator credentials configured in step 3.

---

## 🗄️ Database & Storage Architecture

- **Engine:** Native SQLite (`node:sqlite` DatabaseSync)
- **Database File:** Stored locally at `./database.db`
- **Performance Mode:** Write-Ahead Logging (`PRAGMA journal_mode = WAL`) enabled for high-concurrency read/write throughput.
- **Backup & Restore:** To back up your entire ERP database, simply copy the `./database.db` file while the service is stopped or in idle mode.

---

## 📦 Commercial Release Manifest

The clean buyer distribution includes only the runtime essentials:

```
Smart-Kitchen-ERP-Release/
├── public/                       # Isolated client-facing web assets
│   ├── index.html                # Single-Page Application (SPA) container
│   ├── app.js                    # UI logic, state engine & calculation matrix
│   ├── style.css                 # Custom luxury dark theme styling
│   ├── hero_bg.mp4               # Background video asset
│   └── 177781627_...mp4          # Secondary video asset
├── server.js                     # Express 5 secured HTTP REST API server
├── db.js                         # SQLite schema initialization (node:sqlite)
├── seed_demo.js                  # Standalone generic demo data seeder
├── migrate.js                    # Migration helper for batch JSON imports
├── .env.example                  # Environment configuration template
├── .gitignore                    # Git tracking ignore rules
├── package.json                  # Dependencies, scripts & engine requirements
├── package-lock.json             # Locked dependency tree
└── README.md                     # Commercial handover documentation
```

---

## ⚠️ Known Limitations & Operating Scope

1. **Embedded Single-Node Database:**
   The system utilizes an embedded high-performance SQLite engine (`database.db`). It is optimized for standalone commissary kitchens, central prep facilities, or internal corporate networks. For geographically distributed multi-master clustering, an external relational database adapter would be required.
2. **Authentication Scope:**
   The release edition implements robust session-based administrator authentication via HTTP-Only cookies. Multi-role hierarchical RBAC (e.g., cashier-only vs. head-chef permissions) can be extended as needed.
3. **External Integrations:**
   Legacy cloud scripts and third-party remote connectors have been completely decoupled and quarantined; the application operates entirely self-contained.

---

## 🔒 Security Architecture

1. **Asset Isolation:** Browser-facing client assets (HTML, CSS, JS, video) are isolated inside the `public/` folder. Server source files (`server.js`, `db.js`), `.env`, and database files are strictly inaccessible via HTTP requests (returning `403 Forbidden`).
2. **Authentication:** The application uses cryptographically secure session tokens stored in HTTP-Only, SameSite cookies.
3. **Machine Integration:** Machine-to-machine external B2B requests can be authorized using the `x-api-key` HTTP header when `API_SECRET_KEY` is configured in `.env`.

---

## 📄 License
Commercial Sale & Distribution Edition — All Rights Reserved.
