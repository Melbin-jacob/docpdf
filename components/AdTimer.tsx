"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface AdTimerProps {
  onComplete: () => void;
  isOpen: boolean;
}

export default function AdTimer({ onComplete, isOpen }: AdTimerProps) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (!isOpen) return;

    setTimeLeft(30);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Please wait 30 seconds</h2>
        <p className="text-gray-600 mb-6">
          Your document is ready. To keep this service free, please watch this short advertisement.
        </p>

        {/* Mock Ad Content */}
        <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-6 border border-gray-200">
          <div className="flex flex-col items-center">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-2" />
            <p className="text-gray-400 font-medium">ADVERTISEMENT LOADING...</p>
          </div>
        </div>

        <div className="text-4xl font-black text-blue-600 mb-2">
          {timeLeft}s
        </div>
        <p className="text-sm text-gray-400">Download will start automatically</p>
      </div>
    </div>
  );
}
