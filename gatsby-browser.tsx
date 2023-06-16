import * as React from 'react';
import type { GatsbyBrowser } from 'gatsby';
import { Web3Modal } from '@web3modal/react';
import { config } from './src/config';
import { configureChains, createConfig, mainnet, WagmiConfig } from 'wagmi';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { RocThemeProvider } from './src/providers/RocThemeProvider';
import { Layout } from './src/components/Layout';

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

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => {
  return <Layout>{element}</Layout>;
};

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  return (
    <RocThemeProvider>
      <WagmiConfig config={wagmiConfig}>
        {element}
        <Web3Modal
          projectId={config.walletConnectProjectId}
          ethereumClient={ethereumClient}
        />
      </WagmiConfig>
    </RocThemeProvider>
  );
};
