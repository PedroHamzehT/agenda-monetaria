import React from 'react'

const Client = ({ client, className }) => {
  return(
    <div className={className}>
      <div className="columns">
        <div className="column">{client.name}</div>
        <div className="column">{client.email}</div>
        <div className="column">{client.cellphone || '-'}</div>
        <div className="column is-two-fifths">{client.description || '-'}</div>
      </div>
      <div className="actions">
        <button>Vendas</button>
      </div>
    </div>
  )
}

export default Client
