const TELEGRAM_BOT_TOKEN =
'8939756617:AAFIHCc210ShQ9hln2YKCYVV61ydgzBI8dU';

const TELEGRAM_CHAT_ID =
'8083514379';

async function sendTelegramMessage(text){

    try{

        const response = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: text
                })
            }
        );

        const result =
            await response.json();

        console.log(result);

        return result;

    }catch(err){

        console.error(err);

        return err;
    }
}

window.sendTelegramMessage =
    sendTelegramMessage;
