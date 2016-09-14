'use strict'
import React, { Component, PropTypes } from 'react'

import '../../less/core/normalize.less'
import './App.less'

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  static propsType = {}

  static defaultProps = {}

  componentDidMount() {

  }

  render() {
    const classNamePrefix = 'react-factory'

    return (
      <div className={classNamePrefix}>
        { this.props.children }
      </div>
    )
  }
}