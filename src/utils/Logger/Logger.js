import LogEntry from './LogEntry'

class Logger {
    
    /**
     * 
     * @param {string} module 
     */
    getExceptionLoggerFor(module) {
        return (log) => {
            
            // the first non-empty line will be error code
            let lines = log
                .trim()         // so first line will have content
                .split('\n')    // get lines
                .map(           // trim lines
                    line => line.trim()
                )

            let errorCode = lines.shift()
            let message = lines.join('\n')

            return new LogEntry(
                errorCode,
                module,
                message
            )
        }
    }

    /**
     * 
     * @param {object} logObject 
     * @param {string} logObject.errorCode 
     * @param {string} logObject.module
     * @param {string} logObject.message 
     */
    getFormattedLog(logObject) {
        return `ERROR: ${logObject.module}: ${logObject.message}`
    }
}

export default Logger