export async function exportToDocx(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const HTMLtoDOCX = (await import('html-to-docx')).default;

  const htmlContent = element.innerHTML;

  const fullHtml = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body>${htmlContent}</body>
    </html>
  `;

  const docxBlob = await HTMLtoDOCX(fullHtml, null, {
    table: { row: { cantSplit: true } },
    footer: true,
    pageNumber: true,
  });

  const blob = docxBlob instanceof Blob
    ? docxBlob
    : new Blob([docxBlob], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.docx`;
  link.click();
  URL.revokeObjectURL(url);
}
