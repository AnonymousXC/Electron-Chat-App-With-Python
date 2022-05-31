const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const Notify = require("electron").Notification
const path = require("path");
const fs = require("fs");
const { saveUsername, saveEmail, saveTime, readDataUET, saveProfilePic } = require("./extra/store")

let win;
let lastOpened;

const notificationXmlString = `
<toast>
  <visual>
        <binding template="ToastImageAndText01">
            <image id="1" src="${path.join(__dirname, 'resources/icons/icon-dummy.png')}" alt="img"/>
            <text id="1">Background Processing</text>
            <text placement="attribution">Chat app is running in background and will exit automatically, after sometime. </text>
        </binding>  
    </visual>
</toast>
`;


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
        icon: path.join(__dirname, "resources/icons/icon-dummy.png"),
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

        // if(process.platform === "win32") {
        //     new Notify({toastXml: notificationXmlString}).show()
        // }
        // else 
        //     new Notify({title: "Background Processing \n", body: "Chat app is running in background and will exit automatically, after sometime. \n \n"}).show()

        new Notify({
            title: "Background Processing",
            body: "Chat app is running in background and will exit automatically, after sometime.",
            icon: __dirname + '/resources/icons/icon-dummy.png',
            hasReply: true,
        }).show()

    });

    app.setAppUserModelId(app.name.replace("-", " ").toLocaleUpperCase())
}

app.whenReady().then(createWindow);
app.whenReady().then(getLastTime);

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
    saveUsername(data.username);
    saveEmail(data.email);
    saveProfilePic(data.pfp_url)
    
    win.webContents.send("setUsername", data)
});


ipcMain.on('open-dialog', (event, properties) => {
    dialog.showOpenDialog(win, properties).then((data) => {
        if(data)
            event.reply("file-selected", data.filePaths[0])
    })
});


function getLastTime() {
    lastOpened = readDataUET().date;
    let currentDate = new Date().getDate();
    saveTime(currentDate)
    let diff = currentDate - lastOpened
    if(diff <= 2 && readDataUET().username && readDataUET().email) {
        win.webContents.send("auto-signIn", readDataUET())
    }
}

