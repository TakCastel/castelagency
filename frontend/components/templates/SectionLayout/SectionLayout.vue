<template>
  <section :class="sectionClasses">
    <div class="container mx-auto px-6">
      <div v-if="title || $slots.header" class="text-center mb-16">
        <slot name="header">
          <Heading v-if="title" :level="titleLevel" color="white" align="center" class="mb-4">
            {{ title }}
          </Heading>
          <Text v-if="subtitle" size="lg" color="secondary" align="center" class="max-w-3xl mx-auto">
            {{ subtitle }}
          </Text>
        </slot>
      </div>
      
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import Heading from '~/components/atoms/Typography/Heading.vue'
import Text from '~/components/atoms/Typography/Text.vue'

interface Props {
  title?: string
  subtitle?: string
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'transparent' | 'card' | 'gradient'
}

const props = withDefaults(defineProps<Props>(), {
  titleLevel: 1,
  padding: 'md',
  background: 'transparent'
})

const sectionClasses = computed(() => {
  const base = 'relative overflow-hidden'
  
  const paddings = {
    none: '',
    sm: 'py-8',
    md: 'py-16 md:py-24',
    lg: 'py-20 md:py-32',
    xl: 'py-24 md:py-40'
  }
  
  const backgrounds = {
    transparent: '',
    card: 'bg-[#3A1053]/20',
    gradient: 'bg-gradient-to-b from-[#2C0B3A] to-[#3A1053]'
  }
  
  return [base, paddings[props.padding], backgrounds[props.background]].filter(Boolean).join(' ')
})
</script>

