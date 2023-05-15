import React, { useState } from 'react';
import { AiOutlineWallet } from 'react-icons/ai';

import WalletModal from '../walletModal';
import Button from '../button';
import { ButtonType } from '../button/type';
import { HeaderButtonText } from '../../../constants/navbar';
import MobileConnectWalletDrawer from '../mobileConnectWalletDrawer';

import styles from './buywithcrypto.module.scss';

const ConnectWallet = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className={styles.connectWallet}>
        <div className={styles.wallet}>
          <AiOutlineWallet size={70} />
        </div>
        <span className={styles.title}>Connect your wallet</span>
        <div className={styles.message}>
          <span>Before we can help you with the best options, you need to connect your wallet</span>
        </div>
        <Button
          className={styles.connectWalletButton}
          text={HeaderButtonText.Connect_Wallet}
          btnType={ButtonType.small}
          onClick={() => setShowModal(true)}
        />
      </div>

      {showModal && <WalletModal visible={showModal} close={() => setShowModal(false)} />}
      <MobileConnectWalletDrawer withFullText />
    </>
  );
};

export default ConnectWallet;
