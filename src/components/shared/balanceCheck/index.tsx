import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

import headerWalletIcon from '../../../assets/images/headerWalletIcon.png';
import WalletBalance from '../../featured/walletBalances';

import styles from './balancecheck.module.scss';
import { getSelectedChainFromBase } from '../../../functions';

const BalanceCheck: React.FC = () => {
  const location = useLocation();
  const [showWalletBalance, setShowWalletBalance] = useState<boolean>(false);

  return (
    <div className={styles.balanceCheckContainer}>
      <Link to={`/${getSelectedChainFromBase(location.pathname)}/get-funds`} className={styles.getFunds}>
        <div className={styles.hoverEffect}></div>
        <span>Get Funds</span>
      </Link>
      <div
        onClick={() => setShowWalletBalance((showWalletBalance) => !showWalletBalance)}
        className={styles.balanceCheckBtn}
      >
        {/* //TODO: Clarify what this value is meant to be */}
        <span>$0</span>
        <img src={headerWalletIcon} alt='wallet' />
        {showWalletBalance ? <AiFillCaretUp size={18} /> : <AiFillCaretDown size={18} />}
        <div className={styles.hoverEffect}></div>
      </div>

      {showWalletBalance && (
        <WalletBalance closeWalletBalance={() => setShowWalletBalance(false)} />
      )}
      {/* <Modal
        footer={null}
        title="Balance"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <div className={styles.balanceCheckContainer}>
          <span className={styles.containerText}>GXP:000</span>
          <span className={styles.containerText}>Total GXP earned:000</span>
          <span className={styles.containerText}>Available GXP:000</span>
          <span className={styles.containerText}>GXP multiplier:000</span>
          <Button btnType={ButtonType.claim} text={SidebarButtonsText.GXP} />
        </div>
      </Modal> */}
    </div>
  );
};

export default BalanceCheck;
