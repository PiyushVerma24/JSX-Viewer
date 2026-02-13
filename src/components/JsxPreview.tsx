'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef, Fragment } from 'react';
import { LiveProvider, LivePreview, LiveError } from 'react-live';

const scope = {
  React,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  Fragment,
};

interface JsxPreviewProps {
  code: string;
  previewRef: React.RefObject<HTMLDivElement | null>;
}

export function JsxPreview({ code, previewRef }: JsxPreviewProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-gray-500 ml-2">Preview</span>
      </div>

      <LiveProvider code={code} scope={scope} noInline>
        <div ref={previewRef} className="p-8 bg-white min-h-[200px]">
          <LivePreview />
        </div>
        <LiveError className="border-t border-red-200 bg-red-50 p-4 text-sm text-red-700 font-mono whitespace-pre-wrap" />
      </LiveProvider>
    </div>
  );
}
