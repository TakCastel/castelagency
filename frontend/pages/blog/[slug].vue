<template>
  <div class="py-16 md:py-24 relative overflow-hidden">
    <div class="container mx-auto px-6 max-w-4xl">
      <div v-if="pending" class="text-center text-gray-400">
        Chargement de l'article...
      </div>

      <div v-else-if="error || !post" class="text-center text-red-400">
        Article non trouvé.
      </div>

      <div v-else>
        <NuxtLink to="/blog" class="text-[#FDD835] hover:text-yellow-300 mb-6 inline-block">
          ← Retour au blog
        </NuxtLink>

        <article>
          <header class="mb-8">
            <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-4">{{ post.title }}</h1>
            <div class="flex items-center gap-4 text-gray-400 mb-4">
              <span v-if="post.date_published">{{ formatDate(post.date_published) }}</span>
              <span v-if="post.author">par {{ post.author }}</span>
            </div>
            <div v-if="post.categories && post.categories.length > 0" class="flex flex-wrap gap-2">
              <span
                v-for="category in post.categories"
                :key="category"
                class="bg-[#FDD835]/10 text-[#FDD835] text-sm font-semibold px-3 py-1 rounded-full"
              >
                {{ category }}
              </span>
            </div>
          </header>

          <div v-if="post.featured_image" class="mb-8">
            <img
              :src="getImageUrl(post.featured_image)"
              :alt="post.title"
              class="w-full h-96 object-cover rounded-3xl"
            >
          </div>

          <div v-if="post.excerpt" class="text-xl text-gray-300 mb-8 italic">
            {{ post.excerpt }}
          </div>

          <div v-if="post.content" class="prose prose-invert max-w-none mb-8" v-html="post.content"></div>

          <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mt-8 pt-8 border-t border-white/10">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="bg-[#FDD835]/10 text-[#FDD835] text-sm font-semibold px-3 py-1 rounded-full"
            >
              #{{ tag }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getPostBySlug } = useBlog()
const config = useRuntimeConfig()

const slug = route.params.slug as string

const { data: post, pending, error } = await useAsyncData(`blog-post-${slug}`, () => 
  getPostBySlug(slug)
)

const getImageUrl = (image: any) => {
  if (!image) return ''
  if (typeof image === 'string') return image
  const directusUrl = config.public.directusUrl || 'http://localhost:8055'
  return `${directusUrl}/assets/${image.id}?width=1200&quality=80`
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
}

// SEO
useHead({
  title: post.value ? `${post.value.title} - Castel Web & Design` : 'Article - Castel Web & Design',
  meta: [
    {
      name: 'description',
      content: post.value?.excerpt || post.value?.seo_description || 'Découvrez nos articles'
    }
  ]
})
</script>

