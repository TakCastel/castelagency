import { readItems } from '@directus/sdk'

interface Partner {
  id: string
  name: string
  logo?: string
  description?: string
  website?: string
  role?: string
  sort?: number
}

export const usePartners = () => {
  const { client } = useDirectus()

  const getPartners = async (options?: {
    limit?: number
    sort?: string[]
  }) => {
    try {
      const query: any = {
        fields: ['*', 'logo.*'],
        sort: options?.sort || ['sort', 'name'],
        limit: options?.limit || 100
      }

      const partners = await client.request(readItems('partners', query))
      return partners as Partner[]
    } catch (error) {
      console.error('Error fetching partners:', error)
      return []
    }
  }

  return {
    getPartners
  }
}

