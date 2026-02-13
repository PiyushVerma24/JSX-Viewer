'use client';

import { useState, useRef } from 'react';
import { FileUploadZone } from '@/components/FileUploadZone';
import { JsxPreview } from '@/components/JsxPreview';
import { ExportToolbar } from '@/components/ExportToolbar';
import { Header } from '@/components/Header';
import { transformJsxForPreview } from '@/lib/jsx-transform';

export default function Home() {
  const [transformedCode, setTransformedCode] = useState('');
  const [filename, setFilename] = useState('');
  const [error, setError] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);

  const handleFileLoaded = (code: string, name: string) => {
    setFilename(name.replace(/\.(jsx|tsx)$/i, ''));
    try {
      const transformed = transformJsxForPreview(code);
      setTransformedCode(transformed);
      setError('');
    } catch {
      setError('Failed to process JSX file. The file may contain unsupported syntax.');
      setTransformedCode('');
    }
  };

  const handleClear = () => {
    setTransformedCode('');
    setFilename('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <FileUploadZone
          onFileLoaded={handleFileLoaded}
          hasFile={!!transformedCode}
        />

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {transformedCode && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ExportToolbar
                  previewRef={previewRef}
                  filename={filename}
                  disabled={!transformedCode}
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {filename}.jsx
                </span>
                <button
                  onClick={handleClear}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100"
                >
                  Clear
                </button>
              </div>
            </div>

            <JsxPreview code={transformedCode} previewRef={previewRef} />
          </>
        )}
      </main>

      <footer className="border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-400">
        Curling AI Solutions
      </footer>
    </div>
  );
}
