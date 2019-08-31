import React from 'react'


class ResultWrapper extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    error: null,
    info: null
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ error, info });
  }

  render() {
    if (this.state.error) {
      return <div className='row error'>Something went wrong.
        Error: { this.state.error } <br />
        Details: { this.state.info }
      </div>
    }
    return this.props.result;
  }
  
}

export default ResultWrapper