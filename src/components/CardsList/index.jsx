import './index.css'
import Card from '../Card'

const CardsList = ({ products }) => {
  return (
    <div className="os-products-list" data-element="body">
      { products.map(item => <Card key={ item.id } product={ item } />) }
    </div>
  )
}

export default CardsList
