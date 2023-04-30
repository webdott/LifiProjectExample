import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { useAccount } from 'wagmi';

import Button from '../../shared/button';
import WalletModal from './../../shared/walletModal';
import { ButtonType } from '../../shared/button/type';
import CheckBalance from '../../shared/balanceCheck';
import GamblrXYZLogo from '../../shared/logo';
import AccountPage from '../accountPage';
import ConnetedUser from './../connectedUser';
import { HeaderButtonText, navbar } from '../../../constants/navbar';
import disableWalletIcon from '../../../assets/images/disableWalletIcon.png';
import activeWalletIcon from '../../../assets/images/activeWalletIcon.png';

import styles from './header.module.scss';

export default function Header(): JSX.Element {
  const { isConnected: walletIsConnected } = useAccount();
  const [showWallet] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [netState] = useState<boolean>(true);
  const [isMetamask, setIsMetamask] = useState<boolean>(false);
  const [NeterrorWin] = useState<string>('block');

  const [walletIcon, setWalletIcon] = useState(disableWalletIcon);

  const visible = () => {
    setShowModal(!showModal);
  };

  const close = () => {
    setShowModal(showModal);
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
              <span>
                <GamblrXYZLogo />
              </span>
            </div>
            <ul className={styles.headerNav}>
              {navbar.map((navItem, index) => (
                <NavLink
                  key={index}
                  className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.activeNavLink}` : `${styles.navLink} `
                  }
                  to={`${navItem.path}`}
                >
                  {navItem.name}
                  {navItem.name === 'Membership' && <div className={styles.soonIcon}>Soon</div>}
                  <div className={styles.hoverEffect}></div>
                </NavLink>
              ))}
            </ul>
          </div>

          {showWallet ? (
            <div className={styles.walletModal}>
              {isMetamask ? (
                <div className={styles.walleteNavItems}>
                  <ConnetedUser DisconnectWallet={setIsMetamask} />
                </div>
              ) : (
                <Button
                  text={HeaderButtonText.Connect_Wallet}
                  btnType={ButtonType.small}
                  onClick={visible}
                />
              )}
              {showModal && <WalletModal visible={showModal} close={close} />}
            </div>
          ) : (
            <div className={styles.headerRightSection}>
              {walletIsConnected ? (
                <>
                  <CheckBalance /> <AccountPage />
                  {/* <Transactions /> */}
                </>
              ) : (
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
              )}
              {showModal && <WalletModal visible={showModal} close={close} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
