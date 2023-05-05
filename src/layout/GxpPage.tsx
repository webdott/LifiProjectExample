import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

import { navBarLinks, checkBalanceProps } from '../constants/sidebar';
import Header from '../components/featured/header';
import Footer from '../components/featured/footer';
import { useNavigate } from 'react-router-dom';
import BetInfo from '../components/shared/betInfo';
import { getSelectedChainFromBase } from '../functions';

import styles from './gxplayout.module.scss';

export default function Sidebar({ children }: checkBalanceProps): JSX.Element {
  const location = useLocation();

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(
      path.includes('help') ? path : `/${getSelectedChainFromBase(location.pathname)}${path}`
    );
  };

  return (
    <Fragment>
      <Header page='gxp' />
      <div className={styles.section}>
        <div className={styles.sidebar}>
          <ul className={styles.sidebarNav}>
            {navBarLinks.map((el, index) => {
              return (
                <button
                  key={index}
                  className={
                    location.pathname ===
                      `/${getSelectedChainFromBase(location.pathname)}${el.path}` ||
                    location.pathname === `${el.path}`
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
