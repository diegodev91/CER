const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://cer-backend.lemonbeach-6b713b41.eastus.azurecontainerapps.io/api' 
    : 'http://localhost:5001/api');

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// API endpoints
export const endpoints = {
  episodes: {
    getAll: '/episodes',
    getById: (id) => `/episodes/${id}`,
    getSeasons: '/episodes/seasons/list',
  },
  news: {
    getAll: '/news',
    getById: (id) => `/news/${id}`,
    getBySlug: (slug) => `/news/slug/${slug}`,
  },
  shop: {
    getAll: '/shop',
    getById: (id) => `/shop/${id}`,
    getCategories: '/shop/categories',
  },
  comments: {
    getByContent: (type, id) => `/comments/${type}/${id}`,
    create: '/comments',
  },
  admin: {
    dashboard: '/admin/dashboard',
    episodes: '/admin/episodes',
    news: '/admin/news',
    products: '/admin/products',
  },
};

export default API_BASE_URL;
