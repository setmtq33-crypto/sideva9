async function getRole() {
    const profile = await getProfile();
    return profile?.role || null;
}

async function canManageUsers() {
    const role = await getRole();
    return ['SUPER_ADMIN','ADMIN_OPD'].includes(role);
}

async function canManageOpds() {
    const role = await getRole();
    return role === 'SUPER_ADMIN';
}

async function canManageRup() {
    const role = await getRole();
    return ['SUPER_ADMIN','ADMIN_OPD'].includes(role);
}

async function canManagePackages() {
    const role = await getRole();
    return ['SUPER_ADMIN','ADMIN_OPD','PPTK'].includes(role);
}

async function canManageSurvey() {
    const role = await getRole();
    return ['SUPER_ADMIN','ADMIN_OPD','PBJ'].includes(role);
}

async function canManageHps() {
    const role = await getRole();
    return ['SUPER_ADMIN','ADMIN_OPD','PBJ'].includes(role);
}

async function canManageBahpe() {
    const role = await getRole();
    return ['SUPER_ADMIN','ADMIN_OPD','PBJ'].includes(role);
}

window.getRole = getRole;
window.canManageUsers = canManageUsers;
window.canManageOpds = canManageOpds;
window.canManageRup = canManageRup;
window.canManagePackages = canManagePackages;
window.canManageSurvey = canManageSurvey;
window.canManageHps = canManageHps;
window.canManageBahpe = canManageBahpe;
