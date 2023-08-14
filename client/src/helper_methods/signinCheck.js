const checkIfSignedIn = async () => {
    let data = await fetch('http://localhost:3001');
    let response = await data.json();
    let signedIn = response.isSignedIn;
    return signedIn;
}

module.exports = { checkIfSignedIn };