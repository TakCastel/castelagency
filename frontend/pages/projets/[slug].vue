<template>
  <div class="py-16 md:py-24 relative overflow-hidden">
    <div class="container mx-auto px-6 max-w-4xl">
      <div v-if="pending" class="text-center text-gray-400">
        Chargement du projet...
      </div>

      <div v-else-if="error || !project" class="text-center text-red-400">
        Projet non trouvé.
      </div>

      <div v-else>
        <NuxtLink to="/projets" class="text-[#FDD835] hover:text-yellow-300 mb-6 inline-block">
          ← Retour aux projets
        </NuxtLink>

        <article>
          <div v-if="project.image" class="mb-8">
            <img
              :src="getImageUrl(project.image)"
              :alt="project.title"
              class="w-full h-96 object-cover rounded-3xl"
            >
          </div>

          <header class="mb-8">
            <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-4">{{ project.title }}</h1>
            <div v-if="project.client" class="text-gray-400 mb-2">
              Client : <span class="text-white">{{ project.client }}</span>
            </div>
            <div v-if="project.date_start || project.date_end" class="text-gray-400">
              <span v-if="project.date_start">{{ formatDate(project.date_start) }}</span>
              <span v-if="project.date_start && project.date_end"> - </span>
              <span v-if="project.date_end">{{ formatDate(project.date_end) }}</span>
            </div>
          </header>

          <div v-if="project.description" class="text-xl text-gray-300 mb-8">
            {{ project.description }}
          </div>

          <div v-if="project.content" class="prose prose-invert max-w-none mb-8" v-html="project.content"></div>

          <div v-if="project.tags && project.tags.length > 0" class="flex flex-wrap gap-2 mb-8">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="bg-[#FDD835]/10 text-[#FDD835] text-sm font-semibold px-3 py-1 rounded-full"
            >
              {{ tag }}
            </span>
          </div>

          <div v-if="project.gallery && project.gallery.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            <img
              v-for="(image, index) in project.gallery"
              :key="index"
              :src="getImageUrl(image)"
              :alt="`${project.title} - Image ${index + 1}`"
              class="w-full h-64 object-cover rounded-xl"
            >
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getProjectBySlug } = useProjects()
const config = useRuntimeConfig()

const slug = route.params.slug as string

const { data: project, pending, error } = await useAsyncData(`project-${slug}`, () => 
  getProjectBySlug(slug)
)

const getImageUrl = (image: any) => {
  if (!image) return ''
  if (typeof image === 'string') return image
  const directusUrl = config.public.directusUrl || 'http://localhost:8055'
  return `${directusUrl}/assets/${image.id}?width=1200&quality=80`
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
}

// SEO
useHead({
  title: project.value ? `${project.value.title} - Castel Web & Design` : 'Projet - Castel Web & Design',
  meta: [
    {
      name: 'description',
      content: project.value?.description || 'Découvrez nos réalisations'
    }
  ]
})
</script>

