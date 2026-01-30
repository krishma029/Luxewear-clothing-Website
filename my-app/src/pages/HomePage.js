// src/pages/HomePage.js
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { mockProducts } from '../mockData';
import ProductCard from '../ProductCard';

const HomePage = ({ onNavigate }) => {
    const collectionsRef = useRef(null);
    const newArrivalsRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationState, setAnimationState] = useState('entering');

    const handleScrollToCategories = () => {
        collectionsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const collections = useMemo(() => [
        { title: "The Summer Edit", subtitle: "Light, airy, and effortlessly chic.", imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" },
        { title: "Evening Elegance", subtitle: "Own the night with timeless sophistication.", imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000&auto=format&fit=crop" }
    ], []);

    useEffect(() => {
        const slideDuration = 5000;
        const animationOutDuration = 1000;
        const interval = setInterval(() => {
            setAnimationState('exiting');
            setTimeout(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % collections.length);
                setAnimationState('entering');
            }, animationOutDuration);
        }, slideDuration);
        return () => clearInterval(interval);
    }, [collections.length]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.product-card-enter');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('product-card-enter-active');
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        if (newArrivalsRef.current) {
            observer.observe(newArrivalsRef.current);
        }

        return () => {
            if (newArrivalsRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(newArrivalsRef.current);
            }
        };
    }, []);

    const currentCollection = collections[currentIndex];

    const categoryNavData = [
        { name: 'Dresses', key: 'dresses', imageUrl: '/images/D2.jpg' },

        { name: 'Footwear', key: 'footwear', imageUrl: '/images/Foot.jpg' },
        { name: 'Purse', imageUrl: '/images/Purse.png' },
    ];

    return (
        <div className="min-h-screen">
            <div className="relative h-screen flex items-center justify-center text-white overflow-hidden">
                <div className="absolute inset-0 overflow-hidden" key={currentIndex}>
                    <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ken-burns-effect"
                        style={{ backgroundImage: `url(${currentCollection.imageUrl})`, opacity: animationState === 'entering' ? 1 : 0 }}
                    />
                </div>
                <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
                <div className="relative z-20 text-center px-4">
                    <div className={`transition-all duration-1000 ease-in-out ${animationState === 'entering' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
                        <h1 className="text-4xl sm:text-5xl md:text-8xl font-extrabold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{currentCollection.title}</h1>
                        <p className="mt-4 text-md sm:text-lg md:text-2xl max-w-2xl mx-auto">{currentCollection.subtitle}</p>
                    </div>
                    <button onClick={handleScrollToCategories} className="mt-8 px-8 py-4 bg-white/90 text-gray-900 font-semibold rounded-full text-lg hover:bg-white transform hover:scale-105 transition-transform duration-300 shadow-lg">
                        Explore The Collection
                    </button>
                </div>
            </div>

            <div ref={collectionsRef} className="py-20 bg-white border-b border-gray-200">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                        {categoryNavData.map(({ name, key, imageUrl }) => (
                            <div key={key} onClick={() => onNavigate('category', key)} className="flex flex-col items-center space-y-4 cursor-pointer group">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-gray-900 transition-all duration-300 transform group-hover:scale-110 shadow-lg group-hover:shadow-2xl group-hover:shadow-gray-400/60">
                                    <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-base font-medium text-gray-600 group-hover:text-gray-900 transition-colors">{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">New Arrivals</h2>
                    <div ref={newArrivalsRef} className="flex space-x-8 pb-4 horizontal-scroll overflow-x-auto">
                        {[...mockProducts.dresses, ...mockProducts.tops].slice(0, 6).map((product, index) => (
                            <div key={product.id} className="flex-shrink-0 w-64 sm:w-72">
                                <ProductCard product={product} onNavigate={onNavigate} index={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;