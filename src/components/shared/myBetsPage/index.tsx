import { useState } from 'react';
import { betsArray, navItems, titleItems } from './bets';
import SortButton from '../sortButton';

import styles from './mybetspage.module.scss';

export default function MyBetsPage() {
  const [activeItemIndex, setActiveIndex] = useState<number>(0);
  const activeNav = (index: number) => {
    if (index === activeItemIndex) {
      return `${styles.navItem} ${styles.activeNavItem}`;
    } else {
      return `${styles.navItem}`;
    }
  };

  const handleClickNav = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div className={styles.container}>
      <p className={styles.pageTitle}>My Bets</p>
      <div className={styles.topSection}>
        <ul className={styles.navSection}>
          {navItems.map((el, index) => {
            return (
              <li key={index} className={activeNav(index)} onClick={() => handleClickNav(index)}>
                {el}
              </li>
            );
          })}
        </ul>
        <div className={styles.sortButton}>
          <span>Sort by:</span>
          <SortButton />
        </div>
      </div>
      <div className={styles.bottomSection}>
        <ul className={styles.sectionTitles}>
          {titleItems.map((el, index) => {
            return <li key={index}>{el}</li>;
          })}
        </ul>

        <ul className={styles.betsTable}>
          {betsArray.map((el, index: number) => {
            return (
              <li key={index}>
                <div className={styles.betId}>
                  <span>{el.id}</span>
                </div>
                <div className={styles.betResultSection}>
                  <div
                    className={
                      el.result === 'Win'
                        ? styles.betResultWin
                        : el.result === 'Lose'
                        ? styles.betResultLose
                        : styles.betResultActive
                    }
                  >
                    {el.result}
                  </div>
                </div>
                <div className={styles.betAmount}>
                  <div>{el.amount}</div>
                  <div>{el.pool}</div>
                </div>
                <div className={styles.betWLamount}>
                  <span>{el.wlAmount}</span>
                </div>
                <div className={styles.betMatch}>
                  <div>{el.team1}</div>
                  <div>vs</div>
                  <div>{el.team2}</div>
                </div>
                <div className={styles.betCoef}>
                  <div>{el.coef}</div>
                </div>
                <div className={styles.betDateTime}>
                  <div>{el.time}</div>
                  <div>{el.date}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
