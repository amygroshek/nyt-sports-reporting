import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Layout } from './index';

// Mock the Nav component
vi.mock('@/components/Nav', () => ({
  Nav: () => <nav data-testid="nav-component">Nav</nav>,
}));

const renderWithRouter = (component: React.ReactNode) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('Layout', () => {
  it('renders children correctly', () => {
    renderWithRouter(
      <Layout>
        <div data-testid="test-child">Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('does not show Nav by default', () => {
    renderWithRouter(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.queryByTestId('nav-component')).not.toBeInTheDocument();
  });

  it('shows Nav when showNav is true', () => {
    renderWithRouter(
      <Layout showNav>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('nav-component')).toBeInTheDocument();
  });

  it('applies different padding classes based on showNav prop', () => {
    const { rerender } = renderWithRouter(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Without Nav
    expect(screen.getByText('Test Content').parentElement).toHaveClass(
      'py-8',
      'px-4',
      'md:px-8',
      'lg:px-16'
    );

    // With Nav
    rerender(
      <Layout showNav>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByText('Test Content').parentElement).toHaveClass('py-0');
  });
});
