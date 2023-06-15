import React from 'react';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { RocThemeProvider } from './providers/RocThemeProvider';
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';
import { WagmiConfig, createConfig, mainnet, configureChains } from 'wagmi';
import { config } from './config';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';

const rootElement = document.getElementById('root') as Element;
const root = createRoot(rootElement);

const { chains, publicClient } = configureChains(
  [mainnet],
  [w3mProvider({ projectId: config.walletConnectProjectId })]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors: w3mConnectors({
    projectId: config.walletConnectProjectId,
    version: 1,
    chains,
  }),
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <RocThemeProvider>
          <WagmiConfig config={wagmiConfig}>
            <App />
            <Web3Modal
              projectId={config.walletConnectProjectId}
              ethereumClient={ethereumClient}
            />
          </WagmiConfig>
        </RocThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
