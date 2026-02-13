'use client';

import { useState } from 'react';

interface ExportToolbarProps {
  previewRef: React.RefObject<HTMLDivElement | null>;
  filename: string;
  disabled: boolean;
}

export function ExportToolbar({
  previewRef,
  filename,
  disabled,
}: ExportToolbarProps) {
  const [exporting, setExporting] = useState<'pdf' | 'html' | null>(null);

  const handleHtmlExport = async () => {
    if (!previewRef.current || disabled) return;
    setExporting('html');
    try {
      const { exportToHtml } = await import('@/lib/export-html');
      exportToHtml(previewRef.current, filename);
    } catch (err) {
      console.error('HTML export failed:', err);
    } finally {
      setExporting(null);
    }
  };

  const handlePdfExport = async () => {
    if (!previewRef.current || disabled) return;
    setExporting('pdf');
    try {
      const { exportToPdf } = await import('@/lib/export-pdf');
      await exportToPdf(previewRef.current, filename);
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleHtmlExport}
        disabled={disabled || exporting !== null}
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {exporting === 'html' ? (
          <>
            <Spinner /> Exporting...
          </>
        ) : (
          <>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Save as HTML
          </>
        )}
      </button>

      <button
        onClick={handlePdfExport}
        disabled={disabled || exporting !== null}
        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {exporting === 'pdf' ? (
          <>
            <Spinner /> Exporting...
          </>
        ) : (
          <>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Save as PDF
          </>
        )}
      </button>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
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
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
