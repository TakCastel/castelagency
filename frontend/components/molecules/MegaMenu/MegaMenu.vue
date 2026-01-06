<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="isOpen"
      class="mega-menu absolute left-0 right-0 top-full mt-0 bg-gradient-to-b from-purple-deep via-purple-dark to-purple-deep border-t border-white/10 backdrop-blur-xl shadow-2xl z-50"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div
          v-for="(column, columnIndex) in columns"
          :key="columnIndex"
          class="mega-menu-column"
        >
          <h3
            v-if="column.title"
            class="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-white/10"
          >
            {{ column.title }}
          </h3>
          <ul class="space-y-2">
            <li
              v-for="(item, itemIndex) in column.items"
              :key="itemIndex"
            >
              <NuxtLink
                :to="item.path"
                class="group flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-200"
                @click="handleItemClick"
              >
                <div
                  v-if="item.icon"
                  class="flex-shrink-0 w-6 h-6 mt-0.5 text-violet-light group-hover:text-orange-bright transition-colors duration-200"
                  v-html="item.icon"
                ></div>
                <div class="flex-1 min-w-0">
                  <div class="text-white font-medium text-sm group-hover:text-orange-bright transition-colors duration-200">
                    {{ item.label }}
                  </div>
                  <div
                    v-if="item.description"
                    class="text-white/60 text-xs mt-1 line-clamp-2"
                  >
                    {{ item.description }}
                  </div>
                </div>
                <svg
                  class="w-4 h-4 text-white/40 group-hover:text-orange-bright group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      
      <div
        v-if="footer"
        class="mt-8 pt-6 border-t border-white/10"
      >
        <div class="flex items-center justify-between">
          <div class="text-sm text-white/60">
            {{ footer.text }}
          </div>
          <NuxtLink
            v-if="footer.cta"
            :to="footer.cta.path"
            class="text-sm font-semibold text-orange-bright hover:text-orange-light transition-colors duration-200 flex items-center gap-2"
            @click="handleItemClick"
          >
            {{ footer.cta.label }}
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface MegaMenuItem {
  label: string
  path: string
  description?: string
  icon?: string
}

interface MegaMenuColumn {
  title?: string
  items: MegaMenuItem[]
}

interface MegaMenuFooter {
  text?: string
  cta?: {
    label: string
    path: string
  }
}

interface Props {
  isOpen: boolean
  columns: MegaMenuColumn[]
  footer?: MegaMenuFooter
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  itemClick: []
}>()

const handleMouseEnter = () => {
  // Keep menu open on hover - do nothing, parent handles it
}

const handleMouseLeave = () => {
  // Let parent handle the close with delay
  emit('close')
}

const handleItemClick = () => {
  emit('itemClick')
  emit('close')
}
</script>

<style scoped>
.mega-menu-column {
  animation: fadeIn 0.4s ease-out;
  animation-fill-mode: both;
}

.mega-menu-column:nth-child(1) {
  animation-delay: 0.05s;
}

.mega-menu-column:nth-child(2) {
  animation-delay: 0.1s;
}

.mega-menu-column:nth-child(3) {
  animation-delay: 0.15s;
}

.mega-menu-column:nth-child(4) {
  animation-delay: 0.2s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

