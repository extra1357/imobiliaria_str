/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output standalone - não funciona bem com Cloudflare
  experimental: {
    serverActions: {
      allowedOrigins: ['imobiliariastr.com', '*.pages.dev']
    }
  },
  
  // Redireciona /site para o HTML estático
  async rewrites() {
    return [
      {
        source: '/site',
        destination: '/site/index.html',
      },
    ];
  },
  
  // Headers para cache
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' }
        ]
      },
      {
        source: '/site/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      }
    ]
  }
}

module.exports = nextConfig