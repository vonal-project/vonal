import SearchField from '../SearchField/SearchField'
import React from 'react'
import './App.scss'
import windowResizer from '../../utils/WindowResizer'
import Results from '../Results/Results'
import electron from 'electron'

import PluginCollector from '../../utils/Plugin/PluginCollector'
import PluginFactory from '../../utils/Plugin/PluginFactory'
import PluginRegistry from '../../utils/Plugin/PluginRegistry'
import Config from '../../config'
import Logger from '../../utils/Logger/Logger'
import LogEntry from '../../utils/Logger/LogEntry';

const {ipcRenderer} = electron
class AppComponent extends React.Component {

    state = {
        results: [],
        pluginRegistry: null
    }

    _handleSearch = async e => {
        this.setState({
            results: await this._getResults(e.target.value)
        })
    }

    _registerPlugins = async () => {
        let logger = new Logger
        let pluginCollector = new PluginCollector(logger)
        let pluginFactory = new PluginFactory
        let pluginRegistry
        let plugins = []

        try {

            plugins = 
                (await pluginCollector.collect(Config.PLUGINS_DIR))
                .map(p => pluginFactory.create(p))

        } catch(e) {

            let error
            if (e instanceof LogEntry) error = logger.getFormattedLog(e)
            else error = new LogEntry('UNCOUGHT_ERROR', 'UNKNOWN', e.stack)

            ipcRenderer.send('log', error)

        }

        pluginRegistry = new PluginRegistry(plugins)
        this.setState({ pluginRegistry })
    }

    _query_plugins = async q => {
        return await this.state.pluginRegistry.search(q)
    }


    _getResults = async q => {
        let plugin_results = await this._query_plugins(q)

        let results = plugin_results.map(
            (result, id) => ({
                id: id,
                content: result
            })
        )
        return results
    }

    componentDidUpdate() {
        windowResizer.resizeToContent()
    }
    componentDidMount() {
        this._registerPlugins()
        windowResizer.resizeToContent()
    }

    render() {
        return <div id='app'>
            <SearchField onKeyUp={this._handleSearch} />
            <Results results={this.state.results} />
        </div>
    }
}

export default AppComponent