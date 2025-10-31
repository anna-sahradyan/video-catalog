import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    async redirects() {
        return [
            {
                source: '/old-page',
                destination: '/new-page',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
