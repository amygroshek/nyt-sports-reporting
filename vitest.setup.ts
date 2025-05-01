import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock CSS modules
vi.mock('*.module.scss', () => ({
    default: {
      cloudWrapper: 'cloudWrapper',
      cloudLoader: 'cloudLoader',
      cloud: 'cloud',
    },
  }));