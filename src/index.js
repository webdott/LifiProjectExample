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
import { WalletConnectLegacyConnector } from '@wagmi/core/connectors/walletConnectLegacy';
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { publicProvider } from 'wagmi/providers/public';

import { store } from './redux';
import App from './App';

import './index.css';
import './styles/global.scss';
<<<<<<< HEAD
import { WalletProvider } from './context/LifiWalletProvider';
import { DAppProvider } from '@usedapp/core';
=======
import ErrorBoundary from './components/shared/ErrorBoundary';
>>>>>>> 86c399f253530e4821e6d0ea6fd51fdde8b15441

// LOCAL TESTING
// export const LocalGnosisChain = {
//   ...gnosis,
//   rpcUrls: {
//     default: {
//       http: ['http://127.0.0.1:8545'],
//     },
//     public: {
//       http: ['http://127.0.0.1:8545'],
//     },
//   },
// };
// export const { chains, provider, webSocketProvider } = configureChains(
//   [LocalGnosisChain],
//   [publicProvider()]
// );
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
  WALLET_CONNECT: new WalletConnectLegacyConnector({
    chains,
    options: {
      qrcode: true,
    },
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
      <DAppProvider config={{}}>
        <WagmiConfig client={wagmiClient}>
        <ErrorBoundary fallback={'something went wrong'}>
            <App />
        </ErrorBoundary>
        </WagmiConfig>
      </DAppProvider>
    </Provider>
  </BrowserRouter>
);
