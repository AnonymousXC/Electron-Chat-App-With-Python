const { contextBridge, ipcRenderer} = require("electron")
const {PythonShell} = require("python-shell")


let appApi = {
    isOnline: () => navigator.onLine ?  null : ipcRenderer.send("offline"),
    closeWin : () =>  ipcRenderer.send("closeWindow" , null),
    minWin: () => ipcRenderer.send("minimizeWindow", null),
    maxWin: () => ipcRenderer.send("maximizeWindow", null),
    isMax: (args) => ipcRenderer.invoke("isMax", args),
    pythonRun: (path, args) => {
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



appApi.isOnline()
contextBridge.exposeInMainWorld("appApi", appApi)
