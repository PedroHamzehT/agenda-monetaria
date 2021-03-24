import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './components/Login'
import SignUp from './components/SignUp'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/sign_in" exact component={Login} />
      <Route path="/sign_up" exact component={SignUp} />
    </BrowserRouter>
  )
}

export default Routes
