import React from 'react'
import './SearchField.scss'

class SearchField extends React.PureComponent {
    

    handleKeyUp = e => {
        this.props.onKeyUp(e)
    }

    render() {
        return <div className="search-field">
            <div className="mode">
                <i className="fas fa-angle-right"></i>
            </div>
            <input 
                autoFocus={true}
                type="text" 
                placeholder="Type some text"
                onKeyUp={this.handleKeyUp}
                onChange={this.handleKeyUp}
            />
        </div>
    }
}

export default SearchField