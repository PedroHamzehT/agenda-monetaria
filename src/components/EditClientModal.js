import React, { useState } from 'react'
import api from '../services/api'

const EditClientModal = ({ client, showModal, closeModal }) => {
  const [nameError, setNameError] = useState(false)
  const [name, setName] = useState(client.name)
  const [email, setEmail] = useState(client.email)
  const [cellphone, setCellphone] = useState(client.cellphone)
  const [description, setDescription] = useState(client.description)

  function resetInputs() {
    setName(client.name)
    setEmail(client.email)
    setCellphone(client.cellphone)
    setDescription(client.description)
  }

  function exitModal(reset=true){
    if (reset) { resetInputs() }
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
    const response = await api.put(
      `/clients/${client.id}`,
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

    if (response.status !== 200) {
      return
    }

    exitModal(false)
  }

  return (
    <div className={`modal ${showModal ? 'is-active' : ''}`}>
      <div onClick={exitModal} className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Editar cliente</p>
          <button onClick={exitModal} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit} id="edit-client-form">
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

              <button className="button is-primary" type="submit">Editar</button>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot" />
      </div>
    </div>
  )
}

export default EditClientModal
