import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Roboto Slab', sans-serif;
    ::-webkit-scrollbar {
      display: none;
      scroll-behavior: smooth;
    }
  }
  body {
    -webkit-font-smoothing: antialiased !important;
    background: #312E38;
  }
  body html #root {
    height: 100%;
  }
  svg {
    cursor: pointer;
  }
  input, button {
    outline: 0;
    border: 0;
  }
  span, strong, p {
    text-transform: capitalize;
  }
`;

export default GlobalStyles;
