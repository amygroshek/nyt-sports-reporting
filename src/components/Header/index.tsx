import { useState, useEffect } from 'react';
import { PiVanDuotone } from 'react-icons/pi';
import { clsx } from 'clsx';
import styles from './Header.module.scss';

export const Header = () => {
  const [isStarting, setIsStarting] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setIsStarting(false);
    }, 2500);
  }, []);

  return (
    <header className="text-center mb-8 text">
      <h1
        className={clsx(
          'font-cabin-sketch-bold text-primary font-bold mb-6 mt-6',
          'text-6xl md:text-7xl xl:text-8xl',
          'flex flex-col xl:flex-row xl:justify-center xl:items-center gap-2'
        )}
      >
        <div className="flex flex-row justify-center">
          <span className="order-2 xl:order-1 xl:mr-2.5">Van Life</span>
          <PiVanDuotone
            className={clsx(
              isStarting ? styles.vanStart : styles.vanIdle,
              'text-primary',
              'order-1 xl:order-2 inline mr-3.5 xl:mr-0'
            )}
          />
        </div>
        <span className="xl:ml-2.5">Word Cloud</span>
      </h1>
      <p className="text-lg md:text-xl text-vantext">
        What's being discussed on r/VanLife? Select a word to explore related
        posts.
      </p>
    </header>
  );
};
