ROLE MATRIX SI-DEVA9

Tujuan

Dokumen ini menjelaskan hak akses setiap role dalam SI-DEVA9.

Prinsip utama:

* Least Privilege
* Multi OPD Isolation
* Security First
* Audit Ready

⸻

Role

SUPER_ADMIN

Akses penuh ke seluruh sistem.

Hak Akses

* Semua OPD
* Semua User
* Semua Data
* Semua Modul
* Monitoring Aktivitas
* Monitoring Telegram
* Konfigurasi Sistem

⸻

ADMIN_OPD

Mengelola seluruh data pada OPD masing-masing.

Hak Akses

* CRUD Data OPD Sendiri
* Kelola Paket
* Kelola Rincian
* Kelola Survey Harga
* Kelola Dokumen
* Monitoring Dashboard OPD

Tidak dapat:

* Melihat data OPD lain
* Mengelola tenant

⸻

PPTK

Menyusun kebutuhan pengadaan.

Hak Akses

* Kelola Paket
* Kelola Package Items
* Kelola Survey Harga
* Kelola Dokumen

Tidak dapat:

* Mengelola User
* Mengelola OPD
* Mengakses data OPD lain

⸻

PPK

Melakukan verifikasi dan persiapan pengadaan.

Hak Akses

* Review Paket
* Review Survey
* Review Dokumen
* HPS
* BAHPE

Tidak dapat:

* Mengelola User
* Mengelola OPD

⸻

PBJ

Pelaksana pengadaan.

Hak Akses

* Monitoring Paket
* Monitoring HPS
* Monitoring BAHPE
* Monitoring Procurement Ready

Tidak dapat:

* Mengubah data paket

⸻

VIEWER

Hak akses baca.

Hak Akses

* Dashboard
* Monitoring
* Laporan

Tidak dapat:

* Menambah Data
* Mengubah Data
* Menghapus Data

⸻

Matriks Hak Akses

Modul	SUPER_ADMIN	ADMIN_OPD	PPTK	PPK	PBJ	VIEWER
Dashboard	✅	✅	✅	✅	✅	✅
RUP Import	✅	✅	👁	👁	👁	👁
Packages	✅	✅	✅	✅	✅	👁
Package Items	✅	✅	✅	👁	👁	👁
Price Surveys	✅	✅	✅	👁	👁	👁
Package Documents	✅	✅	✅	👁	👁	👁
DPP	✅	✅	✅	✅	👁	👁
Review	✅	👁	👁	✅	👁	👁
HPS	✅	✅	👁	✅	👁	👁
BAHPE	✅	👁	👁	✅	👁	👁
Procurement Ready	✅	👁	👁	✅	✅	👁
Notifications	✅	👁	👁	👁	👁	👁
Audit Logs	✅	👁	❌	❌	❌	❌
User Management	✅	❌	❌	❌	❌	❌
OPD Management	✅	❌	❌	❌	❌	❌

⸻

Multi OPD Rules

SUPER_ADMIN

Dapat melihat seluruh data lintas OPD.

Selain SUPER_ADMIN

Hanya dapat mengakses:

* tenant_id yang sama
* opd_id yang sesuai

Tidak diperbolehkan melihat data OPD lain.

⸻

Audit

Seluruh aktivitas penting dapat direkam melalui:

* Audit Logs
* Telegram Notifications

Aktivitas yang dicatat:

* Login
* Pembuatan Paket
* Perubahan Paket
* Penghapusan Data
* Upload Dokumen
* Survey Harga
* Aktivitas Pengadaan

⸻

Catatan

Perubahan hak akses harus:

1. Memperbarui ROLE_MATRIX.md
2. Memperbarui RLS
3. Memperbarui UI
4. Memperbarui Dokumentasi
