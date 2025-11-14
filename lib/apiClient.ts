// API Client for mobile app - calls remote API server
// For APK build, API routes need to be hosted separately

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}/api${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

// Product API
export const productAPI = {
  getAll: () => apiRequest('/products'),
  getOne: (id: string) => apiRequest(`/products/${id}`),
  create: (data: any) => apiRequest('/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiRequest('/products', { method: 'PUT', body: JSON.stringify({ id, ...data }) }),
  delete: (id: string) => apiRequest(`/products?id=${id}`, { method: 'DELETE' }),
};

// Order API
export const orderAPI = {
  getAll: () => apiRequest('/orders'),
  create: (data: any) => apiRequest('/orders', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiRequest('/orders', { method: 'PUT', body: JSON.stringify({ id, ...data }) }),
};

// Auth API
export const authAPI = {
  login: (email: string, password: string) => 
    apiRequest('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  signup: (data: any) => 
    apiRequest('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
  verify: (token: string) => 
    apiRequest('/auth/verify', { headers: { Authorization: `Bearer ${token}` } }),
};

// Payment API
export const paymentAPI = {
  createIntent: (data: any) => 
    apiRequest('/create-payment-intent', { method: 'POST', body: JSON.stringify(data) }),
};

