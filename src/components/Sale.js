import React, { useState } from 'react'

const Sale = ({ getSales, sale, className }) => {
  return (
    <div className={className}>
      <div className="columns">
        <div className="column">{sale.client_id}</div>
        <div className="column">{sale.total}</div>
        <div className="column">{sale.parcelling}</div>
        <div className="column">{sale.paid ? 'Sim' : 'Não'}</div>
        <div className="column">{sale.sale_date}</div>
      </div>

      <hr />
    </div>
  )
}

export default Sale