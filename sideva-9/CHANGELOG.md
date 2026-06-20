CHANGELOG

Semua perubahan penting pada SI-DEVA9 dicatat pada dokumen ini.

⸻

Database

Implementasi struktur database SI-DEVA9 meliputi:

* tenants
* profiles
* opds
* bidangs
* budget_accounts
* rup_imports
* packages
* package_items
* price_surveys
* package_documents
* package_dpp
* package_reviews
* package_hps
* package_bahpe
* package_determinations
* procurement_officers
* ppkoms
* audit_logs
* telegram_notifications

Serta berbagai view dashboard dan procurement monitoring.



v9.0.0 - Internal Release

Fitur Utama

* Multi OPD
* Role Based Access Control (RBAC)
* Dashboard Monitoring
* RUP Import
* Packages
* Package Items
* Price Surveys
* Package Documents
* DPP
* Review
* HPS Engine
* BAHPE
* Procurement Ready
* Notification Center
* Telegram Integration
* Audit Logs

Infrastruktur

* Supabase Auth
* PostgreSQL Database
* Supabase Storage
* Cloudflare Pages
* Progressive Web App (PWA)

⸻

v9.0.1

Perbaikan

* Perbaikan isolasi data Multi OPD
* Perbaikan hak akses PPTK
* Perbaikan hak akses ADMIN OPD
* Perbaikan Package Items
* Perbaikan Survey Harga
* Perbaikan Upload Dokumen
* Perbaikan Dashboard Ranking
* Perbaikan Import RUP

Notifikasi

* Menambahkan identitas user pada notifikasi Telegram
* Menambahkan role pengguna pada notifikasi Telegram
* Menambahkan waktu aktivitas pada notifikasi Telegram

⸻

v9.0.2

Stabilization Release

* Pembersihan debug alert
* Perbaikan Package Item tenant_id
* Perbaikan hak akses modul Package Items
* Pembaruan Matriks Hak Akses
* Validasi go-live internal Disporapar
