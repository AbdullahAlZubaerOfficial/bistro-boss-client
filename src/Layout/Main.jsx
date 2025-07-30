import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import NavBar from '../pages/Shared/NavBar/NavBar';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

const Main = () => {
  const location = useLocation();

  // Conditional check to hide NavBar and Footer on login/signup pages
  const noHeaderFooter =
    location.pathname.includes('login') || location.pathname.includes('signup');

  return (
    <div className="min-h-screen flex flex-col bg-medical-3d  bg-gray-50 text-gray-900">
      <ScrollToTop />
      
      {/* Header */}
      {!noHeaderFooter && <NavBar />}

      {/* Main Content - flex-grow makes it take remaining space */}
      <main className=" mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
        <Outlet />
      </main>

      {/* Footer */}
      {!noHeaderFooter && <Footer />}
    </div>
  );
};

export default Main;