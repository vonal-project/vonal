import Plugin from './Plugin'

class PluginFactory {
    /**
     * the exported function
     */
    create(rawPlugin) {
        return new Plugin({
            name: rawPlugin.name,
            resultFunction: rawPlugin.plugin
        })
    }
}

export default PluginFactory