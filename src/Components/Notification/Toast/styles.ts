import styled from 'styled-components';
import { animated } from 'react-spring';
import { purple } from '../../../styles/Colors';

export const Container = styled(animated.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 90px;
  padding: 10px;
  background: #433f52;
  border-radius: 5px;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  div.ContainerCheck {
    border-radius: 5px;
    border: 2px solid ${purple};
    padding: 5px;
  }
  div.ContainerTimes {
    border-radius: 5px;
    border: 2px solid ${purple};
    padding: 3px;
  }
  strong {
    font-size: 18px;
    font-weight: 500;
    color: #fff;
  }
  p {
    text-transform: none;
    font-size: 16px;
    font-weight: 500;
    color: #c2bfcb;
  }
  & + div {
    margin-top: 5px;
  }
`;
