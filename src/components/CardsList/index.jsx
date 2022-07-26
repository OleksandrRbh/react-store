import './index.css'
import Card from '../Card'

const CardsList = ({ products, onAddProduct }) => {
  return (
    <div className="os-products-list" data-element="body">
      { products.map(item => <Card key={ item.id } product={ item } onAddProduct={ onAddProduct } />) }
    </div>
  )
}

export default CardsList
