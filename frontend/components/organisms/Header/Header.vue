<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled ? 'bg-purple-deep/95 backdrop-blur-xl shadow-lg shadow-yellow-bright/10' : 'bg-transparent'
    ]"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-20">
        <NuxtLink 
          to="/" 
          class="group relative flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
          @click="closeMobileMenu"
        >
          <span class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            <span class="text-yellow-bright relative inline-block">
              Castel
              <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-bright to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </span>
            <span class="text-white/90 ml-1">Web</span>
          </span>
        </NuxtLink>

        <nav class="hidden lg:flex items-center space-x-1">
          <div
            v-for="item in navItems"
            :key="item.path"
            class="relative mega-menu-container"
            @mouseenter="item.hasMegaMenu ? openMegaMenu(item.path) : null"
            @mouseleave="item.hasMegaMenu ? closeMegaMenu() : null"
          >
            <NavigationItem
              :to="item.path"
              :active="getIsActive(item.path)"
              class="px-4 py-2 rounded-lg transition-all duration-200"
              :class="item.hasMegaMenu && activeMegaMenu === item.path ? 'text-orange-bright' : ''"
            >
              {{ item.label }}
              <svg
                v-if="item.hasMegaMenu"
                class="inline-block w-4 h-4 ml-1 transition-transform duration-200"
                :class="activeMegaMenu === item.path ? 'rotate-180' : ''"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </NavigationItem>
            
            <MegaMenu
              v-if="item.hasMegaMenu && item.megaMenuColumns"
              :is-open="activeMegaMenu === item.path"
              :columns="item.megaMenuColumns"
              :footer="item.megaMenuFooter"
              @close="closeMegaMenu"
              @item-click="closeMegaMenu"
            />
          </div>
        </nav>

        <button 
          @click="toggleMobileMenu" 
          class="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-bright/50"
          :aria-label="isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
        >
          <div class="relative w-5 h-5">
            <span 
              class="absolute top-0 left-0 w-full h-0.5 bg-white rounded-full transition-all duration-300"
              :class="isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''"
            ></span>
            <span 
              class="absolute top-2 left-0 w-full h-0.5 bg-white rounded-full transition-all duration-300"
              :class="isMobileMenuOpen ? 'opacity-0' : 'opacity-100'"
            ></span>
            <span 
              class="absolute top-4 left-0 w-full h-0.5 bg-white rounded-full transition-all duration-300"
              :class="isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''"
            ></span>
          </div>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isMobileMenuOpen"
        class="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 top-16 sm:top-20"
        @click="closeMobileMenu"
      ></div>
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <nav 
        v-if="isMobileMenuOpen"
        class="lg:hidden fixed top-16 sm:top-20 right-0 bottom-0 w-80 max-w-[85vw] bg-gradient-to-b from-[#2C0B3A] via-[#3A1053] to-[#2C0B3A] backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
      >
        <div class="px-6 py-8 space-y-2">
          <div class="mb-8 pb-6 border-b border-white/10">
            <h2 class="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Navigation</h2>
          </div>
          
          <NuxtLink
            v-for="(item, index) in navItems"
            :key="item.path"
            :to="item.path"
            @click="closeMobileMenu"
            class="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-[#FDD835]/30 transition-all duration-200 transform hover:translate-x-1 group"
            :class="getIsActive(item.path) ? 'bg-[#FDD835]/10 border-[#FDD835]/30 text-[#FDD835]' : 'text-white/90'"
          >
            <span class="flex items-center justify-between">
              <span class="font-medium">{{ item.label }}</span>
              <svg class="w-5 h-5 text-[#FDD835]/60 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </NuxtLink>

          <div class="mt-12 pt-6 border-t border-white/10">
            <NuxtLink
              to="/contact"
              @click="closeMobileMenu"
              class="block w-full px-6 py-4 bg-gradient-to-r from-[#FDD835] to-[#F57C00] text-gray-900 font-bold rounded-xl text-center shadow-lg shadow-[#FDD835]/30 hover:shadow-xl hover:shadow-[#FDD835]/40 transition-all duration-300 transform hover:scale-105"
            >
              Nous contacter
            </NuxtLink>
          </div>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import NavigationItem from '~/components/molecules/NavigationItem/NavigationItem.vue'
import { MegaMenu } from '~/components/molecules/MegaMenu'

const route = useRoute()
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const activeMegaMenu = ref<string | null>(null)

// Icônes SVG pour le mega menu
const iconCode = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l-4 16M6 9l-4 4l4 4M18 9l4 4l-4 4"></path></svg>'
const iconDesign = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>'
const iconMobile = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>'
const iconSEO = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>'
const iconVideo = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>'
const iconCRM = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>'
const iconMaintenance = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>'
const iconAI = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>'

