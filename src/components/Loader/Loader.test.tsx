import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loader } from './index';

// Mock the wheel icon
vi.mock('react-icons/gi', () => ({
  GiCarWheel: () => <span data-testid="wheel-icon" />,
}));

// Mock the CSS module
vi.mock('./Loader.module.scss', () => ({
  default: {
    vanContainer: 'mocked-van-container',
    wheelBounce: 'mocked-wheel-bounce',
    wheelSpin: 'mocked-wheel-spin',
  },
}));

describe('Loader', () => {
  it('renders without error', () => {
    render(<Loader contextualClasses="test-class" />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders the wheel icon', () => {
    render(<Loader contextualClasses="test-class" />);
    expect(screen.getByTestId('wheel-icon')).toBeInTheDocument();
  });

  it('combines all classes correctly', () => {
    render(<Loader contextualClasses="test-contextual-class" />);
    const loader = screen.getByTestId('loader');

    expect(loader).toHaveClass(
      'loader',
      'mocked-van-container',
      'mocked-wheel-bounce',
      'test-contextual-class'
    );
  });
});
