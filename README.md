# sideva v9
SI-DEVA v9

Sistem Informasi Digital Evaluasi dan Verifikasi Administrasi E-Purchasing

SI-DEVA9 merupakan platform digital persiapan pengadaan barang/jasa pemerintah yang dirancang untuk mendukung pengelolaan kebutuhan pengadaan, penyusunan dokumen persiapan, evaluasi harga, perhitungan HPS, penyusunan BAHPE, hingga status Procurement Ready sebelum proses dilanjutkan ke SPSE.

⸻

Fitur Utama

* Multi OPD
* Multi User Role (RBAC)
* Import RUP
* Manajemen Paket Pengadaan
* Package Items
* Survey Harga
* Dokumen Pengadaan
* DPP (Dokumen Persiapan Pengadaan)
* Review Dokumen Persiapan
* HPS Engine
* BAHPE Generator
* Procurement Ready
* Audit Logs
* Notification Center
* Telegram Activity Monitoring
* Dashboard Monitoring
* SIPD Support
* PWA Ready

⸻

Teknologi

Frontend

* HTML5
* CSS3
* Bootstrap 5
* Vanilla JavaScript

Backend

* Supabase Auth
* PostgreSQL Database
* Supabase Storage
* Row Level Security (RLS)

Infrastruktur

* Cloudflare Pages
* GitHub Repository

Integrasi

* Telegram Bot API
* SiRUP
* SIPD

⸻

Arsitektur

Prinsip pengembangan:

* Database First
* Security First
* RLS First
* Multi OPD Ready
* Mobile Friendly
* Audit Trail Ready
* Enterprise Oriented

⸻

Role Pengguna

SUPER_ADMIN

Mengelola seluruh sistem:

* Semua OPD
* Semua pengguna
* Semua paket
* Monitoring aktivitas pengguna

ADMIN_OPD

Mengelola seluruh data pada OPD masing-masing.

PPTK

Menyusun kebutuhan dan dokumen pengadaan.

PPK

Melakukan verifikasi dan persiapan pengadaan.

PBJ

Melaksanakan proses pengadaan.

VIEWER

Monitoring dan pelaporan.

⸻

Workflow SI-DEVA9

RUP Import

↓

Packages

↓

Package Items

↓

Price Surveys

↓

DPP

↓

Review

↓

HPS

↓

BAHPE

↓

Procurement Ready

↓

PBJ / SPSE

⸻

Modul Sistem

Master Data

* OPD
* Bidang
* Rekening Belanja
* PPK / KPA
* Pejabat Pengadaan
* User Management

Pengadaan

* RUP Import
* Packages
* Package Items
* Price Surveys
* Package Documents
* DPP
* Review
* HPS
* BAHPE
* Procurement Ready

Monitoring

* Dashboard
* Notifications
* Audit Logs

⸻

Keamanan

SI-DEVA9 menerapkan:

* Authentication berbasis Supabase
* RBAC
* Multi OPD Isolation
* RLS
* Audit Aktivitas
* Telegram Monitoring

⸻

Monitoring Telegram

Setiap aktivitas penting dapat dikirim ke Telegram:

* PACKAGE_CREATED
* PACKAGE_UPDATED
* ITEM_CREATED
* ITEM_UPDATED
* ITEM_DELETED
* SURVEY_CREATED
* DOCUMENT_UPLOADED

Notifikasi memuat:

* Nama User
* Role
* Aktivitas
* Detail Aktivitas
* Waktu Aktivitas

⸻

Struktur Folder

sideva-9/
│
├── components/
├── css/
├── database/
├── docs/
├── js/
├── pages/
│
├── index.html
├── manifest.json
├── sw.js
└── wrangler.jsonc

Deployment

Platform:

* Cloudflare Pages

Backend:

* Supabase

Storage:

* Supabase Storage

⸻

Status

Versi:

SI-DEVA9

Status:

* Multi OPD Stabil
* Dashboard Stabil
* Packages Stabil
* Package Items Stabil
* Price Surveys Stabil
* Documents Stabil
* HPS Stabil
* BAHPE Stabil
* Notification Stabil

⸻

Roadmap

Tahap berikutnya:

* Penyempurnaan UI/UX
* Audit Trail Lanjutan
* Mobile Experience
* Integrasi SIPD Lanjutan
* Penyempurnaan Workflow Pengadaan

⸻

© SI-DEVA v9 By. Alam Satria, S.Kep., Ners., M.A.P
