async function loadLayout() {
    // 1. Bersihkan kontainer sebelum memuat ulang
    const sidebarContainer = document.getElementById('sidebar-container');
    const topbarContainer = document.getElementById('topbar-container');
    if (sidebarContainer) sidebarContainer.innerHTML = '';
    if (topbarContainer) topbarContainer.innerHTML = '';

    // 2. Fetch Sidebar
    try {
        const sidebarResponse = await fetch('/components/sidebar.html');
        const sidebarHtml = await sidebarResponse.text();
        sidebarContainer.innerHTML = sidebarHtml;
    } catch (err) {
        console.error("Gagal memuat sidebar:", err);
    }

    // 3. Fetch Topbar
    try {
        const topbarResponse = await fetch('/components/topbar.html');
        const topbarHtml = await topbarResponse.text();
        topbarContainer.innerHTML = topbarHtml;
    } catch (err) {
        console.error("Gagal memuat topbar:", err);
    }

    // 4. Update Nama User
    const profile = await getProfile();
    if (profile) {
        const userName = document.getElementById('userName');
        if (userName) userName.innerText = profile.full_name;
        
        // Logika hide menu berdasarkan role
        const role = profile.role;
        const menuConfigs = {
            'ADMIN_OPD': ['menuOpds'],
            'PPTK': ['menuUsers', 'menuOpds', 'menuAudit', 'menuHps'],
            'PPK': ['menuUsers', 'menuOpds', 'menuAudit', 'menuSurvey', 'menuDocuments', 'menuBidangs', 'menuAccounts'],
            'PBJ': ['menuUsers', 'menuOpds', 'menuAudit', 'menuSurvey', 'menuDocuments', 'menuHps', 'menuBidangs', 'menuAccounts'],
            'VIEWER': ['menuUsers', 'menuOpds', 'menuAudit']
        };

        if (menuConfigs[role]) {
            menuConfigs[role].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });
        }
    }
}
window.loadLayout = loadLayout;

function toggleAppTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
window.toggleAppTheme = toggleAppTheme;

