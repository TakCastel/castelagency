<template>
  <component :is="tag" :class="textClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  tag?: 'p' | 'span' | 'div' | 'label'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  color?: 'primary' | 'secondary' | 'tertiary' | 'white' | 'accent'
  align?: 'left' | 'center' | 'right'
  lineHeight?: 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'p',
  size: 'base',
  weight: 'normal',
  color: 'secondary',
  align: 'left',
  lineHeight: 'normal'
})

const sizeMap = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl'
}

const weightMap = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
}

const colorMap = {
  primary: 'text-white',
  secondary: 'text-white/70',
  tertiary: 'text-white/50',
  white: 'text-white',
  accent: 'text-yellow-bright'
}

const alignMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
}

const lineHeightMap = {
  tight: 'leading-tight',
  snug: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose'
}

const textClasses = computed(() => {
  return [
    sizeMap[props.size],
    weightMap[props.weight],
    colorMap[props.color],
    alignMap[props.align],
    lineHeightMap[props.lineHeight]
  ].join(' ')
})
</script>

