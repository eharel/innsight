import { useState } from "react";
import type { CabinData } from "@/types/db";
import { formatCurrency } from "@/utils/helpers";

type CabinProps = {
  cabin: CabinData;
};

export function CabinRow({ cabin }: CabinProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { id, name, capacity, price, discount_percent, photo_url } = cabin;

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const onDelete = (id: number) => {
    console.log(id);
  };

  return (
    <tr className="border-t border-border">
      <td className="py-4">
        <div className="relative w-16 h-12 bg-bg-base rounded overflow-hidden">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-bg-base">
              <svg
                className="animate-spin text-primary h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          )}
          {imageError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-bg-base text-text-muted">
              <span className="text-xs">No image</span>
            </div>
          ) : (
            <img
              src={photo_url || ""}
              alt={name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
        </div>
      </td>
      <td className="py-4">{name}</td>
      <td className="py-4">{capacity} persons</td>
      <td className="py-4">{formatCurrency(price || 0)}</td>
      <td className="py-4">
        {discount_percent ? `$${discount_percent}` : "—"}
      </td>
      <td className="py-4 space-x-2">
        <button className="text-primary hover:text-primary-hover">Edit</button>
        <button
          className="text-error hover:text-error/80"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
