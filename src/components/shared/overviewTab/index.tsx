import { useState } from 'react';
import { Link } from 'react-router-dom';

import { overview } from '../../../constants/overwiewTab';

import styles from './overviewTab.module.scss';

export default function OverviewTab(): JSX.Element {
  const [toggleState, setToggleState] = useState<number>(0);

  return (
    <div className={styles.container}>
      <div className={styles.tabSection}>
        {overview.map((el, index) => (
          <Link
            className={
              toggleState === index
                ? `${styles.tabSection_tab} ${styles.tabSection_activeTab}`
                : `${styles.tabSection_tab}`
            }
            key={el.name}
            to={`/account?name=${el.path}`}
            onClick={() => setToggleState(index)}
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
