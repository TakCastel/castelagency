<template>
  <svg
    :class="iconClasses"
    :width="size"
    :height="size"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
      :d="path"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  path: string
  size?: number | string
  color?: string
  strokeWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor',
  strokeWidth: 2
})

const iconClasses = computed(() => {
  return props.color !== 'currentColor' ? '' : ''
})
</script>

