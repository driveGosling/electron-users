const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win;
let users = [];

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile("dist/index.html");
}

app.on("ready", createWindow);

ipcMain.on("add-user", (event, user) => {
  users.push(user);
  win.webContents.send("get-users", users);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
