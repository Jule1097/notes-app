import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore.js';
import LoginForm from '@/components/auth/LoginForm.vue';
import NotesTable from '@/components/notes/NotesTable.vue';

const routes = [
  { path: '/login', component: LoginForm },
  { path: '/', component: NotesTable, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/login' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;