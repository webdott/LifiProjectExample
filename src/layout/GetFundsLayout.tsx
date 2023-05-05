import { Fragment, ReactNode } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { getUSDTLinks, getXDAILinks } from '../constants/getFunds';
import Header from '../components/featured/header';
import Footer from '../components/featured/footer';
import BetInfo from '../components/shared/betInfo';

import styles from './gxplayout.module.scss';

interface GetFundLayoutProps {
  token: 'USDT' | 'XDAI';
  children: ReactNode;
}

export default function GetFundsLayout({ token, children }: GetFundLayoutProps): JSX.Element {
  const location = useLocation();
  const { selectedChain } = useParams();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(`/${selectedChain}${path}`);
  };

  return (
    <Fragment>
      <Header page='get-funds'/>
      <div className={styles.section}>
        <div className={styles.sidebar}>
          <ul className={styles.sidebarNav}>
            {(token === 'USDT' ? getUSDTLinks : getXDAILinks).map((el, index) => {
              return (
                <button
                  key={index}
                  className={
                    location.pathname === `/${selectedChain}${el.path}`
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
