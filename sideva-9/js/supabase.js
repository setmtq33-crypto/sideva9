window.supabaseClient = window.supabase.createClient(
    window.SUPABASE_URL,
    window.SUPABASE_ANON_KEY
);

async function sendNotification(
    eventType,
    title,
    message
){

    return await window.supabaseClient
        .from('telegram_notifications')
        .insert([{
            event_type: eventType,
            title: title,
            message: message
        }]);
}

window.sendNotification =
    sendNotification;
