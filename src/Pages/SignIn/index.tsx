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
  const { addUser, newSocket, usersData } = useUser();
  const history = useHistory();

  const handleJoinToRoom = useCallback((event) => {
    if(inputNameRef.current?.value !== 'Admin'){
      newSocket?.emit('join', {
        id: v4(),
        name: inputNameRef.current?.value,
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
    }
    if(inputNameRef.current?.value === 'Admin') {
      newSocket?.emit('join', {
        id: v4(),
        name: 'Admin',
        isTyping: false,
        answerCorrect: 0,
        heart: [
          {
            key: `heartAdmin1` 
          },
          {
            key: `heartAdmin2` 
          },
          {
            key: `heartAdmin3` 
          }
        ]
      });
      addUser(inputNameRef.current?.value);
      history.push('/chat')
    }
  }, [newSocket]);

  useEffect(() => {
    inputNameRef.current?.focus();
  }, []);
  
   useEffect(() => {
    const findMyUser = usersData.find(user => user.name === inputNameRef.current?.value);
    if(findMyUser && inputNameRef.current?.value) {
      addUser(inputNameRef.current?.value);
      history.push('/chat')
    }
    console.log(inputNameRef.current?.value, findMyUser);
  }, [usersData]);

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
