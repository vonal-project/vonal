import { promises as fsp } from 'fs'
import path from 'path'

class PluginCollector {

    /**
     * 
     * @param {string} path plugin dir path
     * @returns {string} the path of the transformed file
     */
    async _transfer(from) {
        // TODO: transfrom with sucrase
        return path.join(from, 'index.js')
    }

    /**
     * 
     * @param {string} from the path to the plugin dir 
     * @returns {object[]}
     */
    async collect(from) {
        let loadedPlugins = []
        try {
            let pluginDirectories = await fsp.readdir(from);
            for (let pluginDirectory of pluginDirectories) {

                // transfer from jsx
                let transferedPlugin = await this._transfer(pluginDirectory)

                // load
                loadedPlugins.push({
                    name: pluginDirectory,
                    plugin: require(
                        path.join(from, transferedPlugin)
                    )
                })
            }
        } catch (e) {
            console.error(e)
        }

        return loadedPlugins
    }
}

export default PluginCollector