import { BrowserWindow } from 'electron'
class WindowManager {

    /**
     * 
     * @param {BrowserWindow} window to manage 
     */
    constructor(window) {
        this.window = window
    }

    close() {
        this.window.close();
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
    }

    show() {
        if (!this.window.isVisible()) {
            this.window.show()
            this.window.setPosition(0, 0);
        }
    }

    hide() {
        if (this.window.isVisible()) {
            this.window.hide()
        }
    }

    send() {

        console.log(arguments);
        this.window.webContents.send(...arguments);

    }

}

export default WindowManager