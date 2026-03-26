import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  cacheComponents: true,

  experimental: {
    optimizePackageImports: [],
    optimizeCss: true,
    turbopackFileSystemCacheForDev: true,
  },

  logging: {
    browserToTerminal: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
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
