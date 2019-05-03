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
    const { trigger = 'render' } = this.props
    this.props.state.on(trigger, this.update)
  }
  componentWillUnmount () {
    const { trigger = 'render' } = this.props
    this.props.state.off(trigger, this.update)
  }
  render () {
    const { trigger, children, ...props } = this.props
    return React.cloneElement(children, props)
  }
}
