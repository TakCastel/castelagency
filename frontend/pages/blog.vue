<template>
  <div class="py-16 md:py-24 relative overflow-hidden">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-6xl font-extrabold text-white">Blog</h1>
        <p class="mt-4 max-w-3xl mx-auto text-lg text-gray-400">
          Découvrez nos articles sur le développement web, le design et les tendances digitales.
        </p>
      </div>

      <div v-if="pending" class="text-center text-gray-400">
        Chargement des articles...
      </div>

      <div v-else-if="error" class="text-center text-red-400">
        Erreur lors du chargement des articles.
      </div>

      <div v-else-if="posts && posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink
          v-for="post in posts"
          :key="post.id"
          :to="`/blog/${post.slug}`"
          class="bg-[#3A1053]/80 backdrop-blur-sm border border-white/10 p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 hover:border-[#FDD835] block"
        >
          <div v-if="post.featured_image" class="mb-4">
            <img
              :src="getImageUrl(post.featured_image)"
              :alt="post.title"
              class="w-full h-48 object-cover rounded-xl"
            >
          </div>
          <h2 class="text-2xl font-bold text-white mb-3">{{ post.title }}</h2>
          <p v-if="post.excerpt" class="text-gray-400 mb-4">{{ post.excerpt }}</p>
          <div v-if="post.date_published" class="text-sm text-gray-500">
            {{ formatDate(post.date_published) }}
          </div>
          <div v-if="post.categories && post.categories.length > 0" class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="category in post.categories"
              :key="category"
              class="bg-[#FDD835]/10 text-[#FDD835] text-xs font-semibold px-2.5 py-0.5 rounded-full"
            >
              {{ category }}
            </span>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center text-gray-400">
        Aucun article disponible pour le moment.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getPosts } = useBlog()
const config = useRuntimeConfig()

const { data: posts, pending, error } = await useAsyncData('blog-posts', () => 
  getPosts({ status: 'published', limit: 20 })
)

const getImageUrl = (image: any) => {
  if (!image) return ''
  if (typeof image === 'string') return image
  const directusUrl = config.public.directusUrl || 'http://localhost:8055'
  return `${directusUrl}/assets/${image.id}?width=800&quality=80`
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

