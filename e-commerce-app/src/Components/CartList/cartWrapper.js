import styled from 'styled-components';

export const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .wrapper {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .details-tab {
    display: flex;
    justify-content: space-around;
    width: 100vw;
  }
  .clear-cart-btn button {
    background-color: black;
    border: 1px solid black;
    color: white;
    border-radius: 10px;
    padding: 5px;
    margin: 5px;
    transition: all 0.2s;
  }

  .clear-cart-btn button:hover {
    background-color: white;
    border: 1px solid black;
    color: black;
    cursor: pointer;
  }

  .empty-cart {
    font-size: large;
    margin: 10em;
  }
`;
