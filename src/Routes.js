import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './components/Login'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/sign_in" exact component={Login} />
    </BrowserRouter>
  )
}

export default Routes
