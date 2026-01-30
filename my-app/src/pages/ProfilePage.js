// src/pages/ProfilePage.js
import React from 'react';

const ProfilePage = ({ user, onLogout }) => {
    return (
        <div className="container mx-auto px-6 py-28 animate-fadeIn">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-gray-800 text-white flex items-center justify-center text-4xl font-bold mx-auto mb-4">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-gray-600 mt-2">Welcome to Luxe Wear!</p>
                <button
                    onClick={onLogout}
                    className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;