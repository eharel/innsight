import { useRef, useState, type ChangeEvent } from 'react';
import { Button } from './Button';

type FileUploadProps = {
  label?: string;
  accept?: string;
  maxSizeMB?: number;
  onChange?: (file: File | null) => void;
  onFileSelect?: (file: File | null) => void;
  value?: File | string | null;
  error?: string;
  hint?: string;
  previewUrl?: string;
  className?: string;
  buttonLabel?: string;
};

export function FileUpload({
  label,
  accept = 'image/*',
  maxSizeMB = 5,
  onChange,
  onFileSelect,
  value,
  error,
  hint,
  className = '',
  buttonLabel = 'Choose File',
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(
    typeof value === 'string' ? value : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };
  
  const handleFile = (file: File | null) => {
    setFileError(null);
    
    if (!file) {
      onChange?.(null);
      onFileSelect?.(null);
      setPreview(null);
      return;
    }
    
    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setFileError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }
    
    // Create and set preview URL
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange?.(file);
    onFileSelect?.(file);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0] || null;
    handleFile(file);
  };
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const clearFile = () => {
    onChange?.(null);
    onFileSelect?.(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      
      <div
        className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-border'
        } ${error || fileError ? 'border-error/50 bg-error/5' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center space-y-3">
          {preview ? (
            <div className="relative group">
              {accept.includes('image') ? (
                <div className="relative w-32 h-32 mx-auto">
                  <img
                    src={preview}
                    alt="File preview"
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={clearFile}
                    className="absolute -top-2 -right-2 bg-error text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove file"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 p-2 bg-bg-surface rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-text-base truncate max-w-xs">
                    {typeof value === 'object' && value instanceof File ? value.name : 'File selected'}
                  </span>
                  <button
                    type="button"
                    onClick={clearFile}
                    className="text-error"
                    aria-label="Remove file"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <svg className="h-12 w-12 text-text-muted" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm text-text-muted text-center">
                Drag and drop a file here, or click below to select one
              </p>
              <Button variant="outline" size="sm" onClick={handleButtonClick}>
                {buttonLabel}
              </Button>
              <p className="text-xs text-text-muted">
                Max file size: {maxSizeMB}MB
              </p>
            </>
          )}
        </div>
      </div>
      
      {(error || fileError) && (
        <p className="mt-1 text-sm text-error">
          {error || fileError}
        </p>
      )}
      
      {hint && !error && !fileError && (
        <p className="mt-1 text-sm text-text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
