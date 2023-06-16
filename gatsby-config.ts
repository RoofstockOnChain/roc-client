require('dotenv').config();

import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Roofstock onChain`,
    siteUrl: `https://onchain.roofstock.com`,
    description: `Buy and sell single-family homes in minutes.`,
    twitterUsername: `@rsonchain`,
    image: `/images/og-image.png`,
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: `Roboto`,
            file: `https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap`,
          },
          {
            name: `Roboto Mono`,
            file: `https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap`,
          },
        ],
      },
    },
  ],
};

export default config;
