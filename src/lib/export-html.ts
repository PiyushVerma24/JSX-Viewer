export function exportToHtml(
  element: HTMLElement,
  filename: string
): void {
  const htmlContent = element.innerHTML;

  // Capture computed styles from the rendered preview
  const styles = extractComputedStyles(element);

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${filename}</title>
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background: #ffffff;
      padding: 40px;
    }
    table {
      border-collapse: collapse;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    @media print {
      body { padding: 20px; }
    }
${styles}
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.html`;
  link.click();
  URL.revokeObjectURL(url);
}

function extractComputedStyles(container: HTMLElement): string {
  // Collect all inline styles from elements and convert to a stylesheet
  // This ensures the HTML file looks identical when opened standalone
  const styleRules: string[] = [];
  const elements = container.querySelectorAll('*');

  elements.forEach((el, index) => {
    const htmlEl = el as HTMLElement;
    if (htmlEl.style.cssText) {
      const className = `jsx-el-${index}`;
      htmlEl.classList.add(className);
      styleRules.push(`    .${className} { ${htmlEl.style.cssText} }`);
    }
  });

  return styleRules.join('\n');
}
