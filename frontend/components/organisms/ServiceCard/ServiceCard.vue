<template>
  <Card hover padding="md" class="flex flex-col">
    <template #header>
      <div class="mb-5">
        <svg
          v-if="service.icon"
          class="w-10 h-10 text-[#FDD835]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="service.icon"
          />
        </svg>
        <img
          v-else-if="service.image"
          :src="getImageUrl(service.image)"
          :alt="service.title"
          class="w-10 h-10 object-contain"
        >
      </div>
    </template>
    
    <Heading :level="2" color="white" class="mb-3">
      {{ service.title }}
    </Heading>
    
    <Text color="secondary" class="flex-grow mb-4">
      {{ service.description }}
    </Text>
    
    <div v-if="service.tags && service.tags.length > 0" class="flex flex-wrap gap-2">
      <Tag
        v-for="tag in service.tags"
        :key="tag"
        variant="default"
        size="sm"
      >
        {{ tag }}
      </Tag>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '~/components/molecules/Card/Card.vue'
import Heading from '~/components/atoms/Typography/Heading.vue'
import Text from '~/components/atoms/Typography/Text.vue'
import Tag from '~/components/atoms/Tag/Tag.vue'

interface Service {
  id?: string
  title: string
  description?: string
  icon?: string
  image?: any
  tags?: string[]
}

interface Props {
  service: Service
}

defineProps<Props>()

const config = useRuntimeConfig()

const getImageUrl = (image: any) => {
  if (!image) return ''
  if (typeof image === 'string') return image
  const directusUrl = config.public.directusUrl || 'http://localhost:8055'
  return `${directusUrl}/assets/${image.id}?width=200&quality=80`
}
</script>

