import { useEffect, useRef } from 'react';

export const useGameLoop = (fps: number, callback: () => void, running: boolean): void => {
  const callbackRef = useRef(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!running) return;

    const interval = 1000 / fps;
    let lastTime = performance.now();
    let animationFrameId: number;

    const loop = (currentTime: number): void => {
      animationFrameId = requestAnimationFrame(loop);

      const deltaTime = currentTime - lastTime;

      if (deltaTime >= interval) {
        lastTime = currentTime - (deltaTime % interval);
        callbackRef.current();
      }
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [fps, running]);
};
