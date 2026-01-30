// src/ProductCard.js
import React from 'react';

const ProductCard = ({ product, onNavigate, index }) => (
  <div
    className="group cursor-pointer product-card-enter transform transition duration-500 hover:scale-105 hover:shadow-lg"
    style={{ transitionDelay: `${index * 100}ms` }}
    onClick={() => onNavigate('product', product.id)}
  >
    {/* Image container with fixed height */}
    <div className="overflow-hidden rounded-lg bg-gray-100 w-full h-80 flex justify-center items-center">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-full object-cover object-center group-hover:opacity-80 transition-opacity duration-300"
      />
    </div>

    {/* Product name & price */}
    <div className="mt-4 text-center">
      <h3 className="text-lg font-medium text-gray-800 truncate">{product.name}</h3>
      <p className="mt-1 text-md font-semibold text-gray-600">${product.price}</p>
    </div>
  </div>
);

export default ProductCard;
