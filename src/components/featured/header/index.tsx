import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Link, NavLink } from 'react-router-dom';
import { useAccount } from 'wagmi';

import WalletModal from './../../shared/walletModal';
import CheckBalance from '../../shared/balanceCheck';
import GamblrXYZLogo from '../../shared/logo';
import { HeaderButtonText, navbar } from '../../../constants/navbar';
import disableWalletIcon from '../../../assets/images/disableWalletIcon.png';
import activeWalletIcon from '../../../assets/images/activeWalletIcon.png';

import styles from './header.module.scss';

export default function Header({ page }: { page: 'home' | 'gxp' | 'get-funds' }): JSX.Element {
  const { isConnected: walletIsConnected } = useAccount();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [netState] = useState<boolean>(true);
  const [NeterrorWin] = useState<string>('block');

  const [walletIcon, setWalletIcon] = useState(disableWalletIcon);

  const visible = () => {
    setShowModal(!showModal);
  };

  const close = () => {
    setShowModal(false);
  };

  return (
    <div>
      <ToastContainer theme='dark' />
      {!netState && (
        <div
          className={styles.netState}
          style={{
            padding: '12px',
            backgroundColor: '#E1D7CA',
            color: 'white',
            display: NeterrorWin,
          }}
        ></div>
      )}

      <div className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.headerLeftSection}>
            <div className={styles.headerLogo}>
              <Link to={`##`}>
                <GamblrXYZLogo />
              </Link>
            </div>
            <ul className={styles.headerNav}>
              {navbar.map((navItem, index) => (
                <NavLink key={index} className={`${styles.navLink}`} to={'##'}>
                  {navItem.name}
                  {navItem.name === 'Membership' && <div className={styles.soonIcon}>Soon</div>}
                  <div className={styles.hoverEffect}></div>
                </NavLink>
              ))}
            </ul>
          </div>

          <div className={styles.headerRightSection}>
            {walletIsConnected ? (
              <>
                <CheckBalance />
              </>
            ) : (
              <>
                <div
                  onMouseEnter={() => setWalletIcon(activeWalletIcon)}
                  onMouseLeave={() => setWalletIcon(disableWalletIcon)}
                  className={styles.connectWalletBtn}
                  onClick={visible}
                >
                  <div className={styles.hoverEffect}></div>
                  <img alt='walletIcon' src={walletIcon} className={styles.connectWalletIcon} />
                  <span>{HeaderButtonText.Connect_Wallet}</span>
                </div>
              </>
            )}
            {showModal && <WalletModal visible={showModal} close={close} />}
          </div>
        </div>
      </div>
    </div>
  );
}
