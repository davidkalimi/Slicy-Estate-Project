// src/services/investments.service.js
import apiClient from './api.service';

export default {
  // קבלת השקעות המשתמש
  getUserInvestments() {
    return apiClient.get('/investments/');
  },
  
  // יצירת השקעה חדשה
  createInvestment(data) {
    return apiClient.post('/investments/', data);
  },
  
  // קבלת פרטי השקעה
  getInvestment(id) {
    return apiClient.get(`/investments/${id}/`);
  },
  
  // ביטול השקעה
  cancelInvestment(id) {
    return apiClient.post(`/investments/${id}/cancel/`);
  },
  
  // קבלת סיכום השקעות
  getInvestmentSummary() {
    return apiClient.get('/investments/summary/');
  }
};