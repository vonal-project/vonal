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

  errorDisplayComponent = (error, details, pluginName = null) => <div className='row error'>
    <div >
      Error: {error} <br />
      Details: {details} <br />
      { pluginName ? 'Plugin: ' + pluginName : ''}
    </div>
  </div>

  render() {
    if (this.state.error) {
      return this.errorDisplayComponent(this.state.error, this.state.info)
    } else if (this.props.result && this.props.result.isError) {
      let details = (this.props.result.error && this.props.result.error.stack) ? this.props.result.error.stack : 'there is no deatil available'
      return this.errorDisplayComponent(this.props.result.error, details, this.props.result.plugin.name)
    }
    return this.props.result;
  }

}

export default ResultWrapper