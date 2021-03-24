import './css/navbar.scss'
import logo from '../assets/logo.png'


const Navbar = () => {
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
          <a className="navbar-item" navbar-item-hover-color>
            Clientes
          </a>

          <a className="navbar-item">
            Produtos
          </a>

          <a className="navbar-item">
            Vendas
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Cadastrar</strong>
              </a>
              <a className="button is-light">
                Entrar
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
