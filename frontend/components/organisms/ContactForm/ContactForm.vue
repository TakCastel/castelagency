<template>
  <Card padding="md">
    <template #header>
      <Heading :level="2" color="white" class="mb-6">
        Envoyez-nous un message
      </Heading>
    </template>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <FormField
        v-model="form.name"
        label="Nom complet"
        type="text"
        required
      />
      
      <FormField
        v-model="form.email"
        label="Adresse e-mail"
        type="email"
        required
      />
      
      <FormField
        v-model="form.subject"
        label="Sujet"
        type="text"
        required
      />
      
      <FormField
        v-model="form.message"
        label="Votre message"
        type="textarea"
        :rows="5"
        required
      />
      
      <div v-if="submitSuccess" class="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300">
        Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.
      </div>
      
      <div v-if="submitError" class="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
        {{ submitError }}
      </div>
      
      <Button
        type="submit"
        :disabled="isSubmitting"
        :loading="isSubmitting"
        full-width
        size="lg"
      >
        Envoyer le message
      </Button>
    </form>
  </Card>
</template>

<script setup lang="ts">
import Card from '~/components/molecules/Card/Card.vue'
import FormField from '~/components/molecules/FormField/FormField.vue'
import Button from '~/components/atoms/Button/Button.vue'
import Heading from '~/components/atoms/Typography/Heading.vue'
import { useContact } from '~/composables/useContact'

const { submitContact } = useContact()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref<string | null>(null)

const handleSubmit = async () => {
  isSubmitting.value = true
  submitError.value = null
  submitSuccess.value = false

  try {
    const result = await submitContact(form)

    if (result.success) {
      submitSuccess.value = true
      form.name = ''
      form.email = ''
      form.subject = ''
      form.message = ''
      
      setTimeout(() => {
        submitSuccess.value = false
      }, 5000)
    } else {
      submitError.value = 'Une erreur est survenue. Veuillez réessayer.'
    }
  } catch (error) {
    submitError.value = 'Une erreur est survenue. Veuillez réessayer.'
    console.error('Contact form error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

