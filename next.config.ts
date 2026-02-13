import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      fs: { browser: './src/lib/empty-module.ts' },
      path: { browser: './src/lib/empty-module.ts' },
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        util: false,
        events: false,
        http: false,
        https: false,
        url: false,
        zlib: false,
        punycode: false,
      };
    }
    return config;
  },
};

export default nextConfig;
