import React, { useState } from 'react'
import EditClientModal from './EditClientModal'

const Client = ({ client, className, getClients }) => {
  const [showModal, setShowModal] = useState(false)

  function closeModal() {
    getClients()
    setShowModal(false)
  }

  return(
    <div className={className}>
      <div className="columns">
        <div className="column is-2">{client.name}</div>
        <div className="column is-2">{client.email}</div>
        <div className="column is-2">{client.cellphone || '-'}</div>
        <div className="column is-4">{client.description || '-'}</div>
      </div>
      <div className="actions">
        <button onClick={() => setShowModal(true)} className="button">Editar</button>
      </div>

      <EditClientModal client={client} showModal={showModal} closeModal={closeModal}/>
      <hr />
    </div>
  )
}

export default Client
