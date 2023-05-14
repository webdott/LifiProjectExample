import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import styles from './bestsliptab.module.scss';
import { SPORTS_ICONS } from '../../../../../constants/sports';
import { getOddsDisplayString } from '../../../../../utils/odds';
import { CurrentGame } from '../../../../../redux/reducers/betSlip';
import { OddsFormat } from '../../../../../redux/reducers/app';

interface Props {
  currentSlipBet: CurrentGame | null;
  oddsFormat: OddsFormat;
  onRemoveBet: () => void;
}

const SelectedBet = ({ currentSlipBet, oddsFormat, onRemoveBet }: Props) => {
  const Icon = currentSlipBet?.sportSlug ? SPORTS_ICONS[currentSlipBet.sportSlug].activeIcon : null;

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
            {currentSlipBet?.team1} - {currentSlipBet?.team2}
          </p>
        </div>
        <IconButton sx={{ padding: 0, color: '#fff', opacity: '0.7' }} onClick={onRemoveBet}>
          <CloseIcon fontSize='small' />
        </IconButton>
      </div>
      <p>{currentSlipBet?.betType ?? ''}</p>
      <div className={styles.odds}>
        <span className={styles.who}>{currentSlipBet?.outcome.selectionName}</span>
        <span className={styles.odd}>
          {getOddsDisplayString(currentSlipBet?.outcome.odds || '0', oddsFormat)}
        </span>
      </div>
    </div>
  );
};

export default SelectedBet;
