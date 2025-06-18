import type { ReactNode } from "react";
import Button from "./Button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showPageNumbers?: boolean;
  siblingCount?: number;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  showPageNumbers = true,
  siblingCount = 1,
}: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  // Generate page numbers to display based on current page and sibling count
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    // Always include first page
    pages.push(1);

    // Calculate range for pages around current page
    const leftSibling = Math.max(2, currentPage - siblingCount);
    const rightSibling = Math.min(totalPages - 1, currentPage + siblingCount);

    // Add ellipsis if there's a gap between first page and left siblings
    if (leftSibling > 2) {
      pages.push("ellipsis");
    }

    // Add all pages from leftSibling to rightSibling
    for (let i = leftSibling; i <= rightSibling; i++) {
      // Skip first and last page as they're always included
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    // Add ellipsis if there's a gap between right siblings and last page
    if (rightSibling < totalPages - 1) {
      pages.push("ellipsis");
    }

    // Always include last page if we have more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const renderPageButton = (
    page: number | "ellipsis",
    index: number
  ): ReactNode => {
    if (page === "ellipsis") {
      return (
        <span key={`ellipsis-${index}`} className="px-2 py-1 text-text-muted">
          ...
        </span>
      );
    }

    const isActive = page === currentPage;

    return (
      <Button
        key={page}
        variant={isActive ? "primary" : "outline"}
        size="sm"
        onClick={() => onPageChange(page)}
        className="min-w-[2.5rem]"
        aria-current={isActive ? "page" : undefined}
      >
        {page}
      </Button>
    );
  };

  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      {/* Previous Page Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </Button>

      {/* Page Numbers */}
      {showPageNumbers && pageNumbers.map(renderPageButton)}

      {/* Next Page Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </div>
  );
}
