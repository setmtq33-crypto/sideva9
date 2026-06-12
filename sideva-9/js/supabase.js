const supabaseClient = supabase.createClient(
    window.SUPABASE_URL,
    window.SUPABASE_ANON_KEY
);

window.supabaseClient = supabaseClient;
