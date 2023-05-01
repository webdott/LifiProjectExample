import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { MatchType, SportsByLeagues } from '../../../constants/matches';
import { RootState } from '../../../redux';
import { addBetSlip, removeBetSlip } from '../../../redux/action-creators';
import { round } from '../../../utils/numbers';

import styles from './matches.module.scss';

interface MatchProps {
  match: MatchType;
  sport: SportsByLeagues;
}

const Match: FC<MatchProps> = ({ match, sport }) => {
  const { currentGame: currentBetSlipGame } = useSelector((root: RootState) => root.betSlip);
  const dispatch = useDispatch();

  const toggleBetSlip = (item: { id: number; oddName: string; odds: string }) => {
    if (currentBetSlipGame?.id === match.id && currentBetSlipGame?.matchOdd.id === item.id) {
      removeBetSlip()(dispatch);
    } else {
      addBetSlip({
        game: sport.sport,
        id: match.id,
        team1: match.team1,
        team2: match.team2,
        betType: 'Full Time Result',
        matchOdd: item,
      })(dispatch);
    }
  };

  return (
    <div className={styles.match}>
      <div className={styles.matchLeftSection}>
        <ul>
          <li className={styles.team1Section}>
            <span>{match.team1}</span>{' '}
          </li>
          <li>
            <span>-</span>
          </li>
          <li className={styles.team2Section}>
            <span>{match.team2}</span>{' '}
          </li>
        </ul>
      </div>
      <div className={styles.matchTime}>
        <p>{match.timeLabel}</p>
        <p>{match.startsAtString}</p>
      </div>
      <ul className={styles.matchRightSection}>
        {match.markets[0].outcomes[0].map((item: any, index: number) => {
          return (
            <li
              key={index}
              className={
                currentBetSlipGame?.id === match.id && currentBetSlipGame?.matchOdd.id === item.id
                  ? styles.activeTab
                  : ''
              }
              onClick={() => toggleBetSlip(item)}
            >
              <span>{item.selectionName}</span>
              <span>{round(parseFloat(item.odds), 2)}</span>
            </li>
          );
        })}
        <li className={styles.allMarkets}>
          <Link to={`/${sport.sportHub}/${sport.sport}/${match.id}`}>
            <span>All markets</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Match;
