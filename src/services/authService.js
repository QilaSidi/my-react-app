// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8082/api/auth'; // Replace with your backend URL

// Login with Google Token (for now, let's use Google login flow)
export const loginWithGoogle = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { token });
    const { jwt } = response.data;
    // Store the JWT token in local storage or context
    localStorage.setItem('jwt', jwt);
    return jwt;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw new Error('Login failed');
  }
};

// You can create a method for checking the logged-in user's role or fetching user info
export const getUserData = async () => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    throw new Error('No JWT token found');
  }

  try {
    const response = await axios.get('http://localhost:8082/student/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};
