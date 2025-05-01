import { GiCarWheel } from 'react-icons/gi';

import { clsx } from 'clsx';
import styles from './Loader.module.scss';

export const Loader = ({
  contextualClasses,
}: {
  contextualClasses: string;
}) => {
  return (
    <div
      className={clsx(
        'loader',
        styles.vanContainer,
        styles.wheelBounce,
        contextualClasses
      )}
    >
      <GiCarWheel className={clsx(styles.wheelSpin)} />
    </div>
  );
};
