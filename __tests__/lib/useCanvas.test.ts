import { renderHook } from '@testing-library/react';
import { useCanvas } from '@/lib/hooks/useCanvas';

describe('useCanvas', () => {
  it('should return a canvas ref', () => {
    const draw = jest.fn();
    const { result } = renderHook(() => useCanvas(draw));
    
    expect(result.current).toHaveProperty('current');
    expect(result.current.current).toBeNull();
  });

  it('should have stable ref object across rerenders', () => {
    const draw = jest.fn();
    const { result, rerender } = renderHook(() => useCanvas(draw));
    
    const firstRef = result.current;
    rerender();
    const secondRef = result.current;
    
    expect(firstRef).toBe(secondRef);
  });
});
