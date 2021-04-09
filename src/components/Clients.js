import React, { useState, useEffect } from 'react'
import Client from './Client'
import NewClientModal from './NewClientModal'
import api from '../services/api'

import './css/clients.scss'

const Clients = () => {
  const [clients, setClients] = useState([])
  const [showModal, setShowModal] = useState(false)

  function closeModal() {
    setShowModal(false)
  }

  async function getClients() {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const response = await api.get(
      '/clients', { headers: headers }
    ).catch(e => {
      return(e.response)
    })

    setClients(response.data)
  }

  useEffect(() => {
    getClients()
  }, [])

  return (
    <div className="clients container content">
      <div className="columns">
        <div className="column is-10">
          <p className="content is-large">Clientes</p>
        </div>
        <div className="column">
          <button onClick={() => setShowModal(true)} className="button is-primary">Cadastrar cliente</button>
        </div>
      </div>

      <NewClientModal showModal={showModal} closeModal={closeModal} getClients={getClients}/>

      <hr />

      <div className="columns">
        <div className="column is-2"><b>Nome</b></div>
        <div className="column is-2"><b>E-mail</b></div>
        <div className="column is-2"><b>Número do celular</b></div>
        <div className="column is-4"><b>Descrição</b></div>
      </div>

      {
        ( clients.length > 0 && clients.map((client, index) => {
          if(index % 2 === 0) {
            return (<Client client={client} className="stripped" key={client.id} />)
          } else {
            return (<Client client={client} key={client.id}/>)
          }
        }) ) ||
        <p className="no-clients-warning">Nenhum cliente cadastrado</p>
      }
    </div>
  )
}

export default Clients
