import React, { useState, useEffect } from 'react'
import Product from './Product'
import NewProductModal from './NewProductModal'
import api from '../services/api'

const Products = () => {
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false)

  function closeModal() {
    setShowModal(false)
  }

  async function getProducts() {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const response = await api.get(
      '/products', { headers: headers }
    ).catch(e => {
      return(e.response)
    })

    setProducts(response.data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="clients container content">
      <div className="columns">
        <div className="column is-10">
          <p className="content is-large">Produtos</p>
        </div>
        <div className="column">
          <button onClick={() => setShowModal(true)} className="button is-primary">Cadastrar produto</button>
        </div>
      </div>

      <NewProductModal showModal={showModal} closeModal={closeModal} getProducts={getProducts}/>

      <hr />

      <div className="columns">
        <div className="column"><b>Nome</b></div>
        <div className="column"><b>Valor</b></div>
        <div className="column is-half"><b>Descrição</b></div>
      </div>

      {
        ( products.length > 0 && products.map((product, index) => {
          if(index % 2 === 0) {
            return (<Product getProducts={getProducts} product={product} className="stripped" key={product.id} />)
          } else {
            return (<Product getProducts={getProducts} product={product} key={product.id}/>)
          }
        }) ) ||
        <p className="no-products-warning">Nenhum produto cadastrado</p>
      }
    </div>
  )
}

export default Products
