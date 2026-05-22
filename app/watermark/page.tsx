"use client";

import { useState } from "react";
import FileUploader from "@/components/FileUploader";
import AdTimer from "@/components/AdTimer";
import { addWatermarkToPDF } from "@/lib/pdf-tools";
import { FileText, Download, Loader2, Type } from "lucide-react";

export default function WatermarkPage() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [processedData, setProcessedData] = useState<Uint8Array | null>(null);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");

  const handleFileSelected = (files: File[]) => {
    if (files.length > 0) setFile(files[0]);
  };

  const handleProcess = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const buffer = await file.arrayBuffer();
      const modified = await addWatermarkToPDF(new Uint8Array(buffer), watermarkText);
      setProcessedData(modified);
      if (localStorage.getItem("ad_enabled") === "true") {
        setIsAdOpen(true);
      } else {
        triggerDownload(modified, "watermarked.pdf");
      }
    } catch (e) {
      alert("Failed to add watermark.");
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
      <h1 className="text-3xl font-bold mb-6 text-center">Add Watermark</h1>
      {!file ? (
        <FileUploader onFilesSelected={handleFileSelected} />
      ) : (
        <div className="bg-white p-6 border rounded-lg shadow-sm">
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <FileText className="text-blue-500" />
              <span className="font-bold">{file.name}</span>
            </div>
            <button onClick={() => setFile(null)} className="text-red-500 text-sm">Change</button>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">Watermark Text:</label>
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="e.g. CONFIDENTIAL"
            />
          </div>
          <button
            onClick={handleProcess}
            disabled={processing}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold flex items-center justify-center space-x-2"
          >
            {processing ? <Loader2 className="animate-spin" /> : <><Type className="w-5 h-5" /> <span>Add Watermark and Download</span></>}
          </button>
        </div>
      )}
      <AdTimer isOpen={isAdOpen} onComplete={() => { setIsAdOpen(false); if(processedData) triggerDownload(processedData, "watermarked.pdf"); }} />
    </div>
  );
}
