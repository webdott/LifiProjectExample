import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { navItems, titleItems } from './bets';
import SortButton from '../sortButton';

import styles from './mybetspage.module.scss';
import { useDispatch } from 'react-redux';
import { fetchBetsHistory } from '../../../redux/action-creators';
import { gnosis, polygon } from 'wagmi/chains';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { BetsResult } from '../../../redux/reducers/betsHistory';
import { round } from '../../../utils/numbers';
import dayjs from 'dayjs';
import { useLocation } from 'react-router';
import { getSelectedChainFromBase } from '../../../functions';
import { useAccount } from 'wagmi';

const ACTIVE_TAB_FILTERS: {}[] = [
  {},
  { isRedeemable: true, isRedeemed: false },
  { isRedeemed: true },
  { status: 'Resolved' },
];
export default function MyBetsPage() {
  const { address } = useAccount();
  const dispatch = useDispatch();
  const location = useLocation();

  const [page, setPage] = useState<number>(1);
  const [activeItemIndex, setActiveIndex] = useState<number>(0);
  const { data: bets, loading } = useTypedSelector((state) => state.betsHistory);

  useEffect(() => {
    const chainId =
      getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id;
    (async () => {
      fetchBetsHistory(chainId, address as string, {
        extraFilters: ACTIVE_TAB_FILTERS[activeItemIndex],
        page,
      })(dispatch);
    })();
  }, [location.pathname, activeItemIndex, page]);

  const activeNav = (index: number) => {
    if (index === activeItemIndex) {
      return `${styles.navItem} ${styles.activeNavItem}`;
    } else {
      return `${styles.navItem}`;
    }
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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

        <div className={styles.pagination}>
          <Pagination
            //TODO: getTotal amount and calculate the count
            count={10}
            page={page}
            boundaryCount={2}
            variant='outlined'
            shape='rounded'
            size='large'
            onChange={handleChange}
            sx={{
              '& .MuiPaginationItem-sizeLarge': {
                color: '#fff',
                border: '1px solid #05a56c',
                '&.MuiPaginationItem-previousNext,&.MuiPaginationItem-ellipsis': {
                  border: 'none',
                },
                '&.Mui-selected': {
                  background: '#05a56c',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
