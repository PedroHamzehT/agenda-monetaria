import React from 'react'
import './css/login.css'

const Login = () => {
  return (
    <div className="container login">
      <div className="fields">
        <div className="field">
          <label className="label">E-mail</label>
          <div className="control">
            <input className="input" type="text" placeholder="Digite seu e-mail" />
          </div>
        </div>

        <div className="field">
          <label className="label">Senha</label>
          <div className="control">
            <input className="input" type="password"/>
          </div>
        </div>
      </div>
      <br />

      <button id="btn-login" className="button is-primary">Entrar</button>
      <br />
      <p> Se você não possui uma conta, <a> cadastre-se </a> </p>
    </div>
  )
}

export default Login;