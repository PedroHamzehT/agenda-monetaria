import React, { useState } from 'react'

const NewClientModal = ({ showModal, closeModal }) => {
  const [openModal, setOpenModal] = useState(showModal)
  const [nameError, setNameError] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cellphone, setCellphone] = useState('')
  const [description, setDescription] = useState('')

  function exitModal(){
    setNameError(false)
    closeModal()
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!name) {
      setNameError(true)
      return
    }

    setNameError(false)
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
              <div class="field">
                <label class="label">Nome</label>
                <div class="control">
                  <input onChange={event => setName(event.target.value)} class="input" type="text" placeholder="Digite o nome aqui..."/>
                </div>
                {
                  nameError && <p class="help is-danger">Preencha o nome!</p>
                }
              </div>

              <div class="field">
                <label class="label">E-mail</label>
                <div class="control">
                  <input onChange={event => setEmail(event.target.value)} class="input" type="email" placeholder="Digite o e-mail aqui..." />
                </div>
              </div>

              <div class="field">
                <label class="label">Número de celular</label>
                <div class="control">
                  <input onChange={event => setCellphone(event.target.value)} class="input" type="text" placeholder="Digite o número de celular aqui..." />
                </div>
              </div>

              <div class="field">
                <label class="label">Descrição</label>
                <div class="control">
                  <textarea onChange={event => setDescription(event.target.value)} class="textarea" type="email" placeholder="Digite alguma anotação sobre esse cliente aqui..." />
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
