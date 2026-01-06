<template>
  <NuxtLink :to="`/projets/${project.slug}`" class="block">
    <Card hover padding="md">
      <template #header>
        <div v-if="project.image" class="mb-4">
          <img
            :src="getImageUrl(project.image)"
            :alt="project.title"
            class="w-full h-48 object-cover rounded-xl"
          >
        </div>
      </template>
      
      <Heading :level="3" color="white" class="mb-3">
        {{ project.title }}
      </Heading>
      
      <Text v-if="project.description" color="secondary" class="mb-4">
        {{ project.description }}
      </Text>
      
      <div v-if="project.tags && project.tags.length > 0" class="flex flex-wrap gap-2">
        <Tag
          v-for="tag in project.tags"
          :key="tag"
          variant="default"
          size="sm"
        >
          {{ tag }}
        </Tag>
      </div>
    </Card>
  </NuxtLink>
</template>

<script setup lang="ts">
import Card from '~/components/molecules/Card/Card.vue'
import Heading from '~/components/atoms/Typography/Heading.vue'
import Text from '~/components/atoms/Typography/Text.vue'
import Tag from '~/components/atoms/Tag/Tag.vue'

interface Project {
  id: string
  title: string
  slug: string
  description?: string
  image?: any
  tags?: string[]
}

interface Props {
  project: Project
}

defineProps<Props>()

const config = useRuntimeConfig()

const getImageUrl = (image: any) => {
  if (!image) return ''
  if (typeof image === 'string') return image
  const directusUrl = config.public.directusUrl || 'http://localhost:8055'
  return `${directusUrl}/assets/${image.id}?width=800&quality=80`
}
</script>

