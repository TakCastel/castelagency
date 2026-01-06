import { readItems } from '@directus/sdk'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  featured_image?: string
  author?: string
  categories?: string[]
  tags?: string[]
  date_published?: string
  status: string
  seo_title?: string
  seo_description?: string
}

export const useBlog = () => {
  const { client } = useDirectus()

  const getPosts = async (options?: {
    limit?: number
    status?: string
    sort?: string[]
    categories?: string[]
  }) => {
    try {
      const query: any = {
        fields: ['*', 'featured_image.*', 'author.*'],
        filter: {
          status: {
            _eq: options?.status || 'published'
          }
        },
        sort: options?.sort || ['-date_published'],
        limit: options?.limit || 10
      }

      if (options?.categories && options.categories.length > 0) {
        query.filter.categories = {
          _contains: options.categories
        }
      }

      const posts = await client.request(readItems('blog_posts', query))
      return posts as BlogPost[]
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      return []
    }
  }

  const getPostBySlug = async (slug: string) => {
    try {
      const query = {
        fields: ['*', 'featured_image.*', 'author.*'],
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

      const posts = await client.request(readItems('blog_posts', query))
      return posts[0] as BlogPost | undefined
    } catch (error) {
      console.error('Error fetching blog post:', error)
      return undefined
    }
  }

  return {
    getPosts,
    getPostBySlug
  }
}

