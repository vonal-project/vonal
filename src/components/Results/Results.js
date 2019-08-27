import React from 'react'
import './Results.scss'
import ReactTestUtils from 'react-dom/test-utils';
import { ipcRenderer } from 'electron';
class Results extends React.Component {

    state = {
        selected: 0,
        selectedButton: 0
    }

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        document.onkeypress = (e) => {
            e = e || window.event;
            let selected = document.querySelector('button.selected')
            if(selected) {
                if(e.keyCode == 13)
                    ReactTestUtils.Simulate.click(selected);
                ReactTestUtils.Simulate.keyPress(selected, {key: e.key, keyCode: e.keyCode, which: e.keyCode});
            }
        }

        document.onkeyup = (e) => {
            e = e || window.event;
            let selected = document.querySelector('button.selected')
            if(selected) {
                ReactTestUtils.Simulate.keyUp(selected, {key: e.key, keyCode: e.keyCode, which: e.keyCode});
            }
        }

        document.onkeydown = (e) => {
            e = e || window.event;
            let selected = document.querySelector('button.selected')
            if(selected) {
                ReactTestUtils.Simulate.keyDown(selected, {key: e.key, keyCode: e.keyCode, which: e.keyCode});
            }

            let first = 0
            let last = Math.max(0, this.props.results.length - 1)
            let nextSelect = Math.min(this.state.selected + 1, last)
            let prevSelect = Math.max(this.state.selected - 1, first)


            let firstButton
            let lastButton
            let nextButtonSelect
            let prevButtonSelect

            let buttonsOfSelectedRow = document.querySelectorAll('.result.selected button')
            if (buttonsOfSelectedRow) {
                firstButton = 0
                lastButton = Math.max(0, buttonsOfSelectedRow.length - 1)
                nextButtonSelect = Math.min(this.state.selectedButton + 1, lastButton)
                prevButtonSelect = Math.max(this.state.selectedButton - 1, firstButton)
            }


            if (e.keyCode == '38') {
                // up
                this.setState({
                    selected: prevSelect,
                })
            }
            else if (e.keyCode == '40') {
                // down 
                this.setState({
                    selected: nextSelect,
                })
            }
            else if (e.keyCode == '37') {
                // left
                this.setState({
                    selectedButton: prevButtonSelect
                })
            }
            else if (e.keyCode == '39') {
                // right
                this.setState({
                    selectedButton: nextButtonSelect
                })
            } 
            else if (e.keyCode == '27') {
                // ESC
                ipcRenderer.send('hide')
            }


        }
    }

    componentDidUpdate() {
        // remove selection from button
        let selected = document.querySelector('button.selected')
        if (selected) {
            selected.classList.remove('selected')
        }

        // add selection to button
        let selectedButtons = document.querySelectorAll('.result.selected button')
        if (selectedButtons.length) {
            if (selectedButtons.length) {
                if (selectedButtons[this.state.selectedButton])
                    selectedButtons[this.state.selectedButton].classList.add('selected')
                else
                    document.querySelectorAll('.result.selected button:last-child').classList.add('selected')
            }
        }
    }

    render() {
        return <div className='results'>
            {
                this.props.results.map(result => (
                    <div key={result.id} className={'result ' + ((result.id == this.state.selected) ? 'selected' : '')}>
                        {result.content}
                    </div>)
                )
            }
        </div>
    }
}

export default Results