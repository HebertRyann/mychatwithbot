import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  & + div {
    margin-top: 30px;
  }
  input {
    width: 100%;
    font-size: 18px;
    padding: 0 10px;
    outline: 0;
    border: 0;
  }
`;
