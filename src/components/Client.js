import React from 'react'

const Client = ({ client, className }) => {
  return(
    <div className={className}>
      <div className="columns">
        <div className="column is-2">{client.name}</div>
        <div className="column is-2">{client.email}</div>
        <div className="column is-2">{client.cellphone || '-'}</div>
        <div className="column is-4">{client.description || '-'}</div>
      </div>
      <div className="actions">
        <button>Vendas</button>
      </div>
    </div>
  )
}

export default Client
