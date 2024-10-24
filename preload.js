const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  addUser: (user) => ipcRenderer.send("add-user", user),
  receiveUsers: (callback) =>
    ipcRenderer.on("get-users", (event, users) => callback(users)),
});
