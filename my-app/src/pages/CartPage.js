// src/pages/CartPage.js
import React from 'react';

const CartPage = ({ cartItems, onRemoveFromCart, onNavigate }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div className="container mx-auto px-6 py-28 animate-fadeIn">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>Your cart is empty.</p>
                    <button onClick={() => onNavigate('home')} className="mt-4 px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700">Continue Shopping</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-md">
                                <img src={item.imageUrl} alt={item.name} className="w-24 h-32 object-cover rounded-md"/>
                                <div className="ml-4 flex-grow">
                                    <h2 className="font-bold text-lg">{item.name}</h2>
                                    <p className="text-gray-600">${item.price}</p>
                                </div>
                                <button onClick={() => onRemoveFromCart(item.id)} className="text-red-500 hover:text-red-700 font-semibold">Remove</button>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md h-fit">
                        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span>Shipping</span>
                            <span>FREE</span>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <button className="mt-6 w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700">Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;