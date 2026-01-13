<template>
  <div class="bg-dark min-vh-100 d-flex justify-content-center align-items-center">
    <div class="card bg-secondary text-white p-4" style="width:100%; max-width:420px;">
      <h3 class="mb-3 text-center">Login</h3>
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <form @submit.prevent="submitLogin" novalidate>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" v-model="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" v-model="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-gradient w-100">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { UserService } from '@/services/user.service.js';
import { useAuthStore } from '@/stores/authStore.js';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      userService: new UserService(),
      errorMessage: ''
    };
  },
  methods: {
    async submitLogin() {
      this.errorMessage = '';
      try {
        const res = await this.userService.login(this.email, this.password);
        const token = res?.user?.token;
        if (token) {
          const authStore = useAuthStore();
          authStore.setToken(token);
        }
        this.$emit('login', res);
        this.$router.push('/');
      } catch (err) {
        const serverMessage = err?.response?.data?.message;
        this.errorMessage = serverMessage || err.message || 'Error logging in.';
      }
    }
  }
};
</script>

<style scoped>
.btn-gradient {
  color: #fff;
  background-image: linear-gradient(90deg, #34d399 0%, #10b981 100%);
  border: none;
}

.card {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}
</style>