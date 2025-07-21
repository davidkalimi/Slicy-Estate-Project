<template>
  <div class="login-container">
    <div class="login-card">
      <h1>התחברות</h1>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">שם משתמש</label>
          <input
            type="text"
            id="username"
            v-model="credentials.username"
            required
            autocomplete="username"
          />
        </div>

        <div class="form-group">
          <label for="password">סיסמה</label>
          <input
            type="password"
            id="password"
            v-model="credentials.password"
            required
            autocomplete="current-password"
          />
        </div>

        <button type="submit" class="login-button" :disabled="loading">
          {{ loading ? "מתחבר..." : "התחבר" }}
        </button>
      </form>

      <div class="register-link">
        אין לך חשבון עדיין?
        <router-link to="/register">הירשם עכשיו</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service";

export default {
  name: "LoginView",
  data() {
    return {
      credentials: {
        username: "",
        password: "",
      },
      loading: false,
      error: null,
    };
  },
  methods: {
    async login() {
      this.loading = true;
      this.error = null;

      try {
        await AuthService.login(this.credentials);
        this.$router.push("/properties");
      } catch (err) {
        console.error("Login error:", err);
        this.error = "שם המשתמש או הסיסמה אינם נכונים";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #303f9f;
}

.login-button:disabled {
  background-color: #b0bec5;
  cursor: not-allowed;
}

.error-message {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.register-link {
  text-align: center;
  margin-top: 20px;
}

.register-link a {
  color: #3f51b5;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
