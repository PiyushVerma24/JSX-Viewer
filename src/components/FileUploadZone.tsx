'use client';

import { useState, useRef, useCallback } from 'react';

interface FileUploadZoneProps {
  onFileLoaded: (code: string, filename: string) => void;
  hasFile: boolean;
}

export function FileUploadZone({ onFileLoaded, hasFile }: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.match(/\.(jsx|tsx)$/i)) {
        setError('Only .jsx and .tsx files are supported');
        return;
      }
      if (file.size > 512 * 1024) {
        setError('File too large (max 512KB)');
        return;
      }
      setError('');
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileLoaded(content, file.name);
      };
      reader.onerror = () => {
        setError('Failed to read file');
      };
      reader.readAsText(file);
    },
    [onFileLoaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      const file = e.dataTransfer?.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="mb-6">
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative cursor-pointer rounded-xl border-2 border-dashed p-10
          transition-all duration-200 ease-in-out text-center
          ${
            isDragOver
              ? 'border-blue-500 bg-blue-50 scale-[1.01]'
              : hasFile
                ? 'border-green-300 bg-green-50 hover:border-green-400'
                : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".jsx,.tsx"
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          <div
            className={`text-4xl ${isDragOver ? 'animate-bounce' : ''}`}
          >
            {hasFile ? '✓' : isDragOver ? '⬇' : '📄'}
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">
              {hasFile
                ? 'Drop another file to replace'
                : isDragOver
                  ? 'Drop your file here'
                  : 'Drag & drop a JSX/TSX file here'}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              or click to browse (max 512KB)
            </p>
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}
