/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  poweredByHeader: false,
  transpilePackages: ["motion"],
  async redirects() {
    return [{ source: "/realisations", destination: "/nos-projets", permanent: true }];
  },
};

module.exports = nextConfig;

