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
        if (process.argv[process.argv.length - 2] == '-p')
            pipe_path = await fsp.realpath(process.argv[process.argv.length - 1])
        else
            throw 'no_pipe_found'

        const fifo = fs.createReadStream(pipe_path);
        fifo.on('data', async data => {
            let cmd = data.toString('utf8').trim()

            if (cmd === 'show')
                state.windowManager.show()
            if (cmd === 'hide')
                state.windowManager.hide()
            if (cmd === 'quit')
                app.quit()
            if (cmd === 'restart') {
                state.windowManager.close()
                app.relaunch({ args: process.argv.slice(1) })
                app.exit(0)
            }
            if (cmd === 'reload_plugins') {
                state.windowManager.send('reload_plugins')
            }


            if (cmd !== 'restart')
                readInstrutions()
        });
    } catch (e) {
        console.error(`
            pipe couldn't be found, try to make pipe with: 
            mkfifo VONALPIPE, and run the app with vonal -p ./VONALPIPE 
        `)
        app.quit()
    }
}

app.on('ready', async function () {
    console.log("Vonal has started!");

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

ipcMain.on('resize', (event, height) => {
    let width = electron.screen.getPrimaryDisplay().workAreaSize.width
    state.windowManager.resize(width, height)
})

ipcMain.on('log', (_event, error) => {
    if (error.errorCode === 'UNCOUGHT_ERROR')
        console.error(error)
    else
        console.log(error)
})

ipcMain.on('hide', () => {
    state.windowManager.hide()
})

ipcMain.on('show', () => {
    state.windowManager.hide()
})

ipcMain.on('quit', () => {
    app.quit()
})

ipcMain.on('restart', () => {
    app.restart()
})