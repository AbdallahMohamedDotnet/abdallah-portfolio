/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Only use static export for production builds (GitHub Pages)
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    distDir: 'out',
    trailingSlash: true,
  }),
  basePath: process.env.NODE_ENV === 'production' ? '/abdallah-s-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/abdallah-s-portfolio/' : '',
}

export default nextConfig
