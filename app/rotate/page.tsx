"use client";

import { useState } from "react";
import FileUploader from "@/components/FileUploader";
import AdTimer from "@/components/AdTimer";
import { rotatePDF } from "@/lib/pdf-tools";
import { FileText, Download, Loader2, RotateCw } from "lucide-react";

export default function RotatePage() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [processedData, setProcessedData] = useState<Uint8Array | null>(null);
  const [rotation, setRotation] = useState(90);

  const handleFileSelected = (files: File[]) => {
    if (files.length > 0) setFile(files[0]);
  };

  const handleProcess = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const buffer = await file.arrayBuffer();
      const modified = await rotatePDF(new Uint8Array(buffer), rotation);
      setProcessedData(modified);
      if (localStorage.getItem("ad_enabled") === "true") {
        setIsAdOpen(true);
      } else {
        triggerDownload(modified, "rotated.pdf");
      }
    } catch (e) {
      alert("Failed to rotate PDF.");
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
      <h1 className="text-3xl font-bold mb-6 text-center">Rotate PDF</h1>
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
            <label className="block text-sm font-medium mb-2 text-gray-700">Rotation Angle:</label>
            <select
              value={rotation}
              onChange={(e) => setRotation(parseInt(e.target.value))}
              className="w-full p-2 border rounded-md"
            >
              <option value="90">90° Clockwise</option>
              <option value="180">180°</option>
              <option value="270">270° Clockwise</option>
            </select>
          </div>
          <button
            onClick={handleProcess}
            disabled={processing}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold flex items-center justify-center space-x-2"
          >
            {processing ? <Loader2 className="animate-spin" /> : <><RotateCw className="w-5 h-5" /> <span>Rotate and Download</span></>}
          </button>
        </div>
      )}
      <AdTimer isOpen={isAdOpen} onComplete={() => { setIsAdOpen(false); if(processedData) triggerDownload(processedData, "rotated.pdf"); }} />
    </div>
  );
}
