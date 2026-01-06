import { readItems } from '@directus/sdk'

interface Service {
  id: string
  title: string
  slug: string
  description?: string
  content?: string
  icon?: string
  image?: string
  tags?: string[]
  price_starting_from?: number
  featured: boolean
  sort?: number
  status: string
}

export const useServices = () => {
  const { client } = useDirectus()

  const getServices = async (options?: {
    limit?: number
    featured?: boolean
    status?: string
    sort?: string[]
  }) => {
    try {
      const query: any = {
        fields: ['*', 'image.*'],
        filter: {
          status: {
            _eq: options?.status || 'active'
          }
        },
        sort: options?.sort || ['-sort', 'title'],
        limit: options?.limit || 100
      }

      if (options?.featured !== undefined) {
        query.filter.featured = {
          _eq: options.featured
        }
      }

      const services = await client.request(readItems('services', query))
      return services as Service[]
    } catch (error) {
      console.error('Error fetching services:', error)
      return []
    }
  }

  const getServiceBySlug = async (slug: string) => {
    try {
      const query = {
        fields: ['*', 'image.*'],
        filter: {
          slug: {
            _eq: slug
          },
          status: {
            _eq: 'active'
          }
        },
        limit: 1
      }

      const services = await client.request(readItems('services', query))
      return services[0] as Service | undefined
    } catch (error) {
      console.error('Error fetching service:', error)
      return undefined
    }
  }

  return {
    getServices,
    getServiceBySlug
  }
}

