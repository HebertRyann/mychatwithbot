import React, { useCallback, useEffect, useState } from 'react';
import { BiMessageAdd } from 'react-icons/bi';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import {
  Container,
  Header,
  ContainerFriends,
  ContainerNewChat,
} from './styles';
import { useUser } from '../../Hooks/User';
import { useSocket } from '../../Hooks/Socket';
import NotificationContainer from '../../Components/NotificationContainer';
import AddNewFriends from '../../Components/AddNewFriends';
import FadeUpToDown from '../../Components/FadeUpToDown';
import FadeDownToUp from '../../Components/FadeDownToUp';
import CreateGroup from '../../Components/CreateGroup';
import { AudioPlayer } from '../../Components/AudioPlayer';

const Dashboard: React.FC = () => {
  const { userData } = useUser();
  const {
    allUsers,
    friends,
    loadFriends,
    loadRequests,
    loadUsers,
    requests,
    acceptRequest,
    rejectRequest,
    sendRequest,
    rooms,
    handleJoinToRoom,
    selectUser,
    selectUsers,
    multiRequests,
    removeSelectUser,
    notifications,
    openModalCreateGroup,
    openModalGroup,
    toggleModalCreateGroup,
    toggleModalGroup,
    backToFriends,
    backToSelect,
  } = useSocket();
  const [openModalAddFriend, setOpenModalAddFriend] = useState(false);
  const [openModalNotifications, setOpenModalNotifications] = useState(false);

  useEffect(() => {
    loadRequests();
    console.log('Load All Request');
  }, [loadRequests]);

  useEffect(() => {
    loadFriends();
    console.log('Load Friends');
  }, [loadFriends]);

  useEffect(() => {
    loadUsers();
    console.log('Load users');
  }, [loadUsers]);

  const toggleOpenModalNotification = useCallback(() => {
    setOpenModalNotifications(!openModalNotifications);
  }, [openModalNotifications]);

  const toggleOpenModalAddNewFriends = useCallback(() => {
    setOpenModalAddFriend(!openModalAddFriend);
  }, [openModalAddFriend]);

  return (
    <Container>
      <Header>
        <div className="Perfil">
          <p>{userData.user.split('')[0]}</p>
          <span>{userData.user}</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {requests.length || notifications.length ? (
            <VscBellDot
              size={30}
              color="#6F2DBD"
              onClick={toggleOpenModalNotification}
            />
          ) : (
            <VscBell
              size={30}
              color="#6F2DBD"
              onClick={toggleOpenModalNotification}
            />
          )}
        </div>
      </Header>

      <ContainerFriends>
        {friends &&
          friends.map(user => (
            <button
              key={user.id}
              type="button"
              onClick={() => handleJoinToRoom({ socketName: user.friendName })}
            >
              <p>A</p>
              <div className="ContentFriend">
                <div className="TitleFriend">
                  <strong>{user.friendName}</strong>
                  <span>10:30</span>
                </div>
                <div className="LastMessage">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
            </button>
          ))}
        {rooms &&
          rooms.map(room => (
            <button
              key={room.room}
              type="button"
              onClick={() => handleJoinToRoom({ socketRoom: room.room })}
            >
              <p>A</p>
              <div className="ContentFriend">
                <div className="TitleFriend">
                  <strong>{room.room}</strong>
                  <span>10:30</span>
                </div>
                <div className="LastMessage">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
            </button>
          ))}
      </ContainerFriends>

      <ContainerNewChat
        onClick={() => setOpenModalAddFriend(!openModalAddFriend)}
      >
        <BiMessageAdd size={35} color="#fff" />
      </ContainerNewChat>

      <FadeUpToDown isShow={openModalNotifications}>
        <NotificationContainer
          openModalNotification={openModalAddFriend}
          toggleOpenModal={toggleOpenModalNotification}
        />
      </FadeUpToDown>

      <FadeDownToUp isShow={openModalAddFriend}>
        <AddNewFriends toggleOpenModal={toggleOpenModalAddNewFriends} />
      </FadeDownToUp>

      {openModalCreateGroup && <CreateGroup />}
    </Container>
  );
};

export { Dashboard };
