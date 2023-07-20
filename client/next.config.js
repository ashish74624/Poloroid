/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND: process.env.BACKEND,
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/dcgjy3xv7/image/upload/**',
          },
        ],
      },
}

module.exports = nextConfig
