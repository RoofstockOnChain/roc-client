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

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => {
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