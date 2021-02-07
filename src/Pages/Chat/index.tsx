import React, { useCallback, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import {
  MdSend,
} from 'react-icons/all';
import {
  Container,
  ChatContainer,
  SendMessage,
  MyMessageContainer,
  OtherMessageContainer,
  SystemMessageContainer,
} from './styles';
import Input from '../../Components/Input';
import { useUser } from '../../Hooks/Users';
import { useHistory } from 'react-router-dom';

interface MessageProps {
  name?: string;
  message: string;
  color?: string;
}

interface UserTyping {
  name: string | undefined;
  isTyping: boolean;
}



const Chat: React.FC = () => {
  const messageInputRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [otherUserIsTyping, setOtherUserIsTyping] = useState<UserTyping[]>([]); 
  const [messages, setMessages] = useState<MessageProps[]>(() => {
    const storagedMessages = localStorage.getItem('@Chat:Messages');
    if(storagedMessages) {
      return JSON.parse(storagedMessages);
    }
    return [];
  });
  const [systemMessages, setSystemMessages] = useState<MessageProps[]>([]);
  // const [messageIsTyping, setMessageIsTyping] = useState<UserTyping>();
  const { user, newSocket, usersData } = useUser();

  const handleSendMessage = useCallback((event) => {
    newSocket?.emit('sendMessage', {
      message: messageInputRef.current?.value,
    });
    setInputValue('');
  }, []);

  useEffect(() => {
    newSocket?.once('receivedMessage', ({ name, message }: MessageProps) => {
      console.log('receivedMesage')
      // const findMessage = messages.find(item => item.message === message )
      setMessages([...messages, { name, message  }]);
    });
  }, [messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages, otherUserIsTyping])

  useEffect(() => {
    newSocket?.on('botMessagesEnter', ({ name, message }: MessageProps) => {
      setSystemMessages([{ name, message }]);
    });
  }, [systemMessages]);

  useEffect(() => {
    localStorage.setItem('@Chat:Messages', JSON.stringify(messages));

  },[messages]);

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if(event.key === 'F5') {
        event.preventDefault();
      }
    })
  }, []);

  useEffect(() => {
    messageInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const findUser = otherUserIsTyping.find(
      userTyping => 
      userTyping.name === user?.name
    );
    if(inputValue) {
      if(findUser) {
        if(findUser.isTyping !== true) {
          newSocket?.emit('userTyping', {
            name: user?.name,
            isTyping: true, 
          });
        }
      }
    }
    if(!inputValue && findUser) {
      if(findUser.isTyping !== false) {
        newSocket?.emit('userTyping', {
          name: user?.name,
          isTyping: false, 
        });
      }
    }
    if(inputValue && !findUser) {
      newSocket?.emit('userTyping', {
        name: user?.name,
        isTyping: true, 
      })
    }
    if(!inputValue && !findUser) {
      newSocket?.emit('userTyping', {
        name: user?.name,
        isTyping: false, 
      })
    }
  }, [inputValue]);

  useEffect(() => {
    newSocket?.once('userIsTyping', ({ name, isTyping }: UserTyping) => {
      const findUser = otherUserIsTyping.find(user => user.name === name)
      if(findUser?.isTyping !== isTyping && findUser?.name === name) {
        setOtherUserIsTyping(otherUserIsTyping.map(user => 
          user.name === name ? 
          { name, isTyping, } : 
          user));
      }
      if(!findUser) {
        setOtherUserIsTyping([...otherUserIsTyping, { name, isTyping }])
      }
    });
  }, [otherUserIsTyping]);


  const getUsersColor = useCallback((name) => {
    const findUser = usersData.find(user => user.name === name)
    if(findUser) {
      return findUser.color;
    }
  }, [usersData]);

  return (
    <Container>
      <ChatContainer>
        {messages.map((message, index) =>
          {if(message.name === 'Admin') {
            return (
              <SystemMessageContainer key={index} ref={index + 1 === messages.length ? lastMessageRef : null}>
                <div className="ContentSystemMessage">
                  <span>{message.message}</span>
                </div>
              </SystemMessageContainer>
            )
          } else if (message.name === user?.name ) {
            return (
              <MyMessageContainer key={index} ref={index + 1 === messages.length ? lastMessageRef : null}>
                <div className="ContentMyMessage">
                  <p>{message.message}</p>
                </div>
              </MyMessageContainer>
            )
          } else {
            return (
              <OtherMessageContainer key={index} ref={index + 1 === messages.length ? lastMessageRef : null}>
                <div className="ContentOtherMessage">
                  <span style={{
                    color: `${getUsersColor(message.name)}`
                  }}>{`${message.name}`}</span>
                  <p>{message.message}</p>
                </div>
              </OtherMessageContainer>
            )
          }}
        )}
        {otherUserIsTyping.map((message, index) => (
          message.isTyping && message.name !== user?.name && (
            <OtherMessageContainer key={index} ref={index + 1 === messages.length ? lastMessageRef : null}>
              <div 
                className="chat-bubble" 
              >
                <div className="typing" >
                <span
                  style={{ 
                    color: `${getUsersColor(message.name)}`
                  }}
                >{message.name}</span>
                <div className="ContainerDot">
                  <div className="dot" style={{
                    backgroundColor: `${getUsersColor(message.name)}`
                  }}></div>
                  <div className="dot" style={{
                    backgroundColor: `${getUsersColor(message.name)}`
                  }}></div>
                  <div className="dot" style={{
                    backgroundColor: `${getUsersColor(message.name)}`
                  }}></div>
                </div>
                </div>
              </div>
          </OtherMessageContainer>
        )
        ))}
      </ChatContainer>
      
      <SendMessage>
        <input 
        type="text" 
        ref={messageInputRef}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyPress={event => event.key === 'Enter' ? handleSendMessage(event) : null}
        />
        <div className="ContentSendButton">
          <MdSend
            size={24}
            onClick={handleSendMessage}
            >
          Enviar
          </MdSend>
        </div>
      </SendMessage>
    </Container>
  );
};
export default Chat;
