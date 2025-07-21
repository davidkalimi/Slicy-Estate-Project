<!-- src/components/properties/PropertyCard.vue -->
<template>
  <div class="property-card" @click="$emit('click')">
    <div class="property-image">
      <img
        :src="property.image_url || '/default-property.jpg'"
        :alt="property.title"
      />
      <div class="property-progress">
        <div class="progress-bar">
          <div
            class="progress"
            :style="{ width: `${property.funded_percentage}%` }"
          ></div>
        </div>
        <span class="progress-text"
          >{{ property.funded_percentage }}% הושקע</span
        >
      </div>
    </div>

    <div class="property-content">
      <h3 class="property-title">{{ property.title }}</h3>
      <p class="property-location">
        <i class="fa fa-map-marker"></i> {{ property.location }}
      </p>

      <div class="property-details">
        <div class="detail">
          <span class="label">סה"כ מחיר:</span>
          <span class="value">₪{{ formatNumber(property.total_price) }}</span>
        </div>
        <div class="detail">
          <span class="label">השקעה מינימלית:</span>
          <span class="value"
            >₪{{ formatNumber(property.min_investment) }}</span
          >
        </div>
        <div class="detail">
          <span class="label">תשואה צפויה:</span>
          <span class="value">{{ property.expected_return }}%</span>
        </div>
      </div>

      <button class="view-property-btn">צפייה בנכס</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    property: {
      type: Object,
      required: true,
    },
  },

  methods: {
    formatNumber(value) {
      return value.toLocaleString();
    },
  },
};
</script>
