import './index.css'

const Header = ({ cartProductsCount, onCartOpen }) => {

  return (
    <header className="os-header">
      <span className="os-page-title">React Store</span>

      <button
        className="os-btn os-cart-btn"
        onClick={ onCartOpen }
      >
        <div className="os-cart-btn__icon" />
        <span>Cart <span>{ cartProductsCount ? cartProductsCount : '' }</span></span>
      </button>
    </header>
  )
}
export default Header
