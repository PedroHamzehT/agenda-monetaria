import React, { useState } from 'react'
import api from '../services/api'
import './css/login.scss'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function errorWarn() {
    if(error) {
      if(error == '400'){
        return <p className="help is-danger"> E-mail ou senha estão incorretos </p>
      }else if(error == '500') {
        return <p className="help is-danger"> Algo de errado aconteceu no sistema </p>
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const headers = {
      'email': email,
      'password': btoa(password)
    }

    const response = await api.get(
      '/sign_in', { headers: headers }
    ).catch((error) => {
      setError(error.response.status)
    })

    localStorage.setItem('token', response.data.token)
    history.push('/clients')
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="fields">
          <div className="field">
            <label className="label">E-mail</label>
            <div className="control">
              <input onChange={event => setEmail(event.target.value)} className="input" type="text" placeholder="Digite seu e-mail" />
            </div>
          </div>

          <div className="field">
            <label className="label">Senha</label>
            <div className="control">
              <input onChange={event => setPassword(event.target.value)} className="input" type="password"/>
            </div>
          </div>

          { errorWarn() }
          <br />

          <button id="btn-login" className="button is-primary" type="submit">Entrar</button>
          <p> Se você não possui uma conta, <a href="/sign_up"> cadastre-se </a> </p>
        </div>
      </form>
    </div>
  )
}

export default Login;