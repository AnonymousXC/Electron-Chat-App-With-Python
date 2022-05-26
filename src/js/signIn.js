

function signIn() {

    document.getElementById("status").innerHTML = `Logging In <img src="../resources/gifs/cupertino_activity_indicator.gif" alt="" width="23px" id="loading-gif">`

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    // let password = document.getElementById("password").value;

    let path = "src/python/firebase/sign_in.py"
    let options = {
        mode: 'json',
        args: [username, email],
        pythonOptions: ['-u'],
    }
    window.appApi.pythonRun(path, options)
    // setNameEmail(username, email)
}


window.onmessage = async (e) => {

    if(e.source !== window) return

    let dataLen = e.data.length - 1;
    console.log(e.data);
    if(e.data[dataLen] == "sign_in.py") {
        if(typeof(e.data[0]) == "object")
            document.getElementById("status").innerHTML = "Logged In."
        else
            document.getElementById("status").innerHTML = e.data[0]
        if(!e.data[0].username || e.data[0].username == undefined) return;
        window.appApi.setUsername(e.data[0]);
        setTimeout(() => {
            window.appApi.closeWin();
        }, 500)
    }
}
