import { Html, Head, Main, NextScript } from 'next/document';
import React, { FC } from 'react';

const Document: FC = () => {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="Buy and sell single-family homes in minutes."
        />
        <meta property="og:url" content="https://onchain.roofstock.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Roofstock onChain" />
        <meta
          property="og:description"
          content="Buy and sell single-family homes in minutes."
        />
        <meta
          property="og:image"
          content="https://onchain.roofstock.com/images/og-image.png"
          data-rh="true"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="https://onchain.roofstock.com"
        />
        <meta property="twitter:url" content="https://onchain.roofstock.com" />
        <meta name="twitter:title" content="Roofstock onChain" />
        <meta
          name="twitter:description"
          content="Buy and sell single-family homes in minutes."
        />
        <meta
          name="twitter:image"
          content="https://onchain.roofstock.com/images/og-image.png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
