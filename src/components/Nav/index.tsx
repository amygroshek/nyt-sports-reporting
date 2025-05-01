import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { FaVanShuttle } from 'react-icons/fa6';
import { clsx } from 'clsx';

import styles from './Nav.module.scss';

export const Nav = () => {
  const [isStarting, setIsStarting] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setIsStarting(false);
    }, 1000);
  }, []);
  return (
    <nav className="bg-vanorange shadow-md py-4 lg:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          to="/"
          className="flex gap-2 text-vantext hover:opacity-80 transition-opacity pt-1"
        >
          <FaVanShuttle
            className={clsx(
              'text-2xl',
              isStarting ? styles.vanStart : styles.vanIdle
            )}
          />
          <span className="text-xl font-bold font-cabin-sketch">
            Van Life Word Cloud
          </span>
        </Link>
      </div>
    </nav>
  );
};
