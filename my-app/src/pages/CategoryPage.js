import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import apiKeys from '../apiConfig';
import {
  mockProducts,
  fullDressCollection,
  fullTopsCollection,
  fullAccessoriesCollection,
} from '../mockData';
import ProductCard from '../ProductCard';

const SparklesIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2l2.35 6.35L21 9l-5.65 4.35L17.5 21 12 16.5 6.5 21 8.65 13.35 3 9l6.65-.65L12 2z" />
  </svg>
);

const categoryDetails = {
  dresses: {
    title: 'Elegant Dresses',
    bannerUrl:
      'https://images.unsplash.com/photo-1595162235315-226a48c4886e?q=80&w=1887&auto=format&fit=crop',
  },
  tops: {
    title: 'Chic & Versatile Tops',
    bannerUrl:
      'https://images.unsplash.com/photo-1622442299814-25e40a09e15f?q=80&w=1887&auto=format&fit=crop',
  },
  footwear: {
    title: 'Luxury Footwear',
    bannerUrl:
      'https://images.unsplash.com/photo-1562273138-591a27e7ae5e?q=80&w=1887&auto=format&fit=crop',
  },
  accessories: {
    title: 'Finishing Touches',
    bannerUrl:
      'https://images.unsplash.com/photo-1613521140688-16335f939b83?q=80&w=1887&auto=format&fit=crop',
  },
};

/* --- ✨ LuxeButton Component --- */
const LuxeButton = ({ text, icon, onClick, aiText, onHover }) => (
  <button
    onClick={onClick}
    onMouseEnter={onHover}
    className="luxe-btn w-full py-2 text-sm relative"
  >
    {icon && <span className="btn-icon">{icon}</span>}
    <span className="btn-text">{text}</span>
    {aiText && <span className="hover-text">{aiText}</span>}
  </button>
);

const CategoryPage = ({ onNavigate, category, onAddToCart }) => {
  const products = useMemo(() => {
    switch (category) {
      case 'dresses': return fullDressCollection;
      case 'tops': return fullTopsCollection;
      case 'accessories': return fullAccessoriesCollection;
      default: return mockProducts[category] || [];
    }
  }, [category]);

  const details = categoryDetails[category] || { title: 'Our Collection' };
  const gridRef = useRef(null);
  const [styleTip, setStyleTip] = useState('');
  const [isLoadingTip, setIsLoadingTip] = useState(false);
  const [buttonTexts, setButtonTexts] = useState({}); // store AI hover texts per product

  const getStyleTip = useCallback(async () => {
    setIsLoadingTip(true);
    setStyleTip('');
    const apiKey = apiKeys.gemini.apiKey;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    const systemPrompt = `You are an AI fashion editor for 'Luxe Wear'. Write a short, chic, magazine-style paragraph (2-3 sentences) about styling ${category} for the current season. Be inspiring and sophisticated.`;
    const payload = {
      contents: [{ parts: [{ text: `Style tips for ${category}` }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    try {
      if (!apiKey || apiKey === 'YOUR_GOOGLE_GEMINI_API_KEY')
        throw new Error('API key is missing.');
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to fetch style tip.');
      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) setStyleTip(text);
    } catch {
      setStyleTip(
        'Style is eternal. Trust your instincts and wear what makes you feel beautiful.'
      );
    } finally {
      setIsLoadingTip(false);
    }
  }, [category]);

  const getAIButtonText = useCallback(async (productId) => {
    const apiKey = apiKeys.gemini.apiKey;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    const prompt = `Give me a short, stylish, creative shopping call-to-action (2-4 words) for fashion e-commerce. Examples: "Complete The Look", "Make It Yours", "Own The Moment".`;

    const payload = { contents: [{ parts: [{ text: prompt }] }] };

    try {
      if (!apiKey || apiKey === 'YOUR_GOOGLE_GEMINI_API_KEY') return;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (text) {
        setButtonTexts((prev) => ({ ...prev, [productId]: text }));
      }
    } catch {
      setButtonTexts((prev) => ({ ...prev, [productId]: 'Make It Yours' }));
    }
  }, []);

  useEffect(() => {
    let currentGridRef = gridRef.current;
    if (!currentGridRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.product-card-enter');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('product-card-enter-active');
              }, index * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(currentGridRef);
    return () => {
      if (currentGridRef) observer.unobserve(currentGridRef);
    };
  }, [products]);

  return (
    <div>
      {/* ---------- Banner with Animated Gradient ---------- */}
      <div className="relative h-[50vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center ken-burns-effect"
            style={{ backgroundImage: `url(${details.bannerUrl})` }}
          />
        </div>
        <div className="absolute inset-0 z-10 animated-gradient opacity-60"></div>
        <div className="relative z-20 text-center px-4 anim-fade-in-scale">
          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {details.title}
          </h1>
        </div>
      </div>

      {/* ---------- Style Tips ---------- */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <button
            onClick={getStyleTip}
            disabled={isLoadingTip}
            className="bg-white border border-gray-300 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto"
          >
            <SparklesIcon className="w-5 h-5" />
            {isLoadingTip ? 'Generating...' : "Get This Season's Tips"}
          </button>
          {styleTip && (
            <div className="mt-6 max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm anim-fade-in-scale">
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Luxe Style Guide
              </h3>
              <p className="text-gray-600 italic">{styleTip}</p>
            </div>
          )}
        </div>
      </div>

      {/* ---------- Featured Grid ---------- */}
      <div ref={gridRef} className="container mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-center my-12" style={{ fontFamily: "'Playfair Display', serif" }}>Featured Collection</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative flex flex-col product-card-enter opacity-0"
            >
              <ProductCard
                product={product}
                onNavigate={onNavigate}
                index={index}
              />
              <div className="flex gap-2 mt-3">
                <LuxeButton
                  text="Add to Cart"
                  aiText={buttonTexts[product.id]}
                  icon="🛒"
                  onClick={() => onAddToCart(product)}
                  onHover={() => getAIButtonText(product.id)}
                />
                <LuxeButton
                  text="Buy Now"
                  icon="⚡"
                  onClick={() => {
                    onAddToCart(product);
                    onNavigate('cart');
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
