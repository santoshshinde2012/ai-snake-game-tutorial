import { renderHook } from '@testing-library/react';
import { useKeyboard } from '@/lib/hooks/useKeyboard';

describe('useKeyboard', () => {
  it('should call onKeyPress when key is pressed', () => {
    const onKeyPress = jest.fn();
    
    renderHook(() => useKeyboard(onKeyPress));
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    window.dispatchEvent(event);
    
    expect(onKeyPress).toHaveBeenCalledWith('arrowup');
  });

  it('should convert key to lowercase', () => {
    const onKeyPress = jest.fn();
    
    renderHook(() => useKeyboard(onKeyPress));
    
    const event = new KeyboardEvent('keydown', { key: 'W' });
    window.dispatchEvent(event);
    
    expect(onKeyPress).toHaveBeenCalledWith('w');
  });

  it('should handle multiple key presses', () => {
    const onKeyPress = jest.fn();
    
    renderHook(() => useKeyboard(onKeyPress));
    
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 's' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'd' }));
    
    expect(onKeyPress).toHaveBeenCalledTimes(3);
    expect(onKeyPress).toHaveBeenNthCalledWith(1, 'a');
    expect(onKeyPress).toHaveBeenNthCalledWith(2, 's');
    expect(onKeyPress).toHaveBeenNthCalledWith(3, 'd');
  });

  it('should cleanup event listener on unmount', () => {
    const onKeyPress = jest.fn();
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    
    const { unmount } = renderHook(() => useKeyboard(onKeyPress));
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    
    removeEventListenerSpy.mockRestore();
  });

  it('should update callback when it changes', () => {
    const onKeyPress1 = jest.fn();
    const onKeyPress2 = jest.fn();
    
    const { rerender } = renderHook(
      ({ callback }) => useKeyboard(callback),
      { initialProps: { callback: onKeyPress1 } }
    );
    
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    expect(onKeyPress1).toHaveBeenCalledTimes(1);
    
    rerender({ callback: onKeyPress2 });
    
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
    expect(onKeyPress1).toHaveBeenCalledTimes(1);
    expect(onKeyPress2).toHaveBeenCalledTimes(1);
  });
});
