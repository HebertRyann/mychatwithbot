import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;

  height: 100vh;
  width: 100vw;
`;

export const ContainerOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
`;

export const Modal = styled.div`
  display: flex;
  width: 85%;
  height: 80%;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  h1.Title {
    margin-top: 44px;
  }
`;
export const ContainerWinners = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 20px;
  width: 100%;
  height: 70%;
  padding: 0 15px;
  div.ContainerAling {
    display: flex;
    justify-content: center;
    width: 50px;
  }
  h1 {
    display: flex;
    justify-content: space-between;
  }
  h2 {
    margin: 20px 0;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
  }
  h3 {
    font-weight: 400;
    display: flex;
    justify-content: space-between;
  }
`;
