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
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { publicProvider } from 'wagmi/providers/public';

import { store } from './redux';
import ErrorBoundary from './components/shared/ErrorBoundary';
import App from './App';

import './index.css';
import './styles/global.scss';

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
      <WagmiConfig client={wagmiClient}>
        <ErrorBoundary fallback={'something went wrong'}>
          <App />
        </ErrorBoundary>
      </WagmiConfig>
    </Provider>
  </BrowserRouter>
);
