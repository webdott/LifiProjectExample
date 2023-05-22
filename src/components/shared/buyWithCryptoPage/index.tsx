import { useMemo, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchSigner } from '@wagmi/core';
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
import { Signer } from 'ethers';

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

  const switchChain = useCallback(
    async (reqChainId: number) => {
      if (!walletIsConnected || !wagmiSigner) {
        return wagmiSigner!;
      }
      if (chainId !== reqChainId) {
        try {
          await switchNetworkAsync?.(reqChainId);
        } catch {
          throw new Error("Couldn't switch chain.");
        }
        console.log(chainId, reqChainId); // logs the previous chainId and required chain id
        const signer = await fetchSigner({ chainId: reqChainId });
        return signer as Signer;
      }
      return wagmiSigner!;
    },
    [chainId, switchNetworkAsync, wagmiSigner, walletIsConnected]
  );

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
      hiddenUI: [HiddenUI.Appearance, HiddenUI.Language, HiddenUI.ToAddress, HiddenUI.PoweredBy],
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
