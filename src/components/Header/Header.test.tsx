import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './index';

// Mock the icon
vi.mock('react-icons/pi', () => ({
  PiVanDuotone: () => <span data-testid="van-icon" />,
}));

describe('Header', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the title correctly', () => {
    render(<Header />);
    expect(screen.getByText('Van Life')).toBeInTheDocument();
    expect(screen.getByText('Word Cloud')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<Header />);
    expect(
      screen.getByText(
        "What's being discussed on r/VanLife? Select a word to explore related posts."
      )
    ).toBeInTheDocument();
  });

  it('renders the van icon', () => {
    render(<Header />);
    expect(screen.getByTestId('van-icon')).toBeInTheDocument();
  });
});
