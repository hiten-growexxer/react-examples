import React from 'react';
import { StyledDiv } from './styledDiv';

export default function Product({ product, handleAddCart }) {
  return (
    <StyledDiv>
      <div className="product-image">
        <img src={product.image} alt="product-icon" />
      </div>
      <div className="product-name">{product.title}</div>
      <div className="actions">
        <button onClick={() => handleAddCart(product)}>Add to cart</button>
      </div>
    </StyledDiv>
  );
}
