<template>
  <div class="py-16 md:py-24 relative overflow-hidden">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-6xl font-extrabold text-white">Nos partenaires</h1>
        <p class="mt-4 max-w-3xl mx-auto text-lg text-gray-400">
          Nous travaillons avec des experts pour vous offrir une solution complète.
        </p>
      </div>

      <div v-if="pending" class="text-center text-gray-400">
        Chargement des partenaires...
      </div>

      <div v-else-if="error" class="text-center text-red-400">
        Erreur lors du chargement des partenaires. Affichage des partenaires par défaut.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div
          v-for="partner in displayPartners"
          :key="partner.id || partner.name"
          class="bg-[#3A1053]/80 backdrop-blur-sm border border-white/10 p-8 rounded-3xl"
        >
          <div v-if="partner.logo" class="mb-4">
            <img
              :src="getImageUrl(partner.logo)"
              :alt="partner.name"
              class="h-16 object-contain"
            >
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">{{ partner.name }}</h3>
          <p v-if="partner.role" class="text-[#FDD835] mb-3">{{ partner.role }}</p>
          <p class="text-gray-300 mb-4">{{ partner.description }}</p>
          <a
            v-if="partner.website"
            :href="partner.website"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#FDD835] hover:text-yellow-300 text-sm"
          >
            Visiter le site →
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getPartners } = usePartners()
const config = useRuntimeConfig()

const { data: partners, pending, error } = await useAsyncData('partners', () => 
  getPartners({ limit: 50 })
)

const getImageUrl = (logo: any) => {
  if (!logo) return ''
  if (typeof logo === 'string') return logo
  const directusUrl = config.public.directusUrl || 'http://localhost:8055'
  return `${directusUrl}/assets/${logo.id}?width=200&quality=80`
}

// Partenaires par défaut si Directus n'est pas disponible
const defaultPartners = [
  {
    name: 'Directrice Artistique',
    role: 'Design & UI/UX',
    description: 'Notre partenaire en design et direction artistique crée des identités visuelles fortes et des interfaces utilisateur intuitives qui engagent vos visiteurs.'
  },
  {
    name: 'Expert Vidéo',
    role: 'Motion Design & Communication',
    description: 'Spécialiste en création vidéo et motion design, notre partenaire produit des contenus audiovisuels impactants pour votre communication.'
  }
]

const displayPartners = computed(() => {
  if (partners.value && partners.value.length > 0) {
    return partners.value
  }
  return defaultPartners
})
</script>

