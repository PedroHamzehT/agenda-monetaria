import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './components/Login'
import SignUp from './components/SignUp'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/sign_in" exact component={Login} />
        <Route path="/sign_up" exact component={SignUp} />
        <Route component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
