import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

export const config = {
  matcher: ["/dashboard/:path*"],
};
