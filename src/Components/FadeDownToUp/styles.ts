import styled, { css, keyframes } from 'styled-components';

interface IsShowProps {
  show: boolean;
  position?: string;
}

const fadeIn = keyframes`
  from {
    transform: translateY(120%);
  }
  to {
    transform: translateY(0);
  }
`;
const fadeOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(120%);
  }
`;

export const Container = styled.div<IsShowProps>`
  position: ${props => props.position};
  will-change: transform;
  animation: ${fadeIn} 1s ease-in-out;
  ${props =>
    !props.show &&
    css`
      animation: ${fadeOut} 1s ease-in-out;
    `}
  width: 100vw;
  height: 100vh;
`;
