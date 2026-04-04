import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  cacheComponents: true,

  experimental: {
    optimizePackageImports: ["lucide-react"],
    optimizeCss: true,
    turbopackFileSystemCacheForDev: true,
  },

  logging: {
    browserToTerminal: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 30 * 60,
    deviceSizes: [360, 640, 768, 1024, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85, 95],
  },

  async headers() {
    return [
      {
        source: "/:all*(webp|jpg|jpeg|png|svg|gif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, immutable",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
