import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, FormContainer } from './styles';
import { useUser } from '../../Hooks/User';

const SignIn: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { signIn } = useUser();
  const { push } = useHistory();

  async function handleConnection() {
    if (!inputValue) return;

    try {
      await signIn(inputValue.toLowerCase());
      setInputValue('');
      push('/dashboard');
    } catch (error) {
      console.log(error);
      alert('Usuario nao foi criado tente novamente');
    }
  }

  return (
    <Container>
      <FormContainer>
        <input
          type="text"
          placeholder="Seu Nome"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
          onKeyPress={event => event.key === 'Enter' && handleConnection()}
        />
        <button onClick={handleConnection} type="button">
          Entrar
        </button>
      </FormContainer>
    </Container>
  );
};

export default SignIn;
