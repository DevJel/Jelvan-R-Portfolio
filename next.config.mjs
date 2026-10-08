/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: `next build` writes the whole site to ./out,
  // which Cloudflare serves as static assets (see wrangler.jsonc).
  output: 'export',
  images: {
    // The Next.js image optimizer needs a Node server; serve images as-is.
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
