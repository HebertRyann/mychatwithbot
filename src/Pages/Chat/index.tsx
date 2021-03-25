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
  const [inputValue, setInputValue] = useState('');
  const [videoId, setVideoid] = useState('');
  const [passwrodHang, setPasswordHang] = useState(['']);
  const [correctLetter, setCorrectLetter] = useState<string[]>([]);
  const [nextWordIsHang, setNextWordIsHang] = useState(false);
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
  const [activeGameForca, setActiveGameForca] = useState(false);
  const [activeGameAnswerAndQuest, setActiveGameAnswerAndQuest] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [isEndingGameForca, setIsEndingGameForca] = useState(false);
  const [isEndingGameEmojis, setIsEndingGameEmojis] = useState(false);
  const [isEndingGameQuest, setIsEndingGameQuest] = useState(false);
  const [isOpeModal, setIsOpeModal] = useState(false);
  const [isOpeModalActiveGameQuest, setIsOpeModalActiveGameQuest] = useState(false);
  const [otherUserIsTyping, setOtherUserIsTyping] = useState<UserTyping[]>([]); 
  const [messages, setMessages] = useState<MessageProps[]>(() => {
    const storagedMessages = localStorage.getItem('@Chat:Messages');
    if(storagedMessages) {
      return JSON.parse(storagedMessages);
    }
    return [];
  });
  const [systemMessages, setSystemMessages] = useState<MessageProps[]>([]);
  const [currentTheme, setCurrentTheme] = useState<ThemeProps>();
  const [currentQuestion, setCurrentQuestion] = useState<QuestProps>();
  const [currentThemeIndex, setCurrentThemeIndex] = useState<number[]>([]);
  const [usersWinners, setUsersWinners] = useState<User[]>([]);
  const [divinationEmoji, setDivinationEmoji] = useState<EmojiProps>();
  const [activeGameEmoji, setActiveGameEmoji] = useState(false);
  const { width, height } = useWindowSize();
  const toggleVideoShow = () => setVideoShow(!videoShow);
  
  const { user, newSocket, usersData, heartsForHangman } = useUser();

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
      'eu quero escolher',
      'quero escolher',
    ],
    [
      'pode escolher',
      'você pode escolher para mim',
      'você escolhe',
      'pode ser aleatorio',
      'aleatorio',
      'quero que seja aleatorio',
    ],
    [
      'quero jogar',
      'de novo',
      'outra vez',
    ],
    [
      'filme',
      'serie',
      'musica',
    ],
    [
     'jogar',
     'jogos',
     'jogo'
    ],
    [
      'toque a musica',
      'coloque a musica',
      'tocar',
      'colocar',
      'coloque',
      'toque',
      'ouvir',
      'quero ouvir',
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
  const themes = [
    {
      themeName: 'historia',
      quests: [
        {
          question: 'De onde é a invenção do chuveiro elétrico?',
          tips: [''],
          answer: 'certo',
        },
        {
          question: 'Qual o nome do presidente do Brasil que ficou conhecido como Jango?',
          tips: [''],
          answer: 'certo',
        },
        {
          question: 'Quais as duas datas que são comemoradas em novembro?',
          tips: [''],
          answer: 'certo',
        },
      ]
    },
    {
      themeName: 'biologia',
      quests: [
        {
          question: 'Normalmente, quantos litros de sangue uma pessoa tem? Em média, quantos são retirados numa doação de sangue?',
          tips: [''],
          answer: 'certo1',
        },
        {
          question: 'O cavalo-marinho é um mamífero?',
          tips: [''],
          answer: 'certo1',
        },
        {
          question: 'Qual a planta que armazena água em seus caules e consegue sobreviver em solos arenosos?',
          tips: [''],
          answer: 'certo1',
        },
      ]
    },
  ]

  const handleSendMessage = useCallback(async (event) => {
    
    const messageValue = messageInputRef.current?.value;
    if(!messageValue) return

    if(botResources[6].some(item => messageValue.includes(item)) && messageValue) {
      const messageValueSplited = messageValue.split(' ');
      const messageValueFilter = messageValueSplited.find(word => botResources[6].find(item => item !== word))
      const searchMusic = messageValueSplited.filter(word => word !== messageValueFilter).join(' ')
      console.log(messageValueFilter, searchMusic)
      await searchYoutube(searchMusic);
    }

    // Captura a palavra e set o jogo como ativo.
    if(nextWordIsHang && messageValue) {
      console.log('nextWordIsHang')
      newSocket?.emit('setPassword', messageValue.toLocaleLowerCase().split(''), true, user);
      setNextWordIsHang(false);
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
          se estiver muito dificil voces podem pedir dicas a ${user}.Divirtam-se !!!`
        });
      }, 2500);
      return;
    }

    if(activeGameForca && passwrodHang.length > 1) {
      console.log('ACtiveGAmeForca')
      newSocket?.emit('checkLetter', user, messageValue)
    }
    // Ele vai me mandar o numer de questoes e os temas
    if(activeGameAnswerAndQuest && themes.some(theme => messageValue.includes(theme.themeName))) {
      console.log('ACtiveGameQuest')
      newSocket?.emit('setCurrentTheme', messageValue);
    };

    if(activeGameEmoji && divinationEmoji){
      const findAnswerEmoji = divinationEmoji.answer.some(answer => messageValue.includes(answer));
      if(findAnswerEmoji){
        const findAllDuplicated = messages.filter(message => message.message === messageValue);
        const findDuplicatedAnswerEmoji = findAllDuplicated.some(item => item.answer === true);
        console.log(findAnswerEmoji, findDuplicatedAnswerEmoji);
        if(!findDuplicatedAnswerEmoji) {
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
      }
      setInputValue('')
      messageInputRef.current?.focus();
      return;
    };
      
    if(currentQuestion && activeGameAnswerAndQuest){
      console.log('findDuplicatedAnswer') 
      const findAnswerGameQuest = currentQuestion.answer.split(' ').some(item => messageValue.includes(item));
      console.log(findAnswerGameQuest, currentTheme);
      if(activeGameAnswerAndQuest && findAnswerGameQuest) {
        console.log('acertour')
        const findDuplicatedAnswer = messages.find(message => message.message === currentQuestion.answer);
        console.log(findDuplicatedAnswer)
        if(!findDuplicatedAnswer?.answer) {
          console.log('Enviou a msg como  true')
          newSocket?.emit('sendMessage', {
            message: messageValue,
            answer: true,
          });
        } else {
          console.log('Enviou a msg como  false')
          newSocket?.emit('sendMessage', {
            message: messageValue,
            answer: false,
          });
        }
        setInputValue('')
        messageInputRef.current?.focus();
        return
      }
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
          message: `Olá me chamo Marivalda, 
          posso colocar uma musica do seu agrado ou você pode escolher jogar 
          adivinhaçao com emojis, forca ou perguntas e respostas.`
        });
      }, 2500);
    }
    // VERIFICAR SE ALGUMA COISA SERVE PARA O OT E MADA UMA MESSAGE GERAL

    if(messageValue?.includes('forca')) {
      newSocket?.emit('setIsOpeModal', true);
      newSocket?.emit('setActiveGameForca', true);
    }   

    if(messageValue?.includes('perguntas e respostas')) {
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
          message: `Certo ${user}, você quer escolher o tema ou prefere que seja aleatorio ?`
        });
      }, 2500);
      newSocket?.emit('setActiveGameAnswerAndQuest', true);
    }

    if(messageValue.includes('adivinhaçao com emojis')) {
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
          message: `Ok ${user} você pode jogar qual o nome do filme, serie e musica.`
        });
      }, 2500);
      newSocket?.emit('setActivieGameEmoji', true);
    }

    // Respondeu sim para escoklhero tema no pergunta e respostas
    if(activeGameAnswerAndQuest && botResources[1].some(item => messageValue.includes(item) && messageValue)) {
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
          message: `Certo ${user}, me diga quantas perguntas você quer entre 6, 8, 10 ou 12 e
          quais temas você quer ?. exemplo: "quero 6 questões com os temas Historia, Biologia e Química"`
        });
      }, 2500);
    }

    if(activeGameAnswerAndQuest && botResources[2].some(item => messageValue.includes(item) && messageValue)) {
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
          message: `Certo ${user}, estou pensando em algo.`
        });
      }, 2500);
      newSocket?.emit('setGameQuestRandom')
    }

    if(isEndingGameQuest && botResources[3].some(item => messageValue === item)) {
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
          message: `Certo ${user}, você quer escolher um tema ou prefere que seja aleatorio ?`
        });
      }, 2500);
      newSocket?.emit('setActiveGameAnswerAndQuest', true);
    }
    
    if(isEndingGameQuest && !botResources[3].some(item => messageValue === item)) {
      newSocket?.emit('setIsEndingGameQuest');
    }

    if(activeGameForca && botResources[1].some(item => messageValue.includes(item)) && messageValue){
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
          message: `Ok ${user}, 
          pode digitar a palavra da sua preferência.
          Sem problema ninguém vera ela.`
        });
      }, 2500);
      setNextWordIsHang(true);
    }

    if(activeGameForca && botResources[2].some(item => messageValue === item) && messageValue){
      const randomWord = words[Math.floor(Math.random() * 53)].toLocaleLowerCase();
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
          message: `Ok ${user} estou pensado em algo, so um momento.`
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
        newSocket?.emit('setPassword', randomWord.split(''), true, user)
      }, 4500);
      console.log(passwrodHang, randomWord)     
    }

    if(isEndingGameForca && botResources[3].some(item => messageValue === item) && messageValue) {
      newSocket?.emit('setActiveGameForca', true);
      newSocket?.emit('setIsOpeModal', true);
    }

    if (isEndingGameForca && !botResources[3].some(item => messageValue === item) && messageValue) {
      newSocket?.emit('setEndingGame', false);
    }
    // se o usuario decidiu que eu devo escolher 
    // QUER JOGAR EMOJIS 
    if(activeGameEmoji && botResources[4].some(item => messageValue.includes(item))){
      newSocket?.emit('handleSetEmojis', messageValue.split(' '));
      console.log('escolheu p tema', messageValue)
    }
    // Quer jogar novamente os emojis;
    if(isEndingGameEmojis && botResources[3].some(item => messageValue === item)) {
      console.log('quero jogar', messageValue)
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
          message: `Ok ${user} você pode jogar qual o nome do filme, serie e musica.`
        });
      }, 2500);
      newSocket?.emit('setActivieGameEmoji', true);
    }

    if(isEndingGameEmojis && !botResources[3].some(item => messageValue === item)) {
      console.log('cabo a brincadeira', messageValue)
      newSocket?.emit('setIsEndingGameEmojis');
    }

    newSocket?.emit('sendMessage', {
      message: messageValue,
    });
    setInputValue('')
    messageInputRef.current?.focus();
  }, [
    messages, 
    activeGameForca, 
    nextWordIsHang, 
    activeGameAnswerAndQuest, 
    currentTheme, 
    currentQuestion, 
    divinationEmoji, 
    activeGameEmoji,
    isEndingGameEmojis,
    isEndingGameForca,
    isEndingGameQuest,
    passwrodHang,
  ]);

  async function searchYoutube(search: string) {
    const response = await api.get('/search', {
      params: {
        part: 'id',
        key: process.env.REACT_APP_YOUTUBE_KEY || 'AIzaSyAPm1nItKtdfuFFcnfePxxxM1p5UyUIbR4',
        q: search,
      },
    })
    if(!response.data.items.length) {
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
          message: `Desculpe ${user}, eu nao encontrei nenhum resultado para a sua busca`
        });
      }, 2500);
      return;
    }
    newSocket?.emit('setVideoId', response.data.items[0].id.videoId);
  }

  useEffect(() => {
    newSocket?.on('SetVideoId', (VideoId: string) => {
      setVideoid(VideoId)
    })
  }, [newSocket]);

  useEffect(() => {
    newSocket?.on('SetEndingGame', (isEndingGame: boolean) => {
      setIsEndingGameForca(isEndingGame);
    });
    console.log(isEndingGameForca)
  }, [newSocket, isEndingGameForca]);

  useEffect(() => {
    newSocket?.on('SetActiveGameAnswerAndQuest', (isActiveGameAnswerAndQuest: boolean) => {
      setActiveGameAnswerAndQuest(isActiveGameAnswerAndQuest);
    })
  }, [newSocket]);

  useEffect(() => {
    setMessages(messages.map(message => message.answer ? { ...message, answer: false } : message ));
  }, [isEndingGameEmojis, isEndingGameForca, isEndingGameQuest,]);

  useEffect(() => {
    newSocket?.on('SetPassword', (password: string[]) => {
      setPasswordHang(password);
    })
  }, [newSocket])

  useEffect(() => {
    newSocket?.on('CorrectLetter', (letters:  string[]) => {
      setCorrectLetter(letters)
    })
  }, [newSocket])

  useEffect(() => {
    newSocket?.on('SetActiveGameForca', (isActiveGameForca: boolean) => {
      setActiveGameForca(isActiveGameForca);
      console.log(activeGameForca)
    })
  }, [newSocket, activeGameForca]);

  useEffect(() => {
    newSocket?.once('receivedMessage', ({ botName, name, message, messageBot, answer, messageWinners, color, destination }: MessageProps) => {
      setMessages([...messages, { botName, name, message, messageBot, answer, messageWinners, destination, color }]);
    });
  }, [newSocket, messages]);

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
    newSocket?.on('userIsTyping', (userTyping: UserTyping[]) => {
      setOtherUserIsTyping(userTyping);
    });
  }, [newSocket]);

  useEffect(() => {
    messageInputRef.current?.focus();
  }, []);

  useEffect(() => {
    newSocket?.on('SetCurrentTheme', (selectedTheme: string) => {
      const currentTheme = themes.find(theme => theme.themeName === selectedTheme);
      if(currentTheme){
        setCurrentTheme(currentTheme);
      }
      if('undefined'){
        setCurrentTheme(undefined);
      }
    });
  }, [newSocket]);

  useEffect(() => {
    newSocket?.on('SetCurrentQuestion', (question: QuestProps) => {
      setCurrentQuestion(question);
    });
  }, [newSocket]);

  useEffect(() => {
    newSocket?.on('SetCurrentThemeIndex', (randomIndex: number) => {
      setCurrentThemeIndex([...currentThemeIndex, randomIndex])
    });
  }, [newSocket]);

  useEffect(() => {
    newSocket?.on('SetDivinationEmoji', (divination: EmojiProps) => {
      setDivinationEmoji(divination)
    });
    console.log(divinationEmoji);
  }, [newSocket, divinationEmoji]);

  useEffect(() => {
    newSocket?.on('SetActivieGameEmoji', (isActiveGameEmoji: boolean) => {
      setActiveGameEmoji(isActiveGameEmoji);
    });
  }, [newSocket]);


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
    newSocket?.on('SetIsOpeModal', (isOpeModal: boolean) => {
      setIsOpeModal(isOpeModal)
    })
  }, [newSocket]);
  
  useEffect(() => {
    newSocket?.once('SetOpenModalActiveGameQuest', (isOpeModal: boolean, usersWinners: User[]) => {
      console.log(isOpeModal, usersWinners);
      setIsOpeModalActiveGameQuest(isOpeModal);
      setUsersWinners(usersWinners);
    })
  }, [newSocket, isOpeModalActiveGameQuest, usersWinners]);

  useEffect(() => {
    newSocket?.once('SetIsEndingGameEmojis', (isEndingGameEmojis: boolean) => {
      console.log(isEndingGameEmojis);
      setIsEndingGameEmojis(isEndingGameEmojis);
    })
  }, [newSocket, isEndingGameEmojis]);

  useEffect(() => {
    newSocket?.once('SetIsEndingGameQuest', (isEndingGameQuest: boolean) => {
      console.log(isEndingGameQuest);
      setIsEndingGameQuest(isEndingGameQuest);
    })
  }, [newSocket, isEndingGameQuest]);

  return (
    <Container>
    
      <ChatContainer  >
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

        {isOpeModal && (
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

        {isOpeModalActiveGameQuest && (
          <OverlayModal onClick={() => setIsOpeModalActiveGameQuest(false)}>
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
