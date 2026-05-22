import Link from "next/link";
import {
  Combine,
  Scissors,
  Image as ImageIcon,
  RotateCw,
  Type,
  Lock,
  FileImage,
  ShieldCheck
} from "lucide-react";

const tools = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDF documents into one.",
    href: "/merge",
    icon: Combine,
    color: "bg-red-50 text-red-600"
  },
  {
    title: "Split PDF",
    description: "Separate pages from your PDF document.",
    href: "/split",
    icon: Scissors,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "PDF to Image",
    description: "Convert PDF pages into high-quality PNG images.",
    href: "/convert",
    icon: ImageIcon,
    color: "bg-orange-50 text-orange-600"
  },
  {
    title: "Image to PDF",
    description: "Convert PNG and JPG images into a PDF document.",
    href: "/image-to-pdf",
    icon: FileImage,
    color: "bg-green-50 text-green-600"
  },
  {
    title: "Rotate PDF",
    description: "Rotate your PDF pages 90, 180, or 270 degrees.",
    href: "/rotate",
    icon: RotateCw,
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "Watermark",
    description: "Add a text watermark to all pages of your PDF.",
    href: "/watermark",
    icon: Type,
    color: "bg-pink-50 text-pink-600"
  },
  {
    title: "Protect PDF",
    description: "Encrypt your PDF with a password.",
    href: "/protect",
    icon: Lock,
    color: "bg-gray-50 text-gray-600"
  }
];

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4">Every tool you need to work with PDFs in one place</h1>
        <p className="text-xl text-gray-600">
          Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool, index) => (
          <Link
            key={index}
            href={tool.href}
            className="group p-6 bg-white border border-gray-100 rounded-xl hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <tool.icon className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{tool.title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed">{tool.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-20 p-8 bg-blue-600 rounded-3xl text-white text-center">
        <div className="flex justify-center mb-4">
            <ShieldCheck className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Your safety is our priority</h2>
        <p className="max-w-2xl mx-auto text-blue-100 mb-8">
          All your processing is done directly in your browser. We never see your files. No data is stored on our servers, ensuring your documents stay private and secure.
        </p>
        <Link href="/privacy" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors">
            Read Security Policy
        </Link>
      </div>
    </div>
  );
}
