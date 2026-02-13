export async function exportToPdf(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const html2pdf = (await import('html2pdf.js')).default;

  await html2pdf()
    .set({
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: `${filename}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
    })
    .from(element)
    .save();
}
