const { contextBridge, ipcRenderer} = require("electron")


let appApi = {
    closeWin : () =>  ipcRenderer.send("closeWindow" , null),
    minWin: () => ipcRenderer.send("minimizeWindow", null),
    maxWin: () => ipcRenderer.send("maximizeWindow", null),
    isMax: (args) => ipcRenderer.invoke("isMax", args)
}


contextBridge.exposeInMainWorld("appApi", appApi)
