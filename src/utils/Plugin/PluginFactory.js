import Plugin from './Plugin'

class PluginFactory {
    /**
     * 
     * @param {PluginValidator} pluginValidator 
     */
    constructor(pluginValidator, logger) {
        this.pluginValidator = pluginValidator
        this.log = logger.getLoggerFor('PluginFactory')
    }

    /**
     * the exported function
     */
    create(rawPlugin) {

        if (this.pluginValidator.isValid(rawPlugin.plugin))
            return new Plugin({
                name: rawPlugin.name,
                resultFunction: rawPlugin.plugin
            })

        throw this.log(`
            INVALID_PLUGIN
            The plugin "${rawPlugin.name}" is not valid.
        `)
    }
}

export default PluginFactory