import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineCloseSquare, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaChevronLeft } from 'react-icons/fa';
import { IoPersonAdd } from 'react-icons/io5';
import { useSocket } from '../../Hooks/Socket';
import { useUser } from '../../Hooks/User';
import FadeLeftToRight from '../FadeLeftToRigh';
import { Container, ContainerCreateGroup, ContentHeaderUser } from './styles';

interface AddNewFriendsProps {
  toggleOpenModal(): void;
}

const AddNewFriend: React.FC<AddNewFriendsProps> = ({ toggleOpenModal }) => {
  const {
    allUsers,
    sendRequest,
    selectUsers,
    selectUser,
    toggleModalGroup,
    openModalGroup,
    backToFriends,
    toggleModalCreateGroup,
    removeSelectUser,
    friends,
  } = useSocket();
  const [availableClick, setAvailableClick] = useState(false);
  const [hold, setHold] = useState(false);
  const [selectCurrentUser, setSelectCurrentUser] = useState('');

  const handleSelectUser = useCallback(
    (id: string) => {
      toggleModalGroup(true);
      const findUser = selectUsers.find(user => user === selectCurrentUser);
      if (!findUser) {
        selectUser(selectCurrentUser);
      } else {
        removeSelectUser(selectCurrentUser);
      }
    },
    [
      removeSelectUser,
      selectCurrentUser,
      selectUser,
      selectUsers,
      toggleModalGroup,
    ],
  );

  function handlePressHold(pressHold: boolean, id: string) {
    setHold(pressHold);
    setSelectCurrentUser(id);
    console.log('select user');
    if (!pressHold && availableClick) {
      handleSelectUser(id);
    }
  }

  function disableButtonAddFriend(id: string) {
    const findFriend = friends.some(friend => friend.friendName === id);
    return findFriend;
  }

  useEffect(() => {
    let timer: number;

    if (hold && !availableClick) {
      timer = setTimeout(handleSelectUser, 1500);
    }
    return () => {
      clearTimeout(timer);
      if (!hold && selectUsers.length > 0) {
        setAvailableClick(true);
      }
    };
  }, [
    availableClick,
    handleSelectUser,
    hold,
    removeSelectUser,
    selectCurrentUser,
    selectUser,
    selectUsers,
    toggleModalGroup,
  ]);

  useEffect(() => {
    if (selectUsers.length === 0) {
      setAvailableClick(false);
      toggleModalGroup(false);
      setSelectCurrentUser('');
      setHold(false);
    }
  }, [selectUsers.length, toggleModalGroup]);

  return (
    <Container onClick={e => e.stopPropagation()}>
      <ContentHeaderUser>
        {openModalGroup ? (
          <>
            <strong
              className={
                openModalGroup ? 'ContentTitleEnter' : 'ContentTitleLeave'
              }
            >
              Cria um Grupo
            </strong>
            <FaChevronLeft
              size={32}
              color="#9d4edd"
              onClick={() => backToFriends()}
            />
          </>
        ) : (
          <>
            <strong
              className={
                openModalGroup ? 'ContentTitleLeave' : 'ContentTitleEnter'
              }
            >
              Todos os Usuarios
            </strong>
            <AiOutlineCloseSquare
              size={32}
              color="#9d4edd"
              onClick={toggleOpenModal}
            />
          </>
        )}
      </ContentHeaderUser>

      {allUsers.map(user => (
        <button
          type="button"
          key={user.userName}
          onTouchStart={() => handlePressHold(true, user.userName)}
          onTouchEnd={() => handlePressHold(false, user.userName)}
          onMouseDown={() => handlePressHold(true, user.userName)}
          onMouseUp={() => handlePressHold(false, user.userName)}
        >
          <FadeLeftToRight
            isShow={
              !!selectUsers.some(selectedUser => selectedUser === user.userName)
            }
          />
          <div className="ContentButton">
            <p>{user.userName.split('')[0]}</p>
            <div className="ContentUser">
              <div className="TitleUser">
                <strong>{user.userName}</strong>
                {!openModalGroup && !disableButtonAddFriend(user.userName) && (
                  <IoPersonAdd
                    color="#9d4edd"
                    size={26}
                    onClick={() => sendRequest(user.userName)}
                  />
                )}
              </div>
            </div>
          </div>
        </button>
      ))}

      {openModalGroup && (
        <ContainerCreateGroup>
          <AiOutlineUsergroupAdd
            onClick={() => toggleModalCreateGroup()}
            size={26}
            color="#fff"
          />
        </ContainerCreateGroup>
      )}
    </Container>
  );
};

export default AddNewFriend;
