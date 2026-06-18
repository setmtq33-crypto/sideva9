const TELEGRAM_BOT_TOKEN =
'8939756617:AAFIHCc210ShQ9hln2YKCYVV61ydgzBI8dU';

const TELEGRAM_CHAT_ID =
'8083514379';

async function sendTelegramMessage(
    text
){

    try{

        await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    chat_id:
                        TELEGRAM_CHAT_ID,
                    text:
                        text
                })
            }
        );

    }catch(err){

        console.error(
            'Telegram Error',
            err
        );

    }
}

window.sendTelegramMessage =
    sendTelegramMessage;
