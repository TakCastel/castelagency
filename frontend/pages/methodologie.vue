<template>
  <div class="py-16 md:py-24 relative overflow-hidden">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-6xl font-extrabold text-white">Notre méthodologie</h1>
        <p class="mt-4 max-w-3xl mx-auto text-lg text-gray-400">
          Un processus structuré pour garantir la réussite de votre projet.
        </p>
      </div>

      <div class="max-w-5xl mx-auto space-y-12">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="bg-[#3A1053]/80 backdrop-blur-sm border border-white/10 p-8 rounded-3xl"
        >
          <div class="flex items-start gap-6">
            <div class="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-[#FDD835]/10 text-[#FDD835] text-2xl font-bold">
              {{ index + 1 }}
            </div>
            <div class="flex-grow">
              <h2 class="text-2xl font-bold text-white mb-3">{{ step.title }}</h2>
              <p class="text-gray-300 leading-relaxed">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const steps = [
  {
    title: 'Découverte',
    description: 'Nous commençons par comprendre vos besoins, vos objectifs et votre environnement. Cette phase d\'audit nous permet de définir la meilleure stratégie pour votre projet.'
  },
  {
    title: 'Conception',
    description: 'Nous concevons l\'architecture de votre solution, créons les maquettes et définissons les spécifications techniques. Vous êtes impliqué à chaque étape pour valider les choix.'
  },
  {
    title: 'Développement',
    description: 'Nous développons votre solution en suivant les meilleures pratiques, avec des tests réguliers et des points d\'avancement pour vous tenir informé de la progression.'
  },
  {
    title: 'Lancement',
    description: 'Nous procédons au déploiement de votre solution, effectuons les tests finaux et formons vos équipes à l\'utilisation de votre nouvel outil.'
  },
  {
    title: 'Suivi',
    description: 'Nous assurons le suivi et la maintenance de votre solution, proposons des améliorations continues et restons disponibles pour répondre à vos besoins évolutifs.'
  }
]
</script>

