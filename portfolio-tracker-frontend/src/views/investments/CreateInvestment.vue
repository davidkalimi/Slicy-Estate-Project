<!-- src/views/investments/CreateInvestment.vue -->
<template>
  <div class="create-investment-container">
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>טוען נתונים...</p>
    </div>

    <div v-else-if="property" class="investment-form">
      <h1>השקעה בנכס: {{ property.title }}</h1>

      <div class="property-summary">
        <img
          :src="property.image_url || '/default-property.jpg'"
          :alt="property.title"
          class="property-image"
        />
        <div class="property-details">
          <h3>{{ property.title }}</h3>
          <p class="location">{{ property.location }}</p>
          <div class="progress-info">
            <div class="progress-bar">
              <div
                class="progress"
                :style="{ width: `${property.funded_percentage}%` }"
              ></div>
            </div>
            <div class="progress-text">
              {{ property.funded_percentage }}% הושקע
            </div>
          </div>
        </div>
      </div>

      <form @submit.prevent="submitInvestment">
        <div class="form-group">
          <label for="amount">סכום ההשקעה (₪)</label>
          <input
            type="number"
            id="amount"
            v-model.number="investmentAmount"
            :min="property.min_investment"
            :max="maxInvestmentAmount"
            required
          />

          <div class="investment-range">
            <p>מינימום: ₪{{ formatNumber(property.min_investment) }}</p>
            <p>מקסימום: ₪{{ formatNumber(maxInvestmentAmount) }}</p>
          </div>
        </div>

        <div class="investment-calculation">
          <h3>פרטי ההשקעה:</h3>
          <div class="calculation-item">
            <span class="label">אחוז בעלות בנכס:</span>
            <span class="value">{{ calculatePercentage }}%</span>
          </div>
          <div class="calculation-item">
            <span class="label">תשואה שנתית צפויה:</span>
            <span class="value"
              >₪{{ formatNumber(calculateExpectedReturn) }}</span
            >
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="$router.back()">
            ביטול
          </button>
          <button type="submit" class="submit-btn" :disabled="submitDisabled">
            השקע עכשיו
          </button>
        </div>
      </form>
    </div>

    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="fetchProperty(id)">נסה שוב</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },

  data() {
    return {
      investmentAmount: 0,
    };
  },

  computed: {
    ...mapState("properties", ["property", "loading", "error"]),
    ...mapState("investments", ["investmentLoading"]),

    maxInvestmentAmount() {
      if (!this.property) return 0;
      // הסכום המקסימלי שניתן להשקיע הוא החלק שטרם מומן
      const remainingAmount =
        this.property.total_price * (1 - this.property.funded_percentage / 100);
      return Math.floor(remainingAmount);
    },

    calculatePercentage() {
      if (!this.property || !this.investmentAmount) return 0;
      return (
        (this.investmentAmount / this.property.total_price) *
        100
      ).toFixed(2);
    },

    calculateExpectedReturn() {
      if (!this.property || !this.investmentAmount) return 0;
      return this.investmentAmount * (this.property.expected_return / 100);
    },

    submitDisabled() {
      return (
        !this.investmentAmount ||
        this.investmentAmount < this.property?.min_investment ||
        this.investmentAmount > this.maxInvestmentAmount ||
        this.investmentLoading
      );
    },
  },

  methods: {
    ...mapActions("properties", ["fetchProperty"]),
    ...mapActions("investments", ["createInvestment"]),

    formatNumber(value) {
      return value?.toLocaleString() || "0";
    },

    async submitInvestment() {
      if (this.submitDisabled) return;

      try {
        await this.createInvestment({
          property: this.id,
          amount: this.investmentAmount,
        });

        this.$router.push({ name: "Investments" });
        // הוספת הודעת הצלחה
      } catch (error) {
        // הצגת שגיאה למשתמש
        console.error("Error creating investment:", error);
      }
    },
  },

  created() {
    this.fetchProperty(this.id);
  },

  watch: {
    // איפוס הסכום כשהנכס נטען
    property(newProperty) {
      if (newProperty) {
        this.investmentAmount = newProperty.min_investment;
      }
    },
  },
};
</script>
