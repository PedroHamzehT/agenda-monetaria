import React from 'react'

const Product = ({ product, className }) => {
  return (
    <div className={className}>
      <div className="columns">
        <div className="column">{product.name}</div>
        <div className="column">{product.value}</div>
        <div className="column is-half">{product.description || '-'}</div>
      </div>
      <div className="actions">
        <button>Editar</button>
      </div>

      <hr />
    </div>
  )
}

export default Product
