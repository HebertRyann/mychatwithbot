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
  id: string;
  name: string;
  color: string;
  answerCorrect: number;
  heart: HeartProps[];
}
interface UserPlay {
  name: string;
}

interface HeartHangmanProps {
  name: string;
  heart: HeartProps[];
  isPLay: boolean;
  color: string;
}

interface UserContextProps {
  user: string;
  answerCorrects: number;
  usersData: User[];
  heartsForHangman: HeartHangmanProps[];
  newSocket: Socket | undefined;
  addUser(name: string): void;
  // getUsersColor(name: string | undefined): void;
}

const UserContext = createContext<UserContextProps | null>(null);

const UsersProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState('');
  const [answerCorrects, setAnswerCorrects] = useState(0);
  const [heartsForHangman, setHeartsForHangman] = useState<HeartHangmanProps[]>([]);
  // const [otherUserIsTyping, setOtherUserIsTyping] = useState<UserTyping>();  
  const [usersData, setUsersData] = useState<User[]>(() => {
    const storagedUsersData = localStorage.getItem('@Users:UserData');
    if(storagedUsersData) {
      return JSON.parse(storagedUsersData);
    }
    return [];
  });
  const [newSocket, setNewSocket] = useState<Socket>();
  
  useEffect(() => {
    const socket = io('https://26bf6eec14eb.ngrok.io');
    setNewSocket(socket);
  }, []);

  const addUser = useCallback((name: string) => {
    setUser(name);
  }, [user]);

  useEffect(() => {
    newSocket?.once('users', (users: User[]) => {
      setUsersData(users);
    });
  },[newSocket, usersData]);

  useEffect(() => {
    newSocket?.on('updatedUser', ({ name, heart }: UpdatedUser) => {
      newSocket.emit('UpdatedUser', { name, heart })
    });
  },[newSocket]);

  useEffect(() => {
    newSocket?.on('answerCorrects', (answerCorrects: number) => {
      setAnswerCorrects(answerCorrects);
    });
  },[newSocket]);

  useEffect(() => {
    newSocket?.once('UpdateUserHangman', (userUpdated: HeartHangmanProps[]) => {
      setHeartsForHangman(userUpdated);
    })
    console.log(heartsForHangman);
  }, [newSocket, heartsForHangman]);

  useEffect(() => {
    newSocket?.once('SetUserPlay', (usersPlay: HeartHangmanProps[]) => {     
      setHeartsForHangman(usersPlay);
    })
  }, [newSocket, heartsForHangman]);

  useEffect(() => {
    localStorage.setItem('@Users:UserData', JSON.stringify(usersData));
  },[usersData]);

  return (
    <UserContext.Provider value={{ user, usersData, addUser, newSocket, answerCorrects, heartsForHangman }} >
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
