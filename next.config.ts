import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  // The mirror route handles trailing slashes itself, the same way WordPress does.
  skipTrailingSlashRedirect: true,
  // Bundle the mirrored pages with the route that serves them.
  outputFileTracingIncludes: { "/[[...path]]": ["./mirror/**/*"] },
};

export default nextConfig;
