import { useState, useEffect } from 'react'
import './index.css'
import { fetchCategories, fetchBrands } from '../../modules/api'

const SideBar = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const loadCategories = async () => {
    const resData = await fetchCategories()
    setCategories(resData)
  }

  const loadBrands = async () => {
    const resData = await fetchBrands()
    setBrands(resData)
  }

  useEffect(() => {
    loadCategories()
    loadBrands()
  }, [])

  return (
    <div className="os-sidebar">
      <div className="os-sidebar__filters">

      </div>

      <button className="os-btn os-sidebar__reset-btn">Clear all filters</button>
    </div>
  )
}
export default SideBar
