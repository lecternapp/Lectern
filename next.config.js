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
        bodyParser: {
            sizeLimit: '50mb'
        },
        responseLimit: '50mb',
    },
}

module.exports = nextConfig 