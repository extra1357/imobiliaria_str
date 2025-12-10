/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output standalone - não funciona bem com Cloudflare
  experimental: {
    serverActions: {
      allowedOrigins: ['imobiliariastr.com', '*.pages.dev']
    }
  },
  // Força rotas dinâmicas para não tentar static generation
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' }
        ]
      }
    ]
  }
}

module.exports = nextConfig