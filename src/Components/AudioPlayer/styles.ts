import styled from 'styled-components';
import { purple, purple2, purple3 } from '../../styles/Colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 280px;
  height: 64px;
  background: rgba(${purple3});
  border-radius: 8px;

  input[type='range'] {
    height: 5px;
    -webkit-appearance: none;
    transition: background 0.2s ease;
    cursor: pointer;
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #fff;
  }
`;
