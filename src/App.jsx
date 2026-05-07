import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLenis } from './hooks/useLenis';
import { CartProvider } from './lib/CartContext';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Work from './pages/Work';
import Products from './pages/Products';
import Book from './pages/Book';
import About from './pages/About';
import Quote from './pages/Quote';
import './index.css';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"         element={<Home />} />
        <Route path="/about"    element={<About />} />
        <Route path="/work"     element={<Work />} />
        <Route path="/products" element={<Products />} />
        <Route path="/quote"    element={<Quote />} />
        <Route path="/book"     element={<Book />} />
      </Routes>
    </AnimatePresence>
  );
}

function Inner() {
  useLenis();
  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Inner />
      </CartProvider>
    </BrowserRouter>
  );
}
