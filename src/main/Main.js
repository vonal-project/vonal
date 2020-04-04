import WindowManager from './WindowManager'
import WindowFactory from './WindowFactory'
import electron from 'electron'
import fs, { promises as fsp } from 'fs'
const { app, ipcMain, screen } = electron

class Main {
    constructor() {

        /**
         * Handing app lifecycle
         */
        app.on('ready', () => this.onReady())
        app.on('activate', () => this.windowManager.show())
        app.on('before-quit', () => { app.quitting = true })

        /**
         * CONVENTION:
         * the response event's name should be the 'event'+'-done'
         */
        ipcMain.on('resize', (_, height) => this.resizeToContent(height))
        ipcMain.on('log', (_, error) => this.log(error))
        ipcMain.on('hide', () => this.windowManager.hide())
        ipcMain.on('show', () => this.windowManager.show())
        ipcMain.on('quit', () => app.quit())
        ipcMain.on('restart', () => app.restart())

        /**
         * The window
         */
        this.windowManager = null
    }

    onReady() {
        console.log("VONAL: Vonal is starting --- --- ---");
        this.windowManager = this.getNewWindowManager()
        this.tryToReadInstructions()
    }

    getNewWindowManager() {
        let windowFactory = new WindowFactory
        let windowManager = new WindowManager(windowFactory.create(), screen)
        return windowManager
    }

    resizeToContent(height) {
        let width = electron.screen.getPrimaryDisplay().workAreaSize.width
        this.windowManager.resize(width, height)
    }

    log(error) {
        if (error.errorCode === 'UNCOUGHT_ERROR')
            console.error(error)
        else
            console.log(error)
    }

    async tryToReadInstructions() {
        try {
            await this.readInstrutions()
        } catch (e) {
            if (e === 'no_pipe_found') console.error(`
                    pipe couldn't be found, try to make pipe with: 
                    mkfifo VONALPIPE, and run the app with vonal -p ./VONALPIPE 
                `)
            else console.error(`    
                    UNCOUGHT_ERROR ${e} ${e.stack}
                `)
            app.quit()
        }
    }

    /**
     * @throws 'no_pipe_found'
     */
    async readInstrutions() {
        let pipe_path, fifo, cmd

        if (process.argv[process.argv.length - 2] == '-p')
            pipe_path = await fsp.realpath(process.argv[process.argv.length - 1])
        else
            throw 'no_pipe_found'

        while (cmd !== 'restart') {
            fifo = fs.createReadStream(pipe_path);
            cmd = await this.handleCommandData(fifo)
        }
    }

    handleCommandData(fifo) {
        let cmd

        return new Promise((done, reject) => {
            fifo.on('data', async data => {
                cmd = data.toString('utf8').trim()

                switch (cmd) {
                    case 'show':
                        this.windowManager.show()
                        break;
                    case 'hide':
                        this.windowManager.hide()
                        break;
                    case 'quit':
                        app.quit()
                        break;
                    case 'restart':
                        this.windowManager.close()
                        app.relaunch({ args: process.argv.slice(1) })
                        app.exit(0)
                        break;
                    case 'reload_plugins':
                        this.windowManager.send('reload_plugins')
                        break;
                    default:
                        console.error(`The command '${cmd}' is not found`);
                }

                done(cmd)
            });
        })
    }
}

export default Main