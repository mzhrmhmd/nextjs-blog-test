/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
      if (!isServer) {
        // Ensure `jsdom` and other Node.js-specific modules are not bundled for the browser
        config.resolve.fallback = {
          ...config.resolve.fallback,
          net: false,
          tls: false,
          fs: false,
          http: false,
          https: false,
          os: false,
        };
      }
      return config;
    },
  };
  
  export default nextConfig;
  