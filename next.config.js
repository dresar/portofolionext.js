/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Disable cache untuk development - live server mode
  generateEtags: false,
  
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
    // Handle external images yang mungkin gagal
    unoptimized: false,
    // Disable image cache
    minimumCacheTTL: 0,
  },

  webpack: (config, { isServer, dev }) => {
    // Fix for NextAuth
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    
    // Fix for React Three Fiber - exclude from server bundle
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push({
        '@react-three/fiber': 'commonjs @react-three/fiber',
        '@react-three/drei': 'commonjs @react-three/drei',
        '@react-three/rapier': 'commonjs @react-three/rapier',
        'three': 'commonjs three',
        'meshline': 'commonjs meshline',
      })
    }
    
    // Fix untuk hot reload di Windows - tanpa cache
    if (dev) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 200, // Delay lebih cepat untuk live reload
        ignored: /node_modules/,
      }
      // Disable cache untuk development
      config.cache = false
    }
    
    return config
  },
}

module.exports = nextConfig
