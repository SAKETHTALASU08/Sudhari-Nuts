import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bark text-white p-4 rounded-xl shadow-xl border border-bark/50">
        <p className="font-outfit font-semibold text-sm mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-white/70">{entry.name}:</span>
            <span className="font-semibold">
              ₹{Number(entry.value).toLocaleString('en-IN')}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const SalesChart = ({ historicalData, forecastData }) => {
  const chartData = useMemo(() => {
    // If real data is provided, merge it
    if (historicalData || forecastData) {
      const historical = (historicalData || []).map((item) => ({
        month: item.month,
        historical: item.revenue || item.sales,
        forecast: null,
      }));

      const forecast = (forecastData || []).map((item) => ({
        month: item.month,
        historical: null,
        forecast: item.predicted_revenue || item.forecast,
      }));

      // Connect the lines: last historical point should also appear in forecast
      if (historical.length > 0 && forecast.length > 0) {
        forecast[0] = {
          ...forecast[0],
          historical: historical[historical.length - 1].historical,
        };
      }

      return [...historical, ...forecast];
    }

    // Default mock data for demo
    return [
      { month: 'Jan', historical: 245000, forecast: null },
      { month: 'Feb', historical: 312000, forecast: null },
      { month: 'Mar', historical: 289000, forecast: null },
      { month: 'Apr', historical: 356000, forecast: null },
      { month: 'May', historical: 398000, forecast: null },
      { month: 'Jun', historical: 342000, forecast: null },
      { month: 'Jul', historical: 415000, forecast: null },
      { month: 'Aug', historical: 478000, forecast: null },
      { month: 'Sep', historical: 432000, forecast: null },
      { month: 'Oct', historical: 523000, forecast: null },
      { month: 'Nov', historical: 567000, forecast: null },
      { month: 'Dec', historical: 612000, forecast: null },
      { month: 'Jan*', historical: 612000, forecast: 645000 },
      { month: 'Feb*', historical: null, forecast: 690000 },
      { month: 'Mar*', historical: null, forecast: 720000 },
    ];
  }, [historicalData, forecastData]);

  return (
    <div className="bg-white rounded-2xl border border-sand/50 p-4 sm:p-6 shadow-glass">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="font-outfit font-bold text-lg text-bark">Sales Revenue</h3>
          <p className="text-charcoal/50 text-sm">Monthly sales with 3-month forecast</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-rustic rounded-full" />
            <span className="text-xs text-charcoal/50">Historical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-leaf rounded-full border-dashed" style={{ borderTop: '2px dashed #4A7C59', height: 0, width: 12 }} />
            <span className="text-xs text-charcoal/50">Forecast</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F5E6D3" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#2D2D2D80' }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#2D2D2D80' }}
            tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
            dx={-4}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={0}
            wrapperStyle={{ display: 'none' }}
          />
          <Line
            type="monotone"
            dataKey="historical"
            stroke="#D4A574"
            strokeWidth={3}
            dot={{ r: 4, fill: '#D4A574', stroke: '#fff', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#D4A574', stroke: '#fff', strokeWidth: 3 }}
            name="Historical Sales"
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#4A7C59"
            strokeWidth={3}
            strokeDasharray="8 4"
            dot={{ r: 4, fill: '#4A7C59', stroke: '#fff', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#4A7C59', stroke: '#fff', strokeWidth: 3 }}
            name="Forecast"
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
