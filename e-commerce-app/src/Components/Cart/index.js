import React from 'react';
import { CartStyled } from './CartStyled';

export default function Cart({
  product,
  handleCartReduce,
  handleCartIncrease,
}) {
  return (
    <CartStyled>
      <div className="cart-image">
        <img src={product.image} alt="cart-logo" />
      </div>
      <div className="cart-info">
        <div className="cart-info-item">{product.title}</div>
        <div className="cart-info-item">{product.description}</div>
        <div className="cart-info-item">Price : {product.price} INR</div>
      </div>
      <div className="cart-actions">
        <button
          className="cart-actions-item"
          onClick={() => handleCartReduce(product)}
        >
          -
        </button>
        <button className="cart-actions-item">{product.quantity}</button>
        <button
          className="cart-actions-item"
          onClick={() => handleCartIncrease(product)}
        >
          +
        </button>
      </div>
    </CartStyled>
  );
}
