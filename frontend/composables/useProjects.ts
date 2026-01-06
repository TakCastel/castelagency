import { readItems } from '@directus/sdk'

interface Project {
  id: string
  title: string
  slug: string
  description?: string
  content?: string
  image?: string
  gallery?: string[]
  client?: string
  tags?: string[]
  date_start?: string
  date_end?: string
  status: string
  sort?: number
}

export const useProjects = () => {
  const { client } = useDirectus()

  const getProjects = async (options?: {
    limit?: number
    status?: string
    sort?: string[]
  }) => {
    try {
      const query: any = {
        fields: ['*', 'image.*'],
        filter: {
          status: {
            _eq: options?.status || 'published'
          }
        },
        sort: options?.sort || ['-sort', '-date_created'],
        limit: options?.limit || 100
      }

      const projects = await client.request(readItems('projects', query))
      return projects as Project[]
    } catch (error) {
      console.error('Error fetching projects:', error)
      return []
    }
  }

  const getProjectBySlug = async (slug: string) => {
    try {
      const query = {
        fields: ['*', 'image.*', 'gallery.*'],
        filter: {
          slug: {
            _eq: slug
          },
          status: {
            _eq: 'published'
          }
        },
        limit: 1
      }

      const projects = await client.request(readItems('projects', query))
      return projects[0] as Project | undefined
    } catch (error) {
      console.error('Error fetching project:', error)
      return undefined
    }
  }

  return {
    getProjects,
    getProjectBySlug
  }
}

