<template>
  <SectionLayout
    title="Nos projets"
    subtitle="Découvrez quelques-uns de nos réalisations récentes."
    padding="lg"
  >
    <div v-if="pending" class="text-center text-gray-400">
      Chargement des projets...
    </div>

    <div v-else-if="error" class="text-center text-red-400">
      Erreur lors du chargement des projets. Vérifiez que Directus est bien démarré.
    </div>

    <div v-else-if="projects && projects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </div>

    <div v-else class="text-center text-gray-400">
      Aucun projet disponible pour le moment.
    </div>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from '~/components/templates/SectionLayout/SectionLayout.vue'
import ProjectCard from '~/components/organisms/ProjectCard/ProjectCard.vue'
import { useProjects } from '~/composables/useProjects'

const { getProjects } = useProjects()

const { data: projects, pending, error } = await useAsyncData('projects', () => 
  getProjects({ status: 'published', limit: 20 })
)
</script>
