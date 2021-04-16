import React from 'react'

const SaleProduct = ({products, saleProduct, setSaleProduct, productQuantity, setProductQuantity}) => {
  return (
    <div className="columns">
      <div className="column">
        {
          (products.length > 0 &&
          <div className="select is-info">
            <select onChange={e => setSaleProduct(e.target.value)}>
              <option value="0">Escolha um produto</option>
              {
                products.map(product => {
                  return(
                    <option value={product.id} key={product.id}>{product.name}</option>
                  )
                })
              }
            </select>
          </div>) || <a href="/products">Precisa cadastrar ao menos um produto!</a>
        }
      </div>
      <div className="column">
        <div className="control">
          <input onChange={e => setProductQuantity(e.target.value)} className="input" type="number" />
        </div>
      </div>
    </div>
  )
}

export default SaleProduct
