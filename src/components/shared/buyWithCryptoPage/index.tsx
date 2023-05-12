import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { gnosis, polygon } from 'wagmi/chains';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSigner,
  useSwitchNetwork,
  useNetwork,
} from 'wagmi';
import { HiddenUI, LiFiWidget, WidgetConfig } from '@lifi/widget';

import GetFundsLayout from '../../../layout/GetFundsLayout';
import ConnectWallet from './connectWallet';
import { getSelectedChainFromBase } from '../../../functions';

import styles from './buywithcrypto.module.scss';

export default function BuyWithCryptoPage() {
  const { switchNetworkAsync } = useSwitchNetwork();
  const chainId = useNetwork()?.chain?.id;
  const { data: wagmiSigner } = useSigner();
  const { isConnected: walletIsConnected } = useAccount();
  const { connect } = useConnect();
  const { selectedChain } = useParams();
  const { disconnect } = useDisconnect();
  const location = useLocation();

  const switchChain = async (reqChainId: number) => {
    if (!walletIsConnected || !wagmiSigner) return wagmiSigner!;
    if (chainId !== reqChainId) {
      try {
        await switchNetworkAsync?.(reqChainId);
        await wagmiSigner.getChainId();
        console.log('m3');
      } catch {
        throw new Error("Couldn't switch chain.");
      }
      console.log(chainId);
      if (chainId !== reqChainId) throw new Error('Chain was not switched here');
      else return wagmiSigner!;
    }
    // console.log('hererere');
    // const newSigner = await activeConnector?.getSigner();
    // console.log(newSigner);
    return wagmiSigner!;
  };

  const widgetConfig: WidgetConfig = useMemo(() => {
    const obj: WidgetConfig = {
      toChain: getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id,
      toToken: '0x0000000000000000000000000000000000000000',
      integrator: 'Gamblr xyz',
      chains: {
        // remove OkexChain, Fuse, and Velas from chain list
        deny: [122, 66, 106],
      },
      walletManagement: {
        signer: wagmiSigner!,
        connect: async () => {
          connect();
          if (wagmiSigner) {
            return wagmiSigner!;
          } else {
            throw Error('No signer object after login');
          }
        },
        disconnect: async () => {
          try {
            disconnect();
          } catch (err) {
            console.log('LiFI Disconnect error');
          }
        },
        switchChain,
      },
      containerStyle: {
        width: '100%',
        minWidth: '280px',
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
      hiddenUI: [HiddenUI.Appearance, HiddenUI.Language, HiddenUI.ToAddress],
    };

    return obj;
  }, [wagmiSigner, connect, switchNetworkAsync, disconnect, location.pathname]);

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
