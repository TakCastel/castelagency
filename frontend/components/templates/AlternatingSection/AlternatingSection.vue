<template>
  <section
    class="alternating-section spacing-generous"
    :class="[
      variant === 'dark' ? 'section-dark' : variant === 'light' ? 'section-light' : 'section-alternate',
      pattern ? 'pattern-geometric' : ''
    ]"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div
        v-if="title || subtitle"
        class="section-header mb-12"
        :class="headerAlign === 'center' ? 'text-center' : headerAlign === 'right' ? 'text-right' : 'text-left'"
      >
        <Heading
          v-if="title"
          :level="2"
          :size="titleSize"
          :weight="titleWeight"
          :color="titleColor"
          :align="headerAlign"
          class="mb-4"
        >
          {{ title }}
        </Heading>
        <Text
          v-if="subtitle"
          :size="subtitleSize"
          :color="subtitleColor"
          :align="headerAlign"
          class="max-w-3xl"
          :class="headerAlign === 'center' ? 'mx-auto' : ''"
        >
          {{ subtitle }}
        </Text>
      </div>
      
      <div
        class="section-content"
        :class="[
          grid ? 'grid-strong' : 'visual-hierarchy'
        ]"
      >
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Heading, Text } from '~/components/atoms/Typography'

interface Props {
  title?: string
  subtitle?: string
  titleSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  titleWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'
  titleColor?: 'primary' | 'secondary' | 'white' | 'accent'
  subtitleSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  subtitleColor?: 'primary' | 'secondary' | 'white' | 'accent'
  variant?: 'dark' | 'light' | 'alternate'
  headerAlign?: 'left' | 'center' | 'right'
  grid?: boolean
  pattern?: boolean
}

withDefaults(defineProps<Props>(), {
  titleSize: '4xl',
  titleWeight: 'bold',
  titleColor: 'white',
  subtitleSize: 'lg',
  subtitleColor: 'secondary',
  variant: 'alternate',
  headerAlign: 'center',
  grid: false,
  pattern: false
})
</script>

<style scoped>
.alternating-section {
  position: relative;
}
</style>

