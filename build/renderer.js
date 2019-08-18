'use strict';



function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ReactDOM = _interopDefault(require('react-dom'));
var React = _interopDefault(require('react'));
var electron = _interopDefault(require('electron'));
require('@fortawesome/fontawesome-free/js/all');

___$insertStyle(".search-field {\n  width: 100%;\n  display: flex;\n}\n.search-field .mode {\n  font-size: 1.5rem;\n  padding: 0.5rem;\n  flex: 1;\n  font-weight: 900;\n}\n.search-field input {\n  flex: 999;\n  font-size: 1.5rem;\n  padding: 0.5rem;\n  color: #fff;\n  background: none;\n}\n.search-field input, .search-field input:active, .search-field input:hover, .search-field input:focus {\n  border: none;\n  box-shadow: none;\n  outline: none;\n}");

const _jsxFileName = "/home/dbiro/Projects/launch/src/components/SearchField/SearchField.js";
class SearchField extends React.PureComponent {constructor(...args) { super(...args); SearchField.prototype.__init.call(this); }
    

    __init() {this.handleKeyUp = e => {
        this.props.onKeyUp(e);
    };}

    render() {
        return React.createElement('div', { className: "search-field", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12}}
            , React.createElement('div', { className: "mode", __self: this, __source: {fileName: _jsxFileName, lineNumber: 13}}
                , React.createElement('i', { className: "fas fa-angle-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 14}})
            )
            , React.createElement('input', { 
                autoFocus: true,
                type: "text", 
                placeholder: "Type some text"  ,
                onKeyUp: this.handleKeyUp,
                onChange: this.handleKeyUp, __self: this, __source: {fileName: _jsxFileName, lineNumber: 16}}
            )
        )
    }
}

___$insertStyle("body {\n  background: #000;\n  color: #fff;\n}");

const { ipcRenderer } = electron;

class WindowResizer {
    resizeToContent() {
        ipcRenderer.send('resize-me-please', document.body.scrollHeight);
    }
}


var windowResizer = new WindowResizer();

___$insertStyle(".result {\n  padding-bottom: 0.1rem;\n}\n.result.selected {\n  background: rgba(255, 255, 255, 0.1);\n}\n\nbutton {\n  border: 0;\n  padding: 0.2rem 1rem;\n  font-size: 1rem;\n  box-shadow: none;\n  background: none;\n  color: #fff;\n  margin-left: 10px;\n}\nbutton.selected {\n  background: rgba(64, 64, 64, 0.65);\n}\n\n.row {\n  padding: 0.2rem;\n}");

const _jsxFileName$1 = "/home/dbiro/Projects/launch/src/components/Results/Results.js";class Results extends React.Component {

    __init() {this.state = {
        selected: 0,
        selectedButton: 0
    };}

    constructor(props) {
        super(props);Results.prototype.__init.call(this);        this.myRef = React.createRef();
    }

    componentDidMount() {

        document.onkeydown = (e) => {
            e = e || window.event;

            let first = 0;
            let last = Math.max(0, this.props.results.length - 1);
            let nextSelect = Math.min(this.state.selected + 1, last);
            let prevSelect = Math.max(this.state.selected - 1, first);


            let firstButton;
            let lastButton;
            let nextButtonSelect;
            let prevButtonSelect;

            let buttonsOfSelectedRow = document.querySelectorAll('.result.selected button');
            if(buttonsOfSelectedRow) {
                firstButton = 0;
                lastButton = Math.max(0, buttonsOfSelectedRow.length - 1);
                nextButtonSelect = Math.min(this.state.selectedButton + 1, firstButton);
                prevButtonSelect = Math.max(this.state.selectedButton - 1, lastButton);
            }


            if (e.keyCode == '38') {
                console.log(prevSelect);
                // up
                this.setState({
                    selected: prevSelect,
                });
            }
            else if (e.keyCode == '40') {
                console.log(nextSelect);
                // down 
                this.setState({
                    selected: nextSelect,
                });
            }
            else if (e.keyCode == '37') {
                // right
                this.setState({
                    selectedButton: nextButtonSelect
                });
            }
            else if (e.keyCode == '39') {
                // left
                this.setState({
                    selectedButton: prevButtonSelect
                });
            }
        };
    }

    componentDidUpdate() {
        // remove selection from buttonc1
        let selected = document.querySelector('button.selected'); 
        if(selected) {
            selected.classList.remove('selected');
        }

        // add selection to button
        let selectedButtons = document.querySelectorAll('.result.selected button');
        if(selectedButtons.length) {
            if(selectedButtons.length) {
                if(selectedButtons[this.state.selectedButton])
                    selectedButtons[this.state.selectedButton].classList.add('selected');
                else
                    document.querySelectorAll('.result.selected button:last-child').classList.add('selected');
            }
        }
    }

    render() {
        return React.createElement('div', { className: "results", __self: this, __source: {fileName: _jsxFileName$1, lineNumber: 89}}
            , 
                this.props.results.map(result => (
                    React.createElement('div', { key: result.id, className: 'result ' + ((result.id == this.state.selected) ? 'selected' : ''), __self: this, __source: {fileName: _jsxFileName$1, lineNumber: 92}}
                        , result.content
                    ))
                )
            
        )
    }
}

const _jsxFileName$2 = "/home/dbiro/Projects/launch/src/components/App/App.js";class AppComponent extends React.Component {constructor(...args) { super(...args); AppComponent.prototype.__init.call(this);AppComponent.prototype.__init2.call(this);AppComponent.prototype.__init3.call(this); }

    __init() {this.state = {
        results: []
    };}

    __init2() {this._handleSearch = e => {
        this.setState({
            results: this._getResults(e.target.value)
        });
    };}


    __init3() {this._getResults = q => {
        let results = q.split('').map(
            (result, id) => ({
                id: id,
                content: (React.createElement('div', { className: "row", __self: this, __source: {fileName: _jsxFileName$2, lineNumber: 25}}
                    , React.createElement('button', {__self: this, __source: {fileName: _jsxFileName$2, lineNumber: 25}}, result)
                    , React.createElement('button', {__self: this, __source: {fileName: _jsxFileName$2, lineNumber: 25}}, "asd")
                ))
            })
        );
        return results
    };}

    componentDidUpdate() {
        windowResizer.resizeToContent();
    }
    componentDidMount() {
        windowResizer.resizeToContent();
    }

    render() {
        return React.createElement('div', { id: "app", __self: this, __source: {fileName: _jsxFileName$2, lineNumber: 40}}
            , React.createElement(SearchField, { onKeyUp: this._handleSearch, __self: this, __source: {fileName: _jsxFileName$2, lineNumber: 41}} )
            , React.createElement(Results, { results: this.state.results, __self: this, __source: {fileName: _jsxFileName$2, lineNumber: 42}} )
        )
    }
}

const _jsxFileName$3 = "/home/dbiro/Projects/launch/src/renderer.js";
let element = document.getElementById('app');
ReactDOM.render(
    React.createElement(AppComponent, {__self: undefined, __source: {fileName: _jsxFileName$3, lineNumber: 10}} ),
    element
);
