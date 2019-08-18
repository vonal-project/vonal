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
            useContentSize: false,
            minHeight: 40,
            height: 40
        })

        window.setAutoHideMenuBar(true);
        window.setAlwaysOnTop(true, 'floating');
        window.maximize();
        window.setPosition(0, 0);
        window.show();
        window.setPosition(0, 0);


        // Open the DevTools.
        // window.webContents.openDevTools()

        // and load the index.html of the app.
        window.loadFile(path.join(__dirname, 'renderer.html'))

        // Emitted when the window is closed.
        window.on('closed', function () {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            window = null
        })

        return window
    }
}

export default WindowFactory