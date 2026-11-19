const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /**
   * En-têtes de sécurité sur toutes les réponses. Pas de CSP sur les scripts :
   * GTM / GA4 injectent du JS inline ; on verrouille seulement l'encadrement, <base> et <object>.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
  transpilePackages: ["motion"],
  // Racine pour le tracing (évite le warning lockfiles sur Netlify quand base = "frontend")
  outputFileTracingRoot: path.join(__dirname),
  // Le roman est lu avec fs au rendu : on s'assure qu'il est embarqué au déploiement.
  outputFileTracingIncludes: {
    "/creations/ecritures/l-homme-au-masque-de-verre": ["./data/content/ecritures/**/*"],
  },
  /** Formats servis par l’optimiseur d’images (grille + zoom modale). */
  images: {
    formats: ["image/avif", "image/webp"],
    // Tailles mobiles en premier pour LCP plus léger sur mobile (Lighthouse)
    deviceSizes: [375, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Qualités utilisées via <Image quality={…}> dans le code (requis à partir de Next 16)
    qualities: [70, 75, 90],
  },
  /**
   * Ancien site d'agence web : toutes les anciennes pages publiques renvoient vers l'accueil
   * (l'ancre #contact ne peut pas être portée par une redirection serveur).
   */
  async redirects() {
    const legacyRoutes = [
      "/services",
      "/services/:path*",
      "/nos-projets",
      "/nos-projets/:path*",
      "/realisations",
      "/blog",
      "/blog/:path*",
      "/le-studio",
      "/contact",
      "/devis",
      "/mode-de-fonctionnement",
      "/developpeur-web-avignon",
    ];
    const toHome = legacyRoutes.map((source) => ({ source, destination: "/", permanent: true }));
    return [
      // Ordre : les règles précises d'abord.
      { source: "/mes-projets/pavat", destination: "/jeux/pavat", permanent: true },
      { source: "/mes-projets/prehistopia", destination: "/jeux/prehistopia", permanent: true },
      { source: "/mes-projets/brice", destination: "/projets", permanent: true },
      { source: "/mes-projets", destination: "/projets", permanent: true },
      { source: "/mes-projets/:slug", destination: "/projets/:slug", permanent: true },
      { source: "/dessins", destination: "/creations", permanent: true },
      { source: "/creations/dessins", destination: "/creations", permanent: true },
      { source: "/creations/ecritures", destination: "/creations", permanent: true },
      ...toHome,
    ];
  },
};

module.exports = nextConfig;

