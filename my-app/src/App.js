import React, { useState, useEffect, useCallback } from 'react';

// Import all your components and pages
import GlobalStyles from './GlobalStyles';
import Header from './Header';
import Footer from './Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import VirtualStylistPage from './pages/VirtualStylistPage';

export default function App() {
  const [page, setPage] = useState({ name: 'home', params: null });
  const [isScrolled, setIsScrolled] = useState(false);
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // -------------------- Auth --------------------
  const handleLogin = (user) => {
    setCurrentUser(user);
  };
  const handleLogout = () => {
    setCurrentUser(null);
    navigate('home');
  };

  // -------------------- Cart Logic --------------------
  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      if (prevCart.find((item) => item.id === productToAdd.id)) {
        return prevCart; // prevent duplicates
      }
      return [...prevCart, productToAdd];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // -------------------- Scroll Effect --------------------
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // -------------------- Navigation --------------------
  const navigate = useCallback((pageName, params = null) => {
    setPage({ name: pageName, params: params });
    if (pageName !== 'home') {
      window.scrollTo(0, 0);
    }
  }, []);

  // -------------------- Page Renderer --------------------
  const renderPage = () => {
    switch (page.name) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'category':
        return (
          <CategoryPage
            onNavigate={navigate}
            category={page.params}
            onAddToCart={handleAddToCart}
          />
        );
      case 'product':
        return (
          <ProductDetailPage
            productId={page.params}
            onAddToCart={handleAddToCart}
          />
        );
      case 'login':
        return <LoginPage onNavigate={navigate} onLogin={handleLogin} />;
      case 'signup':
        return <SignUpPage onNavigate={navigate} onLogin={handleLogin} />;
      case 'search':
        return <SearchPage query={page.params} onNavigate={navigate} />;
      case 'cart':
        return (
          <CartPage
            cartItems={cart}
            onRemoveFromCart={handleRemoveFromCart}
            onNavigate={navigate}
          />
        );
      case 'profile':
        return currentUser ? (
          <ProfilePage user={currentUser} onLogout={handleLogout} />
        ) : (
          <LoginPage onNavigate={navigate} onLogin={handleLogin} />
        );
      case 'stylist':
        return <VirtualStylistPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  // -------------------- Header/Footer Conditions --------------------
  const isDarkHeaderPage = page.name === 'home' || page.name === 'category';
  const isAuthPage = page.name === 'login' || page.name === 'signup';

  return (
    <div className="bg-white font-sans">
      <GlobalStyles />
      {!isAuthPage && (
        <Header
          onNavigate={navigate}
          isScrolled={isScrolled}
          isDarkHeaderPage={isDarkHeaderPage}
          cartCount={cart.length}
          currentUser={currentUser}
        />
      )}

      <main>{renderPage()}</main>
      {!isAuthPage && <Footer />}
    </div>
  );
}