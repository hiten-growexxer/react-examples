import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;
export const ProductListStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .wrapper {
    box-sizing: border-box;
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 1em;
    justify-content: center;
  }
  .title {
    font-size: 20px;
    margin-left: 6em;
    margin-top: 1em;
  }
  .loader {
    border: 16px solid #f3f3f3;
    border-top: 16px solid black;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    margin-top: 10vh;
    margin-bottom: 10vh;
    animation: ${rotate} 2s linear infinite;
  }
`;
