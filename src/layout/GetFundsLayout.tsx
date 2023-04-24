import { Fragment, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { getUSDCLinks, getXDAILinks } from '../constants/getFunds';
import Header from '../components/featured/header';
import Footer from '../components/featured/footer';
import BetInfo from '../components/shared/betInfo';

import styles from './gxplayout.module.scss';

interface GetFundLayoutProps {
  token: 'USDC' | 'XDAI';
  children: ReactNode;
}

export default function GetFundsLayout({ token, children }: GetFundLayoutProps): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(`${path}`);
  };

  return (
    <Fragment>
      <Header />
      <div className={styles.section}>
        <div className={styles.sidebar}>
          <ul className={styles.sidebarNav}>
            {(token === 'USDC' ? getUSDCLinks : getXDAILinks).map((el, index) => {
              return (
                <button
                  key={index}
                  className={
                    location.pathname === el.path
                      ? `${styles.sidebarButton} ${styles.activeTab}`
                      : `${styles.sidebarButton}`
                  }
                  onClick={() => handleNavigation(el.path)}
                >
                  {el.text}
                </button>
              );
            })}
          </ul>
        </div>
        <div className={styles.cards}>
          {children}
          <Footer />
        </div>
        <BetInfo />
      </div>
    </Fragment>
  );
}
