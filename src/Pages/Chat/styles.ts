import styled, { keyframes } from 'styled-components';

export const Container = styled.div``;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 94.9vh;
  padding: 10px 5px 10px 5px;
  overflow: auto;
`;

export const SendMessage = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 50px;
  padding: 0 5px 5px 5px;
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
    padding: 0 5px;
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
  direction: rtl;
  div.ContentMyMessage {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #b3ffb3;
    border-radius: 5px;
    min-height: 70px;
    min-width: 150px;
    max-width: 50%;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
    padding: 0 10px;
  }
  & + div {
    margin-top: 10px;
  }
`;

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

export const OtherMessageContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 50%;
  div.ContentOtherMessage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #e6f0fe;
    border-radius: 5px;
    min-height: 70px;
    min-width: 150px;
    max-width: 100%;
    overflow: hidden;
    word-wrap: break-word;
    padding: 0 10px 0 10px;
    span {
      text-align: left;
      width: 100%;
      margin-top: -25px;
      font-size: 12px;
      font-weight: bold;
      text-transform: capitalize;
      color: grey;
    }
  }
  ${MyMessageContainer} + & {
    margin: 30px 0;
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
  }
`;
