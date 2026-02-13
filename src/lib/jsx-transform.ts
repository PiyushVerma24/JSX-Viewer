export function transformJsxForPreview(rawCode: string): string {
  let code = rawCode;

  // Strip import statements (single-line and multi-line)
  code = code.replace(/^import\s+[\s\S]*?from\s+['"][^'"]*['"];?\s*$/gm, '');
  code = code.replace(/^import\s+['"][^'"]*['"];?\s*$/gm, '');

  // Track the default export component name
  let defaultComponentName: string | null = null;

  // Handle: export default function ComponentName(...)
  code = code.replace(
    /export\s+default\s+function\s+(\w+)/g,
    (_, name) => {
      defaultComponentName = name;
      return `function ${name}`;
    }
  );

  // Handle: export default class ComponentName
  code = code.replace(
    /export\s+default\s+class\s+(\w+)/g,
    (_, name) => {
      defaultComponentName = name;
      return `class ${name}`;
    }
  );

  // Handle: const ComponentName = ... ; export default ComponentName;
  if (!defaultComponentName) {
    const exportDefaultMatch = code.match(/export\s+default\s+(\w+)\s*;?/);
    if (exportDefaultMatch) {
      defaultComponentName = exportDefaultMatch[1];
      code = code.replace(/export\s+default\s+\w+\s*;?/, '');
    }
  }

  // Handle: export default () => ... or export default (props) => ...
  if (!defaultComponentName) {
    const arrowMatch = code.match(/export\s+default\s+(\([\s\S]*?\)\s*=>)/);
    if (arrowMatch) {
      defaultComponentName = '__DefaultComponent__';
      code = code.replace(
        /export\s+default\s+(\([\s\S]*?\)\s*=>)/,
        `const __DefaultComponent__ = $1`
      );
    }
  }

  // Handle: export default memo(...) or export default forwardRef(...)
  if (!defaultComponentName) {
    const wrappedMatch = code.match(/export\s+default\s+(memo|forwardRef)\s*\(/);
    if (wrappedMatch) {
      defaultComponentName = '__DefaultComponent__';
      code = code.replace(
        /export\s+default\s+(memo|forwardRef)\s*\(/,
        `const __DefaultComponent__ = $1(`
      );
    }
  }

  // Strip remaining export keywords (export const, export function, etc.)
  code = code.replace(/export\s+/g, '');

  // Strip TypeScript type-only constructs that might cause issues
  code = code.replace(/^type\s+\w+\s*=\s*[\s\S]*?;\s*$/gm, '');
  code = code.replace(/^interface\s+\w+\s*\{[\s\S]*?\}\s*$/gm, '');

  // Clean up empty lines left by stripping
  code = code.replace(/\n{3,}/g, '\n\n');
  code = code.trim();

  // If we found a default component, append the render call
  if (defaultComponentName) {
    code += `\n\nrender(<${defaultComponentName} />);`;
  } else {
    // Try to find any function/const component at the top level
    const componentMatch = code.match(
      /(?:function|const)\s+([A-Z]\w*)/
    );
    if (componentMatch) {
      code += `\n\nrender(<${componentMatch[1]} />);`;
    }
  }

  return code;
}
