<template>
  <footer class="bg-black/30">
    <div class="container mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Heading :level="3" color="white" class="mb-2">
            <span class="text-[#FDD835]">Castel</span> Agency
          </Heading>
          <Text color="secondary" class="mt-2">
            Votre partenaire digital à Avignon. <br>Performance, pérennité, proximité.
          </Text>
          <Text size="sm" color="tertiary" class="mt-4">
            84000 Avignon, France
          </Text>
        </div>
        <div>
          <Heading :level="4" color="white" class="mb-4">Navigation</Heading>
          <ul class="mt-4 space-y-2">
            <li v-for="item in navItems" :key="item.path">
              <NuxtLink :to="item.path" class="text-gray-400 hover:text-white transition-colors duration-300">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <Heading :level="4" color="white" class="mb-4">Contact</Heading>
          <ul class="mt-4 space-y-2 text-gray-400">
            <li>contact@castelagency.fr</li>
            <li>+33 6 12 34 56 78</li>
          </ul>
        </div>
      </div>
      <div class="mt-12 border-t border-white/10 pt-6 text-center text-gray-500 text-sm">
        <Text size="sm" color="tertiary">
          &copy; 2024 Castel Agency. Tous droits réservés.
        </Text>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Heading from '~/components/atoms/Typography/Heading.vue'
import Text from '~/components/atoms/Typography/Text.vue'

const navItems = [
  { path: '/', label: 'Accueil' },
  { path: '/agence', label: 'L\'agence' },
  { path: '/services', label: 'Services' },
  { path: '/methodologie', label: 'Méthodologie' },
  { path: '/projets', label: 'Projets' },
  { path: '/blog', label: 'Blog' },
  { path: '/partenaires', label: 'Partenaires' },
  { path: '/contact', label: 'Contact' },
]
</script>

