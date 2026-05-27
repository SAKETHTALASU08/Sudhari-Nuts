/**
 * Forecasting Utilities
 * Simple Moving Average & Linear Regression for sales predictions.
 */

/**
 * Simple Moving Average
 * @param {number[]} data  — array of numeric values
 * @param {number} window  — number of periods to average
 * @returns {number[]}     — SMA values (length = data.length - window + 1)
 */
function simpleMovingAverage(data, window = 3) {
  if (data.length < window) return [];

  const result = [];
  for (let i = 0; i <= data.length - window; i++) {
    const slice = data.slice(i, i + window);
    const avg = slice.reduce((sum, v) => sum + v, 0) / window;
    result.push(Math.round(avg * 100) / 100);
  }
  return result;
}

/**
 * Linear Regression (Ordinary Least Squares)
 * Fits y = slope * x + intercept to the given data.
 *
 * @param {number[]} yValues — dependent variable values
 * @returns {{ slope: number, intercept: number, predict: (x: number) => number }}
 */
function linearRegression(yValues) {
  const n = yValues.length;
  if (n === 0) return { slope: 0, intercept: 0, predict: () => 0 };

  // x values are simply 1, 2, 3, ... n (time periods)
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

  for (let i = 0; i < n; i++) {
    const x = i + 1;
    const y = yValues[i];
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
  }

  const denominator = n * sumX2 - sumX * sumX;
  const slope = denominator !== 0
    ? (n * sumXY - sumX * sumY) / denominator
    : 0;
  const intercept = (sumY - slope * sumX) / n;

  return {
    slope: Math.round(slope * 100) / 100,
    intercept: Math.round(intercept * 100) / 100,
    predict: (x) => Math.round((slope * x + intercept) * 100) / 100
  };
}

/**
 * Generate a 3-month forecast from historical monthly revenue data.
 *
 * Uses Linear Regression on the full dataset for trend,
 * and blends with a 3-month SMA for smoothing.
 *
 * @param {Array<{ month: string, revenue: number }>} monthlyData
 * @returns {Array<{ month: string, predicted_revenue: number }>}
 */
function generateForecast(monthlyData) {
  if (!monthlyData || monthlyData.length < 3) {
    return [];
  }

  const revenues = monthlyData.map((d) => d.revenue);
  const n = revenues.length;

  // Linear regression on the full series
  const lr = linearRegression(revenues);

  // 3-month SMA for the last available window
  const sma = simpleMovingAverage(revenues, 3);
  const lastSma = sma.length > 0 ? sma[sma.length - 1] : revenues[n - 1];

  // Upcoming month labels
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Determine starting month for forecast
  // Assumes monthlyData is ordered chronologically; last entry is most recent
  const lastMonth = monthlyData[n - 1].month;
  const lastMonthIdx = monthNames.indexOf(lastMonth);

  const forecast = [];
  for (let i = 1; i <= 3; i++) {
    const futureX = n + i;
    const lrPrediction = lr.predict(futureX);

    // Blend: 60% linear regression trend + 40% SMA baseline
    const blended = Math.round((0.6 * lrPrediction + 0.4 * lastSma) * 100) / 100;

    // Ensure non-negative
    const predicted = Math.max(0, blended);

    const monthIdx = (lastMonthIdx + i) % 12;
    const year = lastMonthIdx + i > 11 ? 2025 : 2024;

    forecast.push({
      month: `${monthNames[monthIdx]} ${year}`,
      predicted_revenue: predicted
    });
  }

  return forecast;
}

module.exports = {
  simpleMovingAverage,
  linearRegression,
  generateForecast
};
