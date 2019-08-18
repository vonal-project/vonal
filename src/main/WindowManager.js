import electron from 'electron'

class WindowManager {

    /**
     * 
     * @param {BrowserWindow} window to manage 
     */
    constructor(window) {
       this.window = window
    }

    /**
     * 
     * @param {number} width in pixels
     * @param {number} height in pixels
     */
    resize(width, height) {
        
        /* WORKAROUNG BEGIN */
        this.window.setResizable(true);
        
        if (!this.window.isMaximized()) {
            this.window.maximize();
        } else {
            this.window.unmaximize();
            this.window.setMaximumSize(width, height);
            this.window.setResizable(false);
        }
        /* WORKAROUNG END */
    
        this.window.setSize(
            width,
            height
        )
    }

}

export default WindowManager