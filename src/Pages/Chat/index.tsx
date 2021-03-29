import React, { HtmlHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import {
  FaHeart,
  MdSend,
  BiMusic,
  FiArrowLeftCircle,
  RiArrowDropLeftFill,
  RiArrowDropLeftLine,
  IoMdArrowDropleft,
  IoMdArrowDropleftCircle,
  FiHeart,
  FaTrophy,
  FaSlack,
} from 'react-icons/all';
import {
  Container,
  ChatContainer,
  SendMessage,
  MyMessageContainer,
  OtherMessageContainer,
  SystemMessageContainer,
  ContentEmoji,
  ContentOtherMessage,
  ContentMyMessage,
  ContainerHp,
  ContentHp,
  ContainerPassword,
  ContentPassword,
  ContainerVideoSearch,
  ContentVideoSearch,
  ContainerSoftVideoSearch,
  ContainerModal,
  ContentModal,
  OverlayModal,
  ContainerModalQuest,
  ContentModalQuest,
} from './styles';
import Input from '../../Components/Input';
import { useUser } from '../../Hooks/Users';
import { useHistory } from 'react-router-dom';
import { useBot } from '../../Hooks/Bot';
import api from '../../service/youtubeApi';
import { useSpring } from 'react-spring';
import Conffeti from 'react-confetti';
import { useWindowSize } from 'react-use';
import InfiniteScroll from 'react-infinite-scroll-component';

interface MessageProps {
  botName?: string;
  name?: string;
  message: string;
  messageBot?: string[];
  messageWinners?: string[];
  color?: string;
  answer?: boolean;
  destination?: string;
}

interface UserTyping {
  name: string;
  isTyping: boolean;
}

interface itemsVideosProps {
  id: {
    videoId: string;
  };
}

interface YoutubeSearchProps {
  items: itemsVideosProps[];
}

interface UserPlay {
  name: string;
  isPlay: boolean;
  color: string;
}

interface ThemeProps {
  quests: {
    question: string;
    tips: string[];
    answer: string;
  }[]
}
interface QuestProps {
  question: string;
  tips: string[];
  answer: string;
}

interface User {
  id: string;
  name: string;
  color: string;
  answerCorrect: number;
  isTyping: boolean;
}

interface HeartProps {
  key: string;
}

interface HeartHangmanProps {
  name: string;
  heart: HeartProps[];
  isPLay: boolean;
  color: string;
}
interface EmojiProps {
  question: string[];
  answer: string[];
}



const Chat: React.FC = () => {
  const messageInputRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLInputElement>(null);
  const lastMessageIsTypingRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [videoId, setVideoid] = useState('');
  const [passwrodHang, setPasswordHang] = useState(['']);
  const [correctLetter, setCorrectLetter] = useState<string[]>([]);
  const [videoShow, setVideoShow] = useState(false);
  const propsAnimation = useSpring({
    left: videoShow ? 5 : -450,
    from: {
      left: videoShow ? -450 : 5,
    }
  });
  const videoSoftPropsStyle = useSpring({
    opacity: videoShow ? 0 : 1,
    from: {
      opacity: videoShow ?  1 : 0,
    }
  });
  const [isScroll, setIsScroll] = useState(false);
  const [isOpeModal, setIsOpeModal] = useState(false);
  const [isOpeModalActiveGameQuest, setIsOpeModalActiveGameQuest] = useState(false);
  const [otherUserIsTyping, setOtherUserIsTyping] = useState<UserTyping[]>([]); 
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [usersWinners, setUsersWinners] = useState<User[]>([]);
  const [scrollAutoOff, setScrollAutoOff] = useState(false);
  const { width, height } = useWindowSize();
  const toggleVideoShow = () => setVideoShow(!videoShow);
  
  const { user, newSocket, usersData, heartsForHangman } = useUser();


  const handleSendMessage = useCallback(async (event) => {
    
    const messageValue = messageInputRef.current?.value;
    if(!messageValue) return

    newSocket?.emit('bot', messageValue);

    setInputValue('')
    messageInputRef.current?.focus();
  }, []);

  useEffect(() => {
    newSocket?.on('SetVideoId', (VideoId: string) => {
      setVideoid(VideoId)
    })
  }, [newSocket]);


  useEffect(() => {
    newSocket?.once('SetPassword', (password: string[]) => {
      setPasswordHang(password);
    })
  }, [newSocket, passwrodHang]);

  useEffect(() => {
    newSocket?.once('CorrectLetter', (letters:  string[]) => {
      setCorrectLetter(letters)
    })
  }, [newSocket, correctLetter])


  useEffect(() => {
    newSocket?.once('receivedMessage', ({ botName, name, message, messageBot, answer, messageWinners, color, destination }: MessageProps) => {
      setMessages([...messages, { botName, name, message, messageBot, answer, messageWinners, destination, color }]);
    });
  }, [newSocket, messages]);


  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if(event.key === 'F5') {
        event.preventDefault();
      }
    })
  }, []);

  useEffect(() => {
    if(inputValue) {

      newSocket?.emit('userTyping', { 
        name: user, 
        isTyping: true,
      })
    } else {
      newSocket?.emit('userTyping', { 
        name: user, 
        isTyping: false,
      })
    }
  }, [inputValue]);

  useEffect(() => {
    newSocket?.once('userIsTyping', (userTyping: UserTyping[]) => {
      setOtherUserIsTyping(userTyping);
    });
    if(!scrollAutoOff){
      lastMessageIsTypingRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [newSocket, otherUserIsTyping]);

  useEffect(() => {
    messageInputRef.current?.focus();
  }, []);


  const getUsersColor = useCallback((name) => {
    const findUser = usersData.find(user => user.name === name)
    if(findUser) {
      return findUser.color;
    }
  }, [usersData]);

  function handleAcceptHagma() {
    const findUser = usersData.find(userData => userData.name === user)
    if(findUser) 
    newSocket?.emit('setUserPlay', { name: findUser.name, heart: findUser.heart, isPLay: true, color: findUser.color });
    setIsOpeModal(false)
  };
  function handleDeclieHagma(name: string) {
    newSocket?.emit('setUserPlay', { name, isPLay: false });
    setIsOpeModal(false)
  };

  useEffect(() => {
    newSocket?.once('SetIsOpeModalHangman', (isOpeModal: boolean) => {
      setIsOpeModal(isOpeModal)
    })
  }, [newSocket, isOpeModal]);
  
  useEffect(() => {
    newSocket?.once('SetOpenModalActiveGameQuest', (isOpeModal: boolean, usersWinners: User[]) => {
      setIsOpeModalActiveGameQuest(isOpeModal);
      setUsersWinners(usersWinners);
    })
  }, [newSocket, isOpeModalActiveGameQuest]);

  useEffect(() => {
    console.log(scrollAutoOff);
    if(!scrollAutoOff) {
      lastMessageRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end',
      });
    }
  },[messages, scrollAutoOff]);

  function closeModal() {
    setIsOpeModalActiveGameQuest(false);
    newSocket?.emit('setCloseModal', user);
  };
    
  useEffect(() => {
    newSocket?.once('UpdatedAllMessages', (updatedMessages: MessageProps[]) => {
      setMessages(updatedMessages);
    })
  }, [newSocket, messages]);

  useEffect(() => {
    newSocket?.once('SetScrollAutoOff', (scrollOff: boolean) => {
      setScrollAutoOff(scrollOff);
    })
  }, [newSocket, scrollAutoOff]);

  return (
    <Container>
    
      <ChatContainer>
        
      {passwrodHang.length> 1 && (
          <ContainerHp>
            <ContentHp isScroll={isScroll}>
              {heartsForHangman.map(user => user.heart.map((heart, index) => (
                <FaHeart 
                size={24} 
                color={`${user.color}`} 
                key={heart.key} 
                style={{ marginRight: `${index === user.heart.length - 1 ? '10px' : '0'}`}}/>
              )))}
            </ContentHp>
          </ContainerHp>
        )}

        {videoId && (
          <ContainerSoftVideoSearch 
          onClick={toggleVideoShow}
          style={videoSoftPropsStyle}
          >
            <BiMusic size={28} color="#F2003C"/>
          </ContainerSoftVideoSearch>
        )}
        {videoId && (
          <ContainerVideoSearch
          onClick={toggleVideoShow}
          style={propsAnimation}
          >
            <ContentVideoSearch>
              <iframe 
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=2`} 
              width="350"
              height="200"
              />
              <IoMdArrowDropleftCircle size={50} color="#F2003C"/>
            </ContentVideoSearch>
          </ContainerVideoSearch>
        )}

        {isOpeModal && user !== 'Admin' && (
          <OverlayModal>
            <ContainerModal>
              <ContentModal>
                <p>Você vai jogar</p>
                <div className="Containerbutton">
                  <button
                  onClick={handleAcceptHagma} 
                  style={{
                    background: '#0AF098',
                  }}
                  >
                    Sim
                  </button>
                  <button
                  onClick={() => handleDeclieHagma(user)}
                  style={{
                    background: '#E4051B',
                  }}
                  >
                    Não
                  </button>
                </div>
              </ContentModal>
            </ContainerModal>
          </OverlayModal>
        )}

        {isOpeModalActiveGameQuest && user !== 'Admin' && (
          <OverlayModal onClick={() => closeModal()}>
            <Conffeti
              height={height}
              width={width}
            />
            <ContainerModalQuest>
              <ContentModalQuest>
                <h1>Parabéns a Todos</h1>
                <div>
                  {usersWinners && usersWinners.map((user, index) => {
                    {
                      if(index === 0) {
                        return (
                        <h3 key={index}>
                          {user.name.toUpperCase()} Acertou {user.answerCorrect} respostas
                          <FaTrophy 
                          size={24} 
                          color="#ffd60a"
                          style={{
                            marginLeft: '10px',
                          }}
                          />
                        </h3>
                        )
                      } else if(index === 1) {
                        return <h4 key={index}>{user.name.toUpperCase()} Acertou {user.answerCorrect} respostas</h4>
                      } else if(index === 2){
                        return <h5 key={index}>{user.name.toUpperCase()} Acertou {user.answerCorrect} respostas</h5>
                      }
                    }
                  })}
                </div>
              </ContentModalQuest>
            </ContainerModalQuest>
          </OverlayModal>
        )}
        
        {messages.map((message, index) =>
          {if(message.name === 'Admin') {
            return (
              <SystemMessageContainer key={index} ref={index + 1 === messages.length ? lastMessageRef : null}>
                <div className="ContentSystemMessage">
                  <span>
                    {message.destination ? (
                      <p style={{ color: `${message.color}`}}>{message.destination?.toUpperCase()} {message.message}</p>
                    ) : (
                      message.message
                    )}
                  </span>
                </div>
              </SystemMessageContainer>
            )
          } else if (message.name === user && !message.answer) {
            return (
              <MyMessageContainer 
              key={index} 
              ref={index + 1 === messages.length ? 
              lastMessageRef : null}
              >
                <ContentMyMessage 
                className="ContentMyMessage"
                >
                  <p>{message.message}</p>
                </ContentMyMessage>
              </MyMessageContainer>
            )
          } else if(message.name === user && message.answer){
            return (
              <MyMessageContainer 
              key={index} 
              ref={index + 1 === messages.length ? 
              lastMessageRef : null}
              >
                <ContentMyMessage
                className="ContentMyMessage"
                style={{
                  backgroundColor: `${getUsersColor(message.name)}`,
                }}
                isAnswer={message.answer}
                >
                  <p style={{ color: '#fff' }}>{message.message}</p>
                </ContentMyMessage>
              </MyMessageContainer>
            );
          } else if(message.botName && !message.messageBot && !message.messageWinners){
            return (
              <OtherMessageContainer key={index} ref={index + 1 === messages.length ? lastMessageRef : null}>
                <ContentOtherMessage>
                    <span style={{
                      color: `#fb8500`
                    }}>{`${message.botName}`}</span>
                    <p>{message.message}</p>
                </ContentOtherMessage>
              </OtherMessageContainer>
            )
          } else if(message.messageBot || message.messageWinners){
            return (
              <OtherMessageContainer key={index} ref={index + 1 === messages.length ? lastMessageRef : null}>
                <ContentOtherMessage>
                    <span style={{
                      color: `#fb8500`
                    }}>{`${message.botName}`}</span>
                    {message.messageBot && message.messageBot.map((item, index) => (
                      <p style={{
                        fontSize: '25px',
                      }} key={index}>{item}</p>
                      ))}
                    {message.messageWinners && message.messageWinners.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                </ContentOtherMessage>
              </OtherMessageContainer>
            )
          } else if(message.name !== user && message.answer) {
            return (
              <OtherMessageContainer 
              key={index} 
              ref={index + 1 === messages.length ? 
              lastMessageRef : null}
              >
                <ContentOtherMessage
                  style={{
                    backgroundColor: `${getUsersColor(message.name)}`
                  }}
                  isAnswer={message.answer}
                >
                    <span style={{
                      color: `#fff`
                    }}>{`${message.name}`}</span>
                    <p style={{ color: '#fff' }}>{message.message}</p>
                </ContentOtherMessage>
              </OtherMessageContainer>
            );
          } else {
            return (
              <OtherMessageContainer 
              key={index} 
              ref={index + 1 === messages.length ? 
              lastMessageRef : null}
              >
                <ContentOtherMessage
                  
                >
                    <span style={{
                      color: `${getUsersColor(message.name)}`
                    }}>{`${message.name}`}</span>
                    <p>{message.message}</p>
                </ContentOtherMessage>
              </OtherMessageContainer>
            )
          }
        }
        )}
        {otherUserIsTyping.map((message, index) => {
          if(message.isTyping && message.name !== user && message.name !== 'BotMarivalda' && message.name !== 'Admin') {
            return (
              <OtherMessageContainer key={index} ref={lastMessageIsTypingRef}>
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
          } else if(message.isTyping && message.name === 'BotMarivalda') {
            return (
              <OtherMessageContainer key={index} ref={lastMessageIsTypingRef}>
              <div 
                className="chat-bubble" 
              >
                <div className="typing" >
                <span
                  style={{ 
                    color: `#fb8500`
                  }}
                >{message.name}</span>
                <div className="ContainerDot">
                  <div className="dot" style={{
                    backgroundColor: `#fb8500`
                  }}></div>
                  <div className="dot" style={{
                    backgroundColor: `#fb8500`
                  }}></div>
                  <div className="dot" style={{
                    backgroundColor: `#fb8500`
                  }}></div>
                </div>
                </div>
              </div>
          </OtherMessageContainer>
            )
          }
        })}

        {passwrodHang.length > 1 && (
          <ContainerPassword>
            <ContentPassword isScroll={isScroll} >
              {passwrodHang.map((letter, index) => (
                <span key={index}>{correctLetter.includes(letter) ? letter : '_'}</span>
              ))}
            </ContentPassword>
          </ContainerPassword>
        )}

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
