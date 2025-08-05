/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com', // Allows images from various Google user content domains
        port: '',
        pathname: '**', // Allows any path on the specified hostname
      },
    ],
  },
};

module.exports = nextConfig;