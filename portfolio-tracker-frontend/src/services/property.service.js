import axios from 'axios';

const API_URL = 'http://localhost:8000/api';  // עדכן לכתובת ה-API שלך

export default {
  // קבלת כל הנכסים
  getProperties() {
    return axios.get(`${API_URL}/properties/`);
  },
  
  // קבלת נכס לפי ID
  getProperty(id) {
    return axios.get(`${API_URL}/properties/${id}/`);
  }
};