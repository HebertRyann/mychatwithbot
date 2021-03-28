import styled, { css, keyframes } from 'styled-components';
import { animated } from 'react-spring';

interface MyMessageProps {
  isAnswer?: boolean;
}
interface OtherMessageProps {
  isAnswer?: boolean;
}
interface scrollProps {
  isScroll?: boolean;
}

interface VideoSearchProps {
  isShow?: boolean;
}

const mercuryTypingAnimation = keyframes`
  0% {
    transform: translateY(0px);
    /* background-color:#BF00FF; // rgba(20,105,69,.7); */
  }
  28% {
    transform: translateY(-7px);
    /* background-color:#BF00FF; //rgba(20,105,69,.4); */
  }
  44% {
    transform: translateY(0px);
    /* background-color: #BF00FF; //rgba(20,105,69,.2); */
  }
`;

const leftToRightVideo = keyframes`
  0% {
    transform: translateX(-400px);
  }
  100% {
    transform: translateX(5px);
  }
`;

const CloseVideo = keyframes`
  0% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(-400px);
  }
`;
const winnerStretch = keyframes`
  0% {

  }28% {
    max-width: 100%;
    min-width: 100%;
  }30% {
    max-width: 100%;
    min-width: 100%;
  }38% {
    max-width: 100%;
    min-width: 100%;
  }40% {
    max-width: 100%;
    min-width: 100%;
  }48% {
    
  }

`;


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  height: 85vh;
  overflow: auto;
`;

export const SendMessage = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  div.ContentSendButton {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2ECC71;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    svg {
      margin-left: 4px;
    }
  }
  input {
    display: flex;
    flex: 1;
    padding: 0 10px;
    font-size: 17px;
    width: 50px;
    height: 50px;
    border: 0;
    outline: 0;
  }
`;

export const MyMessageContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  flex-direction: row-reverse;
  & + div {
    margin-top: 10px;
  }
`;

export const ContentMyMessage = styled.div<MyMessageProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #b3ffb3;
  border-radius: 5px;
  min-height: 75px;
  min-width: 150px;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-all;
  padding: 0 10px;
  ${props => props.isAnswer && css`
      animation: ${winnerStretch} 5s ease-in-out;
    `}  
`;

export const OtherMessageContainer = styled.div`
  display: flex;
  border-radius: 5px;
  
  ${MyMessageContainer} + & {
    margin: 45px 0;
  }
  & + div {
    margin-top: 10px;
  }
  div.chat-bubble {
    padding:16px 28px;
    -webkit-border-radius: 20px;
    -webkit-border-bottom-left-radius: 2px;
    -moz-border-radius: 20px;
    -moz-border-radius-bottomleft: 2px;
    border-radius: 20px;
    border-bottom-left-radius: 2px;
    display:inline-block;
    background-color: #242424;
  }
  div.typing {
    span {
      text-align: left;
      width: 100%;
      margin-top: -15px;
      font-size: 12px;
      font-weight: bold;
      text-transform: capitalize;
    }
    display: flex;
    flex-direction: column;
    height: 17px;
  }
  div.typing div.dot {
    animation: ${mercuryTypingAnimation} 1.8s infinite ease-in-out;
    /* background-color: #6CAD96 ; //rgba(20,105,69,.7); */
    border-radius: 50%;
    height: 7px;
    margin-right: 4px;
    vertical-align: middle;
    width: 7px;
    display: inline-block;
  }
  div.typing div.dot:nth-child(1) {
    animation-delay: 200ms;
  }
  .typing .dot:nth-child(2) {
    animation-delay: 300ms;
  }
  .typing .dot:nth-child(3) {
    animation-delay: 400ms;
  }
  .typing .dot:last-child {
    margin-right: 0;
}
`;

export const ContentOtherMessage = styled.div<OtherMessageProps>`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: #cce6ff;
  padding: 10px;
  min-width: 150px;
  min-height: 75px;
  span {
    margin-bottom: 5px;
    font-size: 14px;
    text-transform: capitalize;
    word-break: break-all;
  }
  p {
    word-break: break-word;
  }
  ${props => props.isAnswer && css`
      animation: ${winnerStretch} 5s ease-in-out;
  `}
`;

export const SystemMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 55px;
  margin-top: 20px;
  margin-bottom: 20px;
  div.ContentSystemMessage {
    display: flex;
    align-items: center;
    background: #242424;
    border-radius: 5px;
    padding: 0 10px;
    color: #fff;
    span {
      display: flex;
      align-items: center;
      p {
        font-size: 18px;
      }
    }
  }
`;

export const ContentEmoji = styled.div`
  display: flex;
  flex-direction: column;
  background: #fb8500;
  border-radius: 5px;
  max-width: 50%;
  span {
    margin-left: 20px;
    font-size: 12px;
  }
`;

export const ContainerHp = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  width: 100%;
  justify-content: center;
  top: 0;
`;

export const ContentHp = styled.div<scrollProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.4);
  height: 60px;
  width: 250px;
  border-radius: 0 0 5px 5px;

`;

export const ContainerPassword = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  justify-content: center;
  bottom: 55px;
`;

export const ContentPassword = styled.div<scrollProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.4);
  height: 60px;
  width: 150px;
  border-radius: 5px 5px 0 0;
  span {
    color: rgba(255,255,255);
    text-transform: capitalize;
    font-size: 20px;
    & + span {
      margin-left: 5px;
    }
  }
  ${props => props.isScroll && css`
    background: rgba(0,0,0,.1);
    span {
      background: rgba(0,0,0,.1);
    }
  `}
`;

export const ContainerVideoSearch = styled(animated.div)`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 5px;
  padding: 10px;
  width: 400px;
  height: 250px;
  top: 35%;
  @media(max-width: 992px) {
    width: 336px;
    height: 230px; 
    top: 33%;
  }
`;

export const ContentVideoSearch = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  svg {
    position: absolute;
    right: -21.5px;
  }
  @media(max-width: 992px) {
    iframe {
      width: 300px;
      height: 200px;
    }
  }
`;

export const ContainerSoftVideoSearch = styled(animated.div)`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.6);
    border-radius: 50%;
    width: 46px;
    height: 46px;
    visibility: visible;
    top: 45%;
    left: 5px;
    svg {
      visibility: visible;
    }
    @media(max-width: 992px) {
      top: 47.5%
    }
`;

export const ContainerModal = styled.div`
  background: #fff;
  border-radius: 8px;
  height: 350px;
  width: 340px;
  position: absolute;
  top: 35%;
`;

export const ContainerModalQuest = styled.div`
  background: #fff;
  border-radius: 8px;
  height: 350px;
  width: 340px;
  position: absolute;
  top: 35%;
`;

export const OverlayModal = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  background: rgba(0,0,0,.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  p {
    font-size: 1.7rem;
  }
  .Containerbutton {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    button {
      height: 60px;
      width: 40%;
      border-radius: 5px;

      font-size: 18pt;
    }
  }
`;
export const ContentModalQuest = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 5px;
  div {
    display: flex;
    flex-direction: column;
    height: 70%;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px;
    h3 {
      display: flex;
      align-items: center;
    }
  }
`;

