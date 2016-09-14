'use strict'
import { appMoviesTypes } from '../action/action.type'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

/**
 * initialState
 */
const initialState = fromJS({
  movies: {}
})

/**
 * export reducer
 */
export default createReducer(initialState, {
  [appMoviesTypes.GET_APP_DEMO_MOVIE_LIST](state, action) {
    return state.merge({
      movies: action.data
    })
  }
})