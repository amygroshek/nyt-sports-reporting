import { TagCloud } from 'react-tagcloud';

import type { Tag } from './types';
import { usePostStore } from '../../store/postStore';
import styles from './WordCloud.module.scss';

export const WordCloud = () => {
  const cloudSet = usePostStore((state) => state.cloudSet);
  const setCloudSelection = usePostStore((state) => state.setCloudSelection);

  // Handled cloud word click
  const handleClick = (tag: Tag) => {
    setCloudSelection(tag.value);
  };

  return (
    <TagCloud
      minSize={12}
      maxSize={35}
      tags={cloudSet}
      onClick={handleClick}
      className={styles.cloud}
    />
  );
};
