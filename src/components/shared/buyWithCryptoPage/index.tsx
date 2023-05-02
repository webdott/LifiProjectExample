import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDisconnect, useNetwork, useSigner, useSwitchNetwork } from 'wagmi';
import { HiddenUI, LiFiWidget, WidgetConfig } from '@lifi/widget';

import GetFundsLayout from '../../../layout/GetFundsLayout';
import { CHAIN_IDS } from '../../../constants/wallet';

import styles from './buywithcrypto.module.scss';
import { toast } from 'react-toastify';

export default function BuyWithCryptoPage() {
  const { chain } = useNetwork();
  const { selectedChain } = useParams();
  const { disconnect } = useDisconnect();
  const { data: signer } = useSigner();
  const { switchNetwork } = useSwitchNetwork({
    onError(error) {
      //@ts-ignore
      if (error?.code === 4001) {
        toast.error(<span>User rejected the request</span>);
        return;
      } else {
        toast.error(<span>Error connecting wallet, try again</span>);
      }
    },
  });

  const widgetConfig: WidgetConfig = useMemo(() => {
    return {
      integrator: 'Gamblr xyz',
      // walletManagement: {
      //   signer: signer,
      //   connect: async () => {
      //     let promiseResolver: (value: void | PromiseLike<void>) => void;
      //     const loginAwaiter = new Promise<void>((resolve) => (promiseResolver = resolve));

      //     await loginAwaiter;
      //     if (signer) {
      //       return signer!;
      //     } else {
      //       throw Error('No signer object after login');
      //     }
      //   },
      //   disconnect: async () => {
      //     disconnect();
      //   },
      //   switchChain: async (reqChainId: number) => {
      //     await switchNetwork?.(reqChainId);
      //     if (signer) {
      //       return signer;
      //     } else {
      //       toast.error('No signer object after chain switch');
      //     }
      //   },
      //   addToken: async (token: Token, chainId: number) => {
      //     // await addToken(chainId, token);
      //   },
      //   addChain: async (chainId: number) => {
      //     // return addChain(chainId);
      //   },
      // },
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
  }, [signer, disconnect, switchNetwork]);

  return (
    <GetFundsLayout token={selectedChain === 'polygon' ? 'USDT' : 'XDAI'}>
      <div className={styles.buyCrypto}>
        <div className={styles.options}>
          <div className={styles.header}>Select Crypto</div>
          <LiFiWidget integrator='Gamblr xyz' config={widgetConfig} />
        </div>
      </div>
    </GetFundsLayout>
  );
}
