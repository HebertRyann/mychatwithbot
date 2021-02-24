import React, { HtmlHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import {
  FaHeart,
  MdSend,
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
} from './styles';
import Input from '../../Components/Input';
import { useUser } from '../../Hooks/Users';
import { useHistory } from 'react-router-dom';
import { useBot } from '../../Hooks/Bot';

interface MessageProps {
  botName?: string;
  name?: string;
  message: string;
  messageBot?: string[];
  messageWinners?: string[];
  color?: string;
  answer?: boolean;
}

interface UserTyping {
  name: string | undefined;
  isTyping: boolean;
}



const Chat: React.FC = () => {
  const messageInputRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<Event>(null);
  const [inputValue, setInputValue] = useState('');
  const [answerEmojis, setAnswerEmojis] = useState<string[][]>(() => {
    const storagedAnswerEmojis = localStorage.getItem('@AnswerEmojis');
    if(storagedAnswerEmojis) {
      return JSON.parse(storagedAnswerEmojis);
    }
    return [
      [
        'cara que pensa em você toda hora',
      ],
      [
        'eu dormir na praça pensado nela',
      ],
      [
        'sorria que estou te filmando',
      ],
      [
        'choram as rosas',
      ],
      [
        'chora',
        'me liga',
        'implora pelo meu amor',
      ],
      [
        'quer dançar',
        'que o tigrao vai te ensinar',
        'vou passar',
        'cerol na mão',
        'assim',
      ],
      [ 
        'por você',
        'eu bebo o mar',
        'canudinho',
      ],
      [
        'olha a onda',
      ],
      [
        'não tenho carro',
        'não tenho teto',
        'e se fica comigo'
      ],
    ];
  });
  const [passwrodHang, setPasswordHang] = useState(['']);
  const [key, setKey] = useState<string[]>([]);
  const [nextWordIsHang, setNextWordIsHang] = useState(false);
  const [activeGameForca, setActiveGameForca] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [otherUserIsTyping, setOtherUserIsTyping] = useState<UserTyping[]>([]); 
  const [messages, setMessages] = useState<MessageProps[]>(() => {
    const storagedMessages = localStorage.getItem('@Chat:Messages');
    if(storagedMessages) {
      return JSON.parse(storagedMessages);
    }
    return [];
  });
  const [systemMessages, setSystemMessages] = useState<MessageProps[]>([]);
  
  const { user, newSocket, usersData, answerCorrects } = useUser();
  const divinationsWithEmojisMovies = [
    [
      '🌙🚲👉👈👽',
      '🔎🐟',
      '🏠🎈🎈🎈👴🧑',
      '👽😎😎😎',
      '👴💍💍💍',
      '😱🔪😵',
      '🌎🐵🐒🙊🙉🙈',
      '👳‍♂️💰',
      '👩👨✈➡😱👦🏠',
      '👩👩👩👩👖✈',
    ],
  ]
  const divinationsWithEmojisSerie = [
    [
      '🎶🥶🔥⚔',
      '✈🏝',
      '☕🛋👩👱‍♀️👱‍♀️👨‍🦱👨‍🦱👨‍🦱',
      '🏦💵🤑🔫',
      '🗃👽❌',
      '🍆🍑🎓🎒📚',
      '🍊🆕⚫',
      '👻👿👨‍🦱💀👼',
      '🐴🚶‍♂️',
    ],
  ]
  const answerWithEmojisMusic = [
    'cara que pensa em você toda hora',
    'choram as rosas',
    'chora',
    'me liga',
    'implora pelo meu amor',
    'eu dormir na praça pensado nela',
    'quer dançar',
    'que o tigrao vai te ensinar',
    'sorria que estou te filmando',
    'por você',
    'eu bebo o mar',
    'canudinho',
    'olha a onda',
    'não tenho carro',
    'não tenho teto',
  ]
  const answerWithEmojisMusic1 = [
    [
      'cara que pensa em você toda hora',
    ],
    [
      'eu dormir na praça pensado nela',
    ],
    [
      'sorria que estou te filmando',
    ],
    [
      'choram as rosas',
    ],
    [
      'chora',
      'me liga',
      'implora pelo meu amor',
    ],
    [
      'quer dançar',
      'que o tigrao vai te ensinar',
      'vou passar',
      'cerol na mão',
      'assim',
    ],
    [ 
      'por você',
      'eu bebo o mar',
      'canudinho',
    ],
    [
      'olha a onda',
    ],
    [
      'não tenho carro',
      'não tenho teto',
      'e se fica comigo'
    ],
  ]
  const divinationsWithEmojisMusic = [
    [
      '👨🏻💭👉🏻🕛🕝🕣',
      '😭🌹🌹',
      '😭📞🙏🏻💋2️⃣❎',
      '☝🏻😴💭👩🏻',
      '💃🏻💃🏻🐅👉🏻📚',
      '😀👆🏻👉🏻🎥😀♥🎞',
      '👉🏻🍺🌊🍹',
      '🌊🌊🌊👀🌊',
      '👎🏻🚗👎🏻🏡'
    ],
  ]
  const botResources = [
    [
      'jogo',
      'jogar',
      'jogos',
      'forca',
      'perguntas e respostas',
      'adivinhação',
      'adivinhação com emojis',
      'musica',
      'filme',
      'serie',
    ],
    [
      'eu escolho',
      'eu preferio escolher',
      'eu gostaria de escolher',
      
    ],
    [
      'pode escolher',
      'você pode escolher para mim',
      'você escolhe',
    ],
    [
      'filme',
      'serie',
      'musica',
      'forca',
      'perguntas e respostas',
    ],
    [
     'jogar',
     'jogos',
     'jogo'
    ],
  ]
  const words = [
    'jacarés',
    'cavalo', 
    'leão', 
    'macaco', 
    'papagaio', 
    'abelha',
    'iguana',
    'baleia',
    'elefate',
    'raposa',
    'agulha',
    'alfiete',
    'almofada',
    'colher',
    'calça',
    'camisa',
    'Dentadura',
    'Esmalte',
    'Ferradura',
    'Furadeira',
    'Paraíba',
    'Paraná',
    'Pernambuco',
    'Piauí',
    'Rio Grande do Norte',
    'Rio Grande do Sul',
    'Rondônia',
    'Roraima',
    'Santa Catarina',
    'Sergipe',
    'Tocantins',
    'alumínio',
    'chumbo',
    'carbono',
    'fósforo',
    'oxigênio',
    'enxofre',
    'titânio',
    'ferro',
    'zinco',
    'mercúrio',
    'cobre',
    'prata',
    'ouro',
    'hélio',
    'criptônio',
    'xenônio',
    'Amônia',
    'Cianeto de Hidrogênio',
    'Dióxido de Carbono',
    'Dióxido de Enxofre',
    'Gás Cloro',
    'Monóxido de Carbono',
    'Sulfeto de hidrogênio',
  ]

  const handleSendMessage = useCallback((event) => {

    const messageValue = messageInputRef.current?.value;

    if(messageValue === 'fefogo') {
      setActiveGameForca(true);
      setPasswordHang('fogo'.split(''));
      setInputValue('');
    }

    // Captura a palavra e set o jogo como ativo.
    if(nextWordIsHang && messageValue) {
      newSocket?.emit('setPassword', messageValue.split(''))
      setNextWordIsHang(false);
      setActiveGameForca(true);
      setInputValue('');
      newSocket?.emit('userTyping', {
        name: 'BotMarivalda',
        isTyping: true,
      });
      setTimeout(() => {
        newSocket?.emit('userTyping', {
          name: 'BotMarivalda',
          isTyping: false,
        });
        newSocket?.emit('sendMessageBot', {
          botName: 'BotMarivalda',
          message: `Ok agora que eu ja sei a palavra vou explicar algumas coisas,
          cada jogador tem 3 vidas que estao com as suas respectivas cores,
          se todos os seus coraçoes chegarem ao fim voce esta fora do jogo,
          se estiver muito dificil voces podem pedir dicas a ${user?.name}.Divirtam-se !!!`
        });
      }, 2500);
      return;
    }

    if(messageValue && activeGameForca) {
      handleBot(messageValue)
    }
    
    const findAnswerArray = answerEmojis
    .find(answerArray => 
      answerArray.find(answer => answer === messageValue));
      
      const findAnswer = findAnswerArray?.find(item => item === messageValue);
      
      if(messageValue && findAnswer && findAnswerArray) {
        
        const findDuplicatedAnswer = messages.find(message => message.message === findAnswer);
        removeAnswerEmoji(findAnswerArray);
        if(!findDuplicatedAnswer?.message) {
        newSocket?.emit('sendMessage', {
          message: messageValue,
          answer: true,
        });
      } else {
        newSocket?.emit('sendMessage', {
          message: messageValue,
          answer: false,
        });
      }
    } else {
        newSocket?.emit('sendMessage', {
          message: messageValue,
        });      
      }

    if(messageValue === 'ola bot' || messageValue === 'olá bot') {
      newSocket?.emit('userTyping', {
        name: 'BotMarivalda',
        isTyping: true,
      });
      setTimeout(() => {
        newSocket?.emit('userTyping', {
          name: 'BotMarivalda',
          isTyping: false,
        });
        newSocket?.emit('sendMessageBot', {
          botName: 'BotMarivalda',
          message: `Olá ${user?.name} me chamo Marivalda, 
          posso colocar uma musica do seu agrado ou você pode escolher jogar 
          Qual o nome do filme, Qual o nome da musica ou Qual o nome da series com emojis, jogo da forca ou perguntas e respostas.`
        });
      }, 2500);
    }

    if(messageValue?.includes('forca')) {
      newSocket?.emit('userTyping', {
        name: 'BotMarivalda',
        isTyping: true,
      });
      setTimeout(() => {
        newSocket?.emit('userTyping', {
          name: 'BotMarivalda',
          isTyping: false,
        });
        newSocket?.emit('sendMessageBot', {
          botName: 'BotMarivalda',
          message: `Certo ${user?.name},
           mas eu preciso saber se você prefere 
           que eu escolha a palavra chave ou não ?`
        });
      }, 2500);
    }

    // Verifica se a message tem utilidade para o bot
    // se o usuario decidiu que ele vai escolher a palavra
    if(botResources[1].some(item => messageValue === item) && messageValue){
      newSocket?.emit('userTyping', {
        name: 'BotMarivalda',
        isTyping: true,
      });
      setTimeout(() => {
        newSocket?.emit('userTyping', {
          name: 'BotMarivalda',
          isTyping: false,
        });
        newSocket?.emit('sendMessageBot', {
          botName: 'BotMarivalda',
          message: `Ok ${user?.name}, 
          pode digitar a palavra da sua preferência.
          Sem problema ninguém vera ela.`
        });
        setNextWordIsHang(true);
      }, 2500);
    }
    // se o usuario decidiu que eu devo escolher 
    // fazer ela pesar a palavra com o typig 
    if(botResources[2].some(item => messageValue === item) && messageValue){
      const randomWord = words[Math.floor(Math.random() * 53)]
      newSocket?.emit('userTyping', {
        name: 'BotMarivalda',
        isTyping: true,
      });
      setTimeout(() => {
        newSocket?.emit('userTyping', {
          name: 'BotMarivalda',
          isTyping: false,
        });
        newSocket?.emit('sendMessageBot', {
          botName: 'BotMarivalda',
          message: `Ok ${user?.name} estou pensado em algo, so um momento.`
        });
      }, 2500);
      setTimeout(() => {
        newSocket?.emit('userTyping', {
          name: 'BotMarivalda',
          isTyping: true,
        });
      }, 3500)
      setTimeout(() => {
        newSocket?.emit('userTyping', {
          name: 'BotMarivalda',
          isTyping: false,
        });
        newSocket?.emit('sendMessageBot', {
          botName: 'BotMarivalda',
          message: 'Certo já pensei em algo',
        });
        setPasswordHang(randomWord.split(''))
      }, 4500);
      
    }
    setInputValue('')
    messageInputRef.current?.focus();
  }, [messages]);


  function checkOfletter() {
    const name = user?.name;
    const findUser = usersData.find(user => user.name === name);
      if(findUser && findUser.heart?.length !== 0) {
        const findKeyHeart = findUser.heart?.find(heart => heart.key.includes(`heart${findUser.name}`));
        if(findKeyHeart) {
          const hearts = findUser.heart?.filter(heart => heart.key !== findKeyHeart.key)
          newSocket?.emit('updatedUser', {
            name: user?.name,
            heart: hearts
          })
        }
      }
      newSocket?.emit('userTyping', {
        name: 'BotMarivalda',
        isTyping: true,
      });
      setTimeout(() => {
        newSocket?.emit('userTyping', {
          name: 'BotMarivalda',
          isTyping: false,
        });
        newSocket?.emit('sendMessageBot', {
          botName: 'BotMarivalda',
          message: `Infelismente não foi dessa vez ${user?.name}`
        });
      }, 1500);
  }

  const handleBot = useCallback((answer: string) => {

    if(answer.includes('filme')) {
      // const randomNUmber = Math.floor(Math.random() * 10)
      newSocket?.emit('userTyping', {
        name: 'BotMarivalda',
        isTyping: true,
      });
      setTimeout(() => {
        newSocket?.emit('userTyping', {
          name: 'BotMarivalda',
          isTyping: false,
        });
        newSocket?.emit('sendMessageBot', {
          botName: 'BotMarivalda',
          messageBot: divinationsWithEmojisMovies[0],
        });
        
      }, 2500);
    }

    if(answer.includes('serie')) {
      newSocket?.emit('userTyping', {
        name: 'BotMarivalda',
        isTyping: true,
      });
      setTimeout(() => {
        newSocket?.emit('userTyping', {
          name: 'BotMarivalda',
          isTyping: false,
        });
        newSocket?.emit('sendMessageBot', {
          botName: 'BotMarivalda',
          messageBot: divinationsWithEmojisSerie[0],
        });
        // setAnswerEmojis(answerWithEmojisSerie);
      }, 2500);
    }

    if(answer.includes('musica')) {
      newSocket?.emit('userTyping', {
        name: 'BotMarivalda',
        isTyping: true,
      });
      setTimeout(() => {
        newSocket?.emit('userTyping', {
          name: 'BotMarivalda',
          isTyping: false,
        });
        newSocket?.emit('sendMessageBot', {
          botName: 'BotMarivalda',
          messageBot: divinationsWithEmojisMusic[0],
        });
        newSocket?.emit('sendAnswerEmojisMusic', answerWithEmojisMusic1)
      }, 2500);
    }

    if(activeGameForca && passwrodHang.includes(answer)) {
      setKey([...key, answer])
      // VERIRFICAR O QUE ESTA CHEGADO AQUI POR ALGUM MOTIVO ELE ESTA ETRADO O IF
    } else {
      checkOfletter()
    }
  }, [key, activeGameForca, usersData, user]);

  useEffect(() => {
    newSocket?.on('SetPassword', (password: string[]) => {
      setPasswordHang(password)
    })
  }, [newSocket])


  const removeAnswerEmoji = useCallback((removedAnswerArray: string[]) => {
    const answerEmojisString = answerEmojis.map(item => JSON.stringify(item));
    const answerFiltered = answerEmojisString.filter(item => item !== JSON.stringify(removedAnswerArray));
    const answerEmojisParsed = answerFiltered.map(item => JSON.parse(item));
    newSocket?.emit('sendAnswerEmojisMusic', answerEmojisParsed);
  }, [answerEmojis]);


  useEffect(() => {
    newSocket?.on('answerEmojisMusic', (answerEmojisMusic: string[][]) => {
      setAnswerEmojis(answerEmojisMusic)
    })
  }, []);


  useEffect(() => {
    localStorage.setItem('@AnswerEmojis', JSON.stringify(answerEmojis));
    
  }, [answerEmojis]);

  useEffect(() => {
    newSocket?.once('receivedMessage', ({ botName, name, message, messageBot, answer, messageWinners }: MessageProps) => {
      
        setMessages([...messages, { botName, name, message, messageBot, answer, messageWinners }]);
      
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
      <ChatContainer  >
      {passwrodHang.length > 1 && (
          <ContainerHp>
            <ContentHp isScroll={isScroll}>
              {usersData.map((user) => (
                user.heart?.map((heart, index) => (
                  <FaHeart size={24} color={user.color}  key={heart.key} style={{
                    marginRight: `${user.heart?.length === index + 1 ? '5px' : ''}`
                  }} />
                ))
              ))}
            </ContentHp>
          </ContainerHp>
        )}

        {messages.map((message, index) =>
          {if(message.name === 'Admin') {
            return (
              <SystemMessageContainer key={index} ref={index + 1 === messages.length ? lastMessageRef : null}>
                <div className="ContentSystemMessage">
                  <span>{message.message}</span>
                </div>
              </SystemMessageContainer>
            )
          } else if (message.name === user?.name && !message.answer) {
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
          } else if(message.name === user?.name && message.answer){
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
          } else if(message.name !== user?.name && message.answer) {
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
          if(message.isTyping && message.name !== user?.name && message.name !== 'BotMarivalda') {
            return (
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
          } else if(message.isTyping && message.name === 'BotMarivalda') {
            return (
              <OtherMessageContainer key={index} ref={index + 1 === messages.length ? lastMessageRef : null}>
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
                <span key={index}>{key.includes(letter) ? letter : '_'}</span>
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
