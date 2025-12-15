/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  
  // Required for GitHub Pages deployment to username.github.io/agents/
  basePath: '/agents',
  assetPrefix: '/agents/',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Ensure trailing slashes for better GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
