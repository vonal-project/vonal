import LogEntry from "../Logger/LogEntry";
import PluginRegistry from "./PluginRegistry";
import Config from '../../config'

class PluginRegister {
    /**
     * 
     * @param {Logger} logger 
     * @param {PluginCollector} pluginCollector 
     * @param {PluginFactory} pluginFactory 
     */
    constructor(logger, pluginCollector, pluginFactory) {
        this.logger = logger
        this.pluginCollector = pluginCollector
        this.pluginFactory = pluginFactory
    }

    async register() {
        let pluginRegistry
        let plugins = []

        try {
            let raw_plugins = await this.pluginCollector.collect(Config.PLUGINS_DIR)
            plugins = raw_plugins.map(p => this.pluginFactory.create(p))

        } catch (e) {

            let error
            if (e instanceof LogEntry) error = this.logger.getFormattedLog(e)
            else error = new LogEntry('UNCOUGHT_ERROR', 'UNKNOWN', e.stack)

            ipcRenderer.send('log', error)

        }

        pluginRegistry = new PluginRegistry(plugins)
        return pluginRegistry
    }

}

export default PluginRegister