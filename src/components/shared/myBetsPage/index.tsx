import { useEffect, useState } from 'react';
import { betsArray, navItems, titleItems } from './bets';
import SortButton from '../sortButton';

import styles from './mybetspage.module.scss';
import { useDispatch } from 'react-redux';
import { useNetwork } from 'wagmi';
import { fetchBetsHistory } from '../../../redux/action-creators';
import { polygon } from 'wagmi/chains';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { BetsResult } from '../../../redux/reducers/betsHistory';
import { round } from '../../../utils/numbers';
import dayjs from 'dayjs';

export default function MyBetsPage() {
  const dispatch = useDispatch();
  const { chain } = useNetwork();

  const { data: bets, loading } = useTypedSelector((state) => state.betsHistory);

  useEffect(() => {
    (async () => {
      fetchBetsHistory(chain?.id || polygon.id)(dispatch);
    })();
  }, [chain]);

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
          {bets.map((el, index: number) => {
            const createdAt = dayjs(el.createdBlockTimestamp * 1000);
            return (
              <li key={index}>
                <div className={styles.betId}>
                  <span>{el.betId}</span>
                </div>
                <div className={styles.betResultSection}>
                  <div
                    className={
                      el.result === BetsResult.won
                        ? styles.betResultWin
                        : el.result === BetsResult.lose
                        ? styles.betResultLose
                        : styles.betResultActive
                    }
                  >
                    {el.result}
                  </div>
                </div>
                <div className={styles.betAmount}>
                  <div>{round(el.amount, 2)}</div>
                  <div>BTC</div>
                </div>
                <div className={styles.betWLamount}>
                  <span>
                    {el.result === BetsResult.won
                      ? round(el.potentialPayout - el.amount, 2)
                      : round(el.amount, 2)}
                  </span>
                </div>
                <div className={styles.betMatch}>
                  <div>{el.game.participants[0].name}</div>
                  <div>vs</div>
                  <div>{el.game.participants[1].name}</div>
                </div>
                <div className={styles.betCoef}>
                  <div>{round(el.outcome.odds, 2)}</div>
                </div>
                <div className={styles.betDateTime}>
                  <div>{createdAt.format('D MMM, YYYY')}</div>
                  <div>{createdAt.format('HH:mm:ss')}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
