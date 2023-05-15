import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

import headerWalletIcon from '../../../assets/images/headerWalletIcon.png';
import WalletBalance from '../../featured/walletBalances';

import styles from './balancecheck.module.scss';
import { formatBalanceString, getSelectedChainFromBase } from '../../../functions';
import { useAccount, useBalance } from 'wagmi';
import { USDT_ADDRESS } from '../../../constants/azuro';
import { gnosis, polygon } from 'wagmi/chains';

const BalanceCheck: React.FC = () => {
  const location = useLocation();
  const { address } = useAccount();
  const [showWalletBalance, setShowWalletBalance] = useState<boolean>(false);

  const chainId =
    getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id;

  const { data: nativeData, isLoading: isLoadingNativeDataBalance } = useBalance({
    address,
    chainId,
  });
  const { data: USDTBalanceData, isLoading: isLoadingUSDTBalance } = useBalance({
    address: getSelectedChainFromBase(location.pathname) === 'polygon' ? address : undefined,
    chainId,
    token: USDT_ADDRESS,
  });

  const balance = chainId === gnosis.id ? nativeData : USDTBalanceData;

  return (
    <div className={styles.balanceCheckContainer}>
      <Link
        to={`/${getSelectedChainFromBase(location.pathname)}/get-funds`}
        className={styles.getFunds}
      >
        <div className={styles.hoverEffect}></div>
        <span>Get Funds</span>
      </Link>
      <div
        onClick={() => setShowWalletBalance((showWalletBalance) => !showWalletBalance)}
        className={styles.balanceCheckBtn}
      >
        <span>{formatBalanceString(nativeData?.formatted ?? '')}</span>
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
