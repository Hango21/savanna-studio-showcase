import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Preloader from './Preloader';
import ScrollToTop from './ScrollToTop';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Preloader />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </div>
      <ScrollToTop />
    </>
  );
};

export default Layout;
