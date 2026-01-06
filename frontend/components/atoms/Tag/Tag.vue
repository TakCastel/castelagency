<template>
  <span :class="tagClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md'
})

const tagClasses = computed(() => {
  const base = 'inline-flex items-center font-semibold rounded-full'
  
  const variants = {
    default: 'bg-[#FDD835]/10 text-[#FDD835]',
    primary: 'bg-[#FDD835] text-gray-900',
    secondary: 'bg-[#3A1053] text-white',
    success: 'bg-green-500/20 text-green-300',
    error: 'bg-red-500/20 text-red-300',
    warning: 'bg-yellow-500/20 text-yellow-300'
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm'
  }
  
  return [base, variants[props.variant], sizes[props.size]].join(' ')
})
</script>

