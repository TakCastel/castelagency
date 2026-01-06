<template>
  <component
    :is="componentTag"
    :to="to"
    :class="buttonClasses"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="inline-flex items-center">
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {{ loadingText }}
    </span>
    <span v-else>
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  tag?: 'button' | 'a' | 'NuxtLink'
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  fullWidth: false,
  disabled: false,
  loading: false,
  loadingText: 'Chargement...',
  tag: 'button',
  to: undefined
})

const componentTag = computed(() => {
  if (props.to) {
    return 'NuxtLink'
  }
  return props.tag
})

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#FDD835] to-[#F57C00] text-gray-900 hover:scale-105 focus:ring-[#FDD835] shadow-lg shadow-yellow-500/20',
    secondary: 'bg-[#3A1053]/80 backdrop-blur-sm border border-white/10 text-white hover:border-[#FDD835] hover:bg-[#3A1053]',
    outline: 'border-2 border-[#FDD835] text-[#FDD835] hover:bg-[#FDD835] hover:text-gray-900 focus:ring-[#FDD835]',
    ghost: 'text-white hover:bg-white/10 focus:ring-white/20',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  }
  
  return [
    base,
    variants[props.variant],
    sizes[props.size],
    props.fullWidth && 'w-full',
    props.loading && 'cursor-wait'
  ].filter(Boolean).join(' ')
})
</script>

