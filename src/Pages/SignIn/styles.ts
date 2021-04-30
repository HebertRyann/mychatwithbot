import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 10px;
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 50%;
  width: 100%;
  input {
    height: 70px;
    width: 100%;
    background: transparent;
    border-bottom: 2px solid #6f2dbd;
    font-size: 18px;
    padding-left: 10px;
    ::placeholder {
      color: #fff;
    }
    color: #fff;
  }
  button {
    height: 60px;
    width: 180px;
    border-radius: 8px;
    margin-top: 50px;
    background: #6f2dbd;
    color: #fff;
    font-size: 18px;
  }
`;

export const WrraperInput = styled.div`
`;
