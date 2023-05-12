import { useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { gnosis, polygon } from 'wagmi/chains';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSigner,
  useSwitchNetwork,
  useProvider,
} from 'wagmi';
import { HiddenUI, LiFiWidget, WidgetConfig } from '@lifi/widget';

import GetFundsLayout from '../../../layout/GetFundsLayout';
import ConnectWallet from './connectWallet';
import { getSelectedChainFromBase } from '../../../functions';

import styles from './buywithcrypto.module.scss';

export default function BuyWithCryptoPage() {
  const { switchNetworkAsync } = useSwitchNetwork();
  const { data: wagmiSigner } = useSigner();
  const provider = useProvider();
  const { isConnected: walletIsConnected, connector: activeConnector } = useAccount();
  const { connect } = useConnect();
  const { selectedChain } = useParams();
  const { disconnect } = useDisconnect();
  const location = useLocation();

  useEffect(() => {
    wagmiSigner?.provider?.once('chainChanged', (id: string) => {
      console.log(id, 'meowmeow');
    });
  }, [provider]);

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
        switchChain: async (reqChainId: number) => {
          try {
            // const switchPromise = new Promise<boolean>((resolve, _) => {
            //   provider?.once('chainChanged', (id: string) => {
            //     console.log(id, reqChainId);
            //     parseInt(id) === reqChainId ? resolve(true) : resolve(false);
            //   });
            // });
            // const chainId = await wagmiSigner?.getChainId();

            const newChain = await switchNetworkAsync?.(reqChainId);

            console.log(newChain, 'hellojello');
            const signer = await activeConnector?.getSigner();
            // const switched = await switchPromise;
            // console.log('SWITCHED:', switched);
            // if (chainId !== reqChainId) console.log('mememe', chainId, reqChainId);

            // const chainIdAfter = await signer?.getChainId();

            // if (chainIdAfter !== reqChainId) console.log('mememesecond', chainIdAfter, reqChainId);

            if (signer) {
              return signer!;
            } else {
              throw Error('No signer object after chain switch');
            }
          } catch (error: any) {
            console.log('Error occured here');
            throw Error('No signer object after chain switch');
          }
        },
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
      hiddenUI: [HiddenUI.Appearance, HiddenUI.Language, HiddenUI.PoweredBy, HiddenUI.ToAddress],
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
