const domains = require('./allowedImageDomains');
// const withPWA = require('next-pwa');
// const runtimeCaching = require('next-pwa/cache');

/** @type {import('next').NextConfig} */
// module.exports = withPWA({
//   pwa: {
//     runtimeCaching,
//     dest: 'public',
//     buildExcludes: [/middleware-manifest\.json$/],
//     disable: process.env.NODE_ENV === 'development',
//     // register: true,
//     // skipWaiting: true,
//   },
//   reactStrictMode: true,
// })
module.exports = {
    images: {
        domains,
    },
    reactStrictMode: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};
