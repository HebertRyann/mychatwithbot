import React from 'react';
import {
  Container,
  Header,
  ContainerFriends,
  LineDivision,
  ContainerNewChat
} from './styles';
import {
  FaSearch,
} from 'react-icons/fa';
import {
  BiMessageAdd
} from 'react-icons/bi'

const Dashboard: React.FC = () => {
  function handleJoin() {
  };
  return (
    <Container>
      <Header>
        <p>
          H
        </p>
        Hebert
        <FaSearch size={20} color="#6F2DBD"/>
      </Header>
      <ContainerFriends>
        <button onClick={() => handleJoin()}>
          <p>A</p>
          <div className='ContentFriend'>
            <div className="TitleFriend">
              <strong>Hebert</strong>
              <span>10:30</span>
            </div>
            <div className="LastMessage">
              <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
          </div>
        </button>
        <LineDivision/>
        <button onClick={() => handleJoin()}>
          <p>A</p>
          <div className='ContentFriend'>
            <strong>Amigo1</strong>
            <span>Ultima menssage</span>
          </div>
        </button>
        <LineDivision/>
        <button onClick={() => handleJoin()}>
          <p>A</p>
          <div className='ContentFriend'>
            <strong>Amigo1</strong>
            <span>Ultima menssage</span>
          </div>
        </button>
      </ContainerFriends>
      <ContainerNewChat>
        <BiMessageAdd size={35} color='#fff'/>
      </ContainerNewChat>
      
    </Container>
  );
};

export { Dashboard };