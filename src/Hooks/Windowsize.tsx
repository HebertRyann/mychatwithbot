import { useLayoutEffect, useState } from 'react';

interface WindowSizeProps {
  width: undefined | number;
  heigth: undefined | number;
}

const useWindowSize = (): WindowSizeProps => {
  const [windowSize, setWindowSize] = useState<WindowSizeProps>(
    {} as WindowSizeProps,
  );

  useLayoutEffect(() => {
    function setSize() {
      setWindowSize({
        width: window.innerWidth,
        heigth: window.innerHeight,
      });
    }

    window.addEventListener('resize', setSize);

    setSize();

    return () => {
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return windowSize;
};
export { useWindowSize };
