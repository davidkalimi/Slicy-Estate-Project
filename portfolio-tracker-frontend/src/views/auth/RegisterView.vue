<template>
  <div class="register-container">
    <div class="register-card">
      <h1>הרשמה</h1>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">שם משתמש</label>
          <input
            type="text"
            id="username"
            v-model="formData.username"
            required
            autocomplete="username"
          />
        </div>

        <div class="form-group">
          <label for="email">כתובת אימייל</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            required
            autocomplete="email"
          />
        </div>

        <div class="form-group">
          <label for="password">סיסמה</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            required
            autocomplete="new-password"
          />
        </div>

        <div class="form-group">
          <label for="password2">אימות סיסמה</label>
          <input
            type="password"
            id="password2"
            v-model="formData.password2"
            required
            autocomplete="new-password"
          />
        </div>

        <button type="submit" class="register-button" :disabled="loading">
          {{ loading ? "מעבד נתונים..." : "הירשם" }}
        </button>
      </form>

      <div class="login-link">
        כבר יש לך חשבון?
        <router-link to="/login">התחבר כאן</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service";

export default {
  name: "RegisterView",
  data() {
    return {
      formData: {
        username: "",
        email: "",
        password: "",
        password2: "",
      },
      loading: false,
      error: null,
    };
  },
  methods: {
    async register() {
      // בדיקת תקינות בסיסית
      if (this.formData.password !== this.formData.password2) {
        this.error = "הסיסמאות אינן תואמות";
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        await AuthService.register(this.formData);
        this.$router.push("/login?registered=true");
      } catch (err) {
        console.error("Registration error:", err);
        if (err.response && err.response.data) {
          // טיפול בשגיאות ספציפיות מהשרת
          const errors = err.response.data;
          if (errors.username) {
            this.error = `שם משתמש: ${errors.username[0]}`;
          } else if (errors.email) {
            this.error = `אימייל: ${errors.email[0]}`;
          } else if (errors.password) {
            this.error = `סיסמה: ${errors.password[0]}`;
          } else {
            this.error = "אירעה שגיאה בתהליך ההרשמה";
          }
        } else {
          this.error = "אירעה שגיאה בתהליך ההרשמה";
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.register-card {
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

.register-button {
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.register-button:hover {
  background-color: #388e3c;
}

.register-button:disabled {
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

.login-link {
  text-align: center;
  margin-top: 20px;
}

.login-link a {
  color: #3f51b5;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
