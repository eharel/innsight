import { useEffect, useRef, type ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnClickOutside = true,
  closeOnEsc = true,
  showCloseButton = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && closeOnEsc) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, closeOnEsc]);

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (
      closeOnClickOutside &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  // Map size prop to width classes
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full mx-4",
  }[size];

  // Don't render anything if modal is not open
  if (!isOpen) return null;

  // Focus trap would ideally be implemented here for accessibility

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby={title ? "modal-title" : undefined}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center"
        onClick={handleBackdropClick}
      >
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          aria-hidden="true"
        />

        {/* Modal panel */}
        <div
          ref={modalRef}
          className={`${sizeClasses} w-full bg-bg-surface rounded-lg shadow-xl text-left overflow-hidden transform transition-all`}
        >
          {/* Modal header */}
          {(title || showCloseButton) && (
            <div className="flex justify-between items-center px-6 py-4 border-b border-border">
              {title && (
                <h3 id="modal-title" className="text-lg font-medium">
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className="text-text-muted hover:text-text-base rounded-full p-1"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Modal content */}
          <div className="p-6">{children}</div>

          {/* Modal footer */}
          {footer && (
            <div className="px-6 py-4 border-t border-border flex justify-end space-x-2">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
