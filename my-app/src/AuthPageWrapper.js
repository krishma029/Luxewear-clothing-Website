// src/AuthPageWrapper.js
import React from 'react';

const AuthPageWrapper = ({ children, title, subtitle, image, onNavigate }) => (
    <div className="relative min-h-screen bg-gray-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 ken-burns-effect" style={{ backgroundImage: `url(${image})` }} ></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-gray-800 to-black anim-background-pan" style={{ backgroundSize: '200% 200%' }}></div>
        <div className="relative z-10 flex flex-col justify-center items-center min-h-screen p-4 overflow-hidden">
            <div className="w-full max-w-md p-8 md:p-12 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 anim-fade-in-scale" >
                <h1 className="text-4xl font-bold text-white text-center mb-2 anim-slide-in-down-1" style={{ fontFamily: "'Playfair Display', serif" }} > {title} </h1>
                <p className="text-white/70 text-center mb-8 anim-slide-in-down-2">{subtitle}</p>
                {children}
            </div>
            <p className="text-white/60 text-sm mt-8 anim-fade-in-delay">
                Return to <a onClick={() => onNavigate('home')} className="underline hover:text-white cursor-pointer">shopping</a>
            </p>
        </div>
    </div>
);

export default AuthPageWrapper;