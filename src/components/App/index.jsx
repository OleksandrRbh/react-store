import { Component, createRef } from 'react'
import './index.css';
import CardsList from '../CardsList'
import Pagination from '../Pagination'
import SearchBox from '../SearchBox'
import SideBar from '../SideBar'
import Header from '../Header'
import CartModal from '../CartModal'
import { fetchProducts } from '../../modules/api'

export default class App extends Component {
  searchElement = createRef()
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
      category: [],  // ['monitors', 'video_cards']
      brand: []
    },
    totalPages: 10,
    activePageIndex: 0,
    isCartVisible: false,
    cartProducts: []
  }

  async loadData () {
    const { products, totalPages } = await fetchProducts(this.state.filters)
    this.setState({ products, totalPages })
  }

  changeFilters = (newFilters) => {
    this.setState(({ filters }) => {
      return {
        filters: { ...filters, ...newFilters }
      }
    }, () => this.loadData())
  }

  onPageItemClick = (idx) => {
    if (idx === this.state.activePageIndex) return
    this.setState({ activePageIndex: idx })
    this.changeFilters({ _page: idx + 1 })
  }

  onSearchChange = (query) => {
    this.setState({ activePageIndex: 0 })
    this.changeFilters({ _page: 1, q: query })
  }

  onSideBarFilterChange = (filters) => {
    this.setState({ activePageIndex: 0 })
    this.changeFilters({ _page: 1, ...filters })
  }

  onResetFilters = () => {
    this.searchElement.current.resetSearch()
    this.changeFilters({
      _page: 1,
      _limit: 9,
      q: '',
      price_gte: 0,
      price_lte: 85000,
      rating_gte: 0,
      rating_lte: 5,
      category: [],
      brand: []
    })
  }

  setCartVisibility = (payload) => {
    this.setState({ isCartVisible: payload })
  }

  addProductToCart = (product) => {
    this.setState(({ cartProducts }) => {
      const idx = cartProducts.findIndex(el => el.id === product.id)
      if (idx > -1) {
        const existProduct = { ...cartProducts[idx], count: cartProducts[idx].count + 1 }
        return { cartProducts: [...cartProducts.slice(0, idx), existProduct, ...cartProducts.slice(idx + 1)] }
      } else {
        const newProduct = { ...product, count: 1 }
        return { cartProducts: [...cartProducts, newProduct] }
      }
    })
  }

  deleteProductFromCart = (productId) => {
    this.setState(({ cartProducts }) => {
      const idx = cartProducts.findIndex(el => el.id === productId)
      if (cartProducts[idx].count > 1) {
        const existProduct = { ...cartProducts[idx], count: cartProducts[idx].count - 1 }
        return { cartProducts: [...cartProducts.slice(0, idx), existProduct, ...cartProducts.slice(idx + 1)] }
      } else {
        return { cartProducts: [...cartProducts.slice(0, idx), ...cartProducts.slice(idx + 1)] }
      }
    })
  }

  getCartProductsQuantity = () => {
    if (!this.state.cartProducts.length) return ''
    return this.state.cartProducts.reduce((acc, cur) => {
      return acc + cur.count
    }, 0)
  }

  componentDidMount () {
    this.loadData()
  }

  render () {
    const { products, totalPages, activePageIndex, isCartVisible, cartProducts } = this.state

    return (
      <div className="page">
        <div className="page-wrapper">
          <Header
            cartProductsCount={ this.getCartProductsQuantity() }
            onCartOpen={ () => { this.setCartVisibility(true) } }
          />
          <main className="main-container">
            <aside className="os-sidebar-container">
              <SideBar
                onFilterChange={ this.onSideBarFilterChange }
                onResetFilters={ this.onResetFilters }
              />
            </aside>
            <section>
              <SearchBox
                ref={ this.searchElement }
                onSearchChange={ this.onSearchChange }
              />

              <CardsList
                products={ products }
                onAddProduct={ this.addProductToCart }
              />

              <div className="os-pagination-container">
                <Pagination
                  totalPages={ totalPages }
                  activePageIndex={ activePageIndex }
                  onPageItemClick={ this.onPageItemClick }
                />
              </div>
            </section>
          </main>
        </div>
        <CartModal
          isCartVisible={ isCartVisible }
          cartProducts={ cartProducts }
          onClose={ () => { this.setCartVisibility(false) } }
          onAddProduct={ this.addProductToCart }
          onRemoveProduct={ this.deleteProductFromCart }
        />
      </div>
    )
  }
}
