"use client";

import { useState, useEffect } from "react";
import FileUploader from "@/components/FileUploader";
import AdTimer from "@/components/AdTimer";
import { FileText, Download, Loader2, Image as ImageIcon } from "lucide-react";

// Use dynamic import for pdfjs to avoid SSR issues
const ConvertContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);
  const [pdfjs, setPdfjs] = useState<any>(null);

  useEffect(() => {
    import("pdfjs-dist").then((module) => {
      module.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${module.version}/pdf.worker.min.js`;
      setPdfjs(module);
    });
  }, []);

  const handleFileSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file || !pdfjs) return;

    setConverting(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1); // Convert first page

      const viewport = page.getViewport({ scale: 2.0 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      if (context) {
        await page.render({ canvasContext: context as any, viewport: viewport } as any).promise;
        const dataUrl = canvas.toDataURL("image/png");
        setImageData(dataUrl);

        const adEnabled = localStorage.getItem("ad_enabled") === "true";
        if (adEnabled) {
          setIsAdOpen(true);
        } else {
          triggerDownload(dataUrl, "converted.png");
        }
      }
    } catch (error) {
      console.error("Conversion failed:", error);
      alert("Failed to convert PDF to image.");
    } finally {
      setConverting(false);
    }
  };

  const handleAdComplete = () => {
    setIsAdOpen(false);
    if (imageData) {
      triggerDownload(imageData, "converted.png");
      setImageData(null);
    }
  };

  const triggerDownload = (dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    link.click();
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Convert PDF to Image</h1>
      <p className="text-center text-gray-500 mb-8">This tool converts the first page of your PDF to a PNG image.</p>

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

          <div className="flex justify-center">
            <button
              onClick={handleConvert}
              disabled={converting || !pdfjs}
              className={`flex items-center space-x-2 px-8 py-3 rounded-full font-bold text-white transition-all ${
                converting || !pdfjs ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {converting ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Converting...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-5 h-5" />
                  <span>{pdfjs ? "Convert to PNG" : "Loading PDF Library..."}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <AdTimer isOpen={isAdOpen} onComplete={handleAdComplete} />
    </div>
  );
};

export default function ConvertPage() {
    return <ConvertContent />;
}
