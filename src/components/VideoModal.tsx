import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function VideoModal() {
  const { isVideoModalOpen, closeVideoModal } = useApp();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isVideoModalOpen) return;

    if (overlayRef.current && panelRef.current && !reducedMotion) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(panelRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out", delay: 0.1 });
    }
  }, [isVideoModalOpen, reducedMotion]);

  const handleClose = () => {
    closeVideoModal();
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVideoModalOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVideoModalOpen]);

  if (!isVideoModalOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[110] flex items-center justify-center page-padding"
      style={{ backgroundColor: "rgba(10, 10, 10, 0.9)", opacity: reducedMotion ? 1 : 0 }}
      onClick={handleClose}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl"
        style={{ opacity: reducedMotion ? 1 : 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-dark-900/80 text-white flex items-center justify-center hover:bg-dark-900 transition-colors"
          aria-label="Close video"
        >
          <X size={20} />
        </button>

        {/* YouTube iframe */}
        <iframe
          src="https://www.youtube.com/embed/JVY5P2LeBcg?autoplay=1&rel=0"
          title="Khmer Foods Group Video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
