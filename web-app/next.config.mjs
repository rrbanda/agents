/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Uncomment and set this if deploying to username.github.io/repo-name/
  // basePath: '/agents',
  // assetPrefix: '/agents/',
  
  // Ensure trailing slashes for better GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
