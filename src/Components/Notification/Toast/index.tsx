import React, { useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useToast } from '../../../Hooks/Toast';
import { useUser } from '../../../Hooks/User';
import { purple } from '../../../styles/Colors';
import { Container } from './styles';

interface ToastData {
  id: string;
  sender: string;
  userName: string;
  styles: object;
  message?: string;
  groupName?: string;
}

const Toast: React.FC<ToastData> = ({
  id,
  sender,
  userName,
  styles,
  message,
  groupName,
}) => {
  const { removeToast, acceptToRoom, rejectRoom } = useToast();
  const { userData, socket } = useUser();

  function acceptRequest() {
    removeToast(id);
    socket.emit('ClientAcceptRequest', id);
  }
  function rejectRequest() {
    removeToast(id);
    socket.emit('ClientRejectRequest', id);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, removeToast]);

  return (
    <Container
      style={{
        display: userData.user === userName ? 'flex' : 'none',
        ...styles,
      }}
    >
      <strong>{sender}</strong>
      <div>
        <p>{message || 'Enviou um pedido de amizade'}</p>
        <div className="ContainerCheck">
          <FaCheck
            size={20}
            color={purple}
            onClick={
              groupName
                ? () => acceptToRoom({ id, socketRoom: groupName })
                : acceptRequest
            }
          />
        </div>
        <div className="ContainerTimes">
          <FaTimes
            size={24}
            color={purple}
            onClick={groupName ? () => rejectRoom(id) : rejectRequest}
          />
        </div>
      </div>
    </Container>
  );
};

export default Toast;
