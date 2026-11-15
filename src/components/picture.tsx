import Image from 'next/image';
import { imageSize } from '@/lib/image-size';

type PictureProps = {
  src: string;
  alt: string;
  // The widest it may show on the page, in CSS pixels. A smaller image shows
  // at its own size instead of being stretched and blurred.
  width?: number;
  // Leave out to keep the image's own proportions; set it to crop to a box.
  height?: number;
  // Tallest it may show, for tall phone photos; it narrows to fit.
  maxHeight?: number;
  className?: string;
  // Load right away instead of when scrolled near; for pictures at the top.
  // (Not Next's own `priority`: its preload hint fetched a second, 3840px copy.)
  priority?: boolean;
};

// A plain picture at a fixed size. Next resizes the source behind the scenes,
// so a 3000px phone photo still arrives as a small file.
export default function Picture({ src, alt, width = 410, height, maxHeight, className, priority }: PictureProps) {
  const size = imageSize(src) ?? { width, height: height ?? width };

  if (height) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={`${width}px`}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        style={{ width, height: 'auto', aspectRatio: `${width} / ${height}`, objectFit: 'cover' }}
      />
    );
  }

  let shown = Math.min(width, size.width);
  if (maxHeight && (shown * size.height) / size.width > maxHeight) {
    shown = Math.round((maxHeight * size.width) / size.height);
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size.width}
      height={size.height}
      sizes={`${shown}px`}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      style={{ width: shown, height: 'auto' }}
    />
  );
}
