import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true }, 
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        protocol: "https", // Allow images over HTTPS
        hostname: "**", // Allow any domain
        pathname: "/**", // Allow images from any path on the domain
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
export default withNextIntl(nextConfig);