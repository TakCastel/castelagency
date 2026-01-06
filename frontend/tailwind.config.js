/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Premium
        'purple-deep': '#1A0B2E',
        'purple-dark': '#2C0B3A',
        'purple-base': '#3A1053',
        'purple-medium': '#5A1A73',
        'purple-light': '#7B2A93',
        'violet': '#8B5CF6',
        'violet-light': '#A78BFA',
        'orange-deep': '#EA580C',
        'orange-bright': '#F97316',
        'orange-light': '#FB923C',
        'yellow-bright': '#FCD34D',
        'yellow-light': '#FDE68A',
        'yellow-warm': '#FBBF24',
        // Rétrocompatibilité
        'castel-yellow': '#FCD34D',
        'castel-orange': '#F97316',
        'castel-purple': '#3A1053',
        'castel-dark': '#1A0B2E',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1A0B2E 0%, #3A1053 50%, #5A1A73 100%)',
        'gradient-warm': 'linear-gradient(135deg, #8B5CF6 0%, #F97316 50%, #FCD34D 100%)',
        'gradient-hero': 'linear-gradient(135deg, #1A0B2E 0%, #3A1053 30%, #8B5CF6 60%, #F97316 90%, #FCD34D 100%)',
        'gradient-accent': 'linear-gradient(135deg, #7B2A93 0%, #F97316 50%, #FCD34D 100%)',
        'gradient-subtle': 'linear-gradient(180deg, rgba(26, 11, 46, 0.95) 0%, rgba(58, 16, 83, 0.9) 100%)',
      },
      boxShadow: {
        'glow-purple': '0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(249, 115, 22, 0.2)',
        'glow-orange': '0 0 30px rgba(249, 115, 22, 0.4)',
        'glow-yellow': '0 0 30px rgba(252, 211, 77, 0.3)',
      },
    },
  },
  plugins: [],
}

