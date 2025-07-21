// src/services/api.service.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
});

// הוספת טוקן לכל בקשה
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;  // התאם לסוג האימות בבקאנד
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// טיפול בשגיאות תגובה
apiClient.interceptors.response.use(
  response => response,
  error => {
    // טיפול בשגיאות אימות (401)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // אם יש לך router זמין כאן, תוכל לנתב לדף התחברות
      // router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default apiClient;