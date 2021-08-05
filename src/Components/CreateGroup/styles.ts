import styled from 'styled-components';
import { blackBG, purple } from '../../styles/Colors';

export const Container = styled.div`
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
    color: #fff;
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
