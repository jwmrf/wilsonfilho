// /** @type {import('next').NextConfig} */
// const { i18n } = require('./next-i18next.config');

// const nextConfig = {
//   reactStrictMode: true,
//   i18n,
//   images: {
//     domains: ['avatars.githubusercontent.com'],
//   },
// }

// module.exports = nextConfig
module.exports = {
  async headers() {
    return [
      {
        // Define os headers para todas as páginas
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          // Outros headers podem ser adicionados aqui
        ],
      },
    ];
  },
};
