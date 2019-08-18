import SearchField from '../SearchField/SearchField'
import React from 'react'
import './App.scss'
import windowResizer from '../../utils/WindowResizer'
import Results from '../Results/Results'
class AppComponent extends React.Component {

    state = {
        results: []
    }

    _handleSearch = e => {
        this.setState({
            results: this._getResults(e.target.value)
        })
    }


    _getResults = q => {
        let results = q.split('').map(
            (result, id) => ({
                id: id,
                content: (<div className='row'>
                    <button>{result}</button>
                    <button>asd</button>
                </div>)
            })
        )
        return results
    }

    componentDidUpdate() {
        windowResizer.resizeToContent()
    }
    componentDidMount() {
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