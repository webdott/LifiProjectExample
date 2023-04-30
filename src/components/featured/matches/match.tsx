import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { MatchType, SportsAndGamesType } from '../../../constants/matches';
import { RootState } from '../../../redux';
import { addBetSlip, removeBetSlip } from '../../../redux/action-creators';

import styles from './matches.module.scss';

interface MatchProps {
  match: MatchType;
  game: SportsAndGamesType;
}

const Match: FC<MatchProps> = ({ match, game }) => {
  const { currentGame: currentBetSlipGame } = useSelector((root: RootState) => root.betSlip);
  const dispatch = useDispatch();

  const toggleBetSlip = (item: { id: number; oddName: string; odds: string }) => {
    if (currentBetSlipGame?.id === match.id && currentBetSlipGame?.matchOdd.id === item.id) {
      removeBetSlip()(dispatch);
    } else {
      addBetSlip({
        game: game.sportName,
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
        <p>{match.time}</p>
      </div>
      <ul className={styles.matchRightSection}>
        {match.matchOdds.map((item, index: number) => {
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
              <span>{item.id}</span>
              <span>{item.odds}</span>
            </li>
          );
        })}
        <li className={styles.allMarkets}>
          <Link to={`/${game.type}/${game.sportName}/${match.id}`}>
            <span>All markets</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Match;
