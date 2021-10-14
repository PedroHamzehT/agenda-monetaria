import React, { useState } from 'react'
import NewPaymentModal from './NewPaymentModal'

const Sale = ({ sale, className }) => {
  const [showModal, setShowModal] = useState(false)

  function closeModal() {
    setShowModal(false)
  }

  return (
    <div className={className}>
      <div className="columns">
        <div className="column">{sale.client_id}</div>
        <div className="column">R$ {sale.total}</div>
        <div className="column">{sale.parcelling}</div>
        <div className="column">{sale.tax + '%' || '0%'}</div>
        <div className="column">{sale.paid ? 'Sim' : 'Não'}</div>
        <div className="column">{sale.sale_date}</div>
        <div className="column"><button onClick={() => { setShowModal(true) }} className="button">Pagamentos</button></div>
      </div>

      <NewPaymentModal sale={sale} showModal={showModal} closeModal={closeModal} />
      <hr />
    </div>
  )
}

export default Sale