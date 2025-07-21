<template>
  <div class="landing-page">
    <header class="hero">
      <div class="hero-content">
        <h1>ברוכים הבאים!</h1>
        <p class="subheadline">הפתרון המושלם עבורך</p>
        <button class="cta-button">למידע נוסף</button>
      </div>
    </header>

    <section class="features">
      <div class="container">
        <h2>היתרונות שלנו</h2>
        <div class="features-list">
          <div class="feature-item">
            <h3>תכונה 1</h3>
            <p>תיאור קצר של התכונה הראשונה.</p>
          </div>
          <div class="feature-item">
            <h3>תכונה 2</h3>
            <p>תיאור קצר של התכונה השנייה.</p>
          </div>
          <div class="feature-item">
            <h3>תכונה 3</h3>
            <p>תיאור קצר של התכונה השלישית.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="testimonials">
      <div class="container">
        <h2>מה הלקוחות שלנו אומרים</h2>
        <div class="testimonial-item">
          <p>"מוצר נהדר! מאוד מרוצה מהשירות."</p>
          <p class="author">- לקוח מרוצה</p>
        </div>
      </div>
    </section>

    <footer>
      <div class="container">
        <p>&copy; 2025 כל הזכויות שמורות</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
};
</script>

<style scoped>
.landing-page {
  font-family: sans-serif;
}

.hero {
  background-color: #f0f0f0;
  padding: 80px 0;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 3em;
  margin-bottom: 20px;
}

.hero .subheadline {
  font-size: 1.5em;
  color: #777;
  margin-bottom: 30px;
}

.cta-button {
  background-color: #007bff;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
}

.features {
  padding: 60px 0;
}

.features .container {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}

.features h2 {
  font-size: 2.5em;
  margin-bottom: 40px;
}

.features-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.feature-item {
  width: 300px;
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
}

.testimonials {
  background-color: #e9ecef;
  padding: 60px 0;
  text-align: center;
}

.testimonials .container {
  max-width: 700px;
  margin: 0 auto;
}

.testimonial-item {
  padding: 30px;
  font-size: 1.2em;
  font-style: italic;
}

.testimonial-item .author {
  font-size: 0.9em;
  font-style: normal;
  color: #555;
  margin-top: 10px;
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px 0;
}

.container {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
