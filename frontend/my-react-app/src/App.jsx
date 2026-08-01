import { useState } from "react";
import axios from "axios";
import { Copy, Check, Link2 } from "lucide-react";

export default function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!originalUrl) return;

    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/short`, { originalUrl })
      .then((res) => {
        setShortUrl(res.data);
        setOriginalUrl("");
        setCopied(false);
      })
      .catch((err) => {
        alert(err.response?.data?.message || "An error occurred");
      })
      .finally(() => setLoading(false));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl?.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white shadow-md mb-6">
              <Link2 className="w-7 h-7 text-blue-600" strokeWidth={2.5} />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-2 tracking-tight">
              Shorten
            </h1>
            <p className="text-gray-600 text-base font-normal leading-relaxed">
              Create short links that are easy to share and remember
            </p>
          </div>

          {/* Input Section */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Paste your URL..."
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
              className="w-full px-5 py-4 bg-white border-2 border-blue-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-200 text-base font-normal shadow-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition duration-200 text-base shadow-md hover:shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating...</span>
                </span>
              ) : (
                "Generate Short URL"
              )}
            </button>
          </form>

          {/* Results Section */}
          {shortUrl && (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Shortened URL Card */}
              <div className="bg-white rounded-xl p-5 shadow-md border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <Link2 className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700 text-xs font-bold uppercase tracking-wide">Your Link</span>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <input
                    type="text"
                    readOnly
                    value={shortUrl?.shortUrl}
                    className="flex-1 bg-transparent text-gray-900 font-mono text-sm outline-none"
                  />
                  <button
                    onClick={handleCopy}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition duration-200"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* QR Code Card */}
              {shortUrl?.qrCodeImg && (
                <div className="bg-white rounded-xl p-5 shadow-md border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                    <span className="text-gray-700 text-xs font-bold uppercase tracking-wide">QR Code</span>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 flex justify-center border border-blue-200">
                    <img
                      src={shortUrl.qrCodeImg}
                      alt="Generated QR Code"
                      className="w-44 h-44"
                    />
                  </div>
                </div>
              )}

              {/* Reset Button */}
              <button
                onClick={() => {
                  setShortUrl("");
                  setCopied(false);
                }}
                className="w-full text-gray-600 hover:text-gray-800 text-sm py-3 transition duration-200 font-medium"
              >
                Create another link
              </button>
            </div>
          )}

          {/* Empty State */}
          {!shortUrl && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">Your link will appear here</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-xs font-normal tracking-wider uppercase">
            Fast • Secure • Simple
          </p>
        </div>
      </div>
    </div>
  );
}
