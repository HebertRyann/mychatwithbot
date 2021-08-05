import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router';
import { api } from '../service/Api';
import { useToast, ToastProps } from './Toast';
import { useUser } from './User';

interface SocketContextProps {
  friends: Friends[];
  requests: RequestFriends[];
  notifications: Notifications[];
  allUsers: Users[];
  allMembers: MembersProps[];
  allMessages: MessageProps[];
  room: string;
  rooms: Rooms[];
  chatData: FriendRoomProps;
  selectUsers: string[];
  openModalGroup: boolean;
  openModalCreateGroup: boolean;
  isEmptySelectUsers: boolean;
  usersTyping: TypingProps[];
  hangman: boolean;
  passwordHangman: string[];
  usersHeart: UsersHeartProps[];
  correctLetters: string[];
  currentSong: CurrentSongProps;
  correctMessages: string[];
  loadUsers(): Promise<void>;
  loadRequests(): Promise<void>;
  loadFriends(): Promise<void>;
  sendRequest(friendsName: string): void;
  acceptRequest(friendsID: string): void;
  rejectRequest(friendsID: string): void;
  handleJoinToRoom({ socketName, socketRoom }: RoomProps): void;
  selectUser(id: string): void;
  removeSelectUser(id: string): void;
  rejectRoom(id: string): void;
  multiRequests(groupName?: string): void;
  toggleModalGroup(isOpenModal: boolean): void;
  toggleModalCreateGroup(): void;
  backToFriends(): void;
  backToSelect(): void;
}

interface Friends {
  id: string;
  friendName: string;
}
interface Rooms {
  userName: string;
  room: string;
}
interface RequestFriends {
  id: string;
  userName: string;
  friendName: string;
  groupName: string;
}
interface Notifications {
  id: string;
  sender: string;
  recipient: string;
  groupName: string;
  message: string;
}
interface Users {
  userName: string;
  created_at: string;
}
interface MessageProps {
  id: string;
  userName: string;
  content: string;
  from: string;
  isAudio?: boolean;
  time: Date;
}
interface MembersProps {
  userName: string;
  room: string;
}
interface LoadDataRoomProps {
  members?: MembersProps[];
  messages?: MessageProps[];
  friend_Name?: string;
  userName?: string;
  privateRoom?: string;
}
interface RoomProps {
  socketName?: string;
  socketRoom?: string;
}
interface FriendRoomProps {
  friendName: string;
  userName: string;
  privateRoom: string;
}

interface TypingProps {
  user: string;
  isTyping: boolean;
}

interface UsersHeartProps {
  username: string;
  heart: string[];
}
interface CurrentSongProps {
  title: string;
  singer: string;
}

const SocketContext = createContext<SocketContextProps>(
  {} as SocketContextProps,
);

