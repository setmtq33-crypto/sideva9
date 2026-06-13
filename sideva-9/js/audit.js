const db = window.supabaseClient;

async function writeAuditLog(
    moduleName,
    actionName,
    recordId,
    description
){

    try{

        const profile =
            await getProfile();

        await db
        .from('audit_logs')
        .insert({

            tenant_id:
                profile?.tenant_id || null,

            user_id:
                profile?.id || null,

            module_name:
                moduleName,

            action_name:
                actionName,

            record_id:
                recordId,

            description:
                description
        });

    }catch(err){

        console.error(
            'Audit Log Error',
            err
        );
    }
}

window.writeAuditLog =
    writeAuditLog;
