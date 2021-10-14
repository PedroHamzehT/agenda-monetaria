import React, { useState, useEffect } from 'react'
import api from '../services/api'
import Sale from './Sale'
import NewSaleModal from './NewSaleModal'

const Sales = () => {
  const [sales, setSales] = useState([])
  const [clients, setClients] = useState([])
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false)

  function closeModal() {
    getSales()
    setShowModal(false)
  }

  async function getSales() {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const response = await api.get(
      '/sales',
      { headers: headers }
    ).catch(error => {
      return error.response
    })

    setSales(response.data)
  }

  async function getProducts() {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const response = await api.get(
      '/products',
      { headers: headers }
    ).catch(error => {
      return error.response
    })

    setProducts(response.data)
  }

  async function getClients() {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const response = await api.get(
      '/clients',
      { headers: headers }
    ).catch(error => {
      return error.response
    })

    setClients(response.data)
  }

  useEffect(() => {
    getSales()
    getClients()
    getProducts()
  }, [])
  return (
    <div className="sales container">
      <div className="columns">
        <div className="column is-10">
          <p className="content is-large">Vendas</p>
        </div>
        <div className="column">
          <button onClick={() => setShowModal(true)} className="button is-primary">Cadastrar venda</button>
        </div>
      </div>

      <NewSaleModal showModal={showModal} closeModal={closeModal} clients={clients} products={products} getSales={getSales} />

      <hr />

      <div className="columns">
        <div className="column"><b>Cliente</b></div>
        <div className="column"><b>Total</b></div>
        <div className="column"><b>Parcelas</b></div>
        <div className="column"><b>Juros</b></div>
        <div className="column"><b>Está pago?</b></div>
        <div className="column"><b>Data da venda</b></div>
        <div className="column actions"></div>
      </div>

      {
        ( sales.length > 0 && sales.map((sale, index) => {
          if(index % 2 === 0) {
            return (<Sale getSales={getSales} sale={sale} className="stripped" key={sale.id} />)
          } else {
            return (<Sale getSales={getSales} sale={sale} key={sale.id}/>)
          }
        }) ) ||
        <p className="no-products-warning">Nenhuma venda cadastrada</p>
      }
    </div>
  )
}

export default Sales
