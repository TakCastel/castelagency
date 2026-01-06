<template>
  <SectionLayout
    title="Des solutions digitales sur-mesure."
    subtitle="De la conception de votre site vitrine à l'intégration d'outils métier complexes, nous assemblons les expertises nécessaires pour répondre précisément à vos objectifs."
    padding="lg"
  >
    <div v-if="pending" class="text-center text-gray-400">
      Chargement des services...
    </div>

    <div v-else-if="error" class="text-center text-red-400">
      Erreur lors du chargement des services. Affichage des services par défaut.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ServiceCard
        v-for="service in displayServices"
        :key="service.id || service.title"
        :service="service"
      />
    </div>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from '~/components/templates/SectionLayout/SectionLayout.vue'
import ServiceCard from '~/components/organisms/ServiceCard/ServiceCard.vue'
import { useServices } from '~/composables/useServices'

const { getServices } = useServices()
const config = useRuntimeConfig()

const { data: services, pending, error } = await useAsyncData('services', () => 
  getServices({ status: 'active', limit: 50 })
)

// Services par défaut si Directus n'est pas disponible
const defaultServices = [
  {
    icon: 'M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z',
    title: 'Création de sites WordPress sur-mesure',
    description: 'Nous développons des sites WordPress robustes, sécurisés et entièrement personnalisés. Loin des thèmes surchargés, nous construisons des solutions performantes avec un back-office simple et intuitif, conçu pour vos besoins spécifiques.',
    tags: ['Thèmes sur-mesure', 'Gutenberg', 'ACF', 'Performance']
  },
  {
    icon: 'M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    title: 'Développement d\'applications web et mobiles',
    description: 'Pour vos projets les plus ambitieux, nous concevons des applications web et mobiles complexes. Plateformes métier, outils internes, espaces clients : nous maîtrisons les technologies modernes pour créer des expériences fluides et puissantes.',
    tags: ['Angular', 'React Native', 'API REST', 'Bases de données']
  },
  {
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
    title: 'CMS Headless et Back-office dédiés',
    description: 'Gagnez en flexibilité avec une architecture headless. Nous mettons en place des back-offices sur des plateformes comme Strapi ou Directus pour vous permettre de gérer vos contenus sur tous vos canaux (site web, application, etc.) depuis une interface unique.',
    tags: ['Strapi', 'Directus', 'Drupal', 'API First']
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'SEO technique et référencement naturel',
    description: 'La visibilité est la clé. Nous assurons que votre site respecte toutes les bonnes pratiques SEO : structure saine, performance, balisage, accessibilité. Une base solide pour votre stratégie de contenu et votre positionnement sur Google.',
    tags: ['Audit technique', 'Optimisation on-page', 'Core Web Vitals', 'Schema.org']
  },
  {
    icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L15.232 5.232z',
    title: 'Design, DA, UI/UX (avec nos partenaires)',
    description: 'En synergie avec notre directrice artistique partenaire, nous traduisons votre identité de marque en une interface web esthétique, claire et efficace. Chaque élément est pensé pour optimiser l\'expérience utilisateur et favoriser la conversion.',
    tags: ['Styleguide', 'Maquettes Figma', 'Prototypage', 'Parcours utilisateur']
  },
  {
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    title: 'Vidéo, communication et CRM (avec nos partenaires)',
    description: 'Grâce à notre réseau d\'experts, nous intégrons des contenus audiovisuels, définissons votre stratégie de communication et connectons votre site à vos outils métier (CRM, ERP) pour automatiser vos processus et mieux connaître vos clients.',
    tags: ['Motion design', 'Branding', 'Intégration CRM/ERP', 'Automatisation']
  }
]

const displayServices = computed(() => {
  if (services.value && services.value.length > 0) {
    return services.value
  }
  return defaultServices
})
</script>
