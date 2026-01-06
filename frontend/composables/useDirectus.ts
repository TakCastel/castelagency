import { createDirectus, rest, staticToken } from '@directus/sdk'

// Définir le schéma Directus
interface Schema {
  services: any[]
  projects: any[]
  blog_posts: any[]
  partners: any[]
  contacts: any[]
}

export const useDirectus = () => {
  const config = useRuntimeConfig()
  // Utiliser l'URL depuis la configuration Nuxt (accessible côté client et serveur)
  // En Docker: DIRECTUS_URL=http://directus:8055
  // En local: DIRECTUS_URL=http://localhost:8055 ou NUXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
  const directusUrl = config.public.directusUrl || 'http://localhost:8055'

  const client = createDirectus<Schema>(directusUrl)
    .with(rest())
    // Ajoutez l'authentification si nécessaire
    // .with(staticToken('your-static-token'))

  return {
    client,
    directusUrl
  }
}

