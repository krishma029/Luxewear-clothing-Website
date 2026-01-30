// src/GlobalStyles.js
import React from 'react';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
    
    @keyframes kenburns {
      0% { transform: scale(1.05) translate(2%, -1%); }
      100% { transform: scale(1) translate(0, 0); }
    }
    .ken-burns-effect { animation: kenburns 10s ease-out forwards; }

    .horizontal-scroll::-webkit-scrollbar { height: 4px; }
    .horizontal-scroll::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
    .horizontal-scroll::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; }
    .horizontal-scroll::-webkit-scrollbar-thumb:hover { background: #555; }

    @keyframes fadeInScaleUp { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
    @keyframes slideInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes backgroundPan { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

    .anim-background-pan { animation: backgroundPan 15s ease infinite; }
    .anim-fade-in-scale { animation: fadeInScaleUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
    .anim-slide-in-down-1 { animation: slideInDown 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s forwards; opacity: 0; }
    .anim-slide-in-down-2 { animation: slideInDown 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards; opacity: 0; }
    .anim-slide-in-up-1 { animation: slideInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards; opacity: 0; }
    .anim-slide-in-up-2 { animation: slideInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards; opacity: 0; }
    .anim-slide-in-up-3 { animation: slideInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s forwards; opacity: 0; }
    .anim-slide-in-up-4 { animation: slideInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s forwards; opacity: 0; }
    .anim-fade-in-delay { animation: fadeIn 0.6s ease-in 0.7s forwards; opacity: 0; }
    .animate-fadeIn { animation: fadeIn 0.5s ease-in-out forwards; }

    .product-card-enter {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    }
    .product-card-enter-active {
      opacity: 1;
      transform: translateY(0);
    }

    /* --- ✨ Starry Blue Gradient Background --- */
    @keyframes starry-pan-subtle {
      0% { background-position: 0% 0%; }
      100% { background-position: 10% 10%; }
    }
    @keyframes star-fade {
      0%, 100% { opacity: 0.9; }
      50% { opacity: 0.7; }
    }

    .animated-gradient {
      background-color: #001f4e;
      background-image:
        url('data:image/svg+xml;charset=UTF-8,%3Csvg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="7.5" cy="7.5" r="0.8" fill="rgba(255,255,255,0.25)"/%3E%3C/svg%3E') 0 0 / 15px 15px repeat,
        url('data:image/svg+xml;charset=UTF-8,%3Csvg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="15" cy="15" r="1.2" fill="rgba(255,255,255,0.35)"/%3E%3C/svg%3E') 0 0 / 30px 30px repeat,
        url('data:image/svg+xml;charset=UTF-8,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="30" cy="30" r="1.8" fill="rgba(255,255,255,0.45)"/%3E%3C/svg%3E') 0 0 / 60px 60px repeat,
        linear-gradient(to bottom, #001f4e 0%, #004d99 100%);
      background-size: 200px 200px, 400px 400px, 800px 800px, cover;
      animation: starry-pan-subtle 40s linear infinite alternate, star-fade 6s ease-in-out infinite alternate;
      background-blend-mode: screen;
    }

    /* --- ✨ Luxe Buttons with Matching Colors --- */
    .luxe-btn {
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease-out;
      border-radius: 8px;
      padding: 0.75rem 1.25rem;
      font-weight: 600;
      font-family: 'Playfair Display', serif;
      color: #FAF9F6; /* Ivory text */
      background: linear-gradient(135deg, #0A2540, #1B3A57); /* Deep navy */
      border: none;
      cursor: pointer;
    }

    .luxe-btn .btn-text {
      position: relative;
      z-index: 2;
    }

    /* Gold shimmer sweep */
    .luxe-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent);
      transition: all 0.5s ease-out;
      z-index: 1;
    }

    .luxe-btn:hover::before {
      left: 100%;
    }

    /* Buy Now variant (rose) */
    .luxe-btn.buy-now {
      background: linear-gradient(135deg, #B76E79, #8B3A45);
    }
  `}</style>
);

export default GlobalStyles;
