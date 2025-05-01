import type { ResponsiveImageListProps } from './types';
import { ResponsiveImage } from '@/components/ResponsiveImage';

// Map over the entries in the reddit media object
// return a responsive image for each one
export const ResponsiveImageList: React.FC<ResponsiveImageListProps> = ({
  mediaMetadata,
  className = '',
}) => {
  if (!mediaMetadata || Object.keys(mediaMetadata).length === 0) return null;

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${className}`}>
      {Object.entries(mediaMetadata).map(([id, image]) => (
        <ResponsiveImage key={id} image={image} alt={`Image ${id}`} />
      ))}
    </div>
  );
};
