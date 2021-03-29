import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/Navbar'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Clients from './components/Clients'
import Logout from './Logout'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path='*' component={Navbar} />

      <Switch>
        <ProtectedRoute path="/" exact component={Clients} />
        <Route path="/sign_in" exact component={Login} />
        <Route path="/sign_up" exact component={SignUp} />
        <ProtectedRoute path="/logout" exact component={Logout} />
        <ProtectedRoute path="/clients" exact component={Clients} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
