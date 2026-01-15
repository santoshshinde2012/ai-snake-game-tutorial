import { useRef, useEffect } from 'react';

export const useCanvas = (
  draw: (ctx: CanvasRenderingContext2D) => void,
  dependencies: React.DependencyList = []
): React.RefObject<HTMLCanvasElement> => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    draw(context);
  }, [draw, ...dependencies]);

  return canvasRef;
};
