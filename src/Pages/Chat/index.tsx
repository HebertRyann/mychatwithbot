import React from 'react';
import {
  Container,
  Header,
  ContainerChat,
  SendMessage,
  ContainerMyMessage,
  ContentMyMessage,
  ContainerOtherMessage,
  ContentOtherMessage,
} from './styles'
import {
  AiFillAudio
} from 'react-icons/ai'

const Chat: React.FC = () => {
  return (
    <Container>
      <Header>
        <p>
          G
        </p>
        <div className='Group'>
          <strong>Familia</strong>
          <span>Hebert,Hebert,Hebert</span>
        </div>
      </Header>
      <ContainerChat>

        <ContainerMyMessage>
          <ContentMyMessage>
            <span>Hebert</span>
            <p>Ola a todos</p>
          </ContentMyMessage>
        </ContainerMyMessage>
        <ContainerMyMessage>
          <ContentMyMessage>
            <span>Hebert</span>
            <p>Ola a todos</p>
          </ContentMyMessage>
        </ContainerMyMessage>

        <ContainerOtherMessage>
          <ContentOtherMessage>
            <span>Ebert</span>
            <p>Ola a todos</p>
          </ContentOtherMessage>
        </ContainerOtherMessage>
        <ContainerOtherMessage>
          <ContentOtherMessage>
            <span>Ebert</span>
            <p>Ola a todos</p>
          </ContentOtherMessage>
        </ContainerOtherMessage>

        <ContainerMyMessage>
          <ContentMyMessage>
            <span>Hebert</span>
            <p>Ola a todos</p>
          </ContentMyMessage>
        </ContainerMyMessage>
        <ContainerMyMessage>
          <ContentMyMessage>
            <span>Hebert</span>
            <p>Ola a todos</p>
          </ContentMyMessage>
        </ContainerMyMessage>
        <ContainerMyMessage>
          <ContentMyMessage>
            <span>Hebert</span>
            <p>Ola a todos</p>
          </ContentMyMessage>
        </ContainerMyMessage>
        <ContainerMyMessage>
          <ContentMyMessage>
            <span>Hebert</span>
            <p>Ola a todos</p>
          </ContentMyMessage>
        </ContainerMyMessage>
        <ContainerMyMessage>
          <ContentMyMessage>
            <span>Hebert</span>
            <p>Ola a todos</p>
          </ContentMyMessage>
        </ContainerMyMessage>
        <ContainerMyMessage>
          <ContentMyMessage>
            <span>Hebert</span>
            <p>Ola a todos</p>
          </ContentMyMessage>
        </ContainerMyMessage>

        <ContainerOtherMessage>
          <ContentOtherMessage>
            <span>Ebert</span>
            <p>Ola a todos</p>
          </ContentOtherMessage>
        </ContainerOtherMessage>
        <ContainerOtherMessage>
          <ContentOtherMessage>
            <span>Ebert</span>
            <p>Ola a todos</p>
          </ContentOtherMessage>
        </ContainerOtherMessage>


      </ContainerChat>
      <SendMessage>
        <input type="text"/>
        <div className='ContainerAudio'>
          <AiFillAudio size={24} color='#fff'/>
        </div>
        
      </SendMessage>

    </Container>
  );
};

export default Chat;