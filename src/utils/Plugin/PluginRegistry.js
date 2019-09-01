
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
        let results = await Promise.all(this.plugins.map(async p => await this._getPluginResults(p, query)))
        let merged_results = []

        for (let result of results) {
            if (result instanceof Array) {
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

    /**
     * 
     * @param {Plugin} plugin 
     * @param {string} query
     * @returns {React.BaseComponent|Array<React.BaseComponent>|{isError:true, error: any}} 
     */
    async _getPluginResults(plugin, query) {
        try {
            return await plugin.resultFunction(query)
        } catch (e) {
            return {
                isError: true,
                error: e,
                plugin: plugin
            }
        }

    }
}

export default PluginRegistry