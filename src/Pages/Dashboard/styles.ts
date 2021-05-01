import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;
  height: 100px;
  background: #28262e;
  margin-bottom: 20px;
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: orange; 
  }
`;

export const ContainerFriends = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  button {
    display: flex;
    align-items: center;
    height: 70px;
    border-radius: 3px;
    padding: 0 10px;
    background: transparent;

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
  bottom: 20px;
  right: 15px;
  background: #6F2DBD;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  margin: auto;
`;