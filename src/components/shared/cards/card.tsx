import { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { RootState } from '../../../redux';
import { getOddsDisplayString } from '../../../utils/odds';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { FeaturedGame, Outcome } from '../../../constants/matches';
import { addBetSlip, removeBetSlip } from '../../../redux/action-creators';
import { getSelectedChainFromBase } from '../../../functions';

import styles from './sidebar.module.scss';

interface CardProps {
  game: FeaturedGame;
  slideIndex: number;
}

const Card: FC<CardProps> = ({ game, slideIndex }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentGame: currentBetSlipGame } = useSelector((root: RootState) => root.betSlip);
  const oddsFormat = useTypedSelector((state) => state.app.oddsFormat);
  const [boxIndex, setBoxIndex] = useState<number>(-1);

  const toggleBetSlip = (item: Outcome) => {
    if (currentBetSlipGame?.id === game.id && currentBetSlipGame?.outcome.id === item.id) {
      removeBetSlip()(dispatch);
    } else {
      addBetSlip({
        sportSlug: game.sportSlug,
        id: game.id,
        team1: game.participant1.name,
        team2: game.participant2.name,
        betType: game.markets[0]?.marketName ?? 'Full Time Result',
        outcome: item,
      })(dispatch);
    }
  };

  return (
    <div
      className={`${styles.card} ${
        currentBetSlipGame?.id === game.id
          ? styles.greenCard
          : slideIndex % 2 === 0
          ? styles.lightCard
          : styles.darkCard
      }`}
    >
      <div className={styles.card_content}>
        <div className={styles.card_content_league}>
          {/* <img
            src={slide.leagueLogo}
            alt='league'
            className={styles.card_content_league_laliga}
          /> */}
        </div>
        <div className={styles.card_content_teams}>
          <div className={styles.participantLogo}>
            <img
              src={game.participant1.image ?? '/assets/images/gamblr-xyz.png'}
              alt='Participant 1 logo'
            />
          </div>
          <div className={styles.card_content_teams_goals}>
            <span>{game.startsAtString}</span>
          </div>
          <div className={styles.participantLogo}>
            <img
              src={game.participant2.image ?? '/assets/images/gamblr-xyz.png'}
              alt='Participant 1 logo'
            />
          </div>
        </div>
        <div className={styles.card_content_time}>
          <span>{game.timeLabel}</span>
        </div>
        <div className={styles.card_content_teamOneScore}>
          <span>{game.participant1.name}</span>
          {/* <span>{slide.team1Percent}</span> */}
        </div>
        <div className={styles.card_content_teamTwoScore}>
          <span>{game.participant2.name}</span>
          {/* <span>{slide.team2Percent}</span> */}
        </div>

        <div className={styles.card_content_oddboxes}>
          {game.markets[0]?.outcomes[0].map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={
                  currentBetSlipGame?.id === game.id && currentBetSlipGame?.outcome.id === item.id
                    ? `${styles.card_content_oddboxes_box} ${styles.card_content_oddboxes_activeBox}`
                    : `${styles.card_content_oddboxes_box}`
                }
                onClick={() => toggleBetSlip(item)}
              >
                <div>{item.selectionName}</div>
                <div>{getOddsDisplayString(item.odds, oddsFormat)}</div>
              </div>
            );
          })}
          <Link
            to={`/${getSelectedChainFromBase(location.pathname)}/${game.sportHubSlug}/${
              game.sportSlug
            }/${game.gameId}`}
            className={`${styles.card_content_oddboxes_box}`}
          >
            <div>+{game.markets.length - 1}</div>
            <div>bets</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
