import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import api from '../services/api'

const NewPaymentModal = ({ sale, showModal, closeModal }) => {
  const [payments, setPayments] = useState([])
  const [totalPaid, setTotalPaid] = useState(0)

  async function getPayments() {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const response = await api.get(
      `/sales/${sale.id}/payments`,
      { headers: headers }
    ).catch(error => {
      return error.response
    })

    setPayments(
      response.data.map(payment => (
        { pay_value: payment.pay_value, date: payment.date, }
      ))
    )
  }

  const mappedPayments = () => (
    <div className="payments">
      <div className="columns">
        <div className="column">
          Valor do pagamento
        </div>

        <div className="column">
          Data do pagamento
        </div>

        <div className="column"></div>
      </div>

      {
        payments.map((payment, index) => (
          <div className="payment columns">
            <div className="column">
              <input onChange={(e) => { changePayValue(e.target.value, index) }} className="input" type="number" id={`payment_${index}`} value={payment.pay_value} placeholder="Valor" />
            </div>
  
            <div className="column">
              <DatePicker onChange={(date) => { changeDate(date, index) }} selected={payment.date || new Date()} className="input" />
            </div>

            <div className="column action">
              <button onClick={() => { removePayment(index) }} className="delete-action">X</button>
            </div>
          </div>
        ))
      }
    </div>
  )

  const addPayment = () => {
    payments.push({pay_value: '', date: '',})
    setPayments([...payments])
  }

  const changePayValue = (value, index) => {
    payments[index].pay_value = value
    setPayments([...payments])
    calculateTotalPaid()
  }

  const changeDate = (value, index) => {
    payments[index].date = value
    setPayments([...payments])
    calculateTotalPaid()
  }

  const removePayment = (index) => {
    payments.splice(index, 1)
    setPayments([...payments])
    calculateTotalPaid()
  }

  const calculateTotalPaid = () => {
    setTotalPaid(
      payments.reduce((acc, current) => (
        acc + parseInt(current.pay_value, 10)
      ), 0)
    )
  }

  const savePayments = () => {
    console.log('savePayments')
  }

  const exitModal = () => {
    getPayments()
    setTotalPaid(0)
    closeModal()
  }

  useEffect(() => {
    getPayments()
  }, [])

  return (
    <div className={`modal ${showModal && 'is-active'}`}>
      <div onClick={() => { exitModal()} } className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Pagamentos</p>
          <button onClick={() => { exitModal()} } className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          {
            payments.length > 0 && mappedPayments() || <p>Nenhum pagamento registrado</p>
          }

          <br />
          <button onClick={addPayment}>Adicionar pagamento</button>
        </section>
        <footer className="modal-card-foot" >
          <button onClick={savePayments} id="save-payments">Salvar pagamentos</button>
          <p>Total pago: {totalPaid}</p>
        </footer>
      </div>
    </div>
  )
}

export default NewPaymentModal
