// This file sets a custom webpack configuration to use your Next.js app

/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const StylelintPlugin = require("stylelint-webpack-plugin");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n,
  webpack(config) {
    config.plugins.push(new StylelintPlugin());
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test(".svg")
    );
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: require.resolve("@svgr/webpack"),
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
