import axios from 'axios'
import React, { useState } from 'react'

import api from '../services/api'

const SignUp = ({ history }) => {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordConfirmation, setPasswordConfirmation ] = useState('')
  const [ emailUsing, setEmailUsing ] = useState(false)
  const [ confirmationMatch, setConfirmationMatch ] = useState(false)
  const [ hasSystemError, setHasSystemError ] = useState(false)

  function assignErrorMessage(response) {
    response.data.error.forEach(error => {
      switch (error) {
        case "Password confirmation doesn't match Password":
          setConfirmationMatch(true)
          break;

        case "Email has already been taken":
          setEmailUsing(true)
          break;
      }
    });
  }

  function errorMessage(message, showMessage) {
    if(showMessage) {
      return(
        <p className="help is-danger">{ `${message}` }</p>
      )
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const response = await api.post(
      '/sign_up', {
        user: {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        }
      }
    ).catch(error => {
      setEmailUsing(false)
      setConfirmationMatch(false)
      if(error.response.status == 500) {
        setHasSystemError(true)
      } else {
        setHasSystemError(false)
      }

      assignErrorMessage(error.response)

      return(error.response)
    })

    if (response.status != 201) {
      return
    }

    localStorage.setItem('token', response.data.token)
    history.push('/clients')
  }

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="fields">
        <div className="field">
          <label className="label">Nome</label>
          <div className="control">
            <input onChange={ event => setName(event.target.value) } className="input" type="text" placeholder="Digite seu nome" />
          </div>
        </div>

        <div className="field">
          <label className="label">E-mail</label>
          <div className="control">
            <input onChange={ event => setEmail(event.target.value) } className="input" type="text" placeholder="Digite seu e-mail" />
            { errorMessage('E-mail já está em uso', emailUsing) }
          </div>
        </div>

        <div className="field">
          <label className="label">Senha</label>
          <div className="control">
            <input onChange={ event => setPassword(event.target.value) } className="input" type="password"/>
          </div>
        </div>

        <div className="field">
          <label className="label">Confirmação da senha</label>
          <div className="control">
            <input onChange={ event => setPasswordConfirmation(event.target.value) } className="input" type="password"/>
            { errorMessage('Confirmação da senha precisa ser igual a senha', confirmationMatch) }
          </div>
        </div>
        <br />

        <button id="btn-login" className="button is-primary" type="submit">Cadastrar</button>
        { errorMessage('Algo no sistema deu errado, tente novamente', hasSystemError) }
        <p> Se você possui uma conta, <a href="/sign_in"> entre aqui </a> </p>
      </div>

    </form>
  )
}

export default SignUp
