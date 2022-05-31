const { contextBridge, ipcRenderer } = require("electron");
const {PythonShell} = require("python-shell");
const pathMod = require("path")


let appApi = {
    isOnline: () => navigator.onLine ?  null : ipcRenderer.send("offline"),
    closeWin : () =>  ipcRenderer.send("closeWindow" , null),
    minWin: () => ipcRenderer.send("minimizeWindow", null),
    maxWin: () => ipcRenderer.send("maximizeWindow", null),
    isMax: (args) => ipcRenderer.invoke("isMax", args),
    closeMain: () => ipcRenderer.send("close-main-window", null),
    pythonRun: (path, args) => {
        let absPath = pathMod.join(__dirname, "../", "../");
        args.scriptPath = absPath;
        PythonShell.run(path, args, (err, res) =>  {
            if(err) throw err;
            window.postMessage(res, "*")
        })
    },
    openNewsInWin: (url) => {
        ipcRenderer.send("openNewsInWindow", url)
    },
    openRegisterWindow: () => {
        ipcRenderer.send("open-register-win", null)
    },
    openSignInWindow: () => {
        ipcRenderer.send("open-sign-in-win", null)
    },
    setUsername: (name) => {
        ipcRenderer.send("got-username", name)
    },
    showOpenDialog: (props) => {
        ipcRenderer.send("open-dialog", props);
    },
    showOpenDialogOn: (channel, callback) => {
        ipcRenderer.on(channel, (_,data) => callback(data))
    }
}


ipcRenderer.on("setUsername", (e, data) => {

    document.getElementById("name-user").innerText = data.username
    document.querySelector(".avatar").src = data.pfp_url
    let date = new Date()
    let time = date.getHours() + " : " + date.getMinutes();
    let path = "src/python/firebase/user_join.py"
    let options = {
        mode: 'text',
        args: [data.username, time],
        pythonOptions: ['-u'],
    }
    appApi.pythonRun(path, options)
});

ipcRenderer.on("closing-window-logout", (e) => {
    let username = document.getElementById("name-user").innerText
    let path = "src/python/firebase/user_leave.py"
    let options = {
        mode: 'text',
        args: [username],
        pythonOptions: ['-u'],
    }
    appApi.pythonRun(path, options)
});

ipcRenderer.on("auto-signIn", (e, data) => {
    ipcRenderer.send("got-username", data)
});


appApi.isOnline()
contextBridge.exposeInMainWorld("appApi", appApi)
