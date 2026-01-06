<template>
  <div class="relative min-h-screen">
    <Background />
    
    <div class="relative z-10 flex flex-col min-h-screen">
      <Header />
      
      <main class="flex-grow pt-16 sm:pt-20">
        <slot />
      </main>
      
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/organisms/Header/Header.vue'
import Footer from '~/components/organisms/Footer/Footer.vue'
</script>

