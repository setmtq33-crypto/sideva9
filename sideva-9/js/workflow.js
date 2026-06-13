const db = window.supabaseClient;

async function updatePackageStatus(packageId){

    const { data: items } =
        await db
        .from('package_items')
        .select('id')
        .eq('package_id', packageId);

    const { data: docs } =
        await db
        .from('package_documents')
        .select('id')
        .eq('package_id', packageId);

    const { data: hps } =
        await db
        .from('package_hps')
        .select('id')
        .eq('package_id', packageId);

    let surveyCount = 0;

    if(items && items.length){

        const itemIds =
            items.map(x => x.id);

        const { data: surveys } =
            await db
            .from('price_surveys')
            .select('id')
            .in('package_item_id', itemIds);

        surveyCount =
            surveys?.length || 0;
    }

    let status = 'DRAFT';

    if(items?.length > 0)
        status = 'ITEMS_COMPLETE';

    if(surveyCount > 0)
        status = 'SURVEY_COMPLETE';

    if(docs?.length > 0)
        status = 'DOCUMENT_COMPLETE';

    if(hps?.length > 0)
        status = 'HPS_COMPLETE';

    const { error } =
        await db
        .from('packages')
        .update({
            package_status: status
        })
        .eq('id', packageId);

    if(error){
        console.error(error);
    }

    return status;
}

window.updatePackageStatus =
    updatePackageStatus;
