import { ReactNode } from 'react';
import { clsx } from 'clsx';

import { Nav } from '@/components/Nav';

export const Layout = ({
  showNav = false,
  children,
}: {
  showNav?: boolean;
  children: ReactNode;
}) => {
  return (
    <div
      className={clsx(
        'min-h-screen bg-secondary text-vantext font-open-sans ',
        showNav ? 'py-0' : 'py-8 px-4 md:px-8 lg:px-16'
      )}
    >
      {showNav && <Nav />}
      {children}
    </div>
  );
};