const navItems = [
  { 
    path: '/', 
    label: 'Accueil',
    hasMegaMenu: false
  },
  { 
    path: '/agence', 
    label: 'L\'agence',
    hasMegaMenu: false
  },
  { 
    path: '/services', 
    label: 'Services',
    hasMegaMenu: true,
    megaMenuColumns: [
      {
        title: 'Développement Web',
        items: [
          {
            label: 'WordPress',
            path: '/services/wordpress',
            description: 'Sites vitrines et e-commerce sur WordPress',
            icon: iconCode
          },
          {
            label: 'Applications Web',
            path: '/services/applications-web',
            description: 'Applications web sur-mesure et performantes',
            icon: iconCode
          },
          {
            label: 'Applications Mobile',
            path: '/services/applications-mobile',
            description: 'Applications natives et cross-platform',
            icon: iconMobile
          },
          {
            label: 'CMS et Back Office',
            path: '/services/cms-backoffice',
            description: 'Systèmes de gestion de contenu personnalisés',
            icon: iconCode
          }
        ]
      },
      {
        title: 'Performance & Visibilité',
        items: [
          {
            label: 'SEO et Performance',
            path: '/services/seo-performance',
            description: 'Optimisation pour les moteurs de recherche',
            icon: iconSEO
          },
          {
            label: 'Maintenance et Support',
            path: '/services/maintenance-support',
            description: 'Accompagnement continu et mises à jour',
            icon: iconMaintenance
          }
        ]
      },
      {
        title: 'Création & Communication',
        items: [
          {
            label: 'Design et Branding',
            path: '/services/design-branding',
            description: 'Identité visuelle et direction artistique',
            icon: iconDesign
          },
          {
            label: 'Vidéo et Communication',
            path: '/services/video-communication',
            description: 'Production vidéo et stratégie de contenu',
            icon: iconVideo
          }
        ]
      },
      {
        title: 'Solutions Métier',
        items: [
          {
            label: 'CRM et ERP',
            path: '/services/crm-erp',
            description: 'Intégration de solutions de gestion',
            icon: iconCRM
          },
          {
            label: 'Solutions IA',
            path: '/services/intelligence-artificielle',
            description: 'Automatisation et outils assistés par IA',
            icon: iconAI
          }
        ]
      }
    ],
    megaMenuFooter: {
      text: 'Besoin d\'une solution sur-mesure ?',
      cta: {
        label: 'Discutons de votre projet',
        path: '/contact'
      }
    }
  },
  { 
    path: '/expertise', 
    label: 'Expertise',
    hasMegaMenu: false
  },
  { 
    path: '/solutions', 
    label: 'Solutions',
    hasMegaMenu: true,
    megaMenuColumns: [
      {
        title: 'Solutions IA',
        items: [
          {
            label: 'Automatisation IA',
            path: '/solutions/automatisation-ia',
            description: 'Automatisez vos processus métier avec l\'IA',
            icon: iconAI
          },
          {
            label: 'Contenu Assisté par IA',
            path: '/solutions/contenu-assiste-ia',
            description: 'Générez et optimisez votre contenu efficacement',
            icon: iconAI
          },
          {
            label: 'Intégration d\'Outils IA',
            path: '/solutions/integration-outils-ia',
            description: 'Intégrez des outils IA dans vos workflows',
            icon: iconAI
          },
          {
            label: 'Positionnement IA',
            path: '/solutions/positionnement-ia',
            description: 'Stratégie d\'adoption de l\'IA pour votre entreprise',
            icon: iconAI
          }
        ]
      }
    ],
    megaMenuFooter: {
      text: 'L\'IA au service de votre productivité',
      cta: {
        label: 'Découvrir nos solutions IA',
        path: '/solutions/intelligence-artificielle'
      }
    }
  },
  { 
    path: '/projets', 
    label: 'Projets',
    hasMegaMenu: false
  },
  { 
    path: '/methodologie', 
    label: 'Méthodologie',
    hasMegaMenu: false
  },
  { 
    path: '/ressources', 
    label: 'Ressources',
    hasMegaMenu: false
  },
  { 
    path: '/contact', 
    label: 'Contact',
    hasMegaMenu: false
  }
]

const getIsActive = (path: string) => {
  const currentPath = route.path || ''
  if (path === '/') {
    return currentPath === '/'
  }
  return currentPath.startsWith(path)
}

let closeTimeout: ReturnType<typeof setTimeout> | null = null

const openMegaMenu = (path: string) => {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  activeMegaMenu.value = path
}

const closeMegaMenu = () => {
  // Petit délai pour permettre le survol entre le nav item et le mega menu
  closeTimeout = setTimeout(() => {
    activeMegaMenu.value = null
  }, 150)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (process.client) {
    if (isMobileMenuOpen.value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  if (process.client) {
    document.body.style.overflow = ''
  }
}

let handleScroll: (() => void) | null = null

onMounted(() => {
  if (process.client) {
    handleScroll = () => {
      isScrolled.value = window.scrollY > 20
    }
    
    isScrolled.value = window.scrollY > 20
    window.addEventListener('scroll', handleScroll, { passive: true })
  }
})

onBeforeUnmount(() => {
  if (process.client && handleScroll) {
    window.removeEventListener('scroll', handleScroll)
    document.body.style.overflow = ''
  }
})
</script>

