import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-4xl font-extrabold text-center mb-8">Simple PDF Tools</h1>
      <p className="text-center text-lg text-gray-600 mb-12">
        Upload, Edit, and Download. No data is ever stored on our servers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold mb-2">Merge PDFs</h2>
          <p className="text-gray-600 mb-4">Combine multiple PDF documents into a single file.</p>
          <Link href="/merge" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg">
            Start Merging
          </Link>
        </div>

        <div className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold mb-2">Split PDF</h2>
          <p className="text-gray-600 mb-4">Separate pages from your PDF document.</p>
          <Link href="/split" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg">
            Start Splitting
          </Link>
        </div>

        <div className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold mb-2">PDF to Image</h2>
          <p className="text-gray-600 mb-4">Convert PDF pages into high-quality PNG images.</p>
          <Link href="/convert" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg">
            Start Converting
          </Link>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/privacy" className="text-blue-500 hover:underline">
          Read our Privacy Policy
        </Link>
      </div>
    </div>
  );
}
