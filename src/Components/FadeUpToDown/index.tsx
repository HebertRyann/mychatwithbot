import React, { useEffect, useState } from 'react';
import { Container } from './styles';

interface FadeAnimationProps {
  isShow: boolean;
  position?: string;
}

const FadeUpToDown: React.FC<FadeAnimationProps> = ({
  isShow,
  position,
  children,
}) => {
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
        <Container
          show={isShow}
          position={position}
          onAnimationEnd={onAnimationEnd}
        >
          {children}
        </Container>
      )}
    </>
  );
};

export default FadeUpToDown;