import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      { ...rest }
      render={(props) => {
        debugger
        if (localStorage.getItem('token')) {
          return (
            <Component/>
          )
        } else {
          return (
            <Redirect to={{ pathname: '/sign_in', state: { from: props.location } }}/>
          )
        }
      }}
    />
  )
}

export default ProtectedRoute
