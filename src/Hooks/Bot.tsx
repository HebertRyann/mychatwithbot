import React, { createContext, useCallback, useContext } from 'react';
import { useUser } from './Users';

interface BotContextProps {
  handleBot(message: string): void;
}

const BotContext = createContext<BotContextProps | null>(null);
const BotProvider:React.FC = ({ children }) => {
  const { newSocket } = useUser();

  const handleBot = useCallback((message: string | undefined) => {
    if(message?.includes('ola')) {
      newSocket?.emit('sendMessageBot', {
        name: 'BotJanderson',
        message: 'fala fiote'
      });
    }
  }, []);

  return (
    <BotContext.Provider value={{ handleBot }}>
      {children}
    </BotContext.Provider>
  );
};

function useBot(): BotContextProps {
  const context = useContext(BotContext);

  if(!context) {
    throw new Error('useBot must be used within an botProvider ')
  }
  return context;
}

export { BotProvider, useBot }