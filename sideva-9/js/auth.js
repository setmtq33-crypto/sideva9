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

async function getProfile() {

    const {
        data: { user }
    } = await supabaseClient.auth.getUser();

    if (!user) {

        window.location.href = "/pages/login";
        return null;
    }

    const { data, error } =
        await supabaseClient
            .from('profiles')
            .select('*')
            .eq('auth_user_id', user.id)
            .single();

    if (error) {

        console.error(error);
        return null;
    }

    return data;
}

window.getProfile = getProfile;
