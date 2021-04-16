import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import SaleProduct from './SaleProduct'

const NewSaleModal = ({showModal, clients, products, closeModal}) => {
  const [saleProducts, setSaleProducts] = useState([])

  function changeProduct(product_id, index) {
    let updatedSaleProducts = saleProducts
    updatedSaleProducts[index].product_id = product_id

    setSaleProducts(updatedSaleProducts)
  }

  function changeProductQuantity(quantity, index) {
    let updatedSaleProducts = saleProducts
    updatedSaleProducts[index].quantity = quantity

    setSaleProducts(updatedSaleProducts)
  }

  function renderSaleProducts() {
    ReactDOM.render(
      <div>
        {
          saleProducts.map((_saleProduct, index) => {
            return (
              <div className="columns" key={index}>
                <div className="column">
                  <div className="select is-info">
                    <select onChange={e => {changeProduct(e.target.value, index)}}>
                      <option value="0">Selecione um produto</option>
                      {
                        products.map(product => {
                          return (
                            <option value={product.id} key={product.id}>{product.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="column">
                  <input onChange={(e) => {changeProductQuantity(e.target.value, index)}} type="number"/>
                </div>
                <div className="column">
                  <button onClick={() => { removeSaleProduct(index) }} type="button">remover</button>
                </div>
              </div>
            )
          })
        }
      </div>,
      document.getElementById('sale-products')
    )
  }

  function removeSaleProduct(index) {
    let updatedSaleProducts = saleProducts
    updatedSaleProducts.splice(index, 1)
    setSaleProducts(updatedSaleProducts)

    renderSaleProducts()
  }

  function addSaleProduct() {
    let updatedSaleProducts = saleProducts
    updatedSaleProducts.push({product_id: 0, quantity: 0})
    setSaleProducts(updatedSaleProducts)

    renderSaleProducts()
  }

  function exitModal() {
    closeModal()
  }

  return (
    <div className={`modal ${showModal ? 'is-active' : ''}`}>
      <div onClick={exitModal} className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Nova venda</p>
          <button onClick={exitModal} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <form className="new-sale-form">
            <div className="fields">
              <div className="field">
                <label className="label">Cliente</label>
                {
                  (clients.length > 0 &&
                  <div className="select is-info">
                    <select>
                      <option value="0">Escolha um cliente</option>
                      {
                        clients.map(client => {
                          return(
                            <option value={client.id} key={client.id}>{client.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>) || <a href="/clients">Precisa cadastrar ao menos um cliente!</a>
                }
              </div>

              <div className="field">
                <div className="columns">
                  <div className="column">
                    <label className="label">Produtos</label>
                  </div>
                  <div className="column">
                    <label className="label">Quantidade</label>
                  </div>
                  <div className="column"></div>
                </div>
                <div id="sale-products"></div>

                <button onClick={addSaleProduct} className="button is-link is-inverted add-sale-product-button" type="button">Adicionar produto</button>
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot" />
      </div>
    </div>
  )
}

export default NewSaleModal
