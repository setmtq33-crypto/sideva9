– =====================================================
– SI-DEVA9 DATABASE SCHEMA
– =====================================================
– Sistem Informasi Digital Evaluasi dan Verifikasi
– Administrasi E-Purchasing

– Backend  : Supabase PostgreSQL
– Frontend : HTML + Bootstrap + Vanilla JS
– Version  : 9.x
– =====================================================

– =====================================================
– MASTER DATA
– =====================================================

– tenants
– Data tenant sistem

– profiles
– Data pengguna dan role

– opds
– Organisasi Perangkat Daerah

– bidangs
– Bidang pada masing-masing OPD

– budget_accounts
– Rekening belanja / akun anggaran

– procurement_officers
– Pejabat pengadaan

– ppkoms
– PPKOM dan pejabat terkait

– =====================================================
– RUP
– =====================================================

– rup_imports
– Data import RUP dari SiRUP

– =====================================================
– PENGADAAN
– =====================================================

– packages
– Paket pengadaan

– package_items
– Rincian barang/jasa

– price_surveys
– Survey harga pasar

– package_documents
– Dokumen pendukung

– package_dpp
– Dokumen Persiapan Pengadaan

– package_reviews
– Review dokumen persiapan

– package_hps
– Hasil perhitungan HPS

– package_bahpe
– Berita Acara Hasil Pengadaan E-Purchasing

– package_determinations
– Penetapan metode pengadaan

– =====================================================
– MONITORING
– =====================================================

– audit_logs
– Audit aktivitas pengguna

– telegram_notifications
– Riwayat notifikasi Telegram

– =====================================================
– ARSIP
– =====================================================

– archive_documents
– Arsip snapshot dokumen

– =====================================================
– KATALOG
– =====================================================

– catalog_products
– Produk katalog elektronik
