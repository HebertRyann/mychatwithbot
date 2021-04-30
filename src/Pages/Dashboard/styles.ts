import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  width: 100%;
  height: 100px;
`;

export const ContainerFriends = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  button {
    display: flex;
    align-items: center;
    height: 70px;
    border-radius: 3px;
    padding: 0 10px;
    background: #fff;
    p {
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
      strong {
        text-align: left;
        margin-bottom: 5px;
      }
    }
    & + button {
      margin-top: 20px;
    }
  }
`;