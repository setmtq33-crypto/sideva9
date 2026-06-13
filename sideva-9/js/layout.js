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

    if(profile){

        const el =
            document.getElementById('userName');

        if(el){

            el.innerText =
                profile.full_name;
        }
    }
}

window.loadLayout =
    loadLayout;
