/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';
import { AiFillAudio } from 'react-icons/ai';
import {
  FaHeart,
  FaLock,
  FaLockOpen,
  FaMicrophone,
  FaUnlock,
} from 'react-icons/fa';
import { FiLock, FiMic, FiUnlock } from 'react-icons/fi';
import { MdSend } from 'react-icons/md';
import { useHistory } from 'react-router';
import { v4 } from 'uuid';
import Confetti from 'react-confetti';
import FadeDownToUp from '../../Components/FadeDownToUp';
import { useRecorder } from '../../Hooks/Recorder';
import { useSocket } from '../../Hooks/Socket';
import { useUser } from '../../Hooks/User';
import { buttonGreen, buttonRed, purple } from '../../styles/Colors';
import { AudioPlayer } from '../../Components/AudioPlayer';
import { ModalConfetti } from '../../Components/ModalConfetti';
import {
  Container,
  Header,
  ContainerChat,
  SendMessage,
  ContainerMyMessage,
  ContentMyMessage,
  ContainerOtherMessage,
  ContentOtherMessage,
  ContainerSendAudio,
  ContainerAudioPlayer,
  ContainerHeart,
  ContentHeart,
  ContainerPassword,
  ContentPassword,
  ContainerButtonPrefix,
  ContainerSendMessage,
  ContainerModalPrefix,
  ContainerReviewAudio,
  ContainerUserTyping,
  ContainerDots,
} from './styles';
import { useWindowSize } from '../../Hooks/Windowsize';

