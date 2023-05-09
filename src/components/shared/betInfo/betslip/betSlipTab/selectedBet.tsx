import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { RootState } from '../../../../../redux';
import { removeBetSlip } from '../../../../../redux/action-creators';

import styles from './bestsliptab.module.scss';
import { SPORTS_ICONS } from '../../../../../constants/sports';
import { getOddsDisplayString } from '../../../../../utils/odds';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';

const SelectedBet = () => {
  const { currentGame: currentBetSlipGame } = useSelector((root: RootState) => root.betSlip);
  const oddsFormat = useTypedSelector((state) => state.app.oddsFormat);
  const dispatch = useDispatch();

  const Icon = currentBetSlipGame?.sportSlug
    ? SPORTS_ICONS[currentBetSlipGame.sportSlug].activeIcon
    : null;

  return (
    <div className={styles.selectedBet}>
      <div className={styles.top}>
        <div className={styles.title}>
          <div className={styles.sportIcon}>
            {typeof Icon === 'string' ? (
              <img alt='' src={Icon as string} width={20} height={20} />
            ) : Icon ? (
              <Icon />
            ) : (
              Icon
            )}
          </div>
          <p>
            {currentBetSlipGame?.team1} - {currentBetSlipGame?.team2}
          </p>
        </div>
        <IconButton
          sx={{ padding: 0, color: '#fff', opacity: '0.7' }}
          onClick={() => removeBetSlip()(dispatch)}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      </div>
      <p>{currentBetSlipGame?.betType ?? ''}</p>
      <div className={styles.odds}>
        <span className={styles.who}>{currentBetSlipGame?.outcome.selectionName}</span>
        <span className={styles.odd}>
          {getOddsDisplayString(currentBetSlipGame?.outcome.odds || '0', oddsFormat)}
        </span>
      </div>
    </div>
  );
};

export default SelectedBet;
