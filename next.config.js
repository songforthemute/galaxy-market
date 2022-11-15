/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: ["imagedelivery.net"],
    },
};

module.exports = nextConfig;
