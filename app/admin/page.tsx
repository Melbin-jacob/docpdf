"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [isAdEnabled, setIsAdEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ad_enabled");
    if (saved !== null) {
      setIsAdEnabled(saved === "true");
    }
  }, []);

  const handleToggle = (val: boolean) => {
    setIsAdEnabled(val);
    localStorage.setItem("ad_enabled", val ? "true" : "false");
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Download/Print Ad Requirement</h2>
            <p className="text-gray-600">Force users to watch a 30-second ad before downloading or printing.</p>
          </div>
          <button
            onClick={() => handleToggle(!isAdEnabled)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              isAdEnabled
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {isAdEnabled ? "Disable" : "Enable"}
          </button>
        </div>
      </div>
    </div>
  );
}
