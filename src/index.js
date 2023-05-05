import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import {
  arbitrum,
  aurora,
  avalanche,
  boba,
  bsc,
  celo,
  cronos,
  fantom,
  gnosis,
  mainnet,
  moonbeam,
  moonriver,
  optimism,
  polygon,
} from 'wagmi/chains';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { publicProvider } from 'wagmi/providers/public';

import { store } from './redux';
import App from './App';

import './index.css';
import './styles/global.scss';
import { WalletProvider } from './context/LifiWalletProvider';

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    gnosis,
    polygon,
    avalanche,
    bsc,
    arbitrum,
    avalanche,
    celo,
    aurora,
    optimism,
    fantom,
    moonriver,
    moonbeam,
    cronos,
    boba,
  ],
  [publicProvider()]
);

export const Connectors = {
  METAMASK: new MetaMaskConnector({ chains }),
  WALLET_CONNECT: new WalletConnectConnector({
    chains,
    options: { projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID },
  }),
  INJECTED: new InjectedConnector({ chains }),
};

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [Connectors.METAMASK, Connectors.WALLET_CONNECT, Connectors.INJECTED],
  provider,
  webSocketProvider,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <WagmiConfig client={wagmiClient}>
        <WalletProvider>
          <App />
        </WalletProvider>
      </WagmiConfig>
    </Provider>
  </BrowserRouter>
);
