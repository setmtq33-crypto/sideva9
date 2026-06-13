async function getRole() {

    const profile =
        await getProfile();

    return profile?.role || null;
}

async function canManageUsers() {

    const role =
        await getRole();

    return [
        'SUPER_ADMIN',
        'ADMIN_OPD'
    ].includes(role);
}

async function canManageOpds() {

    const role =
        await getRole();

    return role ===
        'SUPER_ADMIN';
}

async function canCreatePackage() {

    const role =
        await getRole();

    return [
        'SUPER_ADMIN',
        'ADMIN_OPD',
        'PPTK'
    ].includes(role);
}

async function canEditHps() {

    const role =
        await getRole();

    return [
        'SUPER_ADMIN',
        'ADMIN_OPD',
        'PPK'
    ].includes(role);
}

async function canApproveBahpe() {

    const role =
        await getRole();

    return [
        'SUPER_ADMIN',
        'ADMIN_OPD',
        'PPK'
    ].includes(role);
}

async function canSubmitPbj() {

    const role =
        await getRole();

    return [
        'SUPER_ADMIN',
        'ADMIN_OPD',
        'PPK'
    ].includes(role);
}

window.getRole =
    getRole;

window.canManageUsers =
    canManageUsers;

window.canManageOpds =
    canManageOpds;

window.canCreatePackage =
    canCreatePackage;

window.canEditHps =
    canEditHps;

window.canApproveBahpe =
    canApproveBahpe;

window.canSubmitPbj =
    canSubmitPbj;
