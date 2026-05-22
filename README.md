# PDF Editor & Converter Tools

A simple, client-side website for editing PDF documents and converting them to different formats. This application does not store any customer data; all processing happens locally in the browser.

## Features

- **Merge PDF**: Combine multiple PDF documents into one.
- **Split PDF**: Remove or separate pages from your PDF.
- **PDF to Image**: Convert PDF pages into high-quality PNG images.
- **Image to PDF**: Convert PNG and JPG images into a PDF document.
- **Rotate PDF**: Rotate PDF pages (90°, 180°, 270°).
- **Watermark**: Add text watermarks to all pages.
- **Protect PDF**: Interface for password-protecting PDFs.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Running Locally in Visual Studio / VS Code

Follow these steps to run the project on your local machine:

1. **Open the Project Folder**
   - Open Visual Studio Code (or Visual Studio).
   - Go to `File > Open Folder...` and select the directory containing this project.

2. **Open the Terminal**
   - In VS Code, open the integrated terminal by pressing `Ctrl + ` ` (backtick) or going to `Terminal > New Terminal`.

3. **Install Dependencies**
   - Run the following command to install all required packages:
     ```bash
     npm install
     ```

4. **Start the Development Server**
   - Run the following command to start the application:
     ```bash
     npm run dev
     ```
   - Once the server starts, you will see a message like `ready - started server on 0.0.0.0:3000, url: http://localhost:3000`.

5. **View the Website**
   - Open your web browser and navigate to `http://localhost:3000`.

## Building for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## Privacy & Security

- **No Data Storage**: We do not store any customer data. All file processing is performed entirely within your web browser.
- **Liability**: Customer data is their own responsibility. We are not liable for the content of processed documents.
- **Ads**: To keep this service free, we display advertisements. A 30-second ad delay is required before downloading edited documents (can be toggled in the Admin Panel at `/admin`).

## License

ISC
