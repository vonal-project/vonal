import SearchField from '../SearchField/SearchField'
import React from 'react'
import './App.scss'
import Results from '../Results/Results'

import PluginCollector from '../../utils/Plugin/PluginCollector'
import PluginFactory from '../../utils/Plugin/PluginFactory'
import Logger from '../../utils/Logger/Logger'
import PluginRegister from '../../utils/Plugin/PluginRegister';
import PluginEventHandler from '../../utils/Plugin/PluginEventHandler';

global.pluginRegistry = null

class AppComponent extends React.Component {

    state = {
        q: '',
        results: [],
    }

    /*
     * COMPONTENT LIFECYCLE EVENTS
     */

    shouldComponentUpdate(nextState, nextProps) {
        return nextProps.q != this.state.q
    }

    componentDidUpdate() {
        this._resizeWindow()
    }

    componentDidMount() {
        this._registerPluginEvents()
        this._resizeWindow()
        this._loadPlugins()
    }

    /*
     * PRIVATE METHODS
     */

    _registerPluginEvents() {
        PluginEventHandler.on('query:clear', () => {
            this.setState({q:''}) 
        })

        PluginEventHandler.on('query:mutate', (mutator) => {
            this.setState({q:mutator(this.state.q)}) 
        })
    }

    _query_plugins = async q => {
        return await global.pluginRegistry.search(q)
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

    _loadPlugins = async () => {
        const logger = new Logger
        const pluginCollector = new PluginCollector(logger)
        const pluginFactory = new PluginFactory
        const pluginRegister = new PluginRegister(logger, pluginCollector, pluginFactory)
        global.pluginRegistry = await pluginRegister.register()
    }

    _resizeWindow() {
        PluginEventHandler.send('window:resize')
    }

    _handleQueryChange = (e) => {

        (async (val) => {
            this.setState({
                results: await this._getResults(val),
                q: val
            })
        })(e.target.value)

    }

    /*
     * RENDER
     */

    resultsID = 1

    render() {
        return <div id='app'>
            <SearchField
                value={this.state.q}
                onChange={this._handleQueryChange}
            />
            <Results
                results={this.state.results}
                key={++this.resultsID}
            />
        </div>
    }
}

export default AppComponent