export const ADMIN_WHATSAPP = '919440168385';
export const API_BASE_URL = 'http://localhost:5001/api';

export const CATEGORIES = {
  ALL: 'All',
  PREMIUM: 'Premium',
  STANDARD: 'Standard',
  ECONOMY: 'Economy',
  FLAVORED: 'Flavored',
};

export const FLAVORS = [
  'Simply Salty',
  'Tangy Chilli Garlic',
  'Pepper Onion',
  'Naturally Natural',
];

export const PRODUCT_IMAGES = {
  'W180': '/images/w180.jpg',
  'W220': '/images/w220.webp',
  'W240': 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400&h=400&fit=crop',
  'W320': 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=400&fit=crop',
  'W400': 'https://images.unsplash.com/photo-1563292769-4e05b684851a?w=400&h=400&fit=crop',
  'JH': 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop',
  '5k': 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400&h=400&fit=crop',
  '8 piece': 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=400&fit=crop',
  'Sortex nuka': 'https://images.unsplash.com/photo-1563292769-4e05b684851a?w=400&h=400&fit=crop',
  'Masala cashew': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop',
  'Pepper cashew': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop',
};

export const PRODUCTS = [
  { id: 1, name: 'W180', price: 900, category: 'Premium', has_flavors: false, description: 'King of Cashews — largest, most premium grade' },
  { id: 2, name: 'W220', price: 820, category: 'Premium', has_flavors: false, description: 'Premium large cashews with rich buttery flavor' },
  { id: 3, name: 'W240', price: 790, category: 'Premium', has_flavors: false, description: 'Popular premium grade, perfect balance of size and taste' },
  { id: 4, name: 'W320', price: 760, category: 'Standard', has_flavors: false, description: 'Most popular everyday grade, great value' },
  { id: 5, name: 'W400', price: 720, category: 'Standard', has_flavors: false, description: 'Medium-sized cashews, excellent for cooking' },
  { id: 6, name: 'JH', price: 760, category: 'Standard', has_flavors: false, description: 'Jumbo Halves — split cashews, full flavor' },
  { id: 7, name: '5k', price: 660, category: 'Economy', has_flavors: false, description: 'Quality small-piece cashews for cooking and baking' },
  { id: 8, name: '8 piece', price: 620, category: 'Economy', has_flavors: false, description: 'Multi-piece cashews, ideal for garnishing and sweets' },
  { id: 9, name: 'Sortex nuka', price: 490, category: 'Economy', has_flavors: false, description: 'Budget-friendly sorted cashew pieces' },
  { id: 10, name: 'Masala cashew', price: 1000, category: 'Flavored', has_flavors: true, description: 'Spiced and roasted to perfection with Indian masala' },
  { id: 11, name: 'Pepper cashew', price: 1000, category: 'Flavored', has_flavors: true, description: 'Bold black pepper seasoned premium cashews' },
];

export const CATEGORY_MAP = {
  'All': PRODUCTS,
  'Premium': PRODUCTS.filter(p => p.category === 'Premium'),
  'Standard': PRODUCTS.filter(p => p.category === 'Standard'),
  'Economy': PRODUCTS.filter(p => p.category === 'Economy'),
  'Flavored': PRODUCTS.filter(p => p.category === 'Flavored'),
};
