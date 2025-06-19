import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

type ImageProps = {
  src?: string;
  alt?: string;
  className?: string;
  showLoader?: boolean;
  fallbackText?: string;
  loadingComponent?: React.ReactNode;
  fallbackComponent?: React.ReactNode;
  onClick?: () => void;
  enablePreview?: boolean;
  showCloseButton?: boolean;
};

/**
 * <Image />
 *
 * A flexible, reusable image component with support for loading states, error fallback,
 * performance optimization, and an optional modal preview with animations.
 *
 * ---
 * ✅ Features:
 * - Lazy-loaded image with async decoding
 * - Loading spinner (uses `LoadingSpinner` by default)
 * - Graceful fallback UI when image fails to load or src is missing
 * - Optional modal preview with scale + fade animation (via framer-motion)
 * - Blurred backdrop (glassmorphism style) for the modal
 * - Optional close button for the preview modal
 *
 * ---
 * 🧱 Props:
 *
 * @prop {string} src                        – Image source URL (optional; handles undefined/null gracefully)
 * @prop {string} [alt="Image"]             – Alternative text for accessibility
 * @prop {string} [className]               – Custom Tailwind classes for the <img> element (default: full cover)
 * @prop {boolean} [showLoader=true]        – Whether to show a spinner while the image loads
 * @prop {string} [fallbackText="No image"] – Text to display if the image fails to load or src is missing
 * @prop {ReactNode} [loadingComponent]     – Custom component to show while loading (replaces spinner)
 * @prop {ReactNode} [fallbackComponent]    – Custom fallback when image fails to load (overrides fallbackText)
 * @prop {() => void} [onClick]             – Optional click handler for the image (used instead of preview)
 * @prop {boolean} [enablePreview=false]    – Enables built-in modal preview on click
 * @prop {boolean} [showCloseButton=true]   – Shows a close button (×) inside the preview modal
 *
 * ---
 * 🧪 Example usage:
 *
 * <Image
 *   src="/images/cabin.jpg"
 *   alt="Cozy cabin"
 *   enablePreview
 *   className="rounded-lg h-32 w-48 object-cover"
 * />
 *
 */
export default function Image({
  src,
  alt = "Image",
  className = "w-full h-full object-cover",
  showLoader = true,
  fallbackText = "No image",
  loadingComponent,
  fallbackComponent,
  onClick,
  enablePreview = false,
  showCloseButton = true,
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPreviewOpen(false);
    };
    if (isPreviewOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isPreviewOpen]);

  const handleClick = () => {
    if (onClick) onClick();
    else if (enablePreview) setIsPreviewOpen(true);
  };

  const wrapperClasses = `relative h-12 w-16 rounded overflow-hidden bg-bg-base ${
    onClick || enablePreview ? "cursor-pointer" : ""
  }`;

  if (!src || error) {
    return (
      fallbackComponent ?? (
        <div
          className={`${wrapperClasses} flex items-center justify-center text-xs text-gray-500`}
          onClick={handleClick}
        >
          {fallbackText}
        </div>
      )
    );
  }

  return (
    <>
      <div className={wrapperClasses} onClick={handleClick}>
        {!loaded && showLoader && (
          <div className="absolute inset-0 flex items-center justify-center">
            {loadingComponent ?? (
              <LoadingSpinner className="h-4 w-4 text-muted" />
            )}
          </div>
        )}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`${className} transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            className="fixed inset-0 z-50 backdrop-blur-sm bg-white/10 flex items-center justify-center p-4"
            onClick={() => setIsPreviewOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {showCloseButton && (
                <button
                  className="absolute top-2 right-2 text-white text-2xl font-bold bg-black/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition"
                  onClick={() => setIsPreviewOpen(false)}
                  aria-label="Close preview"
                >
                  ×
                </button>
              )}
              <img
                src={src}
                alt={alt}
                className="rounded max-h-[90vh] max-w-[90vw] object-contain shadow-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
