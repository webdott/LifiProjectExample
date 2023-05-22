import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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

  const { data: nativeData } = useBalance({
    address,
    chainId,
  });
  const { data: USDTBalanceData } = useBalance({
    address: getSelectedChainFromBase(location.pathname) === 'polygon' ? address : undefined,
    chainId,
    token: USDT_ADDRESS,
  });

  const balance = chainId === gnosis.id ? nativeData?.formatted : USDTBalanceData?.formatted;

  return (
    <div className={styles.balanceCheckContainer}>
      <div
        onClick={() => setShowWalletBalance((showWalletBalance) => !showWalletBalance)}
        className={styles.balanceCheckBtn}
      >
        <span>{formatBalanceString(balance ?? '')}</span>
        <img src={headerWalletIcon} alt='wallet' />
        {showWalletBalance ? <AiFillCaretUp size={18} /> : <AiFillCaretDown size={18} />}
        <div className={styles.hoverEffect}></div>
      </div>

      {showWalletBalance && (
        <WalletBalance closeWalletBalance={() => setShowWalletBalance(false)} />
      )}
    </div>
  );
};

export default BalanceCheck;
