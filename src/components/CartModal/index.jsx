import './index.css'
import { ReactComponent as IClose } from './../../img/icons/i-close.svg'
import CartModalItem from '../CartModalItem'

const CartModal = ({ isCartVisible, onClose, cartProducts, onAddProduct, onRemoveProduct }) => {

  const onOverlayClick = (e) => {
    onClose()
  }

  const onContainerClick = (e) => {
    e.stopPropagation()
  }

  let classNames = 'os-cart'
  if (isCartVisible) classNames += ' os-cart--visible'

  return (
    <div
      className={ classNames }
      onClick={ onOverlayClick }
    >
      <div
        className="os-cart__container"
        onClick={ onContainerClick }
      >
        <header className="os-cart__header">
          <p>Cart</p>
          <button
            className="os-cart__close"
            onClick={ onClose }
          >
            <IClose />
          </button>
        </header>
        <main className="os-cart__main">
          <ul className="os-cart__list">
            { cartProducts.map(item => <CartModalItem key={ item.id } product={ item } />) }
          </ul>
          <footer className="os-cart__footer">
            <div className="os-cart__total">
              Total: <span>234</span>
            </div>

            <button className="os-btn">Order</button>
          </footer>
        </main>
      </div>
    </div>
  )
}
export default CartModal
