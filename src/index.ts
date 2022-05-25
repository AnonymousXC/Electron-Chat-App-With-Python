const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require("path");
const pythonShell = require("python-shell")


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
    win.on("close", (event) => {
        if(win.isVisible() === false) return;
        event.preventDefault();
        win.hide();
        win.webContents.send("closing-window-logout")
        console.log("Adsad");
    })
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


function newNewsWindow(url) {
    const newsWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
        },
        icon: path.join(__dirname, 'assets', 'img', 'icon.png'),
    });
    newsWindow.removeMenu()
    newsWindow.webContents.openDevTools()
    newsWindow.loadFile(path.join(__dirname, "html", "news.html"))
    newsWindow.loadURL(url)
}


function registerUserWindow() {
    const registerWindow = new BrowserWindow({
        height: 380,
        width: 500,
        frame: false,
        parent: win,
        modal: true,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload/mainPreload.js")
        },
        // icon: path.join(__dirname, 'assets', 'img', 'icon.png'),
        title: 'My App',
    });
    registerWindow.webContents.openDevTools();
    registerWindow.removeMenu();
    registerWindow.setTitle('My App');
    registerWindow.loadFile(path.join(__dirname, 'html/registerUser.html'));
}

function signInWindow() {
    const signIn = new BrowserWindow({
        height: 380,
        width: 500,
        frame: false,
        parent: win,
        modal: true,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload/mainPreload.js")
        },
        // icon: path.join(__dirname, 'assets', 'img', 'icon.png'),
        title: 'My App',
    });
    signIn.webContents.openDevTools();
    signIn.removeMenu();
    signIn.setTitle('My App');
    signIn.loadFile(path.join(__dirname, 'html/signin.html'));
}



ipcMain.on("closeWindow", (e) => {
    BrowserWindow.getFocusedWindow().close()
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

ipcMain.on("close-main-window", (e) => {
    win.close()
})

ipcMain.once("offline", () => {
    BrowserWindow.getFocusedWindow().loadFile(path.join(__dirname, "html", "offline.html"))
});

ipcMain.on("openNewsInWindow", (e, url) => {
    newNewsWindow(url)
});

ipcMain.on("open-register-win", () => {
    registerUserWindow()
});

ipcMain.on("open-sign-in-win", () => {
    signInWindow()
});

ipcMain.on("got-username", (e, data) => {
    win.webContents.send("setUsername", data)
});


ipcMain.on('open-dialog', (event, properties) => {
    dialog.showOpenDialog(win, properties).then((data) => {
        if(data)
            event.reply("file-selected", data.filePaths[0])
    })
})