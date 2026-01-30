// src/pages/SignUpPage.js
import React, { useState } from 'react';
import AuthPageWrapper from '../AuthPageWrapper';
import { signup } from '../services/authService'; // 1. Import your service

const SignUpPage = ({ onNavigate, onLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // 2. Add password state

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (name.trim() && email.trim() && password.trim()) {
        const result = await signup({ 
            name: name.trim(), 
            email: email.trim(), 
            password: password.trim() 
        });

        if (result.success) {
            // Check if result.user exists before accessing .id
            const userData = {
                name: name.trim(),
                email: email.trim(),
                id: result.user ? result.user.id : null // Safe check
            };
            
            onLogin(userData);
            onNavigate('home');
        } else {
            alert(result.message);
        }
    }
};

    return (
        <AuthPageWrapper title="Create an Account" subtitle="Join the Luxe Wear family for exclusive offers." image="https://images.unsplash.com/photo-1551821738-8148b5a0a9a3?q=80&w=1887&auto=format&fit=crop" onNavigate={onNavigate} >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="anim-slide-in-up-1"> 
                    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 bg-white/10 rounded-lg text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50" /> 
                </div>
                <div className="anim-slide-in-up-2"> 
                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-white/10 rounded-lg text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50" /> 
                </div>
                <div className="anim-slide-in-up-3"> 
                    {/* 7. Connect password value and onChange */}
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 bg-white/10 rounded-lg text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50" /> 
                </div>
                <div className="anim-slide-in-up-4">
                    <button type="submit" className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors" > Create Account </button>
                </div>
            </form>
            <p className="text-center text-white/60 text-sm mt-6 anim-fade-in-delay"> Already have an account? <button onClick={() => onNavigate('login')} className="font-semibold underline hover:text-white cursor-pointer bg-transparent border-none">Login</button> </p>
        </AuthPageWrapper>
    );
};

export default SignUpPage;