import ReactDOM from 'react-dom'
import React from 'react'
import AppComponent from './components/App/App'

//import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all'

let element = document.getElementById('app')
ReactDOM.render(
    <AppComponent />,
    element
);
