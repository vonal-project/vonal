import React from 'react'
import './SearchField.scss'

class SearchField extends React.PureComponent {

    render() {
        return <div className="search-field">
            <div className="mode">
                <i className="fas fa-angle-right"></i>
            </div>
            <input
                value={this.props.value}
                autoFocus={true}
                type="text"
                placeholder="Type some text"
                onKeyUp={this.props.onChange}
                onChange={this.props.onChange}
            />
        </div>
    }
}

export default SearchField