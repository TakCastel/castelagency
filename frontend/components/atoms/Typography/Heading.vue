<template>
  <component :is="tag" :class="headingClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'
  color?: 'primary' | 'secondary' | 'white' | 'accent'
  align?: 'left' | 'center' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  level: 1,
  size: undefined,
  weight: 'bold',
  color: 'white',
  align: 'left'
})

const tag = computed(() => `h${props.level}`)

const sizeMap = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl'
}

const defaultSizes = {
  1: 'text-4xl md:text-6xl',
  2: 'text-3xl md:text-5xl',
  3: 'text-2xl md:text-4xl',
  4: 'text-xl md:text-3xl',
  5: 'text-lg md:text-2xl',
  6: 'text-base md:text-xl'
}

const weightMap = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black'
}

const colorMap = {
  primary: 'text-yellow-bright',
  secondary: 'text-white/60',
  white: 'text-white',
  accent: 'text-orange-bright'
}

const alignMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
}

const headingClasses = computed(() => {
  return [
    props.size ? sizeMap[props.size] : defaultSizes[props.level],
    weightMap[props.weight],
    colorMap[props.color],
    alignMap[props.align],
    'leading-tight'
  ].join(' ')
})
</script>

