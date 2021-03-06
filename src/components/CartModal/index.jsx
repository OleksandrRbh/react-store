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

  const getTotalAmount = () => {
    if (!cartProducts.length) return 0
    return cartProducts.reduce((acc, cur) => {
      return acc + cur.count * cur.price
    }, 0)
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
            { cartProducts.map(item => (
              <CartModalItem
                key={ item.id }
                product={ item }
                onAddProduct={ onAddProduct }
                onRemoveProduct={ onRemoveProduct }
              />
            )) }
          </ul>
          <footer className="os-cart__footer">
            <div className="os-cart__total">
              Total: <span>{ getTotalAmount() }</span>
            </div>

            <button className="os-btn">Order</button>
          </footer>
        </main>
      </div>
    </div>
  )
}
export default CartModal
