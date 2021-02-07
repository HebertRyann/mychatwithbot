import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    outline: 0px;
    box-sizing: border-box;
    ::-webkit-scrollbar {
      display: none;
      scroll-behavior: smooth;
    }
  }
  body {
    background: #312E38;
    -webkit-font-smoothing: antialiased;
    font-family: 'Roboto Slab', serif;
  }
`;

export default GlobalStyles;