const Chat: React.FC = () => {
  const {
    allMembers,
    allMessages,
    room,
    chatData,
    usersTyping,
    hangman,
    passwordHangman,
    usersHeart,
    correctLetters,
    currentSong,
    correctMessages,
  } = useSocket();
  const { userData, socket } = useUser();
  const [messageValue, setMessageValue] = useState('');
  const {
    handleStartRecord,
    handleStopRecord,
    audio,
    setAudio,
  } = useRecorder();
  const [isRecord, setIsRecord] = useState(false);
  const [prefix, setPrefix] = useState(false);
  const [toggleModalPrefix, setToggleModalPrefix] = useState(false);
  const [isLose, setIsLose] = useState(false);
  const [modalConfetti, setModalConfetti] = useState(false);
  const { heigth, width } = useWindowSize();

  function handleSendMessage() {
    if (!messageValue) return;
    socket.emit('ClientSendMessage', {
      id: v4(),
      userName: userData.user,
      content: messageValue,
      from: room.length ? room : chatData.privateRoom,
      time: new Date(),
      prefix,
      isLose,
    });
    setMessageValue('');
  }

  function handleSendAudio() {
    socket.emit('ClientSendMessage', {
      userName: userData.user,
      content: audio,
      isAudio: true,
      from: room.length ? room : chatData.privateRoom,
      time: new Date(),
    });

    setAudio('');
  }

  const startRecord = () => {
    handleStartRecord();
    setIsRecord(true);
  };

  const stopRecord = () => {
    handleStopRecord();
    setIsRecord(false);
  };
  const togglePrefix = () => {
    setPrefix(!prefix);
  };
  const handleToggleModalConfetti = () => {
    setModalConfetti(!modalConfetti);
  };

  useEffect(() => {
    if (usersHeart.length > 1) {
      const userHeart = usersHeart.find(
        user => user.username === userData.user,
      );
      if (userHeart) {
        setIsLose(userHeart.heart.length === 0);
      }
    }
  }, [userData.user, usersHeart]);

  useEffect(() => {
    if (messageValue.length) {
      socket.emit('ClientSetIsTyping', { user: userData.user, isTyping: true });
    } else {
      socket.emit('ClientSetIsTyping', {
        user: userData.user,
        isTyping: false,
      });
    }
  }, [messageValue.length, socket, userData.user]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    socket.on('ServeToggleModalConfetti', () => {
      setModalConfetti(!modalConfetti);
    });

    if (modalConfetti) {
      timer = setTimeout(() => {
        setModalConfetti(false);
      }, 20000);
    }

    return () => {
      socket.emit('ClientToggleModalConfetti', modalConfetti);
      clearTimeout(timer);
    };
  }, [modalConfetti, socket]);

  return (
    <Container>
      {currentSong.title && <h1>{currentSong.title}</h1>}
      {modalConfetti && (
        <>
          <Confetti width={width} height={heigth} />
          <ModalConfetti toggle={handleToggleModalConfetti} />
        </>
      )}
      <Header>
        <p>F</p>
        <div className="Group">
          {chatData.friendName ? (
            <strong>
              {chatData.friendName === userData.user
                ? chatData.userName
                : chatData.friendName}
            </strong>
          ) : (
            <>
              <strong>{room}</strong>
              <span>{allMembers.map(user => `${user.userName}`)}</span>
            </>
          )}
        </div>
      </Header>
      <ContainerChat>
        {usersHeart.length > 1 && (
          <ContainerHeart>
            <ContentHeart>
              {usersHeart.map(user =>
                user.heart.map((heart, index) => (
                  <FaHeart
                    key={v4()}
                    size={24}
                    style={{
                      marginRight: `${
                        index + 1 === user.heart.length ? '10px' : '0px'
                      }`,
                    }}
                  />
                )),
              )}
            </ContentHeart>
          </ContainerHeart>
        )}

        {allMessages.map(
          message =>
            message.from === (room.length ? room : chatData.privateRoom) &&
            (message.userName === userData.user ? (
              <ContainerMyMessage
                key={message.id}
                className={
                  correctMessages.includes(message.id) ? 'IsCorrect' : undefined
                }
              >
                <ContentMyMessage
                  style={{
                    background: `${message.isAudio ? 'tranparent' : purple}`,
                    padding: `${message.isAudio ? 'none' : '4px 16px'}`,
                  }}
                >
                  {message.isAudio ? (
                    <AudioPlayer audioSource={message.content} />
                  ) : (
                    <p>{message.content}</p>
                  )}
                </ContentMyMessage>
              </ContainerMyMessage>
            ) : (
              <ContainerOtherMessage key={v4()}>
                <ContentOtherMessage>
                  {message.isAudio ? (
                    <AudioPlayer audioSource={message.content} />
                  ) : (
                    // <audio src={message.content} controls preload="metadata" />
                    <>
                      <span>{message.userName}</span>
                      <p>{message.content}</p>
                    </>
                  )}
                </ContentOtherMessage>
              </ContainerOtherMessage>
            )),
        )}
        {usersTyping.length &&
          usersTyping.map(
            user =>
              user.user !== userData.user &&
              user.isTyping && (
                <ContainerUserTyping key={v4()}>
                  {/* <span>Marivalda</span> */}
                  <ContainerDots>
                    <div className="Dot" />
                    <div className="Dot" />
                    <div className="Dot" />
                  </ContainerDots>
                </ContainerUserTyping>
              ),
          )}

        {passwordHangman.length > 1 && (
          <ContainerPassword>
            <ContentPassword>
              {passwordHangman.map(letter => (
                <div key={Math.random() * 9}>
                  {correctLetters.includes(letter) ? letter : '_'}
                </div>
              ))}
            </ContentPassword>
          </ContainerPassword>
        )}
      </ContainerChat>

      <ContainerSendMessage>
        {audio.length > 1 ? (
          <FadeDownToUp isShow={audio.length > 1}>
            <ContainerReviewAudio>
              <AudioPlayer audioSource={audio.length > 1 ? audio : ''} />
              <div className="ContainerSendAudio">
                <MdSend size={24} color="#fff" onClick={handleSendAudio} />
              </div>
            </ContainerReviewAudio>
          </FadeDownToUp>
        ) : (
          <>
            <SendMessage>
              <ContainerButtonPrefix>
                {prefix ? (
                  <FaLock
                    size={22}
                    color={buttonGreen}
                    onClick={togglePrefix}
                  />
                ) : (
                  <FaUnlock
                    size={22}
                    color={buttonRed}
                    onClick={togglePrefix}
                  />
                )}
              </ContainerButtonPrefix>

              <input
                type="text"
                value={messageValue}
                onChange={event => setMessageValue(event.target.value)}
                onKeyPress={event =>
                  event.key === 'Enter' && handleSendMessage()
                }
              />
            </SendMessage>
            <ContainerSendAudio isRecorder={isRecord}>
              <FaMicrophone
                size={24}
                color="#fff"
                onClick={isRecord ? stopRecord : startRecord}
              />
            </ContainerSendAudio>
          </>
        )}
      </ContainerSendMessage>
    </Container>
  );
};

export default Chat;
