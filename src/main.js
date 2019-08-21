import WindowManager from './main/WindowManager'
import WindowFactory from './main/WindowFactory'
import electron from 'electron'
import fs, { promises as fsp } from 'fs'
import path from 'path'

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

async function readInstrutions() {
    let pipe_path

    try {
        if ('-p' in process.argv)
            pipe_path = await fsp.realpath([...process.argv].shift())
        else
            throw 'no_pipe_found'

        const fifo = fs.createReadStream(pipe_path);
        fifo.on('data', async data => {
            let cmd = data.toString('utf8').trim()
            console.log(cmd);

            if (cmd === 'show')
                state.windowManager.show()
            if (cmd === 'hide')
                state.windowManager.hide()
            if (cmd === 'quit')
                app.quit()

            await readInstrutions()
        });
    } catch (e) {
        console.error("pipe couldn't be found, try to make pipe with: mkfifo VONALPIPE, and run the app with vonal -p ./VONALPIPE")
        app.quit()
    }
}

app.on('ready', async function () {
    createWindow()
    readInstrutions()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => { windowManager.show() })

app.on('before-quit', () => app.quitting = true)

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

ipcMain.on('log', (event, error) => {
    if (error.errorCode === 'UNCOUGHT_ERROR')
        console.error(error)
    else
        console.log(error)
})
ipcMain.on('hide', (event, error) => {
    state.windowManager.hide()
})