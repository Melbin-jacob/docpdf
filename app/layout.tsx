import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PDF Editor & Converter",
  description: "Simple PDF tools without data storage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          {/* Top Ad Space */}
          <div className="w-full h-20 bg-gray-200 flex items-center justify-center border-b border-gray-300">
            <span className="text-gray-500 font-bold">TOP ADVERTISEMENT SPACE</span>
          </div>

          <div className="flex flex-1">
            {/* Left Ad Space */}
            <div className="hidden lg:flex w-40 bg-gray-100 items-center justify-center border-r border-gray-300 p-4 text-center">
              <span className="text-gray-400 text-xs font-bold">LEFT AD SPACE</span>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-6">
              {children}
            </main>

            {/* Right Ad Space */}
            <div className="hidden lg:flex w-40 bg-gray-100 items-center justify-center border-l border-gray-300 p-4 text-center">
              <span className="text-gray-400 text-xs font-bold">RIGHT AD SPACE</span>
            </div>
          </div>

          {/* Footer with Disclaimer */}
          <footer className="w-full p-6 bg-white border-t border-gray-200">
            <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
              <p>&copy; 2025 PDF Editor Tools. We do not store any of your data. Documents are processed in your browser.</p>
              <p className="mt-2">Privacy: User data is their responsibility. We are not liable for the content of processed documents.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
