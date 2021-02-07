import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 300px;
  button {
    height: 50px;
    font-size: 16px;
  }
}
`;

export const WrraperInput = styled.div`
  input {
    font-size: 18px;
    height: 50px;
    width: 100%;
    & + input {
      margin-top: 30px;
    }
  }  
`;
