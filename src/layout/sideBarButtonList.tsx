import { Fragment, useEffect, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { leaguesData } from './../constants/leftSidebar';
import { useSideBar } from '../hooks/useSideBar';
import SportButton from '../components/shared/sportButton';

import styles from './homelayout.module.scss';
import { SportHubs } from '../constants/sports';
import { fetchAllGames } from '../redux/action-creators';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useNetwork } from 'wagmi';

function SideBarButtonList(): JSX.Element {
  const dispatch = useDispatch();
  const { chain } = useNetwork();

  const { data: games, loading: gamesLoading } = useTypedSelector((state) => state.games);

  useEffect(() => {
    (async () => {
      // TODO: get sportshub info from redux state
      if (chain) await fetchAllGames(chain.id, [SportHubs.sports])(dispatch);
    })();
  }, [chain]);

  const [sportTab, setSportTab] = useState<number>(-1);
  const [leagueTab, setLeagueTab] = useState<number>(1);

  const {
    handleFootBall,
    handleBasketBall,
    handleMma,
    handleTennis,
    handleIceHockey,
    handleBoxing,
    handleAmericanFootball,
    footBallState,
    basketBallState,
    mmaState,
    tennisState,
    iceHockeyState,
    boxingState,
    americanFootballState,
  } = useSideBar();

  return (
    <Fragment>
      {leaguesData.map((sport, index) => {
        let fn: any;

        let state;

        if (sport.sport === 'Football') {
          fn = handleFootBall;
          state = footBallState;
        } else if (sport.sport === 'Basketball') {
          fn = handleBasketBall;
          state = basketBallState;
        } else if (sport.sport === 'MMA') {
          fn = handleMma;
          state = mmaState;
        } else if (sport.sport === 'Tennis') {
          fn = handleTennis;
          state = tennisState;
        } else if (sport.sport === 'Icehockey') {
          fn = handleIceHockey;
          state = iceHockeyState;
        } else if (sport.sport === 'Boxing') {
          fn = handleBoxing;
          state = boxingState;
        } else if (sport.sport === 'American Football') {
          fn = handleAmericanFootball;
          state = americanFootballState;
        }

        return (
          <Fragment key={index}>
            <SportButton
              state={state}
              sportTab={sportTab}
              setSportTab={setSportTab}
              fn={fn}
              index={index}
              sport={sport}
            />

            <Collapse in={state} timeout='auto' unmountOnExit>
              {sport?.leagues?.map((league, index) => (
                <ListItemButton
                  className={
                    leagueTab === index + 1
                      ? `${styles.sidebarButton} ${styles.activeTab}`
                      : `${styles.sidebarButton}`
                  }
                  key={index}
                  onClick={() => setLeagueTab(index + 1)}
                >
                  <ListItemIcon className={styles.leagueIconSection}>
                    <img
                      className={styles.leagueIcon}
                      src={league.leagueFlag}
                      alt='Premier League'
                    />
                  </ListItemIcon>
                  <ListItemText primary={league.leagueName} />
                  <span className={styles.leagueNumber}>{league.leagueNumber}</span>
                </ListItemButton>
              ))}
            </Collapse>
          </Fragment>
        );
      })}
    </Fragment>
  );
}

export default SideBarButtonList;
