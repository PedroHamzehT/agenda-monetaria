import React from 'react'
import { Redirect } from 'react-router-dom'

const Logout = (props) => {
  localStorage.removeItem('token')

  return (
    <Redirect to={{ pathname: '/sign_in', state: { from: props.location } }}/>
  )
}

export default Logout
