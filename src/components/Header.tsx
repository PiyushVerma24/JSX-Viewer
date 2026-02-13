export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-white text-sm font-bold">
            JSX
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              JSX Viewer
            </h1>
            <p className="text-xs text-gray-500">
              by Curling AI Solutions
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
