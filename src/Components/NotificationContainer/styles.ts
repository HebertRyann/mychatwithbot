import { animated } from '@react-spring/web';
import styled, { keyframes } from 'styled-components';

const upToDown = keyframes`
  from {
    transform: translateY(-120%);
  }

  to {
    transform: translateY(0);
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
  padding: 0 30px 0 10px;
  overflow: auto;
  transition: all 0.5;
  button {
    display: flex;
    align-items: center;
    height: 70px;
    border-radius: 3px;
    background: transparent;
    margin: 20px 0;
    color: #fff;

    > p {
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
  > div.ContentUser {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0px 20px 20px;
    strong {
      font-size: 22px;
      color: #fff;
    }
  }
`;
