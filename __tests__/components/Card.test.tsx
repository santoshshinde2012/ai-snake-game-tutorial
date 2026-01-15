import { render } from '@testing-library/react';
import { Card } from '@/components/UI/Card';

describe('Card', () => {
  it('should render children', () => {
    const { getByText } = render(
      <Card>
        <div>Card content</div>
      </Card>
    );
    expect(getByText('Card content')).toBeInTheDocument();
  });

  it('should apply default styles', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-gray-800');
    expect(card).toHaveClass('rounded-lg');
  });

  it('should apply custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-class');
    expect(card).toHaveClass('bg-gray-800');
  });
});
