import styled from 'styled-components';

export const StyledDiv = styled.div`
  width: 18em;
  height: 25em;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 1px 1px 5px black;
  margin: 1em;

  .product-image img {
    width: 18em;
    height: 20em;
  }
  .actions button {
    background-color: black;
    border: 1px solid black;
    color: white;
    border-radius: 10px;
    padding: 5px;
    margin: 5px;
    transition: all 0.2s;
  }
  .actions button:hover {
    background-color: white;
    border: 1px solid black;
    color: black;
    font-size: 1em;
    cursor: pointer;
  }
`;
