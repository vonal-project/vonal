import electron from 'electron'
import path from 'path'
const { BrowserWindow } = electron


class WindowFactory {

    /**
     * @returns {BrowserWindow}
     */
    create() {
        // Create the browser window.
        let window = new BrowserWindow({
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
            minHeight: 40,
            height: 40,
        })
        window.setAlwaysOnTop(true, 'floating');
        window.setPosition(0, -100);


        // Open the DevTools.
        // window.webContents.openDevTools()

        // and load the index.html of the app.
        window.loadFile(path.join(__dirname, 'renderer.html'))
        window.hide()

        // Emitted when the window is closed.
        window.on('closed', function () {
            window.on('close', (event) => {
                if (app.quitting) {
                    window = null
                } else {
                    event.preventDefault()
                    window.hide()
                }
            })
        })

        return window
    }
}

export default WindowFactory