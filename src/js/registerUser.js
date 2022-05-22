

function registerUser() {

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let path = "src/python/firebase/registration.py"
    let options = {
        mode: 'text',
        args: [username, password, email],
    }
    window.appApi.pythonRun(path , options)
}

window.onmessage = async (e) => {
    if(e.source !== window) return;
    let lent = e.data.length - 1;
    if(e.data[lent] == "registration.py")
        document.getElementById("status").innerText = e.data[0]
}
