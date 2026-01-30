// src/Footer.js
import React from 'react';

const Footer = () => (
    <footer className="bg-gray-900 text-gray-400">
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Luxe Wear</h3>
                    <p>Defining elegance and style for the modern woman.</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white">New Arrivals</a></li>
                        <li><a href="#" className="hover:text-white">Dresses</a></li>
                        <li><a href="#" className="hover:text-white">Accessories</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white">Our Story</a></li>
                        <li><a href="#" className="hover:text-white">Careers</a></li>
                        <li><a href="#" className="hover:text-white">Sustainability</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Stay Connected</h3>
                    <p className="mb-4">Get 10% off your first order when you sign up.</p>
                    <div className="flex">
                        <input type="email" placeholder="Your email" className="w-full px-4 py-2 rounded-l-md bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500" />
                        <button className="bg-white text-gray-900 px-4 py-2 rounded-r-md hover:bg-gray-200 font-semibold">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Luxe Wear. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;