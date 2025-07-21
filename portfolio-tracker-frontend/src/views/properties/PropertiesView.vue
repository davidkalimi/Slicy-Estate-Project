<!-- src/views/properties/PropertiesView.vue -->
<template>
  <div class="properties-container">
    <h1>נכסי נדל"ן זמינים להשקעה</h1>

    <!-- מצב טעינה -->
    <div v-if="loading" class="loading">
      <span>טוען נכסים...</span>
    </div>

    <!-- הודעת שגיאה -->
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="fetchProperties">נסה שוב</button>
    </div>

    <!-- תצוגת נכסים -->
    <div v-else class="properties-grid">
      <div
        v-for="property in properties"
        :key="property.id"
        class="property-card"
      >
        <img
          :src="property.image_url || '/placeholder.jpg'"
          :alt="property.title"
          class="property-image"
        />
        <div class="property-content">
          <h3>{{ property.title }}</h3>
          <p class="location">{{ property.location }}</p>
          <div class="price">₪{{ property.total_price.toLocaleString() }}</div>
          <div class="progress-bar">
            <div
              class="progress"
              :style="{ width: `${property.funded_percentage || 0}%` }"
            ></div>
          </div>
          <div class="funding-status">
            {{ property.funded_percentage || 0 }}% הושקע
          </div>
          <router-link :to="`/properties/${property.id}`" class="view-property"
            >צפה בנכס</router-link
          >
        </div>
      </div>
    </div>

    <!-- אין נכסים -->
    <div
      v-if="!loading && !error && properties.length === 0"
      class="no-properties"
    >
      <p>לא נמצאו נכסים זמינים להשקעה.</p>
    </div>
  </div>
</template>

<script>
import PropertyService from "@/services/property.service";

export default {
  name: "PropertiesView",
  data() {
    return {
      properties: [],
      loading: true,
      error: null,
    };
  },

  methods: {
    async fetchProperties() {
      this.loading = true;
      this.error = null;

      try {
        const response = await PropertyService.getProperties();
        this.properties = response.data;
      } catch (err) {
        console.error("Error fetching properties:", err);
        this.error = "אירעה שגיאה בטעינת הנכסים. אנא נסה שוב.";
      } finally {
        this.loading = false;
      }
    },
  },

  created() {
    this.fetchProperties();
  },
};
</script>

<style scoped>
.properties-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.property-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.property-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.property-content {
  padding: 15px;
}

h3 {
  margin-top: 0;
  margin-bottom: 5px;
}

.location {
  color: #666;
  margin-bottom: 10px;
}

.price {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.progress-bar {
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 5px;
}

.progress {
  height: 100%;
  background-color: #4caf50;
}

.funding-status {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.view-property {
  display: block;
  text-align: center;
  background-color: #3f51b5;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.view-property:hover {
  background-color: #303f9f;
}

.loading,
.error,
.no-properties {
  text-align: center;
  padding: 40px 0;
}

.error {
  color: #f44336;
}

button {
  background-color: #3f51b5;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #303f9f;
}
</style>
