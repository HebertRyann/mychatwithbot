import styled, { css, keyframes } from 'styled-components';
import { purple } from '../../styles/Colors';

interface IsShowProps {
  show: boolean;
}

const fadeIn = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(100%);
  }
`;
const fadeOut = keyframes`
  from {
    transform: scaleX(100%);
  }
  to {
    transform: scaleX(0);
  }
`;

export const Container = styled.div<IsShowProps>`
  position: absolute;
  left: 0;
  border-radius: 3px;
  will-change: transform;
  background: ${purple};
  height: 70px;
  width: 100vw;
  transform-origin: left;
  animation: ${fadeIn} 0.7s ease-in-out;
  ${props =>
    !props.show &&
    css`
      animation: ${fadeOut} 0.7s ease-in-out;
    `}
`;
