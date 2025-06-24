import { useState } from "react";
import type { CabinData } from "@/types/db-aliases";
import { formatCurrency } from "@/utils/helpers";
import { Button } from "@/components/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "@/services/api/apiCabins";
import { toast } from "react-hot-toast";

type CabinProps = {
  cabin: CabinData;
};

export function CabinRow({ cabin }: CabinProps) {
  const { id, name, capacity, price, discount_percent, photo_url } = cabin;

  // TODO look over these states
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteMutation } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      console.log("Cabin deleted successfully");
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      console.error("Error deleting cabin:", error);
      toast.error("Error deleting cabin");
    },
  });

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <tr className="border-t border-border">
      <td className="py-4">
        <div className="relative w-16 h-12 bg-bg-base rounded overflow-hidden">
          {!imageLoaded && !imageError && photo_url && (
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
          ) : photo_url ? (
            <img
              src={photo_url}
              alt={name || ""}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <span className="text-xs text-gray-500">No image</span>
            </div>
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
        <Button variant="outline">Edit</Button>
        <Button
          variant="destructive"
          onClick={() => deleteMutation(id)}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </td>
    </tr>
  );
}
