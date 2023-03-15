import styled from 'styled-components';

export const StyledNav = styled.nav`
  background-color: black;
  padding: 0;
  margin: 0;
  display: flex;
  width: 100vw;
  height: 3em;
  align-items: center;
  li {
    list-style-type: none;
  }
  .nav-ul {
    display: flex;
    width: 100vw;
    justify-content: start;
    align-items: center;
  }
  .cart-item {
    justify-self: end;
    margin: 0 1em;
    text-decoration: none;
    position: relative;
    padding: 15px;
  }
  .nav-link {
    text-decoration: none;
    color: white;
    margin: 0 1em;
  }
  .item-count {
    position: absolute;
    top: 1px;
    right: 0;
    color: white;
    background-color: red;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
`;
