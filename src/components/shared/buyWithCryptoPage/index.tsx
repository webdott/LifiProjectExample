import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { gnosis, polygon } from 'wagmi/chains';
import { useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';
import { HiddenUI, LiFiWidget, WidgetConfig } from '@lifi/widget';

import GetFundsLayout from '../../../layout/GetFundsLayout';
import ConnectWallet from './connectWallet';

import styles from './buywithcrypto.module.scss';
import { getSelectedChainFromBase } from '../../../functions';

export default function BuyWithCryptoPage() {
  const [signer, setSigner] = useState();
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const { isConnected: walletIsConnected, connector: activeConnector } = useAccount();
  const { connect } = useConnect();
  const { selectedChain } = useParams();
  const { disconnect } = useDisconnect();
  const location = useLocation();

  useEffect(() => {
    const getSigner = async () => {
      const signer = await activeConnector?.getSigner();
      setSigner(signer);
    };

    if (activeConnector) getSigner();
  }, [activeConnector, location.pathname, chain]);

  const widgetConfig: WidgetConfig = useMemo(() => {
    console.log(signer);
    return {
      toChain: getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id,
      toToken: '0x0000000000000000000000000000000000000000',
      integrator: 'Gamblr xyz',
      chains: {
        // remove OkexChain, Fuse, and Velas from chain list
        deny: [122, 66, 106],
      },
      walletManagement: {
        signer: signer!,
        connect: async () => {
          connect();
          if (signer) {
            return signer!;
          } else {
            throw Error('No signer object after login');
          }
        },
        disconnect: async () => {
          disconnect();
        },
        switchChain: async (reqChainId: number) => {
          await switchNetworkAsync?.(reqChainId);
          if (signer) {
            return signer!;
          } else {
            throw Error('No signer object after chain switch');
          }
        },
      },
      containerStyle: {
        width: '100%',
        maxWidth: '100%',
        border: '1px solid #2c2c2e',
        borderRadius: '10px',
      },
      theme: {
        palette: {
          primary: { main: '#05a56c' },
          secondary: { main: '#1c1c1e' },
        },
        shape: {
          borderRadius: 6,
          borderRadiusSecondary: 6,
        },
      },
      appearance: 'dark',
      hiddenUI: [HiddenUI.Appearance, HiddenUI.Language, HiddenUI.PoweredBy],
    };
  }, [signer, connect, switchNetworkAsync, disconnect, location.pathname]);

  return (
    <GetFundsLayout token={selectedChain === 'polygon' ? 'USDT' : 'XDAI'}>
      <div className={styles.buyCrypto}>
        <div className={styles.options}>
          <div className={styles.header}>Select Crypto</div>
          {walletIsConnected ? (
            <LiFiWidget integrator='Gamblr xyz' config={widgetConfig} />
          ) : (
            <ConnectWallet />
          )}
        </div>
      </div>
    </GetFundsLayout>
  );
}
