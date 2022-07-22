import React from 'react';
import './index.css';
import { ReactComponent as IStar } from './../../img/icons/i-star.svg'

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card__content">
          <img src={this.state.product.images[0]} className="card__image" alt='product' />

            <div className="card__info">
              <div className="info-header">
                <button className="info-raiting card__button">
                  <span>{this.state.product.rating}</span>
                  <IStar />
                </button>

                <span className="info-price">{this.state.product.price}</span>
              </div>

              <div className="info-title">{this.state.product.title}</div>

              <div className="info-category">{this.state.product.category}</div>
            </div>
        </div>

        <button className="card__action-button card__button" data-element="addToCart">Add To Cart</button>
      </div>
    );
  }
}

