import { promises as fsp } from 'fs'
import path from 'path'

class PluginCollector {

    /**
     * 
     * @param {Logger} logger 
     */
    constructor(logger) {
        this.log = logger.getExceptionLoggerFor('PluginCollector')
    }


    /**
     * 
     * @param {string} path plugin dir path
     * @returns {string} the path of the transformed file
     */
    async _getPackageIndex(from) {
        // TODO: transfrom with sucrase
        let packagePath = path.join(from, 'package.json')
        let packageContent
        let packageObj

        try {
            packageContent = await fsp.readFile(packagePath, 'utf-8')
        } catch (e) {
            throw this.log(`
                NO_PACKAGE_JSON
                For the ${from.split('/').pop()}, package.json can not be found.
                Please provide 'package.json' with the content like this:
                { main: 'THE_PLUGIN_ENTRY.js' }
                details: ${ e.stack }
            `)
        }

        try {
            packageObj = JSON.parse(packageContent)
        } catch (e) {
            throw this.log(`
                CORRUPTED_PACKAGE_JSON
                For the ${from.split('/').pop()}, the package.json file is corrupt. 
                Check the error: ${e.stack}
            `)
        }

        return path.join(from, packageObj.main)
    }

    /**
     * 
     * @param {string} from the path to the plugin dir 
     * @returns {object[]}
     */
    async collect(from) {
        let pluginDirectories

        try {
            pluginDirectories = await fsp.readdir(from)
        } catch (e) {
            throw this.log(`
                PLUGINDIR_IS_UREADABLE
                Couldn't read the '${from}' direcotry. 
                Check the error: ${e.stack}
            `)
        }


        let loadedPlugins = []
        for (let pluginDirectory of pluginDirectories) {

            // get index path
            let pluginIndexFile = await this._getPackageIndex(
                path.join(from,pluginDirectory)
            )

            // load
            loadedPlugins.push({
                name: pluginDirectory,
                plugin: require(
                    pluginIndexFile
                )
            })
        }

        return loadedPlugins
    }
}

export default PluginCollector