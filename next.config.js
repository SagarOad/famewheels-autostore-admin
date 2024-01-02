/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
API_URL:process.env.NEXT_PUBLIC_BASE_URL,
IMG_URL:process.env.IMAGE_BASE_URL
  },
  reactStrictMode: true,
}

module.exports = nextConfig
