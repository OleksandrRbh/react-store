import { Component, createRef } from 'react'
import './index.css';
import CardsList from '../CardsList'
import Pagination from '../Pagination'
import SearchBox from '../SearchBox'
import SideBar from '../SideBar'
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
    activePageIndex: 0
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

  onSideBarFilterChange = (filterName, filterData) => {
    this.setState({ activePageIndex: 0 })
    this.changeFilters({ _page: 1, [filterName]: filterData })
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

  componentDidMount () {
    this.loadData()
  }

  render () {
    const { products, totalPages, activePageIndex } = this.state

    return (
      <div className="page">
        <div className="page-wrapper">

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

              <CardsList products={ products } />

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

      </div>
    )
  }
}
