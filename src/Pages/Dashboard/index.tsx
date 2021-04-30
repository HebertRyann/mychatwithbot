import React from 'react';
import {
  Container,
  Header,
  ContainerFriends
} from './styles';

const Dashboard: React.FC = () => {
  function handleJoin() {

  };
  return (
    <Container>
      <Header>
        <h1
        style={{
          color: '#6f2dbd'
        }}
        >
          MyChat
        </h1>
      </Header>
      <ContainerFriends>
        <p>Conversas Recentes</p>
        <button onClick={() => handleJoin()}>
          <p>A</p>
          <div className='ContentFriend'>
            <strong>Amigo1</strong>
            <span>Ultima menssage</span>
          </div>
        </button>
        <button onClick={() => handleJoin()}>
          Amigo 1
        </button>
        <button onClick={() => handleJoin()}>
          Amigo 1
        </button>
        <button onClick={() => handleJoin()}>
          Amigo 1
        </button>
      </ContainerFriends>
    </Container>
  );
};

export { Dashboard };