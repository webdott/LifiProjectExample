import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

import { navBarLinks, checkBalanceProps } from '../constants/sidebar';
import Header from '../components/featured/header';
import Footer from '../components/featured/footer';
import { useNavigate } from 'react-router-dom';
import BetInfo from '../components/shared/betInfo';

import styles from './gxplayout.module.scss';

export default function Sidebar({ children }: checkBalanceProps): JSX.Element {
  const location = useLocation();

  const navigate = useNavigate();

  const handleNavigation = (path: string, index: number) => {
    navigate(`${path}`);
  };

  return (
    <Fragment>
      <Header />
      <div className={styles.section}>
        <div className={styles.sidebar}>
          <ul className={styles.sidebarNav}>
            {navBarLinks.map((el, index) => {
              return (
                <button
                  key={index}
                  className={
                    location.pathname === el.path
                      ? `${styles.sidebarButton} ${styles.activeTab}`
                      : `${styles.sidebarButton}`
                  }
                  onClick={() => handleNavigation(el.path, index + 1)}
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
