<!-- src/views/properties/PropertyDetail.vue -->
<template>
  <div class="property-detail">
    <div v-if="loading" class="loading">טוען פרטי נכס...</div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="fetchProperty">נסה שוב</button>
    </div>

    <div v-else-if="property" class="property-content">
      <div class="property-images">
        <img
          :src="property.image_url || '/placeholder.jpg'"
          :alt="property.title"
        />
      </div>

      <div class="property-info">
        <h1>{{ property.title }}</h1>
        <p class="location">{{ property.location }}</p>

        <div class="property-stats">
          <div class="stat">
            <span class="label">מחיר:</span>
            <span class="value"
              >₪{{ property.total_price?.toLocaleString() }}</span
            >
          </div>
          <div class="stat">
            <span class="label">הושקע:</span>
            <span class="value">{{ property.funded_percentage || 0 }}%</span>
          </div>
          <div class="stat">
            <span class="label">תשואה צפויה:</span>
            <span class="value">{{ property.expected_return || 0 }}%</span>
          </div>
        </div>

        <div class="progress-container">
          <div class="progress-bar">
            <div
              class="progress"
              :style="{ width: `${property.funded_percentage || 0}%` }"
            ></div>
          </div>
          <div class="funding-status">
            ₪{{
              (
                (property.total_price * property.funded_percentage) /
                100
              ).toLocaleString()
            }}
            מתוך ₪{{ property.total_price?.toLocaleString() }}
            הושקעו
          </div>
        </div>

        <div class="property-description">
          <h2>על הנכס</h2>
          <p>{{ property.description }}</p>
        </div>

        <router-link
          :to="`/properties/${property.id}/invest`"
          class="invest-button"
        >
          השקע בנכס זה
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import PropertyService from "@/services/property.service";

export default {
  name: "PropertyDetail",
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      property: null,
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchProperty() {
      this.loading = true;
      this.error = null;

      try {
        const response = await PropertyService.getProperty(this.id);
        this.property = response.data;
      } catch (err) {
        console.error("Error fetching property details:", err);
        this.error = "אירעה שגיאה בטעינת פרטי הנכס. אנא נסה שוב.";
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.fetchProperty();
  },
};
</script>

<style scoped>
/* סגנונות עבור עמוד פרטי הנכס */
.property-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.property-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.property-images img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-top: 0;
  margin-bottom: 10px;
}

.location {
  color: #666;
  margin-bottom: 20px;
}

.property-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.stat {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 6px;
}

.label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.value {
  font-size: 18px;
  font-weight: bold;
}

.progress-container {
  margin-bottom: 30px;
}

.progress-bar {
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress {
  height: 100%;
  background-color: #4caf50;
}

.funding-status {
  font-size: 14px;
  color: #666;
}

.property-description {
  margin-bottom: 30px;
}

.property-description h2 {
  margin-bottom: 10px;
}

.invest-button {
  display: inline-block;
  background-color: #ff5722;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.invest-button:hover {
  background-color: #e64a19;
}

.loading,
.error {
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

@media (max-width: 768px) {
  .property-content {
    grid-template-columns: 1fr;
  }
}
</style>
