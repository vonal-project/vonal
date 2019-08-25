
class PluginEventHandler {
    listeners = {}

    /**
     * notifies all listeners with the given eventName
     * @param {String} eventName 
     */
    send(eventName) {
        for(let listener of this.listeners[eventName]) {
            // eventName won't be passed as argument
            listener(...Array.from(arguments).slice(1)) 
        }
    }

    /**
     * register listener
     * @param {String} eventName 
     */
    on(eventName, callback) {
        if(this.listeners[eventName])
            this.listeners[eventName].push(callback)
        else
            this.listeners[eventName] = [callback]
    }
}

export default new PluginEventHandler