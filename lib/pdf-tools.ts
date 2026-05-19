import { PDFDocument } from 'pdf-lib';

/**
 * Merges multiple PDF files into a single PDF.
 * @param pdfBuffers Array of PDF file buffers (Uint8Array or ArrayBuffer)
 * @returns Merged PDF as Uint8Array
 */
export async function mergePDFs(pdfBuffers: (Uint8Array | ArrayBuffer)[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const buffer of pdfBuffers) {
    const pdf = await PDFDocument.load(buffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
}

/**
 * Removes a specific page from a PDF.
 * @param pdfBuffer PDF file buffer
 * @param pageIndex Index of the page to remove (0-indexed)
 * @returns Modified PDF as Uint8Array
 */
export async function removePageFromPDF(pdfBuffer: Uint8Array | ArrayBuffer, pageIndex: number): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(pdfBuffer);
  pdf.removePage(pageIndex);
  return await pdf.save();
}
