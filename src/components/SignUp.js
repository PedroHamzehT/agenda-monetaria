import React from 'react'

const SignUp = () => {
  return (
    <div className="container sign-up">
      <div className="fields">
        <div className="field">
          <label className="label">Nome</label>
          <div className="control">
            <input className="input" type="text" placeholder="Digite seu nome" />
          </div>
        </div>

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

        <div className="field">
          <label className="label">Confirmação da senha</label>
          <div className="control">
            <input className="input" type="password"/>
          </div>
        </div>
        <br />

        <button id="btn-login" className="button is-primary">Cadastrar</button>
        <p> Se você possui uma conta, <a> entre aqui </a> </p>
      </div>

    </div>
  )
}

export default SignUp
