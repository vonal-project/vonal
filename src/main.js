import WindowManager from './main/WindowManager'
import WindowFactory from './main/WindowFactory'
import electron from 'electron'
const { app, ipcMain } = electron

let state = {
    windowManager: null
}

/**
 * Hanlde app events
 */

function createWindow() {
    let windowFactory = new WindowFactory
    state.windowManager = new WindowManager(windowFactory.create())
}

app.on('ready', async function () {
    createWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (state.windowManager.window === null) {
        createWindow()
    }
})

/**
 * handle events from renderer
 * 
 * CONVENTION:
 * the response event's name should be the 'event'+'-done'
 */

ipcMain.on('resize-me-please', (event, height) => {
    let width = electron.screen.getPrimaryDisplay().workAreaSize.width
    state.windowManager.resize(width, height)
})