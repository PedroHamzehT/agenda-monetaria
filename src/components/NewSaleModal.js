import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import SaleProduct from './SaleProduct'
import './css/new_sale_modal.scss'

const NewSaleModal = ({showModal, clients, products, closeModal}) => {
  const [clientSale, setClientSale] = useState(0)
  const [saleProducts, setSaleProducts] = useState([])

  function changeProduct(product_id, index) {
    saleProducts[index].product_id = product_id
    setSaleProducts(saleProducts)
  }

  function changeProductQuantity(quantity, index) {
    saleProducts[index].quantity = quantity

    setSaleProducts(saleProducts)
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
                  < input onChange={(e) => {changeProductQuantity(e.target.value, index)}} type="number" className="input" />
                </div>
                <div className="column">
                  <button onClick={() => { removeSaleProduct(index) }} type="button" className="button is-warning is-light" >remover</button>
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
    saleProducts.splice(index, 1)
    setSaleProducts(saleProducts)

    renderSaleProducts()
  }

  function addSaleProduct() {
    saleProducts.push({product_id: 0, quantity: 0})
    setSaleProducts(saleProducts)

    renderSaleProducts()
  }

  function clearInputs() {
    setClientSale(0)
    setSaleProducts([])
    renderSaleProducts()
  }

  function exitModal() {
    clearInputs()
    closeModal()
  }

  function handleSubmit(e) {
    e.preventDefault()
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
          <form onSubmit={handleSubmit} className="new-sale-form">
            <div className="fields">
              <div className="field">
                <label className="label">Cliente</label>
                {
                  (clients.length > 0 &&
                  <div className="select is-info">
                    <select onChange={e => {setClientSale(e.target.value)}}>
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
                    <label className="label">Produto</label>
                  </div>
                  <div className="column is-4">
                    <label className="label">Quantidade</label>
                  </div>
                  <div className="column"></div>
                </div>
                <div id="sale-products"></div>

                <button onClick={addSaleProduct} className="button is-link is-inverted add-sale-product-button" type="button">Adicionar produto</button>
              </div>

              <button className="button is-success register-sale" type="submit">Cadastrar</button>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot" />
      </div>
    </div>
  )
}

export default NewSaleModal
