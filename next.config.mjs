/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental : {
        serverActions: true,
        serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
    },
};

export default nextConfig;
