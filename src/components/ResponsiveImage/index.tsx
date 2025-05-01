import type { RedditImage } from '@/types'; // Adjust path as needed

interface ResponsiveImageProps {
  image: RedditImage;
  alt?: string;
  className?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  image,
  alt = '',
  className = '',
}) => {
  if (!image?.s?.u) return null;
  // Nasty, gnarly reddit image object...
  // Build a srcSet from preview sizes (p)
  const srcSet = image.p
    .map((preview) => `${preview.u.replace(/&amp;/g, '&')} ${preview.x}w`)
    .join(', ');

  const sizes = '(max-width: 768px) 100vw, 768px'; // Adjust for layout
  const src = image.s.u.replace(/&amp;/g, '&'); // Full-size fallback

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={`rounded-lg max-w-full h-auto ${className}`}
      loading="lazy"
    />
  );
};
