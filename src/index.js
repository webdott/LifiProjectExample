import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { gnosis, polygon } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { publicProvider } from 'wagmi/providers/public';

import { store } from './redux';
import App from './App';

import './index.css';
import './styles/global.scss';

const { chains, provider, webSocketProvider } = configureChains(
	[gnosis, polygon],
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

const client = createClient({
	autoConnect: true,
	connectors: [
		Connectors.METAMASK,
		Connectors.WALLET_CONNECT,
		Connectors.INJECTED,
	],
	provider,
	webSocketProvider,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<BrowserRouter>
		<React.StrictMode>
			<Provider store={store}>
				<WagmiConfig client={client}>
					<App />
				</WagmiConfig>
			</Provider>
		</React.StrictMode>
	</BrowserRouter>
);
