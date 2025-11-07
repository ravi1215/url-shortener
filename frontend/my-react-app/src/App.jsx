import { useState } from "react";
import axios from "axios";

export default function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!originalUrl) {
      setError('Please enter a URL'); 
      return;
    }
   // setError('');

    axios
      .post(import.meta.env.VITE_API_URL, { originalUrl })
      .then((res) => {
        setShortUrl(res.data);
        console.log("API response", res.data);
      })
      .catch((err) => {
        console.log("Error:", err.response?.data?.message || "An error occurred");
        setShortUrl('');  
        alert(err.response?.data?.message || "An error occurred");
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md sm:max-w-lg w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-blue-600">
          URL Shortener
        </h1>
        <div onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter URL to shorten"
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            type="button"
            className="bg-blue-600 text-white rounded-md py-2 font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Shorten
          </button>

          {shortUrl && (
            <div className="mt-6 text-center">
              <p className="text-lg font-medium text-black">Shortened URL:</p>
              <a
                href={shortUrl?.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2"
              >
                {shortUrl?.shortUrl}
              </a>
              {shortUrl && (
                <div className="mt-4">
                  <p className="text-lg font-medium text-gray-800">QR Code:</p>
                  <img
                    src={shortUrl.qrCodeImg}
                    alt="Generated QR Code"
                    className="mt-4 rounded-md shadow-lg mx-auto"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
