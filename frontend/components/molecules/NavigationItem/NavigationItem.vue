<template>
  <NuxtLink
    :to="to"
    :class="navItemClasses"
    @click="$emit('click')"
  >
    <span class="relative">
      <slot />
      <span 
        v-if="isActive || active"
        class="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FDD835] to-transparent"
      ></span>
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  to: string
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: false
})

defineEmits<{
  click: []
}>()

const route = useRoute()

const isActive = computed(() => {
  const currentPath = route.path || ''
  if (props.to === '/') {
    return currentPath === '/'
  }
  return currentPath.startsWith(props.to)
})

const navItemClasses = computed(() => {
  const base = 'relative transition-all duration-300 font-medium text-sm sm:text-base'
  const activeClass = isActive.value || props.active
    ? 'text-[#FDD835]'
    : 'text-white/80 hover:text-[#FDD835]'
  
  return [base, activeClass].join(' ')
})
</script>

