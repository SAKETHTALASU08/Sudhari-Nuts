import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import MetricCard from '../components/dashboard/MetricCard';
import SalesChart from '../components/dashboard/SalesChart';
import InventoryTable from '../components/dashboard/InventoryTable';
import ExportButton from '../components/dashboard/ExportButton';
import { getSalesSummary, getMonthlySales, getForecast, getInventory } from '../services/api';

const SkeletonCard = () => (
  <div className="rounded-2xl p-6 bg-sand/20 border border-sand/30">
    <div className="skeleton h-8 w-8 rounded-lg mb-3" />
    <div className="skeleton h-4 w-20 rounded mb-2" />
    <div className="skeleton h-8 w-32 rounded mb-2" />
    <div className="skeleton h-4 w-16 rounded" />
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [monthlySales, setMonthlySales] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [inventory, setInventory] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [summaryRes, monthlyRes, forecastRes, inventoryRes] = await Promise.allSettled([
          getSalesSummary(),
          getMonthlySales(),
          getForecast(),
          getInventory(),
        ]);

        if (summaryRes.status === 'fulfilled') setSummary(summaryRes.value);
        if (monthlyRes.status === 'fulfilled') setMonthlySales(monthlyRes.value);
        if (forecastRes.status === 'fulfilled') setForecast(forecastRes.value);
        if (inventoryRes.status === 'fulfilled') setInventory(inventoryRes.value);
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // Default metrics from API or fallback mock data
  const metrics = summary || {
    total_revenue: 4523400,
    total_cost: 3142800,
    profit_margin: 30.5,
    total_orders: 847,
  };

  return (
    <div className="min-h-screen bg-cream">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen pb-24 lg:pb-8">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-cream/80 backdrop-blur-xl border-b border-sand/50">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <div>
              <h1 className="font-outfit font-bold text-xl sm:text-2xl text-bark">
                Welcome back, {user?.name || 'Admin'} 👋
              </h1>
              <p className="text-charcoal/50 text-sm hidden sm:block">
                Here's your store performance overview
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ExportButton />
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-charcoal/60 hover:text-chili bg-white border border-sand/50 rounded-xl hover:border-chili/30 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              <>
                <MetricCard
                  icon="💰"
                  label="Total Revenue"
                  value={metrics.total_revenue}
                  prefix="₹"
                  trend={12.5}
                  trendLabel="vs last month"
                  color="cashew"
                />
                <MetricCard
                  icon="📦"
                  label="Total Cost"
                  value={metrics.total_cost}
                  prefix="₹"
                  trend={-3.2}
                  trendLabel="vs last month"
                  color="bark"
                />
                <MetricCard
                  icon="📈"
                  label="Profit Margin"
                  value={typeof metrics.profit_margin === 'number' ? metrics.profit_margin : 30}
                  suffix="%"
                  trend={5.8}
                  trendLabel="vs last month"
                  color="leaf"
                />
                <MetricCard
                  icon="🛒"
                  label="Total Orders"
                  value={metrics.total_orders}
                  trend={18.2}
                  trendLabel="vs last month"
                  color="chili"
                />
              </>
            )}
          </div>

          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {loading ? (
              <div className="bg-white rounded-2xl border border-sand/50 p-6 shadow-glass">
                <div className="skeleton h-6 w-40 rounded mb-2" />
                <div className="skeleton h-4 w-60 rounded mb-6" />
                <div className="skeleton h-[320px] w-full rounded-xl" />
              </div>
            ) : (
              <SalesChart
                historicalData={monthlySales?.data || monthlySales}
                forecastData={forecast?.data || forecast}
              />
            )}
          </motion.div>

          {/* Inventory Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {loading ? (
              <div className="bg-white rounded-2xl border border-sand/50 p-6 shadow-glass">
                <div className="skeleton h-6 w-40 rounded mb-2" />
                <div className="skeleton h-4 w-60 rounded mb-6" />
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex gap-4 mb-3">
                    <div className="skeleton h-4 w-24 rounded" />
                    <div className="skeleton h-4 w-16 rounded" />
                    <div className="skeleton h-4 w-16 rounded" />
                    <div className="skeleton h-4 w-20 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <InventoryTable inventoryData={inventory?.data || inventory} />
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
