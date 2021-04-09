import React, { useState } from 'react'
import api from '../services/api'

const NewClientModal = ({ showModal, closeModal, getClients }) => {
  const [nameError, setNameError] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cellphone, setCellphone] = useState('')
  const [description, setDescription] = useState('')

  function clearInputs() {
    setName('')
    setEmail('')
    setCellphone('')
    setDescription('')
  }

  function exitModal(){
    clearInputs()
    setNameError(false)
    closeModal()
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!name) {
      setNameError(true)
      return
    }

    setNameError(false)

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const response = await api.post(
      '/clients',
      {
        client: {
          name: name,
          email: email,
          cellphone: cellphone,
          description: description
        }
      },
      { headers: headers }
    ).catch(error => {
      return error.response
    })

    if (response.status !== 201) {
      return
    }

    clearInputs()
    getClients()
  }

  return (
    <div className={`modal ${showModal ? 'is-active' : ''}`}>
      <div onClick={exitModal} className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Novo cliente</p>
          <button onClick={exitModal} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit} id="new-client-form">
            <div className="fields">
              <div className="field">
                <label className="label">Nome</label>
                <div className="control">
                  <input onChange={event => setName(event.target.value)} value={name} className="input" type="text" placeholder="Digite o nome aqui..."/>
                </div>
                {
                  nameError && <p className="help is-danger">Preencha o nome!</p>
                }
              </div>

              <div className="field">
                <label className="label">E-mail</label>
                <div className="control">
                  <input onChange={event => setEmail(event.target.value)} value={email} className="input" type="email" placeholder="Digite o e-mail aqui..." />
                </div>
              </div>

              <div className="field">
                <label className="label">Número de celular</label>
                <div className="control">
                  <input onChange={event => setCellphone(event.target.value)} value={cellphone} className="input" type="text" placeholder="Digite o número de celular aqui..." />
                </div>
              </div>

              <div className="field">
                <label className="label">Descrição</label>
                <div className="control">
                  <textarea onChange={event => setDescription(event.target.value)} value={description} className="textarea" type="email" placeholder="Digite alguma anotação sobre esse cliente aqui..." />
                </div>
              </div>

              <button className="button is-primary" type="submit">Cadastrar</button>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot" />
      </div>
    </div>
  )
}

export default NewClientModal
