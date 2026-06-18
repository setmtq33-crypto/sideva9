window.supabaseClient = window.supabase.createClient(
    window.SUPABASE_URL,
    window.SUPABASE_ANON_KEY
);

async function sendNotification(
    eventType,
    title,
    message
){

    try{

        const result =
        await window.supabaseClient
            .from('telegram_notifications')
            .insert([{
                event_type: eventType,
                title: title,
                message: message
            }]);

        console.log(
            'NOTIFICATION DB',
            result
        );

    }catch(err){

        console.error(
            'NOTIFICATION ERROR',
            err
        );

    }

    try{

        if(
            typeof sendTelegramMessage
            ===
            'function'
        ){

            const telegramResult =
            await sendTelegramMessage(
`🔔 ${title}

${message}`
            );

            console.log(
                'TELEGRAM',
                telegramResult
            );
        }

    }catch(err){

        console.error(
            'TELEGRAM ERROR',
            err
        );

    }
}

window.sendNotification =
    sendNotification;
