import React, { useCallback, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { Container, FormContainer, WrraperInput } from './styles';
import Input from '../../Components/Input';
import { useHistory, Link } from 'react-router-dom';
import { useUser } from '../../Hooks/Users';
import { v4 } from 'uuid';

interface UsersProps {
  id: string;
  name: string;
  room: number;
}

const SignIn: React.FC = () => {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputRoomRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const colors = ['#FF0000', '#fff95b', '#00ff87', '#BF00FF', '#0061ff', '#ff1b6b'];
  const { addUser, newSocket, user, usersData } = useUser();
  const history = useHistory();

  const handleJoinToRoom = useCallback((event) => {
    const randomColor = colors[Math.floor(Math.random() * 6)];
    const findUserColor = usersData.find(user => user.color === randomColor)
    if(!findUserColor){
      newSocket?.emit('join', {
        id: v4(),
        name: inputNameRef.current?.value,
        color: randomColor,
        isTyping: false,
        answerCorrect: 0,
        heart: [
          {
            key: `heart${inputNameRef.current?.value}1` 
          },
          {
            key: `heart${inputNameRef.current?.value}2` 
          },
          {
            key: `heart${inputNameRef.current?.value}3` 
          }
        ]
      });
      addUser({
        name: inputNameRef.current?.value,
      })
      setInputValue('');
      history.push('/chat')
    }
  }, [newSocket]);

  useEffect(() => {
    inputNameRef.current?.focus();
  }, []);

  return (
    <Container>
      <FormContainer>
        <WrraperInput>
          <input 
          placeholder="Nome" 
          value={inputValue} 
          ref={inputNameRef}
          onChange={event => setInputValue(event.target.value)}
          onKeyPress={event => event.key === 'Enter' ? handleJoinToRoom(event) : null}
          />
        </WrraperInput>
        <button type="button" onClick={handleJoinToRoom} >Entrar</button>
      </FormContainer>
    </Container>
  );
};

export default SignIn;
