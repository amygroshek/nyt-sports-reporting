import { TagCloud } from 'react-tagcloud';

import type { Tag } from './types';
import { usePostStore } from '@/store/postStore';
import { Loader } from '@/components/Loader';
import styles from './WordCloud.module.scss';

export const WordCloud = () => {
  const cloudSet = usePostStore((state) => state.cloudSet);
  const setCloudSelection = usePostStore((state) => state.setCloudSelection);
  const cloudLoading = usePostStore((state) => state.cloudLoading);

  // Handled cloud word click
  const handleClick = (tag: Tag) => {
    setCloudSelection(tag.value);
  };

  // TODO: Custom tag renderer component to implement relative random font sizes
  return (
    <section className="max-w-4xl mx-auto mb-10">
      <div className="bg-vantext border-4 border-vanorange rounded-xl p-6 shadow-md">
        <div className={styles.cloudWrapper}>
          {cloudLoading ? (
            <Loader contextualClasses={styles.cloudLoader} />
          ) : (
            <TagCloud
              minSize={20}
              maxSize={42}
              tags={cloudSet}
              shuffle={true}
              onClick={handleClick}
              className={styles.cloud}
            />
          )}
        </div>
      </div>
    </section>
  );
};
