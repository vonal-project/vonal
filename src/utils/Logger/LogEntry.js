
class LogEntry {
    constructor(errorCode, moduleName, message) {
        this.errorCode = errorCode
        this.module = moduleName
        this.message = message
    }
}

export default LogEntry