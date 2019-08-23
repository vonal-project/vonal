
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
     * @returns {React.Component[]}
     */
    async search(query) {
        let results = await Promise.all(this.plugins.map(async plugin => await plugin.resultFunction(query)))
        let merged_results = []

        for( let result of results) {
            if(result instanceof Array) {
                merged_results = [
                    ...merged_results,
                    ...result
                ]
            } else {
                merged_results = [
                    ...merged_results,
                    result
                ]
            }
        }
        return merged_results
    }
}

export default PluginRegistry