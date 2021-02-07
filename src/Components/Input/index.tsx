import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  return (
    <Container>
      <input {...rest} placeholder={name} />
      {Icon && <Icon size={20} />}
    </Container>
  );
};

export default Input;
