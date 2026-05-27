import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MetricCard = ({ icon, label, value, prefix = '', suffix = '', trend, trendLabel, color = 'cashew' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0;
    const duration = 1200;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplayValue(Math.round(numericValue * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(numericValue);
      }
    };

    animate();
  }, [inView, value]);

  const colorMap = {
    cashew: 'from-rustic/15 to-rustic/5 border-rustic/20',
    leaf: 'from-leaf/20 to-leaf/5 border-leaf/20',
    chili: 'from-chili/20 to-chili/5 border-chili/20',
    bark: 'from-bark/20 to-bark/5 border-bark/20',
  };

  const trendPositive = trend >= 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colorMap[color] || colorMap.cashew} border backdrop-blur-sm p-6`}
    >
      {/* Background decoration */}
      <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/10 blur-xl" />

      <div className="relative">
        {/* Icon */}
        <div className="text-3xl mb-3">{icon}</div>

        {/* Label */}
        <p className="text-charcoal/60 text-sm font-medium mb-1">{label}</p>

        {/* Value */}
        <p className="font-outfit font-bold text-2xl sm:text-3xl text-bark">
          {prefix}{displayValue.toLocaleString('en-IN')}{suffix}
        </p>

        {/* Trend */}
        {trend !== undefined && (
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                trendPositive
                  ? 'bg-leaf/10 text-leaf'
                  : 'bg-chili/10 text-chili'
              }`}
            >
              {trendPositive ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
            {trendLabel && (
              <span className="text-xs text-charcoal/40">{trendLabel}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MetricCard;
