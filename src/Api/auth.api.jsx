const API_BASE = "https://cdaxx-backend.onrender.com/api/auth";

/**
 * Register a new user
 * @param {Object} userData 
 * @returns {Promise<Object>} 
 */
export const registerUser = async (userData) => {
  try {
    const payload = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      mobile: userData.phoneNo,  
      password: userData.password,
      cpassword: userData.cPass  
    };

    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'Network error. Please try again.'
    };
  }
};

/**
 * Login user
 * @param {Object} credentials 
 * @returns {Promise<Object>} 
 */
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Network error. Please try again.'
    };
  }
};

/**
 * Get user by email
 * @param {string} email 
 * @returns {Promise<Object>} 
 */
export const getUserByEmail = async (email) => {
  try {
    const response = await fetch(`${API_BASE}/getUserByEmail?email=${encodeURIComponent(email)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};

/**
 * Get first name by email
 * @param {string} email 
 * @returns {Promise<string>} 
 */
export const getFirstName = async (email) => {
  try {
    const response = await fetch(`${API_BASE}/firstName?email=${encodeURIComponent(email)}`);
    const data = await response.json();
    return data.firstName;
  } catch (error) {
    console.error('Get first name error:', error);
    return null;
  }
};

/**
 * Check if server is running
 * @returns {Promise<boolean>}
 */
export const checkServerStatus = async () => {
  try {
    const response = await fetch(`${API_BASE}/test`);
    return response.ok;
  } catch (error) {
    console.error('Server check error:', error);
    return false;
  }
};