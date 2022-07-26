import './index.css'

const CartModalItem = ({ product }) => {

  return (
    <li className="product">
      <div className="product__preview">
        <img width="54" height="40" src="${item.images[0]}" alt="" />
      </div>
      <div className="product__title">${item.title}</div>
      <div className="product__counter">
        <button className="counter-btn" data-control="decrementQuantity" data-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button className="counter-btn" data-control="incrementQuantity" data-id="${item.id}">+</button>
      </div>
      <div className="product__price">${item.price}</div>
    </li>
  )
}
export default CartModalItem
