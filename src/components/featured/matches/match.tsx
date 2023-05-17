import { FC, useEffect, useState } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { Game, Outcome, Sport } from '../../../constants/matches';
import { RootState } from '../../../redux';
import { addBetSlip, removeBetSlip } from '../../../redux/action-creators';
import { getSelectedChainFromBase } from '../../../functions';
import OddChangeListItem from './oddChange';

import styles from './matches.module.scss';
import { getOddsDisplayString } from '../../../utils/odds';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getOddsPointString } from '../../../helpers/conditions/odds';

interface MatchProps {
  game: Game;
  sport: Sport;
  selectedMarketId: string | null;
}

const Match: FC<MatchProps> = ({ game, sport, selectedMarketId }) => {
  const location = useLocation();
  const { currentGame: currentBetSlipGame } = useSelector((root: RootState) => root.betSlip);
  const oddsFormat = useTypedSelector((state) => state.app.oddsFormat);
  const [pointOptions, setPointOptions] = useState<number[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const dispatch = useDispatch();

  const toggleBetSlip = (item: Outcome) => {
    if (currentBetSlipGame?.id === game.id && currentBetSlipGame?.outcome.id === item.id) {
      removeBetSlip()(dispatch);
    } else {
      addBetSlip({
        sportSlug: sport.slug,
        id: game.id,
        team1: game.participant1.name,
        team2: game.participant2.name,
        betType:
          game.markets.filter((m) => m.marketId === selectedMarketId)[0]?.marketName ??
          'Full Time Result',
        outcome: item,
      })(dispatch);
    }
  };
  const outcomes = game.markets.filter((m) => m.marketId === selectedMarketId)[0]?.outcomes;

  useEffect(() => {
    const result: number[] = _.orderBy(
      Array.from(
        new Set(
          outcomes
            ?.map((ou: any) =>
              ou.map((odds: any) =>
                Math.abs(+getOddsPointString({ outcomeId: odds.outcomeId as string }))
              )
            )
            .flat()
            .filter((item: any) => item) || []
        )
      )
    );
    setPointOptions(result);
    setSelectedPoint(result[0] || null);
  }, [outcomes]);

  let outcomesIndex = outcomes?.findIndex(
    (item: any) => Math.abs(+getOddsPointString({ outcomeId: item[0].outcomeId })) === selectedPoint
  );
  outcomesIndex = outcomesIndex && outcomesIndex > -1 ? outcomesIndex : 0;

  return (
    <div className={styles.match}>
      <p className={styles.matchTimeMobile}>
        {game.timeLabel}&nbsp;&middot;&nbsp;{game.startsAtString}
      </p>
      <div className={styles.matchLeftSection}>
        <ul>
          <li className={styles.team1Section}>
            <span>{game.participant1.name}</span>{' '}
          </li>
          <li>
            <span>-</span>
          </li>
          <li className={styles.team2Section}>
            <span>{game.participant2.name}</span>{' '}
          </li>
        </ul>
      </div>
      <div className={styles.matchTime}>
        <p>{game.timeLabel}</p>
        <p>{game.startsAtString}</p>
      </div>
      <ul className={styles.matchRightSection}>
        {outcomes?.[outcomesIndex].map((item: any, index: number) => {
          return (
            <>
              {index === 1 && selectedPoint && (
                <OddChangeListItem
                  selected={selectedPoint}
                  onSelect={setSelectedPoint}
                  options={pointOptions}
                />
              )}
              <li
                key={index}
                className={
                  currentBetSlipGame?.id === game.id && currentBetSlipGame?.outcome.id === item.id
                    ? styles.activeTab
                    : ''
                }
                onClick={() => toggleBetSlip(item)}
              >
                <span>{item.selectionName}</span>
                <span>{getOddsDisplayString(item.odds, oddsFormat)}</span>
              </li>
            </>
          );
        })}
        <li className={styles.allMarkets}>
          <Link
            to={`/${getSelectedChainFromBase(location.pathname)}/${sport.sporthub.slug}/${
              sport.slug
            }/${game.gameId}`}
          >
            <span>All markets</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Match;
