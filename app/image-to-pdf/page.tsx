"use client";

import { useState } from "react";
import FileUploader from "@/components/FileUploader";
import AdTimer from "@/components/AdTimer";
import { imagesToPDF } from "@/lib/pdf-tools";
import { FileImage, Download, Loader2, Plus, X } from "lucide-react";

export default function ImageToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [processedData, setProcessedData] = useState<Uint8Array | null>(null);

  const handleFilesSelected = (files: File[]) => {
    setFiles((prev) => [...prev, ...files]);
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    try {
      const buffers = await Promise.all(
        files.map(async (f) => ({ data: await f.arrayBuffer(), type: f.type }))
      );
      const pdf = await imagesToPDF(buffers);
      setProcessedData(pdf);
      if (localStorage.getItem("ad_enabled") === "true") {
        setIsAdOpen(true);
      } else {
        triggerDownload(pdf, "images.pdf");
      }
    } catch (e) {
      alert("Failed to convert images to PDF.");
    } finally {
      setProcessing(false);
    }
  };

  const triggerDownload = (data: Uint8Array, filename: string) => {
    const blob = new Blob([data as any], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Images to PDF</h1>
      <FileUploader onFilesSelected={handleFilesSelected} multiple={true} accept="image/png,image/jpeg" />

      {files.length > 0 && (
        <div className="mt-8 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {files.map((file, i) => (
              <div key={i} className="relative group border rounded-lg p-2 bg-gray-50">
                <div className="aspect-square flex items-center justify-center overflow-hidden rounded bg-white">
                    <FileImage className="text-gray-300 w-12 h-12" />
                </div>
                <button
                  onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="text-xs truncate mt-2 text-center text-gray-500">{file.name}</p>
              </div>
            ))}
          </div>
          <button
            onClick={handleProcess}
            disabled={processing}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold flex items-center justify-center space-x-2"
          >
            {processing ? <Loader2 className="animate-spin" /> : <><Download className="w-5 h-5" /> <span>Convert to PDF and Download</span></>}
          </button>
        </div>
      )}
      <AdTimer isOpen={isAdOpen} onComplete={() => { setIsAdOpen(false); if(processedData) triggerDownload(processedData, "images.pdf"); }} />
    </div>
  );
}
