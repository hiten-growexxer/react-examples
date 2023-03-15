import React, { useEffect, useState } from 'react';
import Product from '../Product';
import { ProductListStyled } from './productList';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../features/product/productSlice';
import { addCart } from '../../features/cart/cartSlice';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
export default function ProductList() {
  const state = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    console.log(state, 'ProductList')
  })

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddCart = (product) => {
    setAlert(true);
    dispatch(addCart(product));
    setTimeout(() => setAlert(false), 2000);
  };
  return (
    <div>
      <ProductListStyled>
        {alert && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Item added to cart</AlertDescription>
          </Alert>
        )}
        <div className="title">New arrivals</div>
        <div className="wrapper">
        {<div>{console.log(state)}</div>}
        {state.error && <div> There is an issue with server. Please try again later </div>}
          {state.isLoading && <div className="loader"></div>}
          {!state.isLoading &&
            state.products
              .map((product) => (
                <Product product={product} handleAddCart={handleAddCart} />
              ))}
        </div>
      </ProductListStyled>
      {/* <ProductListStyled>
        <div className="title">Best sellers</div>
        <div className="wrapper">
          {state.isLoading && <div className="loader"></div>}
          {state.products.slice(4, 7).map((product) => (
            <Product product={product} />
          ))}
        </div>
      </ProductListStyled> */}
    </div>
  );
}
