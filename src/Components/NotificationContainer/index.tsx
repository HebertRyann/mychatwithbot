import { useTransition, config } from '@react-spring/core';
import React, { useEffect, useState } from 'react';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useSocket } from '../../Hooks/Socket';
import { useToast } from '../../Hooks/Toast';
import { Container } from './styles';

interface NotificationContainerProps {
  toggleOpenModal(): void;
  openModalNotification: boolean;
  styles?: object;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  toggleOpenModal,
  openModalNotification,
  styles,
}) => {
  const { requests, notifications, acceptRequest, rejectRequest } = useSocket();
  const { acceptToRoom, rejectRoom } = useToast();

  return (
    <Container>
      <div className="ContentUser">
        <strong>Notificações</strong>
        <AiOutlineCloseSquare
          size={34}
          color="#9d4edd"
          onClick={toggleOpenModal}
        />
      </div>

      {requests.map(request => (
        <button type="button" key={request.id}>
          <p>{request.userName.split('')[0]}</p>
          <div className="ContentUser">
            <div className="TitleUser">
              <strong>{request.userName}</strong>
              <FaCheck
                color="#9d4edd"
                size={36}
                onClick={() => acceptRequest(request.id)}
              />
              <FaTimes
                color="#9d4edd"
                size={32}
                onClick={() => rejectRequest(request.id)}
                style={{
                  marginLeft: '30px',
                }}
              />
            </div>
          </div>
        </button>
      ))}

      {notifications.map(notification => (
        <button type="button" key={notification.id}>
          <p>{notification.groupName.split('')[0]}</p>
          <div className="ContentUser">
            <div className="TitleUser">
              <strong>{notification.groupName}</strong>
              <FaCheck
                color="#9d4edd"
                size={36}
                onClick={() =>
                  acceptToRoom({
                    id: notification.id,
                    socketRoom: notification.groupName,
                  })
                }
              />
              <FaTimes
                color="#9d4edd"
                size={32}
                onClick={() => rejectRoom(notification.id)}
                style={{
                  marginLeft: '30px',
                }}
              />
            </div>
          </div>
        </button>
      ))}
    </Container>
  );
};

export default NotificationContainer;
