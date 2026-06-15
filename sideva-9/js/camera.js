/* * SIDEVA 9 - Camera Engine Modul
 * Powered by Alam Satria
 */

let mediaStreamInstance = null;
let modalKameraInstance = null;

// 1. Membuka Aliran Kamera Perangkat
async function bukaKamera() {
    // Inisialisasi modal bootstrap secara dinamis
    if(!modalKameraInstance) {
        modalKameraInstance = new bootstrap.Modal(document.getElementById('modalKamera'));
    }
    
    try {
        // Mengajukan izin akses kamera belakang (facingMode: environment) agar presisi di HP
        const constraints = {
            video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: false
        };
        
        mediaStreamInstance = await navigator.mediaDevices.getUserMedia(constraints);
        const videoElement = document.getElementById('videoStream');
        videoElement.srcObject = mediaStreamInstance;
        
        modalKameraInstance.show();
    } catch (err) {
        console.error("Gagal mengakses kamera: ", err);
        alert("Aplikasi gagal mengakses kamera. Pastikan browser kamu diberikan izin akses kamera dan berjalan di protokol HTTPS/Localhost ya, Beb!");
    }
}

// 2. Mengambil Gambar dari Frame Video Live
function ambilJepretan() {
    const video = document.getElementById('videoStream');
    const canvas = document.getElementById('canvasSnap');
    const konteks = canvas.getContext('2d');
    
    // Atur dimensi canvas menyamai resolusi asli video feed
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Gambar frame video saat ini ke dalam canvas
    konteks.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Konversi hasil gambar menjadi base64 untuk pratinjau instan di layar
    const dataUrlGambar = canvas.toDataURL('image/jpeg');
    const previewImg = document.getElementById('hasilFotoKamera');
    if(previewImg) {
        previewImg.src = dataUrlGambar;
        previewImg.classList.remove('d-none');
    }
    
    // Hentikan kamera & tutup jendela modal
    tutupKamera();
    
    // Siapkan file Blob mentah yang bisa langsung di-upload ke Supabase Storage
    canvas.toBlob(async (blob) => {
        if(blob) {
            console.log("File jepretan kamera siap diunggah ke Supabase!", blob);
            // Jalankan fungsi unggah otomatis ke Supabase Storage
            await kirimKeSupabaseStorage(blob);
        }
    }, 'image/jpeg', 0.85);
}

// 3. Menutup Aliran Kamera Bersih (Menghemat Baterai HP)
function tutupKamera() {
    if (mediaStreamInstance) {
        mediaStreamInstance.getTracks().forEach(track => track.stop());
    }
    if(modalKameraInstance) {
        modalKameraInstance.hide();
    }
}

// 4. Integrasi Fungsi Upload Supabase Storage (Menggunakan client global Anda)
async function kirimKeSupabaseStorage(fileBlob) {
    // Cek apakah koneksi Supabase sudah siap global
    const clientDb = window.supabaseClient;
    if(!clientDb) {
        console.error("Supabase client belum terinisialisasi.");
        return;
    }

    const namaFile = `survey_${Date.now()}.jpg`;
    
    // Menjalankan upload ke bucket database tanpa merubah logic lama
    const { data, error } = await clientDb.storage
        .from('documents') // Sesuaikan nama nama folder bucket storage di dashboard Supabase kamu
        .upload(`kamera/${namaFile}`, fileBlob, {
            contentType: 'image/jpeg',
            cacheControl: '3600'
        });
        
    if (error) {
        alert("Gagal mengunggah foto ke database: " + error.message);
    } else {
        alert("Foto jepretan kamera HP berhasil disimpan ke server SIDEVA!");
    }
}