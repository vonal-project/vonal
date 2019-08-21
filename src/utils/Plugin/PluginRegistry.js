
class PluginRegistry {

    plugins = []

    /**
     * @param {Plugin[]} plugins
     */
    constructor(plugins) {
        this.plugins = plugins
    }    

    /**
     * 
     * @param {string} query 
     * @returns {React.Component}
     */
    search(query) {
        return this.plugins.map(plugin => plugin.resultFunction(query))
    }
}

export default PluginRegistry