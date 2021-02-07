import { randomInt } from 'crypto';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { v4 } from 'uuid';

interface User {
  id?: string;
  name?: string | undefined;
  color?: string;
}

// interface UserTyping {
//   name: string | undefined;
//   isTyping: boolean;
// }

interface UserContextProps {
  user: User | undefined;
  usersData: User[];
  newSocket: Socket | undefined;
  addUser(data: User): void;
  // getUsersColor(name: string | undefined): void;
}

const UserContext = createContext<UserContextProps | null>(null);

const UsersProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();
  // const [otherUserIsTyping, setOtherUserIsTyping] = useState<UserTyping>();  
  const [usersData, setUsersData] = useState<User[]>(() => {
    const storagedUsersData = localStorage.getItem('@Users:UserData');
    if(storagedUsersData) {
      return JSON.parse(storagedUsersData);
    }
    return [];
  });
  const [newSocket, setNewSocket] = useState<Socket | undefined>();
  
  useEffect(() => {
    const socket = io('http://localhost:3333', {
    });
    setNewSocket(socket);
  }, []);

  const addUser = useCallback(({ name }: User) => {
    setUser({ name });
  }, [user]);

  useEffect(() => {
    newSocket?.on('users', (users: User[]) => {
      setUsersData(users);
    });
  },[newSocket]);

  useEffect(() => {
    localStorage.setItem('@Users:UserData', JSON.stringify(usersData));
  },[usersData]);

  return (
    <UserContext.Provider value={{ user, usersData, addUser, newSocket }} >
      {children}
    </UserContext.Provider>
  );
};

function useUser(): UserContextProps {
  const context = useContext(UserContext);

  if(!context) {
    throw new Error('useUser must be used within an UserProvider')
  }
  return context;
}

export { UsersProvider, useUser };
