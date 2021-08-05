import React, { useCallback, useEffect, useState } from 'react';
import { Container } from './styles';

interface FadeProps {
  isShow: boolean;
}

const FadeLeftToRight: React.FC<FadeProps> = ({ isShow, children }) => {
  const [isRender, setIsRender] = useState(isShow);

  useEffect(() => {
    if (isShow) setIsRender(true);
  }, [isRender, isShow]);

  const onAnimationEnd = () => {
    if (!isShow) setIsRender(false);
  };

  return (
    <>
      {isRender && (
        <Container show={isShow} onAnimationEnd={onAnimationEnd}>
          {children}
        </Container>
      )}
    </>
  );
};

export default FadeLeftToRight;
