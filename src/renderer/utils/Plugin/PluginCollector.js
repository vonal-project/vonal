import { promises as fsp } from 'fs'
import path from 'path'
import LogEntry from '../Logger/LogEntry';

class PluginCollector {

    /**
     * 
     * @param {Logger} logger 
     */
    constructor(logger) {
        this.log = logger.getLoggerFor('PluginCollector')
    }


    /**
     * 
     * @param {string} path plugin dir path
     * @returns {string} the path of the transformed file
     */
    async _getPackageIndex(from) {
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
                details: ${ e.stack}
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
                PLUGINDIR_IS_UNREADABLE
                Couldn't read the '${from}' direcotry. 
                Check the error: ${e.stack}
            `)
        }


        let loadedPlugins = []
        for (let pluginDirectory of pluginDirectories) {
            let pluginIndexFile
            
            try {
                // get index path
                pluginIndexFile = await this._getPackageIndex(
                    path.join(from, pluginDirectory)
                )
            } catch (e) {
                if (!(e instanceof LogEntry)) throw e
            }

            try {
                // load
                loadedPlugins.push({
                    name: pluginDirectory,
                    plugin: require(
                        pluginIndexFile
                    )
                })
            } catch (e) {
                this.log(`
                    CORRUPTED_MAIN_FILE
                    The main file specified in ${ pluginDirectory } is corrupted: "${ pluginIndexFile }".
                    If you just downloaded the plugin please consider running build before using it. 
                    Do you think it is a valid javascript file? 
                    Does it have module.exports?
                    details: ${e}
                    stack: ${e}
                `)
            }
        }

        return loadedPlugins
    }
}

export default PluginCollector