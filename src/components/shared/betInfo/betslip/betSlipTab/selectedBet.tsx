import React from 'react';
import { GiBoxingGlove } from 'react-icons/gi';
import { BiTennisBall } from 'react-icons/bi';
import { FaHockeyPuck } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { IoMdAmericanFootball } from 'react-icons/io';

import { RootState } from '../../../../../redux';
import { removeBetSlip } from '../../../../../redux/action-creators';
import { LeftSideIcons } from '../../../../../constants/icons';
import Dota2 from '../../../../../assets/images/dota2Icon.png';
import CSGO from '../../../../../assets/images/csgoIcon.png';
import LOL from '../../../../../assets/images/LOL.png';

import styles from './bestsliptab.module.scss';

const SelectedBet = () => {
  const { currentGame: currentBetSlipGame } = useSelector((root: RootState) => root.betSlip);
  const dispatch = useDispatch();

  let Icon = null;

  switch (true) {
    case currentBetSlipGame?.game === 'football':
      Icon = LeftSideIcons.activeFootball;
      break;
    case currentBetSlipGame?.game === 'basketball':
      Icon = LeftSideIcons.activeBasketball;
      break;
    case currentBetSlipGame?.game === 'mma':
      Icon = LeftSideIcons.activeMma;
      break;
    case currentBetSlipGame?.game === 'tennis':
      Icon = BiTennisBall;
      break;
    case currentBetSlipGame?.game === 'icehockey':
      Icon = FaHockeyPuck;
      break;
    case currentBetSlipGame?.game === 'boxing':
      Icon = GiBoxingGlove;
      break;
    case currentBetSlipGame?.game === 'american football':
      Icon = IoMdAmericanFootball;
      break;
    case currentBetSlipGame?.game === 'dota2':
      Icon = Dota2;
      break;
    case currentBetSlipGame?.game === 'cs:go':
      Icon = CSGO;
      break;
    case currentBetSlipGame?.game === 'league of legends':
      Icon = LOL;
      break;
    default:
      Icon = null;
      break;
  }

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
        <span className={styles.who}>{currentBetSlipGame?.matchOdd.id}</span>
        <span className={styles.odd}>{currentBetSlipGame?.matchOdd.odds}</span>
      </div>
    </div>
  );
};

export default SelectedBet;
