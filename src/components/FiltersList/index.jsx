import { Component } from 'react'
import './index.css'
import FilterListItem from '../FilterListItem'
import toSnakeCase from '../../modules/toSnakeCase'

export default class FiltersList extends Component {

  handleChange = (val) => {
    const { filterName, selectedFilters, onFilterChange } = this.props

    let resultArr = []

    if (selectedFilters.includes(val)) {
      resultArr = selectedFilters.filter(item => item !== val)
    } else {
      resultArr = [...selectedFilters, val]
    }

    onFilterChange({ [filterName]: resultArr })
  }

  render () {
    const { filterName, filterData, selectedFilters } = this.props

    const filters = filterData.map((item, idx) => {
      return (
        <FilterListItem
          key={item}
          itemLabel={ item }
          itemIdx={ idx }
          itemValue={ selectedFilters.includes(toSnakeCase(item)) }
          onChange={ () => this.handleChange(toSnakeCase(item)) }
        />
      )
    })

    return (
      <form className="os-filter">
        <h3 className="os-filter__title">{ filterName }</h3>
        <ul className="os-filter__list">
          { filters }
        </ul>
      </form>
    )
  }
}
