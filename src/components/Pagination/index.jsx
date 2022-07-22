import React from 'react';
import './index.css';
import PaginationItem from '../PaginationItem'
import { ReactComponent as IPrev } from './../../img/icons/i-prev.svg'
import { ReactComponent as INext } from './../../img/icons/i-next.svg'

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: props.totalPages,
      activePageIndex: props.activePageIndex
    }
  }

  render() {
    const pages = new Array(this.state.totalPages).fill(1).map((el, idx) => {
      return (
        <PaginationItem
          key={ idx }
          itemIndex={ idx }
          isActive={ idx === this.state.activePageIndex }
        />
      )
    })

    return (
      <nav className="pagination">
        <span className="prev-control pg-control">
          <IPrev />
        </span>
        <ul className="pages">
          { pages }
        </ul>
        <span className="next-control pg-control">
          <INext />
        </span>
      </nav>
    );
  }
}

