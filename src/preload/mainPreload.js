const { contextBridge, ipcRenderer} = require("electron")


let appApi = {
    closeWin : () =>  ipcRenderer.send("closeWindow" , null),
    minWin: () => ipcRenderer.send("minimizeWindow", null),
    maxWin: () => ipcRenderer.send("maximizeWindow", null),
}


contextBridge.exposeInMainWorld("appApi", appApi)
