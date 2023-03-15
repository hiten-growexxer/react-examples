import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';
export default function Navbar() {
  const styleNav =({isActive})=>{
    return isActive ? { color:'yellow'}: {}
  }
  return (
    <header>
      <nav>
        <ul className="navbar">
          <li>
            <NavLink to="/home" className="nav-item" style={styleNav}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/sport" className="nav-item" style={styleNav}>
              Sports
            </NavLink>
          </li>
          <li>
            <NavLink to="/politics" className="nav-item" style={styleNav}>
              Politics
            </NavLink>
          </li>
          <li>
            <NavLink to="/business" className="nav-item" style={styleNav}>
              Business
            </NavLink>
          </li>
          <li>
            <NavLink to="/technology" className="nav-item" style={styleNav}>
              Technology
            </NavLink>
          </li>
          <li>
            <NavLink to="/health" className="nav-item" style={styleNav}>
              Health
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
