import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Routes from './Router';
const App: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes />
        <GlobalStyles />
    </BrowserRouter>
  );
};

export default App;