export const SocketProvider: React.FC = ({ children }) => {
  const [friends, setFriends] = useState<Friends[]>([]);
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [requests, setRequests] = useState<RequestFriends[]>([]);
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [allUsers, setAllUsers] = useState<Users[]>([]);
  const [allMembers, setAllMembers] = useState<MembersProps[]>([]);
  const [allMessages, setAllMessages] = useState<MessageProps[]>([]);
  const [room, setRoom] = useState('');
  const [chatData, setChatData] = useState<FriendRoomProps>(
    {} as FriendRoomProps,
  );
  const { addToast } = useToast();
  const { userData, socket } = useUser();
  const history = useHistory();
  const [selectUsers, setSelectUsers] = useState<string[]>([]);
  const [openModalGroup, setOpenModalGroup] = useState(false);
  const [openModalCreateGroup, setOpenModalCreateGroup] = useState(false);
  const [isEmptySelectUsers, setIsEmptySelectUsers] = useState(true);
  const [usersTyping, setUsersTyping] = useState<TypingProps[]>([]);
  const [hangman, setHangman] = useState(false);
  const [passwordHangman, setPasswordHangman] = useState(['']);
  const [usersHeart, setUsersHeart] = useState<UsersHeartProps[]>([]);
  const [correctLetters, setCorrectLetters] = useState(['']);
  const [currentSong, setCurrentSong] = useState<CurrentSongProps>(
    {} as CurrentSongProps,
  );
  const [correctMessages, setCorrectMessages] = useState(['']);

  const loadUsers = useCallback(async () => {
    const response = await api.get(`/user/${userData.user}`);
    setAllUsers(response.data);
  }, [userData.user]);

  const loadRequests = useCallback(async () => {
    const response = await api.get(
      `/friend/list/solicitation/${userData.user}`,
    );
    setRequests(response.data.friend);
    setNotifications(response.data.notification);
  }, [userData.user]);

  const loadFriends = useCallback(async () => {
    const response = await api.get(`/friend/list/${userData.user}`);
    setFriends(response.data.friend);
    setRooms(response.data.rooms);
  }, [userData.user]);

  const handleJoinToRoom = useCallback(
    ({ socketName, socketRoom }: RoomProps) => {
      setRoom('');
      setChatData({} as FriendRoomProps);

      const selectRoom = socketName || socketRoom;
      if (!selectRoom) return;
      socket.emit('ClientJoinToRoom', selectRoom, userData.user);
      if (socketRoom) {
        setRoom(selectRoom);
      }

      history.push('/chat');
    },
    [history, socket, userData.user],
  );
  const rejectRoom = useCallback(
    (id: string) => {
      socket.emit('ClientRejectRoom', id);
    },
    [socket],
  );

  const sendRequest = useCallback(
    (friendsName: string, message?: string, groupName?: string) => {
      socket?.emit('ClientSendRequest', {
        userName: userData?.user,
        friendUserName: friendsName,
        message,
        groupName,
      });
    },
    [socket, userData?.user],
  );
  const acceptRequest = useCallback(
    (friendsID: string) => {
      socket.emit('ClientAcceptRequest', friendsID);
      loadFriends();
      loadUsers();
      loadRequests();
    },
    [loadFriends, loadRequests, loadUsers, socket],
  );
  const rejectRequest = useCallback(
    (friendsID: string) => {
      socket.emit('ClientRejectRequest', friendsID);
    },
    [socket],
  );
  const catchRequests = useCallback(
    ({ id, sender, userName, message, groupName }: ToastProps) => {
      loadRequests();
      addToast({
        id,
        sender,
        userName,
        message,
        groupName,
      });
      console.log('Refresh sed request');
    },
    [addToast, loadRequests],
  );

  const selectUser = useCallback(
    (id: string) => {
      setSelectUsers([...selectUsers, id]);
    },
    [selectUsers],
  );
  const removeSelectUser = useCallback(
    (id: string) => {
      const filterUser = selectUsers.filter(user => user !== id);
      setSelectUsers(filterUser);
    },
    [selectUsers],
  );

  const toggleModalGroup = useCallback((isOpenModal: boolean) => {
    setOpenModalGroup(isOpenModal);
  }, []);

  const toggleModalCreateGroup = useCallback(() => {
    setOpenModalCreateGroup(!openModalCreateGroup);
  }, [openModalCreateGroup]);

  const multiRequests = useCallback(
    (groupName?: string) => {
      socket.emit('ClientCreateGroup', {
        userName: userData.user,
        room: groupName,
      });
      selectUsers.map(user =>
        sendRequest(user, 'Te Convidou para um grupo', groupName),
      );
      toggleModalGroup(false);
      setSelectUsers([]);
      toggleModalCreateGroup();
    },
    [
      selectUsers,
      sendRequest,
      socket,
      toggleModalCreateGroup,
      toggleModalGroup,
      userData.user,
    ],
  );

  const backToFriends = useCallback(() => {
    setOpenModalGroup(false);
    setSelectUsers([]);
  }, []);

  const backToSelect = useCallback(() => {
    setOpenModalCreateGroup(false);
    setSelectUsers([]);
  }, []);

  useEffect(() => {
    socket?.on(
      'ServerResponseSendRequest',
      ({ id, sender, userName, message, groupName }: ToastProps) => {
        catchRequests({
          id,
          sender,
          userName,
          message,
          groupName,
        });
      },
    );
  }, [catchRequests, socket]);

  useEffect(() => {
    socket?.on(
      'ClientLoadAllData',
      ({
        friend_Name,
        members,
        messages,
        userName,
        privateRoom,
      }: LoadDataRoomProps) => {
        if (members) {
          setAllMembers(members);
        }
        if (messages) {
          setAllMessages(messages);
        }
        if (friend_Name && userName && privateRoom) {
          setChatData({ friendName: friend_Name, userName, privateRoom });
        }
      },
    );
  }, [socket]);

  useEffect(() => {
    if (selectUsers.length) {
      setIsEmptySelectUsers(false);
    } else {
      setIsEmptySelectUsers(true);
      backToSelect();
    }
  }, [backToSelect, isEmptySelectUsers, selectUsers.length]);

  useEffect(() => {
    socket.on('ServerReceivedMessage', (data: MessageProps) => {
      setAllMessages([...allMessages, data]);
    });
  }, [allMessages, socket]);

  useEffect(() => {
    socket?.on('ServerResponseRefreshFriends', () => {
      loadFriends();
      loadUsers();
      loadRequests();
    });
  }, [loadFriends, loadRequests, loadUsers, socket]);

  useEffect(() => {
    socket?.on('ServerResponseRefreshUsers', () => {
      loadUsers();
    });
  }, [loadUsers, socket]);

  useEffect(() => {
    socket.on('ServerResponseIsTyping', (usersIsTyping: TypingProps[]) => {
      setUsersTyping(usersIsTyping);
    });
  }, [socket, usersTyping]);

  useEffect(() => {
    socket.on('ServerResponseSetHangman', (isHangman: boolean) => {
      setHangman(isHangman);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('ServerResponseSetPasswordHangman', (password: string[]) => {
      setPasswordHangman(password);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('ServerResponseSetUsersHeart', (heart: UsersHeartProps[]) => {
      setUsersHeart(heart);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('ServerResponseCorrectLetter', (letters: string[]) => {
      setCorrectLetters(letters);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('ServerSetCurrentSong', (song: CurrentSongProps) => {
      setCurrentSong(song);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('ServerCorrectMessages', (messagesCorrect: string[]) => {
      setCorrectMessages(messagesCorrect);
    });
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        allUsers,
        friends,
        requests,
        loadFriends,
        loadRequests,
        loadUsers,
        acceptRequest,
        rejectRequest,
        sendRequest,
        handleJoinToRoom,
        allMembers,
        allMessages,
        room,
        rooms,
        chatData,
        selectUser,
        selectUsers,
        multiRequests,
        removeSelectUser,
        notifications,
        rejectRoom,
        openModalCreateGroup,
        openModalGroup,
        toggleModalCreateGroup,
        toggleModalGroup,
        backToFriends,
        backToSelect,
        isEmptySelectUsers,
        usersTyping,
        hangman,
        passwordHangman,
        usersHeart,
        correctLetters,
        currentSong,
        correctMessages,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export function useSocket(): SocketContextProps {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useUser must be used whitin an UserProvider');
  }
  return context;
}
