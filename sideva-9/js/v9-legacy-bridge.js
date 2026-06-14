// /js/v9-legacy-bridge.js
let selectedPackageId = null;

// Dipanggil saat klik paket di daftar
function selectPaket(id) {
    selectedPackageId = id;
    document.getElementById('nav-dokumen-v8').style.display = 'block';
    document.getElementById('doc-render-area').innerHTML = "Silakan pilih dokumen di atas.";
}

// Master Bridge 10 Dokumen
async function renderDokumenV8(type, packageId) {
    const { data: pkg } = await window.arsipDb
        .from('packages')
        .select('*')
        .eq('id', packageId)
        .single();

    window.state = { paket: { data: [pkg] } };

    const area = document.getElementById('doc-render-area');
    const docMap = {
        evat:      { id: 'evat-content',      func: loadEvatData },
        evhp:      { id: 'evhp-content',      func: loadEvhpData },
        formspek:  { id: 'formspek-content',  func: loadFormSpekData },
        formdpp:   { id: 'formdpp-content',   func: loadFormDppData },
        nodis:     { id: 'nodis-content',     func: loadNodisData },
        riviu:     { id: 'riviu-content',     func: loadRiviuData },
        penetapan: { id: 'penetapan-content', func: loadPenetapanData },
        idkb:      { id: 'idkb-content',      func: loadIdkbData },
        bahpe:     { id: 'bahpe-content',     func: loadBahpeData },
        lainnya:   { id: 'lainnya-content',   func: loadLainnyaData }
    };

    const doc = docMap[type];
    if (doc) {
        area.innerHTML = `<div id="${doc.id}"></div>`;
        doc.func(); // Memanggil fungsi v8 kamu
    }
}
