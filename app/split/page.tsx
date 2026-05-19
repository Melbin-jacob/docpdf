"use client";

import { useState } from "react";
import FileUploader from "@/components/FileUploader";
import AdTimer from "@/components/AdTimer";
import { removePageFromPDF } from "@/lib/pdf-tools";
import { FileText, Download, Loader2, Trash2 } from "lucide-react";

export default function SplitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [processedPdfData, setProcessedPdfData] = useState<Uint8Array | null>(null);
  const [pageToRemove, setPageToRemove] = useState<number>(1);

  const handleFileSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleProcess = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      const buffer = await file.arrayBuffer();
      // Simple logic: remove a specific page (1-indexed for user)
      const modifiedPdf = await removePageFromPDF(new Uint8Array(buffer), pageToRemove - 1);
      setProcessedPdfData(modifiedPdf);

      const adEnabled = localStorage.getItem("ad_enabled") === "true";

      if (adEnabled) {
         setIsAdOpen(true);
      } else {
         triggerDownload(modifiedPdf, "modified.pdf");
      }

    } catch (error) {
      console.error("Processing failed:", error);
      alert("Failed to process PDF. Check page number.");
    } finally {
      setProcessing(false);
    }
  };

  const handleAdComplete = () => {
    setIsAdOpen(false);
    if (processedPdfData) {
      triggerDownload(processedPdfData, "modified.pdf");
      setProcessedPdfData(null);
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
      <h1 className="text-3xl font-bold mb-6 text-center">Split / Remove Page</h1>

      {!file ? (
        <FileUploader onFilesSelected={handleFileSelected} multiple={false} />
      ) : (
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <FileText className="text-blue-500 w-8 h-8" />
              <div>
                <p className="font-bold">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <button onClick={() => setFile(null)} className="text-red-500 hover:underline">Change</button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Page number to remove:
            </label>
            <input
              type="number"
              min="1"
              value={pageToRemove}
              onChange={(e) => setPageToRemove(parseInt(e.target.value) || 1)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleProcess}
              disabled={processing}
              className={`flex items-center space-x-2 px-8 py-3 rounded-full font-bold text-white transition-all ${
                processing ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {processing ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-5 h-5" />
                  <span>Remove Page and Download</span>
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
