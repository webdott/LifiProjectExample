import { Fragment } from 'react';
import { League, MatchesEnum, Sport } from '../../../constants/matches';
import BettingOption from '../../shared/bettingOption';
import Odds from './odds';
import Match from './match';

import styles from './matches.module.scss';

export default function Matches({
  league,
  matchColumn,
  sport,
}: {
  league: League;
  matchColumn: MatchesEnum;
  sport: Sport;
}) {
  const matches = league.games.filter((game) =>
    matchColumn === 'All' ? Boolean(game) : game.timeLabel === matchColumn
  );

  return (
    <Fragment>
      {matches.length > 0 ? (
        <div className={styles.matchesBottomSection}>
          <div className={styles.matchesTopSection}>
            <div className={styles.matchesTitles}>
              <p className={styles.leagueName}>{league.name}</p>
            </div>
            <div className={styles.titleRightSection}>
              <BettingOption />
              <Odds />
              {/* Uche: Layout button changed. Button to be replaced with another later */}
              {/* <div className={styles.rightSectionIcon}>
								<div className={styles.smallHoverEffect}></div>
							</div> */}
            </div>
          </div>
          {league.games
            .filter((game) =>
              matchColumn === 'All' ? Boolean(game) : game.timeLabel === matchColumn
            )
            .map((match, index: number) => (
              <Match key={index} game={match} sport={sport} />
            ))}
        </div>
      ) : null}
    </Fragment>
  );
}
