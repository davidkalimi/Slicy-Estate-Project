<template>
  <nav class="navbar">
    <div class="logo">
      <router-link to="/">Slicy Estate</router-link>
    </div>

    <div class="nav-links">
      <router-link to="/properties">נכסים</router-link>

      <template v-if="isLoggedIn">
        <router-link to="/investments">ההשקעות שלי</router-link>
        <div class="user-menu" @click="toggleDropdown">
          <span class="username">{{ currentUser.username }}</span>
          <div class="dropdown" v-if="showDropdown">
            <router-link to="/profile">הפרופיל שלי</router-link>
            <a href="#" @click.prevent="logout">התנתק</a>
          </div>
        </div>
      </template>

      <template v-else>
        <router-link to="/login" class="login-button">התחבר</router-link>
        <router-link to="/register" class="register-button">הירשם</router-link>
      </template>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavbarView",
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn", "currentUser"]),
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.showDropdown = false;
      this.$router.push("/");
    },
  },
  mounted() {
    // סגירת התפריט הנפתח בלחיצה מחוצה לו
    document.addEventListener("click", (e) => {
      const userMenu = this.$el.querySelector(".user-menu");
      if (userMenu && !userMenu.contains(e.target)) {
        this.showDropdown = false;
      }
    });
  },
  beforeUnmount() {
    document.removeEventListener("click", () => {});
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3f51b5;
  color: white;
  padding: 0 20px;
  height: 64px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo a {
  color: white;
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-links a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.login-button {
  border: 1px solid white;
}

.register-button {
  background-color: #ff5722;
}

.user-menu {
  position: relative;
  margin-left: 20px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-menu:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.username {
  font-weight: 500;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 150px;
  z-index: 10;
  margin-top: 10px;
}

.dropdown a {
  display: block;
  color: #333;
  padding: 12px 16px;
  text-decoration: none;
  margin: 0;
}

.dropdown a:hover {
  background-color: #f5f5f5;
}
</style>
