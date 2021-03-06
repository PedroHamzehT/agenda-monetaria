import React, { useState } from 'react'
import api from '../services/api'

const NewProductModal = ({ showModal, closeModal, getProducts }) => {
  const [nameError, setNameError] = useState(false)
  const [valueError, setValueError] = useState(false)
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')

  function clearInputs() {
    setName('')
    setValue('')
    setDescription('')
  }

  function exitModal(){
    clearInputs()
    setNameError(false)
    setValueError(false)
    closeModal()
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!name) {
      setNameError(true)
    }
    if (!value) {
      setValueError(true)
    }
    if (nameError || valueError) {
      return
    }

    setNameError(false)
    setValueError(false)

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const response = await api.post(
      '/products',
      {
        product: {
          name: name,
          value: value,
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
    getProducts()
  }

  return (
    <div className={`modal ${showModal ? 'is-active' : ''}`}>
      <div onClick={exitModal} className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Novo produto</p>
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
                <label className="label">Valor</label>
                <div className="control">
                  <input onChange={event => setValue(event.target.value)} value={value} className="input" type="number" placeholder="Digite o valor aqui..." />
                </div>
                {
                  valueError && <p className="help is-danger">Preencha o valor!</p>
                }
              </div>

              <div className="field">
                <label className="label">Descri????o</label>
                <div className="control">
                  <textarea onChange={event => setDescription(event.target.value)} value={description} className="textarea" type="email" placeholder="Digite alguma anota????o sobre esse cliente aqui..." />
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

export default NewProductModal
