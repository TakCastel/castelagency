<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="mb-4">
      <slot name="header" />
    </div>
    <div v-if="$slots.default" class="flex-grow">
      <slot />
    </div>
    <div v-if="$slots.footer" class="mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  hover: false,
  padding: 'md'
})

const cardClasses = computed(() => {
  const base = 'rounded-3xl flex flex-col transition-all duration-300'
  
  const variants = {
    default: 'bg-[#3A1053]/80 backdrop-blur-sm border border-white/10',
    elevated: 'bg-[#3A1053]/80 backdrop-blur-sm border border-white/10 shadow-lg',
    outlined: 'bg-transparent border-2 border-white/20',
    filled: 'bg-[#3A1053] border border-white/10'
  }
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-12'
  }
  
  const hoverEffect = props.hover ? 'hover:-translate-y-2 hover:border-[#FDD835] cursor-pointer' : ''
  
  return [base, variants[props.variant], paddings[props.padding], hoverEffect].filter(Boolean).join(' ')
})
</script>

