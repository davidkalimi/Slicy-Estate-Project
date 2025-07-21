// src/store/index.js
import { createStore } from 'vuex';
import { auth } from './modules/auth.module';

export default createStore({
  state: {
    // מצב ראשוני
  },
  mutations: {
    // מוטציות
  },
  actions: {
    // פעולות
  },
    modules: {
        auth,
    // מודולים
  }
});