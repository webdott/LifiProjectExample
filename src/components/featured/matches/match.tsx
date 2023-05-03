import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { Game, Sport } from '../../../constants/matches';
import { RootState } from '../../../redux';
import { addBetSlip, removeBetSlip } from '../../../redux/action-creators';
import { round } from '../../../utils/numbers';
import { getSelectedChainFromBase } from '../../../functions';
import OddChangeListItem from './oddChange';

import styles from './matches.module.scss';

interface MatchProps {
  game: Game;
  sport: Sport;
}

const Match: FC<MatchProps> = ({ game, sport }) => {
  const location = useLocation();
  const { currentGame: currentBetSlipGame } = useSelector((root: RootState) => root.betSlip);
  const dispatch = useDispatch();

  const toggleBetSlip = (item: { id: number; oddName: string; odds: string }) => {
    if (currentBetSlipGame?.id === game.id && currentBetSlipGame?.matchOdd.id === item.id) {
      removeBetSlip()(dispatch);
    } else {
      addBetSlip({
        game: sport.sport,
        id: game.id,
        team1: game.participant1.name,
        team2: game.participant2.name,
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
        {game.markets[0].outcomes[0].map((item: any, index: number) => {
          return (
            <li
              key={index}
              className={
                currentBetSlipGame?.id === game.id && currentBetSlipGame?.matchOdd.id === item.id
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
        <OddChangeListItem />
        <li className={styles.allMarkets}>
          <Link
            to={`/${getSelectedChainFromBase(location.pathname)}/${sport.sportHub}/${sport.sport}/${
              game.id
            }`}
          >
            <span>All markets</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Match;
