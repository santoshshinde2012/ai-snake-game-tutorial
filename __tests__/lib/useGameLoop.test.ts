import { renderHook, act } from '@testing-library/react';
import { useGameLoop } from '@/lib/hooks/useGameLoop';

describe('useGameLoop', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should call callback when running is true', () => {
    const callback = jest.fn();
    
    renderHook(() => useGameLoop(60, callback, true));
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(callback).toHaveBeenCalled();
  });

  it('should not call callback when running is false', () => {
    const callback = jest.fn();
    
    renderHook(() => useGameLoop(60, callback, false));
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(callback).not.toHaveBeenCalled();
  });

  it('should stop calling callback when running changes to false', () => {
    const callback = jest.fn();
    
    const { rerender } = renderHook(
      ({ running }) => useGameLoop(60, callback, running),
      { initialProps: { running: true } }
    );
    
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    const callCount = callback.mock.calls.length;
    
    rerender({ running: false });
    
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(callback).toHaveBeenCalledTimes(callCount);
  });

  it('should update callback reference without restarting loop', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    
    const { rerender } = renderHook(
      ({ cb }) => useGameLoop(60, cb, true),
      { initialProps: { cb: callback1 } }
    );
    
    rerender({ cb: callback2 });
    
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
  });
});
