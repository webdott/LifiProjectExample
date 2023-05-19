import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { overview } from '../../../constants/overwiewTab';
import { getSelectedChainFromBase } from '../../../functions';

import styles from './overviewTab.module.scss';

export default function OverviewTab(): JSX.Element {
  const location = useLocation();
  const [toggleState, setToggleState] = useState<number>(1);

  return (
    <div className={styles.container}>
      <div className={styles.tabSection}>
        {overview.map((el, index) => (
          <Link
            className={
              toggleState === index && el.name === 'My Bets'
                ? `${styles.tabSection_tab} ${styles.tabSection_activeTab}`
                : el.name !== 'My Bets'
                ? `${styles.tabSection_tab} ${styles.disabled}`
                : `${styles.tabSection_tab}`
            }
            key={el.name}
            to={`/${getSelectedChainFromBase(location.pathname)}/account?name=${el.path}`}
            aria-disabled={el.name !== 'My Bets'}
            onClick={() => (el.name === 'My Bets' ? setToggleState(index) : null)}
          >
            <div className={styles.hoverEffect}></div>
            <img className={styles.overviewNavIcon} src={el.icon} />
            <span>{el.name}</span>
            {el.name !== 'My Bets' && <div className={styles.soonIcon}>Soon</div>}
          </Link>
        ))}
      </div>
    </div>
  );
}
