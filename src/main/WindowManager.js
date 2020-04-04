import electron from 'electron'
class WindowManager {

    /**
     * 
     * @param {electron.BrowserWindow} window to manage 
     * @param {electron.Screen} screen to manage 
     */
    constructor(window, screen) {
        this.window = window
        this.screen = screen
        this.lastSize = { width: 0, height: 0 }
    }

    close() {
        this.window.close()
    }

    /**
     * 
     * @param {number} width in pixels
     * @param {number} height in pixels
     */
    resize(width, height) {
        this.window.setMinimumSize(width, height);
        this.window.setSize(
            width,
            height
        )
        this.lastSize = {
            width,
            height
        }
    }

    show() {
        let display = this.screen.getPrimaryDisplay()
        this.window.setPosition(display.bounds.x + 1, display.bounds.y + 1) // workaround WM centering behaviour
        this.window.show()
        this.window.setPosition(display.bounds.x, display.bounds.y)
    }

    hide() {
        this.window.hide()
    }

    send() {

        console.log(arguments);
        this.window.webContents.send(...arguments)

    }

}

export default WindowManager