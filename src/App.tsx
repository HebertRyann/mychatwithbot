import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Routes from './Router';
import AppProvider from './Hooks';
import Notification from './Components/Notification';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
        <GlobalStyles />
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
