import React from 'react';
import './index.css';
import PaginationItem from '../PaginationItem'
import { ReactComponent as IPrev } from './../../img/icons/i-prev.svg'
import { ReactComponent as INext } from './../../img/icons/i-next.svg'

export default class Pagination extends React.Component {

  onPrevPageClick = () => {
    const { activePageIndex, onPageItemClick } = this.props
    if (activePageIndex > 0) {
      onPageItemClick(activePageIndex - 1)
    }
  }

  onNextPageClick = () => {
    const { totalPages, activePageIndex, onPageItemClick } = this.props
    if (activePageIndex < totalPages - 1) {
      onPageItemClick(activePageIndex + 1)
    }
  }

  render() {
    const { totalPages, activePageIndex, onPageItemClick } = this.props

    const pages = new Array(totalPages).fill(1).map((el, idx) => {
      return (
        <PaginationItem
          key={ idx }
          itemIndex={ idx }
          isActive={ idx === activePageIndex }
          onPageItemClick={ onPageItemClick }
        />
      )
    })

    return (
      <nav className="pagination">
        <span
          className="prev-control pg-control"
          onClick={ this.onPrevPageClick }
        >
          <IPrev />
        </span>
        <ul className="pages">
          { pages }
        </ul>
        <span
          className="next-control pg-control"
          onClick={ this.onNextPageClick }
        >
          <INext />
        </span>
      </nav>
    );
  }
}

