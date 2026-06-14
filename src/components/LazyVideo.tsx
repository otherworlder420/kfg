import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface VideoSource {
  src: string;
  type: string;
}

interface LazyVideoProps {
  sources: VideoSource[];
  poster: string;
  className?: string;
  rootMargin?: string;
}

export default function LazyVideo({
  sources,
  poster,
  className = "",
  rootMargin = "200px",
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    // Load sources and play only when visible and not reduced motion
    if (video.querySelectorAll("source").length === 0) {
      sources.forEach((source) => {
        const el = document.createElement("source");
        el.src = source.src;
        el.type = source.type;
        video.appendChild(el);
      });
      video.load();
    }

    if (!reducedMotion) {
      video.play().catch(() => {
        // Autoplay may be blocked by browser policies; poster remains visible
      });
    }
  }, [shouldLoad, reducedMotion, sources]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      className={className}
      aria-label="Background video"
    />
  );
}
