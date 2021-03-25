import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  body {
    -webkit-font-smoothing: antialiased !important;
    background: #312E38;
    font-family: 'Roboto Slab', serif;
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
`;

export default GlobalStyles;
