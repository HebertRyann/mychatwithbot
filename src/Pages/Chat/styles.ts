import styled from 'styled-components';
import { animated } from 'react-spring';



export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 10px;
  background: #28262e;
  color: #Fff;
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
`

export const ContainerChat = styled.div`
  display: flex;
  flex-direction: column;  
  flex: 1;
  padding: 10px 5px;
  overflow: auto;  
`

export const SendMessage = styled.div`
  display: flex;
  height: 50px;
  padding: 0 5px;
  align-items: center;
  input {
    height: 40px;
    flex: 1;
    border-radius: 5px;
    font-size: 16px;
    padding: 0 10px;
  }
  div.ContainerAudio {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    background: #9760DA;
    margin-left: 10px;
  }
`

export const ContainerMyMessage = styled.div`
  display: grid;
  justify-content: right;
  width: 100%;
  & + & {
    margin-top: 5px;
  }
  & + div {
    margin-top: 30px;
  }
`

export const ContentMyMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
  min-width: 150px;
  background: #9760DA;
  color: #fff;
  border-radius: 8px 8px 0 8px;
`

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

`

export const ContentOtherMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
  min-width: 150px;
  background: grey;
  color: #fff;
  border-radius: 8px 8px 8px 0px
`



