const ReactDOM = require('react-dom')
const React = require('react')

class AppComponent extends React.Component {
	
	constructor(props) {
		super(props)
		this.from = "other side"
	}

	render() {
		return React.createElement('div', null, `Hello from the ${this.from}!`);
	}
}

let element = document.getElementById('app')
ReactDOM.render(
	React.createElement(AppComponent), 
	element
);
