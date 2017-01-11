import React from 'react'

export default class EmitOnOff extends React.Component {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
  }
  update () {
    this.forceUpdate()
  }
  componentDidMount () {
    this.props.state.on(this.props.trigger || 'render', this.update)
  }
  componentWillUnmount () {
    this.props.state.off(this.props.trigger || 'render', this.update)
  }
  render () {
    return React.cloneElement(this.props.children)
  }
}
