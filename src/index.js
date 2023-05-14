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
import { DAppProvider } from '@usedapp/core';
import { Gnosis } from '@usedapp/core';
import { ethers } from 'ethers';
import { Polygon } from '@usedapp/core';

// export const LocalGnosisChain = {
//   id: 137,
//   name: 'Polygon',
//   network: 'Polygon',
//   nativeCurrency: {
//     decimals: 8,
//     name: 'Polygon',
//     symbol: 'Matic',
//   },
//   rpcUrls: {
//     default: {
//       http: ['http://127.0.0.1:8545'],
//     },
//     public: {
//       http: ['http://127.0.0.1:8545'],
//     },
//   },
// };
export const LocalGnosisChain = {
  id: 100,
  name: 'Gnosis',
  network: 'Gnosis',
  nativeCurrency: {
    decimals: 18,
    name: 'Gnosis',
    symbol: 'xDAI',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
    public: {
      http: ['http://127.0.0.1:8545'],
    },
  },
};
export const { chains, provider, webSocketProvider } = configureChains(
  [LocalGnosisChain],
  [publicProvider()]
);
// const { chains, provider, webSocketProvider } = configureChains(
//   [
//     mainnet,
//     gnosis,
//     polygon,
//     avalanche,
//     bsc,
//     arbitrum,
//     avalanche,
//     celo,
//     aurora,
//     optimism,
//     fantom,
//     moonriver,
//     moonbeam,
//     cronos,
//     boba,
//   ],
//   [publicProvider()]
// );

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

const config = {
  // readOnlyChainId: Polygon.chainId,
  // readOnlyUrls: {
  //   // in this tutorial we use Ankr public RPC. It's free and has it's own limits
  //   // in the production version with a large number of users, we do not recommend using it
  //   [Polygon.chainId]: new ethers.providers.StaticJsonRpcProvider('http://127.0.0.1:8545'),
  // },
};
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <DAppProvider config={config}>
        <WagmiConfig client={wagmiClient}>
          <WalletProvider>
            <App />
          </WalletProvider>
        </WagmiConfig>
      </DAppProvider>
    </Provider>
  </BrowserRouter>
);
