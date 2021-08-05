import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { api } from '../service/Api';

interface UserContextProps {
  signIn(userName: string): Promise<void>;
  signOut(): Promise<void>;
  updateUser(user: string): void;
  userData: UserState;
  socket: Socket;
}

interface UserState {
  user: string;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserProvider: React.FC = ({ children }) => {
  const socket = io('http://localhost:3333');

  const [userData, setUserData] = useState<UserState>(() => {
    const user = localStorage.getItem('@MyChat:User');

    if (user) {
      return { user };
    }
    return {} as UserState;
  });

  const signIn = useCallback(
    async (user_Name: string) => {
      const response = await api.post('/user', {
        userName: user_Name,
      });
      socket.emit('clientCreateConnection', user_Name);
      const { userName } = response.data;
      localStorage.setItem('@MyChat:User', userName);
      setUserData({ user: userName });
    },
    [socket],
  );

  const signOut = useCallback(async () => {
    localStorage.removeItem('@MyChat:Socket');
    localStorage.removeItem('@MyChat:User');
    setUserData({} as UserState);
  }, []);

  const updateUser = useCallback(
    async (user: string) => {
      socket.emit('clientCreateConnection', user);
    },
    [socket],
  );

  return (
    <UserContext.Provider
      value={{ userData, signIn, signOut, socket, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextProps {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used whitin an UserProvider');
  }
  return context;
}
