import { randomInt } from 'crypto';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { v4 } from 'uuid';

interface UpdatedUser {
  name: string;
  heart: []
}

interface HeartProps {
  key: string;
}

interface User {
  id?: string;
  name?: string | undefined;
  color?: string;
  answerCorrect?: number;
  heart?: HeartProps[];
}

// interface UserTyping {
//   name: string | undefined;
//   isTyping: boolean;
// }

interface UserContextProps {
  user: User | undefined;
  answerCorrects: number;
  usersData: User[];
  newSocket: Socket | undefined;
  addUser(data: User): void;
  // getUsersColor(name: string | undefined): void;
}

const UserContext = createContext<UserContextProps | null>(null);

const UsersProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [answerCorrects, setAnswerCorrects] = useState(0);
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
    const socket = io('http://localhost:3333');
    setNewSocket(socket);
  }, []);

  const addUser = useCallback(({ name }: User) => {
    setUser({ name });
  }, [user]);

  useEffect(() => {
    newSocket?.on('users', (users: User[]) => {
      setUsersData(users);
    });
  },[newSocket, usersData]);

  useEffect(() => {
    newSocket?.on('updatedUser', ({ name, heart }: UpdatedUser) => {
      const findUser = usersData.find(user => user.name === name);
      if(findUser) {
        setUsersData(usersData.map(user => user.name === name ? { ...user, heart, } : user));
      }
    });
  },[newSocket, usersData]);

  

  useEffect(() => {
    newSocket?.on('answerCorrects', (answerCorrects: number) => {
      setAnswerCorrects(answerCorrects);
    });
  },[newSocket]);

  useEffect(() => {
    localStorage.setItem('@Users:UserData', JSON.stringify(usersData));
  },[usersData]);

  return (
    <UserContext.Provider value={{ user, usersData, addUser, newSocket, answerCorrects }} >
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
