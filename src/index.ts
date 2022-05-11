const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path")


let win;

function createWindow() {
    win = new BrowserWindow({
        height: 600,
        width: 800,
        minWidth: 800,
        minHeight: 600,
        frame: false,
        transparent: false,
        webPreferences: {
            // nodeIntegration: true,
            preload: path.join(__dirname, "preload" , "mainPreload.js")
        },
        title: 'Chat App',
    });

    win.setTitle('Chat App');
    win.removeMenu();
    win.loadFile(path.join(__dirname, "html", "index.html"));
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});



ipcMain.on("closeWindow", (e) => {
    app.quit()
});

ipcMain.on("minimizeWindow", (e) => {
    BrowserWindow.getFocusedWindow().minimize()
});

ipcMain.on("maximizeWindow", (e) => {
    BrowserWindow.getFocusedWindow().isMaximized() ? BrowserWindow.getFocusedWindow().unmaximize() : BrowserWindow.getFocusedWindow().maximize()
});

ipcMain.handle("isMax", async (e, args) => {
    return BrowserWindow.getFocusedWindow().isMaximized().valueOf()
});

ipcMain.once("offline", () => {
    BrowserWindow.getFocusedWindow().loadFile(path.join(__dirname, "html", "offline.html"))
});

ipcMain.on("openNewsInWindow", (e, url) => {
    console.log(url);
    
})