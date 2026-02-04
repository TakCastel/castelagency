const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // "standalone" uniquement pour Docker ; Netlify utilise son propre runtime Next.js
  ...(process.env.NETLIFY ? {} : { output: "standalone" }),
  poweredByHeader: false,
  transpilePackages: ["motion"],
  // Racine pour le tracing (évite le warning lockfiles sur Netlify quand base = "frontend")
  outputFileTracingRoot: path.join(__dirname),
  /** Formats servis par l’optimiseur d’images (grille + zoom modale). */
  images: {
    formats: ["image/avif", "image/webp"],
    // Tailles mobiles en premier pour LCP plus léger sur mobile (Lighthouse)
    deviceSizes: [375, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      { source: "/realisations", destination: "/mes-projets", permanent: true },
      { source: "/nos-projets", destination: "/mes-projets", permanent: true },
      { source: "/nos-projets/:path*", destination: "/mes-projets/:path*", permanent: true },
      { source: "/blog/allez-vas-y", destination: "/blog/se-lancer-sur-le-web-concretiser-projet-site-internet", permanent: true },
    ];
  },
};

module.exports = nextConfig;

