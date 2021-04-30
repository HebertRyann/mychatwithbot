import React, { 
  useCallback, 
  useEffect, 
  useRef, 
  useState 
} from 'react';
import { 
  Container, 
  FormContainer,  
} from './styles';
import { 
  useHistory,  
} from 'react-router-dom';
import { api } from '../../service/Api';


const SignIn: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { push } = useHistory();

  async function handleConnection() {
    if(!inputValue) return;
    
    try {
      await api.post('/user', {
        userName: inputValue,
      });
      setInputValue('');
      push('/dashboard');
    } catch (error) {
      console.log(error)
      alert('Usuario nao foi criado tente novamente')
    }

  };

  return (
    <Container>
      <FormContainer>
        <input 
        type="text" 
        placeholder='Seu Nome'
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        />
        <button onClick={handleConnection}>Entrar</button>
      </FormContainer>
    </Container>
  );
};

export default SignIn;