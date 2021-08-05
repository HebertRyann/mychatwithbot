import { useTransition } from '@react-spring/core';
import React, { useEffect, useState } from 'react';
import { ToastProps } from '../../Hooks/Toast';
import { Container } from './styles';
import Toast from './Toast';

interface ToastData {
  toast: ToastProps[];
}

const Notification: React.FC<ToastData> = ({ toast }) => {
  const toastAnimation = useTransition(toast, {
    from: { transform: 'translate(0, -120%)' },
    enter: { transform: 'translate(0px, 0px)' },
    leave: { transform: 'translate(0, -120%)' },
  });

  return (
    <Container>
      {toastAnimation((props, item) => (
        <Toast
          id={item.id}
          sender={item.sender}
          userName={item.userName}
          styles={props}
          key={item.id}
          message={item.message}
          groupName={item.groupName}
        />
      ))}
    </Container>
  );
};

export default Notification;
