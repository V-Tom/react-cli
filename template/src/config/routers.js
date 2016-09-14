'use strict'
import React from 'react'
import { Route, IndexRoute, Redirect, IndexRedirect, IndexLink } from 'react-router'

import App from '../page/App'
import Home from '../page/router/Home'
import Movies from '../page/router/Movies'
//PlatformStart

export default()=>
  <Route path="/" component={App}>

    <IndexRoute component={Home}/>
    <IndexRedirect to="/Home"/>

    <Route path="/Home" component={Home}>
    </Route>

    <Route path="/Movies" component={Movies}>
    </Route>

  </Route>
