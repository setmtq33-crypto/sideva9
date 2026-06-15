async function loadLayout() {

    const sidebar =
        await fetch('/components/sidebar.html');

    document
        .getElementById('sidebar-container')
        .innerHTML =
        await sidebar.text();

    const topbar =
        await fetch('/components/topbar.html');

    document
        .getElementById('topbar-container')
        .innerHTML =
        await topbar.text();

    const profile =
        await getProfile();

    if (!profile) return;

    const userName =
        document.getElementById('userName');

    if (userName) {

        userName.innerText =
            profile.full_name;
    }

    const role =
        profile.role;

    function hide(id) {

        const el =
            document.getElementById(id);

        if (el) {

            el.style.display =
                'none';
        }
    }

    // ADMIN OPD
    if (role === 'ADMIN_OPD') {

        hide('menuOpds');
    }

    // PPTK
    if (role === 'PPTK') {

        hide('menuUsers');
        hide('menuOpds');
        hide('menuAudit');
        hide('menuHps');
    }

    // PPK
    if (role === 'PPK') {

        hide('menuUsers');
        hide('menuOpds');
        hide('menuAudit');
        hide('menuSurvey');
        hide('menuDocuments');
        hide('menuBidangs');
        hide('menuAccounts');
    }

    // PBJ
    if (role === 'PBJ') {

        hide('menuUsers');
        hide('menuOpds');
        hide('menuAudit');
        hide('menuSurvey');
        hide('menuDocuments');
        hide('menuHps');
        hide('menuBidangs');
        hide('menuAccounts');
    }

    // VIEWER
    if (role === 'VIEWER') {

        hide('menuUsers');
        hide('menuOpds');
        hide('menuAudit');
    }
}

window.loadLayout =
    loadLayout;
