<!-- src/views/investments/InvestmentDetail.vue -->
<template>
  <div>
    <h1>פרטי השקעה</h1>
    <!-- תוכן דף פרטי השקעה -->
  </div>
</template>

<script>
export default {
  name: "InvestmentDetail",
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>
