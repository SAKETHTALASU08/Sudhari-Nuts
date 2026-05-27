import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: add JWT token
api.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem('auth-storage');
    if (stored) {
      try {
        const { state } = JSON.parse(stored);
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      } catch (e) {
        // ignore parse errors
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const getMe = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};

// Products
export const getProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

// Sales
export const getSalesSummary = async () => {
  const { data } = await api.get('/sales/summary');
  return data;
};

export const getMonthlySales = async () => {
  const { data } = await api.get('/sales/monthly');
  return data;
};

// Forecast
export const getForecast = async () => {
  const { data } = await api.get('/forecast');
  return data;
};

// Inventory
export const getInventory = async () => {
  const { data } = await api.get('/inventory');
  return data;
};

// Export
export const exportReport = async (format = 'csv') => {
  const { data } = await api.get(`/export?format=${format}`, {
    responseType: 'blob',
  });
  return data;
};

export default api;
