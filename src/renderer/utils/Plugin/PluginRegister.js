import PluginRegistry from "./PluginRegistry";
import Config from '../../../config'
import LogEntry from "../Logger/LogEntry";

class PluginRegister {
    /**
     * 
     * @param {Logger} logger 
     * @param {PluginCollector} pluginCollector 
     * @param {PluginFactory} pluginFactory 
     */
    constructor(logger, pluginCollector, pluginFactory) {
        this.log = logger.getLoggerFor('PluginRegister')
        this.pluginCollector = pluginCollector
        this.pluginFactory = pluginFactory
    }

    async register() {
        let pluginRegistry
        let plugins = []

        try {
            let raw_plugins = await this.pluginCollector.collect(Config.PLUGINS_DIR)

            plugins = raw_plugins
                .map(p => this._createPlugin(p))
                .filter(p => p !== undefined)

        } catch (e) {
            this.log(`
                PLUGINS_CANNOT_BE_COLLECTED
                Plugins cannot be collected, this may caused by a wrong plugin.
                Details: ${ e.stack}
            `)
        }

        pluginRegistry = new PluginRegistry(plugins)
        return pluginRegistry
    }

    /**
     * 
     * @param {Object} p 
     */
    _createPlugin(p) {
        try {
            return this.pluginFactory.create(p)
        } catch (e) {
            return undefined
        }
    }
}

export default PluginRegister