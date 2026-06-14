// ============================================================================
//  SIDEVA v9 — CORE CODES ENGINE RENDER INTEGRASI DOKUMEN FISIK KERTAS KERJA
// ============================================================================

const docDb = window.supabaseClient;

function docFmtRp(v) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v || 0);
}

function docFmtDate(dateStr) {
    const d = dateStr ? new Date(dateStr) : new Date();
    const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

function docGenerateKop(profile) {
    const namaOpd = (profile?.opd_name || "Dinas Pemerintah Daerah").toUpperCase();
    return `
    <div style="text-align:center; border-bottom:3px double #000; padding-bottom:6px; margin-bottom:20px; font-family:'Times New Roman',Times,serif; color:#000;">
        <h4 style="margin:0; font-size:13pt; font-weight:bold; letter-spacing:0.5px;">PEMERINTAH KABUPATEN DAERAH</h4>
        <h3 style="margin:2px 0; font-size:15pt; font-weight:bold; letter-spacing:0.5px;">${namaOpd}</h3>
        <p style="margin:0; font-size:9.5pt; font-style:italic;">Alamat Kompleks Perkantoran Terpadu Sektor Pengadaan Terintegrasi</p>
    </div>`;
}

async function renderSidevaDocument(slug, packageId) {
    const targetDiv = document.getElementById('document-render-area');
    if (!targetDiv) return;

    targetDiv.innerHTML = `
        <div class="text-center text-white p-5">
            <div class="spinner-border text-light spinner-border-sm"></div>
            <p class="small mt-2">Menarik data & merangkai dokumen fisik...</p>
        </div>`;

    try {
        let profile = null;
        if (window.currentUserProfile) {
            profile = window.currentUserProfile;
        }

        // Ambil Data Utama Paket
        const { data: paket, error: errPaket } = await docDb
            .from('packages')
            .select('*')
            .eq('id', packageId)
            .single();

        if (errPaket || !paket) throw new Error("Gagal mengambil data paket induk database.");

        // Ambil Item Barang & Survey Harga Terkait
        const { data: items, error: errItems } = await docDb
            .from('package_items')
            .select('*, price_surveys(*)')
            .eq('package_id', packageId);

        const listItems = items || [];
        const kopHtml = docGenerateKop(profile);
        const tglSekarang = docFmtDate(new Date());

        let htmlOutput = "";
        switch (slug) {
            case 'idkb': htmlOutput = viewIdkb(kopHtml, paket, listItems, tglSekarang); break;
            case 'penetapan': htmlOutput = viewPenetapan(kopHtml, paket, listItems, tglSekarang); break;
            case 'nodis': htmlOutput = viewNodis(kopHtml, paket, listItems, tglSekarang); break;
            case 'sppbj': htmlOutput = viewSppbj(kopHtml, paket, listItems, tglSekarang); break;
            case 'formdpp': htmlOutput = viewDpp(kopHtml, paket, listItems, tglSekarang); break;
            case 'formspek': htmlOutput = viewSpek(kopHtml, paket, listItems, tglSekarang); break;
            case 'riviu': htmlOutput = viewRiviu(kopHtml, paket, listItems, tglSekarang); break;
            case 'evhp': htmlOutput = viewEvhp(kopHtml, paket, listItems, tglSekarang); break;
            case 'evat': htmlOutput = viewEvat(kopHtml, paket, listItems, tglSekarang); break;
            case 'bahpe': htmlOutput = viewBahpe(kopHtml, paket, listItems, tglSekarang); break;
            default: htmlOutput = `<div class="alert alert-warning text-dark">Format Dokumen Belum Terdaftar.</div>`;
        }

        targetDiv.innerHTML = `
            <div class="bg-white text-dark p-5 mx-auto text-start shadow-lg" 
                 style="width:100%; max-width:760px; min-height:980px; font-family:'Times New Roman',Times,serif; font-size:11pt; line-height:1.5; color:#000;">
                ${htmlOutput}
            </div>`;

    } catch (e) {
        console.error(e);
        targetDiv.innerHTML = `<div class="alert alert-danger m-2 text-dark small">❌ Gagal Render Dokumen: ${e.message}</div>`;
    }
}

// Template Render Berkas Fisik Pemerintahan
function viewIdkb(kop, p, items, tgl) {
    let rows = "";
    items.forEach((it, i) => { rows += `<tr><td style="border:1px solid #000; padding:5px; text-align:center;">${i+1}</td><td style="border:1px solid #000; padding:5px;">${it.item_name}</td><td style="border:1px solid #000; padding:5px; text-align:center;">${it.volume} ${it.unit}</td></tr>`; });
    return `${kop}<div style="text-align:center; font-weight:bold; font-size:13pt; text-decoration:underline;">FORMULIR IDENTIFIKASI KEBUTUHAN BARANG/JASA</div><div style="text-align:center; margin-bottom:15px; font-size:10pt;">Nomor: IDKB/${p.rup_id || '...'}/SIDEVA9</div><table style="width:100%; border-collapse:collapse; font-size:10.5pt;"><tr><td style="width:30%; font-weight:bold; padding:6px; border:1px solid #000; background:#f5f5f5;">Nama Paket</td><td style="padding:6px; border:1px solid #000;">${p.package_name}</td></tr><tr><td style="font-weight:bold; padding:6px; border:1px solid #000; background:#f5f5f5;">Total Pagu Anggaran</td><td style="padding:6px; border:1px solid #000; font-weight:bold; color:blue;">${docFmtRp(p.budget)}</td></tr></table><p style="margin-top:20px; font-weight:bold; margin-bottom:5px;">Daftar Item Kebutuhan:</p><table style="width:100%; border-collapse:collapse; font-size:10.5pt;"><tr style="background:#eee;"><th style="border:1px solid #000; padding:6px; width:8%; text-align:center;">No</th><th style="border:1px solid #000; padding:6px;">Nama Komoditas</th><th style="border:1px solid #000; padding:6px; width:25%; text-align:center;">Volume Target</th></tr>${rows || '<tr><td colspan="3" style="border:1px solid #000; text-align:center; padding:10px;">Belum ada item belanja</td></tr>'}</table><div style="margin-top:50px; float:right; width:250px;"><div>Disahkan, ${tgl}</div><div style="font-weight:bold; margin-bottom:65px;">Pejabat Pembuat Komitmen</div><div style="font-weight:bold; text-decoration:underline;">(.........................................)</div></div><div style="clear:both;"></div>`;
}

function viewPenetapan(kop, p, items, tgl) {
    return `${kop}<div style="text-align:center; font-weight:bold; font-size:13pt; text-decoration:underline; margin-bottom:15px;">SURAT PENETAPAN METODE PENGADAAN</div><p>Berdasarkan analisis kesiapan pasar e-katalog LKPP, dengan ini Pejabat Pembuat Komitmen memutuskan menetapkan cara pengadaan untuk:</p><table style="width:100%; border-collapse:collapse; margin-bottom:20px;"><tr><td style="width:35%; padding:6px; border:1px solid #000; font-weight:bold; background:#f9f9f9;">Nama Paket Pekerjaan</td><td style="padding:6px; border:1px solid #000;">${p.package_name}</td></tr><tr><td style="padding:6px; border:1px solid #000; font-weight:bold; background:#f9f9f9;">Metode Pemilihan</td><td style="padding:6px; border:1px solid #000; font-weight:bold; color:green;">E-PURCHASING (MELALUI KATALOG ELEKTRONIK)</td></tr></table><p>Ketetapan ini dibuat sah untuk diserahkan kepada Pejabat Pengadaan agar segera dilaksanakan pembelanjaan daring.</p><div style="margin-top:50px; float:right; width:250px;"><div>Ditetapkan pada: ${tgl}</div><div style="font-weight:bold; margin-bottom:60px;">Pejabat Pembuat Komitmen</div><div style="text-decoration:underline; font-weight:bold;">(.........................................)</div></div><div style="clear:both;"></div>`;
}

function viewNodis(kop, p, items, tgl) {
    return `${kop}<div style="text-align:center; font-weight:bold; font-size:14pt; margin-bottom:15px;">NOTA DINAS INTERN</div><table style="width:100%; border-bottom:2px solid #000; padding-bottom:8px; margin-bottom:20px; line-height:1.6;"><tr><td style="width:15%; font-weight:bold;">Kepada Yth</td><td>: Pejabat Pengadaan Instansi</td></tr><tr><td style="font-weight:bold;">Dari</td><td>: Pejabat Pembuat Komitmen (PPKom)</td></tr><tr><td style="font-weight:bold;">Perihal</td><td style="font-weight:bold;">: Permohonan Pelaksanaan E-Purchasing Paket ${p.package_name}</td></tr></table><p>Bersama nota dinas ini kami sampaikan Dokumen Persiapan Pengadaan (DPP) dengan nilai alokasi anggaran sebesar <strong>${docFmtRp(p.budget)}</strong>. Mohon diproses transaksi pemesanan pada sistem katalog elektronik.</p><div style="margin-top:50px; float:right; width:250px;"><div style="font-weight:bold; margin-bottom:60px;">Pejabat Pembuat Komitmen</div><div style="text-decoration:underline; font-weight:bold;">(.........................................)</div></div><div style="clear:both;"></div>`;
}

function viewSppbj(kop, p, items, tgl) {
    return `${kop}<div style="text-align:center; font-weight:bold; font-size:12pt; text-decoration:underline; margin-bottom:20px;">SURAT PENUNJUKAN PENUGASAN PENGADAAN BARANG/JASA</div><p>Menindaklanjuti permohonan nota dinas dari PPKom, dengan ini Pengguna Anggaran memberikan mandat penugasan penuh kepada <strong>Pejabat Pengadaan</strong> untuk segera menginisiasi belanja daring paket <strong>${p.package_name}</strong> secara tertib dan transparan.</p><div style="margin-top:60px; float:right; width:250px;"><div>Dikeluarkan pada: ${tgl}</div><div style="font-weight:bold; margin-bottom:60px;">Pengguna Anggaran / Kepala Dinas</div><div style="text-decoration:underline; font-weight:bold;">(.........................................)</div></div><div style="clear:both;"></div>`;
}

function viewDpp(kop, p, items, tgl) {
    return `${kop}<div style="text-align:center; font-weight:bold; font-size:13pt; text-decoration:underline; margin-bottom:20px;">DOKUMEN PERSIAPAN PENGADAAN (DPP)</div><table style="width:100%; border-collapse:collapse; font-size:10.5pt;"><tr style="background:#eee;"><th style="border:1px solid #000; padding:6px; width:8%; text-align:center;">No</th><th style="border:1px solid #000; padding:6px;">Parameter Kelengkapan</th><th style="border:1px solid #000; padding:6px;">Status Kesiapan Berkas</th></tr><tr><td style="border:1px solid #000; padding:6px; text-align:center;">1</td><td style="border:1px solid #000; padding:6px; font-weight:bold;">Spesifikasi Mutu Produk</td><td style="border:1px solid #000; padding:6px;">Telah Lengkap & Sesuai Kriteria TKDN</td></tr><tr><td style="border:1px solid #000; padding:6px; text-align:center;">2</td><td style="border:1px solid #000; padding:6px; font-weight:bold;">Pagu HPS Maksimal</td><td style="border:1px solid #000; padding:6px; font-weight:bold; color:blue;">${docFmtRp(p.budget)}</td></tr></table><div style="margin-top:50px; float:right; width:250px;"><div style="font-weight:bold; margin-bottom:60px;">Disusun Oleh PPKom,</div><div style="text-decoration:underline; font-weight:bold;">(.........................................)</div></div><div style="clear:both;"></div>`;
}

function viewSpek(kop, p, items, tgl) {
    let rows = "";
    items.forEach((it, i) => { rows += `<tr><td style="border:1px solid #000; padding:5px; text-align:center;">${i+1}</td><td style="border:1px solid #000; padding:5px; font-weight:bold;">${it.item_name}</td><td style="border:1px solid #000; padding:5px;">Baru, Original, Bergaransi Resmi Serta Memenuhi Regulasi TKDN.</td></tr>`; });
    return `${kop}<div style="text-align:center; font-weight:bold; font-size:13pt; text-decoration:underline; margin-bottom:15px;">SPESIFIKASI TEKNIS DAN MINIMAL MUTU PRODUK</div><table style="width:100%; border-collapse:collapse; font-size:10.5pt;"><tr style="background:#eee;"><th style="border:1px solid #000; padding:6px; width:8%;">No</th><th style="border:1px solid #000; padding:6px; width:35%;">Nama Komoditas</th><th style="border:1px solid #000; padding:6px;">Minimal Kriteria Standar Teknis</th></tr>${rows}</table><div style="margin-top:50px; float:right; width:250px;"><div style="font-weight:bold; margin-bottom:60px;">Pejabat Pembuat Komitmen</div><div style="text-decoration:underline; font-weight:bold;">(.........................................)</div></div><div style="clear:both;"></div>`;
}

function viewRiviu(kop, p, items, tgl) {
    return `${kop}<div style="text-align:center; font-weight:bold; font-size:12pt; text-decoration:underline; margin-bottom:20px;">BERITA ACARA KAJI ULANG / RIVIU DOKUMEN PERSIAPAN</div><p>Pejabat Pengadaan bersama PPKom telah mengadakan kaji ulang terhadap berkas paket <strong>${p.package_name}</strong>. Seluruh spesifikasi teknik dan rancangan pemesanan dinyatakan VALID dan siap ditransaksikan.</p><div style="margin-top:50px; display:flex; justify-content:space-between;"><div style="width:220px; font-weight:bold;">Pejabat Pembuat Komitmen<br><br><br><br>(.....................................)</div><div style="width:220px; font-weight:bold; text-align:right;">Pejabat Pengadaan<br><br><br><br>(.....................................)</div></div>`;
}

function viewEvhp(kop, p, items, tgl) {
    let rows = "";
    items.forEach((it, i) => { rows += `<tr><td style="border:1px solid #000; padding:6px; text-align:center;">${i+1}</td><td style="border:1px solid #000; padding:6px;">${it.item_name}</td><td style="border:1px solid #000; padding:6px; text-align:right;">${docFmtRp(it.price)}</td><td style="border:1px solid #000; padding:6px; font-weight:bold; text-align:right; color:darkblue;">${docFmtRp(it.price)}</td></tr>`; });
    return `${kop}<div style="text-align:center; font-weight:bold; font-size:12pt; text-decoration:underline; margin-bottom:15px;">BERITA ACARA EVALUASI HARGA PENAWARAN (EVHP)</div><table style="width:100%; border-collapse:collapse; font-size:10.5pt;"><tr style="background:#eee;"><th style="border:1px solid #000; padding:5px; text-align:center;">No</th><th style="border:1px solid #000; padding:5px;">Deskripsi Komoditas Belanja</th><th style="border:1px solid #000; padding:5px; text-align:center;">Harga HPS</th><th style="border:1px solid #000; padding:5px; text-align:center;">Harga Final Negosiasi</th></tr>${rows}</table><div style="margin-top:40px; float:right; width:250px;"><div style="font-weight:bold; margin-bottom:60px;">Pejabat Pengadaan</div><div style="text-decoration:underline; font-weight:bold;">(.........................................)</div></div><div style="clear:both;"></div>`;
}

function viewEvat(kop, p, items, tgl) {
    return `${kop}<div style="text-align:center; font-weight:bold; font-size:12pt; text-decoration:underline; margin-bottom:20px;">DOKUMEN EVALUASI ADMINISTRASI KUALIFIKASI PENYEDIA (EVAT)</div><p>Pejabat Pengadaan menerangkan bahwa seluruh vendor / penyedia barang e-katalog pada paket <strong>${p.package_name}</strong> berstatus valid administrasi legalitas kualifikasi formal dan tidak masuk dalam sanksi daftar hitam.</p><p>Hasil Penilaian Akhir: <strong style="color:green;">MEMENUHI SYARAT (LULUS)</strong></p><div style="margin-top:50px; float:right; width:250px;"><div style="font-weight:bold; margin-bottom:60px;">Pejabat Pengadaan</div><div style="text-decoration:underline; font-weight:bold;">(.........................................)</div></div><div style="clear:both;"></div>`;
}

function viewBahpe(kop, p, items, tgl) {
    return `${kop}<div style="text-align:center; font-weight:bold; font-size:13pt; text-decoration:underline;">BERITA ACARA HASIL PENGADAAN E-PURCHASING (BAHPE)</div><div style="text-align:center; margin-bottom:20px; font-size:10pt;">Nomor: BAHPE/${p.id}/SIDEVA9</div><p>Pejabat Pengadaan menyatakan bahwa transaksi e-purchasing untuk paket kerja <strong>${p.package_name}</strong> dengan nilai alokasi <strong>${docFmtRp(p.budget)}</strong> telah terlaksana dengan sah sesuai regulasi pengadaan barang/jasa pemerintah.</p><div style="margin-top:50px; display:flex; justify-content:space-between;"><div style="width:220px; font-weight:bold;">Pejabat Pembuat Komitmen<br><br><br><br>(.....................................)</div><div style="width:220px; font-weight:bold; text-align:right;">Pejabat Pengadaan<br><br><br><br>(.....................................)</div></div>`;
}

window.renderSidevaDocument = renderSidevaDocument;