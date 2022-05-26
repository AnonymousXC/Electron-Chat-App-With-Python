const Store = require("electron-store")

let store = new Store();


function saveUsername(username) {
    store.set("username" , username);
}


function saveEmail(email) {
    store.set("email" , email);
}


function saveTime(time) {
    store.set("lastopened" , time);
}

function saveProfilePic(url) {
    store.set("profilePicURL", url)
}


function readDataUET() {
    return {"username" : store.get("username"), "email" : store.get("email"), "date" : store.get("lastopened"), "pfp_url" : store.get("profilePicURL")}
}


module.exports = {
    saveUsername : saveUsername,
    saveEmail: saveEmail,
    saveTime: saveTime,
    saveProfilePic: saveProfilePic,
    readDataUET: readDataUET,
}