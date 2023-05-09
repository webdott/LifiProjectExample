import { FC, useState } from 'react';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';
import { useConnect } from 'wagmi';
import { gnosis, polygon } from 'wagmi/chains';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { Connectors } from '../../..';
import Button from '../button';
import { getSelectedChainFromBase } from '../../../functions';
import activeWalletIcon from '../../../assets/images/activeWalletIcon.png';
import disableWalletIcon from '../../../assets/images/disableWalletIcon.png';
import connectWalletIcon from '../../../assets/images/connectWalletIcon.png';
import metamaskIcon from '../../../assets/images/metamaskIcon.png';
import { HeaderButtonText } from '../../../constants/navbar';
import { ButtonType } from '../button/type';

import styles from './mobileconnectwalletdrawer.module.scss';

interface MobileConnectWalletDrawerProps {
  withFullText?: boolean;
}

const MobileConnectWalletDrawer: FC<MobileConnectWalletDrawerProps> = ({ withFullText }) => {
  const [walletIcon, setWalletIcon] = useState(disableWalletIcon);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
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
    setOpenDrawer(false);
    wagmiConnect({
      connector: Connectors.METAMASK,
      chainId: getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id,
    });
  };

  const connectWalletConnect = () => {
    setOpenDrawer(false);
    wagmiConnect({
      connector: Connectors.WALLET_CONNECT,
      chainId: getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id,
    });
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  const BoxList = () => (
    <Box sx={{ width: 'auto' }} className={styles.connectWalletMobile}>
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
    </Box>
  );

  return (
    <>
      {withFullText ? (
        <div className={styles.connectBtnContainer}>
          <Button
            className={styles.connectWalletBtnMobileFull}
            text={HeaderButtonText.Connect_Wallet}
            btnType={ButtonType.small}
            onClick={() => setOpenDrawer(true)}
          />
        </div>
      ) : (
        <div
          onMouseEnter={() => setWalletIcon(activeWalletIcon)}
          onMouseLeave={() => setWalletIcon(disableWalletIcon)}
          className={styles.connectWalletBtnMobile}
          onClick={toggleDrawer(true)}
        >
          <div className={styles.hoverEffect}></div>
          <img alt='walletIcon' src={walletIcon} className={styles.connectWalletIcon} />
          <span>{HeaderButtonText.Connect_Wallet}</span>
        </div>
      )}
      <Drawer
        anchor={'bottom'}
        open={openDrawer}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiPaper-root.MuiDrawer-paper': {
            borderRadius: '15px 15px 0 0',
          },
        }}
      >
        <BoxList />
      </Drawer>
    </>
  );
};

export default MobileConnectWalletDrawer;
