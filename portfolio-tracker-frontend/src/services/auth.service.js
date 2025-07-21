// src/services/auth.service.js
import apiClient from './api.service';

class AuthService {
  async login(credentials) {
    const response = await apiClient.post('/auth/token/', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      // שמור גם את פרטי המשתמש אם הם מוחזרים מהשרת
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }
    return response.data;
  }

  async register(userData) {
    return apiClient.post('/users/register/', userData);

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}

export default new AuthService();