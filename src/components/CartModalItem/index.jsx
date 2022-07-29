import './index.css'

const CartModalItem = ({ product, onAddProduct, onRemoveProduct }) => {

  return (
    <li className="product">
      <div className="product__preview">
        <img width="54" height="40" src={ product.images[0] } alt="" />
      </div>
      <div className="product__title">{ product.title }</div>
      <div className="product__counter">
        <button
          className="counter-btn"
          onClick={ () => onRemoveProduct(product.id) }
        >-</button>
        <span>{ product.count }</span>
        <button
          className="counter-btn"
          onClick={ () => onAddProduct(product) }
        >+</button>
      </div>
      <div className="product__price">{ product.price * product.count }</div>
    </li>
  )
}
export default CartModalItem
