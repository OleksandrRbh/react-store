import { useState, useEffect, createRef } from 'react'
import './index.css'
import FiltersList from '../FiltersList'
import DoubleSlider from '../DoubleSlider'
import { fetchCategories, fetchBrands } from '../../modules/api'

const SideBar = ({ onFilterChange, onResetFilters }) => {
  const priceSlider = createRef()
  const ratingSlider = createRef()
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

  const onHandleFilterChange = (filters) => {
    setSelectedFilters({ ...selectedFilters, ...filters })
    onFilterChange(filters)
  }

  const onResetClick = () => {
    priceSlider.current.reset()
    ratingSlider.current.reset()
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
          ref={ priceSlider }
          filterName={ 'price' }
          min={ 0 }
          max={ 85000 }
          step={ 1 }
          units={ 'UAH' }
          onFilterChange={ onHandleFilterChange }
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
          ref={ ratingSlider }
          filterName={ 'rating' }
          min={ 0 }
          max={ 5 }
          step={ 0.01 }
          units={ '' }
          onFilterChange={ onHandleFilterChange }
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
