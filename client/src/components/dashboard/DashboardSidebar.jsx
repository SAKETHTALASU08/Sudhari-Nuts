import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { id: 'overview', label: 'Overview', icon: '📊', path: '/dashboard' },
  { id: 'sales', label: 'Sales Analytics', icon: '📈', path: '/dashboard' },
  { id: 'inventory', label: 'Inventory', icon: '📦', path: '/dashboard' },
  { id: 'reports', label: 'Reports', icon: '📋', path: '/dashboard' },
];

const DashboardSidebar = ({ activeTab, onTabChange }) => {
  const location = useLocation();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-bark fixed left-0 top-0 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🥜</span>
            <span className="font-outfit font-bold text-xl text-white">
              Sudhari <span className="text-rustic">Nuts</span>
            </span>
          </Link>
          <p className="text-white/40 text-xs mt-1 font-inter">Admin Dashboard</p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-inter text-sm font-medium transition-all duration-300 relative ${
                  isActive
                    ? 'bg-rustic/15 text-rustic'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-rustic rounded-r-full"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 text-sm font-inter transition-all duration-300"
          >
            <span>🏠</span>
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-sand shadow-glass z-40">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl min-w-[60px] transition-all duration-300 ${
                  isActive
                    ? 'text-bark bg-rustic/10'
                    : 'text-charcoal/40'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-[10px] font-medium">{item.label.split(' ')[0]}</span>
                {isActive && (
                  <motion.div
                    layoutId="tab-active"
                    className="absolute bottom-0 w-8 h-0.5 bg-rustic rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default DashboardSidebar;
