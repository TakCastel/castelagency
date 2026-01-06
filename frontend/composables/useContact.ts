import { createItem } from '@directus/sdk'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export const useContact = () => {
  const { client } = useDirectus()

  const submitContact = async (form: ContactForm) => {
    try {
      const contact = await client.request(
        createItem('contacts', {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          status: 'new'
        })
      )
      return { success: true, data: contact }
    } catch (error) {
      console.error('Error submitting contact:', error)
      return { success: false, error }
    }
  }

  return {
    submitContact
  }
}

