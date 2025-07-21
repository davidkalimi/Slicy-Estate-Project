// src/store/modules/auth.module.js
import AuthService from '@/services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  
  actions: {
    async login({ commit }, credentials) {
      commit('loginRequest');
      try {
        const data = await AuthService.login(credentials);
        commit('loginSuccess', data.user || { username: credentials.username });
        return Promise.resolve(data);
      } catch (error) {
        commit('loginFailure');
        return Promise.reject(error);
      }
    },
    
    async register({ commit }, formData) {
      commit('registerRequest');
      try {
        const response = await AuthService.register(formData);
        commit('registerSuccess');
        return Promise.resolve(response.data);
      } catch (error) {
        commit('registerFailure');
        return Promise.reject(error);
      }
    },
    
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    }
  },
  
  mutations: {
    loginRequest(state) {
      state.status = { loggingIn: true };
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },
    loginFailure(state) {
      state.status = {};
      state.user = null;
    },
    registerRequest(state) {
      state.status = { registering: true };
    },
    registerSuccess(state) {
      state.status = {};
    },
    registerFailure(state) {
      state.status = {};
    },
    logout(state) {
      state.status = {};
      state.user = null;
    }
  },
  
  getters: {
    isLoggedIn: state => state.status.loggedIn || false,
    currentUser: state => state.user
  }
};