import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WordCloud } from './index';
import type { CloudSetItem } from '@/store/postStore/types';
import { usePostStore } from '@/store/postStore';

// Mock the store
vi.mock('@/store/postStore', () => ({
  usePostStore: vi.fn((selector) => {
    const store = {
      cloudSet: [],
      setCloudSelection: vi.fn(),
      cloudLoading: false,
      cloudError: '',
      setCloudSet: vi.fn(),
      setCloudError: vi.fn(),
      setCloudLoading: vi.fn(),
      cloudSelection: '',
      posts: [],
    };
    return selector(store);
  }),
}));

// Mock the TagCloud component
vi.mock('react-tagcloud', () => ({
  TagCloud: vi.fn(({ tags, onClick }) => (
    <div data-testid="tag-cloud">
      {tags.map((tag: CloudSetItem) => (
        <span
          key={tag.value}
          data-testid={`cloud-tag-${tag.value}`}
          onClick={() => onClick(tag)}
        >
          {tag.value}
        </span>
      ))}
    </div>
  )),
}));

describe('WordCloud', () => {
  const mockCloudSet: CloudSetItem[] = [
    { value: 'test', count: 10 },
    { value: 'example', count: 5 },
  ];

  const mockSetCloudSelection = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loader when loading', () => {
    vi.mocked(usePostStore).mockImplementation((selector) =>
      selector({
        cloudSet: [],
        setCloudSelection: mockSetCloudSelection,
        cloudLoading: true,
        cloudError: '',
        setCloudSet: vi.fn(),
        setCloudError: vi.fn(),
        setCloudLoading: vi.fn(),
        cloudSelection: '',
        posts: [],
        setPosts: vi.fn(),
        getPostById: vi.fn(),
      })
    );

    render(<WordCloud />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders TagCloud when not loading', () => {
    vi.mocked(usePostStore).mockImplementation((selector) =>
      selector({
        cloudSet: mockCloudSet,
        setCloudSelection: mockSetCloudSelection,
        cloudLoading: false,
        cloudError: '',
        setCloudSet: vi.fn(),
        setCloudError: vi.fn(),
        setCloudLoading: vi.fn(),
        cloudSelection: '',
        posts: [],
        setPosts: vi.fn(),
        getPostById: vi.fn(),
      })
    );

    render(<WordCloud />);
    expect(screen.getByTestId('tag-cloud')).toBeInTheDocument();
  });

  it('displays cloud tags with correct data', () => {
    vi.mocked(usePostStore).mockImplementation((selector) =>
      selector({
        cloudSet: mockCloudSet,
        setCloudSelection: mockSetCloudSelection,
        cloudLoading: false,
        cloudError: '',
        setCloudSet: vi.fn(),
        setCloudError: vi.fn(),
        setCloudLoading: vi.fn(),
        cloudSelection: '',
        posts: [],
        setPosts: vi.fn(),
        getPostById: vi.fn(),
      })
    );

    render(<WordCloud />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('example')).toBeInTheDocument();
  });

  it('calls setCloudSelection when tag is clicked', () => {
    vi.mocked(usePostStore).mockImplementation((selector) =>
      selector({
        cloudSet: mockCloudSet,
        setCloudSelection: mockSetCloudSelection,
        cloudLoading: false,
        cloudError: '',
        setCloudSet: vi.fn(),
        setCloudError: vi.fn(),
        setCloudLoading: vi.fn(),
        cloudSelection: '',
        posts: [],
        setPosts: vi.fn(),
        getPostById: vi.fn(),
      })
    );

    render(<WordCloud />);
    fireEvent.click(screen.getByTestId('cloud-tag-test'));
    expect(mockSetCloudSelection).toHaveBeenCalledWith('test');
  });

  // TODO: Should render an error component when empty
  //   it('renders empty TagCloud when cloudSet is empty', () => {
  //     vi.mocked(usePostStore).mockImplementation((selector) =>
  //       selector({
  //         cloudSet: [],
  //         setCloudSelection: mockSetCloudSelection,
  //         cloudLoading: false,
  //       })
  //     );

  //     render(<WordCloud />);
  //     const tagCloud = screen.getByTestId('tag-cloud');
  //     expect(tagCloud).toBeInTheDocument();
  //     expect(tagCloud.children.length).toBe(0);
  //   });
});
