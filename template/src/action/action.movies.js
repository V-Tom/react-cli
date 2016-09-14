'use strict'

import { appMoviesTypes } from './action.type'
import { appMoviesApi } from '../api'

/**
 * export actions
 */
export const discoverMoviesList = ()=> (dispatch)=> {
  return appMoviesApi.discoverMoviesList().then(data=> {
    dispatch({
      type: appMoviesTypes.GET_APP_DEMO_MOVIE_LIST,
      data: data
    })
    return data
  })
}
