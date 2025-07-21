<template>
  <div id="app">
    <Navbar />
    <header>
      <nav>
        <h1 class="logo">Slicy-Estate</h1>
        <ul class="nav-links">
          <li><router-link to="/">בית</router-link></li>
          <li><router-link to="/properties">נכסים</router-link></li>
          <li><router-link to="/partners">שותפים</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>&copy; 2025 Slicy-Estate. כל הזכויות שמורות.</p>
    </footer>
  </div>
</template>

<script>
import Navbar from "@/components/NavbarView.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  direction: rtl;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background-color: #2c3e50;
  color: white;
  padding: 15px 20px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin-left: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
}

.nav-links a:hover {
  text-decoration: underline;
}

main {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 15px;
  margin-top: auto;
}
</style>
