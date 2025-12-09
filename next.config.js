/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: ['imobiliariastr.com', '*.pages.dev']
    }
  }
}

module.exports = nextConfig