import React from 'react';
import Cart from '../Cart';
import { CartWrapper } from './cartWrapper';
import { useSelector, useDispatch } from 'react-redux';
import {
  addCart,
  clearCart,
  removeCartItem,
} from '../../features/cart/cartSlice';
export default function CartList() {
  const state = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCartReduce = (product) => {
    dispatch(removeCartItem(product));
  };

  const handleCartIncrease = (product) => {
    dispatch(addCart(product));
  };
  return (
    <CartWrapper>
      {state.cartItems.map((cart) => {
        return (
          <Cart
            product={cart}
            handleCartReduce={handleCartReduce}
            handleCartIncrease={handleCartIncrease}
            key={cart.id}
          />
        );
      })}
      {state.cartItems.length !== 0 && (
        <div className="details-tab">
          <div className="clear-cart-btn">
            <button onClick={handleClearCart}>Clear cart</button>
          </div>
          <div>Total: {state.totalAmount} INR</div>
        </div>
      )}
      {state.cartItems.length === 0 && (
        <div className="details-tab">
          <span className="empty-cart">Your cart is empty.</span>
        </div>
      )}
    </CartWrapper>
  );
}
