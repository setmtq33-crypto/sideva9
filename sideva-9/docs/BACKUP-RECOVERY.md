BACKUP & RECOVERY

Tujuan

Dokumen ini menjelaskan prosedur backup dan pemulihan SI-DEVA9.

⸻

Backup Harian

Database

Platform:

Supabase PostgreSQL

Backup:

* Export Schema
* Export Data Penting
* Simpan di repository internal

Prioritas:

* profiles
* opds
* packages
* package_items
* price_surveys
* package_documents

⸻

Backup Repository

Platform:

GitHub

Langkah:

1. Commit perubahan
2. Push ke branch utama
3. Verifikasi status repository

⸻

Backup Storage

Platform:

Supabase Storage

Bucket:

* sideva-documents

Backup:

* Download arsip dokumen
* Simpan pada media cadangan

⸻

Recovery Database

Restore Schema

1. Buka SQL Editor
2. Jalankan schema.sql
3. Verifikasi tabel

Restore Data

1. Import data backup
2. Verifikasi tenant_id
3. Verifikasi opd_id

⸻

Recovery Repository

1. Clone repository
2. Install konfigurasi
3. Verifikasi environment

⸻

Recovery Storage

1. Buat bucket
2. Restore dokumen
3. Verifikasi akses file

⸻

Checklist Recovery

* Login berhasil
* Dashboard berjalan
* Packages berjalan
* Package Items berjalan
* Price Surveys berjalan
* Documents berjalan
* HPS berjalan
* BAHPE berjalan

⸻

Catatan

Sebelum perubahan besar:

* Backup Database
* Backup Storage
* Backup Repository

Tidak diperbolehkan melakukan perubahan struktural tanpa backup terlebih dahulu.
