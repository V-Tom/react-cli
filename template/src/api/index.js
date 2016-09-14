'use strict'

import { appMoviesResource } from './resource'


export const appMoviesApi = {
  discoverMoviesList: ()=>appMoviesResource('get', '/discover/movie',)
}