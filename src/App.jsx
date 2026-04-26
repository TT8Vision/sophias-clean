import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLenis } from './hooks/useLenis';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import Home from './pages/Home';
import Work from './pages/Work';
import Products from './pages/Products';
import Book from './pages/Book';
import './index.css';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"         element={<Home />} />
        <Route path="/work"     element={<Work />} />
        <Route path="/products" element={<Products />} />
        <Route path="/book"     element={<Book />} />
      </Routes>
    </AnimatePresence>
  );
}

function Inner() {
  useLenis();
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Inner />
    </BrowserRouter>
  );
}
