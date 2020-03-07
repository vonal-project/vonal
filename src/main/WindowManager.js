import electron from 'electron'
class WindowManager {

    /**
     * 
     * @param {electron.BrowserWindow} window to manage 
     */
    constructor(window) {
        this.window = window
        this.lastSize = { width: 0, height: 0 };
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
        this.lastSize = {
            width,
            height
        }
    }

    show() {
        this.window.setPosition(1, 1); // workaround WM centering behaviour
        this.window.show();
        this.window.setPosition(0, 0);
    }

    hide() {
        this.window.hide()
    }

    send() {

        console.log(arguments);
        this.window.webContents.send(...arguments);

    }

}

export default WindowManager