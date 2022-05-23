

function registerUser() {

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let picUrl = document.getElementById("profile-pic").value

    if(username == "" || email == "" || password == "" || !username || !email || !password)
    {
        document.getElementById("status").innerHTML = "Please fill all the fields."
        return
    }

    document.getElementById("status").innerHTML = `Processing <img src="../resources/gifs/cupertino_activity_indicator.gif" alt="" width="23px" id="loading-gif">`

    let path = "src/python/firebase/registration.py"
    let options = {
        mode: 'text',
        args: [username, password, email, picUrl],
    }
    window.appApi.pythonRun(path , options)
}

window.onmessage = async (e) => {
    if(e.source !== window || !e.data) return;
    let lent = e.data.length - 1;
    if(e.data[lent] == "registration.py") 
    {
        document.getElementById("status").innerText = e.data[0]
    }
}
