import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { exportReport } from '../../services/api';

const ExportButton = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(null);

  const handleExport = async (format) => {
    setLoading(format);
    try {
      const data = await exportReport(format);
      const blob = new Blob([data], {
        type: format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sudhari-report.${format === 'csv' ? 'csv' : 'xlsx'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setLoading(null);
      setOpen(false);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-bark text-white font-outfit font-semibold text-sm rounded-xl hover:bg-bark/90 shadow-bark hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export Report
        <svg className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-glass-lg border border-sand/50 overflow-hidden z-20"
          >
            <button
              onClick={() => handleExport('csv')}
              disabled={loading === 'csv'}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-charcoal hover:bg-sand/30 transition-colors duration-200 disabled:opacity-50"
            >
              {loading === 'csv' ? (
                <svg className="w-4 h-4 animate-spin text-leaf" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <span className="text-leaf text-base">📄</span>
              )}
              <span className="font-medium">Export CSV</span>
            </button>
            <div className="border-t border-sand/30" />
            <button
              onClick={() => handleExport('excel')}
              disabled={loading === 'excel'}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-charcoal hover:bg-sand/30 transition-colors duration-200 disabled:opacity-50"
            >
              {loading === 'excel' ? (
                <svg className="w-4 h-4 animate-spin text-leaf" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <span className="text-leaf text-base">📊</span>
              )}
              <span className="font-medium">Export Excel</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click-outside to close */}
      {open && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default ExportButton;
