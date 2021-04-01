import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import api from './services/api'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  useEffect(() => {
    if(localStorage.getItem('token')) {
      const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }

      api.get(
        '/validate_token', { headers: headers }
      ).catch(_ => {
        localStorage.removeItem('token')
      })
    }
  }, [])

  return (
    <Route
      { ...rest }
      render={(props) => {
        if (localStorage.getItem('token')) {
          return (
            <Component />
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
