import React from 'react';
import { RecorderProvider } from './Recorder';
import { SocketProvider } from './Socket';
import { ToastProvider } from './Toast';
import { UserProvider } from './User';

const AppProvider: React.FC = ({ children }) => {
  return (
    <UserProvider>
      <ToastProvider>
        <SocketProvider>
          <RecorderProvider>{children}</RecorderProvider>
        </SocketProvider>
      </ToastProvider>
    </UserProvider>
  );
};

export default AppProvider;
