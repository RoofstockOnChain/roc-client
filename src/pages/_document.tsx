import { Html, Head, Main, NextScript } from 'next/document';
import React, { FC } from 'react';
import Script from 'next/script';

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
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-MX3VKB200C"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MX3VKB200C', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');twq('config','obp9v');`,
          }}
          strategy="lazyOnload"
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
