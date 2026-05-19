export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy & Terms of Service</h1>

      <div className="prose prose-blue max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-black mb-2">1. Data Privacy</h2>
          <p>
            We take your privacy seriously. This website operates entirely within your web browser.
            <strong> We do not store, collect, or transmit any of your uploaded documents or data to our servers.</strong>
            All processing is done locally on your device.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-black mb-2">2. User Responsibility</h2>
          <p>
            The security and confidentiality of your documents are your sole responsibility.
            By using this service, you acknowledge that you are responsible for the content of the documents you upload and process.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-black mb-2">3. Limitation of Liability</h2>
          <p>
            PDF Editor Tools and its operators shall not be liable for any damages, data loss, or security breaches
            resulting from the use of this website. This service is provided "as is" without any warranties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-black mb-2">4. Advertisements</h2>
          <p>
            To provide this service for free, we may display advertisements. These advertisements are served by
            third-party partners who may use cookies to personalize your experience.
          </p>
        </section>

        <div className="mt-10 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 font-medium">
            Standard Data Privacy Rule: Customer data is their own responsibility. We are not liable for any misuse or loss of data.
          </p>
        </div>
      </div>
    </div>
  );
}
