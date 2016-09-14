//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
//
//
//
'use strict'
//official
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
//Third-part

//mine
import * as actions from '../../../action/action.movies'
import './Movies.less'


const mapStateToProps = state=> {
  return state.appMovies.toJS()
}

const mapDispatchToProps = dispatch=> {
  return {
    reducerActions: bindActionCreators(Object.assign({}, actions), dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Movies extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.__fetchMovieList()
  }

  componentWillUnmount() {

  }

  __fetchMovieList() {
    const { reducerActions } = this.props
    return reducerActions.discoverMoviesList()
  }

  render() {
    const classNamePrefix = 'react-factory-movies'
    const { movies } = this.props
    console.warn(movies)
    return (
      <div className={classNamePrefix}>
        <h3>{classNamePrefix}</h3>
        <p>total movies: {movies.total_results}</p>
      </div>
    )
  }
}