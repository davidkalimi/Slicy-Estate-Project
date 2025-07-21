<template>
  <div class="partners-view">
    <div class="header">
      <h1>ניהול שותפים</h1>
      <button class="add-button" @click="showAddPartnerModal = true">
        + הוסף שותף חדש
      </button>
    </div>

    <div class="filters">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="חיפוש שותף..."
        class="search-input"
      />
    </div>

    <div class="partners-table">
      <table>
        <thead>
          <tr>
            <th>שם</th>
            <th>טלפון</th>
            <th>אימייל</th>
            <th>השקעה כוללת</th>
            <th>מספר נכסים</th>
            <th>תשואה ממוצעת</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="partner in filteredPartners" :key="partner.id">
            <td>
              <div class="partner-name">
                <div
                  class="avatar"
                  :style="{ backgroundColor: getAvatarColor(partner.name) }"
                >
                  {{ getInitials(partner.name) }}
                </div>
                <span>{{ partner.name }}</span>
              </div>
            </td>
            <td>{{ partner.phone }}</td>
            <td>{{ partner.email }}</td>
            <td>₪{{ partner.totalInvestment.toLocaleString() }}</td>
            <td>{{ partner.propertyCount }}</td>
            <td>
              <span
                :class="[
                  'yield',
                  partner.averageYield >= 5 ? 'positive' : 'negative',
                ]"
              >
                {{ partner.averageYield }}%
              </span>
            </td>
            <td>
              <div class="actions">
                <button class="edit-button" @click="editPartner(partner)">
                  ערוך
                </button>
                <button
                  class="view-button"
                  @click="viewPartnerDetails(partner)"
                >
                  פרטים
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- מודל להוספת שותף חדש -->
    <div v-if="showAddPartnerModal" class="modal-backdrop">
      <div class="modal">
        <h2>הוסף שותף חדש</h2>
        <form @submit.prevent="addPartner">
          <div class="form-group">
            <label for="name">שם מלא</label>
            <input type="text" id="name" v-model="newPartner.name" required />
          </div>
          <div class="form-group">
            <label for="phone">טלפון</label>
            <input type="tel" id="phone" v-model="newPartner.phone" required />
          </div>
          <div class="form-group">
            <label for="email">אימייל</label>
            <input
              type="email"
              id="email"
              v-model="newPartner.email"
              required
            />
          </div>
          <div class="form-actions">
            <button
              type="button"
              class="cancel-button"
              @click="showAddPartnerModal = false"
            >
              ביטול
            </button>
            <button type="submit" class="submit-button">הוסף שותף</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PartnersView",
  data() {
    return {
      searchTerm: "",
      showAddPartnerModal: false,
      newPartner: {
        name: "",
        phone: "",
        email: "",
      },
      partners: [
        {
          id: 1,
          name: "משה כהן",
          phone: "052-1234567",
          email: "moshe@example.com",
          totalInvestment: 1400000,
          propertyCount: 2,
          averageYield: 6.5,
        },
        {
          id: 2,
          name: "דוד לוי",
          phone: "054-7654321",
          email: "david@example.com",
          totalInvestment: 2500000,
          propertyCount: 3,
          averageYield: 5.2,
        },
        {
          id: 3,
          name: "שרה גולן",
          phone: "050-9876543",
          email: "sara@example.com",
          totalInvestment: 900000,
          propertyCount: 1,
          averageYield: 4.8,
        },
        {
          id: 4,
          name: "אבי ישראלי",
          phone: "053-1122334",
          email: "avi@example.com",
          totalInvestment: 3900000,
          propertyCount: 4,
          averageYield: 7.1,
        },
        {
          id: 5,
          name: "רונית כהן",
          phone: "052-5566778",
          email: "ronit@example.com",
          totalInvestment: 1750000,
          propertyCount: 2,
          averageYield: 3.8,
        },
      ],
    };
  },
  computed: {
    filteredPartners() {
      return this.partners.filter((partner) => {
        return (
          partner.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          partner.email.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
    },
  },
  methods: {
    getInitials(name) {
      return name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();
    },
    getAvatarColor(name) {
      // יצירת צבע אקראי אבל עקבי עבור כל שם
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }

      const colors = [
        "#41B883",
        "#E46651",
        "#00D8FF",
        "#DD1B16",
        "#7D4CDB",
        "#F2994A",
        "#EB5757",
        "#6FCF97",
      ];
      return colors[Math.abs(hash) % colors.length];
    },
    editPartner(partner) {
      console.log("עריכת שותף:", partner.id);
      // בעתיד נוכל לממש פונקציונליות עריכה
    },
    viewPartnerDetails(partner) {
      console.log("צפייה בפרטי שותף:", partner.id);
      // בעתיד נוכל לנווט לדף פרטי שותף
    },
    addPartner() {
      // בעתיד נוכל לשלוח בקשה ל-API ליצירת שותף חדש
      const newPartner = {
        id: this.partners.length + 1,
        ...this.newPartner,
        totalInvestment: 0,
        propertyCount: 0,
        averageYield: 0,
      };

      this.partners.push(newPartner);
      this.showAddPartnerModal = false;
      this.newPartner = { name: "", phone: "", email: "" };
    },
  },
};
</script>

<style scoped>
.partners-view {
  padding: 20px;
}
</style>

.header { display: flex; justify-content: space-between; align-items: center;
margin-bottom: 20px; } .add-button { background-color: #41B883; color: white;
border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;
font-weight: bold; } .filters { margin-bottom: 20px; } .search-input { padding:
8px 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; width:
300px; } .partners-table { background-color: white; border-radius: 8px;
overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); } table { width:
100%; border-collapse: collapse; } th, td { padding: 12px 15px; text-align:
right; } th { background-color: #f8f9fa; font-weight: bold; }
tr:not(:last-child) { border-bottom: 1px solid #eee; } .partner-name { display:
flex; align-items: center; } .avatar { width: 36px; height: 36px; border-radius:
50%; color: white; display: flex; align-items: center; justify-content: center;
margin-left: 10px; font-weight: bold; } .yield { font-weight: bold; }
.yield.positive { color: #41B883; } .yield.negative { color: #E46651; } .actions
{ display: flex; gap: 8px; } .actions button { padding: 5px 10px; border: none;
border-radius: 4 }
