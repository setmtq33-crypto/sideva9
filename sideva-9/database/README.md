Database SI-DEVA9

Database SI-DEVA9 menggunakan PostgreSQL yang dikelola melalui Supabase.

Prinsip

* Multi Tenant
* Multi OPD
* Row Level Security (RLS)
* Role Based Access Control (RBAC)
* Audit Trail
* Telegram Monitoring

Tabel Utama

Master Data

* tenants
* profiles
* opds
* bidangs
* budget_accounts
* procurement_officers
* ppkoms

Pengadaan

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

Monitoring

* audit_logs
* telegram_notifications

Arsip

* archive_documents

Katalog

* catalog_products

Catatan

Seluruh tabel pengadaan menerapkan:

* tenant_id
* opd_id

untuk mendukung isolasi data Multi OPD.
