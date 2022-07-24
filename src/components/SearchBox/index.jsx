import { Component } from 'react'
import './index.css'
import debounce from '../../modules/debounce'

export default class SearchBox extends Component {

  state = {
    searchValue: ''
  }

  onChange = (e) => {
    this.setState({
      searchValue: e.target.value
    }, () => this.onSearchChange())
  }

  onSearchChange = debounce(() => {
    this.props.onSearchChange(this.state.searchValue)
  }, 250);

  resetSearch = () => {
    this.setState({
      searchValue: ''
    })
  }

  render () {
    return (
      <label className="searchbox">
        <input
          id="search-input"
          value={this.state.searchValue}
          type="text"
          className="searchbox__input"
          placeholder="Search"
          onChange={ this.onChange }
        />
        <i className="bi bi-search searchbox__icon" />
      </label>
    )
  }
}
