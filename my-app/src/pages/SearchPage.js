// src/pages/SearchPage.js
import React, { useState, useEffect, useCallback } from 'react';
import apiKeys from '../apiConfig';
import { mockProducts } from '../mockData';
import ProductCard from '../ProductCard';

const SearchPage = ({ query, onNavigate }) => {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const performSearch = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        const apiKey = apiKeys.gemini.apiKey;
        
        if (!apiKey || apiKey === "YOUR_GOOGLE_GEMINI_API_KEY") {
            setError("Gemini API key is not configured in apiConfig.js.");
            setResult({ response_text: "Please add your API key to see search results.", category: 'dresses' });
            setIsLoading(false);
            return;
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
        const systemPrompt = `You are a helpful and fashionable shopping assistant for 'Luxe Wear'. A customer is looking for: "${query}".
        1. Write a brief, encouraging, and stylish response to confirm you've understood their request.
        2. Based on their query, identify the most relevant product category from this list: dresses, tops, accessories, footwear. If no category fits well, default to 'dresses'.
        Your response must be a valid JSON object with two properties: "response_text" (your stylish response as a string) and "category" (the identified category as a lowercase string).`;
        const payload = { contents: [{ parts: [{ text: query }] }], systemInstruction: { parts: [{ text: systemPrompt }] }, generationConfig: { responseMimeType: "application/json" } };

        try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`API error: ${response.statusText}`);
            const apiResult = await response.json();
            const generatedText = apiResult.candidates?.[0]?.content?.parts?.[0]?.text;
            if (generatedText) {
                setResult(JSON.parse(generatedText));
            } else {
                throw new Error("AI search is currently unavailable.");
            }
        } catch (err) {
            setError("Sorry, our AI stylist is currently busy. Here are our most popular dresses.");
            setResult({ response_text: "Finding the perfect look can be tricky! While our AI gets a touch-up, please enjoy our stunning dress collection.", category: 'dresses' });
        } finally {
            setIsLoading(false);
        }
    }, [query]);

    useEffect(() => {
        performSearch();
    }, [performSearch]);

    const products = result ? mockProducts[result.category] || [] : [];

    return (
        <div className="container mx-auto px-6 py-28 animate-fadeIn">
            <div className="text-center mb-12">
                <h2 className="text-2xl text-gray-600">Search results for: "{query}"</h2>
                {isLoading && <div className="mt-4 text-lg text-gray-800 animate-pulse">Our AI is searching for you...</div>}
                {error && <p className="mt-4 text-red-500">{error}</p>}
                {result && <p className="mt-4 text-lg text-gray-800 max-w-2xl mx-auto">{result.response_text}</p>}
            </div>
            {products.length > 0 &&
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {products.map((product, index) => (<ProductCard key={product.id} product={product} onNavigate={onNavigate} index={index}/>))}
                </div>
            }
        </div>
    );
};

export default SearchPage;