import './css/navbar.scss'
import logo from '../assets/logo.png'


const Navbar = () => {
  function login_or_logout_button() {
    if (localStorage.getItem('token')) {
      return (
        <div className="buttons">
          <a className="button is-light" href="/logout">
            <strong>Sair</strong>
          </a>
        </div>
      )
    } else {
      return (
        <div className="buttons">
          <a className="button is-primary" href="/sign_up">
            <strong>Cadastrar</strong>
          </a>
          <a className="button is-light" href="/sign_in">
            Entrar
          </a>
        </div>
      )
    }
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src={logo} className="logo" />
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item" navbar-item-hover-color href="/clients">
            Clientes
          </a>

          <a className="navbar-item" href="/products">
            Produtos
          </a>

          <a className="navbar-item" href="/sales">
            Vendas
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            { login_or_logout_button() }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
