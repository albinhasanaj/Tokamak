/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5000', // Specify the port your Flask server is using
                pathname: '/image/**', // Match all image paths under /image
            },
        ],
        domains: ['picsum.photos', 'prnt.sc'], // Add any other domains you need
    },
};

export default nextConfig;
