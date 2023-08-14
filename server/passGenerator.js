function generatePassword() {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let pass = '';
    let passLength = Math.floor((Math.random() + 1) * ((Math.random() + 1)* 10));

    if (passLength < 8) {
        passLength = 8;
    }

    for (let i = 0; i < passLength; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return pass;
}

module.exports = { generatePassword };