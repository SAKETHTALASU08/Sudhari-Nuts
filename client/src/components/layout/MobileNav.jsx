import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MobileNav = ({ isOpen, onClose, navLinks }) => {
  const location = useLocation();

  const icons = {
    '/': '🏠',
    '/shop': '🛒',
    '/bulk-order': '🏢',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] sm:w-[320px] bg-cream z-[70] shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-sand">
                <Link to="/" onClick={onClose} className="flex items-center gap-2">
                  <span className="font-serif font-bold text-xl text-bark">
                    Sudhari Nuts
                  </span>
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-sand/50 transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-5 h-5 text-charcoal/70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 p-5 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-inter font-medium transition-all duration-300 ${
                        location.pathname === link.path
                          ? 'bg-rustic/10 text-rustic border-l-4 border-rustic'
                          : 'text-charcoal/70 hover:bg-sand/50 hover:text-bark'
                      }`}
                    >
                      <span className="text-lg">
                        {icons[link.path] || '📄'}
                      </span>
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    to="/login"
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-inter font-medium text-charcoal/70 hover:bg-sand/50 hover:text-bark transition-all duration-300"
                  >
                    <span className="text-lg">🔐</span>
                    Admin Login
                  </Link>
                </motion.div>
              </nav>

              {/* Footer */}
              <div className="p-5 border-t border-sand">
                <p className="text-xs text-charcoal/40 text-center">
                  © 2026 Sudhari Nuts
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
