import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

import headerUserIcon from '../../../assets/images/headerUserIcon.png';
import { getSelectedChainFromBase } from '../../../functions';
import WalletBalance from '../walletBalances';

import styles from './accountpage.module.scss';

export default function AccountPage() {
  const location = useLocation();
  const [showWalletBalance, setShowWalletBalance] = useState<boolean>(false);

  return (
    <div className={styles.accountPage}>
      <Link
        className={styles.accountBtn}
        to={`/${getSelectedChainFromBase(location.pathname)}/account`}
      >
        <img src={headerUserIcon} className={styles.headerUserIcon} />
        <div className={styles.hoverEffect}></div>
      </Link>

      <div
        className={styles.accountBtnMobile}
        onClick={() => setShowWalletBalance((showWalletBalance) => !showWalletBalance)}
      >
        <div className={styles.imageContainer}>
          <img src={headerUserIcon} className={styles.headerUserIcon} />
        </div>
        {showWalletBalance ? <AiFillCaretUp size={18} /> : <AiFillCaretDown size={18} />}
        <div className={styles.hoverEffect}></div>
      </div>

      {showWalletBalance && (
        <WalletBalance closeWalletBalance={() => setShowWalletBalance(false)} />
      )}
    </div>
  );
}
