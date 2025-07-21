<template>
  <div class="home-view">
    <h1>דשבורד Slicy-Estate</h1>

    <div class="stats-cards">
      <div class="stat-card">
        <h3>נכסים פעילים</h3>
        <div class="stat-value">{{ propertiesCount }}</div>
        <div class="stat-footer">
          <button @click="$router.push('/properties')">ניהול נכסים</button>
        </div>
      </div>

      <div class="stat-card">
        <h3>שותפים רשומים</h3>
        <div class="stat-value">{{ partnersCount }}</div>
        <div class="stat-footer">
          <button @click="$router.push('/partners')">ניהול שותפים</button>
        </div>
      </div>

      <div class="stat-card">
        <h3>שווי כולל</h3>
        <div class="stat-value">₪{{ totalValue.toLocaleString() }}</div>
        <div class="stat-footer">
          <span class="trend positive">↑ 3.2% החודש</span>
        </div>
      </div>
    </div>

    <div class="charts-container">
      <div class="chart-card">
        <h3>התפלגות נכסים לפי סוג</h3>
        <pie-chart-component :chart-data="propertyTypeData" />
      </div>

      <div class="chart-card">
        <h3>הכנסות בששת החודשים האחרונים</h3>
        <line-chart-component :chart-data="revenueData" />
      </div>
    </div>
  </div>
</template>

<script>
// מייבא קומפוננטות עבור הצגת גרפים
import PieChartComponent from "@/components/charts/PieChartComponent.vue";
import LineChartComponent from "@/components/charts/LineChartComponent.vue";

export default {
  name: "HomeView",
  components: {
    PieChartComponent,
    LineChartComponent,
  },
  data() {
    return {
      propertiesCount: 12,
      partnersCount: 24,
      totalValue: 8750000,

      // נתונים לגרף עוגה
      propertyTypeData: {
        labels: ["דירות", "בתים פרטיים", "מסחרי", "קרקעות"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [5, 3, 2, 2],
          },
        ],
      },

      // נתונים לגרף קווי
      revenueData: {
        labels: ["אוקטובר", "נובמבר", "דצמבר", "ינואר", "פברואר", "מרץ"],
        datasets: [
          {
            label: "הכנסות (אלפי ₪)",
            borderColor: "#41B883",
            data: [45, 49, 50, 47, 56, 60],
            fill: false,
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.home-view {
  padding: 20px;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  margin: 15px 0;
  color: #2c3e50;
}

.stat-footer {
  margin-top: 10px;
}

button {
  background-color: #41b883;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.trend {
  font-size: 0.9rem;
}

.trend.positive {
  color: #41b883;
}

.trend.negative {
  color: #e46651;
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.chart-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: 15px;
  color: #2c3e50;
}
</style>
