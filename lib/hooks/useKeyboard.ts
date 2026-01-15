import { useEffect } from 'react';

export const useKeyboard = (onKeyPress: (key: string) => void): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      onKeyPress(event.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyPress]);
};
