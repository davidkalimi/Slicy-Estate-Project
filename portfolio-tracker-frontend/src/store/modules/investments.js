// src/store/modules/investments.js
import InvestmentsService from '@/services/investments.service';

export default {
  namespaced: true,
  
  state: {
    investments: [],
    currentInvestment: null,
    summary: null,
    loading: false,
    error: null
  },
  
  mutations: {
    SET_INVESTMENTS(state, investments) {
      state.investments = investments;
    },
    SET_CURRENT_INVESTMENT(state, investment) {
      state.currentInvestment = investment;
    },
    SET_SUMMARY(state, summary) {
      state.summary = summary;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    ADD_INVESTMENT(state, investment) {
      state.investments.unshift(investment);
    },
    UPDATE_INVESTMENT(state, { id, status }) {
      const index = state.investments.findIndex(i => i.id === id);
      if (index !== -1) {
        state.investments[index].status = status;
      }
    }
  },
  
  actions: {
    async fetchInvestments({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await InvestmentsService.getUserInvestments();
        commit('SET_INVESTMENTS', response.data);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    
    async createInvestment({ commit }, investmentData) {
      commit('SET_LOADING', true);
      try {
        const response = await InvestmentsService.createInvestment(investmentData);
        commit('ADD_INVESTMENT', response.data);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    
    async cancelInvestment({ commit }, id) {
      commit('SET_LOADING', true);
      try {
        await InvestmentsService.cancelInvestment(id);
        commit('UPDATE_INVESTMENT', { id, status: 'canceled' });
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    
    async fetchInvestmentSummary({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await InvestmentsService.getInvestmentSummary();
        commit('SET_SUMMARY', response.data);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    }
  }
};