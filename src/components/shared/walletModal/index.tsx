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
    if (!window?.ethereum) downloadMetamaskNotify();
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
