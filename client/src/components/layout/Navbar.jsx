import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../../store/cartStore';
import MobileNav from './MobileNav';
import CartSlideout from '../storefront/CartSlideout';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isDashboard = location.pathname.startsWith('/dashboard');
  if (isDashboard) return null;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Bulk Orders', path: '/bulk-order' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream/90 backdrop-blur-xl shadow-glass border-b border-sand/50'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-app">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo — Dark serif style matching the reference image */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-serif font-bold text-2xl sm:text-[28px] text-bark tracking-wide group-hover:text-rustic transition-colors duration-300">
                Sudhari Nuts
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-lg font-inter font-medium text-sm transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-rustic bg-rustic/5'
                      : 'text-charcoal/70 hover:text-bark hover:bg-sand/30'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-rustic rounded-full"
                    />
                  )}
                </Link>
              ))}

              <Link
                to="/login"
                className="px-4 py-2 rounded-lg font-inter font-medium text-sm text-charcoal/70 hover:text-bark hover:bg-sand/30 transition-all duration-300"
              >
                Admin
              </Link>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Cart button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-xl hover:bg-sand/50 transition-all duration-300 group"
                aria-label="Open cart"
              >
                <svg
                  className="w-6 h-6 text-charcoal/70 group-hover:text-bark transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rustic text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm"
                    >
                      {itemCount > 9 ? '9+' : itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2.5 rounded-xl hover:bg-sand/50 transition-all duration-300"
                aria-label="Open menu"
              >
                <svg
                  className="w-6 h-6 text-charcoal/70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />

      {/* Cart Slideout */}
      <CartSlideout isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
