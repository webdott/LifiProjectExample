import { useState } from 'react';
import _ from 'lodash';

import { MatchesEnum, SportsByLeagues, matchesColumn } from '../../../constants/matches';
import Matches from '../../featured/matches';

import styles from '../../featured/matches/matches.module.scss';

const MatchesContainer = ({ games }: { games: SportsByLeagues[] }) => {
  const [matchColumn, setMatchColumn] = useState<MatchesEnum>(MatchesEnum.ALL);

  const [activeTabId, setActiveTabId] = useState<number>(0);

  const navClick = (el: MatchesEnum, index: number) => {
    setMatchColumn(el);
    setActiveTabId(index);
  };

  const activeNav = (index: number) => {
    if (index === activeTabId) {
      return `${styles.navItem} ${styles.activeNavItem}`;
    } else {
      return `${styles.navItem}`;
    }
  };

  return (
    <div className={styles.matches}>
      <div className={styles.navSection}>
        <div className={styles.leftNav}>
          {matchesColumn.map((el, index) => (
            <div key={index} onClick={() => navClick(el.tab, index)} className={activeNav(index)}>
              <span>{el.tab}</span>
              <div className={styles.hoverEffect}></div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.matchesContainer}>
        {games
          .filter((game) =>
            game.leagues.some((league) =>
              league.games.some((game) =>
                matchColumn === 'All' ? true : game.timeLabel === matchColumn
              )
            )
          )
          .map(
            (sport, index: number) =>
              sport.leagues.length > 0 && (
                <div key={index}>
                  <h1 className={styles.sportNav}>{_.capitalize(sport.sport)}</h1>
                  {sport.leagues.map((league, index) => (
                    <Matches league={league} matchColumn={matchColumn} key={index} sport={sport} />
                  ))}
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default MatchesContainer;
