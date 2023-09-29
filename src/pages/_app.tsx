import React, { FC } from 'react';
import { RocThemeProvider } from '@/providers/RocThemeProvider';
import { WagmiConfig, createConfig, mainnet, configureChains } from 'wagmi';
import { config } from '@/config';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { AppProps } from 'next/app';
import { TopBar } from '@/components/layout/TopBar';
import { Footer } from '@/components/layout/Footer';
import '../styles/global.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Analytics } from '@vercel/analytics/react';
import { MapProvider } from 'react-map-gl';

const { chains, publicClient } = configureChains(
  [mainnet],
  [w3mProvider({ projectId: config.walletConnectProjectId })]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors: w3mConnectors({
    projectId: config.walletConnectProjectId,
    version: 2,
    chains,
  }),
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <RocThemeProvider>
      <MapProvider>
        <WagmiConfig config={wagmiConfig}>
          <TopBar />
          <Component {...pageProps} />
          <Footer />
          <Web3Modal
            projectId={config.walletConnectProjectId}
            ethereumClient={ethereumClient}
          />
        </WagmiConfig>
      </MapProvider>
    </RocThemeProvider>
    <Analytics />
  </>
);

export default App;
