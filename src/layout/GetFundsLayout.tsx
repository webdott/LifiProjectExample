import { Fragment, ReactNode } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { getUSDTLinks, getXDAILinks } from '../constants/getFunds';
import Header from '../components/featured/header';
import Footer from '../components/featured/footer';

import styles from './gxplayout.module.scss';

interface GetFundLayoutProps {
  token: 'USDT' | 'XDAI';
  children: ReactNode;
}

export default function GetFundsLayout({ token, children }: GetFundLayoutProps): JSX.Element {
  const location = useLocation();
  const { selectedChain } = useParams();

  return (
    <Fragment>
      <Header page='get-funds' />
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
                  onClick={() => null}
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
      </div>
    </Fragment>
  );
}
