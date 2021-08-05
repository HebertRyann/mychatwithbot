import styled, { css, keyframes } from 'styled-components';
import { buttonGreen, buttonRed, purple, purple3 } from '../../styles/Colors';

interface ContainerSendAudioProps {
  isRecorder: boolean;
}

const pulseRecorder = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(${purple3}, 1);
    
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(${purple3}, 0);
    
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(${purple3}, 0);
    
  }
`;

const waveDot = keyframes`
  0%, 44% {
    transform: translateY(0px);
  }
  28% {
    transform: translateY(-15px);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 10px;
  background: #28262e;
  color: #fff;
  div.Group {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    strong {
      font-size: 16px;
      font-weight: 500;
    }
    span {
      font-size: 12px;
      font-weight: 500;
    }
  }
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    background: orange;
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
`;

export const ContainerChat = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px 5px;
  overflow: auto;
`;

export const ContainerMyMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  & + & {
    margin-top: 5px;
  }
  & + div {
    margin-top: 30px;
  }
`;

export const ContentMyMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 68px;
  min-width: 128px;

  color: #fff;

  border-radius: 8px;

  p {
    text-transform: none;
    font-size: 16px;
  }
`;

export const ContainerOtherMessage = styled.div`
  display: grid;
  justify-content: left;
  width: 100%;
  & + & {
    margin-top: 5px;
  }
  & + div {
    margin-top: 30px;
  }
`;

export const ContentOtherMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 68px;
  min-width: 128px;
  background: #f4f4f4;
  color: #000;
  border-radius: 8px;
  span {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: left;
    font-size: 14px;
    color: #000;
    margin-top: -10px;
    margin-bottom: 8px;
    margin-left: 8px;
  }
  p {
    display: flex;
    justify-content: center;
    text-transform: none;
    font-size: 16px;
  }
`;

export const ContainerAudioPlayer = styled.audio`
  border-radius: 0;
  box-shadow: 0;
`;

export const ContainerHeart = styled.div`
  display: flex;
  justify-content: center;
`;
export const ContentHeart = styled.div`
  display: flex;
  position: fixed;
  min-width: 150px;
  height: 54px;
  margin-top: -8px;
  border-radius: 3px;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  padding: 10px 0 10px 10px;
`;

export const ContainerPassword = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContentPassword = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 60px;
  background: rgba(0, 0, 0, 0.5);
  min-width: 150px;
  height: 60px;
  padding: 5px;
  color: #fff;
  font-size: 18px;
  border-radius: 5px;
  text-transform: uppercase;
`;

export const ContainerButtonPrefix = styled.div``;

export const ContainerSendMessage = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 58px;
  padding-bottom: 8px;
  padding-left: 5px;
`;

export const SendMessage = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  margin-right: 10px;
  input {
    flex: 1;
    padding-left: 10px;
    font-size: 18px;
  }
`;

export const ContainerSendAudio = styled.div<ContainerSendAudioProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${purple};
  will-change: transform box-shadow;
  ${props =>
    props.isRecorder &&
    css`
      animation: ${pulseRecorder} 2s infinite;
    `}
`;

export const ContainerModalPrefix = styled.div`
  display: flex;
  position: absolute;
  bottom: 64px;
  border: 2px solid #ff0000;
  button {
    width: 100px;
    height: 64px;
    background: #0066ff;
  }
`;

export const ContainerReviewAudio = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 10px;
  div.ContainerSendAudio {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: ${purple};

    margin-left: 10px;
  }
`;

export const ContainerUserTyping = styled.div`
  height: 54px;
  width: 102px;

  border-radius: 40px 40px 40px 3px;

  background: #f4f4f4;
`;

export const ContainerDots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  div.Dot {
    animation: ${waveDot} 1.5s infinite ease-in-out;

    height: 8px;
    width: 8px;

    border-radius: 50%;

    background: #000;

    & + div {
      margin-left: 8px;
    }
  }
  div.Dot:nth-child(1) {
    animation-delay: 0.2s;
  }
  div.Dot:nth-child(2) {
    animation-delay: 0.3s;
  }
  div.Dot:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
