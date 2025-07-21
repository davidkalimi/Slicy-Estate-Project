<!-- src/views/properties/PropertiesView.vue -->
<template>
  <div class="properties-container">
    <h1 class="page-title">נכסי נדל"ן זמינים להשקעה</h1>

    <!-- פילטר חיפוש נכסים -->
    <div class="filters-section">
      <div class="search-box">
        <input
          type="text"
          v-model="filters.search"
          placeholder="חיפוש..."
          @input="applyFilters"
        />
      </div>
      <div class="filters">
        <select v-model="filters.location" @change="applyFilters">
          <option value="">כל המיקומים</option>
          <option
            v-for="location in availableLocations"
            :key="location"
            :value="location"
          >
            {{ location }}
          </option>
        </select>

        <div class="price-range">
          <span>טווח מחירים:</span>
          <input
            type="number"
            v-model.number="filters.minPrice"
            placeholder="מינימום"
            @input="applyFilters"
          />
          <span>-</span>
          <input
            type="number"
            v-model.number="filters.maxPrice"
            placeholder="מקסימום"
            @input="applyFilters"
          />
        </div>
      </div>
    </div>

    <!-- מצב טעינה -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>טוען נכסים...</p>
    </div>

    <!-- רשימת הנכסים -->
    <div v-else-if="properties.length > 0" class="properties-grid">
      <property-card
        v-for="property in properties"
        :key="property.id"
        :property="property"
        @click="openPropertyDetails(property.id)"
      />
    </div>

    <!-- אין תוצאות -->
    <div v-else class="empty-state">
      <p>לא נמצאו נכסים התואמים את החיפוש.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PropertyCard from "@/components/properties/PropertyCard.vue";

export default {
  components: {
    PropertyCard,
  },

  data() {
    return {
      filters: {
        search: "",
        location: "",
        minPrice: null,
        maxPrice: null,
      },
      availableLocations: ["תל אביב", "ירושלים", "חיפה", "באר שבע"], // לדוגמה
    };
  },

  computed: {
    ...mapState("properties", ["properties", "loading", "error"]),
  },

  methods: {
    ...mapActions("properties", ["fetchProperties"]),

    applyFilters() {
      // המרת הפילטרים לפרמטרים לשליחה ל-API
      const params = {};

      if (this.filters.search) {
        params.search = this.filters.search;
      }

      if (this.filters.location) {
        params.location = this.filters.location;
      }

      if (this.filters.minPrice) {
        params.min_price = this.filters.minPrice;
      }

      if (this.filters.maxPrice) {
        params.max_price = this.filters.maxPrice;
      }

      this.fetchProperties(params);
    },

    openPropertyDetails(id) {
      this.$router.push({ name: "PropertyDetail", params: { id } });
    },
  },

  created() {
    this.fetchProperties();
  },
};
</script>
