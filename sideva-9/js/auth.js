async function login() {

    const email =
        document.getElementById('email').value;

    const password =
        document.getElementById('password').value;

    const { error } =
        await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

    if (error) {

        document.getElementById('msg')
            .innerText = error.message;

        return;
    }

    window.location.href =
        'dashboard.html';
}