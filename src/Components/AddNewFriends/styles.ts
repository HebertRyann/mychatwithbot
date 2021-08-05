import styled, { css, keyframes } from 'styled-components';
import { purple } from '../../styles/Colors';

const textFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const Container = styled.div`
  display: flex;
  background: #312e38;
  border-radius: 8px;
  height: 100vh;
  width: 100vw;
  position: relative;
  flex-direction: column;
  overflow: auto;
  transition: all 1s;
  button {
    display: flex;
    align-items: center;
    height: 70px;
    background: transparent;
    margin: 20px 0;
    color: #fff;
    padding: 0 10px;
    div.ContentButton {
      display: flex;
      align-items: center;
      flex: 1;
      background: transparent;
      position: relative;
      p {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: turquoise;
      }
      div.ContentUser {
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        flex: 1;
        padding: 0 10px;
        div.TitleUser {
          display: flex;
          align-items: center;
          strong {
            text-align: left;
            margin-bottom: 5px;
            font-size: 16px;
            width: 100%;
          }
        }
      }
    }
  }
`;
export const ContentHeaderUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  strong {
    font-size: 22px;
    color: #fff;
  }
  .ContentTitleEnter {
    animation: ${textFade} 1s ease-in-out;
  }
`;

export const ContainerCreateGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 20px;
  height: 50px;
  width: 50px;
  background: ${purple};
  bottom: 20px;
  border-radius: 50%;
`;
