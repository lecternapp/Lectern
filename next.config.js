/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                ],
            },
        ]
    },
    api: {
        bodyParser: false, // Disables body parsing, as we're handling raw files
        responseLimit: '50mb',
    },
}

module.exports = nextConfig 