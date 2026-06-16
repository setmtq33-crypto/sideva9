async function loadLayout() {
    // 1. Ambil Kontainer
    const sidebarContainer = document.getElementById('sidebar-container');
    const topbarContainer = document.getElementById('topbar-container');

    // 2. Fetch Sidebar (Hanya jika elemen ada di halaman tersebut)
    if (sidebarContainer) {
        try {
            const sidebarResponse = await fetch('/components/sidebar.html');
            if (sidebarResponse.ok) {
                sidebarContainer.innerHTML = await sidebarResponse.text();
            }
        } catch (err) {
            console.error("Gagal memuat sidebar:", err);
        }
    }

    // 3. Fetch Topbar (Hanya jika elemen ada di halaman tersebut)
    if (topbarContainer) {
        try {
            const topbarResponse = await fetch('/components/topbar.html');
            if (topbarResponse.ok) {
                topbarContainer.innerHTML = await topbarResponse.text();
            }
        } catch (err) {
            console.error("Gagal memuat topbar:", err);
        }
    }

    // 4. Update Nama User & Logika Hak Akses Menu
    const profile = await getProfile();
    if (profile) {
        const userName = document.getElementById('userName');
        if (userName) userName.innerText = profile.full_name;
        
        // LOGIKA HAK AKSES:
        // Jika SUPER_ADMIN, maka akses diberikan penuh (tidak menyembunyikan menu apapun).
        // Jika bukan SUPER_ADMIN, baru terapkan filter menu berdasarkan role.
        if (profile.role !== 'SUPER_ADMIN') {
            const menuConfigs = {
                'ADMIN_OPD': ['menuOpds'],
                'PPTK': ['menuUsers', 'menuOpds', 'menuAudit', 'menuHps'],
                'PPK': ['menuUsers', 'menuOpds', 'menuAudit', 'menuSurvey', 'menuDocuments', 'menuBidangs', 'menuAccounts'],
                'PBJ': ['menuUsers', 'menuOpds', 'menuAudit', 'menuSurvey', 'menuDocuments', 'menuHps', 'menuBidangs', 'menuAccounts'],
                'VIEWER': ['menuUsers', 'menuOpds', 'menuAudit']
            };

            const hiddenMenus = menuConfigs[profile.role] || [];
            hiddenMenus.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });
        }
    }
}

// Ekspos ke window agar bisa dipanggil dari HTML
window.loadLayout = loadLayout;

function toggleAppTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
