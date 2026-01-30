/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // "standalone" uniquement pour Docker ; Netlify utilise son propre runtime Next.js
  ...(process.env.NETLIFY ? {} : { output: "standalone" }),
  poweredByHeader: false,
  transpilePackages: ["motion"],
  async redirects() {
    return [{ source: "/realisations", destination: "/nos-projets", permanent: true }];
  },
};

module.exports = nextConfig;

