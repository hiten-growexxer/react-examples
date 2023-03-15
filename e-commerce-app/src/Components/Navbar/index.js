import React from 'react';
import { NavLink } from 'react-router-dom';
import { StyledNav } from './styledComponents';
import { useSelector } from 'react-redux';
export default function Navbar() {
  const state = useSelector((store) => store.cart);
  const styleNav = ({ isActive }) => {
    return isActive ? { color: 'yellow' } : {};
  };
  return (
    <StyledNav>
      <ul className="nav-ul">
        <li>
          <NavLink to="" className="nav-link" style={styleNav}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="cart" className="nav-link" style={styleNav}>
            Cart
          </NavLink>
        </li>
      </ul>
      <div className="cart-item">
        <NavLink to="cart" style={styleNav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="white"
            className="bi bi-bag-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
          </svg>
        </NavLink>
        {state.cartQuantity !== 0 && (
          <span className="item-count">{state.cartQuantity}</span>
        )}
      </div>
    </StyledNav>
  );
}
