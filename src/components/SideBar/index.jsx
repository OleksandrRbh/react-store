import { useState, useEffect } from 'react'
import './index.css'
import FiltersList from '../FiltersList'
import DoubleSlider from '../DoubleSlider'
import { fetchCategories, fetchBrands } from '../../modules/api'

const SideBar = ({ onFilterChange, onResetFilters }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState({
    price_gte: 0,
    price_lte: 85000,
    rating_gte: 0,
    rating_lte: 5,
    category: [],
    brand: []
  })

  const loadCategories = async () => {
    const resData = await fetchCategories()
    setCategories(resData)
  }

  const loadBrands = async () => {
    const resData = await fetchBrands()
    setBrands(resData)
  }

  const onHandleFilterChange = (filterName, filterData) => {
    setSelectedFilters({ ...selectedFilters, [filterName]: filterData })
    onFilterChange(filterName, filterData)
  }

  const onResetClick = () => {
    setSelectedFilters({
      price_gte: 0,
      price_lte: 85000,
      rating_gte: 0,
      rating_lte: 5,
      category: [],
      brand: []
    })
    onResetFilters()
  }

  useEffect(() => {
    loadCategories()
    loadBrands()
  }, [])

  return (
    <div className="os-sidebar">
      <div className="os-sidebar__filters">
        <DoubleSlider
          filterName={ 'price' }
          min={ 0 }
          max={ 85000 }
          step={ 1 }
        />
        <FiltersList
          filterName={ 'category' }
          filterData={ categories }
          selectedFilters={ selectedFilters.category }
          onFilterChange={ onHandleFilterChange }
        />
        <FiltersList
          filterName={ 'brand' }
          filterData={ brands }
          selectedFilters={ selectedFilters.brand }
          onFilterChange={ onHandleFilterChange }
        />
        <DoubleSlider
          filterName={ 'rating' }
          min={ 0 }
          max={ 5 }
          step={ 0.05 }
        />
      </div>

      <button
        className="os-btn os-sidebar__reset-btn"
        onClick={ onResetClick }
      >
        Clear all filters
      </button>
    </div>
  )
}
export default SideBar
