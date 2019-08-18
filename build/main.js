'use strict';



function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

// Modules to control application life and create native browser window
const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const path = require('path');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        show: false,
        width: electron.screen.getPrimaryDisplay().workAreaSize.width,
        webPreferences: {
            nodeIntegration: true
        },
        titleBarStyle: 'hide',
        transparent: true, // oc transparent
        frame: false,
        resizable: false,
        hasShadow: false,
        useContentSize: false,
        minHeight: 40,
        height: 40
    });

    mainWindow.setAutoHideMenuBar(true);
    mainWindow.setAlwaysOnTop(true, 'floating');
    mainWindow.maximize();
    mainWindow.setPosition(0, 0);
    mainWindow.show();
    mainWindow.setPosition(0, 0);


    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'renderer.html'));

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}


ipcMain.on('resize-me-please', (event, height) => {

    let width = electron.screen.getPrimaryDisplay().workAreaSize.width;

    mainWindow.setResizable(true);
    mainWindow.setMaximumSize(
        width, 
        height
    );

    if (!mainWindow.isMaximized()) {
        mainWindow.maximize();
    } else {
        mainWindow.unmaximize();
        mainWindow.setMaximumSize(width, height);
        mainWindow.setResizable(false);
    }

    mainWindow.setSize(
        width,
        height
    );
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
