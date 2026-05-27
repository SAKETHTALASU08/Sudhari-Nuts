import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../../utils/constants';

const InventoryTable = ({ inventoryData }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  const data = useMemo(() => {
    if (inventoryData && inventoryData.length > 0) return inventoryData;

    // Default mock data
    return PRODUCTS.map((p) => ({
      name: p.name,
      current_stock: Math.floor(Math.random() * 200) + 20,
      sold: Math.floor(Math.random() * 500) + 50,
    }));
  }, [inventoryData]);

  const getStatus = (stock) => {
    if (stock > 100) return { label: 'In Stock', color: 'badge-success' };
    if (stock >= 50) return { label: 'Low Stock', color: 'badge-warning' };
    return { label: 'Critical', color: 'badge-danger' };
  };

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortField, sortDir]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ field }) => (
    <span className="inline-flex ml-1 text-[10px]">
      {sortField === field ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  );

  return (
    <div className="bg-white rounded-2xl border border-sand/50 shadow-glass overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-sand/50">
        <h3 className="font-outfit font-bold text-lg text-bark">Inventory Status</h3>
        <p className="text-charcoal/50 text-sm">Current stock levels by product</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-sand/20">
              <th
                onClick={() => handleSort('name')}
                className="text-left px-4 sm:px-6 py-3.5 text-xs font-semibold text-charcoal/60 uppercase tracking-wider cursor-pointer hover:text-bark transition-colors"
              >
                Product <SortIcon field="name" />
              </th>
              <th
                onClick={() => handleSort('current_stock')}
                className="text-right px-4 sm:px-6 py-3.5 text-xs font-semibold text-charcoal/60 uppercase tracking-wider cursor-pointer hover:text-bark transition-colors"
              >
                Stock (kg) <SortIcon field="current_stock" />
              </th>
              <th
                onClick={() => handleSort('sold')}
                className="text-right px-4 sm:px-6 py-3.5 text-xs font-semibold text-charcoal/60 uppercase tracking-wider cursor-pointer hover:text-bark transition-colors"
              >
                Sold (kg) <SortIcon field="sold" />
              </th>
              <th className="text-center px-4 sm:px-6 py-3.5 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand/30">
            {sorted.map((item, index) => {
              const status = getStatus(item.current_stock);
              return (
                <motion.tr
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-sand/10 transition-colors duration-200"
                >
                  <td className="px-4 sm:px-6 py-4">
                    <span className="font-inter font-semibold text-sm text-bark">
                      {item.name}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right">
                    <span className="font-inter text-sm text-charcoal/70 font-medium">
                      {item.current_stock}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right">
                    <span className="font-inter text-sm text-charcoal/70 font-medium">
                      {item.sold}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-center">
                    <span className={status.color}>
                      {status.label}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
