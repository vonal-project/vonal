import electron from 'electron'
const { ipcRenderer } = electron

class WindowResizer {
    resizeToContent() {
        ipcRenderer.send('resize-me-please', document.body.scrollHeight)
    }
}


export default new WindowResizer()