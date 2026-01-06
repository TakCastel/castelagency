<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-300 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-400">*</span>
    </label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :class="inputClasses"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      v-bind="$attrs"
    >
    <p v-if="error" class="mt-1 text-sm text-red-400">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-400">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  size: 'md'
})

defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const inputId = `input-${Math.random().toString(36).substr(2, 9)}`

const inputClasses = computed(() => {
  const base = 'block w-full bg-white/5 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors duration-300 text-white placeholder-gray-500'
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  }
  
  const state = props.error
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
    : 'border-white/20 focus:ring-[#FDD835] focus:border-[#FDD835]'
  
  return [base, sizes[props.size], state, props.disabled && 'opacity-50 cursor-not-allowed'].filter(Boolean).join(' ')
})
</script>

