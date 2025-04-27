<template>
  <div class="page-container">
    <!-- Header -->
    <header class="header">
      <h1 class="logo">MangaShop</h1>
      <nav class="nav-icons">
        <button>🔍</button>
        <button>🛒</button>
        <button>👤</button>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <h2 class="hero-title">Entdecke Manga-Welten<br />wie nie zuvor</h2>
      <button class="cta-button">Jetzt stöbern</button>
      <img :src="heroGirl" alt="Anime Girl" class="hero-image" />
    </section>

    <!-- Info Section -->
    <section class="info-section">
      <div class="info-card">
        <img :src="boyImage" alt="Anime Boy" class="info-image" />
        <p>MangaShop ist dein Ort für Originale,<br>Fanartikel und vieles mehr.</p>
      </div>
    </section>

    <!-- Kategorien -->
    <section class="categories">
      <h3 class="section-title">Kategorien</h3>
      <div class="categories-buttons">
        <button class="category-button">Shōnen</button>
        <button class="category-button">Shōjo</button>
        <button class="category-button">Seinen</button>
        <button class="category-button">Kawaii</button>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <p>✅ Große Auswahl</p>
      <p>✅ Blog Artikel</p>
      <p>✅ Schneller Versand</p>
      <p>✅ Rezensionen lesen</p>
    </section>

    <!-- Call to Action -->
    <section class="call-to-action">
      <h3 class="section-title">Noch kein Konto?</h3>
      <p>Jetzt registrieren & Lieblingsmanga sichern!</p>
      <button class="cta-button">Konto erstellen</button>
    </section>

    <!-- Footer -->
    <footer class="footer">
      © 2025 MangaShop – Impressum – Datenschutz
    </footer>
  </div>
</template>

<script setup>
import '@/assets/main.css'; // Dein globales CSS
import heroGirl from '@/assets/images/girl.png'; // Importiere Anime Girl Bild
import boyImage from '@/assets/images/boy.png'; // Importiere Anime Boy Bild
</script>

<style scoped>
</style>
