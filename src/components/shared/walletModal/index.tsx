import { toast } from 'react-toastify';
import { useLocation } from 'react-router';
import { useConnect } from 'wagmi';
import { gnosis, polygon } from 'wagmi/chains';

import { HeaderButtonText } from '../../../constants/navbar';
import Button from '../button';
import { ButtonType } from '../button/type';
import Modal from '../modal';
import { WalletModalProps } from './type';
import connectWalletIcon from '../../../assets/images/connectWalletIcon.png';
import metamaskIcon from '../../../assets/images/metamaskIcon.png';
import walletIcon from '../../../assets/images/walletIcon.png';
import { Connectors } from '../../..';

import 'react-toastify/dist/ReactToastify.css';
import './modalStyles.scss';
import styles from './walletModal.module.scss';
import { getSelectedChainFromBase } from '../../../functions';

export default function WalletModal({ visible, close }: WalletModalProps): JSX.Element {
  const location = useLocation();
  const metamaskSuccessNotify = (text: string) => {
    toast.success(<span>{text}</span>);
  };

  const { connect: wagmiConnect } = useConnect({
    onSuccess(data) {
      metamaskSuccessNotify('Wallet connected successfully');
    },
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

  const downloadMetamaskNotify = () => {
    toast.warn(
      <span>
        Please download
        <a href='https://metamask.io/download/' target='_blank' rel='noreferrer'>
          Metamask
        </a>
      </span>
    );
  };

  const connectMetamask = () => {
    if (!window.ethereum) downloadMetamaskNotify();
    close();
    wagmiConnect({
      connector: Connectors.METAMASK,
      chainId: getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id,
    });
  };

  const connectWalletConnect = () => {
    close();
    wagmiConnect({
      connector: Connectors.WALLET_CONNECT,
      chainId: getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id,
    });
  };

  // async function ConnectWalletconnect(): Promise<void> {
  // 	close();
  // 	const connector = new WalletConnect({
  // 		bridge: 'https://bridge.walletconnect.org',
  // 		qrcodeModal: QRCodeModal,
  // 	});
  // 	if (!connector.connected) {
  // 		connector.createSession();
  // 	}
  // 	connector.on('connect', (error, payload) => {
  // 		if (error) {
  // 			throw error;
  // 		}
  // 	});
  // 	connector.on('session_update', (error, payload) => {});
  // 	connector.on('disconnect', (error, payload) => {
  // 		if (error) {
  // 			throw error;
  // 		}
  // 	});
  // }

  // const addMetamaskNetwork = async () => {
  // 	const gnosisChainNetworkParams = {
  // 		chainId: '0x64',
  // 		chainName: 'Gnosis Chain',
  // 		rpcUrls: ['https://rpc.gnosischain.com/'],
  // 		nativeCurrency: {
  // 			name: 'xDAI',
  // 			symbol: 'xDAI',
  // 			decimals: 18,
  // 		},
  // 		blockExplorerUrls: ['https://blockscout.com/xdai/mainnet/'],
  // 	};
  // 	await addChain(gnosisChainNetworkParams);
  // 	metamaskSuccessNotify('Network successfully added');
  // 	connect();
  // };

  // const connectMetamask = async () => {
  // 	if (status === 'unavailable') {
  // 		downloadMetamaskNotify();
  // 	} else if (chainId !== '0x64') {
  // 		switchNetworkNotify();
  // 	} else {
  // 		await connect();
  // 	}
  // 	close();
  // };

  // const changeMetamaskNetwork = async () => {
  // 	try {
  // 		await switchChain('0x64');
  // 		metamaskSuccessNotify('Network successfully switched to Gnosis Chain');
  // 	} catch (error: any) {
  // 		if (error.code === 4902) {
  // 			addMetamaskNetworkNotify();
  // 		}
  // 	}
  // };

  // const switchNetworkNotify = () =>
  // 	toast.warn(
  // 		<span>
  // 			Wrong network,please{' '}
  // 			<span
  // 				className={styles.notifySwitchBtn}
  // 				onClick={changeMetamaskNetwork}>
  // 				switch
  // 			</span>{' '}
  // 			to Gnosis
  // 		</span>
  // 	);

  return (
    <Modal title='' onCancel={close} isModalVisible={visible} closable={false}>
      <div className={styles.container}>
        <div className={styles.walletSection}>
          <img src={connectWalletIcon} className={styles.walletModalImg} />
          <span className={styles.modalTitle}>Connect Wallet</span>
          <span className={styles.modalDescription}>
            Please, connect wallet to start using gamblr.XYZ
          </span>
          <div className={styles.walletButton}>
            <Button
              icon={walletIcon}
              text={HeaderButtonText.Wallet_Connect}
              btnType={ButtonType.walletButton}
              onClick={connectWalletConnect}
            />
            <Button
              icon={metamaskIcon}
              text={HeaderButtonText.Metamask_Wallet}
              btnType={ButtonType.walletButton}
              onClick={connectMetamask}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
