import styled, { css, keyframes } from 'styled-components';

interface IsShowProps {
  show: boolean;
}

const fadeIn = keyframes`
  from {
    transform: translateY(-120%);
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
    transform: translateY(-120%);
  }
`;

export const Container = styled.div<IsShowProps>`
  position: absolute;
  will-change: transform;
  animation: ${fadeIn} 1s ease-in-out;
  ${props =>
    !props.show &&
    css`
      animation: ${fadeOut} 1s ease-in-out;
    `}
`;
