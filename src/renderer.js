import ReactDOM from 'react-dom'
import React from 'react'

class AppComponent extends React.Component {
	
	constructor(props) {
		super(props)
	}

	from = "other side"

	render() {
		return <div>Hello from the {this.from}!</div>;
	}
}

let element = document.getElementById('app')
ReactDOM.render(
	<AppComponent />, 
	element
);
