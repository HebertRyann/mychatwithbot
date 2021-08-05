import styled, { keyframes } from 'styled-components';
import { animated } from 'react-spring';
import { purple, blackBG } from '../../styles/Colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  background: #28262e;
  padding: 0 20px;
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: orange;
  }
  div.Perfil {
    display: flex;
    align-items: center;
    p {
      margin-right: 10px;
    }
    span {
      font-size: 16px;
      font-weight: 500;
      color: ${purple};
    }
  }
`;

export const ContainerFriends = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 10px;
  overflow: auto;
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
    div.ContentFriend {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      flex: 1;
      div.TitleFriend {
        display: flex;
        justify-content: space-between;
        strong {
          text-align: left;
          margin-bottom: 5px;
          font-size: 16px;
          width: 100%;
        }
      }
      > div.LastMessage {
        p {
          text-align: left;
          font-size: 14px;
          max-height: 40px;
          overflow: hidden;
        }
      }
    }
  }
`;

export const LineDivision = styled.div`
  height: 2px;
  background: #333;
  margin: 20px 10px;
`;

export const ContainerNewChat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 10px;
  right: 15px;
  background: ${purple};
  border-radius: 50%;
  width: 56px;
  height: 56px;
  margin: auto;
`;

export const ModalNotifications = styled.div`
  display: flex;
  background: #312e38;
  border-radius: 8px;
  height: 100%;
  width: 100%;
  position: absolute;
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

export const ContainerModalCreateGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100vh;
  width: 100vw;
  background: ${blackBG};
  input {
    background: transparent;
    border: 0;
    border-radius: 0;
    border-bottom: 2px solid ${purple};
    margin: 40px 0;
    height: 60px;
    width: 90vw;
    font-size: 18px;
    padding-left: 15px;
    color: #fff;
  }
  button {
    background: ${purple};
    border-radius: 5px;
    height: 60px;
    width: 170px;
    margin: 0px auto;
    font-size: 18px;
  }
  div.ContainerUsers {
    height: 50vh;
    overflow: auto;
  }
  div.ContainerListSelectUsers {
    display: flex;
    align-items: center;
    height: 70px;
    border-radius: 3px;
    background: transparent;
    margin: 20px 0;
    color: #fff;
    width: 85vw;

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
    &.ContainerAddFriendSelected {
      background: ${purple};
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
  div.ContentHeader {
    display: flex;
    align-self: center;
    justify-content: space-between;
    width: 90%;
    padding-left: 25px;
    h1 {
      font-size: 24px;
      color: #fff;
    }
  }
`;
