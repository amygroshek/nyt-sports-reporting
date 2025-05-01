import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Nav } from './index';

// Mock the icon
vi.mock('react-icons/fa6', () => ({
  FaVanShuttle: () => <span data-testid="van-shuttle-icon" />,
}));

// Mock the CSS module
vi.mock('./Nav.module.scss', () => ({
  default: {
    vanStart: 'mocked-van-start',
    vanIdle: 'mocked-van-idle',
  },
}));

const renderWithRouter = (component: React.ReactNode) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('Nav', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without error', () => {
    renderWithRouter(<Nav />);
    expect(screen.getByText('Van Life Word Cloud')).toBeInTheDocument();
  });

  it('renders the van shuttle icon', () => {
    renderWithRouter(<Nav />);
    expect(screen.getByTestId('van-shuttle-icon')).toBeInTheDocument();
  });

  it('renders link to home page', () => {
    renderWithRouter(<Nav />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });
});
