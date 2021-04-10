import React, { useState } from 'react'
import EditProductModal from './EditProductModal'

const Product = ({ product, className, getProducts }) => {
  const [showModal, setShowModal] = useState(false)

  function closeModal() {
    getProducts()
    setShowModal(false)
  }

  return (
    <div className={className}>
      <div className="columns">
        <div className="column">{product.name}</div>
        <div className="column">{product.value}</div>
        <div className="column is-half">{product.description || '-'}</div>
      </div>
      <div className="actions">
        <button onClick={() => setShowModal(true)} className="button">Editar</button>
      </div>

      <EditProductModal product={product} showModal={showModal} closeModal={closeModal}/>
      <hr />
    </div>
  )
}

export default Product
