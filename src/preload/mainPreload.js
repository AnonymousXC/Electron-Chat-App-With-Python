const { contextBridge, ipcRenderer} = require("electron")


let appApi = {
    isOnline: () => navigator.onLine ?  null : ipcRenderer.send("offline"),
    closeWin : () =>  ipcRenderer.send("closeWindow" , null),
    minWin: () => ipcRenderer.send("minimizeWindow", null),
    maxWin: () => ipcRenderer.send("maximizeWindow", null),
    isMax: (args) => ipcRenderer.invoke("isMax", args)
}


appApi.isOnline()
contextBridge.exposeInMainWorld("appApi", appApi)
