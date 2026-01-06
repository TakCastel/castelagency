<template>
  <section
    class="hero-section relative overflow-hidden"
    :class="[
      variant === 'dark' ? 'section-dark' : variant === 'light' ? 'section-light' : 'section-dark',
      fullHeight ? 'min-h-screen' : 'min-h-[70vh]'
    ]"
  >
    <Background
      v-if="showBackground"
      :variant="backgroundVariant"
    />
    
    <div class="hero-content container mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="text-zone"
        :class="[
          align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left',
          maxWidthClass
        ]"
      >
        <Heading
          v-if="title"
          :level="1"
          :size="titleSize"
          :weight="titleWeight"
          :color="titleColor"
          :align="align"
          class="mb-6"
        >
          <span v-if="titleGradient" class="text-gradient-warm">
            {{ title }}
          </span>
          <template v-else>
            {{ title }}
          </template>
        </Heading>
        
        <Text
          v-if="subtitle"
          :size="subtitleSize"
          :color="subtitleColor"
          :align="align"
          class="value-proposition mb-8"
        >
          {{ subtitle }}
        </Text>
        
        <Text
          v-if="description"
          :size="descriptionSize"
          :color="descriptionColor"
          :align="align"
          class="mb-10 max-w-2xl"
          :class="align === 'center' ? 'mx-auto' : ''"
        >
          {{ description }}
        </Text>
        
        <div
          v-if="cta || ctaSecondary"
          class="flex flex-wrap gap-4"
          :class="[
            align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'
          ]"
        >
          <Button
            v-if="cta"
            :variant="ctaVariant"
            :size="ctaSize"
            :to="cta.path"
            class="motion-friendly"
          >
            {{ cta.label }}
          </Button>
          <Button
            v-if="ctaSecondary"
            variant="outline"
            :size="ctaSize"
            :to="ctaSecondary.path"
            class="motion-friendly"
          >
            {{ ctaSecondary.label }}
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Heading, Text } from '~/components/atoms/Typography'
import { Button } from '~/components/atoms/Button'
import Background from '~/components/Background.vue'

interface CTA {
  label: string
  path: string
}

interface Props {
  title?: string
  titleGradient?: boolean
  titleSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  titleWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'
  titleColor?: 'primary' | 'secondary' | 'white' | 'accent'
  subtitle?: string
  subtitleSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  subtitleColor?: 'primary' | 'secondary' | 'white' | 'accent'
  description?: string
  descriptionSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  descriptionColor?: 'primary' | 'secondary' | 'white' | 'accent'
  cta?: CTA
  ctaSecondary?: CTA
  ctaVariant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  ctaSize?: 'sm' | 'md' | 'lg'
  variant?: 'dark' | 'light' | 'alternate'
  align?: 'left' | 'center' | 'right'
  fullHeight?: boolean
  showBackground?: boolean
  backgroundVariant?: 'hero' | 'section' | 'landing' | 'minimal'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full'
}

const props = withDefaults(defineProps<Props>(), {
  titleSize: '6xl',
  titleWeight: 'bold',
  titleColor: 'white',
  titleGradient: false,
  subtitleSize: '2xl',
  subtitleColor: 'secondary',
  descriptionSize: 'lg',
  descriptionColor: 'secondary',
  ctaVariant: 'primary',
  ctaSize: 'lg',
  variant: 'dark',
  align: 'left',
  fullHeight: false,
  showBackground: true,
  backgroundVariant: 'hero',
  maxWidth: '4xl'
})

const maxWidthClass = computed(() => {
  if (props.maxWidth === 'full') {
    return 'max-w-full'
  }
  return `max-w-${props.maxWidth}`
})
</script>

<style scoped>
.hero-section {
  position: relative;
}

.text-zone {
  position: relative;
  z-index: 10;
}
</style>

