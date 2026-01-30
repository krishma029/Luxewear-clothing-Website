// src/pages/VirtualStylistPage.js
import React, { useState } from 'react';


const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
  });

const VirtualStylistPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const azureApiKey = process.env.REACT_APP_AZURE_OPENAI_KEY;
  const azureEndpoint = "https://api.openai.azure.com/v1/images/generations"; // or your deployed endpoint

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setResults([]);
      setError(null);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      setError("Please upload an outfit image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const base64Img = await toBase64(selectedFile);

      // Step 1: Analyze and generate footwear + jewelry
      const prompt = `
        You are an AI fashion stylist.
        Analyze the uploaded outfit and create two AI-generated images:
        1. Matching footwear that complements the outfit style.
        2. Matching jewelry (like earrings, necklace, or bracelet).
        Each should be shown as a professional fashion product photo on a plain background.
      `;

      const payload = {
        model: "dall-e-3",
        prompt: prompt,
        n: 2,
        size: "1024x1024"
      };

      const response = await fetch(azureEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": azureApiKey
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Azure API error: " + response.statusText);
      const data = await response.json();

      const generated = data.data.map((d, i) => ({
        category: i === 0 ? "Footwear" : "Jewelry",
        imageUrl: d.url
      }));

      setResults(generated);
    } catch (err) {
      console.error(err);
      setError("AI stylist failed — please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-28 animate-fadeIn">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Virtual Stylist
        </h1>
        <p className="text-gray-600 mb-8">
          Upload an outfit photo — our AI will generate matching footwear and jewelry for your look.
        </p>
      </div>

      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md border">
        {imagePreview ? (
          <div className="mb-6 text-center">
            <img src={imagePreview} alt="Outfit preview" className="max-w-full max-h-96 mx-auto rounded-lg" />
          </div>
        ) : (
          <div className="mb-6 p-12 border-2 border-dashed rounded-lg text-center text-gray-500">
            <p>Your uploaded image will appear here.</p>
          </div>
        )}

        <div className="flex items-center justify-center gap-4">
          <label className="cursor-pointer bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
            <span>Upload Image</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
          <button
            onClick={handleGenerate}
            disabled={isLoading || !selectedFile}
            className="bg-gray-800 text-white font-semibold py-2 px-6 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Styling..." : "Get Matching Items"}
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="mt-12 text-center text-gray-600">
          <div className="animate-pulse">AI is creating your fashion matches...</div>
        </div>
      )}
      {error && <p className="mt-8 text-red-500 text-center">{error}</p>}

      {results.length > 0 && !isLoading && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center my-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            AI Generated Matches
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {results.map((item, i) => (
              <div key={i} className="p-4 bg-white rounded-lg shadow-md border animate-fadeIn text-center">
                <img src={item.imageUrl} alt={item.category} className="w-full h-64 object-cover rounded-md mb-4" />
                <p className="font-bold text-lg text-gray-800">{item.category}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualStylistPage;
