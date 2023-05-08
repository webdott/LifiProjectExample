import { Fragment, useEffect, useState } from 'react';
import { League, MatchesEnum, Sport } from '../../../constants/matches';
import BettingOption from '../../shared/bettingOption';
import Odds from './odds';
import Match from './match';

import styles from './matches.module.scss';
import _ from 'lodash';

export default function Matches({
  league,
  matchColumn,
  sport,
}: {
  league: League;
  matchColumn: MatchesEnum;
  sport: Sport;
}) {
  const [marketOptions, setMarketOptions] = useState<{ key: string; label: string }[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);

  const matches = league.games.filter((game) =>
    matchColumn === 'All' ? Boolean(game) : game.timeLabel === matchColumn
  );

  useEffect(() => {
    const options: { [key: string]: { key: string; label: string } } = {};

    sport.leagues.forEach((lg) => {
      lg.games.forEach((g) => {
        g.markets.forEach((m) => {
          if (!(m.marketId in options))
            options[m.marketId] = { key: m.marketId, label: m.marketName };
        });
      });
    });

    const result = _.orderBy(Object.values(options), 'key', 'asc');
    setMarketOptions(result);
    setSelectedMarket(result[0].key);
  }, [sport]);
  return (
    <Fragment>
      {matches.length > 0 && selectedMarket ? (
        <div className={styles.matchesBottomSection}>
          <div className={styles.matchesTopSection}>
            <div className={styles.matchesTitles}>
              <p className={styles.leagueName}>{league.name}</p>
            </div>
            <div className={styles.titleRightSection}>
              <BettingOption
                options={marketOptions}
                selected={selectedMarket}
                onChange={setSelectedMarket}
              />
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
              <Match key={index} game={match} sport={sport} selectedMarketId={selectedMarket} />
            ))}
        </div>
      ) : null}
    </Fragment>
  );
}
