import styled from 'styled-components';

export const CartStyled = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  width: max-content;
  margin: 5px;
  border: 1px solid black;
  .cart-image,
  .cart-image img {
    width: 10em;
    height: 10em;
  }

  .cart-info {
    width: 40em;
    height: 10em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    padding-left: 1em;
  }
  .cart-actions {
    width: 10em;
    height: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cart-actions-item {
    padding: 1em;
    background-color: black;
    color: white;
    margin: 1px;
    border: 1px solid black;
    cursor: pointer;
  }
`;
