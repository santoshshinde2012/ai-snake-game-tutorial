import { render, fireEvent } from '@testing-library/react';
import { Button } from '@/components/UI/Button';

describe('Button', () => {
  it('should render children', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Click</Button>);
    
    fireEvent.click(getByText('Click'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should apply primary variant styles', () => {
    const { getByText } = render(<Button variant="primary">Primary</Button>);
    const button = getByText('Primary');
    expect(button).toHaveClass('bg-emerald-500');
  });

  it('should apply secondary variant styles', () => {
    const { getByText } = render(<Button variant="secondary">Secondary</Button>);
    const button = getByText('Secondary');
    expect(button).toHaveClass('bg-gray-600');
  });

  it('should be disabled when disabled prop is true', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button onClick={onClick} disabled>
        Disabled
      </Button>
    );
    const button = getByText('Disabled') as HTMLButtonElement;
    
    expect(button.disabled).toBe(true);
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should apply custom className', () => {
    const { getByText } = render(<Button className="custom-class">Custom</Button>);
    const button = getByText('Custom');
    expect(button).toHaveClass('custom-class');
  });
});
