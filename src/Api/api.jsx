// In your api.jsx or axios configuration file
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cdaxx-backend.onrender.com/api',
  timeout: 15000, // Increased timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ ADD THIS INTERCEPTOR TO INCLUDE TOKEN IN ALL REQUESTS
api.interceptors.request.use(
  (config) => {
    console.log('🔐 Axios Request Interceptor:');
    console.log('   URL:', config.baseURL + config.url);
    console.log('   Method:', config.method);
    console.log('   Full URL:', config.url);
    
    const token = localStorage.getItem('auth_token');
    console.log('   Token in localStorage:', token ? 'Yes (' + token.substring(0, 20) + '...)' : 'No');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('   ✅ Authorization header added');
    } else {
      console.log('   ❌ No token found');
    }
    
    // Log params for GET requests
    if (config.method === 'get' && config.params) {
      console.log('   Params:', config.params);
    }
    
    console.log('   Headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// ✅ Also add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => {
    console.log('✅ Axios Response Success:', {
      status: response.status,
      url: response.config.url,
      method: response.config.method,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('❌ Axios Response Error:', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      fullUrl: error.config?.baseURL + error.config?.url,
      hasAuthHeader: error.config?.headers?.Authorization ? 'Yes' : 'No',
      params: error.config?.params,
      responseData: error.response?.data
    });
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.log('🚨 401 Unauthorized - Redirecting to login');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_id');
      // Don't redirect automatically as it might be public endpoint
      // window.location.href = '/login';
    }
    
    // Handle CORS errors
    if (error.message === 'Network Error') {
      console.error('🌐 Network/CORS Error - Check backend is running and CORS configured');
      console.error('🔗 Backend URL:', error.config?.baseURL);
    }
    
    return Promise.reject(error);
  }
);

export default api;