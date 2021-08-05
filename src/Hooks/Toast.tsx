import React, { createContext, useCallback, useContext, useState } from 'react';
import { io } from 'socket.io-client';
import { useHistory } from 'react-router';
import Notification from '../Components/Notification';
import { useUser } from './User';

interface ToastContextProps {
  addToast({ id, sender, userName, message }: ToastProps): void;
  removeToast(id: string): void;
  acceptToRoom({ socketName, socketRoom }: RoomProps): void;
  rejectRoom(id: string): void;
}
export interface ToastProps {
  id: string;
  userName: string;
  sender: string;
  message?: string;
  groupName?: string;
}

interface FriendRoomProps {
  friendName: string;
  userName: string;
  privateRoom: string;
}

interface RoomProps {
  id: string;
  socketName?: string;
  socketRoom?: string;
}

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

export const ToastProvider: React.FC = ({ children }) => {
  const socket = io('localhost:3333');
  const [toast, setToast] = useState<ToastProps[]>([]);
  const [room, setRoom] = useState('');
  const [chatData, setChatData] = useState<FriendRoomProps>(
    {} as FriendRoomProps,
  );
  const { userData } = useUser();
  const history = useHistory();

  const addToast = useCallback(
    async ({ id, sender, userName, message, groupName }: ToastProps) => {
      const findToast = toast.find(
        item => item.userName === userName && item.sender === sender,
      );
      if (!findToast) {
        const newToast = { id, userName, sender, message, groupName };
        setToast([...toast, newToast]);
      }
    },
    [],
  );
  const removeToast = useCallback(
    async (id: string) => {
      const filterToast = toast.filter(item => item.id !== id);
      setToast(filterToast);
    },
    [toast],
  );

  const acceptToRoom = useCallback(
    ({ id, socketName, socketRoom }: RoomProps) => {
      removeToast(id);
      socket.emit('ClientAcceptToRoom', id, socketRoom, userData.user);
    },
    [removeToast, socket, userData.user],
  );

  const rejectRoom = useCallback(
    (id: string) => {
      socket.emit('ClientRejectRoom', id);
      removeToast(id);
    },
    [removeToast, socket],
  );

  return (
    <ToastContext.Provider
      value={{ addToast, removeToast, acceptToRoom, rejectRoom }}
    >
      {children}
      <Notification toast={toast} />
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextProps {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used whitin an ToastProvider');
  }
  return context;
}
