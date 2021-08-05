import styled, { css, keyframes } from 'styled-components';

interface IsShowProps {
  show: boolean;
  position?: string;
}

const fadeIn = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;
const fadeOut = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
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
`;
