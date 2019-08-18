import SearchField from '../SearchField/SearchField'
import React from 'react'
import './App.scss'
import windowResizer from '../../utils/WindowResizer'
import Results from '../Results/Results'
import electron from 'electron'

import PluginCollector from '../../utils/PluginCollector'
import PluginFactory from '../../utils/PluginFactory'
import PluginRegistry from '../../utils/PluginRegistry'
import Config from '../../config'

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

        let pluginCollector = new PluginCollector
        let pluginFactory = new PluginFactory
    
        let plugins = 
            (await pluginCollector.collect(Config.PLUGINS_DIR))
            .map(p => pluginFactory.create(p))
    
        let pluginRegistry = new PluginRegistry(plugins)

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