import ReactDOM from 'react-dom'
import React from 'react'
import AppComponent from './components/App/App'
import PluginEventHandler from './utils/Plugin/PluginEventHandler'
import {ipcRenderer} from 'electron'
import '@fortawesome/fontawesome-free/js/all'


PluginEventHandler.on('window:resize', () => {
    ipcRenderer.send('resize', document.body.scrollHeight)
})

PluginEventHandler.on('window:hide', () => {
    ipcRenderer.send('hide')
})

PluginEventHandler.on('window:show', () => {
    ipcRenderer.send('show')
})

PluginEventHandler.on('app:quit', () => {
    ipcRenderer.send('quit')
})

PluginEventHandler.on('app:restart', () => {
    ipcRenderer.send('restart')
})

global.PluginEventHandler = PluginEventHandler

let element = document.getElementById('app')
ReactDOM.render(
    <AppComponent />,
    element
);
