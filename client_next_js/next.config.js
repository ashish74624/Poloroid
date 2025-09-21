/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND: process.env.BACKEND,
        CLOUD_NAME: process.env.CLOUD_NAME
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/dcgjy3xv7/image/upload/**',
          },
          {
            protocol:'https',
            hostname:'placehold.co',
            port:'',
            pathname:'/600x400'
          }
        ],
      },
}

module.exports = nextConfig
