<template>
  <div class="space-y-6">
    <Input
      v-if="type === 'text' || type === 'email' || type === 'tel'"
      :model-value="modelValue"
      :label="label"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :error="error"
      :hint="hint"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    <Textarea
      v-else-if="type === 'textarea'"
      :model-value="modelValue"
      :label="label"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :error="error"
      :hint="hint"
      :rows="rows"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import Input from '~/components/atoms/Input/Input.vue'
import Textarea from '~/components/atoms/Textarea/Textarea.vue'

interface Props {
  modelValue: string
  label?: string
  type?: 'text' | 'email' | 'tel' | 'textarea'
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
  rows?: number
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  rows: 4
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

