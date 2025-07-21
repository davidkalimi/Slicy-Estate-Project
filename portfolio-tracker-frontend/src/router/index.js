// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import AuthService from '@/services/auth.service';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/RegisterView.vue')
  },
  {
    path: '/properties',
    name: 'Properties',
    component: () => import('../views/properties/PropertiesView.vue')
  },
  {
    path: '/properties/:id',
    name: 'PropertyDetail',
    component: () => import('../views/properties/PropertyDetail.vue'),
    props: true
  },
  {
    path: '/investments',
    name: 'Investments',
    component: () => import('../views/investments/InvestmentsView.vue'),
    meta: { requiresAuth: true }  // דורש הרשאות
  },
  {
    path: '/investments/:id',
    name: 'InvestmentDetail',
    component: () => import('../views/investments/InvestmentDetail.vue'),
    props: true,
    meta: { requiresAuth: true }  // דורש הרשאות
  },
  {
    path: '/properties/:id/invest',
    name: 'CreateInvestment',
    component: () => import('../views/investments/CreateInvestment.vue'),
    props: true,
    meta: { requiresAuth: true }  // דורש הרשאות
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  // בדיקה אם הנתיב דורש אימות
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = AuthService.isAuthenticated();

  if (requiresAuth && !isAuthenticated) {
    // אם לא מאומת והדף דורש אימות, ניתוב לדף התחברות
    next({ 
      path: '/login', 
      query: { redirect: to.fullPath } 
    });
  } else {
    next();
  }
});

export default router;