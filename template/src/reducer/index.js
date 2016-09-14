'use strict'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import appMovies from './reducer.appMovies'


const appReducer = combineReducers({
  routing: routerReducer,
  appMovies,
  form: formReducer
})

export default appReducer