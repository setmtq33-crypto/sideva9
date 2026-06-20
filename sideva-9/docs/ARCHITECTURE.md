SI-DEVA9 ARCHITECTURE

Gambaran Umum

SI-DEVA9 dibangun sebagai platform persiapan pengadaan barang/jasa pemerintah berbasis web dengan arsitektur cloud-native menggunakan Supabase sebagai Backend-as-a-Service dan Cloudflare Pages sebagai platform deployment.

Tujuan utama arsitektur ini adalah:

* Multi OPD
* Aman
* Mudah dipelihara
* Mudah dikembangkan
* Siap untuk skala besar

⸻

Arsitektur Sistem

User Browser
      │
      ▼
Cloudflare Pages
      │
      ▼
HTML + Bootstrap + Vanilla JS
      │
      ▼
Supabase Auth
      │
      ▼
Row Level Security (RLS)
      │
      ▼
PostgreSQL Database
      │
      ▼
Supabase Storage
      │
      ▼
Telegram Notification

⸻

Frontend Layer

Teknologi:

* HTML5
* CSS3
* Bootstrap 5
* Vanilla JavaScript

Karakteristik:

* Single Page Navigation
* Modular Page Architecture
* Responsive Design
* Mobile Friendly
* Progressive Web App (PWA)

Folder:

pages/
css/
components/
js/

⸻

Authentication Layer

Menggunakan:

Supabase Auth

Fungsi:

* Login
* Logout
* Session Management
* User Identification

Tabel terkait:

profiles

⸻

Authorization Layer

Menggunakan:

Role Based Access Control (RBAC)

Role:

SUPER_ADMIN
ADMIN_OPD
PPTK
PPK
PBJ
VIEWER

Dokumen referensi:

docs/ROLE_MATRIX.md

⸻

Multi OPD Layer

Konsep:

Setiap data pengadaan memiliki:

tenant_id
opd_id

Tujuan:

* Isolasi data
* Keamanan
* Multi organisasi

Aturan:

SUPER_ADMIN
    akses seluruh OPD
Selain SUPER_ADMIN
    hanya OPD sendiri

⸻

Security Layer

Prinsip:

* Security First
* RLS First
* Least Privilege

Proteksi:

* Supabase Auth
* RBAC
* Row Level Security
* Multi OPD Isolation

Dokumen referensi:

database/rls-policies.sql

⸻

Database Layer

Platform:

PostgreSQL (Supabase)

Kategori tabel:

Master Data

tenants
profiles
opds
bidangs
budget_accounts
procurement_officers
ppkoms

Pengadaan

rup_imports
packages
package_items
price_surveys
package_documents
package_dpp
package_reviews
package_hps
package_bahpe
package_determinations

Monitoring

audit_logs
telegram_notifications

Arsip

archive_documents

Dokumen referensi:

database/schema.sql

⸻

Storage Layer

Platform:

Supabase Storage

Digunakan untuk:

* Dokumen Pengadaan
* Lampiran
* File Pendukung
* Arsip Dokumen

Bucket utama:

sideva-documents

⸻

Notification Layer

Platform:

Telegram Bot API

Fungsi:

* Monitoring Aktivitas
* Audit Ringan
* Alert Operasional

Contoh aktivitas:

PACKAGE_CREATED
PACKAGE_UPDATED
ITEM_CREATED
ITEM_UPDATED
DOCUMENT_UPLOADED

Informasi yang dikirim:

* User
* Role
* Aktivitas
* Detail
* Waktu

⸻

Monitoring Layer

Modul:

Dashboard
Notifications
Audit Logs

Tujuan:

* Monitoring Aktivitas
* Monitoring Pengadaan
* Monitoring Kinerja

⸻

Workflow Pengadaan

RUP Import
      │
      ▼
Packages
      │
      ▼
Package Items
      │
      ▼
Price Surveys
      │
      ▼
DPP
      │
      ▼
Review
      │
      ▼
HPS
      │
      ▼
BAHPE
      │
      ▼
Procurement Ready
      │
      ▼
PBJ / SPSE

⸻

Deployment Architecture

Repository:

GitHub

Deployment:

Cloudflare Pages

Backend:

Supabase

Storage:

Supabase Storage

Monitoring:

Telegram

⸻

Design Principles

SI-DEVA9 dikembangkan berdasarkan prinsip:

* Database First
* Security First
* RLS First
* Multi OPD First
* Audit First
* Mobile First
* Maintainability First

⸻

Future Architecture

Target jangka panjang:

* SIPD Integration
* Advanced Audit Trail
* Analytics Dashboard
* Procurement Intelligence
* Enterprise Monitoring
* Multi Tenant Expansion

⸻

Architecture Owner

Project:

SI-DEVA9

Status:

Production Ready (Internal Deployment)

Version:

9.x
