import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";

interface LightboxImage {
  src: string;
  title: string;
}

interface CertificateLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function CertificateLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: CertificateLightboxProps) {
  const handlePrevious = useCallback(() => {
    onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, handlePrevious, handleNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/95 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Certificate gallery"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-cream-100 hover:text-gold-400 transition-colors"
        aria-label="Close gallery"
      >
        <X size={32} />
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-cream-100 hover:text-gold-400 transition-colors"
          aria-label="Previous certificate"
        >
          <ChevronLeft size={40} />
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-cream-100 hover:text-gold-400 transition-colors"
          aria-label="Next certificate"
        >
          <ChevronRight size={40} />
        </button>
      )}

      {/* Image container */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <OptimizedImage
          src={currentImage.src}
          alt={currentImage.title}
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
        />
        <p className="mt-4 text-cream-100 text-center font-medium">
          {currentImage.title}
        </p>
        {images.length > 1 && (
          <p className="mt-1 text-dark-300 text-sm">
            {currentIndex + 1} / {images.length}
          </p>
        )}
      </div>
    </div>
  );
}
