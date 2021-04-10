import React from 'react'

const Product = ({ product, className }) => {
  return (
    <div className={className}>
      <div className="columns">
        <div className="column">{product.name}</div>
        <div className="column">{product.valuel}</div>
        <div className="column is-half">{product.description || '-'}</div>
      </div>
      <div className="actions">
        <button>Editar</button>
      </div>
    </div>
  )
}

export default Product
