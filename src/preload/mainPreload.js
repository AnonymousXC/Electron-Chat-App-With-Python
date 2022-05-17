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
}


appApi.isOnline()
contextBridge.exposeInMainWorld("appApi", appApi)
