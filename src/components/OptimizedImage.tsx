import type { ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export default function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img src={src} alt={alt} {...props} />
    </picture>
  );
}
