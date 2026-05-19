"use client";

import { useState } from "react";
import FileUploader from "@/components/FileUploader";
import AdTimer from "@/components/AdTimer";
import { mergePDFs } from "@/lib/pdf-tools";
import { FileText, X, Download, Loader2 } from "lucide-react";

export default function MergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [mergedPdfData, setMergedPdfData] = useState<Uint8Array | null>(null);

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      alert("Please select at least 2 PDF files to merge.");
      return;
    }

    setMerging(true);
    try {
      const buffers = await Promise.all(
        files.map(async (file) => await file.arrayBuffer())
      );

      const mergedPdf = await mergePDFs(buffers);
      setMergedPdfData(mergedPdf);

      const adEnabled = localStorage.getItem("ad_enabled") === "true";

      if (adEnabled) {
         setIsAdOpen(true);
      } else {
         triggerDownload(mergedPdf, "merged.pdf");
      }

    } catch (error) {
      console.error("Merging failed:", error);
      alert("Failed to merge PDFs. Make sure they are valid documents.");
    } finally {
      setMerging(false);
    }
  };

  const handleAdComplete = () => {
    setIsAdOpen(false);
    if (mergedPdfData) {
      triggerDownload(mergedPdfData, "merged.pdf");
      setMergedPdfData(null);
    }
  };

  const triggerDownload = (data: Uint8Array, filename: string) => {
    const blob = new Blob([data as any], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Merge PDFs</h1>

      <FileUploader onFilesSelected={handleFilesSelected} multiple={true} />

      {files.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Files to Merge</h2>
          <div className="space-y-3">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3">
                  <FileText className="text-blue-500" />
                  <span className="font-medium truncate max-w-[200px] md:max-w-md">{file.name}</span>
                  <span className="text-gray-400 text-sm">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
                <button onClick={() => removeFile(index)} className="text-gray-400 hover:text-red-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleMerge}
              disabled={merging || files.length < 2}
              className={`flex items-center space-x-2 px-8 py-3 rounded-full font-bold text-white transition-all ${
                merging || files.length < 2 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {merging ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Merging...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Merge and Download</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <AdTimer isOpen={isAdOpen} onComplete={handleAdComplete} />
    </div>
  );
}
