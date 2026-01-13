import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router/router.js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    setToken(token) {
      this.token = token;
      if (token) {
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
      }
    },
    init() {
      const t = localStorage.getItem('authToken');
      if (t) {
        this.token = t;
        axios.defaults.headers.common['Authorization'] = `Bearer ${t}`;
      }
    },
    logout() {
      this.setToken(null);
      this.user = null;
      router.push('/login');
    }
  }
});