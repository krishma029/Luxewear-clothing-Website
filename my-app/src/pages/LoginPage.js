// src/pages/LoginPage.js
import React, { useState } from 'react';
import AuthPageWrapper from '../AuthPageWrapper';
import { login } from '../services/authService'; // 1. Import the login service

const LoginPage = ({ onNavigate, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // 2. Add password state

    const handleSubmit = async (e) => { // 3. Make this async
        e.preventDefault();
        
        if (email.trim() && password.trim()) {
            // 4. Call the backend via authService
            const result = await login({ 
                email: email.trim(), 
                password: password.trim() 
            });

            if (result.success) {
                // 5. Store the token and real user data returned from MongoDB
                localStorage.setItem('token', result.token); 
                onLogin(result.user); 
                onNavigate('home');
            } else {
                // 6. Handle errors like "Invalid Credentials"
                alert(result.message);
            }
        }
    };

    return (
        <AuthPageWrapper 
            title="Welcome Back" 
            subtitle="Log in to access your account and orders." 
            image="https://images.unsplash.com/photo-1576016353245-04c70019e06a?q=80&w=1887&auto=format&fit=crop" 
            onNavigate={onNavigate} 
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="anim-slide-in-up-1"> 
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="w-full px-4 py-3 bg-white/10 rounded-lg text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50" 
                    /> 
                </div>
                <div className="anim-slide-in-up-2"> 
                    {/* 7. Connect password value and onChange */}
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        className="w-full px-4 py-3 bg-white/10 rounded-lg text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50" 
                    /> 
                </div>
                <div className="anim-slide-in-up-3">
                    <button 
                        type="submit" 
                        className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors" 
                    > 
                        Login 
                    </button>
                </div>
            </form>
            <p className="text-center text-white/60 text-sm mt-6 anim-fade-in-delay"> 
                Don't have an account? 
                <button 
                    onClick={() => onNavigate('signup')} 
                    className="font-semibold underline hover:text-white cursor-pointer bg-transparent border-none"
                >
                    Sign Up
                </button> 
            </p>
        </AuthPageWrapper>
    );
};

export default LoginPage;