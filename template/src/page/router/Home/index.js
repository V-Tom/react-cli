'use strict'

import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import './Home.less'

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  static propsType = {}

  static defaultProps = {}

  componentDidMount() {

  }

  render() {
    const classNamePrefix = 'react-factory-home'
    return (
      <div className={classNamePrefix}>

        <h3>build by React factory command line interface</h3>

        <Link to="/movies">
          watch movies
        </Link>
      </div>
    )
  }
}
