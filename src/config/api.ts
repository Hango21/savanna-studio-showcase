// API Configuration
// All API URLs are centralized here for easy modification

export const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

export const API_ENDPOINTS = {
  // Auth
  login: `${API_BASE_URL}/api/auth/login`,

  // Slides
  slides: `${API_BASE_URL}/api/slides`,
  slideById: (id: string) => `${API_BASE_URL}/api/slides/${id}`,

  // Photos
  photos: `${API_BASE_URL}/api/photos`,
  photoById: (id: string) => `${API_BASE_URL}/api/photos/${id}`,
  photosByCategory: (categoryId: string) => `${API_BASE_URL}/api/photos?category=${categoryId}`,

  // Categories
  categories: `${API_BASE_URL}/api/categories`,
  categoryById: (id: string) => `${API_BASE_URL}/api/categories/${id}`,

  // Settings
  settings: `${API_BASE_URL}/api/settings`,
  settingByKey: (key: string) => `${API_BASE_URL}/api/settings/${key}`,
};

// Auth helpers
export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('token');
};

export const getAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
