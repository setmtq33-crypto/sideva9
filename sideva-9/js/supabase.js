window.supabaseClient = window.supabase.createClient(
    window.SUPABASE_URL,
    window.SUPABASE_ANON_KEY
);

async function sendNotification(
    eventType,
    title,
    message
){

    let profile = null;

    try{

        if(
            typeof getProfile ===
            'function'
        ){
            profile =
                await getProfile();
        }

    }catch(e){

        console.warn(e);

    }

    const fullMessage = `
👤 User : ${profile?.full_name || '-'}

🎖 Role : ${profile?.role || '-'}

📌 Aktivitas : ${eventType}

📄 Detail : ${message}

🕒 Waktu : ${new Date().toLocaleString('id-ID')}
`.trim();

    try{

        const result =
        await window.supabaseClient
            .from(
                'telegram_notifications'
            )
            .insert([{

                event_type:
                    eventType,

                title:
                    title,

                message:
                    fullMessage

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

            const telegramText =
`🔔 ${title}

${fullMessage}`;

            const telegramResult =
                await sendTelegramMessage(
                    telegramText
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
