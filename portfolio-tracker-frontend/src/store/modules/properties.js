// src/store/modules/properties.js
import PropertiesService from '@/services/properties.service';

export default {
  namespaced: true,
  
  state: {
    properties: [],
    currentProperty: null,
    loading: false,
    error: null
  },
  
  mutations: {
    SET_PROPERTIES(state, properties) {
      state.properties = properties;
    },
    SET_CURRENT_PROPERTY(state, property) {
      state.currentProperty = property;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  
  actions: {
    async fetchProperties({ commit }, params) {
      commit('SET_LOADING', true);
      try {
        const response = await PropertiesService.getProperties(params);
        commit('SET_PROPERTIES', response.data);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    
    async fetchProperty({ commit }, id) {
      commit('SET_LOADING', true);
      try {
        const response = await PropertiesService.getProperty(id);
        commit('SET_CURRENT_PROPERTY', response.data);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    }
  }
};