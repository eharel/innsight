// CabinImage.tsx
import { useState } from "react";

export function Image({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!src || error)
    return (
      <div className="flex items-center justify-center h-12 w-16 bg-muted text-xs text-gray-500">
        No image
      </div>
    );

  return (
    <div className="relative h-12 w-16 rounded overflow-hidden bg-bg-base">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-muted">
          <span className="text-xs">Loading...</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
