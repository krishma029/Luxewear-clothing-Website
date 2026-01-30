import React, { useState } from 'react';

// --- SVG Icons ---
const CartIcon = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle> <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path> </svg> );

const Header = ({ onNavigate, isScrolled, isDarkHeaderPage = false, cartCount, currentUser }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const isDarkBg = isDarkHeaderPage && !isScrolled;

    const navColor = isDarkBg && !isMenuOpen ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900';
    const iconColor = isDarkBg && !isMenuOpen ? 'text-white/90 hover:text-white' : 'text-gray-700';
    const titleColor = isDarkBg && !isMenuOpen ? 'text-white' : 'text-gray-900';
    const headerBg = isScrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-lg shadow-md' : 'bg-transparent';
    const signUpButtonClass = isDarkBg && !isMenuOpen ? "bg-white/20 text-white" : "bg-gray-800 text-white";

    const navLinks = (
        <>
            <button onClick={() => { onNavigate('home'); setIsMenuOpen(false); }} className={`${navColor} transition-colors duration-200 cursor-pointer block py-2 bg-transparent border-none text-left w-full font-medium`}>Home</button>
            <button onClick={() => { onNavigate('category', 'dresses'); setIsMenuOpen(false); }} className={`${navColor} transition-colors duration-200 cursor-pointer block py-2 bg-transparent border-none text-left w-full font-medium`}>Dresses</button>
            <button onClick={() => { onNavigate('category', 'accessories'); setIsMenuOpen(false); }} className={`${navColor} transition-colors duration-200 cursor-pointer block py-2 bg-transparent border-none text-left w-full font-medium`}>Accessories</button>
            <button onClick={() => { onNavigate('category', 'footwear'); setIsMenuOpen(false); }} className={`${navColor} transition-colors duration-200 cursor-pointer block py-2 bg-transparent border-none text-left w-full font-medium`}>Footwear</button>
        </>
    );

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 
                    className={`text-3xl font-bold tracking-wider cursor-pointer transition-colors ${titleColor}`} 
                    style={{fontFamily: "'Playfair Display', serif"}}
                    onClick={() => onNavigate('home')}>
                    Luxe Wear
                </h1>
                
                <nav className="hidden lg:flex items-center space-x-8">
                    {navLinks}
                </nav>

                <div className="flex items-center space-x-6">
                    {/* Search bar removed from here */}

                    {currentUser ? (
                         <div onClick={() => onNavigate('profile')} className="cursor-pointer flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isDarkBg && !isMenuOpen ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                {currentUser.name.charAt(0).toUpperCase()}
                            </div>
                         </div>
                    ) : (
                        <div className="hidden md:flex items-center space-x-4">
                            <button onClick={() => onNavigate('login')} className={`${navColor} transition-colors duration-200 cursor-pointer text-sm font-medium bg-transparent border-none`}>Login</button>
                            <button onClick={() => onNavigate('signup')} className={`${signUpButtonClass} text-sm font-medium px-4 py-2 rounded-full transition-colors cursor-pointer border-none`}>Sign Up</button>
                        </div>
                    )}
                    
                    <button onClick={() => onNavigate('cart')} className="cursor-pointer relative bg-transparent border-none p-1">
                       <CartIcon className={`${iconColor} transition-colors`} />
                       {cartCount > 0 && (
                         <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
                       )}
                    </button>

                    <div className="lg:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${iconColor} transition-colors bg-transparent border-none p-1`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white/95 backdrop-blur-lg absolute top-full left-0 w-full px-6 pb-6 shadow-lg border-t border-gray-100">
                    <nav className="flex flex-col space-y-2 pt-4">
                        {navLinks}
                    </nav>
                     <div className="md:hidden mt-4 pt-4 border-t border-gray-200 space-y-3">
                        {currentUser ? (
                            <button onClick={() => {onNavigate('profile'); setIsMenuOpen(false);}} className={`${navColor} transition-colors duration-200 cursor-pointer text-sm font-medium block bg-transparent border-none text-left w-full`}>Profile</button>
                        ) : (
                            <>
                                <button onClick={() => {onNavigate('login'); setIsMenuOpen(false);}} className={`${navColor} transition-colors duration-200 cursor-pointer text-sm font-medium block bg-transparent border-none text-left w-full`}>Login</button>
                                <button onClick={() => {onNavigate('signup'); setIsMenuOpen(false);}} className={`bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors cursor-pointer block text-center w-full border-none`}>Sign Up</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;