import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Routes from './Router';
import { UsersProvider } from './Hooks/Users';
import { BotProvider } from './Hooks/Bot';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <UsersProvider>
      <BotProvider>
        <Routes />
        <GlobalStyles />
      </BotProvider>
    </UsersProvider>
    </BrowserRouter>
  );
};

export default App;
