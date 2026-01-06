<template>
  <div 
    :class="[
      'absolute inset-0 -z-10 overflow-hidden pointer-events-none',
      variantClasses
    ]"
  >
    <!-- Fond de base avec gradient -->
    <div class="absolute inset-0 bg-gradient-hero opacity-100"></div>
    
    <!-- SVG avec formes abstraites -->
    <svg 
      class="absolute inset-0 w-full h-full" 
      preserveAspectRatio="xMidYMid slice" 
      viewBox="0 0 1920 1080" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <!-- Gradients pour les blobs -->
        <linearGradient id="blob-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.4" />
          <stop offset="50%" stop-color="#F97316" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#FCD34D" stop-opacity="0.2" />
        </linearGradient>
        
        <linearGradient id="blob-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#7B2A93" stop-opacity="0.35" />
          <stop offset="50%" stop-color="#8B5CF6" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#F97316" stop-opacity="0.15" />
        </linearGradient>
        
        <linearGradient id="blob-gradient-3" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stop-color="#FCD34D" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0.2" />
        </linearGradient>
        
        <radialGradient id="blob-gradient-4" cx="50%" cy="50%">
          <stop offset="0%" stop-color="#F97316" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#3A1053" stop-opacity="0.1" />
        </radialGradient>
        
        <!-- Motif pointillé subtil -->
        <pattern id="dot-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1.5" fill="#8B5CF6" opacity="0.15" />
        </pattern>
        
        <!-- Filtre de flou pour profondeur -->
        <filter id="blur-soft">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
        
        <filter id="blur-medium">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
        </filter>
      </defs>
      
      <!-- Motif pointillé de fond -->
      <rect width="100%" height="100%" fill="url(#dot-pattern)" opacity="0.3" />
      
      <!-- Blob 1 - Grand blob organique en haut à gauche -->
      <path 
        d="M-200,-100 C-50,-150, 150,-120, 300,-80 C450,-40, 550,20, 600,100 C650,180, 620,280, 550,350 C480,420, 380,450, 280,440 C180,430, 80,380, 20,300 C-40,220, -80,120, -100,20 C-120,-80, -150,-120, -200,-100 Z" 
        fill="url(#blob-gradient-1)" 
        filter="url(#blur-soft)"
        class="animate-pulse-slow"
        style="animation-duration: 8s;"
      />
      
      <!-- Blob 2 - Blob moyen en haut à droite -->
      <path 
        d="M1400,-150 C1550,-180, 1700,-140, 1800,-80 C1900,-20, 1950,80, 1920,180 C1890,280, 1820,350, 1720,390 C1620,430, 1500,440, 1400,400 C1300,360, 1220,280, 1200,180 C1180,80, 1250,-120, 1400,-150 Z" 
        fill="url(#blob-gradient-2)" 
        filter="url(#blur-medium)"
        class="animate-pulse-slow"
        style="animation-duration: 10s; animation-delay: 1s;"
      />
      
      <!-- Blob 3 - Blob vertical au centre gauche -->
      <path 
        d="M100,400 C150,300, 200,200, 250,150 C300,100, 380,80, 450,120 C520,160, 580,240, 600,340 C620,440, 600,540, 550,620 C500,700, 420,750, 340,760 C260,770, 180,740, 120,680 C60,620, 20,540, 10,450 C0,360, 50,500, 100,400 Z" 
        fill="url(#blob-gradient-3)" 
        filter="url(#blur-soft)"
        opacity="0.6"
        class="animate-pulse-slow"
        style="animation-duration: 12s; animation-delay: 2s;"
      />
      
      <!-- Blob 4 - Blob en bas à droite -->
      <path 
        d="M1600,800 C1750,850, 1850,950, 1900,1050 C1950,1150, 1920,1200, 1850,1250 C1780,1300, 1680,1320, 1580,1300 C1480,1280, 1380,1230, 1320,1150 C1260,1070, 1240,960, 1280,860 C1320,760, 1400,680, 1500,650 C1600,620, 1450,750, 1600,800 Z" 
        fill="url(#blob-gradient-4)" 
        filter="url(#blur-medium)"
        class="animate-pulse-slow"
        style="animation-duration: 9s; animation-delay: 0.5s;"
      />
      
      <!-- Blob 5 - Petit blob accent en bas à gauche -->
      <path 
        d="M-100,900 C50,950, 200,980, 350,960 C500,940, 600,880, 650,800 C700,720, 700,620, 650,540 C600,460, 500,400, 380,390 C260,380, 140,420, 60,500 C-20,580, -50,680, -30,780 C-10,880, -250,850, -100,900 Z" 
        fill="url(#blob-gradient-1)" 
        filter="url(#blur-soft)"
        opacity="0.5"
        class="animate-pulse-slow"
        style="animation-duration: 11s; animation-delay: 1.5s;"
      />
      
      <!-- Lignes géométriques subtiles -->
      <g opacity="0.2" stroke="#8B5CF6" stroke-width="2" fill="none">
        <!-- Courbe organique 1 -->
        <path 
          d="M 0,300 Q 300,200 600,250 T 1200,300" 
          stroke-dasharray="10,10"
          filter="url(#blur-soft)"
        />
        
        <!-- Courbe organique 2 -->
        <path 
          d="M 1920,600 Q 1500,500 1000,550 T 200,600" 
          stroke-dasharray="15,15"
          filter="url(#blur-soft)"
        />
        
        <!-- Courbe verticale -->
        <path 
          d="M 400,0 Q 450,300 500,600 T 600,1080" 
          stroke-dasharray="8,12"
          filter="url(#blur-soft)"
        />
      </g>
      
      <!-- Formes géométriques arrondies subtiles -->
      <g opacity="0.15">
        <!-- Cercle flou -->
        <circle 
          cx="1600" 
          cy="300" 
          r="120" 
          fill="#FCD34D" 
          filter="url(#blur-medium)"
        />
        
        <!-- Cercle flou 2 -->
        <circle 
          cx="300" 
          cy="800" 
          r="100" 
          fill="#F97316" 
          filter="url(#blur-medium)"
        />
        
        <!-- Ellipse organique -->
        <ellipse 
          cx="1400" 
          cy="700" 
          rx="150" 
          ry="80" 
          fill="#8B5CF6" 
          filter="url(#blur-soft)"
          transform="rotate(-25 1400 700)"
        />
      </g>
      
      <!-- Zone centrale calme - masque pour le texte -->
      <defs>
        <radialGradient id="center-mask" cx="50%" cy="50%">
          <stop offset="0%" stop-color="rgba(26, 11, 46, 0.3)" />
          <stop offset="50%" stop-color="rgba(26, 11, 46, 0.5)" />
          <stop offset="100%" stop-color="rgba(26, 11, 46, 0.8)" />
        </radialGradient>
      </defs>
      <rect 
        width="100%" 
        height="100%" 
        fill="url(#center-mask)" 
        opacity="0.4"
      />
    </svg>
    
    <!-- Overlay de profondeur supplémentaire -->
    <div class="absolute inset-0 bg-gradient-to-b from-purple-deep/20 via-transparent to-purple-deep/30"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'hero' | 'section' | 'landing' | 'minimal'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const variantClasses = computed(() => {
  const variants = {
    default: 'bg-gradient-hero',
    hero: 'bg-gradient-hero',
    section: 'bg-gradient-primary',
    landing: 'bg-gradient-warm',
    minimal: 'bg-gradient-subtle'
  }
  return variants[props.variant]
})
</script>

<style scoped>
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}
</style>