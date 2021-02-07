import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Routes from './Router';
import { UsersProvider } from './Hooks/Users';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <UsersProvider>
      <Routes />
      <GlobalStyles />
    </UsersProvider>
    </BrowserRouter>
  );
};

export default App;
