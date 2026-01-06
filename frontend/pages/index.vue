<template>
  <div class="overflow-x-hidden">
    <!-- Hero Section -->
    <section class="relative text-white min-h-[70vh] flex items-center">
      <div class="container mx-auto px-6 py-24 text-center">
        <h1 class="text-4xl md:text-7xl font-extrabold leading-tight tracking-tight text-white">Nous sculptons des expériences digitales mémorables.</h1>
        <p class="mt-4 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">Votre agence digitale à Avignon. Créativité, performance et proximité.</p>
        <NuxtLink to="/contact" class="mt-10 inline-block bg-gradient-to-r from-[#FDD835] to-[#F57C00] text-gray-900 font-bold py-4 px-10 rounded-full transition duration-300 text-lg transform hover:scale-105 shadow-lg shadow-yellow-500/20">
          Démarrer un projet
        </NuxtLink>
      </div>
    </section>

    <!-- Value Proposition -->
    <section class="py-20 text-white">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-5xl font-bold">Un partenaire digital, pas un simple fournisseur.</h2>
        <p class="mt-4 max-w-3xl mx-auto text-lg text-gray-400">
          Chez Castel Agency, nous allons au-delà du code. Nous sommes une équipe d'experts passionnés, dédiée à la réussite de votre projet. En alliant expertise technique et vision stratégique, nous créons des solutions web qui génèrent de la valeur sur le long terme.
        </p>
      </div>
    </section>

    <!-- Services Overview -->
    <section class="py-20">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold text-white">Nos expertises au service de votre croissance</h2>
          <p class="mt-4 text-lg text-gray-400">Une approche complète pour une présence digitale cohérente et performante.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="service in services"
            :key="service.title"
            class="bg-[#3A1053]/80 backdrop-blur-sm border border-white/10 p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 hover:border-[#FDD835]"
          >
            <div class="flex items-center justify-center h-16 w-16 rounded-xl bg-yellow-400/10 text-[#FDD835] mb-5">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.icon"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2 text-white">{{ service.title }}</h3>
            <p class="text-gray-400 mb-4">{{ service.description }}</p>
            <NuxtLink :to="service.link" class="text-[#FDD835] hover:text-yellow-300 font-semibold group">
              En savoir plus <span class="group-hover:ml-2 transition-all duration-300">&rarr;</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Methodology Preview -->
    <section class="py-20">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-5xl font-bold text-white">Une méthodologie claire, un projet serein.</h2>
        <p class="mt-4 max-w-3xl mx-auto text-lg text-gray-400">De la découverte à la maintenance, nous vous accompagnons à chaque étape avec une méthode éprouvée qui garantit la qualité et le respect des délais.</p>
        <div class="mt-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-gray-200">
          <div class="flex flex-col items-center p-4 rounded-2xl bg-[#3A1053]/50">
            <div class="flex items-center justify-center h-16 w-16 rounded-full bg-white/5 text-[#FDD835] mb-3">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <span class="font-semibold">1. Découverte</span>
          </div>
          <div class="flex flex-col items-center p-4 rounded-2xl bg-[#3A1053]/50">
            <div class="flex items-center justify-center h-16 w-16 rounded-full bg-white/5 text-[#FDD835] mb-3">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
            <span class="font-semibold">2. Conception</span>
          </div>
          <div class="flex flex-col items-center p-4 rounded-2xl bg-[#3A1053]/50">
            <div class="flex items-center justify-center h-16 w-16 rounded-full bg-white/5 text-[#FDD835] mb-3">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l-4 16M6 9l-4 4l4 4M18 9l4 4l-4 4"></path>
              </svg>
            </div>
            <span class="font-semibold">3. Développement</span>
          </div>
          <div class="flex flex-col items-center p-4 rounded-2xl bg-[#3A1053]/50">
            <div class="flex items-center justify-center h-16 w-16 rounded-full bg-white/5 text-[#FDD835] mb-3">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </div>
            <span class="font-semibold">4. Lancement</span>
          </div>
          <div class="flex flex-col items-center p-4 rounded-2xl bg-[#3A1053]/50 col-span-2 md:col-span-1">
            <div class="flex items-center justify-center h-16 w-16 rounded-full bg-white/5 text-[#FDD835] mb-3">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <span class="font-semibold">5. Suivi</span>
          </div>
        </div>
        <NuxtLink to="/methodologie" class="mt-12 inline-block bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full transition duration-300">
          Découvrir notre processus
        </NuxtLink>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-20 relative">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-5xl font-bold text-white">Prêt à donner vie à votre projet digital ?</h2>
        <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-400">Contactez-nous pour un échange sans engagement. Nous sommes à votre écoute pour comprendre vos ambitions et vous proposer une solution adaptée.</p>
        <NuxtLink to="/contact" class="mt-10 inline-block bg-gradient-to-r from-[#FDD835] to-[#F57C00] text-gray-900 font-bold py-4 px-10 rounded-full transition duration-300 text-lg transform hover:scale-105 shadow-lg shadow-yellow-500/20">
          Prendre contact
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const services = [
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Développement Web Sur-Mesure',
    description: 'Sites vitrines, plateformes e-commerce, applications métier. Nous codons des solutions robustes et évolutives, parfaitement adaptées à vos besoins.',
    link: '/services'
  },
  {
    icon: 'M10 20l4-16m4 4l-4 16M6 9l-4 4l4 4M18 9l4 4l-4 4',
    title: 'Stratégie & Référencement (SEO)',
    description: 'Une base technique saine pour une visibilité durable. Nous optimisons votre site pour les moteurs de recherche et pour vos utilisateurs.',
    link: '/services'
  },
  {
    icon: 'M5 12s2.553-2.25 5-2.25 5 2.25 5 2.25-2.553 2.25-5 2.25S5 12 5 12zM10 14a2 2 0 100-4 2 2 0 000 4z',
    title: 'Design UI/UX & Direction Artistique',
    description: 'En collaboration avec nos partenaires experts, nous créons des identités visuelles fortes et des interfaces intuitives qui engagent vos visiteurs.',
    link: '/partenaires'
  }
]
</script>

