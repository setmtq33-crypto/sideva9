SI-DEVA 9

Database Architecture Specification (DAS) v1.2

Tenant

Kabupaten Kapuas Hulu

Role

* SUPER_ADMIN
* ADMIN_OPD

Prinsip

1. Database First
2. RLS First
3. Security First
4. Mobile First
5. Real Multi OPD

Struktur Utama

public.tenants

public.opds

public.profiles

business.packages

business.package_items

business.price_surveys

system.audit_logs

Keamanan

SUPER_ADMIN:

* Melihat seluruh data

ADMIN_OPD:

* Hanya melihat data OPD sendiri

Modul V1

* Paket Pengadaan
* Rincian Belanja
* Survey Harga
* Monitoring Progress

Di luar scope V1

* SIPD RI Integration
* SIRUP Integration
* SPSE Integration
* BAST
* Pembayaran

Filosofi

SI-DEVA adalah sistem pendukung kerja Pejabat Pengadaan dan PPKom.

SI-DEVA bukan pengganti SIPD, SIRUP, maupun SPSE.