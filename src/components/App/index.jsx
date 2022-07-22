import { Component } from 'react'
// import logo from './logo.svg';
import './index.css';
import CardsList from '../CardsList'
import Pagination from '../Pagination'
import { fetchProducts } from '../../modules/api'

export default class App extends Component {
  state = {
    products: [],
    filters: {
      _page: 1,
      _limit: 9,
      q: '',
      price_gte: 0,
      price_lte: 85000,
      rating_gte: 0,
      rating_lte: 5,
      category: [],  // ['monitors', 'laptops']
      brand: []
    },
    totalPages: 10
  }

  async loadData () {
    const { products, totalPages } = await fetchProducts(this.state.filters)
    this.setState({ products, totalPages })
  }

  componentDidMount () {
    this.loadData()
  }

  render () {
    const { products } = this.state

    return (
      <div className="page">
        <div className="page-wrapper">

          <main className="main-container">
            <aside className="os-sidebar-container">

            </aside>
            <section>
              <CardsList products={ products } />

              <div className="os-pagination-container">
                <Pagination totalPages={ 10 } activePageIndex={ 3 } />
              </div>
            </section>
          </main>
        </div>

      </div>
    )
  }
}
