const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  pwa: {
    runtimeCaching,
    dest: 'public',
    buildExcludes: [/middleware-manifest\.json$/],
    disable: process.env.NODE_ENV === 'development',
    // register: true,
    // skipWaiting: true,
  },
  reactStrictMode: true,
})