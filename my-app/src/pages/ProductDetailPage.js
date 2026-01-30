import React, { useState } from 'react';
import { allProducts } from '../mockData';

const ProductDetailPage = ({ productId }) => {
  const product = allProducts.find((p) => p.id === productId);
  
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    
    // --- 1. CHECK FOR MANUAL DATA OVERRIDE ---
    if (product.manualRecommendations) {
      // Simulate a small delay so the user feels the "AI" is working
      setTimeout(() => {
        setRecommendations(product.manualRecommendations);
        setIsLoading(false);
      }, 600);
      return; // Exit the function here: do not call the API
    }

    // --- 2. IF NO MANUAL DATA, CALL THE AI API ---
    try {
      const res = await fetch(product.imageUrl);
      const buf = await res.arrayBuffer();
      const file = new File([buf], "product.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:5000/generate-look', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      setRecommendations(data); 
    } catch (err) {
      console.error("Styling Error:", err);
      setError(err.message || "Failed to fetch recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) return <div className="p-20 text-center text-xl">Product not found.</div>;

  return (
    <div className="container mx-auto px-6 py-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full rounded-lg shadow-xl object-cover" 
        />

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6">{product.name}</h1>
          
          <button 
            onClick={handleGetRecommendations} 
            disabled={isLoading} 
            className={`py-4 rounded-lg font-bold transition-all shadow-lg ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {isLoading ? "Curating Your Style..." : "✨ Generate AI Accessories"}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              ⚠️ {error}
            </div>
          )}

          {recommendations && !isLoading && (
            <div className="mt-12 grid grid-cols-2 gap-6 animate-fadeIn">
              
              {/* Footwear Card */}
              <div className="group bg-white p-4 rounded-xl border shadow-sm transition-transform hover:scale-105">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Matching Footwear</p>
                <a href={recommendations.footwear.product_link} target="_blank" rel="noopener noreferrer" className="block relative">
                   <img 
                    src={recommendations.footwear.image_url} 
                    alt="Recommended Footwear" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {/* Label changes based on whether it is manual or AI */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 font-semibold text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                        
                    </span>
                  </div>
                </a>
                <p className="text-[11px] mt-3 text-gray-800 font-medium leading-tight">
                  {recommendations.styling_prompts.footwear_prompt}
                </p>
                <p className="text-[9px] mt-1 text-gray-400">
                  By {recommendations.footwear.photographer}
                </p>
              </div>

              {/* Accessory Card */}
              <div className="group bg-white p-4 rounded-xl border shadow-sm transition-transform hover:scale-105">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Matching Accessory</p>
                <a href={recommendations.accessory.product_link} target="_blank" rel="noopener noreferrer" className="block relative">
                  <img 
                    src={recommendations.accessory.image_url} 
                    alt="Recommended Accessory" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 font-semibold text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                   
                    </span>
                  </div>
                </a>
                <p className="text-[11px] mt-3 text-gray-800 font-medium leading-tight">
                  {recommendations.styling_prompts.accessory_prompt}
                </p>
                <p className="text-[9px] mt-1 text-gray-400">
                   By {recommendations.accessory.photographer}
                </p>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;